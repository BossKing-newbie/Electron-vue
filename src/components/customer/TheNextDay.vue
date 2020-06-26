<template>
  <div class="nextday">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="寄件人信息" name="first" >
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="姓名:"  prop="sender_name">
            <el-input v-model="form.sender_name"></el-input>
          </el-form-item>
          <el-form-item label="手机号码:" prop="sender_phone">
            <el-input  v-model="form.sender_phone"></el-input>
          </el-form-item>
          <el-form-item label="省市区:" prop="sender_Address"   style="text-align: left">
            <el-cascader
              v-model="selectedOptions"
              :options="options"
              @change="handleChange" style="width: 250px" placeholder="请选择默认收货地区"></el-cascader>
          </el-form-item>
          <el-form-item prop="sender_detailAddress" label="详细地址:">
            <el-input placeholder="详细地址" prefix-icon="el-icon-location-information" clearable v-model="form.detailAddress"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">下一步</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="收件人信息" name="second">
        <el-form ref="form2" :model="form2" label-width="80px">
          <el-form-item label="姓名:"  prop="recipient_name">
            <el-input v-model="form2.recipient_name"></el-input>
          </el-form-item>
          <el-form-item label="手机号码:" prop="recipient_phone">
            <el-input  v-model="form2.recipient_phone"></el-input>
          </el-form-item>
          <el-form-item label="省市区:" prop="recipient_Address"   style="text-align: left">
            <el-cascader
              v-model="selectedOptions2"
              :options="options"
              @change="handleChange" style="width: 250px" placeholder="请选择默认收货地区"></el-cascader>
          </el-form-item>
          <el-form-item prop="recipient_detailAddress" label="详细地址:">
            <el-input placeholder="详细地址" prefix-icon="el-icon-location-information" clearable v-model="form2.recipient_detailAddress"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">下一步</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="货物信息" name="third" >
        <el-form ref="form3" :model="form3" label-width="80px">
          <el-form-item label="总重量:"  prop="weight"    style="text-align: left">
            <el-input v-model="form3.weight" style="width:300px;"></el-input>KG
          </el-form-item>
          <el-form-item label="总体积:" prop="volume "    style="text-align: left">
            <el-input  placeholder="m³"  v-model="form3.volume "  style="width:300px;"></el-input>m³
          </el-form-item>
          <el-form-item prop="volume" label="货物个数:"    style="text-align: left">
            <el-input clearable v-model="form3.number "  style="width:180px;"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">下单</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="估价" name="fourth" >估价</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { regionData, CodeToText } from 'element-china-area-data'

export default {
  data () {
    /* 验证姓名 */
    const validatename = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入姓名'))
      } else {
        callback()
      }
    }
    /* 验证手机 */
    const validatephone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号码'))
      } else {
        if (value.length === 11) {
          callback()
        } else {
          callback(new Error('请输入正确格式的手机号码'))
        }
      }
    }
    /* 验证详细地址不为空 */
    const validatedetailAddress = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入详细地址'))
      } else {
        callback()
      }
    }
    return {
      activeName: 'first',
      selectedOptions: [],
      selectedOptions2: [],
      options: regionData,
      form: {
        sender_name: '',
        sender_phone: '',
        sender_Address: '',
        sender_detailAddress: ''
      },
      form2: {
        recipient_name: '',
        recipient_phone: '',
        recipient_Address: '',
        recipient_detailAddress: ''
      },
      form3: {
        weight: '1',
        volume: '0.01',
        number: '1'
      },
      rules: {
        sender_name: [
          {
            validator: validatename,
            trigger: 'blur'
          }
        ],
        sender_phone: [
          {
            validator: validatephone,
            trigger: 'blur'
          }
        ],
        sender_detailAddress: [
          {
            validator: validatedetailAddress,
            trigger: 'blur'
          }
        ],
        recipient_name: [
          {
            validator: validatename,
            trigger: 'blur'
          }
        ],
        recipient_phone: [
          {
            validator: validatephone,
            trigger: 'blur'
          }
        ],
        recipient_detailAddress: [
          {
            validator: validatedetailAddress,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    handleChange () {
      console.log(this.selectedOptions)
      for (let i = 0; i < this.selectedOptions.length; i++) {
        this.ruleForm.address += CodeToText[this.selectedOptions[i]] + '-'
      }
    },
    handleClick (tab, event) {
      console.log(tab, event)
    },
    onSubmit () {
      console.log(2)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .nextday
   box-shadow 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
   border-radius 10px
   width 650px
   height 400px
   margin-left 85px
   margin-top 20px
</style>
