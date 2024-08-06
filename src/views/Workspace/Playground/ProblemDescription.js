import { useState } from "react"
import { AiFillLike, AiFillDislike, AiFillStar } from "react-icons/ai"
import { BsCheck2Circle } from "react-icons/bs";
import { TiStarOutline } from "react-icons/ti"

const ProblemDescription = ({ problem, _solved }) => {
	const [updating, setUpdating] = useState({ likes: false, dislikes: false })
	const [isStar, setStar] = useState(false)

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
		<div className='bg-dark-layer-1 bg-neutral-800'>
			<div className='flex h-11 w-full items-center pt-2 bg-dark-layer-2 text-white overflow-x-hidden'>
				<div className={" rounded-t-[5px] px-5 py-[10px] text-xs cursor-pointer"}>
					Description
				</div>
			</div>
			<div className='flex px-0 py-4 h-[calc(100vh-94px)] overflow-y-auto'>
				<div className='px-5'>
					<div className='w-full'>
						<div className='flex space-x-4'>
							<div className='flex-1 mr-2 text-2xl text-white font-medium'>
								{problem !== "" && problem.name ? problem.name : 'Two Sum'}
							</div>
						</div>
						<div className='flex items-center mt-3 mb-6'>
							<div className={` text-xl inline-block  px-2.5  font-medium capitalize ${problem.dificulty === "Easy" ? 'text-green-500' : (problem.dificulty === 'Medium' ? 'text-yellow-600' : 'text-red-600')} `}>
								{problem !== "" ? problem.dificulty || problem.dificulty : 'Easy'}
							</div>
							<div className='flex items-center cursor-pointer space-x-4 rounded p-[3px]  ml-4 text-lg text-white'>
								<div onClick={handleLike}>
									<AiFillLike className='text-dark-blue' color={updating.likes ? 'blue' : ''} />
								</div>
								<div onClick={handleDislike}>
									{<AiFillDislike color={updating.dislikes ? 'blue' : ''} />}
								</div>
							</div>
							<div className='cursor-pointer rounded p-[3px] ml-3 text-xl text-white' onClick={handleStar}>
								{isStar ? <AiFillStar className='text-daryellow' color="yellow" /> : <TiStarOutline />}
							</div>

							{_solved &&
								<div className='rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-green-s text-dark-green-s'>
									<BsCheck2Circle color="green" />
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
												<strong className='text-white'>Input: </strong>
												{currProblem.input.nums !== undefined && (<span> nums = {JSON.stringify(currProblem.input.nums)}</span>)}
												{currProblem.input.target !== undefined && (<span> target = {JSON.stringify(currProblem.input.target)}</span>)}
												{currProblem.input.nums1 !== undefined && (<span> nums1 = {JSON.stringify(currProblem.input.nums1)}</span>)}
												{currProblem.input.nums2 !== undefined && (<span> nums2 = {JSON.stringify(currProblem.input.nums2)}</span>)}
												{currProblem.input.head !== undefined && (<span> head = {JSON.stringify(currProblem.input.head)}</span>)}
												{currProblem.input.pos !== undefined && (<span> pos = {JSON.stringify(currProblem.input.pos)}</span>)}
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
						<div className='my-8 pb-4'>
							<div className='text-white text-[16px]'>Constraints:</div>
							<ul className='text-white ml-5 list-disc text-neutral-400 text-[14px]'>
								{problem?.constraints && problem.constraints.length > 0 && problem.constraints.map((curr, index) => {
									return <li className="mt-1" key={index}>{curr} </li>
								})}
							</ul>
						</div>
						<div className='pb-4'>
							<div className='text-white text-[16px] mb-2'>Topics:</div>
							<div className="flex gap-2">
								<span className="bg-neutral-700 p-1 pb-1 rounded-lg cursor-pointer  text-white">
									{problem.type}
								</span>
								<span className=" bg-neutral-700 p-1 pb-1 rounded-lg cursor-pointer  text-white">
									Hash Map
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default ProblemDescription;

