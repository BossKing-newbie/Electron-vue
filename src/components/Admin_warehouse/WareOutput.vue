<template>
  <div class="main">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="货物出库开单" name="first">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="订单号" size="small" style="margin-top: 30px;margin-right: 37px;margin-left: 25px">
            <el-select v-model="formInline.order" placeholder="请选择订单号" style="width: 200px" @change="selectedChange(formInline.order)">
              <el-option
                v-for="item in selectedOptions"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="送货出库人员" size="small" style="margin-top: 30px">
            <el-select v-model="formInline.output" placeholder="请选择出库人员" style="width: 200px" clearable>
              <el-option label="郑嘉雯" value="郑嘉雯"></el-option>
              <el-option label="纪佳金" value="纪佳金"></el-option>
              <el-option label="黄昕" value="黄昕"></el-option>
              <el-option label="任紫薇" value="任紫薇"></el-option>
              <el-option label="官耀威" value="官耀威"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="收件人姓名" size="small" style="margin-top: 10px;margin-right: 50px">
            <el-tag type="info" effect="plain" style="width: 200px;font-size: 14px">{{elForm.rname}}</el-tag>
          </el-form-item>
          <el-form-item label="收件人电话" size="small" style="margin-top: 10px">
            <el-tag type="info" effect="plain" style="width: 200px;font-size: 14px">{{elForm.rphone}}</el-tag>
          </el-form-item>
          <el-form-item label="收件人地址" size="small" style="margin-top: 10px">
            <el-tag type="info" effect="plain" style="width: 530px;font-size: 14px">{{elForm.raddress}}</el-tag>
          </el-form-item>
          <el-form-item label="寄件人姓名" size="small" style="margin-top: 10px;margin-right: 50px">
            <el-tag type="info" effect="plain" style="width: 200px;font-size: 14px">{{elForm.sname}}</el-tag>
          </el-form-item>
          <el-form-item label="寄件人电话" size="small" style="margin-top: 10px">
            <el-tag type="info" effect="plain" style="width: 200px;font-size: 14px">{{elForm.sphone}}</el-tag>
          </el-form-item>
          <el-form-item label="寄件人地址" size="small" style="margin-top: 10px">
            <el-tag type="info" effect="plain" style="width: 530px;font-size: 14px">{{elForm.saddress}}</el-tag>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="outPut" size="medium" style="margin-right: 200px;margin-top: 20px">立即出单</el-button>
            <el-button size="medium" @click="cancell">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="查看出库信息" name="second">
        <el-select v-model="value" clearable placeholder="查询选择" size="small"
                   style="width: 130px;margin-top: 5px;margin-left: -20px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-input
          style="width: 200px;margin-left: 5px"
          size="small"
          placeholder="请输入查询内容"
          v-model="input"
          clearable>
        </el-input>
        <el-button
          type="primary"
          size="small"
          icon="el-icon-search"
          style="margin-left: 50px"
          @click="searchinput">
          搜 索
        </el-button>
        <el-button
          type="primary"
          size="small"
          icon="el-icon-refresh"
          style="margin-left: 20px"
          @click="clearinput">
          重 置
        </el-button>
        <el-table
          :data="tableData"
          stripe
          height="350"
          style="width: 90%;margin-left: 35px;margin-top: 15px">
          <el-table-column
            prop="ordernum"
            label="订单号"
            width="100">
          </el-table-column>
          <el-table-column
            prop="sname"
            label="寄件人姓名"
            width="100">
          </el-table-column>
          <el-table-column
            prop="sphone"
            label="寄件人电话"
            width="120">
          </el-table-column>
          <el-table-column
            prop="saddress"
            label="寄件人地址"
            width="150">
          </el-table-column>
          <el-table-column
            prop="rname"
            label="收件人姓名"
            width="100">
          </el-table-column>
          <el-table-column
            prop="rphone"
            label="收件人电话"
            width="120">
          </el-table-column>
          <el-table-column
            prop="raddress"
            label="收件人地址"
            width="150">
          </el-table-column>
          <el-table-column
            prop="product"
            label="快递产品"
            width="120">
          </el-table-column>
          <el-table-column
            label="物流信息"
            width="120">
            <template slot-scope="scope">
              <el-button @click.native.prevent="lookfor(scope.$index, tableData)" type="text">查看</el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="status"
            label="订单状态"
            width="120">
          </el-table-column>
          <el-table-column
            prop="oname"
            label="送货出库人员"
            width="120">
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
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'WareOutput',
  data () {
    return {
      activeName: 'first',
      value: '',
      input: '',
      dialogFormVisible: false,
      selectedOptions: [], // 这里的订单号是状态为“已揽件”且“入库审核通过”的订单
      reverse: true,
      elForm: {
        sname: 'xxx',
        sphone: 'xxx',
        saddress: 'xxx',
        rname: 'xxx',
        rphone: 'xxx',
        raddress: 'xxx'
      },
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
      formInline: {
        order: '',
        output: ''
      },
      tableData: [{
        ordernum: '12345678',
        sname: '郑嘉雯',
        sphone: '13168597846',
        saddress: '广东省佛山市顺德区大良街道环市东路18明洋楼D座508',
        rname: '纪傻逼',
        rphone: '13078163530',
        raddress: '上海市普陀区金沙江路 1518 弄',
        product: 'same_day',
        status: '已发货',
        oname: '任紫薇'
      }, {
        ordernum: '12345678',
        sname: '郑嘉雯',
        sphone: '13168597846',
        saddress: '广东省佛山市顺德区大良街道环市东路18明洋楼D座508',
        rname: '纪傻逼',
        rphone: '13078163530',
        raddress: '上海市普陀区金沙江路 1518 弄',
        product: 'same_day',
        status: '已发货',
        oname: '任紫薇'
      }, {
        ordernum: '12345678',
        sname: '郑嘉雯',
        sphone: '13168597846',
        saddress: '广东省佛山市顺德区大良街道环市东路18明洋楼D座508',
        rname: '纪傻逼',
        rphone: '13078163530',
        raddress: '上海市普陀区金沙江路 1518 弄',
        product: 'same_day',
        status: '已发货',
        oname: '任紫薇'
      }, {
        ordernum: '12345678',
        sname: '郑嘉雯',
        sphone: '13168597846',
        saddress: '广东省佛山市顺德区大良街道环市东路18明洋楼D座508',
        rname: '纪傻逼',
        rphone: '13078163530',
        raddress: '上海市普陀区金沙江路 1518 弄',
        product: 'same_day',
        status: '已发货',
        oname: '任紫薇'
      }],
      options: [{
        value: '选项1',
        label: '订单号'
      }, {
        value: '选项2',
        label: '快递产品'
      }, {
        value: '选项3',
        label: '订单状态'
      }, {
        value: '选项4',
        label: '送货出库人员'
      }]
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
      if (tab.index === '1') {
        this.outputWarehouse()
      }
    },
    outputWarehouse () {
      const that = this
      this.axios({
        url: 'http://localhost:8081/order/outputWarehouse',
        method: 'get'
      }).then(function (response) {
        console.log(response.data)
        that.tableData = response.data.data
      })
    },
    outPut () {
      if (!this.formInline.order) {
        this.$message.error('请选择订单号！')
      } else if (!this.formInline.output) {
        this.$message.error('请选择出库人员！')
      } else {
        const that = this
        this.axios({
          url: 'http://localhost:8081/order/output',
          method: 'post',
          data: {
            orderFormNumber: that.formInline.order,
            outboundStaff: that.formInline.output
          }
        }).then(function (response) {
          console.log(response.data)
          if (response.data.code === 200) {
            that.$message({
              message: '出单成功！',
              type: 'success'
            })
            that.selectedOrder()
            that.clearinput()
          } else {
            that.$message({
              message: '糟糕，出现问题了！',
              type: 'error'
            })
            that.clearinput()
          }
        })
      }
    },
    cancell () {
      this.formInline.order = ''
      this.formInline.output = ''
    },
    searchinput () {
      if (!this.value) {
        this.$message.error('请选择需要查询的信息！')
      } else if (!this.input) {
        this.$message.error('请输入查询内容！')
      } else {
        this.$message({
          message: '查询成功！',
          type: 'success'
        })
      }
    },
    clearinput () {
      this.value = ''
      this.input = ''
      this.formInline.order = ''
      this.formInline.output = ''
      this.elForm.sname = 'xxx'
      this.elForm.sphone = 'xxx'
      this.elForm.saddress = 'xxx'
      this.elForm.rname = 'xxx'
      this.elForm.rphone = 'xxx'
      this.elForm.raddress = 'xxx'
    },
    lookfor (index, rows) {
      console.log(rows[index])
      const that = this
      this.dialogFormVisible = true
      this.axios({
        url: 'http://localhost:8081/order/delivery/' + rows[index].ordernum,
        method: 'get'
      }).then(function (response) {
        console.log(response)
        that.activities = response.data.data
      })
    },
    // 客户出单下拉框的订单列表
    selectedOrder () {
      const that = this
      this.axios({
        url: 'http://localhost:8081/order/selectedOutput',
        method: 'get'
      }).then(function (response) {
        console.log(response.data)
        that.selectedOptions = response.data.map(function (currentValue) {
          return currentValue.ordernum
        })
      })
    },
    // 下拉框选中值发生变化的函数
    selectedChange (value) {
      console.log('选择值:')
      console.log(value)
      const that = this
      this.axios({
        url: 'http://localhost:8081/order/already/' + value,
        method: 'get'
      }).then(function (response) {
        console.log(response.data.data[0])
        const formObject = response.data.data[0]
        that.elForm.sname = formObject.sname
        that.elForm.sphone = formObject.sphone
        that.elForm.saddress = formObject.saddress
        that.elForm.rname = formObject.rname
        that.elForm.rphone = formObject.rphone
        that.elForm.raddress = formObject.raddress
        that.$message({
          message: '查询成功！',
          type: 'success'
        })
      })
    }
  },
  mounted () {
    this.selectedOrder()
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
