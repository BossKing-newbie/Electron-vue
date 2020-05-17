<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px
html::-webkit-scrollbar /*滚动条整体样式*/
  width: 10px     /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px
html::-webkit-scrollbar-thumb/*滚动条里面小方块*/
  border-radius: 10px
  -webkit-box-shadow: inset 0 0 5px rgba(43,127,172,0.1)
  background: rgba(43,127,172,0.1)
html::-webkit-scrollbar-track /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(43,127,172,0.1)
  border-radius: 10px
  background: #EDEDED
</style>
