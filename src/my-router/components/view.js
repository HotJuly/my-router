import Vue from 'vue';
export default {
    name:"RouterView",
    functional:true,
    render:(_,{parent,props,data,children})=>{
        data.routerView = true;
        let depth=0;
        let createElement = parent.$createElement;
        // console.log('parent',parent.$vnode)
        while(parent&&parent._routerRoot!=false){
            let vnodeData = parent.$vnode?parent.$vnode.data:{};
            if(vnodeData.routerView){
                depth++;
            }
            parent=parent.$parent;
        }

        //获取当前的路由地址
        let path = Vue.prototype.route.path;

        /*
            1.先提取出当前的路由注册表对象所有的key(也就是所有注册的路径),得到有路由路径组成的数组
            2.再从数组中过滤出,与当前路由地址相关的路径组成的数组
            (例如当前路由地址:/home/haha => 得到的数组["/home","/home/haha"])
        */
        let pathMap = Object.keys(Vue.prototype.router.mapRoute).filter((item)=>{
            return path.includes(item);
        });
        // console.log('pathMap',pathMap,depth)

        let currentPath = pathMap[depth];
        // console.log('currentPath',currentPath)
        if(!currentPath)return;

        let component = Vue.prototype.router.mapRoute[currentPath];
        // console.log('component',component)

        return createElement(component,data)
    }
}