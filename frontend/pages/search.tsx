import SearchModal from '@/components/common/SearchModal';
import { searchInputState } from '@/recoil/search';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';

interface Props {}

export const Search = ({}: Props) => {
    const [inputValue, setInputValue] = useRecoilState(searchInputState);
    useEffect(() => {
        console.log(inputValue);
    }, [inputValue]);
    return (
        <div className="h-full md:w-full bg-indigo-600">
            <header
                className="header h-20
                              md:h-24 md:w-full"
            >
                검색창
            </header>
            <main className="main md:w-full">
                <section className="section flex-row md:w-full">
                    섹션
                    <article className="article w-20">토픽 | 리프 </article>
                    <article className="article w-20">
                        최신순 | 좋아요순
                    </article>
                </section>
                {/* <section className="section">
                    섹션
                    <article className="article">아티클</article>
                </section> */}
                메인
            </main>
            <SearchModal />
        </div>
    );
};

export default Search;
