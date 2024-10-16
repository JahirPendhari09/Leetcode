import { useEffect, useState } from "react"
import Split from "react-split"
import Playground from "./Playground"
import { dummyQuestion } from "../../static/editor"
import ProblemDescription from "./ProblemDescription"
import { fetchProblem } from "../../services/platform"
import { useParams } from "react-router-dom"

const Workspace = ( ) => {
	const [solved, setSolved] = useState(false)
	const [problem, setProblem] = useState('')
	const { problemName } = useParams()
	const [isLoading, setIsLoading] = useState(true)
	const getToProblem = () => {
		fetchProblem(problemName).then(res => {
			res.data.length <= 0 ? setProblem(dummyQuestion) : setProblem(res.data[0])
			setIsLoading(false)
		})
			.catch(err => {
				setProblem(dummyQuestion)
				setIsLoading(false)
			})
	}

	useEffect(() => {
		if (problemName) {
			getToProblem()
		}
	}, [problemName])

	if (isLoading && problemName) return <h1 className="text-3xl">Problem Loading....</h1>

	return (
	  <>
		<div className="overflow-hidden bg-black p-1 ma">
		  <Split className='split bg-black' direction='horizontal' sizes={ window.innerWidth < 768 ? [98,2] : [45, 55]} minSize={window.innerWidth < 768 ? 10 : 100}>
		    <ProblemDescription problem={problem} _solved={solved} />
			<div className="h-[600px] ">
			  <Playground problem={problem} setSolved={setSolved} />
			</div>
		  </Split>
		</div>
	  </>

	);
};
export default Workspace;
