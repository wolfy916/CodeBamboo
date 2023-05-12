import React from 'react';
import { useMutation } from 'react-query';
import router from 'next/router';
import {
  LeafObject,
  codeState,
  articleState,
  selectedLeafState,
} from '@/recoil/topic';
import { useRecoilState, useSetRecoilState } from 'recoil';
import authApi from '@/hooks/api/axios.authorization.instance';
import { HiCode } from 'react-icons/hi';
import { RiThumbUpLine } from 'react-icons/ri';

interface LeafItemProps {
  leaf: LeafObject;
}

const queryLikeFn = async (leafId: number) => {
  try {
    const response = await authApi.post(`user/like/${leafId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const LeafItem = ({ leaf }: LeafItemProps) => {
  const [selectedLeaf, setSelectedLeaf] = useRecoilState(selectedLeafState);
  const setCode = useSetRecoilState(codeState);
  const setArticle = useSetRecoilState(articleState);
  const selectLeaf = () => {
    setSelectedLeaf({
      user_id: leaf.user_id,
      leaf_id: leaf.leaf_id,
    });
    setCode(leaf.codes);
    setArticle({
      title: leaf.title,
      content: leaf.content,
    });
  };

  const mutateLike = useMutation(() => queryLikeFn(leaf.leaf_id), {
    onSuccess: () => {},
  });

  return (
    <div
      className={`shrink-0 h-auto m-2 rounded-md flex cursor-pointer shadow-sm 
                ${selectedLeaf.leaf_id === leaf.leaf_id ? 'bg-bamboo' : ''}`}
      onClick={selectLeaf}
    >
      {leaf.type === 1 && <HiCode className="text-[1.5rem]" />}
      <span className="text-[0.5rem]">
        {leaf.title.length < 15 ? leaf.title : leaf.title.slice(0, 15) + '...'}
      </span>
      <div className="z-10" onClick={(e)=>{e.stopPropagation();mutateLike.mutate();}}>
        <RiThumbUpLine className="text-[1.5rem]" />
      </div>
    </div>
  );
};
