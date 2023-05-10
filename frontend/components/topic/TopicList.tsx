import React from 'react';
import { TopicItem } from './TopicItem';
import useIsClient from '@/hooks/useIsClient';
import authApi from '@/hooks/api/axios.authorization.instance';

interface Props {}

export const TopicList = ({}: Props) => {
  const isClient = useIsClient();
  const topicItems = authApi.get('/topic/main');
  return <div className="w-full h-auto">{isClient && <TopicItem />}</div>;
};
