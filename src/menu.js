import React, {useState, useContext} from "react"
import { AllContext } from "./AllContext"

function Menu() {
  const [selected, setSelected] = useState("")
  const { menuHide, nameList, setList, list, setItemsData, setLoadedList, deleteList, renameList} = useContext(AllContext)
  
  const deleteAllData = () => {
    localStorage.clear()
    setList([])
    setItemsData([])
  }

  const handleClick = (e) => {
    switch (e.target.name) {
      case "load":
        setItemsData(JSON.parse(localStorage.getItem(selected)))
        setLoadedList(selected)
        setSelected("")
        break;
      case "rename":
        renameList(selected)
        setSelected("")
        break;
      case "delete":
        deleteList(selected)
        setSelected("")
        break;
      case "Save":
        setSelected("")
        nameList()
        break;
      case "Clean All Data":
        setSelected("")
        deleteAllData()
        setLoadedList("")
        break;
      default:
        setSelected(e.target.name)
    }
  }


  function OptionsTabs() {
    return (
      <div className="menu-tabs">
        {
          ["load", "rename", "delete"].map(elm =>
          <button 
            className="menu-tab"
            name={elm}
            onClick={handleClick}>{elm}
          </button>
        )}
      </div>
    )
  }
  
  const yesNo = () => 
  <>
    <p>{selected.split(" ")[0]} "<span>Are you sure?</span>"?</p>
    <div className="modal-container-buttons">
      <input   
        type="button"
        value="YES"
        onClick={handleClick}
        className="modal-btns"
      />
      <input
        type="button"
        value="NO"
        className="modal-btns"
        onClick={() => console.log("done!")}
      />
    </div>
  </>

  function ListButton({name}){
    return (
      <button
        name={name}
        className="modal-btns menu-btns"
        onClick={handleClick}
      >
        {name}
      </button>
    )
  }

  const ListOfLists = () => list.map(elm => 
            <div className={selected === elm ? "menu-tab-opened" : ""}>
              <ListButton name={elm} />
              {selected === elm && <OptionsTabs />}
            </div>
          )

  return (
    <div className={menuHide ? "modal__menu hide" : "modal__menu"}>
      <div className="menu-container-buttons">
          <ListButton name="Save" />
          <ListButton name="Clean All Data" />
          <ListOfLists />
      </div>
    </div>
  )
}

export default Menu