<template>
  <div class="demo">
    <el-tag type="info" effect="plain">
      <el-divider direction="vertical"></el-divider>
      <p style="margin-top: -110px;margin-left: -250px">寄件人姓名：郑小姐</p>
      <p style="margin-left: -210px">寄件人电话：13168597846</p>
      <p style="margin-left: -230px">上门时间：09:00~10:00</p>
      <p style="margin-top: -126px;margin-left: 150px">收件人姓名：郑小姐</p>
      <p style="margin-left: 190px">收件人电话：13168597846</p>
      <p style="margin-left: 140px">快递产品：￥12元</p>
      <p style="margin-left: -5px">寄件人地址：广东省佛山市顺德区大良街道环市北路承德楼A座402</p>
      <p style="margin-top: -5px;margin-left: -5px">收件人地址：xxx</p>
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
        active: true,
        randomCode: ''
      }
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
    },
    getRandomCode (length) {
      if (length > 0) {
        const data = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
        let nums = ''
        for (let i = 0; i < length; i++) {
          // 强制类型转换
          const r = parseInt(Math.random() * 61)
          nums += data[r]
        }
        return nums
      } else {
        return false
      }
    },
    getOrderNumber () {
      const randomCode = this.getRandomCode(15)
      console.log(randomCode)
      return 'KWD' + randomCode
    }
  },
  mounted () {
    this.order.randomCode = this.getOrderNumber()
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
