import { useEffect, useState } from "react"
import Split from "react-split"
import CodeMirror from "@uiw/react-codemirror"
import { javascript } from "@codemirror/lang-javascript"
import { autocompletion } from "@codemirror/autocomplete"
import EditorFooter from "./EditorFooter"
import useLocalStorage from '../../../hooks/useLocalStorage'
import { LANGUAGES, languageMap, themeMap, themeOptions } from "../../../static/editor"
import PlaygroundHeader from "./PlaygroundHeader"
import { postCode } from "../../../services/platform"

const Playground = ({ problem,setSolved }) => {
    const [extensions, setExtensions] = useState([javascript(), autocompletion()])
    const [activeTestCaseId, setActiveTestCaseId] = useState(0)
    const [fontSize] = useLocalStorage("lcc-fontSize", "16px")
    const [language, setLanguage] = useState(LANGUAGES[0])
    const [theme, setTheme] = useState(themeOptions[0])
    const [yourOutput, setYourOutput] = useState([])
    const [output, setOutput] = useState(false)
    let [userCode, setUserCode] = useState()
    const [status, setStatus] = useState(true)
    const [currBoilerPlate, setCurrBoilerPlate] = useState({})
    const [numOfTestCaseShow , setNumOfTestCsesShow] = useState(2)
    const [codeError , setCodeError ] = useState(false)

    const [settings, setSettings] = useState({
        fontSize: fontSize,
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
        while ((match = functionRegex.exec(code)) !== null) {
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
        if(yourOutput[index]?.error !== undefined){
            if(!codeError) setCodeError(true)
            return false
        }
        if(codeError) setCodeError(false)
        return ((typeof yourOutput[index]?.output === 'object')
            ?  JSON.stringify(problem.examples[index].output) === JSON.stringify(yourOutput[index]?.output)
            :  yourOutput[index]?.output === problem.examples[index].output
        )
    }

    const handleSubmit = async () => {
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
                'function': functionsAndParameter
            }
            postCode(payload).then(res => {
                console.log(res,'res')
                setYourOutput(res.data.results)
                const allPassed = res.data.results.every((result, index) => isTestCasePassed(res.data.results, problem, index))
                setSolved(allPassed ? true : false)
                setStatus(allPassed ? 'Accepted' : 'Wrong Answer')
                setNumOfTestCsesShow(problem.examples.length)
                setOutput(true)
        
            }).catch(err => err)
        }
    }
    const handleRun = async () => {
        
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
                'function': functionsAndParameter
            }
            postCode(payload).then(res => {
                setYourOutput(res.data.results)
                const allPassed = res.data.results.every((result, index) => isTestCasePassed(res.data.results, problem, index))
                setStatus(allPassed ? 'Accepted' : 'Wrong Answer')
                setNumOfTestCsesShow(2)
                setOutput(true)
            }).catch(err => err)
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
        <div className='flex flex-col bg-dark-layer-1 relative overflow-x-hidden'>
            <PlaygroundHeader settings={settings} setSettings={setSettings} language={language} setLanguage={setLanguage} theme={theme} setTheme={setTheme} themeOptions={themeOptions} />
            <Split className='h-[calc(100vh-94px)]' direction='vertical' sizes={[60, 40]} minSize={60}>
                <div className='w-full overflow-auto'>
                    <CodeMirror
                        value={userCode}
                        theme={themeMap[theme.value]}
                        onChange={onChange}
                        extensions={extensions}
                        style={{ fontSize: settings.fontSize }}
                    />
                </div>
                <div className='w-full px-5 overflow-auto'>
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
                    { status && (numOfTestCaseShow === problem.examples.length) && (
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
                               { !codeError && 
                                <div className={`flex flex-wrap items-center gap-y-4  ${activeTestCaseId === index ? 'bg-neutral-700' : ''} rounded-md`}>
                                    <div
                                        className={`font-medium items-center transition-all focus:outline-none 
                                            inline-flex bg-dark-fill-3 hover:bg-dark-fill-2 relative rounded-lg px-4 py-1 
                                            cursor-pointer whitespace-nowrap text-white
                                        `}
                                    >
                                        { output && yourOutput.length > 0 && yourOutput[0].error === undefined && (
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
                                    { !codeError ? yourOutput.length > 0 && yourOutput[activeTestCaseId]?.error === undefined &&
                                        ( yourOutput[activeTestCaseId].output === true ? 'true'
                                            :  yourOutput[activeTestCaseId].output === false ? 'false' : JSON.stringify(yourOutput[activeTestCaseId].output) 
                                        )
                                      :  <span className="text-red-500">{yourOutput[yourOutput.length-1]?.error}</span>}

                                </div>
                                <p className='text-sm font-medium mt-4 text-white'>Expected:</p>
                                <div className='w-full cursor-text rounded-lg border px-3 py-[10px]  border-transparent text-white mt-2 bg-neutral-700'>
                                    {JSON.stringify(problem.examples[activeTestCaseId].output)}
                                </div>
                            </>
                        }
                    </div>
                </div>
            </Split>
            <EditorFooter handleSubmit={handleSubmit} handleRun ={handleRun} disabled = {codeError}/>
        </div>
    )
}

export default Playground
