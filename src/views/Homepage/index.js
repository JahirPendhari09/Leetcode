import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const Homepage = () => {
  const store = useSelector(store => store.reducer);

  if(store.currTab === 2 ) {
    return <Navigate to ='/problemset'/>
  }
  
  return (
    <>
      <div className='flex gap-4 w-full justify-center mt-20'>
        <button className='text-xl border-2 rounded p-2 bg-green-300'> Home Page</button>
      </div>
    </>
  )
}

export default Homepage
