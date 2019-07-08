<template>
    <div id="DataRecyclingBin">
      <div class="main">
        <div class="title">数据回收站</div>
        <!-- 内容 -->
        <div class="content">
          <!-- 操作栏 -->
            <div class="operate">
              <div class="left">
                  <span class="left"> <el-input v-model="term" placeholder="请输入搜索内容" @keyup.enter.native="handelSearch" ></el-input> </span>
                   <span class="left"><el-button size="mini"  @click='handelSearch' >搜索</el-button></span>
              </div>
              <div class="right">
                 <span class="left"><el-button size="mini" @click="handelReturn">还原</el-button></span>
                  <span class="left"><el-button type="danger" size="mini" @click='handelDelete'>彻底删除</el-button></span>
              </div> 
            </div>
            <!-- 操作栏end -->
            <div class="tableBox">
              <el-table
                  ref="multipleTable"
                  :data="tableData"
                  tooltip-effect="dark"
                  style="width: 100%"
                  @selection-change="handleSelectionChange">
                  <el-table-column
                    type="selection"
                    align="center"
                    width="55">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="名称"
                    align="center"
                    width="120">
                  
                  </el-table-column>
                  <el-table-column
                    prop="dataType"
                    label="类型"
                    align="center"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="actionTime"
                    align="center"
                    label="移入时间"
                 
                    >
                  </el-table-column>
                  <el-table-column
                    prop="actionUser"
                    align="center"
                    label="操作人"
                    width="120"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="actionUserId"
                    align="center"
                    label="操作人ID"
                   
                    >
                  </el-table-column>
                  <el-table-column
                    prop="home"
                    align="center"
                    label="原位置"
                    
                    >
                  </el-table-column>
                </el-table>
               
            </div>
        </div>
        <!-- 内容end -->
         <!-- 分页 -->
                <div class="pagination">
                      <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage"
                        :page-size="pageSize"
                        layout="sizes, prev, pager, next, jumper"
                        :total='total'>
                      </el-pagination>
                </div>
      </div>
     
    </div>
</template>

<script>
    import {getData,searchData,deleteData,returnData} from "@/api/DataRecyclingBin/DataRecyclingBin.js";
    export default {
        data() {
            return {
              
              tableData: [],
              multipleSelection: [],
              currentPage:1,
              pageSize:10,
              total:null,
              term:'',
              ids:'',
              times:0,
              returnData:[],
            };

        },

        methods: {
          handelReturn(){
            if(this.returnData.length>0){
                 returnData(this.returnData).then(res=>{
                  
                  if(res.status==200){
                      this.$message({
                            message: '还原成功',
                            type: 'success'
                          });
                      this.getData();
                  }else{
                      this.$message.error('还原失败');
                  }
              })
            }else{
               this.$message.warning('请选择要还原的数据');
            }
           
          },
          handelDelete(){
            if(this.ids.length>0){
               deleteData(this.ids).then(res=>{
                  if(res.status==200){
                         this.$message({
                            message: '删除成功',
                            type: 'success'
                          });
                      this.getData();
                  }else{
                     this.$message.error('删除失败');
                  }
              })
            }else{
              this.$message.warning('请选择要删除的数据');
            }
             
          },
          handelSearch(){
            if(this.term==''){
              this.times=0
            }
            
            if(this.times==0){
              this.currentPage=1
               searchData(this.currentPage,this.pageSize,this.term).then(res=>{
                  this.tableData=res.data.rows
                  this.total=res.data.total
                })
            }else{
               searchData(this.currentPage,this.pageSize,this.term).then(res=>{
                  this.tableData=res.data.rows
                  this.total=res.data.total
                })
            }
            this.times++;
           
          },
          getData(){
              getData(this.currentPage,this.pageSize).then(res=>{
              this.tableData=res.data.rows
              this.total=res.data.total
            
          })
          },
          handleSelectionChange(val){
            console.log(val)
            var ids='';
            // var return_=[]
            //  val.forEach(function(item, index, array){
            //           return_.push({
            //             id:item.id,
            //             schemaName:item.schemaName,
            //             tabName:item.tabName,
            //             objectId:item.objectId,
            //             dbName:item.dbName,
            //             dataType:item.dataType
            //           })


            //        })
            
            this.returnData=val

            
                  val.forEach(function(item, index, array){
                      ids+=item.id+','


                   })
            
            this.ids=ids.substring(0,ids.length-1)
            
          },
          handleSizeChange(val) {
            //  console.log(`每页 ${val} 条`);
            this.pageSize=val
             if(this.times==0){
               this.getData();
             }else{
               this.getData();
             }
             
          },
          handleCurrentChange(val) {
            this.currentPage=val
            //  console.log(`当前页: ${val}`);
              if(this.times==0){
               this.getData();
             }else{
               this.getData();
             }
          }
        },
        created() {
        },
        mounted() {
          this.getData();
        }
    }

