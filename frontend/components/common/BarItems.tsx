import React from 'react';

interface Prop {
  isHovered: boolean
}

export const BarItems: React.FC<Prop> = ({ isHovered }) => {

  const HoverBarItems = isHovered ?
    <>
      <div>New</div>
      <div>Search</div>
      <div>Username/Login</div>
    </>
    :
    <>
      <div>N</div>
      <div>S</div>
      <div>U</div>
    </>


  return (
    <div className='bg-inherit 
                    absolute top-20 right-0 h-screen w-1/2 
                    md:static md:h-auto md:w-auto'>
      { HoverBarItems }
    </div>
  );
};
