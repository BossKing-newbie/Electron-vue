<template>
  <el-main>
    <div class="info">
      <el-row>
        <h2 style="margin-top: 40px;font-family: 'Hiragino Sans GB';color: cornflowerblue">修 改 密 码 <i class="el-icon-unlock"></i></h2>
      </el-row>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="旧密码" prop="oldPass">
          <el-input type="password" placeholder="请输入旧密码" v-model="ruleForm.oldPass" autocomplete="off" prefix-icon="el-icon-unlock"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="pass">
          <el-input type="password" placeholder="请输入新密码" v-model="ruleForm.pass" autocomplete="off" prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" placeholder="请再次输入新密码" v-model="ruleForm.checkPass" autocomplete="off" prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="margin-right: 100px" type="primary" @click="submitForm('ruleForm')" round>提交</el-button>
          <el-button @click="resetForm('ruleForm')" round>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-main>
</template>

<script>
import Qs from 'qs'
export default {
  name: 'MainChangePwd',
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入旧密码'))
      } else { // 把下面改成 判断是否与数据库里的一致
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    const validatePass1 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else if (value === this.ruleForm.oldPass) {
        callback(new Error('新密码不能与旧密码相同!'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        oldPass: '',
        pass: '',
        checkPass: ''
      },
      rules: {
        oldPass: [
          {
            validator: validatePass,
            trigger: 'blur',
            required: true
          }
        ],
        pass: [
          {
            validator: validatePass1,
            trigger: 'blur',
            required: true
          }
        ],
        checkPass: [
          {
            validator: validatePass2,
            trigger: 'blur',
            required: true
          }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      // 定义当前指针域
      const _this = this
      // 获取session的用户信息
      const sessionData = Qs.parse(sessionStorage.getItem('user'))
      // 定义表单提交数据
      const formData = {
        userId: sessionData.userId,
        oldPassword: this.ruleForm.oldPass,
        newPassword: this.ruleForm.pass
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios({
            method: 'post',
            url: 'http://localhost:8081/user/update_pwd',
            data: Qs.stringify(formData),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(function (response) {
            if (response.data.code === 200) {
              _this.$message({
                message: '密码修改成功!请重新登录!',
                type: 'success',
                center: true
              })
              /* 返回登录界面 */
              _this.$router.push('/')
            } else if (response.data.code === 500) {
              _this.$message.error('密码错误')
            } else {
              _this.$message.error('服务器更新失败!')
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
    }
  }
}

</script>

<style lang="stylus" scoped>
  .info
    box-shadow 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
    border-radius 10px
    width 650px
    height 400px
    margin-left 65px
  .el-form
    margin-right 110px
    margin-left 50px
    margin-top 20px
  .el-button
    margin-top 20px
    margin-left -50px
</style>
