<template>
  <div class="main">
    <div class="avatar">
      <el-avatar :size="60" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
    </div>
    <div class="item">
      <el-input placeholder="请输入账号" v-model="account" clearable prefix-icon="el-icon-user"></el-input>
    </div>
    <div class="item">
      <el-input placeholder="请输入密码" v-model="password" show-password prefix-icon="el-icon-lock"></el-input>
    </div>
    <div class="item">
      <el-button type="primary" round @click="login">登录</el-button>
    </div>
    <div class="item">
      <el-button type="info" round @click="register">用户注册</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      account: '',
      password: ''
    }
  },
  methods: {
    login () {
      if (this.account === 'admin' && this.password === '123456') {
        this.$message({
          showClose: true,
          message: '登录成功！欢迎您，admin',
          type: 'success'
        })
        this.$router.push('Home')
      } else {
        this.$message.error('用户名或密码错误')
      }
    },
    register () {
      this.$emit('register', 'register', '用户注册')
    }
  }
}
</script>

<style lang="stylus" scoped>
  .main
    margin-left 30px
    margin-right 30px
  .avatar
    margin-top 40px
    margin-bottom 40px
  button
    width 100%
  .item
    margin-top 20px
</style>
