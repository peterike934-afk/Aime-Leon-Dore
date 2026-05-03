import { useState } from "react";

const COUNTRIES = [
  "United States", "United Kingdom", "Nigeria", "Canada", "France",
  "Germany", "Italy", "Japan", "Australia", "Brazil", "South Africa",
  "Ghana", "Kenya", "Netherlands", "Spain", "Sweden", "Switzerland",
  "UAE", "Singapore", "Other"
];

const Field = ({ id, label, type = "text", name, value, onChange, autoComplete, placeholder, error }) => (
  <div className="create-field">
    <label htmlFor={id} className="create-label">{label}</label>
    <input
      className={`create-input${error ? " create-input--error" : ""}`}
      id={id} type={type} name={name}
      value={value} onChange={onChange}
      autoComplete={autoComplete} placeholder={placeholder}
    />
    {error && <span className="create-error">{error}</span>}
  </div>
);

export default function Create({ onBack, onSuccess }) {
  const [form, setForm] = useState({
    email: "", password: "", confirmPassword: "",
    firstName: "", lastName: "", country: "", birthday: "",
  });
  const [errors, setErrors] = useState({});
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [mailingList, setMailingList] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.email) e.email = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Please enter a valid email address.";
    if (!form.password) e.password = "Password is required.";
    else if (form.password.length < 8)
      e.password = "Password must be at least 8 characters.";
    if (!form.confirmPassword) e.confirmPassword = "Please confirm your password.";
    else if (form.password !== form.confirmPassword)
      e.confirmPassword = "Passwords do not match.";
    if (!form.firstName.trim()) e.firstName = "First name is required.";
    if (!form.lastName.trim()) e.lastName = "Last name is required.";
    if (!form.country) e.country = "Please select your country.";
    if (form.birthday && !/^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/.test(form.birthday))
      e.birthday = "Please use MM/DD/YYYY format.";
    if (!agreedToTerms) e.terms = "You must agree to the terms of service.";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // FIX 3: DOB auto-inserts "/" as user types
  const handleBirthdayChange = (e) => {
    let raw = e.target.value.replace(/\D/g, ""); // strip non-digits
    if (raw.length > 8) raw = raw.slice(0, 8);
    let formatted = raw;
    if (raw.length >= 3 && raw.length <= 4) {
      formatted = raw.slice(0, 2) + "/" + raw.slice(2);
    } else if (raw.length >= 5) {
      formatted = raw.slice(0, 2) + "/" + raw.slice(2, 4) + "/" + raw.slice(4);
    }
    setForm((prev) => ({ ...prev, birthday: formatted }));
    if (errors.birthday) setErrors((prev) => ({ ...prev, birthday: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    if (onSuccess) onSuccess({ email: form.email, password: form.password });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500&display=swap');

        .create-page {
          position: fixed;
          top: 52px;
          left: 0; right: 0; bottom: 0;
          z-index: 1600;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 0 80px;
          background: #ffffff;
          overflow-y: auto;
          animation: pageFadeIn 0.3s ease;
        }

        @keyframes pageFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .create-heading {
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #1a1a1a;
          margin-bottom: 36px;
        }

        .create-form {
          width: 100%;
          max-width: 340px;
          display: flex;
          flex-direction: column;
          padding: 0 24px;
          box-sizing: border-box;
        }

        .create-field { margin-bottom: 24px; }

        .create-label {
          display: block;
          font-family: 'Montserrat', sans-serif;
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #999;
          margin-bottom: 6px;
        }

        .create-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid #bbb;
          padding: 8px 0 10px;
          font-family: 'Montserrat', sans-serif;
          font-size: 16px;
          font-weight: 300;
          letter-spacing: 0.05em;
          color: #1a1a1a;
          outline: none;
          transition: border-color 0.2s;
          box-sizing: border-box;
          appearance: none;
          -webkit-appearance: none;
        }
        .create-input:focus { border-color: #1a1a1a; }
        .create-input::placeholder { color: #ccc; }
        .create-input--error { border-bottom-color: #1a1a1a; }

        .create-select {
          cursor: pointer;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23999'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 4px center;
          padding-right: 20px;
        }

        .create-error {
          display: block;
          font-family: 'Montserrat', sans-serif;
          font-size: 8px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #999;
          margin-top: 5px;
        }

        .create-checkboxes {
          margin-bottom: 28px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .create-checkbox-label {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-family: 'Montserrat', sans-serif;
          font-size: 9px;
          font-weight: 400;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #888;
          cursor: pointer;
          line-height: 1.6;
        }

        .create-checkbox-label input[type="checkbox"] {
          margin-top: 2px;
          accent-color: #1a1a1a;
          flex-shrink: 0;
        }

        .create-link {
          color: #1a1a1a;
          text-decoration: underline;
          text-underline-offset: 2px;
        }

        .sign-btn {
          width: 100%;
          background: #1a1a1a;
          color: #ffffff;
          border: 1px solid #1a1a1a;
          padding: 17px 24px;
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          cursor: pointer;
          margin-bottom: 10px;
          transition: background 0.22s;
        }
        .sign-btn:hover { background: #000; }

        .create-btn {
          width: 100%;
          background: transparent;
          color: #1a1a1a;
          border: 1px solid #c0bdb9;
          padding: 17px 24px;
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          cursor: pointer;
          transition: border-color 0.22s, background 0.22s;
        }
        .create-btn:hover { background: #000; color: #fff; border-color: #000; }
      `}</style>

      <div className="create-page">
        <h1 className="create-heading">Create Account</h1>

        <form className="create-form" onSubmit={handleSubmit} noValidate>
          <Field
            id="email" label="Email Address *" type="email" name="email"
            value={form.email} onChange={handleChange} error={errors.email}
            autoComplete="email"
          />
          <Field
            id="password" label="Password *" type="password" name="password"
            value={form.password} onChange={handleChange} error={errors.password}
            autoComplete="new-password"
          />
          <Field
            id="confirmPassword" label="Confirm Password *" type="password" name="confirmPassword"
            value={form.confirmPassword} onChange={handleChange} error={errors.confirmPassword}
            autoComplete="new-password"
          />
          <Field
            id="firstName" label="First Name *" name="firstName"
            value={form.firstName} onChange={handleChange} error={errors.firstName}
            autoComplete="given-name"
          />
          <Field
            id="lastName" label="Last Name *" name="lastName"
            value={form.lastName} onChange={handleChange} error={errors.lastName}
            autoComplete="family-name"
          />

          <div className="create-field">
            <label htmlFor="country" className="create-label">Country *</label>
            <select
              className={`create-input create-select${errors.country ? " create-input--error" : ""}`}
              id="country" name="country"
              value={form.country} onChange={handleChange}
            >
              <option value="" disabled></option>
              {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            {errors.country && <span className="create-error">{errors.country}</span>}
          </div>

          {/* Birthday field uses dedicated handler for auto-slash */}
          <div className="create-field">
            <label htmlFor="birthday" className="create-label">Birthday (MM/DD/YYYY)</label>
            <input
              className={`create-input${errors.birthday ? " create-input--error" : ""}`}
              id="birthday" name="birthday" type="text"
              value={form.birthday} onChange={handleBirthdayChange}
              placeholder="MM/DD/YYYY" maxLength={10}
              inputMode="numeric"
            />
            {errors.birthday && <span className="create-error">{errors.birthday}</span>}
          </div>

          <div className="create-checkboxes">
            <label className="create-checkbox-label">
              <input
                type="checkbox" checked={agreedToTerms}
                onChange={(e) => {
                  setAgreedToTerms(e.target.checked);
                  if (errors.terms) setErrors(p => ({ ...p, terms: "" }));
                }}
              />
              <span>
                I agree to the <a href="#" className="create-link">terms of service</a> and{" "}
                <a href="#" className="create-link">privacy policy</a>.
              </span>
            </label>
            {errors.terms && <span className="create-error">{errors.terms}</span>}

            <label className="create-checkbox-label">
              <input
                type="checkbox" checked={mailingList}
                onChange={(e) => setMailingList(e.target.checked)}
              />
              <span>Sign me up for the mailing list.</span>
            </label>
          </div>

          <button type="submit" className="sign-btn">Create Account</button>
          <button type="button" className="create-btn" onClick={onBack}>Cancel</button>
        </form>
      </div>
    </>
  );
}
