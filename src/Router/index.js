import {Navigate} from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import Message from '../pages/Message'
import News from '../pages/News'
import Person from '../pages/Person'
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
                element:<News/>,
                children:[
                    {
                        path:'person',
                        element:<Person/>
                    }
                ]
            }
        ]
    },
    {
        path:'/',
        element:<Navigate to='/home'/>
    }
];
export default  router;