import Vue from 'vue';
import RouterView from './components/view';
import RouterLink from './components/link';
// let MyRouter={};

function deepMapRoute(routes){
    routes.forEach((item)=>{
        this[item.path]=item.component;
        if(item.children instanceof Array&&item.children.length){
            deepMapRoute.call(this,item.children);
        }
    })
}

MyRouter.prototype = {
    constructor:MyRouter,
    push(path){
        this.history.pushState({},"",path);
        Vue.prototype.route.path=path;
    }
}

function isDep(v){
    return v!==undefined;
}

function MyRouter(vue,options){
    if(typeof vue === "function"){
        vue.component("RouterView",RouterView);
        vue.component("RouterLink",RouterLink);
        Vue.mixin({
            beforeCreate(){
                if(isDep(this.$options.router)){
                    this._routerRoot=this;
                }
            }
        })
        return;
    }
    options = vue;
    this.routes = options.routes;
    this.mapRoute = {};
    this.history = window.history;
    deepMapRoute.call(this.mapRoute,this.routes);
    Vue.prototype.router = this;
    Vue.prototype.route = Vue.observable({
        path:new URL(window.location).pathname
    })
}


export default MyRouter