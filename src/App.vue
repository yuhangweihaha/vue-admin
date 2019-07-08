<template>
  <div id="app">
      <router-view/>
   <!--   <keep-alive>
       <router-view v-if="$route.meta.keepAlive"></router-view>
     </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
     -->

  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {

      }
    },
    methods: {

    },

  }
</script>

<style>
html,body {
  margin:0;
  padding: 0;
  overflow: hidden;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  min-width: 1180px;
  min-height: 600px;
  color: #fff;
  background-color: #001331;
/*   background:url(./icon/icon/背景2.png) no-repeat;
   background-size: 100% 100%;*/
}

ul,li,p,span{
  vertical-align: middle;
  list-style: none;
  padding: 0;
  margin: 0;
  border: 0;
  outline: 0;
}

#app {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}

.el-table--border::after, .el-table--group::after, .el-table::before{
  background-color: transparent !important;
}

.el-form-item__content {
  line-height: 36px !important;
}

.el-form-item__label {
  height: 36px !important;
  line-height: 36px !important;
}

.el-input__inner {
  height: 36px !important;
  line-height: 36px !important;
}

.el-input__icon {
  line-height: auto;
}

.el-input__inner::-webkit-input-placeholder{
  color: #02507D;
}

.el-input__inner:-moz-placeholder{
  color: #02507D;
}

.el-input__inner::-moz-placeholder{
  color: #02507D;
}

.el-input__inner:-ms-input-placeholder{
  color: #02507D;
}

/*滚动条*/
  ::-webkit-scrollbar {  /* 滚动条整体部分 */
    width:5px;
    margin-right:2px;
    background:#114273 ;
    cursor: pointer;
  }
::-webkit-scrollbar-button { /* 滚动条两端的按钮 */
  display: none;
}
::-webkit-scrollbar:horizontal {
  height:10px;
  margin-bottom:2px
}
::-webkit-scrollbar-track {  /* 外层轨道 */
  display: none;
}
::-webkit-scrollbar-track-piece {  /*内层轨道，滚动条中间部分 */
  display: none;
}
::-webkit-scrollbar-thumb {  /* 滑块 */
  width:5px;
  border-radius: 5px;
  background: rgba(144,147,153,.5);
}
::-webkit-scrollbar-corner { /* 边角 */
  width: 10px;
}
::-webkit-scrollbar-thumb:hover { /* 鼠标移入滑块 */
  /*background: #909090;*/
}

/*  !*ie*!
:-ms-scrollbar {  !* 滚动条整体部分 *!
  width:5px;
  margin-right:2px;
  background:#114273 ;
  cursor: pointer;
}
::-ms-scrollbar-button { !* 滚动条两端的按钮 *!
  display: none;
}
::-ms-scrollbar:horizontal {
  height:10px;
  margin-bottom:2px
}
::-ms-scrollbar-track {  !* 外层轨道 *!
  display: none;
}
::-ms-scrollbar-track-piece {  !*内层轨道，滚动条中间部分 *!
  display: none;
}
::-ms-scrollbar-thumb {  !* 滑块 *!
  width:5px;
  border-radius: 5px;
  background: rgba(144,147,153,.5);
}
::-ms-scrollbar-corner { !* 边角 *!
  width: 10px;
  !*background-color: red;*!
}
::-ms-scrollbar-thumb:hover { !* 鼠标移入滑块 *!
  background: #909090;
}
!*火狐*!
::-moz-scrollbar {  !* 滚动条整体部分 *!
  width:5px;
  margin-right:2px;
  background:#114273 ;
  cursor: pointer;
}
::-moz-scrollbar-button { !* 滚动条两端的按钮 *!
  display: none;
}
::-moz-scrollbar:horizontal {
  height:10px;
  margin-bottom:2px
}
::-moz-scrollbar-track {  !* 外层轨道 *!
  display: none;
}
::-moz-scrollbar-track-piece {  !*内层轨道，滚动条中间部分 *!
  display: none;
}
::-moz-scrollbar-thumb {  !* 滑块 *!
  width:5px;
  border-radius: 5px;
  background: rgba(144,147,153,.5);
}
::-moz-scrollbar-corner { !* 边角 *!
  width: 10px;
  !*background-color: red;*!
}
::-moz-scrollbar-thumb:hover { !* 鼠标移入滑块 *!
  background: #909090;
}

!*Opera*!
::-o-scrollbar {  !* 滚动条整体部分 *!
  width:5px;
  margin-right:2px;
  background:#114273 ;
  cursor: pointer;
}
::-o-scrollbar-button { !* 滚动条两端的按钮 *!
  display: none;
}
::-o-scrollbar:horizontal {
  height:10px;
  margin-bottom:2px
}
::-o-scrollbar-track {  !* 外层轨道 *!
  display: none;
}
::-o-scrollbar-track-piece {  !*内层轨道，滚动条中间部分 *!
  display: none;
}
::-o-scrollbar-thumb {  !* 滑块 *!
  width:5px;
  border-radius: 5px;
  background: rgba(144,147,153,.5);
}
::-o-scrollbar-corner { !* 边角 *!
  width: 10px;
  !*background-color: red;*!
}
::-o-scrollbar-thumb:hover { !* 鼠标移入滑块 *!
  background: #909090;
}*/
/*//placeholder颜色*/
  .el-input--suffix .el-input__inner {
    padding-right: 30px;
    color: #fff;
  }

