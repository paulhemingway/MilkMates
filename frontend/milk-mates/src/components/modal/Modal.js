import React, {useRef, useEffect} from "react";
import "assets/styles/global/Modal.scss";
import { useModalService } from "services/ModalService";
import { HiOutlineX } from "react-icons/hi";
import FocusTrap from "focus-trap-react";

export default function Modal() {
  const { content, closeModal } = useModalService();

  const modalRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        if(typeof event.target.className === "string") {
          if(event.target.className.includes("Mui")) {
            return
          }
        } else {
          if(event.target.className.baseVal.includes("Mui") || typeof event.target.className === "object") {
            return
          }
        }
       
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

  function handleDateTimePickerClick(event) {
    event.stopPropagation();
  }

  return (
    <div className="modal-cont">
      <FocusTrap>
        <div className="modal" ref={modalRef}>
          <div className="top">
            
            <HiOutlineX onClick={closeModal} tabIndex="0" />
          </div>
          {content}
        </div>
      </FocusTrap>
    </div>
  );
}
