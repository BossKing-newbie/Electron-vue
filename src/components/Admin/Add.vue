<template>
  <div class="main">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"
             label-width="100px" class="demo-ruleForm"
             style="margin-top: 80px;margin-left: 50px">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="ruleForm.name"  placeholder="请输入姓名"
                  clearable style="width: 200px;margin-left: -400px" size="small"></el-input>
      </el-form-item>
      <el-form-item label="部门" prop="department">
        <el-select v-model="ruleForm.department" clearable placeholder="请选择所在部门"
                   style="width: 200px;margin-left: -400px" size="small">
          <el-option label="财务部" value="部门1"></el-option>
          <el-option label="人事部" value="部门2"></el-option>
          <el-option label="销售部" value="部门3"></el-option>
          <el-option label="仓库管理部" value="部门4"></el-option>
          <el-option label="资源采购部" value="部门5"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="职位" prop="work">
        <el-input v-model="ruleForm.work"  placeholder="请输入所担任的职位"
                  clearable style="width: 200px;margin-left: -400px" size="small"></el-input>
      </el-form-item>
      <el-form-item label="工号" prop="num">
        <el-input v-model="ruleForm.num"  placeholder="工号形如：0xx（000-099）"
                  clearable style="width: 200px;margin-left: -400px" size="small"></el-input>
      </el-form-item>
      <el-form-item>
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="medium"
                   style="margin-top: 20px;margin-right: 200px;margin-left: -120px" @click="submitForm('ruleForm')">添 加</el-button>
        <el-button size="medium" @click="resetForm('ruleForm')">重 置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Add',
  data () {
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入名字！'))
      } else {
        callback()
      }
    }
    var checkDepartment = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请选择部门！'))
      } else {
        callback()
      }
    }
    var checkWork = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入职位！'))
      } else {
        callback()
      }
    }
    var checkNum = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入工号！'))
      } else {
        const reg = /^0[0-9][0-9]\d{0}$/
        console.log(reg.test(value))
        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的工号！'))
        }
      }
    }
    return {
      imageUrl: '',
      ruleForm: {
        name: '',
        department: '',
        work: '',
        num: ''
      },
      rules: {
        name: [
          { validator: checkName, required: true, trigger: 'blur' }
        ],
        department: [
          { validator: checkDepartment, required: true, trigger: 'blur' }
        ],
        work: [
          { validator: checkWork, required: true, trigger: 'blur' }
        ],
        num: [
          { validator: checkNum, required: true, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.imageUrl = ''
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPGorPNG = file.type === 'image/jpeg' || 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPGorPNG) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPGorPNG && isLt2M
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

  .avatar-uploader
    border 1px dashed #d9d9d9
    border-radius 6px
    cursor pointer
    position relative
    overflow hidden
    width 150px
    height 150px
    margin-left 350px
    margin-top -210px

  .avatar-uploader:hover
    border-color: #409EFF

  .avatar-uploader-icon
    font-size 20px
    color #8c939d
    width 150px
    height 150px
    line-height 150px
    text-align center

  .avatar
    width 150px
    height 150px
    display block
</style>
