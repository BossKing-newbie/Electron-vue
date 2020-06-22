<template>
  <div class="sameday">
    <el-steps :active="active" finish-status="success"
              align-center style="margin-top: 30px;height: 5px" >
      <el-step title="寄件人信息"></el-step>
      <el-step title="收件人信息"></el-step>
      <el-step title="预约信息"></el-step>
      <el-step title="完成下单"></el-step>
    </el-steps>
    <p style="margin-left: -500px;margin-top: 100px;font-size: 30px">当</p>
    <p style="margin-left: -500px;font-size: 30px">日</p>
    <p style="margin-left: -500px;font-size: 30px">达</p>
    <!--寄件人信息和收件人信息的表单-->
    <el-form label-position="right" :model="formLabelAlign" status-icon :rules="rules"
             style="margin-top: -235px" size="mini" v-show="false">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="formLabelAlign.name" placeholder="请填写联系人姓名" prefix-icon="el-icon-s-custom"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="number">
        <el-input v-model="formLabelAlign.number" placeholder="请填写手机号码" prefix-icon="el-icon-phone-outline"></el-input>
      </el-form-item>
      <el-form-item label="省市区" prop="city">
        <el-cascader
          v-model="selectedOptions"
          :options="options"
          @change="handleChange" style="width: 250px" clearable placeholder="请选择所在地区,例如:广东省-深圳市-福田区"></el-cascader>
      </el-form-item>
      <el-form-item label="详细地址" prop="address">
        <el-input v-model="formLabelAlign.address" placeholder="请填写所在街道以及详细地址" prefix-icon="el-icon-location"></el-input>
      </el-form-item>
      <el-form-item class="backone"><!-- 上一步这个按钮除了第一个界面不出现，后面三个界面都要出现-->
        <el-button type="info" style="margin-top: 5px" @click="back">上一步</el-button>
      </el-form-item>
      <el-form-item class="nextone">
      <el-button type="primary" style="margin-top: 5px" @click="next">下一步 <i class="el-icon-right"></i></el-button>
      </el-form-item>
    </el-form>
    <!--预约信息的表单-->
    <el-form label-position="right" :model="formLabelAlign" status-icon :rules="rules"
             style="margin-top: -200px" size="mini" v-show="true">
      <el-radio-group v-model="formLabelAlign.serve" style="margin-bottom: 10px;margin-top: -50px">
        <el-radio label="快递员上门取件">快递员上门取件</el-radio>
        <el-radio label="自行联系快递员或自寄">自行联系快递员或自寄</el-radio>
      </el-radio-group>
      <el-form-item label="上门时间" prop="value" style="margin-top: -10px">
        <el-select v-model="formLabelAlign.value" clearable placeholder="请选择时间" style="width: 250px">
          <el-option
            v-for="item in timeoptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="快递产品" prop="pro">
        <el-tag effect="plain" type="info" style="width: 180px;height: 65px;">
          <p style="font-size: 20px;margin-top: 5px">￥12 起</p>
          <p style="margin-top: -20px">明天12:00前送达</p>
        </el-tag>
      </el-form-item>
      <el-form-item label="捎话给快递员" prop="message">
        <el-input v-model="formLabelAlign.message" placeholder="您的备注" prefix-icon="el-icon-chat-line-square"></el-input>
      </el-form-item>
      <el-form-item class="backone"><!-- 上一步这个按钮除了第一个界面不出现，后面三个界面都要出现-->
        <el-button type="info" style="margin-top: 30px;" @click="back">上一步</el-button>
      </el-form-item>
      <el-form-item class="nextone">
        <el-button type="primary" style="margin-top: 30px;" @click="next">下一步 <i class="el-icon-right"></i></el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { CodeToText, regionData } from 'element-china-area-data'

export default {
  name: 'SameDay',
  data () {
    var checkName = (rule, value, callback) => {
      if (!value) {
        callback(new Error('姓名不能为空！'))
      } else {
        callback()
      }
    }
    var checkNumber = (rule, value, callback) => {
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
    var checkAddress = (rule, value, callback) => {
      if (!value) {
        callback(new Error('详细地址不能为空！'))
      } else {
        callback()
      }
    }
    return {
      active: 0,
      selectedOptions: [],
      options: regionData,
      formLabelAlign: {
        name: '',
        number: '',
        city: '',
        address: '',
        serve: '快递员上门取件',
        value: ''
      },
      timeoptions: [{
        value: 'time',
        label: '一小时内'
      }, {
        value: 'time1',
        label: '09:00~10:00'
      }, {
        value: 'time2',
        label: '09:00~10:00'
      }, {
        value: 'time3',
        label: '10:00~11:00'
      }, {
        value: 'time4',
        label: '11:00~12:00'
      }, {
        value: 'time5',
        label: '12:00~13:00'
      }, {
        value: 'time6',
        label: '13:00~14:00'
      }, {
        value: 'time7',
        label: '14:00~15:00'
      }, {
        value: 'time8',
        label: '15:00~16:00'
      }, {
        value: 'time9',
        label: '16:00~17:00'
      }, {
        value: 'time10',
        label: '17:00~18:00'
      }, {
        value: 'time11',
        label: '18:00~19:00'
      }, {
        value: 'time12',
        label: '19:00~20:00'
      }],
      rules: {
        name: [
          { validator: checkName, trigger: 'blur' }
        ],
        number: [
          { validator: checkNumber, trigger: 'blur' }
        ],
        address: [
          { validator: checkAddress, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    back () {
      if (this.active-- < 0) this.active = 0
    },
    next () {
      if (this.active++ > 3) this.active = 4
    },
    handleChange () {
      console.log(this.selectedOptions)
      for (let i = 0; i < this.selectedOptions.length; i++) {
        this.ruleForm.address += CodeToText[this.selectedOptions[i]] + '-'
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .sameday
    box-shadow 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
    border-radius 10px
    width 650px
    height 400px
    margin-left 85px
    margin-top 20px
  .el-form-item
    width 250px
    height 50px
    margin-left 200px
  .nextone
    margin-left 430px
    margin-top -58px
  .backone
    margin-left -10px
    margin-top -50px
</style>
