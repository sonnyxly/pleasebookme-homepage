/* Cài đặt: the index of everything the shop can configure, grouped the way
   Cal.com groups its settings: the shop, security, then plan and data.

   Trung's app has one settings page today (Google Calendar, under
   settings/integrations). Every other entry here is a place the design needs,
   so most of them have no page behind them yet: they open the same "not drawn
   yet" message the sidebar uses. Four entries lead to pages the design
   already has: the shop profile, the booking rules (set on each service in
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
      "i.rules.d": "Mỗi dịch vụ tự đặt: báo trước, đặt xa nhất, thời gian nghỉ và cách xác nhận. Mở trong Dịch vụ.",
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
      "i.reset": "Đặt lại tiệm mẫu",
      "i.reset.d": "Xoá mọi thứ bạn đã tạo khi dùng thử bản thiết kế. Chỉ trong trình duyệt này.",
      "i.reset.none": "Trình duyệt này chưa lưu gì của tiệm mẫu.",
      "i.reset.sure": "Bấm lần nữa để đặt lại",
      "i.reset.sure.d": "Dịch vụ, tài nguyên, widget, giờ làm việc và lịch hẹn bạn đã tạo sẽ mất, tiệm trở về như lúc đầu.",
      "i.reset.done": "Đã đặt lại tiệm mẫu",
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
      "i.rules.d": "Each service sets its own: notice, how far ahead, buffers and confirmation. Opens Services.",
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
      "i.reset": "Reset sample shop",
      "i.reset.d": "Remove everything you made while trying the design. In this browser only.",
      "i.reset.none": "Nothing of the sample shop is saved in this browser.",
      "i.reset.sure": "Press again to reset",
      "i.reset.sure.d": "The services, resources, widgets, schedules and bookings you made go, and the shop starts again.",
      "i.reset.done": "Sample shop reset",
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
        // The mockup keeps what you make in this browser (assets/store.js).
        { id: "reset", icon: "trash", reset: true },
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
  let sure = false; // the reset asks twice, like every delete in the design

  function resetHTML(item) {
    const kept = PBM.store.has();
    const name = t(sure ? "i.reset.sure" : "i.reset");
    const desc = t(!kept ? "i.reset.none" : sure ? "i.reset.sure.d" : "i.reset.d");
    return `<li data-find="${plain(t("i.reset") + " " + t("i.reset.d"))}">
        <button class="item item-reset ${sure ? "is-sure" : ""}" type="button" data-reset ${kept ? "" : "disabled"}>
          <span class="tile">${icon(item.icon)}</span>
          <span><strong>${name}</strong><span class="desc">${desc}</span></span>
        </button>
      </li>`;
  }

  function itemHTML(item) {
    if (item.reset) return resetHTML(item);
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

  $("view").addEventListener("click", (event) => {
    if (!event.target.closest("[data-reset]")) return;
    if (!sure) {
      sure = true;
      render();
      return document.querySelector("[data-reset]").focus();
    }
    sure = false;
    PBM.store.reset();
    try {
      sessionStorage.setItem("pbm-reset", "1"); // say so once the page is back
    } catch {
      /* the page still starts again; it just says nothing */
    }
    location.reload(); // start again from the empty sample, sidebar included
  });

  // Leaving the button undoes the first press.
  $("view").addEventListener("focusout", (event) => {
    if (!sure || !event.target.closest("[data-reset]") || event.relatedTarget?.closest("[data-reset]")) return;
    sure = false;
    render();
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
  try {
    if (sessionStorage.getItem("pbm-reset")) {
      sessionStorage.removeItem("pbm-reset");
      PBM.toast(t("i.reset.done"));
    }
  } catch {
    /* no session storage: nothing to say */
  }
})();
