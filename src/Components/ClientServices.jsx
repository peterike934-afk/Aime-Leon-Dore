import React, { useState, useRef, useEffect, useCallback } from "react"
import "./ClientServices.css"

const TABS = [
  { id: "order-status", label: "Order Status" },
  { id: "payment",      label: "Payment" },
  { id: "shipping",     label: "Shipping & Delivery" },
  { id: "returns",      label: "Returns" },
  { id: "sale",         label: "Sale Policy" },
  { id: "products",     label: "Products" },
  { id: "draws",        label: "Draws" },
  { id: "reservations", label: "Reservations" },
  { id: "flagship",     label: "Flagship" },
  { id: "events",       label: "Private Events" },
  { id: "masaryk",      label: "Masaryk Gym" },
]

const TAB_QA = {
  "order-status": [
    { q: "How do I check the status of my order?", a: "You can check your order status by logging into your account and visiting the Order History section. You will also receive a confirmation email with tracking information once your order has shipped." },
    { q: "How long does it take to process my order?", a: "Orders are processed Monday through Friday, excluding holidays. Most orders are processed within 1 to 2 business days. You will receive a shipping confirmation email once your order is on its way." },
    { q: "Can I modify or cancel my order after placing it?", a: "Once an order is submitted it cannot be changed or cancelled. As we work to fulfil all orders within a timely manner, our warehouse begins working on your order shortly after it is submitted. Should you wish to return your order, please see our Returns section." },
    { q: "I received the wrong item — what should I do?", a: "We sincerely apologise for the error. Please contact our Client Services team with your order number and a photo of the incorrect item and we will resolve this for you as quickly as possible." },
    { q: "My order says delivered but I haven't received it.", a: "Please first check around your delivery address and with neighbours. If you still cannot locate your package, contact our Client Services team within 7 days of the marked delivery date and we will investigate on your behalf." },
  ],
  payment: [
    { q: "What payment methods do you accept?", a: "We accept Visa, Mastercard, American Express, Discover, PayPal, Apple Pay, Google Pay, Shop Pay, and Gift Cards." },
    { q: "Is my payment information secure?", a: "Yes. All transactions are securely processed and encrypted. We do not store your full card details on our servers." },
    { q: "Can I use multiple payment methods on one order?", a: "You may use a gift card in combination with another payment method. However, we do not support splitting payments between two credit cards." },
    { q: "Why was my payment declined?", a: "Payments can be declined for a number of reasons including incorrect billing information, insufficient funds, or flagging by your bank. Please verify your details or contact your bank. If the issue persists, reach out to our Client Services team." },
    { q: "Do you charge sales tax?", a: "Sales tax is calculated at checkout based on your shipping address and applicable local laws." },
  ],
  shipping: [
    { q: "How long does shipping take?", a: "Standard domestic orders take 5 to 7 business days. Express domestic orders take 2 to 3 business days. International orders take 7 to 14 business days." },
    { q: "Do you offer free shipping?", a: "Yes. Complimentary standard shipping is available on all domestic orders over $250." },
    { q: "Do you ship internationally?", a: "Yes, we ship worldwide. International duties and taxes are calculated at checkout and are the responsibility of the customer." },
    { q: "How do I track my order?", a: "Once your order ships, you will receive a confirmation email with a tracking number. You can use this to follow your parcel on our carrier's website. Tracking is also available under Order History in your account." },
    { q: "Do you ship to PO Boxes or APO/FPO addresses?", a: "We are unable to deliver to PO Boxes or military addresses at this time. Please provide a residential or commercial street address when placing your order." },
  ],
  returns: [
    { q: "What is your return policy?", a: "We accept returns within 30 days of delivery. Items must be unworn, unwashed, and in their original packaging with all tags attached." },
    { q: "How do I initiate a return?", a: "To start a return, email our team at services@yourstore.com with your order number and reason for return. We will provide a prepaid shipping label within one business day." },
    { q: "How long does a refund take?", a: "Once we receive and inspect your return, refunds are processed within 3 to 5 business days to your original payment method." },
    { q: "Can I exchange for a different size?", a: "Yes. Subject to availability, we are happy to arrange a size exchange. Please contact our team before returning your item so we can reserve your preferred size." },
    { q: "Are sale items returnable?", a: "All sale and final sale items are non-returnable unless they arrive damaged or defective." },
  ],
  sale: [
    { q: "What is your sale policy?", a: "All sale items are considered final sale. We do not accept returns or exchanges on discounted merchandise unless the item arrives damaged or defective." },
    { q: "Can I get a price adjustment on a sale item?", a: "Price adjustments are not available on previously purchased items." },
    { q: "Can I use a discount code on sale items?", a: "Discount codes cannot be applied to items already marked on sale unless otherwise stated at checkout." },
  ],
  products: [
    { q: "How do I find the right size?", a: "Our sizing is true to size with a relaxed, slightly oversized cut. If you prefer a more fitted silhouette, we recommend sizing down. Each product page includes specific fit notes and model measurements." },
    { q: "How do I care for my garment?", a: "Always refer to the care label sewn into each garment. As a general rule, we recommend cold water washing, gentle cycles, and air drying flat. Avoid tumble drying unless specifically indicated." },
    { q: "Are your products restocked?", a: "Select styles are restocked on a limited basis. We recommend signing up for restock notifications on the product page or following our channels for updates." },
    { q: "Where are your products made?", a: "Our products are crafted in various countries with a focus on quality and craftsmanship. Specific country of origin information is listed on the garment label." },
  ],
  draws: [
    { q: "What is a draw?", a: "A draw is our system for releasing limited and high-demand products. Instead of a first-come, first-served checkout, all entries are collected over a set period and winners are selected at random." },
    { q: "How do I enter a draw?", a: "You must have a registered account and be signed in to enter a draw. Navigate to the product page during the draw window and submit your entry." },
    { q: "When will I find out if I won?", a: "Winners are notified by email after the draw closes. Payment is only charged upon selection." },
    { q: "Can I return a draw item?", a: "All draw sales are final. We do not accept returns or exchanges on draw items." },
  ],
  reservations: [
    { q: "How do I make a reservation?", a: "In-store reservations are available for select product consultations and experiences. Please contact our flagship store directly by phone or email to book an appointment." },
    { q: "What are your reservation hours?", a: "Reservations are available Monday through Saturday 11am to 7pm, and Sunday 12pm to 6pm." },
    { q: "Can I cancel or reschedule a reservation?", a: "Yes. Please contact us at least 24 hours in advance to cancel or reschedule your appointment." },
  ],
  flagship: [
    { q: "Where is your flagship store located?", a: "Our flagship store is located at 123 Your Street, New York, NY 10001." },
    { q: "What are your store hours?", a: "We are open Monday through Saturday 11am to 7pm, and Sunday 12pm to 6pm." },
    { q: "Can I return online orders in store?", a: "Items purchased online are not returnable in-store. In-store purchases are only returnable in-store. Please see our Returns section for online return instructions." },
    { q: "Do you offer in-store styling or shopping assistance?", a: "Yes. Our in-store team is available to assist with styling, sizing, and product questions. Walk-ins are always welcome." },
  ],
  events: [
    { q: "Do you host private shopping events?", a: "Yes. We offer private shopping events and brand experiences for select clients. To enquire, please contact our team at services@yourstore.com." },
    { q: "How do I request a private event?", a: "Please email services@yourstore.com with your name, contact information, and a brief description of the event you have in mind. Our team will follow up within two business days." },
  ],
  masaryk: [
    { q: "What is Masaryk Gym?", a: "Masaryk Gym is our members-only fitness space located within the flagship store, designed for the ALD community." },
    { q: "How do I become a member?", a: "Membership is by invitation only. Please contact services@yourstore.com for more information on availability." },
    { q: "What are the gym hours?", a: "The gym is open Monday through Friday 6am to 9pm, and Saturday through Sunday 8am to 6pm." },
  ],
}

