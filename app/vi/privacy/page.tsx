import type { Metadata } from "next";
import Link from "next/link";
import LegalShell from "../../legal-shell";
import { getDict } from "../../i18n";
import { pageMetadata } from "../../seo";
import { CONTACT_EMAIL } from "../../site";

const d = getDict("vi");

export const metadata: Metadata = pageMetadata({
  locale: "vi",
  page: "privacy",
  title: d.meta.privacyTitle,
  description: d.meta.privacyDescription,
});

/*
  BẢN TIẾNG VIỆT, CHƯA ĐƯỢC KIỂM TRA. Đây là bản dịch của app/(en)/privacy/page.tsx,
  do AI viết, chưa có người bản ngữ hay luật sư Việt Nam rà soát. Cần làm trước khi
  ra mắt: (1) người bản ngữ đọc lại văn phong; (2) luật sư rà soát nội dung; (3) giữ
  hai bản luôn khớp nhau, cùng các mục "cần xác nhận" ghi ở đầu bản tiếng Anh (thời
  hạn lưu trữ, cam kết 2 ngày làm việc, cam kết nhà cung cấp AI không dùng dữ liệu để
  huấn luyện mô hình...). Bản tiếng Anh nói bản tiếng Việt này là bản có hiệu lực nếu
  hai bản khác nhau.
  Cơ sở pháp lý: Luật Bảo vệ dữ liệu cá nhân số 91/2025/QH15 và Nghị định
  356/2025/NĐ-CP, cùng có hiệu lực từ ngày 1/1/2026.
*/

