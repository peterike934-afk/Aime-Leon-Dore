import React, { useState, useRef } from "react"
import "./Career.css"

const JOBS = [
  {
    id: 1, title: "Assistant Store Manager", department: "Retail", location: "LA",
    description: "We are looking for an experienced Assistant Store Manager to support daily operations at our Los Angeles retail location. You will work closely with the Store Manager to lead the team, drive sales, and deliver an exceptional client experience.",
    duties: [
      {
        category: "Store Operations",
        items: ["Support the Store Manager in all aspects of store operations.", "Ensure the store is visually merchandised to brand standards.", "Assist with scheduling, inventory management, and loss prevention."]
      },
      {
        category: "Team Leadership",
        items: ["Lead, coach, and motivate the sales team to achieve performance goals.", "Handle client escalations and resolve issues professionally.", "Drive clienteling initiatives to build lasting customer relationships."]
      },
    ],
    qualifications: ["2+ years of retail management experience, preferably in luxury or contemporary fashion.", "Strong leadership and interpersonal skills.", "Passion for the brand aesthetic.", "Ability to thrive in a fast-paced environment.", "Proficiency in retail POS systems."],
    salary: "$55,000 - $65,000",
  },
  {
    id: 2, title: "Barista", department: "Café", location: "LA",
    description: "We are seeking a passionate and skilled Barista to join our café team in Los Angeles. You will craft exceptional coffee and create a warm, welcoming atmosphere for our guests.",
    duties: [
      {
        category: "Coffee & Service",
        items: ["Prepare and serve high-quality espresso beverages and coffee drinks.", "Engage warmly with guests and provide excellent hospitality.", "Uphold café standards and brand aesthetic at all times."]
      },
      {
        category: "Operations",
        items: ["Maintain cleanliness and organization of the café space.", "Assist with inventory and ordering of café supplies."]
      },
    ],
    qualifications: ["1+ years of barista experience in a specialty coffee environment.", "Knowledge of espresso techniques and milk steaming.", "Strong communication and customer service skills.", "Ability to work in a fast-paced, high-volume setting."],
    salary: "$18 - $22 per hour",
  },
  {
    id: 3, title: "BOH Associate", department: "Retail", location: "LA",
    description: "We are looking for a detail-oriented Back of House Associate to support the operations team at our Los Angeles retail location.",
    duties: [
      {
        category: "Inventory & Receiving",
        items: ["Receive, process, and organize incoming shipments accurately.", "Maintain a clean and organized stockroom.", "Assist with inventory counts and loss prevention."]
      },
      {
        category: "Floor Support",
        items: ["Support the sales floor team with product replenishment.", "Ensure all BOH procedures are followed consistently."]
      },
    ],
    qualifications: ["Previous retail stockroom or warehouse experience preferred.", "Strong organizational skills and attention to detail.", "Ability to lift up to 50 lbs.", "Reliability and punctuality."],
    salary: "$17 - $20 per hour",
  },
  {
    id: 4, title: "Concierge Associate", department: "Retail", location: "New York",
    description: "We are seeking a Concierge Associate to serve as the first point of contact for clients visiting our New York flagship store, delivering a refined and personalized experience.",
    duties: [
      {
        category: "Client Experience",
        items: ["Greet and welcome all clients entering the store.", "Manage waitlists, appointments, and client inquiries.", "Handle phone and email inquiries professionally."]
      },
      {
        category: "Store Standards",
        items: ["Coordinate with the sales team to ensure seamless client experiences.", "Maintain the front-of-house area to brand standards."]
      },
    ],
    qualifications: ["1+ years of experience in luxury retail, hospitality, or a client-facing role.", "Exceptional communication and interpersonal skills.", "Professional appearance and demeanor.", "Passion for the brand."],
    salary: "$20 - $24 per hour",
  },
  {
    id: 5, title: "Concierge Associate", department: "Retail", location: "LA",
    description: "We are seeking a Concierge Associate to serve as the first point of contact for clients visiting our Los Angeles retail location.",
    duties: [
      {
        category: "Client Experience",
        items: ["Greet and welcome all clients entering the store.", "Manage waitlists, appointments, and client inquiries."]
      },
      {
        category: "Store Standards",
        items: ["Coordinate with the sales team to ensure seamless client experiences.", "Maintain the front-of-house area to brand standards."]
      },
    ],
    qualifications: ["1+ years of experience in luxury retail, hospitality, or a client-facing role.", "Exceptional communication and interpersonal skills.", "Professional appearance and demeanor."],
    salary: "$19 - $23 per hour",
  },
  {
    id: 6, title: "Design Director - Footwear", department: "HQ", location: "New York",
    description: "We are looking for a visionary Design Director to lead our footwear category at our New York headquarters, shaping the creative direction across all seasons.",
    duties: [
      {
        category: "Creative Direction",
        items: ["Lead the end-to-end footwear design process from concept to production.", "Develop seasonal footwear collections aligned with the brand aesthetic.", "Present designs to senior leadership and creative directors."]
      },
      {
        category: "Team & Vendor Management",
        items: ["Manage and mentor the footwear design team.", "Build and maintain relationships with key factories and material suppliers.", "Collaborate with cross-functional teams including merchandising, production, and marketing."]
      },
    ],
    qualifications: ["8+ years of footwear design experience, with at least 3 years in a director-level role.", "Strong portfolio demonstrating creative and technical footwear expertise.", "Proficiency in Adobe Creative Suite, 3D design tools, and Microsoft Office.", "Deep understanding of footwear construction and manufacturing.", "Excellent leadership and communication skills."],
    salary: "$130,000 - $160,000",
  },
  {
    id: 7, title: "Design Director - Graphics & Headwear", department: "HQ", location: "New York",
    description: "We are seeking a talented Design Director to oversee graphics and headwear design at our New York headquarters.",
    duties: [
      {
        category: "Design Leadership",
        items: ["Lead the design of all graphics, prints, and headwear products.", "Develop seasonal concepts aligned with the brand vision.", "Present collections to senior leadership."]
      },
      {
        category: "Team Management",
        items: ["Manage the graphics design team and provide creative direction.", "Collaborate with production teams on technical specifications."]
      },
    ],
    qualifications: ["7+ years of graphic and headwear design experience.", "Strong portfolio with a demonstrated range of graphic styles.", "Proficiency in Adobe Illustrator, Photoshop, and InDesign.", "Experience managing a design team."],
    salary: "$110,000 - $140,000",
  },
  {
    id: 8, title: "Designer - Handbags & Leather Goods", department: "HQ", location: "New York",
    description: "We are looking for a Handbag & Leather Goods Designer to join our team in New York, reporting directly to the Design Director of Footwear, Bags & Leather Goods. This position will work on the overall handbag design process, supporting the team from concept research through production handoff.",
    duties: [
      {
        category: "Design & Development",
        items: [
          "Responsible for Handbag and SLG design and development; from concept presentation at the beginning of the season through bulk production handoff.",
          "Will work closely with Design Leadership to develop styles that enhance brand identity, offering new products to our current customers, and expanding to new markets.",
          "Create and maintain all tech packs including sketches, boms, and technical specs.",
          "Focus heavily on designing each style with authenticity and superior quality.",
          "Develop a continuous flow of new concepts and materials in the leather goods space, sharing with the wider design team to utilize the newest innovations.",
          "Expand our non-leather bag options to offer a robust hierarchy of price points.",
        ]
      },
      {
        category: "Vendor & Production",
        items: [
          "Responsible for calendar management through this process, highlighting close follow up with vendors.",
          "Maintain strong relationships with vendors to secure open communication and adherence to deadlines both locally and overseas.",
          "Partner with Production on vendor allocation, pre-costing, and additional costing options for bulk when needed.",
        ]
      },
    ],
    qualifications: [
      "Bachelor's Degree in Fashion or Industrial Design and/or equivalent work experience.",
      "5+ years of handbag and small leather goods design experience.",
      "Technical knowledge of leather and handbag construction from concept through bulk production.",
      "Proficiency in Adobe Photoshop, Illustrator and Microsoft Suite; 3D and/or AI programs are a plus.",
      "Experience with various skins and fabric appropriate for handbags and SLGs.",
      "Ability to thrive in a high-volume, rapidly changing environment, with the ability to multitask and prioritize effectively.",
      "Must be organized and illustrate a keen attention to detail.",
      "Commitment to brand identity and a focus on business growth.",
    ],
    salary: "$85,000 - $90,000",
  },
  {
    id: 9, title: "Director of Product Development, Wovens", department: "HQ", location: "New York",
    description: "We are looking for a Director of Product Development to lead the development of woven products at our New York headquarters.",
    duties: [
      {
        category: "Product Development",
        items: ["Oversee the end-to-end development process for all woven products.", "Ensure all products meet quality standards and brand requirements."]
      },
      {
        category: "Cross-Functional Collaboration",
        items: ["Collaborate with design and merchandising teams on seasonal product strategies.", "Manage vendor relationships and negotiate pricing and timelines."]
      },
    ],
    qualifications: ["8+ years of product development experience in wovens.", "Deep knowledge of fabric construction, sourcing, and manufacturing.", "Strong project management and negotiation skills.", "Experience working with international factories."],
    salary: "$120,000 - $150,000",
  },
  {
    id: 10, title: "Full Time BOH Associate", department: "Retail", location: "New York",
    description: "We are looking for a full-time Back of House Associate to join our New York retail team.",
    duties: [
      {
        category: "Inventory & Receiving",
        items: ["Receive, process, and organize all incoming shipments.", "Maintain a clean and efficient stockroom.", "Assist with inventory management and cycle counts."]
      },
      {
        category: "Floor Support",
        items: ["Support the sales floor with timely product replenishment."]
      },
    ],
    qualifications: ["Previous stockroom or warehouse experience preferred.", "Strong organizational skills.", "Ability to lift up to 50 lbs.", "Full-time availability including weekends."],
    salary: "$18 - $21 per hour",
  },
  {
    id: 11, title: "Full Time Sales Associate", department: "Retail", location: "New York",
    description: "We are seeking a passionate Full Time Sales Associate to join our New York flagship team.",
    duties: [
      {
        category: "Client Experience",
        items: ["Deliver an exceptional client experience on the sales floor.", "Build and maintain a loyal client book through clienteling."]
      },
      {
        category: "Store Operations",
        items: ["Maintain visual merchandising and store standards.", "Process transactions accurately using the POS system.", "Support team goals and contribute to a positive store culture."]
      },
    ],
    qualifications: ["1+ years of luxury or contemporary retail sales experience.", "Passion for fashion and the brand.", "Strong communication and relationship-building skills.", "Full-time availability including weekends."],
    salary: "$20 - $25 per hour",
  },
  {
    id: 12, title: "Lead Barista", department: "Café", location: "LA",
    description: "We are looking for an experienced Lead Barista to join our café team in Los Angeles, taking a leadership role in daily café operations.",
    duties: [
      {
        category: "Leadership & Training",
        items: ["Lead daily café operations and support the café manager.", "Train and mentor junior baristas on coffee preparation and hospitality."]
      },
      {
        category: "Quality & Operations",
        items: ["Maintain consistency of all beverages and food items.", "Handle inventory, ordering, and supplier relationships.", "Uphold brand standards and create an exceptional guest experience."]
      },
    ],
    qualifications: ["3+ years of barista experience, at least 1 year in a lead role.", "Deep knowledge of specialty coffee and espresso techniques.", "Strong leadership and communication skills."],
    salary: "$22 - $26 per hour",
  },
  {
    id: 13, title: "Merchandise Planner", department: "HQ", location: "New York",
    description: "We are seeking a Merchandise Planner to join our New York headquarters, supporting the planning and allocation of product across all channels.",
    duties: [
      {
        category: "Planning & Analysis",
        items: ["Develop and manage seasonal merchandise plans by category and channel.", "Analyze sales performance and provide actionable insights.", "Prepare weekly and monthly reporting for senior leadership."]
      },
      {
        category: "Cross-Functional Work",
        items: ["Collaborate with buying and design teams on product assortment strategies.", "Manage inventory levels and support allocation decisions."]
      },
    ],
    qualifications: ["3+ years of merchandise planning experience in fashion retail.", "Strong analytical and Excel skills.", "Experience with retail planning systems.", "Detail-oriented with strong organizational skills."],
    salary: "$75,000 - $90,000",
  },
  {
    id: 14, title: "Operations Supervisor", department: "Retail", location: "LA",
    description: "We are looking for an Operations Supervisor to oversee the operational functions of our Los Angeles retail location.",
    duties: [
      {
        category: "Operations Management",
        items: ["Supervise all back-of-house operations including receiving, shipping, and inventory.", "Ensure operational procedures are followed consistently.", "Support loss prevention initiatives."]
      },
      {
        category: "Team Development",
        items: ["Train and develop the operations team.", "Collaborate with store management on operational improvements."]
      },
    ],
    qualifications: ["2+ years of retail operations experience.", "Strong leadership and organizational skills.", "Knowledge of inventory management systems.", "Ability to work a flexible schedule including weekends."],
    salary: "$52,000 - $62,000",
  },
  {
    id: 15, title: "People & Office Operations Coordinator", department: "HQ", location: "New York",
    description: "We are seeking a People & Office Operations Coordinator to support our HR and office management functions at our New York headquarters.",
    duties: [
      {
        category: "People Operations & HR Administration",
        items: [
          "Partner with the HR Manager and IT to support onboarding and offboarding processes, ensuring a seamless and elevated employee experience.",
          "Maintain accurate employee records and documentation in compliance with company standards.",
          "Track employee data, compliance requirements, and related documentation.",
          "Serve as a first point of contact for employee inquiries, prioritizing and escalating as needed.",
          "Support leave of absence tracking (FMLA, disability, etc.)",
          "Coordinate and execute internal HR processes in partnership with the HR Manager.",
        ]
      },
      {
        category: "Recruiting & Coordination",
        items: [
          "Manage interview scheduling and candidate logistics across all divisions.",
          "Partner with hiring managers and recruiters to ensure a thoughtful and efficient candidate experience.",
          "Maintain job postings and support ATS coordination (e.g., Greenhouse).",
          "Assist with new hire preparation and onboarding logistics.",
        ]
      },
      {
        category: "Employee Experience & Culture",
        items: [
          "Support employee engagement initiatives and internal programming.",
          "Assist in planning company events, team moments, and cultural activations.",
          "Help maintain internal communications and People team messaging.",
          "Contribute to initiatives that reinforce our values: Real, Respect, Community, Craft, Hard Work.",
        ]
      },
      {
        category: "Office Operations",
        items: [
          "Support day-to-day office operations, ensuring the space reflects brand standards and aesthetic.",
          "Manage vendors, supplies, and general office needs.",
          "Partner with leadership to maintain a welcoming, organized, and elevated workplace environment.",
          "Support workplace logistics tied to the overall employee experience.",
          "Help uphold accountability across the office, ensuring organization, processes, and overall presentation are consistently maintained.",
        ]
      },
    ],
    qualifications: [
      "2–4 years of experience in HR, People Operations, or office administration.",
      "Strong organizational skills and attention to detail.",
      "Ability to manage multiple priorities in a fast-paced environment.",
      "Excellent communication skills with a professional and thoughtful approach.",
      "Comfortable handling confidential information with discretion.",
      "Experience with HRIS systems (ADP preferred) and ATS platforms is a plus.",
    ],
    salary: "$60,000 - $70,000",
  },
  {
    id: 16, title: "Project Manager, Store Expansion", department: "HQ", location: "New York",
    description: "We are looking for a Project Manager to lead our store expansion initiatives from our New York headquarters.",
    duties: [
      {
        category: "Project Management",
        items: ["Manage end-to-end retail store opening projects from site selection through launch.", "Develop and maintain project timelines, budgets, and milestone tracking.", "Report project status to senior leadership regularly."]
      },
      {
        category: "Coordination",
        items: ["Coordinate with internal teams, contractors, architects, and vendors.", "Ensure all new store openings meet brand standards."]
      },
    ],
    qualifications: ["4+ years of project management experience in retail or construction.", "Strong organizational and problem-solving skills.", "Experience managing multiple projects simultaneously.", "Proficiency in project management tools."],
    salary: "$85,000 - $100,000",
  },
  {
    id: 17, title: "Sales Associate", department: "Retail", location: "LA",
    description: "We are seeking a passionate Sales Associate to join our Los Angeles retail team.",
    duties: [
      {
        category: "Client Experience",
        items: ["Deliver an exceptional client experience on the sales floor.", "Build and maintain a loyal client book."]
      },
      {
        category: "Store Operations",
        items: ["Support visual merchandising and store standards.", "Process transactions accurately."]
      },
    ],
    qualifications: ["1+ years of retail sales experience.", "Passion for fashion and the brand.", "Strong communication skills.", "Flexible availability including weekends."],
    salary: "$18 - $22 per hour",
  },
  {
    id: 18, title: "Team Lead", department: "Retail", location: "LA",
    description: "We are looking for a Team Lead to support management and lead the sales team at our Los Angeles retail location.",
    duties: [
      {
        category: "Leadership",
        items: ["Support management in daily store operations.", "Coach and motivate the sales team.", "Open and close the store as needed."]
      },
      {
        category: "Client & Sales",
        items: ["Handle client escalations and ensure a positive experience.", "Drive individual and team sales goals."]
      },
    ],
    qualifications: ["2+ years of retail experience with at least 1 year in a supervisory role.", "Strong leadership skills.", "Passion for the brand.", "Flexible availability including weekends."],
    salary: "$22 - $27 per hour",
  },
  {
    id: 19, title: "Visual Merchandiser", department: "Retail", location: "LA",
    description: "We are seeking a creative Visual Merchandiser to maintain and elevate the visual standards of our Los Angeles retail location.",
    duties: [
      {
        category: "Visual Standards",
        items: ["Execute visual merchandising directives from the corporate team.", "Maintain product presentation standards on the sales floor.", "Monitor and replenish visual displays regularly."]
      },
      {
        category: "Collaboration",
        items: ["Support new product launches and seasonal floor sets.", "Collaborate with the store management team on visual improvements."]
      },
    ],
    qualifications: ["2+ years of visual merchandising experience in fashion retail.", "Strong eye for detail and aesthetic sensibility.", "Ability to work independently and manage time effectively.", "Passion for the brand."],
    salary: "$22 - $28 per hour",
  },
]

