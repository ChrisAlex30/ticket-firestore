import React, { useState } from 'react'

const Dasboard_form = ({inputticket,organisationnames,handlechange,handlechangesubmit,employeesnames,resetinputtickets,handleFilechange,fileInputRef}) => {


  return (
    <div className="inputs mt-5">
        
           
            <div className="input-details mt-4 flex flex-1 md:flex-row flex-col justify-between gap-7">
              <div className="input-organisation w-full">
            <label htmlFor="Organisationname" className="block mb-2 text-md font-medium text-gray-900 ">Organisation Name</label>
            <input type="text" aria-describedby="helper-text-explanation" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-1 focus:outline-gray-900 block w-full p-1" placeholder="Organisation Name" name="organisation" list='organisationnames' onChange={handlechange} value={inputticket.organisation}/>
            <datalist id='organisationnames'>
              {organisationnames.map((organisationname)=>
            <option value={organisationname.organisationname} key={organisationname.organcode}>{organisationname.organcode}</option>
            )}
            </datalist>
            </div>
          

            <div className="input-staff w-full">
            <label htmlFor="staffname" className="block mb-2 text-sm font-medium text-gray-900 ">Staff Name</label>
            <input type="text"  aria-describedby="helper-text-explanation" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-1 focus:outline-gray-900 block w-full p-1" placeholder="Organisation Name" name="employees" list='employeesnames' onChange={handlechange} value={inputticket.employees}/>
            <datalist id='employeesnames'>
              {employeesnames.map((employeesname)=>
            <option value={employeesname.empname} key={employeesname.empid}>{employeesname.empid}</option>
            )}
            </datalist>
            </div>

            </div>

            <div className="input-applicant mt-4 flex flex-1 md:flex-row flex-col justify-between gap-7">
              <div className="input-applicantname w-full">
            <label htmlFor="Organisationname" className="block mb-2 text-sm font-medium text-gray-900 ">Applicant's Name</label>
            <input type="text" id="appname" aria-describedby="helper-text-explanation" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-1 focus:outline-gray-900 block w-full p-1" placeholder="Applicant's Name" value={inputticket.applicantname} name='applicantname' onChange={handlechange}/>
            </div>
            <div className="input-mobileno w-full">
            <label htmlFor="Organisationname" className="block mb-2 text-sm font-medium text-gray-900 ">Mobile Number</label>
            <input type="number" id="mobno" aria-describedby="helper-text-explanation" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-1 focus:outline-gray-900 block w-full p-1" placeholder="Enter Mobile Number" value={inputticket.mobileno} name='mobileno' onChange={handlechange}/>
            </div>

            </div>

            <div className="input-verification mt-4 flex flex-1 md:flex-row flex-col justify-between gap-7">
              <div className="input-applicantname w-full">
            <label htmlFor="verification" className="block mb-2 text-sm font-medium text-gray-900 ">Verification Type</label>
            <input type="text" id="veritype" aria-describedby="helper-text-explanation" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-1 focus:outline-gray-900 block w-full p-1" placeholder="Verification Type" value={inputticket.verificationType} onChange={handlechange} name='verificationType'/>
            </div>
            
            <div className="input-caseid w-full">
            <label htmlFor="Organisationname" className="block mb-2 text-sm font-medium text-gray-900 ">Case Id</label>
            <input type="text" id="id" aria-describedby="helper-text-explanation" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-1 focus:outline-gray-900 block w-full p-1" placeholder="Enter Case Id" value={inputticket.caseId} name='caseId' onChange={handlechange}/>
            </div>
            </div>

            <div className="input-applicant mt-4 flex flex-1 md:flex-row flex-col justify-between gap-7">
              <div className="input-applicantname w-full">
            <label htmlFor="Organisationname" className="block mb-2 text-sm font-medium text-gray-900 ">Address</label>
            <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Enter Adress" value={inputticket.address} onChange={handlechange} name='address'></textarea>
            </div>
            <div className="input-mobileno w-full">
            <label htmlFor="Organisationname" className="block mb-2 text-sm font-medium text-gray-900 ">Trigger</label>
            <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Enter Triggered Details" value={inputticket.triggered} onChange={handlechange} name='triggered'></textarea>
            </div>

            </div>

            <div className="input-file mt-4 flex flex-1 md:flex-row flex-col justify-between gap-7">
             
              <div className="upload-file w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900 " htmlFor="user_avatar">Upload file</label>
            <input ref={fileInputRef} className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white" id="file_input" multiple="multiple" type="file" onChange={handleFilechange} />
            </div>
              
          
            </div>
          

            <div className="detail-btn mt-5 flex flex-1 md:justify-between gap-16 justify-center">
              <button className='rounded-lg text-md p-1 px-3 text-white bg-blue-700 hover:bg-blue-600' onClick={handlechangesubmit}>Submit</button>  
              <button className='rounded-lg text-md p-1 px-3 text-white bg-blue-700 hover:bg-blue-600' onClick={resetinputtickets}>Reset</button>  

            </div>
        </div>
  )
}

export default Dasboard_form