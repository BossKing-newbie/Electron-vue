<template>
  <el-main>
    <div class="info">
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <div slot="tip" class="el-upload__tip">用户头像只能上传jpg/png文件，且不超过500kb</div>
        <el-avatar v-if="ruleForm.imageUrl" :src="ruleForm.imageUrl" fit="contain" :size="60"
                   style="margin-top:15px"></el-avatar>
      </el-upload>
      <el-divider></el-divider>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm">
        <el-form-item>
          <el-radio v-model="ruleForm.sex" label="man">男</el-radio>
          <el-radio v-model="ruleForm.sex" label="woman">女</el-radio>
        </el-form-item>
        <el-form-item prop="username" style="text-align: center">
          <el-row>
            <el-input placeholder="用户昵称" prefix-icon="el-icon-search" clearable v-model="ruleForm.username"></el-input>
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
        <el-form-item prop="phone" inline-message="false">
          <el-input placeholder="联系电话" prefix-icon="el-icon-phone-outline" clearable v-model="ruleForm.phone"></el-input>
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
    /* 验证手机号 */
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
      selectedOptions: [],
      options: regionData,
      ruleForm: {
        phone: '',
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
        ],
        phone: [
          {
            validator: checkPhone,
            trigger: 'blur',
            required: true
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
  .avatar
    width 100px
    height 100px
    display block

  .info
    box-shadow 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
    border-radius: 10px
    width 350px
    height 550px
    margin-left 175px
  .el-form
    margin-left 50px
    margin-right 50px
</style>
