/* First-run setup: the shortest path from "just signed up" to a booking link
   the owner can send. Three steps, as Sonny chose: the shop's name, its hours,
   and one service. Address, logo, staff and the rest wait in the dashboard,
   listed on the last screen as what to do next.

   What each step becomes on the server:
   1. the organization (name and slug),
   2. one schedule with one start and end for the chosen days,
   3. one service with its length and price. */
(function () {
  "use strict";

  const { t, icon, toast } = PBM;

  PBM.addStrings({
    vi: {
      "doc.title": "Thiết lập tiệm | pleasebookme",
      step: ({ i }) => `Bước ${i}/3`,
      back: "Quay lại",
      next: "Tiếp tục",
      finish: "Tạo link đặt lịch",
      "s1.title": "Tiệm của bạn tên là gì?",
      "s1.lede": "Khách sẽ thấy tên này trên trang đặt lịch.",
      "s1.name": "Tên tiệm",
      "s1.name.ph": "Tiệm tóc Mẫu",
      "s1.name.error": "Hãy nhập tên tiệm.",
      "s1.link": "Link đặt lịch",
      "s1.link.hint": "Tạo từ tên tiệm. Bạn sửa được bây giờ; sau khi tạo thì link giữ nguyên.",
      "s1.link.error": "Chỉ dùng chữ thường không dấu, số và dấu gạch nối.",
      "s1.kind": "Tiệm của bạn làm gì?",
      "s1.kind.hint": "Không bắt buộc. Chỉ để gợi ý dịch vụ ở bước 3.",
      "kind.barber": "Cắt tóc nam",
      "kind.salon": "Salon tóc",
      "kind.nail": "Nail",
      "kind.pmu": "Phun xăm thẩm mỹ",
      "kind.other": "Khác",
      "s2.title": "Tiệm mở cửa lúc nào?",
      "s2.lede": "Khách chỉ đặt được trong giờ này. Giờ riêng cho từng ngày sửa sau trong Giờ làm việc.",
      "s2.days": "Những ngày mở cửa",
      "s2.days.error": "Chọn ít nhất một ngày.",
      "s2.from": "Mở cửa",
      "s2.to": "Đóng cửa",
      "s2.time.error": "Giờ đóng cửa phải sau giờ mở cửa.",
      "s2.sum": ({ d, h }) => `Mở ${d} ngày mỗi tuần, ${h} giờ mỗi ngày.`,
      "s3.title": "Dịch vụ đầu tiên",
      "s3.lede": "Một dịch vụ là đủ để nhận lịch. Thêm các dịch vụ khác sau.",
      "s3.suggest": "Gợi ý",
      "s3.name": "Tên dịch vụ",
      "s3.name.ph": "Cắt tóc",
      "s3.name.error": "Hãy nhập tên dịch vụ.",
      "s3.min": "Thời lượng",
      "s3.min.unit": "phút",
      "s3.min.error": "Thời lượng phải lớn hơn 0.",
      "s3.price": "Giá",
      "s3.price.hint": "Để 0 nếu chưa muốn hiện giá.",
      "done.title": "Link đặt lịch của bạn đã sẵn sàng",
      "done.lede": ({ name }) => `Gửi link này cho khách của ${name}, hoặc in mã QR để ở quầy.`,
      copy: "Sao chép link",
      copied: "Đã sao chép link đặt lịch",
      "done.open": "Vào trang quản lý",
      "done.next": "Nên làm tiếp",
      "todo.staff": "Thêm thợ",
      "todo.staff.sub": "Để hai khách đặt cùng giờ với hai người khác nhau.",
      "todo.profile": "Thêm địa chỉ, số điện thoại và logo",
      "todo.profile.sub": "Khách thấy những thông tin này trên trang đặt lịch.",
      "todo.services": "Thêm dịch vụ khác",
      "todo.services.sub": "Đặt ảnh, giá và quy định riêng cho từng dịch vụ.",
      "todo.widget": "Gắn nút đặt lịch vào website",
      "todo.widget.sub": "Nếu tiệm có website hoặc trang riêng.",
      min: ({ n }) => `${n} phút`,
      note: "Bản thiết kế. Chưa có gì được lưu.",
    },
    en: {
      "doc.title": "Set up your shop | pleasebookme",
      step: ({ i }) => `Step ${i} of 3`,
      back: "Back",
      next: "Continue",
      finish: "Create my booking link",
      "s1.title": "What is your shop called?",
      "s1.lede": "Customers see this name on your booking page.",
      "s1.name": "Shop name",
      "s1.name.ph": "Sample Barbershop",
      "s1.name.error": "Enter your shop's name.",
      "s1.link": "Booking link",
      "s1.link.hint": "Made from the name. You can change it now; once created, the link stays the same.",
      "s1.link.error": "Use lowercase letters, numbers and hyphens only.",
      "s1.kind": "What does your shop do?",
      "s1.kind.hint": "Optional. It only suggests services in step 3.",
      "kind.barber": "Barbershop",
      "kind.salon": "Hair salon",
      "kind.nail": "Nails",
      "kind.pmu": "Permanent make-up",
      "kind.other": "Something else",
      "s2.title": "When is the shop open?",
      "s2.lede": "Customers can only book inside these hours. Different hours for single days can be set later in Availability.",
      "s2.days": "Days you are open",
      "s2.days.error": "Choose at least one day.",
      "s2.from": "Opens",
      "s2.to": "Closes",
      "s2.time.error": "Closing time must be after opening time.",
      "s2.sum": ({ d, h }) => `Open ${d} ${d === 1 ? "day" : "days"} a week, ${h} hours a day.`,
      "s3.title": "Your first service",
      "s3.lede": "One service is enough to take bookings. Add the others later.",
      "s3.suggest": "Suggestions",
      "s3.name": "Service name",
      "s3.name.ph": "Haircut",
      "s3.name.error": "Enter the service's name.",
      "s3.min": "Length",
      "s3.min.unit": "min",
      "s3.min.error": "The length must be more than 0.",
      "s3.price": "Price",
      "s3.price.hint": "Leave 0 if you do not want to show a price yet.",
      "done.title": "Your booking link is ready",
      "done.lede": ({ name }) => `Send this link to ${name}'s customers, or print the QR code for the counter.`,
      copy: "Copy link",
      copied: "Booking link copied",
      "done.open": "Open the dashboard",
      "done.next": "Worth doing next",
      "todo.staff": "Add your barbers",
      "todo.staff.sub": "So two customers can book the same time with two different people.",
      "todo.profile": "Add your address, phone number and logo",
      "todo.profile.sub": "Customers see these on your booking page.",
      "todo.services": "Add more services",
      "todo.services.sub": "Give each one a photo, a price and its own rules.",
      "todo.widget": "Put a booking button on your website",
      "todo.widget.sub": "If the shop has a website or a page of its own.",
      min: ({ n }) => `${n} min`,
      note: "A design mockup. Nothing is saved.",
    },
  });

  // First services to offer, by what the shop does: [vi, en, minutes, price].
  const SUGGEST = {
    barber: [
      ["Cắt tóc", "Haircut", 30, 80000],
      ["Cắt và cạo râu", "Haircut and beard", 45, 110000],
      ["Cạo mặt", "Shave", 20, 40000],
    ],
    salon: [
      ["Cắt tóc", "Haircut", 45, 120000],
      ["Gội và sấy", "Wash and blow-dry", 30, 60000],
      ["Nhuộm tóc", "Colour", 120, 450000],
    ],
    nail: [
      ["Sơn gel", "Gel polish", 45, 150000],
      ["Cắt da, sửa móng", "Manicure", 30, 60000],
      ["Đắp bột", "Acrylic set", 90, 350000],
    ],
    pmu: [
      ["Tư vấn", "Consultation", 30, 0],
      ["Phun mày", "Brow tattoo", 120, 2500000],
      ["Dặm lại", "Touch-up", 60, 500000],
    ],
    other: [],
  };
  const KINDS = Object.keys(SUGGEST);
  const WEEK = [1, 2, 3, 4, 5, 6, 0]; // Monday first; 0 is Sunday
  const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

  const state = {
    step: 1, // 1 to 3, then 4 for the link
    tried: false,
    slugEdited: false,
    name: "",
    slug: "",
    kind: "",
    days: [...WEEK],
    from: 8 * 60,
    to: 20 * 60,
    svc: "",
    min: 30,
    price: 0,
  };

  const $ = (id) => document.getElementById(id);
  const esc = (text) => String(text).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  const pad = (n) => String(n).padStart(2, "0");
  const clock = (m) => pad(Math.floor(m / 60)) + ":" + pad(m % 60);
  const money = (n) => new Intl.NumberFormat(PBM.locale, { style: "currency", currency: "VND" }).format(n);
  const slugOf = (name) =>
    name
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  const dayName = (value) =>
    new Intl.DateTimeFormat(PBM.locale, { weekday: "short" }).format(new Date(2026, 9, 12 + WEEK.indexOf(value)));
  const timeOptions = (chosen) => {
    let html = "";
    for (let m = 5 * 60; m <= 23 * 60; m += 30) html += `<option value="${m}" ${m === chosen ? "selected" : ""}>${clock(m)}</option>`;
    return html;
  };
  const link = () => `pleasebookme.app/booking/${state.slug || "..."}`;

  // What is wrong on the step in view, by field.
  function problems() {
    const e = {};
    if (state.step === 1) {
      if (!state.name.trim()) e.name = "s1.name.error";
      if (!SLUG.test(state.slug)) e.slug = "s1.link.error";
    } else if (state.step === 2) {
      if (!state.days.length) e.days = "s2.days.error";
      if (state.to <= state.from) e.time = "s2.time.error";
    } else if (state.step === 3) {
      if (!state.svc.trim()) e.svc = "s3.name.error";
      if (!(state.min > 0)) e.min = "s3.min.error";
    }
    return e;
  }

  const error = (errors, key) => `<span class="error" ${state.tried && errors[key] ? "" : "hidden"}>${errors[key] ? t(errors[key]) : ""}</span>`;
  const bad = (errors, key) => (state.tried && errors[key] ? 'aria-invalid="true"' : "");

  function stepOne(e) {
    return `
      <div class="field">
        <label for="s-name">${t("s1.name")}</label>
        <input class="input is-big" id="s-name" data-k="name" value="${esc(state.name)}" placeholder="${t("s1.name.ph")}" autocomplete="organization" ${bad(e, "name")} />
        ${error(e, "name")}
      </div>
      <div class="field">
        <label for="s-slug">${t("s1.link")}</label>
        <div class="slug"><span>pleasebookme.app/booking/</span><input class="input" id="s-slug" data-k="slug" value="${esc(state.slug)}" spellcheck="false" autocomplete="off" ${bad(e, "slug")} /></div>
        <small>${t("s1.link.hint")}</small>
        ${error(e, "slug")}
      </div>
      <div class="field">
        <span class="label" id="kind-label">${t("s1.kind")}</span>
        <div class="chips" role="radiogroup" aria-labelledby="kind-label">
          ${KINDS.map(
            (kind) =>
              `<label class="chip-pick is-plain"><input class="visually-hidden" type="radio" name="kind" value="${kind}" ${state.kind === kind ? "checked" : ""} /><span>${t("kind." + kind)}</span></label>`
          ).join("")}
        </div>
        <small>${t("s1.kind.hint")}</small>
      </div>`;
  }

  function stepTwo(e) {
    const hours = Math.max(0, Math.round(((state.to - state.from) / 60) * 10) / 10);
    return `
      <div class="field">
        <span class="label" id="days-label">${t("s2.days")}</span>
        <div class="chips" role="group" aria-labelledby="days-label">
          ${WEEK.map(
            (value) =>
              `<label class="chip-pick is-plain"><input class="visually-hidden" type="checkbox" name="day" value="${value}" ${state.days.includes(value) ? "checked" : ""} /><span>${dayName(value)}</span></label>`
          ).join("")}
        </div>
        ${error(e, "days")}
      </div>
      <div class="field-pair">
        <div class="field"><label for="s-from">${t("s2.from")}</label><select class="input num" id="s-from" data-k="from">${timeOptions(state.from)}</select></div>
        <div class="field"><label for="s-to">${t("s2.to")}</label><select class="input num" id="s-to" data-k="to" ${bad(e, "time")}>${timeOptions(state.to)}</select></div>
      </div>
      ${error(e, "time")}
      <p class="setup-sum" id="sum">${state.days.length && hours > 0 ? t("s2.sum", { d: state.days.length, h: hours }) : ""}</p>`;
  }

  function stepThree(e) {
    const ideas = SUGGEST[state.kind || "barber"];
    return `
      ${
        ideas.length
          ? `<div class="field">
              <span class="label">${t("s3.suggest")}</span>
              <div class="ideas">${ideas
                .map(
                  ([vi, en, min, price], i) =>
                    `<button type="button" class="idea" data-idea="${i}"><strong>${PBM.lang === "vi" ? vi : en}</strong><span class="num">${t("min", { n: min })}${price ? ", " + money(price) : ""}</span></button>`
                )
                .join("")}</div>
            </div>`
          : ""
      }
      <div class="field">
        <label for="s-svc">${t("s3.name")}</label>
        <input class="input" id="s-svc" data-k="svc" value="${esc(state.svc)}" placeholder="${t("s3.name.ph")}" autocomplete="off" ${bad(e, "svc")} />
        ${error(e, "svc")}
      </div>
      <div class="field-pair">
        <div class="field">
          <label for="s-min">${t("s3.min")}</label>
          <div class="with-unit"><input class="input num" id="s-min" data-k="min" type="number" min="5" step="5" value="${state.min}" ${bad(e, "min")} /><span>${t("s3.min.unit")}</span></div>
          ${error(e, "min")}
        </div>
        <div class="field">
          <label for="s-price">${t("s3.price")}</label>
          <div class="with-unit"><input class="input num" id="s-price" data-k="price" type="number" min="0" step="1000" value="${state.price}" /><span>₫</span></div>
          <small>${t("s3.price.hint")}</small>
        </div>
      </div>`;
  }

  // Not a real code: a fixed pattern drawn from the link, to show where the QR sits.
  function qr(text) {
    const n = 21;
    let seed = 7;
    for (const ch of text) seed = (seed * 31 + ch.charCodeAt(0)) >>> 0;
    const next = () => (seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296;
    let cells = "";
    for (let y = 0; y < n; y++) {
      for (let x = 0; x < n; x++) {
        const corner = (x < 7 || x >= n - 7) && (y < 7 || y >= n - 7) && !(x >= n - 7 && y >= n - 7);
        const on = corner ? x % 6 === 0 || y % 6 === 0 || ((x % (n - 7)) > 1 && (x % (n - 7)) < 5 && (y % (n - 7)) > 1 && (y % (n - 7)) < 5) : next() > 0.52;
        if (on) cells += `<rect x="${x}" y="${y}" width="1" height="1"/>`;
      }
    }
    return `<svg class="qr" viewBox="0 0 ${n} ${n}" aria-hidden="true">${cells}</svg>`;
  }

  function doneHTML() {
    const todo = [
      ["users", "staff", "/dashboard/resources#new"],
      ["pin", "profile", "/dashboard/profile"],
      ["scissors", "services", "/dashboard/services"],
      ["code", "widget", "/dashboard/widgets"],
    ];
    return `
      <section class="panel setup-card is-done">
        <span class="setup-tick" aria-hidden="true">${icon("check")}</span>
        <h1 tabindex="-1" id="setup-title">${t("done.title")}</h1>
        <p class="setup-lede">${esc(t("done.lede", { name: state.name.trim() }))}</p>
        <div class="ready">
          ${qr(link())}
          <div class="ready-link">
            <code>${esc(link())}</code>
            <div class="ready-actions">
              <button class="btn btn-primary" type="button" data-copy>${icon("copy")}${t("copy")}</button>
              <a class="btn btn-quiet" href="/dashboard">${t("done.open")}</a>
            </div>
          </div>
        </div>
      </section>
      <section class="setup-next" aria-labelledby="next-title">
        <h2 id="next-title">${t("done.next")}</h2>
        <ul>${todo
          .map(
            ([glyph, key, href]) =>
              `<li><a href="${href}">${icon(glyph)}<span><strong>${t("todo." + key)}</strong><small>${t("todo." + key + ".sub")}</small></span>${icon("right")}</a></li>`
          )
          .join("")}</ul>
      </section>`;
  }

  function render(focusTitle) {
    document.title = t("doc.title");
    $("lang").innerHTML = `<div class="seg" role="group" aria-label="${t("lang.label")}" style="--n:2;--i:${PBM.lang === "vi" ? 0 : 1}">
        <button type="button" data-lang="vi" aria-pressed="${PBM.lang === "vi"}">VI</button>
        <button type="button" data-lang="en" aria-pressed="${PBM.lang === "en"}">EN</button>
      </div>`;

    if (state.step === 4) {
      $("view").innerHTML = doneHTML() + `<p class="note">${t("note")}</p>`;
    } else {
      const e = problems();
      const body = [stepOne, stepTwo, stepThree][state.step - 1](e);
      $("view").innerHTML = `
        <form class="panel setup-card" id="form" novalidate>
          <div class="setup-progress" role="img" aria-label="${t("step", { i: state.step })}">${[1, 2, 3]
            .map((i) => `<i class="${i <= state.step ? "is-on" : ""}"></i>`)
            .join("")}</div>
          <p class="setup-step">${t("step", { i: state.step })}</p>
          <h1 tabindex="-1" id="setup-title">${t(`s${state.step}.title`)}</h1>
          <p class="setup-lede">${t(`s${state.step}.lede`)}</p>
          <div class="setup-fields">${body}</div>
          <footer class="setup-foot">
            ${state.step > 1 ? `<button class="btn btn-quiet" type="button" data-back>${t("back")}</button>` : "<span></span>"}
            <button class="btn btn-primary" type="submit">${t(state.step === 3 ? "finish" : "next")}</button>
          </footer>
        </form>
        <p class="note">${t("note")}</p>`;
    }
    if (focusTitle) $("setup-title").focus();
  }

  // ---------- Events ----------

  const view = $("view");

  view.addEventListener("input", (event) => {
    const el = event.target;
    const key = el.dataset.k;
    if (!key) return;
    if (key === "min" || key === "price") state[key] = Math.max(0, Number(el.value) || 0);
    else if (key === "from" || key === "to") return; // selects are handled on change
    else state[key] = el.value;
    if (key === "slug") state.slugEdited = true;
    // The link follows the name until the owner types a link of their own.
    if (key === "name" && !state.slugEdited) {
      state.slug = slugOf(el.value);
      $("s-slug").value = state.slug;
    }
  });

  view.addEventListener("change", (event) => {
    const el = event.target;
    if (el.name === "kind") state.kind = el.value;
    else if (el.name === "day") {
      const value = Number(el.value);
      state.days = el.checked ? [...state.days, value] : state.days.filter((d) => d !== value);
    } else if (el.dataset.k === "from" || el.dataset.k === "to") state[el.dataset.k] = Number(el.value);
    else return;
    if (state.step === 2) {
      const id = el.id;
      const value = el.name === "day" ? el.value : null;
      render(false);
      (value !== null ? view.querySelector(`[name="day"][value="${value}"]`) : $(id))?.focus();
    }
  });

  view.addEventListener("click", (event) => {
    const idea = event.target.closest("[data-idea]");
    if (idea) {
      const [vi, en, min, price] = SUGGEST[state.kind || "barber"][Number(idea.dataset.idea)];
      Object.assign(state, { svc: PBM.lang === "vi" ? vi : en, min, price });
      render(false);
      return $("s-svc").focus();
    }
    if (event.target.closest("[data-back]")) {
      state.step -= 1;
      state.tried = false;
      return render(true);
    }
    if (event.target.closest("[data-copy]")) {
      navigator.clipboard?.writeText("https://" + link()).catch(() => {});
      toast(t("copied"));
    }
  });

  view.addEventListener("submit", (event) => {
    event.preventDefault();
    const e = problems();
    if (Object.keys(e).length) {
      state.tried = true;
      render(false);
      return view.querySelector('[aria-invalid="true"], [name="day"]')?.focus();
    }
    state.step += 1;
    state.tried = false;
    render(true);
    scrollTo(0, 0);
  });

  document.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-lang]");
    if (btn) PBM.setLang(btn.dataset.lang);
  });

  PBM.onChange(() => render(false));
  $("brand").innerHTML = PBM.brand("setup");
  document.documentElement.lang = PBM.lang;
  render(false);
  $("s-name")?.focus();
})();
