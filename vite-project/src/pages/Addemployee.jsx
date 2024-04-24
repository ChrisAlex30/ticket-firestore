import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import {useNavigate} from "react-router-dom"
import toast from 'react-hot-toast';
import EmployeeForm from '../components/EmployeeForm'
import EmployeeTable from '../components/EmployeeTable'
import Loadingdialog from '../components/Loading';
import Navbarstaff from '../components/Navbarstaff';
import baseUrl from '../build'; 



const Addemployee = () => {

  const navigate=useNavigate();

  const[admin,setAdmin] =useState(false)
  const [load, setload] = useState(false);
  const [employeedetails,setEmployeeDetails]=useState({
    empid:'',
    empname:'',
    emppassword:'',
})

const [emprole,setEmployeerole]= useState('Not Selected')
  const [employees,setemployees]=useState([])

  useEffect(()=>{
    const token=JSON.parse(localStorage.getItem('token'))
    if(!token)
    {
      navigate('/')
      toast.error('Plz Login')
    }
  })
    
  useEffect(()=>{
    const admn = JSON.parse(localStorage.getItem('isSuperAdmin'));
    if(admn)
    setAdmin(true)
  },[]) 

  const getdata=async()=>{
    const token=JSON.parse(localStorage.getItem('token'))

    if(token){
      setload(true)
      const response=await fetch(`${baseUrl}/api/emp/getEmployees`,{
        method:"GET",
        headers:{
          "Content-Type": "application/json",
          "authorization":token
        },
      });
      
        const data=await response.json()
        console.log(data);
        setload(false)

        if(data.msg.length>0)
        setemployees(data.msg)
    }
    else{
      toast.error('Plz Login!!')
      navigate('/')
    }
  }

  useEffect(()=>{
    getdata()
  },[])


  const handleChange=(e)=>{
    setEmployeeDetails({...employeedetails,[e.target.name]:e.target.value})
 }

  const handleAddUpdate=async()=>{
    const token=JSON.parse(localStorage.getItem('token'))

    if(token){
      
      const {empid,empname,emppassword}=employeedetails

      if(empname==='' || emppassword==='' || emprole==='Not Selected')
      {
        toast.error('Plz Fill all Fields!!!')
        return
      }
      if(empid===''){
        setload(true)
        const uniqueId=Date.now()

        // const uniqueId = Date.now() + Math.floor(Math.random() * 1000);
        const response= await fetch(`${baseUrl}/api/emp/addEmployees`,{
          method:"POST",
          headers: {
            "Content-Type": "application/json",
            "authorization":token
          },
          body:JSON.stringify({uniqueId,empname,emppassword,emprole})
        });

        const data=await response.json()
        setload(false)
        if(!response.ok)
        return toast.error(data.msg)

        toast.success(data.msg)
        getdata()
        reset()

      }
      else{
        setload(true)

        const response=await fetch(`${baseUrl}/api/emp/updateEmployees/${empid}`,{
          method:"PUT",
          headers: {
            "Content-Type": "application/json",
            "authorization":token
          },
          body:JSON.stringify({empname,emppassword,emprole})
        });

        const data=await response.json()
        setload(false)

       
        if(!response.ok)
        toast.error(data.msg)
        toast.success(data.msg)
        getdata()
        reset()
      }

    }
    else{
      toast.error('Plz Login')
      navigate("/")
    }
  }

  const handleDelete=async(code)=>{
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
      if(window.confirm('Are You Sure!!')){
        setload(true)

        const response = await fetch(`${baseUrl}/api/emp/deleteEmployees/${code}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "authorization":token
          }
          });
          const data= await response.json()
          setload(false)
          if(!response.ok)
          return toast.error(data.msg)
          toast.success(data.msg)
          getdata()
          reset()
      }
    }
    else{
      toast.error('Plz Login')
      navigate("/")
    }
  }
  const reset=()=>{
   setEmployeeDetails({
     empid:'',
    empname:'',
    emppassword:'',
   })
   setEmployeerole('Not Selected')
  }
  const handleedit=(employee)=>{
    
    const {empid,empname,emppassword}=employee
    setEmployeeDetails({
      empid,empname,emppassword
    })
   setEmployeerole(employee.emprole)
   }

  const handleemproleChange=(e)=>{
    setEmployeerole(e.target.value)
  }
  return (
    <>
    <Loadingdialog  isloading={load}/>
    {admin?<Navbar/>:<Navbarstaff/>}

   <div className='background rounded-md bg-slate-50 m-2'>
  
    <div className="dasboard-section flex flex-col gap-7 space-x-4 p-2 px-5 pt-3 md:flex-row md:items-start items-end ">
        <div className="ticket-section flex  flex-col w-full px-1">
        <h2 className='text-xl text-black text-center font-bold underline underline-offset-2'>ADD EMPLOYEE</h2>
        <EmployeeForm handleChange={handleChange}  handleAddUpdate={handleAddUpdate} reset={reset} employeedetails={employeedetails} handleemproleChange={handleemproleChange} emprole={emprole} />
        </div>

        <div className="table-section  w-full  px-3">
        <h2 className='text-xl text-black text-center font-bold underline underline-offset-2'>DISPLAY</h2>
        <EmployeeTable  employees={employees} handleDelete={handleDelete} handleedit={handleedit}/>
        </div>
    </div>
   </div>
  
    </>
  )
}

export default Addemployee