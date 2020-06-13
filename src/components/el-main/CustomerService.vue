<template>
    <el-main>
      <div class="customer">
        <el-row>
          <el-col :span="2">
            <el-card shadow="hover" class="one" :body-style="{ padding: '10px' }">
              <img src="https://s1.ax1x.com/2020/06/13/tvPT0I.jpg" class="image">
              <div class="name1">
                <span>纪佳金</span>
              </div>
              <div class="text name1">
                <span>724574109@qq.com</span>
              </div>
            </el-card>
          </el-col>
          <el-col :span="2">
            <el-card shadow="hover" class="two" :body-style="{ padding: '10px' }">
              <img src="https://s1.ax1x.com/2020/05/20/Y7B8tx.png" class="image">
              <div class="name2">
                <span>官耀威</span>
              </div>
              <div class="text name2">
                <span>1210792729@qq.com</span>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3">
            <el-card shadow="hover" class="three" :body-style="{ padding: '10px' }">
              <img src="https://s1.ax1x.com/2020/05/20/Y7BGh6.png" class="image">
              <div class="name3">
                <span>任紫薇</span>
              </div>
              <div class="text name3">
                <span>2039177334@qq.com</span>
              </div>
            </el-card>
          </el-col>
          <el-col :span="3">
            <el-card shadow="hover" class="four" :body-style="{ padding: '10px' }">
              <img src="https://s1.ax1x.com/2020/05/20/Y7B3A1.png" class="image">
              <div class="name4">
                <span>黄昕</span>
              </div>
              <div class="text name4">
                <span>3166406536@qq.com</span>
              </div>
            </el-card>
          </el-col>
          <el-col :span="3">
            <el-card shadow="hover" class="five" :body-style="{ padding: '10px' }">
              <img src="https://s1.ax1x.com/2020/06/13/tvP77t.jpg" class="image">
              <div class="name5">
                <span>郑嘉雯</span>
              </div>
              <div class="text name5">
                <span>614124066@qq.com</span>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-main>
</template>

<script>
export default {
  name: 'CustomerService'
}
</script>

<style lang="stylus" scoped>
  .customer
    width 650px
    height 400px
    box-shadow 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
    border-radius 10px
    margin-left 65px
    //margin-right 100px
  .one
    width 150px
    margin-left 150px
    margin-top 35px
    height 150px
  .two
    width 150px
    margin-left 300px
    margin-top 35px
    height 150px
  .three
    width 150px
    margin-left 50px
    margin-top 30px
    height 150px
  .four
    width 150px
    margin-left 170px
    margin-top 30px
    height 150px
  .five
    width 150px
    margin-left 290px
    margin-top 30px
    height 150px
  .image
    width 65%
  .text
    font-size 12px
    font-family: "Helvetica Neue";
  .name1
    color cornflowerblue
  .name2
    color darkorchid
  .name3
    color lightsalmon
  .name4
    color #ffd13f
  .name5
    color darkseagreen
</style>
