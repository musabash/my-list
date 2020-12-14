import React, { useContext} from "react"
import { AllContext} from "./AllContext"

function Modal() {
  const {setEdit, saveEdit, edit, modalHide, toggleModal} = useContext(AllContext)
  return (
    <div className={modalHide ? "modal-hide" : "modal"}>
      <form className="modal-container">
        <input
          type="text"
          value={edit}
          className="item-input"
          onChange={event => {
            setEdit (event.target.value)
          }}
        />
        <div className="modal-container-buttons">
          <input   
            type="button"
            value="Save"
            onClick={() => {
              toggleModal()
              saveEdit()
              }}
            className="modal-btns"
          />
          <input
            type="button"
            value="Cancel"
            className="modal-btns"
            onClick={toggleModal} 
          />
        </div>
      </form>
    </div>
  )
}

export default Modal