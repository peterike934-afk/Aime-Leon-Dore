import { useState } from "react"
import "./LegalPrivacy.css"

const TABS = [
  { id: "privacy", label: "Privacy Policy" },
  { id: "terms",   label: "Terms of Service" },
]

const PRIVACY_ITEMS = [
  {
    question: "Who is responsible for processing your personal data?",
    answer: "Aimé Leon Dore is the data controller responsible for the processing of your personal data collected through our website and services. If you have any questions about how we handle your data, you can contact us at privacy@aimeleondore.com."
  },
  {
    question: "Why do we process your personal data?",
    answer: "We process your personal data to fulfil orders, manage your account, send you updates about your orders, and improve our services. We may also use your data to send you marketing communications where you have given us permission to do so."
  },
  {
    question: "What type of personal data do we process?",
    answer: "We collect information such as your name, email address, shipping address, payment details, and browsing behaviour on our website. We may also collect device information and IP addresses for security and analytics purposes."
  },
  {
    question: "Where do we process your data?",
    answer: "Your data is processed within the United States and may be transferred to service providers located in other countries. We ensure that any such transfers are subject to appropriate safeguards in accordance with applicable data protection laws."
  },
  {
    question: "Who do we share your data with?",
    answer: "We may share your data with trusted third-party service providers who assist us in operating our website and fulfilling orders, including payment processors, shipping carriers, and analytics providers. We do not sell your personal data to third parties."
  },
  {
    question: "What are your rights?",
    answer: "You have the right to access, correct, or delete your personal data. You may also have the right to restrict or object to certain processing, and the right to data portability. To exercise any of these rights, please contact us at privacy@aimeleondore.com."
  },
]

function PrivacyPanel() {
  const [openIndex, setOpenIndex] = useState(null)
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i)

  return (
    <div className="lp-panel">
      <p className="lp-intro">
        When you shop with us or use one of our services, you trust us with your information.
        Protecting personal data and your privacy is of the greatest priority for Aimé Leon Dore.
      </p>
      <p className="lp-intro lp-intro--last">
        It is important to us to give you clear and transparent information about the personal
        data we collect, why it is needed, how it is used and your rights over it.
      </p>

      <div className="lp-accordion">
        {PRIVACY_ITEMS.map((item, i) => (
          <div key={i} className="lp-accordion-item">
            <button className="lp-accordion-trigger" onClick={() => toggle(i)}>
              <span className="lp-accordion-question">{item.question}</span>
              <span className={`lp-accordion-icon${openIndex === i ? " lp-accordion-icon--open" : ""}`}>
                &#8964;
              </span>
            </button>
            {openIndex === i && (
              <div className="lp-accordion-body"><p>{item.answer}</p></div>
            )}
          </div>
        ))}
      </div>

      <div className="lp-notice">
        <p>Please read our full Privacy Notice to understand in depth how we handle your personal data and the rights you have over it.</p>
        <a href="#" className="lp-notice-link">Aimé Leon Dore Privacy Notice</a>
      </div>
    </div>
  )
}

