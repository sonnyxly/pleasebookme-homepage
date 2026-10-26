/* Cài đặt: the index of everything the shop can configure, grouped the way
   Cal.com groups its settings: the shop, security, then plan and data.

   Trung's app has one settings page today (Google Calendar, under
   settings/integrations). Every other entry here is a place the design needs,
   so most of them have no page behind them yet: they open the same "not drawn
   yet" message the sidebar uses. Four entries lead to pages the design
   already has: the shop profile, the shop's booking rules (the shared card on
   Dịch vụ), the look of the booking page (on Widget đặt lịch) and Google
   Calendar (Tích hợp, drawn on 23 October). Messages are
   email only for now, so there is no Zalo or SMS entry. */
(function () {
  "use strict";

  const { t, icon } = PBM;

  PBM.addStrings({
    vi: {
      "doc.title": "Cài đặt | pleasebookme",
      "page.title": "Cài đặt",
      "find.ph": "Tìm cài đặt",
      "find.label": "Tìm trong cài đặt",
      "find.none": "Không có cài đặt nào khớp với “{q}”.",
      note: "Dữ liệu mẫu. Đây là bản thiết kế, chưa nối với hệ thống.",

      "g.shop": "Cài đặt tiệm",
      "g.security": "Bảo mật",
      "g.plan": "Gói và dữ liệu",

      "i.profile": "Hồ sơ tiệm",
      "i.profile.d": "Tên, logo, địa chỉ, số điện thoại và link đặt lịch.",
      "i.general": "Chung",
      "i.general.d": "Ngôn ngữ, múi giờ và cách hiện ngày giờ.",
      "i.rules": "Quy tắc đặt lịch",
      "i.rules.d": "Báo trước tối thiểu, cách xác nhận lịch và ngày nhận khách cho cả tiệm.",
      "i.look": "Giao diện",
      "i.look.d": "Màu và kiểu của trang đặt lịch và các widget.",
      "i.notify": "Thông báo",
      "i.notify.d": "Email cho tiệm và cho khách khi có lịch mới, đổi giờ hoặc huỷ.",
      "i.google": "Lịch Google",
      "i.google.d": "Lịch hẹn tự hiện trong lịch Google của bạn.",

      "i.password": "Mật khẩu",
      "i.password.d": "Đổi mật khẩu hoặc cách đăng nhập.",
      "i.twofa": "Xác thực hai bước",
      "i.twofa.d": "Thêm một lớp bảo vệ cho tài khoản của bạn.",
      "i.support": "Hỗ trợ truy cập",
      "i.support.d": "Cho nhóm pleasebookme đăng nhập thay bạn khi cần giúp thiết lập.",
      "i.privacy": "Dữ liệu khách hàng",
      "i.privacy.d": "Xem cách thông tin khách được xử lý, xuất hoặc xoá dữ liệu.",

      "i.plan": "Gói và hoá đơn",
      "i.plan.d": "Xem gói đang dùng và các hoá đơn.",
      "i.import": "Nhập dữ liệu",
      "i.import.d": "Đưa dịch vụ vào từ ảnh bảng giá, hoặc lịch hẹn cũ từ bảng tính.",
    },
    en: {
      "doc.title": "Settings | pleasebookme",
      "page.title": "Settings",
      "find.ph": "Search settings",
      "find.label": "Search settings",
      "find.none": "No setting matches “{q}”.",
      note: "Sample data. This is a design mockup, not connected to the system.",

      "g.shop": "Shop settings",
      "g.security": "Security",
      "g.plan": "Billing and data",

      "i.profile": "Shop profile",
      "i.profile.d": "Name, logo, address, phone number and booking link.",
      "i.general": "General",
      "i.general.d": "Language, timezone and how dates and times are shown.",
      "i.rules": "Booking rules",
      "i.rules.d": "Minimum notice, how bookings are confirmed and which days take customers, for the whole shop.",
      "i.look": "Appearance",
      "i.look.d": "Color and style of the booking page and the widgets.",
      "i.notify": "Notifications",
      "i.notify.d": "Emails to you and your customers when a booking is made, moved or canceled.",
      "i.google": "Google Calendar",
      "i.google.d": "Your bookings show up in your Google Calendar.",

      "i.password": "Password",
      "i.password.d": "Change your password or sign-in method.",
      "i.twofa": "Two-factor authentication",
      "i.twofa.d": "Add an extra layer of security to your account.",
      "i.support": "Support access",
      "i.support.d": "Let the pleasebookme team sign in on your behalf when you need help setting up.",
      "i.privacy": "Customer data",
      "i.privacy.d": "See how customer details are handled, and export or delete data.",

      "i.plan": "Billing",
      "i.plan.d": "See your current plan and your invoices.",
      "i.import": "Import",
      "i.import.d": "Bring in services from a photo of your menu, or past bookings from a spreadsheet.",
    },
  });

  // `href` is a page the design already has; without one the entry opens the
  // "not drawn yet" message.
  const GROUPS = [
    {
      id: "shop",
      items: [
        { id: "profile", icon: "store", href: "/dashboard/profile" },
        { id: "general", icon: "globe" },
        { id: "rules", icon: "calendarCheck", href: "/dashboard/services" },
        { id: "look", icon: "widget", href: "/dashboard/widgets" },
        { id: "notify", icon: "bell" },
        { id: "google", icon: "calendar", href: "/dashboard/integrations" },
      ],
    },
    {
      id: "security",
      items: [
        { id: "password", icon: "key" },
        { id: "twofa", icon: "lock" },
        { id: "support", icon: "lifebuoy" },
        { id: "privacy", icon: "shield" },
      ],
    },
    {
      id: "plan",
      items: [
        { id: "plan", icon: "card" },
        { id: "import", icon: "download" },
      ],
    },
  ];

  const $ = (id) => document.getElementById(id);
  // Search ignores case and Vietnamese marks, so "cai dat" finds "Cài đặt".
  const plain = (text) =>
    String(text)
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/đ/g, "d");

  let query = "";

  function itemHTML(item) {
    const target = item.href ? `href="${item.href}"` : 'href="#" data-pending';
    return `<li data-find="${plain(t("i." + item.id) + " " + t("i." + item.id + ".d"))}">
        <a class="item" ${target}>
          <span class="tile">${icon(item.icon)}</span>
          <span><strong>${t("i." + item.id)}</strong><span class="desc">${t("i." + item.id + ".d")}</span></span>
        </a>
      </li>`;
  }

  function render() {
    document.title = t("doc.title");
    $("view").innerHTML = `
      <div class="wrap">
        <header class="head">
          <h1>${t("page.title")}</h1>
          <label class="find">
            ${icon("search")}
            <input class="input" id="find" type="search" autocomplete="off" placeholder="${t("find.ph")}" aria-label="${t("find.label")}" value="" />
          </label>
        </header>
        ${GROUPS.map(
          (group) => `
        <section class="group" data-group aria-labelledby="g-${group.id}">
          <h2 id="g-${group.id}">${t("g." + group.id)}</h2>
          <ul class="items">${group.items.map(itemHTML).join("")}</ul>
        </section>`
        ).join("")}
        <p class="empty" id="empty" role="status" hidden></p>
        <p class="note">${t("note")}</p>
      </div>`;
    $("find").value = query;
    filter();
  }

  // Hide what does not match, and any group left with nothing in it.
  function filter() {
    const needle = plain(query.trim());
    let shown = 0;
    document.querySelectorAll("[data-group]").forEach((group) => {
      let inGroup = 0;
      group.querySelectorAll("li").forEach((li) => {
        const match = !needle || li.dataset.find.includes(needle);
        li.hidden = !match;
        if (match) inGroup += 1;
      });
      group.hidden = inGroup === 0;
      shown += inGroup;
    });
    const empty = $("empty");
    empty.hidden = shown > 0;
    if (shown === 0) empty.textContent = t("find.none", { q: query.trim() });
  }

  $("view").addEventListener("input", (event) => {
    if (event.target.id !== "find") return;
    query = event.target.value;
    filter();
  });

  $("view").addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || event.target.id !== "find" || !query) return;
    query = "";
    event.target.value = "";
    filter();
  });

  PBM.onChange(render);
  PBM.mount("settings");
  render();
})();
