<template>
  <div id="MetadataCoding">
    <div class="met-wrap" v-if="tabs">
      <div class="main-title">
        <span>元数据编码维护</span>
      </div>
      <div class="met-selec">
        <el-select v-model="currySelect" value-key="id" placeholder="请选择类型" @change="selectChange">
          <el-option v-for="node in selectData" :label="node.name" :key="node.id" :value="node.id"></el-option>
        </el-select>
      </div>
      <div class="met-slist">
        <ul v-for="item in list" :key="item.title">
          <span class="met-title">{{ item.title }}</span>
          <li
            class="met-li"
            v-for="node in item.children"
            :key="node.title"
            :title="node.name"
            @click="handelClick(node)"
          >
            <span class="pub-icon1"></span>
            <span class="pub-icon2"></span>
            <div class="met-inner met-div-inner">
              <img :src="img" alt="icon">
            </div>
            <span class="met-div-title">{{ node.name }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="met-wrap" v-if="!tabs">
      <div class="main-title">
        <span>元数据编码维护</span>
      </div>
      <div class="met-selec2">
        <span class="met-return" @click="handreturn"></span>  
        <el-select
          v-model="currySelect2"
          value-key="id"
          placeholder="请选择元数据类型分类"
          @change="selectChange2"
        >
          <el-option
            v-for="node in selectData2"
            :label="node.name"
            :key="node.type"
            :value="node.type"
          ></el-option>
        </el-select>
        <div class="met-add" @click="btnAdd">
          <span class="iconAdd"></span>
          <span class="conent">新增</span>
        </div>
      </div>
      <div class="met-right-mid">
        <el-table
          @selection-change="sele_change"
          ref="table"
          :data="tableData"
          stripe
          style="width: 100%;"
          height="100%"
        >
          <el-table-column prop="orderNum" label="编号" width="80"></el-table-column>
          <el-table-column prop="old_field" label="名称"></el-table-column>
          <el-table-column prop="new_field" label="标题"></el-table-column>
          <el-table-column prop="field_type" label="类型"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <span class="ico icon-bianji" @click="handleEdit(scope.row)">编辑</span>
              <span class="ico icon-shanchu" @click="handleDelete(scope.row)">删除</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="met-pagination">
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
      <div class="data-mg-dalog">
        <el-dialog :title="dialog_title" :visible.sync="dialogFormVisible" :modal-append-to-body="false">
          <el-form :model="editForm" :rules="rules" ref="editForm" label-position="left">
            <el-form-item label="名称: " label-width="100px">
              <el-input v-model="editForm.oldField" autocomplete="off" :disabled="isdisabled"></el-input>
            </el-form-item>
            <el-form-item label="标题: " label-width="100px">
              <el-input v-model="editForm.newField" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="数据类型: " label-width="100px">
              <el-select
              v-model="editForm.fieldType"
              value-key="id"
              placeholder="请选择数据类型"
              :disabled="isdisabled"
              >
                <el-option
                v-for="node in selectData3"
                :label="node"
                :key="node"
                :value="node"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="所属分类: " label-width="100px">
              <el-select
              v-model="editForm.metaType"
              value-key="id"
              placeholder="请选择类型"
              :disabled="isdisabled"
              >
                <el-option
                v-for="node in selectInner"
                :label="node.name"
                :key="node.type"
                :value="node.type"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否只读: " label-width="100px">
              <el-checkbox v-model="editForm.readOnly"></el-checkbox>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="handleForm">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getcategory,
  getMetaCodeList,
  getTableInfoByCatlogId,
  getMetaTypeList,
  insertMetaField,
  updateMetaField,
  deleteMetaField,
  getFieldType
} from "@/api/ConfigurationManagement/MetadataCoding.js";

