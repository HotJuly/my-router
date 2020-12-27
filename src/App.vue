<template>
  <div id="app">
    <button @click="handleClick">跳转到home的xixi</button>
    <router-link path="/about">跳转到about</router-link>
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
