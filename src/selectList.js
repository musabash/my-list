import React, { useContext, useState } from "react"
import { AllContext } from "./AllContext"
import { FaRegWindowClose } from 'react-icons/fa'

function SelectList({list, selectListHide, setSelectListHide, selected}) {
  const { setItemsData, deleteList, setLoadedList, renameList } = useContext(AllContext)
  const [value, setValue] = useState("")
  const onChangeHandler = (e) => {
    setValue(e.target.value)
  }
  const setSelectorToDefault = () => {
    setSelectListHide(prev => !prev)
    setValue("")
  }
  
  const onSubmitHandler = () => {
    switch (selected) {
      case "Load a List":
        setItemsData(JSON.parse(localStorage.getItem(value)))
        setLoadedList(value)
        setSelectorToDefault()
        break;
      case "Rename a List":
        renameList(value)
        setSelectorToDefault()
        break;
      case "Delete a List":
        deleteList(value)
        setSelectorToDefault()
        break;
      default:
        setSelectorToDefault()
    }
  }

  const yesNo = () => 
    <>
      <p>{selected.split(" ")[0]} "<span>{value}</span>"?</p>
      <div className="modal-container-buttons">
        <input   
          type="button"
          value="YES"
          onClick={onSubmitHandler}
          className="modal-btns"
        />
        <input
          type="button"
          value="NO"
          className="modal-btns"
          onClick={() => setSelectorToDefault()}
        />
      </div>
    </>
  

  return (
    <div className={selectListHide ? "modal-hide" : "modal selectList"}>
      <FaRegWindowClose 
        onClick={setSelectorToDefault}
        className="modal-btns select-close-btn"
      />
      <form className="modal-container">        
        {` Select a List to ${selected.split(" ")[0]} `}
        <label>
          <select
            id="mySelector"
            onChange={onChangeHandler}
            value={'DEFAULT'}
          >
            <option value="DEFAULT">...</option>
            {list && list.map(elm =>
              <option value={elm}>{elm}</option>
            )}
          </select>
        </label>
        {value && yesNo()}
      </form>
    </div>
  )
}

export default SelectList