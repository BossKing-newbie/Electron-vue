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
      style="margin-left: 50px">
      搜 索
    </el-button>
    <el-button
      type="primary"
      size="small"
      icon="el-icon-refresh"
      style="margin-left: 20px">
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
        value: '选项1',
        label: '订单号'
      }, {
        value: '选项2',
        label: '用户名'
      }, {
        value: '选项3',
        label: '手机号'
      }],
      tableData: [{
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
        name: 'seven ',
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
        name: 'seven ',
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
        name: 'seven ',
        phone: '13168597846',
        weight: '2.5kg',
        price: 'null',
        sum: '100'
      }]
    }
  },
  methods: {
    EditClick (scope) {
      console.log(scope)
      this.currentEdit = scope.$index
    },
    finishEditClick () {
      this.currentEdit = -1
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
