<template>
  <div class="main">
    <el-select v-model="value" clearable placeholder="查询选择" size="small"
               style="width: 100px;margin-top: 20px;margin-left: -400px">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'OrderEntry',
  data () {
    return {
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
      value: ''
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
