import React, { useEffect, useState } from 'react'
import { allTopics, coverImages, problems, topImages } from './static'
import ProblemCard from './ProblemCard'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { IoMdHelpCircleOutline } from "react-icons/io";
import { BsPatchCheckFill } from "react-icons/bs";


const ImageItem = ({ src }) => {
    return (
        <div className='w-full rounded-xl bg-neutral-800 h-30 cursor-pointer overflow-hidden'>
            <img src={src} alt='logo-image' className='w-full h-full' loading="lazy" />
        </div>
    )
}

const CoverImageItem = ({ image, header, description }) => {
    return (
        <div className='w-full  rounded-xl bg-neutral-800 h-26 cursor-pointer flex items-center p-4 gap-4'>
            <img src={image} alt='cover-image' className='w-[30%] h-[100%] rounded' loading='lazy' />
            <div className='text-sm' >
                <h4>{header}</h4>
                <p className='text-[10px] mt-2 text-neutral-500'>{description}</p>
            </div>
        </div>
    )
}

const Problems = () => {
    const [tab, setTab] = useState(0)
    const [currWeek, setCurrWeek] = useState()
    const [remainDayFromWeek, setRemainDayFromWeek] = useState(0)

    useEffect(() => {
        // Function to calculate the current week number
        const getWeekNumber = (date) => {
            const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
            const dayOfMonth = date.getDate();
            const weekNumber = Math.ceil((dayOfMonth + startOfMonth.getDay()) / 7);
            return weekNumber;
        };

        // Set the current week
        const currentWeek = getWeekNumber(new Date());
        setCurrWeek(currentWeek);
    }, []);

    useEffect(() => {
      // Function to get the start date of the current week
      const getStartOfWeek = (date) => {
          const day = date.getDay(); // 0 (Sunday) to 6 (Saturday)
          const startOfWeek = new Date(date); // Copy the current date
          startOfWeek.setDate(date.getDate() - day); // Set the start date to the previous Sunday
          startOfWeek.setHours(0, 0, 0, 0); // Set hours to beginning of the day
          return startOfWeek;
      };
  
      // Function to get the end date of the current week
      const getEndOfWeek = (date) => {
          const startOfWeek = getStartOfWeek(date);
          const endOfWeek = new Date(startOfWeek);
          endOfWeek.setDate(startOfWeek.getDate() + 6); // Set end date to the following Saturday
          endOfWeek.setHours(23, 59, 59, 999); // Set hours to end of the day
          return endOfWeek;
      };
  
      // Calculate remaining days in the current week
      const today = new Date();
      const endOfWeek = getEndOfWeek(today);
      const daysRemaining = Math.ceil((endOfWeek.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      setRemainDayFromWeek(daysRemaining-1)

    }, []);



    return (
      <div className='bg-zinc-900 -mt-[25px] pt-14 pb-10 '>
        <div className={`flex w-full gap-6 justify-between max-w-[1150px] mx-auto mt-10 flex-col sm:flex-col md:flex-col lg:flex-row`}>
          <div className=' w-[90%] m-auto sm:w-[90%] md:w-[90%] lg:w-[72%]'>
            <div className='w-full '>
              <div className='w-full grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                  topImages.map((item) => <ImageItem src={item} key={item} />)
                }
              </div>
            <div className='flex justify-between items-center my-4 w-[80%] md:w-full lg:w-full'>
              <h1 className='text-[25px] text-neutral-300 font-semibold '>Study Plan</h1>
              <p className='text-blue-400 cursor-pointer'>See all</p>
            </div>
            <div className='w-full grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3' >
              {
                coverImages.map((item) => <CoverImageItem {...item} key={item.id} />)
              }
            </div>
            <div className=' w-full overflow-auto gap-4 mt-10 grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-6 '>
              {allTopics.map((topic) => (
                <div key={topic.id} className={`w-full rounded-full h-10 flex items-center justify-center  cursor-pointer ${tab === topic.id ? 'bg-white text-black' : 'bg-neutral-700'}`} onClick={() => setTab(topic.id)}>
                  <div>{topic.label}</div>
                </div>
              ))}
            </div>
            <div className='w-full scroll overflow-x-scroll '>
              <table className='w-full mt-4'>
                <thead className='w-full text-left font-normal overflow-scroll '>
                  <tr className='p-2 text-neutral-400 border-b-[1px]  border-neutral-600'>
                    <th className='p-4 min-w-[100px]'>Status</th>
                    <th className='w-2/5 min-w-[200px]'>Title</th>
                    <th className='min-w-[120px]'>Acceptance</th>
                    <th className='min-w-[120px]'>Difficulty</th>
                    <th className='min-w-[120px]'>Frequency</th>
                  </tr>
                </thead>
                <tbody className='text-left text-[16px]'>
                  {
                    problems.map((problem) => (
                      <ProblemCard  {...problem} key={problem.id} />
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className=' w-[90%] m-auto mt-0 sm:w-[90%] md:w-[90%] lg:w-[28%]'>
          <div className='flex h-auto '>
            <div className='rounded-2xl bg-neutral-800 pb-5 w-full flex flex-col sm:flex-col md:flex-row  lg:flex-col'>
              <div className='w-full'>
               <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                  sx={{
                    // Change the color of the day text
                    '& .MuiPickersDay-root': {
                      color: 'white',
                    },
                    // Change the background color of today's date
                    '& .MuiPickersDay-root.Mui-selected': {
                      backgroundColor: 'green',
                      color: 'white', // Optional: Make text white on green background
                    },
                    // Change the border color for today's date
                    '& .MuiPickersDay-root.MuiPickersDay-today': {
                      borderColor: 'green',
                    },
                    // Change the color of the left/right arrows
                    '& .MuiPickersCalendarHeader-switchViewButton, & .MuiPickersArrowSwitcher-button': {
                      color: 'white',
                    },
                    // Change the color of the week day labels (Mon, Tue, etc.)
                    '& .MuiDayCalendar-weekDayLabel': {
                      color: 'white !important', // Use !important to ensure override
                    },
                  }}
                />
                </LocalizationProvider>
              </div>
              <div className='w-[90%] m-auto md:px-4'>
                <div className='bg-neutral-700 h-20 rounded-md p-2 '>
                  <div className='w-[90%] m-auto justify-between flex text-[14px]'>
                    <div className='flex gap-[2px] text-[#ffa116] font-medium  items-center'>
                      <div>Weekly Premium</div>
                      <div className='mt-[1px]'><IoMdHelpCircleOutline /></div>
                    </div>
                    <div>{remainDayFromWeek} Days left</div>
                  </div>
                  <div className='w-[80%] text-neutral-400 m-auto justify-between flex text-[10px] mt-4' >
                    <div className={`${currWeek === 1 ? 'rounded-full p-1 bg-[#ffa116] text-white' : 'p-1'} `}>W1</div>
                    <div className={`${currWeek === 2 ? 'rounded-full p-1 bg-[#ffa116] text-white' : 'p-1'} `}>W2</div>
                    <div className={`${currWeek === 3 ? 'rounded-full p-1 bg-[#ffa116] text-white' : 'p-1'} `}>W3</div>
                    <div className={`${currWeek === 4 ? 'rounded-full p-1 bg-[#ffa116] text-white' : 'p-1'} `}>W4</div>
                    <div className={`${currWeek === 5 ? 'rounded-full p-1 bg-[#ffa116] text-white' : 'p-1'} `}>W5</div>
                  </div>
                </div>
                <div className='flex justify-between mt-6 text-sm text-neutral-500 '>
                  <div className='flex gap-2 items-center'>
                    <div className='text-green-500'><BsPatchCheckFill /></div>
                      <div>0</div>
                      <div className='text-green-500'>Redeem</div>
                    </div>
                    <div>Rules</div>
                  </div>
                  <hr className="border-t-2 border-neutral-700 my-4" />
                  <div className='flex gap-2 items-center text-sm'>
                    <div className='w-6 h-6 border-4 rounded-full border-neutral-600 border-t-blue-400 transform rotate-[36deg]'></div>
                    <div>Top Interview 150</div>
                  </div>
                </div>
              </div>
            </div>
            <div className='rounded-2xl bg-neutral-800 w-full h-40 mt-10'>
              <div className='p-4'>
                <div>Trending Companies</div>
                <div> </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Problems
