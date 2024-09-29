import { useState } from "react"
import { AiOutlineLike, AiOutlineDislike, AiFillStar } from "react-icons/ai"
import { TiStarOutline } from "react-icons/ti"
import { BiMessageRounded } from "react-icons/bi"
import { LiaQuestionCircle } from "react-icons/lia"
import { TbExternalLink } from "react-icons/tb"
import { CgNotes } from "react-icons/cg";
import { FiCheckCircle } from "react-icons/fi"

const ProblemDescription = ({ problem, _solved }) => {
	const [updating, setUpdating] = useState({ likes: false, dislikes: false })
	const [isStar, setStar] = useState(false)
	const [currTab, setCurrTab] = useState(1)

	const handleLike = async () => {
		setUpdating({ dislikes: !updating.likes && false, likes: !updating.likes })
	}

	const handleDislike = async () => {
		setUpdating({ likes: !updating.dislikes && false, dislikes: !updating.dislikes })
	}

	const handleStar = async () => {
		setStar(!isStar)
	}
 
	return (
		<div className='bg-dark-layer-1 bg-neutral-800 h-full  rounded-xl border border-neutral-500 overflow-hidden'>
			<div className='flex h-10 w-full items-center gap-4 pl-4  bg-dark-layer-2  text-white overflow-hidden bg-neutral-700'>
				<div className={` flex justify-center gap-1 items-center cursor-pointer ${currTab === 1 ? 'font-bold':''}`} onClick={()=> setCurrTab(1)}>
				   <CgNotes  color="blue"/>
					Description
				</div>
				<div className={`cursor-pointer ${currTab === 2 ? 'font-bold':''}`} onClick={()=> setCurrTab(2)}>
					Submissions
				</div>
			</div>
			{
				currTab === 1 && <div className='flex flex-col '>
				<div className='px-5 h-[520px] overflow-y-auto'>
					<div className='w-full'>
						<div className='flex space-x-4'>
							<div className='flex-1 mr-2 mt-2 text-2xl text-white font-medium'>
								 {problem !== "" && problem.name ? problem.name : 'Two Sum'}
							</div>
						</div>
						<div className='flex items-center mt-3 mb-6'>
							<div className={` text-sm p-1  rounded-xl bg-neutral-700 inline-block  px-2.5  font-medium capitalize ${problem.difficulty === "Easy" ? 'text-[#14b8a6]' : (problem.difficulty === 'Medium' ? 'text-yellow-600' : 'text-red-600')} `}>
								{problem !== "" ? problem.difficulty || problem.difficulty : 'Easy'}
							</div>

							{_solved &&
								<div className='rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-green-s text-dark-green-s'>
									<FiCheckCircle color='rgb(63 202 125)'/>
								</div>
							}

						</div>
						<div className='text-white text-[16px]'>{problem.description}</div>
						{
							problem.examples.length > 0 && problem.examples.slice(0, 2).map((currProblem, index) => {
								return <div className='mt-4' key={currProblem.id}>
									<div >
										<p className='font-medium text-white '>Example {index + 1}: </p>
										<img src='' alt='' className='mt-3' />
										<div className='example-card'>
											<pre>
												<strong className='text-white'>Input:</strong>
												{currProblem.input.nums   !== undefined && (<span> nums = {JSON.stringify(currProblem.input.nums)}</span>)}
												{currProblem.input.target !== undefined && (<span> target = {JSON.stringify(currProblem.input.target)}</span>)}
												{currProblem.input.nums1  !== undefined && (<span> nums1 = {JSON.stringify(currProblem.input.nums1)}</span>)}
												{currProblem.input.nums2  !== undefined && (<span> nums2 = {JSON.stringify(currProblem.input.nums2)}</span>)}
												{currProblem.input.head   !== undefined && (<span> head = {JSON.stringify(currProblem.input.head)}</span>)}
												{currProblem.input.pos    !== undefined && (<span> pos = {JSON.stringify(currProblem.input.pos)}</span>)}
												{currProblem.input.k      !== undefined && (<span> k = {JSON.stringify(currProblem.input.k)}</span>)}
												<br />
												<strong>Output:</strong> {JSON.stringify(currProblem.output)}
												<br />
												<strong>Explanation:</strong> {currProblem.explanation}
											</pre>
										</div>
									</div>
								</div>
							})
						}
						<div className='my-8'>
							<div className='text-white text-[16px]'>Constraints:</div>
							<ul className='text-white ml-5 list-disc text-neutral-400 text-[14px]'>
								{problem?.constraints && problem.constraints.length > 0 && problem.constraints.map((curr, index) => {
									return <li className="mt-1" key={index}>{curr} </li>
								})}
							</ul>
						</div>
					</div>
				</div>
				<div className=" h-10 w-full ">
					<div className='h-full flex items-center cursor-pointer pl-2  text-neutral-400 font-medium'>
						<div className=" flex items-center w-20 px-2 gap-2 h-4/5 bg-neutral-600 rounded-tl-lg rounded-bl-lg  " onClick={handleLike}>
							<AiOutlineLike className='text-dark-blue' color={updating.likes ? 'blue' : ''} />
							<p>54.5K</p>
						</div>
						<div className=" ml-[1px] flex items-center w-8 px-2 gap-2 h-4/5 bg-neutral-600 rounded-tr-lg rounded-br-lg   "  onClick={handleDislike}>
							{<AiOutlineDislike color={updating.dislikes ? 'blue' : ''} />}
						</div>	
						<div className=" ml-[1px] flex items-center w-8 px-2 gap-2 h-4/5 ">
							<BiMessageRounded />
						</div>	
						<p>44</p>
						<p className="ml-3">|</p>
						<div className='cursor-pointer rounded p-[3px] ml-3 text-xl' onClick={handleStar}>
							{isStar ? <AiFillStar className='text-daryellow' color="yellow" /> : <TiStarOutline />}
						</div>
						<div className='cursor-pointer rounded p-[3px] ml-3 text-xl'>
						    <TbExternalLink />
						</div>
						<div className='cursor-pointer rounded p-[3px] ml-3 text-xl'>
							<LiaQuestionCircle />
						</div>
					</div>
				</div>
			</div>
			
			}
			{
				currTab === 2 && <div className='flex px-0 py-4 h-[638px] overflow-y-auto'>
				<div className='px-5'>
					<div className='w-full text-white' >
						<h1>All submissions....</h1>
					</div>
				</div>
			</div>
			}
		</div>
	);
};
export default ProblemDescription;

