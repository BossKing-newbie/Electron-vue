<template>
  <div class="main">
    <el-select v-model="value" clearable placeholder="查询选择" size="small"
               style="width: 100px;margin-top: 50px;margin-left: -30px">
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
      @click="searchperson">
      搜 索
    </el-button>
    <el-button
      type="primary"
      size="small"
      icon="el-icon-refresh"
      style="margin-left: 20px"
      @click="clearperson">
      重 置
    </el-button>
    <el-table
      :data="tableData"
      height="300px"
      stripe
      style="width: 90%;margin-top: 30px;margin-left: 35px">
      <el-table-column
        prop="picture"
        label="照片"
        width="180"
        align="center">
        <template width="40" slot-scope="scope">
        <el-image
          style="width: 100px; height: 100px"
          :src="scope.row.picture"></el-image>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180"
        align="center">
      </el-table-column>
      <el-table-column
        prop="department"
        label="部门"
        width="180"
        align="center">
      </el-table-column>
      <el-table-column
        prop="work"
        label="职位"
        width="180"
        align="center">
      </el-table-column>
      <el-table-column
        prop="num"
        label="工号"
        align="center"
        width="180">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'LookFor',
  data () {
    return {
      value: '',
      input: '',
      options: [{
        value: '选择1',
        label: '姓名'
      }, {
        value: '选择2',
        label: '工号'
      }, {
        value: '选择3',
        label: '部门'
      }],
      tableData: [{
        picture: 'https://s1.ax1x.com/2020/07/10/UKsjYQ.png',
        name: '郑嘉雯',
        department: '财务部',
        work: '经理',
        num: '020'
      }, {
        picture: 'https://s1.ax1x.com/2020/07/10/UKsqw8.png',
        name: '纪佳金',
        department: '仓库管理部',
        work: '主管',
        num: '009'
      }, {
        picture: 'https://s1.ax1x.com/2020/07/10/UKsvWj.png',
        name: '黄昕',
        department: '销售部',
        work: '经理',
        num: '023'
      }, {
        picture: 'https://s1.ax1x.com/2020/07/10/UKsXFg.png',
        name: '任紫薇',
        department: '人事部',
        work: '经理',
        num: '006'
      }, {
        picture: 'https://s1.ax1x.com/2020/07/10/UKsLTS.png',
        name: '官耀威',
        department: '资源采购部',
        work: '主管',
        num: '021'
      }]
    }
  },
  methods: {
    searchperson () {
      if (this.value === '') {
        this.$message.error('请选择查询内容！')
      } else if (this.input === '') {
        this.$message.error('请输入查询内容！')
      } else {
        this.$message({
          message: '查询成功！',
          type: 'success'
        })
      }
    },
    clearperson () {
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
