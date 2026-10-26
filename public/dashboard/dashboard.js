/* Tổng quan: four counts and one table. Each count is a list; picking it shows
   that list in the table, and picking a booking opens it in a side panel
   without leaving the page. Only simple counts live here, so the page opens
   fast. The charts and the heavier numbers are on Phân tích.

   The four lists (only the branches on show are counted):
     Hôm nay          today's bookings that still hold their slot, by time,
                      with a line where "now" is
     Chờ xác nhận     bookings from today on that wait for a yes or no
     Sắp tới          the 10 nearest from now, by start time. The count is
                      everything in the next 7 days
     Chưa cập nhật    accepted bookings whose time has passed and that nobody
                      has marked as done or no-show, newest first */
(function () {
  "use strict";

  const { t, icon, toast } = PBM;
  const { TODAY, NOW, STAFF, SERVICES, BOOKINGS, BRANCHES, WIDGETS } = PBM_SAMPLE;

  const plural = (n, one, many) => (n === 1 ? one : many);
  const LISTS = ["today", "pending", "next", "unmarked"];
  const NEXT_ROWS = 10;
  const NEXT_DAYS = 7;

  PBM.addStrings({
    vi: {
      "doc.title": "Tổng quan | pleasebookme",
      "page.title": "Tổng quan",
      "lists.label": "Danh sách lịch hẹn",
      "c.today": "Hôm nay",
      "c.pending": "Chờ xác nhận",
      "c.next": "Sắp tới",
      "c.unmarked": "Chưa cập nhật",
      "c.today.sub": ({ done, left }) => `${done} đã xong, ${left} còn lại`,
      "c.pending.sub": ({ when }) => `Sớm nhất: ${when}`,
      "c.pending.none": "Không còn lịch nào chờ",
      "c.next.sub": "Trong 7 ngày tới",
      "c.unmarked.sub": "Khách đã đến hay không đến?",
      "c.unmarked.none": "Mọi lịch đã qua đều được ghi lại",
      "l.today": ({ date }) => `Lịch hôm nay, ${date}`,
      "l.pending": "Khách đặt và đang chờ bạn trả lời. Lịch chỉ giữ chỗ khi bạn xác nhận.",
      "l.next": "10 lịch gần nhất, theo giờ bắt đầu.",
      "l.unmarked": "Lịch nằm ở đây cho tới khi bạn ghi lại khách đã đến hay không đến.",
      "e.today": "Hôm nay chưa có lịch nào. Gửi link đặt lịch để khách tự chọn giờ.",
      "e.setup": "Tiệm chưa nhận khách được: khách cần có dịch vụ để chọn, và giờ làm việc để biết lúc nào đặt được.",
      "setup.services": "Thêm dịch vụ",
      "setup.hours": "Đặt giờ làm việc",
      "e.pending": "Không còn lịch nào chờ bạn.",
      "e.next": "Chưa có lịch nào sắp tới.",
      "e.unmarked": "Mọi lịch đã qua đều được ghi lại.",
      "foot.next": ({ n }) => `Xem cả ${n} lịch trong 7 ngày tới`,
      "foot.open": "Mở Lịch hẹn",
      now: ({ time }) => `Bây giờ, ${time}`,
      "earlier.show": ({ n }) => `${n} lịch đã xong trước giờ này`,
      "earlier.hide": "Ẩn các lịch đã xong",
      "col.when": "Giờ",
      "col.customer": "Khách",
      "col.service": "Dịch vụ",
      "col.staff": "Người làm",
      "col.status": "Trạng thái",
      "col.actions": "Việc cần làm",
      yesterday: "Hôm qua",
      todayWord: "Hôm nay",
      tomorrow: "Ngày mai",
      minutes: ({ n }) => `${n} phút`,
      "st.PENDING": "Chờ xác nhận",
      "st.ACCEPTED": "Đã xác nhận",
      "st.AWAITING_HOST": "Chờ tiệm phản hồi",
      "st.REJECTED": "Đã từ chối",
      "st.CANCELLED": "Đã huỷ",
      "out.done": "Đã diễn ra",
      "out.noShow": "Vắng mặt",
      "out.wait": "Cần cập nhật",
      "act.accept": "Xác nhận",
      "act.reject": "Từ chối",
      "act.done": "Đã đến",
      "act.noshow": "Không đến",
      "act.done.long": "Khách đã đến",
      "act.noshow.long": "Khách không đến",
      "act.unmark": "Ghi lại",
      "act.move": "Đổi giờ",
      "act.cancel": "Huỷ lịch",
      "act.close": "Đóng",
      "act.prev": "Lịch phía trên",
      "act.next": "Lịch phía dưới",
      "sheet.open": "Mở trong Lịch hẹn",
      "sheet.when": "Thời gian",
      "sheet.service": "Dịch vụ",
      "sheet.staff": "Người làm",
      "sheet.branch": "Chi nhánh",
      "sheet.price": "Giá",
      "sheet.widget": "Đặt qua",
      "sheet.phone": "Điện thoại",
      "sheet.code": "Mã lịch hẹn",
      "source.hand": "Tiệm tự thêm",
      "toast.accept": "Đã xác nhận lịch của {name}",
      "toast.reject": "Đã từ chối lịch của {name}",
      "toast.cancel": "Đã huỷ lịch của {name}",
      "toast.done": "Đã ghi: {name} đã đến",
      "toast.noshow": "Đã ghi: {name} không đến",
      "toast.unmark": "Lịch của {name} chờ ghi lại",
      deeper: "Số liệu theo tuần, giờ cao điểm, khách mới và khách quen nằm ở",
      "deeper.link": "Phân tích",
      note: "Số liệu mẫu. Đây là bản thiết kế, chưa nối với hệ thống.",
    },
    en: {
      "doc.title": "Dashboard | pleasebookme",
      "page.title": "Dashboard",
      "lists.label": "Booking lists",
      "c.today": "Today",
      "c.pending": "Unconfirmed",
      "c.next": "Upcoming",
      "c.unmarked": "Not marked yet",
      "c.today.sub": ({ done, left }) => `${done} done, ${left} to go`,
      "c.pending.sub": ({ when }) => `Earliest: ${when}`,
      "c.pending.none": "No unconfirmed bookings",
      "c.next.sub": "In the next 7 days",
      "c.unmarked.sub": "Did the customer show up?",
      "c.unmarked.none": "Every past booking is marked",
      "l.today": ({ date }) => `Today, ${date}`,
      "l.pending": "Customers booked these and they require your confirmation. A booking holds its slot once you confirm it.",
      "l.next": "The 10 nearest bookings, by start time.",
      "l.unmarked": "A booking stays here until you mark whether the customer came.",
      "e.today": "No bookings today yet. Share your booking link so customers can pick a time.",
      "e.setup": "The shop cannot take bookings yet: customers need a service to choose and working hours to know when they can book.",
      "setup.services": "Add a service",
      "setup.hours": "Set working hours",
      "e.pending": "No unconfirmed bookings.",
      "e.next": "No upcoming bookings.",
      "e.unmarked": "Every past booking is marked.",
      "foot.next": ({ n }) => `See all ${n} in the next 7 days`,
      "foot.open": "View all bookings",
      now: ({ time }) => `Now, ${time}`,
      "earlier.show": ({ n }) => `${n} ${plural(n, "booking", "bookings")} already finished`,
      "earlier.hide": "Hide finished bookings",
      "col.when": "Time",
      "col.customer": "Customer",
      "col.service": "Service",
      "col.staff": "Staff",
      "col.status": "Status",
      "col.actions": "Actions",
      yesterday: "Yesterday",
      todayWord: "Today",
      tomorrow: "Tomorrow",
      minutes: ({ n }) => `${n} min`,
      "st.PENDING": "Unconfirmed",
      "st.ACCEPTED": "Confirmed",
      "st.AWAITING_HOST": "Awaiting host",
      "st.REJECTED": "Rejected",
      "st.CANCELLED": "Canceled",
      "out.done": "Completed",
      "out.noShow": "No-show",
      "out.wait": "Not marked",
      "act.accept": "Confirm",
      "act.reject": "Reject",
      "act.done": "Completed",
      "act.noshow": "No-show",
      "act.done.long": "Mark as completed",
      "act.noshow.long": "Mark as no-show",
      "act.unmark": "Undo",
      "act.move": "Reschedule",
      "act.cancel": "Cancel booking",
      "act.close": "Close",
      "act.prev": "Booking above",
      "act.next": "Booking below",
      "sheet.open": "Open in Bookings",
      "sheet.when": "When",
      "sheet.service": "Service",
      "sheet.staff": "Staff",
      "sheet.branch": "Branch",
      "sheet.price": "Price",
      "sheet.widget": "Booked through",
      "sheet.phone": "Phone",
      "sheet.code": "Booking code",
      "source.hand": "Added by the shop",
      "toast.accept": "Confirmed {name}'s booking",
      "toast.reject": "Rejected {name}'s booking",
      "toast.cancel": "Canceled {name}'s booking",
      "toast.done": "Marked {name} as completed",
      "toast.noshow": "Marked {name} as no-show",
      "toast.unmark": "{name}'s booking is not marked",
      deeper: "Weekly numbers, busiest times, and new and returning customers are in",
      "deeper.link": "Analytics",
      note: "Sample numbers. This is a design mockup, not connected to the system.",
    },
  });

  // ---------- State and helpers ----------

  // earlier: whether today's finished bookings are shown or folded into one row.
  const state = { list: "today", open: null, earlier: false };
  try {
    const saved = localStorage.getItem("pbm-home-list");
    if (LISTS.includes(saved)) state.list = saved;
  } catch {
    /* no storage: the page opens on today */
  }

  const $ = (id) => document.getElementById(id);
  const addDays = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
  const dateOf = (day) => addDays(TODAY, day);
  const clock = (m) => String(Math.floor(m / 60)).padStart(2, "0") + ":" + String(m % 60).padStart(2, "0");
  const fmt = (opts, d) => new Intl.DateTimeFormat(PBM.locale, opts).format(d);
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const longDate = (d) => cap(fmt({ weekday: "long", day: "numeric", month: "long" }, d));
  const money = (n) => new Intl.NumberFormat(PBM.locale, { style: "currency", currency: "VND" }).format(n);
  const byId = (id) => BOOKINGS.find((b) => b.id === Number(id));
  const byStart = (a, b) => a.day - b.day || a.start - b.start || a.staff - b.staff;
  const staffOf = (id) => STAFF.find((s) => s.id === id);
  const branchOf = (id) => BRANCHES.find((b) => b.id === id);
  const sourceOf = (b) => WIDGETS.find((w) => w.id === b.widget) || { name: t("source.hand") };
  const inScope = (b) => PBM.branches.has(b.branch);
  const severalBranches = () => BRANCHES.length > 1 && PBM.branches.chosen.length !== 1;
  const isLive = (b) => b.status !== "CANCELLED" && b.status !== "REJECTED";
  const isPast = (b) => b.day < 0 || (b.day === 0 && b.end <= NOW);
  const isAhead = (b) => b.day > 0 || (b.day === 0 && b.start >= NOW);
  // After its time an accepted booking is "done", "noShow", or still waiting
  // ("wait") for someone to say which. Nothing counts as done by itself.
  const outcomeOf = (b) => (b.status === "ACCEPTED" && isPast(b) ? b.outcome || "wait" : null);

  // "Hôm nay", "Ngày mai", or the weekday and date.
  function dayWord(day) {
    if (day === 0) return t("todayWord");
    if (day === 1) return t("tomorrow");
    if (day === -1) return t("yesterday");
    const d = dateOf(day);
    return `${cap(fmt({ weekday: "short" }, d))}, ${d.getDate()}/${d.getMonth() + 1}`;
  }

  // Each list, worked out from the bookings. These are the only queries the
  // page runs, and each one is a plain filter and count.
  function lists() {
    const shown = BOOKINGS.filter(inScope);
    const ahead = shown.filter((b) => isLive(b) && isAhead(b)).sort(byStart);
    return {
      today: shown.filter((b) => b.day === 0 && isLive(b)).sort(byStart),
      pending: shown.filter((b) => b.status === "PENDING" && b.day >= 0).sort(byStart),
      next: ahead.slice(0, NEXT_ROWS),
      nextCount: ahead.filter((b) => b.day < NEXT_DAYS).length,
      // Newest first: the booking that has just ended is the one the owner remembers.
      unmarked: shown.filter((b) => outcomeOf(b) === "wait").sort((a, b) => b.day - a.day || b.start - a.start),
    };
  }

  const badge = (b) => {
    const out = outcomeOf(b);
    return out
      ? `<span class="badge out-${out.toLowerCase()}">${t("out." + out)}</span>`
      : `<span class="badge st-${b.status.toLowerCase()}">${t("st." + b.status)}</span>`;
  };

  // The buttons a booking needs from the owner, if any.
  function rowActions(b) {
    const button = (act, label, primary) =>
      `<button class="btn ${primary ? "btn-primary" : "btn-quiet"} btn-small" type="button" data-act="${act}" data-id="${b.id}" aria-label="${t(label)}: ${b.customer}">${t(label)}</button>`;
    if (b.status === "PENDING") return button("accept", "act.accept", true) + button("reject", "act.reject");
    if (outcomeOf(b) === "wait") return button("done", "act.done", true) + button("noshow", "act.noshow");
    return "";
  }

  // ---------- Heading ----------

  function renderHead() {
    $("title").textContent = t("page.title");
    $("date").textContent = longDate(TODAY);
    $("scope").innerHTML = PBM.branches.html();
    $("counts").setAttribute("aria-label", t("lists.label"));
    $("deeper").innerHTML = `${t("deeper")} <a href="/dashboard/analytics">${t("deeper.link")}</a>.`;
    $("note").textContent = t("note");
    document.title = t("doc.title");
  }

  // ---------- The four counts ----------

  function renderCounts(all) {
    const done = all.today.filter(isPast).length;
    const first = all.pending[0];
    const subs = {
      today: t("c.today.sub", { done, left: all.today.length - done }),
      pending: first ? t("c.pending.sub", { when: `${clock(first.start)} ${dayWord(first.day).toLowerCase()}` }) : t("c.pending.none"),
      next: t("c.next.sub"),
      unmarked: all.unmarked.length ? t("c.unmarked.sub") : t("c.unmarked.none"),
    };
    const counts = { today: all.today.length, pending: all.pending.length, next: all.nextCount, unmarked: all.unmarked.length };

    $("counts").innerHTML = LISTS.map((key) => {
      const on = key === state.list;
      // A list that needs the owner shows it on the count as well.
      const needs = (key === "pending" || key === "unmarked") && counts[key] > 0;
      return `<button class="count${needs ? " needs-you" : ""}" type="button" role="tab" id="tab-${key}" data-list="${key}"
          aria-selected="${on}" aria-controls="list" tabindex="${on ? 0 : -1}">
          <span class="count-label">${t("c." + key)}</span>
          <span class="count-value num">${counts[key]}</span>
          <span class="count-sub">${subs[key]}</span>
        </button>`;
    }).join("");
  }

  // ---------- The table ----------

  function rowHTML(b) {
    const service = SERVICES[b.svc];
    const person = staffOf(b.staff);
    // On today's list the date goes without saying.
    const when =
      state.list === "today"
        ? `<strong class="num">${clock(b.start)}</strong><small class="num">${clock(b.end)}</small>`
        : `<strong class="num">${clock(b.start)}</strong><small>${dayWord(b.day)}</small>`;
    const classes = [];
    if (state.list === "today" && isPast(b)) classes.push("is-past");
    if (state.open === b.id) classes.push("is-open");
    return `<tr tabindex="0" data-bk="${b.id}"${classes.length ? ` class="${classes.join(" ")}"` : ""}>
        <td class="cell-when">${when}</td>
        <td><span class="dt-name"><span><strong>${b.customer}</strong><small class="num">${b.phone}</small></span></span></td>
        <td class="col-svc"><span class="dt-name"><span><strong>${service[PBM.lang]}</strong><small>${t("minutes", { n: service.min })}</small></span></span></td>
        <td><span class="dt-name"><span class="avatar code-fill code-${person.code}" aria-hidden="true">${person.name.charAt(0)}</span><span><strong>${person.name}</strong>${
          severalBranches() ? `<small>${branchOf(b.branch).name}</small>` : ""
        }</span></span></td>
        <td class="col-status">${badge(b)}</td>
        <td class="cell-actions">${b.status === "PENDING" || state.list === "unmarked" ? rowActions(b) : ""}</td>
      </tr>`;
  }

  // The line that says where "now" falls among today's bookings.
  const nowRow = () =>
    `<tr class="now-row" aria-hidden="true"><td colspan="6"><span class="now-line num">${t("now", { time: clock(NOW) })}</span></td></tr>`;

  function renderList(all) {
    const items = all[state.list];
    const lede = {
      today: t("l.today", { date: longDate(TODAY) }),
      pending: t("l.pending"),
      next: t("l.next"),
      unmarked: t("l.unmarked"),
    }[state.list];

    let body = items.map(rowHTML);
    if (state.list === "today" && items.length) {
      // The bookings that have finished fold into one row, so "now" and what
      // comes next open at the top. The ones still to mark have their own list.
      const finished = items.filter(isPast).length;
      const fold = finished > 1 && !state.earlier;
      const at = items.findIndex((b) => b.start >= NOW);
      body = [];
      items.forEach((b, i) => {
        if (i === at) body.push(nowRow());
        if (!(fold && isPast(b))) body.push(rowHTML(b));
      });
      if (at < 0) body.push(nowRow());
      if (finished > 1) {
        body.unshift(`<tr class="earlier-row"><td colspan="6"><button type="button" data-earlier aria-expanded="${state.earlier}">${icon(
          "chevron"
        )}${state.earlier ? t("earlier.hide") : t("earlier.show", { n: finished })}</button></td></tr>`);
      }
    }

    const foot =
      state.list === "next" && all.nextCount > items.length
        ? `<a href="/dashboard/bookings">${t("foot.next", { n: all.nextCount })}</a>`
        : `<a href="/dashboard/bookings">${t("foot.open")}</a>`;

    $("list").setAttribute("aria-labelledby", "tab-" + state.list);
    $("list").innerHTML = `
      <header class="list-head">
        <h2>${t("c." + state.list)}</h2>
        <p>${lede}</p>
      </header>
      ${
        items.length
          ? `<div class="dt-wrap"><table class="dt">
              <thead><tr>
                <th scope="col">${t("col.when")}</th>
                <th scope="col">${t("col.customer")}</th>
                <th scope="col" class="col-svc">${t("col.service")}</th>
                <th scope="col">${t("col.staff")}</th>
                <th scope="col" class="col-status">${t("col.status")}</th>
                <th scope="col" class="cell-actions"><span class="visually-hidden">${t("col.actions")}</span></th>
              </tr></thead>
              <tbody>${body.join("")}</tbody>
            </table></div>`
          : state.list === "today" && !Object.keys(SERVICES).length
          ? `<div class="list-empty">
              <p>${t("e.setup")}</p>
              <div class="blank-actions"><a class="btn btn-primary" href="/dashboard/services">${icon("plus")}${t("setup.services")}</a><a class="btn btn-quiet" href="/dashboard/availability">${t("setup.hours")}</a></div>
            </div>`
          : `<p class="list-empty">${t("e." + state.list)}</p>`
      }
      <footer class="list-foot">${foot}</footer>`;
  }

  // ---------- The side panel ----------

  let lastFocus = null;

  function renderSheet() {
    const sheet = $("sheet");
    const b = state.open && byId(state.open);
    if (!b || !inScope(b)) {
      state.open = null;
      sheet.hidden = true;
      return;
    }
    const service = SERVICES[b.svc];
    const items = lists()[state.list];
    const index = items.findIndex((item) => item.id === b.id);

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
      actions = `<a class="btn btn-primary" href="/dashboard/bookings#move-${b.id}">${t("act.move")}</a>
           <button class="btn btn-quiet" type="button" data-act="cancel" data-id="${b.id}">${t("act.cancel")}</button>`;
    }

    // Up and down walk the list the panel was opened from, as in Notion.
    const step = (dir, label, glyph) => {
      const off = index < 0 || !items[index + dir];
      return `<button class="icon-btn" type="button" data-step="${dir}" aria-label="${t(label)}" title="${t(label)}"${off ? " disabled" : ""}>${icon(glyph)}</button>`;
    };

    sheet.innerHTML = `
      <header class="sheet-head">
        <div>
          ${badge(b)}
          <h2 id="sheet-name">${b.customer}</h2>
        </div>
        <div class="sheet-tools">
          ${step(-1, "act.prev", "up")}
          ${step(1, "act.next", "down")}
          <button class="icon-btn" type="button" data-close aria-label="${t("act.close")}" title="${t("act.close")}">${icon("x")}</button>
        </div>
      </header>
      <dl class="facts">
        <div><dt>${t("sheet.when")}</dt><dd>${longDate(dateOf(b.day))}<br /><span class="num">${clock(b.start)} – ${clock(b.end)}</span></dd></div>
        <div><dt>${t("sheet.service")}</dt><dd>${service[PBM.lang]}<br /><span>${t("minutes", { n: service.min })}</span></dd></div>
        <div><dt>${t("sheet.staff")}</dt><dd>${staffOf(b.staff).name}</dd></div>
        ${BRANCHES.length > 1 ? `<div><dt>${t("sheet.branch")}</dt><dd>${branchOf(b.branch).name}</dd></div>` : ""}
        <div><dt>${t("sheet.price")}</dt><dd class="num">${money(service.price)}</dd></div>
        <div><dt>${t("sheet.widget")}</dt><dd>${sourceOf(b).name}</dd></div>
        <div><dt>${t("sheet.phone")}</dt><dd class="num"><a href="tel:${b.phone.replace(/\s/g, "")}">${b.phone}</a></dd></div>
        <div><dt>${t("sheet.code")}</dt><dd class="num">${b.uid}</dd></div>
      </dl>
      <a class="sheet-link" href="/dashboard/bookings#bk-${b.id}">${icon("calendar")}${t("sheet.open")}</a>
      ${actions ? `<footer class="sheet-actions">${actions}</footer>` : ""}`;
    sheet.hidden = false;
  }

  // Focus the first of these the panel has: an answer to give, else the close button.
  const focusInSheet = (...selectors) =>
    selectors.map((sel) => $("sheet").querySelector(sel)).find(Boolean)?.focus();

  function openSheet(id, ...focus) {
    if (!state.open) lastFocus = document.activeElement;
    state.open = Number(id);
    renderAll();
    focusInSheet(...(focus.length ? focus : ["[data-close]"]));
    // Keep the picked row in view when the panel walks the list.
    $("list").querySelector("tr.is-open")?.scrollIntoView({ block: "nearest" });
  }

  function closeSheet() {
    if (!state.open) return;
    const id = state.open;
    state.open = null;
    renderAll();
    const row = $("list").querySelector(`tr[data-bk="${id}"]`);
    (row || (lastFocus && document.contains(lastFocus) ? lastFocus : null))?.focus();
  }

  // ---------- Updates ----------

  function renderAll() {
    const all = lists();
    renderCounts(all);
    renderList(all);
    renderSheet();
  }

  function pick(list, focus) {
    if (list === state.list) return;
    state.list = list;
    try {
      localStorage.setItem("pbm-home-list", list);
    } catch {
      /* no storage */
    }
    renderAll();
    if (focus) $("tab-" + list).focus();
  }

  const NEXT_STATUS = { accept: "ACCEPTED", reject: "REJECTED", cancel: "CANCELLED" };

  function act(id, action) {
    const b = byId(id);
    const before = lists()[state.list];
    const at = before.findIndex((item) => item.id === b.id);

    if (action === "done" || action === "noshow") {
      b.outcome = action === "done" ? "done" : "noShow";
      b.noShow = action === "noshow";
    } else if (action === "unmark") {
      b.outcome = null;
      b.noShow = false;
    } else b.status = NEXT_STATUS[action];
    toast(t("toast." + action, { name: b.customer }));

    // Answered from the panel and gone from the list: the panel moves on to the
    // booking that took its place, so a queue can be cleared without the mouse.
    const after = lists()[state.list];
    if (state.open === b.id && at >= 0 && !after.some((item) => item.id === b.id) && after.length) {
      return openSheet(after[Math.min(at, after.length - 1)].id, "[data-act]", "[data-close]");
    }
    renderAll();
    if (state.open === b.id) focusInSheet("[data-act]", "[data-close]");
    else ($("list").querySelector("[data-act]") || $("tab-" + state.list)).focus();
  }

  // ---------- Events ----------

  $("counts").addEventListener("click", (event) => {
    const tab = event.target.closest("[data-list]");
    if (tab) pick(tab.dataset.list);
  });

  // Arrow keys move between the four counts, as in any set of tabs.
  $("counts").addEventListener("keydown", (event) => {
    const moves = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    if (!(event.key in moves)) return;
    event.preventDefault();
    const i = LISTS.indexOf(state.list);
    pick(LISTS[(i + moves[event.key] + LISTS.length) % LISTS.length], true);
  });

  document.addEventListener("click", (event) => {
    const action = event.target.closest("[data-act]");
    if (action) return act(action.dataset.id, action.dataset.act);
    if (event.target.closest("[data-close]")) return closeSheet();
    if (event.target.closest("[data-earlier]")) {
      state.earlier = !state.earlier;
      renderAll();
      return $("list").querySelector("[data-earlier]").focus();
    }
    const step = event.target.closest("[data-step]");
    if (step) {
      const items = lists()[state.list];
      const index = items.findIndex((item) => item.id === state.open);
      const next = items[index + Number(step.dataset.step)];
      if (next) openSheet(next.id, `[data-step="${step.dataset.step}"]:not(:disabled)`, "[data-close]");
      return;
    }
    const row = event.target.closest("tr[data-bk]");
    if (row) openSheet(row.dataset.bk);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") return closeSheet();
    const row = event.target.closest?.("tr[data-bk]");
    if (row && event.target === row && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      openSheet(row.dataset.bk);
    }
  });

  PBM.onChange(() => {
    renderHead();
    renderAll();
  });

  PBM.branches.onChange(renderAll);

  PBM.mount("dashboard");
  renderHead();
  renderAll();
})();
