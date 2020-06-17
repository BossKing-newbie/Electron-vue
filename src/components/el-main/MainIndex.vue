<template>
  <el-main>
    <el-carousel indicator-position="outside" height="465px">
      <el-carousel-item v-for="item in items" :key="item">
        <el-card :body-style="{ padding: '0px' }">
          <img :src="item" class="image">
        </el-card>
      </el-carousel-item>
    </el-carousel>
  </el-main>
</template>

<script>
export default {
  name: 'MainIndex',
  data () {
    return {
      items: ['https://s1.ax1x.com/2020/06/16/NFIVyR.jpg',
        'https://s1.ax1x.com/2020/06/07/tRGVPJ.jpg',
        'https://s1.ax1x.com/2020/06/07/tRGZG9.jpg'],
      tag: new Date()
    }
  }
}
</script>

<style lang="stylus" scoped>
  .image
    width 100%
    display block
</style>
