import React from 'react';
import { TopicItem } from './TopicItem';
import useIsClient from '@/hooks/useIsClient';
import { TopicItemInF } from './TopicInterface';
import useIsMobile from '@/hooks/useIsMobile';

interface Props {
  topicList: TopicItemInF[];
}

export const TopicList = ({ topicList }: Props) => {
  const isMobile = useIsMobile();
  const isClient = useIsClient();

  const topicListItems = topicList.map((obj: TopicItemInF, idx: number) => {
    return (
      <TopicItem
        topic_id={obj.topic_id}
        needHelp={obj.needHelp}
        creation_time={obj.creation_time}
        rootLeaf={obj.rootLeaf}
        bestLeaf={obj.bestLeaf}
        key={idx}
      />
    );
  });

  return (
    <div
      className={`relative w-screen flex scrollbar-hide
                  h-[40vh] ${
                    isMobile
                      ? 'overflow-y-visible overflow-x-scroll'
                      : ''
                  }
                  md:w-full md:h-[55vh] md:items-end md:overflow-x-scroll md:px-5`}
    >
      {isClient && topicListItems}
    </div>
  );
};
