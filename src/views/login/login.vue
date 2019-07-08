<template>
  <div id="login">
    <div class="login-container">
      <div class="login-top"></div>
      <div class="login-bottom">
            <!-- <el-form :model="loginForm" :rules="loginRule" ref="loginForm">
                   <el-row :gutter="16">
                     <el-col :span="16">
                       <el-form-item prop="username">
                         &lt;!&ndash;<div>sdsd</div>&ndash;&gt;
                         <el-input type="username" placeholder="请输入用户名"   prefix-icon="el-icon-user" v-model="loginForm.username"></el-input>
                       </el-form-item>
                     </el-col>
                   </el-row>
                   <el-row :gutter="16">
                     <el-col :span="16">
                       <el-form-item prop="pwd">
                         &lt;!&ndash;<div>sdsd</div>&ndash;&gt;
                         <el-input placeholder="请输入密码"   prefix-icon="el-icon-lock" show-password type="password" @keyup.enter.native="loginIn('loginForm')"
                                   v-model="loginForm.pwd"></el-input>
                       </el-form-item>
                     </el-col>
                   </el-row>
                   <el-row :gutter="16">
                     <el-col :span="6">

                       <el-tooltip class="item" effect="dark" content="欢迎来到时空大数据综合管理平台" placement="right-end">
                         <el-checkbox v-model="checked">记住密码</el-checkbox>
                       </el-tooltip>
                     </el-col>
                   </el-row>

                   <el-row :gutter="16">
                     <el-col :span="16">
                       <el-form-item>
                         <el-button type="primary" @click="loginIn('loginForm')" class="submitBtn">登录</el-button>
                       </el-form-item>
                     </el-col>
                   </el-row>

                   &lt;!&ndash;     <el-form-item>
                          <el-input type="hidden" name="grant_type" value="password"></el-input>
                        </el-form-item>&ndash;&gt;
                 </el-form>-->
        <!--用户选择-->
        <!-- <div class="CloudRight-div" @click="CloudRightClick">
                          <span class="CloudRight-span" style="position: absolute;left:14px">租户管理员</span>
                          <span class="CloudRight-span" style="position: absolute;right:18px">普通用户</span>
                          <span class="toggle-span faster-animation" ref="Handover">{{DataHandover}}</span>
                      </div>-->
        <div class="login-bac"></div>
        <div class="login-bottom-top"><img :src="logo" alt=""></div>
        <div class="login-bottom-bottom">
          <el-form :model="loginForm" :rules="loginRule" ref="loginForm">
            <el-row :gutter="16">
              <el-col :span="5"style="color:#0A9FD4;height: 0.34rem;text-align: center;line-height: 0.38rem;font-size: 0.16rem!important;margin-bottom: 0.1rem">用户名：</el-col>
              <el-col :span="11" style="padding-left: 2px">
                <el-form-item prop="username">
                  <el-input type="username" placeholder="请输入用户名" v-model="loginForm.username"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="16" style="margin-bottom: 0.05rem!important;">
              <el-col :span="5" style="color:#0A9FD4;height: 0.34rem;text-align: center;line-height: 0.38rem;font-size: 0.16rem!important;">密&nbsp;&nbsp;&nbsp码： </el-col>
              <el-col :span="11" style="padding-left: 2px">
                <el-form-item prop="pwd">
                  <el-input placeholder="请输入密码" show-password type="password" @keyup.enter.native="loginIn('loginForm')"
                            v-model="loginForm.pwd"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="16" style="width: 78%;margin-left: 21.5%!important;margin-bottom: 0.3rem;">
              <el-col :span="6">
                  <el-checkbox v-model="checked">记住密码</el-checkbox>
              </el-col>
              <el-col :span="6" style="float: right;right: 0">
                <span style="font-size: 0.12rem!important;float: right;color:#0A9FD4">忘记密码</span>
              </el-col>
            </el-row>

            <el-row :gutter="16">
              <el-col :span="16">
                <el-form-item>
                  <el-button type="primary" @click="loginIn('loginForm')" class="submitBtn">登录</el-button>
                </el-form-item>
              </el-col>
            </el-row>

            <!--     <el-form-item>
                   <el-input type="hidden" name="grant_type" value="password"></el-input>
                 </el-form-item>-->
          </el-form>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import {removeToken} from '@/utils/auth' // removeToken from cookie
  export function checkSpecificKey(str) {
    let specialKey = "[`~!#$^&*()=|{}':;',\\[\\].<>/?~！#￥……&*（）——|{}【】‘；：”“'。，、-？]‘'";
    for (let i = 0; i < str.length; i++) {
      if (specialKey.indexOf(str.substr(i, 1)) != -1) {
        return false;
      }
    }
    return true;
  };
  export default {
    name: 'login',
    data() {
      let checkAge = (rule, value, callback) => {

        if (!checkSpecificKey(value)) {
          return callback(new Error('不能输入特殊字符（可以是数字、字母）'));
        } else {
          callback();
        }
      };
      return {
        logo: require("@/icon/iconfonts/logo.png"),
        DataHandover: "系统超级管理员",
        DataSwitch: true,
        CloudRight: true,
        loginForm: {
          username: '',
          pwd: '',
        },
        loginRule: {
          username: [{
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          },
            {
              min: 3,
              max: 10,
              message: '长度在 3 到 10 个字符',
              trigger: 'blur'
            },
            {
              validator: checkAge,
              trigger: 'blur'
            },
          ],
          pwd: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
            {
              min: 3,
              max: 8,
              message: '长度在 3 到 8 个字符',
              trigger: 'blur'
            },
          ]
        },
        checked: ''
      }
    },

    methods: {
      // CloudRightClick() {
      //   if (this.DataSwitch) {
      //     this.$refs.Handover.style.left = 82 + "px";
      //     this.DataSwitch = false;
      //     this.DataHandover = "普通用户";
      //     this.CloudRight = false;
      //   } else {
      //     this.$refs.Handover.style.left = 0 + "px";
      //     this.DataSwitch = true;
      //     this.DataHandover = "租户管理员";
      //     this.CloudRight = true;
      //   }
      // },
      // 登录

      loginIn(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            if (this.DataHandover === '系统超级管理员') {
              this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
                //console.log('login',res)
                //console.log(1)
                this.$router.push({
                  path: '/home'
                })
                if (this.checked == true) {

                  this.setCookie(this.loginForm.username, this.loginForm.pwd, this.checked, 7)
                  console.log('记住密码了')
                } else {
                  this.checked = false
                  this.setCookie("", "", "", 0);
                  console.log('没有记住密码')
                  // localStorage.token.clear();
                  /* removeToken();
                   alert(9999);*/
                }
              }).catch(() => { //用户名不存在
                this.loading = false
                this.$message({
                  message: '用户名或密码错误',
                  type: 'warning'
                });
              })
            } else if (this.DataHandover === '普通用户') {
              this.$store.dispatch('LoginByUser', this.loginForm).then(res => {
                //console.log('login111')
                this.$router.push({
                  path: '/homepage'
                });
              }).catch(() => { //用户名不存在
                this.loading = false
                /*	this.$message({
                        message: '用户名或密码错误',
                        type: 'warning'
                    });*/
              })
            }
          } else {
            return false
          }
        })

      },
      //设置cookie
      //this.setCookie(this.loginForm.username,this.loginForm.pwd,this.checked,7)
      setCookie(c_name, c_pwd, c_check, exdays) {
        let exdate = new Date(); //获取时间
        exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
        //字符串拼接cookie
        window.document.cookie = "ZhengyuanWisdomCityUserName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
        window.document.cookie = "ZhengyuanWisdomCityuserPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
        window.document.cookie = "ZhengyuanWisdomCitychecked" + "=" + c_check + ";path=/;expires=" + exdate.toGMTString();
      },
      //读取cookie
      getCookie: function () {

        const _this = this;
        if (document.cookie.length > 0) {

          let arr = document.cookie.split('; ');
          for (let i = 0; i < arr.length; i++) {
            let arr2 = arr[i].split('=');
            //判断查找相对应的值
            //console.log(arr2)
            if (arr2[0] == 'ZhengyuanWisdomCityUserName') {
              this.loginForm.username = arr2[1]; //保存到保存数据的地方
            } else if (arr2[0] == 'ZhengyuanWisdomCityuserPwd') {
              this.loginForm.pwd = arr2[1];
            } else if (arr2[0] == 'ZhengyuanWisdomCitychecked') {
              _this.checked = !!arr2[1]; //保存记住密码的状态
            }
          }
        } else {
          // debugger
        }
      },
      //清除cookie
      // clearCookie: function () {
      //   this.setCookie("", "", "", -1); //修改2值都为空，天数为负1天
      // }
    },
    created() {
      localStorage.clear();
    },
    mounted() {
      this.getCookie();
      //console.log(this.omg, 'sdjksaj');
      //待测试
      if (this.omg) {
        this.setCookie();
      }
    },
    computed: {}
  }
