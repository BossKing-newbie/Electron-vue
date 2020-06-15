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
import HomeToolBar from '../components/HomeToolBar'
import HomeAside from '../components/HomeAside'
import MainIndex from '../components/el-main/MainIndex'
import MainPersonInfo from '../components/el-main/MainPersonInfo'
import CustomerService from '../components/el-main/CustomerService'
// 修改密码组件
import MainChangePwd from '../components/el-main/MainChangePwd'
// 物流状态组件
import orderTable from '../components/order/orderTable'
// 历史订单组件
import orderHistory from '../components/order/orderHistory'
// 修改手机号码获取验证码界面
import ChangePhone from '../components/el-main/ChangePhone'
// 当日达
import SameDay from '../components/customer/SameDay'
// 次日达
import TheNextDay from '../components/customer/TheNextDay'
// 72小时达
import SeventyTwo from '../components/customer/SeventyTwo'
const { ipcRenderer } = require('electron')
export default {
  name: 'Home',
  data () {
    return {
      com: 'mainpage',
      imageUrl: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
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
    },
    updateAvatar (avatar) {
      this.imageUrl = avatar
    }
  },
  components: {
    toolbar: HomeToolBar,
    sidebar: HomeAside,
    mainpage: MainIndex,
    info: MainPersonInfo,
    changepwd: MainChangePwd,
    customerservice: CustomerService,
    logistics: orderTable,
    historyorder: orderHistory,
    changephone: ChangePhone,
    sameday: SameDay,
    next: TheNextDay,
    seventy: SeventyTwo
  }
}
</script>
<style lang="stylus" scoped>
</style>
