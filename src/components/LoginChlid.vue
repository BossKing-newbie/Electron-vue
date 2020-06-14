<template>
  <div class="main">
    <div class="avatar">
      <el-avatar :size="60" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
    </div>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item prop="account">
        <el-input placeholder="请输入账号" v-model="ruleForm.account" clearable prefix-icon="el-icon-user"></el-input>
      </el-form-item>
      <el-form-item prop="pass">
        <el-input type="password" placeholder="请输入密码" v-model="ruleForm.pass" autocomplete="off" prefix-icon="el-icon-lock"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" round @click="submitForm('ruleForm')">登录</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="info" round @click="register">用户注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Qs from 'qs'
export default {
  name: 'Login',
  data () {
    const validateUser = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号'))
      } else if (value.length > 15 || value.length < 5) {
        callback(new Error('请输入5~15位账号'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    return {
      ruleForm: {
        account: '',
        pass: ''
      },
      rules: {
        account: [
          { validator: validateUser, trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      const _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios({
            method: 'post',
            url: 'http://localhost:8081/user/login',
            data: Qs.stringify(this.ruleForm)
          }).then(function (response) {
            if (response.data.code === 200) {
              _this.$message({
                message: '欢迎您，用户' + response.data.data.userId,
                type: 'success',
                center: true
              })
              // 将用户信息存入sessionStorage
              sessionStorage.setItem('user', Qs.stringify(response.data.data))
              _this.$router.push('Home')
            } else {
              _this.$message.error('用户名或密码错误')
            }
            console.log(response)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    register () {
      this.$emit('register', 'register', '用户注册')
    }
  }
}
</script>

<style lang="stylus" scoped>
  .main
    margin-left -70px
    margin-right 30px
  .avatar
    margin-left 100px
    margin-top 30px
    margin-bottom 30px
  button
    width 100%
</style>
