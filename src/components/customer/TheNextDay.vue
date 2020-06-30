<template>
  <div class="sameday">
    <el-steps :active="active" finish-status="success"
              align-center style="margin-top: 30px;height: 5px" >
      <el-step title="寄件人信息"></el-step>
      <el-step title="收件人信息"></el-step>
      <el-step title="预约信息"></el-step>
      <el-step title="完成下单"></el-step>
    </el-steps>
    <p style="margin-left: -500px;margin-top: 100px;font-size: 30px">
      次
    </p>
    <p style="margin-left: -500px;font-size: 30px">日</p>
    <p style="margin-left: -500px;font-size: 30px">达</p>
    <!--组件切换的奥秘-->
    <keep-alive :include="refreshCache">
      <component :is="compon[index]" @switch="swicthCompon"></component>
    </keep-alive>
  </div>
</template>

<script>
// 寄件人表单
import SenderForm from './theNextDay/SenderForm'
// 预约信息
import ReservationForm from './theNextDay/ReservationForm'
// 收件人表单
import ReceiveForm from './theNextDay/ReceiveForm'
// 下单界面
import PlaceOrder from './theNextDay/PlaceOrder'
export default {
  name: 'SameDay',
  data () {
    return {
      active: 0,
      index: 0,
      refreshCache: ['SenderForm', 'ReceiveForm', 'ReservationForm'], // 是否刷新缓存
      compon: ['senderform', 'receiveform', 'reservation', 'placeorder'],
      sender: {},
      receive: {},
      reservationForm: {},
      placeOrderForm: {},
      formArray: [this.sender, this.receive, this.reservationForm, this.placeOrderForm]
    }
  },
  methods: {
    swicthCompon (form) {
      if (form.active === true) {
        this.formArray[this.index] = form
        // 保存共享数据，方便在第三个表单中提取前两个表单的数据进行使用
        sessionStorage.setItem('SameDayDate', JSON.stringify(this.formArray))
        // 加入缓存，不然返回上一步组件会刷新掉
        if (this.index < 3) {
          this.index++
        }
        if (this.active < 4) {
          this.active++
          if (this.active > 3) {
            this.$notify({
              title: '温馨提示',
              message: '您已下单完成！',
              type: 'success',
              duration: 3500
            })
            // 加载中组件
            const loading = this.$loading({
              lock: true,
              text: 'Loading',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            })
            setTimeout(() => {
              loading.close()
              // 异步实现刷新组件缓存
              this.refreshCache = ['SenderForm', 'ReceiveForm', 'ReservationForm']
            }, 1000)
            this.index = 0
            this.active = 0
            this.refreshCache = []
          }
        }
      } else {
        if (this.active-- < 0) this.active = 0
        if (this.index-- < 0) this.index = 0
      }
    }
  },
  components: {
    senderform: SenderForm,
    reservation: ReservationForm,
    receiveform: ReceiveForm,
    placeorder: PlaceOrder
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
</style>
