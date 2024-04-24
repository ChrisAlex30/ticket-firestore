import React, { useEffect, useRef, useState } from 'react'
import AdminCasesTable from '../components/AdminCasesTable';
import { useNavigate } from 'react-router-dom';
import Loadingdialog from '../components/Loading';
import Navbar from '../components/Navbar';
import AdminCases from '../components/AdminCases';
import toast from 'react-hot-toast';
import Navbarstaff from '../components/Navbarstaff';
import baseUrl from '../build.js'; 



const Cases = () => {
    const navigate = useNavigate();
  
    const [dateStart,setDateStart]= useState(new Date().toISOString().split('T')[0])
    const [dateEnd,setDateEnd]= useState(new Date().toISOString().split('T')[0])
    const [employeecases,setEmployeecases]=useState([])
    const [filteredcases,setfilteredcases]=useState([])
    const [load, setload] = useState(false);
    const [ticketstatus,setticketstatus]= useState('Not Selected')
    const[admin,setAdmin] =useState(false)

    
    useEffect(()=>{
      const token = JSON.parse(localStorage.getItem('token'));
      if (!token) {
          navigate('/')
          alert('plz login')            
       }
  },[])

  useEffect(()=>{
    const admn = JSON.parse(localStorage.getItem('isSuperAdmin'));
    if(admn)
    setAdmin(true)
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
        const response=await fetch(`${baseUrl}/api/emp/AdmincasesByDate`,{
          method:"POST",
          headers:{
            "Content-Type": "application/json",
            "authorization":token
          },
          body:JSON.stringify({dateStart,dateEnd})
        })
  
        const data=await response.json()
        setload(false)
        if(!response.ok)
        return toast.error('Error Getting cases')
        
      
       setEmployeecases(data.msg)
       setfilteredcases(data.msg)
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
      setEmployeecases([])
     
    }
    const handleticketstatusChange=(e)=>{
        setticketstatus(e.target.value)

        
    if (e.target.value === "All") {
        setfilteredcases(employeecases);
    } else if (e.target.value === "Not Selected") {
        // If "Not Selected" is selected, clear the filtered cases
        setfilteredcases(filteredcases);
    } else {
        // Otherwise, filter based on the selected status
        setfilteredcases(employeecases.filter((employeecase) => employeecase.ticketstatus === e.target.value));
    }
      }
    
    
  
    return (
      <>
      
      {admin?<Navbar/>:<Navbarstaff/>}
       <Loadingdialog  isloading={load}/>
       
     <div className='background rounded-md bg-slate-50 m-2'>
    
      <div className="Input-section flex flex-col gap-7 space-x-4 p-2 px-5 pt-3 md:flex-row md:items-start items-end ">
          <div className="fromdate-section flex  flex-col w-full px-1">
          <h2 className='text-xl text-black text-center font-bold underline underline-offset-2'>TICKET DETAILS</h2>
          <AdminCases dateStart={dateStart} dateEnd={dateEnd} handleDateStartChange={handleDateStartChange} handleDateEndChange={handleDateEndChange} getData={getData} reset={reset}/>
          </div>
  
          <div className="table-section  w-full  px-3">
            <div className="tablediv flex flex-row gap-5">
          <h2 className='text-xl text-black text-center font-bold underline underline-offset-2'>DISPLAY</h2>
          <select id="role" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-1 focus:outline-gray-900 block font-bold outline-none outline-2 outline-black" value={ticketstatus} onChange={handleticketstatusChange}>

            <option value="Not Selected">--Select Option--</option>
            <option value="Pending">Pending</option>
            <option value="Done">Done</option>
            <option value="All">All</option>

            </select>
          </div>

          <AdminCasesTable employeecases={filteredcases} />
          </div>
      </div>
     </div>
    
      </>
    )
  }

export default Cases