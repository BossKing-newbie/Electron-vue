<template>
  <el-aside width="200px">
    <el-avatar :size="60" :src="imageUrl"
               style="cursor: pointer;margin-bottom: 20px"></el-avatar>
    <el-menu
      default-active="1-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-s-custom"></i>
          <span>个人信息</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-2" @click="barclick('info')">我的信息</el-menu-item>
          <el-menu-item index="1-3" @click="barclick('changepwd')">修改密码</el-menu-item>
          <el-menu-item index="1-4" @click="barclick('changephone')">修改手机</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-box"></i>
          <span slot="title">产品服务</span>
        </template>
        <el-menu-item-group v-for="(value, index) in customerArray" :key="index">
          <el-menu-item :index="value.index" @click="barclick(value.order)">{{value.title}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-s-order"></i>
          <span slot="title">订单管理</span>
        </template>
        <el-menu-item-group v-for="(value, index) in orderArray" :key="index">
          <el-menu-item :index="value.index" @click="barclick(value.order)">{{value.title}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-phone-outline"></i>
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
      customerArray: [{ title: '当日达', index: '2-1', order: 'sameday' }, { title: '次日达', index: '2-2', order: 'next' }, { title: '隔日达', index: '2-3', order: 'seventy' }],
      orderArray: [{ title: '物流状态', index: '3-1', order: 'logistics' }, { title: '历史订单', index: '3-2', order: 'historyorder' }]
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
