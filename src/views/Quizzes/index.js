import React, { useEffect, useState } from 'react'
import { FaReact, FaAngular, FaGitAlt, FaHtml5 } from "react-icons/fa"
import { SiTypescript, SiApollographql, SiCss3 } from "react-icons/si"
import { IoBagOutline, IoLogoJavascript, IoWarning } from "react-icons/io5"
import { CiCircleCheck } from "react-icons/ci"
import { RiNextjsFill } from "react-icons/ri"
import { DiIonic } from "react-icons/di"
import { Modal } from '../../components/Modals/Modal'
import { VscDebugStart } from "react-icons/vsc"

const languages = [
  {
    name: 'react',
    label: 'React',
    logo: 'FaReact',
    color: '#22d3ee',
    completed: true
  },
  {
    name: 'typescript',
    label: 'TypeScript',
    logo: 'SiTypescript',
    color: '#2563eb',
    completed: false
  },
  {
    name: 'angular',
    label: 'Angular',
    logo: 'FaAngular',
    color: '#dc2626',
    completed: false
  },
  {
    name: 'apollo graphQL',
    label: 'Apollo GraphQL',
    logo: 'SiApollographql',
    color: '#10b981',
    completed: false
  },
  {
    name: 'git',
    label: 'Git',
    logo: 'FaGitAlt',
    color: '#dc2626',
    completed: false
  },
  {
    name: 'javascript',
    label: 'JavaScript',
    logo: 'IoLogoJavascript',
    color: '#eab308',
    completed: false
  },
  {
    name: 'html',
    label: 'HTML',
    logo: 'FaHtml5',
    color: '#f97316',
    completed: false
  },
  {
    name: 'css',
    label: 'CSS',
    logo: 'SiCss3',
    color: '#0ea5e9',
    completed: false
  },
  {
    name: 'ionic',
    label: 'Ionic',
    logo: 'DiIonic',
    color: '#60a5fa',
    completed: false
  },
  {
    name: 'next.js',
    label: 'NEXTJS',
    logo: 'RiNextjsFill',
    color: '#0f172a',
    completed: false
  }
]

const iconsMap = {
  FaReact: FaReact,
  SiTypescript: SiTypescript,
  FaAngular: FaAngular,
  SiApollographql: SiApollographql,
  FaGitAlt: FaGitAlt,
  IoLogoJavascript: IoLogoJavascript,
  FaHtml5: FaHtml5,
  SiCss3: SiCss3,
  DiIonic: DiIonic,
  RiNextjsFill: RiNextjsFill
}

