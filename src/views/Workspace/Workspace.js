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
	const [isLoading , setIsLoading] = useState(true)
	const [success , setSuccess] = useState(false)
	const dispatch = useDispatch();
	const auth = useSelector((store) => store.reducer.auth)
	console.log(auth,'auth')


	useEffect(()=>{
		//const topics =  [array, string, stack, binary-search,linked-list]
		// fetchProblem('binary-search').then(res => {
		// 	res.data.length <= 0 ? setProblem(dummyQuestion) : setProblem(res.data[0])
		// 	setIsLoading(false)	
	    // })
		// .catch(err => {
			// testing in development mode
			setProblem(dummyQuestion)
			setIsLoading(false)
		// })

		dispatch(login('user'))
	},[])
	
	useEffect(()=>{
		if(solved)	setSuccess(true)
		let timer = setTimeout(() => setSuccess(false), 2000);
		return () => clearTimeout(timer)
	},[solved])

	if(isLoading) return <h1 className="text-3xl">Problem Loading....</h1>
	return (
		<Split className='split bg-neutral-800' minSize={0}>
			<ProblemDescription problem={problem} _solved={solved} />
			<div>
				<Playground problem={problem} setSolved={setSolved} />
				{success && <Confetti gravity={0.3} tweenDuration={1000} width={width - 1} height={height - 1} />}
			</div>
		</Split>
	);
};
export default Workspace;
