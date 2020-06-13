<template>
  <el-main>
    <div class="info">
      <el-upload
        class="avatar-uploader"
        action="http://localhost:8081/userInfo/upload"
        :http-request="upload"
        :show-file-list="false"
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
        sex: 'woman',
        address: [],
        detailAddress: '',
        imageUrl: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
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
  mounted () {
    this.getUserInfo()
  },
  methods: {
    /* 自定义上传函数 */
    upload (file) {
      // 定义当前指针域
      const _this = this
      const formData = new FormData()
      formData.append('avatar', file.file)
      formData.append('avatarName', '20170060309')
      console.log(formData)
      this.axios({
        method: 'post',
        url: 'http://localhost:8081/userInfo/upload',
        data: formData
      }).then(function (response) {
        console.log(response.data)
        if (response.data.code === 200) {
          _this.$message({
            message: '上传成功！',
            type: 'success'
          })
          _this.ruleForm.imageUrl = response.data.data.imageUrl
          console.log(response.data.data.imageUrl)
          // console.log(_this.ruleForm.imageUrl)
          _this.$emit('update-avatar', _this.ruleForm.imageUrl)
        }
      })
    },
    /* 头像处理逻辑 */
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      let isUpload = false
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      this.$confirm('是否上传该文件!, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // eslint-disable-next-line no-const-assign
        isUpload = true
      }).catch(() => {
        isUpload = false
      })
      return isJPG && isLt2M && isUpload
    },
    /* 级联选择器的变换函数 */
    handleChange () {
      for (let i = 0; i < this.selectedOptions.length; i++) {
        this.ruleForm.address[i] = (CodeToText[this.selectedOptions[i]])
      }
    },
    /* 表单提交操作 */
    submitForm (formName) {
      // 定义当前指针域
      const _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          /* 字符串拼接 */
          this.ruleForm.detailAddress = this.ruleForm.address.join('-') + '/' + this.ruleForm.detailAddress
          console.log(this.ruleForm.detailAddress)
          this.$refs[formName].resetFields()
          _this.selectedOptions = []
          _this.$notify({
            title: '成功',
            message: '修改个人信息成功！',
            type: 'success'
          })
          _this.getUserInfo()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    /* 获取用户信息的get请求 */
    getUserInfo () {
      // 定义当前指针域
      const _this = this
      this.axios({
        method: 'get',
        url: 'http://localhost:8081/userInfo/724574109'
      }).then(function (response) {
        console.log(response.data.data)
        _this.ruleForm.sex = response.data.data.userSex
        if (response.data.data.userName) {
          _this.ruleForm.username = response.data.data.userName
        }
        if (response.data.data.userAvatar) {
          _this.ruleForm.imageUrl = response.data.data.userAvatar
          _this.$emit('update-avatar', _this.ruleForm.imageUrl)
        }
        if (response.data.data.userAddress) {
          _this.ruleForm.detailAddress = response.data.data.userAddress
        }
        if (response.data.data.userProvince) {
          _this.selectedOptions = response.data.data.userProvince.split('-')
          _this.handleChange()
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
    margin-top -340px
    margin-left 300px
    margin-right 100px
  .el-divider
    height 330px
    margin-top -200px
    margin-left -220px
  .el-upload__tip
    margin-left -450px
    margin-top 20px
</style>
