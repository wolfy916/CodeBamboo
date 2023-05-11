import SearchBar from '@/components/common/SearchBar';
import SearchTogle from '@/components/common/SearchTogle';
import { searchInputState } from '@/recoil/search';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

interface Props {}

export const Search = ({}: Props) => {
    const [inputValue, setInputValue] = useRecoilState(searchInputState);
    useEffect(() => {
        //api통신 여기에서
    }, [inputValue]);
    return (
        <div className="h-full md:w-full bg-indigo-600">
            <header
                className="header h-20 bg-white
                              md:h-24 md:w-[96%] md:mx-[2%]"
            ></header>
            <main className="main md:w-[96%] md:mx-[2%]">
                <SearchTogle />
                {/* <section className="section">
                    섹션
                    <article className="article">아티클</article>
                </section> */}
                메인
            </main>
            <SearchBar />
        </div>
    );
};

export default Search;
