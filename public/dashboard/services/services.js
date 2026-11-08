/* Dịch vụ: the shop's menu as large tiles, and the editor that opens one
   service on the stage (shell.js). The data is the sample shop in
   assets/sample.js, kept in this browser by assets/store.js; nothing is sent
   anywhere.

   The logic this page draws is a first draft (Sonny, 2026-10-13):
     - Customers book through one widget. A service is an item on its menu,
       not a booking page of its own.
     - A customer may put several services in one booking.
     - Rules live on the service (Sonny, 4 November, after Trung's proposal
       on 3 November): its hours, notice, how far ahead, buffers and
       confirmation. The shop no longer sets them for every service.
     - Whether a service shows on the booking page is up to each widget,
       not the service (3 November).
     - Each service lists who can do it. The customer may pick a person or
       leave it to the shop.
     - How several services are staffed is a shop setting: one person for the
       whole visit, or handed from one staff member to the next. */
(function () {
  "use strict";

  const { t, icon, toast } = PBM;
  const { SHOP, STAFF, SERVICES, SERVICE_ORDER, SCHEDULES, BRANCHES, RESOURCES, RESOURCE_TYPES } = PBM_SAMPLE;

  const plural = (n, one, many) => (n === 1 ? one : many);

  PBM.addStrings({
    vi: {
      "doc.title": "Dịch vụ | pleasebookme",
      "page.title": "Dịch vụ",
      lede: ({ n, h }) =>
        `${n} dịch vụ trên trang đặt lịch${h ? `, ${h} đang ẩn` : ""}. Khách có thể chọn nhiều dịch vụ trong một lần đặt.`,
      "lede.none": "Dịch vụ là thứ khách chọn khi đặt lịch, như cắt tóc hay uốn.",
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
      "move.up": "Đưa {name} lên trên",
      "move.down": "Đưa {name} xuống dưới",
      "move.prev": "Đưa {name} lên trước",
      "move.next": "Đưa {name} ra sau",
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
      from: ({ p }) => `từ ${p}`,
      "tile.rules": ({ list }) => `Quy định riêng: ${list}`,
      "rule.manual": "tiệm xác nhận",
      "rule.solo": "chỉ đặt riêng",
      min: ({ n }) => `${n} phút`,
      hours: ({ n }) => `${n} giờ`,
      days: ({ n }) => `${n} ngày`,
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
      "f.photo.hint": "Ảnh của tiệm làm nền cho ô dịch vụ; chưa có ảnh thì ô dùng màu nền. Trong bản mẫu, ảnh chỉ được lưu trong trình duyệt này.",
      "f.tint": "Màu nền",
      "tint.glacier": "Xanh băng",
      "tint.black": "Đen",
      "tint.burgundy": "Đỏ rượu",
      "tint.silver": "Bạc",
      "f.staff": "Ai làm dịch vụ này",
      "f.staff.error": "Chọn ít nhất một người.",
      "f.staff.hint": "Khách chọn giờ trước. Sau đó, nếu muốn, khách chọn một người đang rảnh vào giờ ấy.",
      "f.link.copy": "Sao chép",
      "f.link.copied": "Đã sao chép",
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
      "col.length": "Duration",
      "col.price": "Price",
      "col.who": "Staff",
      "col.rules": "Rules",
      "move.up": "Move {name} up",
      "move.down": "Move {name} down",
      "move.prev": "Move {name} earlier",
      "move.next": "Move {name} later",
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
      from: ({ p }) => `from ${p}`,
      "tile.rules": ({ list }) => `Own rules: ${list}`,
      "rule.manual": "requires confirmation",
      "rule.solo": "booked on its own",
      min: ({ n }) => `${n} min`,
      hours: ({ n }) => `${n} ${plural(n, "hour", "hours")}`,
      days: ({ n }) => `${n} ${plural(n, "day", "days")}`,
      "w.close": "Close",
      "f.name": "Service name",
      "f.name.empty": "Service name",
      "f.name.error": "Give the service a name.",
      "f.line": "Short description",
      "f.line.hint": "One sentence, shown right under the name.",
      "f.min": "Duration",
      "f.min.unit": "min",
      "f.price": "Price",
      "f.from": "This is a starting price, shown as “from …”",
      "f.photo": "Photo and background",
      "f.photo.pick": "Choose a photo",
      "f.photo.remove": "Remove photo",
      "f.photo.hint": "Your photo fills the tile; without one the tile uses the background color. In this mockup the photo is kept in this browser only.",
      "f.tint": "Background color",
      "tint.glacier": "Glacier",
      "tint.black": "Black",
      "tint.burgundy": "Burgundy",
      "tint.silver": "Silver",
      "f.staff": "Who does this service",
      "f.staff.error": "Choose at least one person.",
      "f.staff.hint": "Customers choose a time first. Then, if they wish, they choose one of the people free at that time.",
      "f.link.copy": "Copy",
      "f.link.copied": "Copied",
      save: "Save",
      cancel: "Cancel",
      delete: "Delete service",
      "delete.sure": "Click again to delete",
      "toast.saved": "Saved {name}",
      "toast.added": "Added {name}",
      "toast.deleted": "Deleted {name}",
      note: "Sample data. This is a design mockup, not connected to the system.",
    },
  });

  // The editor on the stage, its five parts and the new staff form (4 November).
  PBM.addStrings({
    vi: {
      lede: ({ n }) => `${n} dịch vụ trên menu. Khách có thể chọn nhiều dịch vụ trong một lần đặt.`,
      "basket.sub": "Ai làm khi một lịch hẹn có nhiều dịch vụ. Mỗi dịch vụ vẫn giữ thời lượng và giá của nó.",
      "f.photo": "Ảnh bìa và màu nền",
      "f.photo.hint": "Ảnh ngang (16:9) làm nền cho ô dịch vụ và phần đầu trang đặt lịch; chưa có ảnh thì dùng màu nền. Trong bản mẫu, ảnh chỉ lưu trong trình duyệt này.",
      "rules.none": "Mặc định",
      "tile.rules": ({ list }) => `Quy định: ${list}`,
      "rule.buffer": ({ d }) => `nghỉ ${d}`,
      "rule.nocancel": "không huỷ online",
      "rule.noreschedule": "không đổi giờ online",
      "delete.sure": "Bấm lần nữa. Lịch cũ và số liệu vẫn giữ dịch vụ này",
      "toast.deleted": "Đã xoá {name}. Lịch hẹn đã đặt vẫn giữ dịch vụ này.",
      "kind.new": "Dịch vụ mới",
      "kind.edit": "Dịch vụ",
      untitled: "Chưa đặt tên",
      "tabs.label": "Các phần của dịch vụ",
      "tab.setup": "Thiết lập",
      "tab.availability": "Giờ nhận khách",
      "tab.form": "Biểu mẫu đặt lịch",
      "tab.experience": "Trải nghiệm đặt lịch",
      "tab.policy": "Quy định",
      "f.slug": "Đường dẫn",
      "f.slug.hint": "Tạo từ tên. Bạn có thể đổi trước khi lưu.",
      "f.staff.add": "Thêm nhân viên",
      "f.staff.none": "Chưa có ai nhận lịch. Thêm nhân viên đầu tiên ngay tại đây; họ cũng hiện trong Tài nguyên.",
      "f.preview": "Trên menu",
      "av.lede": "Dịch vụ nhận khách theo giờ làm việc nào. Khách chỉ thấy các giờ nằm trong đó.",
      "av.schedule": "Giờ làm việc",
      "av.none": "Chưa có giờ làm việc",
      "av.none.hint": "Khách chưa đặt được dịch vụ này cho đến khi tiệm có giờ làm việc.",
      "av.make": "Đặt giờ làm việc",
      "av.zone": "Múi giờ",
      "bf.lede": "Những gì khách điền sau khi chọn giờ.",
      "bf.fixed": "Luôn hỏi",
      "bf.name": "Tên",
      "bf.phone": "Số điện thoại",
      "bf.email": "Email",
      "bf.note": "Ghi chú cho tiệm",
      "bf.required": "Bắt buộc",
      "bf.optional": "Không bắt buộc",
      "bf.own": "Câu hỏi riêng",
      "bf.later": "Bản sau",
      "bf.own.hint": "Hỏi điều tiệm cần biết, như dị ứng hay lần nhuộm gần nhất. Có trong bản sau.",
      "bf.q": "Câu hỏi",
      "bf.q.example": "Bạn có nhuộm tóc trong tháng qua không?",
      "bf.type": "Kiểu trả lời",
      "bf.type.text": "Chữ ngắn",
      "bf.type.long": "Chữ dài",
      "bf.type.number": "Số",
      "bf.type.check": "Ô đánh dấu",
      "bf.type.one": "Chọn một",
      "bf.type.many": "Chọn nhiều",
      "bf.options": "Các lựa chọn",
      "bf.yes": "Có",
      "bf.no": "Không",
      "bf.add": "Thêm câu hỏi",
      "be.lede": "Điều xảy ra với khách khi đặt và sau khi đặt.",
      "be.confirm": "Cần tiệm xác nhận",
      "be.confirm.hint": "Tiệm duyệt từng lịch trước khi chốt. Tắt thì lịch được chốt ngay.",
      "be.combine": "Đặt được cùng dịch vụ khác",
      "be.combine.hint": "Tắt thì khách chỉ đặt riêng dịch vụ này.",
      "be.redirect": "Trang sau khi đặt",
      "be.redirect.hint": "Không bắt buộc. Đưa khách tới trang của tiệm sau khi đặt, thay cho màn hình xác nhận.",
      "po.lede": "Khi nào đặt được dịch vụ này, và khách được tự thay đổi những gì.",
      "po.notice": "Báo trước tối thiểu",
      "po.notice.hint": "Khách phải đặt trước giờ bắt đầu ít nhất bao lâu.",
      "po.ahead": "Giới hạn đặt trước",
      "po.ahead.hint": "Khách được đặt xa nhất bao nhiêu ngày tới.",
      "po.before": "Nghỉ trước",
      "po.after": "Nghỉ sau",
      "po.buffer.hint": "Thời gian để trống quanh mỗi lịch. Để 0 thì lịch hẹn dài đúng bằng các dịch vụ.",
      "po.per": "Số lịch sắp tới mỗi khách",
      "po.per.ph": "Không giới hạn",
      "po.nocancel": "Tắt huỷ online",
      "po.nocancel.hint": "Khách gọi cho tiệm để huỷ.",
      "po.noresched": "Tắt đổi giờ online",
      "po.noresched.hint": "Khách gọi cho tiệm để đổi giờ.",
      "unit.min": "phút",
      "unit.hour": "giờ",
      "unit.day": "ngày",
      "st.kind": "Nhân viên mới",
      "st.lede": "Người nhận lịch. Họ được thêm vào Tài nguyên (Nhân viên) và vào dịch vụ này.",
      "st.name": "Tên",
      "st.name.ph": "Trang",
      "st.name.error": "Nhập tên người này.",
      "st.note": "Ghi chú",
      "st.note.ph": "Làm gì, như cắt và cạo",
      "st.branch": "Chi nhánh",
      "st.branch.none": "Không thuộc chi nhánh nào",
      "st.code": "Màu trên lịch",
      "st.code.n": ({ n }) => `Màu ${n}`,
      "st.save": "Thêm nhân viên",
      "st.added": ({ name }) => `Đã thêm ${name} vào nhân viên`,
    },
    en: {
      lede: ({ n }) => `${n} ${plural(n, "service", "services")} on the menu. A customer can pick several services in one booking.`,
      "basket.sub": "Who does the work when one booking holds several services. Each keeps its own duration and price.",
      "f.photo": "Cover photo and background",
      "f.photo.hint": "A landscape photo (16:9) fills the tile and the top of the booking page; without one the tile uses the background color. In this mockup the photo is kept in this browser only.",
      "rules.none": "Standard",
      "tile.rules": ({ list }) => `Rules: ${list}`,
      "rule.buffer": ({ d }) => `${d} buffer`,
      "rule.nocancel": "no online cancelling",
      "rule.noreschedule": "no online rescheduling",
      "delete.sure": "Click again. Past bookings and analytics keep it",
      "toast.deleted": "Deleted {name}. Bookings already made keep it.",
      "kind.new": "New service",
      "kind.edit": "Service",
      untitled: "Untitled",
      "tabs.label": "Parts of this service",
      "tab.setup": "Setup",
      "tab.availability": "Availability",
      "tab.form": "Booking form",
      "tab.experience": "Booking experience",
      "tab.policy": "Policy",
      "f.slug": "Link",
      "f.slug.hint": "Made from the name. You can change it before saving.",
      "f.staff.add": "Add a staff member",
      "f.staff.none": "Nobody can take bookings yet. Add the first staff member right here; they also appear in Resources.",
      "f.preview": "On the menu",
      "av.lede": "Which working hours this service is booked in. Customers only see times inside them.",
      "av.schedule": "Schedule",
      "av.none": "No working hours yet",
      "av.none.hint": "Customers cannot book this service until the shop has working hours.",
      "av.make": "Set working hours",
      "av.zone": "Timezone",
      "bf.lede": "What the customer fills in after picking a time.",
      "bf.fixed": "Always asked",
      "bf.name": "Name",
      "bf.phone": "Phone number",
      "bf.email": "Email",
      "bf.note": "Note to the shop",
      "bf.required": "Required",
      "bf.optional": "Optional",
      "bf.own": "Your own questions",
      "bf.later": "Later",
      "bf.own.hint": "Ask what the shop needs to know, such as an allergy or the last color. Coming in a later version.",
      "bf.q": "Question",
      "bf.q.example": "Have you colored your hair in the last month?",
      "bf.type": "Answer type",
      "bf.type.text": "Short text",
      "bf.type.long": "Long text",
      "bf.type.number": "Number",
      "bf.type.check": "Checkbox",
      "bf.type.one": "Single choice",
      "bf.type.many": "Multiple choice",
      "bf.options": "Options",
      "bf.yes": "Yes",
      "bf.no": "No",
      "bf.add": "Add a question",
      "be.lede": "What happens for the customer while they book, and after.",
      "be.confirm": "Requires confirmation",
      "be.confirm.hint": "The shop accepts each booking before it is final. Off: booked at once.",
      "be.combine": "Can be booked with other services",
      "be.combine.hint": "Off: customers book it on its own.",
      "be.redirect": "Page after booking",
      "be.redirect.hint": "Optional. Send customers to your own page once booked, instead of the confirmation screen.",
      "po.lede": "When this service can be booked, and what a customer may change themselves.",
      "po.notice": "Minimum notice",
      "po.notice.hint": "How long before the start a customer must book.",
      "po.ahead": "Limit future bookings",
      "po.ahead.hint": "How many days ahead customers can book.",
      "po.before": "Buffer before",
      "po.after": "Buffer after",
      "po.buffer.hint": "Time kept free around each booking. At 0, a booking is exactly as long as its services.",
      "po.per": "Upcoming bookings per customer",
      "po.per.ph": "No limit",
      "po.nocancel": "Disable cancelling",
      "po.nocancel.hint": "Customers call the shop to cancel.",
      "po.noresched": "Disable rescheduling",
      "po.noresched.hint": "Customers call the shop to move the booking.",
      "unit.min": "minutes",
      "unit.hour": "hours",
      "unit.day": "days",
      "st.kind": "New staff member",
      "st.lede": "Someone who takes bookings. They are added to Resources as Staff, and to this service.",
      "st.name": "Name",
      "st.name.ph": "Trang",
      "st.name.error": "Give them a name.",
      "st.note": "Note",
      "st.note.ph": "What they do, such as cuts and shaves",
      "st.branch": "Branch",
      "st.branch.none": "No branch",
      "st.code": "Color on the calendar",
      "st.code.n": ({ n }) => `Color ${n}`,
      "st.save": "Add staff member",
      "st.added": ({ name }) => `Added ${name} to the staff`,
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
    order: SERVICE_ORDER, // the saved menu order itself, so a move or a delete is kept
    view: "tiles", // "tiles" or "table": two ways to look at the same menu
    sorting: false,
    basket: SHOP.basket,
    draft: null, // the service open on the stage, edited as a copy until saved
    tab: "setup", // which of its five parts is showing
    slugEdited: false, // the link follows the name until the owner types one
    staffDraft: null, // the new staff member beside it, while that form is open
    sureToDelete: false,
    entering: true,
  };

  try {
    if (localStorage.getItem("pbm-svc-view") === "table") state.view = "table";
  } catch {
    /* no storage: the page just opens on the tiles */
  }

  const $ = (id) => document.getElementById(id);
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
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

  // A service's rules, read the same way whatever saved them. A shop saved
  // before 4 November says "shop" for a rule the shop set; that now reads as
  // the shop's value, because rules live on the service. Its "days" rule is
  // gone: the service's schedule says when it is offered.
  const policyOf = (r = {}) => ({
    confirm: !r.confirm || r.confirm === "shop" ? SHOP.confirm : r.confirm,
    combine: r.combine === "solo" ? "solo" : "yes",
    redirect: r.redirect || "",
    notice: r.notice == null || r.notice === "shop" ? SHOP.notice : r.notice,
    ahead: r.ahead == null || r.ahead === "shop" ? SHOP.ahead : r.ahead,
    before: r.before || 0,
    after: r.after || 0,
    perCustomer: r.perCustomer || null,
    noCancel: Boolean(r.noCancel),
    noReschedule: Boolean(r.noReschedule),
  });

  // A service as the page shows it, in the current language. The editor edits
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
      schedule: "schedule" in s ? s.schedule : (SCHEDULES[0]?.id ?? null),
      timezone: s.timezone || "Asia/Saigon",
      rules: policyOf(s.rules),
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
    schedule: SCHEDULES[0]?.id ?? null,
    timezone: "Asia/Saigon",
    // A new service starts from the server's defaults (Trung's service form):
    // confirmed at once, two hours' notice, up to 90 days ahead, no buffers.
    rules: policyOf({ confirm: "auto", notice: 120, ahead: 90 }),
  });

  // What a service does differently from a plain booking, in words.
  function ownRules(rules) {
    const list = [];
    if (rules.confirm === "manual") list.push(t("rule.manual"));
    if (rules.combine === "solo") list.push(t("rule.solo"));
    if (rules.before || rules.after) list.push(t("rule.buffer", { d: duration(Math.max(rules.before, rules.after)) }));
    if (rules.noCancel) list.push(t("rule.nocancel"));
    if (rules.noReschedule) list.push(t("rule.noreschedule"));
    return list;
  }

  // ---------- Heading ----------

  function renderHead() {
    $("title").textContent = t("page.title");
    $("lede").textContent = state.order.length ? t("lede", { n: state.order.length }) : t("lede.none");
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

  // ---------- Several services in one booking ----------
  // The one setting left for the whole shop on this page; the rest moved onto
  // each service on 4 November. It decides how a booking with several
  // services is staffed, with an example from the menu.

  function renderShop() {
    const shop = $("shop");
    shop.hidden = state.order.length < 2; // one service has nothing to combine
    if (shop.hidden) return (shop.innerHTML = "");
    shop.innerHTML = `
      <div class="shop-main">
        <h2 id="shop-title">${t("basket.label")}</h2>
        <p class="shop-sub">${t("basket.sub")}</p>
        <div class="seg" id="basketSeg" role="group" aria-labelledby="shop-title" style="--n:2;--i:${state.basket === "one" ? 0 : 1}">
          <button type="button" data-basket="one" aria-pressed="${state.basket === "one"}">${t("basket.one")}</button>
          <button type="button" data-basket="split" aria-pressed="${state.basket === "split"}">${t("basket.split")}</button>
        </div>
      </div>
      <div class="shop-basket"><div class="example" id="example" aria-live="polite"></div></div>`;
    renderExample();
  }

  // Shows what the setting means with two real services from the menu: by
  // choice a pair that no single staff member can do. The two are listed like
  // a bill, each with its length and price and then the total. Nothing is
  // added between them or after them: a booking is as long as its services.
  function renderExample() {
    if (!$("example")) return; // one service has nothing to combine, so the panel is not drawn
    const open = state.order.map((id) => SERVICES[id]).filter((s) => policyOf(s.rules).combine !== "solo");
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
          <span></span>
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
        return `<tr data-open="${v.id}" style="view-transition-name:svc-${v.id}">
            ${moves}
            <td><span class="dt-name"><i class="thumb tint-${v.tint}"${thumb}></i><span><button type="button" class="row-open" data-open="${v.id}"><strong>${esc(v.name)}</strong></button><small>${esc(v.line)}</small></span></span></td>
            <td class="num">${duration(v.min)}</td>
            <td class="num">${price(v)}</td>
            <td>${esc(who)}</td>
            <td>${rules.length ? esc(cap(rules.join(", "))) : `<span class="dt-quiet">${t("rules.none")}</span>`}</td>
          </tr>`;
      })
      .join("");
    return `<div class="dt-wrap"><table class="dt">
        <thead><tr>
          ${state.sorting ? `<th>${t("col.order")}</th>` : ""}
          <th>${t("col.service")}</th><th>${t("col.length")}</th><th>${t("col.price")}</th>
          <th>${t("col.who")}</th><th>${t("col.rules")}</th>
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
      PBM.store.save("services");
      renderTiles();
      // Keep the keyboard on the tile that moved; at either end one arrow is off.
      const arrows = [...document.querySelectorAll(`[data-move][data-id="${id}"]`)];
      (arrows.find((b) => Number(b.dataset.move) === dir && !b.disabled) || arrows.find((b) => !b.disabled))?.focus();
    });
  }

  // ---------- The editor, on the stage ----------
  // A service opens full screen, or docked at the right (shell.js), in the
  // five parts Trung proposed on 3 November after Cal.com's event types. All
  // five stay in the form and only the one showing is unhidden, so moving
  // between them keeps what was typed. #new is a new service and #s/<id> one
  // that exists; "/staff" after either slides in the form for a new staff
  // member beside it.

  const TABS = ["setup", "availability", "form", "experience", "policy"];
  const UNIT_MIN = { min: 1, hour: 60, day: 1440 };
  const pane = $("svc");
  const staffPane = $("staff-new");
  const base = () => (state.draft.id === "new" ? "#new" : "#s/" + state.draft.id);

  const option = (value, label, current) =>
    `<option value="${value}"${String(current) === String(value) ? " selected" : ""}>${label}</option>`;

  // Minutes as an amount and a unit, the way the server keeps notice.
  const asUnit = (m) => (m && m % 1440 === 0 ? [m / 1440, "day"] : m && m % 60 === 0 ? [m / 60, "hour"] : [m || 0, "min"]);

  const zones = (current) => {
    let list = ["UTC"];
    try {
      list = Intl.supportedValuesOf("timeZone");
    } catch {
      /* an older browser: the current zone and UTC */
    }
    return list.includes(current) ? list : [current, ...list];
  };

  const switchLine = (name, label, hint, on) =>
    `<label class="switch-line"><span><strong>${label}</strong><small>${hint}</small></span><input class="switch" type="checkbox" role="switch" name="${name}" ${on ? "checked" : ""} /></label>`;

  function setupHTML(d) {
    const fresh = d.id === "new";
    return `
      <div class="field">
        <label for="f-name">${t("f.name")}</label>
        <input class="input" id="f-name" name="name" value="${esc(d.name)}" autocomplete="off" aria-describedby="f-name-error" />
        <span class="error" id="f-name-error" hidden>${t("f.name.error")}</span>
      </div>
      <div class="field">
        <label for="f-line">${t("f.line")}</label>
        <input class="input" id="f-line" name="line" value="${esc(d.line)}" maxlength="70" autocomplete="off" aria-describedby="f-line-hint" />
        <small id="f-line-hint">${t("f.line.hint")}</small>
      </div>
      <div class="field">
        <label for="f-slug">${t("f.slug")}</label>
        <div class="slug-row">
          <span class="slug-base">…/booking/${SHOP.slug}/</span>
          <input class="input" id="f-slug" name="slug" value="${esc(d.slug)}" autocomplete="off" spellcheck="false" />
          ${fresh ? "" : `<button class="btn btn-quiet btn-small" type="button" data-copy>${icon("copy")}<span aria-live="polite">${t("f.link.copy")}</span></button>`}
        </div>
        <small>${t("f.slug.hint")}</small>
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
        <span class="label-row"><span class="label" id="f-staff-label">${t("f.staff")}</span><a class="link-btn" href="${base()}/staff">${t("f.staff.add")}</a></span>
        ${
          STAFF.length
            ? `<div class="chips">
          ${STAFF.map(
            (person) =>
              `<label class="chip-pick"><input class="visually-hidden" type="checkbox" name="staff" value="${person.id}" ${
                d.staff.includes(person.id) ? "checked" : ""
              } /><span><i aria-hidden="true">${esc(person.name.charAt(0))}</i>${esc(person.name)}</span></label>`
          ).join("")}
        </div>
        <small>${t("f.staff.hint")}</small>`
            : `<p class="peek-lede">${t("f.staff.none")}</p>`
        }
        <span class="error" id="f-staff-error" hidden>${t("f.staff.error")}</span>
      </div>
      <div class="field">
        <span class="label">${t("f.preview")}</span>
        <div class="svc-preview" id="preview"></div>
      </div>`;
  }

  function availabilityHTML(d) {
    return `
      <p class="peek-lede">${t("av.lede")}</p>
      ${
        SCHEDULES.length
          ? `<div class="field">
        <label for="f-schedule">${t("av.schedule")}</label>
        <select class="input" id="f-schedule" name="schedule">${SCHEDULES.map((s) => option(s.id, esc(s.title), d.schedule)).join("")}</select>
      </div>`
          : `<div class="notice-box">
        <strong>${t("av.none")}</strong>
        <p>${t("av.none.hint")}</p>
        <a class="btn btn-quiet btn-small" href="/dashboard/availability#new">${t("av.make")}</a>
      </div>`
      }
      <div class="field">
        <label for="f-zone">${t("av.zone")}</label>
        <select class="input" id="f-zone" name="timezone">${zones(d.timezone).map((z) => option(z, z, d.timezone)).join("")}</select>
      </div>`;
  }

  // The four fields every booking asks, then the shop's own questions: drawn
  // so Trung can build from them, but greyed and marked for a later version
  // (Sonny, 4 November). Nothing in the greyed part is saved.
  function formHTML() {
    const row = (key, required) =>
      `<li><span>${t("bf." + key)}</span><span class="bf-tag">${t(required ? "bf.required" : "bf.optional")}</span></li>`;
    return `
      <p class="peek-lede">${t("bf.lede")}</p>
      <div class="field">
        <span class="label">${t("bf.fixed")}</span>
        <ul class="bf-fixed">${row("name", true)}${row("phone", true)}${row("email", false)}${row("note", false)}</ul>
      </div>
      <fieldset class="bf-own" disabled aria-describedby="bf-own-hint">
        <legend><span>${t("bf.own")}</span><span class="tag-later">${t("bf.later")}</span></legend>
        <p class="peek-lede" id="bf-own-hint">${t("bf.own.hint")}</p>
        <div class="bf-q">
          <div class="field-pair">
            <div class="field"><label for="q-label">${t("bf.q")}</label><input class="input" id="q-label" value="${esc(t("bf.q.example"))}" /></div>
            <div class="field"><label for="q-type">${t("bf.type")}</label><select class="input" id="q-type">${["text", "long", "number", "check", "one", "many"]
              .map((k) => option(k, t("bf.type." + k), "one"))
              .join("")}</select></div>
          </div>
          <div class="field"><span class="label">${t("bf.options")}</span><div class="chips"><span class="chip-static">${t("bf.yes")}</span><span class="chip-static">${t("bf.no")}</span></div></div>
          <label class="check"><input type="checkbox" checked /><span>${t("bf.required")}</span></label>
        </div>
        <button class="btn btn-quiet btn-small bf-add" type="button">${icon("plus")}${t("bf.add")}</button>
      </fieldset>`;
  }

  function experienceHTML(d) {
    const r = d.rules;
    return `
      <p class="peek-lede">${t("be.lede")}</p>
      ${switchLine("confirm", t("be.confirm"), t("be.confirm.hint"), r.confirm === "manual")}
      ${switchLine("combine", t("be.combine"), t("be.combine.hint"), r.combine !== "solo")}
      <div class="field">
        <label for="f-redirect">${t("be.redirect")}</label>
        <input class="input" id="f-redirect" name="redirect" type="url" placeholder="https://" value="${esc(r.redirect)}" autocomplete="off" />
        <small>${t("be.redirect.hint")}</small>
      </div>`;
  }

  function policyHTML(d) {
    const r = d.rules;
    const [noticeN, noticeU] = asUnit(r.notice);
    const minutes = (name, value) =>
      `<div class="with-unit"><input class="input num" id="f-${name}" name="${name}" type="number" min="0" step="5" value="${value}" inputmode="numeric" /><span>${t("f.min.unit")}</span></div>`;
    return `
      <p class="peek-lede">${t("po.lede")}</p>
      <div class="field-pair">
        <div class="field">
          <label for="f-notice">${t("po.notice")}</label>
          <div class="amount-unit">
            <input class="input num" id="f-notice" name="notice" type="number" min="0" value="${noticeN}" inputmode="numeric" />
            <select class="input" name="notice-unit" aria-label="${t("po.notice")}">${["min", "hour", "day"].map((u) => option(u, t("unit." + u), noticeU)).join("")}</select>
          </div>
          <small>${t("po.notice.hint")}</small>
        </div>
        <div class="field">
          <label for="f-ahead">${t("po.ahead")}</label>
          <div class="with-unit"><input class="input num" id="f-ahead" name="ahead" type="number" min="1" value="${r.ahead}" inputmode="numeric" /><span>${t("unit.day")}</span></div>
          <small>${t("po.ahead.hint")}</small>
        </div>
      </div>
      <div class="field">
        <div class="field-pair">
          <div class="field"><label for="f-before">${t("po.before")}</label>${minutes("before", r.before)}</div>
          <div class="field"><label for="f-after">${t("po.after")}</label>${minutes("after", r.after)}</div>
        </div>
        <small>${t("po.buffer.hint")}</small>
      </div>
      <div class="field">
        <label for="f-per">${t("po.per")}</label>
        <input class="input num" id="f-per" name="perCustomer" type="number" min="1" placeholder="${t("po.per.ph")}" value="${r.perCustomer ?? ""}" inputmode="numeric" />
      </div>
      ${switchLine("noCancel", t("po.nocancel"), t("po.nocancel.hint"), r.noCancel)}
      ${switchLine("noReschedule", t("po.noresched"), t("po.noresched.hint"), r.noReschedule)}`;
  }

  const PARTS = { setup: setupHTML, availability: availabilityHTML, form: formHTML, experience: experienceHTML, policy: policyHTML };

  function renderEditor() {
    const d = state.draft;
    const fresh = d.id === "new";
    document.title = `${d.name || t(fresh ? "kind.new" : "kind.edit")} | pleasebookme`;
    pane.innerHTML = `
      <header class="sheet-head peek-head">
        <div>
          <p class="peek-kind">${icon(fresh ? "plus" : "scissors")}${t(fresh ? "kind.new" : "kind.edit")}</p>
          <h2 id="svc-title" ${d.name ? "" : "data-empty"}>${esc(d.name || t("untitled"))}</h2>
        </div>
        <div class="pane-tools">
          ${PBM.stage.toggle()}
          <a class="icon-btn" href="#" aria-label="${t("w.close")}" title="${t("w.close")}">${icon("x")}</a>
        </div>
      </header>
      <div class="pane-tabs" role="tablist" aria-label="${t("tabs.label")}">
        ${TABS.map(
          (id) =>
            `<button type="button" role="tab" id="tab-${id}" aria-controls="part-${id}" aria-selected="${state.tab === id}" tabindex="${state.tab === id ? 0 : -1}" data-tab="${id}">${t("tab." + id)}</button>`
        ).join("")}
      </div>
      <form class="peek-body" id="form" novalidate>
        ${TABS.map(
          (id) =>
            `<section class="peek-sec" role="tabpanel" id="part-${id}" aria-labelledby="tab-${id}" ${state.tab === id ? "" : "hidden"}>${PARTS[id](d)}</section>`
        ).join("")}
      </form>
      <footer class="sheet-actions peek-actions">
        ${fresh ? "" : `<button class="btn btn-quiet btn-danger" type="button" data-delete>${icon("trash")}<span>${t("delete")}</span></button>`}
        <span class="pane-spacer"></span>
        <a class="btn btn-quiet" href="#">${t("cancel")}</a>
        <button class="btn btn-primary" type="submit" form="form">${icon("check")}${t("save")}</button>
      </footer>`;
    renderPreview();
  }

  function showTab(id) {
    state.tab = id;
    pane.querySelectorAll("[data-tab]").forEach((tab) => {
      tab.setAttribute("aria-selected", String(tab.dataset.tab === id));
      tab.tabIndex = tab.dataset.tab === id ? 0 : -1;
    });
    pane.querySelectorAll("[role=tabpanel]").forEach((part) => (part.hidden = part.id !== "part-" + id));
    pane.querySelector(".peek-body").scrollTop = 0;
    $("tab-" + id).scrollIntoView({ block: "nearest", inline: "nearest" }); // on a phone the strip scrolls
  }

  function renderPreview() {
    $("preview").innerHTML = tileHTML(state.draft, { preview: true });
  }

  // Copies what is in the form, all five parts, into the draft.
  function readDraft() {
    const d = state.draft;
    const data = new FormData($("form"));
    const whole = (name, least = 0) => Math.max(least, Math.round(Number(data.get(name)) || 0));
    d.name = data.get("name").trim();
    d.line = data.get("line").trim();
    d.slug = data.get("slug").trim();
    d.min = Math.max(5, whole("min"));
    d.price = whole("price");
    d.from = data.has("from");
    d.tint = data.get("tint");
    d.staff = data.getAll("staff").map(Number);
    d.schedule = data.has("schedule") ? Number(data.get("schedule")) : d.schedule;
    d.timezone = data.get("timezone");
    d.rules = {
      confirm: data.has("confirm") ? "manual" : "auto",
      combine: data.has("combine") ? "yes" : "solo",
      redirect: data.get("redirect").trim(),
      notice: whole("notice") * UNIT_MIN[data.get("notice-unit")],
      ahead: whole("ahead", 1),
      before: whole("before"),
      after: whole("after"),
      perCustomer: whole("perCustomer") || null,
      noCancel: data.has("noCancel"),
      noReschedule: data.has("noReschedule"),
    };
  }

  function openEditor(id) {
    state.draft = id === "new" ? blank() : view(id);
    state.tab = "setup";
    state.sureToDelete = false;
    state.slugEdited = id !== "new"; // a link already shared does not change by itself
    renderEditor();
    pane.hidden = false;
    PBM.stage.sync();
  }

  function closeEditor() {
    closeStaff(true);
    state.draft = null;
    pane.hidden = true;
    pane.innerHTML = ""; // the preview tile must not linger beside the real ones
    document.title = t("doc.title");
    PBM.stage.sync();
  }

  function save() {
    readDraft();
    const d = state.draft;
    const named = Boolean(d.name);
    const staffed = d.staff.length > 0;
    if (!named || !staffed) {
      showTab("setup");
      $("f-name").setAttribute("aria-invalid", String(!named));
      $("f-name-error").hidden = named;
      $("f-staff-error").hidden = staffed;
      if (!named) return $("f-name").focus();
      return (pane.querySelector('[name="staff"]') || pane.querySelector('[href$="/staff"]')).focus();
    }

    const fresh = d.id === "new";
    const id = fresh ? PBM.store.newId("svc", Object.keys(SERVICES)) : d.id;
    if (fresh) SERVICES[id] = { vi: d.name, en: d.name, line: { vi: d.line, en: d.line }, art: d.art };
    const service = SERVICES[id];
    service[PBM.lang] = d.name;
    service.line[PBM.lang] = d.line;
    Object.assign(service, {
      slug: slugify(d.slug || d.name),
      min: d.min,
      price: d.price,
      from: d.from,
      tint: d.tint,
      photo: d.photo,
      staff: d.staff,
      schedule: d.schedule,
      timezone: d.timezone,
      rules: d.rules,
    });
    delete service.hidden; // whether it shows is each widget's choice now (3 November)
    if (fresh) {
      state.order.push(id);
      PBM.store.joined("services", id);
    }
    PBM.store.save("services");
    location.hash = "";
    swap(renderAll);
    toast(t(fresh ? "toast.added" : "toast.saved", { name: d.name }));
  }

  function remove() {
    const d = state.draft;
    // Off the menu, but kept, so bookings already made for it still have a
    // name and a price (Trung's soft delete, 3 November).
    state.order.splice(state.order.indexOf(d.id), 1);
    SERVICES[d.id].removed = true;
    PBM.store.save("services");
    location.hash = "";
    swap(renderAll);
    toast(t("toast.deleted", { name: d.name }));
  }

  // ---------- A new staff member, beside the service ----------
  // Trung's ask on 3 November: when nobody can do a service yet, add the
  // person from inside it. They become a Staff resource, as if added on
  // Resources, and are ticked on this service.

  // The Staff type; a shop that deleted it gets it back.
  function peopleType() {
    let type = RESOURCE_TYPES.find((x) => x.id === "people");
    if (!type) {
      type = { id: "people", vi: "Nhân viên", en: "Staff", icon: "users", asks: "who" };
      RESOURCE_TYPES.push(type);
    }
    return type;
  }

  function openStaff() {
    if (state.tab !== "setup") showTab("setup");
    if (!state.staffDraft) {
      const used = new Set(RESOURCES.filter((r) => r.type === "people").map((r) => r.code));
      state.staffDraft = { name: "", note: "", branch: BRANCHES.length === 1 ? BRANCHES[0].id : "", code: [1, 2, 3, 4, 5, 6, 7, 8].find((n) => !used.has(n)) || 1 };
      renderStaff();
    }
    PBM.stage.split(staffPane, true);
    $("st-name").focus();
  }

  function closeStaff(atOnce) {
    if (!state.staffDraft) return;
    state.staffDraft = null;
    if (!atOnce) return PBM.stage.split(staffPane, false);
    staffPane.hidden = true;
    staffPane.classList.remove("is-leaving");
    $("pane-stage").classList.remove("is-split");
  }

  function renderStaff() {
    const d = state.staffDraft;
    staffPane.innerHTML = `
      <header class="sheet-head peek-head">
        <div>
          <p class="peek-kind">${icon("plus")}${t("st.kind")}</p>
          <h2 id="staff-title" ${d.name ? "" : "data-empty"}>${esc(d.name || t("untitled"))}</h2>
        </div>
        <div class="pane-tools">
          <a class="icon-btn" href="${base()}" aria-label="${t("w.close")}" title="${t("w.close")}">${icon("x")}</a>
        </div>
      </header>
      <form class="peek-body" id="staff-form" novalidate>
        <section class="peek-sec">
          <p class="peek-lede">${t("st.lede")}</p>
          <div class="field">
            <label for="st-name">${t("st.name")}</label>
            <input class="input" id="st-name" name="name" value="${esc(d.name)}" placeholder="${t("st.name.ph")}" autocomplete="off" aria-describedby="st-name-error" />
            <span class="error" id="st-name-error" hidden>${t("st.name.error")}</span>
          </div>
          <div class="field">
            <label for="st-note">${t("st.note")}</label>
            <input class="input" id="st-note" name="note" value="${esc(d.note)}" placeholder="${t("st.note.ph")}" autocomplete="off" />
          </div>
          <div class="field">
            <span class="label" id="st-code-label">${t("st.code")}</span>
            <div class="code-picks" role="radiogroup" aria-labelledby="st-code-label">
              ${[1, 2, 3, 4, 5, 6, 7, 8]
                .map(
                  (n) =>
                    `<label class="code-pick"><input class="visually-hidden" type="radio" name="code" value="${n}" ${d.code === n ? "checked" : ""} /><i class="code-${n}" aria-hidden="true"></i><span class="visually-hidden">${t("st.code.n", { n })}</span></label>`
                )
                .join("")}
            </div>
          </div>
        </section>
      </form>
      <footer class="sheet-actions peek-actions">
        <span class="pane-spacer"></span>
        <a class="btn btn-quiet" href="${base()}">${t("cancel")}</a>
        <button class="btn btn-primary" type="submit" form="staff-form">${t("st.save")}</button>
      </footer>`;
  }

  function saveStaff() {
    const d = state.staffDraft;
    const data = new FormData($("staff-form"));
    d.name = data.get("name").trim();
    d.note = data.get("note").trim();
    d.branch = data.get("branch") ?? d.branch ?? "";
    d.code = Number(data.get("code")) || d.code;
    if (!d.name) {
      $("st-name").setAttribute("aria-invalid", "true");
      $("st-name-error").hidden = false;
      return $("st-name").focus();
    }
    const type = peopleType();
    const slugs = RESOURCES.map((r) => r.slug);
    const root = slugify(d.name) || "staff";
    let slug = root;
    for (let n = 2; slugs.includes(slug); n++) slug = `${root}-${n}`;
    const person = {
      id: PBM.store.newId("r", RESOURCES.map((r) => r.id)),
      type: type.id,
      name: d.name,
      slug,
      description: d.note,
      capacity: null,
      status: "ACTIVE",
      code: d.code,
      branch: d.branch || undefined,
      does: [],
      bookable: true,
      hours: null,
      off: [],
      member: "",
      price: null,
    };
    readDraft(); // what the service form holds now, before it is drawn again
    RESOURCES.push(person);
    PBM.store.joined(person.type, person.id);
    PBM.store.save("resources"); // gives them a staff number and puts them in STAFF
    state.draft.staff.push(person.staffId);
    renderEditor();
    location.hash = base().slice(1); // the side form slides out
    toast(t("st.added", { name: d.name }));
    pane.querySelector(`[name="staff"][value="${person.staffId}"]`)?.focus();
  }

  // ---------- Which service is open ----------

  function route() {
    const asked = location.hash.slice(1).match(/^(new|s\/([^/]+))(\/staff)?$/);
    const id = asked && (asked[2] ? decodeURIComponent(asked[2]) : "new");
    if (!asked || (id !== "new" && !state.order.includes(id))) {
      if (asked) history.replaceState(null, "", location.pathname); // a service that is not on the menu
      if (state.draft) closeEditor();
      return;
    }
    if (!state.draft || state.draft.id !== id) openEditor(id);
    if (asked[3]) return openStaff();
    closeStaff();
    if (!pane.contains(document.activeElement)) $("f-name").focus();
  }

  // ---------- Events ----------

  document.addEventListener("click", (event) => {
    const target = event.target.closest("[data-open],[data-sort],[data-move],[data-basket],[data-view]");
    if (!target || target.closest(".pane-stage")) return;
    // In the table the whole row opens the service, except its own controls.
    if (target.matches("tr") && event.target.closest(".cell-move")) return;

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

    if (target.dataset.open) return (location.hash = target.dataset.open === "new" ? "new" : "s/" + target.dataset.open);
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

  pane.addEventListener("input", (event) => {
    const el = event.target;
    if (el.type === "file") return;
    if (el.id === "f-slug") state.slugEdited = true;
    if (el.id === "f-name" && !state.slugEdited) $("f-slug").value = slugify(el.value);
    readDraft();
    const title = $("svc-title");
    title.textContent = state.draft.name || t("untitled");
    title.toggleAttribute("data-empty", !state.draft.name);
    renderPreview();
  });

  pane.addEventListener("change", (event) => {
    if (event.target.type !== "file") return;
    const file = event.target.files[0];
    if (!file) return;
    // Made small and kept in this browser with the rest of the shop. The
    // photo never leaves the browser.
    const draft = state.draft;
    PBM.store
      .picture(file, 1600)
      .then((photo) => {
        draft.photo = photo;
        if (state.draft !== draft) return;
        pane.querySelector("[data-photo-remove]").hidden = false;
        renderPreview();
      })
      .catch(() => {});
  });

  pane.addEventListener("click", (event) => {
    const target = event.target.closest("[data-tab],[data-photo-remove],[data-copy],[data-delete]");
    if (!target) return;

    if (target.dataset.tab) return showTab(target.dataset.tab);
    if ("photoRemove" in target.dataset) {
      state.draft.photo = "";
      pane.querySelector('[name="photo"]').value = "";
      target.hidden = true;
      renderPreview();
      return pane.querySelector(".photo-pick input").focus();
    }
    if ("copy" in target.dataset) {
      navigator.clipboard?.writeText(`https://pleasebookme.app/booking/${SHOP.slug}/${state.draft.slug}`).catch(() => {});
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

  // The tabs move with the arrow keys, as a tab list should.
  pane.addEventListener("keydown", (event) => {
    const tab = event.target.closest?.("[data-tab]");
    if (!tab || !["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const at = TABS.indexOf(tab.dataset.tab);
    const next =
      event.key === "Home" ? 0 : event.key === "End" ? TABS.length - 1 : (at + (event.key === "ArrowRight" ? 1 : -1) + TABS.length) % TABS.length;
    showTab(TABS[next]);
    $("tab-" + TABS[next]).focus();
  });

  pane.addEventListener("submit", (event) => {
    event.preventDefault();
    save();
  });

  staffPane.addEventListener("input", (event) => {
    if (event.target.id !== "st-name") return;
    const title = $("staff-title");
    title.textContent = event.target.value.trim() || t("untitled");
    title.toggleAttribute("data-empty", !event.target.value.trim());
  });

  staffPane.addEventListener("submit", (event) => {
    event.preventDefault();
    saveStaff();
  });

  // Escape closes the staff form first, then the service.
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || !state.draft || event.target.closest?.("select")) return;
    location.hash = state.staffDraft ? base().slice(1) : "";
  });

  PBM.onChange(() => {
    renderAll();
    if (state.draft) {
      readDraft();
      renderEditor();
    }
    if (state.staffDraft) renderStaff();
  });

  addEventListener("hashchange", route);
  PBM.mount("services");
  renderAll();
  route();

  // The settle animation is for the first paint only.
  setTimeout(() => {
    state.entering = false;
    $("tiles").classList.remove("is-entering");
  }, 1400);
})();
