import React, { useEffect, useState } from 'react'
import OrganisationForm from '../components/OrganisationForm'
import Navbar from '../components/Navbar'
import OrganisationTable from '../components/OrganisationTable'
import {useNavigate} from "react-router-dom"
import toast from 'react-hot-toast';
import Loadingdialog from '../components/Loading'
import Navbarstaff from '../components/Navbarstaff'
import baseUrl from '../build'; 




const Addorganisation = () => {

  const navigate=useNavigate();

 
  const [organcode,setorgancode]=useState('')
  const [organisationname,setorganisationname]=useState('')
  const [load, setload] = useState(false);
  const [organnames,setOrganName]=useState([])
  const[admin,setAdmin] =useState(false)
 
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
      const response=await fetch(`${baseUrl}/api/emp/getOrganisations`,{
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
        setOrganName(data.msg)
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
    setorganisationname(e.target.value)
 }

  const handleAddUpdate=async()=>{
    const token=JSON.parse(localStorage.getItem('token'))

    if(token){
      
      if(organisationname==='')
      {
        toast.error('Plz Fill all Fields!!!')
        return
      }
      if(organcode===''){
        setload(true)

        const response= await fetch(`${baseUrl}/api/emp/addOrganisation`,{
          method:"POST",
          headers: {
            "Content-Type": "application/json",
            "authorization":token
          },
          body:JSON.stringify({organisationname})
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

        const response=await fetch(`${baseUrl}/api/emp/updateOrganisation/${organcode}`,{
          method:"PUT",
          headers: {
            "Content-Type": "application/json",
            "authorization":token
          },
          body:JSON.stringify({organisationname})
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

        const response = await fetch(`/api/emp/deleteOrganisation/${code}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "authorization":token
          }
          });
          const data= await response.json()
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
  const reset=()=>{
    setorganisationname('')
    setorgancode('')
  }
  const handleedit=(organname)=>{
    
    setorganisationname(organname.organisationname)
    setorgancode(organname.organcode)
   }
  return (
    <>
    <Loadingdialog  isloading={load}/>
    {admin?<Navbar/>:<Navbarstaff/>}
   <div className='background rounded-md bg-slate-50 m-2'>
  
    <div className="dasboard-section flex flex-col gap-7 space-x-4 p-2 px-5 pt-3 md:flex-row md:items-start items-end ">
        <div className="ticket-section flex  flex-col w-full px-1">
        <h2 className='text-xl text-black text-center font-bold underline underline-offset-2'>ADD ORGANISATION</h2>
        <OrganisationForm handleChange={handleChange} organisationname={organisationname} handleAddUpdate={handleAddUpdate} reset={reset} organcode={organcode} />
        </div>

        <div className="table-section  w-full  px-3">
        <h2 className='text-xl text-black text-center font-bold underline underline-offset-2'>DISPLAY</h2>
        <OrganisationTable handleAddUpdate={handleAddUpdate} organnames={organnames} handleDelete={handleDelete} handleedit={handleedit}/>
        </div>
    </div>
   </div>
  
    </>
  )
}

export default Addorganisation