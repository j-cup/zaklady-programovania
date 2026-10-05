/* Obe verzie hry: príkazy hneď (live) a celý program naraz (program). */
(function () {
  "use strict";

  const { LEVELS, COMMANDS, createState, step } = window.RobiEngine;

  const CMD_IMG = {
    left: "obrazky/chod_vlavo.png",
    right: "obrazky/chod_vpravo.png",
    up: "obrazky/vyskoc.png",
    down: "obrazky/zoskoc.png",
    side: "obrazky/preskoc.png",
    pickup: "obrazky/zdvihni.png",
  };

  function cmdIcon(id, dir) {
    const src = CMD_IMG[id];
    if (!src) return "";
    const flip = id === "side" && dir < 0 ? " is-flip" : "";
    return '<img class="cmd-img' + flip + '" src="' + src + '" alt="" draggable="false">';
  }

  const Sound = {
    ctx: null,
    ensure() {
      if (document.body.dataset.sound === "off") return null;
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      if (!this.ctx) this.ctx = new AC();
      if (this.ctx.state === "suspended") this.ctx.resume();
      return this.ctx;
    },
    tone(freq, dur, type, gain, delay) {
      const ctx = this.ensure();
      if (!ctx) return;
      const t = ctx.currentTime + (delay || 0);
      const osc = ctx.createOscillator();
      const amp = ctx.createGain();
      osc.type = type || "sine";
      osc.frequency.value = freq;
      amp.gain.setValueAtTime(gain || 0.05, t);
      amp.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      osc.connect(amp);
      amp.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + dur + 0.02);
    },
    play(event) {
      if (event === "move") this.tone(560, 0.08, "sine", 0.04);
      else if (event === "jump") {
        this.tone(480, 0.09, "sine", 0.05);
        this.tone(760, 0.12, "sine", 0.05, 0.08);
      } else if (event === "drop") {
        this.tone(420, 0.08, "sine", 0.04);
        this.tone(280, 0.1, "sine", 0.04, 0.07);
      } else if (event === "pickup") {
        [523, 659, 784].forEach((f, i) => this.tone(f, 0.12, "sine", 0.05, i * 0.08));
      } else if (event === "bump") this.tone(140, 0.16, "square", 0.03);
      else if (event === "win") {
        [523, 659, 784, 1046].forEach((f, i) => this.tone(f, 0.16, "sine", 0.05, i * 0.1));
      } else if (event === "fail") {
        this.tone(330, 0.16, "triangle", 0.04);
        this.tone(220, 0.22, "triangle", 0.04, 0.14);
      }
    },
  };

  window.RobiSound = Sound;

  function viewportOf(level) {
    const xs = [level.robi.x, level.part.x];
    const ys = [level.robi.y, level.part.y];
    level.blocks.concat(level.platforms).forEach((t) => {
      xs.push(t.x);
      ys.push(t.y);
    });
    const x0 = Math.max(0, Math.min.apply(null, xs) - 1);
    const x1 = Math.min(level.cols - 1, Math.max.apply(null, xs) + 1);
    const y0 = Math.max(0, Math.min.apply(null, ys) - 1);
    const y1 = Math.min(level.rows - 1, Math.max.apply(null, ys));
    return { x0, y0, cols: x1 - x0 + 1, rows: y1 - y0 + 1 };
  }

  function mount(host, options) {
    const mode = options.mode === "program" ? "program" : "live";
    let levelIndex = 0;
    let score = 0;
    let state = null;
    let view = null;
    let program = [];
    let running = false;
    let busy = false;
    let disposed = false;
    const timers = [];

    host.innerHTML =
      '<div class="game mode-' + mode + '">' +
      '<div class="game-hud">' +
      '<div class="level-meta"><strong class="ltitle"></strong><span class="lcount"></span></div>' +
      '<div class="nuts" id="nuts"></div>' +
      "</div>" +
      '<div class="world-wrap"><div class="world"><div class="grid"></div></div></div>' +
      '<div class="prog"></div>' +
      '<div class="game-toast" role="status"></div>' +
      '<div class="game-overlay" hidden></div>' +
      "</div>";

    const root = host.querySelector(".game");
    const nutsEl = root.querySelector(".nuts");
    const titleEl = root.querySelector(".ltitle");
    const countEl = root.querySelector(".lcount");
    const worldWrap = root.querySelector(".world-wrap");
    const world = root.querySelector(".world");
    const grid = root.querySelector(".grid");
    const progEl = root.querySelector(".prog");
    const toastEl = root.querySelector(".game-toast");
    const overlay = root.querySelector(".game-overlay");

    for (let i = 0; i < 4; i++) {
      const nut = document.createElement("img");
      nut.src = "obrazky/component_tile.png";
      nut.alt = "";
      nut.className = "nut";
      nut.dataset.i = String(i);
      nutsEl.appendChild(nut);
    }

    let actor = null;
    let partEl = null;
    let toastTimer = 0;

    function later(fn, ms) {
      const id = setTimeout(() => {
        if (!disposed) fn();
      }, ms);
      timers.push(id);
      return id;
    }

    function toast(text) {
      toastEl.textContent = text;
      toastEl.classList.add("show");
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toastEl.classList.remove("show"), 1400);
    }

    function paintNuts() {
      nutsEl.querySelectorAll(".nut").forEach((nut, i) => {
        nut.classList.toggle("is-on", i < score);
      });
    }

    function hint(text, pose) {
      if (options.onHint) options.onHint(text, pose || "ukazuje");
    }

    function loadLevel(index) {
      levelIndex = index;
      const level = LEVELS[index];
      state = createState(level);
      view = viewportOf(level);
      program = [];
      running = false;
      busy = false;
      overlay.hidden = true;
      overlay.innerHTML = "";
      titleEl.textContent = level.title;
      countEl.textContent = "Level " + (index + 1) + " / " + LEVELS.length;
      paintNuts();
      buildWorld();
      buildControls();
      hint(level.talk[mode], "ukazuje");
      layout();
    }

    function buildWorld() {
      const level = LEVELS[levelIndex];
      world.querySelectorAll(".actor, .part").forEach((el) => el.remove());
      world.style.setProperty("--cols", view.cols);
      world.style.setProperty("--rows", view.rows);
      grid.innerHTML = "";
      for (let row = 0; row < view.rows; row++) {
        for (let col = 0; col < view.cols; col++) {
          const x = view.x0 + col;
          const y = view.y0 + row;
          const type = level.map.get(x + "," + y);
          const cell = document.createElement("div");
          cell.className = "cell" + (type ? " is-" + type : " is-empty");
          cell.dataset.x = String(x);
          cell.dataset.y = String(y);
          grid.appendChild(cell);
        }
      }
      partEl = document.createElement("img");
      partEl.className = "part";
      partEl.src = "obrazky/component_tile.png";
      partEl.alt = "Súčiastka";
      world.appendChild(partEl);

      actor = document.createElement("div");
      actor.className = "actor no-trans";
      actor.innerHTML = '<div class="actor-bob"><img src="obrazky/robi_tile.png" alt="Robi" draggable="false"></div>';
      world.appendChild(actor);
      placeActors();
      requestAnimationFrame(() => actor.classList.remove("no-trans"));
    }

    function placeActors() {
      const cell = cellSize();
      if (!cell || !actor) return;
      actor.style.left = (state.x - view.x0) * cell + "px";
      actor.style.top = (state.y - view.y0) * cell + "px";
      actor.style.width = cell + "px";
      actor.style.height = cell + "px";
      actor.dataset.dir = String(state.dir);
      actor.style.setProperty("--face", String(state.dir));
      if (partEl) {
        const level = LEVELS[levelIndex];
        partEl.hidden = state.collected;
        partEl.style.left = (level.part.x - view.x0) * cell + cell * 0.18 + "px";
        partEl.style.top = (level.part.y - view.y0) * cell + cell * 0.22 + "px";
        partEl.style.width = cell * 0.64 + "px";
      }
    }

    function cellSize() {
      const w = parseFloat(world.style.width);
      if (!w || !view) return 0;
      return w / view.cols;
    }

    function layout() {
      if (!view) return;
      const rect = worldWrap.getBoundingClientRect();
      if (rect.width < 40 || rect.height < 40) return;
      const cell = Math.floor(Math.min(rect.width / view.cols, rect.height / view.rows));
      if (cell < 8) return;
      if (actor) actor.classList.add("no-trans");
      world.style.width = cell * view.cols + "px";
      world.style.height = cell * view.rows + "px";
      placeActors();
      if (actor) requestAnimationFrame(() => actor.classList.remove("no-trans"));
    }

    function buildControls() {
      const level = LEVELS[levelIndex];
      const dir = state ? state.dir : 1;
      if (mode === "program") {
        progEl.innerHTML =
          '<div class="prog-head">Môj program</div>' +
          '<div class="slots"></div>' +
          '<div class="pad"></div>' +
          '<div class="run-row">' +
          '<button type="button" class="undo">Späť</button>' +
          '<button type="button" class="run">Spusti program</button>' +
          "</div>";
        progEl.querySelector(".undo").addEventListener("click", undo);
        progEl.querySelector(".run").addEventListener("click", runProgram);
      } else {
        progEl.innerHTML = '<div class="pad"></div>';
      }
      const pad = progEl.querySelector(".pad");
      level.commands.forEach((id) => {
        const cmd = COMMANDS[id];
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "cmd";
        btn.dataset.cmd = id;
        btn.title = cmd.title;
        btn.innerHTML = cmdIcon(id, dir);
        btn.setAttribute("aria-label", cmd.label);
        btn.addEventListener("click", () => {
          Sound.ensure();
          if (mode === "live") doLive(id);
          else addCommand(id);
        });
        pad.appendChild(btn);
      });
      if (mode === "program") renderSlots();
    }

    function renderSlots() {
      const level = LEVELS[levelIndex];
      const slots = progEl.querySelector(".slots");
      if (!slots) return;
      const dir = state ? state.dir : 1;
      slots.innerHTML = "";
      for (let i = 0; i < level.slots; i++) {
        const slot = document.createElement("button");
        slot.type = "button";
        slot.className = "slot";
        const cmdId = program[i];
        if (cmdId) {
          slot.classList.add("is-filled");
          slot.innerHTML = cmdIcon(cmdId, dir);
          slot.title = COMMANDS[cmdId].label;
          slot.setAttribute("aria-label", COMMANDS[cmdId].label);
        } else {
          slot.innerHTML =
            '<img class="slot-empty" src="obrazky/prazdny_pokyn.png" alt="" draggable="false">' +
            '<span class="sr-only">Prázdny pokyn ' + (i + 1) + "</span>";
        }
        slot.addEventListener("click", () => {
          if (running) return;
          if (i === program.length - 1) undo();
        });
        slots.appendChild(slot);
      }
      const undoBtn = progEl.querySelector(".undo");
      const runBtn = progEl.querySelector(".run");
      if (undoBtn) undoBtn.disabled = running || program.length === 0;
      if (runBtn) runBtn.disabled = running || program.length === 0;
      progEl.querySelectorAll(".cmd").forEach((btn) => {
        btn.disabled = running;
      });
    }

    function refreshSideButtons() {
      const dir = state ? state.dir : 1;
      progEl.querySelectorAll(".cmd-img").forEach((el) => {
        const src = el.getAttribute("src") || "";
        if (src.indexOf("preskoc") !== -1) el.classList.toggle("is-flip", dir < 0);
      });
    }

    function addCommand(id) {
      if (running || busy) return;
      const level = LEVELS[levelIndex];
      if (program.length >= level.slots) {
        toast("Program je už plný! Skontroluj príkazy.");
        return;
      }
      program.push(id);
      renderSlots();
    }

    function undo() {
      if (running || program.length === 0) return;
      program.pop();
      renderSlots();
    }

    function animateResult(result) {
      const bob = actor.querySelector(".actor-bob");
      bob.classList.remove("hop", "shake", "drop");
      void bob.offsetWidth;
      if (!result.ok) bob.classList.add("shake");
      else if (result.event === "jump") bob.classList.add("hop");
      else if (result.event === "drop") bob.classList.add("drop");
      state = result.state;
      placeActors();
      refreshSideButtons();
      Sound.play(result.ok ? result.event : "bump");
    }

    function bumpMessage(command, result) {
      if (result.ok) return;
      toast(command === "pickup" ? "Tu súčiastka nie je." : "Tadiaľ sa nedá.");
    }

    function finishSuccess() {
      score += 1;
      later(() => {
        paintNuts();
        const nuts = nutsEl.querySelectorAll(".nut");
        if (nuts[score - 1]) nuts[score - 1].classList.add("just");
        Sound.play("win");
        const last = levelIndex === LEVELS.length - 1;
        if (last) {
          hint(
            mode === "program"
              ? "Tvoj program ma doviedol až k cieľu. Vykonal som ho krok za krokom!"
              : "Mám všetky súčiastky! Vďaka, že si mi dával pokyny.",
            "uhadol"
          );
          showOverlay({
            title: "Výborne!",
            text: mode === "program"
              ? "Robi má všetky súčiastky. Program ich našiel jeden príkaz za druhým."
              : "Robi má všetky súčiastky. Pokyny si mu dával a hneď videl, čo urobia.",
            primary: "Pokračovať v lekcii",
            onPrimary: () => {
              if (options.onComplete) options.onComplete();
              if (options.onAdvance) options.onAdvance();
            },
          });
        } else {
          hint("Super! Súčiastka je moja.", "uhadol");
          showOverlay({
            title: "Súčiastka získaná!",
            text: "Jedna súčiastka je späť. Ideme na ďalšiu cestu.",
            primary: "Ďalší level",
            onPrimary: () => loadLevel(levelIndex + 1),
          });
        }
      }, 420);
    }

    function showOverlay(opts) {
      overlay.hidden = false;
      overlay.innerHTML =
        '<div class="modal">' +
        "<h2>" + opts.title + "</h2>" +
        "<p>" + opts.text + "</p>" +
        '<button type="button" class="modal-go">' + opts.primary + "</button>" +
        (opts.secondary ? '<button type="button" class="modal-alt">' + opts.secondary + "</button>" : "") +
        "</div>";
      overlay.querySelector(".modal-go").addEventListener("click", () => {
        Sound.ensure();
        opts.onPrimary();
      });
      const alt = overlay.querySelector(".modal-alt");
      if (alt && opts.onSecondary) {
        alt.addEventListener("click", () => {
          Sound.ensure();
          opts.onSecondary();
        });
      }
    }

    function doLive(id) {
      if (busy || running || !overlay.hidden) return;
      busy = true;
      const level = LEVELS[levelIndex];
      const result = step(level, state, id);
      animateResult(result);
      bumpMessage(id, result);
      const collectedNow = result.ok && result.event === "pickup";
      later(() => {
        if (collectedNow) finishSuccess();
        else busy = false;
      }, 360);
    }

    function runProgram() {
      if (running || program.length === 0) {
        if (program.length === 0) toast("Najprv vlož aspoň jeden príkaz.");
        return;
      }
      running = true;
      renderSlots();
      const level = LEVELS[levelIndex];
      const slots = () => progEl.querySelectorAll(".slot");
      let i = 0;

      const tick = () => {
        if (disposed) return;
        slots().forEach((slot, idx) => {
          slot.classList.toggle("is-current", idx === i);
          slot.classList.toggle("is-done", idx < i);
        });
        const cmd = program[i];
        const result = step(level, state, cmd);
        animateResult(result);
        bumpMessage(cmd, result);
        const slot = slots()[i];
        if (!result.ok && slot) slot.classList.add("is-bad");
        i += 1;
        if (i < program.length) {
          later(tick, 820);
          return;
        }
        later(() => {
          slots().forEach((slot) => slot.classList.remove("is-current"));
          if (state.collected) {
            finishSuccess();
            return;
          }
          running = false;
          renderSlots();
          Sound.play("fail");
          hint("Tentoraz sa nám to nepodarilo. Pozri sa, ktorý príkaz treba zmeniť.", "premysla");
          showOverlay({
            title: "O nie!",
            text: "Nenašli sme súčiastku. Skús sa pozrieť na program a zmeniť príkaz, ktorý nesedí.",
            primary: "Skúsiť znova",
            onPrimary: () => loadLevel(levelIndex),
          });
        }, 520);
      };

      later(tick, 280);
    }

    const observer = new ResizeObserver(() => layout());
    observer.observe(worldWrap);
    loadLevel(0);

    return {
      destroy() {
        disposed = true;
        timers.forEach(clearTimeout);
        clearTimeout(toastTimer);
        observer.disconnect();
      },
    };
  }

  window.RobiGame = { mount };
})();
