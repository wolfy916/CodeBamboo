import React from 'react';
import { LeafObject } from '@/recoil/topic';

interface LeafItemProps {
  leaf: LeafObject;
}

export const LeafItem = ({ leaf }: LeafItemProps) => {

  return (
    <div>
      {leaf.title}
    </div>
  );
};
