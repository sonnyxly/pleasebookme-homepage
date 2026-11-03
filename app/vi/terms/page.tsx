import type { Metadata } from "next";
import Link from "next/link";
import LegalShell from "../../legal-shell";
import { getDict } from "../../i18n";
import { pageMetadata } from "../../seo";
import { CONTACT_EMAIL } from "../../site";

const d = getDict("vi");

export const metadata: Metadata = pageMetadata({
  locale: "vi",
  page: "terms",
  title: d.meta.termsTitle,
  description: d.meta.termsDescription,
});

/*
  BẢN TIẾNG VIỆT, CHƯA ĐƯỢC KIỂM TRA. Đây là bản dịch của app/(en)/terms/page.tsx, do
  AI viết, chưa có người bản ngữ hay luật sư Việt Nam rà soát. Cần làm trước khi ra
  mắt: (1) người bản ngữ đọc lại văn phong; (2) luật sư rà soát, nhất là mục 14 (giới
  hạn trách nhiệm), mục 16 (luật áp dụng, toà án Hà Nội) và mục 7 (Google Calendar);
  (3) giữ hai bản luôn khớp nhau cùng các mục "cần xác nhận" ghi ở đầu bản tiếng Anh.
  Bản tiếng Anh nói bản tiếng Việt này là bản có hiệu lực nếu hai bản khác nhau.
  Các điều khoản về AI (trợ lý, đọc bảng giá) đã được bỏ ngày 3/11/2026: hai tính năng
  này chưa từng được xây dựng.
*/

