
import React, { Component } from 'react'
import Header from "./components/Header/index.jsx";
import List from './components/List/index.jsx';
import Footer from './components/Footer/index.jsx'

export default class App extends Component {
  state = {todos:[
    {id:'01',name:'吃饭',done:false},
    {id:'02',name:'睡觉',done:false},
    {id:'03',name:'散步',done:true},
    {id:'04',name:'跑步',done:false}
  ]}
  addtask = (obj)=>{
    // 获取原来的todos
    const {todos} = this.state;
    // 追加一个新的合并
    const updateTodos = [obj,...todos];
    // 更新状态
    this.setState({todos:updateTodos})
  }
  changeState = (id,done)=>{
    // 获取原来的todos
    const {todos} = this.state;
    // 根据传进的id查找
    const updateTodos = todos.map((todo)=>{
      if(todo.id === id) {
        // 找到了复制一份并修改done的状态
      return  {...todo,done}
      }else{
        return todo;
      }
    })
    this.setState({todos:updateTodos})
  }
  removeList = (id)=> {
    // 获取原来的todos
    const {todos} = this.state;
    // 根据传进的id查找
    const updateTodos = todos.filter((todo)=>{
      return todo.id !== id;
    })
    this.setState({todos:updateTodos})
  } 
  selectAll = (isCheckedAll)=>{
    const {todos} = this.state;
    const updateTodos = todos.map((todo)=>{
       return  {...todo,done:isCheckedAll};
    });
    this.setState({todos:updateTodos});
  }
  removeDone = ()=>{
    const {todos} = this.props;
    const updateTodos = todos.filter((todo)=>{
      return todo.done === false;
    });
    this.setState({todos:updateTodos});
  }
  render () {
    const {todos} = this.state;
    return (
      <div>
         <Header addtask={this.addtask}/>
         <List todos={todos} changeState={this.changeState} removeList={this.removeList} />
         <Footer todos={todos} selectAll={this.selectAll} removeDone={this.removeDone} />
      </div>
    )
  }
}