.el-input__inner::-webkit-input-placeholder { /* WebKit browsers */
  color: #02507d;
}

.el-input__inner:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
  color: #02507d;
  opacity: 1;
}

.el-input__inner::-moz-placeholder { /* Mozilla Firefox 19+ */
  color: #02507d;
  opacity: 1;
}

.el-input__inner:-ms-input-placeholder { /* Internet Explorer 10+ */
  color: #02507d;
}

::-webkit-input-placeholder { /* WebKit browsers */
  color: #02507d;
}

:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
  color: #02507d;
  opacity: 1;
}

::-moz-placeholder { /* Mozilla Firefox 19+ */
  color: #02507d;
  opacity: 1;
}

:-ms-input-placeholder { /* Internet Explorer 10+ */
  color: #02507d;
}
.el-message__icon{
  font-size: 0.18rem!important;
}
.el-select-dropdown{
  background-color: #001331!important;
  border: 1px solid #02507d!important;
}
.el-select-dropdown__item.hover, .el-select-dropdown__item:hover{
  background-color:#02507d;
  color: #fff;
}
.el-select-dropdown__item{
  color: #02507d;
}
.el-popper[x-placement^=top] .popper__arrow{
  border-top-color:#02507d!important;
}
.el-popper[x-placement^=top] .popper__arrow::after{
  border-top-color:#02507d!important;
}
.el-checkbox__inner{
          background: #032B68;
          border: 1px solid rgba(3,43,104,1);
        }
 .el-button{

        height: 36px;
        border:1px solid rgba(3,43,104,1);
        background: transparent;
        color: #0A9FD4;
        margin-left: 0.2rem;
        text-align: center;
        width: 100px;
      }
.el-button:focus{

        height: 36px;
        border:1px solid rgba(3,43,104,1);
        background: #0CA8E3;
        color: #fff;
        /* margin-left: 0.2rem; */
        text-align: center;
      }
.el-button:hover{
          border:1px solid rgba(3,43,104,1)!important;
          background: #001331;
          color: #0A9FD4;
         }

.el-button--danger{

        border:1px solid rgba(242,48,48,1);
        color: rgba(242,48,48,1)
      }
.el-button--danger:focus{

         background:rgba(242,48,48,1);
         color: #fff;
       }
.el-button--danger:hover{
             border:1px solid rgba(242,48,48,1);
        color: rgba(242,48,48,1)
         }
.el-pagination .btn-next, .el-pagination .btn-prev{
          background: transparent;
          color: #0FD0FF;
        }
.el-pagination button:disabled{
   background: transparent;
}
body .el-table th.gutter{
    display: table-cell!important;
}
</style>