function TermsPanel() {
  return (
    <div className="lp-panel">
      <div className="lp-terms">

        <p className="lp-terms-date">Effective Date: February 24, 2026</p>

        <p className="lp-terms-p">
          Welcome to Aimé Leon Dore. These Terms of Service (the <strong>"Terms of Service"</strong>) set forth the terms and conditions that apply to your access and use of our websites <a href="https://www.aimeleondore.com" className="lp-terms-link">www.aimeleondore.com</a> (the <strong>"US Website"</strong>) and <a href="https://eu.aimeleondore.com" className="lp-terms-link">eu.aimeleondore.com</a> (the <strong>"EU Website,"</strong> and together with the U.S. Website, the <strong>"Websites"</strong>), any mobile applications we may develop in the future (each, an <strong>"App"</strong>), and your engagement with our services (collectively, the <strong>"Services"</strong>). Please review the following terms carefully. If you do not agree to these terms, you may not access or use the Services.
        </p>

        <p className="lp-terms-p">
          The terms <strong>"Aimé Leon Dore"</strong> or <strong>"us"</strong> or <strong>"we"</strong> or <strong>"our"</strong> refer to AIMÉ LEON DORE INC., the owner of the Services. The terms <strong>"you"</strong> or <strong>"your"</strong> refer to the user or viewer of the Services.
        </p>

        <p className="lp-terms-p lp-terms-caps">
          BY ACCESSING OR USING THE SERVICES, (1) YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTAND, AND AGREE TO BE BOUND BY THESE TERMS OF SERVICE, AND (2) YOU REPRESENT AND WARRANT THAT YOU ARE NOT PROHIBITED BY LAW FROM ACCESSING OR USING THE SERVICES IN YOUR JURISDICTION. THESE TERMS OF SERVICE CONTAIN, AMONG OTHER THINGS, AN ARBITRATION PROVISION CONTAINING A CLASS ACTION WAIVER. PLEASE READ THE "ARBITRATION" SECTION BELOW FOR ADDITIONAL INFORMATION.
        </p>

        <h4 className="lp-terms-subheading">Acceptance</h4>
        <p className="lp-terms-p">
          These Terms of Services are the only agreement between us and you and supersede all prior or contemporaneous agreements, representations, warranties and understandings with respect to the Services, the content, products or services provided by or through the Services, and the subject matter of these Terms of Service. You must be at least the age of legal majority where you live (which is currently 18 years old in most states) to use our Services, or you must have the permission of your parent or guardian who must agree to these terms on your behalf.
        </p>

        <h4 className="lp-terms-subheading">Modifications</h4>
        <p className="lp-terms-p">
          These Terms of Service may be amended at any time by us without specific notice to you. The latest Terms of Service will be posted on the Services, and you should review the Terms of Service prior to using the Services, so you are aware of any changes. Your continued use of the Services following the posting of revised Terms of Service means that you accept and agree to the changes.
        </p>

        <h4 className="lp-terms-subheading">Privacy</h4>
        <p className="lp-terms-p">
          The Privacy Policy is incorporated by reference into these Terms of Service, and your agreement to be bound by these Terms of Service means you are also bound by the Privacy Policy.
        </p>

        <h4 className="lp-terms-subheading">Shipping and Return Policies</h4>
        <p className="lp-terms-p">
          Our Shipping Policy and Return Policy are incorporated by reference into these Terms of Service, and your agreement to be bound by these Terms of Service means you are also bound by these policies.
        </p>

        <h4 className="lp-terms-subheading">Cancellation and Order Modification Policies</h4>
        <p className="lp-terms-p">
          Our Cancelation Policy and Order Modification Policy are incorporated by reference into these Terms of Service, and your agreement to be bound by these Terms of Service means you are also bound by these policies.
        </p>

        <h4 className="lp-terms-subheading">Use of Services</h4>
        <p className="lp-terms-p">
          Certain sections of, or offerings from, the Services may require you to register. If registration is requested, you agree to provide us with accurate, complete registration information. You also agree not to permit any other person, or multiple users on a network, to access and use the Services under your account. You are responsible for preventing such unauthorized use.
        </p>
        <p className="lp-terms-p">
          We reserve the right to close, suspend, or limit access to your account and/or the Services in the event that, in our sole discretion, (a) we are unable to obtain or verify identity or eligibility; (b) the security of your account has been compromised; or (c) your account has been used in, or seems to have been used in, a nefarious manner.
        </p>

        <h4 className="lp-terms-subheading">Copyright</h4>
        <p className="lp-terms-p">
          All text, photographs, images, illustrations, graphics, video material, audio material, music, software, tools, logos, titles, names, button icons and the selection, compilation and arrangement thereof on the Services, and other matters related to the Services (collectively, "Site Content") are protected under applicable copyrights, trademarks and other proprietary rights. The copying, redistribution, use or publication by you of any such Site Content or any part of the Services, except as allowed by these Terms of Service, is strictly prohibited.
        </p>

        <h4 className="lp-terms-subheading">Trademarks</h4>
        <p className="lp-terms-p">
          Aimé Leon Dore's name, logo, and all related names, logos, product and service names, designs, and slogans are trademarks of Aimé Leon Dore or its affiliates or licensors. You must not use, copy, reproduce, republish, upload, post, transmit, distribute, or modify such marks without the prior written permission of Aimé Leon Dore.
        </p>

        <h4 className="lp-terms-subheading">Limited License; Permitted Use</h4>
        <p className="lp-terms-p">
          You are granted a non-exclusive, non-transferable, non-sublicensable, revocable and personal license to access and use the Services and Site Content strictly in accordance with these Terms of Service. All other rights are reserved.
        </p>

        <h4 className="lp-terms-subheading">Restrictions and Prohibitions on Use</h4>
        <p className="lp-terms-p">
          Your license for access and use of the Services and Site Content therein are subject to the following restrictions and prohibitions on use: you may not (a) copy, republish, display, distribute, transmit, sell, rent, lease, loan or otherwise make available in any form or by any means all or any portion of the Services or any Content retrieved therefrom; (b) create compilations or derivative works of any Site Content from the Services; (c) use any Site Content from the Services in any manner that may infringe any copyright, intellectual property right, proprietary right, or property right of us or any third parties; (d) remove, change or obscure any copyright notice or other proprietary notice or terms of use contained in the Services.
        </p>

        <h4 className="lp-terms-subheading">Indemnification</h4>
        <p className="lp-terms-p">
          You agree to indemnify, defend and hold us and our partners, agents, officers, directors, employees, subcontractors, successors, assigns, third party suppliers, attorneys, advertisers, products and service providers, and affiliates harmless from and against any and all damage, liability, loss, claim, fine, penalty, cost and expense, including reasonable attorney's fees arising in any way from or in connection with your use or misuse of the Services.
        </p>

        <h4 className="lp-terms-subheading">Limitation of Liability</h4>
        <p className="lp-terms-p lp-terms-caps">
          TO THE FULLEST EXTENT PERMISSIBLE BY APPLICABLE LAW, IN NO EVENT SHALL WE OR ANY AFFILIATED PARTY BE LIABLE TO YOU OR ANY THIRD PARTY FOR DAMAGES OF ANY KIND, UNDER ANY LEGAL THEORY, ARISING OUT OF OR RELATED TO THE AVAILABILITY, USE, RELIANCE ON, OR INABILITY TO USE, THE WEBSITES, SERVICES, ANY SITE CONTENT OR OTHER MATERIALS, INCLUDING ANY DIRECT, INDIRECT, SPECIAL, EXEMPLARY, INCIDENTAL, CONSEQUENTIAL OR PUNITIVE DAMAGES.
        </p>

        <h4 className="lp-terms-subheading">Governing Law and Dispute Resolution</h4>
        <p className="lp-terms-p">
          These Terms of Service will be governed by, and construed in accordance with, the laws in effect in the State of New York, and applicable federal law, without regard to its conflicts of law principles. Any disputes between you and us shall exclusively be settled through binding and confidential arbitration.
        </p>
        <p className="lp-terms-p lp-terms-caps">
          YOU UNDERSTAND AND AGREE THAT, BY AGREEING TO THIS AGREEMENT, YOU AND AIMÉ LEON DORE ARE EACH WAIVING THE RIGHT TO A TRIAL BY JURY OR TO PARTICIPATE IN A CLASS ACTION.
        </p>

        <h4 className="lp-terms-subheading">Force Majeure</h4>
        <p className="lp-terms-p">
          Aimé Leon Dore will not be liable for any delay or failure to perform any obligation herein if the delay or failure is due to unforeseen events that are beyond our reasonable control, such as strikes, blockade, war, terrorism, riots, natural disasters, epidemic, or governmental action.
        </p>

        <h4 className="lp-terms-subheading">Contact Information</h4>
        <p className="lp-terms-p">
          If you have any questions or concerns about these Terms of Service, please email us at <a href="mailto:terms@aimeleondore.com" className="lp-terms-link">terms@aimeleondore.com</a>.
        </p>

      </div>
    </div>
  )
}

export default function LegalPrivacy({ heroImage }) {
  const [activeTab, setActiveTab] = useState("privacy")

  return (
    <div className="lp-page">

      {/* HERO PHOTO */}
      <div
        className="lp-hero"
        style={heroImage ? { backgroundImage: `url(${heroImage})` } : undefined}
      />

      {/* TABS BAR */}
      <div className="lp-tabs-bar">
        <div className="lp-tabs-label">Legal &amp; Privacy</div>
        <nav className="lp-tabs-nav">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`lp-tab-btn${activeTab === tab.id ? " lp-tab-btn--active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* PANEL CONTENT */}
      <div className="lp-panel-area">
        {activeTab === "privacy" ? <PrivacyPanel /> : <TermsPanel />}
      </div>

    </div>
  )
}
