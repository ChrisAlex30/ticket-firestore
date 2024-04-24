import React from 'react';

const StaffTable = ({employeecases,handleModalEmployees,ticketstatus,handleticketstatusChange}) => {

  function formatedate(date){
    const createdAtTimestamp = new Date(date);
  
  
  const day = createdAtTimestamp.getDate();
  const month = createdAtTimestamp.getMonth() + 1; 
  const year = createdAtTimestamp.getFullYear();
  
  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
   }

  return (
    <div className="tablediv border-black border md:h-[33em] h-[27em] w-full my-5 rounded overflow-scroll">

      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-center rtl:text-right text-gray-500">
        {employeecases.length===0? <thead><tr><th className='text-lg'>No Cases !!!</th></tr></thead>:
        <>
         <thead className="px-4 text-xs text-gray-700 uppercase bg-gray-50 truncate">
          
          <tr >
            <th scope="col" className="md:px-3.5 md:py-3 px-3 truncate">
              S. No.
            </th>
            <th scope="col" className="md:px-3.5 md:py-3 px-3 truncate">
             Org. Name
            </th>
            <th scope="col" className="md:px-3.5 md:py-3 px-3 truncate">
              Appli. Name
            </th>
            <th scope="col" className="md:px-3.5 md:py-3 px-3 truncate">
              Mob
            </th>
            <th scope="col" className="md:px-3.5 md:py-3 px-3 truncate">
              Date
            </th>
            <th scope="col" className="md:px-3.5 md:py-3 px-3 truncate">
            Status
            </th>
            <th scope="col" className="md:px-3.5 md:py-3 px-3 truncate">
            Action
            </th>
          </tr>
        </thead>
        <tbody>
          {employeecases.map((employeecase,index)=>{
            return(
              <tr className="bg-white border-b truncate" key={index+1} >
              <td scope="row" className="md:px-3.5 px-3 md:py-3 text-md font-medium text-gray-900 whitespace-nowrap">
              {index+1}
            </td>
            <td className="md:px-3.5 md:py-3 px-3 truncate whitespace-nowrap font-medium overflow-hidden overflow-ellipsis text-md text-gray-900 ">
            {employeecase.organisation}
            </td>
            <td className="md:px-3.5 md:py-3 px-3 truncate whitespace-nowrap font-medium overflow-hidden overflow-ellipsis text-md text-gray-900 ">
            {employeecase.applicantname}
            </td>
            <td className="md:px-3.5 md:py-3 px-3 truncate whitespace-nowrap font-medium overflow-hidden overflow-ellipsis text-md text-gray-900 ">
            {employeecase.mobileno}
            </td>

            <td className="md:px-3.5 md:py-3 px-3 truncate whitespace-nowrap font-medium overflow-hidden overflow-ellipsis text-md text-gray-900 ">
            {formatedate(employeecase.createdAt)}
            </td> 

            <td className="md:px-3.5 md:py-3 px-3 truncate whitespace-nowrap font-medium overflow-hidden overflow-ellipsis text-md text-gray-900 ">
           {employeecase.ticketstatus}
            </td> 
            <td className="md:px-3.5 md:py-3 px-3 truncate whitespace-nowrap font-medium overflow-hidden overflow-ellipsis text-gray-900 ">
            <button className='rounded bg-blue-700 mx-2 px-2 py-1 text-[16px] text-white p-1.5 space-x-9 space-y-11 hover:bg-blue-500 shadow-md' onClick={()=>handleModalEmployees(employeecase)}>View</button>
            </td>

              </tr>
            )
        
          })}
        </tbody>
        </>
        }
       
          
        </table>
      </div>

    </div>
  );
};

export default StaffTable;
