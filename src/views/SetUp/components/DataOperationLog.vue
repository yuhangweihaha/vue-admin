<template>
  <div id="DataOperationLog">
    <div class="System-header">
      数据操作日志
    </div>
    <div class="System-main">
      <div id="System-main-header">
        <el-row type="flex" class="row-bg" justify="space-between">
          <el-col :span="7" id="col1">
            <div class="col1-top">
              <el-input
                placeholder="请输入操作人"
                v-model="search">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
              <el-button size="medium" @click="searching">搜索</el-button>
            </div>
          </el-col>
          <el-col :span="7" id="col2">

            <el-row :gutter="20">
              <el-col :span="6" style="text-align: right">操作时间:</el-col>
              <el-col :span="8">
                <div class="container">
                  <div class="block">
                    <el-date-picker
                      v-model="value1"
                      value-format="yyyy-MM-dd"
                      type="date"
                      placeholder="选择日期">
                    </el-date-picker>
                  </div>
                </div>
              </el-col>
              <el-col :span="2" style="text-indent: 0.1rem">至</el-col>
              <el-col :span="8">
                <div class="container">
                  <div class="block">
                    <el-date-picker
                      v-model="value2"
                      value-format="yyyy-MM-dd"
                      type="date"
                      placeholder="选择日期">
                    </el-date-picker>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="1"></el-col>
          <el-col :span="2" id="col3">
            <el-row :gutter="22">
              <el-col :span="11">
                <span @click="deletecl"><img :src="deletes" alt=""></span>
              </el-col>
              <el-col :span="11">
                <span @click="uplod"><img :src="upload" alt=""></span>
              </el-col>

            </el-row>
          </el-col>
        </el-row>
      </div>
      <div class="System-main-main">
        <el-table
          ref="multipleTable"
          :data="tableData2"
          v-loading="loading"
          element-loading-text="加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          tooltip-effect="dark"
          style="width:200%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" align='center'></el-table-column>
          <el-table-column prop="num" label="序号" align="center" width="120" type="index"></el-table-column>
          <el-table-column label="操作数据对象" align='center' show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.dataTopic}}</template>
          </el-table-column>
          <el-table-column label="操作时间" align='center' show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.actionTime}}</template>
          </el-table-column>
          <el-table-column label="操作人" align='center' show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.userName}}</template>
          </el-table-column>
          <el-table-column label="操作人ID" align='center' show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.userId}}</template>
          </el-table-column>
          <el-table-column label="操作内容" align='center' show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.actionContent}}</template>
          </el-table-column>
          <el-table-column label="备注" align='center' show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.remarks}}</template>
          </el-table-column>
        </el-table>
        <div id="paginations">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            background
            :current-page.sync="listQuery.page"
            :page-sizes="[10,20,30,50]"
            :page-size="listQuery.limit"
            :total="total"
            layout="total, sizes, prev, pager, next, jumper"
            style="margin-top:0px;"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import {
    Operational,
    deleteHandleLogs,
    exportHandleLog
  } from '@/api/ConfigurationManagement/UserLoginLog';
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
        input4: '',
        value1: '',
        value2: '',
        loading: true,
        deletes: require("@/icon/icon/delete.png"),
        upload: require("@/icon/icon/upload.png"),
        tableData1: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        tableing: [],
        tableData2: [],
        listQuery: {
          page: 1,
          limit: 20,
        },
        total: null,
        search: '', //搜索
        Selection1: [],
      };

    },

    methods: {
      // 删除
      deletecl() {
        this.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.HandleLogs();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      HandleLogs() {
        let query = {
          ids: this.Selection1
        };
        deleteHandleLogs(query).then(res => {
          if (res.status === 200 || res.status === '200') {
            this.Operat();
            this.$message({
              message: '删除成功',
              type: 'success',
              duration: 3 * 1000
            });
          }
        })
      },
      /*......*/
      uplod() {
        /*let query = {
          ids:this.Selection1
        };
        exportHandleLog(query).then(res=>{
          console.log(res,'下载成功');
          let url = window.URL.createObjectURL(new Blob([res]));
          let link = document.createElement("a");
          link.style.display = "none";
          link.href = url;
          link.setAttribute("download", "数据操作日志" + ".xlsx");
          document.body.appendChild(link);
          link.click();
          if(res.status === 200 || res.status === '200'){

            this.$message({
              message: '下载成功',
              type: 'success',
              duration: 3 * 1000
            });
          }
        })*/
        this.outExe();
      },
      outExe() {
        if(this.tableing.length === 0 || this.tableing.length === '0'){
          this.$message({
            message: '请选择需要导入的表格',
            type: 'error',
            duration: 3 * 1000
          });
          }else{
          this.$confirm('此操作将导出excel文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.excelData = this.tableing; //你要导出的数据list。
            this.export2Excel()
          }).catch(() => {
          });
        }
      },
      export2Excel() {
        var that = this;
        require.ensure([], () => {
          const {export_json_to_excel} = require('../../../vendor/Export2Excel.js'); //这里必须使用绝对路径
          const tHeader = ['操作数据对象', '操作时间', '操作人', '操作人ID', '操作内容']; // 导出的表头名
          const filterVal = ['dataTopic', 'actionTime', 'userName', 'userId', 'actionContent',]; // 导出的表头字段名
          const list = that.excelData;
          const data = that.formatJson(filterVal, list);
          export_json_to_excel(tHeader, data, `数据操作日志`);// 导出的表格名称，根据需要自己命名
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
      /*......*/
      handleSelectionChange(val) {
        let ldeId = [];
        let ldeIds = [];
        for (var i = 0; i < val.length; i++) {
          ldeId.push(val[i].id);
          ldeIds.push(val[i]);
        }
        this.Selection1 = ldeId;
        this.tableing = ldeIds;
        console.log(this.Selection1, '数组')
      },
      // 分页
      handleSizeChange(val) {
        this.listQuery.limit = val;
        this.Operat();
      },
      handleCurrentChange(val) {
        this.listQuery.page = val;
        this.Operat();
      },
      // 点击搜索
      searching() {
        this.Operat();
      },
      Operat() {
        let data = {
          startDate: this.value1,    //开始时间 例：2019-04-01
          endDate: this.value2,   //结束时间 例：2019-04-01
          limit: this.listQuery.limit,
          page: this.listQuery.page,
          userName: this.search,    //操作人
        };
        Operational(data).then(res => {
          console.log(res, 'res1')
          if (res.status === '200' || res.status === 200) {
            this.tableData2 = res.data.rows;
            this.total = res.data.total;
            this.loading = false;
          } else {
            this.tableData2 = [];
          }
        })
      },
    },
    created() {
    },
    mounted() {
      this.Operat()
    },
    watch: {
      search: function () {
        if (this.search === '' || this.search === undefined || this.search === null) {
          this.Operat();
        }
      },
      value2: function () {
        if (this.value2 === '' || this.value2 === undefined || this.value2 === null) {
          this.value1 = '';
          this.value2 = '';
          this.Operat();
        }
        if (this.value1 != '') {
          this.Operat();
        }
      },
      value1: function () {
        if (this.value1 === '' || this.value1 === undefined || this.value1 === null) {
          this.value1 = '';
          this.value2 = '';
          this.Operat();
        }
      }
    }
  }

</script>

<style scoped lang="less">
  #DataOperationLog {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background: url("../../../icon/icon/backgroung.png");
    background-size: 100% 100%;
    padding: 0.35rem 0.2rem 0.2rem 0.2rem;
    position: relative;
    color: #0A9FD4;
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
      /*position: relative;*/
      margin-top: 0.5rem;
      #System-main-header {
        width: 100%;
        height: 1rem;
        font-size: 0.14rem;
      }
      /*需要删除*/
      .el-row {
        margin-bottom: 20px;
        &:last-child {
          margin-bottom: 0;
        }
      }
      .el-col {
        height: 1rem;
        /*background: #4AB7BD;*/
      }
    }
    #col1 {
      .el-input {
        width: 3rem;
      }
      /*.el-button--medium {
        padding: 0.12rem 0.2rem;
      }*/
    }
    #col3 {
      span {
        width: 0.3rem;
        height: 0.3rem;
        display: inline-block;
        margin-top: 0.35rem;
        margin-left: 0.26rem;
        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .col1-top {
      margin-top: 0.25rem;
      text-align: center;
    }
    #paginations {
      width: 97.6%;
      height: 0.55rem;
      position: absolute;
      bottom: 0.1rem;
      margin-right: 1rem;
    }
  }
