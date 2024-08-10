import { useEffect, useState } from "react"
import Split from "react-split"
import Playground from "./Playground/Playground"
import Confetti from "react-confetti"
import useWindowSize from "../../hooks/useWindowSize"
import { dummyQuestion } from "../../static/editor"
import ProblemDescription from "./Playground/ProblemDescription"
import { fetchProblem } from "../../services/platform"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../../redux/action"

const Workspace = () => {
	const { width, height } = useWindowSize()
	const [solved, setSolved] = useState(false)
	const [problem, setProblem] = useState('')
	const [activeProblemName , setActiveProblemName] = useState('');
	const [isLoading , setIsLoading] = useState(true)
	const [success , setSuccess] = useState(false)
	const dispatch = useDispatch();
	const auth = useSelector((store) => store.reducer.auth)

	const getToProblem = () => {
		fetchProblem(activeProblemName).then(res => {
			res.data.length <= 0 ? setProblem(dummyQuestion) : setProblem(res.data[0])
			setIsLoading(false)	
	    })
		.catch(err => {
			// testing in development mode
			setProblem(dummyQuestion)
			setIsLoading(false)
		})
	}

	useEffect(()=>{
		if(activeProblemName) {
			getToProblem()
		} 
		// dispatch(login('user'))
	},[activeProblemName])
	
	useEffect(()=>{
		if(solved)	setSuccess(true)
		let timer = setTimeout(() => setSuccess(false), 2000);
		return () => clearTimeout(timer)
	},[solved])

	if(isLoading && activeProblemName) return <h1 className="text-3xl">Problem Loading....</h1>
	
	return (
		<>
		{
			activeProblemName ? <Split className='split bg-neutral-800' minSize={0}>
			<ProblemDescription problem={problem} _solved={solved} />
			<div>
				<Playground problem={problem} setSolved={setSolved} />
				{success && <Confetti gravity={0.3} tweenDuration={1000} width={width - 1} height={height - 1} />}
			</div>
		</Split> 
		: <div  className="w-[200px] mt-20 p-5 h-[300px] border align-center m-auto ">
			<h1 className="font-bold">Choose Problem</h1>
			<div className="flex flex-col gap-4 mt-4" >
			<p onClick={(e) => setActiveProblemName('Two Sum')}>Two Sum</p>
			<p onClick={(e) => setActiveProblemName('Reverse String')}>Reverse String</p>
			<p onClick={(e) => setActiveProblemName('Next Greater Element')}>Next Greater Element</p>
			<p onClick={(e) => setActiveProblemName('Linked List Cycle')}>Linked List Cycle</p>
			<p onClick={(e) => setActiveProblemName('Missing Number')}>Missing Number</p>
		</div>
		</div>
		}
		
		</>
		
	);
};
export default Workspace;
