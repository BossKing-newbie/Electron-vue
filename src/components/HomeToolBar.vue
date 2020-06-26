<template>
  <el-header>
    <el-row align="middle" type="flex">
      <el-image src="https://s1.ax1x.com/2020/05/16/Y6EZlQ.png"></el-image>
      <el-button class="item_gutter" icon="el-icon-s-home" circle title="首页" @click="renderingMain('mainpage')"></el-button>
      <span></span>
      <el-tooltip :content="currentDate" placement="bottom" class="item" effect="light">
        <el-button icon="el-icon-date" circle></el-button>
      </el-tooltip>
      <el-badge :value="1" class="item">
        <el-button icon="el-icon-message-solid" circle title="消息" @click="drawer = true"></el-button>
      </el-badge>
      <el-button icon="el-icon-switch-button" circle title="退出登录" class="item" @click="back"></el-button>
      <el-drawer :visible.sync="drawer" :direction="direction">
        <div class="seven">
        <!--编辑区-->
          <el-col></el-col>
          <p style="font-size: larger">— — 营业时间 — —</p>
          <p>夏季</p>
          <p>8:00-20:00</p>
          <p>冬季</p>
          <p>9:00-21:00</p>
          <el-rate v-model="value" show-text></el-rate>
          <p style="font-size: 12px">当天送达：最快8小时门到门送达</p>
          <p style="font-size: 12px">次日到达：最快12小时门到门送达</p>
          <p style="font-size: 12px">隔日到达：最快36小时门到门送达</p>
          <p style="font-size: 20px;color: transparent">这里用于格式</p>
        </div>
      </el-drawer>
    </el-row>
  </el-header>
</template>

<script>
export default {
  name: 'HomeToolBar',
  data () {
    return {
      drawer: false,
      direction: 'rtl',
      value: null
    }
  },
  methods: {
    back () {
      sessionStorage.clear()
      this.$message({
        message: '退出成功！',
        type: 'success'
      })
      /* 返回登录界面 */
      this.$router.push('/')
    },
    renderingMain (c) {
      this.$emit('rendering-main', c)
    }
  },
  computed: {
    currentDate () {
      return new Date().toDateString()
    }
  }
}
</script>

<style lang="stylus" scoped>
  .el-row
    position: absolute
    top: 43px
    left: 50px
  .item
    margin-left: 30px
  button
    border none
  .item_gutter
    margin-left 580px
  .seven
    background-image: url('https://s1.ax1x.com/2020/06/16/NkD8G6.png')
    margin-top -20px
  .el-col
    margin-top 150px
</style>
