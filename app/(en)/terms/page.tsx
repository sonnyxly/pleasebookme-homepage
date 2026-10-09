import type { Metadata } from "next";
import Link from "next/link";
import LegalShell from "../../legal-shell";
import { getDict } from "../../i18n";
import { pageMetadata } from "../../seo";
import { CONTACT_EMAIL } from "../../site";

const d = getDict("en");

export const metadata: Metadata = pageMetadata({
  locale: "en",
  page: "terms",
  title: d.meta.termsTitle,
  description: d.meta.termsDescription,
});

/*
  DRAFT BASELINE. Not reviewed by a Vietnamese lawyer. Before launch, confirm:
  - "free for now" and the 30 days' notice before any fee (section 3);
  - the 30 day export window after closure (section 12);
  - the liability cap wording against Vietnamese commercial and civil law (section 13);
  - the courts of Hanoi as the forum (section 15);
  - who "we" is once the household business (HKD) is registered;
  - that the Vietnamese version (app/vi/terms) is kept in step with this one;
  - the AI clauses (section 7) against Vietnamese rules on AI, which were not checked.
*/

export default function Terms() {
  return (
    <LegalShell
      locale="en"
      page="terms"
      title="Terms of Service"
      intro="These are the terms for using pleasebookme. They are short on purpose. If something here is unclear, ask us before you sign up."
    >
      <h2>1. About these terms</h2>
      <p>
        pleasebookme is a booking tool for small shops in Vietnam: a booking
        widget that customers use, and a dashboard that shop owners use. It is
        operated by its founders from Hanoi, Vietnam. In these terms,
        &ldquo;we&rdquo; means the founders and any business we set up to run pleasebookme.
        &ldquo;You&rdquo; means the shop owner who signs up.
      </p>
      <p>
        By creating an account or using the service, you agree to these terms
        and to our <Link href="/privacy">Privacy Policy</Link>. If you do not
        agree, please do not use pleasebookme.
      </p>

      <h2>2. The service</h2>
      <p>
        You set up your services, their lengths and your opening hours. Your
        customers use the widget to pick a service and a free time. You see the
        bookings on your dashboard. We may add, change or remove features as the
        product develops.
      </p>
      <p>
        <strong>pleasebookme is in early access.</strong> It is still being
        built and tested, and some things will break. We will fix them, and we
        will tell you what we know.
      </p>

      <h2>3. Early access and fees</h2>
      <p>
        Early access is free for now. If we introduce fees, we will tell you at
        least 30 days before they apply, with the price, and you can stop using
        pleasebookme before then without paying anything. We will never charge
        you without telling you first.
      </p>
      <p>
        Today, pleasebookme does not take payment between your customers and
        you. Any payment for your services happens directly between you and your
        customer.
      </p>

      <h2>4. Your account</h2>
      <ul>
        <li>You must be at least 18 and be using pleasebookme for a business.</li>
        <li>The information you give us must be true and kept up to date.</li>
        <li>
          Keep your sign-in details to yourself. You are responsible for what
          happens under your account. Tell us at once if you think someone else
          has used it.
        </li>
      </ul>

      <h2>5. What you are responsible for</h2>
      <ul>
        <li>
          <strong>Your bookings.</strong> The appointment is between you and your
          customer. We are not a party to it. You decide whether to accept,
          move or cancel a booking, and you are responsible for honouring the
          ones you accept.
        </li>
        <li>
          <strong>Your information.</strong> Your services, prices, hours and
          descriptions must be accurate and lawful.
        </li>
        <li>
          <strong>Your customers&apos; data.</strong> You decide which details you
          ask customers for. Ask only for what you need, tell customers how you
          use it, and get their agreement where the law requires. Keep sensitive
          details, such as health information, out of booking notes unless your
          process truly needs them and the customer has agreed. We process your
          customers&apos; data on your behalf, as described in the{" "}
          <Link href="/privacy">Privacy Policy</Link>.
        </li>
        <li>
          <strong>Messages.</strong> If you turn on confirmations or reminders,
          you confirm that your customers can be contacted that way.
        </li>
        <li>
          <strong>The law.</strong> You follow the laws that apply to your
          business in Vietnam.
        </li>
      </ul>

      <h2>6. What you may not do</h2>
      <ul>
        <li>Use pleasebookme for anything unlawful, misleading or abusive.</li>
        <li>
          Try to break, overload, probe or get around the service or its
          security.
        </li>
        <li>
          Copy, resell or build a competing product from the service, or take
          its code apart, except where the law allows it.
        </li>
        <li>
          Use pleasebookme to send spam, or to collect data about people who
          are not your customers.
        </li>
      </ul>

      <h2>7. AI features</h2>
      <p>
        pleasebookme includes AI features: an assistant that helps your
        customers ask about times and book, and a tool that reads a photo of
        your menu into a draft list of services. They are in development and may
        change or be removed.
      </p>
      <ul>
        <li>
          <strong>Check the drafts.</strong> A list of services read from a
          photo is only a draft. You must check the names, prices and lengths
          before you publish it, and you are responsible for what you publish.
        </li>
        <li>
          <strong>The assistant can be wrong.</strong> It works through our
          booking system, which is the record of what is booked, but AI can
          misunderstand a message. Look at your schedule, and tell your customer
          if a booking is not right.
        </li>
        <li>
          <strong>Tell your customers.</strong> The assistant says that it is an
          automated assistant. Do not present it as a person.
        </li>
        <li>
          <strong>What you upload.</strong> Upload only menus and price lists
          you have the right to use, not photos of people or their personal
          details.
        </li>
        <li>
          <strong>Use it properly.</strong> Do not try to make the assistant do
          anything other than help people book.
        </li>
      </ul>
      <p>
        We use third-party AI providers to run these features, and the{" "}
        <Link href="/privacy">Privacy Policy</Link> explains how data is handled.
        We do not promise that AI output is free of errors.
      </p>

      <h2>8. Your content and your data</h2>
      <p>
        What you put into pleasebookme, such as your services, hours and
        bookings, stays yours. You give us permission to store it, show it and
        process it, only so that we can run the service for you. When you leave,
        you can ask for a copy of your data (see section 13).
      </p>

      <h2>9. Our property</h2>
      <p>
        pleasebookme, its software, its name, its logo and its design belong to
        us. These terms give you the right to use the service as it is offered.
        They do not give you ownership of any of it. Parts of the service use
        open-source software and fonts, which stay under their own licences.
      </p>

      <h2>10. Other services</h2>
      <p>
        pleasebookme relies on other services, for example hosting and messaging
        providers such as Zalo, and the AI services we use. We do not control them. If one of them changes
        or goes down, parts of pleasebookme may be affected.
      </p>

      <h2>11. Availability</h2>
      <p>
        We work to keep pleasebookme running and your bookings safe, but we
        cannot promise it will always be available or free of errors, and
        early access comes as it is. For an appointment that really matters, we
        suggest you also keep your own note of it until you trust the service.
      </p>

      <h2>12. Suspending or ending your access</h2>
      <p>
        You can stop using pleasebookme and close your account at any time by
        emailing <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. We
        may suspend or close an account that breaks these terms, puts the
        service or other people at risk, or where the law requires it. Where we
        reasonably can, we will warn you first and explain why.
      </p>

      <h2>13. When you leave</h2>
      <p>
        After you close your account, you can ask us for a copy of your data for
        30 days. After that, we delete or anonymise it as the{" "}
        <Link href="/privacy">Privacy Policy</Link> describes.
      </p>

      <h2>14. Limits on our liability</h2>
      <p>
        To the extent the law allows, we are not liable for indirect or
        consequential loss, for lost profit, or for appointments that are missed
        or double-booked because of an error in the service, an outage, or a
        third-party service. Our total liability for any claim connected with
        pleasebookme is limited to the fees you paid us in the 12 months before
        the claim. If you paid nothing, we are not liable beyond what Vietnamese
        law requires.
      </p>
      <p>
        Nothing in these terms limits a liability that the law does not allow us
        to limit, or any right you have under Vietnamese consumer or data
        protection law.
      </p>

      <h2>15. Changes to these terms</h2>
      <p>
        We may update these terms as pleasebookme grows. For material changes
        we will email you at least 14 days before they apply. If you do not
        agree to them, you can close your account before then. Using the service
        after that date means you accept the new terms.
      </p>

      <h2>16. Law and disputes</h2>
      <p>
        These terms are governed by the laws of Vietnam. If we disagree, we will
        first try to settle it by talking. If that does not work, the competent
        courts in Hanoi will decide. A{" "}
        <Link href="/vi/terms" hrefLang="vi" lang="vi">
          Vietnamese version
        </Link>{" "}
        of these terms is available. If the two differ, the Vietnamese version
        prevails.
      </p>

      <h2>17. Contact</h2>
      <p>
        Questions about these terms:{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    </LegalShell>
  );
}