</style>
<style lang="less">
  #col2 {
    .el-date-editor.el-input {
      width: 1.5rem;
    }
    .el-row {
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .el-col {
      border-radius: 4px;
      height: 1rem;
      line-height: 0.8rem;
    }
    .bg-purple-dark {
      background: #99a9bf;
    }
    .bg-purple {
      background: #e6997a;
    }
    .bg-purple-light {
      background: #e5e9f2;
    }
    .grid-content {
      border-radius: 4px;
      min-height: 36px;
    }
    .row-bg {
      padding: 10px 0;
      background-color: #f9fafc;
    }
  }

  #DataOperationLog {
    .el-table__empty-block {
      background-color: #02153d;
    }
    .el-table__empty-text {
      color: #0a9fd4 !important;
    }
    .el-table__body-wrapper {
      max-height: 5.4rem;
      overflow-y: visible;
      /* overflow-x: visible; */
    }
    @media (max-width: 1920px) {
      .el-table__body-wrapper {
        max-height: 4.70rem;
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
    @media (max-width: 1440px) {
      .el-table__body-wrapper {
        max-height: 5.8rem;
        overflow-y: visible;
        /* overflow-x: visible; */
      }
    }
    //表格样式
    .el-table__body-wrapper tbody {
      color: #fff;
      //background:rgba(19,40,69,1);
      cursor: pointer;
    }

    tbody tr:nth-child(even) {
      background: #02153D;
    }

    tbody tr:nth-child(odd) {
      background: #021132;
    }

    tbody tr:hover {
      background: #194E7A;
      color: #ffffff !important;
    }
    .el-table th, #UserLoginLog .el-table tr {
      background-color: #02153D !important;
    }
    .el-table__body-wrapper tbody {
      color: #0A9FD4 !important;
    }
    .el-table thead {
      color: #0A9FD4 !important;
    }
    .el-table::before {
      left: 0;
      bottom: 0;
      width: 100%;
      height: 0;
      /* height: 1px; */
    }
    .el-table td {
      border: none;
    }
    .el-table td, .el-table th.is-leaf {
      border: none;
    }
    .el-table--enable-row-hover .el-table__body tr:hover > td {
      background: #194E7A;
    }
    .el-checkbox__inner {
      background: #032B68;
      border: 1px solid #032b68;
    }
    #System-main-header {
      .el-button {
        height: 36px;
        background: #031a46;
        border: 1px solid #032B68;
        color: #0A9FD4;
        margin-left: 0.15rem;
      }
      .el-input__inner {
        height: 36px;
        line-height: 36px;
        background: #031A46;
        border: 1px solid #032B68;
        color: #0A9FD4;
      }
      .el-input__icon {
        color: #0A9FD4;
      }
    }
  }

  /*.....分页...*/
  #paginations {
    .el-pagination {
      white-space: nowrap;
      padding: 2px 5px;
      color: #303133;
      font-weight: 700;
      text-align: right;
      width: 7rem;
      /* height: 0.46rem; */
      float: right;
      /* line-height: 0.46; */
      margin-top: 0.1rem !important;
    }
    .el-input--suffix .el-input__inner {
      background-color: #032058;
      border: 1px solid #032B68;
      font-size: 0.14rem;
      color: #066C98;
      height: 0.28rem !important;
    }
    .el-select .el-input .el-select__caret {
      color: #066C98;
      font-size: 0.14rem;
    }
    .el-pagination__total {
      color: #066C98;
    }
    .el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li {
      background-color: #032058;
      color: #066C98;
    }
    .el-input__inner {
      background-color: #032058;
      border: 1px solid #032B68;
      font-size: 0.14rem;
      color: #066C98;
      height: 0.28rem !important;
    }
    .el-pagination__jump {
      color: #066C98;
    }
    .el-popper[x-placement^=top] .popper__arrow::after {
      border-top-color: #032058 !important;
    }
    .el-pagination.is-background .el-pager li:not(.disabled).active {
      background-color: #0984B8;
      color: #FFF;
    }
  }
</style>