/* ── Accordion ── */
function AccordionPanel({ items }) {
  const [openIndex, setOpenIndex] = useState(null)
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i)
  return (
    <div className="cs-accordion">
      {items.map((item, i) => (
        <div key={i} className="cs-accordion-item">
          <button className="cs-accordion-trigger" onClick={() => toggle(i)}>
            <span className="cs-accordion-question">{item.q}</span>
            <span className={`cs-accordion-icon${openIndex === i ? " cs-accordion-icon--open" : ""}`}>&#8964;</span>
          </button>
          {openIndex === i && (
            <div className="cs-accordion-body"><p>{item.a}</p></div>
          )}
        </div>
      ))}
    </div>
  )
}

/* ── Request Form ── */
const EMPTY_FORM = { email: "", inquiry: "", site: "", order: "", subject: "", description: "", attachments: [] }

function RequestForm() {
  const [form, setForm] = useState(EMPTY_FORM)
  const fileRef = useRef(null)

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleFiles = (e) => {
    const files = Array.from(e.target.files)
    setForm((prev) => ({ ...prev, attachments: [...prev.attachments, ...files] }))
  }

  const removeFile = (index) =>
    setForm((prev) => ({ ...prev, attachments: prev.attachments.filter((_, i) => i !== index) }))

  const submit = (e) => {
    e.preventDefault()
    alert("Message sent. We'll be in touch shortly.")
    setForm(EMPTY_FORM)
    if (fileRef.current) fileRef.current.value = ""
  }

  return (
    <div className="cs-panel-default">
      <p className="cs-instruction">Please select one of the topics above for more information.</p>
      <p className="cs-instruction">Standard Hours of Operation: Monday – Friday 10am – 6pm EST</p>
      <p className="cs-instruction cs-instruction--last">
        To contact Client Services for additional support, please fill out the form below.
      </p>

      <form className="cs-form" onSubmit={submit}>
        <p className="cs-form-title">REQUEST FORM</p>

        <div className="cs-field">
          <input className="cs-input" type="email" name="email" placeholder="Email Address" value={form.email} onChange={handle} required />
        </div>

        <div className="cs-field">
          <div className="cs-select-wrap">
            <select name="inquiry" value={form.inquiry} onChange={handle} className="cs-select">
              <option value="" disabled>Which best describes your inquiry?</option>
              <option>Order Issue</option>
              <option>Return or Exchange</option>
              <option>Product Question</option>
              <option>Shipping Question</option>
              <option>Other</option>
            </select>
            <span className="cs-select-arrow">&#8964;</span>
          </div>
        </div>

        <div className="cs-field">
          <div className="cs-select-wrap">
            <select name="site" value={form.site} onChange={handle} className="cs-select">
              <option value="" disabled>Which site did you purchase from?</option>
              <option>yourstore.com</option>
              <option>In-Store</option>
              <option>Other</option>
            </select>
            <span className="cs-select-arrow">&#8964;</span>
          </div>
        </div>

        <div className="cs-field">
          <input className="cs-input" type="text" name="order" placeholder="Order # (optional)" value={form.order} onChange={handle} />
        </div>

        <div className="cs-field">
          <input className="cs-input" type="text" name="subject" placeholder="Subject" value={form.subject} onChange={handle} />
        </div>

        <div className="cs-field">
          <textarea className="cs-textarea" name="description" placeholder="Description" value={form.description} onChange={handle} rows={4} />
        </div>

        {form.attachments.length > 0 && (
          <div className="cs-attachments">
            {form.attachments.map((file, i) => (
              <div key={i} className="cs-attachment-item">
                <span>{file.name}</span>
                <button type="button" className="cs-attachment-remove" onClick={() => removeFile(i)}>✕</button>
              </div>
            ))}
            <button
              type="button"
              className="cs-clear-attachment"
              onClick={() => setForm((prev) => ({ ...prev, attachments: [] }))}
            >
              CLEAR ATTACHMENT(S)
            </button>
          </div>
        )}

        <input ref={fileRef} type="file" multiple style={{ display: "none" }} onChange={handleFiles} />

        <div className="cs-attachment-row">
          <button type="button" className="cs-add-attachment" onClick={() => fileRef.current?.click()}>
            ADD ATTACHMENT(S)
          </button>
        </div>

        <button className="cs-submit" type="submit">SUBMIT</button>
      </form>
    </div>
  )
}

