import React,{Component} from 'react'
import PropTypes from 'prop-types'
import './index.css'
export default class Header extends Component {
    
    commitTodo = (e)=>{
        const {keyCode,target} = e;
        if(keyCode===13) {
            if(target.value.trim()==='') {
                alert('输入不能为空');
                return
            }
            // 定义好参数的格式
            const obj = {id:Math.random()*10,name:target.value,done:false}
            // 子组件给父组件传递数据只能通过父组件传递过来的回调函数，在props中取
            this.props.addtask(obj);
            // 回车之后清空
            target.value = '';
        }else return;
    }
    static propTypes = {
       addtask:PropTypes.func.isRequired
    }
    
    render () {
        return (
            <div>
                <input placeholder='请输入内容按下enter键' className="input1" onKeyUp={this.commitTodo}></input>
            </div>
        )
    }
    
}
