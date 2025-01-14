import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import { LuListTodo } from "react-icons/lu"
import Timer from '../Timer/Timer';
import avatar from '../../../images/Jahir_Image.png'
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { changeTab, logoutUser } from '../../../redux/action';
import { iconsList } from '../../../static/profile';
import { IoClose, IoSettingsOutline } from "react-icons/io5";
import { PiSignOutFill } from "react-icons/pi";
import { MdOutlineEventNote } from "react-icons/md";
import { MdOutlineQueuePlayNext } from "react-icons/md";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { Modal } from '../../Modals/Modal';
import { sendOtpOnEmail, verifyOtpOnEmail } from '../../../services/auth';
import { VERIFY_EMAIL } from '../../../redux/actionTypes';


const menuItems = [
  { icon: MdOutlineAddCircleOutline, label: "Try New Features" },
  { icon: MdOutlineEventNote, label: "Orders" },
  { icon: MdOutlineQueuePlayNext, label: "My Playgrounds" },
  { icon: IoSettingsOutline, label: "Settings" },
  { icon: MdOutlineMarkEmailRead, label: "Email" },
  { icon: PiSignOutFill, label: "Sign Out" },
];


const Header = () => {
  const dispatch = useDispatch()
  const store = useSelector(store => store.reducer)
  const navigate = useNavigate()
  const tab = store.currTab
  const location = useLocation()
  const [problemExist, setProblemExist] = useState(false)
  const { auth, isEmailVerified, email, username } = useSelector(store => store.reducer)
  const [showUser, setShowUser] = useState(false)
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [emailSended, setEmailSended] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const inputRefs = useRef([]);
  const [time, setTime] = useState(300);
  const [showToolTip, setShowToolTip] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const { pathname } = location
    pathname.includes('/problemset/') ? setProblemExist(true) : setProblemExist(false)
  }, [location])

  useEffect(() => {
    setIsSubmitEnabled(otp.every((digit) => digit !== ""));
  }, [otp]);

  const handleTab = (selectedTab) => {
    dispatch(changeTab(selectedTab))
  }
  const handleLoginClick = () => {
    navigate('/login', { state: { from: location } })
  }
  const handleSignupClick = () => {
    navigate('/signup', { state: { from: location } })
  }
  const handleLogout = () => {
    dispatch(logoutUser())
    setShowUser(false)
  }

  const handleVerifyEmail = () => {
    if (isEmailVerified) return
    setShowEmailModal(true)
    setShowUser(false)
  }

  const handleMenuClick = (label) => {
    switch (label) {
      case 'Sign Out': {
        return handleLogout()
      }
      case 'Email': {
        return handleVerifyEmail()
      }
      default: {
        return null
      }
    }
  }

  const handleOTPChange = (index, value) => {
    if (value.length > 1) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleOTPKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      const updatedOtp = [...otp];
      updatedOtp[index - 1] = "";
      setOtp(updatedOtp);
      inputRefs.current[index - 1].focus();
    }
  };

  const handleOTPSubmit = async () => {
    setLoading(true)
    try {
      const userDetails = {
        username,
        email: email || userEmail,
        otp: Number(otp.join(''))
      }
      const response = await verifyOtpOnEmail(userDetails)
      setLoading(false)
      if(response.status === 200) {
        dispatch({ type: VERIFY_EMAIL })
        setShowEmailModal(false)
        setShowToolTip('Email address verified successfully.')
        navigate('/' ,{ state: { from: location }} )
      }else{
        setShowToolTip(response.response.data.message)
      }
    } catch (err) {
      setLoading(false)
      console.log('Error while sending email: ', err)
    }
  };

  const handleResendOTP = () => {
    if (time > 0) return
    setOtp(["", "", "", ""])
    setTime(300)
    handleOtpSendClick()
  }

  const handleTimmer = () => {
    if (time <= 0) return
    setTime((time) => time - 1)
  }

  const handleCloseModal = () => {
    setEmailSended(false)
    setShowEmailModal(false)
    setUserEmail('')
    setLoading(false)
    setShowToolTip('')
  }

  const handleOtpSendClick = async () => {
    setLoading(true)
    try {
      const userDetails = {
        username,
        email: email || userEmail
      }
      await sendOtpOnEmail(userDetails)
      setShowToolTip('The OTP has been sent to your email.')
      setEmailSended(true)
      setLoading(false)
    } catch (err) {
      setLoading(false)
      console.log('Error while sending email: ', err)
    }
  }

  useEffect(() => {
    if (showToolTip) {
      let timmer = setTimeout(() => {
        setShowToolTip('')
      }, 10000)

      return () => clearTimeout(timmer)
    }
  }, [showToolTip])
  return (
    <>
      <nav className={`relative flex  w-full shrink-0 items-center  ${problemExist ? 'h-[50px] px-2' : ' h-[50px] bg-neutral-800 border-b border-neutral-600  px-5 '}  text-neutral-400`}>
        <div className={`flex w-full items-center justify-between ${problemExist ? '' : 'max-w-[1150px]'}  mx-auto  p-1 `}>
          <div className='hidden md:flex lg:flex gap-6 justify-center items-center text-[16px] font-medium'>
            <Link to='/'>
              <img src='https://upload.wikimedia.org/wikipedia/commons/8/8e/LeetCode_Logo_1.png' className='w-8 h-8' alt='link' />
            </Link>
            {
              !problemExist ? <>
                <Link to='/' className={`${tab === 1 ? 'tabs' : ''}`} onClick={() => handleTab(1)}>Explore</Link>
                <Link to='/problemset' className={`${tab === 2 ? 'tabs' : ''}`} onClick={() => handleTab(2)}>Problems</Link>
                <Link to='/' className={`${tab === 3 ? 'tabs' : ''}`} onClick={() => handleTab(3)}>Contest</Link>
                <Link to='/' className={`${tab === 4 ? 'tabs' : ''}`} onClick={() => handleTab(4)}>Discuss</Link>
                <Link to='/' className={`${tab === 5 ? 'tabs' : ''}`} onClick={() => handleTab(5)}>Interview</Link>
                <div className='flex gp-4 items-center text-yellow-600 '>
                  <Link to='/'>Store </Link>
                  <span> <MdOutlineKeyboardArrowDown /></span>
                </div>
              </>
                :
                <>
                  <Link to='/'><LuListTodo /></Link>
                  <Link to='/problemset' className='text-white text-[16px] -ml-3' onClick={() => handleTab(2)}>Problem List</Link>
                  <Link to='/problemset' className='-ml-3'><IoIosArrowBack /></Link>
                  <Link to='/problemset' className='-ml-3'><IoIosArrowForward /></Link>
                </>
            }
          </div>
          <div className='md:hidden sm:flex lg:hidden'>
            <Link to='/'>
              <img src='https://upload.wikimedia.org/wikipedia/commons/8/8e/LeetCode_Logo_1.png' alt='leetcode-logo' className='w-8 h-8' />
            </Link>
          </div>
          <div className='flex items-center space-x-4 flex-1 justify-end'>
            {problemExist && <Timer />}
            {auth
              ? <div className='cursor-pointer group relative'>
                <img src={avatar} alt='Avatar' width={26} height={26} className='rounded-full' onClick={() => setShowUser(!showUser)} />
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
      {showUser && <div className={`flex w-full relative ${problemExist ? '' : 'max-w-[1150px]'}  mx-auto p-1 `}>
        <div className='w-full h-full flex justify-end '>
          <div className='w-[310px] h-[550px] absolute bg-zinc-700 z-50 border-2 border-neutral-800 rounded-2xl p-4 '>
            <div className='flex gap-4 '>
              <div className='cursor-pointer group relative'>
                <img src={avatar} alt='Avatar' width={60} height={60} className='rounded-full' />
              </div>
              <div>
                <h2 className='font-bold'>Jahir Pendhari</h2>
                <p className='text-[12px]  text-amber-500'>Access all features with our</p>
                <p className='text-[12px]  text-amber-500'>Premium subscription!</p>
              </div>
            </div>
            <div className='flex flex-wrap gap-3 mt-6'>
              {iconsList?.length > 0 && iconsList.map((item) => (
                <ListBarItem {...item} key={item} />
              ))}
            </div>
            <div className="flex flex-col mt-4">
              {menuItems.map((item, index) => (
                <MenuItem key={index} icon={item.icon} label={item.label} handleMenuClick={handleMenuClick} isEmailVerified={isEmailVerified} />
              ))}
            </div>
          </div>
        </div>
      </div>}

      <Modal isOpen={showEmailModal} onClose={handleCloseModal}>
        <div className="w-[400px] bg-neutral-800 rounded p-5">
          <div className="p-4 flex flex-col items-center">
            <h2 className="text-2xl font-bold text-white">Verify Your Email</h2>
            <p className="mt-4 text-gray-300">
              {!emailSended
                ? `Hi Jahir, please verify your email address by clicking the button below.`
                : `Enter the 4-digit code sent to your email address.`
              }
            </p>
            <div className="my-3 w-full">
              {emailSended ? (
                <div className="p-2 w-full">
                  <div className="flex gap-4 w-full justify-center mt-4">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        type="text"
                        value={digit}
                        onChange={(e) => handleOTPChange(index, e.target.value)}
                        onKeyDown={(e) => handleOTPKeyDown(index, e)}
                        ref={(el) => (inputRefs.current[index] = el)}
                        className="w-10 text-black h-10 text-center border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        maxLength={1}
                        autoFocus={index === 0}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <label htmlFor="email" className="block text-gray-300 mb-2">
                    Your Email Address
                  </label>
                  {email ? (
                    <p className="mt-2 text-gray-300">{email}</p>
                  ) : (
                    <input
                      id="email"
                      type="email"
                      placeholder="Please enter your email address here"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      className="w-full text-black p-2 border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  )}
                </div>
              )}
            </div>

            <div className="mt-4 flex gap-6 items-center">
              {emailSended && (
                <button
                  className={`p-3 rounded bg-green-700 text-white transition flex gap-2 items-center
                    ${isSubmitEnabled && !loading ? "hover:bg-green-800" : "opacity-50 cursor-not-allowed"}`
                  }
                  onClick={handleOTPSubmit}
                  disabled={!isSubmitEnabled || loading}
                >
                  {loading && <p className='loader'></p>} Submit
                </button>
              )}
              {emailSended ? (
                <>
                  <button
                    className={`p-3 rounded border-green-500 border-2 text-white transition
                    ${time > 0 ? "opacity-50 cursor-not-allowed" : 'hover:bg-green-800'}
                  `}
                    onClick={handleResendOTP}
                    disabled={time > 0}
                  >
                    Resend OTP
                  </button>
                  <div>
                    <Timer time={time} setTime={handleTimmer} />
                  </div>
                </>
              ) :
                (<button
                  onClick={handleOtpSendClick}
                  className={`p-3 rounded bg-green-700 text-white transition flex gap-2 items-center
                        ${!loading && (email || userEmail) ? "hover:bg-green-800" : "opacity-50 cursor-not-allowed"}`
                  }
                  disabled={loading || (email ? false : !userEmail)}
                >
                  {loading && <p className='loader'></p>} Verify My Email
                </button>
                )
              }
            </div>

            {showToolTip !== '' && (
              <div className="w-full flex justify-start mt-4">
                <div className="text-sm p-2 border border-green-400 rounded flex items-center gap-4">
                  <p>{showToolTip}</p>
                  <span
                    className="cursor-pointer"
                    onClick={() => setShowToolTip('')}
                    aria-label="Close alert"
                  >
                    <IoClose size={20} />
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Header;

const ListBarItem = ({ src, text, id }) => {
  return (
    <div className='flex flex-col items-center p-4 rounded-xl bg-neutral-800 w-[83px]' key={id}>
      <img src={src} alt={text} width={35} height={35} />
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
    {label === 'Email' && <p className={`text-sm  ${isEmailVerified ? 'text-green-500' : 'text-red-500'}`}> {isEmailVerified ? 'Verified' : 'Not Verified'}</p>}
  </div>
);