export default function Privacy() {
  return (
    <LegalShell
      locale="vi"
      page="privacy"
      title="Chính sách quyền riêng tư"
      intro="Chúng tôi thu thập gì, vì sao, ai được xem, lưu trong bao lâu, và bạn thực hiện quyền của mình như thế nào. Chúng tôi cố gắng viết thật dễ hiểu."
    >
      <h2>1. Chúng tôi là ai</h2>
      <p>
        pleasebookme là công cụ đặt lịch cho các cửa hàng nhỏ ở Việt Nam: một
        tiện ích đặt lịch dành cho khách, và một trang quản lý dành cho chủ tiệm.
        pleasebookme do những người sáng lập vận hành từ Hà Nội, Việt Nam. Trong
        chính sách này, &ldquo;chúng tôi&rdquo; là những người sáng lập và bất kỳ
        doanh nghiệp nào chúng tôi lập ra để vận hành pleasebookme.
      </p>
      <p>
        Bạn có thể liên hệ với chúng tôi qua{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>

      <h2>2. Tóm tắt</h2>
      <ul>
        <li>
          Website này không đặt cookie và không chạy công cụ phân tích hay theo
          dõi quảng cáo.
        </li>
        <li>
          Chúng tôi không bán dữ liệu cá nhân, và không dùng dữ liệu đó để hiển
          thị quảng cáo cho bạn.
        </li>
        <li>
          Với chủ tiệm, chúng tôi xử lý dữ liệu cần thiết để vận hành tài khoản
          của bạn.
        </li>
        <li>
          Trợ lý đặt lịch và công cụ đọc bảng giá là các tính năng AI đang được
          phát triển. Chúng hoạt động thông qua hệ thống đặt lịch của chúng tôi,
          và mục 7 giải thích về chúng.
        </li>
        <li>
          Với khách đặt lịch qua một cửa hàng, cửa hàng quyết định thu thập gì và
          để làm gì. Chúng tôi xử lý dữ liệu đó thay mặt cửa hàng, để thực hiện
          việc đặt lịch.
        </li>
        <li>
          Bạn có thể yêu cầu xem, sửa hoặc xoá dữ liệu của mình bất cứ lúc nào.
          Xem mục 10.
        </li>
      </ul>

      <h2>3. Hai vai trò</h2>
      <p>
        Pháp luật Việt Nam (Luật Bảo vệ dữ liệu cá nhân và Nghị định
        356/2025/NĐ-CP) phân biệt bên quyết định cách sử dụng dữ liệu với bên xử
        lý dữ liệu giúp họ. Chúng tôi đảm nhận hai vai trò:
      </p>
      <ul>
        <li>
          <strong>Chủ tiệm.</strong> Với thông tin tài khoản của bạn, chúng tôi
          quyết định dùng chúng để làm gì và như thế nào. Chúng tôi chịu trách
          nhiệm về chúng.
        </li>
        <li>
          <strong>Khách đặt lịch.</strong> Cửa hàng quyết định nhận đặt lịch và
          hỏi những thông tin nào. Chúng tôi xử lý các thông tin đó theo chỉ dẫn
          của cửa hàng, chỉ để vận hành dịch vụ đặt lịch. Nếu bạn là khách, cửa
          hàng thường là nơi đầu tiên bạn nên liên hệ về dữ liệu của mình. Bạn
          cũng có thể viết cho chúng tôi, và chúng tôi sẽ giúp.
        </li>
      </ul>

      <h2>4. Chúng tôi thu thập gì</h2>
      <table>
        <thead>
          <tr>
            <th>Đối tượng</th>
            <th>Dữ liệu</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Người truy cập website này</td>
            <td>
              Không có dữ liệu nào do chúng tôi tự lưu. Như mọi website, các nhà
              cung cấp lưu trữ và an ninh của chúng tôi xử lý dữ liệu kỹ thuật
              như địa chỉ IP, loại trình duyệt và thời điểm của mỗi yêu cầu, để
              hiển thị trang và chặn các cuộc tấn công. Phông chữ được phục vụ từ
              chính website của chúng tôi, không qua bên thứ ba.
            </td>
          </tr>
          <tr>
            <td>Người gửi email cho chúng tôi</td>
            <td>Địa chỉ email của bạn và nội dung bạn viết cho chúng tôi.</td>
          </tr>
          <tr>
            <td>Chủ tiệm</td>
            <td>
              Họ tên, địa chỉ email và số điện thoại của bạn; tên và địa chỉ cửa
              hàng; dịch vụ, giá, giờ mở cửa và tên nhân viên; cùng thông tin
              đăng nhập của bạn.
            </td>
          </tr>
          <tr>
            <td>Khách sử dụng trợ lý đặt lịch</td>
            <td>
              Nội dung bạn nhắn, câu trả lời của trợ lý, và lịch hẹn được tạo ra.
              Vui lòng không chia sẻ thông tin nhạy cảm trong cuộc trò chuyện.
            </td>
          </tr>
          <tr>
            <td>Chủ tiệm tải lên ảnh bảng giá</td>
            <td>Bức ảnh, và danh sách dịch vụ được đọc ra từ đó.</td>
          </tr>
          <tr>
            <td>Khách đặt lịch</td>
            <td>
              Các thông tin cửa hàng yêu cầu, thường là họ tên và số điện thoại
              của bạn (đôi khi cả địa chỉ email), dịch vụ và giờ bạn chọn, cùng
              ghi chú bạn thêm vào.
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        <strong>Vui lòng không ghi thông tin nhạy cảm vào phần ghi chú đặt lịch.</strong>{" "}
        Thông tin sức khoẻ, ví dụ dị ứng trước một buổi phun xăm thẩm mỹ, là dữ
        liệu cá nhân nhạy cảm theo pháp luật Việt Nam và cần được bảo vệ cẩn
        thận hơn. Cửa hàng chỉ nên thu thập thông tin đó khi quy trình của chính
        họ thật sự cần và khách đã đồng ý. Nếu bạn cần dùng nó trong quy trình
        làm việc, hãy báo cho chúng tôi trước.
      </p>

      <h2>5. Vì sao chúng tôi sử dụng dữ liệu</h2>
      <ul>
        <li>
          <strong>Để vận hành dịch vụ:</strong> để tạo, hiển thị, thay đổi và huỷ
          lịch hẹn, và giữ cho lịch của cửa hàng luôn chính xác.
        </li>
        <li>
          <strong>Để vận hành các tính năng AI:</strong> để hiểu tin nhắn của
          khách và trả lời, để kiểm tra lịch trống và tạo lịch hẹn, và để đọc ảnh
          bảng giá thành một danh sách dịch vụ nháp.
        </li>
        <li>
          <strong>Để gửi tin nhắn về lịch hẹn:</strong> xác nhận và nhắc lịch,
          khi cửa hàng bật tính năng này. Các tin nhắn đi qua một nhà cung cấp
          dịch vụ nhắn tin như Zalo, SMS hoặc email, và chỉ mang những thông tin
          mà tin nhắn cần.
        </li>
        <li>
          <strong>Để giữ dịch vụ an toàn và cải thiện nó:</strong> để ngăn chặn
          hành vi lạm dụng, tìm lỗi, sửa lỗi, và xem pleasebookme được sử dụng ra
          sao.
        </li>
        <li>
          <strong>Để trả lời bạn:</strong> khi bạn viết cho chúng tôi.
        </li>
        <li>
          <strong>Để tuân thủ pháp luật:</strong> khi cơ quan có thẩm quyền của
          Việt Nam yêu cầu.
        </li>
      </ul>
      <p>
        Chúng tôi dựa vào sự đồng ý của bạn khi pháp luật yêu cầu, và dựa vào
        những gì cần thiết để thực hiện việc đặt lịch hoặc thoả thuận với cửa
        hàng. Khi xin sự đồng ý, chúng tôi xin riêng cho từng mục đích, lưu lại
        bằng chứng về sự đồng ý đó, và bạn có thể rút lại bất cứ lúc nào. Chúng
        tôi không dùng dữ liệu cá nhân cho mục đích tiếp thị trừ khi bạn đã đồng
        ý.
      </p>

      <h2>6. Chúng tôi chia sẻ dữ liệu với ai</h2>
      <ul>
        <li>
          <strong>Cửa hàng bạn đặt lịch</strong> xem được lịch hẹn của chính
          khách hàng của mình. Họ không xem được dữ liệu của các cửa hàng khác.
        </li>
        <li>
          <strong>Nhà cung cấp dịch vụ</strong> giúp chúng tôi vận hành
          pleasebookme: lưu trữ đám mây, an ninh, email, các kênh nhắn tin nêu
          trên và các dịch vụ AI ở mục 7. Họ chỉ được dùng dữ liệu để cung cấp
          dịch vụ cho chúng tôi.
        </li>
        <li>
          <strong>Cơ quan nhà nước có thẩm quyền</strong>, khi pháp luật Việt Nam
          yêu cầu.
        </li>
      </ul>
      <p>
        Một số nhà cung cấp lưu dữ liệu trên máy chủ đặt ngoài Việt Nam. Khi điều
        đó xảy ra, chúng tôi thực hiện những gì pháp luật Việt Nam yêu cầu đối
        với việc chuyển dữ liệu cá nhân ra nước ngoài. Chúng tôi không bán dữ
        liệu cá nhân.
      </p>

      <h2>7. Các tính năng AI</h2>
      <p>
        pleasebookme đang xây dựng các tính năng AI. Chúng đang được phát triển
        và có thể thay đổi.
      </p>
      <ul>
        <li>
          <strong>Trợ lý đặt lịch.</strong> Khách có thể trò chuyện với một trợ
          lý để hỏi giờ và đặt lịch. Trợ lý hoạt động thông qua hệ thống đặt lịch
          của chúng tôi: nó kiểm tra lịch trống thật của cửa hàng, giữ một khung
          giờ và tạo lịch hẹn. Khách được thông báo rằng họ đang trò chuyện với
          một trợ lý tự động. Nội dung bạn nhắn cho trợ lý, và câu trả lời của
          nó, được một nhà cung cấp dịch vụ AI xử lý để trợ lý có thể trả lời,
          và được lưu cùng với lịch hẹn.
        </li>
        <li>
          <strong>Ảnh bảng giá.</strong> Chủ tiệm có thể tải lên ảnh chụp bảng
          giá hoặc thực đơn dịch vụ. Một nhà cung cấp dịch vụ AI đọc ảnh và soạn
          ra danh sách dịch vụ nháp, và chủ tiệm kiểm tra bản nháp trước khi sử
          dụng. Vui lòng chỉ tải lên bảng giá, không tải ảnh có người.
        </li>
        <li>
          <strong>Hiểu cách pleasebookme được sử dụng.</strong> Chúng tôi dùng
          các công cụ AI để xem dịch vụ được sử dụng ra sao, nhằm sửa lỗi và cải
          thiện nó. Chúng tôi chủ yếu làm việc này với dữ liệu đã tổng hợp hoặc
          đã loại bỏ thông tin nhận dạng.
        </li>
      </ul>
      <p>
        Trợ lý chỉ giúp mọi người đặt lịch. Nó không quyết định điều gì về một
        người ngoài việc đề xuất và xác nhận lịch hẹn. Chúng tôi chọn những nhà
        cung cấp AI có điều khoản không cho phép họ dùng dữ liệu chúng tôi gửi để
        huấn luyện mô hình của họ. Các nhà cung cấp đó có thể xử lý dữ liệu trên
        máy chủ ngoài Việt Nam, nên mục 6 áp dụng với họ. Vui lòng không nói với
        trợ lý những thông tin nhạy cảm, chẳng hạn thông tin sức khoẻ.
      </p>

      <h2>8. Chúng tôi lưu dữ liệu trong bao lâu</h2>
      <ul>
        <li>
          Tài khoản cửa hàng và lịch hẹn: trong thời gian tài khoản của cửa hàng
          còn mở. Sau khi tài khoản đóng, chúng tôi xoá hoặc ẩn danh dữ liệu
          trong vòng 30 ngày, trừ khi pháp luật yêu cầu chúng tôi giữ lâu hơn.
        </li>
        <li>
          Các cuộc trò chuyện với trợ lý: cùng với lịch hẹn mà chúng thuộc về,
          tức là trong thời gian tài khoản của cửa hàng còn mở.
        </li>
        <li>
          Email gửi cho chúng tôi: trong thời gian chúng tôi cần để xử lý tin
          nhắn của bạn, và tối đa 12 tháng sau đó.
        </li>
        <li>
          Nhật ký kỹ thuật tại các nhà cung cấp của chúng tôi: trong khoảng thời
          gian ngắn họ đặt ra cho mục đích an ninh và vận hành ổn định.
        </li>
      </ul>

      <h2>9. Chúng tôi bảo vệ dữ liệu như thế nào</h2>
      <p>
        Website và dịch vụ chỉ được phục vụ qua HTTPS. Quyền truy cập dữ liệu cá
        nhân chỉ dành cho những người cần đến nó để vận hành pleasebookme. Không
        hệ thống nào an toàn tuyệt đối. Nếu một sự cố làm dữ liệu của bạn có
        nguy cơ bị lộ, chúng tôi sẽ thông báo cho các cửa hàng bị ảnh hưởng và
        cho cơ quan có thẩm quyền theo yêu cầu của pháp luật.
      </p>

      <h2>10. Quyền của bạn</h2>
      <p>Theo pháp luật Việt Nam, bạn có thể yêu cầu chúng tôi:</p>
      <ul>
        <li>cho bạn biết chúng tôi làm gì với dữ liệu cá nhân của bạn;</li>
        <li>cho bạn truy cập dữ liệu đó, hoặc chỉnh sửa nó;</li>
        <li>xoá nó, hoặc hạn chế cách chúng tôi sử dụng nó;</li>
        <li>ngừng sử dụng nó, nếu bạn phản đối;</li>
        <li>rút lại sự đồng ý bạn đã đưa ra.</li>
      </ul>
      <p>
        Bạn cũng có thể khiếu nại với cơ quan có thẩm quyền của Việt Nam, và yêu
        cầu bồi thường nếu bạn bị thiệt hại. Để thực hiện một quyền, hãy gửi
        email đến <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. Chúng
        tôi xác nhận đã nhận yêu cầu trong vòng 2 ngày làm việc và hoàn tất yêu
        cầu trong các thời hạn pháp luật Việt Nam quy định. Chúng tôi có thể cần
        xác minh rằng bạn đúng là người mà dữ liệu nói đến.
      </p>

      <h2>11. Trẻ em</h2>
      <p>
        pleasebookme được xây dựng cho doanh nghiệp và khách hàng của họ, không
        dành cho trẻ em. Một lịch hẹn cho trẻ, chẳng hạn cắt tóc, nên do cha mẹ
        hoặc người giám hộ đặt, và cửa hàng sẽ dùng thông tin liên hệ của cha mẹ
        hoặc người giám hộ. Chúng tôi không chủ ý thu thập dữ liệu của trẻ em cho
        mục đích riêng của mình. Nếu bạn cho rằng chúng tôi đã làm vậy, hãy viết
        cho chúng tôi và chúng tôi sẽ xoá nó.
      </p>

      <h2>12. Cookie</h2>
      <p>
        Website này không đặt cookie. Nếu điều đó thay đổi, chúng tôi sẽ cập nhật
        trang này và xin phép trước khi pháp luật yêu cầu.
      </p>

      <h2>13. Thay đổi chính sách này</h2>
      <p>
        Chúng tôi sẽ cập nhật trang này khi có điều gì thay đổi và ghi ngày ở đầu
        trang. Với những thay đổi quan trọng, chúng tôi cũng sẽ báo cho chủ tiệm
        qua email. Chính sách này có{" "}
        <Link href="/privacy" hrefLang="en" lang="en">
          bản tiếng Anh
        </Link>
        . Nếu hai bản khác nhau, bản tiếng Việt này là bản có hiệu lực.
      </p>

      <h2>14. Liên hệ</h2>
      <p>
        Câu hỏi, yêu cầu hoặc khiếu nại:{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    </LegalShell>
  );
}
