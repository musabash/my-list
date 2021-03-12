import React from "react"
import { FaRegSave } from 'react-icons/fa';

const ListHeader = ({loadedList, itemsData}) => {
  return ( 
    <div className="list-header-container">
        <h3 className="header">{loadedList}</h3>
        <FaRegSave
          onClick={() => localStorage.setItem(loadedList, JSON.stringify(itemsData))}
          style={{color: "#5f5f99", fontSize: "1.4rem", cursor: "pointer", margin: "0.4em"}}
        />
      </div>
   );
}
 
export default ListHeader;