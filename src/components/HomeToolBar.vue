<template>
  <el-header>
    <el-row align="middle" type="flex">
      <el-image src="https://s1.ax1x.com/2020/05/16/Y6EZlQ.png"></el-image>
      <el-tooltip content="主界面" placement="bottom" class="item_gutter">
        <el-button icon="el-icon-s-home" circle title="主界面" @click="renderingMain('mainpage')"></el-button>
      </el-tooltip>
      <el-badge :value="1" class="item">
        <el-button icon="el-icon-message" circle title="消息" @click="drawer = true"></el-button>
      </el-badge>
      <el-tooltip :content="currentDate" placement="bottom" class="item">
        <el-button icon="el-icon-timer" circle></el-button>
      </el-tooltip>
      <el-button icon="el-icon-switch-button" circle title="退出登录" class="item" @click="back"></el-button>
      <el-drawer
        :visible.sync="drawer"
        :direction="direction"
        :before-close="handleClose">
        <!--用户手册编辑区-->
        <h4>用户手册</h4>
        <el-divider></el-divider>
        <span style="font-family: '华文楷体'; font-size: 18px;">感谢您对快递屋的支持和关注!
                <br>很高兴能为您提供服务!
                <br>希望我们的服务能让您满意!
                <br><br/>
        </span>
        <table width="315" border="0" style="text-align: right; text-decoration: blink; font-size: 16px; font-family: '楷体';">
          <tr>
            <td width="118" style="text-align: right">个人信息：</td>
            <td width="187" style="text-align: left">查看与修改信息</td>
          </tr>
          <tr>
            <td style="text-align: right">客户服务：</td>
            <td style="text-align: left">下单选择产品</td>
          </tr>
          <tr>
            <td style="text-align: right">订单管理：</td>
            <td style="text-align: left">物流信息管理与历史订单</td>
          </tr>
          <tr>
            <td style="text-align: right">联系我们：</td>
            <td style="text-align: left">随时点击咨询疑问</td>
          </tr>
        </table>
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
      direction: 'rtl'
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
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {
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
    top: 40px
    left: 65px

  .el-image
    cursor: pointer

  .item
    margin-left: 40px

  button
    border none

  .item_gutter
    margin-left 550px
</style>
