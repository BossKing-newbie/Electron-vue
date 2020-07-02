<template>
    <div>
      <h2>我是首页</h2>
      <button @click="login">我是用户</button>
      <button>我是管理员</button>
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
      this.$router.push('login')
    }
  },
  mounted () {
    this.changeWinSize()
  }
}
</script>

<style scoped>

</style>
