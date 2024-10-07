import React, { useState } from 'react'
import { allTopics, coverImages, problems, topImages } from './static'
import ProblemCard from './ProblemCard'

const ImageItem = ({src}) => {
    return (
        <div className='w-full rounded-xl bg-neutral-800 h-30 cursor-pointer overflow-hidden'>
            <img src={src} alt='image'  className='w-full h-full'  loading="lazy"  />
        </div>
    )
}

const CoverImageItem = ({image, header, description}) => {
    return (
        <div className='w-full  rounded-xl bg-neutral-800 h-26 cursor-pointer flex items-center p-4 gap-4'>
            <img src={image} alt='image' className='w-[30%] h-[100%] rounded' loading='lazy'/>
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
                <div className=' w-[90%] m-auto  md:w-[90%] lg:w-[75%]'>
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
                                coverImages.map((item)=> <CoverImageItem {...item} key={item.id}/>)
                            }
                        </div>
                        <div className=' w-full overflow-auto gap-4 mt-10 grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-6 '>
                            {allTopics.map((topic) => (
                                <div key={topic.id} className={`w-full rounded-full h-10 flex items-center justify-center  cursor-pointer ${tab === topic.id ? 'bg-white text-black' : 'bg-neutral-700'}`} onClick={() => setTab(topic.id)}>
                                    <div>{topic.label}</div>
                                </div>
                            ))}
                        </div>
                        <div className='w-full'>
                            <table className='w-full  mt-4'>
                                <thead className='w-full text-left font-normal '>
                                    <tr className='p-2 text-neutral-400 border-b-[1px]  border-neutral-600'>
                                        <th className='p-4'>Status</th>
                                        <th className='w-2/5'>Title</th>
                                        <th>Acceptance</th>
                                        <th>Difficulty</th>
                                        <th>Frequency</th>
                                    </tr>
                                </thead>
                                <tbody className='text-left text-[16px] '>
                                    {
                                        problems.map((problem) => (
                                            <ProblemCard  {...problem} key={problem.id}/>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className='lg:w-[24%] h-[600px] rounded-2xl bg-neutral-800 m-auto mt-0 sm:w-[90%] md:w-[90%]'>
                    <div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Problems
