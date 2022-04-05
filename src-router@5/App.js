import React, { Component } from 'react'
import { NavLink,Route,Switch,Redirect } from 'react-router-dom'

// import 'antd/dist/antd.css';


import './App.css'
import Header from './components/Header/index.jsx'
import Home from './pages/Home'
import Person from './pages/Person'
export default class App extends Component {
  render() {

    return (
      <div>
            <Header/>
            <div style={{height:'300px',width:'80px',border:'1px solid black'}}>
              <NavLink to='/home'>首页</NavLink>
              <br></br>
              <NavLink to='/person'>个人中心</NavLink>
            </div>
            
            <Switch>
              <Route exact path='/home' component={Home}></Route>
              <Route path='/person' component={Person}></Route>
              <Redirect to='/home'></Redirect>
            </Switch>
    
  
      </div>
    )
  }
}
/*
router 路由器 route路由
react中router对象分为三种，第一种web 第二种 native 第三种 anywhere
我们web学习第一种即可，借助yarn add react-router-dom 库
link api 用来定义路由跳转连接 route 用来注册路由规则 这两个标签要包裹在一个router对象中
<BrowserRouter>
   <Link to='/home'>首页</Link>
   <Route path='/home' component={Home}></Route>
</BrowserRouter>
web对应的api是BrowserRouter 
但是一个应用只能由一个路由对象管理，如果我们想要管理很多个组件怎么办？
直接把这个对象包裹在index.js中app组件的外层，这样整个项目都是使用一个router对象管理



路由组件和一般组件的区别：
位置不同：
1、路由组件一般放在pages文件夹下，一班组件放在component文件夹下面
2、写法不同， <Route path='/home' component={Home}></Route> 一般组件：<Home/>
3、props不同，默认在this.props 中就有三个固定属性，
   history ：go(n) goBack() goForward() push(path,state) replace(path,state)
   match :isExact :true  params path url
   location:pathname,search,state,hash


Link 和 NavLink
navLink 里面可以设置activeClassName(string)：设置选中样式，默认值为active
activeStyle(object)：当元素被选中时，为此元素添加样式


一般来说一个route 路径渲染一个组件，一一对应。如果同一个路径下面匹配了很多组件，会导致效率很低
所以需要还有switch 标签来包裹route路径
<Switch>
    <Route exact path='/home' component={Home}></Route>
    <Route path='/person' component={Person}></Route>
    <Redirect to='/home'></Redirect>
</Switch>

什么是模糊匹配，什么是精准匹配
模糊匹配就是我们传入的path 比规定路径中的path 要多，但是按照顺序符合路径，name就可以匹配
比如：home/a/b  路径：home  也可以正常展示的 默认就是模糊匹配
怎么开启精准匹配？
在route标签中加exact
什么时候开启严格匹配？
一般不会随便开，只有模糊匹配产生了问题才会开启严格匹配

我们打开页面没有点击之前，无法加载页面，可以使用
<Redirect to='/home'></Redirect>
这个应该写在route的最后面，最为一个兜底的人，是to 不是path

一定要注意路径前面没有. 同时必须有/
path = '/home'

路由传参：
有时候我们需要在点击link的时候，传递一些参数到我们点击展示的组件，有三种方式
第一种 params 传参
第一步：在link的url中写入需要传入的参数
<NavLink to={`/person/profile/message/${item.id}/${item.title}`}>{item.title}</NavLink>
第二步：在route中注册接收参数
<Route path='/person/profile/message/:id/:title' component={Message}></Route>
第三步：在对应的组件中通过this.props.match.params 方法拿到参数并使用


第二种 search传参
第一步：在link的url中写入需要传入的参数
<NavLink to={`/person/profile/message/?id=${item.id}&title=${item.title}`}>{item.title}</NavLink>
第二步：在route中注册接收参数
不需要接受注册
第三步：在对应的组件中通过this.props.location.search 方法拿到参数是
？key=value$key=value   的urlencoded编码的数据。
需要通过yarn add query-string 库来转换数据格式
import queryString from 'query-string';
qs.stringify(obj) 对象转化成urlencoded
qs.parse(str)urlencoded转化成对象


第三种
第一步：在link的url中写入需要传入的参数
<NavLink to={{pathname:'/person/profile/message',state:{id:item.id,title:item.title}}}>{item.title}</NavLink>
第二步：在route中注册接收参数
不需要接受注册
第三步：在对应的组件中通过this.props.location.state 方法拿到参数
注意点：刷新页面浏览器有缓存不会丢失state，但是清除缓存之后会丢失

路由跳转的方式 
默认是push ，浏览器可以记录，前景后退，留下痕迹。
replace 替换前一个url，不能前景后退
<Link replace to='/home>

编程式导航：
就是不适用link我们使用函数去实现路由的跳转
1、showme = (id,title)=>{
       this.props.history.push(`/person/profile/message/${id}/${title}`)
  }
2、在route中注册接收参数
<Route path='/person/profile/message/:id/:title' component={Message}></Route>
3、在对应的组件中通过this.props.match.params 方法拿到参数并使用
基本上就第一步 和link 不一样

补充的两个方法：
1、this.props.history.goBack()
2、this.props.history.goForward()
3、this.props.history.go(-1)

怎么实现没有点自动切换路由呢？
componentDidMount() {
  setTimeout (()=>{
    this.props.history.push(`/person/profile/message/${id}/${title}`)
  },2000)
}

如果我们想在header组件里使用前景后退的API行不行？
不行，因为这个API只有路由组件才能用，但是header不是路由组件
解决办法？
在一班组件中引入
import {withRouter} from 'react-router-dom'
暴露方式改为：
export default withRouter(Header)


BrowserRouter 和 HashRouter的区别
1、底层原理不同
第一个使用的是h5的history API ，不兼容低版本浏览器
2、path的表现形式不同
第一个没有#，第二个localhost：3000/#/demo
3、刷新后对路由state参数的影响
第一个不会影响，因为保存在了history对象中
第二个会导致参数丢失
4、第二个可以用于解决一些路径错误相关的问题
*/