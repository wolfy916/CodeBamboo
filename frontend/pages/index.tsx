import { useQuery } from 'react-query'
import { LeafItem } from '@/components/LeafItem'
import { UserItem } from '@/components/UserItem'

const fetchUser = async () => {
  const BASE_URL = 'http://localhost:8000'
  const response = await fetch(BASE_URL+'/users/1', {
    method: 'GET',
  })
  const data = await response.json()
  return data
}

export default function Home() {
  const { isLoading, isError, data: seoyong } = useQuery('user', fetchUser)
  const API_KEY_KAKAO = process.env.NEXT_PUBLIC_API_KEY_KAKAO
  const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI
  const OAUTH_KAKAO = `https://kauth.kakao.com/oauth/authorize?client_id=${API_KEY_KAKAO}&redirect_uri=${REDIRECT_URI+'kakao'}&response_type=code`

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error fetching user data</div>
  }

  return (
    <>
      <h1 className="text-3xl underline text-bamboo font-scp font-bold">
        Tailwind CSS rules!
      </h1>
      <div>
        <ol>
          <li>아이디: {seoyong?.id}</li>
          <li>이름: {seoyong?.name}</li>
          <li>나이: {seoyong?.age}</li>
          <li>포지션: {seoyong?.position}</li>
          <li>기술 스택: {seoyong?.skills}</li>
        </ol>
      </div>
      <button>
        <a href={OAUTH_KAKAO}>카카오 로그인</a>
      </button>
      <button>네이버 로그인</button>
      <button>깃허브 로그인</button>
      <LeafItem />
      <UserItem />
    </>
  );
}
