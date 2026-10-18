/* Phân tích: five numbers for one period, the two periods side by side, and the
   four charts behind them. These are the heavy queries, so they live here and
   not on Tổng quan. The bookings are the sample shop in assets/sample.js;
   nothing is sent anywhere.

   Two choices set what the page counts:
     Khoảng thời gian  the period: 7 days, 4 weeks, this month so far, or last
                       month. A period is whole days and ends yesterday, except
                       last month, which is the whole month.
     So với            what it is compared with, always the same number of
                       days: the days right before it, or the same dates one
                       month earlier.
   Choosing a month sets the comparison to "the same dates last month", which is
   the usual question about a month.

   How each number is worked out
     Lịch hẹn          every booking whose appointment falls in the period
     Độ kín lịch       booked hours ÷ working hours. A cancelled booking
                       frees its slot, so it is left out
     Huỷ và vắng mặt   (cancelled + no-shows) ÷ every booking
     Khách mới         customers whose first visit falls in the period
     Khách quen        customers in the period who had visited before
     Giờ cao điểm      bookings counted by weekday and starting hour; the
                       busiest two hours in a row are called out

   The bookings chart has two choices of its own: which bookings it shows (all,
   took place, no-show, cancelled) and how it groups them (by day, by weekday,
   by week of seven days). */
