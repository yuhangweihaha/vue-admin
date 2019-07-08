<template>
  <div id="DataManageMsg">
      <div class="mian">
          <div class="title">
              <span class="spanc" :class="{active : active == 1}" @click="selected(1)" >数据内容</span>
              <span style="margin:0 0.16rem;display:inline-block">|</span>
              <span class="spanc" :class="{active : active == 2}" @click="selected(2)" >基本信息</span>
              <span style="margin:0 0.16rem;display:inline-block">|</span>
              <span class="spanc" :class="{active : active == 3}" @click="selected(3)" >元数据</span>
          </div>
          <div class="content">
              <yuanData v-show="active==3"></yuanData>
              <MapOperation v-show="active==1"></MapOperation>
              <basicMag v-show="active==2"></basicMag>
              <!-- 组件 -->
              <!-- {{msg}} -->
          </div>

      </div>

  </div>
</template>

<script>
import yuanData from './yuanData'
import basicMag from './basicMag'
import MapOperation from './MapOperation'
export default {
  data() {
    return {
       active:'1',
       msg:'数据内容',

    };
  },
  components:{
    yuanData,
    basicMag,
    MapOperation
  },
  created() {

  },
  methods: {
    selected(i){
      this.active = i;
      switch(i){
           case 1:
            this.msg='数据内容';
            break;
           case 2:
            this.msg='基本信息';
            break;
           case 3:
            this.msg='元数据';
            break;
      }
    },

  }
};
</script>

<style scoped lang="scss">
#DataManageMsg{
  background: #001331;
  width: calc(100% - 0.6rem);
  height: calc(100% - 0.6rem);
  margin: 0.1rem;
  padding: 0.1rem 0.2rem 0.1rem 0.2rem;
  font-size: 0.16rem;
  // overflow-y: scroll;
  .mian{
    width: 100%;
    height: 100%;
    position: relative;
    background: url("../../../assets/DataManagement/背景.png") no-repeat ;
    background-size: 100% 100%;
     /*overflow-y: scroll;*/

    .title{
        text-align: center;
        position: fixed;
        left: 0;
        right: 0;
        margin: auto;
        color: #066c98;
        padding: 0.02rem 0 0.05rem 0;
        font-weight: bold;
        z-index: 99999;
        background: url('../../../icon/icon/标题框.png') no-repeat center;
        background-size: 100% 100%;
        width: 5rem;
      .spanc{
         cursor: pointer;
       }
    }
    .content{
      width: calc(100% - 0.4rem);
      height: calc(100% - 0.5rem);
      padding: 0.1rem 0.2rem 0.1rem 0.2rem;
      /*margin-top: 0.2rem;*/
      overflow-y: scroll;
    }
  }
}
.active {

   color: #0FD0FF;
 }

</style>
