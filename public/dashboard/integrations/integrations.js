/* Tích hợp: connecting the shop to the tools it already uses. For now that is
   Google Calendar alone (Trung, 23 October: the page is mainly for calendars),
   so the page is about one thing: bookings showing up in the owner's own
   calendar, next to the rest of their day.

   It says what Trung's sync really does (obsidian/PleaseBookMe/Services/Google
   Calendar Sync), and no more:
   - one way, from pleasebookme to Google; nothing comes back
   - a booking waiting for an answer is a tentative event, an accepted one a
     confirmed event, a cancelled or rejected one is removed
   - events go to the account's main calendar until a calendar of their own is
     created; the upcoming events then move there, past ones stay
   - Google never emails the customer
   Checking Google for busy times and reminders are not built, so they show as
   coming, as on Trung's page. The layout follows Cal.com's calendar settings:
   where new bookings are added, then checking for conflicts.

   Three states, picked by the address so each can be reviewed: #none (no
   Google account yet), #no-calendar (connected, but the Calendar permission
   was unticked on Google's screen) and, by default, connected. */
(function () {
  "use strict";

  const { t, icon, toast } = PBM;

  PBM.addStrings({
    vi: {
      "doc.title": "Tích hợp | pleasebookme",
      "page.title": "Tích hợp",
      "page.lede": "Nối pleasebookme với những công cụ bạn đang dùng. Hiện có Lịch Google.",

      "gcal.title": "Lịch Google",
      "gcal.lede": "Mỗi lịch hẹn tự hiện trong lịch Google của bạn, cạnh những việc khác trong ngày.",
      "gcal.on": "Đã nối",

      "none.1": "Có lịch hẹn mới, sự kiện tự thêm vào lịch Google.",
      "none.2": "Đổi giờ, xác nhận hay huỷ, sự kiện cũng tự đổi theo.",
      "none.3": "Khách không nhận thư mời nào từ Google.",
      "none.connect": "Nối lịch Google",
      "none.hint": "Bạn sẽ đăng nhập Google. Khi Google hỏi quyền, hãy giữ ô Lịch được chọn.",

      "acct.since": "Nối ngày {date} · Dùng lần cuối {used}",
      "acct.used": "hôm nay, 11:20",
      "acct.off": "Ngắt kết nối",
      "acct.offSure": "Ngắt thật?",
      "acct.add": "Nối thêm tài khoản Google",
      "acct.ok": "Đã cho phép dùng Lịch.",

      "nocal.title": "Chưa có quyền dùng Lịch",
      "nocal.body": "Tài khoản đã nối nhưng ô Lịch bị bỏ chọn khi Google hỏi quyền, nên lịch hẹn chưa hiện được.",
      "nocal.grant": "Cho phép dùng Lịch",

      "dest.title": "Thêm lịch hẹn vào",
      "dest.primary": "Lịch chính",
      "dest.primary.d": "Lịch chính của {email}, chung với việc riêng của bạn.",
      "dest.own.d": "Lịch riêng cho lịch hẹn, trong {email}.",
      "dest.moved": "Các lịch hẹn sắp tới đã chuyển sang lịch này. Lịch hẹn đã qua ở lại lịch chính.",
      "dest.create": "Tạo lịch riêng cho lịch hẹn",
      "dest.ph": "Lịch hẹn của tiệm",
      "dest.go": "Tạo lịch",
      "dest.hint": "Lịch hẹn sẽ không lẫn với việc riêng. Lịch hẹn sắp tới chuyển sang lịch mới, lịch đã qua ở lại lịch chính. Mỗi tài khoản có một lịch riêng.",
      "dest.empty": "Đặt tên cho lịch.",
      "dest.done": "Đã tạo “{name}” và nối với {n} dịch vụ.",
      "remind": "Nhắc trước giờ hẹn",
      "remind.d": "Hiện Google nhắc theo cài đặt sẵn của lịch đó.",
      soon: "Sắp có",

      "look.title": "Trên lịch Google",
      "look.sample": "Cắt tóc · Thảo",
      "look.wait": "Chờ xác nhận: hiện là sự kiện tạm",
      "look.ok": "Đã xác nhận: sự kiện chính thức",
      "look.gone": "Huỷ hoặc từ chối: sự kiện bị xoá",
      "look.invite": "Khách chỉ nhận email của pleasebookme, không nhận thư mời từ Google.",
      "look.oneway": "Sửa hay xoá sự kiện trên Google không đổi lịch hẹn ở đây, và lần sau lịch hẹn đổi, sự kiện trở lại như cũ. Muốn đổi giờ, đổi trong Lịch hẹn.",

      "conf.title": "Kiểm tra trùng lịch",
      "conf.body": "Chặn giờ đặt khi bạn đã có việc khác trên lịch Google, để không ai đặt trùng.",
      "conf.now": "Hiện giờ trống chỉ tính từ giờ làm việc và lịch hẹn trong pleasebookme.",

      "later.title": "Sẽ có sau",
      "later.sheets": "Google Trang tính",
      "later.sheets.d": "Ghi mỗi lịch hẹn thành một dòng trong bảng tính.",

      note: "Dữ liệu mẫu. Đây là bản thiết kế, chưa nối với Google.",
      "note.states": "Xem từng trạng thái:",
      "state.none": "Chưa nối",
      "state.nocal": "Thiếu quyền Lịch",
      "state.on": "Đã nối",
      "demo.google": "Ở bản thật, nút này mở trang đăng nhập Google.",
      "demo.off": "Đã ngắt kết nối lịch Google.",
    },
    en: {
      "doc.title": "Integrations | pleasebookme",
      "page.title": "Integrations",
      "page.lede": "Connect pleasebookme to the tools you already use. Google Calendar for now.",

      "gcal.title": "Google Calendar",
      "gcal.lede": "Every booking shows up in your Google Calendar, next to the rest of your day.",
      "gcal.on": "Connected",

      "none.1": "A new booking adds an event to your Google Calendar.",
      "none.2": "A new time, an accept or a cancel changes the event too.",
      "none.3": "Customers get no invitations from Google.",
      "none.connect": "Connect Google Calendar",
      "none.hint": "You will sign in to Google. When it asks for access, keep Calendar ticked.",

      "acct.since": "Connected {date} · Last used {used}",
      "acct.used": "today, 11:20",
      "acct.off": "Disconnect",
      "acct.offSure": "Disconnect now?",
      "acct.add": "Connect another Google account",
      "acct.ok": "Calendar access granted.",

      "nocal.title": "No access to Calendar yet",
      "nocal.body": "The account is connected, but Calendar was unticked on Google's screen, so bookings cannot show up yet.",
      "nocal.grant": "Allow Calendar",

      "dest.title": "Add bookings to",
      "dest.primary": "Main calendar",
      "dest.primary.d": "The main calendar of {email}, shared with your own events.",
      "dest.own.d": "A calendar just for bookings, in {email}.",
      "dest.moved": "Upcoming bookings have moved to this calendar. Past ones stay in the main calendar.",
      "dest.create": "Create a calendar for bookings",
      "dest.ph": "Shop bookings",
      "dest.go": "Create calendar",
      "dest.hint": "Bookings stay apart from your own events. Upcoming bookings move to the new calendar; past ones stay. One per account.",
      "dest.empty": "Give the calendar a name.",
      "dest.done": "Created “{name}” and linked it to {n} services.",
      "remind": "Reminder before a booking",
      "remind.d": "Google uses that calendar's own default reminders for now.",
      soon: "Coming",

      "look.title": "In Google Calendar",
      "look.sample": "Haircut · Thảo",
      "look.wait": "Waiting: a tentative event",
      "look.ok": "Confirmed: a normal event",
      "look.gone": "Cancelled or rejected: the event is removed",
      "look.invite": "Customers only get pleasebookme's email, never an invitation from Google.",
      "look.oneway": "Editing or deleting the event in Google does not change the booking here, and the next change to the booking puts the event back. To move a booking, move it in Bookings.",

      "conf.title": "Check for conflicts",
      "conf.body": "Block booking times when you already have something on your Google Calendar, so nobody double-books you.",
      "conf.now": "Free times come only from your working hours and bookings in pleasebookme for now.",

      "later.title": "Later",
      "later.sheets": "Google Sheets",
      "later.sheets.d": "Write each booking as a row in a spreadsheet.",

      note: "Sample data. This is a design, not connected to Google.",
      "note.states": "See each state:",
      "state.none": "Not connected",
      "state.nocal": "Calendar not allowed",
      "state.on": "Connected",
      "demo.google": "In the product, this opens Google's sign-in.",
      "demo.off": "Google Calendar disconnected.",
    },
  });

  const EMAIL = "tiemtocmau@gmail.com";
  const NAME_MAX = 255; // CALENDAR_NAME_MAX_LENGTH in Trung's client
  const serviceCount = () => Object.keys(window.PBM_SAMPLE?.SERVICES || {}).length;

  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  const state = () => {
    const h = location.hash.slice(1);
    return h === "none" || h === "no-calendar" ? h : "on";
  };
  const connectedOn = () => new Date(2026, 9, 9).toLocaleDateString(PBM.locale, { day: "numeric", month: "numeric", year: "numeric" });

  let ownCalendar = null; // the dedicated calendar's name, once created
  let sure = false; // disconnecting asks twice

  const soonChip = () => `<span class="soon-chip">${icon("lock")}${t("soon")}</span>`;

  function headHTML() {
    return `
      <header class="gcal-head">
        <span class="app-tile">${icon("calendar")}</span>
        <div class="gcal-title">
          <h2 id="gcal-h">${t("gcal.title")}</h2>
          <p>${t("gcal.lede")}</p>
        </div>
        ${state() === "none" ? "" : `<span class="conn">${icon("check")}${t("gcal.on")}</span>`}
      </header>`;
  }

  function noneHTML() {
    return `
      <div class="gcal-sec">
        <ul class="ticks-list">
          <li>${icon("check")}${t("none.1")}</li>
          <li>${icon("check")}${t("none.2")}</li>
          <li>${icon("check")}${t("none.3")}</li>
        </ul>
        <button class="btn btn-primary btn-wide" type="button" data-google>${icon("plug")}${t("none.connect")}</button>
        <p class="hint">${t("none.hint")}</p>
      </div>`;
  }

  function accountHTML() {
    return `
      <div class="acct">
        <span class="acct-avatar" aria-hidden="true">${EMAIL[0].toUpperCase()}</span>
        <div class="acct-text">
          <strong>${EMAIL}</strong>
          <span>${t("acct.since", { date: connectedOn(), used: t("acct.used") })}</span>
        </div>
        <button class="btn btn-quiet btn-small btn-danger${sure ? " is-sure" : ""}" type="button" data-off>${t(sure ? "acct.offSure" : "acct.off")}</button>
      </div>`;
  }

  function noCalendarHTML() {
    return `
      <div class="gcal-sec">
        <div class="callout" role="status">
          ${icon("info")}
          <div>
            <strong>${t("nocal.title")}</strong>
            <p>${t("nocal.body")}</p>
            <button class="btn btn-primary" type="button" data-google>${t("nocal.grant")}</button>
          </div>
        </div>
      </div>`;
  }

  function destinationHTML() {
    const now = ownCalendar
      ? `<strong>${esc(ownCalendar)}</strong><span>${t("dest.own.d", { email: EMAIL })}</span>`
      : `<strong>${t("dest.primary")}</strong><span>${t("dest.primary.d", { email: EMAIL })}</span>`;
    const create = ownCalendar
      ? `<p class="hint">${t("dest.moved")}</p>`
      : `<form class="dest-form" id="create" novalidate>
          <label class="field">
            <span class="label">${t("dest.create")}</span>
            <span class="dest-row">
              <input class="input" id="cal-name" maxlength="${NAME_MAX}" autocomplete="off" placeholder="${t("dest.ph")}" />
              <button class="btn btn-primary" type="submit">${t("dest.go")}</button>
            </span>
            <small>${t("dest.hint")}</small>
            <span class="error" id="cal-error" hidden></span>
          </label>
        </form>`;
    return `
      <section class="gcal-sec" aria-labelledby="dest-h">
        <h3 id="dest-h">${t("dest.title")}</h3>
        <div class="dest-now">${icon("calendarCheck")}<span>${now}</span></div>
        ${create}
        <div class="reserved">
          <span><strong>${t("remind")}</strong><small>${t("remind.d")}</small></span>
          ${soonChip()}
        </div>
      </section>`;
  }

  function lookHTML() {
    const sample = `<span class="ev-time num">10:00</span> ${t("look.sample")}`;
    return `
      <section class="gcal-sec" aria-labelledby="look-h">
        <h3 id="look-h">${t("look.title")}</h3>
        <ul class="look">
          <li><span class="ev ev-wait" aria-hidden="true">${sample}</span><span>${t("look.wait")}</span></li>
          <li><span class="ev ev-ok" aria-hidden="true">${sample}</span><span>${t("look.ok")}</span></li>
          <li><span class="ev ev-gone" aria-hidden="true">${sample}</span><span>${t("look.gone")}</span></li>
        </ul>
        <ul class="plain">
          <li>${icon("shield")}<span>${t("look.invite")}</span></li>
          <li>${icon("swap")}<span>${t("look.oneway")}</span></li>
        </ul>
      </section>`;
  }

  function render() {
    document.title = t("doc.title");
    const s = state();
    let body;
    if (s === "none") body = noneHTML();
    else if (s === "no-calendar") body = accountHTML() + noCalendarHTML();
    else body = accountHTML() + `<p class="ok">${icon("check")}${t("acct.ok")}</p>` + destinationHTML() + lookHTML();

    const link = (hash, key) => `<a href="${hash}"${(hash === "#" ? "on" : hash.slice(1)) === s ? ' aria-current="true"' : ""}>${t(key)}</a>`;

    $("view").innerHTML = `
      <div class="wrap">
        <header class="head">
          <h1>${t("page.title")}</h1>
          <p>${t("page.lede")}</p>
        </header>

        <section class="panel gcal" aria-labelledby="gcal-h">
          ${headHTML()}
          ${body}
          ${s === "none" ? "" : `<footer class="gcal-foot"><button class="btn btn-quiet btn-small" type="button" data-google>${icon("plus")}${t("acct.add")}</button></footer>`}
        </section>

        <section class="panel is-soon" aria-labelledby="conf-h">
          <header class="soon-head">
            <h2 id="conf-h">${t("conf.title")}</h2>
            ${soonChip()}
          </header>
          <p>${t("conf.body")}</p>
          <p class="hint">${icon("info")}<span>${t("conf.now")}</span></p>
        </section>

        <section class="later" aria-labelledby="later-h">
          <h2 id="later-h">${t("later.title")}</h2>
          <ul>
            <li><span class="app-tile">${icon("rows")}</span><span><strong>${t("later.sheets")}</strong><small>${t("later.sheets.d")}</small></span>${soonChip()}</li>
          </ul>
        </section>

        <p class="note">${t("note")} ${t("note.states")} ${link("#none", "state.none")} · ${link("#no-calendar", "state.nocal")} · ${link("#", "state.on")}</p>
      </div>`;
  }

  $("view").addEventListener("click", (event) => {
    if (event.target.closest("[data-google]")) {
      toast(t("demo.google"));
      if (state() !== "on") location.hash = "";
      return;
    }
    if (event.target.closest("[data-off]")) {
      if (!sure) {
        sure = true;
        render();
        return;
      }
      sure = false;
      ownCalendar = null;
      location.hash = "none";
      toast(t("demo.off"));
    }
  });

  $("view").addEventListener("submit", (event) => {
    if (event.target.id !== "create") return;
    event.preventDefault();
    const input = $("cal-name");
    const name = input.value.trim();
    const error = $("cal-error");
    if (!name) {
      error.textContent = t("dest.empty");
      error.hidden = false;
      input.setAttribute("aria-invalid", "true");
      input.focus();
      return;
    }
    ownCalendar = name;
    render();
    toast(t("dest.done", { name, n: serviceCount() }));
  });

  // A changed address is a changed state; leaving it resets "are you sure".
  window.addEventListener("hashchange", () => {
    sure = false;
    render();
  });

  PBM.onChange(render);
  PBM.mount("integrations");
  render();
})();
