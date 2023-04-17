import React, {useRef, useEffect} from "react";
import "assets/styles/global/Modal.scss";
import { useModalService } from "services/ModalService";
import { HiOutlineX } from "react-icons/hi";
import FocusTrap from "focus-trap-react";

export default function Modal() {
  const { content, title, closeModal } = useModalService();

  const modalRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    }

    function handleEscapeKey(event) {
      if (event.key === "Escape") {
        closeModal();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [modalRef]);

  return (
    <div className="modal-cont">
      <FocusTrap>
        <div className="modal" ref={modalRef}>
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
