import React, { useContext } from "react"
import Menu from "./menu"
import { FaBars, FaWindowClose } from 'react-icons/fa';
import { AllContext } from "./AllContext"

const Header = () => {
  const {menuHide, toggleMenu} = useContext(AllContext)
  return ( 
    <div className="header-container">
        <Menu />
        <h2 className="header"> MY LIST</h2>
        <button
          className={!menuHide ? "menu menu-btns modal-btns" : "menu"}
          onClick={toggleMenu}
        >
          {menuHide ? <FaBars /> : <FaWindowClose className="menu-close" />}
        </button>
      </div>
   );
}
 
export default Header;