import React, { useEffect, useRef, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';


const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isSubDropdownOpen, setIsSubDropdownOpen] = useState(false);
    const subDropdownRef = useRef(null);
    const navigate = useNavigate();
    // const[admin,setAdmin] =useState(false)


    // Function to toggle the dropdown menu
    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };
  
  const toggleSubDropdown = (event) => {
    event.stopPropagation();
    setIsSubDropdownOpen(!isSubDropdownOpen);
  };

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
  
    <nav className="bg-gray-200 shadow md:flex md:flex-row md:items-center md:justify-between  md:px-24 px-5 w-full z-10 p-2">
    <div className="flex items-center justify-between ">
      <span className="text-xl font-poppins font-semibold cursor-pointer d-flex">
        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 inline px-1" alt="Flowbite Logo" />
        App
      </span>

      <span className="text-2xl cursor-pointer md:hidden inline-block float-right" onClick={toggleDropdown}>
        <i className="fas fa-solid fa-bars" name="menu"></i>
      </span>
    </div>

    <ul className={`md:flex md:items-center z-[999] md:z-auto md:static absolute bg-gray-200 w-full left-0 md:w-auto md:bg-transparent md:pl-0 pl-2 md:opacity-100 ${isDropdownOpen ? 'opacity-100 top-[66px]' : 'opacity-0 top-[-400px]'} transition-all ease-in duration-500`}>
   <li className="mx-4 my-6 md:my-0 ">
            <a href="/dashboard" className="md:text-lg font-medium hover:text-blue-900 duration-100">Dashboard</a>
          </li>
           <li className="mx-4 my-6 md:my-0 ">
            <a href="/cases" className="md:text-lg font-medium hover:text-blue-900 duration-100">Cases</a>
          </li>
          <li className="mx-4 my-6 md:my-0 font-extrabold">
            <button id="dropdownNavbarLink"  onClick={(event) => toggleSubDropdown(event)} className="flex md:text-lg font-medium  items-center md:justify-end w-full text-black  hover:text-blue-900">Add +</button>
             {/* Sub dropdown menu */}
          <ul ref={subDropdownRef} className={`md:absolute z-50 bg-gray-200 w-full mt-1 md:w-auto rounded-lg md:bg-gray-300 md:pl-0 pl-2 md:opacity-100 ${isSubDropdownOpen ? 'opacity-100' : 'opacity-0 hidden'} transition-all ease-in duration-500`}>
            <li className="mx-4 my-2 border-b-4 border-gray-500 p-0.5">
              <a href="/addorganisation" className="text-sm font-medium hover:text-blue-900 duration-100">Organisation</a>
            </li>
            <li className="mx-4 my-2 p-0.5">
              <a href="/addemployee" className="text-sm font-medium hover:text-blue-900 duration-100">Add Employee</a>
            </li>
            
           
          </ul>
          
          </li>
         
          <li className="mx-4 my-6 md:my-0 ">
            <a href="/dashboard" className="md:text-lg font-medium hover:text-blue-900 duration-100">
            <button className='bg-blue-500  rounded-md  text-sm px-2 py-1 hover:bg-blue-400 md:text-md text-white' onClick={handlelogout}>Log Out</button>
            </a>
          </li>
        </ul>
  </nav>
  );
};

export default Navbar;