// ── Application Form ──
function ApplicationForm({ job, onBack }) {
  const resumeRef = useRef(null)
  const coverRef = useRef(null)
  const [resumeFile, setResumeFile] = useState(null)
  const [coverFile, setCoverFile] = useState(null)
  const [resumeMode, setResumeMode] = useState(null)
  const [coverMode, setCoverMode] = useState(null)
  const [resumeText, setResumeText] = useState("")
  const [coverText, setCoverText] = useState("")
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", country: "", phone: "", portfolio: "" })
  const [submitted, setSubmitted] = useState(false)

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="car-submitted">
        <p className="car-submitted__title">Application Submitted</p>
        <p className="car-submitted__sub">Thank you for applying for <strong>{job.title}</strong>. We'll be in touch if your profile is a match.</p>
        <button className="car-back-btn" onClick={onBack}>← Back to jobs</button>
      </div>
    )
  }

  return (
    <form className="car-apply-form" onSubmit={submit}>
      <div className="car-apply-form__header">
        <div>
          <h2 className="car-apply-form__title">Apply for this job</h2>
          <p className="car-apply-form__required">* indicates a required field</p>
        </div>
        <a href="https://www.greenhouse.io" target="_blank" rel="noopener noreferrer" className="car-greenhouse-btn">
          Autofill with MyGreenhouse
        </a>
      </div>

      <div className="car-field">
        <input className="car-input" name="firstName" placeholder="First Name *" value={form.firstName} onChange={handle} required />
      </div>
      <div className="car-field">
        <input className="car-input" name="lastName" placeholder="Last Name *" value={form.lastName} onChange={handle} required />
      </div>
      <div className="car-field">
        <input className="car-input" type="email" name="email" placeholder="Email *" value={form.email} onChange={handle} required />
      </div>
      <div className="car-field car-field--row">
        <div className="car-select-wrap">
          <select name="country" value={form.country} onChange={handle} className="car-select">
            <option value="" disabled>Country</option>
            <option>United States</option>
            <option>United Kingdom</option>
            <option>Canada</option>
            <option>France</option>
            <option>Nigeria</option>
            <option>Other</option>
          </select>
          <span className="car-select-arrow">▾</span>
        </div>
        <input className="car-input" name="phone" placeholder="Phone" value={form.phone} onChange={handle} style={{ flex: 1 }} />
      </div>

      {/* Resume/CV */}
      <div className="car-field">
        <p className="car-field__label">Resume/CV *</p>
        <div className="car-file-btns">
          <button type="button" className="car-file-btn" onClick={() => { setResumeMode("attach"); resumeRef.current?.click() }}>Attach</button>
          <button type="button" className="car-file-btn" onClick={() => setResumeMode("manual")}>Enter manually</button>
        </div>
        <input ref={resumeRef} type="file" accept=".pdf,.doc,.docx,.txt,.rtf" style={{ display: "none" }} onChange={(e) => setResumeFile(e.target.files[0])} />
        {resumeFile && <p className="car-file-name">{resumeFile.name}</p>}
        {resumeMode === "manual" && <textarea className="car-textarea" placeholder="Paste your resume here..." value={resumeText} onChange={(e) => setResumeText(e.target.value)} rows={5} />}
        <p className="car-file-types">Accepted file types: pdf, doc, docx, txt, rtf</p>
      </div>

      {/* Cover Letter */}
      <div className="car-field">
        <p className="car-field__label">Cover Letter</p>
        <div className="car-file-btns">
          <button type="button" className="car-file-btn" onClick={() => { setCoverMode("attach"); coverRef.current?.click() }}>Attach</button>
          <button type="button" className="car-file-btn" onClick={() => setCoverMode("manual")}>Enter manually</button>
        </div>
        <input ref={coverRef} type="file" accept=".pdf,.doc,.docx,.txt,.rtf" style={{ display: "none" }} onChange={(e) => setCoverFile(e.target.files[0])} />
        {coverFile && <p className="car-file-name">{coverFile.name}</p>}
        {coverMode === "manual" && <textarea className="car-textarea" placeholder="Paste your cover letter here..." value={coverText} onChange={(e) => setCoverText(e.target.value)} rows={5} />}
        <p className="car-file-types">Accepted file types: pdf, doc, docx, txt, rtf</p>
      </div>

      <div className="car-field">
        <input className="car-input" name="portfolio" placeholder="Portfolio/ Website *" value={form.portfolio} onChange={handle} />
      </div>

      <div className="car-apply-form__submit-row">
        <button type="submit" className="car-submit-btn">Submit application</button>
      </div>
    </form>
  )
}

