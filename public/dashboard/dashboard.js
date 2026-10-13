/* Tổng quan: today's work at the top, then five numbers for one period and
   the four charts behind them. The bookings are the sample shop in
   assets/sample.js; nothing is sent anywhere.

   How each number is worked out. A period is whole days and ends yesterday,
   so it is always compared with a period of the same length before it.
     Lịch hẹn          every booking whose appointment falls in the period
     Độ kín lịch       booked hours ÷ working hours. A cancelled booking
                       frees its slot, so it is left out
     Huỷ và vắng mặt   (cancelled + no-shows) ÷ every booking
     Khách mới         customers whose first visit falls in the period
     Khách quen        customers in the period who had visited before
     Giờ cao điểm      bookings counted by weekday and starting hour; the
                       busiest two hours in a row are called out */
(function () {
  "use strict";

  const { t, icon, toast } = PBM;
  const { TODAY, NOW, OPEN, CLOSE, SHIFT_HOURS, STAFF, SERVICES, BOOKINGS, CUSTOMERS } = PBM_SAMPLE;
  const HOURS = (CLOSE - OPEN) / 60;

  const plural = (n, one, many) => (n === 1 ? one : many);

  PBM.addStrings({
    vi: {
      "doc.title": "Tổng quan | pleasebookme",
      "page.title": "Tổng quan",
      "today.title": "Hôm nay",
      "today.unit": "lịch hẹn",
      "today.split": ({ done, left }) => `${done} đã xong, ${left} còn lại`,
      "today.unmarked": ({ n }) => `${n} lịch đã qua cần cập nhật`,
      "lg.waiting": "Chưa cập nhật",
      "today.open": "Mở lịch hẹn",
      "strip.label": ({ n }) => `Lịch hôm nay theo từng nhân viên, ${n} lịch hẹn. Mở trang Lịch hẹn.`,
      "wait.title": "Chờ bạn xác nhận",
      "wait.empty": "Không còn lịch nào chờ bạn.",
      "wait.more": ({ n }) => `Xem cả ${n} lịch đang chờ`,
      "next.title": "Sắp tới",
      "next.empty": "Hôm nay không còn lịch nào.",
      "act.accept": "Xác nhận",
      "act.reject": "Từ chối",
      "toast.accept": "Đã xác nhận lịch của {name}",
      "toast.reject": "Đã từ chối lịch của {name}",
      "numbers.title": "Số liệu của tiệm",
      "period.label": "Khoảng thời gian",
      "period.7": "7 ngày qua",
      "period.28": "4 tuần qua",
      "prev.7": "7 ngày trước đó",
      "prev.28": "4 tuần trước đó",
      "period.range": ({ from, to, prev }) => `Từ ${from} đến ${to}, so với ${prev}.`,
      "m.bookings": "Lịch hẹn",
      "m.util": "Độ kín lịch",
      "m.lost": "Huỷ và vắng mặt",
      "m.customers": "Khách mới và khách quen",
      "m.peak": "Giờ cao điểm",
      "sub.bookings": ({ n }) => `${n} lịch đã diễn ra`,
      "sub.util": ({ b, a }) => `${b} trên ${a} giờ làm việc`,
      "sub.lost": ({ c, s }) => `${c} huỷ, ${s} vắng mặt`,
      "sub.customers": ({ p }) => `${p}% khách là khách quen`,
      "sub.peak": ({ from, to, n }) => `${from} – ${to}, ${n} lịch hẹn`,
      "unit.new": "khách mới",
      "d.up": "Tăng {v}",
      "d.down": "Giảm {v}",
      "d.same": "Không đổi",
      "d.points": ({ n }) => `${n} điểm`,
      "p.bookings": "Lịch hẹn theo ngày",
      "lg.done": "Đã diễn ra",
      "lg.noshow": "Vắng mặt",
      "lg.cancelled": "Đã huỷ",
      "lg.prev": "Cùng ngày kỳ trước",
      "p.customers": "Khách mới và khách quen",
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
      "lost.prev": ({ prev, p }) => `${prev}: ${p}% không diễn ra.`,
      "deep.lead": "Xem sâu hơn:",
      "deep.bookings": "theo nhân viên, theo dịch vụ, qua nhiều tháng.",
      "deep.customers": "khách lâu chưa quay lại, nhịp quay lại, giá trị của mỗi khách.",
      "deep.heat": "độ kín của từng nhân viên, nhu cầu theo dịch vụ, gợi ý lấp giờ trống.",
      "deep.lost": "khách nào hay huỷ, huỷ sát giờ ra sao, hiệu quả của tin nhắc lịch.",
      soon: "Sắp có",
      "tip.day": ({ date, n, c, s }) => {
        let text = `${date}: ${n} lịch hẹn`;
        if (c) text += `, ${c} huỷ`;
        if (s) text += `, ${s} vắng mặt`;
        return text;
      },
      "tip.cell": ({ day, from, to, n }) => `${day}, ${from} – ${to}: ${n} lịch hẹn`,
      "aria.bookings": ({ n, day, max }) =>
        `Biểu đồ cột theo ngày. ${n} lịch hẹn trong kỳ, nhiều nhất là ${day} với ${max} lịch.`,
      "aria.customers": ({ fresh, back }) => `${fresh} khách mới và ${back} khách quen.`,
      "aria.heat": ({ day, from, to }) => `Bảng theo thứ và giờ. Đông nhất là ${day}, từ ${from} đến ${to}.`,
      "aria.lost": ({ done, c, s }) => `${done} lịch đã diễn ra, ${c} lịch huỷ, ${s} lịch khách vắng mặt.`,
      note: "Số liệu mẫu. Đây là bản thiết kế, chưa nối với hệ thống.",
    },
    en: {
      "doc.title": "Dashboard | pleasebookme",
      "page.title": "Dashboard",
      "today.title": "Today",
      "today.unit": "bookings",
      "today.split": ({ done, left }) => `${done} done, ${left} to go`,
      "today.unmarked": ({ n }) => `${n} past ${n === 1 ? "booking" : "bookings"} to mark`,
      "lg.waiting": "Not marked yet",
      "today.open": "Open bookings",
      "strip.label": ({ n }) => `Today by staff member, ${n} ${plural(n, "booking", "bookings")}. Open Bookings.`,
      "wait.title": "Waiting for you",
      "wait.empty": "Nothing is waiting for you.",
      "wait.more": ({ n }) => `See all ${n} waiting`,
      "next.title": "Next up",
      "next.empty": "No more bookings today.",
      "act.accept": "Confirm",
      "act.reject": "Reject",
      "toast.accept": "Confirmed {name}'s booking",
      "toast.reject": "Rejected {name}'s booking",
      "numbers.title": "Shop numbers",
      "period.label": "Period",
      "period.7": "Last 7 days",
      "period.28": "Last 4 weeks",
      "prev.7": "the 7 days before",
      "prev.28": "the 4 weeks before",
      "period.range": ({ from, to, prev }) => `${from} to ${to}, compared with ${prev}.`,
      "m.bookings": "Bookings",
      "m.util": "Utilisation",
      "m.lost": "Cancelled or no-show",
      "m.customers": "New and returning",
      "m.peak": "Busiest times",
      "sub.bookings": ({ n }) => `${n} took place`,
      "sub.util": ({ b, a }) => `${b} of ${a} working hours`,
      "sub.lost": ({ c, s }) => `${c} cancelled, ${s} ${plural(s, "no-show", "no-shows")}`,
      "sub.customers": ({ p }) => `${p}% were returning`,
      "sub.peak": ({ from, to, n }) => `${from} – ${to}, ${n} ${plural(n, "booking", "bookings")}`,
      "unit.new": "new customers",
      "d.up": "Up {v}",
      "d.down": "Down {v}",
      "d.same": "No change",
      "d.points": ({ n }) => `${n} ${plural(n, "point", "points")}`,
      "p.bookings": "Bookings by day",
      "lg.done": "Took place",
      "lg.noshow": "No-show",
      "lg.cancelled": "Cancelled",
      "lg.prev": "Same day, period before",
      "p.customers": "New and returning customers",
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
      "lost.prev": ({ prev, p }) => `${prev}: ${p}% did not take place.`,
      "deep.lead": "Go deeper:",
      "deep.bookings": "by staff member, by service, over months.",
      "deep.customers": "customers who have not been back, visit rhythm, value of each customer.",
      "deep.heat": "utilisation per staff member, demand by service, ideas for filling quiet hours.",
      "deep.lost": "who cancels most, how late, and whether reminders help.",
      soon: "Coming soon",
      "tip.day": ({ date, n, c, s }) => {
        let text = `${date}: ${n} ${plural(n, "booking", "bookings")}`;
        if (c) text += `, ${c} cancelled`;
        if (s) text += `, ${s} ${plural(s, "no-show", "no-shows")}`;
        return text;
      },
      "tip.cell": ({ day, from, to, n }) => `${day}, ${from} – ${to}: ${n} ${plural(n, "booking", "bookings")}`,
      "aria.bookings": ({ n, day, max }) =>
        `Bar chart by day. ${n} bookings in the period; the most were on ${day}, with ${max}.`,
      "aria.customers": ({ fresh, back }) => `${fresh} new and ${back} returning customers.`,
      "aria.heat": ({ day, from, to }) => `Grid by weekday and hour. The busiest time is ${day}, ${from} to ${to}.`,
      "aria.lost": ({ done, c, s }) => `${done} took place, ${c} cancelled, ${s} no-shows.`,
      note: "Sample numbers. This is a design mockup, not connected to the system.",
    },
  });

  // ---------- State and helpers ----------

  const state = { period: 7 };
  try {
    if (localStorage.getItem("pbm-period") === "28") state.period = 28;
  } catch {
    /* no storage: the page just opens on 7 days */
  }

  const $ = (id) => document.getElementById(id);
  const addDays = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
  const dateOf = (day) => addDays(TODAY, day);
  const MONDAY = addDays(TODAY, -((TODAY.getDay() + 6) % 7));
  const clock = (m) => String(Math.floor(m / 60)).padStart(2, "0") + ":" + String(m % 60).padStart(2, "0");
  const fmt = (opts, d) => new Intl.DateTimeFormat(PBM.locale, opts).format(d);
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const longDate = (d) => cap(fmt({ weekday: "long", day: "numeric", month: "long" }, d));
  const dayMonth = (d) => `${d.getDate()}/${d.getMonth() + 1}`;
  const weekdayName = (i, width) => cap(fmt({ weekday: width }, addDays(MONDAY, i))); // 0 is Monday
  const pct = (share) => Math.round(share * 100);
  const svcName = (b) => SERVICES[b.svc][PBM.lang];
  const staffName = (id) => STAFF.find((s) => s.id === id).name;
  // Everything on the page counts only the branches on show.
  const inScope = (b) => PBM.branches.has(b.branch);
  const staffShown = () => STAFF.filter((s) => PBM.branches.has(s.branch));
  const isLive = (b) => b.status !== "CANCELLED" && b.status !== "REJECTED";
  const byStart = (a, b) => a.day - b.day || a.start - b.start || a.staff - b.staff;
  const still = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

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
      const c = all.filter((b) => !isLive(b)).length;
      const s = all.filter((b) => isLive(b) && b.noShow).length;
      perDay.push({ day, total: all.length, cancelled: c, noShow: s, done: all.length - c - s });
    }

    return {
      total: items.length,
      done: items.length - cancelled - noShow - waiting,
      cancelled,
      noShow,
      waiting,
      lost: (cancelled + noShow) / items.length,
      util: bookedHours / workHours,
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

  const span = () => ({ from: -state.period, to: -1, prevFrom: -2 * state.period, prevTo: -state.period - 1 });
  const prevName = () => t("prev." + state.period);

  // "Tăng 4" in the direction the owner wants reads as good, the other way as bad.
  function delta(diff, { points = false, goodWhenUp = true } = {}) {
    if (!diff) return `<span class="delta">${t("d.same")}</span>`;
    const up = diff > 0;
    const amount = points ? t("d.points", { n: Math.abs(diff) }) : Math.abs(diff);
    return `<span class="delta ${up === goodWhenUp ? "is-good" : "is-bad"}">${icon(up ? "up" : "down")}${t(
      up ? "d.up" : "d.down",
      { v: amount }
    )}</span>`;
  }

  // ---------- Heading ----------

  function renderHead() {
    $("title").textContent = t("page.title");
    $("date").textContent = longDate(TODAY);
    $("scope").innerHTML = PBM.branches.html();
    $("note").textContent = t("note");
    document.title = t("doc.title");
  }

  // ---------- Today ----------

  function renderToday() {
    const live = BOOKINGS.filter((b) => b.day === 0 && isLive(b) && inScope(b)).sort(byStart);
    const done = live.filter((b) => b.end <= NOW).length;
    const waiting = BOOKINGS.filter((b) => b.status === "PENDING" && b.day >= 0 && inScope(b)).sort(byStart);
    // Accepted bookings whose time has passed and that nobody has marked as done or no-show.
    const unmarked = BOOKINGS.filter(
      (b) => b.status === "ACCEPTED" && !b.outcome && inScope(b) && (b.day < 0 || (b.day === 0 && b.end <= NOW))
    ).length;
    const next = live.filter((b) => b.status === "ACCEPTED" && b.start >= NOW).slice(0, 3);
    const dayLength = CLOSE - OPEN;
    const place = (m) => ((m - OPEN) / dayLength) * 100;

    // The day in miniature: one thin row per staff member, 08:00 to 20:00.
    const rows = staffShown().map((person) => {
      const blocks = live
        .filter((b) => b.staff === person.id)
        .map(
          (b) =>
            `<i class="st-${b.status.toLowerCase()}${b.end <= NOW ? " is-past" : ""}" style="left:${place(b.start)}%;width:${
              ((b.end - b.start) / dayLength) * 100
            }%"></i>`
        )
        .join("");
      return `<span class="strip-name">${person.name}</span><span class="strip-track">${blocks}</span>`;
    }).join("");
    const ticks = [8, 12, 16, 20]
      .map((h) => `<span class="num" style="left:${place(h * 60)}%">${clock(h * 60)}</span>`)
      .join("");

    const otherDay = (b) => (b.day === 0 ? "" : `<small>${cap(fmt({ weekday: "short" }, dateOf(b.day)))}</small>`);
    const line = (b) => `
          <span class="row-time num">${otherDay(b)}${clock(b.start)}</span>
          <span class="row-text"><strong>${b.customer}</strong><span>${svcName(b)}, ${staffName(b.staff)}</span></span>`;

    $("today").innerHTML = `
      <div class="today-main">
        <h2 id="today-title">${t("today.title")}</h2>
        <a class="btn btn-quiet btn-small" href="/dashboard/bookings">${icon("calendar")}${t("today.open")}</a>
        <p class="today-count"><strong class="num">${live.length}</strong><span>${t("today.unit")}</span><span class="today-split">${t(
          "today.split",
          { done, left: live.length - done }
        )}</span></p>
        ${unmarked ? `<a class="today-mark" href="/dashboard/bookings">${t("today.unmarked", { n: unmarked })}</a>` : ""}
        <a class="strip" href="/dashboard/bookings" aria-label="${t("strip.label", { n: live.length })}">
          <span class="strip-rows">${rows}<i class="strip-now" style="--at:${place(NOW) / 100}"></i></span>
          <span class="strip-axis" aria-hidden="true">${ticks}</span>
        </a>
      </div>
      <div class="today-list">
        <div class="list-head">
          <h3>${t("wait.title")}${waiting.length ? ` <span class="pill num">${waiting.length}</span>` : ""}</h3>
          ${waiting.length > 3 ? `<a class="rows-more" href="/dashboard/bookings">${t("wait.more", { n: waiting.length })}</a>` : ""}
        </div>
        ${
          waiting.length
            ? `<ul class="rows">${waiting
                .slice(0, 3)
                .map(
                  (b) => `<li>${line(b)}
          <span class="row-actions">
            <button class="btn btn-primary btn-small" type="button" data-act="accept" data-id="${b.id}" aria-label="${t("act.accept")}: ${b.customer}">${t("act.accept")}</button>
            <button class="btn btn-quiet btn-small" type="button" data-act="reject" data-id="${b.id}" aria-label="${t("act.reject")}: ${b.customer}">${t("act.reject")}</button>
          </span></li>`
                )
                .join("")}</ul>`
            : `<p class="rows-empty">${t("wait.empty")}</p>`
        }
      </div>
      <div class="today-list">
        <div class="list-head"><h3>${t("next.title")}</h3></div>
        ${
          next.length
            ? `<ul class="rows">${next.map((b) => `<li>${line(b)}</li>`).join("")}</ul>`
            : `<p class="rows-empty">${t("next.empty")}</p>`
        }
      </div>`;
  }

  const NEXT_STATUS = { accept: "ACCEPTED", reject: "REJECTED" };

  function act(id, action) {
    const b = BOOKINGS.find((item) => item.id === Number(id));
    b.status = NEXT_STATUS[action];
    renderToday();
    toast(t("toast." + action, { name: b.customer }));
    // The pressed button is gone; move on to the next booking that is waiting.
    ($("today").querySelector("[data-act]") || $("today").querySelector(".btn")).focus();
  }

  // ---------- Period ----------

  function renderPeriod() {
    $("period").innerHTML = `
      <h2 id="period-title">${t("numbers.title")}</h2>
      <p id="period-range"></p>
      <div class="seg" id="periodSeg" role="group" aria-label="${t("period.label")}" style="--n:2;--i:${state.period === 7 ? 0 : 1}">
        <button type="button" data-period="7" aria-pressed="${state.period === 7}">${t("period.7")}</button>
        <button type="button" data-period="28" aria-pressed="${state.period === 28}">${t("period.28")}</button>
      </div>`;
  }

  // ---------- Cards ----------

  const number = (key, n) => `<span class="num" data-num="${key}" data-to="${n}">${n}</span>`;

  function cardsHTML(now, before) {
    const card = ({ key, panel, value, sub, extra = "", foot = "" }) => `
      <a class="panel card" href="#${panel}" data-panel="${panel}" data-metric="${key}">
        <span class="card-label">${t("m." + key)}</span>
        <span class="card-value">${value}</span>
        ${extra}
        <span class="card-sub">${sub}</span>
        ${foot}
      </a>`;
    const { peak } = now;

    return [
      card({
        key: "bookings",
        panel: "p-bookings",
        value: number("bookings", now.total),
        sub: t("sub.bookings", { n: now.done }),
        foot: delta(now.total - before.total),
      }),
      card({
        key: "util",
        panel: "p-heat",
        value: number("util", pct(now.util)) + '<span class="sign">%</span>',
        extra: `<span class="meter" aria-hidden="true"><i style="width:${pct(now.util)}%"></i></span>`,
        sub: t("sub.util", { b: Math.round(now.bookedHours), a: now.workHours }),
        foot: delta(pct(now.util) - pct(before.util), { points: true }),
      }),
      card({
        key: "lost",
        panel: "p-lost",
        value: number("lost", pct(now.lost)) + '<span class="sign">%</span>',
        sub: t("sub.lost", { c: now.cancelled, s: now.noShow }),
        foot: delta(pct(now.lost) - pct(before.lost), { points: true, goodWhenUp: false }),
      }),
      card({
        key: "customers",
        panel: "p-customers",
        value: number("fresh", now.fresh) + ` <small>${t("unit.new")}</small>`,
        sub: t("sub.customers", { p: pct(now.back / now.customers) }),
        foot: delta(now.fresh - before.fresh),
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

  // ---------- Charts ----------

  const chart = ({ id, title, aside = "", body, deep }) => `
      <section class="panel chart" id="${id}" aria-labelledby="${id}-title">
        <header class="chart-head">
          <h3 id="${id}-title">${title}</h3>
          ${aside}
        </header>
        <div class="chart-body">${body}</div>
        <p class="deeper" data-plan="paid">${icon("chart")}<span><b>${t("deep.lead")}</b> ${deep}</span><span class="soon">${t("soon")}</span></p>
      </section>`;

  function bookingsChart(now, before) {
    const days = now.perDay;
    const top = Math.max(...days.map((d) => d.total), ...before.perDay.map((d) => d.total));
    const step = top > 24 ? 10 : 5;
    const max = Math.ceil((top + 1) / step) * step;
    const few = days.length <= 7;
    const best = days.reduce((a, b) => (b.total > a.total ? b : a));

    const lines = [];
    for (let v = 0; v <= max; v += step) {
      lines.push(`<span class="gridline" style="bottom:${(v / max) * 100}%"><i class="num">${v}</i></span>`);
    }

    const cols = days
      .map((d, i) => {
        const date = dateOf(d.day);
        const weekday = cap(fmt({ weekday: "short" }, date));
        const label = few
          ? `<span class="bar-label"><b>${weekday}</b><span class="num">${dayMonth(date)}</span></span>`
          : date.getDay() === 1
            ? `<span class="bar-label"><span class="num">${dayMonth(date)}</span></span>`
            : "";
        const tip = t("tip.day", { date: longDate(date), n: d.total, c: d.cancelled, s: d.noShow });
        return `<div class="bar-col" style="--i:${i}" data-tip="${tip}">
            <span class="bar-prev" style="height:${(before.perDay[i].total / max) * 100}%"></span>
            <div class="bar-stack" style="height:${(d.total / max) * 100}%">
              <i class="part-done" style="flex:${d.done}"></i>
              <i class="part-noshow" style="flex:${d.noShow}"></i>
              <i class="part-cancelled" style="flex:${d.cancelled}"></i>
            </div>
            ${label}
          </div>`;
      })
      .join("");

    return chart({
      id: "p-bookings",
      title: t("p.bookings"),
      aside: `<ul class="legend">
          <li><i class="swatch part-done"></i>${t("lg.done")}</li>
          <li><i class="swatch part-noshow"></i>${t("lg.noshow")}</li>
          <li><i class="swatch part-cancelled"></i>${t("lg.cancelled")}</li>
          <li><i class="swatch part-rest"></i>${t("lg.prev")}</li>
        </ul>`,
      body: `<div class="plot${few ? " is-few" : ""}" role="img" aria-label="${t("aria.bookings", {
        n: now.total,
        day: longDate(dateOf(best.day)),
        max: best.total,
      })}">
          ${lines.join("")}
          <div class="bars" style="--n:${days.length}">${cols}</div>
        </div>`,
      deep: t("deep.bookings"),
    });
  }

  function customersChart(now, before) {
    const ring = 2 * Math.PI * 46;
    const share = now.fresh / now.customers;
    return chart({
      id: "p-customers",
      title: t("p.customers"),
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
        <p class="chart-note">${cap(t("c.prev", { prev: prevName(), n: before.fresh }))}</p>`,
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

  function lostChart(now, before) {
    const share = (n) => pct(n / now.total);
    const row = (cls, label, n) =>
      `<div><dt><i class="swatch ${cls}"></i>${label}</dt><dd class="num">${n}<span>${share(n)}%</span></dd></div>`;
    return chart({
      id: "p-lost",
      title: t("p.lost"),
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
        <p class="chart-note">${cap(t("lost.prev", { prev: prevName(), p: pct(before.lost) }))}</p>`,
      deep: t("deep.lost"),
    });
  }

  function renderNumbers(animate) {
    const { from, to, prevFrom, prevTo } = span();
    const now = measure(from, to);
    const before = measure(prevFrom, prevTo);

    $("period-range").textContent = t("period.range", {
      from: dayMonth(dateOf(from)),
      to: dayMonth(dateOf(to)),
      prev: prevName(),
    });
    const cards = $("cards");
    const charts = $("charts");
    // A redraw for a new language or theme should not replay the drawing-in.
    cards.classList.toggle("is-still", !animate);
    charts.classList.toggle("is-still", !animate);
    cards.innerHTML = cardsHTML(now, before);
    charts.innerHTML = bookingsChart(now, before) + customersChart(now, before) + heatChart(now) + lostChart(now, before);
    countUp(animate);
  }

  // ---------- Events ----------

  $("period").addEventListener("click", (event) => {
    const btn = event.target.closest("[data-period]");
    if (!btn || Number(btn.dataset.period) === state.period) return;
    state.period = Number(btn.dataset.period);
    try {
      localStorage.setItem("pbm-period", String(state.period));
    } catch {
      /* no storage */
    }
    // Move the thumb in place, so the slide is not cut off by a redraw.
    $("periodSeg").style.setProperty("--i", state.period === 7 ? 0 : 1);
    $("periodSeg")
      .querySelectorAll("button")
      .forEach((b) => b.setAttribute("aria-pressed", String(Number(b.dataset.period) === state.period)));
    renderNumbers(true);
  });

  $("today").addEventListener("click", (event) => {
    const action = event.target.closest("[data-act]");
    if (action) act(action.dataset.id, action.dataset.act);
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

  // One floating label for every bar and cell.
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
    renderToday();
    renderPeriod();
    renderNumbers(false);
  });

  // A different set of branches is a different set of numbers: count them up again.
  PBM.branches.onChange(() => {
    renderToday();
    renderNumbers(true);
  });

  PBM.mount("dashboard");
  renderHead();
  renderToday();
  renderPeriod();
  renderNumbers(true);
})();
