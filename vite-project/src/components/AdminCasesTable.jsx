import React from 'react'

const AdminCasesTable = ({employeecases}) => {

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
   
         <div className="relative ">
           <table className="w-full text-sm text-center rtl:text-right text-gray-500">
             {employeecases.length===0?<thead><tr><th className='text-lg'>No Cases !!!</th></tr></thead>:
             <>
             <thead className="text-xs text-gray-700 uppercase bg-gray-50 truncate">
               <tr>
               <th scope="col" className="md:px-3.5 md:py-3 truncate">
                   S.No
                 </th>
                 <th scope="col" className="md:px-3.5 md:py-3 truncate">
                   Org. Name
                 </th>
                 <th scope="col" className="md:px-3.5 md:py-3 truncate">
                 Appli. Name
                 </th>
                 <th scope="col" className="md:px-3.5 md:py-3 truncate">
                   Mob
                 </th>
                 <th scope="col" className="md:px-3.5 md:py-3 truncate">
                 IssuedTo
                 </th>

                 <th scope="col" className="md:px-3.5 md:py-3 truncate">
                 IssuedBy
                 </th>

                 <th scope="col" className="md:px-3.5 md:py-3 truncate">
                 Status
                 </th>
                 <th scope="col" className="md:px-3.5 md:py-3 truncate">
                 Date
                 </th>
   
               </tr>
             </thead>
             <tbody>
               {employeecases.map((employeecase,index)=>{
   
                 return (
                   <tr className="bg-white border-b truncate" key={index+1}>
                     <th scope="row" className="md:px-3.5 md:py-3 font-medium text-gray-900 whitespace-nowrap">
                     {index+1}
                   </th>
                   <th scope="row" className="md:px-3.5 md:py-3 font-medium text-gray-900 whitespace-nowrap">
                     {employeecase.organisation}
                   </th>
                   <td className="md:px-3.5 md:py-3 truncate whitespace-nowrap font-medium overflow-hidden overflow-ellipsis text-gray-900 ">
                   {employeecase.applicantname}
                   </td>
                   <td className="md:px-3.5 md:py-3 truncate whitespace-nowrap font-medium overflow-hidden overflow-ellipsis text-gray-900 ">
                    {employeecase.mobileno}
                   </td>
                   <td className="md:px-3.5 md:py-3 truncate whitespace-nowrap font-medium overflow-hidden overflow-ellipsis text-gray-900 ">
                   {employeecase.employees}
                   </td>

                   <td className="md:px-3.5 md:py-3 truncate whitespace-nowrap font-medium overflow-hidden overflow-ellipsis text-gray-900 ">
                   {employeecase.issued}
                   </td>
                   <td className="md:px-3.5 md:py-3 truncate whitespace-nowrap font-medium overflow-hidden overflow-ellipsis text-gray-900 ">
                   {employeecase.ticketstatus}
                   </td>
   
                   <td className="md:px-3.5 md:py-3 truncate whitespace-nowrap font-medium overflow-hidden overflow-ellipsis text-gray-900 ">
                   {formatedate(employeecase.createdAt)}
                   </td>

                  
                 </tr>
                 )
               })}
           
             </tbody>
             
             </>}
             
           </table>
         </div>
   
       </div>
     );
   };

export default AdminCasesTable