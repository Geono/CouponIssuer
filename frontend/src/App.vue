<template>
  <div id="app">
    <CouponIssuer msg="Simplest Coupon Issuer"/>
  </div>
</template>

<script>
import CouponIssuer from './components/CouponIssuer.vue'

export default {
  name: 'App',
  components: {
    CouponIssuer
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
