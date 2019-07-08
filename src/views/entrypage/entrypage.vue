<template>
  <div id="EntryPage">
    <el-container>
      <el-header>
        <el-row :gutter="20">
          <el-col :span="7">
            <div class="header-left">
              <div class="header-logo"><img :src="logos" alt=""></div>
              <span class="header-text">{{textname}}</span>
              <!--<span class="header-text">时空云大数据综合管理平台</span>-->
            </div>
            <!--<div style="background: red" class="grid-content bg-purple"></div>-->
          </el-col>
          <el-col :span="13">
            <!--<div class="grid-content bg-purple"></div>-->
            <div class="header-content">
              <div  class="header-content-div" v-for="(init,index) in datas" :key="init.name" :class="isname === init.name ? 'IsAcitve' : '' " @click="handler(init.name,index)">
                <span><img :src="isname === init.name ? init.imgs : init.img " alt=""></span>
                {{init.name}}
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="SetUp" @click="SetUps">
              <img :src="setup" alt="">
            </div>
            <el-dropdown  @command="userManager">
              <div>
                <span class = "AccountNumber"><img :src="name" alt=""></span>
                <span class = "Account">{{userName}}</span>
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item class="entryPage_item"  command="psd">
                  <li>个人中心</li>
                </el-dropdown-item>
                 <el-dropdown-item class="entryPage_item" command="goOut">
                  <li>退出登录</li>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>©2012-2019 正元地理信息集团股份有限公司 ALL RIGHTS RESERVED 网站备案信息：京ICP备18032327号-1</el-footer>
    </el-container>
  </div>
</template>

