import React from 'react';
import Link from 'next/link';

interface Props {}

export const TopicItem = ({}: Props) => {
  return (
    <div
      className="bg-gray-300 shadow-lg flex flex-col items-center justify-evenly rounded-xl
                    w-auto h-[40vh] mx-[3%]
                    md:w-80 md:h-80 md:m-[3%] md:hover:relative md:hover:scale-110 md:transition"
    >
      <div className="bg-white w-[90%] h-[60%] rounded-xl p-[3%] overflow-hidden">
        <Link href={`/topics/${1}`}>Rendering screen component</Link>
      </div>
      <div className="w-[90%] h-[25%] flex justify-evenly">
        <img
          className="bg-white rounded-xl"
          src="../public/images/icons/logo_icon.png"
          alt=" user Image"
        />
        <div className="pl-[5%] w-[65%] flex flex-col justify-between">
          <div
            className="bg-white text-xl h-[50%] rounded-xl p-[2%]
                        md:hover:text-green-300 md:hover:transition"
          >
            title
          </div>
          <div className="bg-white text-base h-auto rounded-lg p-[1%]">
            nickname
          </div>
        </div>
      </div>
    </div>
  );
};
