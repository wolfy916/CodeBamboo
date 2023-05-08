import React, { useEffect, useState } from "react";
import useIsMobile from "@/hooks/useIsMobile";
import useIsClient from "@/hooks/useIsClient";

export const Intro = () => {
  const isMobile = useIsMobile();
  const isClient = useIsClient();
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = winScroll / height;
      setScrollPercent(Math.round(scrolled * 100));
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const ResponsiveIntro =
    isClient && isMobile ? (
      <></>
    ) : (
      <>
        <div
          className="bgImg-bamboo-bar-icon w-1/5 h-1/5
                      fixed top-10 left-10 p-0 m-0"
        ></div>
        <h1
          className="text-white text-4xl text-center font-bold fixed top-1/3 left-0 w-screen"
          style={{
            opacity: `${scrollPercent * 2}%`,
            transform: `translateY(${20 - scrollPercent / 5}px) scale(1)`,
          }}
        >
          주제를 생성하고, 당신의 문제를
          <br />
          <br />
          실시간 랜더링과 함께 더욱 생생하게 공유하세요
        </h1>
      </>
    );

  return (
    <>
      <div
        className="bgImg-bamboo bgImg-position w-full h-screen fixed top-0 left-0 z-0"
        style={{ transform: `scale(${1 + scrollPercent / 300})` }}
      >
        <div
          className="bg-green-300 h-2 fixed top-0 left-0 right-0"
          style={{ width: `${scrollPercent}%` }}
        ></div>
      </div>
      <div className="bg-black z-10 w-full h-screen fixed top-0 left-0"
      style={{ opacity: `${0.3 - }` }}></div>
      {ResponsiveIntro}
    </>
  );
};