export default {
  data() {
    return {
      tabs: true,
      total: 0,
      pageSize: 10,
      currentPage: 1,
      selectData: [],
      selectData2: [],
      selectData3:[],
      selectInner:[],
      currySelect: {},
      currySelect2: '',
      tableData: [],
      dirId:'',
      img: require("@/assets/MetadataCoding/大文件数据.png"),
      list: [],
      dialog_title:'新增',
      dialogFormVisible:false,
      isdisabled:false,
      editForm:{
          cateLogId: "",
          fieldType: "varchar",
          id: "",
          metaType: "",
          newField: "",
          oldField: "",
          readOnly: true,
      },
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
    this.getSelect();
  },
  methods: {
    getSelect() {
      var _this = this;
      getcategory().then(res => {
        // console.log(res);
        if (res.status == 200) {
          _this.selectData = res.data;
          _this.currySelect = res.data[0].id;
          _this.selectChange(_this.currySelect);
        }
      });
      getMetaTypeList().then(res => {
        // console.log(res);
        if (res.status == 200) {
          var arr = [];
          var arrInner = [];
          var all = { type: '', name:'全部类型分类'};
          arr.push(all);
          for (var key in res.data) {
            var tmp = { type: key, name: res.data[key] };
            arrInner.push(tmp);
            arr.push(tmp);
          }
          _this.selectData2 = arr;
          _this.selectInner = arrInner;
        }
      });
      getFieldType().then(res => {
        // console.log(res);
        if(res.status == 200){
          _this.selectData3 = res.data;
        }
      })
    },
    selectChange(id) {
      var _this = this;
      getMetaCodeList(id).then(res => {
        if (res.status == 200) {
          _this.list = res.data;
        }
      });
    },
    selectChange2() {
      var _this = this;
      getTableInfoByCatlogId(
        _this.dirId,
        _this.currentPage,
        _this.pageSize,
        _this.currySelect2
      ).then(res => {
        // console.log(res);
        if (res.status == 200) {
          var arr = [];
          res.data.rows.forEach((item,index) => {
            item.orderNum = ++index;
            arr.push(item);
          });
          _this.tableData = arr;
          _this.total = res.data.total;
        }else {
          _this.$message({
            message: res.message,
            type: "info"
          });
          _this.tableData = null;
        }
      });
    },
    handelClick(value) {
      console.log(value);
      this.dirId = value.id;
      this.tabs = false;
      this.currentPage = 1;
      this.currySelect2 = '';
      this.selectChange2();
    },
    sele_change(data) {
      this.seleChangeData = data;
      console.log(this.seleChangeData);
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.selectChange2();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.selectChange2();
    },
    handreturn(){
        this.tabs = !this.tabs;
    },
    btnAdd(){
      this.dialogFormVisible = true;
      this.dialog_title = "新增";
      this.isdisabled = false;

      this.editForm.metaType = this.currySelect2;
      this.editForm.metaType = this.editForm.metaType;
      this.editForm.cateLogId = this.dirId;
      this.editForm.newField = null;
      this.editForm.oldField = null;
      this.editForm.readOnly= null;
      this.editForm.fieldType = null;
      this.editForm.id = null;

    },
    handleEdit(row){
        console.log(row);
        this.dialogFormVisible = true;
        this.dialog_title = "编辑";
        this.isdisabled = true;

        this.editForm.cateLogId = this.dirId;
        this.editForm.metaType = row.meta_type;
        this.editForm.newField = row.new_field;
        this.editForm.oldField = row.old_field;
        this.editForm.readOnly= row.read_only;
        this.editForm.fieldType = row.field_type;
        this.editForm.id = row.id;
    },
    handleDelete(row){
        var _this = this;
        this.$confirm(
          "是否确定删除此条数据？",
          "删除",
          {
            confirmButtonText: "继续",
            cancelButtonText: "取消",
            type: "warning"
          }
        ).then(() => {
          deleteMetaField(this.dirId, row.id).then(res => {
            if(res.status == 200){
              _this.selectChange2();
              _this.$message({
                message: "删除元数据成功",
                type: "success"
              });
            }else {
              _this.$message({
                message: res.message,
                type: "error"
              });
            }
          });
        });
    },
    handleForm(){
      var _this = this;
      this.dialogFormVisible = false;

      if(_this.dialog_title == "新增"){
        insertMetaField(_this.editForm).then(res => {
          if(res.status == 200){
            _this.selectChange2();
            _this.$message({
              message: "新增元数据成功",
              type: "success"
            });
          }else {
            _this.$message({
              message: res.message,
              type: "error"
            });
          }
        });
      }else if(_this.dialog_title == "编辑"){
        updateMetaField(_this.editForm).then(res => {
          if(res.status == 200){
            _this.selectChange2();
            _this.$message({
              message: "编辑元数据成功",
              type: "success"
            });
          }else {
            _this.$message({
              message: res.message,
              type: "error"
            });
          }
        });
      }
    },
    handleClose(){
      this.dialogFormVisible =  false;
    }
  }
};
</script>

<style lang="scss">
#MetadataCoding {
  display: flow-root;
  width: calc(100% - 0.3rem);
  height: 100%;
  overflow: hidden;
  padding-left: 0.3rem;
  background: url("../../../assets/DataManagement/right-bj.png") no-repeat;
  background-size: 100% 100%;

  .met-wrap {
    width: 100%;
    height: 100%;
  }

  .main-title {
    text-align: center;
    padding: 0.05rem 0;

    span {
      display: inline-block;
      font-weight: bold;
      font-size: 0.16rem;
      color: #066c98;
    }
  }

  .met-selec {
    text-align: right;
    margin-right: 0.3rem;
    margin-bottom: 0.2rem;

    .el-input__inner {
      background-color: #042453;
      color: #fff;
      outline: 0;
      border-color: #042453;
    }
  }

  .met-selec2 {
    margin: 0.3rem 0;

    .met-return {
        cursor: pointer;
        display: inline-block;
        width: 15px;
        height: 36px;
        background: url('../../../assets/DataManagement/see.png') no-repeat center;
        margin-right: 0.3rem;
    }

    .met-add {
      display: inline-block;
      cursor: pointer;
      padding: 0.05rem 0.11rem;
      margin-left: 0.2rem;
      border: 1px solid #0CA8E3;
      border-radius: 4px;

      &:hover {
        background-color: #0CA8E3;

        .iconAdd {
          background: url('../../../assets/DataManagement/add_hover.png') no-repeat center;
          background-size: 100% 100%;
        }

        .conent{
          color: #fff;
        }

      }

      .iconAdd {
          display: inline-block;
          width: 0.18rem;
          height: 0.18rem;
          margin-right: 0.11rem;
          background: url('../../../assets/DataManagement/add.png') no-repeat center;
          background-size: 100% 100%;
      }

      .conent {
        color: #0A9FD4;
        font-size: 0.14rem;
      }
    }

    .el-input__inner {
      background-color: #042453;
      color: #fff;
      outline: 0;
      border-color: #042453;
    }
  }

  .met-slist {
    width: 100%;
    height: calc(100% - 120px);
    overflow-y: auto;
  }

  .met-title {
    box-sizing: border-box;
    display: block;
    padding: 0.1rem 0.2rem;
    color: #0a9fd4;
    background: url("../../../assets/MetadataCoding/背景2.png") no-repeat left;
    margin-bottom: 0.16rem;
  }

  .met-li {
    cursor: pointer;
    display: inline-block;
    padding: 0.4rem 0.4rem 0;
    background-color: #031a46;
    position: relative;
    text-align: center;
    margin-right: 0.2rem;
    margin-bottom: 0.3rem;

    .pub-icon1 {
      position: absolute;
      top: 0.16rem;
      left: 0.16rem;
      display: block;
      width: 0.1rem;
      height: 0.1rem;
      background: url("../../../assets/MetadataCoding/椭圆.png") no-repeat center;
      background-size: 100% 100%;
    }

    .pub-icon2 {
      position: absolute;
      top: 0.12rem;
      right: 0.12rem;
      display: block;
      width: 0.18rem;
      height: 0.18rem;
      background: url("../../../assets/MetadataCoding/设置.png") no-repeat center;
      background-size: 100% 100%;
    }

    .met-inner {
      box-sizing: border-box;
      width: 1rem;
      height: 1.22rem;
    }

    .met-div-inner {
      display: block;
      box-sizing: border-box;
      margin: 0 auto;
      padding: 0.2rem 0.25rem 0.4rem;
      background: url("../../../assets/MetadataCoding/背景.png") no-repeat center;
      background-size: 100% 100%;

      img {
        width: 0.42rem;
      }
    }

    .met-div-title {
      display: block;
      width: 1rem;
      padding: 0.12rem 0;
      color: #0a9fd4;
      font-size: 0.14rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .met-right-mid {
    height: calc(100% - 180px);

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
      background: url("../../../assets/DataManagement/查看.png") no-repeat
        center;
    }
    .icon-bianji {
      background: url("../../../assets/DataManagement/编辑.png") no-repeat
        center;
    }
    .icon-shanchu {
      background: url("../../../assets/DataManagement/删除.png") no-repeat
        center;
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
  }

  .met-pagination {
    .el-pagination {
      text-align: center;
      padding: 0.1rem 0;
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

  .data-mg-dalog {
    .el-dialog {
      width: 600px;
      background: url("../../../assets/DataManagement/dialog.png");
      background-size: 100% 100%;
      color: #fff;

      .el-select {
        width: 100%;
      }

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
        background: url("../../../assets/DataManagement/关闭.png") no-repeat center;
        background-size: 100% 100%;
        i {
          display: none;
        }
      }
      .el-dialog__body {
        padding: 0.29rem 0.3rem 0;
      }
      .el-dialog__footer {
        padding: 0 0.3rem 0.3rem;
      }
      .el-form-item--mini .el-form-item__content,
      .el-form-item--mini .el-form-item__label {
        width: 4rem;
      }
      .el-input--mini {
        height: 0.36rem;
        width: 4rem;
      }
      .el-input.is-disabled .el-input__inner {
        color: #999 !important;
      }
      .el-input__inner {
        background-color: #031a46;
        border: 1px solid #032b68;
        height: 0.36rem !important;
        color: #fff;
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
</style>
