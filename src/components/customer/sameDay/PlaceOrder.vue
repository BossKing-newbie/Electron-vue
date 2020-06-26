<template>
  <div class="demo">
    <el-tag type="info" effect="plain">
      <el-divider direction="vertical"></el-divider>
      <p style="margin-top: -110px;margin-left: -250px">寄件人姓名：{{deliveryDetails[0].name}}</p>
      <p style="margin-left: -210px">寄件人电话：{{deliveryDetails[0].number}}</p>
      <p style="margin-left: -200px">上门时间：{{deliveryDetails[2].time.split('-')[1] + '-' + deliveryDetails[2].time.split('-')[2]}}</p>
      <p style="margin-top: -126px;margin-left: 150px">收件人姓名：{{deliveryDetails[1].name}}</p>
      <p style="margin-left: 190px">收件人电话：{{deliveryDetails[1].number}}</p>
      <p style="margin-left: 140px">快递产品：￥{{deliveryDetails[2].money}}元</p>
      <p style="margin-left: -5px">寄件人地址：{{deliveryDetails[0].detailAddress.split('/').join('')}}</p>
      <p style="margin-top: -5px;margin-left: -5px">收件人地址：{{deliveryDetails[1].detailAddress.split('/').join('')}}</p>
      <p style="color: transparent">用于格式</p>
    </el-tag>
    <el-button style="margin-right: 150px" type="info" size="mini" @click="back">返回 </el-button>
    <el-button type="primary" size="mini" @click="next">确认 <i class="el-icon-check"></i></el-button>
  </div>
</template>

<script>
export default {
  name: 'PlaceOrder',
  data () {
    return {
      order: {
        active: true
      },
      deliveryDetails: this.getInfo
    }
  },
  methods: {
    back () {
      this.order.active = false
      this.$emit('switch', this.order)
    },
    next () {
      this.order.active = true
      this.$emit('switch', this.order)
    }
  },
  mounted () {
    this.deliveryDetails = JSON.parse(sessionStorage.getItem('SameDayDate'))
  }
}
</script>

<style scoped lang="stylus">
  .demo
    margin-top -225px
  .el-tag
    width 400px
    height 210px
    margin-left 10px
  .el-button
    margin-left -340px
  .el-divider
    height 100px
    margin-top 20px
</style>
