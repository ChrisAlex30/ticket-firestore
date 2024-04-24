import React from 'react'
import toast from 'react-hot-toast';


const CaseDetailsModal=({employeeRef,closeModalEmployees,employeecasesmodal,employeesfiles,ticketmodalstatus,handleticketstatusModalChange,handleModalSubmit})=>{

  const handleDownload = (fileLocation) => {
    
    console.log('fileLocation',fileLocation);
    const link = document.createElement('a');
    link.href = fileLocation;
    link.setAttribute('download',' ');
    link.setAttribute('target','_blank');
    console.log(link);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
    return(
      
      <dialog ref={employeeRef} className='w-fit md:w-[50%] h-fit'>
       
        <div className='DetailsModal h-fit md:h-[39em] overflow-scroll DetailsModal'>
                  
        <div className='DetailsModaldiv px-4'> 
        <h1 className='text-xl underline underline-offset-2 font-bold text-center p-3'>Case Details</h1>

        {/* <a href="/upload-files/1-15 (1) (1) (1).pdf" download="">Download</a> */}

        <div className="mt-5">
        <div className="input-details mt-4 flex flex-1 md:flex-row flex-col justify-between gap-7">
              <div className="input-organisation w-full">
            <label htmlFor="Organisationname" className="block mb-2 text-sm font-medium text-gray-900 ">Organisation Name</label>
            <input type="text" aria-describedby="helper-text-explanation" className="bg-gray-100 border border-gray-300 text-gray-900 font-semibold text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-1 focus:outline-gray-900 block w-full p-1" name="organisation" value={employeecasesmodal.organisation} disabled/>
          
            </div>
          

            <div className="input-staff w-full">
            <label htmlFor="staffname" className="block mb-2 text-sm font-medium text-gray-900 ">CaseId:</label>
            <input type="text"  aria-describedby="helper-text-explanation" className="bg-gray-100 border border-gray-300 text-gray-900 font-semibold text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-1 focus:outline-gray-900 block w-full p-1"  name="employees" value={employeecasesmodal.caseid} disabled/>
          
            </div>

            </div>

            <div className="input-applicant mt-4 flex flex-1 md:flex-row flex-col justify-between gap-7">
              <div className="input-applicantname w-full">
            <label htmlFor="Organisationname" className="block mb-2 text-sm font-medium text-gray-900 ">Applicant's Name</label>
            <input type="text" id="appname" aria-describedby="helper-text-explanation" className="bg-gray-100 border border-gray-300 text-gray-900 font-semibold text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-1 focus:outline-gray-900 block w-full p-1"  value={employeecasesmodal.applicantname} name='applicantname' disabled/>
            </div>
            <div className="input-mobileno w-full">
            <label htmlFor="Organisationname" className="block mb-2 text-sm font-medium text-gray-900 ">Mobile Number</label>
            <input type="number" id="mobno" aria-describedby="helper-text-explanation" className="bg-gray-100 border border-gray-300 text-gray-900 font-semibold text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-1 focus:outline-gray-900 block w-full p-1"  value={employeecasesmodal.mobileno} name='mobileno' disabled/>
            </div>

            </div>

            <div className="input-verification mt-4 flex flex-1 md:flex-row flex-col justify-between gap-7">
              <div className="input-applicantname w-full">
            <label htmlFor="verification" className="block mb-2 text-sm font-medium text-gray-900 ">Verification Type</label>
            <input type="text" id="veritype" aria-describedby="helper-text-explanation" className="bg-gray-100 border border-gray-300 text-gray-900 font-semibold text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-1 focus:outline-gray-900 block w-full p-1"  value={employeecasesmodal.verificationtype} name='verificationType' disabled/>
            </div>
            
            </div>

            <div className="input-applicant mt-4 flex flex-1 md:flex-row flex-col justify-between gap-7">
              <div className="input-applicantname w-full">
            <label htmlFor="Organisationname" className="block mb-2 text-sm font-medium text-gray-900 ">Address</label>
            <textarea id="message" rows="4" className="block p-1.5 w-full bg-gray-100 border border-gray-300 text-gray-900 font-semibold text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 "  value={employeecasesmodal.address} name='address' disabled></textarea>
            </div>
            <div className="input-mobileno w-full">
            <label htmlFor="Organisationname" className="block mb-2 text-sm font-medium text-gray-900 ">Trigger</label>
            <textarea id="message" rows="4" className="block p-1.5 w-full bg-gray-100 border border-gray-300 text-gray-900 font-semibold text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 "  value={employeecasesmodal.triggered}  name='triggered' disabled></textarea>
            </div>

            </div>

          </div>  
          <div className="input-applicant mt-4 flex flex-1 md:flex-row flex-col justify-between md:items-center items-start">
              <div className="File-Name">
            <label htmlFor="Organisationname" className="block mb-2 text-sm font-medium text-gray-900 ">Files:</label>
        
            </div>

            <div className="files w-full flex flex-row gap-3 flex-wrap">
            {
            employeesfiles?.map((employeesfile,index)=>{
              return(
                <div className="files flex flex-row justify-start gap-5 md:px-3 py-3">
                
                  <div>
                    <button className='p-1 px-3 rounded-md bg-blue-700 hover:bg-blue-500 outline-none text-white text-md' onClick={() => handleDownload(employeesfile.filename)}>Download</button>
                  </div>
                </div>
              )
            })
           }
            </div>
        

            </div>  

            <div className="input-applicant mt-4 mb-5 flex flex-1 md:flex-row flex-col justify-between md:items-center items-start">
              <div className="File-Name">
            <label htmlFor="Organisationname" className="block mb-2 text-sm font-medium text-gray-900 ">Case Status:</label>
        
            </div>

            <div className="files w-full flex flex-row gap-3 flex-wrap">
            <select id="role" className="bg-white border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 p-1 text-sm focus:border-blue-500 focus:outline-1 focus:outline-gray-900 block  font-bold outline-none outline-2 outline-black"  value={ticketmodalstatus}  onChange={handleticketstatusModalChange}>
            <option value="Pending">Pending</option>
            <option value="Done">Done</option>
            </select>
            </div>
        

            </div>  
          
        </div>
        </div>
        <div className='text-center' >
        <button onClick={closeModalEmployees} className='m-2 p-1 text-sm px-3 py-2 space-x-8 space-y-11 bg-red-700 text-white hover:bg-red-500 rounded'>CLOSE</button>
        <button onClick={
          () => {
            if (ticketmodalstatus === employeecasesmodal.ticketstatus) {
              closeModalEmployees()
              toast.error('Update The Status Properly!!');
            } else {
              closeModalEmployees()
              handleModalSubmit(employeecasesmodal.caseuid);
            }
          }
        } className={` m-2 p-1 px-3 py-2 space-x-8 space-y-11 text-sm  text-white rounded bg-green-700 hover:bg-green-500`} >SUBMIT</button>
        </div>
      
        
      </dialog>
      
    )
            
  }


  export default CaseDetailsModal