// ── Job Detail ──
function JobDetail({ job, onBack }) {
  return (
    <div className="car-detail">
      {/* Sticky VIEW ALL JOBS bar */}
      <button className="car-view-all-btn" onClick={onBack}>VIEW ALL JOBS</button>

      <div className="car-detail__inner">
        <button className="car-back-link" onClick={onBack}>{"< Back to jobs"}</button>

        <div className="car-detail__header">
          <div>
            <h1 className="car-detail__title">{job.title}</h1>
            <p className="car-detail__location">📍 {job.department} – {job.location}</p>
          </div>
          <button
            className="car-apply-btn"
            onClick={() => document.getElementById("car-form-anchor").scrollIntoView({ behavior: "smooth" })}
          >
            Apply
          </button>
        </div>

        <p className="car-detail__desc">{job.description}</p>

        {/* Duties with nested categories */}
        <div className="car-detail__section">
          <h3 className="car-detail__section-title">Duties and Responsibilities</h3>
          <ul className="car-detail__cat-list">
            {job.duties.map((group, gi) => (
              <li key={gi}>
                <strong>{group.category}:</strong>
                <ul className="car-detail__sub-list">
                  {group.items.map((item, ii) => (
                    <li key={ii}>{item}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>

        {/* Qualifications */}
        <div className="car-detail__section">
          <h3 className="car-detail__section-title">Qualifications</h3>
          <ul className="car-detail__list">
            {job.qualifications.map((q, i) => <li key={i}>{q}</li>)}
          </ul>
        </div>

        <p className="car-detail__salary">Salary Range: {job.salary}</p>

        <p className="car-detail__brand">
          Aimé Leon Dore is from Queens, NY. With a strong focus on simple yet powerful design, we are driven to create timeless work by portraying an aesthetic that is uniquely our own.
        </p>

        {/* Job Alert Box */}
        <div className="car-alert-box">
          <div className="car-alert-box__icon">🔔</div>
          <div>
            <p className="car-alert-box__title">Create a Job Alert</p>
            <p className="car-alert-box__sub">Interested in building your career at Aimé Leon Dore? Get future opportunities sent straight to your email.</p>
            <a
              href="https://www.greenhouse.io/job_boards"
              target="_blank"
              rel="noopener noreferrer"
              className="car-alert-link"
            >
              Create alert
            </a>
          </div>
        </div>

        {/* Application Form — always visible (no toggle), anchor for Apply btn scroll */}
        <div id="car-form-anchor">
          <ApplicationForm job={job} onBack={onBack} />
        </div>
      </div>
    </div>
  )
}

// ── Main Careers Page ──
export default function Careers() {
  const [selectedJob, setSelectedJob] = useState(null)

  if (selectedJob) {
    return (
      <div className="car-page">
        <JobDetail job={selectedJob} onBack={() => setSelectedJob(null)} />
      </div>
    )
  }

  return (
    <div className="car-page">
      <div className="car-list">
        <p className="car-list__heading">Available Positions</p>
        {JOBS.map((job) => (
          <div key={job.id} className="car-list__item" onClick={() => setSelectedJob(job)}>
            <div>
              <p className="car-list__title">{job.title}</p>
              <p className="car-list__meta">{job.department} – {job.location}</p>
            </div>
            <span className="car-list__arrow">›</span>
          </div>
        ))}
      </div>
    </div>
  )
}
