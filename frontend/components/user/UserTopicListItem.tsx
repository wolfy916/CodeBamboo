import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import HandImage from '@/public/images/hand.png';
import { useRouter } from 'next/router';
import { TopicItemRendering } from '../topic/TopicItemRendering';

interface Props {
  topic_id: any;
  needHelp: boolean;
  creation_time: Date;
  rootLeaf: any;
  bestLeaf: any;
  key: number;
}

export const UserTopicListItem = ({
  topic_id,
  needHelp,
  rootLeaf,
  bestLeaf,
}: Props) => {
  const router = useRouter();
  const needHelpPing = (
    <div
      className="absolute z-50
                  h-[12%] w-[10%] top-[63%] right-[61%]
                  md:h-12 md:w-12 md:-top-4 md:-right-3"
    >
      <div className="animate-ping absolute h-full w-full rounded-full bg-gray-400 opacity-75"></div>
      <Image className="absolute h-full w-full" src={HandImage} alt="hand" />
    </div>
  );

  return (
    <div
      className={`relative bg-gray-100 shadow-lg flex flex-col items-center justify-between rounded-xl shrink-0 py-[5%]
                    w-[94vw] h-[40vh] mx-[3%]
                    md:w-full md:h-full md:hover:relative md:hover:scale-110 md:transition`}
    >
      {needHelp && needHelpPing}
      <div
        className="relative bg-white w-[90%] h-[84%] rounded-xl overflow-hidden hover:cursor-pointer"
        onClick={() => router.push(`/topics/${topic_id}`)}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-transparent z-40"></div>
        <TopicItemRendering codes={rootLeaf.codes} topic_id={topic_id} />
      </div>
      <div
        className="bg-white text-xl w-[90%] h-[12%] rounded-xl p-[2%] px-[4%] overflow-hidden
                        md:hover:text-green-300 md:hover:transition"
        title={rootLeaf.user.title}
      >
        <Link href={`/topics/${topic_id}`}>{rootLeaf.title}</Link>
      </div>
    </div>
  );
};
