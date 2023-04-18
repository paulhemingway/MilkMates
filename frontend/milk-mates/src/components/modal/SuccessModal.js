import React from 'react'
import { useModalService } from 'services/ModalService'
import { AiFillCheckCircle } from "react-icons/ai"
import { useNavigate } from 'react-router-dom'

export default function SuccessModal({message, redirectPath}) {
  const {closeModal} = useModalService()
  const navigate = useNavigate()

  const okayClicked = () => {
    closeModal()

    if(redirectPath) {
      navigate(redirectPath)
    }
  }

  return (
    <div className='success-modal'>
      <div className="success">
        <AiFillCheckCircle />
        <h2>Success!</h2>
      </div>
      <div className="modal-content">
        <p>{message}</p>
      </div>
      <div className="buttons">
        <button className="button primary-button-blue" onClick={okayClicked}>
          Continue
        </button>
      </div>
    </div>
  )
}
