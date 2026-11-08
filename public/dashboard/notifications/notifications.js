/* Notifications: what the shop sends, and when (meeting with Trung,
   6 November). Two kinds of setting, as Trung's schema has them:

   - shop-wide, for owners and managers: the templates (notification_templates
     belong to the shop) and who the email comes from;
   - each person's own: which channels reach them and their quiet hours
     (notification_preferences belong to a user).

   Templates are plain text with {{variables}} for now; HTML waits for Trung's
   security review. Email is the only channel that delivers: SMS and push are
   shown as Later. Activity is the delivery log (notifications and
   notification_deliveries). What is changed here is kept in this browser
   under "pbm-notify" until "Reset sample shop". */
(function () {
  "use strict";

  const { t, icon, toast } = PBM;
  const S = PBM_SAMPLE;
  const { BOOKINGS, SERVICES, STAFF, RESOURCES, TODAY, NOW, EXAMPLE } = S;

  PBM.addStrings({
    vi: {
      "doc.title": "Thông báo | pleasebookme",
      "page.title": "Thông báo",
      "page.lede": "Khách và nhóm của bạn nhận gì, và nhận lúc nào.",
      "count.tpl": "{n} mẫu tin:",
      "count.on": "{n} đang bật",
      "count.off": "{n} đang tắt",
      "count.email": "Hiện chỉ gửi email. SMS và thông báo đẩy có sau.",
      "tab.templates": "Mẫu tin",
      "tab.sender": "Người gửi",
      "tab.mine": "Thông báo của tôi",
      "tab.activity": "Đã gửi",
      "new": "Mẫu tin mới",

      "group.customer": "Gửi khách",
      "group.team": "Gửi nhóm của bạn",
      "list.note": "Mỗi sự kiện có sẵn một tin. Sửa tin đó, hoặc thêm tin khác, như lần nhắc thứ hai trước 2 giờ.",
      "tpl.confirmed": "Đã xác nhận lịch hẹn",
      "tpl.reminder": "Nhắc lịch",
      "tpl.cancelled": "Lịch hẹn bị huỷ",
      "tpl.moved": "Lịch hẹn đổi giờ",
      "tpl.staffNew": "Có lịch hẹn mới",
      "tpl.staffCancelled": "Lịch hẹn bị huỷ",
      "tpl.copy": "Nhắc lịch lần hai",
      "to.customer": "Gửi khách",
      "to.staff": "Gửi người làm",
      "to.managers": "Gửi chủ tiệm và quản lý",
      "when.now": "Ngay lập tức",
      "when.-60": "1 giờ trước giờ hẹn",
      "when.-120": "2 giờ trước giờ hẹn",
      "when.-1440": "24 giờ trước giờ hẹn",
      "when.120": "2 giờ sau giờ hẹn",
      "ch.email": "Email",
      "ch.sms": "SMS (có sau)",
      "ch.push": "Thông báo đẩy (có sau)",
      "lang.vi": "Tiếng Việt",
      "lang.en": "Tiếng Anh",
      "f.name": "Tên mẫu tin",
      "f.when": "Khi nào",
      "f.to": "Gửi cho",
      "f.channel": "Kênh",
      "f.lang": "Ngôn ngữ",
      "f.subject": "Tiêu đề",
      "f.body": "Nội dung",
      edit: "Sửa",
      preview: "Xem trước",
      "version": "Bản {n} · sửa lần cuối bởi {who}, {date}",
      "version.new": "Mẫu tin mới, chưa lưu lần nào",
      insert: "Chèn biến",
      "insert.lede": "Bấm để chèn vào chỗ con trỏ:",
      "plain": "Chỉ chữ thường. Biến viết sai, hoặc không dùng được cho sự kiện này, sẽ bị báo trước khi lưu. Những gì khách tự gõ (tên, ghi chú) luôn được chèn như chữ thường.",
      "bad.var": "Không có biến {name}. Chọn trong danh sách bên dưới.",
      "empty.body": "Nội dung không được để trống.",
      "empty.subject": "Email cần có tiêu đề.",
      reset: "Về tin mặc định",
      "reset.done": "Đã trả về tin mặc định.",
      test: "Gửi thử cho tôi",
      "test.done": "Đã gửi thử tới {email}.",
      save: "Lưu thay đổi",
      saved: "Đã lưu.",
      unsaved: "Chưa lưu",
      del: "Xoá mẫu tin",
      "del.sure": "Xoá thật?",
      "del.done": "Đã xoá mẫu tin.",
      "on.label": "Bật mẫu tin này",
      "sample.booking": "Lịch hẹn mẫu:",
      "pv.from": "Từ",
      "pv.reply": "Trả lời tới",
      "pv.to": "Tới",
      "pv.subject": "Tiêu đề",
      "pv.noreply": "Không nhận trả lời",
      "pv.tz": "Giờ theo múi giờ của tiệm ({tz}). Bản xem trước điền mỗi biến từ lịch hẹn mẫu.",

      "s.from": "Email gửi từ ai",
      "s.from.lede": "Dùng cho mọi tin tiệm gửi. Đặt một lần ở đây, không phải trong từng mẫu tin.",
      "s.name": "Tên người gửi",
      "s.name.hint": "Khách thấy tên này là người gửi.",
      "s.reply": "Khi khách trả lời, gửi tới",
      "s.reply.shop": "Email của tiệm",
      "s.reply.staff": "Người làm lịch hẹn đó",
      "s.reply.none": "Không ai (no-reply)",
      "s.email": "Email của tiệm",
      "s.email.hint": "Email do pleasebookme gửi; thư trả lời về đây.",
      "s.lang": "Ngôn ngữ và giờ",
      "s.lang.default": "Ngôn ngữ mặc định cho mẫu tin mới",
      "s.tz": "Giờ trong tin",
      "s.tz.hint": "Múi giờ lấy từ cài đặt của tiệm; mỗi mẫu tin vẫn viết được bằng ngôn ngữ khác.",
      "s.ch": "Kênh gửi",
      "s.ch.lede": "Tiệm liên lạc bằng cách nào. Một kênh chỉ bật khi gửi được thật.",
      "s.ch.email": "Gửi qua dịch vụ email của pleasebookme.",
      "s.ch.sms": "Tin nhắn tới số điện thoại của khách.",
      "s.ch.push": "Thông báo trên điện thoại của người trong nhóm.",
      "s.on": "Đang bật",
      later: "Có sau",
      "s.html": "Email có định dạng (HTML)",
      "s.html.lede": "Logo, màu và nút trong email.",
      "s.html.note": "Có sau. Hiện mẫu tin chỉ là chữ thường. HTML cần trình soạn riêng và được kiểm tra bảo mật trước.",

      "m.intro": "Chỉ cho riêng bạn. Mỗi người trong tiệm tự chọn. Những gì khách nhận được đặt trong Mẫu tin.",
      "m.when": "Báo cho tôi khi",
      "m.inapp": "Trong trang quản lý",
      "m.new": "Có lịch hẹn mới cho tôi",
      "m.new.d": "Lịch hẹn của tài nguyên được gắn với bạn",
      "m.wait": "Có lịch hẹn chờ tôi xác nhận",
      "m.wait.d": "Với dịch vụ cần tiệm duyệt",
      "m.cancel": "Lịch hẹn của tôi bị huỷ",
      "m.cancel.d": "Do khách hoặc tiệm huỷ",
      "m.move": "Lịch hẹn của tôi đổi giờ",
      "m.move.d": "Giờ mới, hoặc chuyển sang người khác",
      "m.join": "Có người xin vào tiệm",
      "m.join.d": "Chỉ chủ tiệm và quản lý",
      "m.quiet": "Giờ yên lặng",
      "m.quiet.lede": "Không email hay thông báo nào tới bạn trong khoảng này. Chúng chờ đến khi hết giờ.",
      "m.quiet.on": "Bật giờ yên lặng",
      "m.from": "từ",
      "m.to": "đến",
      "m.quiet.urgent": "Lịch hẹn bị huỷ trong 12 giờ tới vẫn được báo ngay, kể cả trong giờ yên lặng.",

      "a.find": "Tìm theo người nhận",
      "a.allTpl": "Mọi mẫu tin",
      "a.allSt": "Mọi trạng thái",
      "a.to": "Gửi tới",
      "a.tpl": "Mẫu tin",
      "a.ch": "Kênh",
      "a.st": "Trạng thái",
      "a.when": "Lúc",
      "a.team": "Nhóm",
      "a.SENT": "Đã gửi",
      "a.FAILED": "Lỗi",
      "a.WAITING": "Chờ (giờ yên lặng)",
      "a.QUEUED": "Đã xếp lịch",
      "a.CANCELLED": "Đã huỷ",
      "a.again": "Gửi lại",
      "a.againDone": "Đã gửi lại cho {name}.",
      "a.failNote": "{name}: địa chỉ email không tồn tại ({email}). Sửa email của khách trong Khách hàng rồi gửi lại. Một tin được thử lại vài lần rồi mới báo lỗi.",
      "a.none": "Chưa gửi tin nào. Tin hiện ở đây sau lịch hẹn đầu tiên.",
      "a.noMatch": "Không tin nào khớp.",
      "a.at.today": "Hôm nay, {time}",
      "a.at.yesterday": "Hôm qua, {time}",
      "a.at.tomorrow": "Ngày mai, {time}",
      "a.at.quiet": "Gửi lúc 07:00",
      "a.at.cancelled": "Lịch hẹn đã huỷ",

      sample: "Dữ liệu mẫu. Đây là bản thiết kế, chưa nối với hệ thống: không email nào được gửi thật.",
    },
    en: {
      "doc.title": "Notifications | pleasebookme",
      "page.title": "Notifications",
      "page.lede": "What customers and your team are sent, and when.",
      "count.tpl": "{n} templates:",
      "count.on": "{n} on",
      "count.off": "{n} off",
      "count.email": "Email only for now. SMS and push come later.",
      "tab.templates": "Templates",
      "tab.sender": "Email sender",
      "tab.mine": "My notifications",
      "tab.activity": "Activity",
      "new": "New template",

      "group.customer": "To customers",
      "group.team": "To your team",
      "list.note": "Each event comes with a ready-made message. Edit it, or add another, such as a second reminder 2 hours before.",
      "tpl.confirmed": "Booking confirmed",
      "tpl.reminder": "Reminder",
      "tpl.cancelled": "Booking canceled",
      "tpl.moved": "Booking rescheduled",
      "tpl.staffNew": "New booking",
      "tpl.staffCancelled": "Booking canceled",
      "tpl.copy": "Second reminder",
      "to.customer": "The customer",
      "to.staff": "The staff member doing it",
      "to.managers": "Owner and managers",
      "when.now": "Right away",
      "when.-60": "1 hour before",
      "when.-120": "2 hours before",
      "when.-1440": "24 hours before",
      "when.120": "2 hours after",
      "ch.email": "Email",
      "ch.sms": "SMS (later)",
      "ch.push": "Push (later)",
      "lang.vi": "Vietnamese",
      "lang.en": "English",
      "f.name": "Template name",
      "f.when": "When",
      "f.to": "Sent to",
      "f.channel": "Channel",
      "f.lang": "Language",
      "f.subject": "Subject",
      "f.body": "Message",
      edit: "Edit",
      preview: "Preview",
      version: "Version {n} · last changed by {who}, {date}",
      "version.new": "New template, not saved yet",
      insert: "Insert variable",
      "insert.lede": "Click to insert at the cursor:",
      plain: "Plain text only. A variable that is misspelt, or not available for this event, is flagged before you can save. The customer's own words (name, notes) are always inserted as plain text.",
      "bad.var": "There is no {name} variable. Pick one from the list below.",
      "empty.body": "The message cannot be empty.",
      "empty.subject": "An email needs a subject.",
      reset: "Reset to the default message",
      "reset.done": "Back to the default message.",
      test: "Send me a test",
      "test.done": "Test sent to {email}.",
      save: "Save changes",
      saved: "Saved.",
      unsaved: "Unsaved",
      del: "Delete template",
      "del.sure": "Delete now?",
      "del.done": "Template deleted.",
      "on.label": "Turn this template on",
      "sample.booking": "Sample booking:",
      "pv.from": "From",
      "pv.reply": "Reply to",
      "pv.to": "To",
      "pv.subject": "Subject",
      "pv.noreply": "No replies",
      "pv.tz": "Times are in the shop's time zone ({tz}). The preview fills each variable from the sample booking.",

      "s.from": "Who the email comes from",
      "s.from.lede": "For every message the shop sends. Set once here, not in each template.",
      "s.name": "Sender name",
      "s.name.hint": "Customers see this as the sender.",
      "s.reply": "When a customer replies, send it to",
      "s.reply.shop": "The shop's email",
      "s.reply.staff": "The person doing the booking",
      "s.reply.none": "Nobody (no-reply)",
      "s.email": "Shop email",
      "s.email.hint": "Emails are sent by pleasebookme; replies land here.",
      "s.lang": "Language and time",
      "s.lang.default": "Default language for new templates",
      "s.tz": "Times in messages",
      "s.tz.hint": "The time zone comes from the shop's settings; each template can still be written in another language.",
      "s.ch": "Channels",
      "s.ch.lede": "Which ways the shop can reach people. A channel turns on only when it can really deliver.",
      "s.ch.email": "Sent through the pleasebookme email service.",
      "s.ch.sms": "Text messages to a customer's phone.",
      "s.ch.push": "Alerts on a team member's phone.",
      "s.on": "On",
      later: "Later",
      "s.html": "Rich emails (HTML)",
      "s.html.lede": "Logos, colours and buttons in emails.",
      "s.html.note": "Later. Templates are plain text for now. HTML needs its own editor and a security review first.",

      "m.intro": "Only for you. Each person in the shop picks their own. What customers receive is set in Templates.",
      "m.when": "Tell me when",
      "m.inapp": "In the dashboard",
      "m.new": "A new booking is made for me",
      "m.new.d": "Bookings for the resources linked to you",
      "m.wait": "A booking waits for my confirmation",
      "m.wait.d": "For services that need the shop to accept",
      "m.cancel": "A booking of mine is canceled",
      "m.cancel.d": "By the customer or the shop",
      "m.move": "A booking of mine is rescheduled",
      "m.move.d": "A new time, or moved to someone else",
      "m.join": "Someone asks to join the shop",
      "m.join.d": "Owners and managers only",
      "m.quiet": "Quiet hours",
      "m.quiet.lede": "No emails or alerts to you in this window. They wait until it ends.",
      "m.quiet.on": "Use quiet hours",
      "m.from": "from",
      "m.to": "to",
      "m.quiet.urgent": "A cancellation for a booking in the next 12 hours still comes through, even in quiet hours.",

      "a.find": "Search by recipient",
      "a.allTpl": "All templates",
      "a.allSt": "All statuses",
      "a.to": "Sent to",
      "a.tpl": "Template",
      "a.ch": "Channel",
      "a.st": "Status",
      "a.when": "When",
      "a.team": "Team",
      "a.SENT": "Sent",
      "a.FAILED": "Failed",
      "a.WAITING": "Waiting (quiet hours)",
      "a.QUEUED": "Queued",
      "a.CANCELLED": "Canceled",
      "a.again": "Send again",
      "a.againDone": "Sent to {name} again.",
      "a.failNote": "{name}: the address does not exist ({email}). Fix the customer's email in Customers, then send again. A message is retried a few times before it is marked Failed.",
      "a.none": "Nothing sent yet. Messages show up here after the first booking.",
      "a.noMatch": "No message matches.",
      "a.at.today": "Today, {time}",
      "a.at.yesterday": "Yesterday, {time}",
      "a.at.tomorrow": "Tomorrow, {time}",
      "a.at.quiet": "Sends at 07:00",
      "a.at.cancelled": "Booking canceled",

      sample: "Sample data. This is a design, not connected to the system: no email is really sent.",
    },
  });

  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  const ascii = (s) =>
    String(s)
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .toLowerCase();
  const hhmm = (min) => `${String(Math.floor(min / 60)).padStart(2, "0")}:${String(min % 60).padStart(2, "0")}`;
  const KEY = "pbm-notify";
  const TZ = "Asia/Ho_Chi_Minh";
  const OWNER_EMAIL = "tiemtocmau@gmail.com";
  const shopName = () => S.SHOP?.profile?.name || t("org.name");

  // ---------- Variables ----------
  // Placeholders until Trung sends the real names from the notification
  // service; the labels are what the owner sees.
  const VARS = ["customer_name", "service_name", "staff_name", "booking_start", "booking_end", "booking_status", "location", "shop_name", "manage_link"];
  const VLAB = {
    vi: {
      customer_name: "Tên khách",
      service_name: "Dịch vụ",
      staff_name: "Người làm",
      booking_start: "Giờ bắt đầu",
      booking_end: "Giờ kết thúc",
      booking_status: "Trạng thái",
      location: "Địa chỉ",
      shop_name: "Tên tiệm",
      manage_link: "Link đổi hoặc huỷ",
    },
    en: {
      customer_name: "Customer name",
      service_name: "Service",
      staff_name: "Staff member",
      booking_start: "Start time",
      booking_end: "End time",
      booking_status: "Booking status",
      location: "Address",
      shop_name: "Shop name",
      manage_link: "Change or cancel link",
    },
  };

  // The sample booking every preview is filled from (the one the customer's
  // booking page is about, so the two agree).
  function sampleValues(lang) {
    const svc = EXAMPLE.SERVICES.cut || Object.values(EXAMPLE.SERVICES)[0];
    const branch = EXAMPLE.BRANCHES[0];
    const day = new Date(TODAY);
    day.setDate(day.getDate() + 1);
    const locale = lang === "vi" ? "vi-VN" : "en-US";
    const when = day.toLocaleDateString(locale, { weekday: "long", day: "numeric", month: "numeric", year: "numeric" });
    return {
      customer_name: "Ngọc Anh",
      service_name: svc ? svc[lang] : "Haircut",
      staff_name: EXAMPLE.STAFF[0]?.name || "Tuấn",
      booking_start: `09:30, ${when}`,
      booking_end: "10:00",
      booking_status: lang === "vi" ? "Đã xác nhận" : "Confirmed",
      location: branch?.address || "12 Trần Thái Tông, Cầu Giấy, Hà Nội",
      shop_name: shopName(),
      manage_link: `pleasebookme.app/booking/${S.SHOP.slug || "tiem-toc-mau"}/b/7KQ2M`,
    };
  }

  // ---------- Templates ----------

  const DEFAULTS = {
    confirmed: {
      to: "customer",
      when: "now",
      subject: "Đã xác nhận: {{service_name}} lúc {{booking_start}}",
      body: "Xin chào {{customer_name}},\n\n{{shop_name}} đã xác nhận lịch {{service_name}} của bạn với {{staff_name}} lúc {{booking_start}}.\n\nĐịa chỉ: {{location}}\n\nCần đổi giờ hoặc huỷ? {{manage_link}}\n\nHẹn gặp bạn,\n{{shop_name}}",
    },
    reminder: {
      to: "customer",
      when: "-1440",
      subject: "Nhắc lịch: {{service_name}} với {{staff_name}} ngày mai",
      body: "Xin chào {{customer_name}},\n\nNhắc bạn lịch {{service_name}} với {{staff_name}} lúc {{booking_start}}.\n\nĐịa chỉ: {{location}}\n\nCần đổi giờ hoặc huỷ? {{manage_link}}\n\nHẹn gặp bạn,\n{{shop_name}}",
    },
    cancelled: {
      to: "customer",
      when: "now",
      subject: "Lịch hẹn đã huỷ: {{service_name}} lúc {{booking_start}}",
      body: "Xin chào {{customer_name}},\n\nLịch {{service_name}} lúc {{booking_start}} đã được huỷ.\n\nMuốn đặt lại? {{manage_link}}\n\n{{shop_name}}",
    },
    moved: {
      to: "customer",
      when: "now",
      off: true,
      subject: "Lịch hẹn đổi giờ: {{service_name}} lúc {{booking_start}}",
      body: "Xin chào {{customer_name}},\n\nLịch {{service_name}} của bạn với {{staff_name}} giờ là {{booking_start}}.\n\nCần đổi lại? {{manage_link}}\n\n{{shop_name}}",
    },
    staffNew: {
      to: "staff",
      when: "now",
      subject: "Lịch hẹn mới: {{customer_name}}, {{booking_start}}",
      body: "{{customer_name}} vừa đặt {{service_name}} với bạn lúc {{booking_start}} ({{booking_status}}).",
    },
    staffCancelled: {
      to: "staff",
      when: "now",
      subject: "Lịch hẹn bị huỷ: {{customer_name}}, {{booking_start}}",
      body: "Lịch {{service_name}} của {{customer_name}} lúc {{booking_start}} đã bị huỷ.",
    },
  };
  const ORDER = Object.keys(DEFAULTS);
  const builtIn = (id) => ({
    id,
    key: id,
    name: "",
    to: DEFAULTS[id].to,
    when: DEFAULTS[id].when,
    channel: "email",
    lang: "vi",
    on: !DEFAULTS[id].off,
    subject: DEFAULTS[id].subject,
    body: DEFAULTS[id].body,
    version: id === "reminder" ? 3 : 1,
    by: id === "reminder" && STAFF.length ? "Khoa" : "",
    at: id === "reminder" ? "2026-10-11" : "",
  });

  function load() {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY));
      if (saved && saved.v === 1) return saved.data;
    } catch {
      /* start from the defaults */
    }
    return {
      templates: ORDER.map(builtIn),
      sender: { name: "", reply: "shop", email: OWNER_EMAIL, lang: "vi" },
      mine: { new: [true, true], wait: [true, true], cancel: [true, true], move: [false, true], join: [true, true], quiet: true, from: "22:00", to: "07:00" },
      resent: [],
    };
  }
  const data = load();
  function keep() {
    try {
      localStorage.setItem(KEY, JSON.stringify({ v: 1, data }));
    } catch {
      toast(t("store.full"));
    }
  }

  const tplName = (tpl) => tpl.name || t("tpl." + tpl.key);
  const tplById = (id) => data.templates.find((x) => x.id === id);

  // ---------- State ----------

  const state = { tab: "templates", open: ORDER[1], mode: "edit", draft: null, errors: {}, sure: false, sender: null, mine: null, q: "", tpl: "", st: "" };

  function openTemplate(id) {
    const tpl = tplById(id) || data.templates[0];
    state.open = tpl.id;
    state.draft = { ...tpl };
    state.errors = {};
    state.sure = false;
  }

  const changed = () => {
    const tpl = tplById(state.open);
    return ["name", "to", "when", "channel", "lang", "subject", "body"].some((k) => (state.draft[k] ?? "") !== (tpl[k] ?? "")) || tpl.unsaved;
  };

  function check(d) {
    const errors = {};
    const bad = (text) => [...String(text).matchAll(/\{\{\s*([^}]*?)\s*\}\}/g)].map((m) => m[1]).find((n) => !VARS.includes(n));
    const bs = bad(d.subject);
    const bb = bad(d.body);
    if (!d.subject.trim()) errors.subject = t("empty.subject");
    else if (bs !== undefined) errors.subject = t("bad.var", { name: `{{${esc(bs)}}}` });
    if (!d.body.trim()) errors.body = t("empty.body");
    else if (bb !== undefined) errors.body = t("bad.var", { name: `{{${esc(bb)}}}` });
    return errors;
  }

  // ---------- Heading and tabs ----------

  function headHTML() {
    const on = data.templates.filter((x) => x.on).length;
    const off = data.templates.length - on;
    const tab = (id) => `<a href="#${id}" ${state.tab === id ? 'aria-current="page"' : ""}>${t("tab." + id)}</a>`;
    return `
      <header class="kit-head">
        <h1>${t("page.title")}</h1>
        ${state.tab === "templates" ? `<div class="kit-actions"><button class="btn btn-quiet" type="button" data-new>${icon("plus")}${t("new")}</button></div>` : ""}
        <p>${t("page.lede")}</p>
      </header>
      <p class="kit-counts">
        <span>${t("count.tpl", { n: data.templates.length })}</span>
        <span class="dot-word"><i></i>${t("count.on", { n: on })}</span>
        ${off ? `<span class="dot-word is-off"><i></i>${t("count.off", { n: off })}</span>` : ""}
        <span>· ${t("count.email")}</span>
      </p>
      <nav class="kit-tabs" aria-label="${t("page.title")}">${tab("templates")}${tab("sender")}${tab("mine")}${tab("activity")}</nav>`;
  }

  // ---------- Templates tab ----------

  function listHTML() {
    const group = (to, label) => {
      const items = data.templates.filter((x) => (to === "customer" ? x.to === "customer" : x.to !== "customer"));
      if (!items.length) return "";
      return `<div class="tpl-group"><p class="tpl-group-name">${label}</p>${items
        .map(
          (x) => `<div class="tpl-item ${x.id === state.open ? "is-open" : ""}">
            <a href="#templates/${x.id}" ${x.id === state.open ? 'aria-current="true"' : ""}><strong>${esc(tplName(x))}</strong><small>${icon("mail")}${t("ch." + x.channel)} · ${t("when." + x.when)}</small></a>
            <input class="switch" type="checkbox" data-on="${x.id}" ${x.on ? "checked" : ""} aria-label="${t("on.label")}: ${esc(tplName(x))}" />
          </div>`
        )
        .join("")}</div>`;
    };
    return `<nav class="tpl-list" aria-label="${t("tab.templates")}">${group("customer", t("group.customer"))}${group("team", t("group.team"))}<p class="tpl-note">${t("list.note")}</p></nav>`;
  }

  const select = (id, value, options, label) =>
    `<label class="field"><span class="label">${label}</span><select class="input" data-d="${id}">${options
      .map(([v, text, disabled]) => `<option value="${v}" ${v === value ? "selected" : ""} ${disabled ? "disabled" : ""}>${text}</option>`)
      .join("")}</select></label>`;

  function render(text, lang) {
    const v = sampleValues(lang);
    return esc(text).replace(/\{\{\s*([a-z_]+)\s*\}\}/g, (m, name) => (name in v ? esc(v[name]) : m));
  }

  function editorHTML() {
    const d = state.draft;
    const tpl = tplById(d.id);
    const e = state.errors;
    const head = `
      <header class="ed-head">
        <div>
          <h2>${esc(tplName(d))}<span class="tag-later">${t(d.to === "customer" ? "group.customer" : "group.team")}</span></h2>
          <p>${tpl.unsaved ? t("version.new") : tpl.by ? t("version", { n: tpl.version, who: esc(tpl.by), date: new Date(tpl.at).toLocaleDateString(PBM.locale, { day: "numeric", month: "short" }) }) : t("version", { n: tpl.version, who: t("org.name"), date: "—" })}</p>
        </div>
        <div class="seg" role="group" style="--n:2;--i:${state.mode === "edit" ? 0 : 1}">
          <button type="button" data-mode="edit" aria-pressed="${state.mode === "edit"}">${t("edit")}</button>
          <button type="button" data-mode="preview" aria-pressed="${state.mode === "preview"}">${t("preview")}</button>
        </div>
      </header>
      <div class="ed-row">
        ${select("when", d.when, ["now", "-60", "-120", "-1440", "120"].map((v) => [v, t("when." + v)]), t("f.when"))}
        ${select("to", d.to, [["customer", t("to.customer")], ["staff", t("to.staff")], ["managers", t("to.managers")]], t("f.to"))}
        ${select("channel", d.channel, [["email", t("ch.email")], ["sms", t("ch.sms"), true], ["push", t("ch.push"), true]], t("f.channel"))}
        ${select("lang", d.lang, [["vi", t("lang.vi")], ["en", t("lang.en")]], t("f.lang"))}
      </div>`;
    let body;
    if (state.mode === "preview") {
      const reply = data.sender.reply === "none" ? t("pv.noreply") : data.sender.reply === "staff" ? `${esc(EXAMPLE.STAFF[0]?.name || "Tuấn")} <${ascii(EXAMPLE.STAFF[0]?.name || "tuan")}.barber@gmail.com>` : esc(data.sender.email);
      body = `
        <div class="pv-pick"><span>${t("sample.booking")}</span><span class="pv-chip">${esc(sampleValues(PBM.lang).service_name)} · ${esc(sampleValues(PBM.lang).staff_name)} · ${esc(sampleValues(PBM.lang).booking_start)}</span></div>
        <article class="pv">
          <dl class="pv-head">
            <dt>${t("pv.from")}</dt><dd>${esc(data.sender.name || shopName())} &lt;no-reply@pleasebookme.app&gt;</dd>
            <dt>${t("pv.reply")}</dt><dd>${reply}</dd>
            <dt>${t("pv.to")}</dt><dd>Ngọc Anh &lt;ngocanh.99@gmail.com&gt;</dd>
            <dt>${t("pv.subject")}</dt><dd><strong>${render(d.subject, d.lang)}</strong></dd>
          </dl>
          <div class="pv-body">${render(d.body, d.lang).replace(/\n/g, "<br />")}</div>
        </article>
        <p class="ed-hint">${t("pv.tz", { tz: TZ })}</p>`;
    } else {
      body = `
        ${tpl.key ? "" : `<label class="field"><span class="label">${t("f.name")}</span><input class="input" data-d="name" value="${esc(d.name)}" maxlength="120" /></label>`}
        <div class="field">
          <label for="ed-subject">${t("f.subject")}</label>
          <input class="input" id="ed-subject" data-d="subject" value="${esc(d.subject)}" ${e.subject ? 'aria-invalid="true"' : ""} />
          ${e.subject ? `<span class="error">${e.subject}</span>` : ""}
        </div>
        <div class="field">
          <span class="label-row"><label for="ed-body">${t("f.body")}</label><span class="ins-label">${icon("braces")}${t("insert")}</span></span>
          <textarea class="input" id="ed-body" data-d="body" rows="11" ${e.body ? 'aria-invalid="true"' : ""}>${esc(d.body)}</textarea>
          ${e.body ? `<span class="error">${e.body}</span>` : ""}
          <div class="vars"><span>${t("insert.lede")}</span>${VARS.map((v) => `<button type="button" class="var" data-var="${v}" title="{{${v}}}">${VLAB[PBM.lang][v]}</button>`).join("")}</div>
        </div>
        <p class="kit-note">${icon("info")}<span>${t("plain")}</span></p>`;
    }
    const dirty = changed();
    return `
      <form class="panel ed" id="ed" novalidate>
        ${head}
        ${body}
        <footer class="ed-foot">
          ${
            tpl.key
              ? `<button class="link-btn ed-reset" type="button" data-reset>${icon("reset")}${t("reset")}</button>`
              : `<button class="btn btn-quiet btn-danger ${state.sure ? "is-sure" : ""}" type="button" data-del>${t(state.sure ? "del.sure" : "del")}</button>`
          }
          <span class="spacer"></span>
          <span class="peek-dirty" ${dirty ? "" : "hidden"}>${t("unsaved")}</span>
          <button class="btn btn-quiet" type="button" data-test>${icon("send")}${t("test")}</button>
          <button class="btn btn-primary" type="submit" ${dirty ? "" : "disabled"}>${t("save")}</button>
        </footer>
      </form>`;
  }

  function templatesHTML() {
    if (!state.draft || !tplById(state.draft.id)) openTemplate(state.open);
    return `<div class="tpl-layout">${listHTML()}<div id="editor">${editorHTML()}</div></div>`;
  }

  // ---------- Email sender tab ----------

  function senderHTML() {
    const d = (state.sender ||= { ...data.sender });
    const dirty = Object.keys(d).some((k) => d[k] !== data.sender[k]);
    const chip = (v) =>
      `<label class="chip-pick is-plain"><input class="visually-hidden" type="radio" name="reply" value="${v}" ${d.reply === v ? "checked" : ""} /><span>${t("s.reply." + v)}</span></label>`;
    const ch = (ic, name, line, right) => `<li><span class="ch-icon">${icon(ic)}</span><span><strong>${name}</strong><small>${line}</small></span>${right}</li>`;
    return `
      <form class="cards" id="sender" novalidate>
        <div class="cards-col">
          <section class="panel card">
            <h2>${t("s.from")}</h2><p class="card-lede">${t("s.from.lede")}</p>
            <label class="field"><span class="label">${t("s.name")}</span><input class="input" data-s="name" value="${esc(d.name)}" placeholder="${esc(shopName())}" maxlength="120" /><small>${t("s.name.hint")}</small></label>
            <div class="field"><span class="label">${t("s.reply")}</span><div class="chips">${chip("shop")}${chip("staff")}${chip("none")}</div></div>
            <label class="field"><span class="label">${t("s.email")}</span><input class="input" type="email" data-s="email" value="${esc(d.email)}" ${d.reply === "shop" ? "" : "disabled"} /><small>${t("s.email.hint")}</small></label>
          </section>
          <section class="panel card">
            <h2>${t("s.lang")}</h2>
            <div class="field-pair">
              <label class="field"><span class="label">${t("s.lang.default")}</span><select class="input" data-s="lang"><option value="vi" ${d.lang === "vi" ? "selected" : ""}>${t("lang.vi")}</option><option value="en" ${d.lang === "en" ? "selected" : ""}>${t("lang.en")}</option></select></label>
              <label class="field"><span class="label">${t("s.tz")}</span><input class="input" value="${TZ}" disabled /></label>
            </div>
            <p class="card-lede">${t("s.tz.hint")}</p>
          </section>
        </div>
        <div class="cards-col">
          <section class="panel card">
            <h2>${t("s.ch")}</h2><p class="card-lede">${t("s.ch.lede")}</p>
            <ul class="channels">
              ${ch("mail", t("ch.email"), t("s.ch.email"), `<span class="dot-word"><i></i>${t("s.on")}</span>`)}
              ${ch("phone", "SMS", t("s.ch.sms"), `<span class="tag-later">${t("later")}</span>`)}
              ${ch("bell", t("ch.push").replace(/ \(.*\)/, ""), t("s.ch.push"), `<span class="tag-later">${t("later")}</span>`)}
            </ul>
          </section>
          <section class="panel card">
            <h2>${t("s.html")}</h2><p class="card-lede">${t("s.html.lede")}</p>
            <p class="kit-note">${icon("info")}<span>${t("s.html.note")}</span></p>
          </section>
        </div>
        <footer class="cards-foot"><span class="peek-dirty" ${dirty ? "" : "hidden"}>${t("unsaved")}</span><button class="btn btn-primary" type="submit" ${dirty ? "" : "disabled"}>${t("save")}</button></footer>
      </form>`;
  }

  // ---------- My notifications tab ----------

  const MINE = ["new", "wait", "cancel", "move", "join"];
  function mineHTML() {
    const d = (state.mine ||= JSON.parse(JSON.stringify(data.mine)));
    const dirty = JSON.stringify(d) !== JSON.stringify(data.mine);
    const sw = (k, i) => `<input class="switch" type="checkbox" data-mine="${k}" data-i="${i}" ${d[k][i] ? "checked" : ""} aria-label="${t("m." + k)}: ${i ? t("m.inapp") : t("ch.email")}" />`;
    return `
      <form id="mine" novalidate>
        <p class="kit-note mine-intro">${icon("bell")}<span>${t("m.intro")}</span></p>
        <section class="panel"><div class="dt-wrap"><table class="dt mine-table">
          <thead><tr><th>${t("m.when")}</th><th>${t("ch.email")}</th><th>SMS</th><th>${t("ch.push").replace(/ \(.*\)/, "")}</th><th>${t("m.inapp")}</th></tr></thead>
          <tbody>${MINE.map(
            (k) => `<tr><td><span class="dt-name"><strong>${t("m." + k)}</strong><small>${t("m." + k + ".d")}</small></span></td><td>${sw(k, 0)}</td><td><span class="tag-later">${t("later")}</span></td><td><span class="tag-later">${t("later")}</span></td><td>${sw(k, 1)}</td></tr>`
          ).join("")}</tbody>
        </table></div></section>
        <section class="panel card quiet">
          <h2>${icon("moonQuiet")}${t("m.quiet")}</h2>
          <p class="card-lede">${t("m.quiet.lede")}</p>
          <div class="quiet-row">
            <label class="switch-line"><input class="switch" type="checkbox" data-quiet ${d.quiet ? "checked" : ""} /><strong>${t("m.quiet.on")}</strong></label>
            <span class="quiet-times" ${d.quiet ? "" : "data-off"}>
              ${t("m.from")} <input class="input num" type="time" data-qt="from" value="${d.from}" ${d.quiet ? "" : "disabled"} aria-label="${t("m.from")}" />
              ${t("m.to")} <input class="input num" type="time" data-qt="to" value="${d.to}" ${d.quiet ? "" : "disabled"} aria-label="${t("m.to")}" />
              <small>${TZ}</small>
            </span>
          </div>
          <p class="card-lede">${t("m.quiet.urgent")}</p>
        </section>
        <footer class="cards-foot"><span class="peek-dirty" ${dirty ? "" : "hidden"}>${t("unsaved")}</span><button class="btn btn-primary" type="submit" ${dirty ? "" : "disabled"}>${t("save")}</button></footer>
      </form>`;
  }

  // ---------- Activity tab ----------

  // Built from the bookings around today, so it agrees with Bookings: a
  // confirmation and a staff alert for each booking made, a reminder for each
  // one tomorrow, a cancellation for each canceled one. One customer typed
  // their email wrong, so that one failed.
  function activity() {
    const rows = [];
    const staffName = (id) => STAFF.find((p) => p.id === id)?.name || "";
    const email = (name) => ascii(name).replace(/\s+/g, ".") + "@gmail.com";
    const label = (min) => {
      const day = Math.floor(min / 1440);
      const time = hhmm(((min % 1440) + 1440) % 1440);
      return t(day === 0 ? "a.at.today" : day < 0 ? "a.at.yesterday" : "a.at.tomorrow", { time });
    };
    // `at` is minutes from the start of today, so rows sort by when they go.
    const add = (row, at, text) => rows.push({ ...row, at, when: text || label(at) });
    BOOKINGS.filter((b) => b.day >= -1 && b.day <= 1)
      .slice(-14)
      .forEach((b, i) => {
        const made = Math.min(b.day * 1440 + b.start - 90, NOW - 10 * (i + 1));
        const who = { name: b.customer, email: email(b.customer) };
        if (b.status === "CANCELLED") {
          add({ id: `c${b.id}`, ...who, tpl: "cancelled", st: "SENT" }, made);
          if (b.day === 1) add({ id: `r${b.id}`, ...who, tpl: "reminder", st: "CANCELLED" }, made, t("a.at.cancelled"));
          return;
        }
        const typo = i === 3;
        add({ id: `k${b.id}`, ...who, email: typo ? who.email.replace("gmail", "gmial") : who.email, tpl: "confirmed", st: typo ? "FAILED" : "SENT" }, made);
        if (i % 3 === 0) {
          const name = staffName(b.staff);
          const quiet = i === 6;
          add({ id: `s${b.id}`, name, email: email(name), tpl: "staffNew", st: quiet ? "WAITING" : "SENT", team: true }, quiet ? 1440 + 7 * 60 : made, quiet ? t("a.at.quiet") : "");
        }
        // A reminder goes 24 hours before: today, at the booking's own time.
        if (b.day === 1) add({ id: `r${b.id}`, ...who, tpl: "reminder", st: "QUEUED" }, b.start);
      });
    rows.forEach((r) => {
      if (data.resent.includes(r.id)) r.st = "SENT";
    });
    return rows.sort((a, b) => b.at - a.at);
  }

  function activityHTML() {
    const all = activity();
    if (!all.length) return `<section class="kit-empty"><p>${t("a.none")}</p></section>`;
    const q = ascii(state.q.trim());
    const rows = all.filter((r) => (!q || ascii(r.name + " " + r.email).includes(q)) && (!state.tpl || r.tpl === state.tpl) && (!state.st || r.st === state.st));
    const dot = { SENT: "", FAILED: "is-bad", WAITING: "is-warn is-off", QUEUED: "is-off", CANCELLED: "is-off is-muted" };
    const failed = all.find((r) => r.st === "FAILED");
    return `
      <form class="panel kit-bar" id="afilters" role="search">
        <label class="kit-find">${icon("search")}<span class="visually-hidden">${t("a.find")}</span><input class="input" type="search" id="aq" value="${esc(state.q)}" placeholder="${t("a.find")}" autocomplete="off" /></label>
        <select class="input" id="atpl" aria-label="${t("a.tpl")}"><option value="">${t("a.allTpl")}</option>${ORDER.map((k) => `<option value="${k}" ${state.tpl === k ? "selected" : ""}>${t("tpl." + k)}${DEFAULTS[k].to === "staff" ? " (" + t("a.team") + ")" : ""}</option>`).join("")}</select>
        <select class="input" id="ast" aria-label="${t("a.st")}"><option value="">${t("a.allSt")}</option>${Object.keys(dot).map((k) => `<option value="${k}" ${state.st === k ? "selected" : ""}>${t("a." + k)}</option>`).join("")}</select>
      </form>
      <div id="aresults">${
        rows.length
          ? `<section class="panel"><div class="dt-wrap"><table class="dt">
              <thead><tr><th>${t("a.to")}</th><th>${t("a.tpl")}</th><th>${t("a.ch")}</th><th>${t("a.st")}</th><th>${t("a.when")}</th><th></th></tr></thead>
              <tbody>${rows
                .map(
                  (r) => `<tr><td><span class="dt-name"><strong>${esc(r.name)}</strong><small>${r.team ? t("a.team") + " · " : ""}${esc(r.email)}</small></span></td>
                    <td>${t("tpl." + r.tpl)}</td><td>${t("ch.email")}</td>
                    <td><span class="dot-word ${dot[r.st]}"><i></i>${t("a." + r.st)}</span></td>
                    <td class="num">${esc(r.when)}</td>
                    <td class="dt-actions">${r.st === "FAILED" ? `<span class="kit-links"><button type="button" data-again="${r.id}" data-name="${esc(r.name)}">${t("a.again")}</button></span>` : ""}</td></tr>`
                )
                .join("")}</tbody></table></div></section>`
          : `<section class="kit-empty"><p>${t("a.noMatch")}</p></section>`
      }</div>
      ${failed ? `<p class="kit-note is-bad fail-note">${icon("alert")}<span>${t("a.failNote", { name: esc(failed.name), email: esc(failed.email) })}</span></p>` : ""}`;
  }

  // ---------- The page ----------

  function renderPage() {
    document.title = t("doc.title");
    const body = { templates: templatesHTML, sender: senderHTML, mine: mineHTML, activity: activityHTML }[state.tab]();
    $("view").innerHTML = `<div class="kit">${headHTML()}<div id="tab">${body}</div><p class="kit-sample">${t("sample")}</p></div>`;
  }

  // Only the editor is redrawn while typing elsewhere in it, and only the parts
  // that follow typing (the save state) while typing in a field.
  function renderEditor() {
    const el = $("editor");
    if (!el) return renderPage();
    el.innerHTML = editorHTML();
  }

  function syncDirty(form) {
    const dirty = form.id === "ed" ? changed() : form.id === "sender" ? Object.keys(state.sender).some((k) => state.sender[k] !== data.sender[k]) : JSON.stringify(state.mine) !== JSON.stringify(data.mine);
    form.querySelector(".peek-dirty").hidden = !dirty;
    form.querySelector('button[type="submit"]').disabled = !dirty;
  }

  function route() {
    const h = decodeURIComponent(location.hash.slice(1));
    const [tab, id] = h.split("/");
    state.tab = ["templates", "sender", "mine", "activity"].includes(tab) ? tab : "templates";
    if (state.tab === "templates" && id && tplById(id) && id !== state.open) {
      openTemplate(id);
      state.mode = "edit";
    }
    renderPage();
  }

  // ---------- Events ----------

  let lastField = "body";

  document.addEventListener("focusin", (event) => {
    if (event.target.id === "ed-subject") lastField = "subject";
    if (event.target.id === "ed-body") lastField = "body";
  });

  document.addEventListener("click", (event) => {
    const at = (sel) => event.target.closest(sel);
    if (at("[data-new]")) {
      const base = tplById("reminder") || data.templates[0];
      const id = PBM.store.newId("tpl", data.templates.map((x) => x.id));
      data.templates.push({ ...base, id, key: "", name: t("tpl.copy"), when: "-120", version: 0, by: "", at: "", unsaved: true });
      openTemplate(id);
      state.mode = "edit";
      location.hash = "templates/" + id;
      return;
    }
    const mode = at("[data-mode]");
    if (mode) {
      state.mode = mode.dataset.mode;
      return renderEditor();
    }
    const v = at("[data-var]");
    if (v) {
      const field = $(lastField === "subject" ? "ed-subject" : "ed-body");
      const token = `{{${v.dataset.var}}}`;
      const s = field.selectionStart ?? field.value.length;
      const e = field.selectionEnd ?? s;
      field.value = field.value.slice(0, s) + token + field.value.slice(e);
      state.draft[lastField] = field.value;
      field.focus();
      field.setSelectionRange(s + token.length, s + token.length);
      return syncDirty($("ed"));
    }
    if (at("[data-reset]")) {
      const def = builtIn(state.draft.key);
      Object.assign(state.draft, { to: def.to, when: def.when, subject: def.subject, body: def.body, lang: def.lang, channel: def.channel });
      state.errors = {};
      renderEditor();
      return toast(t("reset.done"));
    }
    if (at("[data-test]")) return toast(t("test.done", { email: OWNER_EMAIL }));
    if (at("[data-del]")) {
      if (!state.sure) {
        state.sure = true;
        return renderEditor();
      }
      data.templates = data.templates.filter((x) => x.id !== state.draft.id);
      keep();
      openTemplate(ORDER[1]);
      toast(t("del.done"));
      location.hash = "templates/" + state.open;
      return renderPage();
    }
    const again = at("[data-again]");
    if (again) {
      data.resent.push(again.dataset.again);
      keep();
      renderPage();
      return toast(t("a.againDone", { name: again.dataset.name }));
    }
  });

  document.addEventListener("input", (event) => {
    const el = event.target;
    if (el.dataset.d && (el.dataset.d === "subject" || el.dataset.d === "body" || el.dataset.d === "name")) {
      state.draft[el.dataset.d] = el.value;
      return syncDirty($("ed"));
    }
    if (el.dataset.s) {
      state.sender[el.dataset.s] = el.value;
      return syncDirty($("sender"));
    }
    if (el.id === "aq") {
      state.q = el.value;
      const pos = el.selectionStart;
      renderPage();
      $("aq").focus();
      $("aq").setSelectionRange(pos, pos);
    }
  });

  document.addEventListener("change", (event) => {
    const el = event.target;
    if (el.dataset.on) {
      tplById(el.dataset.on).on = el.checked;
      keep();
      return renderPage();
    }
    if (el.dataset.d && el.tagName === "SELECT") {
      state.draft[el.dataset.d] = el.value;
      return renderEditor();
    }
    if (el.name === "reply") {
      state.sender.reply = el.value;
      return renderPage();
    }
    if (el.dataset.s && el.tagName === "SELECT") {
      state.sender[el.dataset.s] = el.value;
      return syncDirty($("sender"));
    }
    if (el.dataset.mine) {
      state.mine[el.dataset.mine][Number(el.dataset.i)] = el.checked;
      return syncDirty($("mine"));
    }
    if ("quiet" in el.dataset) {
      state.mine.quiet = el.checked;
      return renderPage();
    }
    if (el.dataset.qt) {
      state.mine[el.dataset.qt] = el.value;
      return syncDirty($("mine"));
    }
    if (el.id === "atpl" || el.id === "ast") {
      state[el.id === "atpl" ? "tpl" : "st"] = el.value;
      return renderPage();
    }
  });

  document.addEventListener("submit", (event) => {
    const form = event.target;
    event.preventDefault();
    if (form.id === "ed") {
      state.errors = check(state.draft);
      if (Object.keys(state.errors).length) {
        state.mode = "edit";
        renderEditor();
        return $(state.errors.subject ? "ed-subject" : "ed-body")?.focus();
      }
      const tpl = tplById(state.draft.id);
      Object.assign(tpl, state.draft, { version: (tpl.version || 0) + 1, by: "Đức Nguyễn", at: "2026-10-13", unsaved: false });
      keep();
      openTemplate(tpl.id);
      renderPage();
      return toast(t("saved"));
    }
    if (form.id === "sender") {
      Object.assign(data.sender, state.sender);
      keep();
      renderPage();
      return toast(t("saved"));
    }
    if (form.id === "mine") {
      data.mine = JSON.parse(JSON.stringify(state.mine));
      keep();
      renderPage();
      return toast(t("saved"));
    }
  });

  window.addEventListener("hashchange", route);
  PBM.onChange(renderPage);
  PBM.mount("notifications");
  route();
})();
