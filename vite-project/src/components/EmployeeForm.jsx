import React from 'react'


const EmployeeForm = ({handleChange,handleAddUpdate,reset,employeedetails,handleemproleChange,emprole}) => {
  

  return (
  
    <div className="inputs mt-5">
        
           
            <div className="input-details mt-4 flex flex-1 md:flex-row flex-col justify-between">
              <div className="input-organisation w-full">
            <label htmlFor="Employeename" className="block mb-2 text-sm font-medium text-gray-900 " >Employee Name</label>
            <input type="text" id="Employee" name="empname" value={employeedetails.empname} onChange={handleChange} aria-describedby="helper-text-explanation" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-1 focus:outline-gray-900 block w-full p-1" placeholder="Enter Employee Name" />
            </div>

            </div>

            <div className="input-details mt-4 flex flex-1 md:flex-row flex-col justify-between">
              <div className="input-organisation w-full">
            <label htmlFor="Employeename" className="block mb-2 text-sm font-medium text-gray-900 " >Employee Password</label>
            <input type="text" id="Password" name="emppassword" value={employeedetails.emppassword} onChange={handleChange} aria-describedby="helper-text-explanation" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-1 focus:outline-gray-900 block w-full p-1" placeholder="Enter Employee Password"  />
            </div>

            </div>

            <div className="input-details mt-4 flex flex-1 md:flex-row flex-col justify-between">
              <div className="input-organisation w-full">
            <label htmlFor="Employeename" className="block mb-2 text-sm font-medium text-gray-900 " >Employee Role</label>
            <select id="role" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-1 focus:outline-gray-900 block w-full p-1 " value={emprole} onChange={handleemproleChange}>

            <option value="Not Selected">Not Selected</option>
            <option value="superadmin">Superadmin</option>
            <option value="admin">Admin</option>
            <option value="staff">Staff</option>
           
            </select>
            </div>

            </div>


            <div className="detail-btn mt-10 flex flex-1 justify-start gap-4">
              <button className='rounded-lg text-md p-1 px-3 text-white bg-blue-700 hover:bg-blue-600' onClick={handleAddUpdate} >{employeedetails.empid!==''?"UPDATE":"ADD"}</button>  
              <button className='rounded-lg text-md p-1 px-3 text-white bg-blue-700 hover:bg-blue-600' onClick={reset} >RESET</button>  
            </div>
        </div>
  )
}

export default EmployeeForm