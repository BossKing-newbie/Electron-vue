<template>
  <div class="main">
    <el-select v-model="value" clearable placeholder="查询选择" size="small"
               style="width: 100px;margin-top: 30px;margin-left: -30px">
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
      @click="filterTableData(value, input, tableData)">
      搜 索
    </el-button>
    <el-button
      type="primary"
      size="small"
      icon="el-icon-refresh"
      style="margin-left: 20px"
      @click="initButton">
      重 置
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
        prop="phone"
        label="手机号"
        width="120">
      </el-table-column>
      <el-table-column
        prop="price"
        label="起步价"
        width="80">
      </el-table-column>
      <el-table-column
        prop="sum"
        label="总价格"
        width="80">
      </el-table-column>
      <div v-for="(item,index) in tableTitle" :key="index" >
        <el-table-column :prop="item.prop" :label="item.label" :width="item.width">
          <template slot-scope="{row,$index}">
            <el-input v-model="row[item.prop]" v-if="currentEdit === $index" @keyup.enter.native="finishEditClick()"></el-input>
            <span v-else>{{row[item.prop]}}</span>
          </template>
        </el-table-column>
      </div>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="finishEditClick(scope)"  v-if="currentEdit === scope.$index" icon="el-icon-check">完 成</el-button>
          <el-button type="text" size="small" @click="EditClick(scope)" v-else icon="el-icon-edit">编 辑</el-button>
        </template>
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
      input: '',
      currentEdit: -1,
      tableTitle: [
        {
          label: '重量',
          prop: 'weight',
          width: '80'
        }
      ],
      options: [{
        value: 'num',
        label: '订单号'
      }, {
        value: 'name',
        label: '用户名'
      }, {
        value: 'phone',
        label: '手机号'
      }],
      tableData: []
    }
  },
  methods: {
    EditClick (scope) {
      console.log(scope)
      this.currentEdit = scope.$index
    },
    finishEditClick () {
      this.currentEdit = -1
    },
    initButton () {
      this.value = ''
      this.input = ''
      this.initTableData()
    },
    // 过滤方法,即点击查询
    filterTableData (value, input, tableData) {
      console.log(value)
      console.log(input)
      switch (value) {
        case 'num':
          this.tableData = tableData.filter(function (currentValue) {
            return currentValue.num === input
          })
          break
        case 'phone':
          this.tableData = tableData.filter(function (currentValue) {
            return currentValue.phone === input
          })
          break
        case 'name':
          this.tableData = tableData.filter(function (currentValue) {
            console.log(currentValue.name)
            return currentValue.name === input
          })
          break
      }
    },
    initTableData () {
      const tableData = [{
        num: '12345678',
        name: 'sevenking',
        phone: '13168597846',
        weight: 'null',
        price: 'null',
        sum: 'null'
      }, {
        num: '12345678',
        name: 'sevenking',
        phone: '13168597846',
        weight: 'null',
        price: 'null',
        sum: 'null'
      }, {
        num: '12345678',
        name: 'seven',
        phone: '13168597846',
        weight: '2.5kg',
        price: 'null',
        sum: '100'
      }, {
        num: '12345678',
        name: 'seven',
        phone: '13168597846',
        weight: '2.5kg',
        price: 'null',
        sum: '100'
      }, {
        num: '12345678',
        name: 'seven ',
        phone: '13168597846',
        weight: '2.5kg',
        price: 'null',
        sum: '100'
      }, {
        num: '12345678',
        name: 'seven',
        phone: '13078163530 ',
        weight: '2.5kg',
        price: 'null',
        sum: '100'
      }, {
        num: '12345678',
        name: 'seven',
        phone: '13168597846',
        weight: '2.5kg',
        price: 'null',
        sum: '100'
      }]
      this.tableData = tableData
    }
  },
  mounted () {
    this.initTableData()
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
