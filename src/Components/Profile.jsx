import { useRef, useEffect, useState } from "react";
import Create from "./Create.jsx";

// ─────────────────────────────────────────────
// MANAGE ADDRESSES
// ─────────────────────────────────────────────
const EMPTY_FORM = {
  firstName: "", lastName: "",
  address1: "", address2: "",
  city: "", state: "",
  zip: "", country: "",
  phone: "", isDefault: false,
};

function ManageAddresses({ onCancel }) {
  const [savedAddress, setSavedAddress] = useState(null);
  const [view, setView] = useState("list");
  const [form, setForm] = useState(EMPTY_FORM);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  }
  function handleSave(e) { e.preventDefault(); setSavedAddress({ ...form }); setView("list"); }
  function handleDelete() { setSavedAddress(null); setView("list"); }
  function openEdit() { setForm({ ...savedAddress }); setView("edit"); }
  function openAdd() { setForm(EMPTY_FORM); setView("add"); }

  const isEditing = view === "edit";

  if (view === "list") {
    return (
      <div className="ma-wrap">
        {savedAddress && (
          <div className="ma-card">
            <div className="ma-card-header">
              <span className="ma-card-label">Default Shipping Address:</span>
              <button className="ma-edit-link" onClick={openEdit}>Edit</button>
            </div>
            <div className="ma-card-address">
              {[savedAddress.firstName, savedAddress.lastName].filter(Boolean).join(" ")}
              {savedAddress.address1 && <><br />{savedAddress.address1}</>}
              {savedAddress.address2 && <><br />{savedAddress.address2}</>}
              <br />
              {[savedAddress.city, savedAddress.state].filter(Boolean).join(", ")}
              {savedAddress.zip && ` ${savedAddress.zip}`}
              {savedAddress.country && <><br />{savedAddress.country}</>}
              {savedAddress.phone && <><br />{savedAddress.phone}</>}
            </div>
          </div>
        )}
        <div className="ma-actions">
          <button className="ma-btn-dark" onClick={openAdd}>Add Shipping Address</button>
          <button className="ma-btn-outline" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div className="ma-wrap">
      <p className="ma-form-heading">{isEditing ? "Edit Shipping Address" : "Create Shipping Address"}</p>
      <form onSubmit={handleSave}>
        <div className="ma-form-grid">
          <div className="ma-field"><input className="ma-field-input" name="firstName" placeholder="First Name*" value={form.firstName} onChange={handleChange} required /></div>
          <div className="ma-field"><input className="ma-field-input" name="lastName" placeholder="Last Name*" value={form.lastName} onChange={handleChange} required /></div>
          <div className="ma-field"><input className="ma-field-input" name="address1" placeholder="Address Line 1*" value={form.address1} onChange={handleChange} required /></div>
          <div className="ma-field"><input className="ma-field-input" name="address2" placeholder="Address Line 2" value={form.address2} onChange={handleChange} /></div>
          <div className="ma-field"><input className="ma-field-input" name="city" placeholder="City*" value={form.city} onChange={handleChange} required /></div>
          <div className="ma-field"><input className="ma-field-input" name="state" placeholder="State*" value={form.state} onChange={handleChange} required /></div>
          <div className="ma-field"><input className="ma-field-input" name="zip" placeholder="Zip Code*" value={form.zip} onChange={handleChange} required /></div>
          <div className="ma-field"><input className="ma-field-input" name="country" placeholder="Country*" value={form.country} onChange={handleChange} required /></div>
          <div className="ma-field ma-field-phone"><input className="ma-field-input" name="phone" placeholder="Phone Number*" value={form.phone} onChange={handleChange} required /></div>
        </div>
        <div className="ma-checkbox-row">
          <input className="ma-checkbox" type="checkbox" id="isDefault" name="isDefault" checked={form.isDefault} onChange={handleChange} />
          <label className="ma-checkbox-label" htmlFor="isDefault">Use as my default shipping address</label>
        </div>
        <div className="ma-actions">
          <button type="submit" className="ma-btn-dark">Save Address</button>
          {isEditing && <button type="button" className="ma-btn-red" onClick={handleDelete}>Delete Address</button>}
          <button type="button" className="ma-btn-outline" onClick={() => setView("list")}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

// ─────────────────────────────────────────────
// ACCOUNT DETAILS
// ─────────────────────────────────────────────
function AccountDetails({ onCancel }) {
  const [form, setForm] = useState({ email: "", firstName: "", lastName: "", phone: "", instagram: "" });
  const [saved, setSaved] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setSaved(false);
  }
  function handleSave(e) { e.preventDefault(); setSaved(true); }

  return (
    <div className="ma-wrap">
      <p className="ma-form-heading">Account Details</p>
      <form onSubmit={handleSave}>
        <div className="ma-form-grid">
          <div className="ma-field ma-field-full"><input className="ma-field-input" name="email" type="email" placeholder="Email Address*" value={form.email} onChange={handleChange} required /></div>
          <div className="ma-field"><input className="ma-field-input" name="firstName" placeholder="First Name*" value={form.firstName} onChange={handleChange} required /></div>
          <div className="ma-field"><input className="ma-field-input" name="lastName" placeholder="Last Name*" value={form.lastName} onChange={handleChange} required /></div>
          <div className="ma-field"><input className="ma-field-input" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} /></div>
          <div className="ma-field"><input className="ma-field-input" name="instagram" placeholder="Instagram" value={form.instagram} onChange={handleChange} /></div>
        </div>
        <div className="ma-actions">
          <button type="submit" className="ma-btn-dark">Save Changes</button>
          <button type="button" className="ma-btn-outline" onClick={onCancel}>Cancel</button>
          {saved && <p className="ma-saved-msg">Changes saved.</p>}
        </div>
      </form>
    </div>
  );
}

