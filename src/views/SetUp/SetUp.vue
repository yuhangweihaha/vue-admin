<template>
  <div id="SetUp">
    <!--左侧边栏-->
    <div class="LeftSidebar">
      <el-row class="tac">
        <el-col :span="12">
          <el-menu
            :default-active="SetUpStatus"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            active-text-color="#ffd04b">
            <el-menu-item v-for="init in lays" :key="init.index" :index="init.index"  @click="handler(init.title,init.index)">
              <!--<i><img :src="init.img" alt=""></i>-->
              <span slot="title">{{init.title}}</span>
            </el-menu-item>
            <!-- 我的机构 -->
             <!-- <el-menu-item v-for="opts in layout" :key="opts.index" :index="opts.index"  @click="handler(opts.title,opts.index)" v-show="isShow">
              <i><img :src="init.img" alt=""></i>
              <span slot="title">{{opts.title}}</span>
            </el-menu-item> -->
            <el-submenu v-for="opts in layout" :key="opts" :index="opts.index"  v-show="isShow">
              <template slot="title">
                <!--<i><img :src="opts.img" alt=""></i>-->
                <span>{{opts.title}}</span>
              </template>
              <el-menu-item-group v-for="opt in opts.children" :key="opt.index">
                <el-menu-item :index="opt.index"  @click="layouts(opt.title,opt.index)">
                  <!--<i><img :src="opt.img" alt=""></i>-->
                  <span slot="title">{{opt.title}}</span>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-row>
    </div>

    <!--右侧主体-->
    <div class="RightMainBody">
      <div class="RightMainBody_cont">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  //import  from " ";
  export default {
    data() {
      return {
        // 记录左侧导航栏状态
        SetUpStatus:'1',
        isShow:false,
        lays : [
          {
            title: "系统配置",
            index: "1",
            img: require("@/icon/LeftLogo/数据源管理.png"),
          },
          {
            title: "地图配置",
            index: "3",
            img: require("@/icon/LeftLogo/元数据编码管理.png"),
          },
        ],

        layout : [
          {
            title: "日志管理",
            index: "2",
            img: require("@/icon/LeftLogo/数据目录管理.png"),
            children: [
              {
                index: "2-1",
                title: "数据操作日志",
                img: require("@/icon/LeftLogo/元数据编码管理.png"),
              },
              {
                index: "2-2",
                title: "用户登录日志",
                img: require("@/icon/LeftLogo/历史数据管理.png"),
              }
            ]
          }
        ],
      };

    },
    watch:{
       $route(to,from){
        // console.log(to.path,'12312');
        this.changeData();
      }
    },

    methods: {
      changeData(){
         
       if(this.$route.path=='/UserManager'){
          console.log(this.$route.path)
          this.isShow=false
          this.lays = [
          {
            title: "个人信息",
            index: "1",
            img: require("@/icon/LeftLogo/数据源管理.png"),
          },
        ]
        // this.layout = [
        //   {
        //     title: "我的机构",
        //     index: "2",
        //     img: require("@/icon/LeftLogo/数据目录管理.png"),
        
        //   }
        // ],
        console.log(this.lays)
      }else if(this.$route.path=='/SystemConfiguration'){
        this.isShow=true
         this.lays = [
          {
            title: "系统配置",
            index: "1",
            img: require("@/icon/LeftLogo/数据源管理.png"),
          },
        ]

        this.layout = [
          {
            title: "日志管理",
            index: "2",
            img: require("@/icon/LeftLogo/数据目录管理.png"),
            children: [
              {
                index: "2-1",
                title: "数据操作日志",
                img: require("@/icon/LeftLogo/元数据编码管理.png"),
              },
              {
                index: "2-2",
                title: "用户登录日志",
                img: require("@/icon/LeftLogo/历史数据管理.png"),
              }
            ]
          }
        ]
      }
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handler(title,index){
        switch (title) {
          case "系统配置":
            this.$router.push({ path: "/SystemConfiguration"});
            this.SetUpStatus = '1';
            break;
          case "地图配置":
            this.$router.push({ path: "/mapLog"});
            this.SetUpStatus = '1';
            break;
        }
      },
      layouts(title,index){
        switch (title) {
          case "数据操作日志":
            this.$router.push({ path: "/DataOperationLog"});
            this.SetUpStatus = '2-1';
            break;
          case "用户登录日志":
            this.$router.push({ path: "/UserLoginLog"});
            this.SetUpStatus = '2-2';
            break;
        }
      }
    },
    created() {
    },
    mounted() {
      // console.log(this.$route.path)
        if(this.$route.path=='/UserManager'){
          // console.log(this.$route.path)
          this.isShow=false
          this.lays = [
          {
            title: "个人信息",
            index: "1",
            img: require("@/icon/LeftLogo/数据源管理.png"),
          },
        ];
        // this.layout = [
        //   {
        //     title: "我的机构",
        //     index: "2",
        //     img: require("@/icon/LeftLogo/数据目录管理.png"),
        
        //   }
        // ]
        // console.log(this.lays,this.layout)
      }else{
        this.isShow=true
        this.lays = [
          {
            title: "系统配置",
            index: "1",
            img: require("@/icon/LeftLogo/数据源管理.png"),
          },
        ]

        this.layout = [
          {
            title: "日志管理",
            index: "2",
            img: require("@/icon/LeftLogo/数据目录管理.png"),
            children: [
              {
                index: "2-1",
                title: "数据操作日志",
                img: require("@/icon/LeftLogo/元数据编码管理.png"),
              },
              {
                index: "2-2",
                title: "用户登录日志",
                img: require("@/icon/LeftLogo/历史数据管理.png"),
              }
            ]
          }
        ]
      }
      // this.changeData();
      switch (this.$route.path.replace('/', '')) {
        case  "SystemConfiguration":
          this.SetUpStatus = '1';
          break;
        case  "mapLog":
          this.SetUpStatus = '3';
          break;
        case  "DataOperationLog":
          this.SetUpStatus = '2-1';
          break;
        case  "UserLoginLog":
          this.SetUpStatus = '2-2';
          break;
      }
    },
    updated() {
      //   if(this.$route.path=='/UserManager'){
      //     console.log(this.$route.path)
      //     this.isShow=true
      //     this.lays = [
      //     {
      //       title: "个人信息",
      //       index: "1",
      //       img: require("@/icon/LeftLogo/数据源管理.png"),
      //     },
      //   ];
      //   this.layout = [
      //     {
      //       title: "我的机构",
      //       index: "2",
      //       img: require("@/icon/LeftLogo/数据目录管理.png"),
        
      //     }
      //   ]
      //   console.log(this.lays,this.layout)
      // }else if(this.$route.path=='/SystemConfiguration'){
      //   this.lays = [
      //     {
      //       title: "系统配置",
      //       index: "1",
      //       img: require("@/icon/LeftLogo/数据源管理.png"),
      //     },
      //   ]

      //   this.layout = [
      //     {
      //       title: "日志管理",
      //       index: "2",
      //       img: require("@/icon/LeftLogo/数据目录管理.png"),
      //       children: [
      //         {
      //           index: "2-1",
      //           title: "数据操作日志",
      //           img: require("@/icon/LeftLogo/元数据编码管理.png"),
      //         },
      //         {
      //           index: "2-2",
      //           title: "用户登录日志",
      //           img: require("@/icon/LeftLogo/历史数据管理.png"),
      //         }
      //       ]
      //     }
      //   ]
      // }
      // this.changeData();
      switch (this.$route.path.replace('/', '')) {
        case  "SystemConfiguration":
          this.SetUpStatus = '1';
          break;
        case  "mapLog":
          this.SetUpStatus = '3';
          break;
        case  "DataOperationLog":
          this.SetUpStatus = '2-1';
          break;
        case  "UserLoginLog":
          this.SetUpStatus = '2-2';
          break;
      }
    },
  }

</script>

<style scoped lang="less">
  #SetUp{
    width: 100%;
    height: 100%;
    font-size: 0.16rem;
    /*.LeftSidebar{
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
      background: #1a629d;
      width: calc(100% - 0.3rem);
      height: calc(100% - 0.4rem);
      margin: 0.2rem 0.3rem  0.2rem 0;
    }*/
    .LeftSidebar{
      width: 2.8rem;
      height: calc(100% - 0.2rem);
      background: #031945;
      float: left;
      margin-bottom: 0.2rem;
    }
    .RightMainBody{
      width: calc(100% - 2.8rem);
      height:100%;
      float: right;
      .RightMainBody_cont{
        width: calc(100% - 0.6rem);
        height: calc(100% - 0.4rem);
        margin: 0.2rem 0.3rem  0.2rem 0.3rem;
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
  #SetUp{
    .el-menu-item.is-active{
      background: url("../../icon/icon/leftbac.png")!important;
      background-size: 100% 100%;
    }
    .el-menu-item:hover{
      background: url("../../icon/icon/leftbac.png")!important;
      background-size: 100% 100%;
    }
    .el-menu{
      background-color: #031945 !important;
    }
    .el-menu-item{
      color: #0A9FD4 !important;
      vertical-align:middle!important;
      height: 0.38rem;
      margin-bottom: 0.1rem;
      /*text-indent: 0.1rem;*/
      text-align: center;
      line-height: 0.38rem;
      font-size: 0.16rem;
      span{
        margin-top: 0.05rem;
        margin-left: 0.1rem;
      }
    }
    .el-menu{
      height: 1.65rem;
    }
    .el-col-12{
      margin-top: 0.2rem;
    }
    .el-submenu .el-menu{
      margin-top: 0.1rem;
    }
    .el-menu-item i{
      color:#0a9fd4 !important;

      /*color: #0a9fd4 !important;*/
      img{
        margin-top: -0.03rem;
      }
    }
    .el-submenu__title{
      color:#0A9FD4 !important;
      /*text-indent: 0.1rem;*/
      line-height: 0.38rem;
      text-align: center;
      height: 0.38rem;
      font-size: 0.16rem;
      span{
        margin-top: 0.05rem;
        margin-left: 0.1rem;
      }
    }
    .el-submenu__title:hover{
      background: url("../../icon/icon/leftbac.png")!important;
      background-size: 100% 100%;
    }
    .el-submenu__title i{
      color:#0a9fd4 !important;
      font-size: 0.15rem!important;
    }
    .el-menu-item-group__title{
      padding: 0!important;
    }
  }
  .el-message .el-icon-info{
    font-size: 0.18rem!important;
  }

</style>
