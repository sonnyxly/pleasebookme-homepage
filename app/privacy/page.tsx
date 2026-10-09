import type { Metadata } from "next";
import LegalShell from "../legal-shell";
import { CONTACT_EMAIL } from "../site";
import { pageMetadata } from "../seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "What pleasebookme collects, why, who sees it, how long we keep it, and how to use your rights.",
  path: "/privacy",
});

/*
  DRAFT BASELINE. Not reviewed by a Vietnamese lawyer. Before launch, confirm:
  - the retention periods in section 7 (30 days after closure, 12 months for emails);
  - the 2 working day acknowledgement in section 9;
  - the named providers once hosting and messaging are decided (currently generic);
  - who "we" is once the household business (HKD) is registered;
  - that the Vietnamese version is published and kept in step;
  - the AI section (7): that the chosen AI providers really do not train on our data,
    where they process it, and how long assistant chats are kept;
  - the Vietnamese rules on AI and on automated processing, which were not checked.
  Legal references: Law on Personal Data Protection No. 91/2025/QH15 and
  Decree 356/2025/ND-CP, both in force from 1 January 2026.
*/

export default function Privacy() {
  return (
    <LegalShell
      title="Privacy Policy"
      intro="What we collect, why, who sees it, how long we keep it, and how you can use your rights. We have tried to write it plainly."
    >
      <h2>1. Who we are</h2>
      <p>
        pleasebookme is a booking tool for small shops in Vietnam: a booking
        widget that customers use, and a dashboard that shop owners use. It is
        operated by its founders from Hanoi, Vietnam. In this policy, &ldquo;we&rdquo;
        means the founders and any business we set up to run pleasebookme.
      </p>
      <p>
        You can reach us at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>

      <h2>2. The short version</h2>
      <ul>
        <li>
          This website sets no cookies and runs no analytics or advertising
          trackers.
        </li>
        <li>
          We do not sell personal data, and we do not use it to show you ads.
        </li>
        <li>
          For shop owners, we process the data needed to run your account.
        </li>
        <li>
          Our booking assistant and menu reader are AI features in development.
          They work through our booking system, and section 7 explains them.
        </li>
        <li>
          For customers who book through a shop, the shop decides what is
          collected and why. We process it on the shop&apos;s behalf, to deliver
          the booking.
        </li>
        <li>
          You can ask to see, correct or delete your data at any time. See
          section 10.
        </li>
      </ul>

      <h2>3. Two roles</h2>
      <p>
        Vietnamese law (the Law on Personal Data Protection and Decree
        356/2025/ND-CP) separates the party that decides how data is used from
        the party that handles it for them. We act in two ways:
      </p>
      <ul>
        <li>
          <strong>Shop owners.</strong> For the details of your account, we
          decide why and how they are used. We are responsible for them.
        </li>
        <li>
          <strong>Customers who book.</strong> The shop decides to take
          bookings and which details to ask for. We process those details on the
          shop&apos;s instructions, only to run the booking service. If you are a
          customer, the shop is usually the best first contact for your data.
          You may also write to us, and we will help.
        </li>
      </ul>

      <h2>4. What we collect</h2>
      <table>
        <thead>
          <tr>
            <th>Who</th>
            <th>What</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Visitors to this website</td>
            <td>
              Nothing that we store ourselves. Like any website, our hosting and
              security providers handle technical data such as your IP address,
              browser type and the time of each request, to deliver the page and
              block attacks. Fonts are served from our own site, not from a
              third party.
            </td>
          </tr>
          <tr>
            <td>People who email us</td>
            <td>Your email address and whatever you write to us.</td>
          </tr>
          <tr>
            <td>Shop owners</td>
            <td>
              Your name, email address and phone number; your shop&apos;s name and
              address; your services, prices, opening hours and staff names; and
              your sign-in details.
            </td>
          </tr>
          <tr>
            <td>Customers who use the booking assistant</td>
            <td>
              What you type, the assistant&apos;s replies, and the booking that
              results. Please do not share sensitive details in the chat.
            </td>
          </tr>
          <tr>
            <td>Shop owners who upload a menu photo</td>
            <td>The photo, and the list of services read from it.</td>
          </tr>
          <tr>
            <td>Customers who book</td>
            <td>
              The details the shop asks for, usually your name and phone number
              (and sometimes your email address), the service and time you
              chose, and any note you add.
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        <strong>Please keep sensitive details out of booking notes.</strong>{" "}
        Health information, for example an allergy before a PMU session, is
        sensitive personal data under Vietnamese law and needs extra care. Shops
        should only collect it if their own process needs it and the customer has
        agreed. If you need it in your workflow, tell us first.
      </p>

      <h2>5. Why we use it</h2>
      <ul>
        <li>
          <strong>To run the service:</strong> to make, show, change and cancel
          bookings, and to keep shop schedules correct.
        </li>
        <li>
          <strong>To run the AI features:</strong> to understand a
          customer&apos;s message and reply, to check availability and make the
          booking, and to read a menu photo into a draft list of services.
        </li>
        <li>
          <strong>To send booking messages:</strong> confirmations and reminders,
          when a shop turns them on. These go through a messaging provider such
          as Zalo, SMS or email, and carry only what the message needs.
        </li>
        <li>
          <strong>To keep the service safe and improve it:</strong> to prevent
          abuse, find faults, fix them, and see how pleasebookme is used.
        </li>
        <li>
          <strong>To answer you:</strong> when you write to us.
        </li>
        <li>
          <strong>To follow the law:</strong> when a Vietnamese authority
          requires it.
        </li>
      </ul>
      <p>
        We rely on your consent where the law needs it, and on what is needed to
        carry out the booking or the agreement with the shop. When we ask for
        consent we ask for each purpose separately, we keep a record of it, and
        you can withdraw it at any time. We do not use personal data for
        marketing unless you have agreed.
      </p>

      <h2>6. Who we share it with</h2>
      <ul>
        <li>
          <strong>The shop you booked with</strong> sees its own customers&apos;
          bookings. It does not see other shops&apos; data.
        </li>
        <li>
          <strong>Service providers</strong> that help us run pleasebookme:
          cloud hosting, security, email, the messaging channels above and the
          AI services in section 7. They
          may only use the data to provide their service to us.
        </li>
        <li>
          <strong>Authorities</strong>, where Vietnamese law requires it.
        </li>
      </ul>
      <p>
        Some providers keep data on servers outside Vietnam. Where that happens,
        we do what Vietnamese law requires for sending personal data abroad. We
        do not sell personal data.
      </p>

      <h2>7. AI features</h2>
      <p>
        pleasebookme is building AI features. They are in development and may
        change.
      </p>
      <ul>
        <li>
          <strong>The booking assistant.</strong> Customers can chat with an
          assistant to ask about times and book. It works through our booking
          system: it checks the shop&apos;s real availability, holds a slot and
          creates the booking. Customers are told they are talking to an
          automated assistant. What you type to it, and its replies, are
          processed by an AI service provider so that it can answer, and are
          kept with the booking.
        </li>
        <li>
          <strong>Menu photos.</strong> A shop owner can upload a photo of a
          menu or price list. An AI service provider reads it and drafts a list
          of services, and the owner checks the draft before it is used. Please
          upload only the menu, not photos of people.
        </li>
        <li>
          <strong>Understanding how pleasebookme is used.</strong> We use AI
          tools to look at how the service is used, so we can fix problems and
          improve it. We do this mostly with combined or de-identified data.
        </li>
      </ul>
      <p>
        The assistant only helps people book. It does not decide anything about
        a person beyond offering and confirming a booking. We choose AI
        providers whose terms do not allow them to train their models on the
        data we send them. Those providers may process data on servers outside
        Vietnam, so section 6 applies to them. Please do not tell the assistant
        sensitive details, such as health information.
      </p>

      <h2>8. How long we keep it</h2>
      <ul>
        <li>
          Shop accounts and booking records: while the shop&apos;s account is open.
          After it closes, we delete or anonymise them within 30 days, unless
          the law requires us to keep something longer.
        </li>
        <li>
          Chats with the assistant: with the booking they belong to, so for as
          long as the shop&apos;s account is open.
        </li>
        <li>
          Emails to us: for as long as we need to deal with your message, and up
          to 12 months after.
        </li>
        <li>
          Technical logs at our providers: for the short periods they set for
          security and reliability.
        </li>
      </ul>

      <h2>9. How we protect it</h2>
      <p>
        The site and the service are served over HTTPS only. Access to personal
        data is limited to the people who need it to run pleasebookme. No system
        is perfectly secure. If a breach puts your data at risk, we will tell
        the affected shops and the authorities as the law requires.
      </p>

      <h2>10. Your rights</h2>
      <p>Under Vietnamese law you can ask us to:</p>
      <ul>
        <li>tell you what we do with your personal data;</li>
        <li>give you access to it, or correct it;</li>
        <li>delete it, or restrict how we use it;</li>
        <li>stop using it, if you object;</li>
        <li>take back a consent you gave.</li>
      </ul>
      <p>
        You can also complain to the competent Vietnamese authority, and seek
        compensation if you have been harmed. To use a right, email{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. We confirm
        receipt within 2 working days and complete the request within the
        deadlines Vietnamese law sets. We may need to check that you are the
        person the data is about.
      </p>

      <h2>11. Children</h2>
      <p>
        pleasebookme is built for businesses and their customers, not for
        children. A booking for a child, such as a haircut, should be made by a
        parent or guardian, and the shop will use the parent&apos;s or guardian&apos;s
        contact details. We do not knowingly collect children&apos;s data for our
        own purposes. If you think we have, write to us and we will delete it.
      </p>

      <h2>12. Cookies</h2>
      <p>
        This website does not set cookies. If that changes, we will update this
        page and ask first where the law requires it.
      </p>

      <h2>13. Changes to this policy</h2>
      <p>
        We will update this page when something changes and show the date at the
        top. For material changes, we will also tell shop owners by email. A
        Vietnamese version of this policy is planned. When it is published, it
        prevails if the two differ.
      </p>

      <h2>14. Contact</h2>
      <p>
        Questions, requests or complaints:{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    </LegalShell>
  );
}
