import React, { useEffect, useState } from 'react'
import Form from '../components/Form'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import Loadingdialog from '../components/Loading';
import baseUrl from '../build';

const Login = () => {

  const [load, setload] = useState(false);


  useEffect(()=>{
    const token=JSON.parse(localStorage.getItem('token'))
    if(token){
      localStorage.removeItem('token')
    }
  },[])

  const navigate=useNavigate()
  const [user,setuser]=useState({
    name:'',
    password:''
  })
  const handleedit=(e)=>{
    setuser({...user,[e.target.name]:e.target.value})
  }

  const login=async(e)=>{
    if(!user.name || !user.password)
    {
      toast.error('Plz Fill all Field Properly')
      return;
    }
   
    setload(true)
    console.log(baseUrl);
    const response=await fetch(`${baseUrl}/api/emp/emplogin`,{
      method:"POST",
      headers: {
        "Content-Type": "application/json",   
      },
      body:JSON.stringify(user)
    })
    
    const data=await response.json()
    console.log(data);
    if(response.ok)
    {
      setload(false) 
      if(data.token)
      localStorage.setItem('token',JSON.stringify(data.token))
      console.log(data.role);
      if(data.role==="staff")
      {
        navigate("/staff")
      }
      else{
        if(data.role==="superadmin")
        localStorage.setItem('isSuperAdmin',JSON.stringify(data.role))
        
        navigate('/dashboard')
      }
    }
    else{
      setload(false) 
      toast.error(data.msg)
    }
  }

  return (
    <>    
     <Loadingdialog  isloading={load}/>
    <div className='bg-slate-50 h-screen flex items-center justify-center'>
  
      <div className="bg-blue-200 rounded 
      shadow-lg w-96 bg-opacity-30">
        <Form handleedit={handleedit} user={user} login={login}/>
      </div>
  </div>
  </>

  )
}

export default Login