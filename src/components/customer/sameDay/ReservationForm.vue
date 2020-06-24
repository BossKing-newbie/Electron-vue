<template>
  <!--预约信息的表单-->
  <el-form label-position="right" :model="formLabelAlign" status-icon :rules="rules"
           style="margin-top: -200px" size="mini" ref="reservationForm">
    <el-radio-group v-model="formLabelAlign.serve" style="margin-bottom: 10px;margin-top: -50px" @change="changeRadio">
      <el-radio label="PickUp" value="PickUp">快递员上门取件</el-radio>
      <el-radio label="SelfDelivery" value="SelfDelivery">自行联系快递员或自寄</el-radio>
    </el-radio-group>
    <el-form-item label="上门时间" prop="value" style="margin-top: -10px" v-if="isShow">
      <el-select v-model="formLabelAlign.value" clearable placeholder="请选择时间" style="width: 250px" @change="changeValue" @visible-change="getCurrentTime($event)">
        <el-option
          v-for="item in timeoptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="快递产品" prop="product">
      <el-radio-group v-model="formLabelAlign.product">
        <el-radio-button label="12">
          <p style="font-size: 14px;margin-top: 0px;">￥?? 起</p>
          <p style="margin-top: -5px;font-size: 12px;margin-bottom: 0px">{{strDate}}日12:00前送达</p>
        </el-radio-button>
        <el-radio-button label="18">
          <p style="font-size: 14px;margin-top: 0px">￥?? 起</p>
          <p style="margin-top: -5px;font-size: 12px;margin-bottom: 0px">{{strDate}}日18:00前送达</p>
        </el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="捎话给快递员" style="margin-top: 30px;" v-if="isShow">
      <el-input placeholder="您的备注 (如: 带文件封、带纸箱等)" clearable prefix-icon="el-icon-chat-line-square" v-model="formLabelAlign.message"></el-input>
    </el-form-item>
    <el-form-item :class="backOneClass"><!-- 上一步这个按钮除了第一个界面不出现，后面三个界面都要出现-->
      <el-button type="info" style="margin-top: 13px" @click="back">上一步</el-button>
    </el-form-item>
    <el-form-item class="nextone">
      <el-button type="primary" @click="next('reservationForm')">下一步 <i class="el-icon-right"></i></el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'ReservationForm',
  data () {
    return {
      formLabelAlign: {
        serve: 'PickUp',
        value: '',
        product: '',
        time: '',
        active: true,
        message: ''
      },
      strDate: '',
      isShow: true,
      backOneClass: 'backone',
      timeoptions: [{
        value: 9,
        label: '09:00~10:00'
      }, {
        value: 10,
        label: '10:00~11:00'
      }, {
        value: 11,
        label: '11:00~12:00'
      }, {
        value: 12,
        label: '12:00~13:00'
      }, {
        value: 13,
        label: '13:00~14:00'
      }, {
        value: 14,
        label: '14:00~15:00'
      }, {
        value: 15,
        label: '15:00~16:00'
      }, {
        value: 16,
        label: '16:00~17:00'
      }, {
        value: 17,
        label: '17:00~18:00'
      }, {
        value: 18,
        label: '18:00~19:00'
      }, {
        value: 19,
        label: '19:00~20:00'
      }],
      rules: {
        value: [
          { required: true, message: '请选择时间！', trigger: 'change' }
        ],
        product: [
          { required: true }
        ]
      }
    }
  },
  methods: {
    back () {
      this.formLabelAlign.active = false
      this.$emit('switch', this.formLabelAlign)
    },
    next (formName) {
      const _this = this
      this.formLabelAlign.active = true
      this.$refs[formName].validate((valid) => {
        if (valid) {
          _this.$emit('switch', this.formLabelAlign)
        }
      })
    },
    getCurrentTime (callback) {
      const date = new Date()
      // eslint-disable-next-line no-unused-vars
      const hour = date.getHours()
      const start = 9
      const end = 19
      if (callback) {
        if (hour >= end) {
          this.$notify({
            title: '温馨提示',
            message: '快递收发人员已下班，目前预约时间为明天',
            type: 'success',
            duration: 3500
          })
        } else if (start <= hour < end) {
          this.timeoptions = this.timeoptions.filter((item, index, arr) => {
            return item.value > hour
          })
        }
      }
    },
    changeValue () {
      const date = new Date()
      // eslint-disable-next-line no-unused-vars
      let strDate = date.getDate()
      const year = date.getFullYear()
      let month = date.getMonth() + 1
      const hour = date.getHours()
      const end = 19
      if (hour >= end) {
        strDate += 1
      }
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      this.formLabelAlign.time = year + '-' + month + '-' + strDate + ' ' +
        this.formLabelAlign.value + ':00 ~ ' + (this.formLabelAlign.value + 1) + ':00'
      this.strDate = strDate
    },
    // 监听radio按钮变化,实现上门预订和自行寄件
    changeRadio (label) {
      if (label === 'PickUp') {
        this.isShow = true
        this.backOneClass = 'backone'
      } else {
        this.isShow = false
        this.backOneClass = 'changeBackOne'
        this.formLabelAlign.time = ''
        this.formLabelAlign.value = ''
        this.formLabelAlign.message = ''
      }
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
    margin-top -46px
  .backone
    margin-left -20px
    margin-top -50px
  .changeBackOne
    margin-left 10px
    margin-top 100px
</style>
