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
      "Booking for barbershops, PMU studios and small shops in Vietnam. Customers pick a service and a time, the slot holds, and the confirmation goes out by itself.",
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
      { id: "confirmations", label: "Confirmations" },
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

  legal: { updatedLabel: "Last updated", updated: "3 November 2026" },

  home: {
    hero: {
      eyebrow: "Đặt lịch, chắc chắn.",
      // Headline: plain lines, then one highlighted line (floating, italic).
      h1Lines: ["Book quick.", "Book now."],
      h1Key: "Book me.",
      body: "pleasebookme is a booking widget for barbershops, PMU studios and other small shops in Vietnam. A customer picks a service and a free time. The slot holds, the confirmation goes out, you see your day, and you stop answering the same questions in chat.",
      cta: "Get early access",
      demoNote: "Try the demo. Nothing you tap is sent.",
    },
    problem: {
      h2: "Booking by chat takes five messages.",
      body: "One haircut, fixed over Zalo or Messenger, one message at a time, while your hands are busy. Miss a single reply and the customer is gone. With a booking page it is one choice and one tap.",
    },
    confirmations: {
      eyebrow: "After the tap",
      h2: "Everyone hears about it.",
      body: "When a customer books, the confirmation goes out by email, written the way you would write it. The booking is added to your Google Calendar too, next to the rest of your day.",
      points: [
        {
          title: "In your words.",
          text: "Write the email once, with blanks for the customer's name, the service, the time and the place. Every booking fills them in.",
        },
        {
          title: "In your calendar.",
          text: "Connect Google Calendar and each booking appears there on its own.",
        },
        {
          title: "Yours to accept.",
          text: "A booking can wait for you. Accept or reject it from the dashboard.",
        },
      ],
      caption: "Sample booking and email. An illustration, not a screenshot.",
    },
    whole: {
      pill: "In development",
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
    ownQuestions: {
      eyebrow: "The booking form",
      pill: "In development",
      h2: "Ask what your shop needs to know.",
      body: "Every shop needs one more thing from the customer. A PMU studio asks about allergies, a driving school asks which licence, a rental asks where to meet. Add your own questions to the booking form, as a choice, a number or a line of text, and the answers arrive with the booking.",
      caption: "Sample questions. Your own questions on the booking form are in development.",
    },
    steps: {
      h2: "Three steps. Only one is yours.",
      items: [
        {
          title: "Set up your shop",
          body: "Add your services, how long each takes and your opening hours. The first time, we do it with you.",
        },
        {
          title: "Customers pick a time",
          body: "They choose a service and a free slot. Taken slots are already crossed out, and the confirmation is sent for you.",
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
          q: "Does it work with Google Calendar?",
          a: "Yes. Connect it, and every new booking is added to your Google Calendar. The other direction, where a change you make in Google Calendar comes back to pleasebookme, is in development.",
        },
        {
          q: "Can I ask customers my own questions?",
          a: "Not yet. Your own questions on the booking form are in development: a choice, a number or a line of text, with the answers saved on the booking.",
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

  confirmDemo: {
    aria: "Sample: a customer books a haircut for tomorrow at 16:00. A confirmation email in the shop's own words goes to the customer, and the booking appears in the owner's Google Calendar.",
    booked: "New booking · Haircut, tomorrow 16:00",
    emailLabel: "Email to Minh",
    subject: "Your booking is confirmed",
    // {name} {service} {time} {place} are the template's blanks, shown filled.
    body: ["Hi {name},", "See you {time} for a {service} at {place}.", "Need to change it? Just reply to this email."],
    fill: { name: "Minh", service: "haircut", time: "tomorrow at 16:00", place: "Sample Barbershop" },
    calendarLabel: "Google Calendar · Tomorrow",
    event: "Haircut · Minh",
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
    form: {
      aria: "Sample: the owner of a PMU studio adds two questions to the booking form, and the customer answers them while booking brow shading.",
      editorTitle: "Your questions",
      add: "Add a question",
      items: [
        { q: "Any allergies?", type: "Text" },
        { q: "First time with us?", type: "Choice" },
      ],
      formTitle: "Book a visit",
      service: "Brow shading · 120 min",
      time: "Tomorrow, 14:00",
      answer: "Numbing cream",
      choices: ["Yes", "No"],
      confirm: "Confirm",
    },
  },

  og: {
    lines: ["Book quick.", "Book now.", "Book me."],
    tagline: "Booking for barbershops and PMU studios in Vietnam",
    alt: "pleasebookme: Book quick. Book now. Book me. Booking for barbershops and PMU studios in Vietnam.",
  },
};

export type Dict = typeof en;
