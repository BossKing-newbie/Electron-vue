<!--修改手机获取验证码界面-->
<template>
  <div class="main">
    <el-row>
      <h2 style="margin-top: 40px;font-family: 'Hiragino Sans GB';color: cornflowerblue">修 改 手 机 <i class="el-icon-mobile-phone"></i></h2>
    </el-row>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="旧手机号" prop="oldPhone">
        <el-input type="text" placeholder="请输入旧手机号" v-model="ruleForm.oldPhone" autocomplete="off" prefix-icon="el-icon-phone"></el-input>
      </el-form-item>
      <el-form-item label="新手机号" prop="phone">
        <el-input type="text" placeholder="请输入新手机号" v-model="ruleForm.phone" prefix-icon="el-icon-phone-outline"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="number">
        <el-input type="text" placeholder="请输入验证码" v-model="ruleForm.number" prefix-icon="el-icon-mobile">
          <el-button v-show="Verification" slot="append" @click="getCaptcha">{{CaptchaText}}</el-button>
          <el-button v-show="!Verification" slot="append"><span>{{timer}}秒后重新获取</span></el-button>
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
export default {
  name: 'ChangePhone',
  data () {
    const validateoldPhone = (rule, value, callback) => { // 还需判断是否与数据库的一致
      if (!value) {
        return callback(new Error('手机号不能为空！'))
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
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
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
        oldPhone: [
          {
            validator: validateoldPhone,
            trigger: 'blur',
            required: true
          }
        ],
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
    // 获取验证码的按钮操作
    getCaptcha () {
      this.Verification = !this.Verification
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
