import React from 'react';
import Link from 'next/link';

interface Props {
  isHovered: boolean
}

export const BarItems = ({ isHovered } : Props) => {

  const HoverBarItems = isHovered ?
    <>
      <Link href={"/topics"}><div>New</div></Link>
      <Link href={"/search"}><div>Search</div></Link>
      <div>Username/Login</div>
    </>
    :
    <>
      <Link href={"/topics"}><div>N</div></Link>
      <Link href={"/search"}><div>S</div></Link>
      <div>U</div>
    </>


  return (
    <div className='bg-inherit z-10
                    absolute top-full right-0 h-80 w-1/2 
                    md:static md:h-auto md:w-auto'>
      { HoverBarItems }
    </div>
  );
};
