import React, { Component } from 'react'
// import queryString from 'query-string';
export default class Message extends Component {
  render() {
    // const{id,title} = this.props.match.params;
    const {id,title} =this.props.match.params;
    console.log(this.props);

    
    return (
      <div style={{borderTop:'1px solid black',marginTop:'30px'}}>
        <p>我是第{id}个消息</p>
        <p>我的内容是{title}</p>
      </div>
    )
  }
}
