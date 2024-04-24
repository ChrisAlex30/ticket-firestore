import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import Dasboard_form from '../components/Dasboard_form'
import Table from '../components/Table'
import {useNavigate} from "react-router-dom"
import toast from 'react-hot-toast';
import Loadingdialog from '../components/Loading'
import Navbarstaff from '../components/Navbarstaff'
import baseUrl from '../build.js'; 



const Dashboard = () => {
  const navigate=useNavigate();
  const [organisationnames,setorganisationnames]=useState([])
  const [employeesnames,setemployeesnames]=useState([])
  const [load, setload] = useState(true);
  const [selectedFiles,setSelectedFiles]=useState([])
  const fileInputRef = useRef(null);
  const [role,setrole]=useState('')
  const[admin,setAdmin] =useState(false)


  const [inputticket,setInputTicket]=useState({
    organisation:'',
    employees:'',
    caseId:'',
    applicantname:'',
    mobileno:'',
    verificationType:'',
    address:'',
    triggered:'',
  })

  const [ticketitems,setticketitems]=useState([])

  useEffect(()=>{
    const admn = JSON.parse(localStorage.getItem('isSuperAdmin'));
    if(admn)
    setAdmin(true)
  },[]) 

  useEffect(()=>{
    
    const token=JSON.parse(localStorage.getItem('token'))
    if(!token)
    {
      navigate('/')
      toast.error('Plz Login')
    }
  },[])

  const getData=async()=>{
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
    
      setload(true)
      const response=await fetch(`${baseUrl}/api/emp/Dashboardcases`,{
        method:"GET",
        headers:{
          "Content-Type": "application/json",
          "authorization":token
        },
      })

      const data=await response.json()
      setload(false)
      if(!response.ok)
      return toast.error('Error Getting cases')
      
      console.log(data.msg);
      setrole(data.role)
      setticketitems(data.msg)
    }
    else{
      toast.error('Plz Login!!')
      navigate('/')
    }
  }

  const getOrganisations=async()=>{
    const token=JSON.parse(localStorage.getItem('token'))

    if(token)
    {
      setload(true)
      const response=await fetch(`${baseUrl}/api/emp/getOrganisations`,{
        method:"GET",
        headers:{
          "Content-Type": "application/json",
          "authorization":token
        },
      });
      const data=await response.json()
      console.log(data.msg);
      setload(false)

      if(!response.ok)
      return toast.error('Error Fetching Organisations')
      
      if(data.msg.length>0)
      setorganisationnames(data.msg)
    }
    else{
      toast.error('Plz Login!!')
      navigate('/')
    }
  }
  const getemployees=async()=>{
    const token=JSON.parse(localStorage.getItem('token'))

    if(token)
    {
      setload(true)
      const response=await fetch(`${baseUrl}/api/emp/getStaffEmployees`,{
        method:"GET",
        headers:{
          "Content-Type": "application/json",
          "authorization":token
        },
      });
      const data=await response.json()
      setload(false)

      if(!response.ok)
      return toast.error('Error Fetching Employees')
      
      if(data.msg.length>0)
      setemployeesnames(data.msg)
      
    }
    else{
      toast.error('Plz Login!!')
      navigate('/')
    }
  }

  useEffect(()=>
  {
    getOrganisations()
    getemployees()
    getData()
  },[])

  const handlechange=(e)=>{
    setInputTicket({...inputticket,[e.target.name]:e.target.value})
  }

  const handleFilechange=(e)=>{
    const files=Array.from(e.target.files)

    const modifiedfiles=files.map((file)=>{
      const uniqueId = Date.now();
      const filenameparts = file.name.split('.');
      const filename = `${filenameparts[0]}_${uniqueId}.${filenameparts[1]}`; // Append the unique ID to the file name
      // const fileextension = filenameparts[1];

      return new File([file], filename, { type: file.type });
    })
    console.log(modifiedfiles);
    setSelectedFiles(modifiedfiles)
  }

  const handleDelete=async(id)=>{
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
      if(window.confirm('Are You Sure!!')){
        setload(true)
        const response = await fetch(`${baseUrl}/api/emp/deletecase/${id}`, {
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
          getData()
      }
    }
    else{
      toast.error('Plz Login')
      navigate("/")
    }
  }

  const handlechangesubmit=async()=>{
       const token = JSON.parse(localStorage.getItem('token'));
    if(token)
    {
      const {organisation,caseId,applicantname,mobileno,verificationType,address,triggered,employees}=inputticket
      const formData=new FormData();
      if(organisation===''|| applicantname===''|| verificationType==='' || employees==='')
      return toast.error('Plz fill all fields!!')

      console.log('organisationnames',organisation);
            let chckorganisation=organisationnames.find((organisationnm)=>organisationnm.organisationname===(organisation))
           
            const checkemployees=employeesnames.find((employeesnm)=>employeesnm.empname===(employees))
          
              if(chckorganisation)
      {
      if(checkemployees)
      {

        
        formData.append('organid', chckorganisation.organcode);
        formData.append('caseId', caseId);
        formData.append('applicantName', applicantname);
        formData.append('mobileNo', mobileno);
        formData.append('verificationType', verificationType);
        formData.append('address', address);
        formData.append('triggered', triggered);
        formData.append('empid', checkemployees.empid);
        if(selectedFiles.length!==0)
        {
              selectedFiles.forEach((file)=>{
        formData.append('files',file)
      })
        }
       
        setload(true)
              const response= await fetch(`${baseUrl}/api/emp/addTicket`,{
          method:"POST",
          headers:{
            "authorization":token
          },
          body:formData
        })

        const data = await response.json();
        setload(false)
        if (!response.ok) {
          return toast.error(data.msg);
        }
        
      if (Object.keys(data).length > 0 && data.msg === 'Case Registered') {
        toast.success(data.msg);
                //  setticketitems([...ticketitems,inputticket])
                getData()
            resetinputtickets()
      }
      else{
        toast.error(data.msg)
      }
      }
         else
        toast.error('Employees Not Found!!!')
    }
    
    else
      toast.error('Organisation Not Found!!!')
  }
    
       else{
      toast.error('Plz Login!!')
      navigate('/')
    }
  }

  // const handlechangesubmit=async()=>{
  //   const token = JSON.parse(localStorage.getItem('token'));
  //   if(token)
  //   {
  //     const {organisationName,caseId,applicantName,mobileNo,verificationType,address,triggered,employeesname}=inputticket
  //     const formData=new FormData();
  //     // console.log(selectedFiles);
  //     selectedFiles.forEach((file)=>{
  //       formData.append('files',file)
  //     })


  //     // console.log([...formData.entries()]);

  //     if(organisationName===''|| applicantName===''|| verificationType==='' || employeesname==='')
  //     return toast.error('Plz fill all fields!!')
  

  //     // console.log('organisationnames',organisationnames[0].organcode);
  //     // console.log('organisationName',organisationName);
  //     let chckorganisation=organisationnames.find((organisationnm)=>organisationnm.organcode.toString()===organisationName)
      
     
  //     const checkemployees=employeesnames.find((employeesnm)=>employeesnm.empid.toString()===employeesname)
  //     if(chckorganisation)
  //     {
  //     if(checkemployees)
  //     {
  
  //       setload(true)
  //       // const response1=await fetch('http://localhost:3000/upload', {
  //       //   method: 'POST',
  //       //   body: formData,
  //       // });


  //       const response= await fetch('http://localhost:3000${baseUrl}/api/emp/addTicket',{
  //         method:"POST",
  //         headers:{
  //           "Content-Type": "application/json",
  //           "authorization":token
  //         },
  //         body:JSON.stringify({organisationName,caseId,applicantName,mobileNo,verificationType,address,triggered,employeesname,formData})
  //       })

  //       const data=await response.json()
       
       


  //       if(!response.ok)
  //       return toast.error(data.msg)

  //       if(Object.keys(data).length>0){
  //         if(data.msg==='Case Registered')
  //         {
  //           console.log(data.msg);

  //           formData.append('caseuid',data.caseuid)
  //           const response1=await fetch('http://localhost:3000/upload', {
  //         method: 'POST',
  //         body: formData,
  //       });

  //       const data1=await response1.json()

  //       setload(false)

  //       if(!response1.ok)
  //       return toast.error(data.msg)

  //           toast.success("Case Registered")
  //           setticketitems([...ticketitems,inputticket])
  //           resetinputtickets()
  //         }
  //       }
  
        
  //     }
  //     else{
  //       toast.error('Employees Not Found!!!')
  //     }
  //   }
  //   else{
  //     toast.error('Organisation Not Found!!!')

  //   }
  // }
  //   else{
  //     toast.error('Plz Login!!')
  //     navigate('/')
  //   }
   
   
  // }
  const resetinputtickets=()=>{
    setInputTicket({
      organisation:'',
      employees:'',
      caseId:'',
      applicantname:'',
      mobileno:'',
      verificationType:'',
      address:'',
      triggered:'',
    })
    setSelectedFiles([])
    fileInputRef.current.value = '';
  }

  return (
    <>
    
     {admin?<Navbar/>:<Navbarstaff/>}
     <Loadingdialog  isloading={load}/>
   <div className='background rounded-md bg-slate-50 m-2 '>
   
    <div className="dasboard-section flex flex-col gap-4 space-x-4 p-2 px-3 pt-3 md:flex-row md:items-start items-end">
        <div className="ticket-section flex  flex-col w-full px-1">
       
        <h2 className='text-xl text-black text-center font-bold underline underline-offset-2'>ADD DETAILS</h2>
        <Dasboard_form inputticket={inputticket} organisationnames={organisationnames} handlechange={handlechange} handlechangesubmit={handlechangesubmit} employeesnames={employeesnames} resetinputtickets={resetinputtickets} handleFilechange={handleFilechange} fileInputRef={fileInputRef}/>
        </div>

        <div className="table-section  w-full  px-3">
        <h2 className='text-xl text-black text-center font-bold underline underline-offset-2'>DISPLAY</h2>
        <Table ticketitems={ticketitems} handleDelete={handleDelete} role={role}/>
        </div>
    </div>
   </div>
    </>

  )
}

export default Dashboard