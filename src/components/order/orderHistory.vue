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
        prop="status"
        label="订单状态"
        width="120">
      </el-table-column>
      <el-table-column
        prop="payment"
        label="付款方式"
        width="120">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="70">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="cancelReserve(scope.$index, tableData)"
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
import Qs from 'qs'

export default {
  methods: {
    deleteRow (index, rows) {
      rows.splice(index, 1)
    },
    selectOrderForm () {
      const data = Qs.parse(sessionStorage.getItem('user'))
      const that = this
      this.axios({
        url: 'http://localhost:8081/order/history/' + data.userId,
        method: 'get'
      }).then(function (response) {
        console.log(response.data)
        that.tableData = response.data
      })
    },
    cancelReserve (index, rows) {
      const that = this
      console.log(rows[index].number)
      this.axios({
        url: 'http://localhost:8081/order/cancel/' + rows[index].number,
        method: 'DELETE'
      }).then(function (response) {
        console.log(response)
        if (response.data.code === 200) {
          that.$message({
            message: '移除成功',
            center: true,
            type: 'success'
          })
          that.selectOrderForm()
        } else {
          that.$message({
            message: '移除失败',
            center: true,
            type: 'error'
          })
        }
      })
    }
  },
  mounted () {
    this.selectOrderForm()
  },
  data () {
    return {
      tableData: []
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
