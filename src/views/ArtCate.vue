<template>
  <div>
    <!-- 预览文章分类 -->
    <el-card class='box-card'>
      <div slot='header' class='clearfix header-box'>
        <span>文章分类</span>
        <el-button type='primary' size='mini' @click='dialogVisible = true'>添加分类</el-button>
      </div>
      <template>
        <el-table :data='tableData' stripe style='width: 100%'>

          <el-table-column type='index' label='序号' width='180'></el-table-column>
          <el-table-column prop='cate_name' label='分类名称' width='180'></el-table-column>
          <el-table-column prop='cate_alias' label='分类别名'></el-table-column>

          <el-table-column label='操作'>
            <el-button type='primary'>修改</el-button>
            <el-button type='danger'>删除</el-button>
          </el-table-column>
        </el-table>
      </template>
    </el-card>

    <!--  添加文章分类 -- 对话框 -->
    <el-dialog
      title='添加文章分类'
      :visible.sync='dialogVisible'
      width='30%'
      @close='dialogCloseFn'
    >
      <el-form :label-position='labelPosition' :model='addForm' :rules='addRules' ref='addForm' label-width='80px'>
        <el-form-item label='分类名称' prop='cate_name' minLength='1' maxLength='15'>
          <el-input v-model='addForm.cate_name' />
        </el-form-item>

        <el-form-item label='分类别名' prop='cate_alias' minLength='1' maxLength='15'>
          <el-input v-model='addForm.cate_alias' />
        </el-form-item>
      </el-form>
      <span slot='footer' class='dialog-footer'>
        <el-button @click='dialogVisible = false'>取 消</el-button>
        <el-button type='primary' @click='confirmFn'>确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { saveArtCateAPI, getArtCateListAPI } from '@/api'

export default {
  name: 'ActCate',
  data() {
    return {
      tableData: [], // 文章分类的数组
      dialogVisible: false, // 控制显示添加文章分类的对话框
      labelPosition: 'left',
      addForm: { // 添加文章分类的表单
        cate_name: '',
        cate_alias: ''
      },
      addRules: { // 添加表单的验证规则对象
        cate_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { pattern: /^\S{1,10}$/, message: '分类名必须是1-10位的非空字符', trigger: 'blur' }
        ],
        cate_alias: [
          { required: true, message: '请输入分类别名', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9]{1,15}$/, message: '分类别名必须是1-15位的字母数字', trigger: 'blur' }
        ]
      },
      editId: '', // 要修改的文章 ID
      isEdit: false, // 保存编辑状态
    }
  },
  created() {
    this.getArtCateFn()
  },
  methods: {
    async getArtCateFn() {
      const { data: res } = await getArtCateListAPI()
      if (res.code !== 0) { // 获取失败
        return false
      } else { // 获取成功
        this.tableData = res.data
      }
    },
    confirmFn() {
      // 表单的校验
      this.$refs.addForm.validate(async (valid) => {
        if (valid) {
          // 通过了校验
          const { data: res } = await saveArtCateAPI(this.addForm)
          if (res.code !== 0) {
            return  this.$message.error(res.message)
          } else {
            this.getArtCateFn()
            this.$message.success(res.message)
          }
          console.log(res)
        } else {
          return false
        }
      })
      this.dialogVisible = false

    },
    // 对话窗口关闭时候的回调
    dialogCloseFn() {
      // 重置表单
      this.$refs.addForm.resetFields()
      // this.addForm.cate_alias = ''
      // this.addForm.cate_name = ''
    }
  }
}
</script>

<style scoped>
.header-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
