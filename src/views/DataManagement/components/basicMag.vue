<template>
    <div id="basicMsg" >
        <div class="operate">
            <span style="float:left"><i class="el-icon-arrow-left" style="font-size:36px;line-height:36px;color:#0A9FD4" @click="back"></i></span>
            <span style="float:left;margin-left:0.3rem;">
                <el-select v-model="value" placeholder="数据查看版本选择" @change="changeData">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </span>
            <span style="float:right;margin-right:0.3rem">
                <img src="../../../icon/icon/dowonLoad.png" alt="" style="line-height:0.36rem;vertical-align: middle;margin-top:10px;" @click="getData_">
            </span>

        </div>
        <div class="content">
            <div class="collapseBox">

                        <el-form :inline="true" class="demo-form-inline" label-width="114px">
                            <el-col :span="12">
                                <el-form-item label="所属区划" >
                                    <el-input :disabled="isable" v-model="fromData.bsAdminArea"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="数据类型" >
                                    <el-input :disabled="isable" v-model="fromData.bsEleDatatype"></el-input>
                                </el-form-item>
                            </el-col>
                              <el-col :span="12">
                                <el-form-item label="关键字" >
                                    <el-input :disabled="isable" v-model="fromData.bsKeyword"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="创建时间" >
                                    <el-input :disabled="isable" v-model="fromData.createTime"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="专题类型" >
                                    <el-input :disabled="isable" v-model="fromData.bsTpCat"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="创建人" >
                                    <el-input :disabled="isable" v-model="fromData.createUser"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="注册表数据源ID" >
                                    <el-input :disabled="isable" v-model="fromData.dbId"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="数据源名称" >
                                    <el-input :disabled="isable" v-model="fromData.dbNameNickname"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="负责单位名" >
                                    <el-input :disabled="isable" v-model="fromData.dwRpOrgName"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="关联关系表编号" >
                                    <el-input :disabled="isable" v-model="fromData.id"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="坐标系统类型" >
                                    <el-input :disabled="isable" v-model="fromData.kjbsCoType"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="数据源标记" >
                                    <el-input :disabled="isable" v-model="fromData.sjzlSrcCitatn"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="数据库状态" >
                                    <el-input :disabled="isable" v-model="fromData.status"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="表的ID" >
                                    <el-input :disabled="isable" v-model="fromData.tabId"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="表的名称" >
                                    <el-input :disabled="isable" v-model="fromData.tabName"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="表的别名" >
                                    <el-input :disabled="isable" v-model="fromData.tabNameNickname"></el-input>
                                </el-form-item>
                            </el-col>




                        </el-form>

            </div>

        </div>
    </div>
</template>
<script>
import {getData} from "@/api/DataManagement/basicMag.js";
export default {
     data() {
            return {
                value:'',
                id:'1',
                fromData:{},
                isable:true,
                options:[],
                

            };
        },
        methods:{
            changeData(){
                for(var key in this.obj){
                    console.log(key,this.obj[key])
                }
                console.log()
            },
            getData_(){
                       getData(this.id).then(res=>{
                           console.log(res.data)
                            this.fromData=res.data

                 })
            },
            back(){
                // DataManagement
                this.$router.push({path: "/DataManagement"});
            },

        },
        mounted(){
            this.getData_();
        }
}
</script>

<style lang="less" scoped>
#basicMsg{
    // width: 100%;
    // height: 100%;
    width: calc(100% - 0.6rem);
    height: calc(100% - 0.6rem);
    // overflow-y: scroll;
    .operate{

        height: 0.36rem;
        padding: 0 0.2rem;
        margin-top: 0.2rem;

    }
    .collapseBox{
        width: 100%;
        height: 100%;
        padding:  0.25rem;
        // margin-left: -20px;
    }
}

</style>
<style lang="less">
    #basicMsg{
        .el-input__inner{
            background:rgba(3,26,70,1);
            border:1px solid rgba(3,43,104,1);
            color: #fff;
            height:calc(100% - 0.4rem);
            overflow-y: scroll;
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

        }

        .el-form--inline .el-form-item__content{
            width: 6.7rem;
        }
        .el-form--inline .el-form-item__label{
            color: #0A9FD4;
            margin-left: -50px

        }
        .el-form-item{
            margin-bottom: 18px;
        }
        .el-col-12{
            text-align: center;
            background:#021132!important;
        }
        .el-input{
            width: 110%;
        }
    }
</style>


