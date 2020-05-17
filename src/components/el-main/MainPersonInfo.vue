<template>
    <el-main>
      <div class="info">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <div slot="tip" class="el-upload__tip">用户头像只能上传jpg/png文件，且不超过500kb</div>
          <el-avatar v-if="imageUrl" :src="imageUrl" fit="contain" :size="60" style="margin-top:15px"></el-avatar>
        </el-upload>
        <el-divider></el-divider>
        <el-form>
          <el-form-item>
            <el-radio v-model="radio" label="man">男</el-radio>
            <el-radio v-model="radio" label="woman">女</el-radio>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="请输入用户昵称" prefix-icon="el-icon-search" style="width: 250px"></el-input>
          </el-form-item>
          <el-form-item>
            <el-cascader
              v-model="selectedOptions"
              :options="options"
              @change="handleChange" style="width: 250px" placeholder="请选择所在地区"></el-cascader>
          </el-form-item>
        </el-form>
      </div>
    </el-main>
</template>

<script>
import { regionData, CodeToText } from 'element-china-area-data'
export default {
  name: 'MainPersonInfo',
  data () {
    return {
      imageUrl: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      radio: 'man',
      selectedOptions: [],
      options: regionData
    }
  },
  methods: {
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handleChange () {
      let loc = ''
      for (let i = 0; i < this.selectedOptions.length; i++) {
        loc += CodeToText[this.selectedOptions[i]] + '-'
      }
      console.log(loc)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .avatar
    width 100px
    height 100px
    display block
  .info
    box-shadow 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
    width 650px
    height 450px
    margin-left 50px
</style>
