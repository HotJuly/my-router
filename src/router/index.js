import Vue from 'vue';
import MyRouter from '../my-router';
import Home from '../components/Home';
import About from '../components/About';
import Xixi from '../components/Xixi';

Vue.use(MyRouter);

export default new MyRouter({
    routes:[
        {
            path:"/home",
            component:Home,
            children:[
                {
                    path:"/home/xixi",
                    component:Xixi
                }
            ]
        },
        {
            path:"/about",
            component:About
        }
    ]
})
