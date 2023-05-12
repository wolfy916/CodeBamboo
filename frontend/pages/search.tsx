import SearchBar from '@/components/common/SearchBar';
import SearchTogle from '@/components/common/SearchTogle';
import authApi from '@/hooks/api/axios.authorization.instance';
import useIsClient from '@/hooks/useIsClient';
import useIsMobile from '@/hooks/useIsMobile';
import { searchInputState, topicTogleState } from '@/recoil/search';
import React, { ReactNode, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useRecoilState, useRecoilValue } from 'recoil';
import { TopicItemInF } from '@/components/topic/TopicInterface';
import { TopicItem } from '@/components/topic/TopicItem';

interface Props {}

export const Search = ({}: Props) => {
    const [inputValue, setInputValue] = useRecoilState(searchInputState);
    const isMobile = useIsMobile();
    const [errorValue, setErrorValue] = useState('');
    const [isFound, setIsFound] = useState(true);
    const [leafErrorValue, setLeafErrorValue] = useState('');
    // const [iLeafFound, setIsLeafFound] = useState(true);
    const isTopic = useRecoilValue(topicTogleState);
    console.log(isTopic);
    const [searchTopicItems, setSearchTopicItems] = useState(
        (): ReactNode => <></>
    );
    const [searchLeafItems, setSearchLeafItems] = useState(
        (): ReactNode => <></>
    );
    const queryFn = async (userInput: any) => {
        if (!userInput) return;
        try {
            const response = await authApi.get(
                `topic/search?input=${userInput}`
            );
            return response.data;
        } catch (error) {
            // console.log(error.response.data.message);
            setErrorValue(error.response.data.message);
            setIsFound(false);
        }
    };
    const getTopic = useQuery(
        ['topic', inputValue.inputValue],
        () => queryFn(inputValue.inputValue),
        {
            onSuccess: (data) => {
                if (data) {
                    console.log(data);
                    setSearchTopicItems(
                        data.slice(0, 3).map((obj, idx: number) => {
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
                        })
                    ),
                        setIsFound(true);
                }
            },
            onError: (data) => {
                console.log(data);
            },
        }
    );

    const getLeafFn = async (userInput: any) => {
        if (!userInput) return;
        try {
            const response = await authApi.get(
                `leaf/search?input=${userInput}`
            );
            return response.data;
        } catch (error) {
            console.log(error.response.data.message);
            setLeafErrorValue(error.response.data.message);
            setIsFound(false);
        }
    };
    const getLeaf = useQuery(
        ['leaf', inputValue.inputValue],
        () => getLeafFn(inputValue.inputValue),
        {
            onSuccess: (data) => {
                if (data) {
                    console.log(data);
                    // setSearchLeafItems(
                    //     data.slice(0, 3).map((obj, idx: number) => {
                    //         return (
                    //             <TopicItem
                    //                 topic_id={obj.topic_id}
                    //                 needHelp={obj.needHelp}
                    //                 creation_time={obj.creation_time}
                    //                 rootLeaf={obj.rootLeaf}
                    //                 bestLeaf={obj.bestLeaf}
                    //                 key={idx}
                    //             />
                    //         );
                    //     })
                    // ),
                    // setIsLeafFound(true);
                }
            },
            onError: (data) => {
                console.log(data);
            },
        }
    );

    const TopicList = () => {
        return isFound ? (
            <div
                className={`w-screen flex 
          h-[40vh] ${
              isMobile
                  ? 'overflow-y-visible overflow-x-scroll scrollbar-hide'
                  : ''
          }
          md:w-full md:h-[50vh] md:justify-center`}
            >
                {searchTopicItems}
            </div>
        ) : (
            errorValue
        );
    };
    const LeafList = () => {
        return isFound ? (
            <div
                className={`w-screen flex 
          h-[40vh] ${
              isMobile
                  ? 'overflow-y-visible overflow-x-scroll scrollbar-hide'
                  : ''
          }
          md:w-full md:h-[50vh] md:justify-center`}
            >
                {searchLeafItems}
            </div>
        ) : (
            leafErrorValue
        );
    };

    useEffect(() => {
        //api통신 여기에서
        // console.log('inputValue바뀜');
    }, [inputValue, errorValue, leafErrorValue]);
    return (
        <div className="h-full md:w-full bg-white">
            <header
                className="header h-20 bg-white
                              md:h-24 md:w-[96%] md:mx-[2%]"
            ></header>
            <main className="main md:w-[96%] md:mx-[2%] bg-white">
                <SearchTogle />
                {isTopic.togleValue ? TopicList() : LeafList()}
            </main>
            <SearchBar />
        </div>
    );
};

export default Search;
