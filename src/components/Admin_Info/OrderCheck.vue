<template>
  <div class="main">
    <el-select v-model="value" clearable placeholder="订单状态选择" size="small"
               style="width: 200px;margin-top: 30px;margin-left: -30px">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-button
      type="primary"
      size="small"
      icon="el-icon-search"
      style="margin-left: 50px">
      查 询
    </el-button>
    <el-table
      :data="tableData"
      stripe
      height="350"
      style="width: 90%;margin-left: 40px;margin-top: 20px">
      <el-table-column
        prop="num"
        label="订单号"
        width="100">
      </el-table-column>
      <el-table-column
        prop="name"
        label="用户名"
        width="100">
      </el-table-column>
      <el-table-column
        prop="sname"
        label="收件人姓名"
        width="100">
      </el-table-column>
      <el-table-column
        prop="sphone"
        label="收件人电话"
        width="120">
      </el-table-column>
      <el-table-column
        prop="saddress"
        label="收件人地址"
        width="150">
      </el-table-column>
      <el-table-column
        prop="rname"
        label="寄件人姓名"
        width="100">
      </el-table-column>
      <el-table-column
        prop="rphone"
        label="寄件人电话"
        width="120">
      </el-table-column>
      <el-table-column
        prop="raddress"
        label="寄件人地址"
        width="150">
      </el-table-column>
      <el-table-column
        prop="time"
        label="上门时间"
        width="150">
      </el-table-column>
      <el-table-column
        prop="product"
        label="快递产品"
        width="120">
      </el-table-column>
      <el-table-column
        prop="status"
        label="订单状态"
        width="100">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'OrderEntry',
  data () {
    return {
      value: '',
      options: [{
        value: '选项1',
        label: '预约中'
      }, {
        value: '选项2',
        label: '已揽件'
      }, {
        value: '选项3',
        label: '已发货'
      }, {
        value: '选项4',
        label: '已签收'
      }],
      tableData: [{
        num: '12345678',
        name: 'sevenking',
        sname: '郑小姐',
        sphone: '13168597846',
        saddress: '广东省佛山市顺德区大良街道环市北路13号承德楼A座402',
        rname: '纪先生',
        rphone: '13078163530',
        raddress: '广东省汕头市龙湖区XXX别墅',
        time: '2020-07-07 14:04:13',
        product: 'same_day',
        status: '预约中'
      }, {
        num: '12345678',
        name: 'sevenking',
        sname: '郑小姐',
        sphone: '13168597846',
        saddress: '广东省佛山市顺德区大良街道环市北路13号承德楼A座402',
        rname: '纪先生',
        rphone: '13078163530',
        raddress: '广东省汕头市龙湖区XXX别墅',
        time: '2020-07-07 14:04:13',
        product: 'same_day',
        status: '预约中'
      }, {
        num: '12345678',
        name: 'sevenking',
        sname: '郑小姐',
        sphone: '13168597846',
        saddress: '广东省佛山市顺德区大良街道环市北路13号承德楼A座402',
        rname: '纪先生',
        rphone: '13078163530',
        raddress: '广东省汕头市龙湖区XXX别墅',
        time: '2020-07-07 14:04:13',
        product: 'same_day',
        status: '预约中'
      }, {
        num: '12345678',
        name: 'sevenking',
        sname: '郑小姐',
        sphone: '13168597846',
        saddress: '广东省佛山市顺德区大良街道环市北路13号承德楼A座402',
        rname: '纪先生',
        rphone: '13078163530',
        raddress: '广东省汕头市龙湖区XXX别墅',
        time: '2020-07-07 14:04:13',
        product: 'same_day',
        status: '预约中'
      }, {
        num: '12345678',
        name: 'sevenking',
        sname: '郑小姐',
        sphone: '13168597846',
        saddress: '广东省佛山市顺德区大良街道环市北路13号承德楼A座402',
        rname: '纪先生',
        rphone: '13078163530',
        raddress: '广东省汕头市龙湖区XXX别墅',
        time: '2020-07-07 14:04:13',
        product: 'same_day',
        status: '预约中'
      }, {
        num: '12345678',
        name: 'sevenking',
        sname: '郑小姐',
        sphone: '13168597846',
        saddress: '广东省佛山市顺德区大良街道环市北路13号承德楼A座402',
        rname: '纪先生',
        rphone: '13078163530',
        raddress: '广东省汕头市龙湖区XXX别墅',
        time: '2020-07-07 14:04:13',
        product: 'same_day',
        status: '预约中'
      }, {
        num: '12345678',
        name: 'sevenking',
        sname: '郑小姐',
        sphone: '13168597846',
        saddress: '广东省佛山市顺德区大良街道环市北路13号承德楼A座402',
        rname: '纪先生',
        rphone: '13078163530',
        raddress: '广东省汕头市龙湖区XXX别墅',
        time: '2020-07-07 14:04:13',
        product: 'same_day',
        status: '预约中'
      }]
    }
  }
}
</script>

<style lang="stylus" scoped>
  .main
    box-shadow 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
    border-radius 10px
    width 750px
    height 480px
    margin-left 30px
</style>
