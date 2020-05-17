<template>
  <el-header>
    <el-row align="middle" type="flex">
      <el-image src="https://s1.ax1x.com/2020/05/16/Y6EZlQ.png"></el-image>
      <el-tooltip content="主界面" placement="bottom" class="item_gutter">
        <el-button icon="el-icon-s-home" circle title="主界面"></el-button>
      </el-tooltip>
      <el-badge :value="3" class="item">
        <el-button icon="el-icon-message" circle title="消息"></el-button>
      </el-badge>
      <el-tooltip :content="currentDate" placement="bottom" class="item">
        <el-button icon="el-icon-timer" circle></el-button>
      </el-tooltip>
      <el-button icon="el-icon-switch-button" circle title="退出登录" class="item" @click="back"></el-button>
    </el-row>
  </el-header>
</template>

<script>
export default {
  name: 'HomeToolBar',
  methods: {
    back () {
      this.$message({
        message: '退出成功！',
        type: 'success'
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