<script>
  import { mapState,mapMutations,mapActions} from 'vuex'

  import { removeToken } from '@/utils/auth' // removeToken from cookie
  import {
    select,
  } from '@/api/ConfigurationManagement/UserLoginLog';
 /* $(window).bind('beforeunload',function(){
    return '您输入的内容尚未保存，确定离开此页面吗？';
  });*/
  export default {
    data() {
      return {
        isname: '首页',
        logos:'',
        textname:'',
        isHome: false,
        setuping:true,
        cked:null,
        datas: [
          {
            name: '首页',
            img:require("@/icon/TitleLogo/home1.png"),
            imgs:require("@/icon/TitleLogo/home2.png")
          },
         /* {
            name: '数据入库',
            img:require("@/icon/TitleLogo/Ruku1.png"),
            imgs:require("@/icon/TitleLogo/Ruku2.png")
          },*/
          {
            name: '数据管理',
            img:require("@/icon/TitleLogo/management1.png"),
            imgs:require("@/icon/TitleLogo/management2.png")
          },
          {
            name: '配置管理',
            img:require("@/icon/TitleLogo/configure1.png"),
            imgs:require("@/icon/TitleLogo/configure2.png")
          },
          {
            name: '数据回收站',
            img:require("@/icon/TitleLogo/recycle1.png"),
            imgs:require("@/icon/TitleLogo/recycle2.png")
          },
        ],
        isCollapse: false,
        logo: require("@/icon/iconfonts/logo.png"),
        name: require("@/icon/iconfonts/name.png"),
        setup: require("@/icon/iconfonts/setup.png"),
        titles: "点击收起",
        userName: localStorage.userName
      };
    },

    methods: {
      ...mapActions(['getInfo']),
      selecting(){
        select().then(res =>{
          console.log(res)
          if(res.status === '200' || res.status === 200){
            this.textname = res.data.sysName;
            this.logos = res.data.picture;
          }else{
            this.textname = '时空云大数据综合管理平台';
            this.logos = require("@/icon/iconfonts/logo.png");
          }
        }).catch(() => {
          this.textname = '时空云大数据综合管理平台';
          this.logos = require("@/icon/iconfonts/logo.png");
        });
      },
      userManager(command) {
        if (command == "psd") {
          console.log('UserManager')
          this.$router.push({path: "/UserManager"});
        } else if (command == "person") {
          this.$router.push({path: "/personManager"});
        } else if (command == "goOut") {
          //this.clearAllCookie();
          this.$store
            .dispatch("LogOut", localStorage.token)
            .then(() => {
              removeToken();
              this.$router.push({
                path: "/login"
              });
            })
            .catch(() => {
              //用户名不存在
              this.loading = false;
            });
          //this.$router.push({ path: "/login" });
        }
      },
      handler(data, index) {
        this.isname = data;
        switch (data) {
          case "首页":
            this.$router.push({path: "/home"});
            this.setup = require("@/icon/iconfonts/setup.png");
            break;
          case "数据入库":
            this.$router.push({path: "/DataSetCatalogue"});
            this.setup = require("@/icon/iconfonts/setup.png");
            break;
          case "数据管理":
            this.$router.push({path: "/DataManagement"});
            this.setup = require("@/icon/iconfonts/setup.png");
            break;
          case "配置管理":
            this.$router.push({path: "/DataCatalogMaintenance"});
            this.setup = require("@/icon/iconfonts/setup.png");
            break;
          case "数据回收站":
            this.$router.push({path: "/DataRecyclingBin"});
            this.setup = require("@/icon/iconfonts/setup.png");
            break;
        }
      },
      //设置
      SetUps(){
          this.isname = '';
          this.$router.push({path: "/SystemConfiguration"});
          this.setup = require("@/icon/iconfonts/setups.png");
          this.setuping = false;
      },
    },
    created(){
      console.log(document.cookie,'我是cookie');

    },
    destroyed(){
      let arr = document.cookie.split('; ');
      this.checked = arr.indexOf('ZhengyuanWisdomCitychecked=true')
      if(this.checked == -1 ){
        window.onbeforeunload = function (e) {
          removeToken();
        }
      }
    },
    mounted() {
      this.selecting();
      switch (this.$route.path.replace('/', '')) {
        case  "home":
          this.isname = '首页';
          break;
        case  "DataInput":
          this.isname = '数据入库';
          break;
        case  "DataSetCatalogue":
          this.isname = '数据入库';
          break;
        case  "InputTaskList":
          this.isname = '数据入库';
          break;
        case  "WarehousingMission":
          this.isname = '数据入库';
          break;
        case  "DataManagement":
          this.isname = '数据管理';
          break;
        case  "ConfigurationManagement":
          this.isname = '配置管理';
          break;
        case  "DataCatalogMaintenance":
          this.isname = '配置管理';
          break;
        case  "DataSourceManagemen":
          this.isname = '配置管理';
          break;
        case  "HistoricalDataMaintenance":
          this.isname = '配置管理';
          break;
        case  "HistoricalDataUpdate":
          this.isname = '配置管理';
          break;
        case  "MetadataCoding":
          this.isname = '配置管理';
          break;
        case  "DataRecyclingBin":
          this.isname = '数据回收站';
          break;
        case  "SetUp":
          this.isname = '';
          this.setup = require("@/icon/iconfonts/setups.png");
          break;
        case  "SystemConfiguration":
          this.isname = '';
          this.setup = require("@/icon/iconfonts/setups.png");
          break;
        case  "DataOperationLog":
          this.isname = '';
          this.setup = require("@/icon/iconfonts/setups.png");
          break;
        case  "UserLoginLog":
          this.isname = '';
          this.setup = require("@/icon/iconfonts/setups.png");
          break;
      }
    },
      beforeDestory(){
           if(localStorage.state){
          alert('true');

        }else{
          alert('false');
         removeToken();
        }
      },
    updated() {
      switch (this.$route.path.replace('/', '')) {
        case  "home":
          this.isname = '首页';
          break;
        case  "DataInput":
          this.isname = '数据入库';
          break;
        case  "DataSetCatalogue":
          this.isname = '数据入库';
          break;
        case  "InputTaskList":
          this.isname = '数据入库';
          break;
        case  "WarehousingMission":
          this.isname = '数据入库';
          break;
        case  "DataManagement":
          this.isname = '数据管理';
          break;
        case  "ConfigurationManagement":
          this.isname = '配置管理';
          break;
        case  "DataCatalogMaintenance":
          this.isname = '配置管理';
          break;
        case  "DataSourceManagemen":
          this.isname = '配置管理';
          break;
        case  "HistoricalDataMaintenance":
          this.isname = '配置管理';
          break;
        case  "HistoricalDataUpdate":
          this.isname = '配置管理';
          break;
        case  "MetadataCoding":
          this.isname = '配置管理';
          break;
        case  "DataRecyclingBin":
          this.isname = '数据回收站';
          break;
        case  "SetUp":
          this.isname = '';
          this.setup = require("@/icon/iconfonts/setups.png");
          break;
        case  "SystemConfiguration":
          this.isname = '';
          this.setup = require("@/icon/iconfonts/setups.png");
          break;
        case  "DataOperationLog":
          this.isname = '';
          this.setup = require("@/icon/iconfonts/setups.png");
          break;
        case  "UserLoginLog":
          this.isname = '';
          this.setup = require("@/icon/iconfonts/setups.png");
          break;
      }
    },
    watch:{
      imgsrc:function (val) {
        console.log(val);
        this.selecting();
      }
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
      imgname:{
        get: function () {
          return this.$store.state.img.imgname
        },
        set: function (val) {
          this.$store.state.img.imgname = val
        }
      },
    },

  };
