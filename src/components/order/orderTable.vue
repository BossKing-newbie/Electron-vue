<template>
<div class="table">
  <el-table
    :data="tableData"
    style="width: 100%"
    max-height="400">
    <el-table-column
      fixed
      prop="number"
      label="订单编号"
      width="150">
    </el-table-column>
    <el-table-column
      prop="id"
      label="产品id"
      width="100">
    </el-table-column>
    <el-table-column
      prop="date"
      label="下单时间"
      width="200">
    </el-table-column>
    <el-table-column
      prop="ship_address"
      label="发货地址"
      width="300">
    </el-table-column>
    <el-table-column
      prop="address"
      label="收货地址"
      width="300">
    </el-table-column>
    <el-table-column
      prop="price"
      label="价格"
      width="100">
    </el-table-column>
    <el-table-column
      prop="payment"
      label="付款方式"
      width="120">
    </el-table-column>
    <el-table-column
      prop="status"
      label="订单状态"
      width="120">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="130">
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="deleteRow(scope.$index, tableData)"
          type="text"
          size="small">
          确认收货
        </el-button>
        <el-button
          @click.native.prevent="deleteRow(scope.$index, tableData)"
          type="text"
          size="small">
          查看物流
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
export default {
  methods: {
    deleteRow (index, rows) {
      rows.splice(index, 1)
    }
  },
  data () {
    return {
      tableData: [{
        number: '20170060320',
        id: '001',
        date: '2020-6-02 16:09:57',
        ship_address: '佛山市顺德区环市北路13号',
        address: '上海市普陀区金沙江路 1518 弄',
        price: 10,
        payment: '支付宝',
        status: '已发货'
      }, {
        number: '20170060320',
        id: '001',
        date: '2020-6-02 16:09:57',
        ship_address: '佛山市顺德区环市北路13号',
        address: '上海市普陀区金沙江路 1518 弄',
        price: 10,
        payment: '支付宝',
        status: '已发货'
      }, {
        number: '20170060320',
        id: '001',
        date: '2020-6-02 16:09:57',
        ship_address: '佛山市顺德区环市北路13号',
        address: '上海市普陀区金沙江路 1518 弄',
        price: 10,
        payment: '支付宝',
        status: '已发货'
      }, {
        number: '20170060320',
        id: '001',
        date: '2020-6-02 16:09:57',
        ship_address: '佛山市顺德区环市北路13号',
        address: '上海市普陀区金沙江路 1518 弄',
        price: 10,
        payment: '支付宝',
        status: '已发货'
      }, {
        number: '20170060320',
        id: '001',
        date: '2020-6-02 16:09:57',
        ship_address: '佛山市顺德区环市北路13号',
        address: '上海市普陀区金沙江路 1518 弄',
        price: 10,
        payment: '支付宝',
        status: '已发货'
      }, {
        number: '20170060320',
        id: '001',
        date: '2020-6-02 16:09:57',
        ship_address: '佛山市顺德区环市北路13号',
        address: '上海市普陀区金沙江路 1518 弄',
        price: 10,
        payment: '支付宝',
        status: '已发货'
      }, {
        number: '20170060320',
        id: '001',
        date: '2020-6-02 16:09:57',
        ship_address: '佛山市顺德区环市北路13号',
        address: '上海市普陀区金沙江路 1518 弄',
        price: 10,
        payment: '支付宝',
        status: '已发货'
      }]
    }
  }
}
</script>

<style lang="stylus" scoped>
  .table
    box-shadow 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
    border-radius 10px
    width 650px
    height 400px
    margin-left 85px
    margin-top 20px
</style>
