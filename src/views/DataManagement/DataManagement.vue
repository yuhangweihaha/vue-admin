<template>
  <div id="DataManagement">
    <!--左侧边栏-->
    <div class="data-left-Sidebar">
      <p class="data-dir-leftTitle">数据目录</p>
      <div class="data-dir-search">
        <el-input placeholder="请输入关键字、数据名称等" v-model="TreesearchData" clearable>
          <i slot="prefix" class="el-input__icon el-icon-search" style="color:#0A9FD4;"></i>
        </el-input>
      </div>
      <div class="data-dir-tree">
        <el-tree
          ref="tree"
          :data="treeData"
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
          :filter-node-method="filterNode"
        >
          <span class="custom-tree-node" slot-scope="node" @click="listClick(node.data)">
            <span class="data-node-icon" v-if="node.data.parentId == '-1'">{{ node.data.parentId }}</span>
            <span class="data-node-label">{{ node.data.label }}</span>
          </span>
        </el-tree>
      </div>
    </div>

    <div class="data-right-Main">
      <div class="data-dir-rightTab">
        <span>数据列表</span>
      </div>
      <div class="data-right-top">
        <el-form :model="formLabel">
          <el-form-item style="display:inline-block;">
            <el-input
              style="width:3.8rem !important;"
              v-model="formLabel.term"
              placeholder="请输入关键字、数据名称等"
              clearable
            >
              <i slot="prefix" class="el-input__icon el-icon-search" style="color:#0A9FD4;"></i>
            </el-input>
          </el-form-item>
          <el-form-item style="display:inline-block;">
            <button class="btn-search" style="margin-left: 0.3rem;" @click="formSearch">
              <span>搜索</span>
            </button>
          </el-form-item>
          <el-form-item
            style="display:inline-block;margin-left:0.9rem;font-size:14px;color:#0A9FD4;"
          >
            <span style="padding-right: 0.1rem;">创建时间选择:</span>
          </el-form-item>
          <el-form-item style="display:inline-block;">
            <el-date-picker
              class="data-date"
              v-model="formLabel.date"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
              align="right"
            ></el-date-picker>
          </el-form-item>

          <div class="data-icon" style="display:inline-block;">
            <el-tag class="icon icon1" title="下载选中列表" @click.stop="downExcel()"></el-tag>
            <el-tag class="icon icon2" title="字段筛选"></el-tag>
            <el-tag class="icon icon3" title="全屏切换" @click.stop="fullScreen()"></el-tag>
          </div>
        </el-form>
      </div>

      <div class="data-right-mid">
        <el-table
          @row-click="clickRow"
          ref="table"
          :data="tableData"
          stripe
          style="width: 100%;"
          height="100%"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="id" label="编号" width="80" sortable></el-table-column>
          <el-table-column prop="tabNameNickname" label="数据名称" sortable></el-table-column>
          <el-table-column prop="createTime" label="创建时间" sortable></el-table-column>
          <el-table-column prop="dbNameNickname" label="所属数据源" sortable></el-table-column>
          <el-table-column prop="createUser" label="创建者" sortable></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <span class="ico icon-chakan" @click.stop="handleView(scope.row)">查看</span>
              <span class="ico icon-bianji" @click.stop="handleEdit(scope.row)">编辑</span>
              <span class="ico icon-shanchu" @click.stop="handleDelete(scope.row)">删除</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
    <div class="data-mg-dalog">
      <el-dialog title="数据编辑" :visible.sync="dialogFormVisible" :modal-append-to-body="false">
        <el-form :model="editForm" :rules="rules" ref="ruleForms" label-position="left">
          <el-form-item label="数据名称：" label-width="120px">
            <el-input v-model="editForm.tabNameNickname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="创建时间：" label-width="120px">
            <el-input v-model="editForm.createTime" autocomplete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="所属数据源：" label-width="120px">
            <el-input v-model="editForm.dbNameNickname" autocomplete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="创建者：" label-width="120px">
            <el-input v-model="editForm.createUser" autocomplete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="设备类型：" label-width="120px">
            <el-input v-model="editForm.objectType" autocomplete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="数据状态：" label-width="120px">
            <el-input v-model="editForm.status" autocomplete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="所属行业：" label-width="120px">
            <el-input v-model="editForm.status" autocomplete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="所属部门：" label-width="120px">
            <el-input v-model="editForm.status" autocomplete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="所属区划：" label-width="120px">
            <el-input v-model="editForm.status" autocomplete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="坐标系统：" label-width="120px">
            <el-input v-model="editForm.status" autocomplete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="数据关键字：" label-width="120px">
            <el-input v-model="editForm.status" autocomplete="off" :disabled="true"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="handleForm" style="margin:0;">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import { getTree } from "@/api/ConfigurationManagement/DataCatalogMaintenance.js";

  import {
    getDataManagement,
    updateDataManagement,
    deletes,
    exportData
  } from "@/api/DataManagement/DataManagement.js";

  export default {
    data() {
      return {
        dialogFormVisible: false,
        editForm: {},
        currentPage: 1,
        total: 0,
        pageSize: 10,
        isFull: false,
        TreesearchData: "",
        treeData: [],
        formLabel: {
          date: null,
          tabIds: "",
          startTime: "",
          endTime: "",
          term: "",
          page: 1,
          pageSize: 10
        },
        tableData: [],
        seleChangeData: [],
        rules: {
          name: [
            { required: true, message: "请输入活动名称" },
            { min: 1, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur" }
          ],
          type: [{ required: false, message: "请选择类型" }]
        }
      };
    },
    created() {
      this.getTreeData();
      // this.getDataManagement();
    },

    watch: {
      TreesearchData(val) {
        this.$refs.tree.filter(val);
      }
    },

    methods: {
      getTreeData() {
        var _this = this;
        getTree().then(res => {
          if (res.status == 200) {
            _this.treeData = res.data;
          }
        });
      },
      getDataManagement() {
        var _this = this;
        if (!this.formLabel.tabIds) {
          this.$message({
            message: "请先选择左侧数据目录下的table",
            type: "info"
          });
          return;
        }
        this.formLabel.startTime = this.formLabel.date
          ? this.formLabel.date[0]
          : "";
        this.formLabel.endTime = this.formLabel.date
          ? this.formLabel.date[1]
          : "";

        getDataManagement(this.formLabel).then(res => {
          // console.log(res);
          if (res.status == 200) {
            _this.tableData = res.data.rows;
            _this.total = res.data.total;
          } else {
            this.$message({
              message: res.message,
              type: "info"
            });
          }
        });
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      formSearch() {
        console.log(this.formLabel);
        this.getDataManagement();
      },
      listClick(item) {
        if(item.catalogue == 'table'){
          this.formLabel.tabIds = item.id;
          this.getDataManagement();
        };
      },
      clickRow(row) {
        this.$refs.table.toggleRowSelection(row);
      },
      handleEdit(row) {
        this.dialogFormVisible = true;
        var tmp = JSON.stringify(row);
        this.editForm = JSON.parse(tmp);
      },
      handleClose() {
        this.dialogFormVisible = false;
      },
      handleForm() {
        var _this = this;
        this.dialogFormVisible = false;
        updateDataManagement(this.editForm).then(res => {
          if (res.status == 200) {
            _this.$message({
              message: "数据更新成功",
              type: "success"
            });
            _this.getDataManagement();
          } else {
            _this.$message({
              message: res.message,
              type: "error"
            });
          }
        });
      },
      handleDelete(row) {
        var _this = this;
        this.$confirm("是否确定删除此数据？", "删除数据", {
          confirmButtonText: "删除",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          var tmp = row;
          tmp.loginUserName = localStorage.getItem("userName");
          tmp.loginUserId = localStorage.getItem("userId");

          deletes(tmp).then(res => {
            if (res.status == 200) {
              _this.$message({
                message: "删除当前行成功",
                type: "success"
              });
              _this.getDataManagement();
            } else {
              _this.$message({
                message: "删除当前行失败",
                type: "error"
              });
            }
          });
        });
      },
      handleView(row) {
        console.log(row);
        this.$router.push({path: "/DataManageMsg"});
      },
      handleSizeChange(val) {
        this.pageSize = val;
      },
      handleCurrentChange(val) {
        this.currentPage = val;
      },
      downExcel() {
        if (!this.seleChangeData.length) {
          this.$message({
            message: "请先勾选需要导出的数据列表",
            type: "error"
          });
          return;
        }

        var tmp = [];
        this.seleChangeData.forEach((item, index) => {
          tmp.push(item.id);
        });

        var obj = {ids:tmp};

        exportData(obj).then(res => {
          let url = window.URL.createObjectURL(new Blob([res]));
          let link = document.createElement("a");
          link.style.display = "none";
          link.href = url;
          link.setAttribute("download", "数据列表导出-" + Date.now() + ".xls");
          document.body.appendChild(link);
          link.click();
          this.$message({
            message: "导出的数据列表已经开始下载",
            type: "success"
          });
        });
      },
      fullScreen() {
        var element = document.documentElement;
        if (this.isFull) {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          }
        } else {
          if (element.requestFullscreen) {
            element.requestFullscreen();
          } else if (element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen();
          } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
          } else if (element.msRequestFullscreen) {
            // IE11
            element.msRequestFullscreen();
          }
        }
        this.isFull = !this.isFull;
      }
    }
  };