</script>
<style scoped lang="less">
  #EntryPage {
    width: 100%;
    height: 100%;
    .el-container.is-vertical {
      width: 100%;
      height: 100%;
    }
    .el-header {
      width: 100%;
      height: 0.8rem !important;
      border-bottom: 2px solid #012754;
      .el-row {
        margin-bottom: 20px;
        /*  margin-left: -28px !important;
          margin-right: -28px !important;*/
        &:last-child {
          margin-bottom: 0;
        }
      }
      .el-col {
      }
      .bg-purple-dark {
      }
      .bg-purple {
      }
      .bg-purple-light {
      }
      .grid-content {
        /*border-radius: 4px;*/
        min-height: 0.8rem;
      }
      .row-bg {
        padding: 0 0;
      }
      .header-left {
        height: 0.8rem;

        img {
          vertical-align: middle;
          width: 0.48rem;
          position: absolute;
          left: 0.23rem;
          top: 0.15rem;
        }

        .header-text {
         /* position: absolute;
          left: 80px;
          top: 20px;*/
          float: left;
          vertical-align: middle;
          color: #00e4ff;
          margin-left: 0.2rem;
          margin-top: 0.23rem;
          /*font-size: 0.08rem;*/
          font-size: 0.25rem;
          font-family: Microsoft JhengHei;
          font-weight: 900;
          letter-spacing: 5px;
          background-image: -webkit-linear-gradient(
            left,
            #1BE2F2,
            #f4e787 50%,
            #C2B851 100%,

          );
          -webkit-text-fill-color: transparent;
          -webkit-background-clip: text;
          -webkit-background-size: 200% 100%;
        }
        .header-logo{
          width: 0.5rem;
          height: 0.5rem;
          float:left;
          margin-left: 0.1rem;
          margin-top: 0.15rem;
          position: relative;
          img{
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
          }
        }
      }
      .header-content {
        height: 0.78rem;
        .header-content-div {
          font-size: 0.14rem;
          float: left;
          width: 1.2rem;
          height: 0.77rem;
          cursor: pointer;
          line-height: 1.18rem;
          text-align: center;
          position: relative;
          color:#fff;
          span{
            width: 0.3rem;
            height: 0.3rem;
            display: inline-block;
            position: absolute;
            top: 0.1rem;
            right: 0.45rem;

            img{
              width: 100%;
              height: 100%;
              float: left;
            }
          }
        }
        .header-content-div:hover {
          background: #0984B8;
        }
        .header-content-div:nth-child(1) {
          margin-left: 1.7rem;
        }
      }
    }
    .el-main {
      width: 100%;
      height: calc(100% - 1.12rem);
      padding: 0!important;
    }
    .el-footer {
      height: 0.4rem !important;
      text-align: center;
      line-height: 0.4rem;
      font-size: 0.14rem;
      color:#097298;
      background: #001B43;
    }
    .SetUp{
      width: 0.3rem;
      height: 0.3rem;
      float: left;
      margin-left: 0.6rem;
      margin-top: 0.24rem;
      cursor: pointer;
      img{
        width: 100%;
        height: 100%;
        float: left;
      }
    }
    .el-dropdown{
      float: right;
      cursor: pointer;
      margin-top: 0.21rem;
    }
    .AccountNumber{
      width: 0.36rem;
      height: 0.36rem;
      display: inline-block;
      float: left;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .Account{
      float: left;
      width: 1.2rem;
      height: 0.5rem;
      display: inline-block;
      line-height: 0.4rem;
      margin-left: 0.1rem;
      font-size: 0.14rem;
      color:#fff;
    }
  }
  .IsAcitve {
    background: #0984B8 !important;
  }
  .el-dropdown-menu{
    background:rgba(3,26,70,1);
border:1px solid rgba(3,43,104,1);
  }

</style>
