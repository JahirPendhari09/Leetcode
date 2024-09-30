import React, { useState } from 'react'
import { allTopics, problems } from './static'
import ProblemCard from './ProblemCard'

const Problems = () => {
    const [tab, setTab] = useState(0)
    return (
        <div className='bg-zinc-900 -mt-[25px] pt-14 pb-10 '>
            <div className={`flex w-full  gap-6 justify-between max-w-[1150px] mx-auto mt-10 md:flex-col lg:flex-row`}>
                <div className='lg:w-[75%] m-auto sm:w-[90%] md:w-[90%]'>
                    <div className='w-full '>
                        <div className=' w-full grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                            <div className='w-full rounded-xl bg-neutral-800 h-30 cursor-pointer overflow-hidden'>
                                <img src='https://assets.leetcode.com/users/images/f2d736c1-007d-4b51-a476-a7afc8ef3dac_1727074938.5687914.png'  alt='image' className='w-full h-full'/>
                            </div>
                            <div className='w-full rounded-xl bg-neutral-800 h-27 cursor-pointer overflow-hidden'>
                                <img src='https://assets.leetcode.com/users/images/49479bba-73b3-45d2-9272-99e773d784b2_1687290663.3168745.jpeg' alt='image' className='w-full h-full'/>
                            </div>
                            <div className='w-full rounded-xl bg-neutral-800 h-30 cursor-pointer overflow-hidden'>
                                <img src='https://assets.leetcode.com/users/images/770789b0-c96b-4663-86d1-baab25534864_1669795265.8012726.png' alt='image'  className='w-full h-full'/>
                            </div>
                        </div>
                        <div className='flex justify-between items-center my-4'>
                            <h1 className='text-[25px] text-neutral-300 font-semibold '>Study Plan</h1>
                            <p className='text-blue-400 cursor-pointer'>See all</p>
                        </div>
                        <div className=' w-full grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3' >
                            <div className='w-full rounded-xl bg-neutral-800 h-26 cursor-pointer flex items-center p-4 gap-4'>
                                <img src='https://assets.leetcode.com/study_plan_v2/top-interview-150/cover' alt='image' className='w-[30%] h-[100%] rounded'/>
                                <div className='text-sm' >
                                    <h4>Top Inerview 150</h4>
                                    <p className='text-[10px] mt-2 text-neutral-500'>Must-do List for Interview Prep</p>
                                </div>
                            </div>
                            <div className='w-full rounded-xl bg-neutral-800 h-26 cursor-pointer flex items-center p-4 gap-4'>
                                <img src='https://assets.leetcode.com/study_plan_v2/leetcode-75/cover' alt='image' className='w-[30%] h-[100%] rounded'/>
                                <div className='text-sm' >
                                    <h4>LeetCode 75</h4>
                                    <p className='text-[10px] mt-2 text-neutral-500'>Ace Coding Interview with 75 Qs</p>
                                </div>
                            </div>
                            <div className='w-full rounded-xl bg-neutral-800 h-26 cursor-pointer flex items-center p-4 gap-4'>
                                <img src='https://assets.leetcode.com/study_plan_v2/top-sql-50/cover' alt='image'  className='w-[30%] h-[100%]  rounded'/>
                                <div className='text-sm' >
                                    <h4>SQL 50</h4>
                                    <p className='text-[10px] mt-2 text-neutral-500'>Creack SQL Interview in 50 Qs</p>
                                </div>
                            </div>
                            <div className='w-full rounded-xl bg-neutral-800 h-26 cursor-pointer flex items-center p-4 gap-4'>
                                <img src='https://assets.leetcode.com/study_plan_v2/introduction-to-pandas/cover' alt='image'  className='w-[30%] h-[100%]  rounded'/>
                                <div className='text-sm' >
                                    <h4>Introduction to Pandas</h4>
                                    <p className='text-[10px] mt-2 text-neutral-500'>Learn Basic Pandas in 15 Qs</p>
                                </div>
                            </div>
                            <div className='w-full rounded-xl bg-neutral-800 h-26 cursor-pointer flex items-center p-4 gap-4'>
                                <img src='https://assets.leetcode.com/study_plan_v2/30-days-of-javascript/cover' alt='image'  className='w-[30%] h-[100%]  rounded'/>
                                <div className='text-sm'>
                                    <h4>30 Days of Javascript</h4>
                                    <p className='text-[10px] mt-2 text-neutral-500'>Learn JS Basics with 30 Qs</p>
                                </div>
                            </div>
                            <div className='w-full rounded-xl bg-neutral-800 h-26 cursor-pointer flex items-center p-4 gap-4'>
                                <img src='https://assets.leetcode.com/study_plan_v2/amazon-spring-23-high-frequency/cover' alt='image'  className='w-[30%] h-[100%]  rounded'/>
                                <div className='text-sm'>
                                    <h4> Amazon Spring '23 High Frequency</h4>
                                    <p className='text-[10px] mt-2 text-neutral-500'>Practice Amazon 25 Recently...</p>
                                </div>
                            </div>
                        </div>
                        <div className=' w-full flex overflow-auto gap-4 mt-10'>
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
