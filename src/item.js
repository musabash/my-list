import React, {useContext} from "react"
import { AllContext} from "./AllContext"
import { FaRegSquare, FaRegCheckSquare, FaRegTrashAlt, FaRegEdit } from 'react-icons/fa';

function Item({item}) {
  const {handler} = useContext(AllContext)
  
  const ItemButton = ({type, icon}) => {
    return (
      <button
        className={type === "label" ? `label ${item.completed && "completed"}` : 'item-button'}
        onClick={(e) => handler(type)(e)}
        id={item.id}
        name={item.name}
      >
      {icon}
      </button>
    )
  }

  return (
    <div className='item'>
      <ItemButton type="delete" icon={<FaRegTrashAlt />} />
      <ItemButton type="edit" icon={<FaRegEdit />} />
      <ItemButton type="check" icon={item.completed ? <FaRegCheckSquare /> : <FaRegSquare />} />
      <ItemButton type="label" icon={item.name}/>
    </div>
  )
}

export default Item