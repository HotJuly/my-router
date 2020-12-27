import Vue from 'vue';
export default {
    name:"RouterLink",
    functional:true,
    props:{
        tag:{
            type:String,
            default:"a"
        },
        path:{
            type:String.require
        }
    },
    render:(_,{parent,props,data,children})=>{
        let createElement = parent.$createElement;
        data.on={
            click:function(event){
                event.preventDefault();
                Vue.prototype.router.push(props.path);
            }
        }
        data.attrs.href=props.path;
        console.log(props,data,children)
        return createElement(props.tag,data,children)
    }
}