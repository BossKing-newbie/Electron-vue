<template>
  <div class="demo">
    <el-tag type="info" effect="plain">
      <el-divider direction="vertical"></el-divider>
      <p style="margin-top: -105px;margin-left: -250px">寄件人姓名：{{senderName}}</p>
      <p style="margin-left: -210px">寄件人电话：{{senderNumber}}</p>
      <p style="margin-left: -200px">上门时间：{{reservationTime}}</p>
      <p style="margin-top: -126px;margin-left: 150px">收件人姓名：{{receiveName}}</p>
      <p style="margin-left: 190px">收件人电话：{{receiveNumber}}</p>
      <p style="margin-left: 140px">快递产品：￥{{money}} 起</p>
      <p style="margin-left: -5px">寄件人地址：{{senderAddress}}</p>
      <p style="margin-top: -5px;margin-left: -5px">收件人地址：{{receiveAddress}}</p>
    </el-tag>
    <el-button style="margin-right: 150px" type="info" size="mini" @click="back">返回 </el-button>
    <el-button type="primary" size="mini" @click="next">确认 <i class="el-icon-check"></i></el-button>
  </div>
</template>

<script>
// 引入vue字符串序列化对象
import Qs from 'qs'
export default {
  name: 'PlaceOrder',
  data () {
    return {
      order: {
        active: true
      },
      deliveryDetails: '',
      senderName: '',
      senderNumber: '',
      reservationTime: '',
      receiveName: '',
      receiveNumber: '',
      money: '',
      senderAddress: '',
      receiveAddress: '',
      productsId: ''
    }
  },
  methods: {
    back () {
      this.order.active = false
      this.$emit('switch', this.order)
    },
    next () {
      /*
      order_sender 寄件人
      order_sender_phone 联系电话
      order_recipient 收件人
      order_recipient_phone 收件人电话
      order_form_start_address 发货地址
      order_form_end_address 收货地址

      */
      this.order.active = true
      const data = Qs.parse(sessionStorage.getItem('user'))
      const dataObject = {
        orderSender: this.senderName,
        orderSenderPhone: this.senderNumber,
        orderRecipient: this.receiveName,
        orderRecipientPhone: this.receiveNumber,
        orderFormStartAddress: this.senderAddress,
        orderFormEndAddress: this.receiveAddress,
        orderFormUserId: data.userId,
        reserveTime: this.deliveryDetails[2].time,
        orderFormProductsId: this.productsId,
        orderFormMoney: this.money
      } // 数据库连接对象
      console.log(dataObject)
      // 定义当前指针域
      const that = this
      this.axios({
        url: 'http://localhost:8081/order/insert',
        method: 'post',
        data: Qs.stringify(dataObject)
      }).then(function (response) {
        console.log(response)
        if (response.data.code === 200) {
          that.$emit('switch', that.order)
        } else {
          that.$message({
            message: '服务器发送错误！',
            type: 'error',
            center: true
          })
        }
      })
    }
  },
  mounted () {
    this.deliveryDetails = JSON.parse(sessionStorage.getItem('SameDayDate'))
    this.senderName = this.deliveryDetails[0].name
    this.senderNumber = this.deliveryDetails[0].number
    if (this.deliveryDetails[2].time !== '无') {
      this.reservationTime = this.deliveryDetails[2].time.split('-')[1] + '-' + this.deliveryDetails[2].time.split('-')[2]
    } else {
      this.reservationTime = this.deliveryDetails[2].time
    }
    this.receiveName = this.deliveryDetails[1].name
    this.receiveNumber = this.deliveryDetails[1].number
    this.money = this.deliveryDetails[2].money
    this.senderAddress = this.deliveryDetails[0].detailAddress.split('/').join('')
    this.receiveAddress = this.deliveryDetails[1].detailAddress.split('/').join('')
    this.productsId = this.deliveryDetails[2].product
  }
}
</script>

<style scoped lang="stylus">
  .demo
    margin-top -225px
  .el-tag
    width 400px
    height 220px
    margin-left 40px
  .el-button
    margin-left 40px
    margin-top 13px
  .el-divider
    height 100px
    margin-top 20px
</style>
