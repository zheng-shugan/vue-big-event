<template>
  <div>
    <!-- 内容区域 -->
    <el-card class='box-card'>
      <div slot='header' class='clearfix'>
        <span>文章列表</span>
      </div>
      <!-- 搜索区域 -->
      <div class='search-box'>
        <el-form :inline='true' :model='q'>
          <el-form-item label='文章分类'>
            <el-select v-model='q.cate_id' placeholder='请选择分类' size='small'>
              <el-option
                v-for='cateObj in cateList'
                :key='cateObj.key'
                :label='cateObj.cate_name'
                :value='cateObj.id' />
            </el-select>
          </el-form-item>
          <el-form-item label='发布状态' style='margin-left: 15px;'>
            <el-select v-model='q.state' placeholder='请选择状态' size='small'>
              <el-option label='已发布' value='已发布'></el-option>
              <el-option label='草稿' value='草稿'></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type='primary' size='small' @click='chooseFn'>筛选</el-button>
            <el-button type='info' size='small ' @click='resetFn'>重置</el-button>
          </el-form-item>
        </el-form>
        <!-- 发表文章的按钮 -->
        <el-button type='primary' size='small' class='btn-pub' @click='showPublishDialogFn'>发表文章</el-button>
      </div>

      <!-- 文章表格区域 -->
      <el-table
        :data='articleList'
        border
        style='width: 100%'>
        <el-table-column
          prop='title'
          label='文章标题'
          width='180'>
          <template v-slot='{ row }'>
            <el-link type='primary' @click='showDetailFn(row.id)'>
              {{ row.title }}
            </el-link>
          </template>
        </el-table-column>

        <el-table-column
          prop='cate_name'
          label='分类'
          width='180'>
        </el-table-column>

        <el-table-column
          prop='pub_date'
          label='发表时间'>
          <template v-slot='scope'>
            <span>{{ $formatDate(scope.row.pub_date) }}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop='state'
          label='状态'>
        </el-table-column>

        <el-table-column
          label='操作'>
          <template v-slot='{ row }'>
            <el-button
              type='danger'
              size='mini'
              @click='removeArticle(row.id)'
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        background
        @size-change='handleSizeChangeFn'
        @current-change='handleCurrentChangeFn'
        :current-page.sync='q.pagenum'
        :page-sizes='[2, 3, 5, 10]'
        :page-size.sync='q.pagesize'
        layout='total, sizes, prev, pager, next, jumper'
        :total='articleNum'
      >
      </el-pagination>
    </el-card>

    <!-- 发表文章的 Dialog 对话框 -->
    <el-dialog
      title='发表文章'
      :visible.sync='publishDialogVisible'
      fullscreen
      :before-close='handleClose'
      @close='onDialogClosed'
    >
      <!--  文章内容的表单 -->
      <el-form :model='articleForm' :rules='articleRules' ref='articleRef' label-width='100px'>
        <el-form-item label='文章标题' prop='title'>
          <el-input v-model='articleForm.title' placeholder='请输入标题' />
        </el-form-item>

        <!-- 选择分类 -->
        <el-form-item label='文章分类' prop='cate_id'>
          <el-select
            v-model='articleForm.cate_id'
            placeholder='请选择分类'
            style='width: 100%'
          >
            <el-option
              v-for='cateObj in cateList'
              :key='cateObj.id'
              :label='cateObj.cate_name'
              :value='cateObj.id' />
          </el-select>
        </el-form-item>

        <!-- 编辑文章内容 -->
        <el-form-item label='文章内容' prop='content'>
          <!-- 富文本组件 -->
          <quill-editor
            v-model='articleForm.content'
            ref='myQuillEditor'
            @blur='contentChange'
          >
          </quill-editor>
        </el-form-item>

        <!-- 封面选择 -->
        <el-form-item label='文章封面' prop='cover_img'>
          <!--  用来显示封面图片 -->
          <img
            src='../assets/images/cover.jpg'
            alt='image'
            class='cover-img'
            ref='imgRef'
          />
          <br>
          <input
            type='file'
            style='display: none'
            accept='image/*'
            ref='iptFileRef'
            @change='changeImageCover'
          />
          <el-button type='text' @click='uploadCoverImage'>选择封面</el-button>
        </el-form-item>

        <el-form-item>
          <el-button type='primary' @click="publishArticle('已发布')">发布文章</el-button>
          <el-button type='info' @click="publishArticle('草稿')">存为草稿</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 查看文章详情的对话框 -->
    <el-dialog
      title='文章预览'
      :visible.sync='articleDetailVisible'
      width='80%'
    >
      <h1 class='title'>{{ articleDetail.title }}</h1>

      <div class='info'>
        <span>作者：{{ articleDetail.nickname || articleDetail.username }}</span>
        <span>发布时间：{{ $formatDate(articleDetail.pub_date) }}</span>
        <span>所属分类：{{ articleDetail.cate_name }}</span>
        <span>状态：{{ articleDetail.state }}</span>

        <!-- 分割线 -->
        <el-divider />

        <!--  文章的封面 -->
        <img :src='baseURL + articleDetail.cover_img' alt='封面图片' />

        <!--
         {{ articleDetail.content }} 将会显示文本字符串
         要在标签内部渲染 HTML 标签需要使用 v-html
          -->
        <div v-html='articleDetail.content' class='detail-box'></div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getArtCateListAPI,
  getArticleListAPI,
  uploadArticleAPI,
  getArticleByIdAPI,
  deleteArticleByIdAPI
} from '@/api'
// 在标签和样式中引入图片可以写路径，在 JS 里引入图片要用 import
import defaultCover from '../assets/images/cover.jpg'
import { baseURL } from '@/utils/request'

