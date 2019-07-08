<template>
    <div id="yuanData">
        <div class="operate">
            <span style="float:left"><i class="el-icon-arrow-left" style="font-size:36px;line-height:36px;color:#0A9FD4" @click="back"></i></span>
            <span style="float:left;margin-left:0.3rem;">
                <el-select v-model="value" placeholder="数据查看版本选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </span>
            <span style="float:right;margin-right:0.3rem">
                <img src="../../../icon/icon/dowonLoad.png" alt="" style="line-height:0.36rem;vertical-align: middle;margin-top:10px;">
            </span>
             
        </div>
        <div class="content">
            <div class="collapseBox">
                <el-collapse accordion v-model="activeNames" @change='handelChange' > 
                    <el-collapse-item :name="index" v-for="(item,index) in showData" :key="index">
                        <template slot="title">
                        {{index}}
                        <div style="float:right">
                            <img src="../../../icon/icon/编辑.png" alt="" style="position: absolute;right: 1.5rem;    margin-top: -10px;" @click.stop="handelEdit">
                            <img src="../../../icon/icon/保存.png" alt="" style="position: absolute;right: 1rem;    margin-top: -10px;" @click.stop="handelPreserve" >
                       
                        </div>
                        </template>
                        <el-form :inline="true" class="demo-form-inline" label-width="2.2rem">
                           <el-col :span="12" v-for="(i,index) in item[0]" :key="index">
                                <el-form-item :label="index" >
                                   
                                    <el-input :disabled="isable" v-if="item[2][index]!='timestamp'" v-model="item[0][index]" @change="getObj(item[0],item[1],item[2],item[2][index],item[0][index],index)"></el-input>
                                      <el-date-picker
                                        v-model="item[0][index]"
                                        :disabled="isable"
                                        v-if="item[2][index]=='timestamp'"
                                        type="date"
                                        @change="getObj(item[0],item[1],item[2])"
                                        placeholder="选择日期">
                                        </el-date-picker>
                                </el-form-item>
                            </el-col>
                          
                            

                        </el-form>
                        
                    </el-collapse-item>
               
                
                </el-collapse>
            </div>
             
        </div>
    </div>
</template>
<script>
import {getData,putData} from "@/api/DataManagement/yuanData.js";
import Moment from 'moment';
export default {
     data() {
            return {
                value:'',
                options:[],
                tableData: [],
                isable:true,
                activeNames:'1',
                showData:[],
                putData:[],
                
            };
        },
        methods:{
            getData(){
                    getData(this.id).then(res=>{
                           console.log(res)   
                           this.showData=res.data
                            // this.fromData=res.data
                        
                 })
            },
            getObj(obj,obj1,obj2,i,a,index){
                // from表单数据
                console.log(i,a)
                var b=Number(a)
                console.log(b)
                if(i=='numeric'&&!b){
                     this.$message.error(index +' 的值必须为数字');
                   return;
                        
                }else{
                    
                }
                  for(var key in obj2){                 
                        if(obj2[key]==="timestamp"){
                            if(obj[key]){
                                obj[key]=Moment(obj[key]).format("YYYY-MM-DD hh:mm:ss");
                            }
                            }else if(obj2[key]=='numeric'){
                                if(obj[key]){
                                     obj[key]=Number(obj[key])
                                }
             
                        }    
                        }
                //改变数据的key（中文转英文）
                var keyMap = obj1
                    var objs= Object.keys(obj).reduce((newData, key) => {
                    let newKey = keyMap[key] || key
                    newData[newKey] = obj[key]
                    return newData
                    }, {})
                    if(!objs.bs_id){
                        console.log('这里没有bs_id')
                        objs.bs_id='11AA'
                    }
               

                console.log(objs,'改变后的数据')
                this.putData=objs
               

            },
            back(){  
                // DataManagement
                this.$router.push({path: "/DataManagement"});
            },
            handelChange(val){
                console.log('展开了',val)
                this.isable=true
            },
            handelEdit(){
                console.log('编辑')
                this.isable=false
            },
            handelPreserve(){
                console.log('保存',this.putData)
                putData(this.putData).then(res=>{
                    console.log(res)
                    if(res.status==200){
                        this.$message({
                          message: '修改成功',
                          type: 'success'
                            });
                    }else{
                         this.$message.error(res.message);
                    }

                })
                // console.log()
                this.isable=true

            }
        },
        mounted(){
            this.getData();
        }
}
</script>

<style lang="less" scoped>
#yuanData{
    width: 100%;
    height: 100%;
    //  overflow-y: scroll;
    .operate{
        
        height: 0.36rem;
        padding: 0 0.2rem;
        margin-top: 0.2rem;
        
    }
    .collapseBox{
        // width: 100%;
        height: 100%;
        padding:  0.25rem;
    }
    .content{
        overflow-y: scroll;
    }
}
    
</style>
<style lang="less">
    #yuanData{
        .el-input__inner{
            background:rgba(3,26,70,1);
            border:1px solid rgba(3,43,104,1);
            color: #fff;
        }
      
        .el-collapse-item__wrap{
            border-bottom:1px solid rgba(3,43,104,1)!important;
            background:#021132!important;
                padding-top: 20px;
           
        }
        .el-collapse-item__content{
             color: #0A9FD4!important;
             background:#021132!important;
        }
        .el-collapse-item__header{
             background:rgba(2,21,61,1)!important;
             border-bottom:1px solid rgba(3,43,104,1)!important;
             color: #0A9FD4!important;
            //  width: 100%;
             padding-left: 1rem;

        }
        .el-collapse{
            border-top: 1px solid #032B68!important;
            color: #fff!important;
            position: relative;
            
        }
        
        .el-form--inline .el-form-item__content{
            width: 6.33rem;
        }
        .el-form--inline .el-form-item__label{
            color: #0A9FD4;
            
        }
        .el-col-12{
            text-align: center;
            background:#021132!important;
        }
        .el-input{
            width: 102%;
        }
        .el-form--inline .el-form-item{
            margin-right: 0px;
        }
    }
</style>


