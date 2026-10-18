/* Widget đặt lịch: the list of the shop's widgets, and the editor for one.
   The data is the sample shop in assets/sample.js; nothing is sent anywhere.

   What a widget is here (a first draft, Sonny, 2026-10-13):
     - One way into booking. It opens a chosen part of the shop: which
       branches, which services, which resources (people, places, and whatever
       other types the shop adds).
     - For every one of those, the widget either fixes it or leaves it for the
       customer to choose. A widget for one branch skips the branch question;
       a general one asks it first. The same goes for services and resources.
     - The same widget can sit in several places: its own link (with a QR
       code), inside a page of a website, or behind a pop-up button. The shop's
       main link is simply its default widget.
     - A widget can also differ in its look, the dates it runs, its booking
       rules and its prices. Anything left alone follows the shop.
     - For each list, the owner decides whether things added to the shop later
       join the widget by themselves. */
(function () {
  "use strict";

  const { t, icon, toast } = PBM;
  const { TODAY, OPEN, CLOSE, SHOP, SERVICES, SERVICE_ORDER, BRANCHES, RESOURCE_TYPES, RESOURCES, WIDGETS } = PBM_SAMPLE;

  const plural = (n, one, many) => (n === 1 ? one : many);

  PBM.addStrings({
    vi: {
      "doc.title": "Widget đặt lịch | pleasebookme",
      "page.title": "Widget đặt lịch",
      lede: "Mỗi widget là một lối vào đặt lịch. Bạn chọn chi nhánh, dịch vụ và người làm cho nó, rồi đặt nó ở link, trong website hoặc sau một nút bật.",
      new: "Widget mới",
      "col.widget": "Widget",
      "col.scope": "Phạm vi",
      "col.where": "Nơi hiển thị",
      "col.state": "Trạng thái",
      "col.week": "7 ngày qua",
      "n.branches": ({ n }) => `${n} chi nhánh`,
      "n.services": ({ n }) => `${n} dịch vụ`,
      "n.people": ({ n }) => `${n} người`,
      "n.places": ({ n }) => `${n} chỗ`,
      "where.link": "Link",
      "where.inline": "Trong website",
      "where.popup": "Nút bật",
      "state.on": "Đang chạy",
      "state.off": "Đang tắt",
      "state.soon": ({ d }) => `Chạy từ ${d}`,
      "state.ended": "Đã kết thúc",
      default: "Mặc định",
      week: ({ n }) => `${n} lịch`,
      "copy.link": "Sao chép link",
      copied: "Đã sao chép link",
      toggle: ({ name }) => `Bật ${name}`,
      open: ({ name }) => `Mở ${name}`,
      back: "Tất cả widget",
      "name.label": "Tên widget",
      "name.placeholder": "Tên widget, ví dụ: Lịch của Tuấn",
      "name.error": "Hãy đặt tên cho widget.",
      on: "Đang bật",
      save: "Lưu",
      saved: "Đã lưu {name}",
      added: "Đã thêm {name}",
      delete: "Xoá widget",
      "delete.sure": "Bấm lần nữa để xoá",
      deleted: "Đã xoá {name}",
      "tabs.label": "Các phần của widget",
      "tab.scope": "Phạm vi",
      "tab.where": "Nơi hiển thị",
      "tab.look": "Giao diện",
      "tab.dates": "Thời gian chạy",
      "tab.rules": "Quy định riêng",
      "tab.price": "Giá riêng",
      "scope.lede": "Widget này mở ra phần nào của tiệm. Thứ gì chỉ còn một lựa chọn thì khách không phải chọn nữa.",
      "g.resources": "Tài nguyên",
      "g.resources.lede": "Chi nhánh, nhân viên và chỗ là tài nguyên: các lớp đặt lên trên dịch vụ. Tiệm không dùng lớp nào thì khách không bị hỏi về lớp đó.",
      "g.branches": "Chi nhánh",
      "g.services": "Dịch vụ",
      "branches.many": "Khách chọn chi nhánh ngay sau khi chọn ngày, rồi thấy dịch vụ ở đó.",
      "branches.one": ({ name }) => `Khách vào thẳng chi nhánh ${name}.`,
      "branches.none": "Chọn ít nhất một chi nhánh.",
      "auto.branches": "Tự thêm chi nhánh mới mở",
      "auto.services": "Tự thêm dịch vụ mới",
      "auto.people": "Tự thêm nhân viên mới",
      "auto.places": "Tự thêm chỗ mới",
      all: "Chọn tất cả",
      "svc.orphan": "Chưa có ai trong widget này làm được",
      "pick.label": "Cách chọn",
      "pick.customer": "Khách chọn",
      "pick.auto": "Tiệm tự xếp",
      "pick.hint.people.customer": "Khách chọn giờ trước. Sau đó, nếu muốn, khách chọn một người đang rảnh vào giờ ấy, hoặc để “Ai cũng được”.",
      "pick.hint.people.auto": "Khách không chọn người. Tiệm xếp khi nhận lịch.",
      "pick.hint.places.customer": "Khách chọn chỗ, ví dụ một phòng riêng.",
      "pick.hint.places.auto": "Khách không chọn chỗ. Một chỗ trống được giữ khi lịch được đặt.",
      "path.title": "Khách sẽ đi qua",
      "step.branch": "Chi nhánh",
      "step.services": "Dịch vụ",
      "step.date": "Ngày",
      "step.person": "Người làm, nếu khách muốn chọn",
      "step.place": "Chỗ",
      "step.time": "Giờ, vừa với các dịch vụ đã chọn",
      "step.details": "Thông tin",
      "fixed.title": "Đã định sẵn:",
      "fixed.branch": ({ name }) => `chi nhánh ${name}`,
      "fixed.service": ({ name }) => `dịch vụ ${name}`,
      "fixed.person": ({ name }) => `người làm ${name}`,
      "fixed.people.auto": "người làm do tiệm xếp",
      "fixed.place": ({ name }) => `chỗ ${name}`,
      "where.lede": "Cùng một widget có thể ở nhiều nơi. Link luôn có sẵn.",
      "w.link.title": "Link và mã QR",
      "w.link.desc": "Gửi cho khách qua Zalo, gắn vào Facebook hoặc Google Maps, hay in mã QR dán tại tiệm.",
      "w.inline.title": "Nằm trong trang web",
      "w.inline.desc": "Widget hiện ngay trong một trang của website, giữa các nội dung khác.",
      "w.popup.title": "Nút bật trên trang web",
      "w.popup.desc": "Một nút nổi ở góc trang. Bấm vào thì widget mở ra phía trên trang.",
      "w.win.title": "Cửa sổ riêng",
      "w.win.desc":
        "Widget mở thành một cửa sổ nhỏ, tách khỏi trang đang xem. Hợp cho máy tính bảng ở quầy hoặc một nút trên website.",
      "w.win.view": "Xem cửa sổ",
      "w.win.size": "Kích thước cửa sổ",
      "w.win.phone": "Điện thoại",
      "w.win.desk": "Máy tính",
      "w.win.hint": "Cửa sổ mở bằng bản bạn đang sửa, kể cả khi chưa lưu, và đổi theo từng thay đổi.",
      "win.blocked": "Trình duyệt đã chặn cửa sổ mới. Cho phép cửa sổ bật lên cho trang này rồi bấm lại.",
      "win.title": ({ name }) => `${name} | cửa sổ xem thử`,
      "win.note.draft": "Xem thử, theo bản đang sửa trong trình chỉnh sửa",
      "win.note.saved": "Xem thử, bản mẫu đã lưu",
      "w.site": "Website được gắn widget",
      "w.site.hint": "Chỉ địa chỉ này được hiện widget, để mã không bị dùng ở nơi khác.",
      "w.button": "Chữ trên nút",
      "w.code": "Mã để dán vào website",
      "w.code.copy": "Sao chép mã",
      "w.code.copied": "Đã sao chép mã",
      "w.qr": "Mã QR của link",
      "w.qr.note": "Mã QR minh hoạ, chưa quét được.",
      "w.adv": "Khoá của widget",
      "w.adv.hint": "Hệ thống tự tạo và giữ khoá. Bạn chỉ cần tới đây khi muốn đổi khoá.",
      "w.adv.rotate": "Đổi khoá",
      "look.lede": "Để widget hợp với nơi nó xuất hiện.",
      "look.accent": "Màu nhấn",
      "look.theme": "Nền",
      "theme.light": "Sáng",
      "theme.dark": "Tối",
      "theme.auto": "Theo máy khách",
      "look.lang": "Ngôn ngữ",
      "lang.vi": "Tiếng Việt",
      "lang.en": "English",
      "lang.both": "Cả hai",
      "look.greeting": "Lời chào",
      "look.greeting.hint": "Một dòng ở đầu widget. Bỏ trống thì chỉ hiện tên tiệm.",
      "look.logo": "Hiện logo của tiệm",
      "tint.burgundy": "Đỏ rượu",
      "tint.glacier": "Xanh băng",
      "tint.black": "Đen",
      "dates.lede": "Cho những dịp có ngày bắt đầu và ngày kết thúc.",
      "dates.mode": "Thời gian chạy",
      "dates.always": "Luôn chạy",
      "dates.range": "Trong khoảng ngày",
      "dates.from": "Từ ngày",
      "dates.to": "Đến hết ngày",
      "dates.closed": "Lời nhắn khi chưa mở hoặc đã hết",
      "dates.closed.default": "Hiện chưa nhận đặt lịch qua đây.",
      "rules.lede": "Để “Theo tiệm” thì widget dùng thiết lập chung của tiệm.",
      "r.confirm": "Xác nhận lịch",
      "r.notice": "Báo trước tối thiểu",
      "r.ahead": "Đặt trước xa nhất",
      "opt.shop": ({ v }) => `Theo tiệm (${v})`,
      "confirm.manual": "Tiệm xác nhận từng lịch",
      "confirm.auto": "Tự xác nhận",
      "price.lede": "Giá này chỉ áp dụng khi khách đặt qua widget này.",
      "price.mode": "Giá",
      "price.none": "Giá của tiệm",
      "price.percent": "Giảm theo %",
      "price.amount": "Giảm số tiền",
      "price.value": "Mức giảm cho mỗi dịch vụ",
      "price.example": ({ name, old, now }) => `${name}: ${old} còn ${now}.`,
      preview: "Xem trước",
      "preview.note": "Bấm thử như một khách hàng.",
      "preview.window": "Mở cửa sổ riêng",
      "preview.live": "Xem thử khi đang chạy",
      min: ({ n }) => `${n} phút`,
      hours: ({ n }) => `${n} giờ`,
      days: ({ n }) => `${n} ngày`,
      from: ({ p }) => `từ ${p}`,
      note: "Dữ liệu mẫu. Đây là bản thiết kế, chưa nối với hệ thống.",
    },
    en: {
      "doc.title": "Booking widgets | pleasebookme",
      "page.title": "Booking widgets",
      lede: "Each widget is one way into booking. You choose its branches, services and staff, then put it behind a link, inside a website or behind a pop-up button.",
      new: "New widget",
      "col.widget": "Widget",
      "col.scope": "What it offers",
      "col.where": "Where it appears",
      "col.state": "Status",
      "col.week": "Last 7 days",
      "n.branches": ({ n }) => `${n} ${plural(n, "branch", "branches")}`,
      "n.services": ({ n }) => `${n} ${plural(n, "service", "services")}`,
      "n.people": ({ n }) => `${n} staff`,
      "n.places": ({ n }) => `${n} ${plural(n, "place", "places")}`,
      "where.link": "Link",
      "where.inline": "In a website",
      "where.popup": "Pop-up button",
      "state.on": "Running",
      "state.off": "Off",
      "state.soon": ({ d }) => `Starts ${d}`,
      "state.ended": "Ended",
      default: "Default",
      week: ({ n }) => `${n} ${plural(n, "booking", "bookings")}`,
      "copy.link": "Copy link",
      copied: "Link copied",
      toggle: ({ name }) => `Turn on ${name}`,
      open: ({ name }) => `Open ${name}`,
      back: "All widgets",
      "name.label": "Widget name",
      "name.placeholder": "Widget name, for example: Tuấn's bookings",
      "name.error": "Give the widget a name.",
      on: "On",
      save: "Save",
      saved: "Saved {name}",
      added: "Added {name}",
      delete: "Delete widget",
      "delete.sure": "Press again to delete",
      deleted: "Deleted {name}",
      "tabs.label": "Widget sections",
      "tab.scope": "What it offers",
      "tab.where": "Where it appears",
      "tab.look": "Look",
      "tab.dates": "Dates",
      "tab.rules": "Own rules",
      "tab.price": "Own prices",
      "scope.lede": "Which part of the shop this widget opens. Anything left with one option is not asked.",
      "g.resources": "Resources",
      "g.resources.lede": "Branches, staff and places are resources: layers on top of the services. A layer the shop does not use is never asked about.",
      "g.branches": "Branches",
      "g.services": "Services",
      "branches.many": "The customer chooses a branch right after the date, then sees its services.",
      "branches.one": ({ name }) => `The customer goes straight to the ${name} branch.`,
      "branches.none": "Choose at least one branch.",
      "auto.branches": "Add newly opened branches automatically",
      "auto.services": "Add new services automatically",
      "auto.people": "Add new staff automatically",
      "auto.places": "Add new places automatically",
      all: "Select all",
      "svc.orphan": "Nobody in this widget does it yet",
      "pick.label": "How it is chosen",
      "pick.customer": "Customer chooses",
      "pick.auto": "Shop assigns",
      "pick.hint.people.customer": "The customer picks a time first. Then, if they wish, they choose one of the people free at that time, or leave it at “No preference”.",
      "pick.hint.people.auto": "The customer does not choose a person. The shop assigns one when the booking arrives.",
      "pick.hint.places.customer": "The customer chooses a place, a private room for example.",
      "pick.hint.places.auto": "The customer does not choose a place. A free one is held when the booking is made.",
      "path.title": "The customer goes through",
      "step.branch": "Branch",
      "step.services": "Services",
      "step.date": "Date",
      "step.person": "Staff, if the customer wants to choose",
      "step.place": "Place",
      "step.time": "Time, fitted to the chosen services",
      "step.details": "Details",
      "fixed.title": "Already set:",
      "fixed.branch": ({ name }) => `the ${name} branch`,
      "fixed.service": ({ name }) => `the service ${name}`,
      "fixed.person": ({ name }) => `${name} as staff`,
      "fixed.people.auto": "staff assigned by the shop",
      "fixed.place": ({ name }) => `the place ${name}`,
      "where.lede": "The same widget can sit in several places. The link is always there.",
      "w.link.title": "Link and QR code",
      "w.link.desc": "Send it over Zalo, add it to Facebook or Google Maps, or print the QR code for the shop.",
      "w.inline.title": "Inside a web page",
      "w.inline.desc": "The widget shows right in a page of the website, among its other content.",
      "w.popup.title": "Pop-up button on a web page",
      "w.popup.desc": "A button floating in the corner. Pressing it opens the widget over the page.",
      "w.win.title": "Its own window",
      "w.win.desc":
        "The widget opens in a small window of its own, apart from the page it was pressed on. Good for a tablet at the counter or a button on a website.",
      "w.win.view": "View window",
      "w.win.size": "Window size",
      "w.win.phone": "Phone",
      "w.win.desk": "Computer",
      "w.win.hint": "The window opens with the version you are editing, saved or not, and follows every change.",
      "win.blocked": "The browser blocked the new window. Allow pop-ups for this page and press again.",
      "win.title": ({ name }) => `${name} | preview window`,
      "win.note.draft": "Preview, following the version being edited",
      "win.note.saved": "Preview, the saved sample version",
      "w.site": "Website the widget sits on",
      "w.site.hint": "Only this address may show the widget, so the code cannot be used elsewhere.",
      "w.button": "Button text",
      "w.code": "Code to paste into the website",
      "w.code.copy": "Copy code",
      "w.code.copied": "Code copied",
      "w.qr": "QR code for the link",
      "w.qr.note": "Illustrative QR code, not scannable yet.",
      "w.adv": "Widget keys",
      "w.adv.hint": "The system creates and keeps the keys. Come here only to replace them.",
      "w.adv.rotate": "Replace keys",
      "look.lede": "So the widget fits where it appears.",
      "look.accent": "Accent colour",
      "look.theme": "Background",
      "theme.light": "Light",
      "theme.dark": "Dark",
      "theme.auto": "Customer's device",
      "look.lang": "Language",
      "lang.vi": "Tiếng Việt",
      "lang.en": "English",
      "lang.both": "Both",
      "look.greeting": "Greeting",
      "look.greeting.hint": "One line at the top of the widget. Leave it empty to show only the shop name.",
      "look.logo": "Show the shop's logo",
      "tint.burgundy": "Burgundy",
      "tint.glacier": "Glacier",
      "tint.black": "Black",
      "dates.lede": "For occasions with a start and an end date.",
      "dates.mode": "Dates",
      "dates.always": "Always running",
      "dates.range": "Between two dates",
      "dates.from": "From",
      "dates.to": "Until the end of",
      "dates.closed": "Message before it opens or after it ends",
      "dates.closed.default": "Bookings are not open here at the moment.",
      "rules.lede": "Leave “Follow the shop” and the widget uses the shop's settings.",
      "r.confirm": "Confirming bookings",
      "r.notice": "Minimum notice",
      "r.ahead": "Furthest ahead",
      "opt.shop": ({ v }) => `Follow the shop (${v})`,
      "confirm.manual": "The shop confirms each booking",
      "confirm.auto": "Confirmed automatically",
      "price.lede": "These prices apply only when a customer books through this widget.",
      "price.mode": "Prices",
      "price.none": "The shop's prices",
      "price.percent": "Percentage off",
      "price.amount": "Amount off",
      "price.value": "Reduction on each service",
      "price.example": ({ name, old, now }) => `${name}: ${old} becomes ${now}.`,
      preview: "Preview",
      "preview.note": "Click through it as a customer would.",
      "preview.window": "Open in its own window",
      "preview.live": "Preview it as running",
      min: ({ n }) => `${n} min`,
      hours: ({ n }) => `${n} ${plural(n, "hour", "hours")}`,
      days: ({ n }) => `${n} ${plural(n, "day", "days")}`,
      from: ({ p }) => `from ${p}`,
      note: "Sample data. This is a design mockup, not connected to the system.",
    },
  });

  // What the customer reads inside the widget. Kept apart from the dashboard's
  // strings because a widget has its own language setting.
  const PV = {
    vi: {
      shop: "Tiệm tóc Mẫu",
      step: ({ i, n }) => `Bước ${i}/${n}`,
      branch: "Chọn chi nhánh",
      services: "Chọn dịch vụ",
      date: "Chọn ngày",
      dateNote: "Ngày tô nền là ngày còn nhận lịch.",
      prevMonth: "Tháng trước",
      nextMonth: "Tháng sau",
      person: "Bạn có muốn chọn người làm không?",
      personSub: ({ time }) => `Không bắt buộc. Dưới đây là những người làm được dịch vụ bạn chọn lúc ${time}.`,
      busyAt: ({ time }) => `Bận lúc ${time}`,
      place: "Chọn chỗ",
      time: "Chọn giờ",
      fits: ({ len }) => `Giờ nào dưới đây cũng đủ cho ${len}.`,
      span: ({ from, to }) => `Từ ${from} đến ${to}.`,
      noSlots: "Ngày này đã kín. Hãy quay lại chọn ngày khác.",
      with: ({ name }) => `với ${name}`,
      details: "Thông tin của bạn",
      any: "Ai cũng được",
      anySub: "Tiệm xếp người đang rảnh",
      anyPlace: "Chỗ nào cũng được",
      doesAll: "Làm được tất cả",
      does: ({ list }) => `Làm: ${list}`,
      rest: "Phần còn lại tiệm sẽ xếp người khác.",
      total: "Tổng",
      discount: "Ưu đãi",
      from: "từ",
      next: "Tiếp tục",
      back: "Quay lại",
      book: "Đặt lịch",
      name: "Tên của bạn",
      phone: "Số điện thoại",
      doneAuto: "Đã đặt lịch. Hẹn gặp bạn!",
      doneManual: "Đã gửi lịch. Tiệm sẽ xác nhận với bạn.",
      again: "Đặt lịch khác",
      manage: "Xem, đổi hoặc huỷ lịch này",
      manageNote: "Link này cũng có trong email xác nhận, nếu bạn để lại email.",
      email: "Email (không bắt buộc)",
      emailNote: "Để nhận xác nhận và link đổi, huỷ lịch.",
      off: "Widget này đang tắt.",
      empty: "Chưa có dịch vụ nào để đặt ở đây.",
      min: (n) => `${n} phút`,
      hours: (n) => `${n} giờ`,
      locale: "vi-VN",
    },
    en: {
      shop: "Sample Barbershop",
      step: ({ i, n }) => `Step ${i} of ${n}`,
      branch: "Choose a branch",
      services: "Choose services",
      date: "Choose a date",
      dateNote: "Shaded days still take bookings.",
      prevMonth: "Previous month",
      nextMonth: "Next month",
      person: "Would you like a particular person?",
      personSub: ({ time }) => `Optional. These are the people who do your services at ${time}.`,
      busyAt: ({ time }) => `Busy at ${time}`,
      place: "Choose a place",
      time: "Choose a time",
      fits: ({ len }) => `Every time below has room for ${len}.`,
      span: ({ from, to }) => `From ${from} to ${to}.`,
      noSlots: "This day is full. Go back and choose another date.",
      with: ({ name }) => `with ${name}`,
      details: "Your details",
      any: "No preference",
      anySub: "The shop picks someone who is free",
      anyPlace: "Any place",
      doesAll: "Does all of them",
      does: ({ list }) => `Does: ${list}`,
      rest: "The shop will assign someone else for the rest.",
      total: "Total",
      discount: "Offer",
      from: "from",
      next: "Continue",
      back: "Back",
      book: "Book",
      name: "Your name",
      phone: "Phone number",
      doneAuto: "You are booked. See you soon!",
      doneManual: "Booking sent. The shop will confirm with you.",
      again: "Book another",
      manage: "View, change or cancel this booking",
      manageNote: "The same link is in your confirmation email, if you left one.",
      email: "Email (optional)",
      emailNote: "To get a confirmation and the link to change or cancel.",
      off: "This widget is turned off.",
      empty: "There is nothing to book here yet.",
      min: (n) => `${n} min`,
      hours: (n) => `${n} ${plural(n, "hour", "hours")}`,
      locale: "en-GB",
    },
  };

  // ---------- State and helpers ----------

  const TABS = [
    ["scope", "widget"],
    ["where", "link"],
    ["look", "eye"],
    ["dates", "calendar"],
    ["rules", "sliders"],
    ["price", "tag"],
  ];
  const ACCENTS = ["burgundy", "glacier", "black"];

  const state = {
    draft: null, // the widget open in the editor, edited as a copy until saved
    tab: "scope",
    sureToDelete: false,
    pv: null, // where the preview's pretend customer has got to
    openedAs: null, // the id the editor was opened with ("new" stays "new" after the first save)
  };
  // The order is the customer's: a date, then (if the shop has them) a branch,
  // the services, a time that fits them, and only then, if they wish, a person.
  const freshPreview = () => ({
    i: 0,
    date: null,
    month: null,
    branch: null,
    basket: [],
    slot: null,
    person: "any",
    place: "any",
    lang: PBM.lang,
    live: false,
  });

  const $ = (id) => document.getElementById(id);
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const clone = (value) => JSON.parse(JSON.stringify(value));
  const getPath = (object, path) => path.split(".").reduce((o, key) => o[key], object);
  const setPath = (object, path, value) => {
    const keys = path.split(".");
    const last = keys.pop();
    keys.reduce((o, key) => o[key], object)[last] = value;
  };
  const money = (n, locale = PBM.locale) => new Intl.NumberFormat(locale, { style: "currency", currency: "VND" }).format(n);
  const duration = (m) =>
    m % 1440 === 0 ? t("days", { n: m / 1440 }) : m % 60 === 0 ? t("hours", { n: m / 60 }) : t("min", { n: m });
  const price = (v) => (v.from ? t("from", { p: money(v.price) }) : money(v.price));
  const slugify = (name) =>
    name
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[đĐ]/g, "d")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  const dayOf = (iso) => {
    const [y, m, d] = iso.split("-").map(Number);
    return new Date(y, m - 1, d);
  };
  const shortDate = (iso) => {
    const d = dayOf(iso);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  };
  const ofType = (type) => RESOURCES.filter((r) => r.type === type);
  const linkOf = (w) => `pleasebookme.app/booking/${SHOP.slug}${w.path ? "/" + w.path : ""}`;
  const keyOf = (w) => "pbm_" + (w.path || "main").replace(/-/g, "_");

  // Redraws something and puts the keyboard back on the control it was on.
  function keepFocus(redraw) {
    const mark = document.activeElement?.dataset?.focus;
    redraw();
    if (mark) document.querySelector(`[data-focus="${mark}"]`)?.focus();
  }

  // What a widget really offers, once its lists are checked against each other.
  // Services are the core. Resources are layers on top of them: each one that
  // the shop uses narrows what is offered, and one the shop does not use is
  // simply not there. Only working resources count.
  function scope(w) {
    const working = (r) => r.status === "ACTIVE";
    const branches = BRANCHES.filter((b) => working(b) && w.branches.ids.includes(b.id));
    // A resource linked to no branch is at every branch.
    const here = (r) => !r.branch || w.branches.ids.includes(r.branch);
    const people = ofType("people").filter((r) => working(r) && w.people.ids.includes(r.id) && here(r));
    const places = ofType("places").filter((r) => working(r) && w.places.ids.includes(r.id) && here(r));
    const chosen = SERVICE_ORDER.filter((id) => w.services.ids.includes(id));
    // A shop with no staff at all offers every service it ticks. A shop with
    // staff offers the ones somebody in the widget can do.
    const staffed = ofType("people").some(working);
    const offered = staffed ? chosen.filter((id) => people.some((p) => p.does.includes(id))) : chosen;

    // The questions, in the order the customer meets them. The date and the
    // time are always asked. A resource adds a question only when there is
    // more than one to choose from, and the person comes last because it is
    // the one question the customer may skip.
    const steps = ["date"];
    if (branches.length > 1) steps.push("branch");
    if (offered.length > 1) steps.push("services");
    steps.push("time");
    if (w.people.pick === "customer" && people.length > 1) steps.push("person");
    if (w.places.pick === "customer" && places.length > 1) steps.push("place");
    steps.push("details");

    return { branches, people, places, chosen, offered, staffed, orphaned: chosen.filter((id) => !offered.includes(id)), steps };
  }

  function status(w) {
    if (!w.on) return { key: "off", cls: "st-cancelled" };
    if (w.dates.mode === "range" && w.dates.from && w.dates.to) {
      if (TODAY < dayOf(w.dates.from)) return { key: "soon", cls: "st-pending", d: shortDate(w.dates.from) };
      if (TODAY > dayOf(w.dates.to)) return { key: "ended", cls: "st-cancelled" };
    }
    return { key: "on", cls: "st-accepted" };
  }

  // A widget's own price for a service.
  function reduced(w, amount) {
    if (w.price.mode === "percent") return Math.round((amount * (100 - w.price.value)) / 100 / 1000) * 1000;
    if (w.price.mode === "amount") return Math.max(0, amount - w.price.value);
    return amount;
  }

  // ---------- The list ----------

  function rowHTML(w) {
    const sc = scope(w);
    const st = status(w);
    const where = ["link", w.appear.inline && "inline", w.appear.popup && "popup"].filter(Boolean);
    return `<div class="row" role="row">
        <div class="cell-name" role="cell">
          <i class="code-dot code-${w.code || 8}"></i>
          <button type="button" class="row-open" data-edit="${w.id}" aria-label="${esc(t("open", { name: w.name }))}"><strong>${esc(w.name)}</strong></button>
          ${w.isDefault ? `<span class="tag">${t("default")}</span>` : ""}
          <span class="row-link">${linkOf(w)}</span>
        </div>
        <div class="cell-scope" role="cell">
          <span>${sc.branches.length === 1 ? esc(sc.branches[0].name) : t("n.branches", { n: sc.branches.length })}</span>
          <span>${t("n.services", { n: sc.offered.length })}</span>
          <span>${sc.people.length === 1 ? esc(sc.people[0].name) : t("n.people", { n: sc.people.length })}</span>
        </div>
        <div class="cell-where" role="cell">${where.map((key) => `<span class="tag">${t("where." + key)}</span>`).join("")}</div>
        <div class="cell-state" role="cell"><span class="badge ${st.cls}">${t("state." + st.key, st)}</span></div>
        <div class="cell-week num" role="cell">${t("week", { n: w.week })}</div>
        <div class="cell-actions" role="cell">
          <button class="icon-btn" type="button" data-copy="${w.id}" aria-label="${t("copy.link")}" title="${t("copy.link")}">${icon("copy")}</button>
          <input class="switch" type="checkbox" role="switch" data-toggle="${w.id}" data-focus="toggle:${w.id}" aria-label="${esc(t("toggle", { name: w.name }))}" ${w.on ? "checked" : ""} />
        </div>
      </div>`;
  }

  function renderList() {
    document.title = t("doc.title");
    $("view").innerHTML = `
      <header class="head">
        <h1>${t("page.title")}</h1>
        <div class="toolbar"><button class="btn btn-primary" type="button" data-new>${icon("plus")}${t("new")}</button></div>
        <p>${t("lede")}</p>
      </header>
      <section class="panel list" role="table" aria-label="${t("page.title")}">
        <div class="row row-head" role="row">
          <span role="columnheader">${t("col.widget")}</span>
          <span role="columnheader">${t("col.scope")}</span>
          <span role="columnheader">${t("col.where")}</span>
          <span role="columnheader">${t("col.state")}</span>
          <span role="columnheader">${t("col.week")}</span>
          <span role="columnheader"></span>
        </div>
        ${WIDGETS.map(rowHTML).join("")}
      </section>
      <p class="note">${t("note")}</p>`;
  }

  // ---------- The editor: pieces every section uses ----------

  const flag = (path, label, on) =>
    `<label class="switch-row"><span>${label}</span><input class="switch" type="checkbox" role="switch" data-flag="${path}" data-focus="${path}" ${on ? "checked" : ""} /></label>`;

  const seg = (path, options, current, label) =>
    `<div class="seg" role="group" aria-label="${label}" style="--n:${options.length};--i:${Math.max(
      0,
      options.findIndex(([value]) => value === current)
    )}">${options
      .map(
        ([value, text]) =>
          `<button type="button" data-pick="${path}" data-value="${value}" data-focus="${path}:${value}" aria-pressed="${value === current}">${text}</button>`
      )
      .join("")}</div>`;

  const chip = (list, id, label, on) =>
    `<label class="chip-pick"><input class="visually-hidden" type="checkbox" data-list="${list}" data-focus="${list}:${id}" value="${id}" ${
      on ? "checked" : ""
    } /><span><i aria-hidden="true">${esc(label.charAt(0))}</i>${esc(label)}</span></label>`;

  const option = (value, label, current) =>
    `<option value="${value}"${String(current) === String(value) ? " selected" : ""}>${label}</option>`;

  // ---------- Section: what it offers ----------

  function tabScope(w) {
    const sc = scope(w);
    const many = sc.branches.length > 1;

    const services = SERVICE_ORDER.map((id) => {
      const s = SERVICES[id];
      const on = w.services.ids.includes(id);
      const orphan = on && sc.orphaned.includes(id);
      return `<label class="svc-row${orphan ? " is-orphan" : ""}">
          <input type="checkbox" data-list="services" data-focus="services:${id}" value="${id}" ${on ? "checked" : ""} />
          <span class="svc-name">${esc(s[PBM.lang])}${orphan ? `<small>${t("svc.orphan")}</small>` : ""}</span>
          <span class="svc-meta">${duration(s.min)}</span>
          <span class="svc-meta num">${price(s)}</span>
        </label>`;
    }).join("");

    // One block per type of resource the shop uses, so a type added later gets
    // its own. A type with nothing in it is a layer the shop does not have.
    const resources = RESOURCE_TYPES.map((type) => {
      const all = ofType(type.id).filter((r) => r.status === "ACTIVE");
      const mine = w[type.id];
      if (!all.length || !mine) return "";
      const head = `<div class="group-head"><h3>${icon(type.icon || "box")}${type[PBM.lang] || type.vi}</h3></div>`;

      // "Where": one branch ticked takes the customer straight there, several are a question.
      if (type.asks === "where") {
        const hint = !sc.branches.length
          ? t("branches.none")
          : many
            ? t("branches.many")
            : t("branches.one", { name: sc.branches[0].name });
        return `<div class="group" role="group" aria-label="${type[PBM.lang]}">
            ${head}
            <div class="chips">${all.map((r) => chip(type.id, r.id, r.name, mine.ids.includes(r.id))).join("")}</div>
            <p class="hint">${hint}</p>
            ${flag(type.id + ".auto", t("auto." + type.id), mine.auto)}
          </div>`;
      }

      // Resources linked to a branch are listed under it; the rest belong to the whole shop.
      const blocks = sc.branches.map((b) => ({ label: many ? b.name : "", items: all.filter((r) => r.branch === b.id) }));
      const loose = all.filter((r) => !r.branch);
      if (loose.length) blocks.push({ label: "", items: loose });
      const chips = blocks
        .filter((block) => block.items.length)
        .map(
          (block) =>
            `${block.label ? `<p class="sub-label">${esc(block.label)}</p>` : ""}<div class="chips">${block.items
              .map((r) => chip(type.id, r.id, r.name, mine.ids.includes(r.id)))
              .join("")}</div>`
        )
        .join("");
      return `<div class="group" role="group" aria-label="${type[PBM.lang]}">
          ${head}
          ${chips || `<p class="hint">${t("branches.none")}</p>`}
          <div class="group-row"><span class="label">${t("pick.label")}</span>${seg(
            type.id + ".pick",
            [
              ["customer", t("pick.customer")],
              ["auto", t("pick.auto")],
            ],
            mine.pick,
            t("pick.label")
          )}</div>
          <p class="hint">${t(`pick.hint.${type.id}.${mine.pick}`)}</p>
          ${flag(type.id + ".auto", t("auto." + type.id), mine.auto)}
        </div>`;
    }).join("");

    return `
      <h2>${t("tab.scope")}</h2>
      <p class="tab-lede">${t("scope.lede")}</p>
      <div class="group" role="group" aria-label="${t("g.services")}">
        <div class="group-head"><h3>${icon("scissors")}${t("g.services")}</h3><button class="link-btn" type="button" data-all="services">${t("all")}</button></div>
        <div class="svc-list">${services}</div>
        ${flag("services.auto", t("auto.services"), w.services.auto)}
      </div>
      <div class="layer">
        <h3>${t("g.resources")}</h3>
        <p>${t("g.resources.lede")}</p>
      </div>
      ${resources}`;
  }

  // ---------- Section: where it appears ----------

  // Not a real code: a fixed pattern drawn from the link, to show where the QR sits.
  function qr(text) {
    const n = 21;
    let seed = 7;
    for (const ch of text) seed = (seed * 31 + ch.charCodeAt(0)) >>> 0;
    const next = () => (seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296;
    let cells = "";
    for (let y = 0; y < n; y++) {
      for (let x = 0; x < n; x++) {
        const corner = (x < 8 || x >= n - 8) && (y < 8 || y >= n - 8) && !(x >= n - 8 && y >= n - 8);
        let on = next() > 0.52;
        if (corner) {
          const cx = x >= n - 8 ? x - (n - 7) : x;
          const cy = y >= n - 8 ? y - (n - 7) : y;
          const inSquare = cx >= 0 && cx <= 6 && cy >= 0 && cy <= 6;
          on = inSquare && (cx === 0 || cx === 6 || cy === 0 || cy === 6 || (cx >= 2 && cx <= 4 && cy >= 2 && cy <= 4));
        }
        if (on) cells += `<rect x="${x}" y="${y}" width="1.02" height="1.02"/>`;
      }
    }
    return `<svg class="qr" viewBox="-1 -1 ${n + 2} ${n + 2}" role="img" aria-label="${t("w.qr")}">${cells}</svg>`;
  }

  const DIAGRAM = {
    link: '<rect x="8" y="14" width="46" height="12" rx="6" class="d-on"/><rect x="62" y="8" width="24" height="24" rx="3"/><rect x="8" y="34" width="30" height="5" rx="2.5"/>',
    inline:
      '<rect x="8" y="6" width="80" height="6" rx="3"/><rect x="8" y="17" width="34" height="26" rx="4" class="d-on"/><rect x="47" y="17" width="41" height="11" rx="3"/><rect x="47" y="32" width="41" height="11" rx="3"/>',
    popup:
      '<rect x="8" y="6" width="38" height="16" rx="3"/><rect x="50" y="6" width="38" height="16" rx="3"/><rect x="8" y="27" width="38" height="16" rx="3"/><rect x="58" y="33" width="30" height="10" rx="5" class="d-on"/>',
    // A page behind, and a small window of its own in front of it.
    window:
      '<rect x="8" y="6" width="56" height="30" rx="3"/><rect x="38" y="13" width="50" height="30" rx="4" class="d-on"/><rect x="43" y="19" width="22" height="3" rx="1.5" class="d-dot"/>',
  };
  const diagram = (name) => `<svg class="diagram" viewBox="0 0 96 49" aria-hidden="true">${DIAGRAM[name]}</svg>`;

  // The window is opened from a plain link, so it needs no script from us.
  const WINDOW_SIZE = { phone: [420, 800], desk: [780, 860] }; // width and height of the window, in pixels
  const windowSize = (w) => (w.appear.windowSize === "desk" ? "desk" : "phone");

  const codeFor = (w, mode) =>
    mode === "inline"
      ? `<div id="pleasebookme-widget"></div>\n<script src="https://pleasebookme.app/widget.js" data-widget="${keyOf(w)}"></script>`
      : mode === "window"
        ? `<a href="https://${linkOf(w)}" target="pbm-widget" onclick="window.open(this.href,'pbm-widget','popup,width=${
            WINDOW_SIZE[windowSize(w)][0]
          },height=${WINDOW_SIZE[windowSize(w)][1]}');return false">${w.appear.button || "Đặt lịch"}</a>`
        : `<script src="https://pleasebookme.app/widget.js" data-widget="${keyOf(w)}" data-button="${w.appear.button}"></script>`;

  function tabWhere(w) {
    const key = keyOf(w);
    const snippet = (mode) => `
          <div class="field">
            <span class="label">${t("w.code")}</span>
            <pre class="code"><code id="code-${mode}">${esc(codeFor(w, mode))}</code></pre>
            <div><button class="btn btn-quiet btn-small" type="button" data-copy-code="${mode}">${icon("copy")}<span>${t("w.code.copy")}</span></button></div>
          </div>`;
    const site = `
          <div class="field">
            <label for="w-site">${t("w.site")}</label>
            <input class="input" id="w-site" data-text="appear.site" value="${esc(w.appear.site)}" placeholder="tiemcuaban.vn" autocomplete="off" />
            <small>${t("w.site.hint")}</small>
          </div>`;

    return `
      <h2>${t("tab.where")}</h2>
      <p class="tab-lede">${t("where.lede")}</p>

      <section class="place is-on">
        <div class="place-head">${diagram("link")}<div><h3>${t("w.link.title")}</h3><p>${t("w.link.desc")}</p></div></div>
        <div class="place-body place-link">
          <div class="field">
            <div class="link-row"><code>${linkOf(w)}</code><button class="btn btn-quiet btn-small" type="button" data-copy-link>${icon("copy")}<span>${t("copy.link")}</span></button></div>
          </div>
          <figure class="qr-box">${qr(linkOf(w))}<figcaption>${t("w.qr.note")}</figcaption></figure>
        </div>
      </section>

      <section class="place${w.appear.inline ? " is-on" : ""}">
        <div class="place-head">${diagram("inline")}<div><h3>${t("w.inline.title")}</h3><p>${t("w.inline.desc")}</p></div>
          <input class="switch" type="checkbox" role="switch" data-flag="appear.inline" data-focus="appear.inline" aria-label="${t("w.inline.title")}" ${w.appear.inline ? "checked" : ""} /></div>
        ${w.appear.inline ? `<div class="place-body">${site}${snippet("inline")}</div>` : ""}
      </section>

      <section class="place${w.appear.popup ? " is-on" : ""}">
        <div class="place-head">${diagram("popup")}<div><h3>${t("w.popup.title")}</h3><p>${t("w.popup.desc")}</p></div>
          <input class="switch" type="checkbox" role="switch" data-flag="appear.popup" data-focus="appear.popup" aria-label="${t("w.popup.title")}" ${w.appear.popup ? "checked" : ""} /></div>
        ${
          w.appear.popup
            ? `<div class="place-body">
          <div class="field">
            <label for="w-button">${t("w.button")}</label>
            <input class="input" id="w-button" data-text="appear.button" value="${esc(w.appear.button)}" maxlength="40" autocomplete="off" />
          </div>
          ${w.appear.inline ? "" : site}${snippet("popup")}</div>`
            : ""
        }
      </section>

      <section class="place is-on">
        <div class="place-head">${diagram("window")}<div><h3>${t("w.win.title")}</h3><p>${t("w.win.desc")}</p></div>
          <button class="btn btn-primary btn-small" type="button" data-window>${icon("external")}<span>${t("w.win.view")}</span></button></div>
        <div class="place-body">
          <div class="group-row"><span class="label">${t("w.win.size")}</span>${seg(
            "appear.windowSize",
            [
              ["phone", t("w.win.phone")],
              ["desk", t("w.win.desk")],
            ],
            windowSize(w),
            t("w.win.size")
          )}</div>
          <p class="hint">${t("w.win.hint")}</p>
          ${snippet("window")}
        </div>
      </section>

      <details class="adv">
        <summary><span>${t("w.adv")}</span></summary>
        <p class="hint">${t("w.adv.hint")}</p>
        <div class="link-row"><code>${key}_pk_••••••••••••</code><button class="btn btn-quiet btn-small" type="button" data-pending>${t("w.adv.rotate")}</button></div>
      </details>`;
  }

  // ---------- Sections: look, dates, rules, prices ----------

  function tabLook(w) {
    return `
      <h2>${t("tab.look")}</h2>
      <p class="tab-lede">${t("look.lede")}</p>
      <div class="group-row"><span class="label" id="l-accent">${t("look.accent")}</span>
        <span class="dots" role="group" aria-labelledby="l-accent">${ACCENTS.map(
          (name) =>
            `<button type="button" class="dot dot-${name}" data-pick="look.accent" data-value="${name}" data-focus="accent:${name}" aria-pressed="${
              w.look.accent === name
            }" aria-label="${t("tint." + name)}" title="${t("tint." + name)}"></button>`
        ).join("")}</span></div>
      <div class="group-row"><span class="label">${t("look.theme")}</span>${seg(
        "look.theme",
        [
          ["light", t("theme.light")],
          ["dark", t("theme.dark")],
          ["auto", t("theme.auto")],
        ],
        w.look.theme,
        t("look.theme")
      )}</div>
      <div class="group-row"><span class="label">${t("look.lang")}</span>${seg(
        "look.lang",
        [
          ["vi", t("lang.vi")],
          ["en", t("lang.en")],
          ["both", t("lang.both")],
        ],
        w.look.lang,
        t("look.lang")
      )}</div>
      <div class="field">
        <label for="w-greeting">${t("look.greeting")}</label>
        <input class="input" id="w-greeting" data-text="look.greeting" value="${esc(w.look.greeting)}" maxlength="60" autocomplete="off" aria-describedby="w-greeting-hint" />
        <small id="w-greeting-hint">${t("look.greeting.hint")}</small>
      </div>
      ${flag("look.logo", t("look.logo"), w.look.logo)}`;
  }

  function tabDates(w) {
    const ranged = w.dates.mode === "range";
    return `
      <h2>${t("tab.dates")}</h2>
      <p class="tab-lede">${t("dates.lede")}</p>
      <div class="group-row"><span class="label">${t("dates.mode")}</span>${seg(
        "dates.mode",
        [
          ["always", t("dates.always")],
          ["range", t("dates.range")],
        ],
        w.dates.mode,
        t("dates.mode")
      )}</div>
      ${
        ranged
          ? `<div class="field-pair">
        <div class="field"><label for="w-from">${t("dates.from")}</label><input class="input" id="w-from" type="date" data-text="dates.from" value="${w.dates.from}" /></div>
        <div class="field"><label for="w-to">${t("dates.to")}</label><input class="input" id="w-to" type="date" data-text="dates.to" value="${w.dates.to}" /></div>
      </div>
      <div class="field">
        <label for="w-closed">${t("dates.closed")}</label>
        <input class="input" id="w-closed" data-text="dates.closed" value="${esc(w.dates.closed)}" placeholder="${t("dates.closed.default")}" maxlength="90" autocomplete="off" />
      </div>`
          : ""
      }`;
  }

  function tabRules(w) {
    return `
      <h2>${t("tab.rules")}</h2>
      <p class="tab-lede">${t("rules.lede")}</p>
      <div class="field-pair">
        <div class="field">
          <label for="w-confirm">${t("r.confirm")}</label>
          <select class="input" id="w-confirm" data-text="rules.confirm">
            ${option("shop", t("opt.shop", { v: t("confirm." + SHOP.confirm).toLowerCase() }), w.rules.confirm)}
            ${option("auto", t("confirm.auto"), w.rules.confirm)}
            ${option("manual", t("confirm.manual"), w.rules.confirm)}
          </select>
        </div>
        <div class="field">
          <label for="w-notice">${t("r.notice")}</label>
          <select class="input" id="w-notice" data-text="rules.notice">
            ${option("shop", t("opt.shop", { v: duration(SHOP.notice) }), w.rules.notice)}
            ${[30, 120, 1440, 2880].map((m) => option(m, duration(m), w.rules.notice)).join("")}
          </select>
        </div>
        <div class="field">
          <label for="w-ahead">${t("r.ahead")}</label>
          <select class="input" id="w-ahead" data-text="rules.ahead">
            ${option("shop", t("opt.shop", { v: t("days", { n: SHOP.ahead }) }), w.rules.ahead)}
            ${[7, 14, 30, 60].map((d) => option(d, t("days", { n: d }), w.rules.ahead)).join("")}
          </select>
        </div>
      </div>`;
  }

  // A reduction shown on the widget's first service.
  function priceExample(w) {
    const first = SERVICES[scope(w).offered[0] || SERVICE_ORDER[0]];
    return t("price.example", { name: first[PBM.lang], old: money(first.price), now: money(reduced(w, first.price)) });
  }

  function tabPrice(w) {
    const reducing = w.price.mode !== "none";
    return `
      <h2>${t("tab.price")}</h2>
      <p class="tab-lede">${t("price.lede")}</p>
      <div class="group-row"><span class="label">${t("price.mode")}</span>${seg(
        "price.mode",
        [
          ["none", t("price.none")],
          ["percent", t("price.percent")],
          ["amount", t("price.amount")],
        ],
        w.price.mode,
        t("price.mode")
      )}</div>
      ${
        reducing
          ? `<div class="field field-short">
        <label for="w-value">${t("price.value")}</label>
        <div class="with-unit"><input class="input num" id="w-value" type="number" min="0" step="${
          w.price.mode === "percent" ? 1 : 5000
        }" data-text="price.value" value="${w.price.value}" inputmode="numeric" /><span>${w.price.mode === "percent" ? "%" : "₫"}</span></div>
      </div>
      <p class="hint" id="price-example">${esc(priceExample(w))}</p>`
          : ""
      }`;
  }

  const TAB_BODY = { scope: tabScope, where: tabWhere, look: tabLook, dates: tabDates, rules: tabRules, price: tabPrice };

  // ---------- The path: what the customer is asked ----------

  function renderPath() {
    const w = state.draft;
    const sc = scope(w);
    const fixed = [];
    if (sc.branches.length === 1) fixed.push(t("fixed.branch", { name: sc.branches[0].name }));
    if (sc.offered.length === 1) fixed.push(t("fixed.service", { name: SERVICES[sc.offered[0]][PBM.lang] }));
    if (w.people.pick === "auto") fixed.push(t("fixed.people.auto"));
    else if (sc.people.length === 1) fixed.push(t("fixed.person", { name: sc.people[0].name }));
    if (w.places.pick === "customer" && sc.places.length === 1) fixed.push(t("fixed.place", { name: sc.places[0].name }));

    $("path").innerHTML = `
      <h3>${t("path.title")}</h3>
      <ol>${sc.steps.map((step) => `<li>${t("step." + step)}</li>`).join("")}</ol>
      ${fixed.length ? `<p><b>${t("fixed.title")}</b> ${esc(fixed.join(", "))}.</p>` : ""}`;
  }

  // ---------- The preview: the widget as a customer meets it ----------

  function renderPreview() {
    const w = state.draft;
    const sc = scope(w);
    const pv = state.pv;
    const lang = w.look.lang === "both" ? pv.lang : w.look.lang;
    const words = PV[lang];
    const p = (key, vars) => (typeof words[key] === "function" ? words[key](vars || {}) : words[key]);
    const cash = (n) => money(n, words.locale);
    const length = (m) => (m % 60 === 0 ? words.hours(m / 60) : m > 60 ? `${words.hours(Math.floor(m / 60))} ${words.min(m % 60)}` : words.min(m));
    const pad = (n) => String(n).padStart(2, "0");
    const clock = (m) => pad(Math.floor(m / 60)) + ":" + pad(m % 60);
    const iso = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    const fmt = (opts, d) => new Intl.DateTimeFormat(words.locale, opts).format(d);
    const cap = (text) => text.charAt(0).toUpperCase() + text.slice(1);
    const monthOf = (d) => d.getFullYear() * 12 + d.getMonth();
    // A number that stays the same for the same text: the pretend "is it free?".
    // The last multiply scatters neighbouring texts ("...510", "...540"), so the times do not fall in a pattern.
    const roll = (text) => Math.imul([...text].reduce((n, ch) => (Math.imul(n, 31) + ch.charCodeAt(0)) >>> 0, 7), 2654435761) >>> 16;

    const root = $("pv");
    root.dataset.accent = w.look.accent;
    root.dataset.theme = w.look.theme === "auto" ? document.documentElement.dataset.theme : w.look.theme;
    root.lang = lang;

    const st = status(w);
    const closed = !w.on || ((st.key === "soon" || st.key === "ended") && !pv.live);

    // The days this widget takes bookings on: from today (or from its first
    // day, when a widget that has not opened yet is being tried out) for as far
    // ahead as its rules allow, and never past its last day.
    const ahead = w.rules.ahead === "shop" ? SHOP.ahead : Number(w.rules.ahead);
    const ranged = w.dates.mode === "range" && w.dates.from && w.dates.to;
    const first = ranged && TODAY < dayOf(w.dates.from) ? dayOf(w.dates.from) : TODAY;
    const byRule = new Date(first.getFullYear(), first.getMonth(), first.getDate() + ahead);
    const last = ranged && dayOf(w.dates.to) < byRule ? dayOf(w.dates.to) : byRule;
    const open = (d) => d >= first && d <= last;

    // Settle what the pretend customer has chosen against what the widget offers now.
    const date = pv.date && open(dayOf(pv.date)) ? dayOf(pv.date) : null;
    if (!date) pv.date = null;
    const branchId = sc.branches.length === 1 ? sc.branches[0].id : sc.branches.some((b) => b.id === pv.branch) ? pv.branch : null;
    const branch = BRANCHES.find((b) => b.id === branchId);
    const atBranch = (r) => branchId === null || !r.branch || r.branch === branchId;
    const people = sc.people.filter(atBranch);
    const places = sc.places.filter(atBranch);
    const offered = sc.staffed ? sc.offered.filter((id) => people.some((r) => r.does.includes(id))) : sc.offered;
    pv.basket = offered.length === 1 ? [...offered] : pv.basket.filter((id) => offered.includes(id));
    const minutes = pv.basket.reduce((sum, id) => sum + SERVICES[id].min, 0);

    // Pretend free times. A start is offered only if every chosen service fits
    // before closing, so a longer booking sees fewer and earlier times.
    const opens = branch ? Number(branch.hours.slice(0, 2)) * 60 : OPEN;
    const closes = branch ? Number(branch.hours.slice(-5, -3)) * 60 : CLOSE;
    const slots = [];
    if (date && minutes) {
      const odds = Math.max(3, 7 - Math.floor(minutes / 45));
      for (let m = opens; m + minutes <= closes; m += 30) {
        if (roll(pv.date + (branchId || "") + m) % 10 < odds) slots.push(m);
      }
    }
    if (!slots.includes(pv.slot)) pv.slot = null;

    // Who could take it: people who do at least one of the services. Most are
    // free at the chosen time; the rest are shown as busy, not hidden.
    const able = people.filter((r) => pv.basket.some((id) => r.does.includes(id)));
    const free = pv.slot === null ? [] : able.filter((r) => roll(r.id + pv.date + pv.slot) % 4 !== 0);
    if (pv.slot !== null && !free.length && able.length) free.push(able[0]); // the time was on offer, so someone is free
    if (pv.person !== "any" && !free.some((r) => r.id === pv.person)) pv.person = "any";
    if (pv.place !== "any" && !places.some((r) => r.id === pv.place)) pv.place = "any";
    // The person on the booking: the one the customer asked for, or the only one this widget has.
    const person = free.find((r) => r.id === pv.person) || (w.people.pick === "customer" && people.length === 1 ? people[0] : undefined);

    // A choice that no longer holds sends the customer back to where it is made.
    const steps = sc.steps;
    let at = Math.min(pv.i, steps.length);
    const need = (name, ok) => {
      const i = steps.indexOf(name);
      if (i >= 0 && at > i && !ok) at = i;
    };
    need("date", Boolean(date));
    need("branch", branchId !== null);
    need("services", pv.basket.length > 0);
    need("time", pv.slot !== null);
    pv.i = at;
    const step = steps[pv.i]; // undefined once the booking is sent

    const head = `
      <header class="pv-head">
        ${w.look.logo ? `<span class="pv-logo" aria-hidden="true">${icon("scissors")}</span>` : ""}
        <span class="pv-shop"><strong>${p("shop")}</strong>${
          w.look.greeting ? `<span>${esc(w.look.greeting)}</span>` : branch && sc.branches.length === 1 ? `<span>${esc(branch.address)}</span>` : ""
        }</span>
        ${
          w.look.lang === "both"
            ? `<button type="button" class="pv-lang" data-pv-lang data-focus="pv-lang">${lang === "vi" ? "EN" : "VI"}</button>`
            : ""
        }
      </header>`;

    if (closed) {
      root.innerHTML = head + `<div class="pv-body pv-centre"><p>${esc(!w.on ? p("off") : w.dates.closed || t("dates.closed.default"))}</p></div>`;
      $("pv-live").hidden = !w.on || pv.live;
      return;
    }
    $("pv-live").hidden = true;

    if (!sc.offered.length) {
      root.innerHTML = head + `<div class="pv-body pv-centre"><p>${p("empty")}</p></div>`;
      return;
    }

    const nameOf = (id) => SERVICES[id][lang];
    const priceOf = (id) => {
      const s = SERVICES[id];
      const now = reduced(w, s.price);
      const lead = s.from ? p("from") + " " : "";
      return now === s.price ? lead + cash(now) : `<s>${cash(s.price)}</s> ${lead}${cash(now)}`;
    };
    const when = date ? cap(fmt({ weekday: "long", day: "numeric", month: "numeric" }, date)) : "";

    let title = "";
    let body = "";
    let ready = true;

    if (step === "date") {
      title = p("date");
      ready = Boolean(date);
      // One month at a time, Monday first. It opens on the month of the chosen
      // day, or of the first day that can be booked.
      const shown = Math.min(Math.max(pv.month ?? monthOf(date || first), monthOf(first)), monthOf(last));
      const start = new Date(Math.floor(shown / 12), shown % 12, 1);
      const blanks = (start.getDay() + 6) % 7;
      const daysIn = new Date(start.getFullYear(), start.getMonth() + 1, 0).getDate();
      const heads = Array.from({ length: 7 }, (_, i) => `<b>${fmt({ weekday: "narrow" }, new Date(2026, 9, 12 + i))}</b>`).join("");
      const cells = Array.from({ length: daysIn }, (_, i) => {
        const d = new Date(start.getFullYear(), start.getMonth(), i + 1);
        const on = pv.date === iso(d);
        return `<button type="button" class="pv-date num${on ? " is-on" : ""}${iso(d) === iso(TODAY) ? " is-today" : ""}" data-pv-date="${iso(d)}" data-focus="pvD${iso(d)}" aria-pressed="${on}" aria-label="${cap(
          fmt({ weekday: "long", day: "numeric", month: "long" }, d)
        )}" ${open(d) ? "" : "disabled"}>${i + 1}</button>`;
      }).join("");
      body = `
        <div class="pv-month">
          <strong>${cap(fmt({ month: "long", year: "numeric" }, start))}</strong>
          <button type="button" data-pv-month="${shown - 1}" data-focus="pv-prev" aria-label="${p("prevMonth")}" ${shown > monthOf(first) ? "" : "disabled"}>${icon("left")}</button>
          <button type="button" data-pv-month="${shown + 1}" data-focus="pv-next-month" aria-label="${p("nextMonth")}" ${shown < monthOf(last) ? "" : "disabled"}>${icon("right")}</button>
        </div>
        <div class="pv-cal">${heads}${"<span></span>".repeat(blanks)}${cells}</div>
        <p class="pv-note">${p("dateNote")}</p>`;
    } else if (step === "branch") {
      title = p("branch");
      ready = branchId !== null;
      body = sc.branches
        .map(
          (b) => `<button type="button" class="pv-opt${b.id === branchId ? " is-on" : ""}" data-pv-branch="${b.id}" data-focus="pvb${b.id}" aria-pressed="${
            b.id === branchId
          }"><span class="pv-opt-main"><strong>${esc(b.name)}</strong><span>${esc(b.address)}</span><span class="num">${b.hours}</span></span></button>`
        )
        .join("");
    } else if (step === "services") {
      title = p("services");
      ready = pv.basket.length > 0;
      body = offered
        .map((id) => {
          const on = pv.basket.includes(id);
          return `<label class="pv-opt${on ? " is-on" : ""}"><input class="visually-hidden" type="checkbox" data-pv-svc="${id}" data-focus="pvs${id}" ${
            on ? "checked" : ""
          } /><span class="pv-tick" aria-hidden="true">${icon("check")}</span><span class="pv-opt-main"><strong>${esc(nameOf(id))}</strong><span>${length(
            SERVICES[id].min
          )}</span></span><span class="pv-price num">${priceOf(id)}</span></label>`;
        })
        .join("");
    } else if (step === "time") {
      title = p("time");
      ready = pv.slot !== null;
      const where = branch && sc.branches.length > 1 ? `, ${esc(branch.name)}` : "";
      body = `
        <p class="pv-sub">${when}${where}. ${slots.length ? p("fits", { len: length(minutes) }) : ""}</p>
        ${
          slots.length
            ? `<div class="pv-slots">${slots
                .map(
                  (slot) =>
                    `<button type="button" class="pv-slot num${slot === pv.slot ? " is-on" : ""}" data-pv-slot="${slot}" data-focus="pvt${slot}" aria-pressed="${
                      slot === pv.slot
                    }">${clock(slot)}</button>`
                )
                .join("")}</div>`
            : `<p class="pv-note">${p("noSlots")}</p>`
        }
        ${pv.slot !== null ? `<p class="pv-note">${p("span", { from: clock(pv.slot), to: clock(pv.slot + minutes) })}</p>` : ""}`;
    } else if (step === "person") {
      title = p("person");
      const time = clock(pv.slot);
      const choice = (id, name, sub, busy) =>
        `<label class="pv-opt${pv.person === id ? " is-on" : ""}${busy ? " is-off" : ""}"><input class="visually-hidden" type="radio" name="pv-person" data-pv-person="${id}" data-focus="pvp${id}" ${
          pv.person === id ? "checked" : ""
        } ${busy ? "disabled" : ""} /><span class="pv-tick is-round" aria-hidden="true"></span><span class="pv-opt-main"><strong>${esc(name)}</strong><span>${esc(sub)}</span></span></label>`;
      body =
        `<p class="pv-sub">${p("personSub", { time })}</p>` +
        choice("any", p("any"), p("anySub"), false) +
        able
          .map((r) => {
            const covers = pv.basket.filter((id) => r.does.includes(id));
            const what = covers.length === pv.basket.length ? p("doesAll") : p("does", { list: covers.map(nameOf).join(", ") });
            return free.includes(r) ? choice(r.id, r.name, what, false) : choice(r.id, r.name, p("busyAt", { time }), true);
          })
          .join("");
      if (person && !pv.basket.every((id) => person.does.includes(id))) body += `<p class="pv-note">${p("rest")}</p>`;
    } else if (step === "place") {
      title = p("place");
      const choice = (id, name) =>
        `<label class="pv-opt${pv.place === id ? " is-on" : ""}"><input class="visually-hidden" type="radio" name="pv-place" data-pv-place="${id}" data-focus="pvc${id}" ${
          pv.place === id ? "checked" : ""
        } /><span class="pv-tick is-round" aria-hidden="true"></span><span class="pv-opt-main"><strong>${esc(name)}</strong></span></label>`;
      body = choice("any", p("anyPlace")) + places.map((r) => choice(r.id, r.name)).join("");
    } else if (step === "details") {
      title = p("details");
      const summary = [
        when,
        `${clock(pv.slot)} – ${clock(pv.slot + minutes)}`,
        branch ? esc(branch.name) : "",
        person ? p("with", { name: esc(person.name) }) : "",
      ]
        .filter(Boolean)
        .join(", ");
      body = `
        <p class="pv-sub">${summary}.</p>
        <label class="pv-field"><span>${p("name")}</span><input type="text" autocomplete="off" /></label>
        <label class="pv-field"><span>${p("phone")}</span><input type="tel" autocomplete="off" inputmode="tel" /></label>
        <label class="pv-field"><span>${p("email")}</span><input type="email" autocomplete="off" inputmode="email" /></label>
        <p class="pv-note">${p("emailNote")}</p>`;
    } else {
      const confirm = w.rules.confirm === "shop" ? SHOP.confirm : w.rules.confirm;
      root.innerHTML =
        head +
        `<div class="pv-body pv-centre"><span class="pv-done" aria-hidden="true">${icon("check")}</span><p>${
          confirm === "auto" ? p("doneAuto") : p("doneManual")
        }</p><a class="pv-manage" href="/dashboard/manage">${p("manage")}</a><p class="pv-note">${p("manageNote")}</p><button type="button" class="pv-btn is-quiet" data-pv-restart data-focus="pv-restart">${p("again")}</button></div>`;
      return;
    }

    // The bill: each service on its own line, then the total. No break is added.
    let bill = "";
    if (pv.basket.length && steps.indexOf("services") <= pv.i) {
      const full = pv.basket.reduce((sum, id) => sum + SERVICES[id].price, 0);
      const now = pv.basket.reduce((sum, id) => sum + reduced(w, SERVICES[id].price), 0);
      const from = pv.basket.some((id) => SERVICES[id].from) ? p("from") + " " : "";
      bill = `<table class="pv-bill">
          <tbody>${pv.basket
            .map((id) => `<tr><th scope="row">${esc(nameOf(id))}</th><td>${length(SERVICES[id].min)}</td><td class="num">${
                SERVICES[id].from ? p("from") + " " : ""
              }${cash(SERVICES[id].price)}</td></tr>`)
            .join("")}${now < full ? `<tr class="is-less"><th scope="row">${p("discount")}</th><td></td><td class="num">−${cash(full - now)}</td></tr>` : ""}</tbody>
          <tfoot><tr><th scope="row">${p("total")}</th><td>${length(minutes)}</td><td class="num">${from}${cash(now)}</td></tr></tfoot>
        </table>`;
    }

    root.innerHTML = `${head}
      <div class="pv-progress" aria-hidden="true"><i style="--p:${(pv.i + 1) / steps.length}"></i></div>
      <div class="pv-body">
        <p class="pv-step">${p("step", { i: pv.i + 1, n: steps.length })}</p>
        <h4>${title}</h4>
        ${body}
      </div>
      <footer class="pv-foot">
        ${bill}
        <div class="pv-actions">
          ${pv.i > 0 ? `<button type="button" class="pv-btn is-quiet" data-pv-back data-focus="pv-back">${p("back")}</button>` : ""}
          <button type="button" class="pv-btn" data-pv-next data-focus="pv-next" ${ready ? "" : "disabled"}>${step === "details" ? p("book") : p("next")}</button>
        </div>
      </footer>`;
  }

  // ---------- The editor ----------

  function renderTab() {
    $("tab").innerHTML = TAB_BODY[state.tab](state.draft);
    document.querySelectorAll("[data-tab]").forEach((btn) => btn.setAttribute("aria-current", String(btn.dataset.tab === state.tab)));
  }

  function renderEditor() {
    const w = state.draft;
    const isNew = !WIDGETS.some((item) => item.id === w.id);
    document.title = t("doc.title");
    $("view").innerHTML = `
      <header class="ed-head">
        <button class="btn btn-quiet btn-small" type="button" data-back>${icon("left")}${t("back")}</button>
        <div class="ed-name">
          <input id="w-name" data-text="name" value="${esc(w.name)}" placeholder="${t("name.placeholder")}" aria-label="${t("name.label")}" aria-describedby="w-name-error" autocomplete="off" />
          <span class="error" id="w-name-error" hidden>${t("name.error")}</span>
        </div>
        <label class="ed-on"><span>${t("on")}</span><input class="switch" type="checkbox" role="switch" data-flag="on" data-focus="on" ${w.on ? "checked" : ""} /></label>
        ${isNew || w.isDefault ? "" : `<button class="btn btn-quiet btn-danger" type="button" data-delete aria-label="${t("delete")}" title="${t("delete")}">${icon("trash")}<span></span></button>`}
        <button class="btn btn-primary" type="button" data-save>${icon("check")}${t("save")}</button>
      </header>
      <div class="ed">
        <nav class="panel ed-tabs" aria-label="${t("tabs.label")}">
          ${TABS.map(([id, glyph]) => `<button type="button" data-tab="${id}" data-focus="tab:${id}">${icon(glyph)}<span>${t("tab." + id)}</span></button>`).join("")}
        </nav>
        <section class="panel ed-form" id="tab"></section>
        <aside class="ed-side">
          <div class="side-head"><h2>${t("preview")}</h2><span>${t("preview.note")}</span>
            <button class="btn btn-quiet btn-small side-window" type="button" data-window>${icon("external")}<span>${t("preview.window")}</span></button></div>
          <div class="pv" id="pv"></div>
          <button class="btn btn-quiet btn-small" type="button" id="pv-live" data-pv-live hidden>${t("preview.live")}</button>
          <div class="panel path" id="path"></div>
        </aside>
      </div>
      <p class="note">${t("note")}</p>`;
    renderTab();
    renderPath();
    renderPreview();
  }

  function openEditor(id) {
    const source = WIDGETS.find((w) => w.id === id);
    state.draft = source
      ? clone(source)
      : {
          ...clone(WIDGETS[0]),
          id: "new",
          isDefault: false,
          name: "",
          path: "",
          week: 0,
          look: { accent: "burgundy", theme: "light", lang: "vi", logo: true, greeting: "" },
        };
    state.tab = "scope";
    state.sureToDelete = false;
    state.pv = freshPreview();
    state.openedAs = state.draft.id;
    history.replaceState(null, "", "#" + state.draft.id);
    renderEditor();
    scrollTo(0, 0);
    (source ? document.querySelector("[data-tab]") : $("w-name")).focus();
  }

  function closeEditor() {
    state.draft = null;
    history.replaceState(null, "", location.pathname);
    renderList();
    scrollTo(0, 0);
  }

  function save() {
    const w = state.draft;
    w.name = w.name.trim();
    $("w-name").setAttribute("aria-invalid", String(!w.name));
    $("w-name-error").hidden = Boolean(w.name);
    if (!w.name) return $("w-name").focus();

    const at = WIDGETS.findIndex((item) => item.id === w.id);
    if (at < 0) {
      w.path = slugify(w.name);
      w.id = w.path || "widget-" + (WIDGETS.length + 1);
      WIDGETS.push(clone(w));
      history.replaceState(null, "", "#" + w.id);
      publish();
      renderEditor();
      return toast(t("added", { name: w.name }));
    }
    WIDGETS[at] = clone(w);
    toast(t("saved", { name: w.name }));
  }

  // After a setting changes: redraw what depends on it. A change to what the
  // widget offers also sends the preview's pretend customer back to the start.
  function changed(redrawTab, restart = false) {
    if (restart) state.pv = { ...freshPreview(), lang: state.pv.lang, live: state.pv.live };
    if (redrawTab) keepFocus(renderTab);
    renderPath();
    renderPreview();
    publish();
  }

  // ---------- The widget in a window of its own ----------

  // The editor leaves the widget it is showing in localStorage. The window is
  // another page of the same site: it reads that, and redraws when it changes.
  // So the window follows the draft, saved or not. Nothing leaves the browser.
  const WINDOW_KEY = "pbm-widget-window";
  const WINDOW_MAX_AGE = 12 * 60 * 60 * 1000; // an old draft is not what the owner is looking at now

  function publish() {
    if (!state.draft) return;
    try {
      localStorage.setItem(
        WINDOW_KEY,
        JSON.stringify({ id: state.draft.id, was: state.openedAs, draft: state.draft, at: Date.now() })
      );
    } catch {
      /* storage can be blocked; the window then shows the saved sample */
    }
  }

  // The draft the editor left for this widget, if it is recent.
  function published(id) {
    try {
      const left = JSON.parse(localStorage.getItem(WINDOW_KEY));
      if (left && (left.id === id || left.was === id) && Date.now() - left.at < WINDOW_MAX_AGE) return left.draft;
    } catch {
      /* nothing readable there: fall back to the sample */
    }
    return null;
  }

  // One window per size, so each opens at the size it was asked for.
  function openWindow() {
    const w = state.draft;
    publish();
    const size = windowSize(w);
    const [width, height] = WINDOW_SIZE[size];
    const win = window.open(`${location.pathname}?window=${encodeURIComponent(w.id)}`, "pbm-widget-" + size, `popup,width=${width},height=${height}`);
    if (!win) return toast(t("win.blocked"));
    win.focus();
  }

  // The window itself: only the widget, as a customer meets it.
  function showWindow(id) {
    document.documentElement.lang = PBM.lang;
    $("sidebar")?.remove();
    $("topbar")?.remove();
    $("view").innerHTML = `<p class="win-note" id="win-note"></p>
      <div class="pv" id="pv"></div>
      <button class="btn btn-quiet btn-small" type="button" id="pv-live" data-pv-live hidden>${t("preview.live")}</button>`;
    state.pv = freshPreview();
    const refresh = () => {
      const left = published(id);
      state.draft = left || clone(WIDGETS.find((w) => w.id === id) || WIDGETS[0]);
      $("win-note").textContent = t(left ? "win.note.draft" : "win.note.saved");
      document.title = t("win.title", { name: state.draft.name || t("name.placeholder") });
      keepFocus(renderPreview);
    };
    refresh();
    addEventListener("storage", (event) => {
      if (event.key === WINDOW_KEY) refresh();
    });
  }

  // ---------- Events ----------

  const view = $("view");

  view.addEventListener("click", (event) => {
    const el = event.target.closest(
      "[data-edit],[data-new],[data-copy],[data-back],[data-save],[data-delete],[data-tab],[data-pick],[data-all],[data-copy-link],[data-copy-code],[data-window]," +
        "[data-pv-date],[data-pv-month],[data-pv-branch],[data-pv-slot],[data-pv-next],[data-pv-back],[data-pv-lang],[data-pv-live],[data-pv-restart]"
    );
    if (!el) return;
    const d = el.dataset;

    // The list
    if (d.edit) return openEditor(d.edit);
    if ("new" in d) return openEditor(null);
    if (d.copy) {
      navigator.clipboard?.writeText("https://" + linkOf(WIDGETS.find((w) => w.id === d.copy))).catch(() => {});
      return toast(t("copied"));
    }

    // The editor
    const w = state.draft;
    if (!w) return;
    if ("back" in d) return closeEditor();
    if ("save" in d) return save();
    if ("window" in d) return openWindow();
    if ("delete" in d) {
      if (!state.sureToDelete) {
        state.sureToDelete = true;
        el.classList.add("is-sure");
        el.querySelector("span").textContent = t("delete.sure");
        return;
      }
      WIDGETS.splice(WIDGETS.findIndex((item) => item.id === w.id), 1);
      toast(t("deleted", { name: w.name }));
      return closeEditor();
    }
    if (d.tab) {
      state.tab = d.tab;
      return keepFocus(renderTab);
    }
    if (d.pick) {
      setPath(w, d.pick, d.value);
      if (d.pick === "price.mode" && d.value !== "none" && !w.price.value) w.price.value = d.value === "percent" ? 10 : 10000;
      return changed(true, d.pick.endsWith(".pick"));
    }
    if (d.all) {
      w.services.ids = [...SERVICE_ORDER];
      return changed(true, true);
    }
    if ("copyLink" in d) {
      navigator.clipboard?.writeText("https://" + linkOf(w)).catch(() => {});
      return toast(t("copied"));
    }
    if (d.copyCode) {
      navigator.clipboard?.writeText(el.closest(".field").querySelector("code").textContent).catch(() => {});
      return toast(t("w.code.copied"));
    }

    // The preview
    const pv = state.pv;
    // Each choice clears the ones made after it, because they were made for it.
    if (d.pvDate) Object.assign(pv, { date: d.pvDate, slot: null, person: "any" });
    else if (d.pvMonth) pv.month = Number(d.pvMonth);
    else if (d.pvBranch) Object.assign(pv, { branch: d.pvBranch, slot: null, person: "any" });
    else if (d.pvSlot) Object.assign(pv, { slot: Number(d.pvSlot), person: "any" });
    else if ("pvNext" in d) pv.i += 1;
    else if ("pvBack" in d) pv.i -= 1;
    else if ("pvLang" in d) pv.lang = pv.lang === "vi" ? "en" : "vi";
    else if ("pvLive" in d) pv.live = true;
    else if ("pvRestart" in d) state.pv = { ...freshPreview(), lang: pv.lang, live: pv.live };
    keepFocus(renderPreview);
  });

  view.addEventListener("change", (event) => {
    const el = event.target;
    const d = el.dataset;

    // The list: turning a widget on or off
    if (d.toggle) {
      WIDGETS.find((w) => w.id === d.toggle).on = el.checked;
      return keepFocus(renderList);
    }

    const w = state.draft;
    if (!w) return;
    if (d.list) {
      const id = el.value;
      const list = w[d.list].ids;
      if (el.checked) list.push(id);
      else list.splice(list.indexOf(id), 1);
      return changed(true, true);
    }
    if (d.flag) {
      setPath(w, d.flag, el.checked);
      // The switches that open a block of settings redraw the section.
      return changed(d.flag.startsWith("appear."));
    }

    // The preview's own ticks
    const pv = state.pv;
    if (d.pvSvc) {
      if (el.checked) pv.basket.push(d.pvSvc);
      else pv.basket = pv.basket.filter((id) => id !== d.pvSvc);
      Object.assign(pv, { slot: null, person: "any" }); // a different length needs a different time
    } else if (d.pvPerson) pv.person = d.pvPerson;
    else if (d.pvPlace) pv.place = d.pvPlace;
    else return;
    keepFocus(renderPreview);
  });

  // Typed values: kept as they are typed, without redrawing the field itself.
  view.addEventListener("input", (event) => {
    const el = event.target;
    const path = el.dataset.text;
    if (!path || !state.draft) return;
    let value = el.value;
    if (el.type === "number") value = Math.max(0, Number(value) || 0);
    else if (el.tagName === "SELECT" && value !== "" && !Number.isNaN(Number(value))) value = Number(value);
    setPath(state.draft, path, value);
    changed(false);
    // The things on the page that quote a typed value.
    if (path === "price.value") $("price-example").textContent = priceExample(state.draft);
    if (path === "appear.button") {
      $("code-popup").textContent = codeFor(state.draft, "popup");
      $("code-window").textContent = codeFor(state.draft, "window");
    }
  });

  // ?window=<id> draws the widget alone; there is no dashboard around it to redraw.
  const inWindow = new URLSearchParams(location.search).get("window");
  PBM.onChange(() => {
    if (inWindow === null) state.draft ? keepFocus(renderEditor) : renderList();
  });

  if (inWindow !== null) showWindow(inWindow);
  else {
    PBM.mount("widgets");
    const asked = decodeURIComponent(location.hash.slice(1));
    if (WIDGETS.some((w) => w.id === asked)) openEditor(asked);
    else renderList();
  }
})();
