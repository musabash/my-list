import React,{ useContext} from "react"
import { AllContext } from "./AllContext"

export default function Tabs () {
   const {setActiveTab, activeTab} = useContext(AllContext)
   const Tab = ({value, name}) => <button className="tab" onClick={() => setActiveTab(value)}>{name}</button>
  return (
    <div className="tabs">
      <Tab value={true} name="completed" />
      <Tab value={null} name="all" />
      <Tab value={false} name="incomplete" />
      <div 
        className="slider" 
        style={{transform: `translateX(${activeTab === null ? 0 : activeTab ? -158 : 158}%)`}}
      >
      </div>
    </div>
      
  )
}