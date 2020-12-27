<template>
  <div id="app">
    <div id="h2" @click="handleClick">跳转到home的xixi</div>
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
