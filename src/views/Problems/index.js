import React, { useState } from 'react'
import { allTopics, coverImages, problems, topImages } from './static'
import ProblemCard from './ProblemCard'
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

const ImageItem = ({ src }) => {
    return (
        <div className='w-full rounded-xl bg-neutral-800 h-30 cursor-pointer overflow-hidden'>
            <img src={src} alt='image' className='w-full h-full' loading="lazy" />
        </div>
    )
}

const CoverImageItem = ({ image, header, description }) => {
    return (
        <div className='w-full  rounded-xl bg-neutral-800 h-26 cursor-pointer flex items-center p-4 gap-4'>
            <img src={image} alt='image' className='w-[30%] h-[100%] rounded' loading='lazy' />
            <div className='text-sm' >
                <h4>{header}</h4>
                <p className='text-[10px] mt-2 text-neutral-500'>{description}</p>
            </div>
        </div>
    )
}

const Problems = () => {
    const [tab, setTab] = useState(0)
    return (
        <div className='bg-zinc-900 -mt-[25px] pt-14 pb-10 '>
            <div className={`flex w-full  gap-6 justify-between max-w-[1150px] mx-auto mt-10 flex-col sm:flex-col md:flex-col lg:flex-row`}>
                <div className=' w-[90%] m-auto  md:w-[90%] lg:w-[72%]'>
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
                <div className='lg:w-[28%] h-[600px] rounded-2xl bg-neutral-800 m-auto mt-0 sm:w-[90%] md:w-[90%]'>
                    <div>
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
                                    // // Change the color of the left/right arrows
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
                </div>
            </div>
        </div>
    )
}

export default Problems
