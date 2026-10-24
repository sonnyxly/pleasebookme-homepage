/* Dịch vụ: the shop's menu as large tiles, and the window that edits one
   service. The data is the sample shop in assets/sample.js; nothing is sent
   anywhere, and a photo picked here stays in this browser tab.

   The logic this page draws is a first draft (Sonny, 2026-10-13):
     - Customers book through one widget. A service is an item on its menu,
       not a booking page of its own.
     - A customer may put several services in one booking.
     - Rules (notice, confirmation, opening days) are set once for the shop.
       A service follows them unless it is given a rule of its own.
     - Each service lists who can do it. The customer may pick a person or
       leave it to the shop.
     - How several services are staffed is a shop setting: one person for the
       whole visit, or handed from one staff member to the next. */
(function () {
  "use strict";

  const { t, icon, toast } = PBM;
  const { OPEN, CLOSE, SHOP, STAFF, SERVICES, SERVICE_ORDER, SCHEDULES } = PBM_SAMPLE;

  const plural = (n, one, many) => (n === 1 ? one : many);

  PBM.addStrings({
    vi: {
      "doc.title": "Dịch vụ | pleasebookme",
      "page.title": "Dịch vụ",
      lede: ({ n, h }) =>
        `${n} dịch vụ trên trang đặt lịch${h ? `, ${h} đang ẩn` : ""}. Khách có thể chọn nhiều dịch vụ trong một lần đặt.`,
      "lede.none": "Dịch vụ là thứ khách chọn khi đặt lịch, như cắt tóc hay uốn.",
      "shop.hours.none": "Chưa đặt giờ làm việc",
      "blank.title": "Chưa có dịch vụ nào",
      "blank.text": "Khách chưa đặt lịch được, vì chưa có gì để chọn. Thêm dịch vụ đầu tiên của tiệm: tên, thời lượng và giá.",
      "blank.go": "Thêm dịch vụ đầu tiên",
      new: "Dịch vụ mới",
      add: "Thêm dịch vụ",
      sort: "Sắp xếp",
      "sort.done": "Xong",
      "view.label": "Kiểu xem",
      "view.tiles": "Ô",
      "view.table": "Bảng",
      "col.order": "Thứ tự",
      "col.service": "Dịch vụ",
      "col.length": "Thời lượng",
      "col.price": "Giá",
      "col.who": "Người làm",
      "col.rules": "Quy định",
      "col.shown": "Hiện cho khách",
      "rules.shop": "Theo tiệm",
      "shown.label": ({ name }) => `Hiện ${name} cho khách`,
      "move.up": "Đưa {name} lên trên",
      "move.down": "Đưa {name} xuống dưới",
      "move.prev": "Đưa {name} lên trước",
      "move.next": "Đưa {name} ra sau",
      "shop.title": "Thiết lập chung của tiệm",
      "shop.sub": "Mọi dịch vụ dùng các thiết lập này, trừ khi dịch vụ có quy định riêng.",
      "shop.edit": "Sửa thiết lập chung",
      "shop.hours": "Giờ mở cửa",
      "shop.notice": "Báo trước tối thiểu",
      "shop.confirm": "Xác nhận lịch",
      "shop.staff": "Khách chọn nhân viên",
      "shop.staff.yes": "Sau khi chọn giờ, không bắt buộc",
      "confirm.manual": "Tiệm xác nhận từng lịch",
      "confirm.auto": "Tự xác nhận",
      "basket.label": "Khi khách chọn nhiều dịch vụ",
      "basket.one": "Một người làm hết",
      "basket.split": "Chia theo người làm",
      "ex.lead": "Ví dụ:",
      "ex.pick": ({ a, b }) => `khách chọn “${a}” cùng “${b}”.`,
      "ex.one": "Không ai làm được cả hai, nên khách phải đặt hai lịch riêng.",
      "ex.split.note": "Hai phần nối tiếp nhau trong một lịch, không có giờ nghỉ ở giữa.",
      "ex.same.note": ({ who }) => `${who} làm cả hai, nối tiếp nhau, không có giờ nghỉ ở giữa.`,
      "ex.total": "Tổng",
      who: ({ names }) => `Người làm: ${names}`,
      "who.all": "tất cả nhân viên",
      hidden: "Đang ẩn",
      from: ({ p }) => `từ ${p}`,
      "tile.rules": ({ list }) => `Quy định riêng: ${list}`,
      "rule.auto": "tự xác nhận",
      "rule.manual": "tiệm xác nhận",
      "rule.notice": ({ d }) => `báo trước ${d}`,
      "rule.solo": "chỉ đặt riêng",
      "rule.weekdays": "chỉ ngày thường",
      "rule.weekend": "chỉ cuối tuần",
      min: ({ n }) => `${n} phút`,
      hours: ({ n }) => `${n} giờ`,
      days: ({ n }) => `${n} ngày`,
      "w.new": "Dịch vụ mới",
      "w.close": "Đóng",
      "f.name": "Tên dịch vụ",
      "f.name.empty": "Tên dịch vụ",
      "f.name.error": "Hãy đặt tên cho dịch vụ.",
      "f.line": "Mô tả ngắn",
      "f.line.hint": "Một câu, hiện ngay dưới tên.",
      "f.min": "Thời lượng",
      "f.min.unit": "phút",
      "f.price": "Giá",
      "f.from": "Đây là giá khởi điểm, hiện “từ …”",
      "f.photo": "Ảnh và màu nền",
      "f.photo.pick": "Chọn ảnh",
      "f.photo.remove": "Bỏ ảnh",
      "f.photo.hint": "Ảnh của tiệm làm nền cho ô dịch vụ; chưa có ảnh thì ô dùng màu nền. Trong bản mẫu, ảnh không được lưu lại.",
      "f.tint": "Màu nền",
      "tint.glacier": "Xanh băng",
      "tint.black": "Đen",
      "tint.burgundy": "Đỏ rượu",
      "tint.silver": "Bạc",
      "f.staff": "Ai làm dịch vụ này",
      "f.staff.error": "Chọn ít nhất một người.",
      "f.staff.hint": "Khách chọn giờ trước. Sau đó, nếu muốn, khách chọn một người đang rảnh vào giờ ấy.",
      "f.visible": "Hiện trên trang đặt lịch",
      "f.rules": "Quy định riêng cho dịch vụ này",
      "f.rules.hint": "Để “Theo tiệm” thì dịch vụ dùng thiết lập chung.",
      "r.confirm": "Xác nhận lịch",
      "r.notice": "Báo trước tối thiểu",
      "r.combine": "Đặt cùng dịch vụ khác",
      "r.days": "Ngày nhận khách",
      "opt.shop": ({ v }) => `Theo tiệm (${v})`,
      "opt.combine.yes": "Được",
      "opt.combine.solo": "Chỉ đặt riêng",
      "opt.days.all": "mọi ngày",
      "opt.days.weekdays": "Chỉ ngày thường",
      "opt.days.weekend": "Chỉ cuối tuần",
      "f.link": "Link mở thẳng dịch vụ này",
      "f.link.copy": "Sao chép",
      "f.link.copied": "Đã sao chép",
      preview: "Xem trước",
      save: "Lưu",
      cancel: "Huỷ",
      delete: "Xoá dịch vụ",
      "delete.sure": "Bấm lần nữa để xoá",
      "toast.saved": "Đã lưu {name}",
      "toast.added": "Đã thêm {name}",
      "toast.deleted": "Đã xoá {name}",
      note: "Dữ liệu mẫu. Đây là bản thiết kế, chưa nối với hệ thống.",
    },
    en: {
      "doc.title": "Services | pleasebookme",
      "page.title": "Services",
      lede: ({ n, h }) =>
        `${n} ${plural(n, "service", "services")} on the booking page${h ? `, ${h} hidden` : ""}. A customer can pick several services in one booking.`,
      "lede.none": "A service is what customers pick when they book, like a haircut.",
      "shop.hours.none": "No working hours yet",
      "blank.title": "No services yet",
      "blank.text": "Customers cannot book yet, because there is nothing to choose. Add the shop's first service: a name, a length and a price.",
      "blank.go": "Add the first service",
      new: "New service",
      add: "Add a service",
      sort: "Reorder",
      "sort.done": "Done",
      "view.label": "View",
      "view.tiles": "Tiles",
      "view.table": "Table",
      "col.order": "Order",
      "col.service": "Service",
      "col.length": "Length",
      "col.price": "Price",
      "col.who": "Who does it",
      "col.rules": "Rules",
      "col.shown": "Shown to customers",
      "rules.shop": "Follows the shop",
      "shown.label": ({ name }) => `Show ${name} to customers`,
      "move.up": "Move {name} up",
      "move.down": "Move {name} down",
      "move.prev": "Move {name} earlier",
      "move.next": "Move {name} later",
      "shop.title": "Shop settings",
      "shop.sub": "Every service uses these, unless the service has a rule of its own.",
      "shop.edit": "Edit shop settings",
      "shop.hours": "Opening hours",
      "shop.notice": "Minimum notice",
      "shop.confirm": "Confirming bookings",
      "shop.staff": "Customers choose staff",
      "shop.staff.yes": "After the time, if they wish",
      "confirm.manual": "The shop confirms each booking",
      "confirm.auto": "Confirmed automatically",
      "basket.label": "When a customer picks several services",
      "basket.one": "One person does all",
      "basket.split": "Split across staff",
      "ex.lead": "Example:",
      "ex.pick": ({ a, b }) => `a customer picks “${a}” with “${b}”.`,
      "ex.one": "Nobody can do both, so they have to make two separate bookings.",
      "ex.split.note": "The two parts run back to back in one booking, with no break in between.",
      "ex.same.note": ({ who }) => `${who} does both, back to back, with no break in between.`,
      "ex.total": "Total",
      who: ({ names }) => `Done by: ${names}`,
      "who.all": "all staff",
      hidden: "Hidden",
      from: ({ p }) => `from ${p}`,
      "tile.rules": ({ list }) => `Own rules: ${list}`,
      "rule.auto": "confirmed automatically",
      "rule.manual": "the shop confirms",
      "rule.notice": ({ d }) => `${d} notice`,
      "rule.solo": "booked on its own",
      "rule.weekdays": "weekdays only",
      "rule.weekend": "weekends only",
      min: ({ n }) => `${n} min`,
      hours: ({ n }) => `${n} ${plural(n, "hour", "hours")}`,
      days: ({ n }) => `${n} ${plural(n, "day", "days")}`,
      "w.new": "New service",
      "w.close": "Close",
      "f.name": "Service name",
      "f.name.empty": "Service name",
      "f.name.error": "Give the service a name.",
      "f.line": "Short description",
      "f.line.hint": "One sentence, shown right under the name.",
      "f.min": "Length",
      "f.min.unit": "min",
      "f.price": "Price",
      "f.from": "This is a starting price, shown as “from …”",
      "f.photo": "Photo and background",
      "f.photo.pick": "Choose a photo",
      "f.photo.remove": "Remove photo",
      "f.photo.hint": "Your photo fills the tile; without one the tile uses the background colour. In this mockup the photo is not saved.",
      "f.tint": "Background colour",
      "tint.glacier": "Glacier",
      "tint.black": "Black",
      "tint.burgundy": "Burgundy",
      "tint.silver": "Silver",
      "f.staff": "Who does this service",
      "f.staff.error": "Choose at least one person.",
      "f.staff.hint": "Customers choose a time first. Then, if they wish, they choose one of the people free at that time.",
      "f.visible": "Show on the booking page",
      "f.rules": "Rules for this service only",
      "f.rules.hint": "Leave “Follow the shop” and the service uses the shop settings.",
      "r.confirm": "Confirming bookings",
      "r.notice": "Minimum notice",
      "r.combine": "Booked with other services",
      "r.days": "Days it is offered",
      "opt.shop": ({ v }) => `Follow the shop (${v})`,
      "opt.combine.yes": "Allowed",
      "opt.combine.solo": "On its own only",
      "opt.days.all": "every day",
      "opt.days.weekdays": "Weekdays only",
      "opt.days.weekend": "Weekends only",
      "f.link": "Link that opens this service",
      "f.link.copy": "Copy",
      "f.link.copied": "Copied",
      preview: "Preview",
      save: "Save",
      cancel: "Cancel",
      delete: "Delete service",
      "delete.sure": "Press again to delete",
      "toast.saved": "Saved {name}",
      "toast.added": "Added {name}",
      "toast.deleted": "Deleted {name}",
      note: "Sample data. This is a design mockup, not connected to the system.",
    },
  });

  // ---------- Tile art ----------
  // Line drawings that fill a tile until the owner adds a photo of their own.

  const ART = {
    scissors:
      '<circle cx="44" cy="112" r="20"/><circle cx="44" cy="38" r="20"/><path d="M62 103 222 24 132 80Z"/><path d="M62 47 222 126 132 70Z"/><circle cx="127" cy="75" r="2.5"/>',
    moustache:
      '<path d="M44 10h152a7 7 0 0 1 0 14H44a7 7 0 0 1 0-14Z"/><path d="M52 24v22M62 24v22M72 24v22M82 24v22M92 24v22M102 24v22M112 24v22M122 24v22M132 24v22M142 24v22M152 24v22M162 24v22M172 24v22M182 24v22M192 24v22"/><path d="M120 96c-14-18-44-22-58-4-12 15-34 12-46-6 2 34 40 46 68 30 14-8 26-14 36-14s22 6 36 14c28 16 66 4 68-30-12 18-34 21-46 6-14-18-44-14-58 4Z"/>',
    brush:
      '<path d="M102 150v-30c0-9 5-14 12-16h12c7 2 12 7 12 16v30"/><path d="M110 104C88 82 82 50 94 26c16-14 36-14 52 0 12 24 6 56-16 78"/><path d="M120 18v84M106 26c-4 26-2 52 8 76M134 26c4 26 2 52-8 76"/><path d="M102 128h36"/>',
    waves:
      '<path d="M0 36c20-24 40-24 60 0s40 24 60 0 40-24 60 0 40 24 60 0"/><path d="M0 68c20-24 40-24 60 0s40 24 60 0 40-24 60 0 40 24 60 0"/><path d="M0 100c20-24 40-24 60 0s40 24 60 0 40-24 60 0 40 24 60 0"/><path d="M0 132c20-24 40-24 60 0s40 24 60 0 40-24 60 0 40 24 60 0"/>',
    drop:
      '<path d="M120 14c26 34 44 58 44 84a44 44 0 0 1-88 0c0-26 18-50 44-84Z"/><path d="M98 100a24 24 0 0 0 18 22"/><path d="M52 70c10 14 16 24 16 34a16 16 0 0 1-32 0c0-10 6-20 16-34Z"/><path d="M190 84c8 11 12 18 12 26a12 12 0 0 1-24 0c0-8 4-15 12-26Z"/>',
  };
  const art = (name) => `<svg viewBox="0 0 240 150" aria-hidden="true">${ART[name] || ART.waves}</svg>`;

  const TINTS = ["glacier", "black", "burgundy", "silver"];

  // ---------- State and helpers ----------

  const state = {
    order: [...SERVICE_ORDER],
    view: "tiles", // "tiles" or "table": two ways to look at the same menu
    sorting: false,
    basket: SHOP.basket,
    draft: null, // the service open in the window, edited as a copy until saved
    sureToDelete: false,
    entering: true,
  };
  let made = 0;

  try {
    if (localStorage.getItem("pbm-svc-view") === "table") state.view = "table";
  } catch {
    /* no storage: the page just opens on the tiles */
  }

  const $ = (id) => document.getElementById(id);
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const clock = (m) => String(Math.floor(m / 60)).padStart(2, "0") + ":" + String(m % 60).padStart(2, "0");
  const money = (n) => new Intl.NumberFormat(PBM.locale, { style: "currency", currency: "VND" }).format(n);
  const duration = (m) =>
    m % 1440 === 0 ? t("days", { n: m / 1440 }) : m % 60 === 0 ? t("hours", { n: m / 60 }) : t("min", { n: m });
  // A total length, which may be hours and minutes: "2 giờ 45 phút".
  const span = (m) => (m < 60 || m % 60 === 0 ? duration(m) : `${t("hours", { n: Math.floor(m / 60) })} ${t("min", { n: m % 60 })}`);
  const price = (v) => (v.from ? t("from", { p: money(v.price) }) : money(v.price));
  const staffName = (id) => STAFF.find((s) => s.id === id).name;
  const slugify = (name) =>
    name
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[đĐ]/g, "d")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

  // A service as the page shows it, in the current language. The window edits
  // a copy in this shape and writes it back on Save.
  const view = (id) => {
    const s = SERVICES[id];
    return {
      id,
      name: s[PBM.lang],
      line: s.line[PBM.lang],
      slug: s.slug,
      min: s.min,
      price: s.price,
      from: Boolean(s.from),
      tint: s.tint,
      art: s.art,
      photo: s.photo || "",
      staff: [...s.staff],
      hidden: Boolean(s.hidden),
      rules: { ...s.rules },
    };
  };

  const blank = () => ({
    id: "new",
    name: "",
    line: "",
    slug: "",
    min: 30,
    price: 0,
    from: false,
    tint: TINTS[state.order.length % TINTS.length],
    art: "waves",
    photo: "",
    staff: STAFF.map((s) => s.id),
    hidden: false,
    rules: { confirm: "shop", notice: "shop", combine: "yes", days: "shop" },
  });

  // The rules a service sets for itself, in words. A rule equal to the shop's is not "own".
  function ownRules(rules) {
    const list = [];
    if (rules.confirm !== "shop" && rules.confirm !== SHOP.confirm) list.push(t("rule." + rules.confirm));
    if (rules.notice !== "shop" && rules.notice !== SHOP.notice) list.push(t("rule.notice", { d: duration(rules.notice) }));
    if (rules.combine === "solo") list.push(t("rule.solo"));
    if (rules.days !== "shop") list.push(t("rule." + rules.days));
    return list;
  }

  // ---------- Heading ----------

  function renderHead() {
    const hidden = state.order.filter((id) => SERVICES[id].hidden).length;
    $("title").textContent = t("page.title");
    $("lede").textContent = state.order.length ? t("lede", { n: state.order.length - hidden, h: hidden }) : t("lede.none");
    $("note").textContent = t("note");
    document.title = t("doc.title");
    $("toolbar").innerHTML = `
      <div class="seg" id="viewSeg" role="group" aria-label="${t("view.label")}" style="--n:2;--i:${state.view === "tiles" ? 0 : 1}">
        <button type="button" data-view="tiles" aria-pressed="${state.view === "tiles"}">${icon("grid")}<span>${t("view.tiles")}</span></button>
        <button type="button" data-view="table" aria-pressed="${state.view === "table"}">${icon("rows")}<span>${t("view.table")}</span></button>
      </div>
      ${
        state.order.length > 1
          ? `<button class="btn btn-quiet" type="button" data-sort aria-pressed="${state.sorting}">${icon("swap")}${t(
              state.sorting ? "sort.done" : "sort"
            )}</button>`
          : ""
      }
      <button class="btn btn-primary" type="button" data-open="new">${icon("plus")}${t("new")}</button>`;
  }

  // ---------- Shop settings ----------

  function renderShop() {
    // The choice about several services needs two to choose between.
    const basket = state.order.length > 1;
    $("shop").classList.toggle("is-single", !basket);
    $("shop").innerHTML = `
      <div class="shop-main">
        <div class="shop-head">
          <h2 id="shop-title">${t("shop.title")}</h2>
          <a class="shop-edit" href="#" data-pending>${t("shop.edit")}</a>
        </div>
        <p class="shop-sub">${t("shop.sub")}</p>
        <dl class="facts">
          <div><dt>${t("shop.hours")}</dt><dd class="num">${SCHEDULES.length ? `${clock(OPEN)} – ${clock(CLOSE)}` : t("shop.hours.none")}</dd></div>
          <div><dt>${t("shop.notice")}</dt><dd>${duration(SHOP.notice)}</dd></div>
          <div><dt>${t("shop.confirm")}</dt><dd>${t("confirm." + SHOP.confirm)}</dd></div>
          <div><dt>${t("shop.staff")}</dt><dd>${t("shop.staff.yes")}</dd></div>
        </dl>
      </div>
      ${
        basket
          ? `<div class="shop-basket">
        <h3 id="basket-label">${t("basket.label")}</h3>
        <div class="seg" id="basketSeg" role="group" aria-labelledby="basket-label" style="--n:2;--i:${state.basket === "one" ? 0 : 1}">
          <button type="button" data-basket="one" aria-pressed="${state.basket === "one"}">${t("basket.one")}</button>
          <button type="button" data-basket="split" aria-pressed="${state.basket === "split"}">${t("basket.split")}</button>
        </div>
        <div class="example" id="example" aria-live="polite"></div>
      </div>`
          : ""
      }`;
    if (basket) renderExample();
  }

  // Shows what the setting means with two real services from the menu: by
  // choice a pair that no single staff member can do. The two are listed like
  // a bill, each with its length and price and then the total. Nothing is
  // added between them or after them: a booking is as long as its services.
  function renderExample() {
    if (!$("example")) return; // one service has nothing to combine, so the panel is not drawn
    const open = state.order.map((id) => SERVICES[id]).filter((s) => !s.hidden && s.rules.combine !== "solo");
    if (open.length < 2) {
      $("example").innerHTML = "";
      return;
    }

    let pair = null;
    for (let i = 0; i < open.length && !pair; i++) {
      for (let j = i + 1; j < open.length && !pair; j++) {
        if (!open[i].staff.some((id) => open[j].staff.includes(id))) pair = [open[i], open[j]];
      }
    }
    const apart = Boolean(pair); // nobody can do both
    const [a, b] = pair || [open[0], open[1]];
    const lead = `<p><b>${t("ex.lead")}</b> ${esc(t("ex.pick", { a: a[PBM.lang], b: b[PBM.lang] }))}</p>`;

    if (apart && state.basket === "one") {
      $("example").innerHTML = lead + `<p>${t("ex.one")}</p>`;
      return;
    }

    const same = a.staff.find((id) => b.staff.includes(id));
    const who = apart ? [a.staff[0], b.staff[0]] : [same, same];
    const row = (s, id) =>
      `<tr><th scope="row">${esc(s[PBM.lang])}</th><td>${staffName(id)}</td><td class="num">${duration(s.min)}</td><td class="num">${price(s)}</td></tr>`;
    $("example").innerHTML =
      lead +
      `<table class="bill">
        <tbody>${row(a, who[0])}${row(b, who[1])}</tbody>
        <tfoot><tr><th scope="row">${t("ex.total")}</th><td></td><td class="num">${span(a.min + b.min)}</td><td class="num">${price({
          from: a.from || b.from,
          price: a.price + b.price,
        })}</td></tr></tfoot>
      </table>
      <p>${apart ? t("ex.split.note") : t("ex.same.note", { who: staffName(same) })}</p>`;
  }

  // ---------- Tiles ----------

  function tileHTML(v, { hero = false, index = 0, preview = false } = {}) {
    const names = v.staff.length === STAFF.length ? t("who.all") : v.staff.map(staffName).join(", ");
    const rules = ownRules(v.rules);
    const title = esc(v.name || t("f.name.empty"));

    const classes = ["tile", "tint-" + v.tint];
    if (hero) classes.push("is-hero");
    if (v.hidden) classes.push("is-hidden");
    if (v.photo) classes.push("has-photo");
    if (preview) classes.push("is-preview");

    // Each tile on the page is named, so the browser can glide it to its new
    // place when the order changes. The preview copy must not share the name.
    const style = [`--i:${index}`];
    if (!preview) style.push(`view-transition-name:svc-${v.id}`);
    if (v.photo) style.push(`--photo:url('${v.photo}')`);

    const heading = preview
      ? `<p class="tile-title">${title}</p>`
      : `<h2 class="tile-title"><button type="button" class="tile-open" data-open="${v.id}">${title}</button></h2>`;

    const at = state.order.indexOf(v.id);
    const move =
      !preview && state.sorting
        ? `<button class="tile-move is-prev" type="button" data-move="-1" data-id="${v.id}" aria-label="${esc(t("move.prev", { name: v.name }))}" ${at === 0 ? "disabled" : ""}>${icon("left")}</button>
           <button class="tile-move is-next" type="button" data-move="1" data-id="${v.id}" aria-label="${esc(t("move.next", { name: v.name }))}" ${at === state.order.length - 1 ? "disabled" : ""}>${icon("right")}</button>`
        : "";

    return `<article class="${classes.join(" ")}" style="${style.join(";")}">
        <div class="tile-art">${art(v.art)}</div>
        <div class="tile-top">
          <span>${v.hidden ? `<span class="tile-flag">${t("hidden")}</span>` : ""}</span>
          <span class="tile-who" role="img" aria-label="${esc(t("who", { names }))}">${v.staff
            .map((id) => `<i>${staffName(id).charAt(0)}</i>`)
            .join("")}</span>
        </div>
        ${heading}
        <p class="tile-line">${esc(v.line)}</p>
        <p class="tile-pills"><span class="pill-solid num">${price(v)}</span><span class="pill-line">${duration(v.min)}</span></p>
        ${rules.length ? `<p class="tile-note">${t("tile.rules", { list: rules.join(", ") })}</p>` : ""}
        ${move}
      </article>`;
  }

  // The same menu as a table: one row per service, in the same order. A row
  // carries the same name as its tile, so the browser glides one into the other
  // when the view changes.
  function tableHTML() {
    const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
    const rows = state.order
      .map((id, at) => {
        const v = view(id);
        const rules = ownRules(v.rules);
        const who = v.staff.length === STAFF.length ? cap(t("who.all")) : v.staff.map(staffName).join(", ");
        const moves = state.sorting
          ? `<td class="cell-move">
               <button class="icon-btn" type="button" data-move="-1" data-id="${v.id}" aria-label="${esc(t("move.up", { name: v.name }))}" ${at === 0 ? "disabled" : ""}>${icon("up")}</button>
               <button class="icon-btn" type="button" data-move="1" data-id="${v.id}" aria-label="${esc(t("move.down", { name: v.name }))}" ${at === state.order.length - 1 ? "disabled" : ""}>${icon("down")}</button>
             </td>`
          : "";
        const thumb = v.photo ? ` style="background-image:url('${v.photo}')"` : "";
        return `<tr class="${v.hidden ? "is-hidden" : ""}" data-open="${v.id}" style="view-transition-name:svc-${v.id}">
            ${moves}
            <td><span class="dt-name"><i class="thumb tint-${v.tint}"${thumb}></i><span><button type="button" class="row-open" data-open="${v.id}"><strong>${esc(v.name)}</strong></button><small>${esc(v.line)}</small></span></span></td>
            <td class="num">${duration(v.min)}</td>
            <td class="num">${price(v)}</td>
            <td>${esc(who)}</td>
            <td>${rules.length ? esc(cap(rules.join(", "))) : `<span class="dt-quiet">${t("rules.shop")}</span>`}</td>
            <td><input class="switch" type="checkbox" data-shown="${v.id}" aria-label="${esc(t("shown.label", { name: v.name }))}" ${v.hidden ? "" : "checked"} /></td>
          </tr>`;
      })
      .join("");
    return `<div class="dt-wrap"><table class="dt">
        <thead><tr>
          ${state.sorting ? `<th>${t("col.order")}</th>` : ""}
          <th>${t("col.service")}</th><th>${t("col.length")}</th><th>${t("col.price")}</th>
          <th>${t("col.who")}</th><th>${t("col.rules")}</th><th>${t("col.shown")}</th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table></div>
      <button type="button" class="table-add" data-open="new">${icon("plus")}<span>${t("add")}</span></button>`;
  }

  function renderTiles() {
    const tiles = $("tiles");
    const table = $("table");
    // A shop with no services shows one invitation, whichever view is chosen.
    if (!state.order.length) {
      tiles.hidden = false;
      table.hidden = true;
      table.innerHTML = "";
      tiles.classList.remove("is-sorting", "is-entering");
      tiles.innerHTML = `<div class="blank">
          <h2>${t("blank.title")}</h2>
          <p>${t("blank.text")}</p>
          <div class="blank-actions"><button class="btn btn-primary" type="button" data-open="new">${icon("plus")}${t("blank.go")}</button></div>
        </div>`;
      return;
    }
    tiles.hidden = state.view === "table";
    table.hidden = state.view !== "table";
    if (state.view === "table") {
      tiles.innerHTML = "";
      table.innerHTML = tableHTML();
      return;
    }
    table.innerHTML = "";
    tiles.classList.toggle("is-sorting", state.sorting);
    tiles.classList.toggle("is-entering", state.entering);
    tiles.innerHTML =
      state.order.map((id, i) => tileHTML(view(id), { hero: i === 0, index: i })).join("") +
      `<button type="button" class="tile-add" data-open="new">${icon("plus")}<span>${t("add")}</span></button>`;
  }

  function renderAll() {
    renderHead();
    renderShop();
    renderTiles();
  }

  // Lets the browser animate between the page before and after `update`.
  function swap(update) {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduce) return update();
    const transition = document.startViewTransition(update);
    // A newer transition (or a hidden tab) skips this one; the update still ran.
    transition.ready.catch(() => {});
    transition.finished.catch(() => {});
  }

  function move(id, dir) {
    const i = state.order.indexOf(id);
    const j = i + dir;
    if (j < 0 || j >= state.order.length) return;
    swap(() => {
      [state.order[i], state.order[j]] = [state.order[j], state.order[i]];
      renderTiles();
      // Keep the keyboard on the tile that moved; at either end one arrow is off.
      const arrows = [...document.querySelectorAll(`[data-move][data-id="${id}"]`)];
      (arrows.find((b) => Number(b.dataset.move) === dir && !b.disabled) || arrows.find((b) => !b.disabled))?.focus();
    });
  }

  // ---------- The window ----------

  const option = (value, label, current) =>
    `<option value="${value}"${String(current) === String(value) ? " selected" : ""}>${label}</option>`;

  function renderWindow() {
    const d = state.draft;
    const fresh = d.id === "new";
    const own = ownRules(d.rules).length;
    const shopConfirm = t("confirm." + SHOP.confirm);

    $("window").innerHTML = `
      <form class="window-form" id="form" novalidate>
        <header class="window-head">
          <h2 id="window-title">${fresh ? t("w.new") : esc(d.name)}</h2>
          <button class="icon-btn" type="button" data-close aria-label="${t("w.close")}">${icon("x")}</button>
        </header>

        <div class="window-body">
          <div class="window-fields">
            <div class="field">
              <label for="f-name">${t("f.name")}</label>
              <input class="input" id="f-name" name="name" value="${esc(d.name)}" autocomplete="off" aria-describedby="f-name-error" autofocus />
              <span class="error" id="f-name-error" hidden>${t("f.name.error")}</span>
            </div>

            <div class="field">
              <label for="f-line">${t("f.line")}</label>
              <input class="input" id="f-line" name="line" value="${esc(d.line)}" maxlength="70" autocomplete="off" aria-describedby="f-line-hint" />
              <small id="f-line-hint">${t("f.line.hint")}</small>
            </div>

            <div class="field-pair">
              <div class="field">
                <label for="f-min">${t("f.min")}</label>
                <div class="with-unit"><input class="input num" id="f-min" name="min" type="number" min="5" max="480" step="5" value="${d.min}" inputmode="numeric" /><span>${t("f.min.unit")}</span></div>
              </div>
              <div class="field">
                <label for="f-price">${t("f.price")}</label>
                <div class="with-unit"><input class="input num" id="f-price" name="price" type="number" min="0" step="5000" value="${d.price}" inputmode="numeric" /><span>₫</span></div>
              </div>
            </div>
            <label class="check"><input type="checkbox" name="from" ${d.from ? "checked" : ""} /><span>${t("f.from")}</span></label>

            <div class="field">
              <span class="label">${t("f.photo")}</span>
              <div class="photo-row">
                <label class="btn btn-quiet btn-small photo-pick">${icon("image")}<span>${t("f.photo.pick")}</span><input class="visually-hidden" type="file" name="photo" accept="image/*" /></label>
                <button class="btn btn-quiet btn-small" type="button" data-photo-remove ${d.photo ? "" : "hidden"}>${t("f.photo.remove")}</button>
                <span class="swatches" role="radiogroup" aria-label="${t("f.tint")}">
                  ${TINTS.map(
                    (tint) =>
                      `<label class="swatch-pick" title="${t("tint." + tint)}"><input class="visually-hidden" type="radio" name="tint" value="${tint}" ${
                        d.tint === tint ? "checked" : ""
                      } /><span class="tint-${tint}" aria-hidden="true"></span><span class="visually-hidden">${t("tint." + tint)}</span></label>`
                  ).join("")}
                </span>
              </div>
              <small>${t("f.photo.hint")}</small>
            </div>

            <div class="field" role="group" aria-labelledby="f-staff-label">
              <span class="label" id="f-staff-label">${t("f.staff")}</span>
              <div class="chips">
                ${STAFF.map(
                  (person) =>
                    `<label class="chip-pick"><input class="visually-hidden" type="checkbox" name="staff" value="${person.id}" ${
                      d.staff.includes(person.id) ? "checked" : ""
                    } /><span><i aria-hidden="true">${person.name.charAt(0)}</i>${person.name}</span></label>`
                ).join("")}
              </div>
              <small>${t("f.staff.hint")}</small>
              <span class="error" id="f-staff-error" hidden>${t("f.staff.error")}</span>
            </div>

            <label class="switch-row"><span>${t("f.visible")}</span><input class="switch" type="checkbox" role="switch" name="visible" ${d.hidden ? "" : "checked"} /></label>

            <details class="rules" ${own ? "open" : ""}>
              <summary><span>${t("f.rules")}</span><span class="pill num" id="rules-count" ${own ? "" : "hidden"}>${own}</span></summary>
              <p class="rules-hint">${t("f.rules.hint")}</p>
              <div class="field-pair">
                <div class="field">
                  <label for="r-confirm">${t("r.confirm")}</label>
                  <select class="input" id="r-confirm" name="confirm">
                    ${option("shop", t("opt.shop", { v: shopConfirm.toLowerCase() }), d.rules.confirm)}
                    ${option("auto", t("confirm.auto"), d.rules.confirm)}
                    ${option("manual", t("confirm.manual"), d.rules.confirm)}
                  </select>
                </div>
                <div class="field">
                  <label for="r-notice">${t("r.notice")}</label>
                  <select class="input" id="r-notice" name="notice">
                    ${option("shop", t("opt.shop", { v: duration(SHOP.notice) }), d.rules.notice)}
                    ${[30, 120, 1440, 2880].map((m) => option(m, duration(m), d.rules.notice)).join("")}
                  </select>
                </div>
                <div class="field">
                  <label for="r-combine">${t("r.combine")}</label>
                  <select class="input" id="r-combine" name="combine">
                    ${option("yes", t("opt.combine.yes"), d.rules.combine)}
                    ${option("solo", t("opt.combine.solo"), d.rules.combine)}
                  </select>
                </div>
                <div class="field">
                  <label for="r-days">${t("r.days")}</label>
                  <select class="input" id="r-days" name="days">
                    ${option("shop", t("opt.shop", { v: t("opt.days.all") }), d.rules.days)}
                    ${option("weekdays", t("opt.days.weekdays"), d.rules.days)}
                    ${option("weekend", t("opt.days.weekend"), d.rules.days)}
                  </select>
                </div>
              </div>
            </details>

            ${
              fresh
                ? ""
                : `<div class="field">
              <span class="label">${t("f.link")}</span>
              <div class="link-row"><code>pleasebookme.app/booking/${SHOP.slug}/${d.slug}</code><button class="btn btn-quiet btn-small" type="button" data-copy>${icon("copy")}<span aria-live="polite">${t("f.link.copy")}</span></button></div>
            </div>`
            }
          </div>

          <aside class="window-side">
            <p class="label">${t("preview")}</p>
            <div id="preview"></div>
          </aside>
        </div>

        <footer class="window-foot">
          ${fresh ? "" : `<button class="btn btn-quiet btn-danger" type="button" data-delete>${icon("trash")}<span>${t("delete")}</span></button>`}
          <span class="spacer"></span>
          <button class="btn btn-quiet" type="button" data-close>${t("cancel")}</button>
          <button class="btn btn-primary" type="submit">${icon("check")}${t("save")}</button>
        </footer>
      </form>`;
    renderPreview();
  }

  function renderPreview() {
    $("preview").innerHTML = tileHTML(state.draft, { preview: true });
  }

  // Copies what is in the form into the draft.
  function readDraft() {
    const d = state.draft;
    const data = new FormData($("form"));
    d.name = data.get("name").trim();
    d.line = data.get("line").trim();
    d.min = Math.max(5, Number(data.get("min")) || 0);
    d.price = Math.max(0, Number(data.get("price")) || 0);
    d.from = data.has("from");
    d.tint = data.get("tint");
    d.staff = data.getAll("staff").map(Number);
    d.hidden = !data.has("visible");
    d.rules = {
      confirm: data.get("confirm"),
      notice: data.get("notice") === "shop" ? "shop" : Number(data.get("notice")),
      combine: data.get("combine"),
      days: data.get("days"),
    };
  }

  function openWindow(id) {
    state.draft = id === "new" ? blank() : view(id);
    state.sureToDelete = false;
    renderWindow();
    $("window").showModal();
  }

  function save() {
    readDraft();
    const d = state.draft;
    const named = Boolean(d.name);
    const staffed = d.staff.length > 0;
    $("f-name").setAttribute("aria-invalid", String(!named));
    $("f-name-error").hidden = named;
    $("f-staff-error").hidden = staffed;
    if (!named) return $("f-name").focus();
    if (!staffed) return document.querySelector('[name="staff"]').focus();

    const fresh = d.id === "new";
    const id = fresh ? "new" + ++made : d.id;
    if (fresh) {
      SERVICES[id] = { vi: d.name, en: d.name, line: { vi: d.line, en: d.line }, slug: slugify(d.name), art: d.art };
    }
    const service = SERVICES[id];
    service[PBM.lang] = d.name;
    service.line[PBM.lang] = d.line;
    Object.assign(service, {
      min: d.min,
      price: d.price,
      from: d.from,
      tint: d.tint,
      photo: d.photo,
      staff: d.staff,
      hidden: d.hidden,
      rules: d.rules,
    });

    $("window").close();
    swap(() => {
      if (fresh) state.order.push(id);
      renderAll();
    });
    toast(t(fresh ? "toast.added" : "toast.saved", { name: d.name }));
  }

  function remove() {
    const d = state.draft;
    $("window").close();
    swap(() => {
      state.order = state.order.filter((id) => id !== d.id);
      renderAll();
    });
    toast(t("toast.deleted", { name: d.name }));
  }

  // ---------- Events ----------

  document.addEventListener("click", (event) => {
    const target = event.target.closest("[data-open],[data-sort],[data-move],[data-basket],[data-view]");
    if (!target || target.closest("dialog")) return;
    // In the table the whole row opens the service, except its own controls.
    if (target.matches("tr") && event.target.closest(".switch, td:last-child")) return;

    if (target.dataset.view) {
      if (target.dataset.view === state.view) return;
      state.view = target.dataset.view;
      state.entering = false;
      try {
        localStorage.setItem("pbm-svc-view", state.view);
      } catch {
        /* no storage */
      }
      // Move the thumb in place, so the slide is not cut off by a redraw.
      $("viewSeg").style.setProperty("--i", state.view === "tiles" ? 0 : 1);
      $("viewSeg")
        .querySelectorAll("button")
        .forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.view === state.view)));
      return swap(renderTiles);
    }

    if (target.dataset.open) return openWindow(target.dataset.open);
    if (target.dataset.move) return move(target.dataset.id, Number(target.dataset.move));
    if ("sort" in target.dataset) {
      state.sorting = !state.sorting;
      state.entering = false;
      renderHead();
      renderTiles();
      return document.querySelector("[data-sort]").focus();
    }
    if (target.dataset.basket && target.dataset.basket !== state.basket) {
      state.basket = target.dataset.basket;
      // Move the thumb in place, so the slide is not cut off by a redraw.
      $("basketSeg").style.setProperty("--i", state.basket === "one" ? 0 : 1);
      $("basketSeg")
        .querySelectorAll("button")
        .forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.basket === state.basket)));
      renderExample();
    }
  });

  // The switch in the table shows or hides a service without opening it.
  $("table").addEventListener("change", (event) => {
    const id = event.target.dataset.shown;
    if (!id) return;
    SERVICES[id].hidden = !event.target.checked;
    event.target.closest("tr").classList.toggle("is-hidden", SERVICES[id].hidden);
    renderHead();
    renderExample();
  });

  const dialog = $("window");

  dialog.addEventListener("input", (event) => {
    if (event.target.type === "file") return;
    readDraft();
    const d = state.draft;
    if (d.id !== "new" || d.name) $("window-title").textContent = d.name || t("w.new");
    const own = ownRules(d.rules).length;
    $("rules-count").textContent = own;
    $("rules-count").hidden = !own;
    renderPreview();
  });

  dialog.addEventListener("change", (event) => {
    if (event.target.type !== "file") return;
    const file = event.target.files[0];
    if (!file) return;
    // Shown from memory only: the photo never leaves this browser tab.
    state.draft.photo = URL.createObjectURL(file);
    dialog.querySelector("[data-photo-remove]").hidden = false;
    renderPreview();
  });

  dialog.addEventListener("click", (event) => {
    // A click on the dimmed page behind the window closes it.
    if (event.target === dialog) return dialog.close();
    const target = event.target.closest("[data-close],[data-photo-remove],[data-copy],[data-delete]");
    if (!target) return;

    if ("close" in target.dataset) return dialog.close();
    if ("photoRemove" in target.dataset) {
      state.draft.photo = "";
      dialog.querySelector('[name="photo"]').value = "";
      target.hidden = true;
      renderPreview();
      return dialog.querySelector(".photo-pick input").focus();
    }
    if ("copy" in target.dataset) {
      navigator.clipboard?.writeText(`https://pleasebookme.app/booking/${SHOP.slug}/${state.draft.slug}`).catch(() => {});
      // A toast would sit under the window, so the button itself says it worked.
      target.querySelector("span").textContent = t("f.link.copied");
      return;
    }
    if ("delete" in target.dataset) {
      // No pop-up question: the button asks once more in place.
      if (state.sureToDelete) return remove();
      state.sureToDelete = true;
      target.classList.add("is-sure");
      target.querySelector("span").textContent = t("delete.sure");
    }
  });

  dialog.addEventListener("submit", (event) => {
    event.preventDefault();
    save();
  });

  dialog.addEventListener("close", () => {
    state.draft = null;
    dialog.innerHTML = ""; // the preview tile must not linger beside the real ones
  });

  PBM.onChange(renderAll);

  PBM.mount("services");
  renderAll();

  // The settle animation is for the first paint only.
  setTimeout(() => {
    state.entering = false;
    $("tiles").classList.remove("is-entering");
  }, 1400);
})();
