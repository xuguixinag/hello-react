
import React ,{Component} from "react";
import PropTypes from 'prop-types'
import './index.css'
import Item from '../Item/index'
export default class List extends Component {
    static propTypes = {
        todos:PropTypes.array.isRequired,
        changeState:PropTypes.func.isRequired
    }
    
    render () {
        const {todos,changeState,removeList} =this.props;

        return (
            <ul className='demo'>
              {todos.map((todo)=>{
                 return  <Item key={todo.id} {...todo} changeState={changeState} removeList={removeList}/>
              })}
            </ul>
        )
    }
}
