import React from 'react';
import { Bar } from './Bar';
import { useRecoilState } from 'recoil';
import { isMainState } from '@/recoil/isMain';
import useIsClient from '../../hooks/useIsClient';

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  const isClient = useIsClient();
  const [isMain, setIsMain] = useRecoilState(isMainState);
  return (
    <div
      className="flex h-screen w-screen
                    flex-col 
                    md:flex-row"
    >
      {isClient && !isMain && <Bar />}
      <main className="h-full w-full">{children}</main>
    </div>
  );
};
