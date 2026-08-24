(() => {
  const TOTAL = 11;
  const NOTES = {
    1: "Church-hosted K–8 weekday school of record. Not Planning Center, Sunday check-in, a church LMS, or family billing SaaS.",
    2: "The refusal is fiduciary, not aesthetic. Soft interest and volunteer hours are not coverage.",
    3: "Host-thin / Ops-thick / Family Path A. Product = take the year-risk off the elder board.",
    4: "Host portal is thin. Campus, compliance, and families live on Discipl. Formation OS is the morning — not a content store.",
    5: "Open-gate: signed instruments only (thin funding_commitments). Escrow, facility, wind-down, and current SoF assents also required. Florida first; Texas HOLD.",
    6: "Build the operating system. License academics. Church staff do not live in vendor consoles.",
    7: "K–5 never logs in. 6–8 may, constrained. SoF assent is required; confession text is not invented here.",
    8: "C-Corp / 501(c)(3) ops / capital vehicle. Do not flatten this to SaaS ARR.",
    9: "Honest campus math: about −$125k at 60 ESA-only; breakeven near 96; 800+ attendance or real CAC. Numbers still unsigned.",
    10: "Wrong category on purpose. We are the weekday operator, not church software.",
    11: "Watermark stands until Kevin signs SoF, funders, and numbers. No raise size. No named pilot.",
  };

  const stage = document.getElementById("stage");
  const notesEl = document.getElementById("notes");
  const notesBody = document.getElementById("notes-body");
  const countNow = document.getElementById("count-now");
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

  function paint(n, pushHash) {
    index = clamp(n);
    slides.forEach((slide) => {
      const on = Number(slide.dataset.slide) === index;
      slide.classList.toggle("is-on", on);
      slide.hidden = !on;
    });
    countNow.textContent = String(index);
    dotsEl.querySelectorAll("button").forEach((btn, i) => {
      btn.setAttribute("aria-current", i + 1 === index ? "true" : "false");
    });
    notesBody.textContent = NOTES[index];
    notesEl.hidden = !notesOn;
    if (pushHash !== false && location.hash !== `#${index}`) {
      history.replaceState(null, "", `#${index}`);
    }
  }

  function go(delta) {
    paint(index + delta);
  }

  dotsEl.innerHTML = Array.from({ length: TOTAL }, (_, i) => {
    const n = i + 1;
    return `<li><button type="button" data-to="${n}" aria-label="Go to slide ${n}"></button></li>`;
  }).join("");

  document.querySelectorAll("[data-go]").forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.stopPropagation();
      go(btn.dataset.go === "next" ? 1 : -1);
    });
  });

  dotsEl.addEventListener("click", (event) => {
    const to = event.target.closest("[data-to]");
    if (!to) return;
    event.stopPropagation();
    paint(Number(to.dataset.to));
  });

  stage.addEventListener("click", (event) => {
    if (event.target.closest("a, button")) return;
    const mid = stage.getBoundingClientRect().left + stage.clientWidth / 3;
    go(event.clientX < mid ? -1 : 1);
  });

  window.addEventListener("keydown", (event) => {
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    const key = event.key;
    if (key === "ArrowRight" || key === " " || key === "PageDown") {
      event.preventDefault();
      go(1);
    } else if (key === "ArrowLeft" || key === "Backspace" || key === "PageUp") {
      event.preventDefault();
      go(-1);
    } else if (key === "Home") {
      paint(1);
    } else if (key === "End") {
      paint(TOTAL);
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

  stage.addEventListener(
    "touchend",
    (event) => {
      if (touchX == null) return;
      const dx = event.changedTouches[0].clientX - touchX;
      touchX = null;
      if (Math.abs(dx) < 40) return;
      go(dx < 0 ? 1 : -1);
    },
    { passive: true }
  );

  window.addEventListener("hashchange", () => paint(readHash(), false));

  const startNotes = new URLSearchParams(location.search).get("notes");
  if (startNotes === "1") notesOn = true;
  paint(readHash(), true);
  stage.focus({ preventScroll: true });
})();
