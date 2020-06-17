<template>
  <div class="nextday">
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="寄件人信息" name="first">寄件人信息</el-tab-pane>
    <el-tab-pane label="收件人信息" name="second" disabled="true">收件人信息</el-tab-pane>
    <el-tab-pane label="物品信息" name="third" disabled="true">物品信息</el-tab-pane>
    <el-tab-pane label="估价" name="fourth" disabled="true">估价</el-tab-pane>
  </el-tabs>
    次日
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'first'
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .nextday
    box-shadow 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
    border-radius 10px
    width 650px
    height 400px
    margin-left 85px
    margin-top 20px
</style>
