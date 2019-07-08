<template>
  <div id="SystemConfiguration">
    <div class="System-header">
      系统设置
    </div>
    <div class="System-main">
      <div id="System-main-Settings">
        <el-form :inline="true" size="mini" :model="ruleForms" :rules="rules" ref="ruleForms" label-position='left'
                 label-width="115px"
                 class="demo-ruleForm demo-form-inline">
          <el-col class="line" :span="24">
            <el-form-item label="logo">
              <el-upload
                class="avatar-uploader"
                action=" "
                :http-request="uploads"
                :show-file-list="false"
                :on-success="handleAvatar"
                :before-upload="beforeAvatar">
                <!--<img v-if="detection.imageUrl" :src="detection.imageUrl" class="avatar">-->
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="avatar-uploader-icon">logo</i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="24">
            <el-form-item label="系统重命名" prop="Code">
              <el-input class="type" v-model="ruleForms.Code"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
        <div class="System-main-buttom">
          <el-button @click="dialogForm" style="margin-top:20px;">取 消</el-button>
          <el-button type="primary" @click="queding(ruleForms)">确 定</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  select,
  adds
} from '@/api/ConfigurationManagement/UserLoginLog';
  import axios from 'axios'
import { mapState,mapMutations,mapActions} from 'vuex'
  import {
    rule1,
    rule10,
    rule11,
    rule2,
    rule2_1,
    rule3,
    rule4,
    rule5,
    rule6,
    rule7,
    rule8,
    rule9
  } from '@/utils/rules.js';

  export default {
    data() {
      return {
        imageUrl: '',
        imageUrl2:'',
        ruleForms: {
          Code: ''
        },
        rules: {
          Code: [
            {required: true, message: '请输入系统名称'},
            {min: 2, max: 13, message: '长度在 2 到 13 个字符 '},
            {validator: rule5}
          ],
        }
      };

    },

    methods: {
      ...mapActions(['getInfo']),
      selecting(){
        select().then(res =>{
          this.ruleForms.Code = res.data.sysName;
          this.imageUrl = res.data.picture;
        })
      },
      uploads(fileObj) {
        const formData = new FormData()
        formData.append('picture', fileObj.file)
        formData.append('type', fileObj.file.type)
        return axios.request({
          url: '/api/systemconfig/upload',
          method: 'post',
          data: formData
        }).then(res => {
          this.imageUrl2 = res.data.data;
          // this.imageUrl2 = 'http://' + res.data.data[1].fileUrl;   // 上传的图片
        })
      },
      //新建背景图片
      handleAvatar(res, file) {
        console.log(file,'23123123');
        // this.detection.imageUrl = URL.createObjectURL(file.raw);
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatar(file) {
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isGIF = file.type === 'image/gif';
        const isLt2M = file.size / 1024 / 1024 < 2;
        /*  if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG / PNG 格式!');
          }
          if (!isPNG) {
            this.$message.error('上传头像图片只能是 JPG / PNG 格式!');
          }*/
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG || isPNG && isLt2M || isGIF;
      },
      dialogForm() {
        if (this.$refs.ruleForms !== undefined) {
          this.$refs.ruleForms.resetFields();
        }
       /* this.imageUrl = '';
        this.ruleForms.Code = '';*/
       this.selecting();
      },
      queding(ruleForms) {
        this.$refs.ruleForms.validate((valid) => {
          if (valid) {
            this.imgsrc = 0;
            let query = {
              id:'',
              picture: this.imageUrl2,
              sysName: this.ruleForms.Code,
              userId: localStorage.userId
            };
            adds(query).then(res =>{
              if(res.status === '200' || res.status === 200){
                // this.selecting();
                this.$message({
                  message: '修改成功',
                  type: 'success',
                  duration: 3 * 1000
                });

                this.imgsrc = 1
              }
            })

          } else {
            console.log('error submit!!');
            return false;
          }
        });

      }
    },
    created() {

    },
    mounted() {
        this.selecting();
    },
    computed:{
      imgsrc:{
        get: function () {
          return this.$store.state.img.imgsrc
        },
        set: function (val) {
          this.$store.state.img.imgsrc = val
        }
      },
    },
  }

</script>

<style scoped lang="less">
  #SystemConfiguration {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background: url("../../../icon/icon/backgroung.png");
    background-size: 100% 100%;
    padding: 0.35rem 0.2rem 0.2rem 0.2rem;
    position: relative;
    .System-header {
      width: 1rem;
      height: 0.34rem;
      line-height: 0.34rem;
      font-size: 0.16rem;
      font-weight: bold;
      color: rgba(6, 108, 152, 1);
      margin: -0.34rem auto;
    }
    .System-main {
      width: 100%;
      height: calc(100% - 0.6rem);
      box-sizing: border-box;
      position: relative;

      #System-main-Settings {
        width: 8rem;
        height: 5rem;
        position: absolute;
        left: 4rem;
        top: 1.3rem;
        .avatar-uploader .el-upload {
          border: 1px dashed #d9d9d9;
          border-radius: 6px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .avatar-uploader .el-upload:hover {
          border-color: #409EFF;
        }
        .avatar-uploader-icon {
          font-size: 0.2rem;
          color: #0A9FD4;
          width: 1rem;
          height: 1rem;
          line-height: 1rem;
          text-align: center;
          border: 1px solid #032B68;
          overflow: hidden;
          font-family: element-icons !important;
          speak: none;
          font-style: normal;
          font-weight: 400;
          font-variant: normal;
          text-transform: none;
          vertical-align: baseline;
          display: inline-block;
          -webkit-font-smoothing: antialiased;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .avatar {
          width: 1rem;
          height: 1rem;
          display: block;
        }
      }
    }
    .System-main-buttom {
      width: 4rem;
      height: 0.6rem;
      position: absolute;
      left: 1.76rem;
      top: 2.3rem;;
      .el-button {
        padding: 0.09rem 0.39rem;
      }
    }

  }
</style>
<style lang="less">

  #SystemConfiguration {
    color: #0A9FD4;
    .el-input__inner {
      height: 0.35rem !important;
      width: 3rem !important;
      line-height: 28px !important;
    }
    .el-form-item__label {
      color: #0A9FD4 !important;
    }
  }

  #System-main-Settings {
    .el-input__inner {
      height: 36px;
      line-height: 36px;
      background: #031A46;
      border: 1px solid #032B68;
      color: #0A9FD4;
    }
    .el-form-item.is-error .el-input__inner, .el-form-item.is-error .el-input__inner:focus, .el-form-item.is-error .el-textarea__inner, .el-form-item.is-error .el-textarea__inner:focus, .el-message-box__input input.invalid, .el-message-box__input input.invalid:focus {
      border-color: #F56C6C !important;
    }
    .el-button {
      color:#F23030;
      border-color: #F23030 !important;
      background-color: #021132 !important;
    }
    .el-button--primary {
      color: #0FD0FF;
      border-color: #0FD0FF !important;
      background-color: #021132 !important;
    }
  }
</style>
