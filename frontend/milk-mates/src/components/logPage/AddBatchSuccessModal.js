import React from 'react'
import { useModalService } from 'services/ModalService'

export default function AddBatchSuccessModal() {
  const {closeModal} = useModalService()

  const okayClicked = () => {
    closeModal()
  }

  return (
    <div className='add-batch-success'>
      <div className="modal-content">
        <p>Your new batch was successfully added!</p>
      </div>
      <div className="buttons">
        <button className="button primary-button-blue" onClick={okayClicked}>
          Okay
        </button>
      </div>
    </div>
  )
}
