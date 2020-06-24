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
        <el-input type="password" placeholder="请输入密码" v-model="ruleForm.pass" clearable autocomplete="off" prefix-icon="el-icon-lock"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" round @click="login">登录</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="info" round @click="register">用户注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
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
    var validatePass = (rule, value, callback) => {
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
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    login () {
      if (this.ruleForm.account === 'admin' && this.ruleForm.pass === '123456') {
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
    margin-left -70px
    margin-right 30px
  .avatar
    margin-left 100px
    margin-top 30px
    margin-bottom 30px
  button
    width 100%
</style>
