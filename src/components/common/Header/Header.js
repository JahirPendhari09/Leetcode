import React from 'react';
import { Link } from 'react-router-dom';
import Timer from '../Timer/Timer';
import avatar from '../../../images/Jahir_Image.png'

const Header = () => {
 
  return (
    <nav className='relative flex h-[50px] w-full shrink-0 items-center px-5 bg-neutral-600'>
      <div className={`flex w-full items-center justify-between 'max-w-[1200px] mx-auto' `}>
        {/* className='h-[50px] flex-1 mt-2'>
          <img src='https://glaxom.com/wp-content/themes/glaxom/assets/images/glaxom.svg' alt='Logo' height={50} width={140} />
        </Link> */}
        <Link to='/' className='text-green-500 text-xl font-bold'>LeetCode Logo</Link>

        <div className='flex items-center space-x-4 flex-1 justify-end'>
          <div>
            <a
              href='https://www.buymeacoffee.com/burakorkmezz'
              target='_blank'
              rel='noreferrer'
              className='bg-dark-fill-3 py-1.5 px-3 cursor-pointer rounded text-white'
            >
              Premium
            </a>
          </div>
          <Timer />
          <div className='cursor-pointer group relative'>
            <img src={avatar} alt='Avatar' width={30} height={30} className='rounded-full' />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
