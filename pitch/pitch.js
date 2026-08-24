(() => {
  const TOTAL = 11;
  const NOTES = {
    1: "The pastor just hosts. We run the weekday school. No bill. Not Sunday software.",
    2: "Elder boards will not open on hope. An unsigned year is how a church gets hurt.",
    3: "The pastor just hosts. We take the year. Signed money, or the door stays shut.",
    4: "Pastor glances. We run campus and morning. Family enrolls with no bill.",
    5: "Three facts: no bill; signed money or the door stays shut; Florida first, Texas waits.",
    6: "Build the weekday operating system. License academics. Church staff do not live in vendor consoles.",
    7: "K–5 never logs in. 6–8 only if needed, and tightly. The church’s confession is theirs; we do not write it.",
    8: "Company, operator, capital. Keep them apart so the year is not sold as software rent.",
    9: "About −$125k at 60 ESA-only seats. Break-even near 96. Past 800 attendance, or you pay to find families.",
    10: "Wrong category on purpose. The shelf is the weekday school of record.",
    11: "Ask: walk an empty Florida wing, then sit a morning. One campus. Signed gifts. A door that stays shut until coverage is real.",
  };

  const deck = document.getElementById("deck");
  const stage = document.getElementById("stage");
  const notesEl = document.getElementById("notes");
  const notesBody = document.getElementById("notes-body");
  const beatLabel = document.getElementById("beat-label");
  const dotsEl = document.getElementById("dots");
  const slides = [...document.querySelectorAll(".slide")];

  let index = 1;
  let notesOn = false;
  let touchX = null;

  function clamp(n) {
    return Math.min(TOTAL, Math.max(1, n));
  }

  function readHash() {
    const n = Number((location.hash || "").replace("#", ""));
    return Number.isFinite(n) && n >= 1 && n <= TOTAL ? n : 1;
  }

  function show(n) {
    const next = clamp(n);
    slides.forEach((slide) => {
      const on = Number(slide.dataset.slide) === next;
      slide.hidden = !on;
      slide.classList.toggle("is-on", on);
    });
    index = next;
    const current = slides[index - 1];
    deck.dataset.beat = String(index);
    beatLabel.textContent = current.dataset.beat || "";
    notesBody.textContent = NOTES[index];
    notesEl.hidden = !notesOn;
    dotsEl.querySelectorAll("button").forEach((btn, i) => {
      btn.setAttribute("aria-current", i + 1 === index ? "true" : "false");
    });
    const url = new URL(location.href);
    url.hash = String(index);
    const nextUrl = `${url.pathname}${url.search}${url.hash}`;
    if (`${location.pathname}${location.search}${location.hash}` !== nextUrl) {
      history.replaceState(null, "", nextUrl);
    }
  }

  dotsEl.innerHTML = Array.from({ length: TOTAL }, (_, i) => {
    const n = i + 1;
    return `<li><button type="button" data-to="${n}" aria-label="Slide ${n} of ${TOTAL}"></button></li>`;
  }).join("");

  document.querySelectorAll("[data-go]").forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.stopPropagation();
      show(index + (btn.dataset.go === "next" ? 1 : -1));
    });
  });

  dotsEl.addEventListener("click", (event) => {
    const to = event.target.closest("[data-to]");
    if (!to) return;
    event.stopPropagation();
    show(Number(to.dataset.to));
  });

  stage.addEventListener("click", (event) => {
    if (event.target.closest("a, button")) return;
    const mid = stage.getBoundingClientRect().left + stage.clientWidth / 3;
    show(index + (event.clientX < mid ? -1 : 1));
  });

  window.addEventListener("keydown", (event) => {
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    const key = event.key;
    if (key === "ArrowRight" || key === " " || key === "PageDown") {
      event.preventDefault();
      show(index + 1);
    } else if (key === "ArrowLeft" || key === "Backspace" || key === "PageUp") {
      event.preventDefault();
      show(index - 1);
    } else if (key === "Home") {
      show(1);
    } else if (key === "End") {
      show(TOTAL);
    } else if (key === "n" || key === "N") {
      notesOn = !notesOn;
      notesEl.hidden = !notesOn;
    }
  });

  stage.addEventListener(
    "touchstart",
    (event) => {
      touchX = event.changedTouches[0].clientX;
    },
    { passive: true }
  );

  stage.addEventListener("touchend", (event) => {
    if (touchX == null) return;
    const dx = event.changedTouches[0].clientX - touchX;
    touchX = null;
    if (Math.abs(dx) < 40) return;
    show(index + (dx < 0 ? 1 : -1));
  });

  window.addEventListener("hashchange", () => show(readHash()));

  if (new URLSearchParams(location.search).get("notes") === "1") notesOn = true;
  show(readHash());
  stage.focus({ preventScroll: true });
})();
