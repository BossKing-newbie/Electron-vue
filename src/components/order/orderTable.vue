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
      label="产品名称"
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
      width="150">
      <template slot-scope="scope">
        <el-button v-if="changeButton(scope.$index, tableData)"
          @click.native.prevent="cancelReserve(scope.$index, tableData)"
          type="text"
          size="small">
          取消预约
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
  <el-dialog title="物流信息" :visible.sync="dialogFormVisible" center>
      <el-timeline :reverse="reverse">
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :timestamp="activity.timestamp">
          {{activity.content}}
        </el-timeline-item>
      </el-timeline>
  </el-dialog>
</div>
</template>

<script>
import Qs from 'qs'

export default {
  methods: {
    cancelReserve (index, rows) {
      const that = this
      this.axios({
        url: 'http://localhost:8081/order/cancel/' + rows[index].number,
        method: 'DELETE'
      }).then(function (response) {
        console.log(response)
        if (response.data.code === 200) {
          that.$message({
            message: '取消成功',
            center: true,
            type: 'success'
          })
          that.selectOrderForm()
        } else {
          that.$message({
            message: '取消失败',
            center: true,
            type: 'error'
          })
        }
      })
    },
    deleteRow (index, rows) {
      const that = this
      this.dialogFormVisible = true
      this.axios({
        url: 'http://localhost:8081/order/delivery/' + rows[index].number,
        method: 'get'
      }).then(function (response) {
        console.log(response)
        that.activities = response.data.data
      })
    },
    selectOrderForm () {
      const data = Qs.parse(sessionStorage.getItem('user'))
      const that = this
      this.axios({
        url: 'http://localhost:8081/order/select/' + data.userId,
        method: 'get'
      }).then(function (response) {
        that.tableData = response.data
        console.log(response.data)
      })
    },
    changeButton (index, rows) {
      if (rows[index].status === '预约中') {
        return true
      }
      return false
    }
  },
  mounted () {
    this.selectOrderForm()
  },
  data () {
    return {
      show: true, // 决定是哪个按钮show
      tableData: [],
      reverse: true,
      activities: [{
        content: '活动按期开始',
        timestamp: '2018-04-15'
      }, {
        content: '通过审核',
        timestamp: '2018-04-13'
      }, {
        content: '创建成功',
        timestamp: '2018-04-11'
      }],
      dialogFormVisible: false
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
  .el-table .pink
    background-color pink
</style>
