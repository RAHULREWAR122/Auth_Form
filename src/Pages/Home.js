import React from 'react'
import { NavLink } from 'react-router-dom'

function Home() {
   
    const token = JSON.parse(localStorage.getItem('token'))
    
    const handleLogOut =()=>{
        localStorage.removeItem('token');
        window.location.href = '/'
    }
   
  return (
    <div className='min-h-screen bg-gray-200 flex justify-center items-center gap-10 md:flex-row flex-col'>
    {token && token ?
         <div className=''>
            <h2 className='md:text-2xl text-xl font-bold mb-3'>Thank you for Login.</h2>
            <h3 className='text-lg font-semibold'>Token : {token}</h3>
            <button onClick={handleLogOut} className='mt-10 text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md'>LogOut</button>
          </div> 
        :
         <><NavLink to={'/login'} className='text-center bg-green-500 hover:bg-green-600 px-4 py-3 rounded-md min-w-[200px] text-white font-semibold text-lg'>Login</NavLink> 
         <NavLink to={'/signup'} className='text-center bg-green-500 hover:bg-green-600 px-4 py-3 rounded-md min-w-[200px] text-white font-semibold text-lg'>Register</NavLink> </> 
    }      
    
    </div>
  )
}
export default Home