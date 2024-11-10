import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import { LuListTodo } from "react-icons/lu"
import Timer from '../Timer/Timer';
import avatar from '../../../images/Jahir_Image.png'
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { changeTab } from '../../../redux/action';

const Header = () => {
  const dispatch = useDispatch()
  const store = useSelector(store => store.reducer)
  // const [tab, setTab] = useState(store.currTab)
  const tab = store.currTab
  const location = useLocation()
  const [problemExist , setProblemExist] = useState(false)

  useEffect(() => {
    const { pathname } = location
    pathname.includes('/problemset/') ? setProblemExist(true) : setProblemExist(false)
  }, [location])
 
  const handleTab = (selectedTab) => {
    dispatch(changeTab(selectedTab))
  }
  return (
    <nav className={`relative flex  w-full shrink-0 items-center  ${problemExist ? 'h-[50px] px-2' :' h-[50px] bg-neutral-800 border-b border-neutral-600  px-5 '}  text-neutral-400`}>
      <div className={`flex w-full items-center justify-between ${problemExist ? '' : 'max-w-[1150px]'}  mx-auto  p-1 `}>
        <div className='hidden md:flex lg:flex gap-6 justify-center items-center text-[16px] font-medium'>
          <Link to='/'> 
            <img  src='https://upload.wikimedia.org/wikipedia/commons/8/8e/LeetCode_Logo_1.png' className='w-8 h-8'  alt='link'/>
          </Link>
          {
            !problemExist ? <>
              <Link to='/' className={`${tab == 1? 'tabs' : ''}`} onClick={()=> handleTab(1)}>Explore</Link>
              <Link to='/problemset' className={`${tab == 2? 'tabs' : ''}`} onClick={()=> handleTab(2)}>Problems</Link>
              <Link to='/' className={`${tab == 3? 'tabs' : ''}`} onClick={()=> handleTab(3)}>Contest</Link>
              <Link to='/' className={`${tab == 4? 'tabs' : ''}`} onClick={()=> handleTab(4)}>Discuss</Link>
              <Link to='/' className={`${tab == 5? 'tabs' : ''}`} onClick={()=> handleTab(5)}>Interview</Link>
              <div className='flex gp-4 items-center text-yellow-600 '>
                <Link to='/'>Store </Link>
                <span> <MdOutlineKeyboardArrowDown /></span>
              </div>
            </>
            : 
            <>
              <Link to='/'><LuListTodo/></Link>
              <Link to='/problemset' className='text-white text-[16px] -ml-3' onClick={()=> handleTab(2)}>Problem List</Link>
              <Link to='/problemset' className='-ml-3'><IoIosArrowBack /></Link>
              <Link to='/problemset' className='-ml-3'><IoIosArrowForward /></Link>
            </>
          }
        </div>
        <div className='md:hidden sm:flex lg:hidden'>
          <Link to='/'> 
            <img  src='https://upload.wikimedia.org/wikipedia/commons/8/8e/LeetCode_Logo_1.png' className='w-8 h-8'/>
          </Link>
        </div>
        <div className='flex items-center space-x-4 flex-1 justify-end'>
          {problemExist && <Timer />}
          <div className='cursor-pointer group relative'>
            <img src={avatar} alt='Avatar' width={26} height={26} className='rounded-full' />
          </div>
          <div className=' p-[5px] rounded-md font-medium bg-[#ffa11633] hover:bg-[#ffa1173f]  text-amber-500'>
            <a
              href='https://www.buymeacoffee.com/burakorkmezz'
              target='_blank'
              rel='noreferrer'
              className='bg-dark-fill-3 py-1.5 px-3 cursor-pointer rounded'
            >
              Premium
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
