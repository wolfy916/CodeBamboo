import React, { useEffect } from 'react';
import useIsMobile from '@/hooks/useIsMobile';
import useIsClient from '@/hooks/useIsClient';

export const Intro = () => {
  const isMobile = useIsMobile();
  const isClient = useIsClient();
  useEffect(() => {
    if (isClient) {
      window.addEventListener(
        'scroll',
        () => {
          document.body.style.setProperty(
            '--scroll',
            `${window.scrollY / document.body.offsetHeight}`
          );
        },
        false
      );
    }
  }, [isClient]);

  const ResponsiveIntro =
    isClient && isMobile ? (
      <></>
    ) : (
      <>
        <div
          className="bgImg-bamboo-bar-icon w-1/5 h-1/5
                      fixed top-10 left-10 p-0 m-0"
        ></div>
        <h1 className="text-white text-3xl text-center font-bold">
          주제를 생성하고, 당신의 문제를
          <br />
          <br />
          실시간 랜더링과 함께 더욱 생생하게 공유하세요
        </h1>
      </>
    );

  return (
    <div
      className="bgImg-bamboo w-screen h-screen bg-top intro-bg-long-height bg-contain
                flex justify-center items-center"
    >
      <div className="h-3 fixed top-0 left-0 progress-animation"></div>
      {ResponsiveIntro}
    </div>
  );
};
