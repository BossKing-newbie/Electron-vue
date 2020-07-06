<template>
  <el-header>
    <el-row align="middle" type="flex">
      <el-image src="https://s1.ax1x.com/2020/05/16/Y6EZlQ.png"></el-image>
      <el-button class="item_gutter" icon="el-icon-s-home" circle title="首页" @click="renderingMain('mainpage')"></el-button>
      <span></span>
      <el-tooltip :content="currentDate" placement="bottom" class="item" effect="light">
        <el-button icon="el-icon-date" circle></el-button>
      </el-tooltip>
      <el-badge is-dot class="item">
        <el-button icon="el-icon-share" circle title="打卡" @click="drawer = true"></el-button>
      </el-badge>
      <el-button icon="el-icon-switch-button" circle title="退出登录" class="item" @click="back"></el-button>
      <el-drawer :visible.sync="drawer" :direction="direction">
        <div class="seven">
        <!--编辑区-->
          <el-col></el-col>
          <p style="font-size: 11px;margin-left: -120px">
            公司各部门：
          </p>
          <p style="font-size: 11px;margin-left: 60px;margin-right: 50px">
            <span style="margin-left: 15px">根据疫情期间的变化和公司统一安排，</span>
            为方便员工出行安全，保障员工的工作状态，
            经公司研究决定，自6月1日起，上班时间调整为：
          </p>
          <p style="font-size: 11px;margin-left: 60px;margin-right: 50px">
            上午：08：00-12：00
          </p>
          <p style="font-size: 11px;margin-left: 60px;margin-right: 50px">
            下午：13：00-20：00
          </p>
          <p style="font-size: 11px;margin-left: 60px;margin-right: 60px">
            <i class="el-icon-alarm-clock"></i> ：请各位严格遵守考勤制度，上下班按时打卡。
          </p>
          <p style="font-size: 11px;margin-left: 145px;margin-right: 50px">
            快递屋有限公司人事部
          </p>
          <p style="font-size: 11px;margin-left: 180px;margin-right: 50px">
            2020年5月20日
          </p>
          <el-button type="warning" style="margin-right: 30px;margin-left: 10px;margin-top: 30px" @click="open1">上班打卡</el-button>
          <el-button type="danger" @click="open2">下班打卡</el-button>
        </div>
      </el-drawer>
    </el-row>
  </el-header>
</template>

<script>
export default {
  name: 'AdminHomeToolBar',
  data () {
    return {
      drawer: false,
      direction: 'rtl',
      value: null
    }
  },
  methods: {
    back () {
      this.$message({
        message: '退出成功！',
        type: 'success'
      })
      /* 返回登录界面 */
      this.$router.push('/')
    },
    renderingMain (c) {
      this.$emit('rendering-main', c)
    },
    open1 () {
      const hour = new Date().getHours()
      const secend = new Date().getMinutes()
      this.$notify({
        title: '上班打卡成功 ✔️',
        message: '您的上班打卡时间为：' + hour + ':' + secend,
        offset: 300
      })
    },
    open2 () {
      const hour = new Date().getHours()
      const secend = new Date().getMinutes()
      this.$notify({
        title: '下班打卡成功 ✔️',
        message: '您的下班打卡时间为：' + hour + ':' + secend,
        offset: 300
      })
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
    background-image: url('https://s1.ax1x.com/2020/07/05/USdgBj.png')
    margin-top -30px
    height 550px
    color bisque
  .el-col
    margin-top 180px
</style>
