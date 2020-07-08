<template>
  <div class="main">
    <div class="back">
      <i class="el-icon-back" @click="back"></i>
    </div>
    <div class="avatar">
      <el-avatar :size="60" src="https://s1.ax1x.com/2020/07/04/NvcGJ1.png"></el-avatar>
    </div>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item prop="account">
        <el-input placeholder="请输入账号" v-model="ruleForm.account" clearable prefix-icon="el-icon-user"></el-input>
      </el-form-item>
      <el-form-item prop="pass">
        <el-input type="password" placeholder="请输入密码" v-model="ruleForm.pass" clearable autocomplete="off" prefix-icon="el-icon-lock"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" round @click="login">登 录</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="info" round @click="resetForm('ruleForm')">重 置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'AdminLogin',
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
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    login () {
      if (this.ruleForm.account === 'seven' && this.ruleForm.pass === '123456') {
        this.$message({
          showClose: true,
          message: '登录成功！欢迎您，seven',
          type: 'success'
        })
        this.$router.push('AdminHome')
      } else {
        this.$message.error('用户名或密码错误！')
      }
    },
    back () {
      this.$router.push('/')
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
    margin-top 80px
    margin-bottom 30px
  .el-button
    width 100%
  .back
    margin-top -80px
    margin-left -250px
</style>