</script>

<style lang="scss">
  #DataManagement {
    display: flow-root;
    width: calc(100% - 0.3rem);
    height: calc(100% - 0.4rem);
    margin: 0.2rem 0.3rem 0.2rem 0;
    font-size: 0.14rem;

    .data-left-Sidebar {
      float: left;
      width: 3.6rem;
      height: 100%;
      background-color: #031945;

      .data-dir-leftTitle {
        padding: 0.08rem 0.2rem;
        font-size: 0.14rem;
        color: #0a9fd4;
        background-color: #042767;
      }

      .data-dir-search {
        box-sizing: border-box;
        width: 100%;
        padding: 10px;

        .el-input-group__append {
          background: none;
          border: none;
        }
      }

      .data-dir-tree {
        width: 100%;
        height: calc(100% - 91px);
        overflow-y: auto;

        .el-tree {
          vertical-align: middle;
          padding: 0.2rem;
          color: #0a9fd4;
          background-color: #031945;
          font-size: 0.14rem;

          .el-tree-node__expand-icon {
            color: #0eccff;
          }

          .el-tree-node__content {
            .el-tree-node__expand-icon.is-leaf {
              color: transparent;
              cursor: default;
            }
          }

          .el-tree-node__content:hover {
            background-color: transparent;
            background: url("../../assets/DataManagement/tree-hover.png")
            no-repeat;
            background-size: 100% 26px;

            .el-btn {
              display: block;
            }
          }

          .is-current {
            background: url("../../assets/DataManagement/tree-hover.png")
            no-repeat;
            background-size: 100% 26px;
          }
        }

        .custom-tree-node {
          display: flow-root;
          width: 100%;
          overflow: hidden;

          .data-node-icon {
            vertical-align: middle;
            font-size: 0;
            padding: 10px 10px;
            background: url("../../assets/DataManagement/yuan.png") no-repeat
            center;
          }
        }
      }
    }

    .data-right-Main {
      box-sizing: border-box;
      float: right;
      width: calc(100% - 3.84rem);
      height: 100%;
      padding: 0 0.3rem;
      background: url("../../assets/DataManagement/背景.png") no-repeat;
      background-size: 100% 100%;

      .data-dir-rightTab {
        display: block;
        text-align: center;
        padding: 0.05rem 0;

        span {
          display: inline-block;
          font-weight: bold;
          font-size: 0.16rem;
          color: #066c98;
        }
      }

      .data-right-top {
        margin-top: 0.3rem;

        .el-input-group__append,
        .el-input-group__prepend {
          background-color: #031a46;
          border: 1px solid #032b68;
        }

        .data-date {
          background-color: transparent;
          border: 0;

          .el-range-input {
            box-sizing: border-box;
            color: #fff;
            height: 36px;

            &::-webkit-input-placeholder {
              color: #02507d;
            }

            &:-moz-placeholder {
              color: #02507d;
            }

            &::-moz-placeholder {
              color: #02507d;
            }

            &:-ms-input-placeholder {
              color: #02507d;
            }
          }

          .el-range-separator {
            color: #0a9fd4;
          }

          .el-icon-time {
            display: none;
          }
        }
      }

      .el-form-item__label {
        color: red;
        font-size: 0.14rem;
      }

      .el-table .cell {
        text-align: center;
      }

      .el-table td,
      .el-table th.is-leaf {
        border: none;
      }

      .el-table,
      .el-table__expanded-cell {
        background-color: transparent;
      }

      .el-table--striped .el-table__body tr.el-table__row--striped td {
        background: transparent;
      }

      .el-table {
        color: #0a9fd4;
        font-size: 0.14rem;
        .el-table__row--striped {
          background-color: #02153d;
        }

        .el-checkbox__inner {
          border: 1px solid #032b68;
          background-color: transparent;

          &::after {
            border-color: #0ca8e3;
          }
        }
      }

      // 表头
      .has-gutter {
        font-size: 0.14rem;
        color: #0a9fd4;
        background-color: #031a46;
      }

      .el-table th,
      .el-table tr {
        cursor: pointer;
        background-color: transparent;
      }

      .el-table--enable-row-hover .el-table__body tr:hover > td {
        background-color: #194e7a;
      }

      .el-table .sort-caret.ascending {
        border-bottom-color: #0a9fd4;
      }

      .el-table .sort-caret.descending {
        border-top-color: #0a9fd4;
      }

      .el-table .ascending .sort-caret.ascending {
        border-bottom-color: #0bd9f5;
      }

      .el-table .descending .sort-caret.descending {
        border-top-color: #0bd9f5;
      }

      .pagination {
        .el-pagination {
          margin: 0 auto;
          padding: 0.1rem 0;
          text-align: center;
          white-space: nowrap;
          color: #303133;
          font-weight: 700;

          .btn-prev,
          .btn-next {
            padding: 0;
            background-color: #032058;
            color: #066c98;
          }

          .el-pager li {
            min-width: 30px;
            border-radius: 2px;
            margin: 0 5px;
            color: #066c98;
            background-color: #032058;
          }
          .el-pager li.active {
            cursor: default;
            color: #fff;
            background: #0984b8;
          }
        }
        .el-input--suffix .el-input__inner {
          background-color: #032058;
          border: 1px solid #032b68;
          font-size: 0.14rem;
          color: #066c98;
          height: 28px !important;
        }
        .el-select .el-input .el-select__caret {
          color: #066c98;
          font-size: 0.14rem;
        }
        .el-pagination__total {
          color: #066c98;
        }
        .el-pagination.is-background .btn-next,
        .el-pagination.is-background .btn-prev,
        .el-pagination.is-background .el-pager li {
          background-color: #032058;
          color: #066c98;
        }
        .el-input__inner {
          background-color: #032058;
          border: 1px solid #032b68;
          font-size: 0.14rem;
          color: #066c98;
          height: 28px !important;
        }
        .el-pagination__jump {
          color: #066c98;
        }
        .el-popper[x-placement^="top"] .popper__arrow::after {
          border-top-color: #032058 !important;
        }
        .el-pagination.is-background .el-pager li:not(.disabled).active {
          background-color: #0984b8;
          color: #fff;
        }
      }
    }

    // 本页所有input
    input {
      border: 1px solid #032b68;
      border-radius: 4px;
      font-size: 0.14rem;
      color: #fff;
      background-color: #031a46;
    }

    .data-right-mid {
      height: calc(100% - 175px);

      .el-table__empty-block {
        height: auto;
      }

      .ico {
        cursor: pointer;
        display: inline-block;
        width: 20px;
        height: 20px;
        margin-right: 0.05rem;
        font-size: 0;
        background-size: 100%;
      }

      .icon-chakan {
        background: url("../../assets/DataManagement/查看.png") no-repeat center;
      }
      .icon-bianji {
        background: url("../../assets/DataManagement/编辑.png") no-repeat center;
      }
      .icon-shanchu {
        background: url("../../assets/DataManagement/删除.png") no-repeat center;
      }
    }

    .data-icon {
      box-sizing: border-box;
      float: right;

      .icon {
        cursor: pointer;
        display: inline-block;
        border: 0;
        width: 32px;
        height: 32px;
      }

      .icon1 {
        background: url("../../assets/DataManagement/1.png") no-repeat center;
      }

      .icon2 {
        background: url("../../assets/DataManagement/2.png") no-repeat center;
      }

      .icon3 {
        background: url("../../assets/DataManagement/3.png") no-repeat center;
      }
    }

    //dalog
    .data-mg-dalog {
      .el-dialog {
        width: 600px;
        background: url("../../assets/DataManagement/dialog.png");
        background-size: 100% 100%;
        color: #fff;

        .el-form-item__label {
          color: #0a9fd4;
          font-size: 0.14rem;
        }
        .el-dialog__title {
          font-size: 0.16rem;
          color: #0fd0ff;
        }
        .el-dialog__header {
          text-align: center;
          padding: 0 !important;
        }
        .el-dialog__headerbtn {
          display: block;
          width: 20px;
          height: 20px;
          background: url("../../assets/DataManagement/关闭.png") no-repeat center;
          background-size: 100% 100%;
          i {
            display: none;
          }
        }
        .el-dialog__body {
          padding: 0.29rem 0.3rem 0;
        }
        .el-dialog__footer {
          padding: 0.1rem 0.3rem;
        }
        .el-form-item--mini .el-form-item__content,
        .el-form-item--mini .el-form-item__label {
          width: 4rem;
        }
        .el-input--mini {
          height: 0.36rem;
          width: 4rem;
        }
        .el-input__inner {
          background-color: #031a46;
          border: 1px solid #032b68;
          height: 0.36rem !important;
          color: #fff;
        }
        .el-input.is-disabled .el-input__inner {
          color: #999 !important;
        }
        .el-form--inline .el-form-item {
          margin-left: 0.04rem;
          margin-right: 0 !important;
          width: 100% !important;
        }

        .el-button--default,
        .el-button--primary {
          width: 1.1rem;
          height: 0.32rem;
          padding: 0;
          line-height: 0.32rem;
          background: transparent;
          outline: 0;
          span {
            line-height: -1rem;
          }
        }

        .el-button--default {
          color: #f23030;
          border: 1px solid #f23030;
          &:hover {
            color: #fff;
            background: #f23030;
          }
        }

        .el-button--primary {
          color: #0a9fd4;
          border: 1px solid #0fd0ff;
          &:hover {
            color: #fff;
            background: #0fd0ff;
          }
        }

        .el-form-item.is-success .el-input__inner,
        .el-form-item.is-success .el-input__inner:focus,
        .el-form-item.is-success .el-textarea__inner,
        .el-form-item.is-success .el-textarea__inner:focus {
          border-color: #032b68;
        }
      }
    }
  }

  .btn-search {
    padding: 8px 30px;
    margin: 0;
    outline: 0;
    background-color: #032b68;
    border: 1px solid rgba(3, 43, 104, 1);
    border-radius: 3px;
    vertical-align: middle;
    span {
      color: #0a9fd4;
      font-size: 0.14rem;
    }

    &:hover {
      background-color: #0ca8e3;
      span {
        color: #fff;
      }
    }
  }

  div[role="treeitem"]:focus > .el-tree-node__content {
    background-color: transparent !important;
  }
</style>
