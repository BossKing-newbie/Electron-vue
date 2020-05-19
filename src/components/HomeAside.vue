<template>
  <el-aside width="200px">
    <el-avatar :size="60" :src="imageUrl"
               style="cursor: pointer"></el-avatar>
    <el-menu
      default-active="1-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-user"></i>
          <span>个人信息</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-2" @click="barclick('info')">个人信息</el-menu-item>
          <el-menu-item index="1-3" @click="barclick('changepwd')">修改密码</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-s-custom"></i>
          <span slot="title">客户服务</span>
        </template>
        <el-menu-item-group v-for="(value, index) in customerArray" :key="index">
          <el-menu-item :index="value.index">{{value.title}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-tickets"></i>
          <span slot="title">订单管理</span>
        </template>
        <el-menu-item-group v-for="(value, index) in orderArray" :key="index">
          <el-menu-item :index="value.index">{{value.title}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-mobile-phone"></i>
          <span slot="title">联系我们</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="4-1" @click="barclick('customerservice')">客服热线</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: 'HomeAside',
  data () {
    return {
      customerArray: [{ title: '当天达', index: '2-1' }, { title: '次日达', index: '2-2' }, { title: '72小时达', index: '2-3' }],
      orderArray: [{ title: '物流状态', index: '3-1' }, { title: '历史订单', index: '3-2' }]
    }
  },
  // 父子组件通信
  props: {
    imageUrl: {
      type: String,
      default: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    barclick (c) {
      this.$emit('bar-click', c)
    }
  }
}
</script>

<style scoped>

</style>
