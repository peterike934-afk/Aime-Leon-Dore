import { useState } from "react";

const EMPTY_FORM = {
  firstName: "", lastName: "",
  address1: "", address2: "",
  city: "", state: "",
  zip: "", country: "Algeria",
  phone: "", isDefault: false,
};

const ManageAddresses = () => {
  // null = no saved address yet; object = saved address
  const [savedAddress, setSavedAddress] = useState(null);
  // "list" | "add" | "edit"
  const [view, setView] = useState("list");
  const [form, setForm] = useState(EMPTY_FORM);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  }

  function handleSave(e) {
    e.preventDefault();
    setSavedAddress({ ...form });
    setView("list");
  }

  function handleDelete() {
    setSavedAddress(null);
    setView("list");
  }

  function openEdit() {
    setForm({ ...savedAddress });
    setView("edit");
  }

  function openAdd() {
    setForm(EMPTY_FORM);
    setView("add");
  }

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500&display=swap');

    .ma-wrap {
      font-family: 'Montserrat', sans-serif;
      width: 100%;
      max-width: 560px;
    }

    /* ── Section heading ── */
    .ma-heading {
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 0.06em;
      color: #1a1a1a;
      margin: 0 0 20px;
    }

    /* ── Address card ── */
    .ma-card {
      border: 1px solid #d8d8d8;
      padding: 20px 24px 24px;
      margin-bottom: 12px;
    }

    .ma-card-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 14px;
    }

    .ma-card-label {
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 0.04em;
      color: #1a1a1a;
    }

    .ma-edit-link {
      font-size: 11px;
      font-weight: 400;
      letter-spacing: 0.04em;
      color: #1a1a1a;
      text-decoration: underline;
      text-underline-offset: 3px;
      cursor: pointer;
      background: none;
      border: none;
      padding: 0;
    }
    .ma-edit-link:hover { color: #555; }

    .ma-card-address {
      font-size: 11px;
      font-weight: 300;
      letter-spacing: 0.03em;
      color: #1a1a1a;
      line-height: 1.7;
    }

    /* ── Buttons ── */
    .ma-btn-dark {
      display: block;
      width: 100%;
      background: #1a1a1a;
      color: #fff;
      border: none;
      padding: 18px 0;
      font-family: 'Montserrat', sans-serif;
      font-size: 10px;
      font-weight: 500;
      letter-spacing: 0.28em;
      text-transform: uppercase;
      cursor: pointer;
      text-align: center;
      transition: background 0.2s;
      margin-bottom: 10px;
    }
    .ma-btn-dark:hover { background: #000; }

    .ma-btn-red {
      display: block;
      width: 100%;
      background: #c0392b;
      color: #fff;
      border: none;
      padding: 18px 0;
      font-family: 'Montserrat', sans-serif;
      font-size: 10px;
      font-weight: 500;
      letter-spacing: 0.28em;
      text-transform: uppercase;
      cursor: pointer;
      text-align: center;
      transition: background 0.2s;
      margin-bottom: 10px;
    }
    .ma-btn-red:hover { background: #a93226; }

    .ma-btn-outline {
      display: block;
      width: 100%;
      background: #fff;
      color: #1a1a1a;
      border: 1px solid #d8d8d8;
      padding: 18px 0;
      font-family: 'Montserrat', sans-serif;
      font-size: 10px;
      font-weight: 500;
      letter-spacing: 0.28em;
      text-transform: uppercase;
      cursor: pointer;
      text-align: center;
      transition: background 0.2s, border-color 0.2s;
      margin-bottom: 10px;
    }
    .ma-btn-outline:hover { background: #f5f5f5; }

    /* ── Form ── */
    .ma-form-heading {
      font-size: 12px;
      font-weight: 500;
      letter-spacing: 0.06em;
      color: #1a1a1a;
      margin: 0 0 32px;
    }

    .ma-form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0 24px;
    }

    .ma-field {
      display: flex;
      flex-direction: column;
      margin-bottom: 28px;
    }
    .ma-field.full {
      grid-column: 1 / -1;
    }

    .ma-field-label {
      font-size: 9px;
      font-weight: 500;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: #aaa;
      margin-bottom: 4px;
    }

    .ma-field-input {
      background: transparent;
      border: none;
      border-bottom: 1px solid #ccc;
      padding: 8px 0 10px;
      font-family: 'Montserrat', sans-serif;
      font-size: 12px;
      font-weight: 300;
      letter-spacing: 0.04em;
      color: #1a1a1a;
      outline: none;
      transition: border-color 0.2s;
    }
    .ma-field-input:focus { border-color: #1a1a1a; }
    .ma-field-input::placeholder { color: #bbb; }

    /* Country field with visible value */
    .ma-field-input.has-value {
      font-weight: 400;
      color: #1a1a1a;
    }

    /* Checkbox row */
    .ma-checkbox-row {
      display: flex;
      align-items: center;
      gap: 12px;
      margin: 4px 0 28px;
    }

    .ma-checkbox {
      width: 16px;
      height: 16px;
      border: 1px solid #bbb;
      appearance: none;
      -webkit-appearance: none;
      cursor: pointer;
      position: relative;
      flex-shrink: 0;
      background: #fff;
    }
    .ma-checkbox:checked {
      background: #1a1a1a;
      border-color: #1a1a1a;
    }
    .ma-checkbox:checked::after {
      content: '';
      position: absolute;
      left: 4px; top: 1px;
      width: 5px; height: 9px;
      border: 2px solid #fff;
      border-top: none;
      border-left: none;
      transform: rotate(45deg);
    }

    .ma-checkbox-label {
      font-size: 11px;
      font-weight: 400;
      letter-spacing: 0.03em;
      color: #1a1a1a;
      cursor: pointer;
    }

    .ma-actions { margin-top: 8px; }
  `;

  // ── LIST VIEW ──
  if (view === "list") {
    return (
      <>
        <style>{css}</style>
        <div className="ma-wrap">
          <p className="ma-heading">Manage Addresses</p>

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

          <button className="ma-btn-dark" onClick={openAdd}>
            Add Shipping Address
          </button>
        </div>
      </>
    );
  }

  // ── ADD / EDIT FORM VIEW ──
  const isEditing = view === "edit";

  return (
    <>
      <style>{css}</style>
      <div className="ma-wrap">
        <p className="ma-form-heading">
          {isEditing ? "Edit Shipping Address" : "Add Shipping Address"}
        </p>

        <form onSubmit={handleSave}>
          <div className="ma-form-grid">

            {/* First Name */}
            <div className="ma-field">
              <label className="ma-field-label">First Name *</label>
              <input
                className="ma-field-input"
                name="firstName" value={form.firstName}
                onChange={handleChange} required
              />
            </div>

            {/* Last Name */}
            <div className="ma-field">
              <label className="ma-field-label">Last Name *</label>
              <input
                className="ma-field-input"
                name="lastName" value={form.lastName}
                onChange={handleChange} required
              />
            </div>

            {/* Address Line 1 */}
            <div className="ma-field">
              <label className="ma-field-label">Address Line 1 *</label>
              <input
                className="ma-field-input"
                name="address1" value={form.address1}
                onChange={handleChange} required
              />
            </div>

            {/* Address Line 2 */}
            <div className="ma-field">
              <label className="ma-field-label">Address Line 2</label>
              <input
                className="ma-field-input"
                name="address2" value={form.address2}
                onChange={handleChange}
              />
            </div>

            {/* City */}
            <div className="ma-field">
              <label className="ma-field-label">City *</label>
              <input
                className="ma-field-input"
                name="city" value={form.city}
                onChange={handleChange} required
              />
            </div>

            {/* State */}
            <div className="ma-field">
              <label className="ma-field-label">State *</label>
              <input
                className="ma-field-input"
                name="state" value={form.state}
                onChange={handleChange} required
              />
            </div>

            {/* Zip */}
            <div className="ma-field">
              <label className="ma-field-label">Zip Code *</label>
              <input
                className="ma-field-input"
                name="zip" value={form.zip}
                onChange={handleChange} required
              />
            </div>

            {/* Country */}
            <div className="ma-field">
              <label className="ma-field-label">Country *</label>
              <input
                className={`ma-field-input${form.country ? " has-value" : ""}`}
                name="country" value={form.country}
                onChange={handleChange} required
              />
            </div>

            {/* Phone — full width */}
            <div className="ma-field full">
              <label className="ma-field-label">Phone Number *</label>
              <input
                className="ma-field-input"
                name="phone" value={form.phone}
                onChange={handleChange} required
                style={{ maxWidth: "260px" }}
              />
            </div>

          </div>

          {/* Default checkbox */}
          <div className="ma-checkbox-row">
            <input
              className="ma-checkbox"
              type="checkbox"
              id="isDefault"
              name="isDefault"
              checked={form.isDefault}
              onChange={handleChange}
            />
            <label className="ma-checkbox-label" htmlFor="isDefault">
              Use as my default shipping address
            </label>
          </div>

          {/* Action buttons */}
          <div className="ma-actions">
            <button type="submit" className="ma-btn-dark">Save</button>

            {/* Delete only shows when editing an existing address */}
            {isEditing && (
              <button
                type="button"
                className="ma-btn-red"
                onClick={handleDelete}
              >
                Delete Address
              </button>
            )}

            <button
              type="button"
              className="ma-btn-outline"
              onClick={() => setView("list")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ManageAddresses;
