/* Sample shop shared by every page of the mockup, so Tổng quan and Lịch hẹn
   show the same bookings. Nothing here is real and nothing is sent anywhere.

   The shop is built in two layers. The core is enough to take a booking:
   services, working hours, a time and a customer. Resources (branches, staff,
   places and whatever else a shop adds) sit on top. A booking may carry them
   and they may point at each other, but nothing in the core needs them.

   Days are counted from TODAY: 0 is today, -1 is yesterday, 1 is tomorrow.
   Today and the days ahead are written by hand. The past is generated from a
   fixed seed, so it comes out the same on every load. */
(function () {
  "use strict";

  const TODAY = new Date(2026, 9, 13); // Tuesday 13 October 2026
  const NOW = 11 * 60 + 20;
  const OPEN = 8 * 60;
  const CLOSE = 20 * 60;
  const SHIFT_HOURS = 8; // hours each staff member works on a working day
  const HISTORY_DAYS = 63;

  // The people who take bookings. Each is also a resource ("p" + id) below.
  const STAFF = [
    { id: 1, name: "Tuấn", branch: "b1", note: "Thợ chính. Cắt, cạo và uốn." },
    { id: 2, name: "Khoa", branch: "b1", note: "Cắt và cạo râu." },
    { id: 3, name: "Linh", branch: "b1", note: "Uốn và nhuộm." },
    { id: 4, name: "Hưng", branch: "b2", note: "Cắt và cạo râu." },
    { id: 5, name: "Mai", branch: "b2", note: "Uốn và nhuộm." },
  ].map((person, i) => ({ ...person, code: i + 1 }));

  // Set once for the shop. A service follows these unless it has a rule of its own.
  const SHOP = {
    slug: "tiem-toc-mau",
    // What a customer is told to call once it is too late to change online. Not a
    // number anyone can be reached on: the mockups are public, and the page links it.
    phone: "024 0000 0000",
    notice: 120, // minutes of warning a customer must give
    confirm: "manual", // "manual": the shop confirms each booking; "auto": confirmed at once
    staffChoice: true, // after picking a time, customers may ask for one person
    basket: "split", // several services in one booking: "one" person, or "split" across staff
    ahead: 30, // how many days ahead a customer may book
  };

  // The menu. `staff` is who can do the service; `rules` holds only what differs
  // from the shop ("shop" means follow the shop). `tint` and `art` fill the tile
  // until the owner adds a photo.
  const followShop = () => ({ confirm: "shop", notice: "shop", combine: "yes", days: "shop" });
  const SERVICES = {
    cut: {
      vi: "Cắt tóc",
      en: "Haircut",
      line: { vi: "Cắt, gội và tạo kiểu.", en: "Cut, wash and style." },
      slug: "cat-toc",
      min: 30,
      price: 80000,
      staff: [1, 2, 3, 4, 5],
      tint: "glacier",
      art: "scissors",
      rules: { ...followShop(), confirm: "auto" },
    },
    cutBeard: {
      vi: "Cắt và cạo râu",
      en: "Haircut and beard",
      line: { vi: "Cắt tóc kèm tỉa và cạo râu.", en: "A haircut with a beard trim and shave." },
      slug: "cat-va-cao-rau",
      min: 45,
      price: 110000,
      staff: [1, 2, 4],
      tint: "black",
      art: "moustache",
      rules: followShop(),
    },
    shave: {
      vi: "Cạo mặt",
      en: "Shave",
      line: { vi: "Cạo bằng dao, đắp khăn nóng.", en: "A razor shave with a hot towel." },
      slug: "cao-mat",
      min: 20,
      price: 40000,
      staff: [2, 4],
      tint: "glacier",
      art: "brush",
      rules: followShop(),
    },
    perm: {
      vi: "Uốn tóc",
      en: "Perm",
      line: { vi: "Uốn giữ nếp lâu, tư vấn kiểu trước khi làm.", en: "A lasting perm, with advice on the style first." },
      slug: "uon-toc",
      min: 90,
      price: 350000,
      from: true,
      staff: [1, 3, 5],
      tint: "silver",
      art: "waves",
      rules: followShop(),
    },
    colour: {
      vi: "Nhuộm tóc",
      en: "Colour",
      line: { vi: "Nhuộm màu theo yêu cầu, có thử màu trước.", en: "Colour to order, with a test first." },
      slug: "nhuom-toc",
      min: 120,
      price: 450000,
      from: true,
      staff: [3, 5],
      tint: "burgundy",
      art: "drop",
      rules: { ...followShop(), notice: 1440 },
    },
  };
  // The owner's order. The first service gets the wide tile.
  const SERVICE_ORDER = ["cut", "cutBeard", "perm", "colour", "shave"];

  // Giờ làm việc: named weekly hours, the way the server stores them (one
  // schedule, then one start and end per working day). Days run Monday to
  // Sunday; 0 is Sunday.
  const WEEK = [1, 2, 3, 4, 5, 6, 0];
  const hours = (...spans) =>
    WEEK.map((value) => {
      const span = spans.find(([days]) => days.includes(value));
      return { value, enabled: Boolean(span), start: span ? span[1] : "09:00", end: span ? span[2] : "17:00" };
    });
  const SCHEDULES = [
    { id: 1, title: "Giờ mở cửa Cầu Giấy", timezone: "Asia/Saigon", days: hours([WEEK, "08:00", "20:00"]) },
    { id: 2, title: "Giờ mở cửa Long Biên", timezone: "Asia/Saigon", days: hours([WEEK, "09:00", "20:00"]) },
    {
      id: 3,
      title: "Ca của Linh",
      timezone: "Asia/Saigon",
      days: hours([[2, 3, 4, 5], "10:00", "19:00"], [[6], "09:00", "17:00"]),
    },
    { id: 4, title: "Ca sáng cuối tuần", timezone: "Asia/Saigon", days: hours([[6, 0], "08:00", "12:00"]) },
  ];

  // ---------- Resources: a layer on top of the core ----------

  // Everything a booking can take up or happen at. A branch is one type of
  // resource, a person another, a place another, and a shop can add more.
  // `asks` is the question a widget puts to the customer for that type.
  const RESOURCE_TYPES = [
    { id: "branches", vi: "Chi nhánh", en: "Branches", icon: "pin", asks: "where" },
    { id: "people", vi: "Nhân viên", en: "Staff", icon: "users", asks: "who" },
    { id: "places", vi: "Chỗ", en: "Places", icon: "seat", asks: "which" },
  ];

  // The fields are the server's (name, slug, description, capacity, status),
  // plus three links: `does` (services it is assigned to), `branch` (the
  // branch it belongs to, if any) and `code` (its colour on the calendar).
  const slugOf = (text) =>
    text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  const resource = (fields) => ({
    slug: slugOf(fields.name),
    description: "",
    capacity: null,
    status: "ACTIVE",
    does: [],
    ...fields,
  });
  const chair = (id, name, branch, fields) =>
    resource({
      id,
      type: "places",
      name,
      slug: slugOf(name + " " + (branch === "b1" ? "Cầu Giấy" : "Long Biên")),
      branch,
      capacity: 1,
      does: [...SERVICE_ORDER],
      ...fields,
    });
  const RESOURCES = [
    resource({
      id: "b1",
      type: "branches",
      name: "Cầu Giấy",
      description: "12 Trần Thái Tông, Cầu Giấy, Hà Nội",
      address: "12 Trần Thái Tông, Cầu Giấy, Hà Nội",
      hours: "08:00 – 20:00",
      capacity: 4,
      does: [...SERVICE_ORDER],
    }),
    resource({
      id: "b2",
      type: "branches",
      name: "Long Biên",
      description: "623 Nguyễn Văn Cừ, Bồ Đề, Hà Nội",
      address: "623 Nguyễn Văn Cừ, Bồ Đề, Hà Nội",
      hours: "09:00 – 20:00",
      capacity: 2,
      does: [...SERVICE_ORDER],
    }),
    ...STAFF.map((person) =>
      resource({
        id: "p" + person.id,
        type: "people",
        name: person.name,
        description: person.note,
        branch: person.branch,
        does: SERVICE_ORDER.filter((id) => SERVICES[id].staff.includes(person.id)),
      })
    ),
    resource({
      id: "p6",
      type: "people",
      name: "Phát",
      description: "Thợ học việc, chưa nhận khách.",
      branch: "b1",
      status: "INACTIVE",
    }),
    chair("c1", "Ghế 1", "b1"),
    chair("c2", "Ghế 2", "b1"),
    chair("c3", "Ghế 3", "b1", { description: "Đang thay đệm.", status: "MAINTENANCE" }),
    resource({
      id: "c4",
      type: "places",
      name: "Phòng riêng",
      description: "Phòng kín cho uốn và nhuộm.",
      branch: "b1",
      capacity: 2,
      does: ["perm", "colour", "shave"],
    }),
    chair("c5", "Ghế 1", "b2"),
    chair("c6", "Ghế 2", "b2"),
    chair("c7", "Ghế gội cũ", "b1", { slug: "ghe-goi-cu", description: "Đã thay bằng giường gội mới.", status: "RETIRED", does: [] }),
  ];
  // Each resource gets a colour by its place within its own type.
  RESOURCE_TYPES.forEach((type) => {
    RESOURCES.filter((r) => r.type === type.id).forEach((r, i) => (r.code = (i % 8) + 1));
  });
  // The branches again, as a list of their own: most pages only ask "which branch?".
  const BRANCHES = RESOURCES.filter((r) => r.type === "branches");

  // A widget is one way into booking: a chosen part of the shop (branches,
  // services, resources) that can appear as a link, inside a website, or as a
  // pop-up button. For each list, `auto` says whether things added to the shop
  // later join the widget by themselves. `pick` says whether the customer
  // chooses a resource of that type or the shop assigns one.
  const idsOf = (type, branch) =>
    RESOURCES.filter((r) => r.type === type && r.status === "ACTIVE" && (!branch || r.branch === branch)).map(
      (r) => r.id
    );
  const widget = (fields) => ({
    isDefault: false,
    on: true,
    branches: { ids: BRANCHES.map((b) => b.id), auto: true },
    services: { ids: [...SERVICE_ORDER], auto: true },
    people: { ids: idsOf("people"), pick: "customer", auto: true },
    places: { ids: idsOf("places"), pick: "auto", auto: true },
    appear: { inline: false, popup: false, site: "", button: "Đặt lịch" },
    look: { accent: "burgundy", theme: "light", lang: "vi", logo: true, greeting: "" },
    dates: { mode: "always", from: "", to: "", closed: "" },
    rules: { confirm: "shop", notice: "shop", ahead: "shop" },
    price: { mode: "none", value: 0 },
    week: 0, // bookings made through it in the last 7 days, counted further down
    ...fields,
  });
  const WIDGETS = [
    widget({
      id: "main",
      isDefault: true,
      name: "Trang đặt lịch chính",
      path: "",
      look: { accent: "burgundy", theme: "light", lang: "both", logo: true, greeting: "" },
    }),
    widget({
      id: "long-bien",
      name: "Cơ sở Long Biên",
      path: "long-bien",
      branches: { ids: ["b2"], auto: false },
      people: { ids: idsOf("people", "b2"), pick: "customer", auto: true },
      places: { ids: idsOf("places", "b2"), pick: "auto", auto: true },
      appear: { inline: true, popup: false, site: "tiemtocmau.vn", button: "Đặt lịch" },
    }),
    widget({
      id: "tuan",
      name: "Lịch của Tuấn",
      path: "tuan",
      branches: { ids: ["b1"], auto: false },
      services: { ids: ["cut", "cutBeard", "perm"], auto: false },
      people: { ids: ["p1"], pick: "customer", auto: false },
      places: { ids: idsOf("places", "b1"), pick: "auto", auto: true },
      look: { accent: "black", theme: "light", lang: "vi", logo: true, greeting: "Đặt lịch với Tuấn" },
    }),
    widget({
      id: "tet",
      name: "Ưu đãi Tết 2027",
      path: "tet-2027",
      services: { ids: ["cut", "cutBeard"], auto: false },
      appear: { inline: false, popup: true, site: "tiemtocmau.vn", button: "Đặt lịch Tết, giảm 10%" },
      look: { accent: "burgundy", theme: "light", lang: "vi", logo: true, greeting: "Cắt tóc đón Tết, giảm 10%" },
      dates: { mode: "range", from: "2027-01-20", to: "2027-02-10", closed: "Ưu đãi Tết mở đặt lịch từ ngày 20 tháng 1." },
      price: { mode: "percent", value: 10 },
    }),
    widget({
      id: "phong-rieng",
      name: "Phòng riêng",
      path: "phong-rieng",
      on: false,
      branches: { ids: ["b1"], auto: false },
      services: { ids: ["perm", "colour", "shave"], auto: false },
      people: { ids: idsOf("people", "b1"), pick: "customer", auto: true },
      places: { ids: ["c4"], pick: "customer", auto: false },
      rules: { confirm: "manual", notice: 1440, ahead: "shop" },
    }),
  ];
  WIDGETS.forEach((w, i) => (w.code = (i % 8) + 1));

  // [days from today, start, service, staff, customer, status]
  const AHEAD = [
    [0, "09:00", "cut", 1, "Minh", "ACCEPTED"],
    [0, "09:30", "cut", 1, "Hùng", "ACCEPTED"],
    [0, "10:30", "cutBeard", 1, "Long", "ACCEPTED"],
    [0, "13:30", "cut", 1, "Nam", "ACCEPTED"],
    [0, "15:00", "perm", 1, "Phúc", "PENDING"],
    [0, "09:15", "shave", 2, "Dũng", "ACCEPTED"],
    [0, "10:00", "cut", 2, "Sơn", "CANCELLED"],
    [0, "11:30", "shave", 2, "Việt", "PENDING"],
    [0, "14:00", "shave", 2, "Quân", "ACCEPTED"],
    [0, "16:30", "cutBeard", 2, "Hải", "ACCEPTED"],
    [0, "10:00", "colour", 3, "Thảo", "ACCEPTED"],
    [0, "14:30", "perm", 3, "Trang", "ACCEPTED"],
    [0, "17:00", "cut", 3, "Bảo", "ACCEPTED"],

    [1, "09:00", "cutBeard", 1, "An", "ACCEPTED"],
    [1, "11:00", "cut", 2, "Kiên", "ACCEPTED"],
    [1, "14:00", "colour", 3, "Ngọc", "PENDING"],
    [1, "15:00", "cut", 1, "Toàn", "ACCEPTED"],
    [1, "16:00", "shave", 2, "Vũ", "ACCEPTED"],

    [2, "10:00", "cut", 1, "Hiếu", "ACCEPTED"],
    [2, "10:00", "perm", 3, "My", "ACCEPTED"],
    [2, "13:00", "cutBeard", 2, "Thành", "ACCEPTED"],
    [2, "16:30", "cut", 1, "Cường", "ACCEPTED"],

    [3, "09:30", "cut", 2, "Phong", "ACCEPTED"],
    [3, "11:00", "cutBeard", 1, "Đạt", "PENDING"],
    [3, "13:30", "colour", 3, "Vy", "ACCEPTED"],
    [3, "15:00", "cut", 1, "Bình", "ACCEPTED"],
    [3, "17:30", "shave", 2, "Quang", "ACCEPTED"],
    [3, "18:00", "cut", 1, "Tâm", "ACCEPTED"],

    [4, "08:30", "cut", 1, "Duy", "ACCEPTED"],
    [4, "09:00", "cut", 2, "Lộc", "ACCEPTED"],
    [4, "09:30", "perm", 3, "Mai", "ACCEPTED"],
    [4, "10:00", "cutBeard", 1, "Tiến", "ACCEPTED"],
    [4, "11:00", "shave", 2, "Hoàng", "ACCEPTED"],
    [4, "13:00", "cut", 1, "Nghĩa", "ACCEPTED"],
    [4, "14:00", "colour", 3, "Yến", "ACCEPTED"],
    [4, "15:30", "cut", 2, "Thịnh", "ACCEPTED"],

    [5, "10:00", "cut", 1, "Khôi", "ACCEPTED"],
    [5, "11:30", "cutBeard", 2, "Sang", "REJECTED"],
    [5, "14:00", "cut", 1, "Trung", "ACCEPTED"],

    // Long Biên
    [0, "09:30", "cut", 4, "Khánh", "ACCEPTED"],
    [0, "11:00", "cutBeard", 4, "Tùng", "ACCEPTED"],
    [0, "14:00", "cut", 4, "Lâm", "PENDING"],
    [0, "16:00", "shave", 4, "Đức", "ACCEPTED"],
    [0, "10:00", "perm", 5, "Hà", "ACCEPTED"],
    [0, "13:30", "colour", 5, "Châu", "ACCEPTED"],
    [0, "17:30", "cut", 5, "Giang", "ACCEPTED"],
    [1, "10:00", "cut", 4, "Thái", "ACCEPTED"],
    [1, "15:00", "perm", 5, "Chi", "ACCEPTED"],
    [2, "09:30", "cutBeard", 4, "Huy", "ACCEPTED"],
    [2, "14:00", "colour", 5, "Hoà", "PENDING"],
    [3, "11:00", "cut", 4, "Nhân", "ACCEPTED"],
    [4, "10:30", "cut", 5, "Tú", "ACCEPTED"],
    [4, "16:00", "shave", 4, "Trí", "ACCEPTED"],
  ];

  // ---------- The past, generated ----------

  // Small seeded generator (mulberry32): the same "random" shop every time.
  function seeded(seed) {
    return function () {
      seed = (seed + 0x6d2b79f5) | 0;
      let x = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x;
      return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
    };
  }

  let rand = seeded(2655);

  // Picks one value from [value, weight] pairs.
  function pick(pairs) {
    let roll = rand() * pairs.reduce((sum, pair) => sum + pair[1], 0);
    for (const [value, weight] of pairs) {
      roll -= weight;
      if (roll < 0) return value;
    }
    return pairs[pairs.length - 1][0];
  }

  // Bookings on a typical Sunday, Monday ... Saturday.
  const DAY_LOAD = [18, 10, 11, 11, 12, 15, 20];
  // How popular each starting hour is, 08:00 to 19:00. Evenings fill first.
  const WEEKDAY_HOURS = [0.5, 1.0, 1.1, 0.9, 0.5, 0.5, 0.7, 0.8, 0.9, 1.5, 1.7, 0.9];
  const WEEKEND_HOURS = [0.6, 1.2, 1.6, 1.5, 1.0, 0.8, 1.0, 1.2, 1.3, 1.5, 1.5, 0.9];
  const SERVICE_MIX = [
    ["cut", 50],
    ["cutBeard", 22],
    ["shave", 12],
    ["perm", 9],
    ["colour", 7],
  ];
  const GIVEN_NAMES =
    "An Anh Bảo Bình Châu Chi Cường Đạt Đức Dũng Duy Giang Hà Hải Hiếu Hoà Hoàng Hùng Huy Khánh Khôi Kiên Lâm Lộc Long Mai Minh My Nam Nghĩa Ngọc Nhân Phong Phúc Quân Quang Sang Sơn Tâm Thái Thành Thảo Thịnh Tiến Toàn Trí Trung Tú Tùng Việt Vũ Vy Yến".split(
      " "
    );

  // `first` is the day of a customer's first visit; regulars from before the
  // sample starts carry a day far in the past.
  const CUSTOMERS = [];
  function addCustomer(first) {
    const id = CUSTOMERS.length + 1;
    const customer = {
      id,
      name: GIVEN_NAMES[(id * 7) % GIVEN_NAMES.length],
      phone: "0900 " + String(id).padStart(6, "0").replace(/(\d{3})(\d{3})/, "$1 $2"),
      first,
    };
    CUSTOMERS.push(customer);
    return customer;
  }
  for (let i = 0; i < 150; i++) addCustomer(-999);

  // Which widget a booking came through. Decided from the booking's number, so
  // it does not disturb the generator above.
  function cameThrough(id, staff, branch) {
    const roll = (Math.imul(id, 2654435761) >>> 0) % 100;
    if (branch === "b2") return roll < 55 ? "long-bien" : "main";
    if (staff === 1) return roll < 25 ? "tuan" : "main";
    return "main";
  }

  const BOOKINGS = [];
  const addBooking = (fields) => {
    const id = BOOKINGS.length + 1;
    BOOKINGS.push({
      id,
      uid: "BK-" + (0x7a3f10 + id * 7919).toString(16).toUpperCase().slice(-6),
      widget: cameThrough(id, fields.staff, fields.branch),
      ...fields,
    });
  };
  const overlaps = (list, start, end) => list.some((b) => start < b.end && b.start < end);

  // One branch's history. `team` is its staff; `specialist` is the one who gets
  // most of the long services. Cầu Giấy was generated before the lists of who
  // does what existed, so it keeps `anyone` to stay exactly as it was.
  // `from` and `to` are the days it covers, and `older` is set for the extra
  // weeks added at the end (see below): those pick their customers only from
  // people who already existed on that day.
  function history({ branch, team, specialist, open, load, anyone, from = -HISTORY_DAYS, to = -1, older = false }) {
    for (let day = from; day <= to; day++) {
      const weekday = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate() + day).getDay();
      const hours = (weekday === 0 || weekday === 6 ? WEEKEND_HOURS : WEEKDAY_HOURS).slice((open - OPEN) / 60);
      // The shop has been getting a little busier, so older weeks carry fewer bookings.
      const count = Math.round(DAY_LOAD[weekday] * load * (1 + day * 0.0035) + rand() * 4 - 2);
      const held = team.map(() => []); // the bookings holding each chair that day

      for (let n = 0; n < count; n++) {
        const svc = pick(SERVICE_MIX);
        const length = SERVICES[svc].min;
        // Long services mostly go to the specialist; everything else to whoever is free.
        // (Shuffled by hand: a random sort comparator gives each browser a different shop.)
        const order = team.map((_, i) => i);
        for (let i = order.length - 1; i > 0; i--) {
          const j = Math.floor(rand() * (i + 1));
          [order[i], order[j]] = [order[j], order[i]];
        }
        if (length >= 90 && rand() < 0.7) {
          order.splice(order.indexOf(specialist), 1);
          order.unshift(specialist);
        }
        const able = anyone ? order : order.filter((i) => SERVICES[svc].staff.includes(team[i]));

        let start = open + pick(hours.map((weight, hour) => [hour, weight])) * 60 + Math.floor(rand() * 4) * 15;
        start = Math.min(start, CLOSE - length);
        let seat;
        for (let attempt = 0; attempt < 6 && seat === undefined; attempt++, start += 15) {
          if (start + length > CLOSE) break;
          seat = able.find((i) => !overlaps(held[i], start, start + length));
          if (seat !== undefined) break;
        }
        if (seat === undefined) continue; // the day is full around that hour

        const roll = rand();
        const cancelled = roll < 0.085;
        // A cancelled booking frees its slot, and its customer is never a first visit.
        const known = older ? CUSTOMERS.filter((c) => c.first <= day) : CUSTOMERS;
        const customer = !cancelled && rand() < 0.13 ? addCustomer(day) : known[Math.floor(rand() * known.length)];
        const booking = {
          day,
          start,
          end: start + length,
          svc,
          staff: team[seat],
          branch,
          customer: customer.name,
          cust: customer.id,
          phone: customer.phone,
          status: cancelled ? "CANCELLED" : "ACCEPTED",
          noShow: !cancelled && roll < 0.125,
          // After its time a booking waits to be marked: "done" or "noShow".
          outcome: cancelled ? null : roll < 0.125 ? "noShow" : "done",
        };
        if (!cancelled) held[seat].push(booking);
        addBooking(booking);
      }
    }
  }

  history({ branch: "b1", team: [1, 2, 3], specialist: 2, open: OPEN, load: 1, anyone: true });
  rand = seeded(4121);
  history({ branch: "b2", team: [4, 5], specialist: 1, open: 9 * 60, load: 0.6 });

  // ---------- Today and the days ahead ----------

  const minutesOf = (clock) => {
    const [h, m] = clock.split(":").map(Number);
    return h * 60 + m;
  };

  AHEAD.forEach(([day, start, svc, staff, customer, status], i) => {
    const s = minutesOf(start);
    addBooking({
      day,
      start: s,
      end: s + SERVICES[svc].min,
      svc,
      staff,
      branch: STAFF.find((person) => person.id === staff).branch,
      customer,
      cust: null,
      phone: "0900 900 " + String(101 + i).padStart(3, "0"),
      status,
      noShow: false,
      outcome: null, // today's bookings that have already ended still wait to be marked
    });
  });

  // Two of yesterday evening's are still waiting as well.
  BOOKINGS.filter((b) => b.day === -1 && b.status === "ACCEPTED" && !b.noShow)
    .sort((a, b) => b.start - a.start)
    .slice(0, 2)
    .forEach((b) => (b.outcome = null));

  // Nine more weeks behind the first nine, so Phân tích can set one month
  // against the month before it (September against August needs August whole).
  // Added last and with their own random numbers, so no booking, customer or
  // number above changes.
  const OLDER_DAYS = 63;
  const OLDEST_DAY = -HISTORY_DAYS - OLDER_DAYS;
  rand = seeded(7301);
  history({ branch: "b1", team: [1, 2, 3], specialist: 2, open: OPEN, load: 1, anyone: true, from: OLDEST_DAY, to: -HISTORY_DAYS - 1, older: true });
  rand = seeded(7302);
  history({ branch: "b2", team: [4, 5], specialist: 1, open: 9 * 60, load: 0.6, from: OLDEST_DAY, to: -HISTORY_DAYS - 1, older: true });

  // Time the shop, or one person, is closed. `who` is "all" (every person at
  // `branch`) or a staff id. `from` and `to` are minutes, or null for whole days.
  const CLOSURES = [
    { id: 1, who: 3, branch: "b1", fromDay: 2, toDay: 2, from: 13 * 60, to: 20 * 60, reason: "Linh nghỉ buổi chiều" },
    { id: 2, who: "all", branch: "b2", fromDay: 5, toDay: 5, from: null, to: null, reason: "Sửa điện" },
  ];

  WIDGETS.forEach((w) => {
    w.week = BOOKINGS.filter((b) => b.widget === w.id && b.day >= -7 && b.day < 0).length;
  });

  window.PBM_SAMPLE = {
    TODAY,
    NOW,
    OPEN,
    CLOSE,
    SHIFT_HOURS,
    HISTORY_DAYS,
    OLDEST_DAY,
    SHOP,
    STAFF,
    SERVICES,
    SERVICE_ORDER,
    SCHEDULES,
    BRANCHES,
    RESOURCE_TYPES,
    RESOURCES,
    WIDGETS,
    CLOSURES,
    BOOKINGS,
    CUSTOMERS,
  };
})();