(function () {
  "use strict";

  const { t, icon } = PBM;
  const { TODAY, OPEN, CLOSE, SHIFT_HOURS, STAFF, BOOKINGS, CUSTOMERS } = PBM_SAMPLE;
  const HOURS = (CLOSE - OPEN) / 60;

  const plural = (n, one, many) => (n === 1 ? one : many);

  PBM.addStrings({
    vi: {
      "doc.title": "Phân tích | pleasebookme",
      "page.title": "Phân tích",
      "numbers.title": "Số liệu của tiệm",

      // The two choices at the top.
      "period.label": "Khoảng thời gian",
      "period.7": "7 ngày qua",
      "period.28": "4 tuần qua",
      "period.month": "Tháng này, đến hôm qua",
      "period.lastmonth": "Tháng trước",
      "compare.label": "So với",
      "compare.prev": "Kỳ liền trước",
      "compare.month": "Cùng kỳ tháng trước",
      "period.range": ({ n, from, to, prev, pfrom, pto }) =>
        `Kỳ này: ${from} – ${to} (${n} ngày). So với ${prev}: ${pfrom} – ${pto}.`,
      "prev.7": "7 ngày trước đó",
      "prev.28": "4 tuần trước đó",
      "prev.n": ({ n }) => `${n} ngày trước đó`,
      "prev.month": "cùng kỳ tháng trước",
      "prev.lastmonth": ({ m }) => `cùng kỳ ${m}`,
      "short.prev": "kỳ trước",
      "short.month": "tháng trước",

      // The five cards: what each counts, then the numbers in words.
      "m.bookings": "Lịch hẹn",
      "m.util": "Độ kín lịch",
      "m.lost": "Huỷ và vắng mặt",
      "m.customers": "Khách mới và khách quen",
      "m.peak": "Giờ cao điểm",
      "what.bookings": "Mọi lịch hẹn có giờ hẹn trong kỳ, kể cả lịch đã huỷ hoặc khách không đến.",
      "what.util": "Số giờ đã đặt chia cho số giờ nhân viên làm việc. Lịch đã huỷ không tính, vì giờ đó được trả lại.",
      "what.lost": "Số lịch huỷ cộng số lịch khách không đến, chia cho tất cả lịch hẹn trong kỳ.",
      "what.customers": "Khách mới là người đến lần đầu trong kỳ. Khách quen đã đến trước đó. Chỉ tính khách thật sự đến.",
      "what.peak": "Hai giờ liền nhau có nhiều lịch hẹn bắt đầu nhất trong tuần.",
      "sub.bookings": ({ d, s, c, w }) => `${d} đã diễn ra, ${s} vắng mặt, ${c} huỷ${w ? `, ${w} chưa cập nhật` : ""}`,
      "sub.util": ({ b, a }) => `${b} giờ đã đặt trên ${a} giờ làm việc`,
      "sub.lost": ({ c, s, n }) => `${c} huỷ và ${s} vắng mặt, trên ${n} lịch hẹn`,
      "sub.customers": ({ back, all }) => `${back} khách quen. Tổng ${all} khách đã đến`,
      "sub.peak": ({ from, to, n }) => `Hai giờ liền đông nhất: ${from} – ${to}, ${n} lịch hẹn`,
      "unit.new": "khách mới",
      "u.bookings": "lịch hẹn",
      "u.points": "điểm phần trăm",
      "u.new": "khách mới",
      "d.up": ({ v, unit, prev, was }) => `Tăng ${v} ${unit} so với ${prev} (${was})`,
      "d.down": ({ v, unit, prev, was }) => `Giảm ${v} ${unit} so với ${prev} (${was})`,
      "d.same": ({ prev, was }) => `Không đổi so với ${prev} (${was})`,

      // The two periods side by side.
      "cmp.title": "Hai kỳ cạnh nhau",
      "cmp.sub": "Cùng các số liệu của hai kỳ, để so từng cột.",
      "cmp.now": "Kỳ này",
      "cmp.change": "Thay đổi",
      "cmp.points": ({ n }) => `${n} điểm`,
      "col.total": "Lịch hẹn",
      "col.done": "Đã diễn ra",
      "col.noshow": "Vắng mặt",
      "col.cancelled": "Đã huỷ",
      "col.util": "Độ kín lịch",
      "col.fresh": "Khách mới",
      "col.back": "Khách quen",

      // The bookings chart.
      "show.label": "Hiển thị",
      "show.all": "Tất cả lịch hẹn",
      "show.done": "Đã diễn ra",
      "show.noshow": "Vắng mặt",
      "show.cancelled": "Đã huỷ",
      "title.all": "Lịch hẹn",
      "title.done": "Lịch hẹn đã diễn ra",
      "title.noshow": "Lịch hẹn vắng mặt",
      "title.cancelled": "Lịch hẹn đã huỷ",
      "by.label": "Theo",
      "by.day": "Ngày",
      "by.weekday": "Thứ trong tuần",
      "by.week": "Tuần",
      "bytitle.day": "theo ngày",
      "bytitle.weekday": "theo thứ trong tuần",
      "bytitle.week": "theo tuần",
      "chartsub.day": ({ prev }) => `Mỗi cột là một ngày. Cột mờ phía sau là ngày tương ứng của ${prev}.`,
      "chartsub.weekday": ({ prev }) => `Mỗi cột cộng các ngày cùng thứ trong kỳ. Cột mờ phía sau là ${prev}.`,
      "chartsub.week": ({ prev }) => `Mỗi cột là 7 ngày liền, tính từ ngày đầu kỳ. Cột mờ phía sau là ${prev}.`,
      "lg.done": "Đã diễn ra",
      "lg.noshow": "Vắng mặt",
      "lg.cancelled": "Đã huỷ",
      "lg.waiting": "Chưa cập nhật",
      "lg.prev": "Kỳ so sánh",
      "tip.all": ({ label, n, d, s, c, w, days, p }) =>
        `${label}: ${n} lịch hẹn (${d} đã diễn ra, ${s} vắng mặt, ${c} huỷ${w ? `, ${w} chưa cập nhật` : ""})${days > 1 ? `, gộp ${days} ngày` : ""}. Kỳ so sánh: ${p}.`,
      "tip.one": ({ label, v, word, n, days, p }) =>
        `${label}: ${v} ${word}, trên ${n} lịch hẹn${days > 1 ? ` của ${days} ngày` : ""}. Kỳ so sánh: ${p}.`,
      "word.done": "đã diễn ra",
      "word.noshow": "vắng mặt",
      "word.cancelled": "đã huỷ",
      "aria.bookings": ({ title, n, label, max }) => `Biểu đồ cột: ${title}. ${n} trong kỳ; cột cao nhất là ${label} với ${max}.`,

      // The other charts.
      "p.customers": "Khách mới và khách quen",
      "customers.sub": "Khách mới đến lần đầu trong kỳ. Khách quen đã đến trước đó.",
      "c.new": "Khách mới",
      "c.back": "Khách quen",
      "c.total": "khách",
      "c.prev": ({ prev, n }) => `${prev}: ${n} khách mới.`,
      "p.heat": "Giờ cao điểm",
      "heat.sub": "Số lịch hẹn theo thứ và giờ bắt đầu",
      "heat.hour": ({ h }) => `${h}h`,
      "heat.few": "Ít",
      "heat.many": "Nhiều",
      "heat.peak": ({ day, from, to }) => `Đông nhất: ${day}, ${from} – ${to}`,
      "p.lost": "Huỷ và vắng mặt",
      "lost.sub": "Lịch hẹn không diễn ra: khách huỷ hoặc không đến.",
      "lost.prev": ({ prev, p }) => `${prev}: ${p}% không diễn ra.`,
      "deep.lead": "Xem sâu hơn:",
      "deep.bookings": "theo nhân viên, theo dịch vụ, qua nhiều tháng.",
      "deep.customers": "khách lâu chưa quay lại, nhịp quay lại, giá trị của mỗi khách.",
      "deep.heat": "độ kín của từng nhân viên, nhu cầu theo dịch vụ, gợi ý lấp giờ trống.",
      "deep.lost": "khách nào hay huỷ, huỷ sát giờ ra sao, hiệu quả của tin nhắc lịch.",
      soon: "Sắp có",
      "tip.cell": ({ day, from, to, n }) => `${day}, ${from} – ${to}: ${n} lịch hẹn`,
      "aria.customers": ({ fresh, back }) => `${fresh} khách mới và ${back} khách quen.`,
      "aria.heat": ({ day, from, to }) => `Bảng theo thứ và giờ. Đông nhất là ${day}, từ ${from} đến ${to}.`,
      "aria.lost": ({ done, c, s }) => `${done} lịch đã diễn ra, ${c} lịch huỷ, ${s} lịch khách vắng mặt.`,
      note: "Số liệu mẫu. Đây là bản thiết kế, chưa nối với hệ thống.",
    },
    en: {
      "doc.title": "Analytics | pleasebookme",
      "page.title": "Analytics",
      "numbers.title": "Shop numbers",

      "period.label": "Period",
      "period.7": "Last 7 days",
      "period.28": "Last 4 weeks",
      "period.month": "This month, up to yesterday",
      "period.lastmonth": "Last month",
      "compare.label": "Compare with",
      "compare.prev": "The period just before",
      "compare.month": "Same dates last month",
      "period.range": ({ n, from, to, prev, pfrom, pto }) =>
        `This period: ${from} – ${to} (${n} days). Compared with ${prev}: ${pfrom} – ${pto}.`,
      "prev.7": "the 7 days before",
      "prev.28": "the 4 weeks before",
      "prev.n": ({ n }) => `the ${n} days before`,
      "prev.month": "the same dates last month",
      "prev.lastmonth": ({ m }) => `the same dates in ${m}`,
      "short.prev": "the period before",
      "short.month": "last month",

      "m.bookings": "Bookings",
      "m.util": "Utilisation",
      "m.lost": "Cancelled or no-show",
      "m.customers": "New and returning",
      "m.peak": "Busiest times",
      "what.bookings": "Every booking whose appointment falls in the period, including cancelled ones and no-shows.",
      "what.util": "Booked hours divided by the hours your staff work. Cancelled bookings are left out, because that time is given back.",
      "what.lost": "Cancelled bookings plus no-shows, divided by all bookings in the period.",
      "what.customers": "New customers came for the first time in the period. Returning customers had been before. Only customers who actually came are counted.",
      "what.peak": "The two hours in a row in which the most bookings start in a week.",
      "sub.bookings": ({ d, s, c, w }) =>
        `${d} took place, ${s} ${plural(s, "no-show", "no-shows")}, ${c} cancelled${w ? `, ${w} not marked yet` : ""}`,
      "sub.util": ({ b, a }) => `${b} hours booked out of ${a} working hours`,
      "sub.lost": ({ c, s, n }) => `${c} cancelled and ${s} ${plural(s, "no-show", "no-shows")}, out of ${n} bookings`,
      "sub.customers": ({ back, all }) => `${back} returning. ${all} customers came in all`,
      "sub.peak": ({ from, to, n }) => `Busiest two hours: ${from} – ${to}, ${n} ${plural(n, "booking", "bookings")}`,
      "unit.new": "new customers",
      "u.bookings": ({ n }) => plural(n, "booking", "bookings"),
      "u.points": ({ n }) => plural(n, "percentage point", "percentage points"),
      "u.new": ({ n }) => plural(n, "new customer", "new customers"),
      "d.up": ({ v, unit, prev, was }) => `Up ${v} ${unit} on ${prev} (${was})`,
      "d.down": ({ v, unit, prev, was }) => `Down ${v} ${unit} on ${prev} (${was})`,
      "d.same": ({ prev, was }) => `No change on ${prev} (${was})`,

      "cmp.title": "The two periods side by side",
      "cmp.sub": "The same numbers for both periods, to compare column by column.",
      "cmp.now": "This period",
      "cmp.change": "Change",
      "cmp.points": ({ n }) => `${n} ${plural(n, "point", "points")}`,
      "col.total": "Bookings",
      "col.done": "Took place",
      "col.noshow": "No-show",
      "col.cancelled": "Cancelled",
      "col.util": "Utilisation",
      "col.fresh": "New customers",
      "col.back": "Returning",

      "show.label": "Show",
      "show.all": "All bookings",
      "show.done": "Took place",
      "show.noshow": "No-show",
      "show.cancelled": "Cancelled",
      "title.all": "Bookings",
      "title.done": "Bookings that took place",
      "title.noshow": "No-show bookings",
      "title.cancelled": "Cancelled bookings",
      "by.label": "By",
      "by.day": "Day",
      "by.weekday": "Weekday",
      "by.week": "Week",
      "bytitle.day": "by day",
      "bytitle.weekday": "by weekday",
      "bytitle.week": "by week",
      "chartsub.day": ({ prev }) => `Each bar is one day. The pale bar behind it is the matching day in ${prev}.`,
      "chartsub.weekday": ({ prev }) => `Each bar adds up the days of that weekday in the period. The pale bar behind is ${prev}.`,
      "chartsub.week": ({ prev }) => `Each bar is 7 days in a row, counted from the first day. The pale bar behind is ${prev}.`,
      "lg.done": "Took place",
      "lg.noshow": "No-show",
      "lg.cancelled": "Cancelled",
      "lg.waiting": "Not marked yet",
      "lg.prev": "Comparison period",
      "tip.all": ({ label, n, d, s, c, w, days, p }) =>
        `${label}: ${n} ${plural(n, "booking", "bookings")} (${d} took place, ${s} ${plural(s, "no-show", "no-shows")}, ${c} cancelled${w ? `, ${w} not marked yet` : ""})${days > 1 ? `, ${days} days added up` : ""}. Comparison period: ${p}.`,
      "tip.one": ({ label, v, word, n, days, p }) =>
        `${label}: ${v} ${word}, out of ${n} ${plural(n, "booking", "bookings")}${days > 1 ? ` over ${days} days` : ""}. Comparison period: ${p}.`,
      "word.done": "took place",
      "word.noshow": "no-show",
      "word.cancelled": "cancelled",
      "aria.bookings": ({ title, n, label, max }) => `Bar chart: ${title}. ${n} in the period; the highest bar is ${label}, with ${max}.`,

      "p.customers": "New and returning customers",
      "customers.sub": "New customers came for the first time in the period. Returning customers had been before.",
      "c.new": "New",
      "c.back": "Returning",
      "c.total": "customers",
      "c.prev": ({ prev, n }) => `${prev}: ${n} new ${plural(n, "customer", "customers")}.`,
      "p.heat": "Busiest times",
      "heat.sub": "Bookings by weekday and starting hour",
      "heat.hour": ({ h }) => `${h}`,
      "heat.few": "Few",
      "heat.many": "Many",
      "heat.peak": ({ day, from, to }) => `Busiest: ${day}, ${from} – ${to}`,
      "p.lost": "Cancellations and no-shows",
      "lost.sub": "Bookings that did not take place: the customer cancelled or did not come.",
      "lost.prev": ({ prev, p }) => `${prev}: ${p}% did not take place.`,
      "deep.lead": "Go deeper:",
      "deep.bookings": "by staff member, by service, over months.",
      "deep.customers": "customers who have not been back, visit rhythm, value of each customer.",
      "deep.heat": "utilisation per staff member, demand by service, ideas for filling quiet hours.",
      "deep.lost": "who cancels most, how late, and whether reminders help.",
      soon: "Coming soon",
      "tip.cell": ({ day, from, to, n }) => `${day}, ${from} – ${to}: ${n} ${plural(n, "booking", "bookings")}`,
      "aria.customers": ({ fresh, back }) => `${fresh} new and ${back} returning customers.`,
      "aria.heat": ({ day, from, to }) => `Grid by weekday and hour. The busiest time is ${day}, ${from} to ${to}.`,
      "aria.lost": ({ done, c, s }) => `${done} took place, ${c} cancelled, ${s} no-shows.`,
      note: "Sample numbers. This is a design mockup, not connected to the system.",
    },
  });

  // ---------- State and helpers ----------

  const PERIODS = ["7", "28", "month", "lastmonth"];
  const COMPARES = ["prev", "month"];
  const SHOWS = ["all", "done", "noshow", "cancelled"];
  const BYS = ["day", "weekday", "week"];
  const SHOW_KEY = { all: "total", done: "done", noshow: "noShow", cancelled: "cancelled" };
  const SHOW_CLASS = { done: "part-done", noshow: "part-noshow", cancelled: "part-cancelled" };

  const state = { period: "7", compare: "prev", show: "all", by: "day" };
  try {
    const period = localStorage.getItem("pbm-period");
    const compare = localStorage.getItem("pbm-compare");
    if (PERIODS.includes(period)) state.period = period;
    if (COMPARES.includes(compare)) state.compare = compare;
  } catch {
    /* no storage: the page just opens on the last 7 days */
  }
  const remember = (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch {
      /* no storage */
    }
  };

  const $ = (id) => document.getElementById(id);
  const MS_DAY = 86400000;
  const addDays = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
  const dateOf = (day) => addDays(TODAY, day);
  const dayOf = (d) =>
    Math.round((Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) - Date.UTC(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate())) / MS_DAY);
  const firstOfMonth = (offset) => new Date(TODAY.getFullYear(), TODAY.getMonth() + offset, 1);
  const lastOfMonth = (offset) => new Date(TODAY.getFullYear(), TODAY.getMonth() + offset + 1, 0);
  // The same date one month earlier; the 31st of a 30-day month becomes the 30th.
  const monthBefore = (d) => {
    const lastDay = new Date(d.getFullYear(), d.getMonth(), 0).getDate();
    return new Date(d.getFullYear(), d.getMonth() - 1, Math.min(d.getDate(), lastDay));
  };
  const MONDAY = addDays(TODAY, -((TODAY.getDay() + 6) % 7));
  const clock = (m) => String(Math.floor(m / 60)).padStart(2, "0") + ":" + String(m % 60).padStart(2, "0");
  const fmt = (opts, d) => new Intl.DateTimeFormat(PBM.locale, opts).format(d);
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const longDate = (d) => cap(fmt({ weekday: "long", day: "numeric", month: "long" }, d));
  const dayMonth = (d) => `${d.getDate()}/${d.getMonth() + 1}`;
  // "tháng 8" in the middle of a sentence; English month names keep their capital.
  const monthName = (d) => {
    const name = fmt({ month: "long" }, d);
    return PBM.lang === "vi" ? name.toLowerCase() : name;
  };
  const weekdayName = (i, width) => cap(fmt({ weekday: width }, addDays(MONDAY, i))); // 0 is Monday
  const pct = (share) => Math.round(share * 100);
  const range = (a, b) => `${dayMonth(dateOf(a))} – ${dayMonth(dateOf(b))}`;
  // Everything on the page counts only the branches on show.
  const inScope = (b) => PBM.branches.has(b.branch);
  const staffShown = () => STAFF.filter((s) => PBM.branches.has(s.branch));
  const isLive = (b) => b.status !== "CANCELLED" && b.status !== "REJECTED";
  const still = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- The two periods ----------

  function span() {
    let from = -7;
    let to = -1;
    if (state.period === "28") from = -28;
    if (state.period === "month") from = dayOf(firstOfMonth(0));
    if (state.period === "lastmonth") {
      from = dayOf(firstOfMonth(-1));
      to = dayOf(lastOfMonth(-1));
    }
    // On the first of a month "this month so far" has no days yet: show last month.
    if (to < from) {
      from = dayOf(firstOfMonth(-1));
      to = dayOf(lastOfMonth(-1));
    }
    const n = to - from + 1;
    const prevFrom = state.compare === "month" ? dayOf(monthBefore(dateOf(from))) : from - n;
    return { from, to, n, prevFrom, prevTo: prevFrom + n - 1 };
  }

  // What the other period is called, in a sentence and in a few words.
  function prevName(sp) {
    if (state.compare === "month") {
      return state.period === "lastmonth"
        ? t("prev.lastmonth", { m: monthName(monthBefore(dateOf(sp.from))) })
        : t("prev.month");
    }
    if (state.period === "7") return t("prev.7");
    if (state.period === "28") return t("prev.28");
    return t("prev.n", { n: sp.n });
  }
  const prevShort = () => t(state.compare === "month" ? "short.month" : "short.prev");

  // ---------- The numbers ----------

  function measure(from, to) {
    const items = BOOKINGS.filter((b) => b.day >= from && b.day <= to && inScope(b));
    const held = items.filter(isLive); // these kept their slot, whether or not the customer came
    const cancelled = items.length - held.length;
    const noShow = held.filter((b) => b.noShow).length;
    // Past, accepted, and not yet marked by the shop: counted as neither done nor no-show.
    const waiting = held.filter((b) => b.status === "ACCEPTED" && !b.outcome).length;
    const bookedHours = held.reduce((sum, b) => sum + b.end - b.start, 0) / 60;
    const workHours = (to - from + 1) * staffShown().length * SHIFT_HOURS;

    const seen = new Set(held.filter((b) => !b.noShow).map((b) => b.cust));
    const fresh = [...seen].filter((id) => CUSTOMERS[id - 1].first >= from).length;

    const heat = Array.from({ length: 7 }, () => Array(HOURS).fill(0));
    held.forEach((b) => {
      heat[(dateOf(b.day).getDay() + 6) % 7][Math.floor((b.start - OPEN) / 60)]++;
    });
    let peak = { n: -1 };
    heat.forEach((row, w) => {
      for (let h = 0; h < HOURS - 1; h++) {
        if (row[h] + row[h + 1] > peak.n) peak = { w, h, n: row[h] + row[h + 1] };
      }
    });

    const perDay = [];
    for (let day = from; day <= to; day++) {
      const all = items.filter((b) => b.day === day);
      const live = all.filter(isLive);
      const c = all.length - live.length;
      const s = live.filter((b) => b.noShow).length;
      const w = live.filter((b) => b.status === "ACCEPTED" && !b.outcome).length;
      perDay.push({ day, total: all.length, cancelled: c, noShow: s, waiting: w, done: all.length - c - s - w });
    }

    return {
      total: items.length,
      done: items.length - cancelled - noShow - waiting,
      cancelled,
      noShow,
      waiting,
      lost: items.length ? (cancelled + noShow) / items.length : 0,
      util: workHours ? bookedHours / workHours : 0,
      bookedHours,
      workHours,
      customers: seen.size,
      fresh,
      back: seen.size - fresh,
      heat,
      peak,
      perDay,
    };
  }

  // "Tăng 44 lịch hẹn so với kỳ trước (106)": the change, in what, against what,
  // and what that was. In the direction the owner wants it reads as good, the
  // other way as bad.
  function delta(diff, was, { unit, goodWhenUp = true }) {
    const vars = { prev: prevShort(), was };
    if (!diff) return `<span class="delta">${t("d.same", vars)}</span>`;
    const up = diff > 0;
    const v = Math.abs(diff);
    return `<span class="delta ${up === goodWhenUp ? "is-good" : "is-bad"}">${icon(up ? "up" : "down")}<span>${t(
      up ? "d.up" : "d.down",
      { ...vars, v, unit: t(unit, { n: v }) }
    )}</span></span>`;
  }

  // ---------- Heading ----------

  function renderHead() {
    $("title").textContent = t("page.title");
    $("date").textContent = longDate(TODAY);
    $("scope").innerHTML = PBM.branches.html();
    $("note").textContent = t("note");
    document.title = t("doc.title");
  }

  // ---------- Period and comparison ----------

  const options = (group, values, current) =>
    values.map((v) => `<option value="${v}"${v === current ? " selected" : ""}>${t(group + "." + v)}</option>`).join("");

  function renderPeriod() {
    $("period").innerHTML = `
      <h2 id="period-title">${t("numbers.title")}</h2>
      <p id="period-range"></p>
      <div class="pickers">
        <label class="pick"><span>${t("period.label")}</span>
          <select class="input input-small" data-pick="period">${options("period", PERIODS, state.period)}</select></label>
        <label class="pick"><span>${t("compare.label")}</span>
          <select class="input input-small" data-pick="compare">${options("compare", COMPARES, state.compare)}</select></label>
      </div>`;
  }

  // ---------- Cards ----------

  const number = (key, n) => `<span class="num" data-num="${key}" data-to="${n}">${n}</span>`;

  function cardsHTML(now, before) {
    const card = ({ key, panel, value, sub, extra = "", foot = "" }) => `
      <a class="panel card" href="#${panel}" data-panel="${panel}" data-metric="${key}">
        <span class="card-label">${t("m." + key)}<span class="card-what" data-tip="${t("what." + key)}">${icon("info")}</span></span>
        <span class="card-value">${value}</span>
        ${extra}
        <span class="card-sub">${sub}</span>
        ${foot}
        <span class="visually-hidden">${t("what." + key)}</span>
      </a>`;
    const { peak } = now;

    return [
      card({
        key: "bookings",
        panel: "p-bookings",
        value: number("bookings", now.total),
        sub: t("sub.bookings", { d: now.done, s: now.noShow, c: now.cancelled, w: now.waiting }),
        foot: delta(now.total - before.total, before.total, { unit: "u.bookings" }),
      }),
      card({
        key: "util",
        panel: "p-heat",
        value: number("util", pct(now.util)) + '<span class="sign">%</span>',
        extra: `<span class="meter" aria-hidden="true"><i style="width:${pct(now.util)}%"></i></span>`,
        sub: t("sub.util", { b: Math.round(now.bookedHours), a: now.workHours }),
        foot: delta(pct(now.util) - pct(before.util), pct(before.util) + "%", { unit: "u.points" }),
      }),
      card({
        key: "lost",
        panel: "p-lost",
        value: number("lost", pct(now.lost)) + '<span class="sign">%</span>',
        sub: t("sub.lost", { c: now.cancelled, s: now.noShow, n: now.total }),
        foot: delta(pct(now.lost) - pct(before.lost), pct(before.lost) + "%", { unit: "u.points", goodWhenUp: false }),
      }),
      card({
        key: "customers",
        panel: "p-customers",
        value: number("fresh", now.fresh) + ` <small>${t("unit.new")}</small>`,
        sub: t("sub.customers", { back: now.back, all: now.customers }),
        foot: delta(now.fresh - before.fresh, before.fresh, { unit: "u.new" }),
      }),
      card({
        key: "peak",
        panel: "p-heat",
        value: `<span class="card-word">${weekdayName(peak.w, "long")}</span>`,
        sub: t("sub.peak", { from: clock(OPEN + peak.h * 60), to: clock(OPEN + (peak.h + 2) * 60), n: peak.n }),
      }),
    ].join("");
  }

  // The numbers run from what was on screen to the new value.
  const onScreen = {};
  function countUp(animate) {
    document.querySelectorAll("[data-num]").forEach((el) => {
      const to = Number(el.dataset.to);
      const from = onScreen[el.dataset.num];
      onScreen[el.dataset.num] = to;
      // No earlier value means the page has just opened: show the number as it is.
      if (!animate || still() || from === undefined || from === to) return;
      const started = performance.now();
      const step = (time) => {
        const k = Math.min(1, (time - started) / 650);
        el.textContent = Math.round(from + (to - from) * (1 - Math.pow(1 - k, 3)));
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }

  // ---------- The two periods side by side ----------

  function compareHTML(now, before, sp) {
    const cols = [
      { key: "total", a: now.total, b: before.total, badUp: false },
      { key: "done", a: now.done, b: before.done, badUp: false },
      { key: "noshow", a: now.noShow, b: before.noShow, badUp: true },
      { key: "cancelled", a: now.cancelled, b: before.cancelled, badUp: true },
      { key: "util", a: pct(now.util), b: pct(before.util), badUp: false, points: true },
      { key: "fresh", a: now.fresh, b: before.fresh, badUp: false },
      { key: "back", a: now.back, b: before.back, badUp: false },
    ];
    const value = (c, n) => (c.points ? n + "%" : n);
    const change = (c) => {
      const diff = c.a - c.b;
      if (!diff) return `<td class="num is-flat">0</td>`;
      const sign = diff > 0 ? "+" : "−";
      const amount = c.points ? t("cmp.points", { n: Math.abs(diff) }) : Math.abs(diff);
      const share = !c.points && c.b ? ` <span>${sign}${Math.round((Math.abs(diff) / c.b) * 100)}%</span>` : "";
      const bad = (diff > 0) === c.badUp;
      return `<td class="num${bad ? " is-bad" : ""}">${sign}${amount}${share}</td>`;
    };
    const row = (head, dates, cells, cls = "") =>
      `<tr class="${cls}"><th scope="row">${head}<small>${dates}</small></th>${cells}</tr>`;
    return `
      <section class="panel compare" aria-labelledby="cmp-title">
        <header class="chart-head">
          <h3 id="cmp-title">${t("cmp.title")}</h3>
          <p class="chart-sub">${t("cmp.sub")}</p>
        </header>
        <div class="cmp-wrap">
          <table class="cmp">
            <thead><tr><td></td>${cols.map((c) => `<th scope="col">${t("col." + c.key)}</th>`).join("")}</tr></thead>
            <tbody>
              ${row(t("cmp.now"), range(sp.from, sp.to), cols.map((c) => `<td class="num">${value(c, c.a)}</td>`).join(""))}
              ${row(cap(prevName(sp)), range(sp.prevFrom, sp.prevTo), cols.map((c) => `<td class="num is-then">${value(c, c.b)}</td>`).join(""))}
              ${row(t("cmp.change"), "", cols.map(change).join(""), "is-change")}
            </tbody>
          </table>
        </div>
      </section>`;
  }

  // ---------- Charts ----------

  const chart = ({ id, title, aside = "", sub = "", body, deep }) => `
      <section class="panel chart" id="${id}" aria-labelledby="${id}-title">
        <header class="chart-head">
          <h3 id="${id}-title">${title}</h3>
          ${aside}
        </header>
        ${sub ? `<p class="chart-sub chart-lede">${sub}</p>` : ""}
        <div class="chart-body">${body}</div>
        <p class="deeper" data-plan="paid">${icon("chart")}<span><b>${t("deep.lead")}</b> ${deep}</span><span class="soon">${t("soon")}</span></p>
      </section>`;

  // The bookings of one period, grouped by day, by weekday or by seven days.
  function series(m, by) {
    const blank = (extra) => ({ total: 0, done: 0, noShow: 0, cancelled: 0, waiting: 0, days: 0, ...extra });
    const add = (g, d) => {
      g.total += d.total;
      g.done += d.done;
      g.noShow += d.noShow;
      g.cancelled += d.cancelled;
      g.waiting += d.waiting;
      g.days += 1;
      g.last = d.day;
      if (g.first === undefined) g.first = d.day;
    };
    if (by === "weekday") {
      const groups = Array.from({ length: 7 }, (_, w) => blank({ w }));
      m.perDay.forEach((d) => add(groups[(dateOf(d.day).getDay() + 6) % 7], d));
      return groups;
    }
    if (by === "week") {
      const groups = [];
      m.perDay.forEach((d, i) => add((groups[Math.floor(i / 7)] ||= blank({})), d));
      return groups;
    }
    return m.perDay.map((d) => {
      const g = blank({});
      add(g, d);
      return g;
    });
  }

  // A scale that stops on a round number, with at most six lines.
  function scale(top) {
    for (const step of [1, 2, 5, 10, 20, 50, 100, 200]) {
      const max = Math.ceil((top + 1) / step) * step;
      if (max / step <= 6) return { step, max };
    }
    return { step: 500, max: Math.ceil((top + 1) / 500) * 500 };
  }

  function bookingsChart(now, before, sp) {
    // A week needs at least two whole weeks to be a comparison of anything.
    if (state.by === "week" && sp.n < 14) state.by = "day";
    const by = state.by;
    const mine = series(now, by);
    const theirs = series(before, by);
    const key = SHOW_KEY[state.show];
    const val = (g) => g[key];
    const top = Math.max(1, ...mine.map(val), ...theirs.map(val));
    const { step, max } = scale(top);
    const few = mine.length <= 7;

    const lines = [];
    for (let v = 0; v <= max; v += step) {
      lines.push(`<span class="gridline" style="bottom:${(v / max) * 100}%"><i class="num">${v}</i></span>`);
    }

    const nameOf = (g) => {
      if (by === "weekday") return weekdayName(g.w, "long");
      if (by === "week") return range(g.first, g.last);
      return longDate(dateOf(g.first));
    };
    const labelOf = (g) => {
      if (by === "weekday") return `<span class="bar-label"><b>${weekdayName(g.w, "short")}</b></span>`;
      if (by === "week") {
        return `<span class="bar-label"><span class="num">${mine.length <= 5 ? range(g.first, g.last) : dayMonth(dateOf(g.first))}</span></span>`;
      }
      const date = dateOf(g.first);
      if (few) return `<span class="bar-label"><b>${cap(fmt({ weekday: "short" }, date))}</b><span class="num">${dayMonth(date)}</span></span>`;
      return date.getDay() === 1 ? `<span class="bar-label"><span class="num">${dayMonth(date)}</span></span>` : "";
    };
    const tipOf = (g, p) => {
      const vars = { label: nameOf(g), days: by === "day" ? 1 : g.days };
      if (state.show === "all") {
        return t("tip.all", { ...vars, n: g.total, d: g.done, s: g.noShow, c: g.cancelled, w: g.waiting, p: p.total });
      }
      return t("tip.one", { ...vars, v: g[key], word: t("word." + state.show), n: g.total, p: p[key] });
    };

    const bars = mine
      .map((g, i) => {
        const parts =
          state.show === "all"
            ? `<i class="part-done" style="flex:${g.done}"></i>
               <i class="part-noshow" style="flex:${g.noShow}"></i>
               <i class="part-cancelled" style="flex:${g.cancelled}"></i>
               <i class="part-waiting" style="flex:${g.waiting}"></i>`
            : `<i class="${SHOW_CLASS[state.show]}" style="flex:1"></i>`;
        return `<div class="bar-col" style="--i:${i}" data-tip="${tipOf(g, theirs[i])}">
            <span class="bar-prev" style="height:${(val(theirs[i]) / max) * 100}%"></span>
            <div class="bar-stack" style="height:${(val(g) / max) * 100}%">${parts}</div>
            ${labelOf(g)}
          </div>`;
      })
      .join("");

    const best = mine.reduce((a, b) => (val(b) > val(a) ? b : a));
    const title = `${t("title." + state.show)} ${t("bytitle." + by)}`;
    const showWaiting = state.show === "all" && mine.some((g) => g.waiting);
    const legend =
      state.show === "all"
        ? `<li><i class="swatch part-done"></i>${t("lg.done")}</li>
           <li><i class="swatch part-noshow"></i>${t("lg.noshow")}</li>
           <li><i class="swatch part-cancelled"></i>${t("lg.cancelled")}</li>
           ${showWaiting ? `<li><i class="swatch part-waiting"></i>${t("lg.waiting")}</li>` : ""}`
        : `<li><i class="swatch ${SHOW_CLASS[state.show]}"></i>${t("show." + state.show)}</li>`;

    const pick = (kind, label, values, current, disabled = () => false) => `
      <label class="pick"><span>${label}</span>
        <select class="input input-small" data-pick="${kind}">${values
          .map(
            (v) =>
              `<option value="${v}"${v === current ? " selected" : ""}${disabled(v) ? " disabled" : ""}>${t(kind + "." + v)}</option>`
          )
          .join("")}</select></label>`;

    return chart({
      id: "p-bookings",
      title,
      aside: `<div class="chart-tools">
          ${pick("show", t("show.label"), SHOWS, state.show)}
          ${pick("by", t("by.label"), BYS, by, (v) => v === "week" && sp.n < 14)}
        </div>`,
      sub: t("chartsub." + by, { prev: prevName(sp) }),
      body: `<ul class="legend">${legend}<li><i class="swatch part-rest"></i>${t("lg.prev")}</li></ul>
        <div class="plot${few ? " is-few" : ""}" role="img" aria-label="${t("aria.bookings", {
          title,
          n: mine.reduce((sum, g) => sum + val(g), 0),
          label: nameOf(best),
          max: val(best),
        })}">
          ${lines.join("")}
          <div class="bars" style="--n:${mine.length}">${bars}</div>
        </div>`,
      deep: t("deep.bookings"),
    });
  }

  function customersChart(now, before, sp) {
    const ring = 2 * Math.PI * 46;
    const share = now.customers ? now.fresh / now.customers : 0;
    return chart({
      id: "p-customers",
      title: t("p.customers"),
      sub: t("customers.sub"),
      body: `<div class="split">
          <div class="donut" role="img" aria-label="${t("aria.customers", { fresh: now.fresh, back: now.back })}">
            <svg viewBox="0 0 120 120" aria-hidden="true">
              <circle class="ring-back" cx="60" cy="60" r="46" />
              <circle class="ring-new" cx="60" cy="60" r="46" style="--v:${(share * ring).toFixed(1)};--c:${ring.toFixed(1)}" />
            </svg>
            <span class="donut-mid"><strong class="num">${now.customers}</strong><span>${t("c.total")}</span></span>
          </div>
          <dl class="tally">
            <div><dt><i class="swatch part-done"></i>${t("c.new")}</dt><dd class="num">${now.fresh}<span>${pct(share)}%</span></dd></div>
            <div><dt><i class="swatch part-rest"></i>${t("c.back")}</dt><dd class="num">${now.back}<span>${100 - pct(share)}%</span></dd></div>
          </dl>
        </div>
        <p class="chart-note">${cap(t("c.prev", { prev: prevName(sp), n: before.fresh }))}</p>`,
      deep: t("deep.customers"),
    });
  }

  function heatChart(now) {
    const { heat, peak } = now;
    const top = Math.max(1, ...heat.flat());
    const hourOf = (h) => clock(OPEN + h * 60);

    const head = Array.from({ length: HOURS }, (_, h) => `<span class="heat-hour num">${t("heat.hour", { h: OPEN / 60 + h })}</span>`);
    const rows = heat
      .map((row, w) => {
        const cells = row
          .map((n, h) => {
            const v = n / top;
            const classes = ["cell", "num"];
            if (v > 0.55) classes.push("is-strong");
            if (w === peak.w && (h === peak.h || h === peak.h + 1)) classes.push(h === peak.h ? "is-peak is-peak-start" : "is-peak is-peak-end");
            const tip = t("tip.cell", { day: weekdayName(w, "long"), from: hourOf(h), to: hourOf(h + 1), n });
            return `<span class="${classes.join(" ")}" style="--v:${v.toFixed(2)};--i:${w + h}" data-tip="${tip}">${n || ""}</span>`;
          })
          .join("");
        return `<span class="heat-day">${weekdayName(w, "short")}</span>${cells}`;
      })
      .join("");

    return chart({
      id: "p-heat",
      title: t("p.heat"),
      aside: `<p class="chart-sub">${t("heat.sub")}</p>`,
      body: `<div class="heat" role="img" style="--cols:${HOURS}" aria-label="${t("aria.heat", {
        day: weekdayName(peak.w, "long"),
        from: hourOf(peak.h),
        to: hourOf(peak.h + 2),
      })}">
          <span></span>${head.join("")}
          ${rows}
        </div>
        <div class="heat-foot">
          <span class="heat-peak">${t("heat.peak", { day: weekdayName(peak.w, "long"), from: hourOf(peak.h), to: hourOf(peak.h + 2) })}</span>
          <span class="heat-scale" aria-hidden="true">${t("heat.few")}<i style="--v:0.08"></i><i style="--v:0.35"></i><i style="--v:0.65"></i><i style="--v:1"></i>${t("heat.many")}</span>
        </div>`,
      deep: t("deep.heat"),
    });
  }

  function lostChart(now, before, sp) {
    const share = (n) => (now.total ? pct(n / now.total) : 0);
    const row = (cls, label, n) =>
      `<div><dt><i class="swatch ${cls}"></i>${label}</dt><dd class="num">${n}<span>${share(n)}%</span></dd></div>`;
    return chart({
      id: "p-lost",
      title: t("p.lost"),
      sub: t("lost.sub"),
      body: `<div class="portion" role="img" aria-label="${t("aria.lost", { done: now.done, c: now.cancelled, s: now.noShow })}">
          <i class="part-done" style="flex:${now.done}"></i>
          <i class="part-noshow" style="flex:${now.noShow}"></i>
          <i class="part-cancelled" style="flex:${now.cancelled}"></i>
          ${now.waiting ? `<i class="part-waiting" style="flex:${now.waiting}"></i>` : ""}
        </div>
        <dl class="tally">
          ${row("part-done", t("lg.done"), now.done)}
          ${row("part-noshow", t("lg.noshow"), now.noShow)}
          ${row("part-cancelled", t("lg.cancelled"), now.cancelled)}
          ${now.waiting ? row("part-waiting", t("lg.waiting"), now.waiting) : ""}
        </dl>
        <p class="chart-note">${cap(t("lost.prev", { prev: prevName(sp), p: pct(before.lost) }))}</p>`,
      deep: t("deep.lost"),
    });
  }

  // What the last draw used, so one chart can be redrawn on its own.
  let drawn = null;

  function renderNumbers(animate) {
    const sp = span();
    const now = measure(sp.from, sp.to);
    const before = measure(sp.prevFrom, sp.prevTo);
    drawn = { sp, now, before };

    $("period-range").textContent = t("period.range", {
      n: sp.n,
      from: dayMonth(dateOf(sp.from)),
      to: dayMonth(dateOf(sp.to)),
      prev: prevName(sp),
      pfrom: dayMonth(dateOf(sp.prevFrom)),
      pto: dayMonth(dateOf(sp.prevTo)),
    });
    const cards = $("cards");
    const charts = $("charts");
    // A redraw for a new language or theme should not replay the drawing-in.
    cards.classList.toggle("is-still", !animate);
    charts.classList.toggle("is-still", !animate);
    cards.innerHTML = cardsHTML(now, before);
    $("compare").innerHTML = compareHTML(now, before, sp);
    charts.innerHTML = bookingsChart(now, before, sp) + customersChart(now, before, sp) + heatChart(now) + lostChart(now, before, sp);
    countUp(animate);
  }

  // The bookings chart alone: its two choices should not redraw the whole page.
  function redrawBookings(focusKind) {
    const { sp, now, before } = drawn;
    const old = $("p-bookings");
    $("charts").classList.remove("is-still");
    old.insertAdjacentHTML("afterend", bookingsChart(now, before, sp));
    old.remove();
    document.querySelector(`#p-bookings [data-pick="${focusKind}"]`)?.focus();
  }

  // ---------- Events ----------

  document.addEventListener("change", (event) => {
    const select = event.target.closest?.("select[data-pick]");
    if (!select) return;
    const kind = select.dataset.pick;

    if (kind === "show" || kind === "by") {
      state[kind] = select.value;
      return redrawBookings(kind);
    }

    state[kind] = select.value;
    // A month is usually asked about against the month before it.
    if (kind === "period" && (state.period === "month" || state.period === "lastmonth") && state.compare === "prev") {
      state.compare = "month";
      $("period").querySelector('[data-pick="compare"]').value = "month";
      remember("pbm-compare", "month");
    }
    remember(kind === "period" ? "pbm-period" : "pbm-compare", select.value);
    renderNumbers(true);
  });

  // Pointing at a card lights the chart it summarises.
  function link(event, on) {
    const card = event.target.closest?.(".card");
    if (card) $(card.dataset.panel)?.classList.toggle("is-linked", on);
  }
  $("cards").addEventListener("mouseover", (event) => link(event, true));
  $("cards").addEventListener("mouseout", (event) => link(event, false));
  $("cards").addEventListener("focusin", (event) => link(event, true));
  $("cards").addEventListener("focusout", (event) => link(event, false));

  // One floating label for every bar, cell and explanation.
  const tip = $("tip");
  function pointTip(event) {
    const target = event.target.closest?.("[data-tip]");
    if (!target) {
      tip.hidden = true;
      return;
    }
    tip.textContent = target.dataset.tip;
    tip.hidden = false;
    const half = tip.offsetWidth / 2 + 8;
    tip.style.left = Math.min(innerWidth - half, Math.max(half, event.clientX)) + "px";
    tip.style.top = event.clientY + "px";
  }
  document.addEventListener("pointermove", pointTip);
  document.addEventListener("pointerdown", pointTip);
  document.addEventListener("scroll", () => (tip.hidden = true), { passive: true });

  PBM.onChange(() => {
    renderHead();
    renderPeriod();
    renderNumbers(false);
  });

  // A different set of branches is a different set of numbers: count them up again.
  PBM.branches.onChange(() => renderNumbers(true));

  PBM.mount("analytics");
  renderHead();
  renderPeriod();
  renderNumbers(true);
})();
