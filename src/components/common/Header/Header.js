import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import { LuListTodo } from "react-icons/lu"
import Timer from '../Timer/Timer';
import avatar from '../../../images/Jahir_Image.png'
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { changeTab, logoutUser, verifyUserEmail } from '../../../redux/action';
import { iconsList } from '../../../static/profile';
import { IoSettingsOutline } from "react-icons/io5";
import { PiSignOutFill } from "react-icons/pi";
import { MdOutlineEventNote } from "react-icons/md";
import { MdOutlineQueuePlayNext } from "react-icons/md";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { MdOutlineMarkEmailRead  } from "react-icons/md";


const menuItems = [
  { icon: MdOutlineAddCircleOutline, label: "Try New Features" },
  { icon: MdOutlineEventNote, label: "Orders" },
  { icon: MdOutlineQueuePlayNext, label: "My Playgrounds" },
  { icon: IoSettingsOutline, label: "Settings" },
  { icon: MdOutlineMarkEmailRead  , label: "Email" },
  { icon: PiSignOutFill, label: "Sign Out" },
]; 


const Header = () => {
  const dispatch = useDispatch()
  const store = useSelector(store => store.reducer)
  const navigate = useNavigate()
  const tab = store.currTab
  const location = useLocation()
  const [problemExist , setProblemExist] = useState(false)
  const {auth, isEmailVerified} = useSelector(store => store.reducer)
  const [showUser, setShowUser] = useState(false)

  useEffect(() => {
    const { pathname } = location
    pathname.includes('/problemset/') ? setProblemExist(true) : setProblemExist(false)
  }, [location])
 
  const handleTab = (selectedTab) => {
    dispatch(changeTab(selectedTab))
  }
  const handleLoginClick = () => {
    navigate('/login' ,{ state: { from: location } }  )
  }
  const handleSignupClick = () => {
    navigate('/signup' ,{ state: { from: location } }  )
  }
  const handleLogout = () => {
    dispatch(logoutUser())
    setShowUser(false)
  }

  const handleVerifyEmail = () => {
    if(isEmailVerified) return 
    dispatch(verifyUserEmail())
  }

  const handleMenuClick = (label) => {
    switch(label) {
      case 'Sign Out': {
        return handleLogout()
      }
      case 'Email': {
        return handleVerifyEmail()
      }
      default : {
        return null
      }
    }
  }
  return (
    <>
    <nav className={`relative flex  w-full shrink-0 items-center  ${problemExist ? 'h-[50px] px-2' :' h-[50px] bg-neutral-800 border-b border-neutral-600  px-5 '}  text-neutral-400`}>
      <div className={`flex w-full items-center justify-between ${problemExist ? '' : 'max-w-[1150px]'}  mx-auto  p-1 `}>
        <div className='hidden md:flex lg:flex gap-6 justify-center items-center text-[16px] font-medium'>
          <Link to='/'> 
            <img  src='https://upload.wikimedia.org/wikipedia/commons/8/8e/LeetCode_Logo_1.png' className='w-8 h-8'  alt='link'/>
          </Link>
          {
            !problemExist ? <>
              <Link to='/' className={`${tab === 1? 'tabs' : ''}`} onClick={()=> handleTab(1)}>Explore</Link>
              <Link to='/problemset' className={`${tab === 2? 'tabs' : ''}`} onClick={()=> handleTab(2)}>Problems</Link>
              <Link to='/' className={`${tab === 3? 'tabs' : ''}`} onClick={()=> handleTab(3)}>Contest</Link>
              <Link to='/' className={`${tab === 4? 'tabs' : ''}`} onClick={()=> handleTab(4)}>Discuss</Link>
              <Link to='/' className={`${tab === 5? 'tabs' : ''}`} onClick={()=> handleTab(5)}>Interview</Link>
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
            <img src='https://upload.wikimedia.org/wikipedia/commons/8/8e/LeetCode_Logo_1.png' alt='leetcode-logo' className='w-8 h-8'/>
          </Link>
        </div>
        <div className='flex items-center space-x-4 flex-1 justify-end'>
          { problemExist && <Timer />}
          { auth 
                ? <div className='cursor-pointer group relative'>
                    <img src={avatar} alt='Avatar' width={26} height={26} className='rounded-full' onClick={()=> setShowUser(!showUser)}/>
                  </div>
                : <div className='p-2 rounded-md flex gap-2'>
                    <div className='cursor-pointer' onClick={handleSignupClick}>Register</div>
                    <div>or</div>
                    <div className='cursor-pointer' onClick={handleLoginClick}>Sign in</div>
                  </div> 
          }
          <div className=' p-[5px] rounded-md font-medium bg-[#ffa11633] hover:bg-[#ffa1173f]  text-amber-500' >
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
    { showUser && <div className={`flex w-full relative ${problemExist ? '' : 'max-w-[1150px]'}  mx-auto p-1 `}>
      <div className='w-full h-full flex justify-end '>
        <div className='w-[310px] h-[550px] absolute bg-zinc-700 z-50 border-2 border-neutral-800 rounded-2xl p-4 '>
          <div className='flex gap-4 '>
            <div className='cursor-pointer group relative'>
              <img src={avatar} alt='Avatar' width={60} height={60} className='rounded-full'/>
            </div>
            <div>
              <h2 className='font-bold'>Jahir Pendhari</h2>
              <p className='text-[12px]  text-amber-500'>Access all features with our</p>
              <p className='text-[12px]  text-amber-500'>Premium subscription!</p>
            </div>
          </div>
          <div className='flex flex-wrap gap-3 mt-6'>
            {iconsList?.length > 0 && iconsList.map((item) => (
                <ListBarItem {...item} />
            ))}
          </div>
          <div className="flex flex-col mt-4">
            {menuItems.map((item, index) => (
              <MenuItem key={index} icon={item.icon} label={item.label} handleMenuClick={handleMenuClick} isEmailVerified ={isEmailVerified}/>
            ))}
          </div>
        </div>
      </div>
    </div>}
    </>
  );
};

export default Header;

const ListBarItem = ({src, text, id}) => {
  return (
    <div className='flex flex-col items-center p-4 rounded-xl bg-neutral-800 w-[83px]' key={id}>
      <img src={src} alt={text} width={35} height={35}/>
      <p className='text-[12px]'>{text}</p>
    </div>
  )
}

const MenuItem = ({ icon: Icon, label, handleMenuClick, isEmailVerified }) => (
  <div 
    onClick={() => handleMenuClick(label)}
    className="flex gap-3 items-center text-neutral-400 cursor-pointer rounded font-medium hover:bg-neutral-600 p-2"
  >
    <Icon size={20} />
    <p>{label}</p>
    { label === 'Email'  && <p className={`text-sm  ${isEmailVerified ? 'text-green-500' : 'text-red-500'}`}> {isEmailVerified ? 'Verified' : 'Not Verified'}</p>}
    
  </div>
);