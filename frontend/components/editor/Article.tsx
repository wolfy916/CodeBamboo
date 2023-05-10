import React, { useState, useCallback, useEffect } from 'react';
import { useMutation } from 'react-query';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { articleState, codeState } from '@/recoil/topic';
import { useRecoilState, useRecoilValue } from 'recoil';
import authApi from '@/hooks/api/axios.authorization.instance';
import { GrFlagFill } from "react-icons/gr";

interface Props {}

const queryFn = async (body:any) => {
  try {
    const response = await authApi.post('topic/', body);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const Article = ({}: Props) => {
  const router = useRouter();
  const [article, setArticle] = useRecoilState(articleState);
  const code = useRecoilValue(codeState);
  const [localArticle, setLocalArticle] = useState(article)
  const [needHelp, setNeedHelp] = useState(false)
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: `${article.title}`,
      content: `${article.content}`,
    },
  });

  const mutateTopic = useMutation((body: any) => queryFn(body), {
    onSuccess:(topicId)=>{
      router.push(`/topics/${topicId}`)
    }
  })

  useEffect(() => {
    setLocalArticle(article)
  }, [article])

  const onSubmit = (data:any) => {
    const body = {
      ...data, 
      codes: code,
      needHelp: needHelp,
    }
    mutateTopic.mutate(body)
  };

  const handleInputChange = useCallback(
    (event: { target: { name: string; value: string; }; }) => {
      const {name, value} = event?.target
      setLocalArticle((prev) => ({...prev, [name]:value}))
      setArticle((prev) => ({...prev, [name]:value}))
    },
    [setArticle]
  )

  return (
    <div
      className="flex p-4 bg-inherit
                h-full
                md:h-1/2"
    >
      <form className='flex flex-col w-full' onSubmit={handleSubmit(onSubmit)}>
        <div className='font-bold'>Title :</div>
        <input
          className="h-8 max-w-md article-input"
          maxLength={100}
          {...register('title', { required: true, maxLength: 100 })}
          type="text"
          name="title"
          value={localArticle.title}
          onChange={handleInputChange}
          placeholder='제목'
        />
        <div className='font-bold'>Content :</div>
        <textarea
          className="resize-none h-full article-input"
          {...register('content')}
          name='content'
          value={localArticle.content || ""}
          onChange={handleInputChange}
          placeholder='내용'
        />
        <div className='flex flex-row place-self-end gap-3'>
          <div
            className={`bamboo-button w-20 min-h-full flex justify-center items-center hover:bg-red-600 ${!needHelp ? 'bg-rose-300' : 'bg-rose-500 shadow-inner' }`}
            onClick={()=>setNeedHelp((prev)=>!prev)}
          >
            {!needHelp ? `Help!` : <GrFlagFill/> }
          </div>
          <button
            className='bamboo-button'
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
