(() => {
  const STORE = "discipl_empty_wing";
  const TITLE_MS = 10000;
  const GLANCE_MS = 10000;

  const FORBIDDEN = [
    "Path A",
    "ADR-0004",
    "funding_commitments",
    "5-min VC",
    "5-minute VC",
    "5-MIN VC",
    "Story beat",
    "STORY BEAT",
    "Surface split",
    "Buy the LMS",
    "Sunday parked",
    "SoF-as-code",
    "Host portal",
    "mock-log",
    "Mock log",
    "coverage_short",
    "escrow_incomplete",
    "facility_unsigned",
    "wind_down_unsigned",
    "sof_stale",
    "Pay now",
    "Amount due",
    "Your tuition",
    "Balance due",
    "Family share",
    "Sponsor this seat",
    "Find a donor",
    "Become a sponsor",
    "@example.com",
    "campus_hlf",
    "Daniel → Camille → Naomi → Eli",
    "Daniel→Camille",
  ];

  const defaultWorld = {
    operatorApproved: false,
    facilitySigned: false,
    windDownSigned: false,
    escrowComplete: false,
    closingCommitmentRecorded: false,
    campusOpen: false,
    beliefsAffirmed: false,
    scholarshipAttached: false,
    enrolled: false,
    completedOnce: false,
    beat: "title",
    naomiStep: 0,
  };

  const seed = {
    campus: "Harbor Light",
    church: "Harbor Light Fellowship",
    city: "Jacksonville",
    seats: 12,
    charged: 24000,
    fair: 48000,
    yearCost: 575000,
    pledged: 476000,
    signedGift: 99000,
    continuity: "Camille",
    rooms: "Rooms 101–108, and the fellowship hall on Tuesdays.",
    hours: "Monday–Friday, 7:30 in the morning to 3:30 in the afternoon.",
    children: ["Eli", "Maya"],
    parent: "Naomi",
    pastor: "Daniel",
    director: "Camille",
    guide: "Mateo",
  };

  const ui = {
    titleStarted: 0,
    glanceStarted: 0,
    mathOpen: false,
    askedCoach: false,
    returnedFromMath: false,
  };

  let titleTimer = 0;
  let titleTick = 0;
  let glanceTimer = 0;
  let glanceTick = 0;
  let toastTimer = 0;

  function load() {
    try {
      return { ...defaultWorld, ...JSON.parse(sessionStorage.getItem(STORE) || "{}") };
    } catch {
      return { ...defaultWorld };
    }
  }

  function save(world) {
    sessionStorage.setItem(STORE, JSON.stringify(world));
  }

  function patch(partial) {
    save({ ...load(), ...partial });
    draw();
  }

  function money(n) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(n);
  }

  function pledgedNow(world) {
    return seed.pledged + (world.closingCommitmentRecorded ? seed.signedGift : 0);
  }

  function shortfalls(world) {
    const list = [];
    if (pledgedNow(world) < seed.yearCost) {
      list.push("Signed gifts do not yet cover what it costs to run the year.");
    }
    if (!world.escrowComplete) {
      list.push("The deposit that lets hiring begin is not yet in place.");
    }
    if (!world.facilitySigned) {
      list.push("The rooms agreement with the church is not signed.");
    }
    if (!world.windDownSigned) {
      list.push("The wind-down promise — how families and the church are told if this ends — is not signed.");
    }
    return list;
  }

  function canOpen(world) {
    return shortfalls(world).length === 0;
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  function btn(label, action, extra = "") {
    return `<button type="button" class="btn ${extra}" data-action="${action}">${label}</button>`;
  }

  function flash(message) {
    const el = document.getElementById("toast");
    if (!el) return;
    el.hidden = false;
    el.textContent = message;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      el.hidden = true;
    }, 2800);
  }

  function prefersReduce() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function stopTitle() {
    clearTimeout(titleTimer);
    clearInterval(titleTick);
    titleTimer = 0;
    titleTick = 0;
    ui.titleStarted = 0;
  }

  function stopGlance() {
    clearTimeout(glanceTimer);
    clearInterval(glanceTick);
    glanceTimer = 0;
    glanceTick = 0;
    ui.glanceStarted = 0;
  }

  function tickClocks() {
    const clock = document.querySelector(".wing__clock > i");
    if (clock && ui.titleStarted) {
      clock.style.width = `${Math.min(100, ((Date.now() - ui.titleStarted) / TITLE_MS) * 100)}%`;
    }
    const bar = document.querySelector(".bar > i");
    if (bar && ui.glanceStarted) {
      bar.style.width = `${Math.min(100, ((Date.now() - ui.glanceStarted) / GLANCE_MS) * 100)}%`;
    }
    const live = document.querySelector("[data-glance-left]");
    if (live && ui.glanceStarted) {
      const left = Math.max(0, Math.ceil((GLANCE_MS - (Date.now() - ui.glanceStarted)) / 1000));
      live.textContent = `Winding down — ${left}s. Continuity stays with ${seed.continuity}. No child list leaves this building.`;
    }
  }

  function beginTape() {
    stopTitle();
    patch({ beat: "daniel" });
  }

  function armTitle() {
    stopTitle();
    if (prefersReduce()) return;
    ui.titleStarted = Date.now();
    titleTick = setInterval(tickClocks, 120);
    titleTimer = setTimeout(beginTape, TITLE_MS);
  }

  function playGlance() {
    stopGlance();
    ui.glanceStarted = Date.now();
    glanceTick = setInterval(tickClocks, 120);
    glanceTimer = setTimeout(() => {
      stopGlance();
      flash("Notice given. The church still does not run the school.");
      draw();
    }, GLANCE_MS);
    draw();
  }

  function resetWorld() {
    stopTitle();
    stopGlance();
    ui.mathOpen = false;
    ui.askedCoach = false;
    ui.returnedFromMath = false;
    save({ ...defaultWorld, completedOnce: false, beat: "title" });
    draw();
  }

  function goBeat(beat) {
    stopTitle();
    stopGlance();
    ui.mathOpen = false;
    patch({ beat });
  }

  function renderTitle(world) {
    const started = ui.titleStarted || Date.now();
    if (!ui.titleStarted) queueMicrotask(armTitle);
    const pct = Math.min(100, ((Date.now() - started) / TITLE_MS) * 100);
    return `
      <section class="wing" aria-label="An empty education wing">
        <div class="wing__light" aria-hidden="true"></div>
        <div class="wing__hall" aria-hidden="true"></div>
        <div class="wing__floor" aria-hidden="true"></div>
        <div class="wing__window" aria-hidden="true"></div>
        <div class="wing__chairs" aria-hidden="true"></div>
        <div class="wing__copy">
          <p class="wing__mark">Discipl</p>
          <div class="wing__lines">
            <p class="wing__line is-in">The education wing is empty, Monday through Friday.</p>
            <p class="wing__line is-in">The church hosts the rooms. Discipl runs the weekday school.</p>
            <p class="wing__line is-in">A pastor glances. A director will not open on hope. A mother never sees a bill.</p>
          </div>
          <div class="wing__actions">
            ${btn("Begin", "begin", "btn--ghost")}
            ${
              prefersReduce()
                ? ""
                : `<div class="wing__clock" aria-hidden="true"><i style="width:${pct}%"></i></div>`
            }
          </div>
        </div>
      </section>`;
  }

  function renderDaniel(world) {
    const signed = world.facilitySigned && world.windDownSigned;
    const ready = world.operatorApproved && signed;
    const live = Boolean(ui.glanceStarted);
    const pct = live ? Math.min(100, ((Date.now() - ui.glanceStarted) / GLANCE_MS) * 100) : 0;
    const left = live ? Math.max(0, Math.ceil((GLANCE_MS - (Date.now() - ui.glanceStarted)) / 1000)) : 0;

    return `
      <article class="day enter">
        <p class="kicker">Pastor ${escapeHtml(seed.pastor)}</p>
        <h1>You host the wing. You are not the school.</h1>
        <p class="lede">A glance, not an office. The school desk lives somewhere else. There is no child list here.</p>

        <div class="grid grid-3">
          <section class="card">
            <h2>This campus</h2>
            <p class="metric">${world.campusOpen ? "Open" : "Not open yet"}</p>
            <p>${escapeHtml(seed.campus)} · ${escapeHtml(seed.city)}</p>
          </section>
          <section class="card">
            <h2>Children on roll</h2>
            <p class="metric">${seed.seats}</p>
            <p>A number only. No names. No roster.</p>
          </section>
          <section class="card">
            <h2>The rooms</h2>
            <p>${escapeHtml(seed.rooms)}</p>
            <p>${escapeHtml(seed.hours)}</p>
          </section>
        </div>

        <div class="grid grid-2">
          <section class="card">
            <h2>What the church charges</h2>
            <p>Fair value for this use, beside what Discipl actually pays. The difference is not a blank credit.</p>
            <dl>
              <div class="pair"><dt>Charged to Discipl</dt><dd>${money(seed.charged)}</dd></div>
              <div class="pair"><dt>Fair market value</dt><dd>${money(seed.fair)}</dd></div>
            </dl>
          </section>
          <section class="card ${live ? "glance-live" : ""}">
            <h2>If this ever ends</h2>
            <p>Families and the church share the same notice. Someone named keeps the children. The church is not left with a school office to run.</p>
            ${
              live
                ? `<p class="note note--warn" data-glance-left>Winding down — ${left}s. Continuity stays with ${escapeHtml(seed.continuity)}. No child list leaves this building.</p>
                   <div class="bar" aria-hidden="true"><i style="width:${pct}%"></i></div>`
                : ""
            }
            <div class="row">
              ${live ? "" : btn("Watch the wind-down", "glance", "btn--paper")}
            </div>
          </section>
        </div>

        <section class="card" style="margin-top:1rem">
          <h2>Before the weekday can begin</h2>
          <p>Approve Discipl as the operator. Sign the rooms, including how this ends.</p>
          <div class="row">
            ${
              world.operatorApproved
                ? `<span class="note note--ok">Discipl is the weekday operator.</span>`
                : btn("Approve Discipl as operator", "approve")
            }
            ${
              signed
                ? `<span class="note note--ok">Rooms and wind-down are signed.</span>`
                : btn("Sign the rooms agreement", "sign", world.operatorApproved ? "" : "btn--paper")
            }
          </div>
        </section>

        <div class="row">
          ${ready ? btn("Continue", "to-camille") : `<button type="button" class="btn" disabled>Continue</button>`}
        </div>
        ${ready ? "" : `<p class="lede">Approve and sign, then we walk to the director.</p>`}
      </article>`;
  }

  function renderCamille(world) {
    const blocked = shortfalls(world);
    const open = world.campusOpen;
    const clear = canOpen(world);

    return `
      <article class="day enter">
        <p class="kicker">${escapeHtml(seed.director)}, campus director</p>
        <h1>${open ? "The campus is open." : "The door stays shut."}</h1>
        <p class="lede">${
          open
            ? "Every promise that had to be true, is true."
            : "Soft interest cannot pass. A handshake is not a gift."
        }</p>

        <div class="grid grid-2">
          <div class="door ${open ? "is-open" : ""}" aria-hidden="true">
            <div class="door__panel"></div>
            <div class="door__knob"></div>
            <p class="door__word">${open ? "Open." : "Not yet."}</p>
          </div>
          <section class="card">
            <h2>${open ? "What cleared" : "What is still short"}</h2>
            ${
              blocked.length
                ? `<ul class="reasons">${blocked
                    .map((line) => `<li>${escapeHtml(line)}</li>`)
                    .join("")}</ul>`
                : `<ul class="reasons">
                    <li class="is-clear">Signed gifts cover the year.</li>
                    <li class="is-clear">The hiring deposit is in place.</li>
                    <li class="is-clear">The rooms and the ending are signed.</li>
                  </ul>`
            }
            <div class="row">
              ${
                world.closingCommitmentRecorded
                  ? ""
                  : btn("Record a signed commitment", "commit")
              }
              ${
                clear && !open
                  ? btn("Open the campus", "open")
                  : ""
              }
              ${open ? "" : btn("Count a verbal pledge", "soft", "btn--paper")}
            </div>
            ${
              clear && !open
                ? `<p>The books are clear. Opening is a decision, not a mood.</p>`
                : ""
            }
          </section>
        </div>

        <div class="row">
          ${open ? btn("Continue", "to-naomi") : ""}
        </div>
      </article>`;
  }

  function renderNaomi(world) {
    const step = world.naomiStep;
    const marks = [0, 1, 2, 3, 4]
      .map((i) => `<i class="${i <= step ? "is-on" : ""}"></i>`)
      .join("");

    let body = "";
    if (step === 0) {
      body = `
        <h1>Good evening, ${escapeHtml(seed.parent)}.</h1>
        <p class="lede">Enroll from your phone. There is no bill on this walk.</p>
        <p>Household for ${escapeHtml(seed.children.join(" and "))}. A browser is enough.</p>
        <div class="row">${btn("This is our household", "naomi-next")}</div>`;
    } else if (step === 1) {
      body = `
        <h1>Your children</h1>
        <p class="lede">First names only tonight.</p>
        ${seed.children.map((name) => `<p class="note">${escapeHtml(name)}</p>`).join("")}
        <div class="row">
          ${btn("Back", "naomi-back", "btn--paper")}
          ${btn("Continue", "naomi-next")}
        </div>`;
    } else if (step === 2) {
      body = `
        <h1>What this campus believes</h1>
        <p class="lede">In human words: Jesus is Lord. Scripture is trusted. This church’s confession shepherds the weekday.</p>
        <label class="check">
          <input type="checkbox" data-belief="read" ${world.beliefsAffirmed ? "checked" : ""} />
          <span>I have read what this campus believes, and I affirm it for our family.</span>
        </label>
        <div class="row">
          ${btn("Back", "naomi-back", "btn--paper")}
          ${btn("I affirm these beliefs", "naomi-believe")}
        </div>`;
    } else if (step === 3) {
      body = `
        <h1>Attach a scholarship</h1>
        <p class="lede">A scholarship is how a seat is covered. You will not be asked for a card.</p>
        <p>${world.scholarshipAttached ? "Scholarship attached. The campus owns any gap." : "Nothing is attached yet."}</p>
        <div class="row">
          ${btn("Back", "naomi-back", "btn--paper")}
          ${btn(world.scholarshipAttached ? "Continue" : "Attach our scholarship", world.scholarshipAttached ? "naomi-next" : "naomi-aid")}
        </div>`;
    } else {
      body = `
        <div class="success-mark" aria-hidden="true">✓</div>
        <h1>You’re in. There is no bill.</h1>
        <p class="lede">${escapeHtml(seed.children.join(" and "))} are enrolled. The campus owns the cover. No one will invoice you.</p>
        <div class="row">${btn("Continue", "to-eli")}</div>`;
    }

    return `
      <div class="phone-wrap enter">
        <section class="phone" aria-label="Family enrollment on a phone">
          <div class="phone__notch" aria-hidden="true"></div>
          <div class="phone__body">
            <p class="kicker">Family</p>
            <div class="steps" aria-hidden="true">${marks}</div>
            ${body}
          </div>
        </section>
      </div>`;
  }

  function renderEli(world) {
    return `
      <article class="day enter">
        <p class="preview">Preview — with a parent</p>
        <p class="kicker">Monday morning</p>
        <h1>${escapeHtml(seed.children[0])}'s formation day</h1>
        <p class="lede">Walk this with a parent or a guide. A child does not log in. The morning is formation first.</p>

        <div class="grid grid-2">
          <section class="card">
            <h2>Today</h2>
            <div class="goal is-now"><b>1</b><div><strong>Morning liturgy</strong><p>A short gathered beginning. Practiced with ${escapeHtml(seed.guide)} or a parent.</p></div></div>
            <div class="goal"><b>2</b><div><strong>Formation hour</strong><p>Jesus-rooted practice. The campus keeps this close.</p></div></div>
            <div class="goal"><b>3</b><div><strong>Licensed math</strong><p>Numbers open in a tool Discipl does not have to build.</p></div></div>
          </section>
          <section class="card">
            <h2>Ask the campus coach</h2>
            <p>${escapeHtml(seed.guide)} stays inside what this campus believes.</p>
            <div class="chat">
              <p class="bubble bubble--ask">Which denomination should we pick?</p>
              ${
                ui.askedCoach
                  ? `<p class="bubble bubble--coach">I can’t go past what this campus has affirmed. I won’t pick a denomination. Ask your parent or ${escapeHtml(seed.guide)}.</p>`
                  : ""
              }
            </div>
            <div class="row">${btn(ui.askedCoach ? "Heard" : "Hear the coach", "coach", "btn--paper")}</div>
          </section>
        </div>

        <section class="card" style="margin-top:1rem">
          <h2>Open today’s math</h2>
          <p>A licensed classroom. Discipl remains the campus. The church does not live in that tool.</p>
          <div class="row">
            ${btn("Open the licensed tool", "math-open")}
            ${ui.askedCoach && ui.returnedFromMath ? btn("Continue", "to-close") : ""}
          </div>
        </section>
      </article>
      ${
        ui.mathOpen
          ? `<div class="math" role="dialog" aria-modal="true" aria-labelledby="math-title">
              <div class="math__board">
                <p class="kicker" style="color:#99f6e4">Licensed math</p>
                <h2 id="math-title" style="margin:.4rem 0 0;font-size:1.5rem;letter-spacing:-.03em">A quiet number lesson</h2>
                <p style="color:#b7c7c3">Place value. No shop. No points. No church office behind this screen.</p>
                <div class="math__grid" aria-hidden="true">
                  <span>10</span><span class="is-on">100</span><span>1,000</span>
                  <span>4 + 6</span><span class="is-on">10</span><span>40 + 60</span>
                  <span>½</span><span>⅓</span><span class="is-on">¼</span>
                </div>
                ${btn("Return to the morning", "math-close", "btn--ghost")}
              </div>
            </div>`
          : ""
      }`;
  }

  function renderClose(world) {
    return `
      <section class="wing" aria-label="The education wing again">
        <div class="wing__light" aria-hidden="true"></div>
        <div class="wing__hall" aria-hidden="true"></div>
        <div class="wing__floor" aria-hidden="true"></div>
        <div class="wing__window" aria-hidden="true"></div>
        <div class="wing__chairs" aria-hidden="true"></div>
        <div class="wing__copy">
          <p class="wing__mark">Discipl</p>
          <p class="close-line wing__line is-in">The wing fills on weekdays — without making the church the school, and without sending a mother a bill.</p>
          <div class="wing__actions">
            ${world.completedOnce ? btn("Walk again", "again", "btn--ghost") : ""}
          </div>
          ${
            world.completedOnce
              ? `<ul class="chapters" aria-label="Chapters">
                  <li><button type="button" data-action="to-title">The empty wing</button></li>
                  <li><button type="button" data-action="jump-daniel">Daniel’s glance</button></li>
                  <li><button type="button" data-action="jump-camille">Camille’s door</button></li>
                  <li><button type="button" data-action="jump-naomi">Naomi enrolls</button></li>
                  <li><button type="button" data-action="jump-eli">Eli’s morning</button></li>
                </ul>`
              : ""
          }
        </div>
      </section>`;
  }

  function page(world) {
    if (world.beat === "daniel") return renderDaniel(world);
    if (world.beat === "camille") return renderCamille(world);
    if (world.beat === "naomi") return renderNaomi(world);
    if (world.beat === "eli") return renderEli(world);
    if (world.beat === "close") return renderClose(world);
    return renderTitle(world);
  }

  function onAction(name) {
    const world = load();
    if (name === "reset") return resetWorld();
    if (name === "begin") return beginTape();
    if (name === "to-title") return goBeat("title");
    if (name === "glance") return playGlance();
    if (name === "approve") return patch({ operatorApproved: true });
    if (name === "sign") return patch({ facilitySigned: true, windDownSigned: true });
    if (name === "to-camille") {
      if (!world.operatorApproved || !world.facilitySigned || !world.windDownSigned) {
        flash("Approve Discipl and sign the rooms first.");
        return;
      }
      return goBeat("camille");
    }
    if (name === "soft") {
      flash("A verbal pledge is not a signed gift. The door stays shut.");
      return;
    }
    if (name === "commit") {
      return patch({
        closingCommitmentRecorded: true,
        escrowComplete: true,
      });
    }
    if (name === "open") {
      if (!canOpen(world)) {
        flash("The door opens only when nothing is short.");
        return;
      }
      return patch({ campusOpen: true });
    }
    if (name === "to-naomi") {
      if (!world.campusOpen) {
        flash("The campus is not open yet.");
        return;
      }
      return goBeat("naomi");
    }
    if (name === "naomi-next") return patch({ naomiStep: Math.min(4, world.naomiStep + 1) });
    if (name === "naomi-back") return patch({ naomiStep: Math.max(0, world.naomiStep - 1) });
    if (name === "naomi-believe") {
      return patch({ beliefsAffirmed: true, naomiStep: 3 });
    }
    if (name === "naomi-aid") {
      return patch({ scholarshipAttached: true, naomiStep: 4, enrolled: world.beliefsAffirmed });
    }
    if (name === "to-eli") {
      const enrolled = world.beliefsAffirmed && world.scholarshipAttached;
      save({ ...world, enrolled, beat: "eli" });
      return draw();
    }
    if (name === "coach") {
      ui.askedCoach = true;
      return draw();
    }
    if (name === "math-open") {
      ui.mathOpen = true;
      return draw();
    }
    if (name === "math-close") {
      ui.mathOpen = false;
      ui.returnedFromMath = true;
      return draw();
    }
    if (name === "to-close") {
      stopGlance();
      save({ ...world, beat: "close", completedOnce: true });
      return draw();
    }
    if (name === "again") {
      ui.askedCoach = false;
      ui.returnedFromMath = false;
      ui.mathOpen = false;
      save({
        ...defaultWorld,
        completedOnce: true,
        beat: "title",
      });
      return draw();
    }
    if (name === "jump-daniel") return goBeat("daniel");
    if (name === "jump-camille") return goBeat("camille");
    if (name === "jump-naomi") return goBeat("naomi");
    if (name === "jump-eli") return goBeat("eli");
  }

  function assertClean(html) {
    for (const phrase of FORBIDDEN) {
      if (html.includes(phrase)) {
        console.error("Friend chrome leaked a banned phrase:", phrase);
      }
    }
  }

  function draw() {
    const world = load();
    const root = document.getElementById("app");
    const showReset = world.beat !== "title";
    const html = `
      <div class="tape" data-beat="${escapeHtml(world.beat)}">
        <main id="main" class="tape__main">${page(world)}</main>
        ${
          showReset
            ? `<button type="button" class="quiet-reset" data-action="reset">Start over</button>`
            : ""
        }
      </div>`;
    assertClean(html);
    root.innerHTML = html;
  }

  document.addEventListener("click", (event) => {
    const target = event.target.closest("[data-action]");
    if (!target) return;
    event.preventDefault();
    const name = target.getAttribute("data-action");
    if (name === "begin") return beginTape();
    if (name === "to-title") {
      goBeat("title");
      return;
    }
    onAction(name);
  });

  document.addEventListener("change", (event) => {
    const box = event.target.closest("[data-belief]");
    if (!box) return;
    if (box.checked) patch({ beliefsAffirmed: true });
  });

  draw();
})();
