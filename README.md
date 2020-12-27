## 剖析Vue-Router实现原理 - 如何实现单页面应用(SPA)

`本文能帮你做什么？`
`1、了解vue-router的双向数据绑定原理以及核心代码模块`
`2、缓解好奇心的同时了解如何实现单页面应用`(SPA)
`为了便于说明原理与实现，本文相关代码主要摘自[vue-router源码](https://github.com/vuejs/vue-router), 并进行了简化改造，相对较简陋，暂时只考虑了vue-router中的history模式的核心实现,内部未实现导航守卫，也难免存在一些问题，欢迎大家指正。不过这些并不会影响大家的阅读和理解，相信看完本文后对大家在阅读vue-router源码的时候会更有帮助`
`本文所有相关代码均在github上面可找到 https://github.com/HotJuly/my-router`

##### 相信大家对vue-router实现单页面应用的过程应该都不陌生了，一言不合上代码，下面先看一个本文最终实现的效果吧，和vue-router一样的语法，如果还不了解vue-router，猛戳[Vue Router](https://router.vuejs.org/zh/)

