import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.css'
export default class Item extends Component {

  state = {
   flag:false,
  }
  static propTypes = {
    changeState:PropTypes.func.isRequired
  }
  // 这个flag就是控制样式变化的
  handleMouse = (e)=>{
   return () =>{
     this.setState({flag:e});
   }
  }
  // 当勾选了复选框需要把对应的状态变化传递给父组件
  change = (id) =>{
    return (e)=>{
      this.props.changeState(id,e.target.checked);
    }
  }
  removeList= (id)=>{
    return ()=>{
      if(window.confirm('确定删除吗')) {
        this.props.removeList(id);
      }
    }
  }
  render() {
    const {name,done,id} =this.props;
    return (
      <div className='list' style={{backgroundColor:this.state.flag ? 'pink':'white'}} onMouseEnter={this.handleMouse(true)} onMouseLeave={this.handleMouse(false)}>
         <input type="checkbox" checked={done} onChange={this.change(id)}></input>
         <span>{name}</span>
         <button className='deleteBtn' style={{display:this.state.flag? 'inline-block':'none'}} onClick={this.removeList(id)}>删除</button>
      </div>
    )
  }
}
