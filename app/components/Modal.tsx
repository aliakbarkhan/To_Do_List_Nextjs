import React from "react"


interface ModalProps{
  modalOpen:boolean
  setModalOpen: (open:boolean) => boolean |void;
  children: React.ReactNode
}

const modals:React.FC<ModalProps> = ({modalOpen ,setModalOpen ,children}) => {
  return (
    <div className={`modal ${modalOpen ? "modal-open" : ""}`}>
    <div className="modal-box">
      <div className="modal-action">
        <label onClick={() => setModalOpen(false)}
        className="btn btn-sm btn-circle absolute right-2 top-2"> x
        </label>
        {children}
      </div>
    </div>
  </div>
  )
}

export default modals