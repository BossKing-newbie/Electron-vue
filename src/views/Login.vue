<template>
  <div>
    <div class="title-bar">
      <span v-text="title"></span>
    </div>
    <!-- component是一个占位符，:is属性是指定组件的名称 -->
    <component :is="comName" @register="receive"></component>
  </div>

</template>
<script>
import LoginChlid from '../components/LoginChlid'
import RegisterChild from '../components/RegisterChild'
const { ipcRenderer } = require('electron')
export default {
  name: 'Login',
  data () {
    return {
      comName: 'login',
      title: '用户登录'
    }
  },
  methods: {
    minimize () {
      ipcRenderer.send('minimize')
    },
    close () {
      ipcRenderer.send('close')
    },
    receive (value1, value2) {
      this.comName = value1
      this.title = value2
    }
  },
  components: {
    login: LoginChlid,
    register: RegisterChild
  }
}
</script>
<style lang="stylus" scoped>
  .title-bar
    height 50px
    line-height 50px
    background-color #409EFF
    -webkit-app-region: drag // 可拖动
  .title-bar span
    color white
    display inline
    text-align center
    font-size 18px
</style>
