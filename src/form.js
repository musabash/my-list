import React, { useContext, useRef } from "react"
import { AllContext } from "./AllContext"
import Tabs from "./tabs"
import ListHeader from "./listHeader"

const Form = () => {
  const { itemsData, addItem, newInput, setNewInput, LoadList, loadedList } = useContext(AllContext)
  const inputRef = useRef(null)
  return ( 
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
      <ListHeader 
        itemsData={itemsData}
        loadedList={loadedList}
      />
      <Tabs />
      <LoadList />
    </div>
   );
}
 
export default Form;