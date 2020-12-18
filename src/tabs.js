import React,{ useContext} from "react"
import { AllContext } from "./AllContext"

export default function Tabs () {
   const {setActiveTab} = useContext(AllContext)
  return (
    <div class="tabs">
      <button className="tab" onClick={() => setActiveTab(true)}>completed</button>
      <button className="tab" onClick={() => setActiveTab(null)} >all</button>
      <button className="tab" onClick={() => setActiveTab(false)}>incomplete</button>
    </div>
  )
}