/* Friend-share fixture. Copy sourced from lib/prototype/copy.ts — do not invent Path A pay copy. */
(() => {
  const STORAGE_KEY = "discipl_prototype_demo";
  const THEME_KEY = "discipl_demo_theme";
  const FORBIDDEN_PATH_A = [
    "Pay now",
    "Amount due",
    "Your tuition",
    "Balance due",
    "Family share",
    "Sponsor this seat",
    "Find a donor",
    "Become a sponsor",
  ];

  const FAMILY_COPY = {
    enrollTitle: "Enroll your family",
    enrollSubtitle:
      "No tuition bill. Attach your scholarship and assent to the Statement of Faith.",
    scholarship: "Attach scholarship or ESA",
    covered: "Covered",
    gap: "A cover gap is owned by the campus — you will not be invoiced.",
    success: "You're enrolled. There is no amount due from you.",
    paymentAttempted: "Path A does not collect parent payment.",
  };

  const HOST_COPY = {
    statusPreOpen: "Not open yet",
    statusOpen: "Open",
    statusWindDown: "Winding down",
    approve: "Approve Discipl as operator",
    emptyHome: "Approve Discipl as the weekday operator to continue.",
    thinChrome:
      "Thin portal — glance only. No SIS, child roster, or funding editor.",
  };

  const DEMO_LABEL = "Demo";

  const FORMATION_COPY = {
    accepted:
      "Formation OS (ADR-0004 Accepted): K–5 preview; 6–8 optional learner",
    chrome:
      "Preview only · walk this with a parent or guide. This is not a child login.",
    eyebrow:
      "Formation OS (ADR-0004 Accepted): K–5 preview; 6–8 optional learner",
    title: (firstName) => `${firstName}'s day · K–5 preview`,
    goalsTitle: "Goals",
    goalsHint:
      "Stub list so the walkthrough can show formation targets. Not a live goal engine.",
    tutorTitle: "SoF-bounded AI tutor",
    tutorBound: (version) =>
      `Bound to Statement of Faith ${version}. The stub will not answer outside that confession.`,
    tutorPlaceholder:
      "Ask a formation question (stub). Answers stay inside the SoF version on this campus.",
    academicsBody: "Math/Science via licensed engine — not built here",
    academicsHint:
      "Build-vs-buy: Discipl owns formation. Literacy and STEM deep-link to a licensed engine behind ops.",
    stubLabel: DEMO_LABEL,
    sofBound: "SoF 2026.1 (fixture)",
    refuse:
      "I can't go past the Statement of Faith this campus assented (SoF 2026.1, fixture). I won't pick a denomination. Ask your guide.",
    reflectCta: "Write a short reflection",
    checkin: "Guide check-in: Mateo confirmed this morning (fixture).",
    returnDiscipl: "Return to Discipl",
  };

  const ESCROW_COPY = {
    threshold: (seats) =>
      `Demo: escrow seat threshold TBD (Kevin) — labeled placeholder. Fixture demo seats: ${seats}.`,
  };

  const SOF_COPY = {
    placeholderBanner:
      "SoF body is placeholder / fixture 2026.1 — not final confession text.",
  };

  const HOME_COPY = {
    blurb: `${FORMATION_COPY.accepted} Path A is free for kids. Host is a thin portal. Ops is the thick product.`,
  };

  const STORY_BEATS = {
    host: "Host ≠ operate.",
    director: "No vibes open — honest open-gate.",
    family: "Scholarship is the payment. Path A is free for kids.",
    formation: "We own formation. Buy the LMS.",
  };

  const HANDOFF_COPY = {
    title: "Continue in licensed math/science",
    body: "Math and science open in a licensed learning engine. Discipl stays the campus system of record. The host church does not live in this vendor.",
    stay: "Return to Discipl",
    continue: "Continue to vendor (demo)",
    vendorOut: "Vendor console is out of this prototype. No account is created.",
  };

  const defaultState = {
    operatorApproved: false,
    facilitySigned: false,
    windDownSigned: false,
    escrowComplete: false,
    closingCommitmentRecorded: false,
    campusStatus: "pre_open",
    familySofAssented: true,
    familyDocsUploaded: false,
    familyScholarshipAttached: true,
    familyEnrolled: false,
    continuityNamed: true,
  };

  const SEED = {
    campus: {
      name: "Harbor Light campus",
      hostName: "Harbor Light Fellowship",
      city: "Jacksonville, FL",
      filterResult: "prefer 800 plus",
      enrolledSeats: 12,
      loadedCostCents: 57500000,
      loadedCostPeriod: "2026–27",
      escrowSeatThresholdDemo: 18,
      continuityOwnerName: "Camille",
      id: "campus_hlf_jax",
    },
    host: {
      email: "pastor.daniel@example.com",
      operatorInvitedAt: "2026-07-02",
    },
    facility: {
      roomsNotes: "Education wing: rooms 101–108, fellowship hall on Tuesdays.",
      weekdayHours: "Mon–Fri 7:30a–3:30p",
      lockableStorage: "Two lockable closets + rolling cabinet in 104.",
      utilityCustodial:
        "Ops pays incremental weekday janitorial above Sunday baseline.",
      insuranceNotes: "School CGL on file. Church named insured where required.",
      fmvCents: 4800000,
      chargedCents: 2400000,
      windDownExhibit:
        "Notice ≥ 90 days (or remaining term). Continuity owner named by ops. Financial clean exit. Joint statement. Host export and family export are separate. Purge on a published clock.",
    },
    family: {
      guardianName: "Naomi",
      email: "parent.naomi@example.com",
      childrenFirstNames: ["Eli", "Maya"],
      coverStatus: "gap_owned_by_ops",
    },
    households: [{ scholarshipRef: "FL-ESA-ATTACH-NAOMI" }],
    studentPreview: {
      learnerFirstName: "Eli",
      gradeBand: "K–5",
      campusName: "Harbor Light campus",
      mentorName: "Mateo",
      walkedWith: "Naomi (guardian) or Mateo (guide)",
      dateLabel: "Monday · formation day",
      sofVersion: "2026.1",
      goals: [
        {
          id: "goal_liturgy",
          title: "Morning liturgy",
          note: "Stub — practiced with a parent or guide.",
        },
        {
          id: "goal_formation",
          title: "Formation hour",
          note: "Stub — Jesus-rooted practice. Content not drafted here.",
        },
        {
          id: "goal_literacy",
          title: "Licensed literacy",
          note: "Stub — deep-link to the licensed engine.",
        },
      ],
      tutor: {
        note: "SoF-bounded AI tutor stub. Answers stay inside Statement of Faith 2026.1.",
      },
    },
    sof: {
      version: "2026.1",
      body: "Placeholder — Kevin has not supplied Statement of Faith v1 text. This screen shows the assent pattern only. Do not treat this paragraph as a confession.",
      checklist: [
        {
          id: "sof_read",
          label: "I have read Statement of Faith version 2026.1 (placeholder).",
        },
        {
          id: "sof_checklist_pending",
          label:
            "I understand the orthodoxy checklist items will be supplied by Kevin.",
        },
      ],
    },
    commitmentsBaseCents: 47600000,
    closingCents: 9900000,
  };

  const REASONS = {
    coverage_short:
      "coverage_short — Coverage is short. The campus stays not-open.",
    escrow_incomplete:
      "escrow_incomplete — Escrow is not complete. Hiring and build spend stay blocked.",
    facility_unsigned: "facility_unsigned — Facility agreement is not signed.",
    wind_down_unsigned:
      "wind_down_unsigned — Wind-down terms are missing. The campus cannot open.",
    sof_stale: "sof_stale — Assents are stale. Re-assent before the next term.",
  };

  const ui = {
    enrollStep: 0,
    sofChecked: ["sof_read", "sof_checklist_pending"],
    handoffOpen: false,
    handoffContinued: false,
    reflectSaved: false,
    tutorRevealed: false,
    justOpened: false,
    glance: null,
    glancePrev: "pre_open",
  };

  let glanceTimer = null;
  let glanceTick = null;
  let toastTimer = null;

  function parseState(raw) {
    if (!raw) return { ...defaultState };
    try {
      return { ...defaultState, ...JSON.parse(raw) };
    } catch {
      return { ...defaultState };
    }
  }

  function readState() {
    return parseState(sessionStorage.getItem(STORAGE_KEY));
  }

  function writeState(state) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function patch(partial) {
    writeState({ ...readState(), ...partial });
    render();
  }

  function resetState() {
    stopGlance();
    sessionStorage.removeItem(STORAGE_KEY);
    ui.enrollStep = 0;
    ui.sofChecked = ["sof_read", "sof_checklist_pending"];
    ui.handoffOpen = false;
    ui.handoffContinued = false;
    ui.reflectSaved = false;
    ui.tutorRevealed = false;
    ui.justOpened = false;
    flash("Demo reset. Start at Pastor Daniel.");
    location.hash = "#/";
    render();
  }

  function formatUsd(cents) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(cents / 100);
  }

  function formatRatio(ratio) {
    return `${(ratio * 100).toFixed(1)}%`;
  }

  function evaluateGate(state) {
    const committed =
      SEED.commitmentsBaseCents +
      (state.closingCommitmentRecorded ? SEED.closingCents : 0);
    const coverageRatio = committed / SEED.campus.loadedCostCents;
    const reasons = [];
    if (coverageRatio < 1) reasons.push("coverage_short");
    if (!state.escrowComplete) reasons.push("escrow_incomplete");
    if (!state.facilitySigned) reasons.push("facility_unsigned");
    if (!state.windDownSigned) reasons.push("wind_down_unsigned");
    return {
      committedCents: committed,
      coverageRatio,
      reasons,
      canOpen: reasons.length === 0,
    };
  }

  function statusLabel(status) {
    if (status === "open") return HOST_COPY.statusOpen;
    if (status === "wind_down") return HOST_COPY.statusWindDown;
    return HOST_COPY.statusPreOpen;
  }

  function statusTone(status) {
    if (status === "open") return "success";
    if (status === "wind_down") return "danger";
    return "warning";
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  function path() {
    const hash = (location.hash || "#/").replace(/^#/, "");
    return hash || "/";
  }

  function go(href) {
    location.hash = href.startsWith("#") ? href : `#${href}`;
  }

  function theme() {
    return localStorage.getItem(THEME_KEY) === "dark" ? "dark" : "light";
  }

  function setTheme(next) {
    localStorage.setItem(THEME_KEY, next);
    render();
  }

  function flash(message) {
    const el = document.getElementById("toast");
    if (!el) return;
    el.hidden = false;
    el.textContent = message;
    el.classList.remove("is-out");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      el.classList.add("is-out");
      toastTimer = setTimeout(() => {
        el.hidden = true;
      }, 180);
    }, 2600);
  }

  function stopGlance() {
    clearTimeout(glanceTimer);
    clearInterval(glanceTick);
    glanceTimer = null;
    glanceTick = null;
    ui.glance = null;
  }

  function playGlance() {
    const state = readState();
    if (!state.continuityNamed) {
      flash("Wind-down requires a named continuity owner.");
      return;
    }
    stopGlance();
    ui.glancePrev = state.campusStatus === "wind_down" ? "pre_open" : state.campusStatus;
    ui.glance = { started: Date.now(), ms: 10000 };
    writeState({ ...state, campusStatus: "wind_down" });
    glanceTick = setInterval(render, 120);
    glanceTimer = setTimeout(() => {
      const latest = readState();
      if (latest.campusStatus === "wind_down") {
        writeState({ ...latest, campusStatus: ui.glancePrev });
      }
      stopGlance();
      flash("Wind-down glance complete. Host stays thin.");
      render();
    }, 10000);
    render();
  }

  function recoverOpenGate() {
    patch({ closingCommitmentRecorded: true, escrowComplete: true });
  }

  function tryOpen() {
    const state = readState();
    const gate = evaluateGate(state);
    if (!gate.canOpen) return;
    ui.justOpened = true;
    writeState({ ...state, campusStatus: "open" });
    flash("Campus open. Honest gate — every conjunct passed.");
    render();
    setTimeout(() => {
      ui.justOpened = false;
      render();
    }, 1400);
  }

  function surfaceFor(route) {
    if (route.startsWith("/host")) return "host";
    if (route.startsWith("/ops")) return "ops";
    if (route.startsWith("/family")) return "family";
    if (route.startsWith("/student")) return "formation";
    return "hub";
  }

  function roleMeta(surface) {
    if (surface === "host") {
      return {
        title: "Pastor Daniel",
        sub: "Host portal (thin) · pastor.daniel@example.com",
        nav: [
          ["#/host", "Campus glance"],
          ["#/host/operator", "Operator"],
          ["#/host/facility", "Facility"],
          ["#/host/notices", "Notices & export"],
        ],
      };
    }
    if (surface === "ops") {
      return {
        title: "Camille",
        sub: "Ops · Campus director · camille.director@example.com",
        nav: [["#/ops", "Open-gate"]],
      };
    }
    if (surface === "family") {
      return {
        title: "Naomi",
        sub: "Family · Path A · parent.naomi@example.com",
        nav: [
          ["#/family", "Home"],
          ["#/family/enroll", "Enroll"],
          ["#/family/sof", "Statement of Faith"],
          ["#/family/docs", "Docs"],
          ["#/family/cover", "Cover"],
        ],
      };
    }
    if (surface === "formation") {
      return {
        title: "Eli (K–5 preview)",
        sub: "Formation OS · preview only — no child login",
        nav: [["#/student", "Today"]],
      };
    }
    return {
      title: "Discipl",
      sub: "Choose a persona · 5-minute VC path",
      nav: [],
    };
  }

  function badge(label, tone = "neutral", size = "") {
    const extra = size === "lg" ? " badge--lg" : size === "wide" ? " badge--wide" : "";
    return `<span class="badge badge--${tone}${extra}">${escapeHtml(label)}</span>`;
  }

  function btn(label, attrs, variant = "") {
    const cls = ["btn", variant && `btn--${variant}`].filter(Boolean).join(" ");
    return `<button type="button" class="${cls}" ${attrs}>${label}</button>`;
  }

  function linkBtn(label, href, variant = "") {
    const cls = ["btn", variant && `btn--${variant}`].filter(Boolean).join(" ");
    return `<a class="${cls}" href="${href}">${label}</a>`;
  }

  function storyBeat(line, extra) {
    return `
      <aside class="story-beat" role="note">
        <div class="story-beat__mark">VC</div>
        <div>
          <p class="story-beat__label">Story beat</p>
          <p class="story-beat__line">${escapeHtml(line)}</p>
          ${extra ? `<p class="story-beat__extra">${escapeHtml(extra)}</p>` : ""}
        </div>
      </aside>`;
  }

  function pageHeader(eyebrow, title, description) {
    return `
      <header class="page-header">
        ${eyebrow ? `<p class="eyebrow">${escapeHtml(eyebrow)}</p>` : ""}
        <h1>${escapeHtml(title)}</h1>
        ${description ? `<p class="lede">${escapeHtml(description)}</p>` : ""}
      </header>`;
  }

  function chrome(surface) {
    const meta = roleMeta(surface);
    const route = path();
    const nav = meta.nav
      .map(([href, label]) => {
        const active = href === `#${route}`;
        return `<a class="btn btn--sm ${active ? "" : "btn--ghost"}" href="${href}">${escapeHtml(label)}</a>`;
      })
      .join("");

    return `
      <header class="site-header">
        <div class="wrap site-header__inner">
          <a class="brand" href="#/">
            <span class="brand-mark">D</span>
            <span>
              <span class="brand-name">Discipl</span>
              <p class="brand-sub">${escapeHtml(meta.sub)}</p>
            </span>
          </a>
          <div class="header-actions">
            ${btn("Reset demo", 'data-action="reset"', "secondary sm")}
            ${linkBtn("5-min path", "#/", "ghost sm")}
            ${btn(theme() === "dark" ? "Light" : "Dark", 'data-action="theme"', "ghost sm")}
          </div>
        </div>
      </header>
      ${
        surface === "host"
          ? `<p class="thin-note" role="note">${escapeHtml(HOST_COPY.thinChrome)}</p>`
          : ""
      }
      ${
        nav
          ? `<nav class="role-nav" aria-label="${escapeHtml(meta.title)} sections"><div class="wrap role-nav__inner">${nav}</div></nav>`
          : ""
      }`;
  }

  function renderHub() {
    const state = readState();
    return `
      <div class="panel">
        <p class="hub-kicker">${badge(DEMO_LABEL, "demo")} 5-minute VC path</p>
        <h1>Daniel → Camille → Naomi → Eli</h1>
        <p class="lede">${escapeHtml(HOME_COPY.blurb)}</p>
        <div class="btn-row">
          ${btn("Reset demo", 'data-action="reset"', "lg")}
          ${linkBtn("Start with Daniel", "#/host", "secondary lg")}
        </div>
        <div class="hub-grid" style="margin-top:1.5rem">
          <section class="card card--hero script">
            <p class="eyebrow">Walk this</p>
            <h2 class="card-title">One honest script</h2>
            <p class="hint">Reset restores unsigned Daniel defaults. Camille starts blocked. Naomi is not enrolled.</p>
            <ol>
              <li><strong>Daniel</strong> — approve operator, sign facility, play the ~10s wind-down glance. ${escapeHtml(STORY_BEATS.host)}</li>
              <li><strong>Camille</strong> — Denied until a signed commitment lands, then Open campus. ${escapeHtml(STORY_BEATS.director)}</li>
              <li><strong>Naomi</strong> — scholarship is payment; Path A is free. ${escapeHtml(STORY_BEATS.family)}</li>
              <li><strong>Eli</strong> — Formation OS preview, SoF-bounded refuse, licensed handoff. ${escapeHtml(STORY_BEATS.formation)}</li>
            </ol>
            <p class="hint">Campus is ${escapeHtml(statusLabel(state.campusStatus).toLowerCase())}. Operator ${state.operatorApproved ? "approved" : "unsigned"}. Facility ${state.facilitySigned && state.windDownSigned ? "signed" : "unsigned"}.</p>
          </section>
          <section>
            <ol class="vc-path" style="margin:0;padding:0;list-style:none">
              ${[
                ["1", "#/host", "Daniel", "Host glance", "You host the wing. You are not the school operator."],
                ["2", "#/ops", "Camille", "Open-gate", "Blockers first. Soft interest cannot green the gate."],
                ["3", "#/family/enroll", "Naomi", "Path A enroll", "Zero pay wall. Scholarship is the payment."],
                ["4", "#/student", "Eli", "Formation OS", FORMATION_COPY.accepted],
              ]
                .map(
                  ([n, href, who, label, hint]) => `
                <li>
                  <a class="vc-card" href="${href}">
                    <span class="vc-num">${n}</span>
                    <p class="vc-who">${escapeHtml(who)}</p>
                    <p class="vc-label">${escapeHtml(label)}</p>
                    <p class="vc-hint">${escapeHtml(hint)}</p>
                  </a>
                </li>`,
                )
                .join("")}
            </ol>
          </section>
        </div>
        <section class="card split">
          <h2 class="card-title">Surface split (locked)</h2>
          <ul>
            <li>Host (${escapeHtml(SEED.campus.hostName)}, fictional) sees aggregates only — no child roster, no enrollment editor, no funding_commitments editor.</li>
            <li>Ops owns enrollment, coverage gates, SoF, escrow, Florida pack, and audit.</li>
            <li>Family Path A has zero pay wall and no sponsor prompts. Cover gaps are owned by ops.</li>
            <li>Sunday check-in is parked. This prototype does not expand it.</li>
          </ul>
        </section>
      </div>`;
  }

  function renderHost() {
    const state = readState();
    const gate = evaluateGate(state);
    const winding = state.campusStatus === "wind_down";
    const glancePct = ui.glance
      ? Math.min(100, ((Date.now() - ui.glance.started) / ui.glance.ms) * 100)
      : 0;
    const remain = ui.glance
      ? Math.max(0, Math.ceil((ui.glance.ms - (Date.now() - ui.glance.started)) / 1000))
      : 0;

    return `
      <div class="panel">
        ${storyBeat(STORY_BEATS.host, HOST_COPY.thinChrome)}
        ${pageHeader("Host portal · thin", SEED.campus.name, `${SEED.campus.hostName} (fictional) · ${SEED.campus.city}.`)}
        <section class="card card--hero">
          <p class="eyebrow">You host, you don't operate</p>
          <h2 class="card-title" style="font-size:1.55rem;margin-top:.55rem">You host the wing. You are not the school operator.</h2>
          <p class="hint">Glance only. No roster, no SIS, no vendor consoles from this portal.</p>
        </section>
        <div class="grid-3" style="margin-top:1rem">
          <section class="card">
            <p class="muted">Campus status</p>
            <div style="margin-top:.7rem">${badge(statusLabel(state.campusStatus), statusTone(state.campusStatus), "lg")}</div>
            <p class="hint">${escapeHtml(SEED.campus.filterResult)}</p>
          </section>
          <section class="card">
            <p class="muted">Enrolled seats</p>
            <p class="metric">${SEED.campus.enrolledSeats}</p>
            <p class="hint">Headcount only — not a child list.</p>
          </section>
          <section class="card">
            <p class="muted">Funding</p>
            <p class="metric">${gate.coverageRatio < 1 ? "short" : "on track"}</p>
            <p class="hint">Status only. Coverage math stays in ops.</p>
          </section>
        </div>
        <section class="card glance ${ui.glance ? "is-live card--warn" : ""}" style="margin-top:1rem">
          <h2 class="card-title">Wind-down beat (~10s)</h2>
          <p class="hint">Facility + wind-down ${state.facilitySigned && state.windDownSigned ? "are signed" : "are not signed"}. Continuity owner ${escapeHtml(SEED.campus.continuityOwnerName)}. Host export has no child roster.</p>
          ${
            winding
              ? `<div class="card card--danger" style="margin-top:.85rem;box-shadow:none">
                  ${badge(HOST_COPY.statusWindDown, "danger")}
                  <p style="margin:.55rem 0 0">Families and the host share the same notice clock (90 days or the rest of the term). Glance only — ops named the continuity owner.</p>
                </div>`
              : `<p class="hint">Play the notice glance so VC sees closure discipline without a SIS.</p>`
          }
          ${
            ui.glance
              ? `<div class="glance__bar" aria-hidden="true"><div class="glance__fill" style="width:${glancePct}%"></div></div>
                 <p class="hint">Glance live · ${remain}s remaining</p>`
              : ""
          }
          <div class="btn-row">
            ${ui.glance ? "" : btn("Play wind-down glance", 'data-action="glance"')}
            ${linkBtn("Notices & export", "#/host/notices", "secondary")}
          </div>
        </section>
        <section class="card">
          <h2 class="card-title">Next host action</h2>
          ${
            !state.operatorApproved
              ? `<p class="hint">${escapeHtml(HOST_COPY.emptyHome)}</p>
                 <div class="btn-row">${linkBtn(HOST_COPY.approve, "#/host/operator")}</div>`
              : `<p class="hint">Operator is approved. Review the facility agreement or download a host export if the campus winds down.</p>
                 <div class="btn-row">
                   ${linkBtn("Review facility agreement", "#/host/facility", "secondary")}
                   ${linkBtn("Notices & export", "#/host/notices", "secondary")}
                 </div>`
          }
        </section>
      </div>`;
  }

  function renderOperator() {
    const state = readState();
    return `
      <div class="panel">
        ${pageHeader("Host portal · thin", "Invite / approve operator", "Approve Discipl (501(c)(3) ops) as the weekday operator. The church does not become the school of record.")}
        <section class="card">
          <div class="row-between">
            <div>
              <h2 class="card-title">Discipl ops</h2>
              <p class="hint">Invited ${SEED.host.operatorInvitedAt} · Champion ${escapeHtml(SEED.host.email)}</p>
            </div>
            ${badge(state.operatorApproved ? "approved" : "invited", state.operatorApproved ? "success" : "warning", "lg")}
          </div>
          <dl class="facts">
            <div><dt>What you approve</dt><dd>Weekday operator status</dd></div>
            <div><dt>What you do not get</dt><dd>Enrollment editor, roster, funding_commitments</dd></div>
          </dl>
          <div class="btn-row">
            ${
              state.operatorApproved
                ? btn("Replay as invited", 'data-action="operator-off"', "secondary")
                : btn(HOST_COPY.approve, 'data-action="operator-on"')
            }
          </div>
        </section>
      </div>`;
  }

  function renderFacility() {
    const state = readState();
    const signed = state.facilitySigned && state.windDownSigned;
    return `
      <div class="panel">
        ${pageHeader("Host portal · thin", "Facility agreement", "FMV vs charged lives on this agreement. The difference is not a general credit.")}
        <section class="card">
          <div class="row-between">
            <h2 class="card-title">Education wing terms</h2>
            ${badge(signed ? "Signed" : "Unsigned", signed ? "success" : "danger", "lg")}
          </div>
          <dl class="facts" style="display:grid;gap:.8rem">
            <div style="display:block"><dt>Rooms</dt><dd>${escapeHtml(SEED.facility.roomsNotes)}</dd></div>
            <div style="display:block"><dt>Weekday hours</dt><dd>${escapeHtml(SEED.facility.weekdayHours)}</dd></div>
            <div style="display:block"><dt>Lockable storage</dt><dd>${escapeHtml(SEED.facility.lockableStorage)}</dd></div>
            <div style="display:block"><dt>Utility / custodial</dt><dd>${escapeHtml(SEED.facility.utilityCustodial)}</dd></div>
            <div style="display:block"><dt>Insurance</dt><dd>${escapeHtml(SEED.facility.insuranceNotes)}</dd></div>
          </dl>
        </section>
        <section class="card">
          <h2 class="card-title">Fair market value for this use</h2>
          <div class="grid-2" style="margin-top:.7rem">
            <p>Amount charged to ops · ${formatUsd(SEED.facility.chargedCents)}</p>
            <p>Fair market value · ${formatUsd(SEED.facility.fmvCents)}</p>
          </div>
          <p class="hint">The difference may count as campus coverage only after this agreement is signed. It is not a general credit.</p>
        </section>
        <section class="card">
          <h2 class="card-title">Wind-down terms (required to open)</h2>
          <p class="hint">${escapeHtml(SEED.facility.windDownExhibit)}</p>
          ${state.windDownSigned ? "" : `<p class="danger" role="alert">Wind-down terms are missing. The campus cannot open.</p>`}
          <div class="btn-row">
            ${
              signed
                ? btn("Replay unsigned", 'data-action="facility-off"', "secondary")
                : btn("Sign facility and wind-down", 'data-action="facility-on"')
            }
          </div>
        </section>
      </div>`;
  }

  function renderNotices() {
    const state = readState();
    const winding = state.campusStatus === "wind_down";
    return `
      <div class="panel">
        ${pageHeader("Host portal · thin", "Wind-down notices & export", "Host export is a separate artifact from the family export. The church is not left with unpaid vendor bills Discipl introduced.")}
        ${
          winding
            ? `<section class="card card--danger">${badge(HOST_COPY.statusWindDown, "danger")}<h2 class="card-title" style="margin-top:.5rem">This campus is winding down.</h2><p class="hint">Families and the host were notified on the same date. Discipl will own the public statement unless reassigned.</p></section>`
            : `<section class="card"><h2 class="card-title">No wind-down in progress</h2><p class="hint">Status is ${escapeHtml(state.campusStatus.replaceAll("_", " "))}. Export becomes the host action when ops triggers wind-down with a named continuity owner (${escapeHtml(SEED.campus.continuityOwnerName)}).</p></section>`
        }
        <section class="card">
          <h2 class="card-title">Download host export</h2>
          <p class="hint">Aggregates, agreement, and notice clock. No child roster PII.</p>
          <div class="btn-row">${btn("Download host export", `data-action="export" ${winding ? "" : ""}`, winding ? "" : "secondary")}</div>
        </section>
      </div>`;
  }

  function renderOps() {
    const state = readState();
    const gate = evaluateGate(state);
    const open = state.campusStatus === "open";
    const rows = [
      ["coverage_short", "Signed coverage", "Signed instruments meet loaded cost."],
      ["escrow_incomplete", "Deposit escrow", "Escrow complete. Hire / build may proceed."],
      ["facility_unsigned", "Facility agreement", "Facility agreement is signed."],
      ["wind_down_unsigned", "Wind-down terms", "Wind-down exhibit is signed."],
      ["sof_stale", "Statement of Faith", "Required staff assents are current."],
    ].map(([id, title, passText]) => {
      const blocked = gate.reasons.includes(id);
      return { id, title, pass: !blocked, reason: blocked ? REASONS[id] : passText };
    });
    const blocked = rows.filter((row) => !row.pass);

    return `
      <div class="panel">
        ${storyBeat(STORY_BEATS.director)}
        ${pageHeader("Ops · Campus director", "Open-gate", "Blockers first. Each conjunct is pass or blocked with a reason — never one vague green.")}
        <section class="card card--hero">
          <h2 class="card-title">VC beat — denied → signed commitment → open</h2>
          <p class="hint">In-demo recovery. Soft interest still does not count. One click adds the fixture signed gift and completes escrow so Open can succeed.</p>
          <ol class="script" style="padding-left:1.15rem">
            <li style="${!gate.canOpen && !open ? "font-weight:650" : "color:var(--muted)"}">1. Denied — coverage short until a signed instrument lands.</li>
            <li style="${state.closingCommitmentRecorded && !open ? "font-weight:650" : "color:var(--muted)"}">2. Add signed commitment (demo recovery).</li>
            <li style="${open ? "font-weight:650;color:var(--success)" : "color:var(--muted)"}">3. Open succeeds.</li>
          </ol>
          <div class="btn-row">
            ${state.closingCommitmentRecorded ? "" : btn("Add signed commitment", 'data-action="recover"')}
            ${gate.canOpen && !open ? btn("Open campus", 'data-action="open"') : ""}
            ${open ? badge("Campus open", "success", "lg") : ""}
          </div>
        </section>
        <div class="btn-row">
          ${badge(statusLabel(state.campusStatus), statusTone(state.campusStatus), "lg")}
          ${badge(gate.canOpen ? "Ready — every conjunct passed" : "Blocked — see reasons", gate.canOpen ? "success" : "warning", "lg")}
        </div>
        ${
          !gate.canOpen
            ? `<section class="card card--warn" style="margin-top:1rem">
                <h2 class="card-title">Open is blocked</h2>
                <p class="hint">Fix each reason below. Verbal interest cannot turn this green.</p>
                <ol>${blocked.map((row) => `<li>${escapeHtml(row.reason)}</li>`).join("")}</ol>
              </section>`
            : ""
        }
        <div class="stack" style="margin-top:1rem">
          ${rows
            .map(
              (row) => `
            <section class="gate ${row.pass ? "gate--pass" : "gate--block"} ${ui.justOpened ? "is-flipping" : ""}">
              <div>
                <strong>${escapeHtml(row.title)}</strong>
                <p class="hint">${escapeHtml(row.reason)}</p>
              </div>
              ${badge(row.pass ? "Pass" : "Blocked", row.pass ? "success" : "warning")}
            </section>`,
            )
            .join("")}
        </div>
        <p class="hint">${escapeHtml(ESCROW_COPY.threshold(SEED.campus.escrowSeatThresholdDemo))}</p>
        <details class="coverage">
          <summary>Committed coverage / loaded cost <span style="color:var(--accent);font-size:1.35rem">${formatRatio(gate.coverageRatio)}</span></summary>
          <div class="coverage__body">
            <p class="muted">${formatUsd(gate.committedCents)} / ${formatUsd(SEED.campus.loadedCostCents)} · ${SEED.campus.loadedCostPeriod}</p>
            <p>Soft / unsigned interest is excluded from this numerator.</p>
            <p class="hint">${badge(DEMO_LABEL, "demo")} Fixture instruments only. Verbal church interest does not count.</p>
          </div>
        </details>
      </div>`;
  }

  function renderFamilyHome() {
    const state = readState();
    const line = (label, done, href) => `
      <li><a class="tile" href="${href}"><span>${escapeHtml(label)}</span>${badge(done ? "Done" : "Needed", done ? "success" : "warning")}</a></li>`;
    return `
      <div class="panel">
        ${storyBeat(STORY_BEATS.family)}
        ${pageHeader("Family · Path A", `Hello, ${SEED.family.guardianName}`, FAMILY_COPY.enrollSubtitle)}
        ${
          state.campusStatus === "wind_down"
            ? `<section class="card card--danger"><h2 class="card-title">The campus is winding down.</h2><p class="hint">You have at least 90 days' notice or the rest of the term. Download your records. There is still no amount due from you.</p></section>`
            : ""
        }
        <section class="card">
          <h2 class="card-title">Your path</h2>
          <p class="hint">One next step at a time. There is no bill on this path.</p>
          <ul class="list">
            ${line("Statement of Faith", state.familySofAssented, "#/family/sof")}
            ${line("Docs packet", state.familyDocsUploaded, "#/family/docs")}
            ${line(FAMILY_COPY.scholarship, state.familyScholarshipAttached, "#/family/enroll")}
            <li>
              <div class="tile">
                <span>Seat cover</span>
                ${badge(SEED.family.coverStatus === "covered" ? FAMILY_COPY.covered : "Gap owned by ops", SEED.family.coverStatus === "covered" ? "success" : "info")}
              </div>
            </li>
          </ul>
          <div class="btn-row">${linkBtn(state.familyEnrolled ? "Review enrollment" : "Continue enrollment", "#/family/enroll", "lg")}</div>
        </section>
        <p class="hint">Learners on this household: ${SEED.family.childrenFirstNames.join(", ")}. K–5 children stay records and walk Formation OS with a parent or guide.</p>
      </div>`;
  }

  function renderEnroll() {
    const state = readState();
    const steps = ["Household", "Children", "Scholarship", "Finish"];
    const step = ui.enrollStep;
    let body = "";
    if (step === 0) {
      body = `
        <section class="card">
          <h2 class="card-title">Household</h2>
          <p class="hint">${escapeHtml(SEED.family.email)}</p>
          <p>Guardian: ${escapeHtml(SEED.family.guardianName)}. Browser is enough — no second app.</p>
          <div class="btn-row">${btn("Continue", 'data-action="enroll-next"', "lg")}</div>
        </section>`;
    } else if (step === 1) {
      body = `
        <section class="card">
          <h2 class="card-title">Children</h2>
          <p class="hint">Add a child to continue. First names only in this prototype.</p>
          <ul class="list">${SEED.family.childrenFirstNames.map((name) => `<li class="tile">${escapeHtml(name)}</li>`).join("")}</ul>
          <div class="btn-row">${btn("Back", 'data-action="enroll-back"', "secondary")}${btn("Continue", 'data-action="enroll-next"')}</div>
        </section>`;
    } else if (step === 2) {
      body = `
        <section class="card">
          <h2 class="card-title">${escapeHtml(FAMILY_COPY.scholarship)}</h2>
          <p class="hint">Provider attachment — not a card to Discipl. Path A does not collect parent payment.</p>
          <p>${state.familyScholarshipAttached ? `Attached · ${escapeHtml(SEED.households[0].scholarshipRef)}` : "No scholarship attached yet."}</p>
          <div class="btn-row">
            ${btn("Back", 'data-action="enroll-back"', "secondary")}
            ${btn(state.familyScholarshipAttached ? "Keep attachment" : FAMILY_COPY.scholarship, 'data-action="enroll-attach"')}
          </div>
        </section>`;
    } else {
      body = `
        <section class="card ${state.familyEnrolled ? "card--success" : ""}">
          <h2 class="card-title">${state.familyEnrolled ? escapeHtml(FAMILY_COPY.success) : "Ready when SoF and docs are done"}</h2>
          <p class="hint">Next: assent and docs. Cover status is never a bill.</p>
          <div class="btn-row">
            ${btn("Finish enrollment", 'data-action="enroll-finish"', "lg")}
            ${btn("Back", 'data-action="enroll-back"', "secondary")}
          </div>
          ${
            !state.familySofAssented || !state.familyDocsUploaded
              ? `<p class="hint">Enrollment cannot finish until a guardian assents and docs are in. ${linkBtn("Upload docs", "#/family/docs", "ghost sm")}</p>`
              : state.familyEnrolled
                ? `<p class="success">${escapeHtml(FAMILY_COPY.success)}</p>`
                : ""
          }
        </section>`;
    }

    return `
      <div class="panel">
        ${storyBeat(STORY_BEATS.family)}
        ${pageHeader("Family · Path A", FAMILY_COPY.enrollTitle, FAMILY_COPY.enrollSubtitle)}
        <ol class="steps">
          ${steps
            .map((label, index) => {
              const tone = index === step ? "info" : index < step ? "success" : "neutral";
              return `<li>${badge(`${index + 1}. ${label}`, tone, "wide")}</li>`;
            })
            .join("")}
        </ol>
        ${body}
      </div>`;
  }

  function renderSof() {
    const state = readState();
    const ready = SEED.sof.checklist.every((item) => ui.sofChecked.includes(item.id));
    return `
      <div class="panel">
        ${pageHeader("Family · Path A", "Statement of Faith", `Version ${SEED.sof.version}. Enrollment cannot finish until a guardian assents to this version.`)}
        <section class="card">
          <div class="row-between">
            <h2 class="card-title">Version ${SEED.sof.version}</h2>
            ${badge(DEMO_LABEL, "demo")}
          </div>
          <p class="note-amber" role="note">${escapeHtml(SOF_COPY.placeholderBanner)}</p>
          <p>${escapeHtml(SEED.sof.body)}</p>
          <fieldset class="stack" style="border:0;padding:0;margin-top:1rem">
            <legend class="card-title">Checklist</legend>
            ${SEED.sof.checklist
              .map(
                (item) => `
              <label class="check">
                <input type="checkbox" data-sof="${item.id}" ${ui.sofChecked.includes(item.id) ? "checked" : ""} />
                <span>${escapeHtml(item.label)}</span>
              </label>`,
              )
              .join("")}
          </fieldset>
          <div class="btn-row">${btn("I assent to this version", `data-action="sof-assent" ${ready ? "" : "disabled"}`, "lg")}</div>
          ${ready && state.familySofAssented ? `<p class="hint">Assent recorded for ${escapeHtml(SEED.family.email)}.</p>` : ready ? "" : `<p class="hint">Affirm each placeholder item to enable assent.</p>`}
        </section>
      </div>`;
  }

  function renderDocs() {
    const state = readState();
    return `
      <div class="panel">
        ${pageHeader("Family · Path A", "Docs upload status", "Immunization packet or a Florida-pack allowed exemption. This is not a payment step.")}
        <section class="card">
          <div class="row-between">
            <h2 class="card-title">Household packet</h2>
            ${badge(state.familyDocsUploaded ? "In review" : "Needed", state.familyDocsUploaded ? "success" : "warning")}
          </div>
          <ul class="list">
            ${SEED.family.childrenFirstNames
              .map(
                (name) => `
              <li class="tile"><span>${escapeHtml(name)}</span><span class="muted">${name === "Maya" ? "Immunization pending" : "Packet received"}</span></li>`,
              )
              .join("")}
          </ul>
          <p class="hint">Ops reviews the packet. You will not be asked for a card.</p>
          <div class="btn-row">${btn("Mark packet uploaded", 'data-action="docs-on"', "lg")}</div>
        </section>
      </div>`;
  }

  function renderCover() {
    const state = readState();
    const covered = SEED.family.coverStatus === "covered";
    return `
      <div class="panel">
        ${pageHeader("Family · Path A", "Seat cover status", "Covered or gap owned by ops. Never an amount due from the parent.")}
        <section class="card">
          <div class="row-between">
            <h2 class="card-title">Your seats</h2>
            ${badge(covered ? FAMILY_COPY.covered : "Gap owned by ops", covered ? "success" : "info", "lg")}
          </div>
          <p>${covered ? escapeHtml(FAMILY_COPY.covered) : escapeHtml(FAMILY_COPY.gap)}</p>
          <p class="hint">Status only — this page never shows a dollar figure or a bill.</p>
          <p class="hint">Scholarship attached: ${state.familyScholarshipAttached ? "yes" : "not yet"}. Enrollment ${state.familyEnrolled ? "complete" : "in progress"}.</p>
        </section>
      </div>`;
  }

  function renderStudent() {
    const preview = SEED.studentPreview;
    const today = preview.goals[0];
    return `
      <div class="panel">
        <div class="preview-banner" role="status">${escapeHtml(FORMATION_COPY.accepted)}</div>
        ${storyBeat(STORY_BEATS.formation, FORMATION_COPY.academicsBody)}
        <div class="note-dash" role="note">${escapeHtml(FORMATION_COPY.chrome)} Walked with ${escapeHtml(preview.walkedWith)}.</div>
        ${pageHeader(FORMATION_COPY.eyebrow, FORMATION_COPY.title(preview.learnerFirstName), `${preview.campusName} · ${preview.gradeBand} · mentor ${preview.mentorName} · ${preview.dateLabel}`)}
        <section class="card card--hero">
          <p class="eyebrow">Today</p>
          <h2 class="card-title">Today's goal</h2>
          <p style="font-size:1.25rem;font-weight:700;margin:.55rem 0 0">${escapeHtml(today.title)}</p>
          <p class="hint">${escapeHtml(today.note)}</p>
        </section>
        <section class="card">
          <div class="row-between">
            <h2 class="card-title">${escapeHtml(FORMATION_COPY.goalsTitle)}</h2>
            ${badge(FORMATION_COPY.stubLabel, "demo")}
          </div>
          <p class="hint">${escapeHtml(FORMATION_COPY.goalsHint)}</p>
          <ol class="list">
            ${preview.goals
              .map(
                (goal, index) => `
              <li class="goal">
                <span class="goal-n">${index + 1}</span>
                <div>
                  <strong>${escapeHtml(goal.title)}</strong>
                  <p class="hint">${escapeHtml(goal.note)}</p>
                </div>
              </li>`,
              )
              .join("")}
          </ol>
        </section>
        <section class="card">
          <h2 class="card-title">Guide check-in</h2>
          <p>${escapeHtml(FORMATION_COPY.checkin)}</p>
          <p class="hint">Campus-scoped. The host pastor does not see this roster. A K–5 child does not log in.</p>
        </section>
        <section class="card">
          <div class="row-between">
            <h2 class="card-title">${escapeHtml(FORMATION_COPY.reflectCta)}</h2>
            ${badge(DEMO_LABEL, "demo")}
          </div>
          <p class="hint">A few words is enough. Preview stub — walked with a parent or guide. No child login.</p>
          <label class="field-label">
            <span class="sr-only">What was good today?</span>
            <textarea placeholder="A few words is enough."></textarea>
          </label>
          <div class="btn-row">${btn("Save reflection", 'data-action="reflect"')}</div>
          ${ui.reflectSaved ? `<p class="success" role="status">Saved on this campus. Guide can review. No child login.</p>` : ""}
        </section>
        <section class="card">
          <div class="row-between">
            <h2 class="card-title">${escapeHtml(FORMATION_COPY.tutorTitle)}</h2>
            ${badge(FORMATION_COPY.sofBound, "info")}
          </div>
          <p class="eyebrow" style="margin-top:.7rem">SoF ${preview.sofVersion} · ${FORMATION_COPY.stubLabel}</p>
          <p class="hint">${escapeHtml(FORMATION_COPY.tutorBound(preview.sofVersion))}</p>
          ${
            ui.tutorRevealed
              ? `<div class="stack" style="margin-top:1rem">
                  <p class="bubble">I'm bound to ${escapeHtml(FORMATION_COPY.sofBound)}. I can help with today's formation goal.</p>
                  <p class="tile">Learner (fixture): Which denomination should I pick?</p>
                  <p class="bubble">${escapeHtml(FORMATION_COPY.refuse)}</p>
                </div>`
              : `<p class="bubble" style="margin-top:1rem">${escapeHtml(FORMATION_COPY.refuse)}</p>`
          }
          <label class="field-label">
            <span class="sr-only">${escapeHtml(FORMATION_COPY.tutorPlaceholder)}</span>
            <textarea placeholder="${escapeHtml(FORMATION_COPY.tutorPlaceholder)}" disabled readonly></textarea>
          </label>
          <p class="hint">${escapeHtml(preview.tutor.note)}</p>
          <p class="hint">Mock log: coach_fixture · ${SEED.campus.id} · sof_bound_reply. No learner names.</p>
          <div class="btn-row">${btn(ui.tutorRevealed ? "Hide refuse sample" : "Show refuse sample", 'data-action="tutor"', "secondary")}</div>
        </section>
        <section class="card" id="licensed-academics">
          <div class="row-between">
            <h2 class="card-title">${escapeHtml(HANDOFF_COPY.title)}</h2>
            ${badge(DEMO_LABEL, "demo")}
          </div>
          <p>${escapeHtml(HANDOFF_COPY.body)}</p>
          <p class="hint">${escapeHtml(FORMATION_COPY.academicsHint)}</p>
          <p class="hint">No pay wall. No points shop. No child login chrome.</p>
          <div class="btn-row">
            ${linkBtn(HANDOFF_COPY.stay, "#/", "secondary")}
            ${btn(HANDOFF_COPY.continue, 'data-action="handoff-open"')}
          </div>
          <p class="hint">${escapeHtml(FORMATION_COPY.academicsBody)}</p>
          <p>${linkBtn(HANDOFF_COPY.stay, "#/", "ghost sm")} · ${escapeHtml(FORMATION_COPY.returnDiscipl)} after the licensed engine.</p>
        </section>
        ${
          ui.handoffOpen
            ? `<div class="modal" role="dialog" aria-modal="true" aria-labelledby="handoff-title">
                <div class="modal__panel">
                  <h2 id="handoff-title" class="card-title">${escapeHtml(HANDOFF_COPY.title)}</h2>
                  <p class="hint">${escapeHtml(HANDOFF_COPY.body)}</p>
                  ${ui.handoffContinued ? `<p class="muted" role="status">${escapeHtml(HANDOFF_COPY.vendorOut)}</p>` : ""}
                  <div class="btn-row">
                    ${btn(HANDOFF_COPY.stay, 'data-action="handoff-close"', "secondary")}
                    ${btn(HANDOFF_COPY.continue, 'data-action="handoff-continue"')}
                  </div>
                </div>
              </div>`
            : ""
        }
      </div>`;
  }

  function page(route) {
    if (route === "/host") return renderHost();
    if (route === "/host/operator") return renderOperator();
    if (route === "/host/facility") return renderFacility();
    if (route === "/host/notices") return renderNotices();
    if (route === "/ops") return renderOps();
    if (route === "/family") return renderFamilyHome();
    if (route === "/family/enroll") return renderEnroll();
    if (route === "/family/sof") return renderSof();
    if (route === "/family/docs") return renderDocs();
    if (route === "/family/cover") return renderCover();
    if (route === "/student") return renderStudent();
    return renderHub();
  }

  function downloadExport() {
    const blob = new Blob(
      [
        [
          "fixture,host export",
          `campus,${SEED.campus.id}`,
          `seats,${SEED.campus.enrolledSeats}`,
          "child_roster,omitted",
        ].join("\n"),
      ],
      { type: "text/csv" },
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "host-export-harbor-light.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  function onAction(name) {
    const state = readState();
    if (name === "reset") return resetState();
    if (name === "theme") return setTheme(theme() === "dark" ? "light" : "dark");
    if (name === "glance") return playGlance();
    if (name === "operator-on") return patch({ operatorApproved: true });
    if (name === "operator-off") return patch({ operatorApproved: false });
    if (name === "facility-on") return patch({ facilitySigned: true, windDownSigned: true });
    if (name === "facility-off") return patch({ facilitySigned: false, windDownSigned: false });
    if (name === "export") return downloadExport();
    if (name === "recover") return recoverOpenGate();
    if (name === "open") return tryOpen();
    if (name === "enroll-next") {
      ui.enrollStep = Math.min(3, ui.enrollStep + 1);
      return render();
    }
    if (name === "enroll-back") {
      ui.enrollStep = Math.max(0, ui.enrollStep - 1);
      return render();
    }
    if (name === "enroll-attach") {
      writeState({ ...state, familyScholarshipAttached: true });
      ui.enrollStep = 3;
      return render();
    }
    if (name === "enroll-finish") {
      const next = {
        ...state,
        familyEnrolled:
          state.familySofAssented &&
          state.familyDocsUploaded &&
          state.familyScholarshipAttached,
      };
      writeState(next);
      if (next.familyEnrolled) flash(FAMILY_COPY.success);
      return render();
    }
    if (name === "sof-assent") return patch({ familySofAssented: true });
    if (name === "docs-on") return patch({ familyDocsUploaded: true });
    if (name === "reflect") {
      ui.reflectSaved = true;
      return render();
    }
    if (name === "tutor") {
      ui.tutorRevealed = !ui.tutorRevealed;
      return render();
    }
    if (name === "handoff-open") {
      ui.handoffOpen = true;
      ui.handoffContinued = false;
      return render();
    }
    if (name === "handoff-close") {
      ui.handoffOpen = false;
      ui.handoffContinued = false;
      return render();
    }
    if (name === "handoff-continue") {
      ui.handoffContinued = true;
      return render();
    }
  }

  function assertNoForbidden(html) {
    if (!path().startsWith("/family")) return;
    for (const phrase of FORBIDDEN_PATH_A) {
      if (html.includes(phrase)) {
        console.error("Forbidden Path A copy leaked:", phrase);
      }
    }
  }

  function render() {
    const route = path();
    const surface = surfaceFor(route);
    const root = document.getElementById("app");
    document.documentElement.dataset.theme = theme();
    document.documentElement.dataset.surface = surface;
    const html = `
      <div class="app" data-surface="${surface}">
        ${chrome(surface)}
        <main id="main" class="main">${page(route)}</main>
      </div>`;
    assertNoForbidden(html);
    root.innerHTML = html;
  }

  document.addEventListener("click", (event) => {
    const action = event.target.closest("[data-action]");
    if (action) {
      event.preventDefault();
      onAction(action.getAttribute("data-action"));
    }
  });

  document.addEventListener("change", (event) => {
    const box = event.target.closest("[data-sof]");
    if (!box) return;
    const id = box.getAttribute("data-sof");
    if (box.checked) {
      if (!ui.sofChecked.includes(id)) ui.sofChecked.push(id);
    } else {
      ui.sofChecked = ui.sofChecked.filter((item) => item !== id);
    }
    render();
  });

  window.addEventListener("hashchange", render);
  render();
})();
