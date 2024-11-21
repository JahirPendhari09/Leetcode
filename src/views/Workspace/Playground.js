import { useEffect, useState } from "react"
import Split from "react-split"
import CodeMirror from "@uiw/react-codemirror"
import { javascript } from "@codemirror/lang-javascript"
import { autocompletion } from "@codemirror/autocomplete"
import EditorFooter from "./EditorFooter"
import { LANGUAGES, languageMap, themeMap, themeOptions } from "../../static/editor"
import PlaygroundHeader from "./PlaygroundHeader"
import { postCode } from "../../services/platform"
import { useLocation, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

const Playground = ({ problem, setSolved }) => {
    const [extensions, setExtensions] = useState([javascript(), autocompletion()])
    const [activeTestCaseId, setActiveTestCaseId] = useState(0)
    const [language, setLanguage] = useState(LANGUAGES[0])
    const [theme, setTheme] = useState(themeOptions[0])
    const [yourOutput, setYourOutput] = useState([])
    const [output, setOutput] = useState(false)
    const [userCode, setUserCode] = useState()
    const [status, setStatus] = useState(true)
    const [currBoilerPlate, setCurrBoilerPlate] = useState({})
    const [numOfTestCaseShow, setNumOfTestCsesShow] = useState(2)
    const [codeError, setCodeError] = useState(false)
    const [runCodeLoading, setRuncodeLoading] = useState(false)
    const auth = useSelector(store => store.reducer.auth)
    const navigate = useNavigate()
    const location = useLocation()

    const [settings, setSettings] = useState({
        fontSize: '16px',
        settingsModalIsOpen: false,
        dropdownIsOpen: false,
    })

    const extractFunctionInfo = (code, language) => {
        // Regular expressions for different languages
        const regexPatterns = {
            javascript: /function\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*\(([^)]*)\)/g,
            python: /def\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*\(([^)]*)\)/g,
            java: /public\s+([\w<>[\],\s]+)\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*\(([^)]*)\)/g,
            cpp: /([a-zA-Z_$][0-9a-zA-Z_$]*)\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*\(([^)]*)\)/g
        };

        // Select the regex pattern based on the language
        const functionRegex = regexPatterns[currBoilerPlate.language];

        if (!functionRegex) {
            console.error(`Unsupported language: ${language}`);
            return [];
        }

        let functions = {};
        let match;

        // Iterate over all matches
        if ((match = functionRegex.exec(code)) !== null) {
            let functionName
            let parameters
            if (currBoilerPlate.language === 'java') {
                functionName = match[2];
                parameters = match[3].split(',').map(param => param.trim());
            } else {
                functionName = match[1];
                parameters = match[2].split(',').map(param => param.trim());
            }
            functions.name = functionName
            functions.parameters = parameters
        }
        return functions;
    };

    const isTestCasePassed = (yourOutput, problem, index) => {
        if (yourOutput[index]?.error !== undefined) {
            if (!codeError) setCodeError(true)
            return false
        }
        if (codeError) setCodeError(false)
        return ((typeof yourOutput[index]?.output === 'object')
            ? JSON.stringify(problem.examples[index].output) === JSON.stringify(yourOutput[index]?.output)
            : yourOutput[index]?.output === problem.examples[index].output
        )
    }

    const handleSubmit = async () => {
        if(!auth){
            navigate('/login',{ state: { from: location } })
        }
        if (language.value !== 'javascript') {
            return alert(`${language.label} is not supported for production. We are currently working on it.`);
        }
        const functionsAndParameter = extractFunctionInfo(userCode)
        if (functionsAndParameter.name === 'has_cycle' && language.value === 'python') {
            alert("Python language is not supported for the given question.");
        } else {
            setYourOutput('')
            const payload = {
                'language': language.value,
                'code': userCode,
                'problem': problem,
                'boilerPlate': currBoilerPlate,
                'function': functionsAndParameter,
                'runType': 'submit'
            }
            setRuncodeLoading(true)
            postCode(payload).then(res => {
                setYourOutput(res.data.results)
                const allPassed = res.data.results.every((result, index) => isTestCasePassed(res.data.results, problem, index))
                setSolved(allPassed ? true : false)
                setStatus(allPassed ? 'Accepted' : 'Wrong Answer')
                setNumOfTestCsesShow(problem.examples.length)
                setOutput(true)
                setRuncodeLoading(false)

            }).catch(err => setRuncodeLoading(false))
        }
    }
    const handleRun = async () => {
        if(!auth){
            navigate('/login',{ state: { from: location } })
        }
        if (language.value !== 'javascript') {
            return alert(`${language.label} is not supported for production. We are currently working on it.`);
        }
        const functionsAndParameter = extractFunctionInfo(userCode)
        if (functionsAndParameter.name === 'has_cycle' && language.value === 'python') {
            alert("Python language is not supported for the given question.");
        } else {
            setYourOutput('')

            const payload = {
                'language': language.value,
                'code': userCode,
                'problem': problem,
                'boilerPlate': currBoilerPlate,
                'function': functionsAndParameter,
                'runType': 'run'
            }
            setRuncodeLoading(true)
            postCode(payload).then(res => {
                setYourOutput(res.data.results)
                const allPassed = res.data.results.every((result, index) => isTestCasePassed(res.data.results, problem, index))
                setStatus(allPassed ? 'Accepted' : 'Wrong Answer')
                setNumOfTestCsesShow(2)
                setOutput(true)
                setRuncodeLoading(false)
            }).catch(err => setRuncodeLoading(false))
        }
    }

    const onChange = (value) => {
        setUserCode(value)
    }

    useEffect(() => {
        const currLanguage = problem.boilerPlates.find(curr => curr.language === language.value)
        if (currLanguage) {
            setUserCode(currLanguage.boilerplate)
            setCurrBoilerPlate(currLanguage)
            setCodeError(false)
            setOutput(false)
        }
        // Update CodeMirror extensions based on selected language
        const languageFunction = languageMap[language.value] || javascript;
        setExtensions([languageFunction(), autocompletion()]);
    }, [language, problem]);

    return (
        <div className='flex flex-col bg-dark-layer-1 relative h-full overflow-x-hidden '>
            <Split className='h-full mb-0'  direction='vertical' sizes={[60, 40]} minSize={100}>
                <div className='w-full h-full overflow-auto border border-neutral-500 rounded-xl bg-neutral-800'>
                    <PlaygroundHeader 
                        settings={settings} 
                        setSettings={setSettings} 
                        language={language} 
                        setLanguage={setLanguage} 
                        theme={theme} 
                        setTheme={setTheme} 
                        themeOptions={themeOptions} 
                    />
                    <CodeMirror
                        value={userCode}
                        theme={themeMap[theme.value]}
                        onChange={onChange}
                        extensions={extensions}
                        style={{ fontSize: settings.fontSize }}
                    />
                </div>
                {
                    runCodeLoading ?
                        <div role="status" class="animate-pulse overflow-hidden h-full p-2 w-full border rounded-xl border-neutral-500 bg-neutral-800">
                            <div class="h-7 bg-neutral-200 rounded dark:bg-neutral-700 w-48 mt-4 mb-4"></div>
                            <div class="flex gap-2.5 mb-4 mt-4">
                                <div class="h-7 bg-gray-200 rounded dark:bg-neutral-700 w-40"></div>
                                <div class="h-7 bg-gray-200 rounded dark:bg-neutral-700 w-40"></div>
                                <div class="h-7 bg-gray-200 rounded dark:bg-neutral-700 w-40"></div>
                            </div>
                            <div class="h-5  bg-gray-200 rounded dark:bg-neutral-700 w-28   mb-2.5"></div>
                            <div class="h-8 bg-gray-200 rounded dark:bg-neutral-700 w-full mb-4"></div>
                            <div class="h-4  bg-gray-200 rounded dark:bg-neutral-700 w-28   mb-2.5"></div>
                            <div class="h-8 bg-gray-200 rounded dark:bg-neutral-700 w-full mb-4"></div>
                            <span class="sr-only">Loading...</span>
                        </div>

                        : <div className='w-full px-5 overflow-auto rounded-xl border border-neutral-500 bg-neutral-800'>
                            <div className='flex h-10 items-center space-x-6'>
                                <div className='relative flex h-full flex-col justify-center cursor-pointer'>
                                    <div className='text-[16px] font-medium leading-5 text-white'>Testcases</div>
                                    <hr className='absolute bottom-0 h-0.5 w-full rounded-full border-none bg-white' />
                                </div>

                            </div>
                            {
                                codeError &&
                                <div className={`font-semibold mt-4  text-[20px] text-red-500`}>
                                    Runtime Error
                                </div>
                            }
                            {status && (numOfTestCaseShow === problem.examples.length) && (
                                <div className={`font-semibold text-[20px] mt-4 ${status === 'Accepted' ? 'text-green-500' : 'text-red-500'}`}>
                                    {status}
                                </div>
                            )}
                            <div className='flex'>
                                {new Array(problem !== '' ? numOfTestCaseShow : 2).fill(1).map((example, index) => (
                                    <div
                                        className='mr-2 items-start mt-2 '
                                        key={index}
                                        onClick={() => setActiveTestCaseId(index)}
                                    >
                                        {!codeError &&
                                            <div className={`flex flex-wrap items-center gap-y-4  ${activeTestCaseId === index ? 'bg-neutral-700' : ''} rounded-md`}>
                                                <div
                                                    className={`font-medium items-center transition-all focus:outline-none 
                                            inline-flex bg-dark-fill-3 hover:bg-dark-fill-2 relative rounded-lg px-4 py-1 
                                            cursor-pointer whitespace-nowrap text-white
                                        `}
                                                >
                                                    {output && yourOutput.length > 0 && yourOutput[0].error === undefined && (
                                                        <span className={`mr-2 w-1 h-1 rounded ${isTestCasePassed(yourOutput, problem, index) ? 'bg-green-500' : 'bg-red-500'}`} />
                                                    )}
                                                    Case {index + 1}
                                                </div>
                                            </div>
                                        }
                                    </div>
                                ))}
                            </div>
                            <div className='font-semibold my-4'>
                                <p className='text-sm font-medium mt-4 text-white'>Input:</p>
                                <div className='w-full cursor-text rounded-lg border px-3 py-[10px]  border-transparent text-white mt-2 bg-neutral-700 '>
                                    {problem.examples[activeTestCaseId].input.nums !== undefined && (<span>    nums = {JSON.stringify(problem.examples[activeTestCaseId].input.nums)}</span>)}
                                    {problem.examples[activeTestCaseId].input.target !== undefined && (<span>  target = {JSON.stringify(problem.examples[activeTestCaseId].input.target)}</span>)}
                                    {problem.examples[activeTestCaseId].input.nums1 !== undefined && (<span>   nums1 = {JSON.stringify(problem.examples[activeTestCaseId].input.nums1)}</span>)}
                                    {problem.examples[activeTestCaseId].input.nums2 !== undefined && (<span>   nums2 = {JSON.stringify(problem.examples[activeTestCaseId].input.nums2)}</span>)}
                                    {problem.examples[activeTestCaseId].input.head !== undefined && (<span>    head = {JSON.stringify(problem.examples[activeTestCaseId].input.head)}</span>)}
                                    {problem.examples[activeTestCaseId].input.pos !== undefined && (<span>     pos = {JSON.stringify(problem.examples[activeTestCaseId].input.pos)}</span>)}
                                </div>
                                {output &&
                                    <>
                                        <p className='text-sm font-medium mt-4 text-white'>Output:</p>
                                        <div className='w-full cursor-text rounded-lg border px-3 py-[10px]  border-transparent text-white mt-2 bg-neutral-700'>
                                            {!codeError ? yourOutput.length > 0 && yourOutput[activeTestCaseId]?.error === undefined &&
                                                (yourOutput[activeTestCaseId].output === true ? 'true'
                                                    : yourOutput[activeTestCaseId].output === false ? 'false' : JSON.stringify(yourOutput[activeTestCaseId].output)
                                                )
                                                : <span className="text-red-500">{yourOutput[yourOutput.length - 1]?.error}</span>}

                                        </div>
                                        <p className='text-sm font-medium mt-4 text-white'>Expected:</p>
                                        <div className='w-full cursor-text rounded-lg border px-3 py-[10px]  border-transparent text-white mt-2 bg-neutral-700'>
                                            {JSON.stringify(problem.examples[activeTestCaseId].output)}
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                }
            </Split>
            <EditorFooter handleSubmit={handleSubmit} handleRun={handleRun} disabled={codeError} />
        </div>
    )
}

export default Playground
