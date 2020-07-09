<template>
  <div class="main">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="货物出库开单" name="first">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="订单号" size="small" style="margin-top: 30px;margin-right: 37px;margin-left: 25px">
            <el-select v-model="formInline.order" placeholder="请选择订单号" style="width: 200px" clearable>
              <el-option label="这里的订单号是状态为“已揽件”且“入库审核通过”的订单" value="shanghai"></el-option>
              <el-option label="当点击下面“出单”的按钮就把订单状态改成“已发货”" value="shanghai"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="送货出库人员" size="small" style="margin-top: 30px">
            <el-select v-model="formInline.output" placeholder="请选择出库人员" style="width: 200px" clearable>
              <el-option label="郑嘉雯" value="seven"></el-option>
              <el-option label="纪佳金" value="king"></el-option>
              <el-option label="黄昕" value="yellow"></el-option>
              <el-option label="任紫薇" value="ziwei"></el-option>
              <el-option label="官耀威" value="yaowei"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="收件人姓名" size="small" style="margin-top: 10px;margin-right: 50px">
            <el-tag type="info" effect="plain" style="width: 200px;font-size: 14px">郑小姐</el-tag>
          </el-form-item>
          <el-form-item label="收件人电话" size="small" style="margin-top: 10px">
            <el-tag type="info" effect="plain" style="width: 200px;font-size: 14px">131*****978</el-tag>
          </el-form-item>
          <el-form-item label="收件人地址" size="small" style="margin-top: 10px">
            <el-tag type="info" effect="plain" style="width: 530px;font-size: 14px">广东省佛山市顺德区环市东路17号明洋楼B座602</el-tag>
          </el-form-item>
          <el-form-item label="寄件人姓名" size="small" style="margin-top: 10px;margin-right: 50px">
            <el-tag type="info" effect="plain" style="width: 200px;font-size: 14px">纪先生</el-tag>
          </el-form-item>
          <el-form-item label="寄件人电话" size="small" style="margin-top: 10px">
            <el-tag type="info" effect="plain" style="width: 200px;font-size: 14px">130****530</el-tag>
          </el-form-item>
          <el-form-item label="寄件人地址" size="small" style="margin-top: 10px">
            <el-tag type="info" effect="plain" style="width: 530px;font-size: 14px">广东省汕头市龙湖区xxx</el-tag>
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
            <template>
              <el-button @click="lookfor" type="text">查看</el-button>
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
    },
    outPut () {
      if (!this.formInline.order) {
        this.$message.error('请选择订单号！')
      } else if (!this.formInline.output) {
        this.$message.error('请选择出库人员！')
      } else {
        this.$message({
          message: '出单成功！',
          type: 'success'
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
    },
    lookfor () {
      this.dialogFormVisible = true
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
