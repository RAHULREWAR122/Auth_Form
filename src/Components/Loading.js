import React from 'react'

function Loading() {
  return (
    <div className='z-[100] fixed h-full w-full top-0 left-0 backdrop-blur-[2px] flex justify-center items-center'>
         <div className="bg-gray-100 bg-opacity-50 rounded-md px-10 py-5 text-2xl font-semibold shadow-2xl">Loading...</div>
    </div>
  )
}

export default Loading