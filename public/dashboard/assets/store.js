/* Keeps what you make while trying the mockup.

   The mockups have no server: every page builds the sample shop from
   sample.js when it loads, so anything added or changed used to vanish on the
   next page or a reload. This file stands in for the database. It loads after
   sample.js and puts back what was saved in this browser, and each page calls
   PBM.store.save() right after a change. Nothing leaves the browser: on the
   live copy every visitor has a shop of their own, until "Reset sample shop"
   in Settings clears it.

   Pages keep the sample's lists from the moment they load
   (const { RESOURCES } = PBM_SAMPLE), so everything is put back in place,
   never swapped for a new list. */
(function () {
  "use strict";

  const KEY = "pbm-shop";
  // Raise this when the shape of the sample changes, so a shop saved by older
  // pages is dropped rather than half read.
  const VERSION = 1;
  const S = window.PBM_SAMPLE;

  // What is kept. BRANCHES and STAFF are not: both are rebuilt from RESOURCES,
  // which is where a branch or a person is made.
  const LISTS = ["SERVICE_ORDER", "SCHEDULES", "RESOURCE_TYPES", "RESOURCES", "WIDGETS", "CLOSURES", "BOOKINGS", "CUSTOMERS"];
  const MAPS = ["SHOP", "SERVICES"];

  PBM.addStrings({
    vi: { "store.full": "Trình duyệt đã hết chỗ lưu. Thay đổi này chỉ còn đến khi bạn rời trang." },
    en: { "store.full": "This browser has run out of room. This change lasts until you leave the page." },
  });

  function readSaved() {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY));
      // A shop saved while the busy sample was on is no use to the empty one, and back.
      return saved && saved.v === VERSION && saved.setup === S.WITH_SETUP ? saved : null;
    } catch {
      return null;
    }
  }

  function has() {
    try {
      return localStorage.getItem(KEY) !== null;
    } catch {
      return false;
    }
  }

  function reset() {
    try {
      localStorage.removeItem(KEY);
      localStorage.removeItem("pbm-widget-window"); // the widget window's copy of an unsaved draft
    } catch {
      /* nothing was kept, so there is nothing to clear */
    }
  }

  // Settings has no sample shop of its own; it only needs to clear one.
  if (!S) {
    PBM.store = { has, reset };
    return;
  }

  // ---------- People: one person, two names ----------

  // A person is a resource of type "people". Bookings and services point at
  // them by a number instead (STAFF), so each person keeps that number on the
  // resource. The sample's p1 to p5 keep 1 to 5.
  function number() {
    const people = S.RESOURCES.filter((r) => r.type === "people");
    const taken = new Set(people.map((r) => r.staffId).filter((n) => n != null));
    people.forEach((r) => {
      if (r.staffId != null) return;
      const own = /^p(\d+)$/.exec(r.id);
      r.staffId = own && !taken.has(Number(own[1])) ? Number(own[1]) : Math.max(0, ...taken) + 1;
      taken.add(r.staffId);
    });
    return people;
  }

  // Who does which service is written on both sides: a service lists its
  // staff, a person lists the services they do. The page that made the change
  // says which side is right, and the other side follows.
  function link(from, people) {
    if (from === "resources") {
      S.SERVICE_ORDER.forEach((id) => {
        const s = S.SERVICES[id];
        const does = (r) => (r.does || []).includes(id);
        const kept = (s.staff || []).filter((n) => {
          const r = people.find((p) => p.staffId === n);
          return !r || does(r);
        });
        people.filter(does).forEach((r) => kept.includes(r.staffId) || kept.push(r.staffId));
        s.staff = kept;
      });
    }
    if (from === "services") {
      people.forEach((r) => {
        r.does = S.SERVICE_ORDER.filter((id) => (S.SERVICES[id].staff || []).includes(r.staffId));
      });
    }
  }

  // STAFF is everyone who takes bookings: the active people, and anyone a
  // booking or a service still points at, so nothing that names them breaks.
  function rebuild(people) {
    const named = new Set(S.BOOKINGS.map((b) => b.staff));
    S.SERVICE_ORDER.forEach((id) => (S.SERVICES[id].staff || []).forEach((n) => named.add(n)));
    const staff = people
      .filter((r) => r.status === "ACTIVE" || named.has(r.staffId))
      .map((r) => ({ id: r.staffId, name: r.name, branch: r.branch, note: r.description, code: r.code }));
    S.STAFF.splice(0, S.STAFF.length, ...staff);
    S.BRANCHES.splice(0, S.BRANCHES.length, ...S.RESOURCES.filter((r) => r.type === "branches"));
  }

  // ---------- Putting a saved shop back ----------

  let seq = 0;

  function apply(saved) {
    const shop = saved.shop;
    LISTS.forEach((name) => S[name].splice(0, S[name].length, ...(shop[name] || [])));
    MAPS.forEach((name) => {
      Object.keys(S[name]).forEach((key) => delete S[name][key]);
      Object.assign(S[name], shop[name]);
    });
    seq = Math.max(seq, saved.seq || 0);
    rebuild(number());
  }

  const first = readSaved();
  if (first) apply(first);

  // ---------- Saving ----------

  // `from` names the page that changed something ("resources", "services"),
  // for the one fact both of them write.
  function save(from) {
    const people = number();
    link(from, people);
    rebuild(people);
    // The shop's main booking link comes with its first service (the empty
    // Widgets page says so). It cannot be deleted, only changed.
    if (S.widget && S.SERVICE_ORDER.length && !S.WIDGETS.length) {
      S.WIDGETS.push(
        S.widget({
          id: "main",
          isDefault: true,
          name: "Trang đặt lịch chính",
          path: "",
          code: 1,
          look: { accent: "burgundy", theme: "light", lang: "both", logo: true, greeting: "" },
        })
      );
    }
    const shop = {};
    [...LISTS, ...MAPS].forEach((name) => (shop[name] = S[name]));
    try {
      localStorage.setItem(KEY, JSON.stringify({ v: VERSION, setup: S.WITH_SETUP, seq, at: Date.now(), shop }));
    } catch {
      PBM.toast(PBM.t("store.full"));
    }
  }

  // Something new joins every widget that takes new ones by itself: the
  // widget's "Add new services (staff, places…) automatically". `list` is
  // "services" or a resource type's id. The page saves afterwards.
  function joined(list, id) {
    S.WIDGETS.forEach((w) => {
      const own = w[list];
      if (own && own.auto && !own.ids.includes(id)) own.ids.push(id);
    });
  }

  // A new id that no page has used, now or before a reload. Counters that
  // start again at 1 on every load would hand out an id already saved.
  function newId(prefix, taken = []) {
    let id;
    do id = prefix + ++seq;
    while (taken.includes(id));
    return id;
  }

  function newNumber(taken = []) {
    let n;
    do n = 100 + ++seq;
    while (taken.includes(n));
    return n;
  }

  // A picture a page was given, made small enough to keep: the longest side at
  // most `size` pixels, as a JPEG. Resolves to a data: address.
  function picture(file, size) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        const scale = Math.min(1, size / Math.max(img.naturalWidth, img.naturalHeight));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.naturalWidth * scale);
        canvas.height = Math.round(img.naturalHeight * scale);
        canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
        URL.revokeObjectURL(url);
        resolve(canvas.toDataURL("image/jpeg", 0.82));
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error("not a picture"));
      };
      img.src = url;
    });
  }

  // Another tab saved: take its shop, so this tab's next save adds to it
  // instead of writing over it. A reset elsewhere starts this tab again too.
  addEventListener("storage", (event) => {
    if (event.key !== KEY && event.key !== null) return;
    if (event.newValue === null) return location.reload();
    const saved = readSaved();
    if (saved) apply(saved);
  });

  PBM.store = { save, has, reset, newId, newNumber, picture, joined };
})();
