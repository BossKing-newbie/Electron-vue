<template>
  <el-main>
    <div class="info">
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <div slot="tip" class="el-upload__tip">用户头像只能上传jpg/png文件</div>
        <div slot="tip" class="el-upload__tip">且不超过500kb</div>
        <el-avatar v-if="ruleForm.imageUrl" :src="ruleForm.imageUrl" fit="contain" :size="60"></el-avatar>
      </el-upload>
      <el-divider direction="vertical"></el-divider>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm">
        <el-form-item>
          <el-radio v-model="ruleForm.sex" label="man">男</el-radio>
          <el-radio v-model="ruleForm.sex" label="woman">女</el-radio>
        </el-form-item>
        <el-form-item prop="username" style="text-align: center">
          <el-row>
            <el-input placeholder="用户昵称" prefix-icon="el-icon-user" clearable v-model="ruleForm.username"></el-input>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-cascader
            v-model="selectedOptions"
            :options="options"
            @change="handleChange" style="width: 250px" placeholder="请选择默认收货地区"></el-cascader>
        </el-form-item>
        <el-form-item prop="detailAddress">
          <el-input placeholder="详细地址" prefix-icon="el-icon-location-information" clearable v-model="ruleForm.detailAddress"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" round>确认修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-main>
</template>

<script>
import { regionData, CodeToText } from 'element-china-area-data'

export default {
  name: 'MainPersonInfo',
  data () {
    /* 验证用户昵称 */
    const validateUser = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户昵称'))
      } else {
        callback()
      }
    }
    /* 验证详细地址不为空 */
    const validateAddress = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入详细地址'))
      } else {
        callback()
      }
    }
    return {
      selectedOptions: [],
      options: regionData,
      ruleForm: {
        username: '',
        sex: 'man',
        address: '',
        detailAddress: '',
        imageUrl: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        relaName: ''
      },
      rules: {
        username: [
          {
            validator: validateUser,
            trigger: 'blur'
          }
        ],
        detailAddress: [
          {
            validator: validateAddress,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    /* 头像处理逻辑 */
    handleAvatarSuccess (res, file) {
      const reader = new FileReader()
      // 定义当前指针域
      const _this = this
      reader.readAsDataURL(file.raw) // 读出 base64
      if (res) {
        this.$message({
          message: '上传成功！',
          type: 'success'
        })
      }
      reader.onloadend = function () {
        // eslint-disable-next-line no-const-assign
        _this.ruleForm.imageUrl = reader.result
        // console.log(_this.ruleForm.imageUrl)
        _this.$emit('update-avatar', _this.ruleForm.imageUrl)
      }
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handleChange () {
      console.log(this.selectedOptions)
      for (let i = 0; i < this.selectedOptions.length; i++) {
        this.ruleForm.address += CodeToText[this.selectedOptions[i]] + '-'
      }
    },
    submitForm (formName) {
      const _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          _this.$notify({
            title: '成功',
            message: '修改个人信息成功！',
            type: 'success'
          })
          /* 字符串拼接 */
          this.ruleForm.detailAddress = this.ruleForm.address + this.ruleForm.detailAddress
          this.$refs[formName].resetFields()
          _this.selectedOptions = []
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .el-avatar
    margin-top:100px
    margin-left -450px
  .info
    box-shadow 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
    border-radius 10px
    width 650px
    height 400px
    margin-left 65px
  .el-form
    margin-top -310px
    margin-left 300px
    margin-right 100px
  .el-divider
    height 320px
    margin-top -200px
    margin-left -220px
  .el-upload__tip
    margin-left -450px
    margin-top 20px
</style>
