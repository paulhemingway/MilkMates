import React from "react";
import "assets/styles/global/Modal.scss";
import { useModalService } from "services/ModalService";
import { HiOutlineX } from "react-icons/hi";
import FocusTrap from "focus-trap-react";

export default function Modal() {
  const { content, title, closeModal } = useModalService();
  return (
    <div className="modal-cont">
      <FocusTrap>
        <div className="modal">
          <div className="top">
            <h1>{title}</h1>
            <HiOutlineX onClick={closeModal} tabIndex="0" />
          </div>
          {content}
        </div>
      </FocusTrap>
    </div>
  );
}
