/* Tích hợp: connecting the shop to the tools it already uses.

   Since 7 November (meeting with Trung, 6 November) the page opens on a small
   catalogue, as Cal.com's app store does, that can grow: what is connected,
   then every integration by category. It lists only what the database has:
   Google Calendar (live), Google Sheets and Google Drive backup (destination
   tables and sync jobs exist), and Outlook (in the enum, no sign-in yet, so
   "Coming soon"). Each connection belongs to the person who made it, not to
   the shop (oauth_connections has a user_id). What is connected is kept in
   this browser under "pbm-apps" until "Reset sample shop".

   Google Calendar keeps its own page (#google-calendar), written before the
   catalogue: bookings showing up in the owner's own calendar, next to the
   rest of their day.

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

      back: "Tích hợp",
      "cat.lede": "Nối pleasebookme với những công cụ bạn đang dùng.",
      "cat.n.on": "{n} đã nối",
      "cat.n.ready": "{n} có thể nối",
      "cat.n.soon": "{n} sắp có",
      "cat.n.bad": "{n} cần nối lại",
      "cat.connected": "Đã nối",
      "cat.connected.none": "Chưa nối gì. Chọn một tích hợp bên dưới.",
      "cat.browse": "Tất cả tích hợp",
      "cat.find": "Tìm tích hợp",
      "cat.all": "Tất cả",
      "cat.calendars": "Lịch",
      "cat.sheets": "Bảng tính",
      "cat.backups": "Sao lưu",
      "cat.none": "Không tích hợp nào khớp.",
      "app.gcal": "Lịch Google",
      "app.gcal.d": "Lịch hẹn tự hiện trong lịch Google của bạn, cạnh những việc khác trong ngày.",
      "app.sheets": "Google Trang tính",
      "app.sheets.d": "Ghi mỗi lịch hẹn mới thành một dòng trong bảng tính bạn chọn. Tiện để tiệm tự lưu sổ.",
      "app.drive": "Sao lưu Google Drive",
      "app.drive.d": "Lưu một bản sao lịch hẹn vào Google Drive của bạn.",
      "app.apple": "Lịch Apple",
      "app.apple.d": "Thêm lịch hẹn vào Lịch Apple trên iPhone, iPad và Mac, cạnh những việc khác trong ngày.",
      "app.outlook": "Lịch Outlook",
      "app.outlook.d": "Như Lịch Google, cho tài khoản Microsoft.",
      "st.on": "Đã nối",
      "st.off": "Chưa nối",
      "st.bad": "Cần nối lại",
      "st.soon": "Sắp có",
      "act.settings": "Cài đặt",
      "act.connect": "Nối",
      "act.reconnect": "Nối lại",
      "act.off": "Ngắt",
      "act.offDone": "Đã ngắt {name}.",
      "since.gcal": "Đồng bộ lần cuối 2 phút trước",
      "since.bad": "Hoạt động lần cuối 6/11, 21:40",
      "since.new": "Vừa nối",
      "bad.title": "Lịch Google ngừng hoạt động từ 6/11",
      "bad.body": "Google không cho pleasebookme vào nữa (quyền đã bị gỡ hoặc hết hạn). Cho đến khi bạn nối lại, lịch hẹn mới không được thêm vào lịch của bạn.",
      "per.person": "Mỗi người tự nối bằng tài khoản của mình: tài khoản Google của bạn vẫn là của bạn và không chia sẻ cho tiệm. Người khác trong tiệm nối tài khoản của họ ở trang này.",
      "c.title": "Nối {name}",
      "c.what": "Tích hợp này làm gì",
      "c.sheets.1": "Thêm một dòng vào bảng tính cho mỗi lịch hẹn mới",
      "c.sheets.2": "Sửa dòng đó khi lịch hẹn đổi giờ hoặc bị huỷ",
      "c.sheets.3": "Chỉ ghi vào bảng tính bạn chọn",
      "c.drive.1": "Lưu bản sao lịch hẹn vào Google Drive mỗi ngày",
      "c.drive.2": "Mỗi bản là một tệp, theo ngày",
      "c.drive.3": "Chỉ ghi vào thư mục pleasebookme tạo ra",
      "c.for": "Cho các dịch vụ",
      "c.all": "Mọi dịch vụ của tôi",
      "c.pick": "Chọn dịch vụ",
      "c.to": "Nối với",
      "c.you": "Tài khoản của bạn ({name}). Không chia sẻ cho tiệm.",
      "c.google": "Bước sau, Google hỏi bạn cho phép truy cập.",
      "c.apple.1": "Thêm lịch hẹn vào Lịch Apple của bạn",
      "c.apple.2": "Chạy trên iPhone, iPad và Mac",
      "c.apple.3": "Không chia sẻ mật khẩu Apple của bạn với pleasebookme",
      "c.apple": "Bước sau, Apple hỏi bạn có cho thêm lịch này không.",
      "c.youApple": "Lịch Apple của bạn. Không chia sẻ cho tiệm.",
      "c.appleAcct": "Lịch Apple trên thiết bị của bạn",
      "c.goApple": "Tiếp tục với Apple",
      "c.cancel": "Huỷ",
      "c.go": "Tiếp tục với Google",
      "c.done": "Đã nối {name}.",
      "state.bad": "Cần nối lại",
      "state.catalogue": "Danh sách",

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
      soon: "Coming soon",

      "look.title": "In Google Calendar",
      "look.sample": "Haircut · Thảo",
      "look.wait": "Waiting: a tentative event",
      "look.ok": "Confirmed: a normal event",
      "look.gone": "Canceled or rejected: the event is removed",
      "look.invite": "Customers only get pleasebookme's email, never an invitation from Google.",
      "look.oneway": "Editing or deleting the event in Google does not change the booking here, and the next change to the booking puts the event back. To move a booking, move it in Bookings.",

      "conf.title": "Check for conflicts",
      "conf.body": "Block booking times when you already have something on your Google Calendar, so nobody double-books you.",
      "conf.now": "Free times come only from your working hours and bookings in pleasebookme for now.",

      back: "Integrations",
      "cat.lede": "Connect pleasebookme to the tools you already use.",
      "cat.n.on": "{n} connected",
      "cat.n.ready": "{n} ready to connect",
      "cat.n.soon": "{n} coming soon",
      "cat.n.bad": "{n} needs reconnecting",
      "cat.connected": "Connected",
      "cat.connected.none": "Nothing connected yet. Pick an integration below.",
      "cat.browse": "Browse",
      "cat.find": "Search integrations",
      "cat.all": "All",
      "cat.calendars": "Calendars",
      "cat.sheets": "Spreadsheets",
      "cat.backups": "Backups",
      "cat.none": "No integration matches.",
      "app.gcal": "Google Calendar",
      "app.gcal.d": "Every booking shows up in your Google Calendar, next to the rest of your day.",
      "app.sheets": "Google Sheets",
      "app.sheets.d": "Adds each new booking as a row in a sheet you pick. Handy for your own records.",
      "app.drive": "Google Drive backup",
      "app.drive.d": "Saves a copy of your bookings to your Google Drive.",
      "app.apple": "Apple Calendar",
      "app.apple.d": "Adds your bookings to Apple Calendar on iPhone, iPad and Mac, next to the rest of your day.",
      "app.outlook": "Outlook Calendar",
      "app.outlook.d": "The same as Google Calendar, for Microsoft accounts.",
      "st.on": "Connected",
      "st.off": "Not connected",
      "st.bad": "Needs reconnecting",
      "st.soon": "Coming soon",
      "act.settings": "Settings",
      "act.connect": "Connect",
      "act.reconnect": "Reconnect",
      "act.off": "Disconnect",
      "act.offDone": "{name} disconnected.",
      "since.gcal": "Last synced 2 minutes ago",
      "since.bad": "Last worked Nov 6, 21:40",
      "since.new": "Just connected",
      "bad.title": "Google Calendar stopped working on Nov 6",
      "bad.body": "Google no longer lets pleasebookme in (the access was removed or ran out). Until you reconnect, new bookings are not added to your calendar.",
      "per.person": "Integrations are connected by each person, with their own account: your Google account stays yours and is not shared with the shop. Other members connect their own from this page.",
      "c.title": "Connect {name}",
      "c.what": "What it does",
      "c.sheets.1": "Adds a row to your sheet for each new booking",
      "c.sheets.2": "Updates the row when a booking is rescheduled or canceled",
      "c.sheets.3": "Writes only to the sheet you pick",
      "c.drive.1": "Saves a copy of your bookings to Google Drive every day",
      "c.drive.2": "One file per day",
      "c.drive.3": "Writes only to the folder pleasebookme makes",
      "c.for": "For these services",
      "c.all": "All my services",
      "c.pick": "Pick services",
      "c.to": "Connected to",
      "c.you": "Your account ({name}). Not shared with the shop.",
      "c.google": "Google will ask you to allow access next.",
      "c.apple.1": "Adds your bookings to your Apple Calendar",
      "c.apple.2": "Works on iPhone, iPad and Mac",
      "c.apple.3": "Your Apple password is never shared with pleasebookme",
      "c.apple": "Apple will ask you next whether to add this calendar.",
      "c.youApple": "Your Apple Calendar. Not shared with the shop.",
      "c.appleAcct": "Apple Calendar on your devices",
      "c.goApple": "Continue with Apple",
      "c.cancel": "Cancel",
      "c.go": "Continue with Google",
      "c.done": "{name} connected.",
      "state.bad": "Needs reconnecting",
      "state.catalogue": "Catalogue",

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
  // The connected states show an example menu, since they are about what
  // happens once a shop has services; the shop itself may have none yet.
  const serviceCount = () => Object.keys(PBM_SAMPLE.EXAMPLE?.SERVICES || PBM_SAMPLE.SERVICES || {}).length;

  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  // What this person has connected. A shop that has set nothing up has not
  // connected Google either.
  const KEY = "pbm-apps";
  const apps = (() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY));
      if (saved && saved.v === 1 && saved.setup === PBM_SAMPLE.WITH_SETUP) return saved.apps;
    } catch {
      /* nothing kept */
    }
    return { gcal: PBM_SAMPLE.WITH_SETUP ? "on" : "none", sheets: "", drive: "", apple: "" };
  })();
  const keepApps = () => {
    try {
      localStorage.setItem(KEY, JSON.stringify({ v: 1, setup: PBM_SAMPLE.WITH_SETUP, apps }));
    } catch {
      toast(t("store.full"));
    }
  };

  // The address picks the view: the catalogue (empty, or #needs-reconnecting
  // to review that state), a connect form over it (#connect/sheets), or
  // Google Calendar's page (#google-calendar, with /none, /no-calendar or /on
  // to review each state).
  const route = () => {
    const [view, sub] = location.hash.slice(1).split("/");
    return { view: view || "catalogue", sub: sub || "" };
  };
  const state = () => {
    const { sub } = route();
    if (sub === "none" || sub === "no-calendar" || sub === "on") return sub;
    return apps.gcal === "none" ? "none" : "on";
  };
  const connectedOn = () => new Date(2026, 9, 9).toLocaleDateString(PBM.locale, { day: "numeric", month: "numeric", year: "numeric" });

  let ownCalendar = null; // the dedicated calendar's name, once created
  let sure = false; // disconnecting asks twice

  const soonChip = () => `<span class="soon-chip">${icon("lock")}${t("soon")}</span>`;

  function headHTML() {
    return `
      <header class="gcal-head">
        <span class="app-tile">${logo("gcal")}</span>
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
    const { view } = route();
    if (view !== "google-calendar") return renderCatalogue();
    $("connect").hidden = true;
    PBM.stage.sync();
    const s = state();
    let body;
    if (s === "none") body = noneHTML();
    else if (s === "no-calendar") body = accountHTML() + noCalendarHTML();
    else body = accountHTML() + `<p class="ok">${icon("check")}${t("acct.ok")}</p>` + destinationHTML() + lookHTML();

    const link = (hash, key) => `<a href="${hash}"${hash.split("/")[1] === s ? ' aria-current="true"' : ""}>${t(key)}</a>`;

    $("view").innerHTML = `
      <div class="wrap">
        <a class="back-link" href="#">${icon("left")}${t("back")}</a>

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

        <p class="note">${t("note")} ${t("note.states")} ${link("#google-calendar/none", "state.none")} · ${link("#google-calendar/no-calendar", "state.nocal")} · ${link("#google-calendar/on", "state.on")}</p>
      </div>`;
  }

  // ---------- The catalogue ----------

  const APPS = [
    { id: "gcal", cat: "calendars", icon: "calendar", code: 1 },
    { id: "sheets", cat: "sheets", icon: "rows", code: 3 },
    { id: "drive", cat: "backups", icon: "drive", code: 2 },
    { id: "apple", cat: "calendars", icon: "calendar", code: 7 },
    { id: "outlook", cat: "calendars", icon: "calendar", code: 6, soon: true },
  ];
  const look = { q: "", cat: "" };
  const ascii = (str) =>
    String(str)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  // What a card says: on, off, broken or coming. #needs-reconnecting shows
  // Google Calendar broken without saving it.
  function status(app) {
    if (app.soon) return "soon";
    const v = app.id === "gcal" && route().view === "needs-reconnecting" ? "error" : apps[app.id];
    return v === "on" ? "on" : v === "error" ? "bad" : "off";
  }

  // The real logos of the apps (assets/brand/apps), not drawn icons.
  const LOGO = { gcal: "google-calendar", sheets: "google-sheets", drive: "google-drive", outlook: "outlook", apple: "apple-calendar" };
  const logo = (id) => `<img class="app-logo" src="/dashboard/assets/brand/apps/${LOGO[id]}.png" alt="" />`;
  const tile = (app) => `<span class="app-tile">${logo(app.id)}</span>`;

  function stateWord(st) {
    const cls = { on: "", off: "is-off is-muted", bad: "is-bad", soon: "is-off is-muted" }[st];
    return `<span class="dot-word ${cls}"><i></i>${t("st." + st)}</span>`;
  }

  function action(app, st, small) {
    const size = small ? " btn-small" : "";
    if (st === "soon") return `<span class="tag-later">${t("st.soon")}</span>`;
    if (app.id === "gcal") {
      return st === "on"
        ? `<a class="btn btn-quiet${size}" href="#google-calendar">${t("act.settings")}</a>`
        : `<a class="btn btn-primary${size}" href="#google-calendar">${t(st === "bad" ? "act.reconnect" : "act.connect")}</a>`;
    }
    return st === "on"
      ? `<button class="btn btn-quiet${size}" type="button" data-unplug="${app.id}">${t("act.off")}</button>`
      : `<a class="btn btn-primary${size}" href="#connect/${app.id}">${t("act.connect")}</a>`;
  }

  function renderCatalogue() {
    document.title = t("doc.title");
    const sts = APPS.map(status);
    const count = (st) => sts.filter((x) => x === st).length;
    const connected = APPS.filter((app, i) => sts[i] === "on" || sts[i] === "bad");
    const q = ascii(look.q.trim());
    const shown = APPS.filter((app) => (!look.cat || app.cat === look.cat) && (!q || ascii(t("app." + app.id) + " " + t("cat." + app.cat)).includes(q)));
    const chip = (cat) =>
      `<button class="chip-pick is-plain cat-chip" type="button" data-cat="${cat}" aria-pressed="${look.cat === cat}"><span>${t(cat ? "cat." + cat : "cat.all")}</span></button>`;
    const bad = sts[0] === "bad";
    $("view").innerHTML = `
      <div class="kit">
        <header class="kit-head"><h1>${t("page.title")}</h1><p>${t("cat.lede")}</p></header>
        <p class="kit-counts">
          ${count("on") ? `<span class="dot-word"><i></i>${t("cat.n.on", { n: count("on") })}</span>` : ""}
          ${count("bad") ? `<span class="dot-word is-bad"><i></i>${t("cat.n.bad", { n: count("bad") })}</span>` : ""}
          <span class="dot-word is-off"><i></i>${t("cat.n.ready", { n: count("off") })}</span>
          <span class="dot-word is-off is-muted"><i></i>${t("cat.n.soon", { n: count("soon") })}</span>
        </p>
        ${
          bad
            ? `<div class="kit-note is-bad bad-banner">${icon("alert")}<span><strong>${t("bad.title")}</strong>${t("bad.body")}</span><a class="btn btn-primary" href="#google-calendar">${t("act.reconnect")}</a></div>`
            : ""
        }
        <h2 class="kit-sec-title">${t("cat.connected")}</h2>
        ${
          connected.length
            ? `<section class="panel conn-list">${connected
                .map((app) => {
                  const st = status(app);
                  const line =
                    app.id === "gcal" ? `${EMAIL} · ${t(st === "bad" ? "since.bad" : "since.gcal")}` : app.id === "apple" ? `${t("c.appleAcct")} · ${t("since.new")}` : `${EMAIL} · ${t("since.new")}`;
                  return `<div class="conn-row">${tile(app)}<span class="conn-text"><strong>${t("app." + app.id)}</strong><small>${line}</small></span>${stateWord(st)}${action(app, st, false)}</div>`;
                })
                .join("")}</section>`
            : `<p class="kit-sec-lede">${t("cat.connected.none")}</p>`
        }
        <h2 class="kit-sec-title">${t("cat.browse")}</h2>
        <div class="cat-bar">
          <label class="kit-find">${icon("search")}<span class="visually-hidden">${t("cat.find")}</span><input class="input" type="search" id="cat-q" value="${esc(look.q)}" placeholder="${t("cat.find")}" autocomplete="off" /></label>
          <span class="chips">${chip("")}${chip("calendars")}${chip("sheets")}${chip("backups")}</span>
        </div>
        ${
          shown.length
            ? `<div class="cat-grid">${shown
                .map((app) => {
                  const st = status(app);
                  return `<article class="panel app-card ${app.soon ? "is-soon" : ""}">
                    ${tile(app)}
                    <h3>${t("app." + app.id)}</h3>
                    <p class="app-cat">${t("cat." + app.cat)}</p>
                    <p class="app-d">${t("app." + app.id + ".d")}</p>
                    <footer>${st === "soon" ? "" : stateWord(st)}${action(app, st, true)}</footer>
                  </article>`;
                })
                .join("")}</div>`
            : `<section class="kit-empty"><p>${t("cat.none")}</p></section>`
        }
        <p class="kit-note per-person">${icon("users")}<span>${t("per.person")}</span></p>
        <p class="kit-sample">${t("note")} ${t("note.states")} <a href="#">${t("state.catalogue")}</a> · <a href="#needs-reconnecting">${t("state.bad")}</a> · <a href="#google-calendar/none">${t("state.none")}</a> · <a href="#google-calendar/no-calendar">${t("state.nocal")}</a></p>
      </div>`;
    renderConnect();
  }

  function renderConnect() {
    const el = $("connect");
    const { view, sub } = route();
    const app = view === "connect" && APPS.find((a) => a.id === sub && !a.soon && a.id !== "gcal");
    el.hidden = !app;
    if (app) {
      const name = t("app." + app.id);
      el.innerHTML = `
        <header class="sheet-head peek-head">
          <div class="connect-title">${tile(app)}<span><h2 id="connect-title">${t("c.title", { name })}</h2><small>${t("cat." + app.cat)}</small></span></div>
          <div class="pane-tools">${PBM.stage.toggle()}<a class="icon-btn" href="#" aria-label="${t("c.cancel")}" title="${t("c.cancel")}">${icon("x")}</a></div>
        </header>
        <div class="peek-body">
          <section class="peek-sec">
            <h3>${t("c.what")}</h3>
            <ul class="ticks-list">${[1, 2, 3].map((n) => `<li>${icon("check")}${t(`c.${app.id}.${n}`)}</li>`).join("")}</ul>
          </section>
          <section class="peek-sec">
            <h3>${t("c.for")}</h3>
            <div class="chips" role="radiogroup" aria-label="${t("c.for")}">
              <label class="chip-pick is-plain"><input class="visually-hidden" type="radio" name="c-for" checked /><span>${t("c.all")}</span></label>
              <label class="chip-pick is-plain"><input class="visually-hidden" type="radio" name="c-for" /><span>${t("c.pick")}</span></label>
            </div>
          </section>
          <section class="peek-sec">
            <h3>${t("c.to")}</h3>
            <p class="connect-you">${icon("user")}${t(app.id === "apple" ? "c.youApple" : "c.you", { name: EMAIL })}</p>
            <p class="kit-note">${icon("info")}<span>${t(app.id === "apple" ? "c.apple" : "c.google")}</span></p>
          </section>
        </div>
        <footer class="sheet-actions peek-actions">
          <span class="spacer"></span>
          <a class="btn btn-quiet" href="#">${t("c.cancel")}</a>
          <button class="btn btn-primary" type="button" data-plug="${app.id}">${t(app.id === "apple" ? "c.goApple" : "c.go")}</button>
        </footer>`;
    } else el.innerHTML = "";
    PBM.stage.sync();
  }

  document.addEventListener("click", (event) => {
    const cat = event.target.closest("[data-cat]");
    if (cat) {
      look.cat = cat.dataset.cat;
      return renderCatalogue();
    }
    const plug = event.target.closest("[data-plug]");
    if (plug) {
      apps[plug.dataset.plug] = "on";
      keepApps();
      toast(t("c.done", { name: t("app." + plug.dataset.plug) }));
      location.hash = "";
      return;
    }
    const unplug = event.target.closest("[data-unplug]");
    if (unplug) {
      apps[unplug.dataset.unplug] = "";
      keepApps();
      renderCatalogue();
      return toast(t("act.offDone", { name: t("app." + unplug.dataset.unplug) }));
    }
  });

  document.addEventListener("input", (event) => {
    if (event.target.id !== "cat-q") return;
    look.q = event.target.value;
    const pos = event.target.selectionStart;
    renderCatalogue();
    $("cat-q").focus();
    $("cat-q").setSelectionRange(pos, pos);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && route().view === "connect") location.hash = "";
  });

  $("view").addEventListener("click", (event) => {
    if (event.target.closest("[data-google]")) {
      toast(t("demo.google"));
      apps.gcal = "on"; // as if Google had said yes
      keepApps();
      if (location.hash !== "#google-calendar") location.hash = "google-calendar";
      else render();
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
      apps.gcal = "none";
      keepApps();
      location.hash = "google-calendar";
      render();
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
