<template>
  <div id="app">
    <router-view></router-view>
    <Loading/>
    <Login/>
  </div>
</template>

<script>
import Loading from './components/Loading'
import Login from './components/Login'
export default {
  name: 'app',
  components: {
    Loading,
    Login
  }
}
</script>

<style lang="scss">
@import './assets/css/style.scss';
</style>
