import React, { useState, useEffect } from "react";
import { InputMask } from "primereact/inputmask";
import { useModalService } from "services/ModalService";
import DeleteUserModal from "../modal/DeleteUserModal";
import { useAuth } from "services/AuthService";
import SuccessModal from "components/modal/SuccessModal";


export default function EditProfile({ user }) {
  const [changed, setChanged] = useState(false);
  const { openModal } = useModalService();
  const {editUserInfo} = useAuth()

  const [fName, setFName] = useState(user.fName);
  const [lName, setLName] = useState(user.LName);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [zip, setZip] = useState(user.zipCode);

  const [errors, setErrors] = useState({
    fName: "",
    lName: "",
    email: "",
    phone: "",
    zip: "",
  });

  const nameRegex = /^[a-zA-Z]+(['-][a-zA-Z]+)*$/;

  useEffect(() => {
    setChanged(
      fName !== user.fName ||
        lName !== user.LName ||
        email !== user.email ||
        phone !== user.phone ||
        zip !== user.zipCode
    );
  }, [email, fName, lName, phone, zip, user]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!valid()) return;
    const success = await editUserInfo(user.username, fName, lName, email, phone, zip)
    if(success) {
      successModal()
    } else {
      
    }
  };

  const successModal = () => {
    openModal(
      <SuccessModal message={`Your user information has been updated successfully.`} />
    );
  };

  const valid = () => {
    const newErrors = {
      fName: validateName(fName, true),
      lName: validateName(lName, false),
      email: validateEmail(email),
      phone: validatePhone(phone),
      zip: validateZip(zip),
    };
    setErrors(newErrors);

    const firstError = Object.keys(newErrors).find(
      (error) => newErrors[error].length > 0
    );
    console.log(firstError);
    return !Object.values(newErrors).some((value) => value.length > 0);
  };

  const validateName = (value, isFirst) => {
    let msg = "";
    if (value === "") {
      msg = `Please enter a ${isFirst ? "first" : "last"} name.`;
    } else if (!nameRegex.test(value)) {
      msg = `Names can only contain letters, hyphens (-), apostrophes ('), and spaces.`;
    }
    return msg;
  };

  const validateEmail = (value) => {
    let msg = "";
    if (value === "") {
      msg = "Please enter an email address.";
    }
    return msg;
  };

  const validatePhone = (value) => {
    let msg = "";
    if (value.length < 10) {
      msg = "Please enter a 10-digit phone number.";
    }
    return msg;
  };

  const validateZip = (value) => {
    let msg = "";
    if (value.length < 5) {
      msg = "Please enter a 5-digit zip code.";
    }
    return msg;
  };

  const deleteClicked = (e) => {
    openModal(<DeleteUserModal username={user.username}/>)
  };

  return (
    <div className="edit-profile">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <div className="input-cont">
            <label>
              Username
              <div className="field disabled">
                <input type="text" defaultValue={user.username} disabled />
              </div>
            </label>
          </div>
          <div className="input-cont">
            <label>
              Email
              <div
                className={`field ${errors.email.length > 0 && "error-field"}`}
              >
                <input type="email" value={email} onChange={emailChanged} />
              </div>
            </label>
            <p className="error">{errors.email}</p>
          </div>
          <div className="two-col">
            <div className="input-cont">
              <label>
                First Name
                <div
                  className={`field ${
                    errors.fName.length > 0 && "error-field"
                  }`}
                >
                  <input type="text" value={fName} onChange={fNameChanged} />
                </div>
              </label>
              <p className="error">{errors.fName}</p>
            </div>
            <div className="input-cont">
              <label>
                Last Name
                <div
                  className={`field ${
                    errors.lName.length > 0 && "error-field"
                  }`}
                >
                  <input type="text" value={lName} onChange={lNameChanged} />
                </div>
              </label>
              <p className="error">{errors.lName}</p>
            </div>
          </div>
          <div className="two-col">
            <div className="input-cont">
              <label>
                Phone Number
                <div
                  className={`field ${
                    errors.phone.length > 0 && "error-field"
                  }`}
                >
                  <InputMask
                    placeholder="Phone Number"
                    onChange={phoneChanged}
                    value={user.phone}
                    mask="+1 (999) 999-9999"
                  />
                </div>
              </label>
              <p className="error">{errors.phone}</p>
            </div>
            <div className="input-cont">
              <label>
                Zip Code
                <div
                  className={`field ${errors.zip.length > 0 && "error-field"}`}
                >
                  <InputMask
                    placeholder="Zip Code"
                    onChange={zipChanged}
                    value={zip}
                    mask="99999"
                  />
                </div>
              </label>
              <p className="error">{errors.zip}</p>
            </div>
          </div>
        </div>
        <div className="buttons">
          <input
            type="submit"
            value="Update Profile"
            className="save shadow"
            disabled={!changed}
          />
          <button
            type="button"
            onClick={deleteClicked}
            className="delete shadow"
          >
            Deactivate Account
          </button>
        </div>
      </form>
    </div>
  );
}
