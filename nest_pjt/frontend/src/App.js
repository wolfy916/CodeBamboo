import React, { useEffect, useState } from "react";
import './App.css';

function App() {
  const [seoyong, setSeoyong] = useState(null)

  useEffect(()=>{
    const BASE_URL = 'http://localhost:8000'
    const getUser = async()=>{
      const response = await fetch(BASE_URL+'/users/1', {
        method:"GET",
      })
      const json = await response.json()
      console.log(json)
      setSeoyong(json)
    }
    getUser()
  },[])

  return (
    <div>
      <ol>
        <li>유저id : {seoyong?.id}</li>
        <li>이름 : {seoyong?.name}</li>
        <li>나이 : {seoyong?.age}</li>
        <li>포지션 : {seoyong?.position}</li>
        <li>보유 기술 : {seoyong?.skills}</li>
      </ol>
    </div>
  );
}

export default App;