// ─────────────────────────────────────────────
// MY SIZES
// ─────────────────────────────────────────────

const SIZE_CATEGORIES = [
  { key: "Apparel",  sizes: ["XXS", "XS", "S", "M", "L", "XL", "XXL"] },
  { key: "Footwear", sizes: ["4", "5", "6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12", "13"] },
  { key: "Headwear", sizes: ["OS", "S/M", "L/XL", "7", "7⅛", "7¼", "7⅜", "7½", "7⅝", "7¾", "7⅞"] },
];
function MySizes({ onCancel }) {
  // Load from localStorage on mount
  const [selected, setSelected] = useState(() => {
    try {
      const raw = localStorage.getItem("mySizes");
      if (raw) return JSON.parse(raw);
    } catch {}
    return { Apparel: [], Footwear: [], Headwear: [] };
  });

  // Track the last saved state to detect unsaved changes
  const [savedState, setSavedState] = useState(() => {
    try {
      const raw = localStorage.getItem("mySizes");
      if (raw) return JSON.parse(raw);
    } catch {}
    return { Apparel: [], Footwear: [], Headwear: [] };
  });

  const [collapsed, setCollapsed] = useState({
    Apparel: true, Footwear: true, Headwear: true,
  });

  // Check if current selection differs from saved
  const hasChanges = JSON.stringify(selected) !== JSON.stringify(savedState);

  function toggleSize(category, size) {
    setSelected(prev => {
      const current = prev[category];
      const already = current.includes(size);
      return {
        ...prev,
        [category]: already
          ? current.filter(s => s !== size)
          : [...current, size],
      };
    });
  }

  function toggleCollapse(category) {
    setCollapsed(prev => ({ ...prev, [category]: !prev[category] }));
  }

  function handleSave(e) {
    e.preventDefault();
    localStorage.setItem("mySizes", JSON.stringify(selected));
    setSavedState(selected);
  }

  function handleCancel() {
    // Revert to last saved state
    setSelected(savedState);
  }

  return (
    <div className="sz-wrap">
      <p className="sz-title">My Sizes</p>
      <p className="sz-description">
        Saved sizes are based on the expectation that the garment fits
        true to size. If any garment does not fit true to size, this
        information will be noted on the product page. All sizes follow
        standard US Men's sizing.
      </p>

      <form onSubmit={handleSave}>
        {SIZE_CATEGORIES.map(({ key, sizes }) => (
          <div key={key} className="sz-section">
            <div
              className="sz-section-header"
              onClick={() => toggleCollapse(key)}
            >
              <span className="sz-section-title">
                {key}
                {/* Count always shows regardless of collapsed state */}
                {selected[key].length > 0 && (
                  <sup className="sz-sup">{selected[key].length}</sup>
                )}
              </span>
              <span className="sz-chevron">
                {collapsed[key] ? "∨" : "∧"}
              </span>
            </div>

            {!collapsed[key] && (
              <div className="sz-grid">
                {sizes.map(size => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => toggleSize(key, size)}
                    className={`sz-btn${
                      selected[key].includes(size) ? " sz-btn--active" : ""
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Save / Cancel bar — only visible when there are unsaved changes */}
        {hasChanges && (
          <div className="ma-actions" style={{ marginTop: "32px" }}>
            <button type="submit" className="ma-btn-dark">
              Save Sizes
            </button>
            <button
              type="button"
              className="ma-btn-outline"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        )}

        {/* If no changes, still show the dashboard Cancel to go back */}
        {!hasChanges && (
          <div className="ma-actions" style={{ marginTop: "32px" }}>
            <button
              type="button"
              className="ma-btn-outline"
              onClick={onCancel}
            >
              Back
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
  

// ─────────────────────────────────────────────
// LOGO SPLASH SCREEN
// ─────────────────────────────────────────────
function LogoSplash({ onDone }) {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 2000);
    const doneTimer = setTimeout(() => onDone(), 3000);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      zIndex: 1700, background: "#ffffff",
      display: "flex", alignItems: "center", justifyContent: "center",
      opacity: fading ? 0 : 1,
      transition: "opacity 1s ease",
      pointerEvents: "none",
    }}>
      <style>{`
        @keyframes logoSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
      <img
        src="/aimelogo.png"
        alt="Logo"
        style={{
          width: "45px",
          height: "45px",
          objectFit: "contain",
          animation: "logoSpin 1.6s linear infinite",
        }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────
// MOBILE ACCORDION NAV
// ─────────────────────────────────────────────
function MobileAccordionNav({ activeSection, activeOrder, onSectionClick, onOrderClick }) {
  const [open, setOpen]                   = useState(true);
  const [orderExpanded, setOrderExpanded] = useState(true);

  const currentLabel =
    activeSection === "orders"    ? "Order History"    :
    activeSection === "addresses" ? "Manage Addresses" :
    activeSection === "details"   ? "Account Details"  : "My Sizes";

  useEffect(() => {
    if (activeSection === "orders") {
      setOpen(true);
      setOrderExpanded(true);
    }
  }, [activeSection]);

  function handleOrderClick() {
    if (activeSection !== "orders") {
      onSectionClick("orders");
      setOrderExpanded(true);
      setOpen(true);
    } else {
      setOrderExpanded(o => !o);
    }
  }

  return (
    <div className="mob-accordion-wrap">
      <div className="mob-trigger" onClick={() => setOpen(o => !o)}>
        <span className="mob-trigger-label">{currentLabel}</span>
        <span className="mob-trigger-chevron">{open ? "∧" : "∨"}</span>
      </div>
      {open && (
        <div className="mob-list">
          <div className="mob-list-item" onClick={handleOrderClick}>
            <span>Order History</span>
            <span className="mob-list-chevron">{orderExpanded ? "∧" : "∨"}</span>
          </div>
          {orderExpanded && (
            <>
              <div
                className={`mob-list-subitem${activeOrder === "online" ? " mob-list-subitem--active" : ""}`}
                onClick={() => { onOrderClick("online"); onSectionClick("orders"); }}
              >Online</div>
              <div
                className={`mob-list-subitem${activeOrder === "instore" ? " mob-list-subitem--active" : ""}`}
                onClick={() => { onOrderClick("instore"); onSectionClick("orders"); }}
              >In-Store</div>
            </>
          )}
          <div className="mob-list-item" onClick={() => { onSectionClick("addresses"); setOpen(false); }}>Manage Addresses</div>
          <div className="mob-list-item" onClick={() => { onSectionClick("details"); setOpen(false); }}>Account Details</div>
          <div className="mob-list-item mob-list-item--last" onClick={() => { onSectionClick("sizes"); setOpen(false); }}>My Sizes</div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN PROFILE COMPONENT
// ─────────────────────────────────────────────
const Profile = ({ isOpen, onClose, onSignIn, onSignOut, onNavigate }) => {
  const emailRef = useRef(null);

  const [view, setView]                   = useState(() => localStorage.getItem("loggedIn") === "true" ? "account" : "signin");
  const [orderOpen, setOrderOpen]         = useState(true);
  const [activeOrder, setActiveOrder]     = useState("online");
  const [activeSection, setActiveSection] = useState("orders");
  const [loginError, setLoginError]       = useState("");

  useEffect(() => {
    if (isOpen) {
      emailRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  function handleSignIn(e) {
    e.preventDefault();
    const formData      = new FormData(e.currentTarget);
    const email         = formData.get("email");
    const password      = formData.get("password");
    const savedEmail    = localStorage.getItem("userEmail");
    const savedPassword = localStorage.getItem("userPassword");
    if (email !== savedEmail || password !== savedPassword) {
      setLoginError("Incorrect email or password.");
      return;
    }
    e.currentTarget.reset();
    setLoginError("");
    localStorage.setItem("loggedIn", "true");
    if (onSignIn) onSignIn();
    setView("account");
  }

  function handleSignOut() {
    localStorage.removeItem("loggedIn");
    setLoginError("");
    setView("signin");
    setActiveSection("orders");
    setOrderOpen(true);
    setActiveOrder("online");
    if (onSignOut) onSignOut();
    onClose();
  }

  function handleCancel() {
    setActiveSection("orders");
    setOrderOpen(true);
    setActiveOrder("online");
  }

  function handleSectionClick(section) {
    setActiveSection(section);
    if (section === "orders") setOrderOpen(true);
  }

  function handleCreateSuccess(userData) {
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("userEmail", userData.email);
    localStorage.setItem("userPassword", userData.password);
    if (onSignIn) onSignIn();
    setView("splash");
  }

  if (!isOpen) return null;

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500&display=swap');

    .profile-page {
      position: fixed; top: 52px; left: 0; right: 0; bottom: 0;
      z-index: 1600; background: #ffffff;
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      animation: pageFadeIn 0.3s ease; overflow-y: auto;
    }
    @keyframes pageFadeIn {
      from { opacity: 0; transform: translateY(8px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .profile-heading { font-family: 'Montserrat', sans-serif; font-size: 11px; font-weight: 500; letter-spacing: 0.28em; text-transform: uppercase; color: #1a1a1a; margin-bottom: 36px; }
    .profile-form { width: 100%; max-width: 340px; display: flex; flex-direction: column; padding: 0 24px; box-sizing: border-box; }
    .profile-field { margin-bottom: 24px; }
    .profile-label { display: block; font-family: 'Montserrat', sans-serif; font-size: 9px; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; color: #999; margin-bottom: 6px; }
    .profile-input { width: 100%; background: transparent; border: none; border-bottom: 1px solid #bbb; padding: 8px 0 10px; font-family: 'Montserrat', sans-serif; font-size: 16px; font-weight: 300; letter-spacing: 0.05em; color: #1a1a1a; outline: none; transition: border-color 0.2s; box-sizing: border-box; -webkit-appearance: none; appearance: none; }
    .profile-input:focus { border-color: #1a1a1a; }
    .forgot-link { display: block; text-align: center; font-family: 'Montserrat', sans-serif; font-size: 9px; font-weight: 400; letter-spacing: 0.2em; text-transform: uppercase; color: #888; text-decoration: underline; text-underline-offset: 3px; margin-bottom: 28px; cursor: pointer; transition: color 0.2s; }
    .forgot-link:hover { color: #1a1a1a; }
    .sign-btn { width: 100%; background: #1a1a1a; color: #ffffff; border: 1px solid #1a1a1a; padding: 17px 24px; font-family: 'Montserrat', sans-serif; font-size: 10px; font-weight: 500; letter-spacing: 0.25em; text-transform: uppercase; cursor: pointer; margin-bottom: 10px; transition: background 0.22s; }
    .sign-btn:hover { background: #000; }
    .create-btn { width: 100%; background: transparent; color: #1a1a1a; border: 1px solid #c0bdb9; padding: 17px 24px; font-family: 'Montserrat', sans-serif; font-size: 10px; font-weight: 500; letter-spacing: 0.25em; text-transform: uppercase; cursor: pointer; transition: border-color 0.22s, background 0.22s; }
    .create-btn:hover { background: #000; color: #fff; border-color: #000; }

    .account-page { position: fixed; top: 52px; left: 0; right: 0; bottom: 0; z-index: 1600; background: #ffffff; display: flex; animation: pageFadeIn 0.3s ease; overflow: hidden; }
    
    .account-sidebar { width: 240px; min-width: 240px; padding: 40px 0; display: flex; flex-direction: column; overflow-y: auto; }
    .account-sidebar-label { font-family: 'Montserrat', sans-serif; font-size: 9px; font-weight: 500; letter-spacing: 0.22em; text-transform: uppercase; color: #1a1a1a; padding: 0 32px; margin-bottom: 32px; }
    .account-nav-item { font-family: 'Montserrat', sans-serif; font-size: 13px; font-weight: 400; letter-spacing: 0.01em; color: #1a1a1a; padding: 14px 32px; cursor: pointer; border-top: 1px solid #e8e8e8; display: block; transition: color 0.15s; user-select: none; }
    .account-nav-item:hover { color: #555; }
    .account-nav-item.active { font-weight: 500; }
    .account-nav-sub { font-family: 'Montserrat', sans-serif; font-size: 13px; font-weight: 400; letter-spacing: 0.01em; color: #1a1a1a; padding: 10px 32px 10px 48px; cursor: pointer; display: block; transition: color 0.15s; user-select: none; }
    .account-nav-sub:hover { color: #555; }
    .account-nav-sub.active { font-weight: 500; }
    .account-signout { font-family: 'Montserrat', sans-serif; font-size: 10px; font-weight: 400; letter-spacing: 0.12em; text-transform: uppercase; color: #1a1a1a; padding: 20px 32px 0; cursor: pointer; text-decoration: underline; text-underline-offset: 3px; display: inline-block; }
    .account-signout:hover { color: #555; }
    .account-content { flex: 1; display: flex; flex-direction: column; align-items: center; overflow-y: auto; padding: 60px; }
    .account-empty-label { font-family: 'Montserrat', sans-serif; font-size: 12px; font-weight: 400; letter-spacing: 0.04em; color: #1a1a1a; margin-bottom: 24px; }
    .account-shop-btn { background: #1a1a1a; color: #fff; border: none; padding: 18px 0; width: 480px; max-width: 100%; font-family: 'Montserrat', sans-serif; font-size: 10px; font-weight: 500; letter-spacing: 0.28em; text-transform: uppercase; cursor: pointer; transition: background 0.2s; text-align: center; display: block; }
    .account-shop-btn:hover { background: #000; }

    .ma-wrap { font-family: 'Montserrat', sans-serif; width: 100%; max-width: 560px; }
    .ma-form-heading { font-family: 'Montserrat', sans-serif; font-size: 13px; font-weight: 400; letter-spacing: 0.02em; color: #1a1a1a; margin: 0 0 32px; }
    .ma-card { border: 1px solid #d8d8d8; padding: 20px 24px 24px; margin-bottom: 16px; }
    .ma-card-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 14px; }
    .ma-card-label { font-size: 11px; font-weight: 500; letter-spacing: 0.04em; color: #1a1a1a; }
    .ma-edit-link { font-size: 11px; font-weight: 400; letter-spacing: 0.04em; color: #1a1a1a; text-decoration: underline; text-underline-offset: 3px; cursor: pointer; background: none; border: none; padding: 0; font-family: 'Montserrat', sans-serif; }
    .ma-edit-link:hover { color: #555; }
    .ma-card-address { font-size: 12px; font-weight: 300; letter-spacing: 0.03em; color: #1a1a1a; line-height: 1.8; }
    .ma-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0 24px; }
    .ma-field { display: flex; flex-direction: column; margin-bottom: 28px; }
    .ma-field-full { grid-column: 1 / -1; }
    .ma-field-phone { grid-column: 1; }
    .ma-field-input { background: transparent; border: none; border-bottom: 1px solid #ccc; padding: 8px 0 10px; font-family: 'Montserrat', sans-serif; font-size: 16px; font-weight: 300; letter-spacing: 0.03em; color: #1a1a1a; outline: none; transition: border-color 0.2s; width: 100%; box-sizing: border-box; -webkit-appearance: none; appearance: none; }
    .ma-field-input::placeholder { color: #aaa; font-size: 16px; font-weight: 300; letter-spacing: 0.03em; }
    .ma-field-input:focus { border-color: #1a1a1a; }
    .ma-checkbox-row { display: flex; align-items: center; gap: 12px; margin: 4px 0 28px; }
    .ma-checkbox { width: 16px; height: 16px; border: 1px solid #bbb; appearance: none; -webkit-appearance: none; cursor: pointer; position: relative; flex-shrink: 0; background: #fff; }
    .ma-checkbox:checked { background: #1a1a1a; border-color: #1a1a1a; }
    .ma-checkbox:checked::after { content: ''; position: absolute; left: 4px; top: 1px; width: 5px; height: 9px; border: 2px solid #fff; border-top: none; border-left: none; transform: rotate(45deg); }
    .ma-checkbox-label { font-size: 12px; font-weight: 400; letter-spacing: 0.02em; color: #1a1a1a; cursor: pointer; font-family: 'Montserrat', sans-serif; }
    .ma-actions { margin-top: 8px; }
    .ma-btn-dark { display: block; width: 100%; background: #1a1a1a; color: #fff; border: none; padding: 18px 0; font-family: 'Montserrat', sans-serif; font-size: 10px; font-weight: 500; letter-spacing: 0.28em; text-transform: uppercase; cursor: pointer; text-align: center; transition: background 0.2s; margin-bottom: 10px; }
    .ma-btn-dark:hover { background: #000; }
    .ma-btn-red { display: block; width: 100%; background: #c0392b; color: #fff; border: none; padding: 18px 0; font-family: 'Montserrat', sans-serif; font-size: 10px; font-weight: 500; letter-spacing: 0.28em; text-transform: uppercase; cursor: pointer; text-align: center; transition: background 0.2s; margin-bottom: 10px; }
    .ma-btn-red:hover { background: #a93226; }
    .ma-btn-outline { display: block; width: 100%; background: #f5f5f5; color: #1a1a1a; border: 1px solid #d8d8d8; padding: 18px 0; font-family: 'Montserrat', sans-serif; font-size: 10px; font-weight: 500; letter-spacing: 0.28em; text-transform: uppercase; cursor: pointer; text-align: center; transition: background 0.2s; margin-bottom: 10px; }
    .ma-btn-outline:hover { background: #ebebeb; }
    .ma-saved-msg { font-family: 'Montserrat', sans-serif; font-size: 10px; letter-spacing: 0.12em; color: #555; margin-top: 14px; }

    .sz-wrap { font-family: 'Montserrat', sans-serif; width: 100%; max-width: 560px; }
    .sz-title { font-size: 13px; font-weight: 400; letter-spacing: 0.02em; color: #111; margin: 0 0 16px; }
    .sz-description { font-size: 11px; font-weight: 500; letter-spacing: 0.02em; color: #1a1a1a; line-height: 1.7; margin: 0 0 32px; }
    .sz-section { border-bottom: 1px solid #e8e8e8; }
    .sz-section-header { display: flex; align-items: center; justify-content: space-between; padding: 16px 0; cursor: pointer; user-select: none; }
    .sz-section-title { font-size: 13px; font-weight: 400; letter-spacing: 0.02em; color: #1a1a1a; }
    .sz-sup { font-size: 9px; font-weight: 500; vertical-align: super; margin-left: 2px; color: #1a1a1a; }
    .sz-chevron { font-size: 11px; color: #555; }
    .sz-grid { display: flex; flex-wrap: wrap; gap: 6px; padding-bottom: 24px; }
    .sz-btn { font-family: 'Montserrat', sans-serif; font-size: 11px; font-weight: 400; letter-spacing: 0.04em; color: #1a1a1a; width: 44px; height: 44px; border: 1px solid #d8d8d8; background: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: border-color 0.15s, background 0.15s; flex-shrink: 0; }
    .sz-btn:hover { border-color: #1a1a1a; }
    .sz-btn--active { border: 2px solid #1a1a1a; font-weight: 500; }

    .mob-accordion-wrap { display: none !important; }
    .mob-signout-btn    { display: none !important; }
    .mob-account-label  { display: none !important; }

    @media (max-width: 768px) {
      .account-page { flex-direction: column; overflow-y: auto; overflow-x: hidden; align-items: stretch; }
      .account-sidebar { display: none !important; }
      .mob-account-label { display: block !important; font-family: 'Montserrat', sans-serif; font-size: 9px; font-weight: 500; letter-spacing: 0.22em; text-transform: uppercase; color: #1a1a1a; padding: 28px 16px 14px; }
      .mob-accordion-wrap { display: block !important; margin: 0 16px; border: 1px solid #d8d8d8; font-family: 'Montserrat', sans-serif; }
      .mob-trigger { display: flex; align-items: center; justify-content: center; padding: 14px 18px; cursor: pointer; background: #fff; user-select: none; position: relative; }
      .mob-trigger-label { font-family: 'Montserrat', sans-serif; font-size: 13px; font-weight: 400; letter-spacing: 0.02em; color: #1a1a1a; }
      .mob-trigger-chevron { font-size: 11px; color: #555; position: absolute; right: 18px; }
      .mob-list { background: #fff; border-top: 1px solid #d8d8d8; }
      .mob-list-item { display: flex; align-items: center; justify-content: center; padding: 14px 18px; font-family: 'Montserrat', sans-serif; font-size: 13px; font-weight: 400; letter-spacing: 0.02em; color: #1a1a1a; border-bottom: 1px solid #e8e8e8; background: #f5f5f5; cursor: pointer; user-select: none; position: relative; }
      .mob-list-item--last { border-bottom: none; }
      .mob-list-chevron { font-size: 11px; color: #888; position: absolute; right: 18px; }
      .mob-list-subitem { display: block; padding: 12px 18px; text-align: center; font-family: 'Montserrat', sans-serif; font-size: 13px; font-weight: 400; letter-spacing: 0.02em; color: #1a1a1a; border-bottom: 1px solid #e8e8e8; background: #f5f5f5; cursor: pointer; user-select: none; }
      .mob-list-subitem--active { font-weight: 500; }
      .account-content { padding: 24px 16px 16px; width: 100%; box-sizing: border-box; align-items: center !important; text-align: center; }
      .account-shop-btn { width: 100%; max-width: 440px; display: block; }
      .mob-signout-btn { display: block !important; font-family: 'Montserrat', sans-serif; font-size: 10px; font-weight: 400; letter-spacing: 0.14em; text-transform: uppercase; color: #1a1a1a; text-decoration: underline; text-underline-offset: 3px; cursor: pointer; background: none; border: none; padding: 20px 0 32px; text-align: center; width: 100%; }
      .ma-form-grid { grid-template-columns: 1fr; }
      .ma-field-full  { grid-column: 1; }
      .ma-field-phone { grid-column: 1; }
      .ma-wrap { max-width: 100%; }
    }
  `;

  // ── SIGN IN VIEW ──
  if (view === "signin") {
    return (
      <>
        <style>{css}</style>
        <div className="profile-page">
          <h1 className="profile-heading">My Account</h1>
          <form className="profile-form" onSubmit={handleSignIn}>
            <div className="profile-field">
              <label htmlFor="email" className="profile-label">Email Address</label>
              <input ref={emailRef} className="profile-input" id="email" type="email" name="email" autoComplete="email" required />
            </div>
            <div className="profile-field">
              <label htmlFor="password" className="profile-label">Password</label>
              <input className="profile-input" id="password" type="password" name="password" autoComplete="current-password" required />
            </div>
            <a className="forgot-link">Forgot Password?</a>
            {loginError && (
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#c0392b", marginBottom: "16px", textAlign: "center" }}>
                {loginError}
              </p>
            )}
            <button type="submit" className="sign-btn">Sign In</button>
            <button type="button" className="create-btn" onClick={() => setView("register")}>Create Account</button>
          </form>
        </div>
      </>
    );
  }

  // ── CREATE ACCOUNT + SPLASH ──
  if (view === "register" || view === "splash") {
    return (
      <>
        <style>{css}</style>
        {view === "splash"
          ? <LogoSplash onDone={() => setView("account")} />
          : <Create onBack={() => setView("signin")} onSuccess={handleCreateSuccess} />
        }
      </>
    );
  }

  // ── ACCOUNT DASHBOARD ──
  return (
    <>
      <style>{css}</style>
      <div className="account-page">

        {/* ── MOBILE: label + accordion ── */}
        <p className="mob-account-label">My Account</p>
        <div className="mob-accordion-wrap">
          <MobileAccordionNav
            activeSection={activeSection}
            activeOrder={activeOrder}
            onSectionClick={handleSectionClick}
            onOrderClick={(o) => setActiveOrder(o)}
          />
        </div>

        {/* ── DESKTOP SIDEBAR ── */}
        <div className="account-sidebar">
          <p className="account-sidebar-label">My Account</p>
          <div
            className={`account-nav-item${activeSection === "orders" ? " active" : ""}`}
            onClick={() => {
              if (activeSection === "orders") setOrderOpen(o => !o);
              else { setActiveSection("orders"); setOrderOpen(true); }
            }}
          >Order History</div>
          {orderOpen && (
            <>
              <div
                className={`account-nav-sub${activeSection === "orders" && activeOrder === "online" ? " active" : ""}`}
                onClick={() => { setActiveSection("orders"); setActiveOrder("online"); }}
              >Online</div>
              <div
                className={`account-nav-sub${activeSection === "orders" && activeOrder === "instore" ? " active" : ""}`}
                onClick={() => { setActiveSection("orders"); setActiveOrder("instore"); }}
              >In-Store</div>
            </>
          )}
          <div className={`account-nav-item${activeSection === "addresses" ? " active" : ""}`} onClick={() => handleSectionClick("addresses")}>Manage Addresses</div>
          <div className={`account-nav-item${activeSection === "details"   ? " active" : ""}`} onClick={() => handleSectionClick("details")}>Account Details</div>
          <div className={`account-nav-item${activeSection === "sizes"     ? " active" : ""}`} onClick={() => handleSectionClick("sizes")}>My Sizes</div>
          <div className="account-signout" onClick={handleSignOut}>Sign Out</div>
        </div>

        {/* ── CONTENT AREA ── */}
        <div className="account-content">
          {activeSection === "orders" && activeOrder === "online" && (
            <>
              <p className="account-empty-label">No Order History</p>
              <button className="account-shop-btn" onClick={() => { onClose(); onNavigate("shop"); }}>
                Shop Aimeleondore.com
              </button>
            </>
          )}
          {activeSection === "orders" && activeOrder === "instore" && (
            <p className="account-empty-label">No In-Store Order History</p>
          )}
          {activeSection === "addresses" && <ManageAddresses onCancel={handleCancel} />}
          {activeSection === "details"   && <AccountDetails  onCancel={handleCancel} />}
          {activeSection === "sizes"     && <MySizes         onCancel={handleCancel} />}
        </div>

        {/* ── MOBILE SIGN OUT ── */}
        <button className="mob-signout-btn" onClick={handleSignOut}>Sign Out</button>

      </div>
    </>
  );
};

export default Profile;
