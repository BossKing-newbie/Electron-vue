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
          <i class="el-icon-truck"></i>
          <span>快递业务管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-2" @click="barclick('orderentry')">物流业务开单</el-menu-item>
          <el-menu-item index="1-3" @click="barclick('ordercheck')">订单状态查看</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-s-order"></i>
          <span slot="title">仓库管理</span>
        </template>
        <el-menu-item-group v-for="(value, index) in warehouse" :key="index">
          <el-menu-item :index="value.index" @click="barclick(value.order)">{{value.title}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-user"></i>
          <span slot="title">个人信息管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="3-1" @click="barclick('')">管理个人信息</el-menu-item>
          <el-menu-item index="3-2" @click="barclick('')">修改个人密码</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-s-data"></i>
          <span slot="title">数据管理</span>
        </template>
        <el-menu-item-group v-for="(value, index) in superdata" :key="index">
          <el-menu-item :index="value.index" @click="barclick(value.order)">{{value.title}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: 'AdminHomeAside',
  data () {
    return {
      warehouse: [{ title: '货物入库管理', index: '2-1', order: '' }, { title: '货物出库管理', index: '2-2', order: '' }],
      superdata: [{ title: '数据报表', index: '4-1', order: '' }, { title: '数据可视化', index: '4-2', order: '' }]
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
