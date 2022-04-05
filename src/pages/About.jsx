import React from 'react'
import { NavLink, Outlet} from 'react-router-dom'
export default function About() {
 
  return (
    <div>
        <NavLink to='news'>news</NavLink>&nbsp;&nbsp;&nbsp;&nbsp;
        <NavLink to='message'>message</NavLink>
        {/* {element} */}
        <Outlet></Outlet>
    </div>
  )
}
