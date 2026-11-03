/* Tài nguyên: everything a booking can take up or happen at. Branches, staff
   and places are all resources of different types, and a shop can add types.

   It began as a redesign of the page in the app (client/features/resources):
   the same counts, filters, table and two forms. Since 3 November it also does
   what the app's page cannot: the types sit in a list on the left, as Notion
   lists pages, each with a "…" menu to edit or delete it; and a row opens the
   resource in a side peek where everything about it can be changed. The
   server already has the endpoints for both (PUT and DELETE on resources and
   resource types, and the tables the peek's sections read).

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
      "rail.label": "Loại tài nguyên",
      "rail.all": "Tất cả",
      "rail.new": "Loại mới",
      "rail.more": ({ name }) => `Tuỳ chọn cho ${name}`,
      "rail.edit": "Sửa loại",
      "rail.del": "Xoá loại",
      open: ({ name }) => `Mở ${name}`,
      close: "Đóng",
      "p.details": "Chi tiết",
      "p.services": "Dịch vụ",
      "p.services.lede": "Những dịch vụ tài nguyên này nhận.",
      "p.services.all": "Chọn tất cả",
      "p.services.none": "Tiệm chưa có dịch vụ nào.",
      "p.hours": "Giờ làm việc và ngày nghỉ",
      "p.account": "Tài khoản và giá",
      "f.bookable": "Khách đặt được",
      "f.bookable.hint": "Tắt nếu chỉ tiệm dùng, không mở cho khách chọn.",
      "f.hours": "Giờ làm việc",
      "f.hours.branch": ({ name }) => `Theo chi nhánh ${name}`,
      "f.hours.shop": "Theo giờ mở cửa của tiệm",
      "f.hours.edit": "Sửa trong Giờ làm việc",
      "off.title": "Ngày nghỉ và bảo trì",
      "off.none": "Chưa có ngày nghỉ nào.",
      "off.add": "Thêm ngày nghỉ",
      "off.from": "Từ ngày",
      "off.to": "Đến ngày",
      "off.reason": "Lý do",
      "off.reason.ph": "Không bắt buộc",
      "off.save": "Thêm",
      "off.remove": ({ when }) => `Xoá ngày nghỉ ${when}`,
      "off.error": "Ngày kết thúc phải bằng hoặc sau ngày bắt đầu.",
      "f.member": "Tài khoản nhân viên",
      "f.member.none": "Chưa nối tài khoản",
      "f.member.hint": "Người này đăng nhập và thấy lịch hẹn của chính mình.",
      "f.price": "Giá riêng",
      "f.price.ph": "Không bắt buộc",
      "f.price.hint": "Cho thứ được thuê riêng, như một phòng hay một chiếc xe.",
      "f.price.error": "Giá phải là một số không âm.",
      save: "Lưu",
      saved: ({ name }) => `Đã lưu ${name}`,
      unsaved: "Có thay đổi chưa lưu",
      del: "Xoá",
      "del.sure": "Chắc chắn xoá",
      deleted: ({ name }) => `Đã xoá ${name}`,
      "del.blocked": ({ name, uses }) => `Chưa xoá được ${name}: ${uses}. Hãy ngừng dùng thay vì xoá, để lịch sử còn nguyên.`,
      "uses.links": ({ n }) => `${n} tài nguyên liên kết với nó`,
      "uses.bookings": ({ n }) => `${n} lịch hẹn dùng nó`,
      "uses.and": " và ",
      "del.retire": "Ngừng dùng",
      retired: ({ name }) => `${name} đã ngừng dùng`,
      "type.edit": "Sửa loại tài nguyên",
      "type.count": ({ n }) => `${n} tài nguyên thuộc loại này`,
      "type.del.blocked": ({ name, n }) => `Chưa xoá được ${name}: ${n} tài nguyên thuộc loại này. Đổi loại hoặc xoá chúng trước.`,
      "type.show": "Xem các tài nguyên đó",
      "type.saved": ({ name }) => `Đã lưu loại ${name}`,
      "type.deleted": ({ name }) => `Đã xoá loại ${name}`,
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
      "rail.label": "Resource types",
      "rail.all": "All resources",
      "rail.new": "New type",
      "rail.more": ({ name }) => `Options for ${name}`,
      "rail.edit": "Edit type",
      "rail.del": "Delete type",
      open: ({ name }) => `Open ${name}`,
      close: "Close",
      "p.details": "Details",
      "p.services": "Services",
      "p.services.lede": "The services this resource can take.",
      "p.services.all": "Select all",
      "p.services.none": "The shop has no services yet.",
      "p.hours": "Working hours and time off",
      "p.account": "Account and price",
      "f.bookable": "Customers can book it",
      "f.bookable.hint": "Turn off to keep it for the shop's own use.",
      "f.hours": "Working hours",
      "f.hours.branch": ({ name }) => `Same as ${name}`,
      "f.hours.shop": "Same as the shop's opening hours",
      "f.hours.edit": "Edit in Availability",
      "off.title": "Time off and maintenance",
      "off.none": "No time off planned.",
      "off.add": "Add time off",
      "off.from": "From",
      "off.to": "To",
      "off.reason": "Reason",
      "off.reason.ph": "Optional",
      "off.save": "Add",
      "off.remove": ({ when }) => `Remove time off ${when}`,
      "off.error": "The end must be on or after the start.",
      "f.member": "Team member account",
      "f.member.none": "Not linked to an account",
      "f.member.hint": "This person signs in and sees their own bookings.",
      "f.price": "Price of its own",
      "f.price.ph": "Optional",
      "f.price.hint": "For things hired out on their own, such as a room or a car.",
      "f.price.error": "The price must be a number of zero or more.",
      save: "Save changes",
      saved: ({ name }) => `Saved ${name}`,
      unsaved: "Unsaved changes",
      del: "Delete",
      "del.sure": "Yes, delete",
      deleted: ({ name }) => `Deleted ${name}`,
      "del.blocked": ({ name, uses }) => `${name} can't be deleted: ${uses}. Retire it instead, so its history stays whole.`,
      "uses.links": ({ n }) => `${n} ${n === 1 ? "resource is" : "resources are"} linked to it`,
      "uses.bookings": ({ n }) => `${n} ${n === 1 ? "booking uses" : "bookings use"} it`,
      "uses.and": " and ",
      "del.retire": "Retire instead",
      retired: ({ name }) => `Retired ${name}`,
      "type.edit": "Edit resource type",
      "type.count": ({ n }) => `${n} ${n === 1 ? "resource has" : "resources have"} this type`,
      "type.del.blocked": ({ name, n }) =>
        `${name} can't be deleted: ${n} ${n === 1 ? "resource has" : "resources have"} this type. Change their type or delete them first.`,
      "type.show": "Show them",
      "type.saved": ({ name }) => `Saved the type ${name}`,
      "type.deleted": ({ name }) => `Deleted the type ${name}`,
      note: "Sample data. This is a design mockup, not connected to the system.",
    },
  });

  const { RESOURCES, RESOURCE_TYPES, SERVICES, SERVICE_ORDER, SCHEDULES, STAFF, BOOKINGS, TODAY } = PBM_SAMPLE;

  // What the peek edits beyond the list's columns, each a table the server
  // already has: `bookable` (resources.is_bookable), `hours` (a schedule, from
  // resource_calendars; null follows its branch or the shop), `off` (time off
  // and maintenance, from resource_maintenance), `member` (the team member's
  // account, from resource_assignments) and `price` (resource_pricing).
  // The sample shop has none of them, so they are filled in here.
  const MEMBERS = STAFF.map((person) => ({ id: "m" + person.id, name: person.name }));
  const dayISO = (offset) => {
    const d = new Date(TODAY);
    d.setDate(d.getDate() + offset);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  };
  RESOURCES.forEach((r) => {
    r.bookable ??= r.status !== "RETIRED";
    r.hours ??= { b1: 1, b2: 2, p3: 3 }[r.id] ?? null;
    r.off ??= r.id === "c3" ? [{ from: dayISO(-1), to: dayISO(3), reason: "Thay đệm ghế" }] : [];
    r.member ??= r.type === "people" && STAFF.some((person) => "p" + person.id === r.id) ? "m" + r.id.slice(1) : "";
    r.price ??= r.id === "c4" ? 50000 : null;
  });

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
    // The side peek: { kind: "resource" | "type", id, draft, errors, sure, offDraft }.
    peek: null,
    menu: "", // the type whose "…" menu is open
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
    // The name is a button whose hit area is the whole row (resources.css), so a
    // row opens its peek from anywhere, as a booking does on Tổng quan.
    const open = state.peek?.kind === "resource" && state.peek.id === r.id;
    return `<tr data-row="${r.id}" class="${open ? "is-open" : ""}">
        <td class="c-state">${stateOf(r.status)}</td>
        <td class="c-name"><span class="dt-name"><i class="code-dot code-${r.code}"></i><span><button class="row-open" type="button" data-open="${r.id}" aria-label="${esc(t("open", { name: r.name }))}" aria-expanded="${open}"><strong>${esc(r.name)}</strong></button><small>${esc(r.slug)}</small></span></span></td>
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
      <div class="res-layout">
        <nav class="rail" id="rail" aria-label="${t("rail.label")}">${railHTML()}</nav>
        <div class="res-main">
          <form class="panel filters" id="filters" role="search">
            <label class="filter-search">
              ${icon("search")}
              <span class="visually-hidden">${t("search.label")}</span>
              <input class="input" type="search" id="q" value="${esc(state.q)}" placeholder="${t("search.ph")}" autocomplete="off" />
            </label>
            <select class="input" id="f-status" aria-label="${t("filter.status")}">
              <option value="">${t("filter.status.all")}</option>
              ${STATUSES.map((status) => `<option value="${status}" ${state.status === status ? "selected" : ""}>${t("st." + status)}</option>`).join("")}
            </select>
            <button class="btn btn-quiet" type="button" data-clear id="clear" ${filtering() ? "" : "hidden"}>${icon("x")}${t("filter.clear")}</button>
          </form>
          <div id="results">${tableHTML()}</div>
        </div>
      </div>
      <p class="note">${t("note")}</p>`;
  }

  // The types, as Notion lists pages in its sidebar: picking one filters the
  // table, and each has a "…" menu to edit or delete it. This replaces the
  // type filter that used to sit beside the search box. On a phone it is a row
  // of chips above the table (resources.css).
  function railHTML() {
    const count = (id) => RESOURCES.filter((r) => !id || r.type === id).length;
    const item = (id, label, glyph) => {
      const type = id && typeOf(id);
      const menuOpen = Boolean(type) && state.menu === id;
      return `<li class="rail-item ${state.type === id ? "is-current" : ""} ${menuOpen ? "has-menu" : ""}">
          <button class="rail-pick" type="button" data-type="${id}" aria-pressed="${state.type === id}">
            ${icon(glyph)}<span class="rail-name">${esc(label)}</span><span class="rail-count num">${count(id)}</span>
          </button>
          ${
            type
              ? `<button class="icon-btn rail-more" type="button" data-menu="${id}" aria-haspopup="menu" aria-expanded="${menuOpen}" aria-label="${esc(
                  t("rail.more", { name: label })
                )}" title="${esc(t("rail.more", { name: label }))}">${icon("more")}</button>
                ${
                  menuOpen
                    ? `<div class="rail-menu" role="menu">
                        <button type="button" role="menuitem" data-edit-type="${id}">${icon("sliders")}${t("rail.edit")}</button>
                        <button type="button" role="menuitem" class="is-danger" data-del-type="${id}">${icon("trash")}${t("rail.del")}</button>
                      </div>`
                    : ""
                }`
              : ""
          }
        </li>`;
    };
    return `<p class="rail-label">${t("rail.label")}</p>
      <ul>
        ${item("", t("rail.all"), "grid")}
        ${RESOURCE_TYPES.map((type) => item(type.id, typeName(type), type.icon || "box")).join("")}
      </ul>
      <a class="rail-new" href="#new-type">${icon("plus")}${t("rail.new")}</a>`;
  }

  // Typing in the search box redraws the table only, so the box keeps its cursor.
  function refreshResults() {
    $("results").innerHTML = tableHTML();
    $("summary").outerHTML = summaryHTML();
    $("rail").innerHTML = railHTML();
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
    // Opened from the resource form, it goes back there; from the list, to the list.
    const back = state.typeFrom === "new" ? "#new" : "#";
    const backLabel = state.typeFrom === "new" ? t("form.title") : t("back");
    document.title = `${t("type.title")} | pleasebookme`;
    $("view").innerHTML = `
      <header class="head">
        <a class="icon-btn back" href="${back}" aria-label="${backLabel}" title="${backLabel}">${icon("left")}</a>
        <h1>${t("type.title")}</h1>
        <div class="head-actions">
          <a class="btn btn-quiet" href="${back}">${t("cancel")}</a>
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
    state.typeDraft = null;
    if (state.typeFrom === "new") {
      // Back to the resource being added, with the new type already chosen.
      state.draft = { ...(state.draft || blankResource()), type: type.id };
      location.hash = "new";
    } else {
      // Back to the list, showing the new (empty) type.
      Object.assign(state, { type: type.id, q: "", status: "", page: 0 });
      location.hash = "";
    }
    toast(t("type.added", { name }));
  }

  // ---------- The side peek: one resource, or one type ----------
  // Opens beside the table, as a booking does on Tổng quan, so the next row can
  // be picked without closing it. New things still get a page (#new,
  // #new-type); things that exist open here. Every field can be changed, and
  // nothing is kept until "Save".

  const peekEl = $("peek");
  let lastFocus = null;
  const clone = (value) => JSON.parse(JSON.stringify(value));
  const NUMERIC = new Set(["capacity", "price", "hours"]);
  const asNumber = (value) => (!value.trim() ? null : /^\d+$/.test(value.trim()) ? Number(value) : value);
  const fmtDay = (iso) =>
    new Date(iso + "T00:00").toLocaleDateString(PBM.lang === "vi" ? "vi-VN" : "en-GB", { day: "numeric", month: "short" });

  // What still points at a resource. Bookings keep the resource they used, so a
  // resource with any is retired, not deleted (the server answers 409 too).
  function usesOf(r) {
    const links = RESOURCES.filter((other) => other.branch === r.id).length;
    const bookings = BOOKINGS.filter((b) => b.branch === r.id || "p" + b.staff === r.id).length;
    return { links, bookings, any: links + bookings > 0 };
  }

  function usesText({ links, bookings }) {
    return [links && t("uses.links", { n: links }), bookings && t("uses.bookings", { n: bookings })].filter(Boolean).join(t("uses.and"));
  }

  function openPeek(kind, id) {
    const source = kind === "resource" ? RESOURCES.find((r) => r.id === id) : typeOf(id);
    if (!source) return closePeek();
    if (!state.peek) lastFocus = document.activeElement;
    state.peek = { kind, id, draft: clone(source), errors: {}, sure: false, offDraft: null };
    state.menu = "";
    renderPeek();
    if (state.view === "list") refreshResults();
    peekEl.querySelector("[data-close]").focus();
  }

  function closePeek() {
    if (!state.peek) return;
    const id = state.peek.id;
    state.peek = null;
    renderPeek();
    if (state.view === "list") refreshResults();
    if (location.hash.startsWith("#r/") || location.hash.startsWith("#t/")) history.replaceState(null, "", location.pathname);
    const row = document.querySelector(`[data-open="${id}"]`);
    (row || (lastFocus && document.contains(lastFocus) ? lastFocus : null))?.focus();
  }

  const changed = () => {
    const p = state.peek;
    const source = p.kind === "resource" ? RESOURCES.find((r) => r.id === p.id) : typeOf(p.id);
    return JSON.stringify(source) !== JSON.stringify(p.draft);
  };

  const pErr = (key, id) =>
    state.peek.errors[key] ? `<span class="error" id="${id}-error">${t(state.peek.errors[key])}</span>` : "";
  const pInvalid = (key, id) => (state.peek.errors[key] ? `aria-invalid="true" aria-describedby="${id}-error"` : "");

  function resourcePeekHTML() {
    const d = state.peek.draft;
    const type = typeOf(d.type);
    const branch = d.branch && RESOURCES.find((r) => r.id === d.branch);
    const linkable = RESOURCES.filter((r) => r.id !== d.id && r.status !== "RETIRED" && r.branch !== d.id);
    const uses = usesOf(d);
    const isPerson = type?.asks === "who";
    const off = [...d.off].sort((a, b) => a.from.localeCompare(b.from));
    const o = state.peek.offDraft;

    return `
      <header class="sheet-head peek-head">
        <div>
          <p class="peek-kind">${icon(type?.icon || "box")}${esc(type ? typeName(type) : "")}</p>
          <h2 id="peek-title"><i class="code-dot code-${d.code}" aria-hidden="true"></i>${esc(d.name || "…")}</h2>
        </div>
        <button class="icon-btn" type="button" data-close aria-label="${t("close")}" title="${t("close")}">${icon("x")}</button>
      </header>
      <form class="peek-body" id="peek-form" novalidate>
        <section class="peek-sec" aria-labelledby="ps-details">
          <h3 id="ps-details">${t("p.details")}</h3>
          <div class="field">
            <label for="p-name">${t("f.name")}</label>
            <input class="input" id="p-name" data-p="name" maxlength="255" value="${esc(d.name)}" autocomplete="off" ${pInvalid("name", "p-name")} />
            ${pErr("name", "p-name")}
          </div>
          <div class="field">
            <label for="p-slug">${t("f.slug")}</label>
            <input class="input" id="p-slug" data-p="slug" maxlength="255" value="${esc(d.slug)}" autocomplete="off" spellcheck="false" ${pInvalid("slug", "p-slug")} />
            ${pErr("slug", "p-slug")}
          </div>
          <div class="field-pair">
            <div class="field">
              <label for="p-type">${t("f.type")}</label>
              <select class="input" id="p-type" data-p="type">
                ${RESOURCE_TYPES.map((tp) => `<option value="${tp.id}" ${d.type === tp.id ? "selected" : ""}>${esc(typeName(tp))}</option>`).join("")}
              </select>
            </div>
            <div class="field">
              <label for="p-status">${t("f.status")}</label>
              <select class="input" id="p-status" data-p="status">
                ${STATUSES.map((s) => `<option value="${s}" ${d.status === s ? "selected" : ""}>${t("st." + s)}</option>`).join("")}
              </select>
            </div>
          </div>
          <div class="field-pair">
            <div class="field">
              <label for="p-capacity">${t("f.capacity")}</label>
              <input class="input" id="p-capacity" data-p="capacity" inputmode="numeric" value="${esc(d.capacity ?? "")}" placeholder="${t("f.capacity.ph")}" ${pInvalid("capacity", "p-capacity")} />
              ${pErr("capacity", "p-capacity")}
            </div>
            <div class="field">
              <label for="p-link">${t("f.link")}</label>
              <select class="input" id="p-link" data-p="branch">
                <option value="">${t("f.link.none")}</option>
                ${linkable.map((r) => `<option value="${r.id}" ${d.branch === r.id ? "selected" : ""}>${esc(r.name)}</option>`).join("")}
              </select>
            </div>
          </div>
          <div class="field">
            <span class="label" id="p-code-label">${t("f.code")}</span>
            <div class="swatches" role="radiogroup" aria-labelledby="p-code-label">
              ${Array.from({ length: 8 }, (_, i) => i + 1)
                .map(
                  (n) =>
                    `<label class="swatch"><input type="radio" name="p-code" value="${n}" ${d.code === n ? "checked" : ""} /><i class="code-${n}" aria-hidden="true"></i><span class="visually-hidden">${t("f.code.n", { n })}</span></label>`
                )
                .join("")}
            </div>
          </div>
          <div class="field">
            <label for="p-desc">${t("f.desc")}</label>
            <textarea class="input area" id="p-desc" data-p="description" rows="3" placeholder="${t("f.desc.ph")}">${esc(d.description)}</textarea>
          </div>
          <label class="switch-line">
            <span><strong>${t("f.bookable")}</strong><small>${t("f.bookable.hint")}</small></span>
            <input class="switch" type="checkbox" role="switch" id="p-bookable" ${d.bookable ? "checked" : ""} />
          </label>
        </section>

        <section class="peek-sec" aria-labelledby="ps-services">
          <div class="peek-sec-head">
            <h3 id="ps-services">${t("p.services")}</h3>
            ${SERVICE_ORDER.length ? `<button class="link-btn" type="button" data-all-services>${t("p.services.all")}</button>` : ""}
          </div>
          <p class="peek-lede">${SERVICE_ORDER.length ? t("p.services.lede") : t("p.services.none")}</p>
          <div class="svc-picks">
            ${SERVICE_ORDER.map(
              (id) =>
                `<label class="svc-pick"><input type="checkbox" data-svc="${id}" ${d.does.includes(id) ? "checked" : ""} /><span>${icon("check")}${esc(
                  SERVICES[id][PBM.lang]
                )}</span></label>`
            ).join("")}
          </div>
        </section>

        <section class="peek-sec" aria-labelledby="ps-hours">
          <h3 id="ps-hours">${t("p.hours")}</h3>
          <div class="field">
            <span class="label-row"><label for="p-hours">${t("f.hours")}</label><a class="link-btn" href="/dashboard/availability">${t("f.hours.edit")}</a></span>
            <select class="input" id="p-hours" data-p="hours">
              <option value="">${branch ? t("f.hours.branch", { name: branch.name }) : t("f.hours.shop")}</option>
              ${SCHEDULES.map((s) => `<option value="${s.id}" ${String(d.hours) === String(s.id) ? "selected" : ""}>${esc(s.title)}</option>`).join("")}
            </select>
          </div>
          <div class="field">
            <span class="label">${t("off.title")}</span>
            ${
              off.length
                ? `<ul class="off-list">${off
                    .map((span) => {
                      const when = span.from === span.to ? fmtDay(span.from) : `${fmtDay(span.from)} – ${fmtDay(span.to)}`;
                      const i = d.off.indexOf(span);
                      return `<li><span><strong class="num">${when}</strong>${span.reason ? `<small>${esc(span.reason)}</small>` : ""}</span>
                        <button class="icon-btn" type="button" data-off-remove="${i}" aria-label="${esc(t("off.remove", { when }))}" title="${esc(t("off.remove", { when }))}">${icon("x")}</button></li>`;
                    })
                    .join("")}</ul>`
                : `<p class="peek-lede">${t("off.none")}</p>`
            }
            ${
              o
                ? `<div class="off-new">
                    <div class="field-pair">
                      <div class="field"><label for="o-from">${t("off.from")}</label><input class="input" type="date" id="o-from" data-o="from" value="${o.from}" /></div>
                      <div class="field"><label for="o-to">${t("off.to")}</label><input class="input" type="date" id="o-to" data-o="to" value="${o.to}" ${pInvalid("off", "o-to")} /></div>
                    </div>
                    ${pErr("off", "o-to")}
                    <div class="field"><label for="o-reason">${t("off.reason")}</label><input class="input" id="o-reason" data-o="reason" value="${esc(o.reason)}" placeholder="${t("off.reason.ph")}" /></div>
                    <div class="off-actions">
                      <button class="btn btn-quiet btn-small" type="button" data-off-cancel>${t("cancel")}</button>
                      <button class="btn btn-small" type="button" data-off-save>${t("off.save")}</button>
                    </div>
                  </div>`
                : `<button class="btn btn-quiet btn-small off-add" type="button" data-off-add>${icon("plus")}${t("off.add")}</button>`
            }
          </div>
        </section>

        <section class="peek-sec" aria-labelledby="ps-account">
          <h3 id="ps-account">${t("p.account")}</h3>
          ${
            isPerson
              ? `<div class="field">
                  <label for="p-member">${t("f.member")}</label>
                  <select class="input" id="p-member" data-p="member">
                    <option value="">${t("f.member.none")}</option>
                    ${MEMBERS.map((m) => `<option value="${m.id}" ${d.member === m.id ? "selected" : ""}>${esc(m.name)}</option>`).join("")}
                  </select>
                  <small>${t("f.member.hint")}</small>
                </div>`
              : ""
          }
          <div class="field">
            <label for="p-price">${t("f.price")}</label>
            <span class="price-input"><input class="input num" id="p-price" data-p="price" inputmode="numeric" value="${esc(d.price ?? "")}" placeholder="${t("f.price.ph")}" ${pInvalid("price", "p-price")} /><span aria-hidden="true">₫</span></span>
            <small>${t("f.price.hint")}</small>
            ${pErr("price", "p-price")}
          </div>
        </section>

        ${
          state.peek.sure === "blocked"
            ? `<p class="peek-blocked" role="alert">${t("del.blocked", { name: esc(d.name), uses: usesText(uses) })}</p>`
            : ""
        }
      </form>
      <footer class="sheet-actions peek-actions">
        ${
          state.peek.sure === "blocked"
            ? `<button class="btn btn-quiet" type="button" data-retire ${d.status === "RETIRED" ? "disabled" : ""}>${t("del.retire")}</button>`
            : `<button class="btn btn-quiet btn-danger ${state.peek.sure ? "is-sure" : ""}" type="button" data-delete>${icon("trash")}${t(
                state.peek.sure ? "del.sure" : "del"
              )}</button>`
        }
        <span class="peek-dirty" ${changed() ? "" : "hidden"}>${t("unsaved")}</span>
        <button class="btn btn-primary" type="submit" form="peek-form" ${changed() ? "" : "disabled"}>${t("save")}</button>
      </footer>`;
  }

  function typePeekHTML() {
    const d = state.peek.draft;
    const n = RESOURCES.filter((r) => r.type === d.id).length;
    return `
      <header class="sheet-head peek-head">
        <div>
          <p class="peek-kind">${t("type.edit")}</p>
          <h2 id="peek-title">${icon(d.icon || "box")}${esc(d[PBM.lang] || d.vi || "…")}</h2>
        </div>
        <button class="icon-btn" type="button" data-close aria-label="${t("close")}" title="${t("close")}">${icon("x")}</button>
      </header>
      <form class="peek-body" id="peek-form" novalidate>
        <section class="peek-sec">
          <p class="peek-lede">${t("type.count", { n })}</p>
          <div class="field">
            <label for="pt-name">${t("type.name")}</label>
            <input class="input" id="pt-name" data-pt="name" maxlength="100" value="${esc(d[PBM.lang] || d.vi)}" autocomplete="off" ${pInvalid("typeName", "pt-name")} />
            ${pErr("typeName", "pt-name")}
          </div>
          <div class="field">
            <label for="pt-desc">${t("type.desc")}</label>
            <textarea class="input area" id="pt-desc" data-pt="description" rows="3" placeholder="${t("type.desc.ph")}">${esc(d.description || "")}</textarea>
          </div>
          <div class="field">
            <span class="label" id="pt-icon-label">${t("type.icon")}</span>
            <div class="icon-picks" role="radiogroup" aria-labelledby="pt-icon-label">
              ${TYPE_ICONS.map(
                (name) =>
                  `<label class="icon-pick"><input type="radio" name="pt-icon" value="${name}" ${d.icon === name ? "checked" : ""} /><span>${icon(name)}</span><span class="visually-hidden">${name}</span></label>`
              ).join("")}
            </div>
          </div>
        </section>
        ${
          state.peek.sure === "blocked"
            ? `<p class="peek-blocked" role="alert">${t("type.del.blocked", { name: esc(d[PBM.lang] || d.vi), n })}</p>`
            : ""
        }
      </form>
      <footer class="sheet-actions peek-actions">
        ${
          state.peek.sure === "blocked"
            ? `<button class="btn btn-quiet" type="button" data-show-type="${d.id}">${t("type.show")}</button>`
            : `<button class="btn btn-quiet btn-danger ${state.peek.sure ? "is-sure" : ""}" type="button" data-delete>${icon("trash")}${t(
                state.peek.sure ? "del.sure" : "del"
              )}</button>`
        }
        <span class="peek-dirty" ${changed() ? "" : "hidden"}>${t("unsaved")}</span>
        <button class="btn btn-primary" type="submit" form="peek-form" ${changed() ? "" : "disabled"}>${t("save")}</button>
      </footer>`;
  }

  function renderPeek() {
    peekEl.hidden = !state.peek;
    if (!state.peek) return (peekEl.innerHTML = "");
    const scroll = peekEl.querySelector(".peek-body")?.scrollTop || 0;
    peekEl.innerHTML = state.peek.kind === "resource" ? resourcePeekHTML() : typePeekHTML();
    peekEl.querySelector(".peek-body").scrollTop = scroll;
  }

  // Only the footer follows typing, so a field keeps its cursor.
  function refreshPeekFooter() {
    const dirty = changed();
    peekEl.querySelector(".peek-dirty").hidden = !dirty;
    peekEl.querySelector('[type="submit"]').disabled = !dirty;
    if (state.peek.sure) {
      state.peek.sure = false;
      const del = peekEl.querySelector("[data-delete]");
      if (del) {
        del.classList.remove("is-sure");
        del.innerHTML = `${icon("trash")}${t("del")}`;
      }
    }
  }

  function savePeek() {
    const p = state.peek;
    const d = p.draft;
    if (p.kind === "type") {
      const name = String(d[PBM.lang] || "").trim();
      p.errors = name ? {} : { typeName: "type.name.error" };
      if (!name) return renderPeek(), $("pt-name").focus();
      Object.assign(typeOf(p.id), d, { vi: d.vi.trim(), en: d.en.trim(), description: (d.description || "").trim() });
      toast(t("type.saved", { name }));
    } else {
      p.errors = {};
      if (!d.name.trim()) p.errors.name = "f.name.error";
      if (!d.slug.trim()) p.errors.slug = "f.slug.error.empty";
      else if (!SLUG_SHAPE.test(d.slug.trim())) p.errors.slug = "f.slug.error.shape";
      else if (RESOURCES.some((r) => r.id !== d.id && r.slug === d.slug.trim())) p.errors.slug = "f.slug.error.taken";
      if (String(d.capacity ?? "").trim() && !Number.isInteger(Number(d.capacity))) p.errors.capacity = "f.capacity.error";
      if (String(d.price ?? "").trim() && !(Number(d.price) >= 0)) p.errors.price = "f.price.error";
      const firstBad = ["name", "slug", "capacity", "price"].find((key) => p.errors[key]);
      if (firstBad) return renderPeek(), $("p-" + firstBad).focus();
      Object.assign(RESOURCES.find((r) => r.id === p.id), d, {
        name: d.name.trim(),
        slug: d.slug.trim(),
        description: d.description.trim(),
        capacity: String(d.capacity ?? "").trim() ? Number(d.capacity) : null,
        price: String(d.price ?? "").trim() ? Number(d.price) : null,
        hours: d.hours ? Number(d.hours) : null,
        branch: d.branch || undefined,
      });
      toast(t("saved", { name: d.name.trim() }));
    }
    p.draft = clone(p.kind === "resource" ? RESOURCES.find((r) => r.id === p.id) : typeOf(p.id));
    renderPeek();
    refreshResults();
  }

  // Delete asks twice. If something still uses it, the second press is
  // replaced by what uses it and the way out: retire a resource, or show the
  // resources that have a type.
  function deleteFromPeek() {
    const p = state.peek;
    if (p.kind === "resource") {
      const r = RESOURCES.find((x) => x.id === p.id);
      if (usesOf(r).any) p.sure = "blocked";
      else if (!p.sure) p.sure = true;
      else {
        RESOURCES.splice(RESOURCES.indexOf(r), 1);
        toast(t("deleted", { name: r.name }));
        return closePeek();
      }
    } else {
      const type = typeOf(p.id);
      if (RESOURCES.some((r) => r.type === type.id)) p.sure = "blocked";
      else if (!p.sure) p.sure = true;
      else {
        RESOURCE_TYPES.splice(RESOURCE_TYPES.indexOf(type), 1);
        if (state.type === type.id) state.type = "";
        toast(t("type.deleted", { name: typeName(type) }));
        return closePeek();
      }
    }
    renderPeek();
    peekEl.querySelector(p.sure === "blocked" ? ".peek-blocked" : "[data-delete]")?.scrollIntoView({ block: "nearest" });
    (peekEl.querySelector("[data-retire], [data-show-type], [data-delete]") || peekEl).focus();
  }

  peekEl.addEventListener("input", (event) => {
    const el = event.target;
    const p = state.peek;
    if (!p) return;
    // Numbers stay numbers, so typing a value back counts as no change.
    if (el.dataset.p) p.draft[el.dataset.p] = NUMERIC.has(el.dataset.p) ? asNumber(el.value) : el.value;
    if (el.dataset.pt === "name") p.draft[PBM.lang] = el.value;
    else if (el.dataset.pt) p.draft[el.dataset.pt] = el.value;
    if (el.dataset.o) p.offDraft[el.dataset.o] = el.value;
    if (el.dataset.p === "name") peekEl.querySelector("#peek-title").lastChild.textContent = el.value || "…";
    if (!el.dataset.o) refreshPeekFooter();
  });

  peekEl.addEventListener("change", (event) => {
    const el = event.target;
    const p = state.peek;
    if (el.name === "p-code") p.draft.code = Number(el.value);
    else if (el.name === "pt-icon") p.draft.icon = el.value;
    else if (el.id === "p-bookable") p.draft.bookable = el.checked;
    else if (el.dataset.svc) {
      p.draft.does = SERVICE_ORDER.filter((id) => (id === el.dataset.svc ? el.checked : p.draft.does.includes(id)));
    } else if (el.id === "p-type" || el.id === "p-link") {
      // Both change what the peek shows (the account field, the hours' default).
      return renderPeek();
    } else return;
    if (el.name === "p-code" || el.name === "pt-icon") return renderPeek();
    refreshPeekFooter();
  });

  peekEl.addEventListener("click", (event) => {
    const p = state.peek;
    const at = (selector) => event.target.closest(selector);
    if (at("[data-close]")) return closePeek();
    if (at("[data-delete]")) return deleteFromPeek();
    if (at("[data-retire]")) {
      p.draft.status = "RETIRED";
      p.draft.bookable = false;
      Object.assign(RESOURCES.find((r) => r.id === p.id), { status: "RETIRED", bookable: false });
      p.sure = false;
      toast(t("retired", { name: p.draft.name }));
      renderPeek();
      return refreshResults();
    }
    const show = at("[data-show-type]");
    if (show) {
      Object.assign(state, { type: show.dataset.showType, q: "", status: "", page: 0 });
      closePeek();
      return renderList();
    }
    if (at("[data-all-services]")) {
      p.draft.does = [...SERVICE_ORDER];
      peekEl.querySelectorAll("[data-svc]").forEach((box) => (box.checked = true));
      return refreshPeekFooter();
    }
    if (at("[data-off-add]")) {
      p.offDraft = { from: dayISO(1), to: dayISO(1), reason: "" };
      renderPeek();
      return $("o-from").focus();
    }
    if (at("[data-off-cancel]")) {
      p.offDraft = null;
      delete p.errors.off;
      renderPeek();
      return peekEl.querySelector("[data-off-add]").focus();
    }
    if (at("[data-off-save]")) {
      const o = p.offDraft;
      if (!o.from || !o.to || o.to < o.from) {
        p.errors.off = "off.error";
        renderPeek();
        return $("o-to").focus();
      }
      delete p.errors.off;
      p.draft.off = [...p.draft.off, { from: o.from, to: o.to, reason: o.reason.trim() }];
      p.offDraft = null;
      renderPeek();
      return peekEl.querySelector("[data-off-add]").focus();
    }
    const remove = at("[data-off-remove]");
    if (remove) {
      p.draft.off = p.draft.off.filter((_, i) => i !== Number(remove.dataset.offRemove));
      renderPeek();
      return peekEl.querySelector("[data-off-add], [data-off-save]")?.focus();
    }
  });

  peekEl.addEventListener("submit", (event) => {
    event.preventDefault();
    savePeek();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (state.menu) {
      const id = state.menu;
      state.menu = "";
      $("rail").innerHTML = railHTML();
      return document.querySelector(`[data-menu="${id}"]`)?.focus();
    }
    if (state.peek && !event.target.closest?.("select")) closePeek();
  });

  // ---------- Which view ----------

  function route() {
    const asked = location.hash.slice(1);
    // #r/<id> and #t/<id> open a resource or a type over the list, so a peek
    // can be linked to. Opening one from the page keeps the scroll.
    const peekAsked = asked.match(/^([rt])\/(.+)$/);
    if (peekAsked) {
      if (state.view !== "list" || !$("results")) {
        state.view = "list";
        state.draft = null;
        render();
      }
      return openPeek(peekAsked[1] === "r" ? "resource" : "type", decodeURIComponent(peekAsked[2]));
    }
    if (state.peek) closePeek();
    state.errors = {};
    if (asked === "new") {
      state.view = "new";
      // Coming back from "add a type" keeps what was already typed.
      if (!state.draft) {
        state.draft = blankResource();
        state.slugEdited = false;
      }
    } else if (asked === "new-type") {
      if (state.view !== "new-type") state.typeFrom = state.view;
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
    if (el.id === "f-status") {
      state.status = el.value;
      state.page = 0;
      return refreshResults();
    }
    if (el.name === "code") state.draft.code = Number(el.value);
    if (el.name === "icon") state.typeDraft.icon = el.value;
  });

  view.addEventListener("click", (event) => {
    const at = (selector) => event.target.closest(selector);
    const row = at("[data-open]");
    if (row) {
      openPeek("resource", row.dataset.open);
      return history.replaceState(null, "", "#r/" + row.dataset.open);
    }
    const more = at("[data-menu]");
    if (more) {
      state.menu = state.menu === more.dataset.menu ? "" : more.dataset.menu;
      $("rail").innerHTML = railHTML();
      return (state.menu ? $("rail").querySelector("[role=menuitem]") : $("rail").querySelector(`[data-menu="${more.dataset.menu}"]`)).focus();
    }
    const edit = at("[data-edit-type]");
    if (edit) {
      openPeek("type", edit.dataset.editType);
      return history.replaceState(null, "", "#t/" + edit.dataset.editType);
    }
    const del = at("[data-del-type]");
    if (del) {
      // The same two presses as in the peek, starting from the first one.
      openPeek("type", del.dataset.delType);
      history.replaceState(null, "", "#t/" + del.dataset.delType);
      return deleteFromPeek();
    }
    const pickType = at("[data-type]");
    if (pickType) {
      state.type = pickType.dataset.type;
      state.menu = "";
      state.page = 0;
      refreshResults();
      return $("rail").querySelector(`[data-type="${state.type}"]`).focus();
    }
    if (state.menu && !at(".rail-menu")) {
      state.menu = "";
      $("rail").innerHTML = railHTML();
    }
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
