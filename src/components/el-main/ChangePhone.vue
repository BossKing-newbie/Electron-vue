<!--修改手机获取验证码界面-->
<template>
  <div class="main">
    <el-row>
      <h2 style="margin-top: 40px;font-family: 'Hiragino Sans GB';color: cornflowerblue">修 改 手 机 <i class="el-icon-mobile-phone"></i></h2>
    </el-row>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="旧手机号" prop="oldPhone">
        <el-input type="text" placeholder="请输入旧手机号" clearable v-model="ruleForm.oldPhone" autocomplete="off" prefix-icon="el-icon-phone"></el-input>
      </el-form-item>
      <el-form-item label="新手机号" prop="phone">
        <el-input type="text" placeholder="请输入新手机号" clearable v-model="ruleForm.phone" prefix-icon="el-icon-phone-outline"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="number">
        <el-input type="text" placeholder="请输入验证码" clearable v-model="ruleForm.number" prefix-icon="el-icon-mobile">
          <el-button v-show="Verification" slot="append" @click="getCaptcha">{{CaptchaText}}</el-button>
          <el-button v-show="!Verification" slot="append" disabled><span>{{timer}}秒后重新获取</span></el-button>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button style="margin-right: 100px" type="primary" @click="submitForm('ruleForm')" round>提交</el-button>
        <el-button @click="resetForm('ruleForm')" round>重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 引入vue字符串序列化对象
import Qs from 'qs'
export default {
  name: 'ChangePhone',
  data () {
    const validatePhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('新手机号不能为空！'))
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
        console.log(reg.test(value))
        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的手机号！'))
        }
      }
    }
    const validateNumber = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        oldPhone: '',
        phone: '',
        number: ''
      },
      rules: {
        phone: [
          {
            validator: validatePhone,
            trigger: 'blur',
            required: true
          }
        ],
        number: [
          {
            validator: validateNumber,
            trigger: 'blur',
            required: true
          }
        ]
      },
      Verification: true, // 设置两个按钮谁显示
      timer: 60, // 定义1分钟内重新获取
      CaptchaText: '获取验证码'
    }
  },
  mounted () {
    this.getOldPhone()
  },
  methods: {
    submitForm (formName) {
      // 定义当前指针域
      const _this = this
      // 从sessionStorage中获取登录后返回的用户信息
      const data = Qs.parse(sessionStorage.getItem('user'))
      // 设置提交表单的属性
      const formData = {
        userId: data.userId,
        newPhone: this.ruleForm.phone,
        randomCode: this.ruleForm.number
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios({
            method: 'post',
            url: 'http://localhost:8081/user/receive_sms',
            data: Qs.stringify(formData),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            withCredentials: true
          }).then(function (response) {
            console.log(response.data)
            if (response.data.code === 200) {
              _this.$message({
                message: '恭喜你，修改手机号成功！',
                type: 'success',
                center: true
              })
              _this.$refs[formName].resetFields()
              _this.getOldPhone()
            } else {
              _this.$message({
                message: '修改手机号失败！',
                type: 'error',
                center: true
              })
            }
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
    // 获取验证码的按钮操作
    getCaptcha () {
      // 定义当前指针域
      const _this = this
      this.Verification = !this.Verification
      const formData = {
        newPhone: this.ruleForm.phone
      }
      this.axios({
        method: 'post',
        url: 'http://localhost:8081/user/send_sms',
        data: Qs.stringify(formData),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function (response) {
        if (response.data.code === 200) {
          _this.$message({
            message: '验证码已发送！',
            type: 'success',
            center: true
          })
        } else {
          _this.$message({
            message: '验证码发送失败！',
            type: 'error',
            center: true
          })
        }
      })
      // eslint-disable-next-line camelcase
      const auth_timer = setInterval(() => { // 定时器设置每秒递减
        this.timer-- // 递减时间
        if (this.timer <= 0) {
          this.Verification = !this.Verification // 60s时间结束还原v-show状态并清除定时器
          this.CaptchaText = '重新获取验证码'
          clearInterval(auth_timer)
        }
      }, 1000)
      this.timer = 60
    },
    getOldPhone () {
      // 定义当前指针域
      const _this = this
      // 从sessionStorage中获取登录后返回的用户信息
      const data = Qs.parse(sessionStorage.getItem('user'))
      this.axios({
        method: 'get',
        url: 'http://localhost:8081/user/check_phone/' + data.userId
      }).then(function (response) {
        if (response.data.code === 200) {
          _this.ruleForm.oldPhone = response.data.data.userPhone
        }
      })
    }
  }
}

</script>

<style lang="stylus" scoped>
  .main
    box-shadow 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
    border-radius 10px
    width 650px
    height 400px
    margin-left 85px
    margin-top 20px
  .el-form
    margin-right 110px
    margin-left 50px
    margin-top 20px
  .el-button
    margin-top 20px
    margin-left -50px
</style>