</script>


<style lang="scss">
  #login {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: url(../../icon/icon/背景2.png) no-repeat;
    background-size: 100% 100%;
    .login-container {
      width: 40%;
      height: 80%;
      margin: 5% auto;
      .login-top {
        width: 6.42rem;
        height: 0.86rem;
        /*background-color: #55a532;*/
        margin: 0 auto;
        background: url("../../icon/icon/字体.png");
        background-size: 100% 100%;
      }
      .login-bottom {
        width: 4rem;
        height: 3.9rem;
        margin: 14% auto;
        position: relative;
        .login-bac{
          width: 100%;
          height: 100%;
          background-color: #06205B;
          opacity: 0.5;
          border:1px solid #0A9FD4;
          border-radius: 0.08rem;
        }
        .login-bottom-top {
          width: 1rem;
          height: 1rem;
          border-radius: 50%;
          border: 3px solid #0A9FD4;
          position: absolute;
          top: -0.5rem;
          left: 1.4rem;
          background: #fff;
       /*   background: url("../../icon/iconfonts/logo.png")center center no-repeat;;
          background-size: 70% 70%;
          overflow: hidden;*/
          img{
            width: 0.7rem;
            height: 0.7rem;
            float: left;
            margin-left: 0.15rem;
            margin-top: 0.15rem;
          }
        }
        .login-bottom-bottom{
          width: 83%;
          height: 60%;
          left: 9%;
          top: 1.08rem;
          position: absolute
        }
        .el-input__inner {
          width: 2.6rem;
          height: 0.34rem!important;
          background: #021132;
          outline: none;
          color: #0A9FD4;
          border: 1px solid #0A9FD4;
          font-size: 16px!important;
          letter-spacing: 0.04rem;
        }
        .el-button{
          width: 3.3rem;
          height: 0.4rem!important;
          margin-top: 0px;
          background:url("../../icon/icon/button.png");
          background-size: 100% 100%;
          border: none;
          color: white;
          font-size: 0.18rem;
          letter-spacing: 0.07rem;
          margin-left: 0.052rem;
          outline: none;
        }
        .el-checkbox__label{
          color:#0A9FD4;
          font-size: 0.12rem!important;
        }
        .el-checkbox{
          display: block;
          width:100%;
          height:40px;
          margin:0 auto -10px;
        }
        .el-form-item{
          margin-bottom: 0;
          width: 2.6rem;
        }
        .el-checkbox__inner{
          background-size: #021132;
          border:1px solid #0A9FD4;
        }
        .el-form-item__error{
          color: #f21818;
          font-size: 12px;
          line-height: 1;
          padding-top: 4px;
          position: absolute;
          top: -53% !important;
          /* text-align: center; */
          left: 0px;
        }
        .el-form-item.is-error .el-input__inner{
          border-color: #f21818 !important;
        }
      }
    }
  }


</style>
<style lang="scss">
  #login {
    .el-row {
      margin-bottom: 20px;
      margin-left: 0!important;
      margin-top: 0!important;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .el-col {
      border-radius: 4px;
      /*margin-left: 7%;*/
      font-size: 16px!important;
      padding-left: 0!important;
      padding-right: 0!important;
    }
    .bg-purple-dark {
      background: #99a9bf;
    }
    .bg-purple {
      background: #d3dce6;
    }
    .bg-purple-light {
      background: #e5e9f2;
    }
    .grid-content {
      border-radius: 4px;
      min-height: auto;
    }
    .row-bg {
      padding: 10px 0;
      background-color: #f9fafc;
    }
    .el-form-item.is-error .el-input__inner {
      border-color: #F56C6C !important;
    }
    .el-input__suffix {
      left: 170px;
    }
    .el-input__icon {
      font-size: 19px;

    }
    .el-input__prefix {
      left: 10px;
    }
  }

</style>

