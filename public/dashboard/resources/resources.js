/* Tài nguyên: everything a booking can take up or happen at. Branches, staff
   and places are all resources of different types, and a shop can add types.

   This is a redesign of the page that already exists in the app
   (client/features/resources), not a new one: the same three counts, the same
   filters, the same table, and the same two forms (a resource, and a type of
   resource). As there, a resource can be added but not yet edited or removed.

   Two things here are not in the app yet. Both come from how the shop is meant
   to work, where resources connect to each other without needing each other:
     - `code`, the colour a resource wears on the calendar;
     - `branch`, a link from one resource to another (a person or a chair to
       the branch it is at). */
(function () {
  "use strict";

  const { t, icon, toast } = PBM;

  PBM.addStrings({
    vi: {
      "doc.title": "Tài nguyên | pleasebookme",
      "page.title": "Tài nguyên",
      "page.lede": "Chi nhánh, nhân viên, chỗ ngồi và những thứ khác mà dịch vụ của tiệm cần đến.",
      new: "Thêm tài nguyên",
      "sum.total": ({ n }) => `${n} tài nguyên:`,
      "sum.ACTIVE": ({ n }) => `${n} đang hoạt động`,
      "sum.MAINTENANCE": ({ n }) => `${n} bảo trì`,
      "sum.INACTIVE": ({ n }) => `${n} tạm nghỉ`,
      "sum.RETIRED": ({ n }) => `${n} ngừng dùng`,
      "sum.label": "Số tài nguyên theo trạng thái. Bấm để lọc.",
      "search.ph": "Tìm theo tên hoặc mã ngắn",
      "search.label": "Tìm tài nguyên theo tên hoặc mã ngắn",
      "filter.type": "Lọc theo loại",
      "filter.type.all": "Mọi loại",
      "filter.status": "Lọc theo trạng thái",
      "filter.status.all": "Mọi trạng thái",
      "filter.clear": "Xoá bộ lọc",
      "col.resource": "Tài nguyên",
      "col.type": "Loại",
      "col.link": "Liên kết",
      "col.capacity": "Sức chứa",
      "col.status": "Trạng thái",
      "col.services": "Dịch vụ được gán",
      "st.ACTIVE": "Đang hoạt động",
      "st.INACTIVE": "Tạm nghỉ",
      "st.MAINTENANCE": "Bảo trì",
      "st.RETIRED": "Ngừng dùng",
      "svc.all": "Tất cả dịch vụ",
      "svc.none": "Chưa gán",
      "link.count": ({ n }) => `${n} tài nguyên`,
      "empty.none": "Chưa có tài nguyên nào. Thêm một tài nguyên để gán cho dịch vụ.",
      "empty.filtered": "Không có tài nguyên nào khớp bộ lọc. Thử xoá bộ lọc.",
      "page.showing": ({ from, to, n }) => `Hiển thị ${from} đến ${to} trong ${n} tài nguyên`,
      "page.prev": "Trước",
      "page.next": "Sau",
      "page.of": ({ p, n }) => `Trang ${p} / ${n}`,
      back: "Quay lại Tài nguyên",
      "form.title": "Thêm tài nguyên",
      "form.lede": "Thêm một thứ có thể gán cho một hoặc nhiều dịch vụ.",
      cancel: "Huỷ",
      "basic": "Thông tin cơ bản",
      "f.name": "Tên tài nguyên",
      "f.name.ph": "Ghế 4",
      "f.name.error": "Hãy nhập tên tài nguyên.",
      "f.slug": "Mã ngắn (slug)",
      "f.slug.ph": "ghe-4",
      "f.slug.hint": "Tạo từ tên, sửa được trước khi lưu.",
      "f.slug.error.empty": "Hãy nhập mã ngắn.",
      "f.slug.error.shape": "Chỉ dùng chữ thường không dấu, số và một dấu gạch nối giữa các từ.",
      "f.slug.error.taken": "Đã có tài nguyên dùng mã ngắn này.",
      "f.desc": "Mô tả",
      "f.desc.ph": "Tài nguyên này dùng để làm gì",
      "f.type": "Loại tài nguyên",
      "f.type.pick": "Chọn một loại",
      "f.type.error": "Chọn một loại tài nguyên.",
      "f.type.new": "Thêm loại mới",
      "specs": "Thông số",
      "f.capacity": "Sức chứa",
      "f.capacity.ph": "Không bắt buộc",
      "f.capacity.error": "Sức chứa phải là số nguyên.",
      "f.status": "Trạng thái",
      "links": "Trên lịch và liên kết",
      "f.code": "Màu trên lịch",
      "f.code.n": ({ n }) => `Màu ${n}`,
      "f.link": "Liên kết với",
      "f.link.none": "Không liên kết",
      "f.link.hint": "Không bắt buộc. Ví dụ một chiếc ghế hoặc một người thợ ở một chi nhánh.",
      "added": ({ name }) => `Đã thêm ${name}`,
      "notype.title": "Tạo loại tài nguyên trước",
      "notype.text": "Mỗi tài nguyên cần một loại, và tiệm chưa có loại nào. Thêm một loại như Chi nhánh, Nhân viên hoặc Ghế trước khi thêm tài nguyên.",
      "type.title": "Thêm loại tài nguyên",
      "type.lede": "Đặt một nhóm dùng lại được trước khi thêm tài nguyên thuộc nhóm đó.",
      "type.name": "Tên",
      "type.name.ph": "Máy uốn",
      "type.name.error": "Hãy nhập tên loại.",
      "type.desc": "Mô tả",
      "type.desc.ph": "Không bắt buộc",
      "type.icon": "Biểu tượng",
      "type.save": "Thêm loại",
      "type.added": ({ name }) => `Đã thêm loại ${name}`,
      note: "Dữ liệu mẫu. Đây là bản thiết kế, chưa nối với hệ thống.",
    },
    en: {
      "doc.title": "Resources | pleasebookme",
      "page.title": "Resources",
      "page.lede": "The branches, staff, seats and other things your services need.",
      new: "Add resource",
      "sum.total": ({ n }) => `${n} ${n === 1 ? "resource" : "resources"}:`,
      "sum.ACTIVE": ({ n }) => `${n} active`,
      "sum.MAINTENANCE": ({ n }) => `${n} in maintenance`,
      "sum.INACTIVE": ({ n }) => `${n} inactive`,
      "sum.RETIRED": ({ n }) => `${n} retired`,
      "sum.label": "Resources by status. Click one to filter.",
      "search.ph": "Search by name or slug",
      "search.label": "Search resources by name or slug",
      "filter.type": "Filter by type",
      "filter.type.all": "All types",
      "filter.status": "Filter by status",
      "filter.status.all": "All statuses",
      "filter.clear": "Clear filters",
      "col.resource": "Resource",
      "col.type": "Type",
      "col.link": "Linked to",
      "col.capacity": "Capacity",
      "col.status": "Status",
      "col.services": "Assigned services",
      "st.ACTIVE": "Active",
      "st.INACTIVE": "Inactive",
      "st.MAINTENANCE": "Maintenance",
      "st.RETIRED": "Retired",
      "svc.all": "All services",
      "svc.none": "None",
      "link.count": ({ n }) => `${n} ${n === 1 ? "resource" : "resources"}`,
      "empty.none": "No resources yet. Add one to start assigning it to services.",
      "empty.filtered": "No resources match these filters. Try clearing them.",
      "page.showing": ({ from, to, n }) => `Showing ${from} to ${to} of ${n} ${n === 1 ? "resource" : "resources"}`,
      "page.prev": "Previous",
      "page.next": "Next",
      "page.of": ({ p, n }) => `Page ${p} of ${n}`,
      back: "Back to Resources",
      "form.title": "Add resource",
      "form.lede": "Add something that can be assigned to one or more services.",
      cancel: "Cancel",
      "basic": "Basic information",
      "f.name": "Resource name",
      "f.name.ph": "Chair 4",
      "f.name.error": "Enter the resource's name.",
      "f.slug": "Slug",
      "f.slug.ph": "chair-4",
      "f.slug.hint": "Made from the name. You can change it before saving.",
      "f.slug.error.empty": "Enter a slug.",
      "f.slug.error.shape": "Use lowercase letters, numbers and single hyphens.",
      "f.slug.error.taken": "A resource with this slug already exists.",
      "f.desc": "Description",
      "f.desc.ph": "What this resource is used for",
      "f.type": "Resource type",
      "f.type.pick": "Choose a type",
      "f.type.error": "Choose a resource type.",
      "f.type.new": "Add a new type",
      "specs": "Specifications",
      "f.capacity": "Capacity",
      "f.capacity.ph": "Optional",
      "f.capacity.error": "Capacity must be a whole number.",
      "f.status": "Status",
      "links": "On the calendar, and links",
      "f.code": "Color on the calendar",
      "f.code.n": ({ n }) => `Color ${n}`,
      "f.link": "Linked to",
      "f.link.none": "Not linked",
      "f.link.hint": "Optional. For example a chair or a barber at one branch.",
      "added": ({ name }) => `Added ${name}`,
      "notype.title": "Create a resource type first",
      "notype.text": "Every resource needs a type, and the shop does not have one yet. Add a type such as Branch, Staff or Chair before adding the resource.",
      "type.title": "Add resource type",
      "type.lede": "Define a reusable group before adding resources of that type.",
      "type.name": "Name",
      "type.name.ph": "Perm machine",
      "type.name.error": "Enter the type's name.",
      "type.desc": "Description",
      "type.desc.ph": "Optional",
      "type.icon": "Icon",
      "type.save": "Add type",
      "type.added": ({ name }) => `Added the type ${name}`,
      note: "Sample data. This is a design mockup, not connected to the system.",
    },
  });

  const { RESOURCES, RESOURCE_TYPES, SERVICES, SERVICE_ORDER } = PBM_SAMPLE;

  const STATUSES = ["ACTIVE", "INACTIVE", "MAINTENANCE", "RETIRED"];
  const STATE_CLASS = { ACTIVE: "is-active", INACTIVE: "is-inactive", MAINTENANCE: "is-maintenance", RETIRED: "is-retired" };
  const TYPE_ICONS = ["pin", "users", "seat", "box", "scissors", "clock", "tag"];
  const PAGE_SIZE = 20; // the app's page size
  const SLUG_SHAPE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

  const $ = (id) => document.getElementById(id);
  const esc = (text) => String(text).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  const plain = (text) =>
    text
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .toLowerCase();
  const slugOf = (name) =>
    plain(name.trim())
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  const typeOf = (id) => RESOURCE_TYPES.find((type) => type.id === id);
  const typeName = (type) => type[PBM.lang] || type.vi;
  // The word has its own span so a phone can show the dot alone (resources.css).
  const stateOf = (status) =>
    `<span class="state ${STATE_CLASS[status]}"><i aria-hidden="true"></i><span class="state-word">${t("st." + status)}</span></span>`;

  // ---------- State ----------

  const state = {
    view: "list", // "list", "new" or "new-type"
    q: "",
    type: "",
    status: "",
    page: 0,
    draft: null,
    slugEdited: false,
    errors: {},
  };
  let made = 0;

  const blankResource = () => ({
    name: "",
    slug: "",
    description: "",
    type: "",
    capacity: "",
    status: "ACTIVE",
    code: (RESOURCES.length % 8) + 1,
    branch: "",
  });
  const blankType = () => ({ name: "", description: "", icon: "box" });

  // ---------- The list ----------

  const filtering = () => Boolean(state.q || state.type || state.status);

  function matches() {
    const q = plain(state.q.trim());
    return RESOURCES.filter(
      (r) =>
        (!state.type || r.type === state.type) &&
        (!state.status || r.status === state.status) &&
        (!q || plain(r.name).includes(q) || r.slug.includes(q))
    );
  }

  // One line of counts under the title. Each status in it is a shortcut to the
  // status filter; pressing it again clears the filter.
  function summaryHTML() {
    const count = (status) => RESOURCES.filter((r) => r.status === status).length;
    const parts = STATUSES.filter(count).map(
      (status) =>
        `<button type="button" class="state ${STATE_CLASS[status]}" data-status="${status}" aria-pressed="${state.status === status}"><i aria-hidden="true"></i>${t(
          "sum." + status,
          { n: count(status) }
        )}</button>`
    );
    return `<p class="summary" id="summary" aria-label="${t("sum.label")}"><span>${t("sum.total", { n: RESOURCES.length })}</span>${parts.join("")}</p>`;
  }

  function servicesCell(r) {
    if (!r.does.length) return `<span class="dt-quiet">${t("svc.none")}</span>`;
    if (r.does.length === SERVICE_ORDER.length) return t("svc.all");
    return r.does.map((id) => SERVICES[id][PBM.lang]).join(", ");
  }

  // A link reads from either end: a chair names its branch, a branch counts what is at it.
  function linkCell(r) {
    const to = r.branch && RESOURCES.find((other) => other.id === r.branch);
    if (to) return `<span class="link-to"><i class="code-dot code-${to.code}"></i>${esc(to.name)}</span>`;
    const n = RESOURCES.filter((other) => other.branch === r.id).length;
    return n ? t("link.count", { n }) : `<span class="dt-quiet">–</span>`;
  }

  function rowHTML(r) {
    const type = typeOf(r.type);
    const typeHTML = `<span class="type">${icon(type.icon || "box")}${esc(typeName(type))}</span>`;
    const link = linkCell(r);
    // On a phone a row is three lines, and type, link and capacity share the
    // second. That line is a cell of its own that only a phone shows
    // (resources.css); empty parts are left out rather than shown as dashes.
    const meta = [
      typeHTML,
      link.includes("dt-quiet") ? "" : link,
      r.capacity != null ? `${t("col.capacity")} <span class="num">${r.capacity}</span>` : "",
    ]
      .filter(Boolean)
      .join('<span class="sep" aria-hidden="true">·</span>');
    return `<tr>
        <td class="c-state">${stateOf(r.status)}</td>
        <td class="c-name"><span class="dt-name"><i class="code-dot code-${r.code}"></i><span><strong>${esc(r.name)}</strong><small>${esc(r.slug)}</small></span></span></td>
        <td class="c-type">${typeHTML}</td>
        <td class="c-link">${link}</td>
        <td class="c-cap num">${r.capacity ?? `<span class="dt-quiet">–</span>`}</td>
        <td class="c-svc" data-label="${t("col.services")}">${servicesCell(r)}</td>
        <td class="c-meta">${meta}</td>
      </tr>`;
  }

  function tableHTML() {
    const found = matches();
    if (!found.length) {
      return `<section class="empty"><p>${t(filtering() ? "empty.filtered" : "empty.none")}</p>${
        filtering()
          ? `<button class="btn btn-quiet" type="button" data-clear>${icon("x")}${t("filter.clear")}</button>`
          : `<a class="btn btn-primary" href="#new">${icon("plus")}${t("new")}</a>`
      }</section>`;
    }
    const pages = Math.max(1, Math.ceil(found.length / PAGE_SIZE));
    state.page = Math.min(state.page, pages - 1);
    const from = state.page * PAGE_SIZE;
    const rows = found.slice(from, from + PAGE_SIZE);
    return `
      <section class="panel" aria-label="${t("page.title")}">
        <div class="dt-wrap">
          <table class="dt">
            <thead><tr>
              <th>${t("col.status")}</th><th>${t("col.resource")}</th><th>${t("col.type")}</th>
              <th>${t("col.link")}</th><th>${t("col.capacity")}</th><th>${t("col.services")}</th>
            </tr></thead>
            <tbody>${rows.map(rowHTML).join("")}</tbody>
          </table>
        </div>
      </section>
      <footer class="pager">
        <span>${t("page.showing", { from: from + 1, to: from + rows.length, n: found.length })}</span>
        <span class="pager-nav">
          <button class="btn btn-quiet btn-small" type="button" data-page="-1" ${state.page > 0 ? "" : "disabled"}>${icon("left")}${t("page.prev")}</button>
          <span class="num">${t("page.of", { p: state.page + 1, n: pages })}</span>
          <button class="btn btn-quiet btn-small" type="button" data-page="1" ${state.page + 1 < pages ? "" : "disabled"}>${t("page.next")}${icon("right")}</button>
        </span>
      </footer>`;
  }

  function renderList() {
    document.title = t("doc.title");
    $("view").innerHTML = `
      <header class="head">
        <h1>${t("page.title")}</h1>
        <a class="btn btn-primary" href="#new">${icon("plus")}${t("new")}</a>
        <p>${t("page.lede")}</p>
      </header>
      ${summaryHTML()}
      <form class="panel filters" id="filters" role="search">
        <label class="filter-search">
          ${icon("search")}
          <span class="visually-hidden">${t("search.label")}</span>
          <input class="input" type="search" id="q" value="${esc(state.q)}" placeholder="${t("search.ph")}" autocomplete="off" />
        </label>
        <select class="input" id="f-type" aria-label="${t("filter.type")}">
          <option value="">${t("filter.type.all")}</option>
          ${RESOURCE_TYPES.map((type) => `<option value="${type.id}" ${state.type === type.id ? "selected" : ""}>${esc(typeName(type))}</option>`).join("")}
        </select>
        <select class="input" id="f-status" aria-label="${t("filter.status")}">
          <option value="">${t("filter.status.all")}</option>
          ${STATUSES.map((status) => `<option value="${status}" ${state.status === status ? "selected" : ""}>${t("st." + status)}</option>`).join("")}
        </select>
        <button class="btn btn-quiet" type="button" data-clear id="clear" ${filtering() ? "" : "hidden"}>${icon("x")}${t("filter.clear")}</button>
      </form>
      <div id="results">${tableHTML()}</div>
      <p class="note">${t("note")}</p>`;
  }

  // Typing in the search box redraws the table only, so the box keeps its cursor.
  function refreshResults() {
    $("results").innerHTML = tableHTML();
    $("summary").outerHTML = summaryHTML();
    $("clear").hidden = !filtering();
  }

  // ---------- The form for a resource ----------

  const fieldError = (key, id) =>
    `<span class="error" id="${id}-error" ${state.errors[key] ? "" : "hidden"}>${state.errors[key] ? t(state.errors[key]) : ""}</span>`;
  const invalid = (key, id) => (state.errors[key] ? `aria-invalid="true" aria-describedby="${id}-error"` : "");

  function renderResourceForm() {
    const d = state.draft;
    document.title = `${t("form.title")} | pleasebookme`;

    if (!RESOURCE_TYPES.length) {
      $("view").innerHTML = `
        <header class="head">
          <a class="icon-btn back" href="#" aria-label="${t("back")}" title="${t("back")}">${icon("left")}</a>
          <h1>${t("form.title")}</h1>
          <p>${t("form.lede")}</p>
        </header>
        <section class="empty is-left"><h2>${t("notype.title")}</h2><p>${t("notype.text")}</p>
          <a class="btn btn-primary" href="#new-type">${icon("plus")}${t("type.title")}</a></section>`;
      return;
    }

    const linkable = RESOURCE_TYPES.map((type) => ({
      type,
      items: RESOURCES.filter((r) => r.type === type.id && r.status !== "RETIRED"),
    })).filter((group) => group.items.length);

    $("view").innerHTML = `
      <header class="head">
        <a class="icon-btn back" href="#" aria-label="${t("back")}" title="${t("back")}">${icon("left")}</a>
        <h1>${t("form.title")}</h1>
        <div class="head-actions">
          <a class="btn btn-quiet" href="#">${t("cancel")}</a>
          <button class="btn btn-primary" type="submit" form="form">${t("new")}</button>
        </div>
        <p>${t("form.lede")}</p>
      </header>
      <form class="form" id="form" data-form="resource" novalidate>
        <section class="panel card" aria-labelledby="basic-title">
          <h2 id="basic-title">${t("basic")}</h2>
          <div class="field">
            <label for="f-name">${t("f.name")}</label>
            <input class="input" id="f-name" data-key="name" maxlength="255" value="${esc(d.name)}" placeholder="${t("f.name.ph")}" autocomplete="off" ${invalid("name", "f-name")} />
            ${fieldError("name", "f-name")}
          </div>
          <div class="field">
            <label for="f-slug">${t("f.slug")}</label>
            <input class="input" id="f-slug" data-key="slug" maxlength="255" value="${esc(d.slug)}" placeholder="${t("f.slug.ph")}" autocomplete="off" spellcheck="false" ${invalid("slug", "f-slug")} />
            <small>${t("f.slug.hint")}</small>
            ${fieldError("slug", "f-slug")}
          </div>
          <div class="field">
            <label for="f-desc">${t("f.desc")}</label>
            <textarea class="input area" id="f-desc" data-key="description" rows="4" placeholder="${t("f.desc.ph")}">${esc(d.description)}</textarea>
          </div>
          <div class="field">
            <span class="label-row"><label for="f-rtype">${t("f.type")}</label><a class="link-btn" href="#new-type">${t("f.type.new")}</a></span>
            <select class="input" id="f-rtype" data-key="type" ${invalid("type", "f-rtype")}>
              <option value="">${t("f.type.pick")}</option>
              ${RESOURCE_TYPES.map((type) => `<option value="${type.id}" ${d.type === type.id ? "selected" : ""}>${esc(typeName(type))}</option>`).join("")}
            </select>
            ${fieldError("type", "f-rtype")}
          </div>
        </section>
        <section class="panel card" aria-labelledby="specs-title">
          <h2 id="specs-title">${t("specs")}</h2>
          <div class="field-pair">
            <div class="field">
              <label for="f-capacity">${t("f.capacity")}</label>
              <input class="input" id="f-capacity" data-key="capacity" inputmode="numeric" value="${esc(d.capacity)}" placeholder="${t("f.capacity.ph")}" ${invalid("capacity", "f-capacity")} />
              ${fieldError("capacity", "f-capacity")}
            </div>
            <div class="field">
              <label for="f-rstatus">${t("f.status")}</label>
              <select class="input" id="f-rstatus" data-key="status">
                ${STATUSES.map((status) => `<option value="${status}" ${d.status === status ? "selected" : ""}>${t("st." + status)}</option>`).join("")}
              </select>
            </div>
          </div>
        </section>
        <section class="panel card" aria-labelledby="links-title">
          <h2 id="links-title">${t("links")}</h2>
          <div class="field">
            <span class="label" id="f-code-label">${t("f.code")}</span>
            <div class="swatches" role="radiogroup" aria-labelledby="f-code-label">
              ${Array.from({ length: 8 }, (_, i) => i + 1)
                .map(
                  (n) =>
                    `<label class="swatch"><input type="radio" name="code" value="${n}" ${d.code === n ? "checked" : ""} /><i class="code-${n}" aria-hidden="true"></i><span class="visually-hidden">${t("f.code.n", { n })}</span></label>`
                )
                .join("")}
            </div>
          </div>
          <div class="field">
            <label for="f-link">${t("f.link")}</label>
            <select class="input" id="f-link" data-key="branch">
              <option value="">${t("f.link.none")}</option>
              ${linkable
                .map(
                  (group) =>
                    `<optgroup label="${esc(typeName(group.type))}">${group.items
                      .map((r) => `<option value="${r.id}" ${d.branch === r.id ? "selected" : ""}>${esc(r.name)}</option>`)
                      .join("")}</optgroup>`
                )
                .join("")}
            </select>
            <small>${t("f.link.hint")}</small>
          </div>
        </section>
      </form>
      <p class="note">${t("note")}</p>`;
  }

  function checkResource(d) {
    const errors = {};
    if (!d.name.trim()) errors.name = "f.name.error";
    if (!d.slug.trim()) errors.slug = "f.slug.error.empty";
    else if (!SLUG_SHAPE.test(d.slug.trim())) errors.slug = "f.slug.error.shape";
    else if (RESOURCES.some((r) => r.slug === d.slug.trim())) errors.slug = "f.slug.error.taken";
    if (!d.type) errors.type = "f.type.error";
    if (String(d.capacity).trim() && !Number.isInteger(Number(d.capacity))) errors.capacity = "f.capacity.error";
    return errors;
  }

  function saveResource() {
    const d = state.draft;
    state.errors = checkResource(d);
    const firstBad = ["name", "slug", "type", "capacity"].find((key) => state.errors[key]);
    if (firstBad) {
      renderResourceForm();
      return $({ name: "f-name", slug: "f-slug", type: "f-rtype", capacity: "f-capacity" }[firstBad]).focus();
    }
    RESOURCES.push({
      id: "r" + ++made,
      type: d.type,
      name: d.name.trim(),
      slug: d.slug.trim(),
      description: d.description.trim(),
      capacity: String(d.capacity).trim() ? Number(d.capacity) : null,
      status: d.status,
      code: d.code,
      branch: d.branch || undefined,
      does: [],
    });
    state.draft = null;
    location.hash = "";
    toast(t("added", { name: d.name.trim() }));
  }

  // ---------- The form for a type of resource ----------

  function renderTypeForm() {
    const d = state.typeDraft;
    document.title = `${t("type.title")} | pleasebookme`;
    $("view").innerHTML = `
      <header class="head">
        <a class="icon-btn back" href="#new" aria-label="${t("form.title")}" title="${t("form.title")}">${icon("left")}</a>
        <h1>${t("type.title")}</h1>
        <div class="head-actions">
          <a class="btn btn-quiet" href="#new">${t("cancel")}</a>
          <button class="btn btn-primary" type="submit" form="form">${t("type.save")}</button>
        </div>
        <p>${t("type.lede")}</p>
      </header>
      <form class="form" id="form" data-form="type" novalidate>
        <section class="panel card">
          <div class="field">
            <label for="t-name">${t("type.name")}</label>
            <input class="input" id="t-name" data-key="name" maxlength="100" value="${esc(d.name)}" placeholder="${t("type.name.ph")}" autocomplete="off" ${invalid("typeName", "t-name")} />
            ${fieldError("typeName", "t-name")}
          </div>
          <div class="field">
            <label for="t-desc">${t("type.desc")}</label>
            <textarea class="input area" id="t-desc" data-key="description" rows="4" placeholder="${t("type.desc.ph")}">${esc(d.description)}</textarea>
          </div>
          <div class="field">
            <span class="label" id="t-icon-label">${t("type.icon")}</span>
            <div class="icon-picks" role="radiogroup" aria-labelledby="t-icon-label">
              ${TYPE_ICONS.map(
                (name) =>
                  `<label class="icon-pick"><input type="radio" name="icon" value="${name}" ${d.icon === name ? "checked" : ""} /><span>${icon(name)}</span><span class="visually-hidden">${name}</span></label>`
              ).join("")}
            </div>
          </div>
        </section>
      </form>
      <p class="note">${t("note")}</p>`;
  }

  function saveType() {
    const d = state.typeDraft;
    state.errors = d.name.trim() ? {} : { typeName: "type.name.error" };
    if (state.errors.typeName) {
      renderTypeForm();
      return $("t-name").focus();
    }
    const name = d.name.trim();
    const type = { id: "t" + ++made, vi: name, en: name, description: d.description.trim(), icon: d.icon, asks: "which" };
    RESOURCE_TYPES.push(type);
    // Back to the resource being added, with the new type already chosen.
    state.draft = { ...(state.draft || blankResource()), type: type.id };
    state.typeDraft = null;
    location.hash = "new";
    toast(t("type.added", { name }));
  }

  // ---------- Which view ----------

  function route() {
    const asked = location.hash.slice(1);
    state.errors = {};
    if (asked === "new") {
      state.view = "new";
      // Coming back from "add a type" keeps what was already typed.
      if (!state.draft) {
        state.draft = blankResource();
        state.slugEdited = false;
      }
    } else if (asked === "new-type") {
      state.view = "new-type";
      state.typeDraft = blankType();
    } else {
      state.view = "list";
      state.draft = null;
    }
    render();
    if (state.view === "new") $("f-name")?.focus();
    if (state.view === "new-type") $("t-name").focus();
    scrollTo(0, 0);
  }

  function render() {
    if (state.view === "new") renderResourceForm();
    else if (state.view === "new-type") renderTypeForm();
    else renderList();
  }

  // ---------- Events ----------

  const view = $("view");

  view.addEventListener("input", (event) => {
    const el = event.target;
    if (el.id === "q") {
      state.q = el.value;
      state.page = 0;
      return refreshResults();
    }
    const form = el.closest("[data-form]");
    if (!form || !el.dataset.key) return;
    const d = form.dataset.form === "type" ? state.typeDraft : state.draft;
    d[el.dataset.key] = el.value;
    if (form.dataset.form === "resource") {
      if (el.id === "f-slug") state.slugEdited = true;
      // The slug follows the name until the owner types one of their own.
      if (el.id === "f-name" && !state.slugEdited) {
        d.slug = slugOf(el.value);
        $("f-slug").value = d.slug;
      }
    }
  });

  view.addEventListener("change", (event) => {
    const el = event.target;
    if (el.id === "f-type" || el.id === "f-status") {
      state[el.id === "f-type" ? "type" : "status"] = el.value;
      state.page = 0;
      return refreshResults();
    }
    if (el.name === "code") state.draft.code = Number(el.value);
    if (el.name === "icon") state.typeDraft.icon = el.value;
  });

  view.addEventListener("click", (event) => {
    if (event.target.closest("[data-clear]")) {
      Object.assign(state, { q: "", type: "", status: "", page: 0 });
      renderList();
      return $("q").focus();
    }
    const pick = event.target.closest("[data-status]");
    if (pick) {
      state.status = state.status === pick.dataset.status ? "" : pick.dataset.status;
      state.page = 0;
      $("f-status").value = state.status;
      refreshResults();
      return $("summary").querySelector(`[data-status="${pick.dataset.status}"]`).focus();
    }
    const step = event.target.closest("[data-page]");
    if (step) {
      state.page += Number(step.dataset.page);
      refreshResults();
    }
  });

  view.addEventListener("submit", (event) => {
    event.preventDefault();
    if (event.target.dataset.form === "resource") saveResource();
    else if (event.target.dataset.form === "type") saveType();
  });

  addEventListener("hashchange", route);
  PBM.onChange(render);

  PBM.mount("resources");
  route();
})();
