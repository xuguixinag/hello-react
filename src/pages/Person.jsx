
import React from 'react'
import {useLocation,useNavigate} from 'react-router-dom'
export default function Person() {
const {state:{id,title}} = useLocation();
const navigate = useNavigate();
function tohome () {
    navigate('/home');
    
}

  return (
    <div>
        大家好，我是{id}好选手，
        发言内容：{title}
        <button onClick={tohome}>dianji </button>
   
    </div>
  )
}
