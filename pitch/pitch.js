(() => {
  const NOTES = {
    1: "The pastor just hosts. We run the weekday school. Families never see a bill.",
    2: "Problem only. The last line is elder fear — not our model. They will not open on hope.",
    3: "Wind-down on the face: families and church share notice. Church does not inherit a school office. We take the close.",
    4: "Two jobs, not one Monday. Before the doors open: signed money, deposit, safety, facility and a clean close, family never billed, families and staff say yes to what this church believes. Every school day: pastor just hosts; we run the morning — formation we own, math licensed out and back, younger kids don’t get an account.",
    5: "Deposit money sits before we hire or build. Signed money, or the door stays shut.",
    6: "Fingerprints, screening, child-safety, compliance — we run it every week. Not a volunteer chore.",
    7: "Families and staff say yes to what this church believes before the weekday starts. We don’t write the confession. Still required — not a form we invent.",
    8: "Younger kids don’t get an account. A parent or guide holds the morning. Optional older-kid login is small and watched.",
    9: "Formation morning versus licensed math. We build the morning. The church never sits in those tools.",
    10: "Monday is a loop: formation goal, plain-language reflection, licensed mastery trip out and back, Return. We don’t own the math engine and we don’t grade mastery. No fake scores.",
    11: "Company, operator, capital. The operator owns the year and the close.",
    12: "ESA is portable school scholarship dollars families already hold — Florida. An ESA-only campus is a six-figure hole. About 96 seats closes it on ESA alone. We only open where the church can fill the room (800+ weekly) — or we budget real CAC. Soft pledges don’t count.",
    13: "Turnkey is people + pack, not software margin. A real weekday team each campus. −$125k / ~96 / 800+ still hold. Soft interest never greens a campus.",
    14: "Wrong category. The weekday school — not church software.",
    15: "We rent the engine and own the school day. Not an Alpha clone. Church-hosted school of record plus the formation morning we build. Licensed deep-links. Brand open, build-versus-buy locked.",
    16: "See the morning. Empty Wing is the live weekday walk. This deck is the job and the economics.",
    17: "Ask: walk an empty Florida wing. Signed money. We take the close. Then sit a morning.",
  };

  const deck = document.getElementById("deck");
  const stage = document.getElementById("stage");
  const notesEl = document.getElementById("notes");
  const notesBody = document.getElementById("notes-body");
  const beatLabel = document.getElementById("beat-label");
  const dotsEl = document.getElementById("dots");
  const slides = [...document.querySelectorAll(".slide")];
  const TOTAL = slides.length;

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
      slide.hidden = true;
      slide.classList.remove("is-on");
      slide.setAttribute("aria-hidden", "true");
    });
    void stage.offsetHeight;
    const current = slides[next - 1];
    current.hidden = false;
    current.classList.add("is-on");
    current.removeAttribute("aria-hidden");
    index = next;
    deck.dataset.beat = String(index);
    deck.classList.toggle("is-open", index === 1);
    deck.classList.toggle("is-close", index === TOTAL);
    deck.classList.toggle("is-fear", current.dataset.beat === "The refusal");
    deck.classList.toggle("is-door", current.dataset.beat === "The door");
    beatLabel.textContent = current.dataset.beat || "";
    notesBody.textContent = NOTES[index] || "";
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
