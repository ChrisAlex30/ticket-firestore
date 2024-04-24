import React, { useEffect, useState } from 'react'


const Form = ({handleedit,user,login}) => {

 


  return (
    <form className='space-y-6 p-6'>
    <h1 className='text-4xl font-semibold mb-9 text-center mt-3'>Login</h1>
    <div>
     <label htmlFor="name" className='block text-lg text-gray-700 font-medium'>Name</label>    
     <input type="text" id="name" name='name' value={user.name} onChange={handleedit} placeholder='Enter Name'  className='form-input p-1 rounded mt-1 w-full block focus:outline-gray-500 focus:outline-1 outline-none' />       
      </div> 
      <div>
     <label htmlFor="password" className='block text-lg text-gray-700 font-medium'>Password</label>    
     <input type="password" id="password" name='password' value={user.password} onChange={handleedit} placeholder='Enter Password' className='form-input p-1 rounded mt-1 w-full block focus:outline-gray-500 focus:outline-1 outline-none' />       
     <button type='button' className='bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-500 transition duration-300 w-full mt-8 ' onClick={login}>Submit</button>
      </div>
  </form>
  )
}

export default Form