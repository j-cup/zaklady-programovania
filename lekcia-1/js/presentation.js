/* Prezentácia lekcie 1 podľa obsah.md. Robi hovorí v dolnom okne. */
(function () {
  "use strict";

  const POSES = {
    pozdrav: "Robi zdraví",
    neutralny: "Robi",
    premysla: "Robi premýšľa",
    uhadol: "Robi má nápad",
    ukazuje: "Robi ukazuje",
  };

  const QUIZ = [
    {
      id: "phone",
      name: "Mobilný telefón",
      emoji: "📱",
      image: "obrazky/mobilny_telefon.png",
      question: "Je mobilný telefón počítač?",
      answer: true,
      text: "Mamka používa mobilný telefón na telefonovanie, posielanie správ, pozeranie videí a hranie hier. Keď jej niekto pošle správu, telefón ju zobrazí na obrazovke. Keď odfotí fotografiu, telefón ju uloží do pamäte. Dokáže tiež používať rôzne aplikácie a spracúvať množstvo informácií.",
      why: "Prijíma správy, ukladá fotky a spúšťa aplikácie. Spracúva informácie podľa programov.",
    },
    {
      id: "lamp",
      name: "Stolná lampa",
      emoji: "💡",
      image: "obrazky/stolna_lampa.png",
      question: "Je stolná lampa počítač?",
      answer: false,
      text: "Večer si Janko zapne lampu a tá sa rozsvieti. Keď vypínač vypne, svetlo zhasne. Lampa potrebuje elektrinu, aby mohla svietiť, ale nepotrebuje program, ktorý by spracúval informácie.",
      why: "Len sa rozsvieti a zhasne. Nepotrebuje program, ktorý by spracúval informácie.",
    },
    {
      id: "watch",
      name: "Inteligentné hodinky",
      emoji: "⌚",
      image: "obrazky/smart_hodinky.png",
      question: "Sú inteligentné hodinky počítač?",
      answer: true,
      text: "Ocko má na ruke inteligentné hodinky. Počas prechádzky mu počítajú kroky. Keď mu niekto zavolá, na hodinkách sa objaví upozornenie. Ocko si na nich môže pozrieť čas, správu alebo počasie.",
      why: "Počítajú kroky, ukazujú správy aj počasie. Vnútri sa ukrýva počítač.",
    },
    {
      id: "vacuum",
      name: "Vysávač",
      emoji: "🧹",
      image: "obrazky/vysavac.png",
      question: "Je vysávač počítač?",
      answer: false,
      text: "Mamka zapne vysávač a ten začne vysávať prach z podlahy. Vysávač vytvára silný prúd vzduchu, ktorý nasáva nečistoty. Keď ho vypne, motor sa zastaví. Robí svoju prácu, ale potrebuje na to počítač a program?",
      why: "Vysáva prach, ale prácu neriadi program, ktorý spracúva informácie.",
    },
    {
      id: "console",
      name: "Herná konzola",
      emoji: "🎮",
      image: "obrazky/herna_konzola.png",
      question: "Je herná konzola počítač?",
      answer: true,
      text: "Tomáš zapne konzolu a spustí svoju obľúbenú hru. Konzola spracúva pokyny z ovládača, zobrazuje obraz na televízore a podľa programu riadi všetko, čo sa v hre deje. Keď Tomáš stlačí tlačidlo, postavička v hre skočí.",
      why: "Spúšťa hry, číta ovládač a podľa programu riadi, čo sa v hre deje.",
    },
    {
      id: "kettle",
      name: "Rýchlovarná kanvica",
      emoji: "🔌",
      image: "obrazky/rychlovarna_konvica.png",
      question: "Je rýchlovarná kanvica počítač?",
      answer: false,
      text: "Mamka naleje do kanvice vodu a stlačí tlačidlo. Kanvica začne vodu zohrievať. Keď voda dosiahne určitú teplotu, kanvica sa vypne. Dokáže však podľa programu spracúvať rôzne informácie a vykonávať viacero úloh?",
      why: "Zohreje vodu a vypne sa. Nespúšťa program s rôznymi úlohami.",
    },
    {
      id: "car",
      name: "Moderné auto",
      emoji: "🚗",
      image: "obrazky/moderne_auto.png",
      question: "Je moderné auto počítač?",
      answer: true,
      text: "Ocko sadne do auta a na obrazovke sa mu zobrazí mapa. Auto pomocou senzorov zisťuje, čo sa deje okolo neho. Dokáže upozorniť na prekážku, pomôcť pri parkovaní a niektoré autá dokonca dokážu samy brzdiť alebo pomáhať s riadením.",
      why: "Sleduje okolie senzormi, ukazuje mapu a programy mu pomáhajú rozhodovať.",
    },
    {
      id: "scooter",
      name: "Elektrická kolobežka",
      emoji: "🛴",
      image: "obrazky/elektricka_kolobezka.png",
      question: "Je elektrická kolobežka počítač?",
      answer: false,
      text: "Miško sa vezie na elektrickej kolobežke. Stlačí páčku a kolobežka sa rozbehne. Keď páčku pustí, spomalí. Kolobežka má batériu a motor, ale dokáže sama spracúvať informácie podľa programu?",
      why: "Má motor a batériu, ale sama nespracúva informácie podľa programu.",
    },
    {
      id: "washer",
      name: "Práčka",
      emoji: "🧺",
      image: "obrazky/pracka.png",
      question: "Je práčka počítač?",
      answer: true,
      text: "Mamička vloží oblečenie do práčky a vyberie program na pranie. Práčka potom sama riadi, koľko vody použije, kedy začne prať, kedy bude oblečenie odstreďovať a kedy má program skončiť.",
      why: "Sama riadi program prania: koľko vody, kedy prať a kedy odstreďovať.",
    },
    {
      id: "speaker",
      name: "Bezdrôtový reproduktor",
      emoji: "🔊",
      image: "obrazky/bezdrotovy_reproduktor.png",
      question: "Je bezdrôtový reproduktor počítač?",
      answer: false,
      text: "Peťo zapne bezdrôtový reproduktor a pustí si svoju obľúbenú pesničku z mobilu. Reproduktor prijme zvuk a prehrá ho cez svoje reproduktory. Dokáže však sám spracúvať informácie a rozhodovať, čo má robiť podľa programu?",
      why: "Prehrá zvuk, ktorý dostane. Sám sa nerozhoduje podľa programu.",
    },
  ];

  const IPO = [
    {
      tab: "⌨️ Klávesa",
      speech: "Skús si všimnúť tri kroky. Kde to začína a kde to končí?",
      steps: [
        ["⌨️", "Vstup", "Stlačíš klávesu na klávesnici."],
        ["🧠", "Spracovanie", "Počítač rozpozná, aký znak klávesa predstavuje."],
        ["📤", "Výstup", "V textovom editore sa objaví písmeno."],
      ],
    },
    {
      tab: "📷 Fotoaparát",
      speech: "Aj pri fotke je to rovnaký postup. Len vstup vyzerá inak.",
      steps: [
        ["📥", "Vstup", "Kamera zachytí obraz."],
        ["🧠", "Spracovanie", "Počítač zo zachyteného obrazu vytvorí fotografiu."],
        ["📤", "Výstup", "Na obrazovke sa objaví fotka."],
      ],
    },
    {
      tab: "🎤 Mikrofón",
      speech: "Hlas putuje celou cestou. Sleduj, čo je vstup a čo výstup.",
      steps: [
        ["📥", "Vstup", "Mikrofón zachytí tvoj hlas."],
        ["🧠", "Spracovanie", "Počítač zvuk spracuje a pripraví na odoslanie."],
        ["📤", "Výstup", "V druhom telefóne počuť tvoj hlas."],
      ],
    },
    {
      tab: "👆 Obrazovka",
      speech: "Jeden dotyk a panáčik skočí. To je výsledok spracovania.",
      steps: [
        ["📥", "Vstup", "Prst sa dotkne obrazovky."],
        ["🧠", "Spracovanie", "Počítač zaznamená miesto dotyku a pochopí ho ako pokyn."],
        ["📤", "Výstup", "Panáčik v hre vyskočí."],
      ],
    },
  ];

  const WITH_PROG = [
    {
      tab: "⌨️ Klávesa",
      speech: "Podľa programu! Bez neho by počítač nevedel, čo so stlačenou klávesou urobiť.",
      steps: [
        ["📥", "Vstup", "Počítač dostane stlačenie klávesy."],
        ["📜", "Program", "Program textového editora povie, čo má urobiť."],
        ["📤", "Výstup", "Na obrazovke sa objaví písmeno."],
      ],
    },
    {
      tab: "📷 Fotka",
      speech: "Program fotoaparátu rozhodne, ako sa z obrazu stane fotka.",
      steps: [
        ["📥", "Vstup", "Kamera zachytí obraz."],
        ["📜", "Program", "Program fotoaparátu povie, ako obraz spracovať a uložiť."],
        ["📤", "Výstup", "Na obrazovke sa objaví fotografia."],
      ],
    },
    {
      tab: "🎤 Hlas",
      speech: "Aj hovorenie do telefónu riadi program. Inak by to bol len zvuk.",
      steps: [
        ["📥", "Vstup", "Mikrofón zachytí tvoj hlas."],
        ["📜", "Program", "Program na telefonovanie povie, ako zvuk spracovať a odoslať."],
        ["📤", "Výstup", "V druhom telefóne počuť tvoj hlas."],
      ],
    },
    {
      tab: "👆 Dotyk",
      speech: "Dotyk je vstup. Program hry rozhodne, čo sa má stať ďalej.",
      steps: [
        ["📥", "Vstup", "Obrazovka zaznamená dotyk."],
        ["📜", "Program", "Program hry povie, čo má urobiť po tomto pokyne."],
        ["📤", "Výstup", "Panáčik v hre vyskočí."],
      ],
    },
  ];

  const DAILY = [
    {
      icon: "⌨️",
      title: "Textový editor",
      result: "vytváranie textu",
      speech: "Toto používaš, keď píšeš úlohu alebo správu. Aj to je program!",
      steps: ["napíšeš písmeno", "program povie, čo urobiť", "písmeno sa objaví"],
    },
    {
      icon: "📷",
      title: "Fotoaparát",
      result: "fotografovanie",
      speech: "Fotku neurobíš ty sám. Pomáha ti program vo vnútri telefónu.",
      steps: ["kamera zachytí obraz", "program spracuje obrázok", "fotka sa uloží"],
    },
    {
      icon: "📞",
      title: "Telefonovanie",
      result: "telefonovanie",
      speech: "Aj volanie je program. Preto telefón vie, komu voláš a čo s hlasom urobiť.",
      steps: ["vyberieš, komu voláš", "zachytí sa hlas", "druhý telefón ho prehrá"],
    },
    {
      icon: "🎮",
      title: "Hra",
      result: "hranie hry",
      speech: "Hra nie je len zábava. Vo vnútri beží program s množstvom pokynov.",
      steps: ["stlačíš tlačidlo", "program spracuje pokyn", "postavička vyskočí"],
    },
  ];

  const slideHost = document.getElementById("slide");
  const speechEl = document.getElementById("speech");
  const speechSr = document.getElementById("speech-sr");
  const speechBox = document.getElementById("speech-box");
  const robiImg = document.getElementById("robi");
  const progressEl = document.getElementById("progress-fill");
  const counterEl = document.getElementById("counter");
  const btnPrev = document.getElementById("btn-prev");
  const btnNext = document.getElementById("btn-next");
  const btnSound = document.getElementById("btn-sound");
  const btnFull = document.getElementById("btn-full");
  const toastEl = document.getElementById("toast");
  const nextLabel = btnNext.querySelector("span");

  let index = 0;
  let cleanup = function () {};
  let nextLocked = false;
  let lockReason = "";
  let navFrozen = false;
  let currentText = "";
  let isTyping = false;
  let typeToken = 0;
  let typeTimer = 0;
  let toastTimer = 0;

  try { sessionStorage.removeItem("robi-lekcia-1"); } catch (err) { /* ignore */ }

  const state = {
    slide: 0,
    sound: "on",
    quiz: { i: 0, answers: [] },
    games: { live: false, program: false },
  };

  function persist() {
    state.slide = index;
  }

  function setRobi(pose) {
    const src = "obrazky/robi_" + (pose || "neutralny") + ".png";
    if (robiImg.getAttribute("src") !== src) {
      robiImg.src = src;
      robiImg.alt = POSES[pose] || "Robi";
    }
  }

  function setTyping(on) {
    isTyping = on;
    speechBox.classList.toggle("is-typing", on);
  }

  function pause(ch) {
    if (ch === "." || ch === "!" || ch === "?" || ch === "…") return 200;
    if (ch === "," || ch === ";" || ch === ":") return 110;
    return 24;
  }

  function say(text, pose) {
    if (pose) setRobi(pose);
    if (!text || text === currentText) return;
    currentText = text;
    typeToken += 1;
    const token = typeToken;
    clearTimeout(typeTimer);
    speechSr.textContent = text;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      speechEl.textContent = text;
      setTyping(false);
      return;
    }
    setTyping(true);
    speechEl.textContent = "";
    const tick = (i) => {
      if (token !== typeToken) return;
      speechEl.textContent = text.slice(0, i);
      if (i >= text.length) {
        setTyping(false);
        return;
      }
      typeTimer = setTimeout(() => tick(i + 1), pause(text[i - 1]));
    };
    tick(1);
  }

  function completeTyping() {
    if (!isTyping) return false;
    typeToken += 1;
    clearTimeout(typeTimer);
    speechEl.textContent = currentText;
    setTyping(false);
    return true;
  }

  function showToast(text) {
    toastEl.textContent = text;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2400);
  }

  function nudgeNext() {
    btnNext.classList.remove("nudge");
    void btnNext.offsetWidth;
    btnNext.classList.add("nudge");
  }

  function formula(parts, extra) {
    const bits = parts.map((part, i) => {
      const arrow = i ? '<span class="formula-arrow">→</span>' : "";
      return arrow + '<span class="pill">' + part + "</span>";
    });
    return '<div class="formula ' + (extra || "") + '">' + bits.join("") + "</div>";
  }

  function stepsHTML(steps) {
    return steps.map((step, i) => {
      const card = '<article class="step" style="--d:' + i + '"><span class="step-ico">' + step[0] + "</span><h3>" + step[1] + "</h3><p>" + step[2] + "</p></article>";
      const arrow = i < steps.length - 1 ? '<span class="flow-arrow" style="--d:' + i + '">→</span>' : "";
      return card + arrow;
    }).join("");
  }

  function mountFlows(host, model) {
    const tabs = model.items.map((item, i) => {
      return '<button type="button" class="tab' + (i === 0 ? " is-on" : "") + '" data-i="' + i + '">' + item.tab + "</button>";
    }).join("");
    host.innerHTML =
      '<div class="slide">' +
      '<p class="kicker">' + model.kicker + "</p>" +
      "<h1>" + model.title + "</h1>" +
      '<div class="tabs">' + tabs + "</div>" +
      '<div class="flow"></div>' +
      (model.formula || "") +
      "</div>";
    const flow = host.querySelector(".flow");
    const buttons = host.querySelectorAll(".tab");
    let current = -1;
    function show(i) {
      buttons.forEach((btn, idx) => btn.classList.toggle("is-on", idx === i));
      flow.innerHTML = stepsHTML(model.items[i].steps);
      if (i !== current) say(model.items[i].speech, "ukazuje");
      current = i;
    }
    buttons.forEach((btn) => btn.addEventListener("click", () => show(Number(btn.dataset.i))));
    show(0);
  }

  function mountQuiz(host) {
    let revealTimer = 0;

    function verdictSpeech(q) {
      const ending = q.answer ? q.name + " je počítač." : q.name + " nie je počítač.";
      return q.why.replace(/\s*$/, "") + " " + ending;
    }

    function paint() {
      clearTimeout(revealTimer);
      host.classList.remove("enter");
      const i = state.quiz.i;
      const q = QUIZ[i];
      const ans = state.quiz.answers[i];
      const revealed = !!(ans && ans.revealed);
      const waiting = !!(ans && !ans.revealed);
      const correctCount = state.quiz.answers.filter((a) => a && a.correct).length;
      const done = state.quiz.answers.filter((a) => a && a.revealed).length >= QUIZ.length;
      const dots = QUIZ.map((_, n) => {
        const a = state.quiz.answers[n];
        const cls = n === i ? " is-now" : a && a.revealed ? (a.correct ? " is-ok" : " is-bad") : "";
        return '<i class="dot' + cls + '"></i>';
      }).join("");

      host.innerHTML =
        '<div class="slide quiz' + (waiting ? " is-waiting" : "") + (revealed ? (ans.correct ? " is-right" : " is-wrong") : "") + '">' +
        '<div class="quiz-top">' +
        '<span class="kicker">Hádanka ' + (i + 1) + " / " + QUIZ.length + "</span>" +
        '<span class="score-chip">Správne: ' + correctCount + "</span>" +
        '<div class="dots">' + dots + "</div></div>" +
        '<div class="quiz-main">' +
        '<div class="quiz-device">' +
        '<div class="device-frame"><img src="' + q.image + '" alt="' + q.name + '"></div>' +
        '<div class="quiz-copy">' +
        "<h1>" + q.name + "</h1>" +
        '<p class="desc">' + q.text + "</p>" +
        '<div class="quiz-prompt">' +
        '<p class="ask">Je toto počítač?</p>' +
        '<div class="choices">' +
        '<button type="button" class="choice yes" data-v="1">Áno</button>' +
        '<button type="button" class="choice no" data-v="0">Nie</button>' +
        "</div></div></div></div></div></div>" +
        (revealed
          ? '<button type="button" class="big-go quiz-next" id="q-next">' +
            (i === QUIZ.length - 1 ? "Pozrieť výsledok →" : "Ďalšia otázka →") +
            "</button>"
          : "");

      const yes = host.querySelector('[data-v="1"]');
      const no = host.querySelector('[data-v="0"]');
      const picked = ans ? (ans.choice ? yes : no) : null;

      function syncPrevBtn() {
        btnPrev.classList.toggle("is-disabled", navFrozen || index === 0);
      }

      if (!ans) {
        navFrozen = false;
        syncPrevBtn();
        yes.addEventListener("click", () => choose(true));
        no.addEventListener("click", () => choose(false));
        ctx.lock(true, "Najprv dokončime všetkých 10 hádaniek.");
        say(q.question, "premysla");
        return;
      }

      yes.disabled = true;
      no.disabled = true;

      if (waiting) {
        picked.classList.add("is-picked");
        navFrozen = true;
        syncPrevBtn();
        ctx.lock(true, "Počkaj chvíľu…");
        revealTimer = setTimeout(() => {
          ans.revealed = true;
          persist();
          paint();
        }, 2000);
        return;
      }

      navFrozen = false;
      syncPrevBtn();
      picked.classList.add(ans.correct ? "is-correct" : "is-picked-wrong");
      ctx.lock(!done, "Najprv dokončime všetkých 10 hádaniek.");
      say(verdictSpeech(q), ans.correct ? "uhadol" : "premysla");
      host.querySelector("#q-next").addEventListener("click", () => {
        if (navFrozen) return;
        if (i < QUIZ.length - 1) {
          state.quiz.i += 1;
          persist();
          paint();
          return;
        }
        ctx.lock(false);
        ctx.forceNext();
      });
    }

    function choose(value) {
      const i = state.quiz.i;
      if (state.quiz.answers[i] || navFrozen) return;
      const q = QUIZ[i];
      state.quiz.answers[i] = {
        id: q.id,
        choice: value,
        correct: value === q.answer,
        revealed: false,
      };
      persist();
      paint();
    }

    const answered = state.quiz.answers.filter(Boolean);
    if (answered.length >= QUIZ.length) {
      answered.forEach((a) => { a.revealed = true; });
      state.quiz.i = QUIZ.length - 1;
    }
    paint();
    return () => {
      clearTimeout(revealTimer);
      navFrozen = false;
    };
  }

  function mountResults(host) {
    const answers = state.quiz.answers.filter(Boolean);
    const byId = {};
    answers.forEach((a) => { byId[a.id] = a; });
    const score = answers.filter((a) => a.correct).length;

    function card(q) {
      const ans = byId[q.id];
      const ok = ans ? !!ans.correct : false;
      const mark = ok
        ? '<span class="result-mark ok" aria-label="Správne">✓</span>'
        : '<span class="result-mark bad" aria-label="Nesprávne">✗</span>';
      return '<article class="result-card">' +
        mark +
        '<div class="result-thumb"><img src="' + q.image + '" alt="' + q.name + '"></div>' +
        "<h3>" + q.name + "</h3>" +
        "</article>";
    }

    function row(title, list, cls) {
      return '<section class="result-row ' + cls + '">' +
        "<h2>" + title + "</h2>" +
        '<div class="result-cards">' + list.map(card).join("") + "</div>" +
        "</section>";
    }

    host.innerHTML =
      '<div class="slide results">' +
      '<p class="kicker">Ako sme dopadli?</p>' +
      row("Áno, je to počítač", QUIZ.filter((q) => q.answer), "yes") +
      row("Nie, nie je to počítač", QUIZ.filter((q) => !q.answer), "no") +
      '<p class="result-score">Tvoj výsledok: <strong>' + score + " / " + QUIZ.length + "</strong></p>" +
      "</div>";

    if (answers.length !== QUIZ.length) {
      say("Poďme sa pozrieť, kde sa počítače ukrývajú.", "ukazuje");
    } else if (score === QUIZ.length) {
      say("Úžasné! Odhalili ste všetkých desať. Poďme sa pozrieť.", "uhadol");
      burst(host);
    } else if (score >= 7) {
      say("Výborne! Väčšinu ste spoznali. Poďme si to skontrolovať.", "uhadol");
    } else {
      say("Dobrá práca. Teraz si ukážeme, ktoré zariadenia v sebe ukrývajú počítač.", "premysla");
    }
  }

  function burst(host) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const layer = document.createElement("div");
    layer.className = "confetti-layer";
    const colors = ["#ff7a2f", "#2f7cf6", "#ffd166", "#1aa36a", "#ff5d8f"];
    for (let i = 0; i < 36; i++) {
      const bit = document.createElement("i");
      bit.style.left = Math.random() * 100 + "%";
      bit.style.background = colors[i % colors.length];
      bit.style.animationDelay = Math.random() * 0.25 + "s";
      bit.style.animationDuration = 1.5 + Math.random() + "s";
      layer.appendChild(bit);
    }
    const slide = host.querySelector(".slide") || host;
    slide.style.position = "relative";
    slide.appendChild(layer);
  }

  function goButton(host) {
    const btn = host.querySelector("[data-go]");
    if (btn) {
      btn.addEventListener("click", () => {
        ctx.lock(false);
        ctx.forceNext();
      });
    }
  }

  const slides = [
    {
      id: "welcome",
      robi: "pozdrav",
      speech: "Ahoj! Ja som Robi. Prišiel som sa s vami naučiť, ako vlastne fungujú počítače.",
      render(host) {
        host.innerHTML =
          '<div class="slide hero">' +
          '<p class="kicker">Dobrodružstvo s Robim</p>' +
          '<h1 class="hero-title">Lekcia 1</h1>' +
          '<p class="lead">Dnes spoznáme, čo počítače robia a ako im dávame pokyny.</p>' +
          '<p class="question">Ako vlastne fungujú počítače?</p>' +
          "</div>";
      },
    },
    {
      id: "journey",
      robi: "ukazuje",
      speech: "Vydáme sa spolu na dobrodružstvo. Tak čo, ideme na to?",
      render(host) {
        const goals = [
          "Čo je počítač",
          "Čo sa ukrýva v jeho vnútri",
          "Ako pracuje s informáciami",
          "Ako spolu počítače komunikujú",
          "Ako ho naučíme robiť veci podľa našich pokynov",
        ];
        const icons = ["🔍", "🧠", "💾", "🌐", "💻"];
        host.innerHTML =
          '<div class="slide">' +
          '<p class="kicker">Naša cesta</p>' +
          "<h1>Čo spolu zistíme?</h1>" +
          "<ol class=\"goals\">" +
          goals.map((text, i) => '<li style="--d:' + i + '"><span>' + icons[i] + "</span>" + text + "</li>").join("") +
          "</ol></div>";
      },
    },
    {
      id: "what",
      robi: "ukazuje",
      speech: "Ale kde všade sa takéto počítače ukrývajú?",
      render(host) {
        host.innerHTML =
          '<div class="slide">' +
          '<p class="kicker">Čo je počítač</p>' +
          "<h1>Stroj, ktorý pracuje s informáciami</h1>" +
          '<p class="define">Počítač je stroj, ktorý dokáže prijímať, spracovávať a ukladať informácie a podľa pokynov vytvárať výsledky.</p>' +
          '<div class="steps3">' +
          '<article class="step-card" style="--d:0"><span>📥</span><h3>Dostane informáciu</h3></article>' +
          '<span class="flow-arrow">→</span>' +
          '<article class="step-card" style="--d:1"><span>🧠</span><h3>Spracuje ju</h3></article>' +
          '<span class="flow-arrow">→</span>' +
          '<article class="step-card" style="--d:2"><span>📤</span><h3>Vytvorí výsledok</h3></article>' +
          "</div></div>";
      },
    },
    {
      id: "hidden",
      robi: "premysla",
      speech: "Čaká ťa 10 hádaniek. Pri každej sa rozhodni: je to počítač?",
      render(host) {
        ctx.lock(true, "Kvíz spustíš tlačidlom Začať kvíz.");
        host.innerHTML =
          '<div class="slide">' +
          '<p class="kicker">Nie je to len krabica</p>' +
          "<h1>Počítače môžu vyzerať rôzne</h1>" +
          '<div class="typical-pc">' +
          '<img src="obrazky/stolny_pocitac.png" alt="Stolný počítač">' +
          "<div>" +
          '<p class="define">Áno, toto je typický príklad toho, čo sa považuje za počítač.</p>' +
          '<p class="define">Ale počítače môžu byť rôzne a často sa ukrývajú v zariadeniach okolo nás.</p>' +
          '<p class="define">Dokážeš uhádnuť, čo sa považuje za počítač?</p>' +
          "</div></div>" +
          '<button type="button" class="big-go quiz-start" data-go>Začať kvíz</button>' +
          "</div>";
        goButton(host);
      },
    },
    {
      id: "quiz",
      robi: "premysla",
      speech: null,
      render(host) { return mountQuiz(host); },
    },
    {
      id: "results",
      robi: "uhadol",
      speech: null,
      render(host) { mountResults(host); },
    },
    {
      id: "why",
      robi: "premysla",
      speech: "Tak prečo sú niektoré zariadenia počítače a iné nie? Na to sa pozrieme hneď.",
      render(host) {
        host.innerHTML =
          '<div class="slide hero">' +
          '<p class="kicker">Ale pozor</p>' +
          "<h1>Elektrina nestačí</h1>" +
          '<p class="lead">Lampa, vysávač aj telefón potrebujú elektrinu. To z nich ešte nerobí to isté.</p>' +
          '<p class="question">Čo teda robí počítač počítačom?</p>' +
          "</div>";
      },
    },
    {
      id: "ipo",
      robi: "ukazuje",
      speech: null,
      render(host) {
        mountFlows(host, {
          kicker: "Ako počítač pracuje",
          title: "Vstup, spracovanie, výstup",
          items: IPO,
        });
      },
    },
    {
      id: "ipo-formula",
      robi: "uhadol",
      speech: "Zapamätaj si to. Tento postup uvidíš ešte veľakrát.",
      render(host) {
        host.innerHTML =
          '<div class="slide hero">' +
          '<p class="kicker">Zapamätaj si</p>' +
          "<h1>Takto to ide vždy</h1>" +
          formula(["📥 Vstup", "🧠 Spracovanie", "📤 Výstup"], "xl") +
          '<p class="lead">Najprv niečo dostane. Potom to spracuje. Nakoniec vytvorí výsledok.</p>' +
          "</div>";
      },
    },
    {
      id: "secret",
      robi: "premysla",
      speech: "Preto počítač potrebuje pokyny od človeka. Bez nich nevie, čo má robiť.",
      render(host) {
        host.innerHTML =
          '<div class="slide">' +
          '<p class="kicker">Robiho tajomstvo</p>' +
          '<p class="quote">Počítač vie spracúvať informácie… ale sám od seba nevie, čo má robiť.</p>' +
          '<div class="chain">' +
          '<span class="pill">👤 Človek<small>povie, čo urobiť</small></span>' +
          '<span class="formula-arrow">→</span>' +
          '<span class="pill">📜 Program<small>obsahuje pokyny</small></span>' +
          '<span class="formula-arrow">→</span>' +
          '<span class="pill">💻 Počítač<small>pokyny vykoná</small></span>' +
          '<span class="formula-arrow">→</span>' +
          '<span class="pill">🎯 Výsledok<small>urobí, čo sme chceli</small></span>' +
          "</div></div>";
      },
    },
    {
      id: "program-def",
      robi: "uhadol",
      speech: "Keď počítač dostane program, vie podľa jeho pokynov pracovať.",
      render(host) {
        host.innerHTML =
          '<div class="slide hero">' +
          '<p class="kicker">Nové slovo</p>' +
          "<h1>Čo je program?</h1>" +
          '<p class="quote">Program je súbor pokynov, ktoré hovoria počítaču, čo má robiť.</p>' +
          '<p class="lead">Toto slovo budeme používať až do konca lekcie.</p>' +
          "</div>";
      },
    },
    {
      id: "with-program",
      robi: "ukazuje",
      speech: null,
      render(host) {
        mountFlows(host, {
          kicker: "Podľa čoho to vie?",
          title: "Podľa programu",
          items: WITH_PROG,
          formula: formula(["📥 Vstup", "📜 Program", "🧠 Spracovanie", "📤 Výstup"]),
        });
      },
    },
    {
      id: "daily",
      robi: "ukazuje",
      speech: "Klikni na kartu. Poviem ti k nej niečo navyše.",
      render(host) {
        host.innerHTML =
          '<div class="slide">' +
          '<p class="kicker">Každý deň</p>' +
          "<h1>Programy sú všade okolo nás</h1>" +
          '<div class="cards">' +
          DAILY.map((item, i) => {
            return '<button type="button" class="card" data-i="' + i + '">' +
              '<span class="card-ico">' + item.icon + "</span><h3>" + item.title + "</h3>" +
              '<div class="mini">' + item.steps.map((s, n) => (n ? "<span>→</span>" : "") + "<span>" + s + "</span>").join("") + "</div>" +
              "</button>";
          }).join("") +
          "</div>" +
          '<div class="banner">Program = pokyny pre počítač. ' +
          '<span class="map">' + DAILY.map((d) => "<span>" + d.icon + " " + d.title + " → <b>" + d.result + "</b></span>").join("") + "</span></div>" +
          "</div>";
        host.querySelectorAll(".card").forEach((card) => {
          card.addEventListener("click", () => {
            host.querySelectorAll(".card").forEach((el) => el.classList.toggle("is-on", el === card));
            say(DAILY[Number(card.dataset.i)].speech, "ukazuje");
          });
        });
      },
    },
    {
      id: "mission",
      robi: "pozdrav",
      speech: "Pri výprave som stratil súčiastky. Pomôžeš mi ich nájsť?",
      render(host) {
        host.innerHTML =
          '<div class="slide hero">' +
          '<p class="kicker">Prvý program</p>' +
          "<h1>Robi potrebuje pomoc</h1>" +
          '<div class="mission-row">' +
          '<img src="obrazky/component_tile.png" alt="">'.repeat(4) +
          "</div>" +
          '<p class="lead">Súčiastky sú v Robiho svete. Úlohou je vytvoriť program: kam má ísť a čo má urobiť. Namiesto klávesnice sa používajú tlačidlá s príkazmi.</p>' +
          '<button type="button" class="big-go" data-go>Poďme programovať</button>' +
          "</div>";
        goButton(host);
      },
    },
    {
      id: "game-live",
      game: true,
      robi: "ukazuje",
      speech: null,
      render(host) {
        const done = state.games.live;
        ctx.lock(!done, "Najprv spolu nájdeme všetky súčiastky.");
        const game = window.RobiGame.mount(host, {
          mode: "live",
          onHint: (text, pose) => say(text, pose),
          onComplete: () => {
            state.games.live = true;
            persist();
            ctx.lock(false);
          },
          onAdvance: () => ctx.forceNext(),
        });
        return () => game.destroy();
      },
    },
    {
      id: "interactive",
      robi: "uhadol",
      speech: "Výborne! Pomohol si mi nájsť všetky moje súčiastky!",
      render(host) {
        host.innerHTML =
          '<div class="slide">' +
          '<p class="kicker">Interaktívny režim</p>' +
          "<h1>Zvládol si to!</h1>" +
          '<p class="define">Program sme tvorili počas hry. Klikol si na príkaz a hneď si videl, čo spôsobil.</p>' +
          '<div class="steps3">' +
          '<article class="step-card" style="--d:0"><span>➡️</span><h3>Doprava</h3><p>Robi sa pohol.</p></article>' +
          '<span class="flow-arrow">→</span>' +
          '<article class="step-card" style="--d:1"><span>⬆️</span><h3>Skok</h3><p>Robi vyskočil.</p></article>' +
          '<span class="flow-arrow">→</span>' +
          '<article class="step-card" style="--d:2"><span>👀</span><h3>Hneď vidíš</h3><p>Čo príkaz urobil.</p></article>' +
          "</div></div>";
      },
    },
    {
      id: "more",
      robi: "premysla",
      speech: "Preto si teraz vyskúšame niečo ťažšie. Program musí byť pripravený vopred.",
      render(host) {
        const items = [
          ["🚧", "Niečo sa dostane do cesty"],
          ["👆", "Používateľ urobí niečo iné"],
          ["📱", "Príde nová informácia"],
          ["⚠️", "Niečo nefunguje podľa plánu"],
        ];
        host.innerHTML =
          '<div class="slide">' +
          '<p class="kicker">Ešte jeden krok</p>' +
          "<h1>Program musí zvládnuť viac</h1>" +
          '<p class="define">Nestačí povedať jeden pokyn práve teraz. Program treba napísať tak, aby mal všetky pokyny vopred a vedel reagovať.</p>' +
          "<ul class=\"situations\">" +
          items.map((it) => "<li><span>" + it[0] + "</span> " + it[1] + "</li>").join("") +
          "</ul></div>";
      },
    },
    {
      id: "whole",
      robi: "ukazuje",
      speech: "Dokážeš pripraviť celý postup skôr, než sa pohneš? Ukážeme si to.",
      render(host) {
        host.innerHTML =
          '<div class="slide">' +
          '<p class="kicker">Druhý spôsob</p>' +
          "<h1>Celý program naraz</h1>" +
          '<div class="split">' +
          '<article class="col"><h2>Predtým</h2><p>Choď doprava. Teraz skoč. Teraz choď doľava. Každý pokyn hneď.</p></article>' +
          '<article class="col yes"><h2>Teraz</h2><p>Najprv poskladáš všetky príkazy. Potom stlačíš Spusti program a len sleduješ.</p></article>' +
          "</div>" +
          '<p class="question whole-q">Dokáže Robi podľa programu nájsť súčiastku sám?</p>' +
          '<button type="button" class="big-go go-xl" data-go>Pripraviť program</button>' +
          "</div>";
        goButton(host);
      },
    },
    {
      id: "game-program",
      game: true,
      robi: "ukazuje",
      speech: null,
      render(host) {
        const done = state.games.program;
        ctx.lock(!done, "Najprv spustíme celý program a nájdeme súčiastky.");
        const game = window.RobiGame.mount(host, {
          mode: "program",
          onHint: (text, pose) => say(text, pose),
          onComplete: () => {
            state.games.program = true;
            persist();
            ctx.lock(false);
          },
          onAdvance: () => ctx.forceNext(),
        });
        return () => game.destroy();
      },
    },
    {
      id: "created",
      robi: "uhadol",
      speech: "Tentoraz ste mi nedávali pokyny jeden po druhom. Najskôr ste pripravili celý program!",
      render(host) {
        const cmds = ["➡️", "➡️", "⬆️", "➡️", "✋"];
        host.innerHTML =
          '<div class="slide airy">' +
          '<p class="kicker">Čo sme vytvorili</p>' +
          "<h1>Najprv program, potom spustenie</h1>" +
          '<div class="program-demo">' +
          cmds.map((c, i) => '<span style="--d:' + i + '">' + c + "</span>").join("") +
          "</div>" +
          '<div class="chain">' +
          '<span class="pill">👤 My<small>premýšľame, čo chceme</small></span>' +
          '<span class="formula-arrow">→</span>' +
          '<span class="pill">📜 Program<small>pokyny v správnom poradí</small></span>' +
          '<span class="formula-arrow">→</span>' +
          '<span class="pill">▶️ Spustenie<small>program spustíme</small></span>' +
          '<span class="formula-arrow">→</span>' +
          '<span class="pill">🤖 Počítač<small>vykoná ich jeden po druhom</small></span>' +
          '<span class="formula-arrow">→</span>' +
          '<span class="pill">🎯 Výsledok<small>Robi dôjde k cieľu</small></span>' +
          "</div></div>";
      },
    },
    {
      id: "programming",
      robi: "uhadol",
      speech: "A presne takto začína skutočné programovanie!",
      render(host) {
        host.innerHTML =
          '<div class="slide hero airy">' +
          '<p class="kicker">Dôležitá vec</p>' +
          '<h1 class="question">Toto už je programovanie!</h1>' +
          '<p class="quote">Nevravíme počítaču, čo má robiť práve teraz. Najskôr pripravíme celý postup a potom ho necháme vykonať.</p>' +
          '<p class="lead">Program je postupnosť pokynov, ktoré počítač vykoná v určenom poradí.</p>' +
          "</div>";
      },
    },
    {
      id: "recap",
      robi: "ukazuje",
      speech: "Poďme si ešte raz pripomenúť, čo všetko sme dnes objavili.",
      render(host) {
        const cards = [
          ["🖥️", "Čo je počítač", "Zariadenie, ktoré prijme informácie, spracuje ich a vytvorí výsledok."],
          ["💻", "Počítače sú všade", "Nemusia vyzerať ako krabica. Môžu byť v mobile, hodinkách, aute aj práčke."],
          ["📜", "Čo je program", "Postupnosť pokynov. Počítač ich vykoná v určenom poradí."],
          ["🤖", "Naprogramovali sme Robiho", "Najprv po jednom príkaze, potom celý program naraz: ➡️ ➡️ ⬆️ ➡️ ✋"],
        ];
        host.innerHTML =
          '<div class="slide airy">' +
          '<p class="kicker">Zhrnutie</p>' +
          "<h1>Čo sme sa dnes naučili</h1>" +
          '<div class="cards">' +
          cards.map((c) => '<article class="card"><span class="card-ico">' + c[0] + "</span><h3>" + c[1] + "</h3><p>" + c[2] + "</p></article>").join("") +
          "</div></div>";
      },
    },
    {
      id: "equation",
      robi: "uhadol",
      speech: "Toto si vezmi so sebou. Je to úplný začiatok programovania!",
      render(host) {
        host.innerHTML =
          '<div class="slide hero airy">' +
          '<p class="kicker">Dnes už vieme</p>' +
          formula(["🖥️ Počítač", "📜 Program", "👉 Pokyny", "🎯 Výsledok"], "xl") +
          '<p class="lead">Takto vzniká výsledok, ktorý od počítača chceme.</p>' +
          "</div>";
      },
    },
    {
      id: "bye",
      robi: "premysla",
      speech: "Dnes ste mi veľmi pomohli. Čo sa asi ukrýva vo vnútri počítača?",
      render(host) {
        host.innerHTML =
          '<div class="slide hero compact airy">' +
          '<p class="kicker">To je na dnes všetko</p>' +
          "<h1>Vidíme sa nabudúce</h1>" +
          '<div class="parts"><img src="obrazky/component_tile.png" alt=""><img src="obrazky/component_tile.png" alt=""><img src="obrazky/component_tile.png" alt=""><img src="obrazky/component_tile.png" alt=""></div>' +
          '<ul class="goals" style="width:min(640px,100%)">' +
          "<li><span>🖥️</span>Počítače dokážu spracúvať informácie</li>" +
          "<li><span>📜</span>Program je postupnosť pokynov</li>" +
          "<li><span>🤖</span>Počítač vykonáva pokyny podľa programu</li>" +
          "<li><span>💻</span>Programovať sa môže naučiť každý</li>" +
          "</ul>" +
          '<article class="next-card"><p>2. lekcia</p><h2>Čo sa ukrýva vo vnútri počítača?</h2><p>Priprav sa. Čaká nás výprava dovnútra počítača.</p></article>' +
          '<button type="button" class="ghost" id="restart">Začať lekciu od začiatku</button>' +
          "</div>";
        host.querySelector("#restart").addEventListener("click", restart);
        burst(host);
      },
    },
  ];

  if (state.slide < 0 || state.slide >= slides.length) state.slide = 0;
  if (state.quiz.i < 0 || state.quiz.i >= QUIZ.length) state.quiz.i = 0;

  const ctx = {
    state,
    say,
    persist,
    lock(on, reason) {
      nextLocked = !!on;
      lockReason = reason || "Najprv dokonči túto časť.";
      btnNext.classList.toggle("is-disabled", nextLocked);
      btnNext.setAttribute("aria-disabled", nextLocked ? "true" : "false");
    },
    next: requestNext,
    forceNext() {
      completeTyping();
      if (nextLocked) {
        showToast(lockReason);
        nudgeNext();
        return;
      }
      go(1);
    },
  };

  function updateChrome() {
    const last = index === slides.length - 1;
    counterEl.textContent = index + 1 + " / " + slides.length;
    progressEl.style.width = (slides.length === 1 ? 100 : (index / (slides.length - 1)) * 100) + "%";
    btnPrev.classList.toggle("is-disabled", navFrozen || index === 0);
    nextLabel.textContent = last ? "Od začiatku" : "Ďalej";
    document.body.dataset.slide = slides[index].id;
  }

  function show(i) {
    cleanup();
    cleanup = function () {};
    index = i;
    state.slide = i;
    const slide = slides[i];
    currentText = "";
    typeToken += 1;
    clearTimeout(typeTimer);
    setTyping(false);
    setRobi(slide.robi || "neutralny");
    ctx.lock(false);
    slideHost.classList.toggle("is-game", !!slide.game);
    slideHost.innerHTML = "";
    if (slide.speech) say(slide.speech, slide.robi);
    const ret = slide.render(slideHost, ctx);
    if (typeof ret === "function") cleanup = ret;
    slideHost.classList.remove("enter");
    void slideHost.offsetWidth;
    slideHost.classList.add("enter");
    updateChrome();
    persist();
  }

  function go(delta) {
    const next = index + delta;
    if (next < 0 || next >= slides.length) return;
    show(next);
  }

  function requestNext() {
    if (navFrozen) return;
    if (completeTyping()) return;
    if (index === slides.length - 1) {
      restart();
      return;
    }
    if (nextLocked) {
      showToast(lockReason);
      nudgeNext();
      return;
    }
    go(1);
  }

  function requestPrev() {
    if (navFrozen || index === 0) return;
    completeTyping();
    go(-1);
  }

  function restart() {
    state.slide = 0;
    state.quiz = { i: 0, answers: [] };
    state.games = { live: false, program: false };
    show(0);
  }

  function slideIndexById(id) {
    return slides.findIndex((slide) => slide.id === id);
  }

  function debugGo(target) {
    if (target < 0 || target >= slides.length) return;
    navFrozen = false;
    const quizIdx = slideIndexById("quiz");
    const resultsIdx = slideIndexById("results");
    const liveIdx = slideIndexById("game-live");
    const programIdx = slideIndexById("game-program");
    if (target >= resultsIdx && resultsIdx >= 0) {
      state.quiz.answers = QUIZ.map((q) => ({
        id: q.id,
        choice: q.answer,
        correct: true,
        revealed: true,
      }));
      state.quiz.i = QUIZ.length - 1;
    } else if (target === quizIdx) {
      state.quiz = { i: 0, answers: [] };
    }
    if (liveIdx >= 0 && target > liveIdx) state.games.live = true;
    if (programIdx >= 0 && target > programIdx) state.games.program = true;
    show(target);
    ctx.lock(false);
  }

  function openDebugJump() {
    const raw = window.prompt(
      "Debug: zadaj číslo slajdu (1–" + slides.length + ")",
      String(index + 1)
    );
    if (raw == null) return;
    const n = parseInt(String(raw).trim(), 10);
    if (!Number.isFinite(n) || n < 1 || n > slides.length) {
      showToast("Zadaj číslo od 1 do " + slides.length + ".");
      return;
    }
    debugGo(n - 1);
  }

  function applySound() {
    document.body.dataset.sound = state.sound;
    btnSound.textContent = state.sound === "off" ? "🔇" : "🔊";
    btnSound.setAttribute("aria-label", state.sound === "off" ? "Zapnúť zvuk" : "Vypnúť zvuk");
  }

  ["pozdrav", "neutralny", "premysla", "uhadol", "ukazuje"].forEach((pose) => {
    const img = new Image();
    img.src = "obrazky/robi_" + pose + ".png";
  });

  btnNext.addEventListener("click", requestNext);
  btnPrev.addEventListener("click", requestPrev);
  speechBox.addEventListener("click", () => completeTyping());
  btnSound.addEventListener("click", () => {
    state.sound = state.sound === "off" ? "on" : "off";
    applySound();
    persist();
  });
  btnFull.addEventListener("click", () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen();
    }
  });

  let debugTaps = 0;
  let debugTapTimer = 0;
  window.addEventListener("keydown", (e) => {
    if (e.repeat) return;
    if (e.target && e.target.closest && e.target.closest("input, textarea, select, [contenteditable='true']")) {
      return;
    }

    if (e.key === "d" || e.key === "D") {
      e.preventDefault();
      debugTaps += 1;
      clearTimeout(debugTapTimer);
      if (debugTaps >= 3) {
        debugTaps = 0;
        openDebugJump();
        return;
      }
      debugTapTimer = setTimeout(() => { debugTaps = 0; }, 900);
      return;
    }

    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    if (e.key === "ArrowRight") requestNext();
    else requestPrev();
  });

  let touchX = null;
  document.getElementById("stage").addEventListener("touchstart", (e) => {
    if (e.target.closest("button, .game, .quiz, .tabs, .choices")) {
      touchX = null;
      return;
    }
    touchX = e.changedTouches[0].clientX;
  }, { passive: true });
  document.getElementById("stage").addEventListener("touchend", (e) => {
    if (touchX == null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    touchX = null;
    if (dx > 70) requestPrev();
    else if (dx < -70) requestNext();
  }, { passive: true });

  applySound();
  show(state.slide);
})();