export default {
    name: "ArtList",
    created() {
        // 请求分类列表
        this.getCateListFn();
        // 请求所有文章列表
        this.getArticleList();
    },
    data() {
        return {
            // 查询参数对象
            q: {
                pagenum: 1,
                pagesize: 5,
                cate_id: "",
                state: "" // 文章状态
            },
            publishDialogVisible: false,
            // 表单数据对象
            articleForm: {
                title: "",
                cate_id: "",
                content: "",
                cover_img: null,
                state: "" // 文章的状态：'已发布'，'草稿'
            },
            // 表单的验证规则对象
            articleRules: {
                title: [
                    { required: true, message: "请输入文章标题", trigger: "blur" },
                    {
                        min: 1,
                        max: 30,
                        message: "文章标题的长度为1-30个字符",
                        trigger: "blur"
                    }
                ],
                cate_id: [
                    { required: true, message: "请选择文章标题", trigger: "change" }
                ],
                content: [
                    // 这个 content 对应的是 quill-editor 富文本组件不是 element ui 的组件
                    // el-input 等输入框在 blur 事件的时候校验
                    // 下拉菜单、单选框、复选框在 change 事件的时候校验
                    // quill-editor 这这个事件都没有
                    // 解决：自己给 quill-editor 绑定 @change 事件
                    { required: true, message: "请输入文章内容", trigger: "blur" }
                ],
                cover_img: [
                    { required: true, message: "请选择封面", trigger: "blur" }
                ]
            },
            // 列表数据
            cateList: [],
            // 总的文章数量
            articleNum: 0,
            // 文章列表
            articleList: [],
            // 文章详情数据对象
            articleDetail: {
                title: "",
                nickname: "",
                username: "",
                cate_name: "",
                state: "",
                pub_date: "",
                cover_img: "",
                content: "" // 内容
            },
            // 控制文章详情对话框
            articleDetailVisible: false,
            // 后端接口地址
            // 导入的地址需要在 data 里 return 出去才可以在模版里使用
            baseURL
        };
    },
    methods: {
        // 获取所有文章列表
        async getArticleList() {
            const { data: res } = await getArticleListAPI(this.q);
            this.articleList = res.data; // 有分页，不是一次请求所有数据
            this.articleNum = res.total;
        },
        // 请求分类列表
        async getCateListFn() {
            const { data: res } = await getArtCateListAPI();
            this.cateList = res.data;
        },
        // 点击事件 -> 发表文章文章按钮
        showPublishDialogFn() {
            this.publishDialogVisible = true;
        },
        // 关闭添加文章对话框的回调函数
        onDialogClosed() {
            // 清空表单数据
            this.$refs.articleRef.resetFields();
            // 清空封面图片
            this.$refs.imgRef.setAttribute("src", defaultCover);
        },
        // 发布文章-对话框-关闭前的回调
        async handleClose(done) {
            // $confirm
            const confirmResult = await this.$confirm("此操作将会导致文章信息丢失，是否继续", "提示", {
                confirmButtonText: "确定",
                cancelButtonClass: "取消",
                type: "warning"
            }).catch(err => err);
            // 取消关闭，什么都不干
            if (confirmResult === "cancel") {
                return;
            }
            done();
        },
        // 选择封面 -> 点击事件
        uploadCoverImage() {
            // 用 JS 模拟点击事件
            this.$refs.iptFileRef.click();
        },
        // 上传文章封面
        changeImageCover(e) {
            let files = e.target.files;
            if (files.length === 0) { // 没有选择文件
                this.articleForm.cover_img = null;
                this.$refs.imgRef.setAttribute("src", defaultCover);
            }
            else { // 选择了文件
                this.articleForm.cover_img = files[0];
                const url = URL.createObjectURL(files[0]);
                this.$refs.imgRef.setAttribute("src", url);
            }
            // 校验是否选择了封面
            this.$refs.articleRef.validateField("cover_img");
        },
        // 发布文章/保存草稿
        async publishArticle(state) {
            // state 为 '已发布' 或 '草稿'
            this.articleForm.state = state;
            // console.log(this.articleForm)
            // 兜底校验
            await this.$refs.articleRef.validate(async (valid) => {
              if (valid) {
                // 通过了所有校验
                let fd = new FormData(); // 准备一个表单数据对象容器
                // FormData.append(key, value)
                // 向 FormData 里追加数据
                Object.keys(this.articleForm).forEach(key => {
                  fd.append(key, this.articleForm[key]);
                });
                const { data: res } = await uploadArticleAPI(fd);
                if (res.code !== 0) { // 发布文章失败
                  return this.$message("发布文章失败");
                } else {

                  // 发布文章成功
                  this.$message.success("发布文章成功");
                  this.publishDialogVisible = false;
                  // 重新获取文章列表
                  this.getArticleList();
                  console.log(res);
                }
              } else {
                // 阻止默认行为
                return false;
              }
            });
        },
        // 检测富文本编辑器文章内容变化
        contentChange() {
            // el-form 组件只检测某个字段
            this.$refs.articleRef.validateField("content");
        },
        // 分页 -> 每页条数改变触发
        handleSizeChangeFn(sizes) {
            // sizes 当前需要的页数
            this.q.pagesize = sizes;
            this.q.pagenum = 1;
            this.getArticleList();
        },
        // 当前页码发生变化触发
        handleCurrentChangeFn(nowPage) {
            // nowPage 当前的页数
            this.q.pagenum = nowPage;
            this.getArticleList();
        },
        // 筛选文章 -> 点击事件
        chooseFn() {
            // 目的：页码变成 1，每页的条数变成 5
            this.q.pagenum = 1;
            this.q.pagesize = 5;
            // 重新获取数据
            this.getArticleList();
        },
        // 重置按钮 -> 点击事件
        resetFn() {
            this.q = {
                pagenum: 1,
                pagesize: 5,
                cate_id: "",
                state: ""
            };
            this.getArticleList();
        },
        // 查看文章详情 -> 点击事件
        async showDetailFn(id) {
            // id 就是文章的 id
            const { data: res } = await getArticleByIdAPI(id);
            this.articleDetailVisible = true;
            if (res.code !== 0) { //  请求失败
                return this.$message.error("获取文章详情失败");
            }
            else {
                this.articleDetail = res.data;
            }
        },
        // 删除文章 -> 点击事件
        async removeArticle(id) {
            const { data: res } = await deleteArticleByIdAPI(id);
            if (res.code !== 0) {
                return this.$message.error(res.message);
            }
            this.$message.success(res.message);
            // 删除当前分页最后一条数据的的时候分页 -= 1
            if (this.articleList.length === 1) {
                this.q.pagesize -= 1;
            }
            await this.getArticleList();
        }
    },
}
</script>

<style lang='less' scoped>
.search-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  .btn-pub {
    margin-top: 5px;
  }
}

// 设置富文本编辑器的默认最小高度
// ::v-deep作用: 穿透选择, 正常style上加了scope的话, 会给.ql-editor[data-v-hash]属性, 只能选择当前页面标签或者组件的根标签
// 如果想要选择组件内的标签(那些标签没有data-v-hash值)所以正常选择选不中, 加了::v-deep空格前置的话, 选择器就会变成如下形式
// [data-v-hash] .ql-editor 这样就能选中组件内的标签的class类名了
::v-deep .ql-editor {
  min-height: 300px;
}

// 设置图片封面的宽高
.cover-img {
  width: 400px;
  height: 280px;
  object-fit: cover;
}

.el-pagination {
  margin-top: 15px;
}

.title {
  font-size: 24px;
  text-align: center;
  font-weight: normal;
  color: #000;
  margin: 0 0 10px 0;
}

.info {
  font-size: 12px;

  span {
    margin-right: 20px;
  }
}

// 修改 dialog 内部元素的样式，需要添加样式穿透
::v-deep .detail-box {
  img {
    width: 500px;
  }
}
</style>
