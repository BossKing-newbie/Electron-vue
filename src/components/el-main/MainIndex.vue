<template>
  <el-main>
    <el-carousel indicator-position="outside" height="465px">
      <el-carousel-item v-for="item in items" :key="item">
        <el-card :body-style="{ padding: '0px' }">
          <img :src="item" class="image">
          <div style="padding: 14px;text-align: left">
            <span style="font-size: 40px">快递服务</span>
            <div>
              <time class="time">{{tag}}</time>
            </div>
          </div>
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
      items: ['https://www.sf-express.com/.gallery/index/PCkuaidifuwu-0213.jpg',
        'https://www.sf-express.com/.gallery/index/lengyunbusiness-img2.jpg',
        'https://www.sf-express.com/cn/sc/download/medicine.jpg'],
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
