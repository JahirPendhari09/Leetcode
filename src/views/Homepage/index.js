import React from 'react';
import { Link } from 'react-router-dom';
import { VideoRecording } from '../VideoRecording';


const Homepage = () => {
  return (
    
    <>
    <div className='flex gap-4 w-full justify-center mt-20'>
      <Link to='/platform'><button className='text-xl border-2 rounded p-2 bg-green-300'> Go to Platform</button></Link>
      <Link to='/core-quizzes' > <button className='text-xl border-2 rounded p-2 w-25 bg-yellow-500'>Go to Core Quizzes</button></Link>
    </div>
    {/* <VideoRecording/> */}
    </>
  );
};



export default Homepage;
