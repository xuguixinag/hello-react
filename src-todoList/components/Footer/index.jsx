
import React, { Component } from 'react'

export default class Footer extends Component {
  
  removedDone = ()=>{
    this.props.removeDone();
  }
  selectedAll = (e)=>{
    this.props.selectAll(e.target.checked);
  }
  render() {
    // 底部需要获得state中数组的个数，需要父组件传递过来
    const {todos} = this.props;
    // 下面这两个变量不需要放在state中，先用先去
    const totalNum = todos.length;
    // 数组常用的方法，非常基础的知识
    const doneNum = todos.reduce((total,current)=>{
      return total+= current.done ? 1:0
    },0)

    return (
      <div>
           <label><input type="checkbox" onChange={this.selectedAll} checked={doneNum ===totalNum ? true : false}></input>已经完成{doneNum}个/共{totalNum}个</label>
           <br/>
           <button onClick={this.removedDone}>删除已经完成的任务</button>
      </div>
    )
  }
}
