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
      "Đặt lịch cho barbershop, tiệm phun xăm thẩm mỹ và cửa hàng nhỏ ở Việt Nam. Khách chọn giờ hoặc nhắn hỏi. Giờ hẹn giữ chắc chắn, bạn thấy cả ngày của mình.",
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
      { id: "assistant", label: "Trợ lý" },
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

  legal: { updatedLabel: "Cập nhật lần cuối", updated: "9 tháng 10, 2026" },

  home: {
    hero: {
      eyebrow: "Book chắc. Book nhanh. Book me.",
      h1Lines: ["PleaseBookMe –"],
      h1Key: "Hãy đặt đi.",
      body: "pleasebookme là tiện ích đặt lịch cho barbershop, tiệm phun xăm thẩm mỹ (PMU) và các cửa hàng nhỏ ở Việt Nam. Khách chọn dịch vụ và một khung giờ trống, hoặc chỉ cần nhắn hỏi. Khung giờ được giữ chắc chắn, bạn thấy trọn lịch trong ngày, và không còn phải trả lời đi trả lời lại những câu hỏi giống nhau trong tin nhắn.",
      cta: "Dùng thử sớm",
      demoNote: "Thử bản demo. Bạn bấm gì cũng không được gửi đi đâu cả.",
    },
    problem: {
      h2: "Đặt lịch qua tin nhắn mất năm câu trao đổi.",
      body: "Một lần cắt tóc, chốt qua Zalo hay Messenger, từng tin một, trong lúc tay bạn đang bận. Lỡ một tin nhắn là mất khách. Với trang đặt lịch, chỉ cần một lựa chọn và một lần chạm.",
    },
    assistant: {
      eyebrow: "Trợ lý cho khách",
      pill: "Đang phát triển",
      h2: "Khách chỉ cần nhắn hỏi.",
      body: "Phần lớn khách đã quen đặt lịch bằng cách nhắn tin. Trợ lý của pleasebookme tiếp nhận cuộc trò chuyện đó: hiểu câu hỏi bằng tiếng Việt, kiểm tra lịch trống thật của bạn, giữ khung giờ và đặt lịch, để bạn không phải ngồi gõ.",
      points: [
        {
          title: "Không đoán mò.",
          text: "Mọi giờ trống nó đưa ra đều lấy từ lịch thật của bạn, thông qua hệ thống đặt lịch của chúng tôi.",
        },
        {
          title: "Nói rõ mình là gì.",
          text: "Khách luôn biết mình đang trò chuyện với một trợ lý tự động.",
        },
        {
          title: "Bạn thấy mọi lịch hẹn.",
          text: "Lịch nào nó đặt cũng hiện trên lịch của bạn như mọi lịch khác.",
        },
      ],
      caption:
        "Đoạn trò chuyện mẫu. Trợ lý đang được phát triển, và đây là cách chúng tôi đang xây dựng để nó hoạt động.",
    },
    whole: {
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
    menu: {
      eyebrow: "Thiết lập",
      pill: "Đang phát triển",
      h2: "Chụp bảng giá. Chúng tôi soạn sẵn danh sách dịch vụ.",
      body: "Thiết lập không nên là việc gõ lại cả bảng giá. Hãy chụp ảnh bảng giá bạn đang có, và pleasebookme sẽ đọc tên dịch vụ cùng giá thành một danh sách nháp. Bạn kiểm tra từng dòng và đặt thời lượng cho từng dịch vụ. Không có gì được đăng cho đến khi bạn đồng ý.",
      caption:
        "Bảng giá và giá tiền mẫu. Tính năng đọc ảnh bảng giá đang được phát triển.",
    },
    steps: {
      h2: "Ba bước. Chỉ một bước là của bạn.",
      items: [
        {
          title: "Thiết lập tiệm của bạn",
          body: "Thêm dịch vụ, thời lượng từng dịch vụ và giờ mở cửa, hoặc chụp ảnh bảng giá rồi kiểm tra bản nháp của chúng tôi. Lần đầu, chúng tôi làm cùng bạn.",
        },
        {
          title: "Khách chọn giờ",
          body: "Họ chọn dịch vụ và một khung giờ trống, hoặc chỉ cần hỏi trợ lý. Những giờ đã kín đã được gạch sẵn.",
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
          q: "Trợ lý có nhầm không?",
          a: "Có thể có, nên nó không bao giờ đoán mò. Nó kiểm tra lịch trống thật của bạn qua hệ thống đặt lịch của chúng tôi trước khi đưa ra một giờ, và một lịch hẹn chỉ được tính khi hệ thống xác nhận. Mọi lịch nó đặt đều hiện trên lịch của bạn.",
        },
        {
          q: "Nó có đọc đúng ảnh bảng giá không?",
          a: "Thường là đúng, nhưng không phải lúc nào cũng vậy: chữ viết tay và chữ nhỏ rất khó đọc. Vì vậy bạn kiểm tra từng dòng, và đặt thời lượng cho từng dịch vụ, trước khi có gì được đăng.",
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

  assistantDemo: {
    shop: "Barbershop mẫu",
    badge: "Trợ lý AI",
    aria: "Cuộc trò chuyện mẫu: khách hỏi giờ và trợ lý đặt lịch",
    callChecked: "Đã kiểm tra lịch trống · 15:30 đã kín",
    callBooked: "Đã giữ 16:00 · Đã đặt",
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
    menu: {
      aria: "Ví dụ: ảnh bảng giá in bên trái trở thành danh sách dịch vụ nháp bên phải. Chủ tiệm kiểm tra từng dòng và đặt thời lượng còn thiếu.",
      listTitle: "Dịch vụ của bạn",
      draft: "Bản nháp",
      setLength: "Đặt thời lượng",
      rows: [
        { name: "Cắt tóc", gloss: "", price: "80.000₫", len: "30 phút" },
        { name: "Cắt + cạo râu", gloss: "", price: "110.000₫", len: "45 phút" },
        { name: "Cạo mặt", gloss: "", price: "40.000₫", len: "" },
      ],
      footer: "Đã đọc 3 dịch vụ. Kiểm tra từng dòng trước khi đăng.",
      publish: "Đăng",
    },
  },

  og: {
    lines: ["PleaseBookMe –", "Hãy đặt đi."],
    tagline: "Đặt lịch cho barbershop và tiệm phun xăm thẩm mỹ",
    alt: "PleaseBookMe – Hãy đặt đi. Đặt lịch cho barbershop và tiệm phun xăm thẩm mỹ ở Việt Nam.",
  },
};
