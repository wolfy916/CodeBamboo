import React from 'react';
import { useRecoilValue } from 'recoil';
import { LeafState } from '@/recoil/topic';
import { LeafItem } from './LeafItem';

export const Log = () => {
  const leafs = useRecoilValue(LeafState);

  const LeafItems = () => {
    return (
      <>
        {leafs.map((e) => (
          <LeafItem key={e.leaf_id} leaf={e} />
        ))}
      </>
    );
  };

  return (
    <div className="w-full max-w-[10rem] bg-gray-100">
      <LeafItems />
    </div>
  );
};
