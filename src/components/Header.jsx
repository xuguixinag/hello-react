import React from 'react'
import { useNavigate } from 'react-router-dom';
import { PageHeader } from 'antd';

export default function Header() {
    
  const navigate = useNavigate();
  function forward () {
      navigate(1);
  }
  function back () {
    navigate(-1);
}
  return (
    <div>
        <PageHeader
         style={{border:'1px solid rgb(235, 237, 240)'}}
         onBack={() => null}
         title="Title"
         subTitle="This is a subtitle"
  />
   <button onClick={forward}>前进</button>
   <button onClick={back}>后退</button>
    </div>
  )
}