/* ── Main Component ── */
export default function ClientServices({ heroImage }) {
  const [activeTab, setActiveTab]   = useState(null)
  const [showArrow, setShowArrow]   = useState(false)
  const [atEnd,     setAtEnd]       = useState(false)
  const scrollRef                   = useRef(null)

  const checkOverflow = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setShowArrow(el.scrollWidth > el.clientWidth + 1)
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2)
  }, [])

  useEffect(() => {
    const t  = setTimeout(checkOverflow, 100)
    const el = scrollRef.current
    window.addEventListener("resize", checkOverflow)
    if (el) el.addEventListener("scroll", checkOverflow)
    return () => {
      clearTimeout(t)
      window.removeEventListener("resize", checkOverflow)
      if (el) el.removeEventListener("scroll", checkOverflow)
    }
  }, [checkOverflow])

 const scrollTabs = (dir) => {
  const el = scrollRef.current
  if (!el) return
  const maxScroll = el.scrollWidth - el.clientWidth
  if (dir === "left") {
    el.scrollTo({ left: Math.max(el.scrollLeft - 220, 0), behavior: "smooth" })
  } else {
    el.scrollTo({ left: Math.min(el.scrollLeft + 220, maxScroll), behavior: "smooth" })
  }
}

  const handleMobileSelect = (e) => {
    const val = e.target.value
    setActiveTab(val === "" ? null : val)
  }

  return (
    <div className="cs-page">

      {/* HERO */}
      <div
        className="cs-hero"
        style={heroImage ? { backgroundImage: `url(${heroImage})` } : undefined}
      />

      {/* DESKTOP TAB BAR */}
      <div className="cs-tabs-bar">
  <button
    className={`cs-tabs-label${activeTab === null ? " cs-tabs-label--active" : ""}`}
    onClick={() => setActiveTab(null)}
  >
    Client Services
  </button>

  {showArrow && (
    <button
      className="cs-tabs-arrow cs-tabs-arrow--left"
      onClick={() => scrollTabs("left")}
      aria-label="Scroll left"
    >
      ‹
    </button>
  )}

  <div className="cs-tabs-scroll" ref={scrollRef}>
    <nav className="cs-tabs-nav">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          className={`cs-tab-btn${activeTab === tab.id ? " cs-tab-btn--active" : ""}`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  </div>

  {showArrow && (
    <button
      className="cs-tabs-arrow cs-tabs-arrow--right"
      onClick={() => scrollTabs("right")}
      aria-label="Scroll right"
    >
      ›
    </button>
  )}
</div>

      {/* MOBILE DROPDOWN */}
      <div className="cs-mobile-nav">
        <p className="cs-mobile-label">Client Services</p>
        <div className="cs-select-wrap">
          <select
            className="cs-select"
            value={activeTab === null ? "" : activeTab}
            onChange={handleMobileSelect}
          >
            <option value="">Select a topic</option>
            {TABS.map((tab) => (
              <option key={tab.id} value={tab.id}>{tab.label}</option>
            ))}
          </select>
          <span className="cs-select-arrow">&#8964;</span>
        </div>
      </div>

      {/* PANEL */}
      <div className="cs-panel-area">
        {activeTab === null
          ? <RequestForm />
          : <AccordionPanel items={TAB_QA[activeTab]} />
        }
      </div>

    </div>
  )
}
