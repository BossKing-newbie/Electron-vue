<template>
    <div style="margin-top: -200px">
      <h3>订单号：{{order.randomCode}}</h3>
      <el-button type="info"  style="margin-top: 120px" @click="back">返回 </el-button>
      <el-button type="primary" style="margin-left: 120px" @click="next">下单 <i class="el-icon-right"></i></el-button>
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

<style scoped>

</style>
