import React from 'react'
import Header from './components/Header'
import {NavLink,useRoutes} from 'react-router-dom'
import 'antd/dist/antd.css';

import './App.css'
import Router from './Router'
export default function App() {
  const element = useRoutes(Router);

  function computedClassName (isActive) {
     return isActive ? 'demo':'fix'
  }
  return (
    <div>
        <Header></Header>
        <NavLink className= {computedClassName} to='/home'>首页</NavLink> &nbsp;&nbsp;&nbsp;
        <NavLink className= {computedClassName} to='/about'>关于</NavLink>
        {element}
        {/* <Routes>
          <Route path='/home' element={<Home/>}></Route>
          <Route path='/about'  element={<About/>}></Route>
          <Route path='/' element={<Navigate to='/home'/>}></Route>
        </Routes> */}
    </div>
  )
}
/*
原来的：
 <NavLink activeClassName="demo" to='/home'>首页</NavLink>
 <Switch>
    <Route exact path='/home' component={Home}></Route>
    <Route path='/person' component={Person}></Route>
    <Redirect to='/home'></Redirect>
</Switch>
1、原来的Switch包裹废弃，变成 Routes 而且这个必须和Route 标签一起使用
2、element={<About/> 匹配组件的写法变了
3、使用函数式组件
4、路由重定向写法变了
5、navLink中原来的activeClassName没有了，都写在ClassName里面，这个返回一个函数对象
{isActive：true} 为了简洁我们在外部返回一个函数
function computedClassName (e) {
   return e ? 'demo fix':'fix'  demo 和 fix 是两个类
}
现在的：
<NavLink className = {computedClassName} to='/home'>首页</NavLink>
<Routes>
    <Route  caseSensitive path='/home' element={<Home/>}></Route>
    <Route path='/about'  element={<About/>}></Route>
    <Route path='/' element={<Navigate to='/home'/>}></Route>
</Routes>
注： 
1.可以使用Navigate 根据条件自渲染{sum===1? <h1></h1> :<Navigate to='/home'/>}
2.caseSensitive 属性设置对路径的大小写敏感



路由表：
可以使用useRoutes来定义一个路由表，来代替原来的
<Routes>
    <Route  caseSensitive path='/home' element={<Home/>}></Route>
    <Route path='/about'  element={<About/>}></Route>
    <Route path='/' element={<Navigate to='/home'/>}></Route>
</Routes>
具体怎么使用呢？
首先引入useRoutes 一定要加s
然后const element = useRoutes([
    {path:'/home',element:<Home/>}
    {path:'/about',element:<About/>}
])
然后把{element} 放到原来写<Routes> 的位置就可以了，一般在项目中我们定义专门的router文件进行管理路由
import {Navigate} from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import Message from '../pages/Message'
import News from '../pages/News'
let router = [
    {
        path:'/home',
        element:<Home/>},
    {
        path:'/about',
        element:<About/>,
        children:[
            {
                path:'message',
                element:<Message/>},
            {
                path:'news',
                element:<News/>}
        ]
    },
    {
        path:'/',
        element:<Navigate to='/home'/>
    }
];
export default  router;


怎么写嵌套路由？
我们定义路由规则和引入组件都在router中进行操作，通过配置children 属性
注意children里面的path不需要加/ 
配置好了之后去对应的组件写navLink 这里的to不需要加/ 
 <NavLink to='news'>news</NavLink>
   <NavLink to='message'>message</NavLink>
 <Outlet></Outlet>
 那这个规则在哪渲染呢？我们在APP组件里使用的是{element}
 在嵌套路由中，我们引入Outlet 定义路由出口。

撸有传参：
1、params
在to的路径里面传递，相当于我们在给person组件传递参数需要{ }
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
                       <NavLink to={`person/${item.id}/${item.title}`} >{item.content}</NavLink>
                    </li>
                )
            })
        }
        </ul>
        <Outlet></Outlet>
    </div>
  )


在路由表中注册一下，path 不需要``
{
    path:'news',
    element:<News/>,
    children:[
    {
        path:'person/:id/:title',
        element:<Person/>
        }
    ]
}
  

然后在person组件里接收
const {id,title} = useParams();
  return (
    <div>
        大家好，我是{id}好选手，
        发言：{title}
    </div>



search 传参
这里person和？直接没有/
 <NavLink to={`person?id=${item.id}&title=${item.title}`} >{item.content}</NavLink>
在路由表中不需要要注册接受
直接在person组件中使用
import {useSearchParams} from 'react-router-dom'
export default function Person() {
const [search,setSearch] = useSearchParams();
const id = search.get('id');
const title = search.get('title')
function change () {
  setSearch('id=0005&title=我插队的')
}
  return (
    <div>
        大家好，我是{id}好选手，
        发言内容：{title}
        <button onClick={change}>点击</button>
    </div>
  )
}



state 传参
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
    <Outlet></Outlet> 嵌套路由一定要使用outlet
</div>
不需要注册
在person组件中接收：
const {state:{id,title}} = useLocation();

编程式路由导航
onst navigate = useNavigate();
function tohome () {
    navigate('/home'); 如果是params和search直接路径中传递参数
    一定要注意路径中/相当于覆盖当前，不加/ 相当于在后面拼接
    navigate('url',{
        replace:false,
        state:{
            id:item.id
        }
    })
}
 */