export default function Terms() {
  return (
    <LegalShell
      locale="vi"
      page="terms"
      title="Điều khoản dịch vụ"
      intro="Đây là các điều khoản khi sử dụng pleasebookme. Chúng được viết ngắn gọn có chủ ý. Nếu có chỗ nào chưa rõ, hãy hỏi chúng tôi trước khi đăng ký."
    >
      <h2>1. Về các điều khoản này</h2>
      <p>
        pleasebookme là công cụ đặt lịch cho các cửa hàng nhỏ ở Việt Nam: một
        tiện ích đặt lịch dành cho khách, và một trang quản lý dành cho chủ tiệm.
        pleasebookme do những người sáng lập vận hành từ Hà Nội, Việt Nam. Trong
        các điều khoản này, &ldquo;chúng tôi&rdquo; là những người sáng lập và bất
        kỳ doanh nghiệp nào chúng tôi lập ra để vận hành pleasebookme.
        &ldquo;Bạn&rdquo; là chủ tiệm đăng ký sử dụng.
      </p>
      <p>
        Khi tạo tài khoản hoặc sử dụng dịch vụ, bạn đồng ý với các điều khoản này
        và với <Link href="/vi/privacy">Chính sách quyền riêng tư</Link> của chúng
        tôi. Nếu bạn không đồng ý, vui lòng không sử dụng pleasebookme.
      </p>

      <h2>2. Dịch vụ</h2>
      <p>
        Bạn thiết lập các dịch vụ, thời lượng của chúng và giờ mở cửa. Khách của
        bạn dùng tiện ích đặt lịch để chọn dịch vụ và một giờ trống. Bạn xem các
        lịch hẹn trên trang quản lý. Chúng tôi có thể thêm, thay đổi hoặc gỡ bỏ
        tính năng trong quá trình sản phẩm phát triển.
      </p>
      <p>
        <strong>pleasebookme đang ở giai đoạn dùng thử sớm.</strong> Sản phẩm vẫn
        đang được xây dựng và thử nghiệm, và một số thứ sẽ hỏng. Chúng tôi sẽ sửa
        chúng, và sẽ cho bạn biết những gì chúng tôi biết.
      </p>

      <h2>3. Dùng thử sớm và phí</h2>
      <p>
        Hiện tại, giai đoạn dùng thử sớm là miễn phí. Nếu chúng tôi bắt đầu thu
        phí, chúng tôi sẽ báo cho bạn ít nhất 30 ngày trước khi phí có hiệu lực,
        kèm mức giá, và bạn có thể ngừng sử dụng pleasebookme trước đó mà không
        phải trả gì. Chúng tôi sẽ không bao giờ tính phí bạn mà không báo trước.
      </p>
      <p>
        Hiện nay, pleasebookme không thu tiền giữa khách của bạn và bạn. Mọi khoản
        thanh toán cho dịch vụ của bạn diễn ra trực tiếp giữa bạn và khách.
      </p>

      <h2>4. Tài khoản của bạn</h2>
      <ul>
        <li>
          Bạn phải từ đủ 18 tuổi và sử dụng pleasebookme cho hoạt động kinh
          doanh.
        </li>
        <li>
          Thông tin bạn cung cấp cho chúng tôi phải đúng sự thật và được cập nhật.
        </li>
        <li>
          Giữ kín thông tin đăng nhập của bạn. Bạn chịu trách nhiệm về những gì
          xảy ra dưới tài khoản của mình. Hãy báo cho chúng tôi ngay nếu bạn nghĩ
          có người khác đã dùng nó.
        </li>
      </ul>

      <h2>5. Bạn chịu trách nhiệm về điều gì</h2>
      <ul>
        <li>
          <strong>Lịch hẹn của bạn.</strong> Cuộc hẹn là giữa bạn và khách của
          bạn. Chúng tôi không phải là một bên trong cuộc hẹn đó. Bạn quyết định
          nhận, dời hay huỷ một lịch hẹn, và bạn chịu trách nhiệm thực hiện những
          lịch hẹn mà bạn đã nhận.
        </li>
        <li>
          <strong>Thông tin của bạn.</strong> Dịch vụ, giá, giờ làm việc và mô tả
          của bạn phải chính xác và hợp pháp.
        </li>
        <li>
          <strong>Dữ liệu khách hàng của bạn.</strong> Bạn quyết định hỏi khách
          những thông tin nào. Chỉ hỏi những gì bạn cần, cho khách biết bạn dùng
          chúng ra sao, và xin sự đồng ý của họ khi pháp luật yêu cầu. Không ghi
          thông tin nhạy cảm, chẳng hạn thông tin sức khoẻ, vào ghi chú đặt lịch
          trừ khi quy trình của bạn thật sự cần và khách đã đồng ý. Chúng tôi xử
          lý dữ liệu khách hàng của bạn thay mặt bạn, như được mô tả trong{" "}
          <Link href="/vi/privacy">Chính sách quyền riêng tư</Link>.
        </li>
        <li>
          <strong>Tin nhắn.</strong> Nếu bạn bật tính năng xác nhận hoặc nhắc
          lịch, bạn cam kết rằng khách của bạn có thể được liên hệ theo cách đó.
        </li>
        <li>
          <strong>Pháp luật.</strong> Bạn tuân thủ các quy định pháp luật áp dụng
          cho hoạt động kinh doanh của bạn ở Việt Nam.
        </li>
      </ul>

      <h2>6. Những điều bạn không được làm</h2>
      <ul>
        <li>
          Dùng pleasebookme cho bất cứ việc gì bất hợp pháp, gây hiểu lầm hoặc
          lạm dụng.
        </li>
        <li>
          Cố gắng phá, làm quá tải, dò quét hoặc vượt qua dịch vụ hoặc các biện
          pháp an ninh của nó.
        </li>
        <li>
          Sao chép, bán lại hoặc dựa vào dịch vụ để xây dựng một sản phẩm cạnh
          tranh, hoặc dịch ngược mã của nó, trừ khi pháp luật cho phép.
        </li>
        <li>
          Dùng pleasebookme để gửi thư rác, hoặc để thu thập dữ liệu về những
          người không phải là khách của bạn.
        </li>
      </ul>

      <h2>7. Google Calendar</h2>
      <p>
        Bạn có thể kết nối tài khoản Google để mỗi lịch hẹn được thêm vào Google
        Calendar của bạn.{" "}
        <Link href="/vi/privacy">Chính sách quyền riêng tư</Link> liệt kê những
        gì mỗi sự kiện mang theo, bao gồm họ tên và thông tin liên hệ của khách.
      </p>
      <ul>
        <li>
          <strong>pleasebookme là nơi ghi nhận.</strong> Lịch hẹn đi từ
          pleasebookme sang lịch của bạn. Những thay đổi bạn làm trong Google
          Calendar chưa được sao chép ngược lại, nên hãy đổi hoặc huỷ lịch hẹn
          trong pleasebookme.
        </li>
        <li>
          <strong>Lịch của bạn, bạn giữ gìn.</strong> Khi lịch hẹn đã ở trong
          Google Calendar, nó nằm trong tài khoản Google của chính bạn, theo điều
          khoản của Google. Chỉ chia sẻ lịch đó với những người nên xem thông tin
          của khách.
        </li>
        <li>
          <strong>Bạn có thể ngắt kết nối.</strong> Ngắt kết nối bất cứ lúc nào,
          và chúng tôi sẽ ngừng gửi lịch hẹn vào lịch đó.
        </li>
      </ul>

      <h2>8. Nội dung và dữ liệu của bạn</h2>
      <p>
        Những gì bạn đưa vào pleasebookme, như dịch vụ, giờ làm việc và lịch hẹn,
        vẫn thuộc về bạn. Bạn cho phép chúng tôi lưu trữ, hiển thị và xử lý
        chúng, chỉ để chúng tôi có thể vận hành dịch vụ cho bạn. Khi rời đi, bạn
        có thể yêu cầu một bản sao dữ liệu của mình (xem mục 13).
      </p>

      <h2>9. Tài sản của chúng tôi</h2>
      <p>
        pleasebookme, phần mềm, tên gọi, biểu tượng và thiết kế của nó thuộc về
        chúng tôi. Các điều khoản này cho bạn quyền sử dụng dịch vụ như nó được
        cung cấp. Chúng không trao cho bạn quyền sở hữu bất cứ phần nào trong đó.
        Một số phần của dịch vụ dùng phần mềm và phông chữ mã nguồn mở, và vẫn
        thuộc giấy phép riêng của chúng.
      </p>

      <h2>10. Các dịch vụ khác</h2>
      <p>
        pleasebookme dựa vào các dịch vụ khác, chẳng hạn các nhà cung cấp lưu trữ
        và nhắn tin như Zalo, cùng Google khi bạn kết nối lịch. Chúng tôi
        không kiểm soát những dịch vụ đó. Nếu một trong số chúng thay đổi hoặc
        ngừng hoạt động, một phần của pleasebookme có thể bị ảnh hưởng.
      </p>

      <h2>11. Tính sẵn sàng của dịch vụ</h2>
      <p>
        Chúng tôi cố gắng giữ cho pleasebookme hoạt động và lịch hẹn của bạn an
        toàn, nhưng chúng tôi không thể hứa dịch vụ luôn sẵn sàng hay không có
        lỗi, và giai đoạn dùng thử sớm được cung cấp nguyên trạng. Với một cuộc
        hẹn thật sự quan trọng, chúng tôi khuyên bạn cũng nên tự ghi chú lại cho
        đến khi bạn tin tưởng dịch vụ.
      </p>

      <h2>12. Tạm ngừng hoặc chấm dứt quyền sử dụng</h2>
      <p>
        Bạn có thể ngừng sử dụng pleasebookme và đóng tài khoản bất cứ lúc nào
        bằng cách gửi email đến{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. Chúng tôi có
        thể tạm ngừng hoặc đóng một tài khoản vi phạm các điều khoản này, đặt dịch
        vụ hoặc người khác vào rủi ro, hoặc khi pháp luật yêu cầu. Khi có thể một
        cách hợp lý, chúng tôi sẽ cảnh báo bạn trước và giải thích lý do.
      </p>

      <h2>13. Khi bạn rời đi</h2>
      <p>
        Sau khi bạn đóng tài khoản, bạn có thể yêu cầu chúng tôi cung cấp một bản
        sao dữ liệu của bạn trong 30 ngày. Sau đó, chúng tôi xoá hoặc ẩn danh dữ
        liệu như{" "}
        <Link href="/vi/privacy">Chính sách quyền riêng tư</Link> mô tả.
      </p>

      <h2>14. Giới hạn trách nhiệm của chúng tôi</h2>
      <p>
        Trong phạm vi pháp luật cho phép, chúng tôi không chịu trách nhiệm về
        thiệt hại gián tiếp hoặc hệ quả, về lợi nhuận bị mất, hoặc về những cuộc
        hẹn bị lỡ hay bị đặt trùng do lỗi của dịch vụ, sự cố ngừng hoạt động hoặc
        một dịch vụ của bên thứ ba. Tổng trách nhiệm của chúng tôi đối với bất kỳ
        yêu cầu nào liên quan đến pleasebookme được giới hạn ở khoản phí bạn đã
        trả cho chúng tôi trong 12 tháng trước khi có yêu cầu đó. Nếu bạn chưa trả
        khoản nào, chúng tôi không chịu trách nhiệm vượt quá những gì pháp luật
        Việt Nam yêu cầu.
      </p>
      <p>
        Không điều gì trong các điều khoản này giới hạn một trách nhiệm mà pháp
        luật không cho phép chúng tôi giới hạn, hoặc bất kỳ quyền nào bạn có theo
        pháp luật Việt Nam về bảo vệ người tiêu dùng hay bảo vệ dữ liệu cá nhân.
      </p>

      <h2>15. Thay đổi các điều khoản này</h2>
      <p>
        Chúng tôi có thể cập nhật các điều khoản này khi pleasebookme phát triển.
        Với những thay đổi quan trọng, chúng tôi sẽ gửi email cho bạn ít nhất 14
        ngày trước khi chúng có hiệu lực. Nếu bạn không đồng ý, bạn có thể đóng
        tài khoản trước thời điểm đó. Tiếp tục sử dụng dịch vụ sau ngày đó nghĩa
        là bạn chấp nhận các điều khoản mới.
      </p>

      <h2>16. Luật áp dụng và giải quyết tranh chấp</h2>
      <p>
        Các điều khoản này được điều chỉnh bởi pháp luật Việt Nam. Nếu có bất
        đồng, chúng ta sẽ trước hết cố gắng giải quyết bằng thương lượng. Nếu
        không được, toà án có thẩm quyền tại Hà Nội sẽ quyết định. Các điều khoản
        này có{" "}
        <Link href="/terms" hrefLang="en" lang="en">
          bản tiếng Anh
        </Link>
        . Nếu hai bản khác nhau, bản tiếng Việt này là bản có hiệu lực.
      </p>

      <h2>17. Liên hệ</h2>
      <p>
        Câu hỏi về các điều khoản này:{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    </LegalShell>
  );
}
