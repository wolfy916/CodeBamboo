import React, { useState } from 'react';
import Link from 'next/link';
import useIsMobile from '@/hooks/useIsMobile';
import { BarItems } from './BarItems';

export const Bar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const ResponsiveBarItems = isMobile ? (
    <>
      <div onClick={handleMenuClick} className='h-full w-20 flex justify-center items-center'>
        <img src='/images/icons/menu_icon.png'/>
      </div>
      {isMenuOpen && <BarItems isHovered={true} />}
    </>
  ) : (
    <BarItems isHovered={isHovered} />
  );

  const Logo = 
  <Link href="/">
    {isMobile ? <img src="/images/icons/bar_icon.png" /> : <img src="/images/icons/logo_icon.png" className='mt-4' />}
  </Link>

  return (
    <aside
      className="relative flex text-center items-center  
                flex-row justify-between h-20 text-white bg-black
                md:flex-col md:justify-normal md:w-24 md:h-screen md:text-black md:bg-white
                md:hover:w-48 md:transition-w md:duration-500 md:ease-in-out"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      { Logo }
      { ResponsiveBarItems }
    </aside>
  );
};
