// English copy. Copy follows the brand brief: plain, calm, specific, "we" and
// "you". Two customer words stay Vietnamese on purpose: chắc chắn (the slot
// holds) and hoàn chỉnh (the booking arrives whole). No testimonials, no counts,
// no claims about customers: there are none to claim yet.
//
// The Vietnamese dictionary (vi.ts) is typed as `Dict`, so TypeScript fails the
// build if it is missing a key that exists here.

export const en = {
  htmlLang: "en",
  ogLocale: "en_US",
  paths: { home: "/", privacy: "/privacy", terms: "/terms" },

  meta: {
    homeTitle: "pleasebookme: booking for barbershops and PMU studios",
    homeDescription:
      "Booking for barbershops, PMU studios and small shops in Vietnam. Customers pick a time or just ask. The slot holds, and you see your day.",
    privacyTitle: "Privacy Policy",
    privacyDescription:
      "What pleasebookme collects, why, who sees it, how long we keep it, and how to use your rights.",
    termsTitle: "Terms of Service",
    termsDescription:
      "The terms for using pleasebookme: what the service is, what we each owe the other, and how to leave.",
  },

  chrome: {
    homeAria: "pleasebookme, home",
    navLabel: "Sections",
    nav: [
      { id: "assistant", label: "Assistant" },
      { id: "in-use", label: "On your site" },
      { id: "dashboard", label: "Dashboard" },
      { id: "questions", label: "Questions" },
    ],
    cta: "Get early access",
    switchTo: { label: "Tiếng Việt", short: "VI", aria: "Đọc bằng tiếng Việt", lang: "vi" },
    footer: {
      made: "pleasebookme. Made in Vietnam.",
      nav: "Footer",
      privacy: "Privacy",
      terms: "Terms",
    },
  },

  legal: { updatedLabel: "Last updated", updated: "9 October 2026" },

  home: {
    hero: {
      eyebrow: "Đặt lịch, chắc chắn.",
      // Headline: plain lines, then one highlighted line (floating, italic).
      h1Lines: ["Book quick.", "Book now."],
      h1Key: "Book me.",
      body: "pleasebookme is a booking widget for barbershops, PMU studios and other small shops in Vietnam. A customer picks a service and a free time, or just asks. The slot holds, you see your day, and you stop answering the same questions in chat.",
      cta: "Get early access",
      demoNote: "Try the demo. Nothing you tap is sent.",
    },
    problem: {
      h2: "Booking by chat takes five messages.",
      body: "One haircut, fixed over Zalo or Messenger, one message at a time, while your hands are busy. Miss a single reply and the customer is gone. With a booking page it is one choice and one tap.",
    },
    assistant: {
      eyebrow: "Customer assistant",
      pill: "In development",
      h2: "Customers can just ask.",
      body: "Most customers already book by chatting. The pleasebookme assistant takes that chat. It reads the question in Vietnamese, checks your real availability, holds the slot and books it, so you are not the one typing.",
      points: [
        {
          title: "It never guesses.",
          text: "Every time it offers comes from your real schedule, through our booking system.",
        },
        {
          title: "It says what it is.",
          text: "Customers always know they are talking to an assistant.",
        },
        {
          title: "You see every booking.",
          text: "What it books appears on your schedule like any other.",
        },
      ],
      caption:
        "Sample conversation. The assistant is in development, and this is how we are building it to work.",
    },
    whole: {
      h2: "Whole from the first tap.",
      body: "Many booking tools give every service its own form. A customer who wants a haircut and a beard trim books twice and hopes the two times line up. pleasebookme puts the services and the time in one form, so a booking stays whole from the first tap to the chair.",
      promises: [
        {
          word: "Chắc chắn",
          line: "It holds.",
          body: "When a customer books, the slot is held for them and gone from everyone else's list.",
        },
        {
          word: "Hoàn chỉnh",
          line: "It's whole.",
          body: "A booking carries everything it needs in one pass: the services, the length, the time. Nothing is left for you to chase.",
        },
      ],
    },
    inUse: {
      eyebrow: "On your website",
      h2: "It sits on the website you already have.",
      body: "Customers book without leaving your page. They pick a service and a time, and the times that are taken are already crossed out.",
      points: [
        {
          title: "Your services, your lengths.",
          text: "A haircut, a beard trim and a shave each hold the time they need.",
        },
        { title: "One form, one pass.", text: "No separate page for each service." },
        {
          title: "A small mark in the corner.",
          text: "So customers know whose booking page they are on.",
        },
      ],
      caption: "Sample data. An illustration of the widget, not a screenshot.",
    },
    dashboard: {
      eyebrow: "For the owner",
      h2: "Your day, on one screen.",
      body: "Every booking lands on your schedule and takes the room its service needs: a short block for a haircut, a longer one for a beard trim. A taken slot is already gone from your customers' list, so you stop confirming in chat.",
      caption:
        "Sample data. An illustration of the dashboard while we finish building it.",
    },
    menu: {
      eyebrow: "Setting up",
      pill: "In development",
      h2: "Photograph your menu. We draft your services.",
      body: "Setting up should not mean typing out a price list. Take a photo of the menu you already have, and pleasebookme reads the names and prices into a draft list of services. You check every line and set how long each one takes. Nothing goes live until you say so.",
      caption: "Sample menu and prices. Reading menu photos is in development.",
    },
    steps: {
      h2: "Three steps. Only one is yours.",
      items: [
        {
          title: "Set up your shop",
          body: "Add your services, how long each takes and your opening hours, or photograph your menu and check our draft. The first time, we do it with you.",
        },
        {
          title: "Customers pick a time",
          body: "They choose a service and a free slot, or just ask the assistant. Taken slots are already crossed out.",
        },
        {
          title: "You see your day",
          body: "Each booking lands on your schedule. No back-and-forth to confirm it.",
        },
      ],
    },
    shops: {
      barber: {
        title: "Barbershops",
        body: "Short appointments, many a day. A full chair shows as full, so nobody has to ask twice.",
      },
      pmu: {
        title: "PMU studios",
        body: "Long sessions that need the right amount of time held. Every service has its own length, and the calendar respects it.",
      },
    },
    story: {
      h2: "We started with one barbershop's website.",
      p1: "In April we built a website for a barbershop in Hanoi, with booking added on. Booking was the part that kept breaking. We tried stitching Calendly and Google Sheets together, then decided to stop patching other people's tools and build our own booking engine.",
      p2: "We are two co-founders in Hanoi. One of us builds the product, the other looks after design, research and operations. We are early, and we would rather say so than pretend.",
    },
    questions: {
      h2: "Questions we expect.",
      sub: "Something missing? Write to us and we will answer plainly.",
      items: [
        {
          q: "Is it ready?",
          a: "Not finished. pleasebookme is in early access: we set up a small number of shops with you and fix what breaks. You will see the real product before you decide anything.",
        },
        {
          q: "What does it cost?",
          a: "Early access is free. If we introduce fees, we will tell you at least 30 days before they apply, with the price, and you can stop without paying.",
        },
        {
          q: "What do I need to start?",
          a: "Your list of services, how long each one takes, and your opening hours. That is the whole setup, and we do it with you the first time.",
        },
        {
          q: "Does the assistant make mistakes?",
          a: "It can, which is why it never guesses. It checks your real availability through our booking system before it offers a time, and a booking only counts once the system confirms it. Everything it books shows up on your schedule.",
        },
        {
          q: "Will it read my menu photo correctly?",
          a: "Often, but not always: handwriting and small print are hard. That is why you check every line, and set how long each service takes, before anything goes live.",
        },
        {
          q: "Who sees my customers' details?",
          a: "You do. We handle them for you, only to run the booking, and we do not sell them. The Privacy Policy has the details.",
        },
      ],
    },
    contact: {
      h2: "Want it for your shop?",
      body: "We are working with a small number of shops first, and we set up each one with you. Tell us what you do and which days are busiest. You can write in Vietnamese or English.",
      cta: "Get early access",
    },
  },

  demo: {
    title: "Book a visit",
    subtitle: "Sample barbershop, live demo",
    serviceLegend: "Service",
    dayLegend: "Day",
    timeLegend: "Time",
    minUnit: "min",
    services: [
      { id: "cut", name: "Haircut", minutes: 30 },
      { id: "cut-beard", name: "Haircut and beard", minutes: 45 },
      { id: "shave", name: "Shave", minutes: 20 },
    ],
    days: [
      { id: "today", label: "Today" },
      { id: "tomorrow", label: "Tomorrow" },
      { id: "in2", label: "In 2 days" },
    ],
    confirm: "Confirm {day}, {time}",
    choose: "Choose a time",
    booked: "Booked",
    result:
      "{service}, {minutes} min. The slot is now held for this customer and gone from everyone else's list.",
    demoNote: "This is a demo. Nothing was sent.",
    another: "Book another",
    takenAria: "{time}, taken",
  },

  chat: {
    aria: "Example chat that books one haircut",
    caption: "Five messages for one haircut.",
  },

  assistantDemo: {
    shop: "Sample Barbershop",
    badge: "AI assistant",
    aria: "Sample conversation: a customer asks for a time and the assistant books it",
    callChecked: "Checked availability · 15:30 is taken",
    callBooked: "Held 16:00 · Booked",
  },

  mocks: {
    shopName: "Sample Barbershop",
    services: {
      haircut: "Haircut",
      haircutBeard: "Haircut and beard",
      shave: "Shave",
    },
    dashboard: {
      aria: "Sample dashboard: a day schedule with five bookings of different lengths, and a sixth booking arriving.",
      today: "Today",
      bookingsToday: "Bookings today",
      nextUp: "Next up",
      newTag: "New",
    },
    phone: {
      aria: "Sample phone screen: a barbershop's own website with the pleasebookme booking widget open, taken times crossed out.",
      headline: "Haircuts and shaves.",
      nav: ["Services", "Gallery", "Contact"],
      bookVisit: "Book a visit",
      days: ["Today", "Tomorrow", "In 2 days"],
      confirm: "Confirm Tomorrow, 16:00",
      caps: true,
    },
    menu: {
      aria: "Sample: a photo of a printed menu on the left becomes a draft list of services on the right. The owner checks each line and sets any missing length.",
      listTitle: "Your services",
      draft: "Draft",
      setLength: "Set length",
      rows: [
        { name: "Cắt tóc", gloss: "Haircut", price: "80,000₫", len: "30 min" },
        { name: "Cắt + cạo râu", gloss: "Haircut and beard", price: "110,000₫", len: "45 min" },
        { name: "Cạo mặt", gloss: "Shave", price: "40,000₫", len: "" },
      ],
      footer: "3 services read. Check each line before it goes live.",
      publish: "Publish",
    },
  },

  og: {
    lines: ["Book quick.", "Book now.", "Book me."],
    tagline: "Booking for barbershops and PMU studios in Vietnam",
    alt: "pleasebookme: Book quick. Book now. Book me. Booking for barbershops and PMU studios in Vietnam.",
  },
};

export type Dict = typeof en;
