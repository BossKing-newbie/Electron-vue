<template>
  <el-container>
    <el-header>
      <!--工具栏组件-->
      <toolbar></toolbar>
    </el-header>
    <el-container>
      <!--侧边导航栏-->
      <sidebar @bar-click="receive"></sidebar>
      <!--主界面-->
      <component :is="com"></component>
    </el-container>
  </el-container>

</template>

<script>
import HomeToolBar from '../components/HomeToolBar'
import HomeAside from '../components/HomeAside'
import MainIndex from '../components/el-main/MainIndex'
import MainPersonInfo from '../components/el-main/MainPersonInfo'
const { ipcRenderer } = require('electron')
export default {
  name: 'Home',
  data () {
    return {
      com: 'mainpage'
    }
  },
  mounted () {
    this.changeWindowSize()
  },
  methods: {
    changeWindowSize () {
      ipcRenderer.send('changWindowSize')
    },
    receive (val) {
      console.log(val)
      this.com = val
    }
  },
  components: {
    toolbar: HomeToolBar,
    sidebar: HomeAside,
    mainpage: MainIndex,
    info: MainPersonInfo
  }
}
</script>
<style lang="stylus" scoped>
</style>
