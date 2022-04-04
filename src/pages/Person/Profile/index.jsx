import React, { Component } from 'react'
import {NavLink,Switch ,Route,Redirect } from 'react-router-dom'
import Message from './Message'
export default class Profile extends Component {
  state= {messageArr:[
          {id:'001',title:'mes001'},
          {id:'002',title:'mes002'},
          {id:'003',title:'mes003'},
  ]}
  showme = (id,title)=>{
     
       this.props.history.push(`/person/profile/message/${id}/${title}`)
     
  }
  render() {
    const {messageArr} = this.state;
    return (
      <div>
          <ul>
              {
                 messageArr.map((item)=>{
                      return(
                          <li key={item.id}>
                              <NavLink to={{pathname:'/person/profile/message',state:{id:item.id,title:item.title}}}>{item.title}</NavLink>
                              <button onClick={()=>this.showme(item.id,item.title)}>{item.id}</button>
                          </li>
                      )
                  })
              }
            
          </ul>
         
          <Switch>
            <Route path='/person/profile/message/:id/:title' component={Message}></Route>
            <Redirect to='/person/profile/message'></Redirect>
          </Switch>
          
          <br></br>
      </div>
    )
  }
}
