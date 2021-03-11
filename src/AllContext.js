import React, {useState, useEffect} from "react"
import Item from "./item"

const AllContext = React.createContext()

function AllContextProvider(props) {
  const listArray = JSON.parse(localStorage.getItem('listArray'))
  const data = listArray && JSON.parse(localStorage.getItem(listArray[listArray.length - 1]))
  const [activeTab, setActiveTab] = useState(null)
  const [itemsData, setItemsData] = useState(data ? data : [])
  const [newInput, setNewInput] = useState("")
  const [edit, setEdit] = useState("")
  const [editItem, setEditItem] = useState("")
  const [menuHide, setMenuHide] = useState(true)
  const [modalHide, setModalHide] = useState(true)
  const [listName, setListName] = useState("")
  const [list, setList] = useState(listArray ? listArray : [])
  const [loadedList, setLoadedList] = useState(listArray ? listArray[listArray.length - 1] : "My List")

  const toggleModal = () => setModalHide((prev) => !prev )
  const toggleMenu = () => {
    setMenuHide(prev => !prev )
  }
  
  const nameList = () => {
    setListName(prompt('Please give a name to your list.', `List-${list.length + 1}`))
  }

  function editDataProperty(property, trgt) {
    const newData = itemsData.map(elm => {
      if (elm.id === trgt) {
        return {
          ...elm,
          [property]: !elm.[property]
        }
      } else { return elm}
    })
    setItemsData(newData)
  }

  function LoadList() {
    return (
      activeTab === null ? 
      <div className='list'>
        {itemsData && itemsData.map(item => 
          <Item
            key={item.id}
            item={item}
          />)
        }
      </div> :
      <div className='list'>
        {
          itemsData && itemsData.filter(elm => elm.completed === activeTab).map(item => 
          <Item
            key={item.id}
            item={item}
          />)
        }
      </div>

    )
  }

  function renameList(value) {
    const newName = prompt('Rename your list.', value)
    if (list.includes(newName)) {
      window.alert("This list-name already exists.")
    } else if (newName !== null) {
      setItemsData(JSON.parse(localStorage.getItem(value)))
      setListName(newName)
      loadedList === value && setLoadedList(newName)
      deleteList(value)
    }
  }

  function deleteList(value) {
    localStorage.removeItem(value)
    setList(prev => prev.filter(elm => elm !== value ))
    localStorage.setItem('listArray', JSON.stringify(list))
  }
  function saveList(x, e) { 
    if (x !== "" && !list.includes(x)) {
      setList(prev => [...prev, x])
      setListName("")
      setLoadedList(x)
    } else {
      window.alert("This list-name already exists.")
    }
  }

  function saveEdit() {
    const newData = itemsData.map(elm => {
      if (elm.id === editItem) {
        return {
          ...elm,
          name: edit
        }
      } else { return elm}
    })
    setItemsData(newData)
  }

  function handler(type) {
    return function(e){
      const trgt = e.currentTarget.id
      if (type === "edit") {
        toggleModal()
        setEdit(e.currentTarget.name)
        setEditItem(trgt)
      } else if (type === "check" || type === "label") {
          editDataProperty('completed', trgt)
      } else if (type === "delete") {
          setItemsData(itemsData.filter(item => item.id !== trgt))
      }
    }
  }

  function addItem(e){
    e.preventDefault()
    setItemsData(prev => prev && [...prev,
      {
      id: newInput + itemsData.length,
      name: newInput,
      completed: false,
      editable: false,
      }]
    )
    setNewInput("")
  }

  useEffect(() => {
    if (listName) {
      saveList(listName)
      localStorage.setItem(listName, JSON.stringify(itemsData))
    }
  }, [listName])

  useEffect(() => {
    localStorage.setItem('listArray', JSON.stringify(list))
  }, [list])

  const value = {
    toggleModal,
    editDataProperty,
    LoadList,
    saveList,
    saveEdit,
    setItemsData,
    addItem,
    nameList,
    setEdit,
    edit,
    menuHide,
    toggleMenu,
    newInput,
    setNewInput,
    itemsData,
    list,
    setList,
    setEditItem,
    modalHide,
    setModalHide,
    listName,
    deleteList,
    loadedList,
    setLoadedList,
    renameList,
    handler,
    setActiveTab,
    activeTab
  }

  return (
    <AllContext.Provider value={value}>
      {props.children}
    </AllContext.Provider>
  )
}

export {AllContext, AllContextProvider}