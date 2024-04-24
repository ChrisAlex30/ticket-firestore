import React from 'react'


const OrganisationForm = ({handleChange,organisationname,handleAddUpdate,reset,organcode}) => {
  


  return (
  
    <div className="inputs mt-5">
        
           
            <div className="input-details mt-4 flex flex-1 md:flex-row flex-col justify-between gap-7">
              <div className="input-organisation w-full">
            <label htmlFor="Organisationname" className="block mb-2 text-sm font-medium text-gray-900 " >Organisation Name</label>
            <input type="text" id="organisation" aria-describedby="helper-text-explanation" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-1 focus:outline-gray-900 block w-full p-1" placeholder="Enter Organisation Name" value={organisationname} onChange={handleChange}/>
            </div>
           

            </div>


            <div className="detail-btn mt-5 flex flex-1 justify-start gap-4">
              <button className='rounded-lg text-md p-1 px-3 text-white bg-blue-700 hover:bg-blue-600'  onClick={handleAddUpdate}>{organcode!==''?"UPDATE":"ADD"}</button>  
              <button className='rounded-lg text-md p-1 px-3 text-white bg-blue-700 hover:bg-blue-600' onClick={reset}>RESET</button>  
            </div>
        </div>
  )
}

export default OrganisationForm