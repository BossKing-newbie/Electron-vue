<template>
    <div>
      <el-button @click="login" type="primary" round icon="el-icon-user" class="user">我 是 用 户</el-button>
      <el-button @click="admin" type="primary" round icon="el-icon-s-custom" class="management">我 是 管 理 员</el-button>
    </div>
</template>

<script>
const { ipcRenderer } = require('electron')
export default {
  name: 'Index',
  methods: {
    changeWinSize () {
      ipcRenderer.send('changIndexSize')
    },
    login () {
      this.$router.push('Login')
    },
    admin () {
      this.$router.push('Admin')
    }
  },
  mounted () {
    this.changeWinSize()
  }
}
</script>

<style lang="stylus" scoped>
  .user
    margin-top 30px
    margin-right 10px
    width 200px
  .management
    margin-top 70px
    margin-right 20px
    width 200px
</style>
