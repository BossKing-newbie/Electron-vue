<template>
  <el-container>
    <el-header>
      <!--工具栏组件-->
      <toolbar @rendering-main="receive"></toolbar>
    </el-header>
    <el-container>
      <!--侧边导航栏-->
      <sidebar @bar-click="receive" :imageUrl="imageUrl"></sidebar>
      <!--主界面-->
      <component :is="com" @update-avatar="updateAvatar"></component>
    </el-container>
  </el-container>

</template>

<script>
import AdminHomeToolBar from '../components/AdminHomeToolBar'
import AdminHomeAside from '../components/AdminHomeAside'
import AdminMainIndex from '../components/Admin_Info/AdminMainIndex'
import OrderEntry from '../components/Admin_Info/OrderEntry'
import OrderCheck from '../components/Admin_Info/OrderCheck'
import WareInput from '../components/Admin_warehouse/WareInput'
import WareOutput from '../components/Admin_warehouse/WareOutput'
import LookFor from '../components/Admin/LookFor'
import Add from '../components/Admin/Add'

const { ipcRenderer } = require('electron')
export default {
  name: 'AdminHome',
  data () {
    return {
      com: 'mainpage',
      imageUrl: 'https://s1.ax1x.com/2020/07/04/NvcGJ1.png'
    }
  },
  mounted () {
    this.changeAdminHomeSize()
  },
  methods: {
    changeAdminHomeSize () {
      ipcRenderer.send('changAdminHomeSize')
    },
    receive (val) {
      console.log(val)
      this.com = val
    },
    updateAvatar (avatar) {
      this.imageUrl = avatar
    }
  },
  components: {
    toolbar: AdminHomeToolBar,
    sidebar: AdminHomeAside,
    mainpage: AdminMainIndex,
    orderentry: OrderEntry,
    ordercheck: OrderCheck,
    wareinput: WareInput,
    wareoutput: WareOutput,
    lookfor: LookFor,
    add: Add
  }
}
</script>
<style lang="stylus" scoped>
</style>
