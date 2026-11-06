/* Giờ làm việc: the weekly schedules the shop works to.

   This is a redesign of the page that already exists in the app
   (client/features/availability), not a new one. It keeps that page's fields
   and rules: a schedule has a name, a timezone and one start and end per
   working day; at least one day must be on; an end must come after its start.
   What the server cannot do yet (turning a schedule off, different hours on one
   date) is shown as it is there: present, and marked as not ready.

   Since 4 November a schedule opens on the stage (shell.js), full screen or
   docked at the right, over the list. Its date overrides can be added in a
   form beside it (#<id>/override); the server does not keep them yet, so
   that part carries a "Later" tag, but the mockup keeps them with the
   schedule. */
(function () {
  "use strict";

  const { t, icon, toast } = PBM;

  PBM.addStrings({
    vi: {
      "doc.title": "Giờ làm việc | pleasebookme",
      "page.title": "Giờ làm việc",
      "page.lede": "Mỗi lịch làm việc là một bộ giờ theo tuần. Dịch vụ dùng một lịch để biết lúc nào nhận khách.",
      new: "Tạo lịch làm việc",
      "empty": "Chưa có lịch làm việc nào. Tạo một lịch để đặt giờ nhận khách.",
      "col.name": "Lịch làm việc",
      "col.week": "Trong tuần",
      "col.hours": "Giờ",
      "every": "Hằng ngày",
      "none": "Chưa đặt giờ",
      "off": "Nghỉ",
      "week.label": ({ name, lines }) => `Giờ trong tuần của ${name}: ${lines}`,
      "soon.title": "Sắp có",
      "on.soon": "Chưa bật hay tắt riêng từng lịch làm việc được.",
      "on.label": ({ name }) => `Bật lịch ${name}`,
      "del": ({ name }) => `Xoá ${name}`,
      "del.sure": "Xoá lịch này",
      "del.cancel": "Giữ lại",
      "del.done": ({ name }) => `Đã xoá ${name}`,
      back: "Quay lại Giờ làm việc",
      "form.new": "Lịch làm việc mới",
      "form.edit": "Sửa lịch làm việc",
      cancel: "Huỷ",
      "save.new": "Lưu lịch làm việc",
      "save.edit": "Lưu thay đổi",
      "saved": ({ name }) => `Đã lưu ${name}`,
      "basic": "Thông tin cơ bản",
      "f.name": "Tên",
      "f.name.ph": "Giờ mở cửa",
      "f.name.error": "Hãy đặt tên cho lịch làm việc.",
      "f.zone": "Múi giờ",
      "weekly": "Giờ theo tuần",
      "day.start": ({ day }) => `${day}, giờ bắt đầu`,
      "day.end": ({ day }) => `${day}, giờ kết thúc`,
      "day.on": ({ day }) => `Làm việc ${day}`,
      "day.error": "Giờ kết thúc phải sau giờ bắt đầu.",
      "days.error": "Bật ít nhất một ngày trước khi lưu.",
      "pic.title": "Cả tuần",
      "pic.total": ({ h, d }) => `${h} giờ mỗi tuần, ${d} ngày làm việc.`,
      "pic.none": "Chưa có ngày làm việc nào.",
      "adv.title": "Quy định đặt lịch",
      "adv.text": "Thời gian báo trước và hạn đặt trước không nằm ở đây. Mỗi dịch vụ tự đặt trong phần Quy định của nó.",
      "adv.link": "Mở Dịch vụ",
      "over.title": "Giờ riêng cho một ngày",
      "over.text": "Những ngày giờ làm khác với lịch tuần, như ngày lễ. Máy chủ chưa lưu được, nên phần này để cho bản sau.",
      soon: "Sắp có",
      later: "Bản sau",
      "over.add": "Thêm ngày riêng",
      "over.none": "Chưa có ngày riêng nào.",
      "over.closed": "Nghỉ cả ngày",
      "over.remove": ({ when }) => `Bỏ ngày riêng ${when}`,
      "kind.new": "Lịch làm việc mới",
      "kind.edit": "Lịch làm việc",
      close: "Đóng",
      "ov.kind": "Ngày riêng",
      "ov.title": "Ngày riêng mới",
      "ov.lede": "Những ngày tiệm nghỉ hoặc làm giờ khác với lịch tuần.",
      "ov.from": "Từ ngày",
      "ov.to": "Đến ngày",
      "ov.closed": "Nghỉ cả ngày",
      "ov.start": "Bắt đầu",
      "ov.end": "Kết thúc",
      "ov.reason": "Lý do",
      "ov.reason.ph": "Ví dụ: Quốc khánh",
      "ov.error": "Ngày kết thúc phải từ ngày bắt đầu trở đi, và giờ kết thúc phải sau giờ bắt đầu.",
      "ov.save": "Thêm ngày riêng",
      note: "Dữ liệu mẫu. Đây là bản thiết kế, chưa nối với hệ thống.",
    },
    en: {
      "doc.title": "Availability | pleasebookme",
      "page.title": "Availability",
      "page.lede": "A schedule is one set of weekly hours. A service uses a schedule to know when it can take customers.",
      new: "New schedule",
      "empty": "No schedules yet. Create one to set the hours you take customers.",
      "col.name": "Schedule",
      "col.week": "Weekly hours",
      "col.hours": "Hours",
      "every": "Every day",
      "none": "No hours set",
      "off": "Closed",
      "week.label": ({ name, lines }) => `Weekly hours of ${name}: ${lines}`,
      "soon.title": "Coming soon",
      "on.soon": "Schedules cannot be switched on or off one by one yet.",
      "on.label": ({ name }) => `Use ${name}`,
      "del": ({ name }) => `Delete ${name}`,
      "del.sure": "Delete this schedule",
      "del.cancel": "Nevermind",
      "del.done": ({ name }) => `Deleted ${name}`,
      back: "Back to Availability",
      "form.new": "New schedule",
      "form.edit": "Edit schedule",
      cancel: "Cancel",
      "save.new": "Save schedule",
      "save.edit": "Save changes",
      "saved": ({ name }) => `Saved ${name}`,
      "basic": "Basic details",
      "f.name": "Name",
      "f.name.ph": "Opening hours",
      "f.name.error": "Give the schedule a name.",
      "f.zone": "Timezone",
      "weekly": "Weekly hours",
      "day.start": ({ day }) => `${day}, start time`,
      "day.end": ({ day }) => `${day}, end time`,
      "day.on": ({ day }) => `Work on ${day}`,
      "day.error": "The end time must be after the start time.",
      "days.error": "Turn on at least one day before saving.",
      "pic.title": "The whole week",
      "pic.total": ({ h, d }) => `${h} hours a week over ${d} working ${d === 1 ? "day" : "days"}.`,
      "pic.none": "No working days yet.",
      "adv.title": "Limits",
      "adv.text": "Minimum notice and how far ahead customers can book are not set here. Each service sets them, in its Policy.",
      "adv.link": "Open Services",
      "over.title": "Date overrides",
      "over.text": "Dates when your hours differ from the week, such as a public holiday. The server cannot keep them yet, so this part is for a later version.",
      soon: "Coming soon",
      later: "Later",
      "over.add": "Add a date override",
      "over.none": "No date overrides yet.",
      "over.closed": "Closed all day",
      "over.remove": ({ when }) => `Remove the override on ${when}`,
      "kind.new": "New schedule",
      "kind.edit": "Schedule",
      close: "Close",
      "ov.kind": "Date override",
      "ov.title": "New date override",
      "ov.lede": "Days the shop is closed, or works other hours than its week.",
      "ov.from": "From",
      "ov.to": "To",
      "ov.closed": "Closed all day",
      "ov.start": "Start",
      "ov.end": "End",
      "ov.reason": "Reason",
      "ov.reason.ph": "For example: National Day",
      "ov.error": "The last day must not come before the first, and the end must come after the start.",
      "ov.save": "Add override",
      note: "Sample data. This is a design mockup, not connected to the system.",
    },
  });

  const { SCHEDULES } = PBM_SAMPLE;

  const WEEK = [1, 2, 3, 4, 5, 6, 0]; // Monday first, as the form lists them
  const DAY_MINUTES = 24 * 60;
  const STEP = 5; // minutes between the times on offer
  const FALLBACK_ZONES = ["Asia/Saigon", "Australia/Sydney", "UTC", "America/New_York", "America/Los_Angeles", "Europe/London"];

  const $ = (id) => document.getElementById(id);
  const esc = (text) => String(text).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  const minutesOf = (clock) => Number(clock.slice(0, 2)) * 60 + Number(clock.slice(3, 5));
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  // 2026-10-12 is a Monday, so adding the day's place in the week gives its name.
  const dayName = (value, width) =>
    cap(new Intl.DateTimeFormat(PBM.locale, { weekday: width }).format(new Date(2026, 9, 12 + WEEK.indexOf(value))));

  function zones() {
    try {
      const list = Intl.supportedValuesOf?.("timeZone");
      return list && list.length ? list : FALLBACK_ZONES;
    } catch {
      return FALLBACK_ZONES;
    }
  }

  // "Asia/Saigon (GMT+7)": the name the server stores, and what it means on a clock.
  function zoneLabel(zone) {
    try {
      const part = new Intl.DateTimeFormat("en-GB", { timeZone: zone, timeZoneName: "shortOffset" })
        .formatToParts(new Date())
        .find((p) => p.type === "timeZoneName");
      return part ? `${zone} (${part.value})` : zone;
    } catch {
      return zone;
    }
  }

  const TIME_OPTIONS = Array.from({ length: DAY_MINUTES / STEP }, (_, i) => {
    const m = i * STEP;
    const clock = String(Math.floor(m / 60)).padStart(2, "0") + ":" + String(m % 60).padStart(2, "0");
    return `<option value="${clock}">${clock}</option>`;
  }).join("");

  // ---------- State ----------

  const state = {
    draft: null, // the schedule in the form, or null on the list
    sure: null, // the schedule whose delete button was pressed once
    tried: false, // save was pressed, so every error shows
    override: null, // the date override being added beside the schedule
  };

  const blank = () => {
    const detected = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return {
      id: "new",
      title: "",
      timezone: zones().includes(detected) ? detected : "Asia/Saigon",
      // Monday to Friday, 09:00 to 17:00: the same starting point as the app.
      days: WEEK.map((value) => ({ value, enabled: value !== 0 && value !== 6, start: "09:00", end: "17:00" })),
      overrides: [],
    };
  };
  const copy = (s) => ({ ...s, days: s.days.map((d) => ({ ...d })), overrides: (s.overrides || []).map((o) => ({ ...o })) });

  // ---------- Reading a week ----------

  // Days that share the same hours and follow one another read as one line:
  // "Th 3 – Th 6, 10:00 – 19:00".
  function hourLines(days) {
    const on = days.filter((d) => d.enabled);
    if (!on.length) return [t("none")];
    const groups = [];
    on.forEach((d) => {
      const key = d.start + "|" + d.end;
      const group = groups.find((g) => g.key === key);
      if (group) group.days.push(d.value);
      else groups.push({ key, start: d.start, end: d.end, days: [d.value] });
    });
    return groups.map((g) => {
      if (g.days.length === 7) return `${t("every")}, ${g.start} – ${g.end}`;
      const runs = [];
      g.days.forEach((value) => {
        const last = runs[runs.length - 1];
        if (last && WEEK.indexOf(value) === WEEK.indexOf(last[last.length - 1]) + 1) last.push(value);
        else runs.push([value]);
      });
      const names = runs
        .map((run) =>
          run.length === 1 ? dayName(run[0], "short") : `${dayName(run[0], "short")} – ${dayName(run[run.length - 1], "short")}`
        )
        .join(", ");
      return `${names}, ${g.start} – ${g.end}`;
    });
  }

  // The week as seven columns, midnight at the top: a filled stretch is working time.
  function weekPicture(schedule, big) {
    const lines = hourLines(schedule.days).join("; ");
    const cols = schedule.days
      .map((d) => {
        const bad = d.enabled && minutesOf(d.end) <= minutesOf(d.start);
        const bar =
          d.enabled && !bad
            ? `<i style="top:${(minutesOf(d.start) / DAY_MINUTES) * 100}%;height:${((minutesOf(d.end) - minutesOf(d.start)) / DAY_MINUTES) * 100}%"></i>`
            : "";
        return `<span class="week-day${d.enabled ? "" : " is-off"}"><span class="week-track">${bar}</span><b>${dayName(d.value, "narrow")}</b></span>`;
      })
      .join("");
    const scale = big
      ? `<span class="week-scale" aria-hidden="true">${[0, 6, 12, 18, 24]
          .map((h) => `<span class="num" style="top:${(h / 24) * 100}%">${String(h).padStart(2, "0")}:00</span>`)
          .join("")}</span>`
      : "";
    return `<span class="week${big ? " is-big" : ""}" role="img" aria-label="${esc(t("week.label", { name: schedule.title || t("form.new"), lines }))}">${scale}${cols}</span>`;
  }

  function totals(days) {
    const on = days.filter((d) => d.enabled && minutesOf(d.end) > minutesOf(d.start));
    const minutes = on.reduce((sum, d) => sum + minutesOf(d.end) - minutesOf(d.start), 0);
    return { h: Math.round((minutes / 60) * 10) / 10, d: on.length };
  }

  // ---------- The list ----------

  function rowHTML(s) {
    const sure = state.sure === s.id;
    return `<div class="row" data-id="${s.id}">
        <div class="cell-name">
          <a class="row-open" href="#${s.id}"><strong>${esc(s.title)}</strong></a>
          <span class="row-zone">${icon("globe")}${esc(zoneLabel(s.timezone))}</span>
        </div>
        ${weekPicture(s, false)}
        <div class="cell-hours num">${hourLines(s.days)
          .map((line) => `<span>${esc(line)}</span>`)
          .join("")}</div>
        <div class="cell-actions">
          ${
            sure
              ? `<button class="btn btn-quiet btn-small" type="button" data-keep>${t("del.cancel")}</button>
                 <button class="btn btn-small btn-danger is-sure" type="button" data-delete="${s.id}">${icon("trash")}${t("del.sure")}</button>`
              : `<span class="soon-wrap" tabindex="0" aria-describedby="soon-${s.id}">
                   <input class="switch" type="checkbox" checked disabled aria-label="${esc(t("on.label", { name: s.title }))}" />
                   <span class="soon-note" id="soon-${s.id}" role="tooltip"><strong>${t("soon.title")}</strong>${t("on.soon")}</span>
                 </span>
                 <button class="icon-btn btn-danger" type="button" data-delete="${s.id}" aria-label="${esc(t("del", { name: s.title }))}" title="${esc(t("del", { name: s.title }))}">${icon("trash")}</button>`
          }
        </div>
      </div>`;
  }

  function renderList() {
    document.title = t("doc.title");
    $("view").innerHTML = `
      <header class="head">
        <h1>${t("page.title")}</h1>
        <a class="btn btn-primary" href="#new">${icon("plus")}${t("new")}</a>
        <p>${t("page.lede")}</p>
      </header>
      ${
        SCHEDULES.length
          ? `<section class="panel list" aria-label="${t("page.title")}">
              <div class="row row-head" aria-hidden="true">
                <span>${t("col.name")}</span><span>${t("col.week")}</span><span>${t("col.hours")}</span><span></span>
              </div>
              ${SCHEDULES.map(rowHTML).join("")}
            </section>`
          : `<section class="empty"><p>${t("empty")}</p><a class="btn btn-primary" href="#new">${icon("plus")}${t("new")}</a></section>`
      }
      <p class="note">${t("note")}</p>`;
  }

  // ---------- The form ----------

  const dayError = (d) => d.enabled && minutesOf(d.end) <= minutesOf(d.start);

  function dayHTML(d) {
    const name = dayName(d.value, "long");
    const bad = dayError(d);
    return `<div class="day${d.enabled ? "" : " is-off"}" data-day="${d.value}">
        <span class="day-name">${name}</span>
        <div class="day-hours">
          <select class="input time" data-time="start" aria-label="${esc(t("day.start", { day: name }))}">${TIME_OPTIONS}</select>
          <span aria-hidden="true">–</span>
          <select class="input time" data-time="end" aria-label="${esc(t("day.end", { day: name }))}" ${bad ? 'aria-invalid="true"' : ""}>${TIME_OPTIONS}</select>
          <span class="error" ${bad ? "" : "hidden"}>${t("day.error")}</span>
        </div>
        <span class="day-off">${t("off")}</span>
        <input class="switch" type="checkbox" data-on aria-label="${esc(t("day.on", { day: name }))}" ${d.enabled ? "checked" : ""} />
      </div>`;
  }

  function pictureHTML(d) {
    const total = totals(d.days);
    return `${weekPicture(d, true)}<p class="pic-total">${total.d ? t("pic.total", total) : t("pic.none")}</p>`;
  }

  function renderForm() {
    const d = state.draft;
    const fresh = d.id === "new";
    const noName = state.tried && !d.title.trim();
    const noDays = state.tried && !d.days.some((day) => day.enabled);
    const zoneList = zones().includes(d.timezone) ? zones() : [d.timezone, ...zones()];
    document.title = `${t(fresh ? "form.new" : "form.edit")} | pleasebookme`;
    const scroll = pane.querySelector(".peek-body")?.scrollTop || 0;

    pane.innerHTML = `
      <header class="sheet-head peek-head">
        <div>
          <p class="peek-kind">${icon(fresh ? "plus" : "clock")}${t(fresh ? "kind.new" : "kind.edit")}</p>
          <h2 id="av-title">${t(fresh ? "form.new" : "form.edit")}</h2>
        </div>
        <div class="pane-tools">
          ${PBM.stage.toggle()}
          <a class="icon-btn" href="#" aria-label="${t("close")}" title="${t("close")}">${icon("x")}</a>
        </div>
      </header>
      <div class="peek-body av-body">
      <form class="form" id="form" novalidate>
        <div class="form-main">
          <p class="alert" id="days-error" role="alert" ${noDays ? "" : "hidden"}>${t("days.error")}</p>
          <section class="panel card" aria-labelledby="basic-title">
            <h2 id="basic-title">${t("basic")}</h2>
            <div class="field">
              <label for="f-name">${t("f.name")}</label>
              <input class="input" id="f-name" name="title" maxlength="255" value="${esc(d.title)}" placeholder="${t("f.name.ph")}" autocomplete="off" ${
                noName ? 'aria-invalid="true" aria-describedby="f-name-error"' : ""
              } />
              <span class="error" id="f-name-error" ${noName ? "" : "hidden"}>${t("f.name.error")}</span>
            </div>
            <div class="field">
              <label for="f-zone">${t("f.zone")}</label>
              <select class="input" id="f-zone" name="timezone">${zoneList
                .map((zone) => `<option value="${esc(zone)}" ${zone === d.timezone ? "selected" : ""}>${esc(zone)}</option>`)
                .join("")}</select>
            </div>
          </section>
          <section class="panel card" aria-labelledby="weekly-title">
            <h2 id="weekly-title">${t("weekly")}</h2>
            <div class="days">${d.days.map(dayHTML).join("")}</div>
          </section>
        </div>
        <aside class="form-side">
          <section class="panel card" aria-labelledby="pic-title">
            <h2 id="pic-title">${t("pic.title")}</h2>
            <div id="picture">${pictureHTML(d)}</div>
          </section>
          <section class="reserved">
            <h2>${t("adv.title")}</h2>
            <p>${t("adv.text")}</p>
            <a class="link-btn" href="/dashboard/services">${t("adv.link")}</a>
          </section>
          <section class="reserved" id="overrides">${overridesHTML(d)}</section>
        </aside>
      </form>
      <p class="note">${t("note")}</p>
      </div>
      <footer class="sheet-actions peek-actions">
        <span class="pane-spacer"></span>
        <a class="btn btn-quiet" href="#">${t("cancel")}</a>
        <button class="btn btn-primary" type="submit" form="form">${t(fresh ? "save.new" : "save.edit")}</button>
      </footer>`;
    pane.querySelector(".peek-body").scrollTop = scroll;

    // One list of times serves every select; each then takes its own value.
    d.days.forEach((day) => {
      const row = pane.querySelector(`[data-day="${day.value}"]`);
      row.querySelector('[data-time="start"]').value = day.start;
      row.querySelector('[data-time="end"]').value = day.end;
    });
  }

  // Redraws what one change can touch, and leaves the control in use alone.
  function refreshDay(row, day) {
    const bad = dayError(day);
    row.classList.toggle("is-off", !day.enabled);
    row.querySelector(".error").hidden = !bad;
    const end = row.querySelector('[data-time="end"]');
    if (bad) end.setAttribute("aria-invalid", "true");
    else end.removeAttribute("aria-invalid");
    $("picture").innerHTML = pictureHTML(state.draft);
    if (state.draft.days.some((d) => d.enabled)) $("days-error").hidden = true;
  }

  function save() {
    const d = state.draft;
    state.tried = true;
    const noName = !d.title.trim();
    const noDays = !d.days.some((day) => day.enabled);
    const badDay = d.days.find(dayError);
    if (noName || noDays || badDay) {
      renderForm();
      // Go to the first thing that needs fixing.
      if (noDays) $("days-error").scrollIntoView({ block: "center" });
      const first = noName
        ? $("f-name")
        : noDays
          ? pane.querySelector("[data-on]")
          : pane.querySelector(`[data-day="${badDay.value}"] [data-time="end"]`);
      return first.focus();
    }
    const saved = { ...copy(d), title: d.title.trim(), id: d.id === "new" ? PBM.store.newNumber(SCHEDULES.map((s) => s.id)) : d.id };
    const at = SCHEDULES.findIndex((s) => s.id === saved.id);
    if (at >= 0) SCHEDULES[at] = saved;
    else SCHEDULES.push(saved);
    PBM.store.save();
    location.hash = "";
    toast(t("saved", { name: saved.title }));
  }

  // ---------- Which view ----------

  // #new or #<id> opens a schedule over the list; "/override" after either
  // slides in the form for a date override beside it.
  function route() {
    const [asked, side] = decodeURIComponent(location.hash.slice(1)).split("/");
    const found = SCHEDULES.find((s) => String(s.id) === asked);
    const id = asked === "new" ? "new" : found ? found.id : null;
    if (id === null) {
      closeOverride(true);
      state.draft = null;
      pane.hidden = true;
      pane.innerHTML = "";
      PBM.stage.sync();
      return renderList();
    }
    if (!state.draft || state.draft.id !== id) {
      state.tried = false;
      state.sure = null;
      state.draft = id === "new" ? blank() : copy(found);
      renderForm();
      pane.hidden = false;
      PBM.stage.sync();
      $("f-name").focus();
    }
    if (side === "override") openOverride();
    else closeOverride();
  }

  function render() {
    renderList();
    if (state.draft) renderForm();
    if (state.override) renderOverride();
  }

  // ---------- Date overrides, and the form beside the schedule ----------

  const pane = $("av");
  const sidePane = $("av-side");
  const base = () => "#" + encodeURIComponent(state.draft.id);
  const fmtDate = (iso) =>
    new Date(iso + "T00:00").toLocaleDateString(PBM.locale, { day: "numeric", month: "short", year: "numeric" });
  const isoToday = () => {
    const d = new Date(PBM_SAMPLE.TODAY);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  };
  const whenOf = (o) => (o.from === o.to ? fmtDate(o.from) : `${fmtDate(o.from)} – ${fmtDate(o.to)}`);

  function overridesHTML(d) {
    const list = d.overrides || [];
    return `
      <h2>${t("over.title")}<span class="tag-later">${t("later")}</span></h2>
      <p>${t("over.text")}</p>
      ${
        list.length
          ? `<ul class="ov-list">${list
              .map(
                (o, i) => `<li>
              <span><strong>${esc(whenOf(o))}</strong><small>${o.closed ? t("over.closed") : `${o.start} – ${o.end}`}${o.reason ? ` · ${esc(o.reason)}` : ""}</small></span>
              <button class="icon-btn" type="button" data-ov-remove="${i}" aria-label="${esc(t("over.remove", { when: whenOf(o) }))}" title="${esc(t("over.remove", { when: whenOf(o) }))}">${icon("x")}</button>
            </li>`
              )
              .join("")}</ul>`
          : `<p class="ov-none">${t("over.none")}</p>`
      }
      <a class="link-btn" href="${base()}/override">${t("over.add")}</a>`;
  }

  function renderOverride() {
    const o = state.override;
    sidePane.innerHTML = `
      <header class="sheet-head peek-head">
        <div>
          <p class="peek-kind">${icon("plus")}${t("ov.kind")}</p>
          <h2 id="ov-title">${t("ov.title")}</h2>
        </div>
        <div class="pane-tools"><a class="icon-btn" href="${base()}" aria-label="${t("close")}" title="${t("close")}">${icon("x")}</a></div>
      </header>
      <form class="peek-body" id="ov-form" novalidate>
        <section class="peek-sec">
          <p class="peek-lede">${t("ov.lede")}</p>
          <div class="field-pair">
            <div class="field"><label for="ov-from">${t("ov.from")}</label><input class="input" id="ov-from" name="from" type="date" value="${o.from}" /></div>
            <div class="field"><label for="ov-to">${t("ov.to")}</label><input class="input" id="ov-to" name="to" type="date" value="${o.to}" /></div>
          </div>
          <label class="switch-line"><span><strong>${t("ov.closed")}</strong></span><input class="switch" type="checkbox" role="switch" name="closed" ${o.closed ? "checked" : ""} /></label>
          <div class="field-pair" ${o.closed ? "hidden" : ""} id="ov-hours">
            <div class="field"><label for="ov-start">${t("ov.start")}</label><select class="input time" id="ov-start" name="start">${TIME_OPTIONS}</select></div>
            <div class="field"><label for="ov-end">${t("ov.end")}</label><select class="input time" id="ov-end" name="end">${TIME_OPTIONS}</select></div>
          </div>
          <div class="field">
            <label for="ov-reason">${t("ov.reason")}</label>
            <input class="input" id="ov-reason" name="reason" value="${esc(o.reason)}" placeholder="${t("ov.reason.ph")}" autocomplete="off" />
          </div>
          <p class="error" id="ov-error" hidden>${t("ov.error")}</p>
        </section>
      </form>
      <footer class="sheet-actions peek-actions">
        <span class="pane-spacer"></span>
        <a class="btn btn-quiet" href="${base()}">${t("cancel")}</a>
        <button class="btn btn-primary" type="submit" form="ov-form">${t("ov.save")}</button>
      </footer>`;
    $("ov-start").value = o.start;
    $("ov-end").value = o.end;
  }

  function openOverride() {
    if (!state.override) {
      state.override = { from: isoToday(), to: isoToday(), closed: true, start: "09:00", end: "12:00", reason: "" };
      renderOverride();
    }
    PBM.stage.split(sidePane, true);
    $("ov-from").focus();
  }

  function closeOverride(atOnce) {
    if (!state.override) return;
    state.override = null;
    if (!atOnce) return PBM.stage.split(sidePane, false);
    sidePane.hidden = true;
    sidePane.classList.remove("is-leaving");
    $("pane-stage").classList.remove("is-split");
  }

  function saveOverride() {
    const data = new FormData($("ov-form"));
    const o = {
      from: data.get("from"),
      to: data.get("to"),
      closed: data.has("closed"),
      start: data.get("start"),
      end: data.get("end"),
      reason: data.get("reason").trim(),
    };
    if (!o.from || !o.to || o.to < o.from || (!o.closed && minutesOf(o.end) <= minutesOf(o.start))) {
      $("ov-error").hidden = false;
      return $("ov-to").focus();
    }
    // Kept with the schedule's draft; saved with the schedule.
    state.draft.overrides = [...state.draft.overrides, o].sort((a, b) => a.from.localeCompare(b.from));
    $("overrides").innerHTML = overridesHTML(state.draft);
    location.hash = base().slice(1); // the side form slides out
  }

  sidePane.addEventListener("change", (event) => {
    if (event.target.name === "closed") $("ov-hours").hidden = event.target.checked;
  });

  sidePane.addEventListener("submit", (event) => {
    event.preventDefault();
    saveOverride();
  });

  // Escape closes the side form first, then the schedule.
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || !state.draft || event.target.closest?.("select")) return;
    location.hash = state.override ? base().slice(1) : "";
  });

  // ---------- Events ----------

  const view = $("view");
  const listen = (type, fn) => [view, pane].forEach((el) => el.addEventListener(type, fn));

  pane.addEventListener("click", (event) => {
    const gone = event.target.closest("[data-ov-remove]");
    if (!gone) return;
    state.draft.overrides.splice(Number(gone.dataset.ovRemove), 1);
    $("overrides").innerHTML = overridesHTML(state.draft);
    $("overrides").querySelector("a")?.focus();
  });

  view.addEventListener("click", (event) => {
    if (event.target.closest("[data-keep]")) {
      state.sure = null;
      return renderList();
    }
    const del = event.target.closest("[data-delete]");
    if (!del) return;
    const id = Number(del.dataset.delete);
    if (state.sure !== id) {
      state.sure = id;
      renderList();
      return view.querySelector(`[data-id="${id}"] [data-delete]`).focus();
    }
    const at = SCHEDULES.findIndex((s) => s.id === id);
    const [gone] = SCHEDULES.splice(at, 1);
    PBM.store.save();
    state.sure = null;
    renderList();
    toast(t("del.done", { name: gone.title }));
  });

  listen("input", (event) => {
    const d = state.draft;
    if (!d) return;
    if (event.target.id === "f-name") {
      d.title = event.target.value;
      if (state.tried && d.title.trim()) {
        event.target.removeAttribute("aria-invalid");
        $("f-name-error").hidden = true;
      }
      $("picture").innerHTML = pictureHTML(d);
    }
  });

  listen("change", (event) => {
    const d = state.draft;
    if (!d) return;
    if (event.target.id === "f-zone") d.timezone = event.target.value;
    const row = event.target.closest("[data-day]");
    if (!row) return;
    const day = d.days.find((item) => item.value === Number(row.dataset.day));
    if ("on" in event.target.dataset) day.enabled = event.target.checked;
    if (event.target.dataset.time) day[event.target.dataset.time] = event.target.value;
    refreshDay(row, day);
  });

  listen("submit", (event) => {
    event.preventDefault();
    if (event.target.id === "form") save();
  });

  addEventListener("hashchange", route);
  PBM.onChange(render);

  PBM.mount("availability");
  renderList();
  route();
})();
