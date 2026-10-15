/* Shared shell: language, theme, icons, the sidebar and the top bar.
   Every page calls PBM.mount("<nav id>") once its own strings are added. */
(function () {
  "use strict";

  const STORE = { lang: "pbm-lang", theme: "pbm-theme", sidebar: "pbm-sidebar", branches: "pbm-branches" };
  const read = (key) => {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  };
  const write = (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch {
      /* private window: the choice just lasts for this page */
    }
  };

  // ---------- Strings (Vietnamese first, English alongside) ----------

  const strings = {
    vi: {
      tagline: "Hạ tầng quản lý lịch hẹn",
      "nav.dashboard": "Tổng quan",
      "nav.bookings": "Lịch hẹn",
      "nav.availability": "Giờ làm việc",
      "nav.services": "Dịch vụ",
      "nav.resources": "Tài nguyên",
      "nav.widgets": "Widget đặt lịch",
      "nav.integrations": "Tích hợp",
      "nav.analytics": "Phân tích",
      "nav.notifications": "Thông báo",
      "nav.settings": "Cài đặt",
      "nav.soon": "Sắp có",
      "nav.label": "Các mục trong trang quản lý",
      "share.copy": "Sao chép link đặt lịch",
      "share.done": "Đã sao chép link đặt lịch",
      "search.placeholder": "Tìm lịch hẹn, khách hoặc dịch vụ",
      "search.label": "Tìm kiếm",
      quick: "Tạo nhanh",
      "quick.booking": "Lịch hẹn mới",
      "quick.service": "Dịch vụ mới",
      "quick.resource": "Tài nguyên mới",
      "quick.availability": "Lịch làm việc mới",
      "quick.widget": "Widget mới",
      "theme.toLight": "Chuyển sang giao diện sáng",
      "theme.toDark": "Chuyển sang giao diện tối",
      "lang.label": "Ngôn ngữ",
      "menu.open": "Mở menu",
      "side.close": "Thu gọn thanh bên",
      "side.open": "Giữ thanh bên luôn mở",
      signout: "Đăng xuất",
      notDesigned: "Trang này chưa có trong bản mẫu.",
      "org.name": "Tiệm tóc Mẫu",
      "org.role": "Chủ tiệm",
      "branch.label": "Chi nhánh đang xem",
      "branch.all": "Tất cả chi nhánh",
      "branch.some": ({ n }) => `${n} chi nhánh`,
    },
    en: {
      tagline: "Booking Management Infrastructure",
      "nav.dashboard": "Dashboard",
      "nav.bookings": "Bookings",
      "nav.availability": "Availability",
      "nav.services": "Services",
      "nav.resources": "Resources",
      "nav.widgets": "Widgets",
      "nav.integrations": "Integrations",
      "nav.analytics": "Analytics",
      "nav.notifications": "Notifications",
      "nav.settings": "Settings",
      "nav.soon": "Soon",
      "nav.label": "Dashboard sections",
      "share.copy": "Copy booking page link",
      "share.done": "Booking page link copied",
      "search.placeholder": "Search bookings, customers or services",
      "search.label": "Search",
      quick: "Quick create",
      "quick.booking": "New booking",
      "quick.service": "New service",
      "quick.resource": "New resource",
      "quick.availability": "New schedule",
      "quick.widget": "New widget",
      "theme.toLight": "Switch to light theme",
      "theme.toDark": "Switch to dark theme",
      "lang.label": "Language",
      "menu.open": "Open menu",
      "side.close": "Close sidebar",
      "side.open": "Keep sidebar open",
      signout: "Sign out",
      notDesigned: "This page is not in the mockup yet.",
      "org.name": "Sample Barbershop",
      "org.role": "Owner",
      "branch.label": "Branches shown",
      "branch.all": "All branches",
      "branch.some": ({ n }) => `${n} branches`,
    },
  };

  let lang = read(STORE.lang) === "en" ? "en" : "vi";
  const listeners = new Set();

  function t(key, vars) {
    const value = strings[lang][key] ?? strings.vi[key] ?? key;
    if (typeof value === "function") return value(vars || {});
    if (!vars) return value;
    return value.replace(/\{(\w+)\}/g, (_, name) => vars[name] ?? "");
  }

  function addStrings(extra) {
    Object.assign(strings.vi, extra.vi);
    Object.assign(strings.en, extra.en);
  }

  function setLang(next) {
    if (next === lang) return;
    lang = next;
    write(STORE.lang, lang);
    document.documentElement.lang = lang;
    render();
    listeners.forEach((fn) => fn());

    // The switches were redrawn, so start each thumb on the old side and let it slide.
    document.querySelectorAll(".lang-seg").forEach((seg) => {
      seg.style.setProperty("--i", lang === "vi" ? 1 : 0);
      requestAnimationFrame(() => seg.style.setProperty("--i", lang === "vi" ? 0 : 1));
    });
    [...document.querySelectorAll(`[data-lang="${lang}"]`)].find((btn) => btn.offsetParent)?.focus();
  }

  // ---------- Theme ----------

  const theme = () => document.documentElement.dataset.theme || "light";

  function setTheme(next) {
    document.documentElement.dataset.theme = next;
    write(STORE.theme, next);
    render();
    listeners.forEach((fn) => fn());
    document.querySelector("[data-theme-toggle]")?.focus();
  }

  // ---------- Icons ----------

  const ICONS = {
    grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    calendarCheck: '<rect x="3" y="4" width="18" height="17" rx="3"/><path d="M8 2v4M16 2v4M3 10h18M9 15.5l2 2 4-4"/>',
    calendar: '<rect x="3" y="4" width="18" height="17" rx="3"/><path d="M8 2v4M16 2v4M3 10h18"/>',
    rows: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    scissors: '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4 8.12 15.88M14.47 14.48 20 20M8.12 8.12 12 12"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    widget: '<rect x="3" y="3" width="18" height="7" rx="1.5"/><rect x="3" y="14" width="9" height="7" rx="1.5"/><rect x="16" y="14" width="5" height="7" rx="1.5"/>',
    plug: '<path d="M12 22v-5M9 8V2M15 8V2M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z"/>',
    chart: '<path d="M3 3v16a2 2 0 0 0 2 2h16M18 17V9M13 17V5M8 17v-3"/>',
    bell: '<path d="M10.27 21a2 2 0 0 0 3.46 0M3.26 15.33A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.67C19.41 13.96 18 12.5 18 8A6 6 0 0 0 6 8c0 4.5-1.41 5.96-2.74 7.33"/>',
    sliders: '<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
    moon: '<path d="M20.99 12.5A9 9 0 1 1 11.5 3a7 7 0 0 0 9.49 9.5Z"/>',
    copy: '<rect x="9" y="9" width="12" height="12" rx="2.5"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    x: '<path d="M6 6l12 12M18 6 6 18"/>',
    image: '<rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="9" cy="10" r="2"/><path d="m21 16-5-5L5 20"/>',
    trash: '<path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3"/>',
    swap: '<path d="M7 4 3 8l4 4M3 8h14M17 20l4-4-4-4M21 16H7"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',
    code: '<path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14"/>',
    pin: '<path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/>',
    tag: '<path d="M3 12V4h8l10 10-8 8L3 12Z"/><circle cx="8" cy="8" r="1.5"/>',
    eye: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
    up: '<path d="M12 19V5M6 11l6-6 6 6"/>',
    down: '<path d="M12 5v14M6 13l6 6 6-6"/>',
    chevron: '<path d="m6 9 6 6 6-6"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    seat: '<path d="M6 11V7a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v4"/><path d="M4 11a2 2 0 0 1 2 2v2h12v-2a2 2 0 1 1 4 0v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2ZM7 19v2M17 19v2"/>',
    box: '<path d="M21 8 12 3 3 8v8l9 5 9-5V8ZM3 8l9 5 9-5M12 13v8"/>',
    left: '<path d="m15 6-6 6 6 6"/>',
    right: '<path d="m9 6 6 6-6 6"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    panel: '<rect x="3" y="4" width="18" height="16" rx="3.5"/><path d="M9 4v16"/>',
    logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>',
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"/>',
  };

  function icon(name) {
    return `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ""}</svg>`;
  }

  // The mark: tile, window and folded corner. Same paths as the landing site.
  const TILE =
    "M281.25 18.75 A64 64 0 0 1 326.51 0 L864 0 A36 36 0 0 1 900 36 L900 573.49 A64 64 0 0 1 881.25 618.75 L618.75 881.25 A64 64 0 0 1 573.49 900 L36 900 A36 36 0 0 1 0 864 L0 326.51 A64 64 0 0 1 18.75 281.25 Z";
  const WINDOW =
    "M342 312 H534 A30 30 0 0 1 564 342 V534 A30 30 0 0 1 534 564 H342 A30 30 0 0 1 312 534 V342 A30 30 0 0 1 342 312 Z";
  // The logo is drawn twice (top bar, and the drawer on phones), so each copy
  // names its own clip.
  const brand = (where) =>
    `<a class="brand" href="/dashboard"><svg class="mark" viewBox="0 0 900 900" role="img" aria-label="pleasebookme"><defs><clipPath id="pbm-mark-${where}"><path d="${TILE}"/></clipPath></defs><path d="${TILE} ${WINDOW}" fill="currentColor" fill-rule="evenodd"/><path d="M600 600 L900 600 L600 900 Z" fill="var(--mark-fold)" clip-path="url(#pbm-mark-${where})"/></svg><span class="wordmark">PleaseBookMe</span></a>`;

  // ---------- Navigation (the sections Trung's app has today) ----------

  const NAV = [
    { id: "dashboard", icon: "grid", href: "/dashboard" },
    { id: "bookings", icon: "calendarCheck", href: "/dashboard/bookings" },
    { id: "availability", icon: "clock", href: "/dashboard/availability" },
    { id: "services", icon: "scissors", href: "/dashboard/services" },
    { id: "resources", icon: "users", href: "/dashboard/resources" },
    { id: "widgets", icon: "widget", href: "/dashboard/widgets" },
    { id: "analytics", icon: "chart", href: "/dashboard/analytics" },
    { id: "integrations", icon: "plug" },
  ];
  // On the server but not built into a page yet.
  const SOON = [
    { id: "notifications", icon: "bell" },
    { id: "settings", icon: "sliders" },
  ];

  const BOOKING_LINK = "pleasebookme.app/booking/tiem-toc-mau";
  let active = "dashboard";

  function navLink(item) {
    const current = item.id === active ? ' aria-current="page"' : "";
    const href = item.href || "#";
    const pending = item.href ? "" : " data-pending";
    return `<li><a class="nav-link" href="${href}"${current}${pending}>${icon(item.icon)}<span>${t("nav." + item.id)}</span></a></li>`;
  }

  function langSwitch(extraClass) {
    return `<div class="seg lang-seg ${extraClass}" role="group" aria-label="${t("lang.label")}" style="--n:2;--i:${lang === "vi" ? 0 : 1}">
        <button type="button" data-lang="vi" aria-pressed="${lang === "vi"}">VI</button>
        <button type="button" data-lang="en" aria-pressed="${lang === "en"}">EN</button>
      </div>`;
  }

  function renderSidebar() {
    const el = document.getElementById("sidebar");
    if (!el) return;
    el.innerHTML = `
      ${brand("drawer")}
      <p class="tagline">${t("tagline")}</p>
      <nav class="nav" aria-label="${t("nav.label")}">
        <ul>${NAV.map(navLink).join("")}</ul>
        <p class="nav-note">${t("nav.soon")}</p>
        <ul>${SOON.map(
          (item) =>
            `<li><span class="nav-link" aria-disabled="true">${icon(item.icon)}<span>${t("nav." + item.id)}</span></span></li>`
        ).join("")}</ul>
      </nav>
      <div class="sidebar-foot">
        <button class="share" type="button" data-share>${icon("copy")}<span>${t("share.copy")}</span></button>
        ${langSwitch("drawer-lang")}
        <div class="account">
          <span class="avatar" aria-hidden="true">S</span>
          <a class="account-text" href="/dashboard/profile"><strong>${t("org.name")}</strong><span>${t("org.role")}</span></a>
          <button class="icon-btn" type="button" aria-label="${t("signout")}" title="${t("signout")}">${icon("logout")}</button>
        </div>
      </div>`;
  }

  function renderTopbar() {
    const el = document.getElementById("topbar");
    if (!el) return;
    const dark = theme() === "dark";
    const themeLabel = t(dark ? "theme.toLight" : "theme.toDark");
    const closed = document.documentElement.dataset.sidebar === "collapsed";
    const sideLabel = t(closed ? "side.open" : "side.close");
    el.innerHTML = `
      ${brand("bar")}
      <button class="icon-btn side-btn" type="button" data-sidebar-toggle aria-pressed="${!closed}" aria-label="${sideLabel}" title="${sideLabel}">${icon("panel")}</button>
      <button class="icon-btn menu-btn" type="button" data-nav-toggle aria-label="${t("menu.open")}">${icon("menu")}</button>
      <label class="search">
        ${icon("search")}
        <span class="visually-hidden">${t("search.label")}</span>
        <input type="search" placeholder="${t("search.placeholder")}" />
      </label>
      ${langSwitch("")}
      <button class="icon-btn" type="button" data-theme-toggle aria-label="${themeLabel}" title="${themeLabel}">${icon(dark ? "sun" : "moon")}</button>
      <button class="btn btn-on-chrome" type="button" data-quick aria-haspopup="true" aria-expanded="false">${icon("plus")}<span class="quick-label">${t("quick")}</span></button>`;

    const menu = document.getElementById("quick-menu");
    if (menu) {
      menu.innerHTML = [
        ["calendarCheck", "quick.booking", "/dashboard/bookings#new"],
        ["scissors", "quick.service"],
        ["users", "quick.resource", "/dashboard/resources#new"],
        ["clock", "quick.availability", "/dashboard/availability#new"],
        ["widget", "quick.widget"],
      ]
        .map(([name, key, href]) =>
          href
            ? `<a href="${href}">${icon(name)}<span>${t(key)}</span></a>`
            : `<a href="#" data-pending>${icon(name)}<span>${t(key)}</span></a>`
        )
        .join("");
    }
  }

  function render() {
    renderSidebar();
    renderTopbar();
  }

  // ---------- Which branches a page shows ----------
  // Tổng quan and Lịch hẹn share one choice and keep it between visits. An
  // empty list means every branch. A shop with one branch, or with none, gets
  // no picker at all: branches are a resource the shop may never add.

  const branchListeners = new Set();
  const everyBranch = () => window.PBM_SAMPLE?.BRANCHES || [];

  function chosenBranches() {
    const known = everyBranch().map((b) => b.id);
    let ids = [];
    try {
      ids = JSON.parse(read(STORE.branches) || "[]").filter((id) => known.includes(id));
    } catch {
      /* an unreadable choice counts as "all" */
    }
    return ids.length === known.length ? [] : ids;
  }

  function branchLabel() {
    const ids = chosenBranches();
    if (!ids.length) return t("branch.all");
    if (ids.length === 1) return everyBranch().find((b) => b.id === ids[0]).name;
    return t("branch.some", { n: ids.length });
  }

  const branches = {
    get chosen() {
      return chosenBranches();
    },
    // True for a booking, person or place that belongs to a branch on show.
    has(id) {
      const ids = chosenBranches();
      return !ids.length || !id || ids.includes(id);
    },
    html() {
      const list = everyBranch();
      if (list.length < 2) return "";
      const ids = chosenBranches();
      const on = (id) => (!ids.length || ids.includes(id) ? "checked" : "");
      return `<details class="ticks" data-ticks="branches">
          <summary class="btn btn-quiet btn-small" aria-label="${t("branch.label")}: ${branchLabel()}">${icon("pin")}<span data-ticks-label>${branchLabel()}</span>${icon("chevron")}</summary>
          <div class="ticks-menu panel">
            <label class="tick"><input type="checkbox" value="" ${ids.length ? "" : "checked"} /><span>${t("branch.all")}</span></label>
            ${list
              .map(
                (b) =>
                  `<label class="tick"><input type="checkbox" value="${b.id}" ${on(b.id)} /><i class="code-dot code-${b.code}"></i><span>${b.name}</span></label>`
              )
              .join("")}
          </div>
        </details>`;
    },
    onChange: (fn) => branchListeners.add(fn),
  };

  function tickBranch(box) {
    const known = everyBranch().map((b) => b.id);
    let ids = [];
    if (box.value) {
      const current = chosenBranches();
      const shown = current.length ? current : known;
      ids = box.checked ? [...shown, box.value] : shown.filter((id) => id !== box.value);
      // Nothing ticked would show an empty page, so it falls back to everything.
      if (!ids.length || ids.length === known.length) ids = [];
    }
    write(STORE.branches, JSON.stringify(ids));

    // Update the ticks in place: redrawing the picker would close it mid-choice.
    document.querySelectorAll('[data-ticks="branches"]').forEach((picker) => {
      picker.querySelectorAll("input").forEach((input) => {
        input.checked = input.value ? !ids.length || ids.includes(input.value) : !ids.length;
      });
      picker.querySelector("[data-ticks-label]").textContent = branchLabel();
      picker.querySelector("summary").setAttribute("aria-label", `${t("branch.label")}: ${branchLabel()}`);
    });
    branchListeners.forEach((fn) => fn());
  }

  // ---------- Toast ----------

  let toastTimer;
  function toast(message) {
    document.querySelector(".toast")?.remove();
    clearTimeout(toastTimer);
    const el = document.createElement("div");
    el.className = "toast";
    el.setAttribute("role", "status");
    el.textContent = message;
    document.body.append(el);
    toastTimer = setTimeout(() => {
      el.classList.add("is-leaving");
      setTimeout(() => el.remove(), 260);
    }, 2600);
  }

  // ---------- Wiring ----------

  function closeMenu() {
    const menu = document.getElementById("quick-menu");
    if (menu && !menu.hidden) {
      menu.hidden = true;
      document.querySelector("[data-quick]")?.setAttribute("aria-expanded", "false");
    }
  }

  function mount(activeId) {
    active = activeId;
    document.documentElement.lang = lang;

    const canvas = document.createElement("div");
    canvas.className = "canvas";
    canvas.setAttribute("aria-hidden", "true");
    // Two quiet layers behind every page: a soft tint for the glass to pick
    // up, and the brand's grid. Nothing here moves.
    canvas.innerHTML = '<div class="canvas-glow"></div><div class="canvas-grid"></div>';
    document.body.prepend(canvas);

    // The one L-shaped piece of glass behind the top bar and the sidebar.
    const frame = document.createElement("div");
    frame.className = "frame";
    frame.setAttribute("aria-hidden", "true");
    frame.innerHTML = '<i class="frame-edge"></i>';
    canvas.after(frame);

    const menu = document.createElement("div");
    menu.id = "quick-menu";
    menu.className = "menu panel";
    menu.hidden = true;
    const scrim = document.createElement("div");
    scrim.className = "scrim";
    scrim.dataset.navToggle = "";
    document.body.append(menu, scrim);

    render();

    document.addEventListener("click", (event) => {
      const target = event.target.closest(
        "[data-lang],[data-theme-toggle],[data-quick],[data-share],[data-nav-toggle],[data-sidebar-toggle],[data-pending]"
      );
      if (!target) return closeMenu();

      if ("sidebarToggle" in target.dataset) {
        const root = document.documentElement;
        const next = root.dataset.sidebar === "collapsed" ? "open" : "collapsed";
        root.dataset.sidebar = next;
        write(STORE.sidebar, next);
        renderTopbar();
        return document.querySelector("[data-sidebar-toggle]")?.focus();
      }

      if (target.dataset.lang) return setLang(target.dataset.lang);
      if ("themeToggle" in target.dataset) return setTheme(theme() === "dark" ? "light" : "dark");
      if ("navToggle" in target.dataset) return document.body.classList.toggle("nav-open");
      if ("quick" in target.dataset) {
        menu.hidden = !menu.hidden;
        target.setAttribute("aria-expanded", String(!menu.hidden));
        return;
      }
      if ("share" in target.dataset) {
        navigator.clipboard?.writeText("https://" + BOOKING_LINK).catch(() => {});
        return toast(t("share.done"));
      }
      if ("pending" in target.dataset) {
        event.preventDefault();
        closeMenu();
        toast(t("notDesigned"));
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;
      closeMenu();
      document.querySelectorAll("details.ticks[open]").forEach((picker) => {
        picker.open = false;
        picker.querySelector("summary").focus();
      });
    });

    // A list of ticks closes when the click lands anywhere else.
    document.addEventListener("click", (event) => {
      document.querySelectorAll("details.ticks[open]").forEach((picker) => {
        if (!picker.contains(event.target)) picker.open = false;
      });
    });
    document.addEventListener("change", (event) => {
      const box = event.target.closest?.('[data-ticks="branches"] input');
      if (box) tickBranch(box);
    });
  }

  // Charts, tiles and calendar bookings grow in from nothing (a bar starts at
  // zero height). A page opened without being drawn, such as a background tab,
  // a hidden preview or a screenshot tool, never starts its clock, so they would
  // wait at nothing and the page would look empty. If no frame has been drawn a
  // moment after loading, every animation jumps to its end.
  addEventListener("load", () => {
    setTimeout(() => {
      if (document.timeline.currentTime) return;
      document.getAnimations().forEach((animation) => {
        try {
          animation.finish();
        } catch {
          /* an endless animation cannot finish; it has no empty start to hide */
        }
      });
    }, 1200);
  });

  window.PBM = {
    t,
    icon,
    toast,
    mount,
    addStrings,
    brand,
    branches,
    setLang,
    onChange: (fn) => listeners.add(fn),
    get lang() {
      return lang;
    },
    get locale() {
      return lang === "vi" ? "vi-VN" : "en-GB";
    },
  };
})();
