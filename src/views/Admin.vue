<template>
  <div>
    <div class="title-bar">
      <span v-text="title"></span>
    </div>
    <!-- component是一个占位符，:is属性是指定组件的名称 -->
    <component :is="comName"></component>
  </div>

</template>
<script>
import AdminLogin from '../components/AdminLogin'
const { ipcRenderer } = require('electron')
export default {
  name: 'Admin',
  data () {
    return {
      comName: 'login',
      title: '管 理 员 登 录'
    }
  },
  methods: {
    minimize () {
      ipcRenderer.send('minimize')
    },
    close () {
      ipcRenderer.send('close')
    },
    changeLoginSize () {
      ipcRenderer.send('changAdminSize')
    }
  },
  components: {
    login: AdminLogin
  },
  mounted () {
    this.changeLoginSize()
  }
}
</script>
<style lang="stylus" scoped>
  .title-bar
    height 50px
    margin-top -20px
    line-height 50px
    background-color #409EFF
    -webkit-app-region: drag // 可拖动
  .title-bar span
    color white
    display inline
    text-align center
    font-size 18px
</style>
