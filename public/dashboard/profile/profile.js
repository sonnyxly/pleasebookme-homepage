/* Hồ sơ tiệm: what customers see about the shop at the top of the booking page.

   On the server the shop is an organization with a name, a slug, a logo, a
   banner, a few words and a timezone. It has no address and no phone number
   yet, and no way to upload a picture; both are new asks. For a shop with
   branches, the address and hours of each branch live on the branch (a
   resource), and this page holds what is true for the whole shop.

   The link is shown but not editable: it is frozen once the shop exists, so
   links already sent to customers keep working. */
(function () {
  "use strict";

  const { t, icon, toast } = PBM;

  PBM.addStrings({
    vi: {
      "doc.title": "Hồ sơ tiệm | pleasebookme",
      "page.title": "Hồ sơ tiệm",
      save: "Lưu hồ sơ",
      saved: "Đã lưu hồ sơ tiệm",
      about: "Về tiệm",
      logo: "Logo",
      "logo.pick": "Chọn ảnh",
      "logo.hint": "Ảnh vuông, hiện bên cạnh tên tiệm.",
      name: "Tên tiệm",
      "name.error": "Hãy nhập tên tiệm.",
      bio: "Giới thiệu ngắn",
      "bio.ph": "Một hai câu về tiệm",
      link: "Link đặt lịch",
      "link.hint": "Link không đổi được sau khi tạo, để những link đã gửi cho khách vẫn dùng được.",
      copy: "Sao chép",
      copied: "Đã sao chép link đặt lịch",
      contact: "Liên hệ",
      address: "Địa chỉ",
      "address.hint": "Tiệm có nhiều chi nhánh thì đặt địa chỉ riêng cho từng chi nhánh trong Tài nguyên.",
      phone: "Số điện thoại",
      "phone.hint": "Khách gọi số này khi đã quá hạn đổi hoặc huỷ lịch trên mạng.",
      zone: "Múi giờ",
      seen: "Khách thấy",
      "seen.none": "Chưa có",
      note: "Dữ liệu mẫu. Đây là bản thiết kế, chưa nối với hệ thống.",
    },
    en: {
      "doc.title": "Shop profile | pleasebookme",
      "page.title": "Shop profile",
      save: "Save profile",
      saved: "Shop profile saved",
      about: "About the shop",
      logo: "Logo",
      "logo.pick": "Choose a picture",
      "logo.hint": "A square picture, shown beside the shop's name.",
      name: "Shop name",
      "name.error": "Enter the shop's name.",
      bio: "A few words",
      "bio.ph": "One or two sentences about the shop",
      link: "Booking link",
      "link.hint": "The link cannot change once created, so links already sent to customers keep working.",
      copy: "Copy",
      copied: "Booking link copied",
      contact: "Contact",
      address: "Address",
      "address.hint": "A shop with several branches sets each branch's address in Resources.",
      phone: "Phone number",
      "phone.hint": "Customers call this number once it is too late to change or cancel online.",
      zone: "Timezone",
      seen: "What customers see",
      "seen.none": "Not set",
      note: "Sample data. This is a design mockup, not connected to the system.",
    },
  });

  const { SHOP, BRANCHES } = PBM_SAMPLE;

  const draft = {
    name: t("org.name"),
    bio: "Cắt tóc nam, cạo mặt và uốn nhuộm. Đặt trước để không phải chờ.",
    address: BRANCHES[0]?.address || "",
    phone: SHOP.phone,
    timezone: "Asia/Saigon",
    logo: "",
    tried: false,
  };

  const $ = (id) => document.getElementById(id);
  const esc = (text) => String(text).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  const link = `pleasebookme.app/booking/${SHOP.slug}`;
  const zones = () => {
    try {
      const list = Intl.supportedValuesOf("timeZone");
      return list.includes(draft.timezone) ? list : [draft.timezone, ...list];
    } catch {
      return [draft.timezone, "UTC"];
    }
  };
  const logoStyle = () => (draft.logo ? ` has-image" style="background-image:url('${draft.logo}')` : "");

  function seenHTML() {
    const line = (glyph, value) =>
      `<div>${icon(glyph)}<dd class="${value ? "" : "seen-empty"}">${esc(value || t("seen.none"))}</dd></div>`;
    return `
      <div class="seen-head"><span class="logo${logoStyle()}" aria-hidden="true">${icon("scissors")}</span><strong>${esc(draft.name || t("name"))}</strong></div>
      ${draft.bio ? `<p>${esc(draft.bio)}</p>` : ""}
      <dl>${line("pin", draft.address)}${line("phone", draft.phone)}</dl>`;
  }

  function render() {
    document.title = t("doc.title");
    const noName = draft.tried && !draft.name.trim();
    $("view").innerHTML = `
      <header class="head">
        <h1>${t("page.title")}</h1>
        <button class="btn btn-primary" type="submit" form="form">${t("save")}</button>
      </header>
      <form class="form" id="form" novalidate>
        <div class="form-main">
          <section class="panel card" aria-labelledby="about-title">
            <h2 id="about-title">${t("about")}</h2>
            <div class="field">
              <span class="label">${t("logo")}</span>
              <div class="logo-row">
                <span class="logo${logoStyle()}" id="logo" aria-hidden="true">${icon("scissors")}</span>
                <div>
                  <label class="btn btn-quiet btn-small">${icon("image")}${t("logo.pick")}<input class="visually-hidden" type="file" id="logo-file" accept="image/*" /></label>
                  <small>${t("logo.hint")}</small>
                </div>
              </div>
            </div>
            <div class="field">
              <label for="p-name">${t("name")}</label>
              <input class="input" id="p-name" data-k="name" maxlength="255" value="${esc(draft.name)}" autocomplete="organization" ${noName ? 'aria-invalid="true"' : ""} />
              <span class="error" ${noName ? "" : "hidden"}>${t("name.error")}</span>
            </div>
            <div class="field">
              <label for="p-bio">${t("bio")}</label>
              <textarea class="input area" id="p-bio" data-k="bio" rows="3" placeholder="${t("bio.ph")}">${esc(draft.bio)}</textarea>
            </div>
            <div class="field">
              <span class="label">${t("link")}</span>
              <div class="link-row"><code>${link}</code><button class="btn btn-quiet btn-small" type="button" data-copy>${icon("copy")}${t("copy")}</button></div>
              <small>${t("link.hint")}</small>
            </div>
          </section>
          <section class="panel card" aria-labelledby="contact-title">
            <h2 id="contact-title">${t("contact")}</h2>
            <div class="field">
              <label for="p-address">${t("address")}</label>
              <input class="input" id="p-address" data-k="address" value="${esc(draft.address)}" autocomplete="street-address" />
              ${BRANCHES.length > 1 ? `<small>${t("address.hint")}</small>` : ""}
            </div>
            <div class="field-pair">
              <div class="field">
                <label for="p-phone">${t("phone")}</label>
                <input class="input" id="p-phone" data-k="phone" value="${esc(draft.phone)}" inputmode="tel" autocomplete="tel" />
                <small>${t("phone.hint")}</small>
              </div>
              <div class="field">
                <label for="p-zone">${t("zone")}</label>
                <select class="input" id="p-zone" data-k="timezone">${zones()
                  .map((zone) => `<option ${zone === draft.timezone ? "selected" : ""}>${esc(zone)}</option>`)
                  .join("")}</select>
              </div>
            </div>
          </section>
        </div>
        <aside class="seen" aria-labelledby="seen-title">
          <section class="panel card">
            <h2 id="seen-title">${t("seen")}</h2>
            <div class="seen-card" id="seen">${seenHTML()}</div>
          </section>
        </aside>
      </form>
      <p class="note">${t("note")}</p>`;
  }

  const view = $("view");

  view.addEventListener("input", (event) => {
    const key = event.target.dataset.k;
    if (!key) return;
    draft[key] = event.target.value;
    $("seen").innerHTML = seenHTML();
  });

  view.addEventListener("change", (event) => {
    if (event.target.id !== "logo-file" || !event.target.files[0]) return;
    draft.logo = URL.createObjectURL(event.target.files[0]);
    render();
  });

  view.addEventListener("click", (event) => {
    if (!event.target.closest("[data-copy]")) return;
    navigator.clipboard?.writeText("https://" + link).catch(() => {});
    toast(t("copied"));
  });

  view.addEventListener("submit", (event) => {
    event.preventDefault();
    draft.tried = true;
    if (!draft.name.trim()) {
      render();
      return $("p-name").focus();
    }
    toast(t("saved"));
  });

  PBM.onChange(render);
  PBM.mount("profile");
  render();
})();
