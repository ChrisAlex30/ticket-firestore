import React from 'react';

const Table = ({ticketitems,handleDelete,role}) => {

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

      <div className="relative">
        <table className="w-full text-sm text-center rtl:text-right text-gray-500">
          {ticketitems.length===0?<thead><tr><th className='text-lg'>Add Cases !!!</th></tr></thead>:
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

              {
                role==="superadmin" &&
              <th scope="col" className="md:px-3.5 md:py-3 truncate">
              IssuedBy
              </th>
            } 
              <th scope="col" className="md:px-3.5 md:py-3 truncate">
              Date
              </th>

              <th scope="col" className="md:px-3.5 md:py-3 truncate">
              Status
              </th>
              <th scope="col" className="md:px-3.5 md:py-3 truncate">
              Action
              </th>
            </tr>
          </thead>
          <tbody>
            {ticketitems.map((ticketitem,index)=>{

              return (
                <tr className="bg-white border-b truncate" key={index+1}>
                  <th scope="row" className="md:px-3.5 md:py-3 font-medium text-gray-900 whitespace-nowrap">
                  {index+1}
                </th>
                <th scope="row" className="md:px-3.5 md:py-3 font-medium text-gray-900 whitespace-nowrap">
                  {ticketitem.organisation}
                </th>
                <td className="md:px-3.5 md:py-3 truncate whitespace-nowrap font-medium overflow-hidden overflow-ellipsis text-gray-900 ">
                {ticketitem.applicantname}
                </td>
                <td className="md:px-3.5 md:py-3 truncate whitespace-nowrap font-medium overflow-hidden overflow-ellipsis text-gray-900 ">
                 {ticketitem.mobileno}
                </td>
                <td className="md:px-3.5 md:py-3 truncate whitespace-nowrap font-medium overflow-hidden overflow-ellipsis text-gray-900 ">
                {ticketitem.employees}
                </td>

                {
                role==="superadmin" &&
                <td className="md:px-3.5 md:py-3 truncate whitespace-nowrap font-medium overflow-hidden overflow-ellipsis text-gray-900 ">
                {ticketitem.issued}
                </td>
            }
            

                <td className="md:px-3.5 md:py-3 truncate whitespace-nowrap font-medium overflow-hidden overflow-ellipsis text-gray-900 ">
                {formatedate(ticketitem.createdAt)}
                </td>

                <td className="md:px-3.5 md:py-3 truncate whitespace-nowrap font-medium overflow-hidden overflow-ellipsis text-gray-900 ">
                {ticketitem.ticketstatus}
                </td>

              
                <td className="md:px-3.5 md:py-3 truncate whitespace-nowrap font-medium overflow-hidden overflow-ellipsis text-gray-900 ">
             <button className='rounded-lg bg-red-700 text-sm text-white p-1 px-2 hover:bg-red-500 shadow-md' onClick={()=>handleDelete(ticketitem.caseuid)}>Delete</button>
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

export default Table;
