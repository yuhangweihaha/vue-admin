<template>
  <div id="SystemConfiguration">
    <div class="System-header">
      地图配置
    </div>
    <div class="System-main">
      <div id="System-main-Settings">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <div class="System-main-buttom">
          <el-button style="margin-top:20px;">取 消</el-button>
          <el-button type="primary" @click="queding()">确 定</el-button>
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
        options: [{
          value: '1',
          label: '智图午夜蓝'
        }, {
          value: '2',
          label: '高德地图'
        }],
        value: '1'
      };

    },

    methods: {
      ...mapActions(['getInfo']),

      queding() {
        this.imgname = this.value;
    /*    this.$refs.ruleForms.validate((valid) => {
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
        });*/

      }
    },
    created() {

    },
    mounted() {
    },
    computed:{
      imgname:{
        get: function () {
          return this.$store.state.img.imgname
        },
        set: function (val) {
          this.$store.state.img.imgname = val
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
</style>
<style lang="less">

  #SystemConfiguration {
    /*color: #0A9FD4;
    .el-input__inner {
      height: 0.35rem !important;
      width: 3rem !important;
      line-height: 28px !important;
    }
    .el-form-item__label {
      color: #0A9FD4 !important;
    }*/
  }

  #System-main-Settings {
  .el-input__inner {
      height: 36px;
      line-height: 36px;
      background: #031A46;
      border: 1px solid #032B68;
      color: #0A9FD4;
    }
   /*   .el-form-item.is-error .el-input__inner, .el-form-item.is-error .el-input__inner:focus, .el-form-item.is-error .el-textarea__inner, .el-form-item.is-error .el-textarea__inner:focus, .el-message-box__input input.invalid, .el-message-box__input input.invalid:focus {
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
    }*/
  }
</style>
