import React from 'react';

const EmployeeTable = ({employees,handleDelete,handleedit}) => {
  return (
    <div className="tablediv border-black border md:h-[33em] h-[27em] w-full my-5 rounded overflow-scroll">

      <div className="relative overflow-x-auto">
        <table className=" w-full text-sm text-center rtl:text-right text-gray-500">
          {employees.length===0? <thead><tr><th className='text-2xl'>ADD EMPLOYEES !!!</th></tr></thead>:
          <>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 truncate">
           
           <tr>
             <th scope="col" className="md:px-6 md:py-3 truncate">
              Employee ID
             </th>
             <th scope="col" className="md:px-6 md:py-3 truncate">
              Employee Name
             </th>
             <th scope="col" className="md:px-6 md:py-3 truncate">
               Employee Password
             </th>
             <th scope="col" className="md:px-6 md:py-3 truncate">
               Employee Role
             </th>
             <th scope="col" className="md:px-6 md:py-3 truncate">
              Action
             </th>
           </tr>
         </thead>
         <tbody>
         {employees.map((employee,index)=>{
           return(
             <tr className="bg-white border-b truncate" key={index+1}>
               <td scope="row" className="md:px-6 md:py-3 text-sm font-medium text-gray-900 whitespace-nowrap">
               {employee.empid}
             </td>
             <td className="md:px-6 md:py-3 truncate whitespace-nowrap font-medium overflow-hidden overflow-ellipsis text-sm text-gray-900 ">
             {employee.empname}
             </td>
             <td className="md:px-6 md:py-3 truncate whitespace-nowrap font-medium overflow-hidden overflow-ellipsis text-sm text-gray-900 ">
             {employee.emppassword}
             </td>

             <td className="md:px-6 md:py-3 truncate whitespace-nowrap font-medium overflow-hidden overflow-ellipsis text-sm text-gray-900 ">
             {employee.emprole}
             </td>
             <td className="md:px-6 md:py-3 truncate whitespace-nowrap font-medium overflow-hidden overflow-ellipsis text-gray-900 ">
              {
                employee.emprole!=="superadmin" &&
             <button className='rounded bg-green-700 mx-2 text-sm text-white p-1 px-3 space-x-9 space-y-11 hover:bg-green-500 shadow-md' onClick={()=>handleedit(employee)}>Edit</button>
              }
             {/* <button className='rounded bg-red-700 text-[16px] text-white p-1.5 space-x-1 space-y-2 hover:bg-red-500 shadow-md' onClick={()=>handleDelete(employee.empid)}>Delete</button> */}
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

export default EmployeeTable;
