/* Teams: the people who can sign in to the shop (meeting with Trung,
   6 November). A member is a real person with an account and a membership in
   this shop; a resource is what customers book. The two meet through
   resource.member (the Resources page sets it too), which stands for Trung's
   resource_assignments (resource_id, membership_id).

   - Members: who has access, their role, the resources they work as, their
     hours and whether they are away. A row opens the person on the stage.
   - Invites and requests: invitations the shop sent, and people asking to
     join. No account is ever made here: people accept an invitation.
   - Schedule: one lane per person who works as a bookable resource, for one
     day, with their bookings, hours and time off.

   Roles are fixed (Owner, Manager, Staff, Member (view only)), as agreed: no
   custom roles. Members, invitations and requests are kept in this browser
   under "pbm-team" until "Reset sample shop". */
(function () {
  "use strict";

  const { t, icon, toast } = PBM;
  const S = PBM_SAMPLE;
  const { STAFF, RESOURCES, SCHEDULES, BOOKINGS, SERVICES, TODAY, NOW, OPEN, CLOSE } = S;

  PBM.addStrings({
    vi: {
      "doc.title": "Nhóm | pleasebookme",
      "page.title": "Nhóm",
      "page.lede": "Những người làm ở tiệm, mỗi người được làm gì và làm lúc nào.",
      share: "Chia sẻ link xin vào",
      "share.done": "Đã chép link. Ai mở link có thể xin vào tiệm; bạn duyệt từng người.",
      invite: "Mời người",
      "count.people": "{n} người:",
      "count.active": "{n} đang làm",
      "count.away": "{n} đang nghỉ",
      "count.invited": "{n} đã mời",
      "tab.members": "Thành viên",
      "tab.invites": "Lời mời và yêu cầu",
      "tab.schedule": "Lịch làm",

      "find.ph": "Tìm theo tên hoặc email",
      "find.label": "Tìm thành viên",
      "filter.role": "Mọi vai trò",
      "col.member": "Thành viên",
      "col.role": "Vai trò",
      "col.res": "Tài nguyên được gắn",
      "col.hours": "Giờ làm",
      "col.status": "Trạng thái",
      none: "Chưa có",
      "hours.shop": "Theo giờ mở cửa",
      "hours.none": "Không nhận khách",
      "hours.later": "Có sau khi vào",
      "st.active": "Đang làm",
      "st.away": "Nghỉ đến {date}",
      "st.invited": "Đã mời",
      you: "Bạn",
      "invited.sub": "Mời ngày {sent} · hết hạn {exp}",
      showing: "{n} người",
      "foot.multi": "Một người có thể ở nhiều tiệm: mỗi tiệm một tư cách thành viên và một vai trò.",
      "only.you": "Mới có mình bạn. Mời những người làm cùng: họ nhận email và vào tiệm khi đồng ý.",
      "no.match": "Không ai khớp với tìm kiếm.",

      "inv.title": "Lời mời đã gửi",
      "inv.lede": "Chờ người được mời đồng ý. Lời mời hết hạn sau 7 ngày.",
      "inv.email": "Email",
      "inv.role": "Vai trò khi vào",
      "inv.by": "Người mời",
      "inv.sent": "Ngày gửi",
      "inv.st": "Trạng thái",
      "inv.link": "Gắn với {name} khi vào",
      "inv.nolink": "Không gắn tài nguyên",
      "inv.exp": "Hết hạn {date}",
      "inv.gone": "Hết hạn {date}",
      resend: "Gửi lại",
      revoke: "Huỷ lời mời",
      "again": "Gửi lại lời mời",
      remove: "Xoá",
      "inv.none": "Chưa gửi lời mời nào.",
      "inv.resent": "Đã gửi lại lời mời cho {email}.",
      "inv.revoked": "Đã huỷ lời mời cho {email}.",

      "req.title": "Yêu cầu vào tiệm",
      "req.lede": "Những người tìm thấy tiệm và xin vào. Tiệm để riêng tư thì không nhận yêu cầu: chỉ có thể mời.",
      "req.person": "Người xin",
      "req.msg": "Lời nhắn",
      "req.asked": "Ngày xin",
      "req.role": "Vai trò nếu duyệt",
      "req.has": "đã có tài khoản",
      approve: "Duyệt",
      decline: "Từ chối",
      "req.none": "Chưa có ai xin vào.",
      "req.ok": "{name} đã vào tiệm với vai trò {role}.",
      "req.no": "Đã từ chối {name}.",
      "req.note": "Link xin vào cho ai cũng mở được, nhưng chủ tiệm hoặc quản lý phải duyệt từng người, và người duyệt chọn vai trò. Quản lý chỉ cho được vai trò Nhân viên hoặc Thành viên.",

      today: "Hôm nay",
      prev: "Ngày trước",
      next: "Ngày sau",
      "sch.person": "Người",
      "sch.booking": "Lịch hẹn",
      "sch.outside": "Ngoài giờ làm",
      "sch.off": "Nghỉ",
      "sch.now": "Bây giờ",
      "sch.offLabel": "Nghỉ · {reason}",
      "sch.none":
        "Chưa có ai để xếp lịch. Ở đây chỉ hiện người được gắn với một tài nguyên nhận khách: mời người vào, rồi gắn họ với một thợ trong trang của họ.",
      "sch.note":
        "Chỉ hiện người được gắn với một tài nguyên nhận khách. Bấm một lịch hẹn để mở nó trong Lịch hẹn. Chủ tiệm và quản lý thấy mọi người; nhân viên chỉ thấy hàng của mình.",
      "add.booking": "Thêm lịch hẹn",

      close: "Đóng",
      since: "vào tiệm ngày {date}",
      "p.role": "Vai trò",
      "p.role.owner": "Chủ tiệm có mọi quyền. Chuyển quyền chủ tiệm trong Cài đặt, chỉ chủ tiệm làm được.",
      "p.res": "Tài nguyên được gắn",
      "p.res.lede": "Khách đặt tài nguyên; {name} là người làm.",
      "p.res.main": "Chính",
      "p.res.unlink": "Bỏ gắn",
      "p.res.add": "Gắn một tài nguyên",
      "p.res.pick": "Chọn tài nguyên",
      "p.res.none": "Chưa gắn tài nguyên nào, nên {name} không nhận khách.",
      "p.res.free": "Mọi thợ đã có người. Thêm thợ trong Tài nguyên.",
      "p.res.linked": "Đã gắn {res} với {name}.",
      "p.res.unlinked": "Đã bỏ gắn {res}.",
      "p.hours": "Giờ làm",
      "p.hours.edit": "Sửa trong Giờ làm việc",
      "p.hours.days": "{n} ngày một tuần",
      "p.off": "Ngày nghỉ",
      "p.off.none": "Không có ngày nghỉ nào sắp tới.",
      "p.off.add": "Thêm ngày nghỉ",
      "p.off.res": "Đặt trên tài nguyên {res}.",
      "p.book": "Lịch hẹn",
      "p.book.lede": "Đặt lịch cho khách với {name} mà không cần đăng nhập bằng tài khoản của họ. Lịch hẹn ghi lại ai đã đặt.",
      "p.book.btn": "Thêm lịch hẹn cho {name}",
      "p.leave": "Rời tiệm",
      "p.leave.lede": "Lịch hẹn và lịch sử cũ vẫn giữ. Tài nguyên vẫn còn, chỉ bỏ gắn.",
      "p.leave.btn": "Mời ra khỏi tiệm",
      "p.leave.sure": "Mời ra thật?",
      "p.left": "{name} đã rời tiệm.",
      "p.roleSet": "{name} giờ là {role}.",
      "p.self": "Đây là bạn. Vai trò của chủ tiệm không đổi ở đây.",

      "i.title": "Mời người",
      "i.lede": "Họ nhận email và vào tiệm khi đồng ý. Ai đã dùng pleasebookme thì vào bằng tài khoản đang có. Không ai bị tạo tài khoản hộ.",
      "i.emails": "Địa chỉ email",
      "i.emails.ph": "ten@gmail.com, ten2@gmail.com",
      "i.emails.hint": "Nhiều địa chỉ thì cách nhau bằng dấu phẩy.",
      "i.emails.empty": "Nhập ít nhất một email.",
      "i.emails.bad": "Email này chưa đúng: {email}",
      "i.role": "Vai trò ở tiệm",
      "i.can": "{role} có thể",
      "i.link": "Gắn với một tài nguyên khi vào (không bắt buộc)",
      "i.nolink": "Không gắn",
      "i.owner": "Không mời ai làm chủ tiệm. Chuyển quyền chủ tiệm trong Cài đặt, chỉ chủ tiệm làm được.",
      "i.cancel": "Huỷ",
      "i.send": "Gửi {n} lời mời",
      "i.send1": "Gửi lời mời",
      "i.sent": "Đã gửi {n} lời mời.",

      "can.MANAGER.1": "Thấy và sửa mọi lịch hẹn, đặt lịch cho bất kỳ ai",
      "can.MANAGER.2": "Mời người, duyệt yêu cầu, sửa giờ làm và ngày nghỉ của nhân viên",
      "can.MANAGER.3": "Không đổi vai trò Quản lý hay Chủ tiệm, không xoá tiệm",
      "can.STAFF.1": "Thấy lịch hẹn của tài nguyên được gắn với mình",
      "can.STAFF.2": "Sửa giờ làm và ngày nghỉ của mình",
      "can.STAFF.3": "Không mời người, không đổi vai trò, không đổi cài đặt",
      "can.MEMBER.1": "Xem lịch hẹn và các trang, không sửa gì",
      "can.MEMBER.2": "Hợp với kế toán hoặc lễ tân chỉ cần xem",
      "can.MEMBER.3": "Không đặt lịch, không đổi gì",

      sample: "Dữ liệu mẫu. Đây là bản thiết kế, chưa nối với hệ thống: email không được gửi thật.",
    },
    en: {
      "doc.title": "Teams | pleasebookme",
      "page.title": "Teams",
      "page.lede": "The people who work in your shop, what each one may do, and when they work.",
      share: "Share join link",
      "share.done": "Link copied. Anyone who opens it can ask to join; you approve each person.",
      invite: "Invite people",
      "count.people": "{n} people:",
      "count.active": "{n} active",
      "count.away": "{n} on time off",
      "count.invited": "{n} invited",
      "tab.members": "Members",
      "tab.invites": "Invites and requests",
      "tab.schedule": "Schedule",

      "find.ph": "Search by name or email",
      "find.label": "Search members",
      "filter.role": "All roles",
      "col.member": "Member",
      "col.role": "Role",
      "col.res": "Linked resources",
      "col.hours": "Working hours",
      "col.status": "Status",
      none: "None",
      "hours.shop": "Shop's opening hours",
      "hours.none": "Not bookable",
      "hours.later": "Set after they join",
      "st.active": "Active",
      "st.away": "Time off to {date}",
      "st.invited": "Invited",
      you: "You",
      "invited.sub": "Invited {sent} · expires {exp}",
      showing: "{n} people",
      "foot.multi": "A person can be in several shops: each shop has its own membership and role.",
      "only.you": "Just you so far. Invite the people who work with you: they get an email and join when they accept.",
      "no.match": "Nobody matches that search.",

      "inv.title": "Invitations you sent",
      "inv.lede": "Waiting for the person to accept. An invitation runs out after 7 days.",
      "inv.email": "Email",
      "inv.role": "Role on joining",
      "inv.by": "Invited by",
      "inv.sent": "Sent",
      "inv.st": "Status",
      "inv.link": "Linked to {name} on joining",
      "inv.nolink": "No resource",
      "inv.exp": "Expires {date}",
      "inv.gone": "Ran out {date}",
      resend: "Resend",
      revoke: "Revoke",
      again: "Send again",
      remove: "Remove",
      "inv.none": "No invitations sent yet.",
      "inv.resent": "Sent the invitation to {email} again.",
      "inv.revoked": "Revoked the invitation to {email}.",

      "req.title": "Requests to join",
      "req.lede": "People who found the shop and asked to join. A private shop gets none: people can only be invited.",
      "req.person": "Person",
      "req.msg": "Their message",
      "req.asked": "Asked",
      "req.role": "Role if approved",
      "req.has": "has an account",
      approve: "Approve",
      decline: "Decline",
      "req.none": "Nobody has asked to join.",
      "req.ok": "{name} joined as {role}.",
      "req.no": "Declined {name}.",
      "req.note": "The join link opens for anyone, but an owner or manager approves each person and picks their role. Managers can only give Staff or Member.",

      today: "Today",
      prev: "Previous day",
      next: "Next day",
      "sch.person": "Person",
      "sch.booking": "Booking",
      "sch.outside": "Outside working hours",
      "sch.off": "Time off",
      "sch.now": "Now",
      "sch.offLabel": "Time off · {reason}",
      "sch.none":
        "Nobody to schedule yet. Only people linked to a bookable resource appear here: invite someone, then link them to a barber from their page.",
      "sch.note":
        "Only people linked to a bookable resource appear here. Click a booking to open it in Bookings. Owners and managers see everyone; staff see their own lane.",
      "add.booking": "Add booking",

      close: "Close",
      since: "member since {date}",
      "p.role": "Role",
      "p.role.owner": "The owner can do everything. Ownership moves in Settings, by the owner only.",
      "p.res": "Linked resources",
      "p.res.lede": "Customers book the resource; {name} does the work.",
      "p.res.main": "Main",
      "p.res.unlink": "Unlink",
      "p.res.add": "Link a resource",
      "p.res.pick": "Pick a resource",
      "p.res.none": "No resource linked yet, so {name} takes no bookings.",
      "p.res.free": "Every barber already has someone. Add one in Resources.",
      "p.res.linked": "Linked {res} to {name}.",
      "p.res.unlinked": "Unlinked {res}.",
      "p.hours": "Working hours",
      "p.hours.edit": "Edit in Availability",
      "p.hours.days": "{n} days a week",
      "p.off": "Time off",
      "p.off.none": "No time off coming up.",
      "p.off.add": "Add time off",
      "p.off.res": "Set on the resource {res}.",
      "p.book": "Bookings",
      "p.book.lede": "Book a customer in with {name} without signing in as them. The booking records who made it.",
      "p.book.btn": "Add a booking for {name}",
      "p.leave": "Leave the shop",
      "p.leave.lede": "Past bookings and history stay. Their resources stay too, unlinked.",
      "p.leave.btn": "Remove from shop",
      "p.leave.sure": "Remove now?",
      "p.left": "{name} has left the shop.",
      "p.roleSet": "{name} is now {role}.",
      "p.self": "This is you. The owner's role does not change here.",

      "i.title": "Invite people",
      "i.lede": "They get an email and join when they accept. If they already use pleasebookme, they join with the account they have. Nobody gets an account made for them.",
      "i.emails": "Email addresses",
      "i.emails.ph": "name@gmail.com, name2@gmail.com",
      "i.emails.hint": "Separate several with commas.",
      "i.emails.empty": "Enter at least one email.",
      "i.emails.bad": "This email does not look right: {email}",
      "i.role": "Role in this shop",
      "i.can": "{role} can",
      "i.link": "Link to a resource when they join (optional)",
      "i.nolink": "No resource",
      "i.owner": "Owners are not invited. Ownership moves in Settings, by the owner only.",
      "i.cancel": "Cancel",
      "i.send": "Send {n} invitations",
      "i.send1": "Send invitation",
      "i.sent": "Sent {n} invitations.",

      "can.MANAGER.1": "See and change every booking, and book for anyone",
      "can.MANAGER.2": "Invite people, approve requests, and set staff hours and time off",
      "can.MANAGER.3": "Not change a Manager's or the Owner's role, or delete the shop",
      "can.STAFF.1": "See the bookings of the resources linked to them",
      "can.STAFF.2": "Change their own working hours and time off",
      "can.STAFF.3": "Not invite people, change roles or change settings",
      "can.MEMBER.1": "Look at bookings and pages without changing anything",
      "can.MEMBER.2": "Fits an accountant, or a front desk that only reads",
      "can.MEMBER.3": "Not book, move or change anything",

      sample: "Sample data. This is a design, not connected to the system: no email is really sent.",
    },
  });

  const ROLES = ["OWNER", "MANAGER", "STAFF", "MEMBER"];
  const GIVEN = ["MANAGER", "STAFF", "MEMBER"]; // roles an invitation or approval can give
  const KEY = "pbm-team";
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  const dayISO = (offset) => {
    const d = new Date(TODAY);
    d.setDate(d.getDate() + offset);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  };
  const fromISO = (iso) => {
    const [y, m, d] = iso.split("-").map(Number);
    return new Date(y, m - 1, d);
  };
  const short = (iso) => fromISO(iso).toLocaleDateString(PBM.locale, { day: "numeric", month: "short" });
  const ascii = (s) =>
    String(s)
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .toLowerCase();
  const roleName = (role) => t("role." + role);

  // ---------- The team ----------

  // The owner is the account using the dashboard. Everyone else comes from the
  // sample's staff, so the names match Resources and Bookings: the shop starts
  // with just the owner when the sample shop is empty.
  function sampleTeam() {
    const members = [{ id: "m0", name: "Đức Nguyễn", email: "tiemtocmau@gmail.com", role: "OWNER", since: dayISO(-40), you: true }];
    const invites = [];
    const requests = [];
    if (STAFF.length) {
      STAFF.forEach((person) =>
        members.push({
          id: "m" + person.id,
          name: person.name,
          email: ascii(person.name) + ".barber@gmail.com",
          role: person.id === 2 ? "MANAGER" : "STAFF",
          since: dayISO(-30 + person.id),
        })
      );
      members.push({ id: "m90", name: "Thu Hà", email: "thuha.ketoan@gmail.com", role: "MEMBER", since: dayISO(-12) });
      invites.push(
        { id: "i1", email: "phat.barber@gmail.com", role: "STAFF", link: "p6", by: "m0", sent: dayISO(-2), expires: dayISO(5) },
        { id: "i2", email: "lananh.pmu@gmail.com", role: "MEMBER", link: "", by: "m2", sent: dayISO(0), expires: dayISO(7) },
        { id: "i3", email: "an.nguyen@gmail.com", role: "STAFF", link: "", by: "m0", sent: dayISO(-12), expires: dayISO(-5) }
      );
      requests.push({ id: "q1", name: "Bảo Trần", email: "bao.tran@gmail.com", message: "Mình bắt đầu làm ở Long Biên từ thứ Hai. Anh Hưng bảo xin vào ở đây.", asked: dayISO(-1), role: "STAFF" });
    }
    return { members, invites, requests };
  }

  function load() {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY));
      if (saved && saved.v === 1 && saved.setup === S.WITH_SETUP) return saved.team;
    } catch {
      /* nothing kept, or not readable: start from the sample */
    }
    return sampleTeam();
  }
  const team = load();
  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify({ v: 1, setup: S.WITH_SETUP, team }));
    } catch {
      toast(t("store.full"));
    }
  }

  const member = (id) => team.members.find((m) => m.id === id);
  // Which member a resource belongs to. Resources writes r.member; a person in
  // the sample who was never touched there belongs to their own membership.
  const memberOf = (r) => {
    if (r.member !== undefined) return r.member;
    const own = /^p(\d+)$/.exec(r.id);
    return r.type === "people" && own && STAFF.some((p) => p.id === Number(own[1])) ? "m" + own[1] : "";
  };
  const linkedTo = (m) => RESOURCES.filter((r) => memberOf(r) === m.id && r.status !== "RETIRED");
  const people = () => RESOURCES.filter((r) => r.type === "people" && r.status !== "RETIRED");
  const offOf = (r) => (r.off || []).filter((span) => span.to >= dayISO(0));
  const awayNow = (m) => {
    const today = dayISO(0);
    for (const r of linkedTo(m)) {
      const span = (r.off || []).find((s) => s.from <= today && s.to >= today);
      if (span) return span;
    }
    return null;
  };
  const scheduleOf = (r) => {
    const id = r.hours ?? (r.id === "p3" ? 3 : null);
    const own = SCHEDULES.find((s) => s.id === id);
    if (own) return own;
    const branch = PBM_SAMPLE.BRANCHES.find((b) => b.id === r.branch);
    const branchHours = branch && (branch.hours ?? { b1: 1, b2: 2 }[branch.id]);
    return SCHEDULES.find((s) => s.id === branchHours) || null;
  };
  const pending = () => team.invites.filter((i) => i.expires >= dayISO(0));

  // ---------- State and addresses ----------

  const state = { tab: "members", q: "", role: "", day: 0, open: null, sure: false, inviteDraft: null, errors: {} };

  function tabsHTML() {
    const tab = (id, n) =>
      `<a href="#${id}" ${state.tab === id ? 'aria-current="page"' : ""}>${t("tab." + id)}${n ? `<span class="pill">${n}</span>` : ""}</a>`;
    return `<nav class="kit-tabs" aria-label="${t("page.title")}">${tab("members")}${tab("invites", pending().length + team.requests.length)}${tab("schedule")}</nav>`;
  }

  function headHTML() {
    const active = team.members.length;
    const away = team.members.filter(awayNow).length;
    const invited = pending().length;
    return `
      <header class="kit-head">
        <h1>${t("page.title")}</h1>
        <div class="kit-actions">
          <button class="btn btn-quiet" type="button" data-join>${icon("link")}${t("share")}</button>
          <a class="btn btn-primary" href="#invite">${icon("plus")}${t("invite")}</a>
        </div>
        <p>${t("page.lede")}</p>
      </header>
      <p class="kit-counts">
        <span>${t("count.people", { n: active + invited })}</span>
        <span class="dot-word"><i></i>${t("count.active", { n: active - away })}</span>
        ${away ? `<span class="dot-word is-warn"><i></i>${t("count.away", { n: away })}</span>` : ""}
        ${invited ? `<span class="dot-word is-off"><i></i>${t("count.invited", { n: invited })}</span>` : ""}
      </p>`;
  }

  // ---------- Members ----------

  function face(m, code) {
    const letter = m.name ? m.name.trim()[0].toUpperCase() : "?";
    return `<span class="face ${code ? `code-fill code-${code}` : ""}" aria-hidden="true">${esc(letter)}</span>`;
  }

  function codeOf(m) {
    return linkedTo(m).find((r) => r.type === "people")?.code || null;
  }

  function memberRow(m) {
    const res = linkedTo(m);
    const away = awayNow(m);
    const person = res.find((r) => r.type === "people");
    const sched = person ? scheduleOf(person) : null;
    const hours = person ? (sched ? esc(sched.title) : t("hours.shop")) : `<span class="dt-quiet">${t("hours.none")}</span>`;
    return `
      <tr data-open="${m.id}" tabindex="0">
        <td><span class="who">${face(m, codeOf(m))}<span><strong>${esc(m.name)}${m.you ? ` <span class="you">(${t("you")})</span>` : ""}</strong><small>${esc(m.email)}</small></span></span></td>
        <td><span class="role-tag">${roleName(m.role)}</span></td>
        <td>${res.length ? `<span class="res-list">${res.map((r) => `<span><i class="code-dot code-${r.code}"></i>${esc(r.name)}</span>`).join("")}</span>` : `<span class="dt-quiet">${t("none")}</span>`}</td>
        <td>${hours}</td>
        <td>${away ? `<span class="dot-word is-warn"><i></i>${t("st.away", { date: short(away.to) })}</span>` : `<span class="dot-word"><i></i>${t("st.active")}</span>`}</td>
        <td class="dt-go">${icon("right")}</td>
      </tr>`;
  }

  function invitedRow(i) {
    return `
      <tr class="is-invited">
        <td><span class="who"><span class="face" aria-hidden="true">?</span><span><strong>${esc(i.email)}</strong><small>${t("invited.sub", { sent: short(i.sent), exp: short(i.expires) })}</small></span></span></td>
        <td><span class="role-tag">${roleName(i.role)}</span></td>
        <td><span class="dt-quiet">${t("none")}</span></td>
        <td><span class="dt-quiet">${t("hours.later")}</span></td>
        <td><span class="dot-word is-off is-muted"><i></i>${t("st.invited")}</span></td>
        <td></td>
      </tr>`;
  }

  function membersHTML() {
    const q = ascii(state.q.trim());
    const hit = (s) => !q || ascii(s).includes(q);
    const ms = team.members.filter((m) => (!state.role || m.role === state.role) && (hit(m.name) || hit(m.email)));
    const is = pending().filter((i) => (!state.role || i.role === state.role) && hit(i.email));
    const rows = ms.map(memberRow).join("") + is.map(invitedRow).join("");
    const alone = team.members.length === 1 && !pending().length;
    return `
      <form class="panel kit-bar" id="filters" role="search">
        <label class="kit-find">${icon("search")}<span class="visually-hidden">${t("find.label")}</span><input class="input" type="search" id="q" value="${esc(state.q)}" placeholder="${t("find.ph")}" autocomplete="off" /></label>
        <select class="input" id="role" aria-label="${t("col.role")}">
          <option value="">${t("filter.role")}</option>
          ${ROLES.map((r) => `<option value="${r}" ${state.role === r ? "selected" : ""}>${roleName(r)}</option>`).join("")}
        </select>
      </form>
      <div id="results">
        ${
          rows
            ? `<section class="panel"><div class="dt-wrap"><table class="dt members">
                <thead><tr><th>${t("col.member")}</th><th>${t("col.role")}</th><th>${t("col.res")}</th><th>${t("col.hours")}</th><th>${t("col.status")}</th><th><span class="visually-hidden">${t("close")}</span></th></tr></thead>
                <tbody>${rows}</tbody></table></div></section>`
            : `<section class="kit-empty"><p>${t("no.match")}</p></section>`
        }
        <footer class="kit-foot"><span>${t("showing", { n: ms.length + is.length })}</span><span>${t("foot.multi")}</span></footer>
      </div>
      ${alone ? `<section class="kit-empty only-you"><p>${t("only.you")}</p><a class="btn btn-primary" href="#invite">${icon("plus")}${t("invite")}</a></section>` : ""}`;
  }

  // ---------- Invites and requests ----------

  function invitesHTML() {
    const invRows = team.invites
      .map((i) => {
        const gone = i.expires < dayISO(0);
        const link = RESOURCES.find((r) => r.id === i.link);
        return `<tr>
          <td><span class="who"><span class="face" aria-hidden="true">?</span><span><strong>${esc(i.email)}</strong><small>${link ? t("inv.link", { name: esc(link.name) }) : t("inv.nolink")}</small></span></span></td>
          <td><span class="role-tag">${roleName(i.role)}</span></td>
          <td>${esc(member(i.by)?.name || "")}</td>
          <td class="num">${short(i.sent)}</td>
          <td>${gone ? `<span class="dot-word is-warn"><i></i>${t("inv.gone", { date: short(i.expires) })}</span>` : `<span class="dot-word is-off"><i></i>${t("inv.exp", { date: short(i.expires) })}</span>`}</td>
          <td class="dt-actions"><span class="kit-links">${
            gone
              ? `<button type="button" data-resend="${i.id}">${t("again")}</button><button type="button" data-revoke="${i.id}">${t("remove")}</button>`
              : `<button type="button" data-resend="${i.id}">${t("resend")}</button><button type="button" class="is-danger" data-revoke="${i.id}">${t("revoke")}</button>`
          }</span></td>
        </tr>`;
      })
      .join("");
    const reqRows = team.requests
      .map(
        (q) => `<tr>
          <td><span class="who"><span class="face" aria-hidden="true">${esc(q.name[0])}</span><span><strong>${esc(q.name)}</strong><small>${esc(q.email)} · ${t("req.has")}</small></span></span></td>
          <td class="req-msg">${esc(q.message)}</td>
          <td class="num">${short(q.asked)}</td>
          <td><select class="input" data-req-role="${q.id}" aria-label="${t("req.role")}">${GIVEN.map((r) => `<option value="${r}" ${q.role === r ? "selected" : ""}>${roleName(r)}</option>`).join("")}</select></td>
          <td class="dt-actions"><span class="req-btns"><button class="btn btn-quiet btn-small" type="button" data-decline="${q.id}">${t("decline")}</button><button class="btn btn-primary btn-small" type="button" data-approve="${q.id}">${t("approve")}</button></span></td>
        </tr>`
      )
      .join("");
    return `
      <h2 class="kit-sec-title">${t("inv.title")}</h2>
      <p class="kit-sec-lede">${t("inv.lede")}</p>
      ${
        invRows
          ? `<section class="panel"><div class="dt-wrap"><table class="dt">
              <thead><tr><th>${t("inv.email")}</th><th>${t("inv.role")}</th><th>${t("inv.by")}</th><th>${t("inv.sent")}</th><th>${t("inv.st")}</th><th></th></tr></thead>
              <tbody>${invRows}</tbody></table></div></section>`
          : `<section class="kit-empty"><p>${t("inv.none")}</p><a class="btn btn-primary" href="#invite">${icon("plus")}${t("invite")}</a></section>`
      }
      <h2 class="kit-sec-title">${t("req.title")}</h2>
      <p class="kit-sec-lede">${t("req.lede")}</p>
      ${
        reqRows
          ? `<section class="panel"><div class="dt-wrap"><table class="dt">
              <thead><tr><th>${t("req.person")}</th><th>${t("req.msg")}</th><th>${t("req.asked")}</th><th>${t("req.role")}</th><th></th></tr></thead>
              <tbody>${reqRows}</tbody></table></div></section>`
          : `<section class="kit-empty"><p>${t("req.none")}</p></section>`
      }
      <p class="kit-note">${icon("link")}<span>${t("req.note")}</span></p>`;
  }

  // ---------- Schedule ----------

  const SPAN = CLOSE - OPEN;
  const pct = (min) => (Math.max(OPEN, Math.min(CLOSE, min)) - OPEN) / SPAN * 100;
  const hhmm = (min) => `${String(Math.floor(min / 60)).padStart(2, "0")}:${String(min % 60).padStart(2, "0")}`;
  const toMin = (s) => {
    const [h, m] = s.split(":").map(Number);
    return h * 60 + m;
  };

  function lanes() {
    return people()
      .filter((r) => r.status === "ACTIVE" && PBM.branches.has(r.branch) && memberOf(r) && member(memberOf(r)))
      .map((r) => ({ r, m: member(memberOf(r)) }));
  }

  function laneHTML({ r, m }) {
    const date = fromISO(dayISO(state.day));
    const iso = dayISO(state.day);
    const sched = scheduleOf(r);
    const today = sched?.days.find((d) => d.value === date.getDay());
    const blocks = [];
    if (!today || !today.enabled) blocks.push(`<i class="off-hours" style="left:0;width:100%"></i>`);
    else {
      const a = toMin(today.start);
      const b = toMin(today.end);
      if (a > OPEN) blocks.push(`<i class="off-hours" style="left:0;width:${pct(a)}%"></i>`);
      if (b < CLOSE) blocks.push(`<i class="off-hours" style="left:${pct(b)}%;width:${100 - pct(b)}%"></i>`);
    }
    const away = (r.off || []).find((s) => s.from <= iso && s.to >= iso);
    const staffId = r.staffId ?? Number(r.id.slice(1));
    const books = away
      ? []
      : BOOKINGS.filter((b) => b.day === state.day && b.staff === staffId && b.status !== "CANCELLED" && b.status !== "REJECTED");
    const items = away
      ? `<span class="lane-away" style="left:0;width:100%"><strong>${t("sch.offLabel", { reason: esc(away.reason || "") })}</strong><small>${short(away.from)} – ${short(away.to)}</small></span>`
      : books
          .map(
            (b) =>
              `<a class="lane-book code-${r.code}" href="/dashboard/bookings#bk-${b.id}" style="left:${pct(b.start)}%;width:${pct(b.end) - pct(b.start)}%" title="${hhmm(b.start)}–${hhmm(b.end)} ${esc(SERVICES[b.svc]?.[PBM.lang] || "")} · ${esc(b.customer || "")}"><strong>${esc(SERVICES[b.svc]?.[PBM.lang] || "")}</strong><small>${hhmm(b.start)} · ${esc(b.customer || "")}</small></a>`
          )
          .join("");
    const branch = PBM_SAMPLE.BRANCHES.find((b) => b.id === r.branch);
    return `
      <div class="lane">
        <span class="lane-who"><span class="who">${face(m, r.code)}<span><strong>${esc(m.name)}</strong><small>${roleName(m.role)}${branch ? " · " + esc(branch.name) : ""}</small></span></span></span>
        <span class="lane-track">${blocks.join("")}${items}</span>
      </div>`;
  }

  function scheduleHTML() {
    const date = fromISO(dayISO(state.day));
    const label = date.toLocaleDateString(PBM.locale, { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    const list = lanes();
    const hours = [];
    for (let m = OPEN; m < CLOSE; m += 60) hours.push(`<span style="left:${pct(m)}%">${hhmm(m)}</span>`);
    const now = state.day === 0 && NOW > OPEN && NOW < CLOSE ? `<i class="now-line" style="left:${pct(NOW)}%"><span class="visually-hidden">${t("sch.now")}</span></i>` : "";
    return `
      <div class="sch-bar">
        <div class="sch-day">
          <span class="sch-nav">
            <button class="icon-btn" type="button" data-day="-1" aria-label="${t("prev")}" title="${t("prev")}">${icon("left")}</button>
            <button class="btn btn-quiet btn-small" type="button" data-day="0">${t("today")}</button>
            <button class="icon-btn" type="button" data-day="1" aria-label="${t("next")}" title="${t("next")}">${icon("right")}</button>
          </span>
          <h2>${label}</h2>
        </div>
        <span class="kit-actions">${PBM.branches.html()}<a class="btn btn-primary" href="/dashboard/bookings">${icon("plus")}${t("add.booking")}</a></span>
      </div>
      ${
        list.length
          ? `<section class="panel sch">
              <div class="sch-head"><span>${t("sch.person")}</span><span class="sch-hours">${hours.join("")}</span></div>
              <div class="sch-body">${list.map(laneHTML).join("")}<span class="sch-now">${now}</span></div>
            </section>
            <p class="sch-legend">
              <span><i class="lg-book"></i>${t("sch.booking")}</span>
              <span><i class="lg-out"></i>${t("sch.outside")}</span>
              <span><i class="lg-off"></i>${t("sch.off")}</span>
              ${now ? `<span><i class="lg-now"></i>${t("sch.now")}</span>` : ""}
            </p>
            <p class="kit-sample">${t("sch.note")}</p>`
          : `<section class="kit-empty"><p>${t("sch.none")}</p><a class="btn btn-primary" href="#invite">${icon("plus")}${t("invite")}</a></section>`
      }`;
  }

  // ---------- The page ----------

  function render() {
    document.title = t("doc.title");
    const body = state.tab === "invites" ? invitesHTML() : state.tab === "schedule" ? scheduleHTML() : membersHTML();
    $("view").innerHTML = `<div class="kit">${headHTML()}${tabsHTML()}<div id="tab">${body}</div><p class="kit-sample">${t("sample")}</p></div>`;
  }

  function renderResults() {
    const at = document.activeElement?.id;
    const pos = at === "q" ? $("q").selectionStart : null;
    render();
    if (at && $(at)) {
      $(at).focus();
      if (pos != null) $(at).setSelectionRange(pos, pos);
    }
  }

  // ---------- A person, on the stage ----------

  function peekHTML(m) {
    const res = linkedTo(m);
    const free = people().filter((r) => !memberOf(r) || !member(memberOf(r)));
    const person = res.find((r) => r.type === "people");
    const sched = person ? scheduleOf(person) : null;
    const offs = res.flatMap((r) => offOf(r).map((s) => ({ ...s, res: r })));
    const first = m.name.split(" ").pop();
    const roleSec = m.role === "OWNER"
      ? `<p class="role-tag is-big">${roleName("OWNER")}</p><p class="peek-lede">${t(m.you ? "p.self" : "p.role.owner")}</p>`
      : `<div class="field"><select class="input" id="p-role" aria-label="${t("p.role")}">${GIVEN.map((r) => `<option value="${r}" ${m.role === r ? "selected" : ""}>${roleName(r)}</option>`).join("")}</select></div>
         <ul class="can-list">${[1, 2, 3].map((n) => `<li class="${n === 3 ? "is-no" : ""}">${icon(n === 3 ? "x" : "check")}${t(`can.${m.role}.${n}`)}</li>`).join("")}</ul>`;
    return `
      <header class="sheet-head peek-head">
        <div class="who is-big">${face(m, codeOf(m))}<span><h2 id="peek-title">${esc(m.name)}</h2><small>${esc(m.email)} · ${t("since", { date: short(m.since) })}</small></span></div>
        <div class="pane-tools">
          ${PBM.stage.toggle()}
          <button class="icon-btn" type="button" data-close aria-label="${t("close")}" title="${t("close")}">${icon("x")}</button>
        </div>
      </header>
      <div class="peek-body">
        <section class="peek-sec"><h3>${t("p.role")}</h3>${roleSec}</section>

        <section class="peek-sec">
          <h3>${t("p.res")}</h3>
          <p class="peek-lede">${t("p.res.lede", { name: esc(first) })}</p>
          ${
            res.length
              ? `<ul class="linked">${res
                  .map(
                    (r, i) =>
                      `<li><span><i class="code-dot code-${r.code}"></i><a href="/dashboard/resources#r/${r.id}">${esc(r.name)}</a><small>${esc(PBM_SAMPLE.BRANCHES.find((b) => b.id === r.branch)?.name || "")}</small></span>${i === 0 ? `<span class="tag-later">${t("p.res.main")}</span>` : ""}<button class="btn btn-quiet btn-small" type="button" data-unlink="${r.id}">${t("p.res.unlink")}</button></li>`
                  )
                  .join("")}</ul>`
              : `<p class="peek-lede">${t("p.res.none", { name: esc(first) })}</p>`
          }
          ${
            free.length
              ? `<div class="link-add"><select class="input" id="p-link" aria-label="${t("p.res.pick")}"><option value="">${t("p.res.pick")}</option>${free.map((r) => `<option value="${r.id}">${esc(r.name)}</option>`).join("")}</select><button class="btn btn-quiet" type="button" data-link>${icon("plus")}${t("p.res.add")}</button></div>`
              : `<p class="peek-lede">${t("p.res.free")}</p>`
          }
        </section>

        ${
          person
            ? `<section class="peek-sec">
                <h3>${t("p.hours")}</h3>
                <div class="sec-line"><span><strong>${sched ? esc(sched.title) : t("hours.shop")}</strong><small>${sched ? t("p.hours.days", { n: sched.days.filter((d) => d.enabled).length }) + " · " + esc(sched.timezone) : ""}</small></span><a class="btn btn-quiet btn-small" href="/dashboard/availability">${t("p.hours.edit")}</a></div>
              </section>
              <section class="peek-sec">
                <h3>${t("p.off")}</h3>
                ${
                  offs.length
                    ? `<ul class="offs">${offs.map((o) => `<li><strong>${short(o.from)} – ${short(o.to)}${o.reason ? " · " + esc(o.reason) : ""}</strong><small>${t("p.off.res", { res: esc(o.res.name) })}</small></li>`).join("")}</ul>`
                    : `<p class="peek-lede">${t("p.off.none")}</p>`
                }
                <a class="btn btn-quiet btn-small" href="/dashboard/resources#r/${person.id}">${icon("plus")}${t("p.off.add")}</a>
              </section>
              <section class="peek-sec">
                <h3>${t("p.book")}</h3>
                <p class="peek-lede">${t("p.book.lede", { name: esc(first) })}</p>
                <a class="btn btn-quiet btn-small" href="/dashboard/bookings">${icon("plus")}${t("p.book.btn", { name: esc(first) })}</a>
              </section>`
            : ""
        }

        ${
          m.role === "OWNER"
            ? ""
            : `<section class="peek-sec">
                <h3>${t("p.leave")}</h3>
                <p class="peek-lede">${t("p.leave.lede")}</p>
                <button class="btn btn-quiet btn-danger ${state.sure ? "is-sure" : ""}" type="button" data-leave>${t(state.sure ? "p.leave.sure" : "p.leave.btn")}</button>
              </section>`
        }
      </div>`;
  }

  function renderPeek() {
    const el = $("peek");
    const m = state.open && member(state.open);
    el.hidden = !m;
    if (m) {
      const scroll = el.querySelector(".peek-body")?.scrollTop || 0;
      el.innerHTML = peekHTML(m);
      el.querySelector(".peek-body").scrollTop = scroll;
    } else el.innerHTML = "";
    PBM.stage.sync();
  }

  // ---------- The invite form, on the stage ----------

  function blankInvite() {
    return { emails: "", role: "STAFF", link: "" };
  }

  function parseEmails(text) {
    return text
      .split(/[,;\s]+/)
      .map((s) => s.trim())
      .filter(Boolean);
  }

  function inviteHTML() {
    const d = state.inviteDraft;
    const free = people().filter((r) => !memberOf(r) || !member(memberOf(r)));
    const n = parseEmails(d.emails).length;
    const err = state.errors.emails;
    return `
      <header class="sheet-head peek-head">
        <div><h2 id="invite-title">${t("i.title")}</h2></div>
        <div class="pane-tools">
          ${PBM.stage.toggle()}
          <button class="icon-btn" type="button" data-close aria-label="${t("close")}" title="${t("close")}">${icon("x")}</button>
        </div>
      </header>
      <form class="peek-body" id="invite-form" novalidate>
        <section class="peek-sec">
          <p class="peek-lede first">${t("i.lede")}</p>
          <div class="field">
            <label for="i-emails">${t("i.emails")}</label>
            <textarea class="input" id="i-emails" rows="3" placeholder="${t("i.emails.ph")}" ${err ? 'aria-invalid="true" aria-describedby="i-err"' : ""}>${esc(d.emails)}</textarea>
            <small>${t("i.emails.hint")}</small>
            ${err ? `<span class="error" id="i-err">${err}</span>` : ""}
          </div>
        </section>
        <section class="peek-sec">
          <h3>${t("i.role")}</h3>
          <div class="chips" role="radiogroup" aria-label="${t("i.role")}">
            ${GIVEN.map((r) => `<label class="chip-pick is-plain"><input type="radio" name="i-role" value="${r}" ${d.role === r ? "checked" : ""} class="visually-hidden" /><span>${roleName(r)}</span></label>`).join("")}
          </div>
          <div class="can-box">
            <strong>${t("i.can", { role: roleName(d.role) })}</strong>
            <ul class="can-list">${[1, 2, 3].map((k) => `<li class="${k === 3 ? "is-no" : ""}">${icon(k === 3 ? "x" : "check")}${t(`can.${d.role}.${k}`)}</li>`).join("")}</ul>
          </div>
          <p class="peek-lede">${t("i.owner")}</p>
        </section>
        <section class="peek-sec">
          <div class="field">
            <label for="i-link">${t("i.link")}</label>
            <select class="input" id="i-link"><option value="">${t("i.nolink")}</option>${free.map((r) => `<option value="${r.id}" ${d.link === r.id ? "selected" : ""}>${esc(r.name)}</option>`).join("")}</select>
          </div>
        </section>
      </form>
      <footer class="sheet-actions peek-actions">
        <span class="spacer"></span>
        <a class="btn btn-quiet" href="#${state.tab}">${t("i.cancel")}</a>
        <button class="btn btn-primary" type="submit" form="invite-form">${icon("send")}${n > 1 ? t("i.send", { n }) : t("i.send1")}</button>
      </footer>`;
  }

  function renderInvite() {
    const el = $("invite");
    el.hidden = !state.inviteDraft;
    el.innerHTML = state.inviteDraft ? inviteHTML() : "";
    PBM.stage.sync();
  }

  // ---------- Routing ----------

  function route() {
    const h = decodeURIComponent(location.hash.slice(1));
    const peek = /^m\/(.+)$/.exec(h);
    if (["members", "invites", "schedule"].includes(h)) state.tab = h;
    state.sure = false;
    state.errors = {};
    state.open = peek && member(peek[1]) ? peek[1] : null;
    if (h === "invite") state.inviteDraft ||= blankInvite();
    else state.inviteDraft = null;
    render();
    renderPeek();
    renderInvite();
    if (h === "invite") $("i-emails")?.focus();
  }

  const back = () => {
    location.hash = state.tab;
  };

  // ---------- Events ----------

  document.addEventListener("click", (event) => {
    const at = (sel) => event.target.closest(sel);
    if (at("[data-join]")) {
      navigator.clipboard?.writeText("https://pleasebookme.app/join/" + (S.SHOP.slug || "tiem-toc-mau")).catch(() => {});
      return toast(t("share.done"));
    }
    const row = at("tr[data-open]");
    if (row) return (location.hash = "m/" + row.dataset.open);
    if (at("[data-close]")) return back();
    const day = at("[data-day]");
    if (day) {
      state.day = Number(day.dataset.day) === 0 ? 0 : state.day + Number(day.dataset.day);
      return render();
    }
    const resend = at("[data-resend]");
    if (resend) {
      const i = team.invites.find((x) => x.id === resend.dataset.resend);
      i.sent = dayISO(0);
      i.expires = dayISO(7);
      save();
      render();
      return toast(t("inv.resent", { email: i.email }));
    }
    const revoke = at("[data-revoke]");
    if (revoke) {
      const i = team.invites.find((x) => x.id === revoke.dataset.revoke);
      team.invites = team.invites.filter((x) => x !== i);
      save();
      render();
      return toast(t("inv.revoked", { email: i.email }));
    }
    const ok = at("[data-approve]");
    if (ok) {
      const q = team.requests.find((x) => x.id === ok.dataset.approve);
      team.requests = team.requests.filter((x) => x !== q);
      team.members.push({ id: PBM.store.newId("m", team.members.map((m) => m.id)), name: q.name, email: q.email, role: q.role, since: dayISO(0) });
      save();
      render();
      return toast(t("req.ok", { name: q.name, role: roleName(q.role) }));
    }
    const no = at("[data-decline]");
    if (no) {
      const q = team.requests.find((x) => x.id === no.dataset.decline);
      team.requests = team.requests.filter((x) => x !== q);
      save();
      render();
      return toast(t("req.no", { name: q.name }));
    }

    const m = state.open && member(state.open);
    if (m && at("[data-unlink]")) {
      const r = RESOURCES.find((x) => x.id === at("[data-unlink]").dataset.unlink);
      r.member = "";
      PBM.store.save("resources");
      renderPeek();
      render();
      return toast(t("p.res.unlinked", { res: r.name }));
    }
    if (m && at("[data-link]")) {
      const id = $("p-link").value;
      if (!id) return $("p-link").focus();
      const r = RESOURCES.find((x) => x.id === id);
      r.member = m.id;
      PBM.store.save("resources");
      renderPeek();
      render();
      return toast(t("p.res.linked", { res: r.name, name: m.name }));
    }
    if (m && at("[data-leave]")) {
      if (!state.sure) {
        state.sure = true;
        return renderPeek();
      }
      linkedTo(m).forEach((r) => (r.member = ""));
      PBM.store.save("resources");
      team.members = team.members.filter((x) => x !== m);
      save();
      toast(t("p.left", { name: m.name }));
      return back();
    }
  });

  document.addEventListener("keydown", (event) => {
    const row = event.target.closest?.("tr[data-open]");
    if (row && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      location.hash = "m/" + row.dataset.open;
    }
    if (event.key === "Escape" && (state.open || state.inviteDraft)) back();
  });

  document.addEventListener("input", (event) => {
    if (event.target.id === "q") {
      state.q = event.target.value;
      renderResults();
    }
    if (event.target.id === "i-emails") {
      state.inviteDraft.emails = event.target.value;
      const n = parseEmails(event.target.value).length;
      const send = $("invite").querySelector('button[type="submit"]');
      if (send) send.lastChild.textContent = n > 1 ? t("i.send", { n }) : t("i.send1");
    }
  });

  document.addEventListener("change", (event) => {
    const el = event.target;
    if (el.id === "role") {
      state.role = el.value;
      return render();
    }
    if (el.dataset?.reqRole) {
      team.requests.find((q) => q.id === el.dataset.reqRole).role = el.value;
      return save();
    }
    if (el.id === "p-role") {
      const m = member(state.open);
      m.role = el.value;
      save();
      render();
      renderPeek();
      return toast(t("p.roleSet", { name: m.name, role: roleName(m.role) }));
    }
    if (el.name === "i-role") {
      state.inviteDraft.role = el.value;
      return renderInvite();
    }
    if (el.id === "i-link") state.inviteDraft.link = el.value;
  });

  document.addEventListener("submit", (event) => {
    if (event.target.id === "filters") return event.preventDefault();
    if (event.target.id !== "invite-form") return;
    event.preventDefault();
    const d = state.inviteDraft;
    const emails = parseEmails(d.emails);
    const bad = emails.find((e) => !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e));
    state.errors.emails = !emails.length ? t("i.emails.empty") : bad ? t("i.emails.bad", { email: esc(bad) }) : "";
    if (state.errors.emails) {
      renderInvite();
      return $("i-emails").focus();
    }
    emails.forEach((email, k) =>
      team.invites.unshift({
        id: PBM.store.newId("i", team.invites.map((i) => i.id)),
        email,
        role: d.role,
        link: k === 0 ? d.link : "",
        by: "m0",
        sent: dayISO(0),
        expires: dayISO(7),
      })
    );
    save();
    state.inviteDraft = null;
    toast(t("i.sent", { n: emails.length }));
    location.hash = "invites";
  });

  window.addEventListener("hashchange", route);
  PBM.branches?.onChange?.(render);
  PBM.onChange(() => {
    render();
    renderPeek();
    renderInvite();
  });
  PBM.mount("teams");
  route();
})();