const Quizzes = () => {
  const [role] = useState('Web Frontend')
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState({ name: '', logo: '', id: '' })

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleStartQuiz = (name) => {
    setIsModalOpen(true);
    const filteredLanguage = languages.filter(item => item.name === name)
    setSelectedQuiz(filteredLanguage[0])
  }
  useEffect(() => {

  }, [selectedQuiz])
  const SelectedLangIcon = iconsMap[selectedQuiz.logo]
  console.log(SelectedLangIcon)
  return (
    <>
      <div className='w-full p-2 mt-5'>
        <div className='flex gap-4 items-center w-[95%] m-auto' >
          <p className='text-2xl font-bold'>Core quizzes</p>
          <div className='flex gap-1 items-center bg-gray-100 p-2 rounded'>
            <IoBagOutline />
            <span>Role : {role}</span>
          </div>
        </div>
        <div className='w-[95%] m-auto mt-6 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
          {languages.map((curr, i) => <LanguageCard key={i} {...curr} handleStartQuiz={handleStartQuiz} />)}
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className=" w-[280px] md:w-[700px] lg:w-[800px]">
          <h2 className="font-bold mb-4 text-xl uppercase">
            Glaxom Quizzes
          </h2>
          <hr />
          <div className='flex items-center gap-2 mt-4 mb-4 '>
            {SelectedLangIcon && <SelectedLangIcon size={60} color={selectedQuiz.color} />}
            <h2 className='font-bold text-2xl'>{selectedQuiz.label}</h2>
          </div>
          <p>This quiz is your next step towards TypeScript</p>
          <br />
          <div>
            <h3 className='font-bold text-[16px]'>Fair assessment policy</h3>
            <p>To ensure fairness, we track browser activity and submission patterns to detect any signs of cheating during the test attempt.</p>
            <br />
            <p>During the test attempt, DO NOT:</p>
            <div className='ml-4'>
              <li>Open new browser tabs or windows</li>
              <li>Capture screenshots</li>
              <li>Conduct any online searches for answers</li>
              <li>Utilize any tools to answer questions (such as ChatGPT, browser plugins, etc.</li>
            </div>
            <div className='mt-2 p-2 rounded flex items-center justify-center gap-3' style={{ backgroundColor: '#fefce8', border: '1px solid #fde68a' }}>
              <IoWarning color='#eab308' size={26} />
              <p>Violation of this policy can result in a temporary or permanent ban from the platform.</p>
            </div>
          </div>
        </div>
        <hr className='mt-4' />
        <div className="py-4 flex items-center justify-end gap-4 mt-4">
          <div className='flex gap-1 items-center justify-center bg-gray-100 p-2 rounded cursor-pointer'>
            <div>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                width='1em'
                height='1em'
                fill='currentColor'
                className='h-6 w-6'
                color='black'
              >
                <path
                  fillRule='evenodd'
                  d='M12 4a9 9 0 110 18 9 9 0 010-18zm0 2a7 7 0 100 14 7 7 0 000-14zm0 1.634a1 1 0 01.993.883l.007.117-.001 3.774 2.111 1.162a1 1 0 01.445 1.253l-.05.105a1 1 0 01-1.254.445l-.105-.05-2.628-1.447a1 1 0 01-.51-.756L11 13V8.634a1 1 0 011-1zM16.235 2.4a1 1 0 011.296-.269l.105.07 4 3 .095.08a1 1 0 01-1.19 1.588l-.105-.069-4-3-.096-.081a1 1 0 01-.105-1.319zM7.8 2.4a1 1 0 01-.104 1.319L7.6 3.8l-4 3a1 1 0 01-1.296-1.518L2.4 5.2l4-3a1 1 0 011.4.2z'
                  clipRule='evenodd'
                ></path>
              </svg>
            </div>
            <p>Max. Time 30 min</p>
          </div>
          <div className='flex gap-2 bg-blue-500 p-2 rounded text-white items-center  cursor-pointer'>
            <VscDebugStart color='white' />
            <button> Accept & Start Quiz </button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default Quizzes

const LanguageCard = ({ name, label, logo, color, completed, handleStartQuiz }) => {
  const IconComponent = iconsMap[logo]
  return (
    <div className='w-full border-2 rounded-xl h-[270px] grid items-center justify-center pt-5 pb-5'>
      <div className='flex justify-center'>
        {IconComponent && <IconComponent color={color} size={60} />}
      </div>
      <p className='text-center font-bold'>{label}</p>
      {
        completed ?
          <>
            <div className='bg-green-100 p-1 flex gap-1 items-center rounded'>
              <CiCircleCheck />
              <p>Passed</p>
            </div>
            <p>Completed</p>
          </>
          :
          <>
            <div className='flex gap-1 items-center justify-center'>
              <div className='cursor-pointer'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  width='1em'
                  height='1em'
                  fill='currentColor'
                  className='h-6 w-6'
                  color='black'
                >
                  <path
                    fillRule='evenodd'
                    d='M12 4a9 9 0 110 18 9 9 0 010-18zm0 2a7 7 0 100 14 7 7 0 000-14zm0 1.634a1 1 0 01.993.883l.007.117-.001 3.774 2.111 1.162a1 1 0 01.445 1.253l-.05.105a1 1 0 01-1.254.445l-.105-.05-2.628-1.447a1 1 0 01-.51-.756L11 13V8.634a1 1 0 011-1zM16.235 2.4a1 1 0 011.296-.269l.105.07 4 3 .095.08a1 1 0 01-1.19 1.588l-.105-.069-4-3-.096-.081a1 1 0 01-.105-1.319zM7.8 2.4a1 1 0 01-.104 1.319L7.6 3.8l-4 3a1 1 0 01-1.296-1.518L2.4 5.2l4-3a1 1 0 011.4.2z'
                    clipRule='evenodd'
                  ></path>
                </svg>
              </div>
              <p>30 min</p>
            </div>
            <button onClick={() => handleStartQuiz(name)} className='w-[100px] md:w-[150px] lg:w-[200px]  border-2 border-blue-500 p-2 rounded-md text-blue-600 font-bold '>Start Quiz</button>
          </>
      }
    </div>
  )
}