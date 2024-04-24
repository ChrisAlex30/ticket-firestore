import React, { useState } from 'react'


const StaffForm = ({dateStart,dateEnd,handleDateStartChange,handleDateEndChange,getData,reset}) => {
  
  return (
  
    <div className="inputs mt-5">
        
           
            <div className="input-details mt-4 flex flex-1 md:flex-row flex-col justify-between">
              <div className="input-fromdate w-full">
            <label htmlFor="fromdate" className="block mb-2 text-sm font-medium text-gray-900 " >Start Date</label>
            <input type="date" id="fromdate" aria-describedby="helper-text-explanation" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-1 focus:outline-gray-900 block w-full p-1" value={dateStart} onChange={handleDateStartChange}/>
            </div>

            </div>

            <div className="input-details mt-4 flex flex-1 md:flex-row flex-col justify-between">
              <div className="input-todate w-full">
            <label htmlFor="Employeename" className="block mb-2 text-sm font-medium text-gray-900 " >End Date</label>
            <input type="date" id="todate" aria-describedby="helper-text-explanation" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-1 focus:outline-gray-900 block w-full p-1" value={dateEnd} onChange={handleDateEndChange}/>
            </div>

            </div>


            <div className="detail-btn mt-10 flex flex-1 justify-start gap-2">
              <button className='rounded-lg text-md p-1 px-3 text-white bg-blue-700 hover:bg-blue-600' onClick={getData}>SEARCH</button>  
              <button className='rounded-lg text-md p-1 px-3 text-white bg-blue-700 hover:bg-blue-600' onClick={reset}>RESET</button>  
            </div>
        </div>
  )
}

export default StaffForm