<template>
  <main>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" enctype=”multipart/form-data”>
      <el-form-item label="文章标题" prop="name" class="bor">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="文章封面" prop="avatar" class="pic_wra bor">
        <input type="file" @change="updateImg" accept="image/png,image/gif" ref="imgWra">
        <img v-if="imageUrl||imgData" :src="imageUrl||`${imgHost}${imgData}`" class="avatar" @click="choseImg">
        <i class="el-icon-plus avatar-uploader-icon" v-else @click="choseImg"></i>
      </el-form-item>
      <el-form-item label="文章分类" prop="resource" class="bor">
        <el-radio-group v-model="ruleForm.resource">
          <el-radio label="前端"></el-radio>
          <el-radio label="ACG"></el-radio>
          <el-radio label="杂项"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="文章简介" prop="desc" class="bor">
        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
      </el-form-item>
      <el-form-item label="关键字" class="bor">
        <el-tag
          :key="tag"
          v-for="tag in dynamicTags"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)">
          {{tag}}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加</el-button>
      </el-form-item>
      <el-form-item label="文章详情" prop="desc" class="bor">
        <quill-editor v-model="article">
        </quill-editor>
      </el-form-item>


      <el-form-item label="文章BGM" prop="desc" class="bor">
        <el-button type="primary" @click="choseMuisc" style="display: block">上传音乐</el-button>
        <input type="file" @change="updataMusic" style="display: none" ref="musicWra">
        <video :src="music||`${imgHost}${musicData}`" controls="controls"></video>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">{{$route.params.id?'立即修改':'立即创建'}}</el-button>
      </el-form-item>
    </el-form>
  </main>
</template>
<script>
import { mapGetters } from "vuex";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
import { httpPost } from "../common/http";
export default {
  computed: {
    ...mapGetters({
      imgHost: "imgHost"
    })
  },
  data() {
    return {
      dynamicTags: [],
      inputVisible: false,
      inputValue: "",
      article: "",
      imgData: "",
      imageUrl: "",
      music: "",
      musicData: "",
      ruleForm: {
        title: "",
        resource: "",
        desc: "",
      },
      rules: {
        resource: [
          { required: true, message: "请选择文章分类", trigger: "change" }
        ]
      }
    };
  },
  created() {
    if (this.$route.params.id) {
      let ajaxData = { id: this.$route.params.id };
      httpPost(`/blog/getBlog`, ajaxData, res => {
        if (res.Code === 1) {
          this.article = res.BackData.article;
          this.imgData = res.BackData.avatar;
          this.musicData = res.BackData.music;
          this.ruleForm["title"] = res.BackData.title;
          this.ruleForm["resource"] = res.BackData.sort;
          this.ruleForm["desc"] = res.BackData.info;
        } else {
          this.$alert("读取文章信息失败", "失败", {
            confirmButtonText: "确定",
            callback: action => {
              this.$router.push("/BlogsEdit");
            }
          });
        }
      });
    }
  },
  methods: {
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let ajaxData = new FormData(),
            url;
          if (this.$route.params.id) {
            url = "editBlog";
            ajaxData.append("id", this.$route.params.id);
          } else {
            url = "addBlog";
          }
          if (this.imageUrl) {
            ajaxData.append("avatar", this.$refs.imgWra.files[0]);
          } else {
            ajaxData.append("avatar", this.imgData);
          }
          if (this.music) {
            ajaxData.append("music", this.$refs.musicWra.files[0]);
          } else {
            ajaxData.append("music", this.musicData);
          }
          ajaxData.append("title", this.ruleForm.title);
          ajaxData.append("sort", this.ruleForm.resource);
          ajaxData.append("info", this.ruleForm.desc);
          ajaxData.append("article", this.article);
          ajaxData.append('keyword',this.dynamicTags.join(','));
          httpPost(`/blog/${url}`, ajaxData, res => {
            if (res.Code === 1) {
              this.$alert("跳转至列表页面", "成功", {
                confirmButtonText: "确定",
                callback: action => {
                  this.$router.push("/BlogsEdit");
                }
              });
            } else {
              this.$alert(res.BackData, "失败", {
                confirmButtonText: "确定"
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    choseImg() {
      this.$refs.imgWra.click();
    },
    choseMuisc() {
      this.$refs.musicWra.click();
    },
    updateImg(event) {
      const vm = this;
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = function(e) {
        vm.imageUrl = e.target.result;
      };
    },
    updataMusic(event) {
      const vm = this;
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = function(e) {
        vm.music = e.target.result;
      };
    }
  },
  components: {
    quillEditor
  }
};
</script>

<style scoped lang="scss">
main {
  width: 100%;
}
.bor {
  border: 1px solid #efefef;
  background: #fff;
  padding: 10px 0;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.pic_wra {
  position: relative;
  input {
    position: absolute;
    opacity: 0;
    z-index: -1;
  }
}
</style>
