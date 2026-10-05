/* Logika sveta Robiho. Súradnice: x doprava, y dole. Robi stojí v prázdnom políčku,
   ak je pod ním blok alebo plošina. */
(function (factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (typeof window !== "undefined") window.RobiEngine = api;
})(function () {
  "use strict";

  const COMMANDS = {
    left: { icon: "⬅️", label: "Doľava", title: "Posun o políčko doľava" },
    right: { icon: "➡️", label: "Doprava", title: "Posun o políčko doprava" },
    up: { icon: "⬆️", label: "Skok hore", title: "Výskok na plošinu priamo nad Robim" },
    down: { icon: "⬇️", label: "Zoskok dole", title: "Zoskok na nižšiu úroveň" },
    side: { icon: "↗️", label: "Do strany", title: "Skok o políčko dopredu a o políčko hore" },
    pickup: { icon: "✋", label: "Zdvihnúť", title: "Zdvihnúť súčiastku na tomto políčku" },
  };

  function tiles(x1, x2, y) {
    const out = [];
    for (let x = x1; x <= x2; x++) out.push({ x, y });
    return out;
  }

  const LEVELS = [
    {
      title: "Doprava a doľava",
      blurb: "Doveď Robiho po ceste až k súčiastke.",
      commands: ["left", "right", "pickup"],
      slots: 9,
      cols: 16,
      rows: 8,
      robi: { x: 2, y: 5, dir: 1 },
      part: { x: 10, y: 5 },
      blocks: tiles(1, 11, 6),
      platforms: [],
      talk: {
        live: "Klikni na šípku. Hneď sa pohnem. Doveď ma k súčiastke a zdvihni ju.",
        program: "Najprv poskladaj celý program do políčok. Až potom stlač Spusti program.",
      },
    },
    {
      title: "Skok hore",
      blurb: "Súčiastka je vyššie. Samotné šípky nestačia.",
      commands: ["left", "right", "up", "pickup"],
      slots: 10,
      cols: 16,
      rows: 8,
      robi: { x: 2, y: 5, dir: 1 },
      part: { x: 10, y: 3 },
      blocks: tiles(1, 7, 6),
      platforms: tiles(6, 11, 4),
      talk: {
        live: "Súčiastka je vyššie. Skús nový príkaz: skok hore.",
        program: "Skok hore vlož až vtedy, keď stojím pod plošinou.",
      },
    },
    {
      title: "Zoskok dole",
      blurb: "Robi začína hore. Súčiastka čaká nižšie.",
      commands: ["left", "right", "up", "down", "pickup"],
      slots: 11,
      cols: 16,
      rows: 8,
      robi: { x: 2, y: 3, dir: 1 },
      part: { x: 11, y: 5 },
      blocks: tiles(6, 12, 6),
      platforms: tiles(1, 6, 4),
      talk: {
        live: "Som hore a súčiastka je dole. Pomôže mi zoskok.",
        program: "Zoskok dole zaraď tam, kde plošina končí.",
      },
    },
    {
      title: "Skok do strany",
      blurb: "Rovná cesta nestačí. Treba skočiť dopredu aj hore.",
      commands: ["left", "right", "up", "down", "side", "pickup"],
      slots: 9,
      cols: 16,
      rows: 8,
      robi: { x: 2, y: 5, dir: 1 },
      part: { x: 10, y: 4 },
      blocks: tiles(1, 5, 6),
      platforms: tiles(6, 11, 5),
      talk: {
        live: "Rovno sa tam nedostanem. Skok do strany ide dopredu a hore — podľa toho, kam som otočený.",
        program: "Do programu vlož aj skok do strany. Posunie ma dopredu a hore.",
      },
    },
  ];

  function key(x, y) {
    return x + "," + y;
  }

  function occupied(map, x, y) {
    const t = map.get(key(x, y));
    return t === "block" || t === "platform";
  }

  function canStand(map, x, y) {
    const below = map.get(key(x, y + 1));
    return below === "block" || below === "platform";
  }

  function inBounds(level, x, y) {
    return x >= 0 && y >= 0 && x < level.cols && y < level.rows;
  }

  function prepare(level) {
    const map = new Map();
    level.blocks.forEach((b) => map.set(key(b.x, b.y), "block"));
    level.platforms.forEach((p) => map.set(key(p.x, p.y), "platform"));
    level.map = map;
    [level.robi, level.part].forEach((spot) => {
      if (!inBounds(level, spot.x, spot.y) || occupied(map, spot.x, spot.y) || !canStand(map, spot.x, spot.y)) {
        throw new Error(level.title + ": zlá pozícia " + spot.x + "," + spot.y);
      }
    });
  }

  LEVELS.forEach(prepare);

  function createState(level) {
    return {
      x: level.robi.x,
      y: level.robi.y,
      dir: level.robi.dir,
      collected: false,
    };
  }

  function copy(state) {
    return { x: state.x, y: state.y, dir: state.dir, collected: state.collected };
  }

  function horiz(level, state, dir) {
    const x = state.x + dir;
    const y = state.y;
    if (!inBounds(level, x, y) || occupied(level.map, x, y) || !canStand(level.map, x, y)) return null;
    return { x, y, dir, collected: state.collected };
  }

  function jumpUp(level, state) {
    const x = state.x;
    const landing = state.y - 2;
    if (level.map.get(key(x, state.y - 1)) !== "platform") return null;
    if (!inBounds(level, x, landing) || occupied(level.map, x, landing)) return null;
    return { x, y: landing, dir: state.dir, collected: state.collected };
  }

  function drop(level, state) {
    for (let y = state.y + 1; y < level.rows; y++) {
      if (occupied(level.map, state.x, y)) continue;
      if (canStand(level.map, state.x, y)) {
        return { x: state.x, y, dir: state.dir, collected: state.collected };
      }
    }
    return null;
  }

  function sideJump(level, state) {
    const x = state.x + state.dir;
    const y = state.y - 1;
    if (!inBounds(level, x, y) || occupied(level.map, x, y) || !canStand(level.map, x, y)) return null;
    return { x, y, dir: state.dir, collected: state.collected };
  }

  function step(level, state, command) {
    if (command === "pickup") {
      const onPart = state.x === level.part.x && state.y === level.part.y && !state.collected;
      if (!onPart) return { state: copy(state), ok: false, event: "bump" };
      const next = copy(state);
      next.collected = true;
      return { state: next, ok: true, event: "pickup" };
    }

    let next = null;
    let event = "move";
    if (command === "left") next = horiz(level, state, -1);
    else if (command === "right") next = horiz(level, state, 1);
    else if (command === "up") {
      next = jumpUp(level, state);
      event = "jump";
    } else if (command === "down") {
      next = drop(level, state);
      event = "drop";
    } else if (command === "side") {
      next = sideJump(level, state);
      event = "jump";
    }

    if (!next) return { state: copy(state), ok: false, event: "bump" };
    return { state: next, ok: true, event };
  }

  return { LEVELS, COMMANDS, createState, step };
});
