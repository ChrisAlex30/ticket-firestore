import React, { useEffect, useRef, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';


const Navbarstaff = () => {
    // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    // const [isSubDropdownOpen, setIsSubDropdownOpen] = useState(false);
    const subDropdownRef = useRef(null);
    const navigate = useNavigate();
  

    // Function to toggle the dropdown menu


  // useEffect(()=>{
  //   const admn = JSON.parse(localStorage.getItem('isSuperAdmin'));
  //   if(admn)
  //   setAdmin(true)
  // },[]) 



  useEffect(() => {
    const handleClickOutside = (event) => {
      
        if ( subDropdownRef.current &&
          !subDropdownRef.current.contains(event.target) &&
          !event.target.closest('#dropdownNavbarLink')) {
            setIsSubDropdownOpen(false);
        }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
}, [subDropdownRef]);

  const handlelogout=(e)=>{
    const superadmin = JSON.parse(localStorage.getItem('isSuperAdmin'));
    if(superadmin)
    localStorage.removeItem('isSuperAdmin')
    const token = JSON.parse(localStorage.getItem('token'));
    if(token){
      localStorage.removeItem('token')
      navigate('/')
      toast.success('Successfully Log Out!')
    }
  }
  return (
  
    <nav className="bg-gray-200 shadow flex flex-row items-center justify-between w-full z-10 p-3">
    <div className="">
      <span className="text-xl font-poppins font-semibold cursor-pointer d-flex">
        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 inline px-1" alt="Flowbite Logo" />
        App
      </span>
     
    </div>
    <div>
    <button className='bg-blue-500  rounded-md  text-sm px-2 py-1 hover:bg-blue-400 md:text-md text-white' onClick={handlelogout}>Log Out</button>
   
    </div>
    
  </nav>
  );
};

export default Navbarstaff;
