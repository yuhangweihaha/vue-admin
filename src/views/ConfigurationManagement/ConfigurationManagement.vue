<template>
    <div id="ConfigurationManagement">
      <!--左侧边栏-->
      <div class="LeftSidebar">
        <el-row class="tac">
          <el-col :span="12">
            <el-menu
              :default-active="myadf"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              active-text-color="#ffd04b">
           <!--   <el-menu-item index="1">
                <i class="el-icon-setting"></i>
                <span slot="title">数据目录维护</span>
              </el-menu-item>
              <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title">数据目录维护</span>
              </el-menu-item>

              <el-menu-item index="3">
                <i class="el-icon-document"></i>
                <span slot="title">数据库管理</span>
              </el-menu-item>-->

              <el-menu-item v-for="init in lays" :key="init.index" :index="init.index"  @click="handler(init.title,init.index)">
                <i><img :src="init.img" alt=""></i>
                <span slot="title">{{init.title}}</span>
              </el-menu-item>
               <!-- <el-submenu v-for="opts in layout" :index="opts.index" >
               <template slot="title">
                 <i class="el-icon-location"></i>
                 <span>{{opts.title}}</span>
               </template>
               <el-menu-item-group v-for="opt in opts.children">
                 <el-menu-item :index="opt.index"  @click="layouts(opt.title,opt.index)">{{opt.title}}</el-menu-item>
               </el-menu-item-group>
             </el-submenu>-->
            </el-menu>
          </el-col>
        </el-row>
      </div>

      <!--右侧主体-->
      <div class="RightMainBody">
        <div class="RightMainBody_cont">
          <router-view></router-view>
        </div>
    <!--    <el-main></el-main>-->
      </div>
    </div>
</template>

<script>
    //import  from " ";
    export default {
        data() {
            return {
              myadf:'2',
                lays : [
                  {
                    title: "数据源管理",
                    index: "1",
                    img: require("@/icon/LeftLogo/数据源管理.png"),
                  },
                  {
                    title: "数据目录管理",
                    index: "2",
                    img: require("@/icon/LeftLogo/数据目录管理.png"),
                  },
                  {
                    title: "元数据编码管理",
                    index: "3",
                    img: require("@/icon/LeftLogo/元数据编码管理.png"),
                  },
                  {
                    title: "历史数据管理",
                    index: "4",
                    img: require("@/icon/LeftLogo/历史数据管理.png"),
                  },

                ],

                /*layout : [
                  {
                    title: "历史数据管理",
                    index: "4",
                    img: require("@/icon/iconfonts/logo.png"),
                    children: [
                      {
                        index: "4-1",
                        title: "历史数据版本维护"
                      },
                      {
                        index: "4-2",
                        title: "历史数据版本更新"
                      }
                    ]
                  }
                ],*/
            };

        },

        methods: {
          handleClose(key, keyPath) {
            console.log(key, keyPath);
          },
          handleOpen(key, keyPath) {
            console.log(key, keyPath);
          },
          handler(title,index){
            switch (title) {
              case "数据源管理":
                this.$router.push({ path: "/DataSourceManagemen" });
                this.myadf = '1';
                break;
              case "数据目录管理":
                this.$router.push({ path: "/DataCatalogMaintenance" });
                this.myadf = '2';
                break;
              case "元数据编码管理":
                this.$router.push({ path: "/MetadataCoding" });
                this.myadf = '3';
                break;
              case "历史数据管理":
                this.$router.push({ path: "/HistoricalDataMaintenance" });
                this.myadf = '4';
                break;
            }
          },
          layouts(title,index){
            switch (title) {
              case "历史数据版本维护":
                this.$router.push({ path: "/HistoricalDataMaintenance" });
                this.myadf = '4-1';
                break;
              case "历史数据版本更新":
                this.$router.push({ path: "/HistoricalDataUpdate" });
                this.myadf = '4-2';
                break;
            }
          }
        },
        created() {
        },
      mounted() {
        switch (this.$route.path.replace('/', '')) {
          case  "DataSourceManagemen":
            this.myadf = '1';
            break;
          case  "DataCatalogMaintenance":
            this.myadf = '2';
            break;
          case  "MetadataCoding":
            this.myadf = '3';
            break;
          case  "HistoricalDataMaintenance":
            this.myadf = '4';
            break;
          /*case  "HistoricalDataMaintenance":
            this.myadf = '4-1';
            break;
          case  "HistoricalDataUpdate":
            this.myadf = '4-2';
            break;*/
        }
      },
      updated() {
        switch (this.$route.path.replace('/', '')) {
          case  "DataSourceManagemen":
            this.myadf = '1';
            break;
          case  "DataCatalogMaintenance":
            this.myadf = '2';
            break;
          case  "MetadataCoding":
            this.myadf = '3';
            break;
          case  "HistoricalDataMaintenance":
            this.myadf = '4';
            break;
        /*  case  "HistoricalDataMaintenance":
            this.myadf = '4-1';
            break;
          case  "HistoricalDataUpdate":
            this.myadf = '4-2';
            break;*/
        }
      },
    }

</script>

<style scoped lang="less">
#ConfigurationManagement{
  width: 100%;
  height: 100%;
  font-size: 0.16rem;
  .LeftSidebar{
    width: 2.2rem;
    height: 100%;
    background: #021132;
    float: left;
  }
  .RightMainBody{
    width: calc(100% - 2.2rem);
    height:100%;
    float: right;
    .RightMainBody_cont{
      width: calc(100% - 0.3rem);
      height: calc(100% - 0.4rem);
      margin: 0.2rem 0.3rem  0.2rem 0;
    }
  }
  .el-col-12{
    width: 100% !important;
  }
  .el-menu{
    border:none
  }
}
</style>
<style lang="less">
  #ConfigurationManagement{
    .el-menu-item.is-active{
      background: url("../../icon/LeftLogo/SelectedStyle.png")!important;
      background-size: 100% 100%;
    }
    .el-menu-item:hover{
      background: url("../../icon/LeftLogo/SelectedStyle.png")!important;
      background-size: 100% 100%;
    }
    .el-menu{
      background-color: #021132!important;
    }
    .el-menu-item{
      color: #0a9fd4 !important;
      vertical-align:middle!important;
      margin-bottom: 0.1rem;
      span{
        margin-top: 0.05rem;
        margin-left: 0.1rem;
      }
    }
    .el-col-12{
      margin-top: 0.2rem;
    }
    .el-menu-item i{
      /*color: #0a9fd4 !important;*/
      img{
        margin-top: -0.03rem;
      }
    }
  }
  .el-message .el-icon-info{
    font-size: 0.18rem!important;
  }
</style>
