/* The customer's own page for one booking: see it, move it, or cancel it.

   The rules, as Sonny set them:
   - A customer may change or cancel until the shop's notice time before the
     booking starts (the same number as "Báo trước tối thiểu").
   - After that the page offers the shop's phone number instead.
   - Changing means picking another date and time; the services stay.
   - A new time goes back to "waiting" when the shop confirms bookings by hand. */
(function () {
  "use strict";

  // This page is about one example booking, so it reads the example shop
  // (a menu, a branch, a barber), which stays whether or not the dashboard's
  // sample shop has been set up (see EXAMPLE in sample.js).
  const { TODAY, NOW } = PBM_SAMPLE;
  const { SHOP, SERVICES, BRANCHES, STAFF } = PBM_SAMPLE.EXAMPLE;

  const STRINGS = {
    vi: {
      title: "Lịch hẹn của bạn",
      "st.confirmed": "Đã xác nhận",
      "st.pending": "Chờ tiệm xác nhận",
      "st.cancelled": "Đã huỷ",
      "st.past": "Đã diễn ra",
      when: "Khi nào",
      where: "Ở đâu",
      who: "Người làm",
      "who.any": "Tiệm sẽ xếp người",
      code: "Mã lịch hẹn",
      total: "Tổng",
      change: "Đổi giờ",
      cancel: "Huỷ lịch",
      until: ({ time }) => `Bạn đổi hoặc huỷ được đến ${time}.`,
      late: ({ hours }) => `Còn chưa đầy ${hours} là đến giờ hẹn, nên không đổi hay huỷ ở đây được nữa. Hãy gọi cho tiệm.`,
      call: ({ phone }) => `Gọi tiệm: ${phone}`,
      "pending.note": "Tiệm chưa xác nhận lịch này. Bạn vẫn đổi hoặc huỷ được.",
      "cancelled.note": "Lịch này đã được huỷ. Giờ đó đã trả lại cho tiệm.",
      "past.note": "Cảm ơn bạn đã đến.",
      again: "Đặt lịch mới",
      "pick.date": "Chọn ngày mới",
      "pick.time": "Chọn giờ mới",
      "pick.note": "Ngày tô nền là ngày còn giờ trống.",
      fits: ({ len }) => `Giờ nào dưới đây cũng đủ cho ${len}.`,
      next: "Tiếp tục",
      back: "Quay lại",
      keep: "Giữ lịch cũ",
      "confirm.change": "Đổi sang giờ này",
      "confirm.title": "Xác nhận giờ mới",
      from: "Từ",
      to: "Sang",
      "changed.auto": "Đã đổi giờ. Hẹn gặp bạn!",
      "changed.manual": "Đã gửi giờ mới. Tiệm sẽ xác nhận với bạn.",
      "cancel.title": "Huỷ lịch này?",
      "cancel.text": "Giờ này sẽ được trả lại cho tiệm. Nếu muốn đến vào lúc khác, bạn có thể đổi giờ.",
      "cancel.reason": "Lý do (không bắt buộc)",
      "cancel.yes": "Huỷ lịch",
      "cancel.no": "Không huỷ",
      prev: "Tháng trước",
      nextMonth: "Tháng sau",
      mock: "Bản mẫu: xem trạng thái khác của trang",
      "mock.open": "Còn đổi được",
      "mock.pending": "Chờ xác nhận",
      "mock.late": "Sát giờ hẹn",
      "mock.cancelled": "Đã huỷ",
      "mock.past": "Đã qua",
      min: (n) => `${n} phút`,
      hours: (n) => `${n} giờ`,
      locale: "vi-VN",
    },
    en: {
      title: "Your booking",
      "st.confirmed": "Confirmed",
      "st.pending": "Unconfirmed",
      "st.cancelled": "Canceled",
      "st.past": "Completed",
      when: "When",
      where: "Where",
      who: "With",
      "who.any": "The shop will assign someone",
      code: "Booking code",
      total: "Total",
      change: "Reschedule",
      cancel: "Cancel booking",
      until: ({ time }) => `You can reschedule or cancel until ${time}.`,
      late: ({ hours }) => `Your booking starts in less than ${hours}, so it can no longer be changed or canceled here. Please call the shop.`,
      call: ({ phone }) => `Call the shop: ${phone}`,
      "pending.note": "The shop has not confirmed this booking yet. You can still reschedule or cancel it.",
      "cancelled.note": "This booking has been canceled. The time has gone back to the shop.",
      "past.note": "Thank you for coming.",
      again: "Book again",
      "pick.date": "Select a new date",
      "pick.time": "Select a new time",
      "pick.note": "Shaded days still have free times.",
      fits: ({ len }) => `Every time below has room for ${len}.`,
      next: "Continue",
      back: "Back",
      keep: "Keep my booking",
      "confirm.change": "Reschedule to this time",
      "confirm.title": "Confirm the new time",
      from: "From",
      to: "To",
      "changed.auto": "Your booking has been rescheduled. See you soon!",
      "changed.manual": "Your new time has been submitted. The shop will confirm it.",
      "cancel.title": "Cancel this booking?",
      "cancel.text": "The time goes back to the shop. If you would like to come at another time, you can reschedule instead.",
      "cancel.reason": "Reason for cancellation (optional)",
      "cancel.yes": "Cancel booking",
      "cancel.no": "Nevermind",
      prev: "Previous month",
      nextMonth: "Next month",
      mock: "Mockup only: see the page's other states",
      "mock.open": "Can still reschedule",
      "mock.pending": "Waiting",
      "mock.late": "Close to the time",
      "mock.cancelled": "Canceled",
      "mock.past": "Past",
      min: (n) => `${n} min`,
      hours: (n) => `${n} ${n === 1 ? "hour" : "hours"}`,
      locale: "en-US",
    },
  };

  // ---------- The booking on show ----------

  const branch = BRANCHES[0];
  const barber = STAFF[1]; // Khoa does both of the services below
  const booking = {
    code: "BK-7A62C1",
    services: ["cut", "shave"], // the same pair as the receipt: 80.000 + 40.000 = 120.000
    date: new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate() + 2),
    start: 15 * 60,
  };

  const state = {
    lang: "en",
    mode: "open", // which state of the page the mockup shows
    view: "main", // "main", "date", "time", "confirm", "changed", "cancel"
    pick: { date: null, month: null, slot: null },
  };

  const $ = (id) => document.getElementById(id);
  const words = () => STRINGS[state.lang];
  const t = (key, vars) => {
    const value = words()[key];
    return typeof value === "function" ? value(vars || {}) : value;
  };
  const pad = (n) => String(n).padStart(2, "0");
  const clock = (m) => pad(Math.floor(m / 60)) + ":" + pad(m % 60);
  const iso = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const dayOf = (text) => {
    const [y, m, d] = text.split("-").map(Number);
    return new Date(y, m - 1, d);
  };
  const fmt = (opts, d) => new Intl.DateTimeFormat(words().locale, opts).format(d);
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const cash = (n) => new Intl.NumberFormat(words().locale, { style: "currency", currency: "VND" }).format(n);
  const length = (m) =>
    m % 60 === 0 ? words().hours(m / 60) : m > 60 ? `${words().hours(Math.floor(m / 60))} ${words().min(m % 60)}` : words().min(m);
  const minutes = booking.services.reduce((sum, id) => sum + SERVICES[id].min, 0);
  const longDay = (d) => cap(fmt({ weekday: "long", day: "numeric", month: "long" }, d));
  const span = (start) => `${clock(start)} – ${clock(start + minutes)}`;
  const icon = (paths) => `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${paths}</svg>`;
  const ICON = {
    scissors: '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4 8.12 15.88M14.47 14.48 20 20M8.12 8.12 12 12"/>',
    left: '<path d="m15 6-6 6 6 6"/>',
    right: '<path d="m9 6 6 6-6 6"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    phone:
      '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"/>',
  };

  // The last moment the customer may change or cancel: the shop's notice before the start.
  function cutOff() {
    const m = booking.start - SHOP.notice;
    return `${clock(m)} ${fmt({ weekday: "long", day: "numeric", month: "numeric" }, booking.date)}`;
  }

  // ---------- Parts ----------

  const head = () => `
      <header class="shop">
        <span class="logo" aria-hidden="true">${icon(ICON.scissors)}</span>
        <span class="shop-text"><strong>${state.lang === "vi" ? "Tiệm tóc Mẫu" : "Sample Barbershop"}</strong><span>${branch.address}</span></span>
        <button type="button" class="lang" data-lang>${state.lang === "vi" ? "EN" : "VI"}</button>
      </header>`;

  function billHTML() {
    const total = booking.services.reduce((sum, id) => sum + SERVICES[id].price, 0);
    return `<table class="bill">
        <tbody>${booking.services
          .map((id) => `<tr><th scope="row">${SERVICES[id][state.lang]}</th><td>${length(SERVICES[id].min)}</td><td class="num">${cash(SERVICES[id].price)}</td></tr>`)
          .join("")}</tbody>
        <tfoot><tr><th scope="row">${t("total")}</th><td>${length(minutes)}</td><td class="num">${cash(total)}</td></tr></tfoot>
      </table>`;
  }

  function mainHTML() {
    const mode = state.mode;
    const status = { open: "confirmed", late: "confirmed", pending: "pending", cancelled: "cancelled", past: "past" }[mode];
    const canAct = mode === "open" || mode === "pending";
    let foot = "";
    if (canAct) {
      foot = `
        ${mode === "pending" ? `<p class="note">${t("pending.note")}</p>` : ""}
        <div class="actions">
          <button type="button" class="btn" data-go="date">${t("change")}</button>
          <button type="button" class="btn is-quiet" data-go="cancel">${t("cancel")}</button>
        </div>
        <p class="note">${t("until", { time: cutOff() })}</p>`;
    } else if (mode === "late") {
      foot = `
        <p class="note is-strong">${t("late", { hours: length(SHOP.notice) })}</p>
        <div class="actions"><a class="btn" href="tel:${SHOP.phone.replace(/\s/g, "")}">${icon(ICON.phone)}${t("call", { phone: SHOP.phone })}</a></div>`;
    } else {
      foot = `
        <p class="note">${t(mode === "cancelled" ? "cancelled.note" : "past.note")}</p>
        <div class="actions"><a class="btn" href="/dashboard/widgets">${t("again")}</a></div>`;
    }
    return `${head()}
      <div class="body">
        <p class="status st-${status}">${t("st." + status)}</p>
        <h1 class="${mode === "cancelled" ? "is-struck" : ""}">${longDay(booking.date)}<br /><span class="num">${span(booking.start)}</span></h1>
        <dl class="facts">
          <div><dt>${t("where")}</dt><dd>${branch.name}<br /><span>${branch.address}</span></dd></div>
          <div><dt>${t("who")}</dt><dd>${barber.name}</dd></div>
          <div><dt>${t("code")}</dt><dd class="num">${booking.code}</dd></div>
        </dl>
        ${billHTML()}
      </div>
      <footer class="foot">${foot}</footer>`;
  }

  // Pretend free days and times, steady for the same date.
  const roll = (text) => Math.imul([...text].reduce((n, ch) => (Math.imul(n, 31) + ch.charCodeAt(0)) >>> 0, 7), 2654435761) >>> 16;
  const lastDay = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate() + SHOP.ahead);
  const openDay = (d) => d >= TODAY && d <= lastDay && roll("day" + iso(d)) % 7 !== 0;
  function slotsFor(dateText) {
    const list = [];
    const earliest = dateText === iso(TODAY) ? NOW + SHOP.notice : 0;
    for (let m = 8 * 60; m + minutes <= 20 * 60; m += 30) {
      if (m >= earliest && roll(dateText + m) % 10 < 5) list.push(m);
    }
    return list;
  }

  function dateHTML() {
    const pick = state.pick;
    const monthOf = (d) => d.getFullYear() * 12 + d.getMonth();
    const shown = Math.min(Math.max(pick.month ?? monthOf(pick.date ? dayOf(pick.date) : TODAY), monthOf(TODAY)), monthOf(lastDay));
    const start = new Date(Math.floor(shown / 12), shown % 12, 1);
    const blanks = (start.getDay() + 6) % 7;
    const daysIn = new Date(start.getFullYear(), start.getMonth() + 1, 0).getDate();
    const heads = Array.from({ length: 7 }, (_, i) => `<b>${fmt({ weekday: "narrow" }, new Date(2026, 9, 12 + i))}</b>`).join("");
    const cells = Array.from({ length: daysIn }, (_, i) => {
      const d = new Date(start.getFullYear(), start.getMonth(), i + 1);
      const on = pick.date === iso(d);
      return `<button type="button" class="date num${on ? " is-on" : ""}${iso(d) === iso(TODAY) ? " is-today" : ""}" data-date="${iso(d)}" aria-pressed="${on}" aria-label="${longDay(d)}" ${
        openDay(d) ? "" : "disabled"
      }>${i + 1}</button>`;
    }).join("");
    return `${head()}
      <div class="body">
        <h2>${t("pick.date")}</h2>
        <div class="month">
          <strong>${cap(fmt({ month: "long", year: "numeric" }, start))}</strong>
          <button type="button" data-month="${shown - 1}" aria-label="${t("prev")}" ${shown > monthOf(TODAY) ? "" : "disabled"}>${icon(ICON.left)}</button>
          <button type="button" data-month="${shown + 1}" aria-label="${t("nextMonth")}" ${shown < monthOf(lastDay) ? "" : "disabled"}>${icon(ICON.right)}</button>
        </div>
        <div class="cal">${heads}${"<span></span>".repeat(blanks)}${cells}</div>
        <p class="note">${t("pick.note")}</p>
      </div>
      <footer class="foot"><div class="actions">
        <button type="button" class="btn is-quiet" data-go="main">${t("keep")}</button>
        <button type="button" class="btn" data-go="time" ${pick.date ? "" : "disabled"}>${t("next")}</button>
      </div></footer>`;
  }

  function timeHTML() {
    const pick = state.pick;
    const slots = slotsFor(pick.date);
    return `${head()}
      <div class="body">
        <h2>${t("pick.time")}</h2>
        <p class="note">${longDay(dayOf(pick.date))}. ${t("fits", { len: length(minutes) })}</p>
        <div class="slots">${slots
          .map((m) => `<button type="button" class="slot num${m === pick.slot ? " is-on" : ""}" data-slot="${m}" aria-pressed="${m === pick.slot}">${clock(m)}</button>`)
          .join("")}</div>
      </div>
      <footer class="foot"><div class="actions">
        <button type="button" class="btn is-quiet" data-go="date">${t("back")}</button>
        <button type="button" class="btn" data-go="confirm" ${pick.slot === null ? "disabled" : ""}>${t("next")}</button>
      </div></footer>`;
  }

  function confirmHTML() {
    const pick = state.pick;
    return `${head()}
      <div class="body">
        <h2>${t("confirm.title")}</h2>
        <dl class="swap">
          <div class="is-old"><dt>${t("from")}</dt><dd>${longDay(booking.date)}<br /><span class="num">${span(booking.start)}</span></dd></div>
          <div><dt>${t("to")}</dt><dd>${longDay(dayOf(pick.date))}<br /><span class="num">${span(pick.slot)}</span></dd></div>
        </dl>
        ${billHTML()}
      </div>
      <footer class="foot"><div class="actions">
        <button type="button" class="btn is-quiet" data-go="time">${t("back")}</button>
        <button type="button" class="btn" data-change>${t("confirm.change")}</button>
      </div></footer>`;
  }

  const changedHTML = () => `${head()}
      <div class="body is-centre">
        <span class="done" aria-hidden="true">${icon(ICON.check)}</span>
        <p>${t(SHOP.confirm === "auto" ? "changed.auto" : "changed.manual")}</p>
        <button type="button" class="btn is-quiet" data-go="main">${t("title")}</button>
      </div>`;

  const cancelHTML = () => `${head()}
      <div class="body">
        <h2>${t("cancel.title")}</h2>
        <p class="note">${longDay(booking.date)}, <span class="num">${span(booking.start)}</span>. ${t("cancel.text")}</p>
        <label class="field"><span>${t("cancel.reason")}</span><textarea rows="3"></textarea></label>
      </div>
      <footer class="foot"><div class="actions">
        <button type="button" class="btn is-quiet" data-go="main">${t("cancel.no")}</button>
        <button type="button" class="btn is-danger" data-cancel>${t("cancel.yes")}</button>
      </div></footer>`;

  const VIEWS = { main: mainHTML, date: dateHTML, time: timeHTML, confirm: confirmHTML, changed: changedHTML, cancel: cancelHTML };

  function render() {
    document.documentElement.lang = state.lang;
    document.title = `${t("title")} | ${state.lang === "vi" ? "Tiệm tóc Mẫu" : "Sample Barbershop"}`;
    $("card").innerHTML = VIEWS[state.view]();
    $("mock-title").textContent = t("mock");
    $("mock").innerHTML = ["open", "pending", "late", "cancelled", "past"]
      .map((mode) => `<button type="button" data-mode="${mode}" aria-pressed="${state.mode === mode}">${t("mock." + mode)}</button>`)
      .join("");
  }

  // ---------- Events ----------

  document.addEventListener("click", (event) => {
    const el = event.target.closest("[data-lang],[data-go],[data-date],[data-month],[data-slot],[data-change],[data-cancel],[data-mode]");
    if (!el) return;
    const d = el.dataset;
    const pick = state.pick;
    if ("lang" in d) state.lang = state.lang === "vi" ? "en" : "vi";
    else if (d.go) {
      // Starting a change always starts from an empty choice.
      if (d.go === "date" && state.view === "main") state.pick = { date: null, month: null, slot: null };
      state.view = d.go;
    } else if (d.date) Object.assign(pick, { date: d.date, slot: null });
    else if (d.month) pick.month = Number(d.month);
    else if (d.slot) pick.slot = Number(d.slot);
    else if ("change" in d) {
      booking.date = dayOf(pick.date);
      booking.start = pick.slot;
      // A moved booking is confirmed again by hand when the shop confirms each one.
      state.mode = SHOP.confirm === "auto" ? "open" : "pending";
      state.view = "changed";
    } else if ("cancel" in d) {
      state.mode = "cancelled";
      state.view = "main";
    } else if (d.mode) {
      state.mode = d.mode;
      state.view = "main";
    }
    // The card is redrawn, so put the keyboard back: on the same day, arrow or
    // time when one was pressed, otherwise on the next thing to do.
    const monthSide = d.month ? [...el.parentElement.querySelectorAll("button")].indexOf(el) : -1;
    render();
    const card = $("card");
    const again = d.date
      ? card.querySelector(`[data-date="${d.date}"]`)
      : d.slot
        ? card.querySelector(`[data-slot="${d.slot}"]`)
        : monthSide >= 0
          ? [...card.querySelectorAll(".month button")].find((btn, i) => i === monthSide && !btn.disabled) || card.querySelector(".month button:not(:disabled)")
          : "lang" in d
            ? card.querySelector("[data-lang]")
            : null;
    if (again) again.focus();
    else if (!("mode" in d)) card.querySelector(".foot .btn:last-child, .body .btn")?.focus();
  });

  render();
})();
