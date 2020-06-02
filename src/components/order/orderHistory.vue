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
        prop="product"
        label="产品id"
        width="100">
      </el-table-column>
      <el-table-column
        prop="time"
        label="下单时间"
        width="200">
      </el-table-column>
      <el-table-column
        prop="start_address"
        label="发货地址"
        width="300">
      </el-table-column>
      <el-table-column
        prop="end_address"
        label="收货地址"
        width="300">
      </el-table-column>
      <el-table-column
        prop="price"
        label="价格"
        width="100">
      </el-table-column>
      <el-table-column
        prop="status"
        label="订单状态"
        width="120">
      </el-table-column>
      <el-table-column
        prop="way"
        label="付款方式"
        width="120">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="80">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData)"
            type="text"
            size="small">
            移除
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
        number: '2016050100',
        product: '10000001',
        time: '2020-02-01 12:23:01',
        start_address: '上海市浦东新区临析路279号',
        end_address: '上海市普陀区金沙江路 1518 弄',
        price: '20',
        status: '已完成',
        way: '货到付款'
      }, {
        number: '2016050102',
        product: '10000011',
        time: '2020-03-01 12:23:01',
        start_address: '上海市浦东新区丁香路611号',
        end_address: '上海市闵行区合川路3071号',
        price: '22',
        status: '已完成',
        way: '已付款'
      }, {
        number: '2016050102',
        product: '10000011',
        time: '2020-03-01 12:23:01',
        start_address: '上海市浦东新区丁香路611号',
        end_address: '上海市闵行区合川路3071号',
        price: '22',
        status: '已完成',
        way: '已付款'
      }, {
        number: '2016050102',
        product: '10000011',
        time: '2020-03-01 12:23:01',
        start_address: '上海市浦东新区丁香路611号',
        end_address: '上海市闵行区合川路3071号',
        price: '22',
        status: '已完成',
        way: '已付款'
      }, {
        number: '2016050100',
        product: '10000001',
        time: '2020-02-01 12:23:01',
        start_address: '上海市浦东新区临析路279号',
        end_address: '上海市普陀区金沙江路 1518 弄',
        price: '20',
        status: '已完成',
        way: '货到付款'
      }, {
        number: '2016050100',
        product: '10000001',
        time: '2020-02-01 12:23:01',
        start_address: '上海市浦东新区临析路279号',
        end_address: '上海市普陀区金沙江路 1518 弄',
        price: '20',
        status: '已完成',
        way: '货到付款'
      }, {
        number: '2016050100',
        product: '10000001',
        time: '2020-02-01 12:23:01',
        start_address: '上海市浦东新区临析路279号',
        end_address: '上海市普陀区金沙江路 1518 弄',
        price: '20',
        status: '已完成',
        way: '货到付款'
      }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
  .table
    box-shadow 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
    border-radius: 10px
    width 650px
    height 400px
    margin-left 85px
    margin-top 20px
</style>
