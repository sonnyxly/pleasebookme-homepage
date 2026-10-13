/* Lịch hẹn: one set of bookings shown as a calendar or as a table.
   The bookings are the sample shop in assets/sample.js; nothing is sent anywhere.

   Two controls sit on top of the bookings without changing them: which
   branches are on show, and what a booking's colour stands for (its status,
   its branch, its person, or the widget it came through). */
(function () {
  "use strict";

  const { t, icon, toast } = PBM;

  const plural = (n, one, many) => (n === 1 ? one : many);

  PBM.addStrings({
    vi: {
      "doc.title": "Lịch hẹn | pleasebookme",
      "view.label": "Kiểu xem",
      "view.calendar": "Lịch",
      "view.table": "Bảng",
      "range.label": "Khoảng thời gian",
      "range.day": "Ngày",
      "range.week": "Tuần",
      "step.prev.day": "Ngày trước",
      "step.next.day": "Ngày sau",
      "step.prev.week": "Tuần trước",
      "step.next.week": "Tuần sau",
      "step.today": "Hôm nay",
      "show.cancelled": "Hiện lịch đã huỷ",
      "st.PENDING": "Chờ xác nhận",
      "st.ACCEPTED": "Đã xác nhận",
      "st.AWAITING_HOST": "Chờ tiệm phản hồi",
      "st.REJECTED": "Đã từ chối",
      "st.CANCELLED": "Đã huỷ",
      "col.time": "Giờ",
      "col.customer": "Khách",
      "col.service": "Dịch vụ",
      "col.staff": "Nhân viên",
      "col.status": "Trạng thái",
      "act.accept": "Xác nhận",
      "act.reject": "Từ chối",
      "act.cancel": "Huỷ lịch",
      "act.close": "Đóng",
      "toast.accept": "Đã xác nhận lịch của {name}",
      "toast.reject": "Đã từ chối lịch của {name}",
      "toast.cancel": "Đã huỷ lịch của {name}",
      "rail.pending": "Chờ bạn xác nhận",
      "rail.pending.empty": "Không còn lịch nào chờ bạn.",
      "rail.next": "Sắp tới hôm nay",
      "rail.next.empty": "Hôm nay không còn lịch nào.",
      "sheet.service": "Dịch vụ",
      "sheet.when": "Thời gian",
      "sheet.staff": "Nhân viên",
      "sheet.price": "Giá",
      "sheet.phone": "Điện thoại",
      "sheet.code": "Mã lịch hẹn",
      "empty.table": "Chưa có lịch hẹn nào. Gửi link đặt lịch để khách tự chọn giờ.",
      "legend.label": "Chú thích màu",
      "colour.label": "Màu theo",
      "colour.status": "Trạng thái",
      "colour.branch": "Chi nhánh",
      "colour.staff": "Nhân viên",
      "colour.widget": "Widget",
      "sheet.branch": "Chi nhánh",
      "sheet.widget": "Đặt qua",
      "source.hand": "Tiệm tự thêm",
      add: "Thêm lịch hẹn",
      block: "Chặn giờ",
      todo: "Cần bạn xử lý",
      "rail.unmarked": "Đã qua, cần cập nhật",
      "rail.unmarked.hint": "Khách đã đến hay không đến? Lịch nằm ở đây cho tới khi bạn ghi lại.",
      "rail.unmarked.empty": "Mọi lịch đã qua đều được ghi lại.",
      "rail.unmarked.more": ({ n }) => `và ${n} lịch nữa`,
      "out.done": "Đã diễn ra",
      "out.noShow": "Vắng mặt",
      "out.wait": "Cần cập nhật",
      "act.done": "Đã đến",
      "act.noshow": "Không đến",
      "act.done.long": "Khách đã đến",
      "act.noshow.long": "Khách không đến",
      "act.unmark": "Ghi lại",
      "act.move": "Đổi giờ",
      "toast.done": "Đã ghi: {name} đã đến",
      "toast.noshow": "Đã ghi: {name} không đến",
      "toast.unmark": "Lịch của {name} chờ ghi lại",
      "form.add": "Thêm lịch hẹn",
      "form.move": "Đổi lịch hẹn",
      "form.customer": "Tên khách",
      "form.customer.error": "Hãy nhập tên khách.",
      "form.phone": "Số điện thoại",
      "form.service": "Dịch vụ",
      "form.staff": "Người làm",
      "form.staff.any": "Ai cũng được",
      "form.date": "Ngày",
      "form.start": "Giờ bắt đầu",
      "form.ends": ({ end, who }) => `Xong lúc ${end}, với ${who}.`,
      "form.save.add": "Thêm lịch hẹn",
      "form.save.move": "Lưu giờ mới",
      "form.save.anyway": "Vẫn lưu",
      "form.cancel": "Thôi",
      "form.added": "Đã thêm lịch của {name}",
      "form.moved": "Đã đổi lịch của {name}",
      "warn.title": "Lịch này không theo quy định của tiệm. Bạn vẫn lưu được.",
      "warn.past": "Giờ này đã qua.",
      "warn.hours": ({ hours }) => `Ngoài giờ mở cửa (${hours}).`,
      "warn.clash": ({ who, name, time }) => `${who} đã có lịch của ${name} lúc ${time}.`,
      "warn.closed": ({ reason }) => `Trùng với giờ đã chặn: ${reason}.`,
      "block.title": "Chặn giờ",
      "block.edit": "Giờ đã chặn",
      "block.who": "Áp dụng cho",
      "block.all": ({ name }) => `Cả chi nhánh ${name}`,
      "block.shop": "Cả tiệm",
      "block.from": "Từ ngày",
      "block.to": "Đến ngày",
      "block.allday": "Cả ngày",
      "block.start": "Từ giờ",
      "block.end": "Đến giờ",
      "block.reason": "Lý do",
      "block.reason.hint": "Chỉ tiệm thấy. Khách chỉ thấy là không còn giờ trống.",
      "block.reason.ph": "Nghỉ lễ, sửa tiệm, nghỉ phép",
      "block.reason.none": "Đã chặn",
      "block.error": "Giờ kết thúc phải sau giờ bắt đầu, và ngày kết thúc không trước ngày bắt đầu.",
      "block.inside": ({ n }) => `${n} lịch hẹn đã có trong khoảng này vẫn được giữ. Hãy báo cho khách nếu cần đổi.`,
      "block.save": "Chặn giờ",
      "block.update": "Lưu",
      "block.open": "Mở lại giờ này",
      "block.saved": "Đã chặn giờ",
      "block.opened": "Đã mở lại giờ",
      "cal.label": "Lịch hẹn theo giờ",
      note: "Dữ liệu mẫu. Đây là bản thiết kế, chưa nối với hệ thống.",
      count: ({ n }) => `${n} lịch`,
      minutes: ({ n }) => `${n} phút`,
      "title.week": ({ from, to }) => `Tuần ${from} – ${to}`,
      "lede.day": ({ n, p, c, today }) => {
        if (!n && !c) return today ? "Hôm nay chưa có lịch hẹn nào." : "Ngày này chưa có lịch hẹn nào.";
        let s = `${n} lịch hẹn ${today ? "hôm nay" : "trong ngày"}.`;
        if (p) s += ` ${p} lịch đang chờ bạn xác nhận.`;
        if (c) s += ` ${c} lịch đã huỷ.`;
        return s;
      },
      "lede.week": ({ n, p, c }) => {
        let s = `${n} lịch hẹn trong tuần.`;
        if (p) s += ` ${p} lịch đang chờ bạn xác nhận.`;
        if (c) s += ` ${c} lịch đã huỷ.`;
        return s;
      },
    },
    en: {
      "doc.title": "Bookings | pleasebookme",
      "view.label": "View",
      "view.calendar": "Calendar",
      "view.table": "Table",
      "range.label": "Range",
      "range.day": "Day",
      "range.week": "Week",
      "step.prev.day": "Previous day",
      "step.next.day": "Next day",
      "step.prev.week": "Previous week",
      "step.next.week": "Next week",
      "step.today": "Today",
      "show.cancelled": "Show cancelled",
      "st.PENDING": "Pending",
      "st.ACCEPTED": "Confirmed",
      "st.AWAITING_HOST": "Awaiting host",
      "st.REJECTED": "Rejected",
      "st.CANCELLED": "Cancelled",
      "col.time": "Time",
      "col.customer": "Customer",
      "col.service": "Service",
      "col.staff": "Staff",
      "col.status": "Status",
      "act.accept": "Confirm",
      "act.reject": "Reject",
      "act.cancel": "Cancel booking",
      "act.close": "Close",
      "toast.accept": "Confirmed {name}'s booking",
      "toast.reject": "Rejected {name}'s booking",
      "toast.cancel": "Cancelled {name}'s booking",
      "rail.pending": "Waiting for you",
      "rail.pending.empty": "Nothing is waiting for you.",
      "rail.next": "Next up today",
      "rail.next.empty": "No more bookings today.",
      "sheet.service": "Service",
      "sheet.when": "When",
      "sheet.staff": "Staff",
      "sheet.price": "Price",
      "sheet.phone": "Phone",
      "sheet.code": "Booking code",
      "empty.table": "No bookings yet. Send your booking page link so customers can pick a time.",
      "legend.label": "Colour key",
      "colour.label": "Colour by",
      "colour.status": "Status",
      "colour.branch": "Branch",
      "colour.staff": "Staff",
      "colour.widget": "Widget",
      "sheet.branch": "Branch",
      "sheet.widget": "Booked through",
      "source.hand": "Added by the shop",
      add: "Add booking",
      block: "Block time",
      todo: "Needs you",
      "rail.unmarked": "Past, to be marked",
      "rail.unmarked.hint": "Did the customer come? A booking stays here until you record it.",
      "rail.unmarked.empty": "Every past booking is recorded.",
      "rail.unmarked.more": ({ n }) => `and ${n} more`,
      "out.done": "Done",
      "out.noShow": "No-show",
      "out.wait": "To be marked",
      "act.done": "Came",
      "act.noshow": "No-show",
      "act.done.long": "Customer came",
      "act.noshow.long": "Customer did not come",
      "act.unmark": "Mark again",
      "act.move": "Change time",
      "toast.done": "Recorded: {name} came",
      "toast.noshow": "Recorded: {name} did not come",
      "toast.unmark": "{name}'s booking is waiting to be marked",
      "form.add": "Add booking",
      "form.move": "Change booking",
      "form.customer": "Customer's name",
      "form.customer.error": "Enter the customer's name.",
      "form.phone": "Phone number",
      "form.service": "Service",
      "form.staff": "Staff",
      "form.staff.any": "No preference",
      "form.date": "Date",
      "form.start": "Start time",
      "form.ends": ({ end, who }) => `Finishes at ${end}, with ${who}.`,
      "form.save.add": "Add booking",
      "form.save.move": "Save new time",
      "form.save.anyway": "Save anyway",
      "form.cancel": "Cancel",
      "form.added": "Added {name}'s booking",
      "form.moved": "Changed {name}'s booking",
      "warn.title": "This booking breaks the shop's rules. You can still save it.",
      "warn.past": "This time has passed.",
      "warn.hours": ({ hours }) => `Outside opening hours (${hours}).`,
      "warn.clash": ({ who, name, time }) => `${who} already has ${name} at ${time}.`,
      "warn.closed": ({ reason }) => `Inside blocked time: ${reason}.`,
      "block.title": "Block time",
      "block.edit": "Blocked time",
      "block.who": "Applies to",
      "block.all": ({ name }) => `The whole ${name} branch`,
      "block.shop": "The whole shop",
      "block.from": "From",
      "block.to": "To",
      "block.allday": "All day",
      "block.start": "From",
      "block.end": "Until",
      "block.reason": "Reason",
      "block.reason.hint": "Only the shop sees this. Customers just see no free times.",
      "block.reason.ph": "Holiday, repairs, leave",
      "block.reason.none": "Blocked",
      "block.error": "The end must be after the start, and the last day not before the first.",
      "block.inside": ({ n }) => `${n} ${plural(n, "booking", "bookings")} already in this period ${plural(n, "stays", "stay")}. Tell the ${plural(n, "customer", "customers")} if it needs to move.`,
      "block.save": "Block time",
      "block.update": "Save",
      "block.open": "Open this time again",
      "block.saved": "Time blocked",
      "block.opened": "Time opened again",
      "cal.label": "Bookings by hour",
      note: "Sample data. This is a design mockup, not connected to the system.",
      count: ({ n }) => `${n} ${plural(n, "booking", "bookings")}`,
      minutes: ({ n }) => `${n} min`,
      "title.week": ({ from, to }) => `Week of ${from} – ${to}`,
      "lede.day": ({ n, p, c, today }) => {
        if (!n && !c) return today ? "No bookings today yet." : "No bookings on this day.";
        let s = `${n} ${plural(n, "booking", "bookings")} ${today ? "today" : "on this day"}.`;
        if (p) s += ` ${p} ${plural(p, "is", "are")} waiting for you to confirm.`;
        if (c) s += ` ${c} cancelled.`;
        return s;
      },
      "lede.week": ({ n, p, c }) => {
        let s = `${n} ${plural(n, "booking", "bookings")} this week.`;
        if (p) s += ` ${p} ${plural(p, "is", "are")} waiting for you to confirm.`;
        if (c) s += ` ${c} cancelled.`;
        return s;
      },
    },
  });

  // ---------- Sample data (shared with Tổng quan) ----------

  const { TODAY, NOW, OPEN, CLOSE, STAFF, SERVICES, SERVICE_ORDER, BOOKINGS, BRANCHES, WIDGETS, CLOSURES } = PBM_SAMPLE;

  // What a booking's colour can stand for. Status is always there; the others
  // appear only when the shop has more than one of the thing to tell apart.
  const COLOURS = ["status"];
  if (BRANCHES.length > 1) COLOURS.push("branch");
  if (STAFF.length > 1) COLOURS.push("staff");
  if (WIDGETS.length > 1) COLOURS.push("widget");
  const HOUR = 64; // px per hour before the calendar is fitted to its panel
  const HOURS = (CLOSE - OPEN) / 60;
  const SHORT_PX = 40; // a block shorter than this shows its text on one line

  // ---------- State and helpers ----------

  const state = {
    view: "calendar",
    range: "day",
    date: TODAY,
    showCancelled: false,
    colour: "status",
    open: null,
    changed: null,
    entering: true,
    rail: false,
  };

  try {
    state.rail = localStorage.getItem("pbm-rail") === "open";
    const colour = localStorage.getItem("pbm-colour");
    if (COLOURS.includes(colour)) state.colour = colour;
  } catch {
    /* no storage: the rail just starts closed */
  }

  let hour = HOUR;

  const $ = (id) => document.getElementById(id);
  const addDays = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
  const offsetOf = (d) => Math.round((d - TODAY) / 864e5);
  const monday = (d) => addDays(d, -((d.getDay() + 6) % 7));
  const clock = (m) => String(Math.floor(m / 60)).padStart(2, "0") + ":" + String(m % 60).padStart(2, "0");
  const fmt = (opts, d) => new Intl.DateTimeFormat(PBM.locale, opts).format(d);
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const longDate = (d) => cap(fmt({ weekday: "long", day: "numeric", month: "long" }, d));
  const money = (n) => new Intl.NumberFormat(PBM.locale, { style: "currency", currency: "VND" }).format(n);
  const svcName = (b) => SERVICES[b.svc][PBM.lang];
  const staffName = (id) => STAFF.find((s) => s.id === id).name;
  const isLive = (b) => b.status !== "CANCELLED" && b.status !== "REJECTED";
  const shown = (b) => state.showCancelled || isLive(b);
  const byId = (id) => BOOKINGS.find((b) => b.id === Number(id));
  const byStart = (a, b) => a.day - b.day || a.start - b.start || a.staff - b.staff;

  const branchOf = (id) => BRANCHES.find((b) => b.id === id);
  const widgetOf = (id) => WIDGETS.find((w) => w.id === id);
  const staffOf = (id) => STAFF.find((s) => s.id === id);
  const inScope = (b) => PBM.branches.has(b.branch);
  const staffShown = () => STAFF.filter((s) => PBM.branches.has(s.branch));
  const severalBranches = () => BRANCHES.length > 1 && PBM.branches.chosen.length !== 1;

  // The colour a booking wears. A cancelled one is a ghost whatever the colours
  // stand for; one that is waiting keeps a dashed edge, so it still stands out
  // when the fill is busy saying something else.
  const codeOf = (b) =>
    ({ branch: branchOf(b.branch), staff: staffOf(b.staff), widget: sourceOf(b) })[state.colour]?.code;
  const paint = (b) =>
    state.colour === "status" || !isLive(b)
      ? ["st-" + b.status.toLowerCase()]
      : ["code-fill", "code-" + codeOf(b), b.status === "PENDING" ? "is-waiting" : ""].filter(Boolean);
  const codeDot = (b) => (state.colour === "status" ? "" : `<i class="code-dot code-${codeOf(b)}"></i>`);

  // Where a booking came from: a widget, or the shop's own hand.
  const HAND = () => ({ id: "hand", name: t("source.hand"), code: 8 });
  const sourceOf = (b) => widgetOf(b.widget) || HAND();

  // After its time, an accepted booking is "done", "noShow", or still waiting
  // ("wait") for someone to say which. Nothing counts as done by itself.
  const isPast = (b) => b.day < 0 || (b.day === 0 && b.end <= NOW);
  const outcomeOf = (b) => (b.status === "ACCEPTED" && isPast(b) ? b.outcome || "wait" : null);
  const statusBadge = (b) => {
    const out = outcomeOf(b);
    return out ? `<span class="badge out-${out.toLowerCase()}">${t("out." + out)}</span>` : badge(b.status);
  };

  // The closed periods that cover one person on one day, as minutes of that day.
  const closuresFor = (person, day) =>
    CLOSURES.filter(
      (c) => day >= c.fromDay && day <= c.toDay && (c.who === person.id || (c.who === "all" && c.branch === person.branch))
    ).map((c) => ({ ...c, start: c.from ?? 0, end: c.to ?? 24 * 60 }));

  const dayItems = (offset) => BOOKINGS.filter((b) => b.day === offset && inScope(b)).sort(byStart);
  const weekDays = () => {
    const start = monday(state.date);
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  };
  const rangeItems = () =>
    state.range === "day"
      ? dayItems(offsetOf(state.date))
      : weekDays().flatMap((d) => dayItems(offsetOf(d)));

  const badge = (status) => `<span class="badge st-${status.toLowerCase()}">${t("st." + status)}</span>`;

  // Bookings that overlap in one column share its width, side by side.
  function lanes(items) {
    let cluster = [];
    let clusterEnd = -1;
    const flush = () => {
      const ends = [];
      cluster.forEach((b) => {
        let lane = ends.findIndex((end) => end <= b.start);
        if (lane < 0) lane = ends.length;
        ends[lane] = b.end;
        b.lane = lane;
      });
      cluster.forEach((b) => (b.lanes = ends.length));
      cluster = [];
      clusterEnd = -1;
    };
    items.forEach((b) => {
      if (cluster.length && b.start >= clusterEnd) flush();
      cluster.push(b);
      clusterEnd = Math.max(clusterEnd, b.end);
    });
    if (cluster.length) flush();
    return items;
  }

  // ---------- Heading ----------

  function renderHead() {
    const items = rangeItems();
    const counts = {
      n: items.filter(isLive).length,
      p: items.filter((b) => b.status === "PENDING").length,
      c: items.filter((b) => b.status === "CANCELLED").length,
    };

    if (state.range === "day") {
      $("title").textContent = longDate(state.date);
      $("lede").textContent = t("lede.day", { ...counts, today: offsetOf(state.date) === 0 });
    } else {
      const days = weekDays();
      const sameMonth = days[0].getMonth() === days[6].getMonth();
      $("title").textContent = t("title.week", {
        from: fmt(sameMonth ? { day: "numeric" } : { day: "numeric", month: "long" }, days[0]),
        to: fmt({ day: "numeric", month: "long" }, days[6]),
      });
      $("lede").textContent = t("lede.week", counts);
    }
    document.title = t("doc.title");
  }

  // ---------- Toolbar ----------

  function renderToolbar() {
    const unit = state.range;
    $("toolbar").innerHTML = `
      <div class="datenav">
        <button class="icon-btn" type="button" data-step="-1" aria-label="${t("step.prev." + unit)}">${icon("left")}</button>
        <button class="btn btn-quiet btn-small" type="button" data-today>${t("step.today")}</button>
        <button class="icon-btn" type="button" data-step="1" aria-label="${t("step.next." + unit)}">${icon("right")}</button>
      </div>
      <div class="seg" id="rangeSeg" role="group" aria-label="${t("range.label")}" style="--n:2;--i:${unit === "day" ? 0 : 1}">
        <button type="button" data-range="day" aria-pressed="${unit === "day"}">${t("range.day")}</button>
        <button type="button" data-range="week" aria-pressed="${unit === "week"}">${t("range.week")}</button>
      </div>
      <div class="seg" id="viewSeg" role="group" aria-label="${t("view.label")}" style="--n:2;--i:${state.view === "calendar" ? 0 : 1}">
        <button type="button" data-view="calendar" aria-pressed="${state.view === "calendar"}">${icon("calendar")}<span>${t("view.calendar")}</span></button>
        <button type="button" data-view="table" aria-pressed="${state.view === "table"}">${icon("rows")}<span>${t("view.table")}</span></button>
      </div>
      ${PBM.branches.html()}
      ${
        COLOURS.length > 1
          ? `<label class="colour-by"><span>${t("colour.label")}</span>
              <select class="input input-small" id="colourBy">${COLOURS.map(
                (c) => `<option value="${c}" ${state.colour === c ? "selected" : ""}>${t("colour." + c)}</option>`
              ).join("")}</select></label>`
          : ""
      }
      <button class="btn btn-quiet btn-small pending-btn" type="button" data-rail aria-pressed="${state.rail}" aria-controls="rail">
        <span>${t("todo")}</span><span class="pill num" id="pendingCount"></span>
      </button>
      <button class="btn btn-quiet btn-small" type="button" data-block>${t("block")}</button>
      <button class="btn btn-primary btn-small" type="button" data-add>${icon("plus")}${t("add")}</button>`;
    $("board").classList.toggle("rail-open", state.rail);
  }

  // Moves the thumbs and labels in place, so the slide is not cut off by a redraw.
  function syncToolbar() {
    const set = (segId, attr, value, order) => {
      const seg = $(segId);
      seg.style.setProperty("--i", order.indexOf(value));
      seg.querySelectorAll("button").forEach((btn) => btn.setAttribute("aria-pressed", String(btn.dataset[attr] === value)));
    };
    set("viewSeg", "view", state.view, ["calendar", "table"]);
    set("rangeSeg", "range", state.range, ["day", "week"]);
    document.querySelector('[data-step="-1"]').setAttribute("aria-label", t("step.prev." + state.range));
    document.querySelector('[data-step="1"]').setAttribute("aria-label", t("step.next." + state.range));
  }

  // ---------- Calendar ----------

  function blockHTML(b, index, compact) {
    const top = (b.start - OPEN) / 60;
    const size = (b.end - b.start) / 60;
    const left = (b.lane / b.lanes) * 100;
    const width = 100 / b.lanes;
    const label = `${clock(b.start)} – ${clock(b.end)}, ${b.customer}, ${svcName(b)}, ${staffName(b.staff)}, ${t("st." + b.status)}`;
    const classes = ["block", ...paint(b)];
    const out = outcomeOf(b);
    if (out) classes.push("is-" + out.toLowerCase());
    if (size * hour < SHORT_PX) classes.push("is-short");
    if (compact) classes.push("is-compact");
    if (compact && b.lanes > 1) classes.push("is-narrow");
    if (state.changed === b.id) classes.push("is-changed");
    return `<button type="button" class="${classes.join(" ")}" data-bk="${b.id}" data-size="${size}" aria-label="${label}" title="${label}"
        style="top:calc(${top} * var(--hour));height:calc(${size} * var(--hour) - 2px);left:calc(${left}% + 3px);width:calc(${width}% - 6px);--i:${index}">
        <span class="block-top"><span class="block-time num">${clock(b.start)}</span><strong>${b.customer}</strong></span>
        <span class="block-svc">${svcName(b)}</span>
      </button>`;
  }

  function calendarHTML() {
    const isDay = state.range === "day";
    const offset = offsetOf(state.date);
    let index = 0;

    const columns = isDay
      ? staffShown().map((person) => {
          const items = dayItems(offset).filter((b) => b.staff === person.id);
          const branch = branchOf(person.branch);
          // With more than one branch on show, each column says which branch it is.
          const where = severalBranches()
            ? `${state.colour === "branch" ? `<i class="code-dot code-${branch.code}"></i>` : ""}${branch.name}, `
            : "";
          return {
            today: false,
            head: `<span class="avatar${state.colour === "staff" ? ` code-fill code-${person.code}` : ""}" aria-hidden="true">${person.name.charAt(0)}</span>
                   <span class="colhead-text"><strong>${person.name}</strong><span>${where}${t("count", { n: items.filter(isLive).length })}</span></span>`,
            items,
            attrs: `data-day="${offset}" data-staff="${person.id}"`,
            closed: closuresFor(person, offset),
          };
        })
      : weekDays().map((d) => {
          const o = offsetOf(d);
          return {
            today: o === 0,
            head: `<span class="colhead-text is-date"><span>${cap(fmt({ weekday: "short" }, d))}</span><strong class="num">${d.getDate()}</strong></span>`,
            items: dayItems(o),
            attrs: `data-day="${o}"`,
            // A week column is the whole shop, so it shows only what closes a whole branch.
            closed: BRANCHES.filter((b) => PBM.branches.has(b.id)).flatMap((b) =>
              closuresFor({ id: null, branch: b.id }, o).map((c) => ({ ...c, label: severalBranches() ? `${b.name}: ${c.reason}` : c.reason }))
            ),
          };
        });

    const hours = [];
    for (let m = OPEN; m <= CLOSE; m += 60) {
      hours.push(`<span class="num" style="top:calc(${(m - OPEN) / 60} * var(--hour))">${clock(m)}</span>`);
    }

    const nowLine = (inColumn) =>
      `<div class="now${inColumn ? " in-col" : ""}" style="top:calc(${(NOW - OPEN) / 60} * var(--hour))"><span class="num">${clock(NOW)}</span></div>`;

    const cols = columns
      .map((col) => {
        const blocks = lanes(col.items.filter(shown))
          .map((b) => blockHTML(b, index++, !isDay))
          .join("");
        const closed = col.closed
          .map((c) => {
            const from = Math.max(c.start, OPEN);
            const to = Math.min(c.end, CLOSE);
            const label = c.label || c.reason || t("block.reason.none");
            return `<button type="button" class="closed" data-closure="${c.id}" title="${label}" style="top:calc(${(from - OPEN) / 60} * var(--hour));height:calc(${(to - from) / 60} * var(--hour) - 2px)"><span>${label}</span></button>`;
          })
          .join("");
        return `<div class="cal-col${col.today ? " is-today" : ""}" ${col.attrs}>${closed}${blocks}${!isDay && col.today ? nowLine(true) : ""}</div>`;
      })
      .join("");

    return `
      <div class="cal-scroll" id="calScroll" tabindex="0" aria-label="${t("cal.label")}">
        <div class="cal ${isDay ? "cal-day" : "cal-week"}" style="--cols:${columns.length};--hours:${HOURS};--hour:${hour}px">
          <div class="cal-head">
            <div class="cal-corner"></div>
            ${columns.map((col) => `<div class="cal-colhead${col.today ? " is-today" : ""}">${col.head}</div>`).join("")}
          </div>
          <div class="cal-body">
            <div class="cal-times">${hours.join("")}</div>
            ${cols}
            ${isDay && offset === 0 ? nowLine(false) : ""}
          </div>
        </div>
      </div>`;
  }

  // The key follows what the colours stand for, and lists only what is on screen.
  function keyHTML() {
    if (state.colour === "status") {
      return `<span><i class="swatch st-accepted"></i>${t("st.ACCEPTED")}</span>
          <span><i class="swatch st-pending"></i>${t("st.PENDING")}</span>`;
    }
    const used = new Set(rangeItems().map((b) => b.widget));
    const items = {
      branch: BRANCHES.filter((b) => PBM.branches.has(b.id)),
      staff: staffShown(),
      widget: [...WIDGETS.filter((w) => used.has(w.id)), ...(used.has("hand") ? [HAND()] : [])],
    }[state.colour];
    return (
      items.map((item) => `<span><i class="swatch code-fill code-${item.code}"></i>${item.name}</span>`).join("") +
      `<span><i class="swatch swatch-waiting"></i>${t("st.PENDING")}</span>`
    );
  }

  const footHTML = () => `
      <footer class="stage-foot">
        <div class="legend" aria-label="${t("legend.label")}">
          ${keyHTML()}
          <span><i class="swatch st-cancelled"></i>${t("st.CANCELLED")}</span>
          <label class="toggle">
            <input type="checkbox" id="showCancelled" ${state.showCancelled ? "checked" : ""} />
            <span>${t("show.cancelled")}</span>
          </label>
        </div>
        <span>${t("note")}</span>
      </footer>`;

  // Stretch the hours so the working day fills the panel. On a short window
  // the hours stop shrinking at 44px and the calendar scrolls instead.
  function fitHours() {
    const scroller = $("calScroll");
    if (!scroller) return;
    const pageScrolls = matchMedia("(max-width: 1000px), (max-height: 560px)").matches;
    const room = scroller.clientHeight - scroller.querySelector(".cal-head").offsetHeight - 34;
    hour = pageScrolls ? HOUR : Math.min(120, Math.max(44, room / HOURS));
    scroller.querySelector(".cal").style.setProperty("--hour", hour + "px");
    scroller.querySelectorAll(".block").forEach((el) => {
      el.classList.toggle("is-short", el.dataset.size * hour < SHORT_PX);
    });
  }

  // ---------- Table ----------

  function rowHTML(b) {
    const service = SERVICES[b.svc];
    const actions =
      b.status === "PENDING"
        ? `<button class="icon-btn act-yes" type="button" data-act="accept" data-id="${b.id}" aria-label="${t("act.accept")}: ${b.customer}" title="${t("act.accept")}">${icon("check")}</button>
           <button class="icon-btn act-no" type="button" data-act="reject" data-id="${b.id}" aria-label="${t("act.reject")}: ${b.customer}" title="${t("act.reject")}">${icon("x")}</button>`
        : "";
    const classes = ["tr", "st-row-" + b.status.toLowerCase()];
    if (state.changed === b.id) classes.push("is-changed");
    return `<div class="${classes.join(" ")}" role="row" tabindex="0" data-bk="${b.id}">
        <span role="cell" class="num cell-time">${codeDot(b)}${clock(b.start)} – ${clock(b.end)}</span>
        <span role="cell" class="cell-main"><strong>${b.customer}</strong><span class="num">${b.uid}</span></span>
        <span role="cell" class="cell-main"><strong>${service[PBM.lang]}</strong><span>${t("minutes", { n: service.min })}</span></span>
        <span role="cell" class="cell-staff"><span class="avatar" aria-hidden="true">${staffName(b.staff).charAt(0)}</span><span class="cell-main"><strong>${staffName(b.staff)}</strong>${
          BRANCHES.length > 1 ? `<span>${branchOf(b.branch).name}</span>` : ""
        }</span></span>
        <span role="cell">${statusBadge(b)}</span>
        <span role="cell" class="cell-actions">${actions}</span>
      </div>`;
  }

  function tableHTML() {
    const days = state.range === "day" ? [state.date] : weekDays();
    const groups = days
      .map((d) => ({ d, items: dayItems(offsetOf(d)).filter(shown) }))
      .filter((g) => g.items.length);

    if (!groups.length) {
      return `<div class="empty"><p>${t("empty.table")}</p>
        <button class="btn btn-primary" type="button" data-share>${icon("copy")}${t("share.copy")}</button></div>`;
    }

    const body = groups
      .map((g) => {
        const header =
          state.range === "week"
            ? `<div class="tr group" role="row"><span role="cell">${longDate(g.d)}</span><span role="cell" class="group-count">${t("count", { n: g.items.filter(isLive).length })}</span></div>`
            : "";
        return header + g.items.map(rowHTML).join("");
      })
      .join("");

    return `<div class="tbl-scroll"><div class="tbl" role="table">
        <div class="tr th" role="row">
          <span role="columnheader">${t("col.time")}</span>
          <span role="columnheader">${t("col.customer")}</span>
          <span role="columnheader">${t("col.service")}</span>
          <span role="columnheader">${t("col.staff")}</span>
          <span role="columnheader">${t("col.status")}</span>
          <span role="columnheader"></span>
        </div>
        ${body}
      </div></div>`;
  }

  function renderStage() {
    const stage = $("stage");
    stage.innerHTML = (state.view === "calendar" ? calendarHTML() : tableHTML()) + footHTML();
    stage.classList.toggle("is-entering", state.entering);
    fitHours();

    // If the day does not fit, open with the current time in view.
    const scroller = $("calScroll");
    if (scroller) scroller.scrollTop = Math.max(0, ((NOW - OPEN) / 60) * hour - 150);

    if (state.focusId) {
      $(state.focusId)?.focus();
      state.focusId = null;
    }
  }

  // ---------- Right rail ----------

  function renderRail() {
    const pending = BOOKINGS.filter((b) => b.status === "PENDING" && b.day >= 0 && inScope(b)).sort(byStart);
    const next = dayItems(0)
      .filter((b) => b.status === "ACCEPTED" && b.start >= NOW)
      .slice(0, 4);

    const when = (b) =>
      b.day === 0 ? clock(b.start) : `${cap(fmt({ weekday: "short" }, addDays(TODAY, b.day)))}, ${clock(b.start)}`;

    // Newest first: the booking that has just ended is the one the owner remembers.
    const unmarked = BOOKINGS.filter((b) => outcomeOf(b) === "wait" && inScope(b)).sort((a, b) => b.day - a.day || b.start - a.start);

    const count = $("pendingCount");
    count.textContent = pending.length + unmarked.length;
    count.hidden = !(pending.length + unmarked.length);

    $("rail").innerHTML = `
      <section class="panel rail-panel">
        <h2>${t("rail.pending")}${pending.length ? ` <span class="pill num">${pending.length}</span>` : ""}</h2>
        ${
          pending.length
            ? `<ul class="queue">${pending
                .map(
                  (b) => `<li>
                    <button type="button" class="queue-main" data-bk="${b.id}">
                      <strong>${b.customer}</strong>
                      <span>${svcName(b)}, ${staffName(b.staff)}</span>
                      <span class="num queue-when">${when(b)}</span>
                    </button>
                    <div class="queue-actions">
                      <button class="btn btn-primary btn-small" type="button" data-act="accept" data-id="${b.id}">${t("act.accept")}</button>
                      <button class="btn btn-quiet btn-small" type="button" data-act="reject" data-id="${b.id}">${t("act.reject")}</button>
                    </div>
                  </li>`
                )
                .join("")}</ul>`
            : `<p class="rail-empty">${t("rail.pending.empty")}</p>`
        }
      </section>
      <section class="panel rail-panel">
        <h2>${t("rail.unmarked")}${unmarked.length ? ` <span class="pill num">${unmarked.length}</span>` : ""}</h2>
        ${
          unmarked.length
            ? `<p class="rail-hint">${t("rail.unmarked.hint")}</p>
               <ul class="queue">${unmarked
                 .slice(0, 6)
                 .map(
                   (b) => `<li>
                    <button type="button" class="queue-main" data-bk="${b.id}">
                      <strong>${b.customer}</strong>
                      <span>${svcName(b)}, ${staffName(b.staff)}</span>
                      <span class="num queue-when">${when(b)}</span>
                    </button>
                    <div class="queue-actions">
                      <button class="btn btn-primary btn-small" type="button" data-act="done" data-id="${b.id}">${t("act.done")}</button>
                      <button class="btn btn-quiet btn-small" type="button" data-act="noshow" data-id="${b.id}">${t("act.noshow")}</button>
                    </div>
                  </li>`
                 )
                 .join("")}</ul>
               ${unmarked.length > 6 ? `<p class="rail-hint">${t("rail.unmarked.more", { n: unmarked.length - 6 })}</p>` : ""}`
            : `<p class="rail-empty">${t("rail.unmarked.empty")}</p>`
        }
      </section>
      <section class="panel rail-panel">
        <h2>${t("rail.next")}</h2>
        ${
          next.length
            ? `<ul class="upnext">${next
                .map(
                  (b) => `<li><button type="button" data-bk="${b.id}">
                    <span class="num upnext-time">${clock(b.start)}</span>
                    <span class="upnext-text"><strong>${b.customer}</strong><span>${svcName(b)}, ${staffName(b.staff)}</span></span>
                  </button></li>`
                )
                .join("")}</ul>`
            : `<p class="rail-empty">${t("rail.next.empty")}</p>`
        }
      </section>`;
  }

  // ---------- Booking sheet ----------

  let lastFocus = null;

  function renderSheet() {
    const sheet = $("sheet");
    const b = state.open && byId(state.open);
    if (!b) {
      sheet.hidden = true;
      return;
    }
    const service = SERVICES[b.svc];
    // What can be done to a booking depends on where it is in its life.
    const out = outcomeOf(b);
    let actions = "";
    if (b.status === "PENDING") {
      actions = `<button class="btn btn-primary" type="button" data-act="accept" data-id="${b.id}">${icon("check")}${t("act.accept")}</button>
           <button class="btn btn-quiet" type="button" data-act="reject" data-id="${b.id}">${t("act.reject")}</button>`;
    } else if (out === "wait") {
      actions = `<button class="btn btn-primary" type="button" data-act="done" data-id="${b.id}">${icon("check")}${t("act.done.long")}</button>
           <button class="btn btn-quiet" type="button" data-act="noshow" data-id="${b.id}">${t("act.noshow.long")}</button>`;
    } else if (out) {
      actions = `<button class="btn btn-quiet" type="button" data-act="unmark" data-id="${b.id}">${t("act.unmark")}</button>`;
    } else if (b.status === "ACCEPTED") {
      actions = `<button class="btn btn-primary" type="button" data-move-bk="${b.id}">${t("act.move")}</button>
           <button class="btn btn-quiet" type="button" data-act="cancel" data-id="${b.id}">${t("act.cancel")}</button>`;
    }

    sheet.innerHTML = `
      <header class="sheet-head">
        <div>
          ${statusBadge(b)}
          <h2 id="sheet-name">${b.customer}</h2>
        </div>
        <button class="icon-btn" type="button" data-close aria-label="${t("act.close")}">${icon("x")}</button>
      </header>
      <dl class="facts">
        <div><dt>${t("sheet.when")}</dt><dd>${longDate(addDays(TODAY, b.day))}<br /><span class="num">${clock(b.start)} – ${clock(b.end)}</span></dd></div>
        <div><dt>${t("sheet.service")}</dt><dd>${service[PBM.lang]}<br /><span>${t("minutes", { n: service.min })}</span></dd></div>
        <div><dt>${t("sheet.staff")}</dt><dd>${staffName(b.staff)}</dd></div>
        ${BRANCHES.length > 1 ? `<div><dt>${t("sheet.branch")}</dt><dd>${branchOf(b.branch).name}</dd></div>` : ""}
        <div><dt>${t("sheet.price")}</dt><dd class="num">${money(service.price)}</dd></div>
        <div><dt>${t("sheet.widget")}</dt><dd>${sourceOf(b).name}</dd></div>
        <div><dt>${t("sheet.phone")}</dt><dd class="num">${b.phone}</dd></div>
        <div><dt>${t("sheet.code")}</dt><dd class="num">${b.uid}</dd></div>
      </dl>
      ${actions ? `<footer class="sheet-actions">${actions}</footer>` : ""}`;
    sheet.hidden = false;
  }

  function openSheet(id) {
    lastFocus = document.activeElement;
    state.open = Number(id);
    renderSheet();
    $("sheet").querySelector("[data-close]").focus();
  }

  function closeSheet() {
    if (!state.open) return;
    state.open = null;
    renderSheet();
    if (lastFocus && document.contains(lastFocus)) lastFocus.focus();
  }

  // ---------- Adding or moving a booking, and blocking time ----------
  // Both open in the same window. The owner is not held to the shop's rules:
  // a booking that breaks one says which, and can be saved anyway.

  const dialog = $("dialog");
  const pad = (n) => String(n).padStart(2, "0");
  const clean = (text) => text.replace(/[<>&"]/g, "").trim();
  const isoOf = (day) => {
    const d = addDays(TODAY, day);
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  };
  const dayOfIso = (iso) => {
    const [y, m, d] = iso.split("-").map(Number);
    return offsetOf(new Date(y, m - 1, d));
  };
  const hoursOf = (branch) => (branch ? [Number(branch.hours.slice(0, 2)) * 60, Number(branch.hours.slice(-5, -3)) * 60] : [OPEN, CLOSE]);
  const timeOptions = (chosen, from = 6 * 60, to = 22 * 60) => {
    let html = "";
    for (let m = from; m <= to; m += 15) html += `<option value="${m}" ${m === chosen ? "selected" : ""}>${clock(m)}</option>`;
    return html;
  };
  const clashWith = (f, person, end) =>
    BOOKINGS.find((b) => b.id !== f.id && b.day === f.day && b.staff === person.id && isLive(b) && f.start < b.end && b.start < end);

  // "Ai cũng được": the first person who does the service and is free then;
  // failing that, the first who does it at all.
  function personFor(f) {
    if (f.staff !== "any") return staffOf(Number(f.staff));
    const able = staffShown().filter((person) => SERVICES[f.svc].staff.includes(person.id));
    const end = f.start + SERVICES[f.svc].min;
    return able.find((person) => !clashWith(f, person, end)) || able[0] || staffShown()[0];
  }

  function warningsFor(f) {
    const person = personFor(f);
    const end = f.start + SERVICES[f.svc].min;
    const branch = branchOf(person.branch);
    const [open, close] = hoursOf(branch);
    const list = [];
    if (f.day < 0 || (f.day === 0 && f.start < NOW)) list.push(t("warn.past"));
    if (f.start < open || end > close) list.push(t("warn.hours", { hours: branch ? branch.hours : `${clock(OPEN)} – ${clock(CLOSE)}` }));
    const clash = clashWith(f, person, end);
    if (clash) list.push(t("warn.clash", { who: person.name, name: clash.customer, time: clock(clash.start) }));
    const closed = closuresFor(person, f.day).find((c) => f.start < c.end && c.start < end);
    if (closed) list.push(t("warn.closed", { reason: closed.reason || t("block.reason.none") }));
    return list;
  }

  function bookingFormHTML() {
    const f = state.form;
    const moving = f.id !== null;
    const able = staffShown().filter((person) => SERVICES[f.svc].staff.includes(person.id));
    if (f.staff !== "any" && !able.some((person) => person.id === Number(f.staff))) f.staff = "any";
    const person = personFor(f);
    const warnings = warningsFor(f);
    const noName = f.tried && !clean(f.customer);
    return `
      <form class="dialog-form" id="bk-form" data-kind="booking" novalidate>
        <header class="dialog-head">
          <h2 id="dialog-title">${t(moving ? "form.move" : "form.add")}</h2>
          <button class="icon-btn" type="button" data-dialog-close aria-label="${t("act.close")}">${icon("x")}</button>
        </header>
        <div class="dialog-body">
          <div class="field-pair">
            <div class="field">
              <label for="bk-customer">${t("form.customer")}</label>
              <input class="input" id="bk-customer" data-f="customer" value="${clean(f.customer)}" autocomplete="off" ${noName ? 'aria-invalid="true"' : ""} />
              <span class="error" ${noName ? "" : "hidden"}>${t("form.customer.error")}</span>
            </div>
            <div class="field">
              <label for="bk-phone">${t("form.phone")}</label>
              <input class="input" id="bk-phone" data-f="phone" value="${clean(f.phone)}" inputmode="tel" autocomplete="off" />
            </div>
          </div>
          <div class="field-pair">
            <div class="field">
              <label for="bk-svc">${t("form.service")}</label>
              <select class="input" id="bk-svc" data-f="svc">${SERVICE_ORDER.map(
                (id) => `<option value="${id}" ${id === f.svc ? "selected" : ""}>${SERVICES[id][PBM.lang]}, ${t("minutes", { n: SERVICES[id].min })}</option>`
              ).join("")}</select>
            </div>
            <div class="field">
              <label for="bk-staff">${t("form.staff")}</label>
              <select class="input" id="bk-staff" data-f="staff">
                <option value="any" ${f.staff === "any" ? "selected" : ""}>${t("form.staff.any")}</option>
                ${able
                  .map(
                    (p) =>
                      `<option value="${p.id}" ${Number(f.staff) === p.id ? "selected" : ""}>${p.name}${severalBranches() ? ", " + branchOf(p.branch).name : ""}</option>`
                  )
                  .join("")}
              </select>
            </div>
          </div>
          <div class="field-pair">
            <div class="field">
              <label for="bk-date">${t("form.date")}</label>
              <input class="input" id="bk-date" type="date" data-f="date" value="${isoOf(f.day)}" />
            </div>
            <div class="field">
              <label for="bk-start">${t("form.start")}</label>
              <select class="input num" id="bk-start" data-f="start">${timeOptions(f.start)}</select>
            </div>
          </div>
          <p class="dialog-note">${t("form.ends", { end: clock(f.start + SERVICES[f.svc].min), who: person.name })}</p>
          ${
            warnings.length
              ? `<div class="warn" role="status"><strong>${t("warn.title")}</strong><ul>${warnings.map((w) => `<li>${w}</li>`).join("")}</ul></div>`
              : ""
          }
        </div>
        <footer class="dialog-foot">
          <button class="btn btn-quiet" type="button" data-dialog-close>${t("form.cancel")}</button>
          <button class="btn btn-primary" type="submit">${t(warnings.length ? "form.save.anyway" : moving ? "form.save.move" : "form.save.add")}</button>
        </footer>
      </form>`;
  }

  // The bookings already inside a period that is about to be blocked.
  function insideBlock(f) {
    return BOOKINGS.filter((b) => {
      if (!isLive(b) || b.day < f.fromDay || b.day > f.toDay) return false;
      const person = staffOf(b.staff);
      const [kind, id] = f.who.split(":");
      if (kind === "s" ? person.id !== Number(id) : person.branch !== id) return false;
      return f.allDay || (f.from < b.end && b.start < f.to);
    }).length;
  }

  function blockFormHTML() {
    const f = state.block;
    const editing = f.id !== null;
    const bad = f.tried && (f.toDay < f.fromDay || (!f.allDay && f.to <= f.from));
    const inside = insideBlock(f);
    const branches = BRANCHES.filter((b) => PBM.branches.has(b.id));
    return `
      <form class="dialog-form" id="bk-form" data-kind="block" novalidate>
        <header class="dialog-head">
          <h2 id="dialog-title">${t(editing ? "block.edit" : "block.title")}</h2>
          <button class="icon-btn" type="button" data-dialog-close aria-label="${t("act.close")}">${icon("x")}</button>
        </header>
        <div class="dialog-body">
          <div class="field">
            <label for="bl-who">${t("block.who")}</label>
            <select class="input" id="bl-who" data-f="who">
              ${branches
                .map(
                  (b) =>
                    `<option value="all:${b.id}" ${f.who === "all:" + b.id ? "selected" : ""}>${BRANCHES.length > 1 ? t("block.all", { name: b.name }) : t("block.shop")}</option>`
                )
                .join("")}
              ${staffShown()
                .map((p) => `<option value="s:${p.id}" ${f.who === "s:" + p.id ? "selected" : ""}>${p.name}</option>`)
                .join("")}
            </select>
          </div>
          <div class="field-pair">
            <div class="field"><label for="bl-from">${t("block.from")}</label><input class="input" id="bl-from" type="date" data-f="fromDay" value="${isoOf(f.fromDay)}" /></div>
            <div class="field"><label for="bl-to">${t("block.to")}</label><input class="input" id="bl-to" type="date" data-f="toDay" value="${isoOf(f.toDay)}" /></div>
          </div>
          <label class="switch-row"><span>${t("block.allday")}</span><input class="switch" type="checkbox" data-f="allDay" ${f.allDay ? "checked" : ""} /></label>
          ${
            f.allDay
              ? ""
              : `<div class="field-pair">
                  <div class="field"><label for="bl-start">${t("block.start")}</label><select class="input num" id="bl-start" data-f="from">${timeOptions(f.from)}</select></div>
                  <div class="field"><label for="bl-end">${t("block.end")}</label><select class="input num" id="bl-end" data-f="to">${timeOptions(f.to)}</select></div>
                </div>`
          }
          <div class="field">
            <label for="bl-reason">${t("block.reason")}</label>
            <input class="input" id="bl-reason" data-f="reason" value="${clean(f.reason)}" placeholder="${t("block.reason.ph")}" autocomplete="off" />
            <small>${t("block.reason.hint")}</small>
          </div>
          <span class="error" ${bad ? "" : "hidden"}>${t("block.error")}</span>
          ${inside ? `<div class="warn" role="status"><ul><li>${t("block.inside", { n: inside })}</li></ul></div>` : ""}
        </div>
        <footer class="dialog-foot">
          ${editing ? `<button class="btn btn-quiet btn-danger" type="button" data-block-open>${t("block.open")}</button>` : ""}
          <span class="spacer"></span>
          <button class="btn btn-quiet" type="button" data-dialog-close>${t("form.cancel")}</button>
          <button class="btn btn-primary" type="submit">${t(editing ? "block.update" : "block.save")}</button>
        </footer>
      </form>`;
  }

  function renderDialog() {
    dialog.innerHTML = state.form ? bookingFormHTML() : state.block ? blockFormHTML() : "";
  }

  function showDialog(focusId) {
    lastFocus = document.activeElement;
    closeSheet();
    renderDialog();
    if (!dialog.open) dialog.showModal();
    $(focusId)?.focus();
  }

  function openForm(seed) {
    const quarter = Math.ceil(NOW / 15) * 15;
    const day = Math.max(0, offsetOf(state.date));
    state.block = null;
    state.form = { id: null, customer: "", phone: "", svc: SERVICE_ORDER[0], staff: "any", day, start: day === 0 ? quarter : 9 * 60, tried: false, ...seed };
    showDialog("bk-customer");
  }

  function openBlock(seed) {
    const day = Math.max(0, offsetOf(state.date));
    const first = BRANCHES.find((b) => PBM.branches.has(b.id));
    state.form = null;
    state.block = { id: null, who: first ? "all:" + first.id : "s:" + staffShown()[0].id, fromDay: day, toDay: day, allDay: true, from: 12 * 60, to: 14 * 60, reason: "", tried: false, ...seed };
    showDialog("bl-who");
  }

  function closeDialog() {
    state.form = null;
    state.block = null;
    if (dialog.open) dialog.close();
    dialog.innerHTML = "";
    if (lastFocus && document.contains(lastFocus)) lastFocus.focus();
  }

  function saveBooking() {
    const f = state.form;
    f.tried = true;
    if (!clean(f.customer)) {
      renderDialog();
      return $("bk-customer").focus();
    }
    const person = personFor(f);
    const fields = { day: f.day, start: f.start, end: f.start + SERVICES[f.svc].min, svc: f.svc, staff: person.id, branch: person.branch, customer: clean(f.customer), phone: clean(f.phone) };
    let b = f.id !== null && byId(f.id);
    if (b) Object.assign(b, fields);
    else {
      const id = BOOKINGS.length + 1;
      b = { id, uid: "BK-" + (0x7a3f10 + id * 7919).toString(16).toUpperCase().slice(-6), cust: null, status: "ACCEPTED", noShow: false, outcome: null, widget: "hand", ...fields };
      BOOKINGS.push(b);
    }
    const moved = f.id !== null;
    closeDialog();
    state.entering = false;
    state.changed = b.id;
    state.date = addDays(TODAY, b.day);
    swap(renderAll);
    toast(t(moved ? "form.moved" : "form.added", { name: b.customer }));
  }

  function saveBlock() {
    const f = state.block;
    f.tried = true;
    if (f.toDay < f.fromDay || (!f.allDay && f.to <= f.from)) return renderDialog();
    const [kind, id] = f.who.split(":");
    const fields = {
      who: kind === "s" ? Number(id) : "all",
      branch: kind === "s" ? staffOf(Number(id)).branch : id,
      fromDay: f.fromDay,
      toDay: f.toDay,
      from: f.allDay ? null : f.from,
      to: f.allDay ? null : f.to,
      reason: clean(f.reason),
    };
    const existing = CLOSURES.find((c) => c.id === f.id);
    if (existing) Object.assign(existing, fields);
    else CLOSURES.push({ id: Math.max(0, ...CLOSURES.map((c) => c.id)) + 1, ...fields });
    closeDialog();
    change({ date: addDays(TODAY, fields.fromDay) });
    toast(t("block.saved"));
  }

  dialog.addEventListener("submit", (event) => {
    event.preventDefault();
    if (event.target.dataset.kind === "booking") saveBooking();
    else saveBlock();
  });

  dialog.addEventListener("input", (event) => {
    const key = event.target.dataset.f;
    const f = state.form || state.block;
    // Typing only updates the draft; the window is redrawn when a choice changes.
    if (f && (key === "customer" || key === "phone" || key === "reason")) f[key] = event.target.value;
  });

  dialog.addEventListener("change", (event) => {
    const el = event.target;
    const key = el.dataset.f;
    const f = state.form || state.block;
    if (!f || !key || key === "customer" || key === "phone" || key === "reason") return;
    if (key === "date" || key === "fromDay" || key === "toDay") {
      if (!el.value) return;
      f[key === "date" ? "day" : key] = dayOfIso(el.value);
    } else if (key === "start" || key === "from" || key === "to") f[key] = Number(el.value);
    else if (key === "allDay") f.allDay = el.checked;
    else f[key] = el.value;
    renderDialog();
    dialog.querySelector(`[data-f="${key}"]`)?.focus();
  });

  dialog.addEventListener("click", (event) => {
    if (event.target.closest("[data-dialog-close]")) return closeDialog();
    if (event.target.closest("[data-block-open]")) {
      CLOSURES.splice(CLOSURES.findIndex((c) => c.id === state.block.id), 1);
      closeDialog();
      change({});
      toast(t("block.opened"));
    }
  });

  // Escape closes the window; keep the drafts in step with it.
  dialog.addEventListener("close", () => {
    state.form = null;
    state.block = null;
  });

  // ---------- Updates ----------

  function renderAll() {
    renderHead();
    renderStage();
    renderRail();
    renderSheet();
  }

  // A booking gets the same view-transition-name as a row and as a calendar
  // block, so the browser treats them as one object and glides it between the
  // two layouts. Only bookings on screen are named: a named element is drawn
  // unclipped while it moves, so hidden ones would fly across the page.
  function nameVisible() {
    const stage = $("stage");
    const scroller = $("calScroll") || stage.querySelector(".tbl-scroll") || stage;
    const frame = scroller.getBoundingClientRect();
    const top = frame.top + (stage.querySelector(".cal-head, .tr.th")?.offsetHeight || 0);
    const bottom = Math.min(frame.bottom, innerHeight);
    stage.querySelectorAll(".block[data-bk], .tr[data-bk]").forEach((el) => {
      const box = el.getBoundingClientRect();
      const visible = box.top >= top - 4 && box.bottom <= bottom + 4 && box.right > frame.left && box.left < frame.right;
      el.style.viewTransitionName = visible ? "bk-" + el.dataset.bk : "";
    });
  }

  function swap(update) {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduce) return update();
    nameVisible();
    const transition = document.startViewTransition(() => {
      update();
      nameVisible();
    });
    // A newer transition (or a hidden tab) skips this one; the update still ran.
    transition.ready.catch(() => {});
    transition.finished.catch(() => {});
  }

  function change(patch) {
    state.entering = false;
    state.changed = null;
    Object.assign(state, patch);
    syncToolbar();
    swap(renderAll);
  }

  const NEXT_STATUS = { accept: "ACCEPTED", reject: "REJECTED", cancel: "CANCELLED" };

  function act(id, action) {
    const b = byId(id);
    if (action === "done" || action === "noshow") {
      b.outcome = action === "done" ? "done" : "noShow";
      b.noShow = action === "noshow";
    } else if (action === "unmark") {
      b.outcome = null;
      b.noShow = false;
    } else b.status = NEXT_STATUS[action];
    state.entering = false;
    state.changed = b.id;
    swap(renderAll);
    toast(t("toast." + action, { name: b.customer }));
  }

  // ---------- Events ----------

  $("toolbar").addEventListener("click", (event) => {
    const btn = event.target.closest("button");
    if (!btn) return;
    if (btn.dataset.view && btn.dataset.view !== state.view) change({ view: btn.dataset.view });
    else if (btn.dataset.range && btn.dataset.range !== state.range) change({ range: btn.dataset.range });
    else if (btn.dataset.step) change({ date: addDays(state.date, Number(btn.dataset.step) * (state.range === "week" ? 7 : 1)) });
    else if ("today" in btn.dataset) change({ date: TODAY });
    else if ("add" in btn.dataset) openForm({});
    else if ("block" in btn.dataset) openBlock({});
    else if ("rail" in btn.dataset) {
      state.rail = !state.rail;
      btn.setAttribute("aria-pressed", String(state.rail));
      $("board").classList.toggle("rail-open", state.rail);
      try {
        localStorage.setItem("pbm-rail", state.rail ? "open" : "closed");
      } catch {
        /* no storage */
      }
    }
  });

  document.addEventListener("change", (event) => {
    if (event.target.id === "showCancelled") {
      change({ showCancelled: event.target.checked, focusId: "showCancelled" });
    }
    if (event.target.id === "colourBy") {
      try {
        localStorage.setItem("pbm-colour", event.target.value);
      } catch {
        /* no storage */
      }
      change({ colour: event.target.value });
    }
  });

  // The branch picker keeps its own ticks; the page only has to redraw.
  PBM.branches.onChange(() => change({}));

  document.addEventListener("click", (event) => {
    if (event.target.closest("dialog")) return;
    const action = event.target.closest("[data-act]");
    if (action) return act(action.dataset.id, action.dataset.act);

    const move = event.target.closest("[data-move-bk]");
    if (move) {
      const b = byId(move.dataset.moveBk);
      return openForm({ id: b.id, customer: b.customer, phone: b.phone, svc: b.svc, staff: String(b.staff), day: b.day, start: b.start });
    }

    const closure = event.target.closest("[data-closure]");
    if (closure) {
      const c = CLOSURES.find((item) => item.id === Number(closure.dataset.closure));
      return openBlock({
        id: c.id,
        who: c.who === "all" ? "all:" + c.branch : "s:" + c.who,
        fromDay: c.fromDay,
        toDay: c.toDay,
        allDay: c.from === null,
        from: c.from ?? 12 * 60,
        to: c.to ?? 14 * 60,
        reason: c.reason,
      });
    }

    // A click on an empty part of the calendar starts a booking there.
    if (event.target.classList?.contains("cal-col")) {
      const col = event.target;
      const start = OPEN + Math.round(((event.offsetY / hour) * 60) / 15) * 15;
      return openForm({ day: Number(col.dataset.day), start, staff: col.dataset.staff || "any" });
    }
    if (event.target.closest("[data-close]")) return closeSheet();
    const booking = event.target.closest("[data-bk]");
    if (booking) openSheet(booking.dataset.bk);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") return closeSheet();
    const row = event.target.closest?.(".tr[data-bk]");
    if (row && event.target === row && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      openSheet(row.dataset.bk);
    }
  });

  PBM.onChange(() => {
    renderToolbar();
    renderAll();
    if (dialog.open) renderDialog();
  });

  PBM.mount("bookings");
  renderToolbar();
  renderAll();

  // Refit when the window, the sidebar or the rail changes the size of the panel,
  // and once the web fonts land (they change the height of the column headings).
  new ResizeObserver(fitHours).observe($("stage"));
  document.fonts?.ready.then(fitHours);

  // "Tạo nhanh → Lịch hẹn mới" arrives with #new: open the window straight away.
  const openIfAsked = () => {
    if (location.hash !== "#new") return;
    history.replaceState(null, "", location.pathname);
    openForm({});
  };
  addEventListener("hashchange", openIfAsked);
  openIfAsked();

  // The settle animation is for the first paint only.
  setTimeout(() => {
    state.entering = false;
    $("stage").classList.remove("is-entering");
  }, 1600);
})();
