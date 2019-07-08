<template>
    <div id="userManager">
        <div class="title">用户信息</div>
        <div class="main">
            <div class="userAventer">
               <!-- <el-upload
                class="avatar-uploader"
                action=" "
                :http-request="uploads"
                :show-file-list="false"
                :on-success="handleAvatar"
                :before-upload="beforeAvatar">
     
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus"></i>
              </el-upload> -->
              <img :src="name" alt="">
              <el-form label-width="120px" class="demo-ruleForm" style="margin-top:20px;">
                    <el-form-item label="用户姓名:" >
                         <el-col :span="20">{{userData.name}} </el-col>
                         <el-col :span="4" style="color:#0FD0FF;"> </el-col>
                         <!-- <el-col :span="4" style="color:#0FD0FF;"> 修改</el-col> -->
                        
                    </el-form-item>
                    <el-form-item label="用户性别:" >
                         <el-col :span="20">{{userData.sex|formatsex}} </el-col>
                         <el-col :span="4" style="color:#0FD0FF;"> </el-col>
                    </el-form-item>
                    <el-form-item label="联系电话:" >
                        <el-col :span="20">{{userData.phoneNumber}} </el-col>
                         <el-col :span="4" style="color:#0FD0FF;"> </el-col>
                         
                    </el-form-item>
                    <el-form-item label="电子邮箱:" >
                          <el-col :span="20">{{userData.email}} </el-col>
                         <el-col :span="4" style="color:#0FD0FF;"> </el-col>
                    </el-form-item>
                     <el-form-item label="所属岗位:" >
                         <el-col :span="20">{{userData.positionName}} </el-col>
                         <el-col :span="4" style="color:#0FD0FF;"> </el-col>
                    </el-form-item>
                     <el-form-item label="所属角色:" >
                         <el-col :span="20">
                             <div v-for="(item,index) in userData.groupList" :key="index">
                                 <span>{{item.name}}</span>
                             </div>
                            
                         </el-col>
                         <el-col :span="4" style="color:#0FD0FF;"> </el-col>
                    </el-form-item>
                     <el-form-item label="所在地址:" >
                         <el-col :span="20">{{userData.provinceName}}{{userData.cityName}} {{userData.areaName}}{{userData.address}}</el-col>
                         <el-col :span="4" style="color:#0FD0FF;"> </el-col>
                    </el-form-item>
                    <el-form-item label="备注信息:" >
                         <el-col :span="20">{{userData.description}} </el-col>
                         <el-col :span="4" style="color:#0FD0FF;"> </el-col>
                    </el-form-item>
                        <el-col :span="24" style="color:#0FD0FF;"> 
                            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                        </el-col>
                        
                    
                        
               
                        
                        
              
                </el-form>


            </div>
        </div>
    </div>
</template>
<script>
import {

  select,
  adds
} from '@/api/ConfigurationManagement/UserLoginLog';
import {
  getData
} from '@/api/ConfigurationManagement/UserManager'
  import axios from 'axios'
import { mapState,mapMutations,mapActions} from 'vuex'
export default {
    data(){
        return{
             imageUrl: '',
             userData:{},
             name: require("@/icon/iconfonts/name.png"),
        }

    },
    filters: {
          formatsex: function (val) {
              console.log(val)
              return val == "1"  ? '男' : val == "0"  ? '女'  : '保密';
          }
      },
    methods:{
        //     formatsex: function (val) {
        //       console.log(val)
        //       if (val=='1') {
        //         return ('男')
        //       }else if (val=='0') {
        //         return ('女')
        //       }
        //       // return val == "FEMALE"  ? '女' : val == "MALE"  ? '男';
        //   },
        getData_(){
            var a=localStorage.userId
            
                getData(a).then(res=>{
                    console.log(res)
                    this.userData=res.data
            
          })
        },
         uploads(fileObj) {
        const formData = new FormData()
        formData.append('picture', fileObj.file)
        formData.append('type', fileObj.file.type)
        return axios.request({
          url: '/opt/systemconfig/upload',
          method: 'post',
          data: formData
        }).then(res => {
          this.imageUrl2 = res.data.data;
        //   返回的图片URl
          console.log(res.data.data)
        })
      },
      handleAvatar(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        console.log(this.imageUrl)
      },
      beforeAvatar(file) {
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isGIF = file.type === 'image/gif';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG || isPNG && isLt2M || isGIF;
      },
      
    },
    mounted(){
// this.$store.state.userId
    this.getData_();
// console.log(localStorage.userId)
    }
}
</script>

<style lang="less" scoped>
    #userManager{
        width: 100%;
        height: 100%;
        background: url('../../../icon/icon/backgroung.png') no-repeat center;
        background-size: 100% 100%;
        position: relative;
        .title{
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            text-align: center;
            padding-top: 5px;
            color: #0FD0FF;
            // width: 2rem;
        }
        .main{
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            padding: 1rem 4rem;
            text-align: center;
            overflow-y: scroll;
        }

    }
</style>
<style lang="less">
        #userManager{
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
                    font-size: 28px;
                    color: #8c939d;
                    width: 60px;
                    height: 60px;
                    line-height: 60px;
                    text-align: center;
                }
                .avatar {
                    width: 60px;
                    height: 60px;
                    display: block;
                }
                .el-form-item__label{
                    color: #0FD0FF;
                }
                .el-input__inner{
                    background: rgba(3,26,70,1);
                    border:1px solid rgba(3,43,104,1);
                }
                .el-button{
                    padding: 10px 20px;
                    border:1px solid rgba(15,208,255,1);
                }
                
                .el-button:focus{
                    background: #0FD0FF;
                    color: #fff;
                }
                .el-button:hover{
                     border:1px solid rgba(15,208,255,1)!important;
                }
        }
</style>

