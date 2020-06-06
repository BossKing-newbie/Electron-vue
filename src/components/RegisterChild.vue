<template>
  <div class="main">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
      <el-form-item label="您的性别:">
        <el-radio v-model="ruleForm.userSex" label="man">男</el-radio>
        <el-radio v-model="ruleForm.userSex" label="woman">女</el-radio>
      </el-form-item>
      <el-form-item prop="userId">
        <el-input placeholder="请输入账号" v-model="ruleForm.userId" clearable prefix-icon="el-icon-user"></el-input>
      </el-form-item>
      <el-form-item prop="userPassword">
        <el-input placeholder="请输入6~15位密码" type="password" v-model="ruleForm.userPassword" autocomplete="off" prefix-icon="el-icon-lock"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input placeholder="请确认密码" type="password" v-model="ruleForm.checkPass" autocomplete="off" prefix-icon="el-icon-lock"></el-input>
      </el-form-item>
      <el-form-item prop="userPhone">
        <el-input placeholder="请输入手机号码" type="phone" v-model="ruleForm.userPhone" prefix-icon="el-icon-phone"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" round>注册</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="info" round @click="login" class="el-button-login">返回登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Qs from 'qs'
export default {
  name: 'RegisterChild',
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value.length > 15 || value.length < 6) {
        callback(new Error('请输入6~15位密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.userPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    const validateUser = (rule, value, callback) => {
      let code = 0
      if (value === '') {
        callback(new Error('请输入账号'))
      } else if (value.length > 15 || value.length < 6) {
        callback(new Error('请输入6~15位账号名'))
      } else {
        // eslint-disable-next-line no-unused-vars
        this.axios({
          method: 'get',
          url: 'http://localhost:8081/user/' + value
        }).then(function (response) {
          code = parseInt(response.data.code)
          console.log(code)
          if (code === 110) {
            callback()
          } else {
            callback(new Error('该用户已存在'))
          }
        })
      }
    }
    const checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
        console.log(reg.test(value))
        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的手机号'))
        }
      }
    }
    return {
      /* 对应数据库中的每个字段 */
      ruleForm: {
        userPassword: '',
        checkPass: '',
        userPhone: '',
        userId: '',
        userSex: 'man'
      },
      rules: {
        userId: [
          { validator: validateUser, trigger: 'blur' }
        ],
        userPassword: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        userPhone: [
          { validator: checkPhone, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      const _this = this
      const formData = {
        userPassword: this.ruleForm.userPassword,
        userDescribe: '普通会员',
        userPhone: this.ruleForm.userPhone,
        userId: this.ruleForm.userId,
        userSex: this.ruleForm.userSex
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(_this.ruleForm)
          this.axios({
            method: 'post',
            url: 'http://localhost:8081/user/register',
            data: Qs.stringify(formData)
          }).then(function (response) {
            console.log(response)
          })
          this.$message({
            message: '恭喜你，注册成功！',
            type: 'success',
            center: true
          })
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
      this.$emit('register', 'login', '用户登录')
    }
  }
}
</script>

<style lang="stylus" scoped>
  .main
    margin-left 30px
    margin-right 30px
  button
    width 100%
</style>
