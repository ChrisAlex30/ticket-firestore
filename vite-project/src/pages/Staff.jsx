import React, { useEffect, useState } from 'react'
import {useNavigate} from "react-router-dom"
import toast from 'react-hot-toast';
import StaffForm from '../components/StaffForm'
import StaffTable from '../components/StaffTable'
import { useRef } from 'react';
import CaseDetailsModal from '../components/CaseDetailsModal';
import Navbarstaff from '../components/Navbarstaff';
import Loadingdialog from '../components/Loading';
import baseUrl from '../build.js'; 




const Staff = () => {
  const navigate = useNavigate();

  const [dateStart,setDateStart]= useState(new Date().toISOString().split('T')[0])
  const [dateEnd,setDateEnd]= useState(new Date().toISOString().split('T')[0])
  const [employeecases,setEmployeecases]=useState([])
  const [employeecasesmodal,setemployeecasesmodal]=useState({})
  const [employeesfiles,setemployeesfiles]=useState([])
  const [load, setload] = useState(false);
  const [ticketstatus, setTicketstatus] = useState({});
  // const [isSubmitDisabled,setisSubmitDisabled]=useState(true)
  const [ticketmodalstatus, setticketmodalstatus] = useState("Pending");

  const employeeRef=useRef()

  useEffect(()=>{
    const token = JSON.parse(localStorage.getItem('token'));
    if (!token) {
        navigate('/')
        toast.error('plz login')            
     }
},[])

useEffect(()=>{
 
  getData()
},[])

const handleDateStartChange=(e)=>{
  setDateStart(e.target.value)
}
const handleDateEndChange=(e)=>{
setDateEnd(e.target.value)
}

  const getData=async()=>{
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
      if(dateStart!==""  && dateEnd!==''){
      setload(true)
      const response=await fetch(`${baseUrl}/api/emp/casesByDate`,{
        method:"POST",
        headers:{
          "Content-Type": "application/json",
          "authorization":token
        },
        body:JSON.stringify({dateStart,dateEnd})
      })

      const data=await response.json()
      console.log(data.msg);

      setload(false)
      if(!response.ok)
      return toast.error('Error Getting cases')
      
      
     setEmployeecases(data.msg)
     const ticketStatusObject = data.msg.reduce((acc, curr) => {
      acc[curr.caseuid] = curr.ticketstatus;
      return acc;
    }, {});
    setTicketstatus(ticketStatusObject);

    }
    else
    toast.error('plz fill all the fields !!!')
    }
    else{
      toast.error('Plz Login!!')
      navigate('/')
    }
  }

  const reset=(e)=>{
    setDateStart(new Date().toISOString().split('T')[0])
    setDateEnd(new Date().toISOString().split('T')[0])   
    // setEmployeecases([])
    setemployeecasesmodal([])
    setticketmodalstatus("Pending")
  }
  const handleModalEmployees=async(cases)=>{
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
      setload(true)
      const response=await fetch(`${baseUrl}/api/emp/getFileData`,{
        method:"POST",
        headers:{
          "Content-Type": "application/json",
          "authorization":token
        },
        body:JSON.stringify({ticketid:cases.caseuid})
      })

      const data=await response.json()
      setload(false)
      if(!response.ok)
      return toast.error('Error Getting Files')
      
      console.log(cases);
      setemployeesfiles(data.msg)
      setemployeecasesmodal(cases)
    employeeRef.current.showModal()
    }

    else{
      toast.error('Plz Login!!')
      navigate('/')
    }
    

  }

  const closeModalEmployees=()=>{
    employeeRef.current.close()
    setemployeecasesmodal({})
    setemployeesfiles([])
    setticketmodalstatus("Pending")
  }

  const handleticketstatusChange=async(uid,e)=>{
     const updatedStatus = e.target.value;
  setTicketstatus((prevStatus) => ({
    ...prevStatus,
    [uid]: updatedStatus, // Update ticket status for the corresponding caseuid
  }));
    
    
    if((e.target.value)!==ticketstatus)
    {
     handleModalSubmit(uid)
      }
    }
  


  const handleticketstatusModalChange=(e)=>{
    setticketmodalstatus(e.target.value)
  }
  
 const handleModalSubmit=async(uid)=>{
  const token = JSON.parse(localStorage.getItem('token'));
  if(window.confirm('Are You Sure!!')){
    setload(true)
    const response = await fetch(`${baseUrl}/api/emp/UpdateTicketStatus/${uid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "authorization":token
      }
      });

      const data=await response.json()
      console.log(data);
      setload(false)

      if(!response.ok)
      return toast.error(data.msg)

      toast.success(data.msg)
      reset()
      getData()
 }
  }

  return (
    <>
    
     <Navbarstaff/>
     <Loadingdialog  isloading={load}/>
     <CaseDetailsModal employeeRef={employeeRef} employeecasesmodal={employeecasesmodal} closeModalEmployees={closeModalEmployees} employeesfiles={employeesfiles} ticketmodalstatus={ticketmodalstatus} handleticketstatusModalChange={handleticketstatusModalChange} handleModalSubmit={handleModalSubmit}/>
   <div className='background rounded-md bg-slate-50 m-2'>
  
    <div className="Input-section flex flex-col gap-7 space-x-4 p-2 px-5 pt-3 md:flex-row md:items-start items-end ">
        <div className="fromdate-section flex  flex-col w-full px-1">
        <h2 className='text-xl text-black text-center font-bold underline underline-offset-2'>TICKET DETAILS</h2>
        <StaffForm dateStart={dateStart} dateEnd={dateEnd} handleDateStartChange={handleDateStartChange} handleDateEndChange={handleDateEndChange} getData={getData} reset={reset}/>
        </div>

        <div className="table-section  w-full  md:px-3">
        <h2 className='text-xl text-black text-center font-bold underline underline-offset-2'>DISPLAY</h2>
        <StaffTable employeecases={employeecases} handleModalEmployees={handleModalEmployees} ticketstatus={ticketstatus} handleticketstatusChange={handleticketstatusChange}/>
        </div>
    </div>
   </div>
  
    </>
  )
}

export default Staff