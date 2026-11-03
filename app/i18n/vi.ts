import type { Dict } from "./en";

// Vietnamese copy. Voice from the brand brief: "chúng tôi – bạn", plain, calm,
// specific. Say chắc chắn, hoàn chỉnh, đặt lịch. Avoid "bảo mật" (it sounds like
// passwords) and the English word "reliability". Written by an AI model and NOT
// yet read by a native speaker: have Sonny (and, for the legal pages, a Vietnamese
// lawyer) review it before it is treated as final.
//
// Typed as `Dict`, so a missing or extra key fails the build.

export const vi: Dict = {
  htmlLang: "vi",
  ogLocale: "vi_VN",
  paths: { home: "/vi", privacy: "/vi/privacy", terms: "/vi/terms" },

  meta: {
    homeTitle: "pleasebookme: đặt lịch cho barbershop và tiệm phun xăm thẩm mỹ",
    homeDescription:
      "Đặt lịch cho barbershop, tiệm phun xăm thẩm mỹ và cửa hàng nhỏ ở Việt Nam. Khách chọn dịch vụ và giờ, giờ hẹn được giữ chắc chắn, và email xác nhận tự gửi đi.",
    privacyTitle: "Chính sách quyền riêng tư",
    privacyDescription:
      "pleasebookme thu thập gì, vì sao, ai được xem, lưu trong bao lâu và bạn thực hiện quyền của mình như thế nào.",
    termsTitle: "Điều khoản dịch vụ",
    termsDescription:
      "Điều khoản sử dụng pleasebookme: dịch vụ là gì, mỗi bên có trách nhiệm gì và cách ngừng sử dụng.",
  },

  chrome: {
    homeAria: "pleasebookme, trang chủ",
    navLabel: "Các mục",
    nav: [
      { id: "confirmations", label: "Xác nhận" },
      { id: "in-use", label: "Trên website" },
      { id: "dashboard", label: "Trang quản lý" },
      { id: "questions", label: "Hỏi đáp" },
    ],
    cta: "Dùng thử sớm",
    switchTo: { label: "English", short: "EN", aria: "Read in English", lang: "en" },
    footer: {
      made: "pleasebookme. Làm tại Việt Nam.",
      nav: "Chân trang",
      privacy: "Quyền riêng tư",
      terms: "Điều khoản",
    },
  },

  legal: { updatedLabel: "Cập nhật lần cuối", updated: "3 tháng 11, 2026" },

  home: {
    hero: {
      eyebrow: "Book chắc. Book nhanh. Book me.",
      h1Lines: ["PleaseBookMe –"],
      h1Key: "Hãy đặt đi.",
      body: "pleasebookme là tiện ích đặt lịch cho barbershop, tiệm phun xăm thẩm mỹ (PMU) và các cửa hàng nhỏ ở Việt Nam. Khách chọn dịch vụ và một khung giờ trống. Khung giờ được giữ chắc chắn, email xác nhận được gửi đi, bạn thấy trọn lịch trong ngày, và không còn phải trả lời đi trả lời lại những câu hỏi giống nhau trong tin nhắn.",
      cta: "Dùng thử sớm",
      demoNote: "Thử bản demo. Bạn bấm gì cũng không được gửi đi đâu cả.",
    },
    problem: {
      h2: "Đặt lịch qua tin nhắn mất năm câu trao đổi.",
      body: "Một lần cắt tóc, chốt qua Zalo hay Messenger, từng tin một, trong lúc tay bạn đang bận. Lỡ một tin nhắn là mất khách. Với trang đặt lịch, chỉ cần một lựa chọn và một lần chạm.",
    },
    confirmations: {
      eyebrow: "Sau khi khách đặt",
      h2: "Ai cần biết đều được báo.",
      body: "Khi khách đặt lịch, email xác nhận được gửi đi, viết theo đúng cách bạn vẫn nói với khách. Lịch hẹn cũng được thêm vào Google Calendar của bạn, nằm cạnh mọi việc khác trong ngày.",
      points: [
        {
          title: "Bằng lời của bạn.",
          text: "Viết email một lần, chừa chỗ cho tên khách, dịch vụ, giờ hẹn và địa điểm. Mỗi lịch hẹn tự điền vào.",
        },
        {
          title: "Trên lịch của bạn.",
          text: "Kết nối Google Calendar, và mỗi lịch hẹn tự hiện ở đó.",
        },
        {
          title: "Bạn quyết định.",
          text: "Một lịch hẹn có thể chờ bạn. Chấp nhận hoặc từ chối ngay trong trang quản lý.",
        },
      ],
      caption: "Lịch hẹn và email mẫu. Đây là hình minh hoạ, không phải ảnh chụp màn hình.",
    },
    whole: {
      pill: "Đang phát triển",
      h2: "Trọn vẹn từ lần chạm đầu tiên.",
      body: "Nhiều công cụ đặt lịch bắt mỗi dịch vụ một biểu mẫu riêng. Khách muốn cắt tóc và tỉa râu phải đặt hai lần, rồi hy vọng hai giờ hẹn khớp nhau. pleasebookme gom dịch vụ và giờ hẹn vào một biểu mẫu, để lịch hẹn luôn trọn vẹn từ lần chạm đầu tiên đến lúc ngồi vào ghế.",
      promises: [
        {
          word: "Chắc chắn",
          line: "Giữ chắc.",
          body: "Khi khách đặt lịch, khung giờ được giữ riêng cho họ và biến mất khỏi danh sách của mọi người khác.",
        },
        {
          word: "Hoàn chỉnh",
          line: "Đầy đủ.",
          body: "Một lịch hẹn mang theo mọi thứ nó cần chỉ trong một lượt: dịch vụ, thời lượng, giờ hẹn. Bạn không phải đuổi theo thông tin còn thiếu.",
        },
      ],
    },
    inUse: {
      eyebrow: "Trên website của bạn",
      h2: "Nằm ngay trên website bạn đã có.",
      body: "Khách đặt lịch mà không rời khỏi trang của bạn. Họ chọn dịch vụ và giờ hẹn, còn những giờ đã kín thì đã được gạch sẵn.",
      points: [
        {
          title: "Dịch vụ của bạn, thời lượng của bạn.",
          text: "Cắt tóc, tỉa râu và cạo mặt, mỗi dịch vụ giữ đúng khoảng thời gian nó cần.",
        },
        {
          title: "Một biểu mẫu, một lượt.",
          text: "Không phải mở một trang riêng cho từng dịch vụ.",
        },
        {
          title: "Một dấu nhỏ ở góc.",
          text: "Để khách biết mình đang ở trang đặt lịch của ai.",
        },
      ],
      caption:
        "Dữ liệu mẫu. Đây là hình minh hoạ tiện ích đặt lịch, không phải ảnh chụp màn hình.",
    },
    dashboard: {
      eyebrow: "Dành cho chủ tiệm",
      h2: "Cả ngày của bạn, trên một màn hình.",
      body: "Mỗi lịch hẹn rơi vào lịch của bạn và chiếm đúng khoảng thời gian dịch vụ cần: một khối ngắn cho cắt tóc, một khối dài hơn cho tỉa râu. Khung giờ đã kín thì đã biến mất khỏi danh sách của khách, nên bạn không còn phải xác nhận qua tin nhắn.",
      caption:
        "Dữ liệu mẫu. Hình minh hoạ trang quản lý trong lúc chúng tôi hoàn thiện nó.",
    },
    ownQuestions: {
      eyebrow: "Biểu mẫu đặt lịch",
      pill: "Đang phát triển",
      h2: "Hỏi điều tiệm bạn cần biết.",
      body: "Tiệm nào cũng cần biết thêm một điều về khách. Tiệm PMU hỏi về dị ứng, trường dạy lái xe hỏi hạng bằng, chỗ cho thuê xe hỏi nơi giao nhận. Thêm câu hỏi của riêng bạn vào biểu mẫu đặt lịch, dạng lựa chọn, con số hay một dòng chữ, và câu trả lời đến cùng lịch hẹn.",
      caption: "Câu hỏi mẫu. Tính năng thêm câu hỏi riêng vào biểu mẫu đặt lịch đang được phát triển.",
    },
    steps: {
      h2: "Ba bước. Chỉ một bước là của bạn.",
      items: [
        {
          title: "Thiết lập tiệm của bạn",
          body: "Thêm dịch vụ, thời lượng từng dịch vụ và giờ mở cửa. Lần đầu, chúng tôi làm cùng bạn.",
        },
        {
          title: "Khách chọn giờ",
          body: "Họ chọn dịch vụ và một khung giờ trống. Những giờ đã kín đã được gạch sẵn, và email xác nhận được gửi giúp bạn.",
        },
        {
          title: "Bạn thấy cả ngày của mình",
          body: "Mỗi lịch hẹn rơi vào lịch của bạn. Không phải nhắn qua nhắn lại để xác nhận.",
        },
      ],
    },
    shops: {
      barber: {
        title: "Barbershop",
        body: "Lịch hẹn ngắn, nhiều lượt mỗi ngày. Ghế kín thì hiện là kín, nên không ai phải hỏi lại lần hai.",
      },
      pmu: {
        title: "Tiệm phun xăm thẩm mỹ (PMU)",
        body: "Những buổi dài cần giữ đủ thời gian. Mỗi dịch vụ có thời lượng riêng, và lịch tôn trọng điều đó.",
      },
    },
    story: {
      h2: "Chúng tôi bắt đầu từ website của một barbershop.",
      p1: "Tháng Tư, chúng tôi làm website cho một barbershop ở Hà Nội, kèm tính năng đặt lịch. Đặt lịch lại chính là phần hay hỏng nhất. Chúng tôi thử ghép Calendly với Google Sheets, rồi quyết định thôi vá công cụ của người khác và tự xây hệ thống đặt lịch của riêng mình.",
      p2: "Chúng tôi là hai đồng sáng lập ở Hà Nội. Một người xây sản phẩm, người kia lo thiết kế, nghiên cứu và vận hành. Chúng tôi còn rất mới, và thà nói thẳng như vậy còn hơn giả vờ.",
    },
    questions: {
      h2: "Những câu hỏi chúng tôi đoán bạn sẽ hỏi.",
      sub: "Còn thiếu điều gì? Hãy viết cho chúng tôi, chúng tôi sẽ trả lời thẳng thắn.",
      items: [
        {
          q: "Đã dùng được chưa?",
          a: "Chưa hoàn thiện. pleasebookme đang ở giai đoạn dùng thử sớm: chúng tôi thiết lập cho một số ít tiệm cùng bạn và sửa những gì hỏng. Bạn sẽ thấy sản phẩm thật trước khi quyết định bất cứ điều gì.",
        },
        {
          q: "Chi phí thế nào?",
          a: "Dùng thử sớm là miễn phí. Nếu có thu phí, chúng tôi sẽ báo trước ít nhất 30 ngày, kèm mức giá, và bạn có thể dừng mà không mất đồng nào.",
        },
        {
          q: "Tôi cần chuẩn bị gì để bắt đầu?",
          a: "Danh sách dịch vụ, thời lượng từng dịch vụ và giờ mở cửa. Chỉ vậy thôi, và lần đầu chúng tôi làm cùng bạn.",
        },
        {
          q: "Có dùng được với Google Calendar không?",
          a: "Có. Kết nối một lần, và mỗi lịch hẹn mới được thêm vào Google Calendar của bạn. Chiều ngược lại (bạn sửa trong Google Calendar và pleasebookme cập nhật theo) đang được phát triển.",
        },
        {
          q: "Tôi có thể hỏi khách câu hỏi riêng không?",
          a: "Chưa. Tính năng thêm câu hỏi riêng vào biểu mẫu đặt lịch đang được phát triển: dạng lựa chọn, con số hoặc một dòng chữ, và câu trả lời được lưu cùng lịch hẹn.",
        },
        {
          q: "Ai nhìn thấy thông tin khách của tôi?",
          a: "Chỉ bạn. Chúng tôi xử lý thông tin đó giúp bạn, chỉ để vận hành việc đặt lịch, và không bán nó. Chính sách quyền riêng tư có chi tiết.",
        },
      ],
    },
    contact: {
      h2: "Bạn muốn dùng cho tiệm của mình?",
      body: "Chúng tôi làm việc với một số ít tiệm trước, và thiết lập từng tiệm cùng bạn. Hãy cho chúng tôi biết bạn làm nghề gì và ngày nào đông khách nhất. Bạn có thể viết bằng tiếng Việt hoặc tiếng Anh.",
      cta: "Dùng thử sớm",
    },
  },

  demo: {
    title: "Đặt lịch hẹn",
    subtitle: "Barbershop mẫu, bản demo trực tiếp",
    serviceLegend: "Dịch vụ",
    dayLegend: "Ngày",
    timeLegend: "Giờ",
    minUnit: "phút",
    services: [
      { id: "cut", name: "Cắt tóc", minutes: 30 },
      { id: "cut-beard", name: "Cắt tóc và tỉa râu", minutes: 45 },
      { id: "shave", name: "Cạo mặt", minutes: 20 },
    ],
    days: [
      { id: "today", label: "Hôm nay" },
      { id: "tomorrow", label: "Ngày mai" },
      { id: "in2", label: "Ngày kia" },
    ],
    confirm: "Xác nhận: {day}, {time}",
    choose: "Chọn một giờ",
    booked: "Đã đặt",
    result:
      "{service}, {minutes} phút. Khung giờ này đã được giữ cho khách và biến mất khỏi danh sách của mọi người khác.",
    demoNote: "Đây là bản demo. Không có gì được gửi đi.",
    another: "Đặt lịch khác",
    takenAria: "{time}, đã kín",
  },

  chat: {
    aria: "Ví dụ cuộc trò chuyện để đặt một lần cắt tóc",
    caption: "Năm tin nhắn cho một lần cắt tóc.",
  },

  confirmDemo: {
    aria: "Ví dụ: khách đặt cắt tóc lúc 16:00 ngày mai. Email xác nhận viết bằng lời của tiệm được gửi cho khách, và lịch hẹn hiện trong Google Calendar của chủ tiệm.",
    booked: "Lịch hẹn mới · Cắt tóc, 16:00 ngày mai",
    emailLabel: "Email gửi anh Minh",
    subject: "Lịch hẹn của anh đã được xác nhận",
    body: ["Chào anh {name},", "Hẹn gặp anh lúc {time} để {service} tại {place}.", "Cần đổi giờ? Anh cứ trả lời email này."],
    fill: { name: "Minh", service: "cắt tóc", time: "16:00 ngày mai", place: "Barbershop mẫu" },
    calendarLabel: "Google Calendar · Ngày mai",
    event: "Cắt tóc · Minh",
  },

  mocks: {
    shopName: "Barbershop mẫu",
    services: {
      haircut: "Cắt tóc",
      haircutBeard: "Cắt tóc và tỉa râu",
      shave: "Cạo mặt",
    },
    dashboard: {
      aria: "Trang quản lý mẫu: lịch trong ngày với năm lịch hẹn có độ dài khác nhau, và một lịch hẹn thứ sáu đang đến.",
      today: "Hôm nay",
      bookingsToday: "Lịch hẹn hôm nay",
      nextUp: "Sắp tới",
      newTag: "Mới",
    },
    phone: {
      aria: "Màn hình điện thoại mẫu: website của một barbershop với tiện ích đặt lịch pleasebookme đang mở, các giờ đã kín bị gạch.",
      headline: "Cắt tóc và cạo mặt.",
      nav: ["Dịch vụ", "Hình ảnh", "Liên hệ"],
      bookVisit: "Đặt lịch hẹn",
      days: ["Hôm nay", "Ngày mai", "Ngày kia"],
      confirm: "Xác nhận ngày mai, 16:00",
      caps: false,
    },
    form: {
      aria: "Ví dụ: chủ tiệm PMU thêm hai câu hỏi vào biểu mẫu đặt lịch, và khách trả lời khi đặt phun mày.",
      editorTitle: "Câu hỏi của bạn",
      add: "Thêm câu hỏi",
      items: [
        { q: "Có dị ứng gì không?", type: "Dòng chữ" },
        { q: "Lần đầu đến tiệm?", type: "Lựa chọn" },
      ],
      formTitle: "Đặt lịch hẹn",
      service: "Phun mày · 120 phút",
      time: "Ngày mai, 14:00",
      answer: "Thuốc tê",
      choices: ["Có", "Không"],
      confirm: "Xác nhận",
    },
  },

  og: {
    lines: ["PleaseBookMe –", "Hãy đặt đi."],
    tagline: "Đặt lịch cho barbershop và tiệm phun xăm thẩm mỹ",
    alt: "PleaseBookMe – Hãy đặt đi. Đặt lịch cho barbershop và tiệm phun xăm thẩm mỹ ở Việt Nam.",
  },
};
