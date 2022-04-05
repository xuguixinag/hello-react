import React, { Component } from 'react'
import { NavLink, Route,Switch,Redirect} from 'react-router-dom'
import Profile from './Profile'
import About from './About'

export default class Person extends Component {
  render() {
    return (
      <div style={{position:'absolute',left:'100px',top:'50px',border:'1px solid black',width:'400px',height:'300px'}}>
        <div style={{backgroundColor:'yellow',borderBottom:'1px solid black'}}>
          <NavLink to='/person/profile'>信息</NavLink> &nbsp;&nbsp;&nbsp;
          <NavLink to='/person/about'>关于</NavLink>
        </div>
        
        <Switch>
          <Route path='/person/profile' component={Profile}></Route>
          <Route path='/person/about' component={About}></Route>
          <Redirect to='/person/profile'></Redirect>
        </Switch>
        
      </div>
    )
  }
}
