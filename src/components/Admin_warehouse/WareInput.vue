<template>
  <div class="main">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="货物入库审核" name="first">
        <el-form :label-position="labelPosition" label-width="200px"
                 :model="formLabelAlign" style="margin-left: 50px;margin-top: 20px"
                 status-icon :rules="rules" ref="formLabelAlign" class="demo-ruleForm">
          <el-form-item label="入库单流水号：" prop="warehousenum">
            <el-tag type="info" effect="plain" style="margin-left: -404px;width: 200px;font-size: 13px">12d5f6h8e2</el-tag>
          </el-form-item>
          <el-form-item label="还未入库订单选择：" prop="ordernum">
            <el-select v-model="formLabelAlign.ordernum" placeholder="请选择未入库的订单号"
                       size="small" style="width: 200px;margin-left: -177px" clearable>
              <el-option label="订单状态为“已揽件”" value="shanghai"></el-option>
              <el-option label="ffh25ft6" value="beijing"></el-option>
            </el-select>
            <el-button type="primary" @click="sure" size="small" style="margin-left: 150px" icon="el-icon-check">确 定</el-button>
          </el-form-item>
          <el-form-item label="具体订单查找：" prop="order">
            <el-input v-model="formLabelAlign.order" size="small" style="width: 200px;margin-left: -177px" clearable placeholder="请输入未入库的订单号"></el-input>
            <el-button type="primary" @click="lookfor" size="small" style="margin-left: 150px" icon="el-icon-search">查 找</el-button>
          </el-form-item>
          <el-form-item label="送货入库人员：" prop="name">
            <el-select v-model="formLabelAlign.name" placeholder="请选择送货人员"
                       size="small" style="width: 200px;margin-left: -404px" clearable>
              <el-option label="郑嘉雯" value="seven"></el-option>
              <el-option label="纪佳金" value="king"></el-option>
              <el-option label="黄昕" value="yellow"></el-option>
              <el-option label="任紫薇" value="ziwei"></el-option>
              <el-option label="官耀威" value="yaowei"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-table
          :data="tableData"
          border
          style="width: 90%;margin-left: 35px">
          <el-table-column
            prop="ordernum"
            label="订单号"
            width="150">
          </el-table-column>
          <el-table-column
            prop="sname"
            label="收件人姓名"
            width="150">
          </el-table-column>
          <el-table-column
            prop="sphone"
            label="收件人电话"
            width="150">
          </el-table-column>
          <el-table-column
            prop="saddress"
            label="收件人地址"
            width="500">
          </el-table-column>
          <el-table-column
            prop="rname"
            label="寄件人姓名"
            width="150">
          </el-table-column>
          <el-table-column
            prop="rphone"
            label="寄件人电话"
            width="150">
          </el-table-column>
          <el-table-column
            prop="raddress"
            label="寄件人地址"
            width="500">
          </el-table-column>
          <el-table-column
            prop="weight"
            label="货物重量（单位:kg）"
            width="180">
          </el-table-column>
          <el-table-column
            prop="check"
            label="审核是否通过"
            width="180">
            <template>
              <el-button
                @click="nopass"
                type="primary"
                size="small">
                打 回
              </el-button>
              <el-button
                @click="pass"
                type="primary"
                size="small">
                通 过
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="查看入库信息" name="second">
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
          :data="tableData2"
          stripe
          height="350"
          style="width: 90%;margin-left: 35px;margin-top: 15px">
          <el-table-column
            prop="warehousenum"
            label="入库单号"
            width="120">
          </el-table-column>
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
            prop="pname"
            label="送货入库人员"
            width="120">
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'WareInput',
  data () {
    return {
      activeName: 'first',
      labelPosition: 'left',
      value: '',
      input: '',
      formLabelAlign: {
        warehousenum: '',
        ordernum: '',
        order: '',
        name: ''
      },
      tableData: [{
        ordernum: '12345678',
        sname: '王小虎',
        sphone: '13168597846',
        saddress: '上海市普陀区金沙江路 1518 弄',
        rname: '王小虎',
        rphone: '13168597846',
        raddress: '广东省佛山市顺德区大良街道环市东路18明洋楼D座508',
        weight: '2.5'
      }],
      tableData2: [{
        warehousenum: '1f52g5g8f6',
        ordernum: '12345678',
        sname: '郑嘉雯',
        sphone: '13168597846',
        saddress: '广东省佛山市顺德区大良街道环市东路18明洋楼D座508',
        rname: '纪傻逼',
        rphone: '13078163530',
        raddress: '上海市普陀区金沙江路 1518 弄',
        product: 'same_day',
        pname: '任紫薇'
      }, {
        warehousenum: '1f52g5g8f6',
        ordernum: '12345678',
        sname: '郑嘉雯',
        sphone: '13168597846',
        saddress: '广东省佛山市顺德区大良街道环市东路18明洋楼D座508',
        rname: '纪傻逼',
        rphone: '13078163530',
        raddress: '上海市普陀区金沙江路 1518 弄',
        product: 'same_day',
        pname: '任紫薇'
      }, {
        warehousenum: '1f52g5g8f6',
        ordernum: '12345678',
        sname: '郑嘉雯',
        sphone: '13168597846',
        saddress: '广东省佛山市顺德区大良街道环市东路18明洋楼D座508',
        rname: '纪傻逼',
        rphone: '13078163530',
        raddress: '上海市普陀区金沙江路 1518 弄',
        product: 'same_day',
        pname: '任紫薇'
      }, {
        warehousenum: '1f52g5g8f6',
        ordernum: '12345678',
        sname: '郑嘉雯',
        sphone: '13168597846',
        saddress: '广东省佛山市顺德区大良街道环市东路18明洋楼D座508',
        rname: '纪傻逼',
        rphone: '13078163530',
        raddress: '上海市普陀区金沙江路 1518 弄',
        product: 'same_day',
        pname: '任紫薇'
      }],
      options: [{
        value: '选项1',
        label: '入库单号'
      }, {
        value: '选项2',
        label: '订单号'
      }, {
        value: '选项3',
        label: '快递产品'
      }, {
        value: '选项4',
        label: '送货入库人员'
      }]
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    },
    sure () {
      if (!this.formLabelAlign.ordernum) {
        this.$message.error('请选择未入库的订单号！')
      } else {
        this.$message({
          message: '查询成功！',
          type: 'success'
        })
      }
    },
    lookfor () {
      if (!this.formLabelAlign.order) {
        this.$message.error('请输入未入库的订单号！')
      } else {
        this.$message({
          message: '查询成功！',
          type: 'success'
        })
      }
    },
    nopass () {
      // 审核不通过
      this.$message.error('审核不通过，请返回“物流业务开单”界面进行处理！')
    },
    pass () {
      if (!this.formLabelAlign.name) {
        this.$message.error('请选择送货人员！')
      } else {
        this.$message({
          message: '审核通过！',
          type: 'success'
        })
      }
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
