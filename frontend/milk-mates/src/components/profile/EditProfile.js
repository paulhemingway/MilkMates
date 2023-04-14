import React, { useState, useEffect } from "react";
import { InputMask } from "primereact/inputmask";

export default function EditProfile({ user }) {
  const [changed, setChanged] = useState(false);

  const [fName, setFName] = useState(user.fName);
  const [lName, setLName] = useState(user.LName);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [zip, setZip] = useState(user.zipCode);

  useEffect(() => {
    setChanged(
      fName !== user.fName ||
        lName !== user.LName ||
        email !== user.email ||
        phone !== user.phone ||
        zip !== user.zipCode
    );
  }, [email, fName, lName, phone, zip]);

  const emailChanged = (e) => {
    setEmail(e.target.value);
  };

  const fNameChanged = (e) => {
    setFName(e.target.value);
  };

  const lNameChanged = (e) => {
    setLName(e.target.value);
  };

  const phoneChanged = (e) => {
    let newPhone = e.value.replace(/[\s()_-]/g, "").replace("+1", "");
    setPhone(newPhone);
  };

  const zipChanged = (e) => {
    setZip(e.target.value);
  };

  return (
    <div className="edit-profile">
      <h2>Edit Profile</h2>
      <div className="inputs">
        <div className="input-cont">
          <label>
            Username
            <input type="text" defaultValue={user.username} disabled />
          </label>
        </div>
        <div className="input-cont">
          <label>
            Email
            <input type="email" value={email} onChange={emailChanged} />
          </label>
        </div>
        <div className="two-col">
          <div className="input-cont">
            <label>
              First Name
              <input type="text" value={fName} onChange={fNameChanged} />
            </label>
          </div>
          <div className="input-cont">
            <label>
              Last Name
              <input type="text" value={lName} onChange={lNameChanged} />
            </label>
          </div>
        </div>
        <div className="two-col">
          <div className="input-cont">
          <label>
                Phone Number
                <div
                >
                  <InputMask
                    placeholder="Phone Number"
                    className="phone-input"
                    onChange={phoneChanged}
                    value={user.phone}
                    mask="+1 (999) 999-9999"
                  />
                </div>
              </label>
          </div>
          <div className="input-cont">
            <label>
              Zip Code
              <InputMask placeholder="Zip Code" onChange={zipChanged} value={zip} mask="99999"/>
            </label>
          </div>
        </div>
      </div>
      <div className="buttons">
        <button className="save shadow" disabled={!changed}>
          Save Changes
        </button>
        <button className="delete shadow">Delete Account</button>
      </div>
    </div>
  );
}
