## 剖析Vue-Router实现原理 - 如何实现单页面应用(SPA)

> `本文能帮你做什么？`
> `1、了解vue-router的双向数据绑定原理以及核心代码模块`
> `2、缓解好奇心的同时了解如何实现单页面应用`(SPA)
> `为了便于说明原理与实现，本文相关代码主要摘自[vue-router源码](https://github.com/vuejs/vue-router), 并进行了简化改造，相对较简陋，暂时只考虑了vue-router中的history模式的核心实现,内部未实现导航守卫，也难免存在一些问题，欢迎大家指正。不过这些并不会影响大家的阅读和理解，相信看完本文后对大家在阅读vue-router源码的时候会更有帮助`
> `本文所有相关代码均在github上面可找到 https://github.com/HotJuly/my-router`

##### 相信大家对vue-router实现单页面应用的过程应该都不陌生了，一言不合上代码，下面先看一个本文最终实现的效果吧，和vue-router一样的语法，如果还不了解vue-router，猛戳[Vue Router](https://router.vuejs.org/zh/)

```javascript
//这是vue项目入口文件main.js的代码
import Vue from 'vue'
import App from './App.vue'
import router from './router'

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
```

```javascript
//这是main.js中引入的./router/index.js文件
//该文件使用MyRouter函数,构造创建路由器实例对象,并注册路由地址和路由组件的映射关系
import Vue from 'vue';
import MyRouter from '../my-router';
import Home from '../components/Home';
import About from '../components/About';
import Xixi from '../components/Xixi';

//通知Vue使用我们封装的插件库MyRouter
Vue.use(MyRouter);

//使用MyRouter函数,构造创建路由器实例对象,并注册路由地址和路由组件的映射关系
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
```

```vue
//该文件是App.vue,vue项目中的根组件
<template>
  <div id="app">
    <!-- 编程式导航,通过push方法进行路由跳转 -->
    <button @click="handleClick">跳转到home的xixi</button>
      
    <!-- 声明式导航,通过router-link会自动生成a标签,从而控制路由跳转 -->
    <router-link path="/about">跳转到about</router-link>
      
    <!-- 根据当前路由地址,显示对应的一级路由组件 -->
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  methods:{
    handleClick(){
      this.router.push('/home/xixi');
    }
  }
}
</script>

<style>
button{
  display:block
}
</style>
```

```vue
//该文件是Home.vue,是一级路由组件
//路由组件Xixi是他的子路由,路由组件About是他的兄弟路由
<template>
    <div id="homeContainer">
        <h1>I'm Home Page</h1>
        <p>我Home组件是一级路由组件</p>
        
        <!-- 根据当前路由地址,用于显示二级路由组件 -->
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name:"Home"
}
</script>

<style>
#homeContainer{
    width:300px;
    height:300px;
    border: 1px solid;
}
</style>
```

```vue
//该文件是Xixi.vue,是二级路由组件
//他是一级路由Home的子路由
<template>
    <div id="xixiContainer">
        <h2>I'm Xixi Component</h2>
        <p>我Xixi组件是二级路由组件,我的父组件是Home组件</p>
    </div>
</template>

<script>
export default {
    name:"Xixi"
}
</script>

<style>
#xixiContainer{
    width:250px;
    height:150px;
    border: 1px solid ;
    margin: 0 auto;
}
</style>
```

```vue
//该文件是Aboute.vue,是一级路由组件
//路由组件Home是他的兄弟路由,该组件没有子路由
<template>
    <div id="aboutContainer">
        <h1>I'm About Page</h1>
        <p>我About组件是一级路由组件,跟Home组件是肩并肩的兄弟,但是我没有二级路由</p>
    </div>
</template>

<script>
export default {
    name:"About"
}
</script>

<style>
#aboutContainer{
    width:300px;
    height:300px;
    border: 1px solid;
}
</style>
```

效果一(路由路径:/home/xixi):

![image-20201227231755354](C:\Users\CHH\AppData\Roaming\Typora\typora-user-images\image-20201227231755354.png)

效果二(路由路径:/about):

![image-20201227231819855](C:\Users\CHH\AppData\Roaming\Typora\typora-user-images\image-20201227231819855.png)