</script>

<style scoped lang="less">

#DataRecyclingBin{
  background: #001331;
  width: calc(100% - 0.6rem);
  height: calc(100% - 0.4rem);
  margin: 0.1rem 0.1rem 0rem 0.1rem ;
  padding: 0.1rem 0.2rem 0.1rem 0.2rem;
  font-size: 0.16rem;
}
.main{
  width: 100%;
  height: 100%;
  position: relative;
  background: url("../../assets/DataManagement/背景.png") no-repeat;
    background-size: 100% 100%;
    // padding-top: 0.2rem;
    .title{
        text-align: center;
        color: #066c98;
        padding: 0.05rem 0;
        font-weight: bold;
    }
    .content{
      // width: calc(100% - 0.2rem);
      padding: 0.2rem 0.3rem 0 0.3rem;
      // height: 100%;
      .operate{

      }
      .tableBox{
        margin-top: 50px;
        position: relative;
      }
    }
}
.left{
  float: left;
}
.right{
  float:right;
}
.el-input{
  width: 2.5rem!important;
  
}

</style>
<style lang="less">
  #DataRecyclingBin {
      .el-input__inner{
      background:rgba(3,26,70,1);
      border:1px solid rgba(3,43,104,1);
      }
     
        tbody tr:nth-child(even){
          background:#02153D;
          color: #0A9FD4;
        }
        tbody tr:nth-child(odd){
          background:#021132;
          color: #0A9FD4;
        }
        .el-table td{
          border-bottom:none;
        }
        .el-table th{
          background:#02153D;
          color: #0A9FD4;
        }
        .el-table--enable-row-hover .el-table__body tr:hover>td{
          background: #194e7a;
        }
        
        .el-table td, .el-table th.is-leaf{
           border-bottom:none;
        }
        .el-checkbox__inner{
          background: #032B68;
          border: 1px solid rgba(3,43,104,1);
        }
        .el-dialog, .el-pager li{
          background: #032058;
          margin: 0 2px 0 2px;
          border-radius: 5px;
          width: 26px;
          color: #FFFFFF;
         }
       .el-pager li.active{
            background: #0984B8;
        }
        .el-pagination__jump{
          color: #0FD0FF;
        }
        .el-input--suffix .el-input__inner{
          color:#066C98;
          height: 30px!important;
        }
        .pagination{
          float: right;
          position: absolute;
          bottom: 0.2rem;
          right: 0.2rem;
          .el-input__inner{
            height: 30px!important;
            color: #0A9FD4;
          }
        }
      
        @media (max-width: 1920px) {
            .el-table__body-wrapper {
              max-height: 5.4rem;
              overflow-y: visible;
              /* overflow-x: visible; */
              }
            }
        @media (max-width: 1600px) {
              .el-table__body-wrapper {
                max-height: 4.72rem;
                overflow-y: visible;
                /* overflow-x: visible; */
              }
            }
        @media (max-width: 1366px) {
              .el-table__body-wrapper {
                max-height: 4.2rem;
                overflow-y: visible;
                /* overflow-x: visible; */
              }
          }
         .el-table__empty-block{
           background:#021132;
      
         }
         .el-table__empty-text{
           color: #0A9FD4;
         }
         .el-input__inner{
           color: #0A9FD4;
         }
         .el-select-dropdown{
           background-color:#001331!important;
   
         }
         .el-button--danger:hover{
            border:1px solid rgba(242,48,48,1)!important;
            color: rgba(242,48,48,1);
            background: #001331;
         }
       
   
  }
</style>

