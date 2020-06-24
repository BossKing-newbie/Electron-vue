<template>
  <!--寄件人信息和收件人信息的表单-->
  <el-form label-position="right" :model="formLabelAlign" status-icon :rules="rules"
           style="margin-top: -235px" size="mini" ref="senderForm">
    <el-form-item label="姓名" prop="name">
      <el-input v-model="formLabelAlign.name" clearable placeholder="请填写寄件人姓名" prefix-icon="el-icon-s-custom"></el-input>
    </el-form-item>
    <el-form-item label="手机号码" prop="number">
      <el-input v-model="formLabelAlign.number" clearable placeholder="请填写手机号码" prefix-icon="el-icon-phone-outline"></el-input>
    </el-form-item>
    <el-form-item label="省市区" prop="selectedOptions">
      <el-cascader
        v-model="formLabelAlign.selectedOptions"
        :options="options"
        @change="handleChange" style="width: 250px" clearable placeholder="请选择所在地区,例如:广东省-深圳市-福田区"></el-cascader>
    </el-form-item>
    <el-form-item label="详细地址" prop="address">
      <el-input v-model="formLabelAlign.address" clearable placeholder="请填写所在街道以及详细地址" prefix-icon="el-icon-location"></el-input>
    </el-form-item>
    <el-form-item class="nextone">
      <el-button type="primary" @click="next('senderForm')">下一步 <i class="el-icon-right"></i></el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { CodeToText, regionData } from 'element-china-area-data'
export default {
  name: 'SenderForm',
  data () {
    const checkName = (rule, value, callback) => {
      if (!value) {
        callback(new Error('姓名不能为空！'))
      } else {
        callback()
      }
    }
    const checkNumber = (rule, value, callback) => {
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
    const checkAddress = (rule, value, callback) => {
      if (!value) {
        callback(new Error('详细地址不能为空！'))
      } else {
        callback()
      }
    }
    return {
      options: regionData,
      prefix: '',
      formLabelAlign: {
        name: '',
        number: '',
        address: '',
        detailAddress: '',
        selectedOptions: [],
        active: true
      },
      rules: {
        name: [
          { required: true, validator: checkName, trigger: 'blur' }
        ],
        number: [
          { required: true, validator: checkNumber, trigger: 'blur' }
        ],
        address: [
          { required: true, validator: checkAddress, trigger: 'blur' }
        ],
        selectedOptions: [
          { required: true, message: '请选择省市区！', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    next (formName) {
      const _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formLabelAlign.detailAddress = this.prefix + '/' + this.formLabelAlign.address
          _this.$emit('switch', this.formLabelAlign)
        }
      })
    },
    handleChange () {
      for (let i = 0; i < this.formLabelAlign.selectedOptions.length; i++) {
        this.prefix += CodeToText[this.formLabelAlign.selectedOptions[i]]
      }
      console.log(this.prefix)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .el-form-item
    width 250px
    height 50px
    margin-left 200px
  .nextone
    margin-left 430px
    margin-top -40px
</style>
