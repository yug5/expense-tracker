import React from 'react'
import DashBoard from './comp/dashBoard'
import Graph from './comp/graph'
import Homepage from './homepage'



export default function Home() {
  return (
    <div>
    <Homepage/>
    <div className="flex flex-col md:flex-row">
    <DashBoard/>
    <Graph/>
    </div>
    </div>
  )
}
