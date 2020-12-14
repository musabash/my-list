import React, {useContext, useRef} from 'react';
import Modal from "./modal"
import Menu from "./menu"
import { FaBars, FaWindowClose, FaRegSave } from 'react-icons/fa';
import { AllContext} from "./AllContext"


function App() {
  const {menuHide, toggleMenu, itemsData, addItem, newInput, setNewInput, LoadList, loadedList} = useContext(AllContext)
  const inputRef = useRef(null)
  return (
    <div className="main">
      <div className="header-container">
        <h2 className="header"> MY LIST</h2>
        <Menu />
        <button
          className={!menuHide ? "menu menu-btns modal-btns" : "menu"}
          onClick={toggleMenu}
        >
          {menuHide ? <FaBars /> : <FaWindowClose />}
        </button>
      </div>
      <div className='container'>        
        <Modal />
        <div className="form">
          <form onSubmit={(e) => {
            addItem(e)
            inputRef.current.focus()
            }}>
            <input
              className="item-input"
              type="text" required
              ref={inputRef}
              name="item"
              value={newInput}
              onChange={event => {
                setNewInput(event.target.value)
              }}
              placeholder="e.g. Milk"
            />
            <button className="submit-btn" type='submit'>Add</button>
          </form>
          <div className="list-header-container">
            <h3 className="header">{loadedList}</h3>
            <FaRegSave
              onClick={() => localStorage.setItem(loadedList, JSON.stringify(itemsData))}
              style={{color: "teal", fontSize: "1rem", cursor: "pointer"}}
            />
          </div>
          <LoadList />
        </div>
      </div>
    </div>
  );

}

export default App;
