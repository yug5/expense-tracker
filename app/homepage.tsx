import React from 'react'
import { Wallet } from 'lucide-react'


export default function homepage() {
  const Amount = 2555;
  return (
    <div  className='stick left-0 mt-5 mx-5 text-4xl font-bold text-black  '>
      <div >Expense Tracker</div>
      <div className="absolute md:fixed top-1 mt-5 right-5 flex flex-row text-xl px-10 rounded-md p-2 hover:bg-gray-200 transition-all">
        <Wallet className="mr-5" size={30} /> {Amount}
      </div>
    </div>
  )
}
