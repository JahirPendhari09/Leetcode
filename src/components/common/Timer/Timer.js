import React, { useEffect } from "react";

const Timer = ({time, setTime}) => {

  const formatTime = (time) => {
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  useEffect(() => {
    let intervalId;
    if(time > 0) {
      intervalId=  setInterval(() => {
        setTime();
      }, 1000);
    }
    
    return () => clearInterval(intervalId);
  }, [time]);

  return (
    <div>
      <div className='flex items-center space-x-2  p-1.5 cursor-pointer rounded text-white '>
          <div className="text-white">{formatTime(time)}</div>
      </div>
    </div>
  );
};

export default Timer;
