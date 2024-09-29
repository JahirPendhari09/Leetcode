import React from 'react'
import { FiCheckCircle } from "react-icons/fi";
import { IoMdLock } from "react-icons/io";
import { Link } from 'react-router-dom';

const ProblemCard = ({ id, name,label, acceptance, difficulty }) => {
    return (
        <tr className={`${id % 2 !== 0 ? 'bg-neutral-700' : ''}`} key={id}>
            <th className='p-2'><div className='ml-2'><FiCheckCircle color='rgb(63 202 125)' /></div></th>
            <th className='font-normal cursor-pointer'>{id}. <Link to={`/problemset/${name}`}>{label}</Link></th>
            <th className='font-normal'>{acceptance}%</th>
            <th className={`font-normal    ${difficulty === "Easy" ? 'text-[#14b8a6]' : (difficulty === 'Medium' ? 'text-yellow-500' : 'text-red-600')} `}>{difficulty}</th>
            <th className='font-normal pr-2 '>
                <div className='flex items-center justify-center gap-1 '>
                    <p className='w-full h-2 bg-neutral-500 rounded-bl-lg rounded-tl-lg'></p>
                    <IoMdLock size={40} className='-mt-1' />
                    <p className='w-full h-2 bg-neutral-500 rounded-br-lg rounded-tr-lg'></p>
                </div>
            </th>
        </tr>
    )
}

export default ProblemCard
