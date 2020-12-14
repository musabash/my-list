import React, {useState, useContext} from "react"
import SelectList from "./selectList"
import { AllContext } from "./AllContext"

function Menu() {
  const [selected, setSelected] = useState("")
  const { menuHide, nameList, setList, list, setItemsData, itemsData, selectListHide, setSelectListHide, setLoadedList} = useContext(AllContext)
  
  const deleteAllData = () => {
    localStorage.clear()
    setList([])
    setItemsData([])
  }
  const handleMenuClick = (e) => {
    setSelected(e.target.name)
    switch (e.target.name) {
      case "Save":
        nameList()
        break;
      case "Clean All Data":
        deleteAllData()
        setLoadedList("")
        break;
      default:
        setSelectListHide(prev => !prev)
    }
  }

  function MenuButton({name}){
    return (
      <button
      disabled={list.length === 0 ? true : false}
      name={name}
      className="modal-btns menu-btns"
      onClick={handleMenuClick}
      >
        {name}
      </button>
    )
  }
  return (
    <div className={menuHide ? "modal__menu hide" : "modal__menu"}>
      <div className="menu-container-buttons">
        <button
          disabled={itemsData.length === 0 ? true : false}
          name="Save"
          className="modal-btns menu-btns"
          onClick={handleMenuClick}
        >
          Save List
        </button>
        <MenuButton name="Load a List"/>
        <MenuButton name="Delete a List"/>
        <MenuButton name="Rename a List"/>
        <MenuButton name="Clean All Data"/>
        <SelectList
          selectListHide={selectListHide}
          setSelectListHide={setSelectListHide}
          list={list}
          selected={selected}
          setSelected={setSelected}
        />
      </div>
    </div>
  )
}

export default Menu