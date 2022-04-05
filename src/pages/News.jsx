import React,{useState} from 'react'
import { NavLink, Outlet} from 'react-router-dom'
export default function News() {
  const [params] = useState([
        {id:'111',title:'我是第1个内容',content:'1号选手'},
        {id:'222',title:'我是第2个内容',content:'2号选手'},
        {id:'333',title:'我是第3个内容',content:'3号选手'}
  ])
  return (
    <div>
        <ul>
        {
            params.map((item)=>{
                return(
                    
                    <li key={item.id} >
                       <NavLink 
                       to='person' 
                       state={{
                           id:item.id,
                           title:item.title
                        }}
                        >{item.content}</NavLink>
                    </li> 
                )
            })
        }
        </ul>
        <Outlet></Outlet>
    </div>
  )
}
