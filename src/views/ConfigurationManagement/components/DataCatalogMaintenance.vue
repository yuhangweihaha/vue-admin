<template>
  <div id="data-dir-maintain">
    <div class="data-dir-left">
      <p class="data-dir-leftTitle">数据目录</p>
      <div class="data-dir-tree">
        <el-tree
          :data="treeData"
          ref="tree"
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
        >
          <!-- draggable -->
          <!-- :allow-drag="allowDrag" -->
          <!-- :allow-drop="allowDrop" -->
          <!-- @node-drop="handleDrop" -->
          <span class="custom-tree-node" slot-scope="node" @click="listClick(node.data)">
            <span class="data-node-icon" v-if="node.data.parentId == '-1'">{{ node.data.parentId }}</span>
            <span class="data-node-label">{{ node.data.label }}</span>
            <span class="el-btn">
              <span class="btn-add" @click.stop="add(node)" v-if="isAdd(node)">添加</span>
              <span class="btn-del" @click.stop="up(node)" v-if="isUp(node)">上移</span>
              <span class="btn-del" @click.stop="down(node)" v-if="isDown(node)">下移</span>
              <span class="btn-del" @click.stop="del(node)" v-if="node.data.parentId !='-1' ">删除</span>
            </span>
          </span>
        </el-tree>
      </div>
      <div class="data-dir-leftBottom">
        <div class="data-dir-leftselect data-tab-formitem" style="width:30%">
          <el-select v-model="doingValue" placeholder="其他操作" @change="changer">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item"></el-option>
          </el-select>
        </div>
        <!-- <div class="data-dir-rightcontent">
          <p>注：数据目录最大支持6级，数据集和数据目录不允许同级</p>
        </div> -->
      </div>
    </div>

    <div class="data-dir-right">
      <div class="data-dir-rightForm">
        <div class="data-dir-rightTab">
          <span type="info" :style="{ 'color': tab? '#0FD0FF':''}" @click="Tab(true)">目录编辑</span>
          <span class="data-dir-tabline"></span>
          <span type="info" :style="{ 'color': !tab? '#0FD0FF':''}" @click="Tab(false)">目录数据配置</span>
        </div>
        <div class="data-tab" v-if="tab">
          <el-form
            label-position="left"
            label-width="65px"
            :model="formData1"
            :rules="rules1"
            ref="formData1"
          >
            <el-form-item label="名称：" prop="name" class="data-tab-formitem">
              <el-input class="input" v-model="formData1.name"></el-input>
            </el-form-item>
            <el-form-item label="类型：" prop="type" class="data-tab-formitem" style="float:right;">
              <el-select v-model="formData1.catelogType" placeholder="请选择类型">
                <el-option
                  v-for="item in tab1options"
                  :label="item.label"
                  :key="item.label"
                  :value="item.label"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="简介：">
              <el-input
                class="textarea"
                type="textarea"
                placeholder="请填写描述内容"
                v-model="formData1.region"
                :autosize="{ minRows: 4, maxRows: 8}"
              ></el-input>
            </el-form-item>
            <el-form-item class="data-form-btn">
              <button class="el-btn-quxiao" @click="resetForm1('formData1')">取消</button>
              <button class="el-btn-queding" @click="submitForm1('formData1')">保存</button>
            </el-form-item>
          </el-form>
        </div>
        <div class="data-tab" v-if="!tab">
          <el-form
            label-position="left"
            :model="formData2"
            :rules="rules2"
            ref="formData2"
            width="100%;"
          >
            <el-form-item label="数据源名称：" prop="name">
              <el-select
                v-model="formData2.select"
                value-key="id"
                placeholder="请选择类型"
                @change="getTree2"
              >
                <el-option
                  v-for="item in tab2options"
                  :key="item.db_name_nickname"
                  :label="item.db_name_nickname"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="数据搜索：" class="data-checkbox-wrap" style="width:300px;">
              <el-input class="input" v-model="searchData" clearable>
                <i slot="prefix" class="el-input__icon el-icon-search" style="color:#0A9FD4;"></i>
              </el-input>
            </el-form-item>

            <el-form-item
              label="数据选择方式："
              class="data-checkbox-wrap"
              style="max-height:calc(100% - 248px)"
            >
              <el-checkbox
                :indeterminate="isIndeterminate"
                v-model="checkAll"
                @change="handleCheckAllChange"
              >全选</el-checkbox>
              <div class="data-dir-tree">
                <!-- <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                  <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                </el-checkbox-group>-->
                <el-tree
                  ref="trees"
                  :data="cities"
                  :show-checkbox="true"
                  :check-on-click-node="true"
                  :expand-on-click-node="false"
                  node-key="id"
                  default-expand-all
                  :default-checked-keys="currCities"
                  :filter-node-method="filterNode"
                ></el-tree>
              </div>
            </el-form-item>
            <el-form-item class="data-form-btn">
              <button class="el-btn-quxiao" @click="resetForm2('formData2')">取消</button>
              <button class="el-btn-queding" @click="submitForm2('formData2')">添加</button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <div class="data-dalog"></div>
  </div>
</template>

<script>
import {
  getTree,
  insertCateLog,
  updateCateLog,
  deleteCateLog,
  moveCateLog,
  getCateLogByid,
  getCateLogType,
  selectRecord,
  getSchemaAndTab,
  clearAll,
  deriveExecl,
  insertTableInfo
} from "@/api/ConfigurationManagement/DataCatalogMaintenance.js";

export default {
  data() {
    return {
      tab: 1,
      treeData: [],
      // 左下角的下拉框绑定值
      doingValue: "",
      options: [
        {
          value: "0",
          label: "清除全部"
        },
        {
          value: "1",
          label: "导入数据目录"
        },
        {
          value: "2",
          label: "导出数据目录"
        }
      ],
      tab1options: [],
      tab2options: [],
      // tab1
      formData1: {
        catelogType: "",
        createTime: "",
        createUser: "",
        id: "",
        isDeleted: 0,
        name: "",
        orderNum: 0,
        parentId: ""
      },
      // tab2下的select
      formData2: {
        select: {},
        id: ""
      },
      // 结构搜索
      searchData: "",
      // tab2下的其他组件
      checkAll: false,
      checkedCities: [1, 10, 9],
      cities: [],
      currCities:[],
      isIndeterminate: true,
      rules1: {
        name: [
          { required: true, message: "请输入活动名称" },
          { min: 1, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur" }
        ],
        type: [{ required: false, message: "请选择类型" }]
      },
      rules2: {
        name: [{ required: false, message: "请输入活动名称" }]
      }
    };
  },
  created() {
    this.getData();
    this.getSelect1();
  },
  watch: {
    db_name_nickname(val) {
      console.log("watch监听：");
      console.log(val);
    },
    searchData(val) {
      this.$refs.trees.filter(val);
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    getData() {
      var _this = this;
      getTree().then(res => {
        if (res.status == 200) {
          _this.treeData = res.data;
        }
      });
    },
    getSelect1() {
      var _this = this;
      getCateLogType().then(res => {
        if (res.status == 200) {
          var arr = [];
          res.data.forEach((item, index) => {
            arr.push({ label: item, value: index });
          });
          _this.tab1options = arr;
        }
      });

      // 右侧tab的第一个select
      selectRecord().then(res => {
        if (res.status == 200) {
          _this.tab2options = res.data;
        }
      });
    },

    getTree2() {
      var catelogId = this.formData2.id;
      var _this = this;
      if (!catelogId) {
        this.$message({
          message: "请先在左侧选择数据目录",
          type: "info"
        });
      } else {
        getSchemaAndTab({
          catelogId: catelogId,
          dbId: _this.formData2.select.id
        }).then(res => {
          if (res.status == 200) {
            _this.cities = res.data.tabList;
            _this.currCities = res.data.tabIds;
          }
        });
      }
    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
      console.log(dropNode);
    },
    // 拖拽时判定目标节点能否被放置
    allowDrop(draggingNode, dropNode, dropType) {
      if (dropNode.data.label === "二级 3-1") {
        return dropType !== "inner";
      } else {
        return true;
      }
    },
    // 节点是否能被拖拽
    allowDrag(draggingNode, dropNode, dropType) {
      return dropNode.data.label != "二级 3-1";
    },
    changer(item) {
      console.log(item);
      if (item.value == "0") {
        this.$confirm("删除目录将移动到回收站", "是否删除所有目录？ ", {
          confirmButtonText: "删除",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          clearAll().then(res => {
            if (res.status == 200) {
              this.getData();
              this.$message({
                message: "删除全部目录成功",
                type: "success"
              });
            }
          });
        });
      } else if (item.value == "1") {
        this.$confirm(
          "导入新目录将替换已有的目录结构，建议先导出已有目录作为备份后再进行操作！",
          "导入新目录",
          {
            confirmButtonText: "继续导入",
            cancelButtonText: "取消",
            type: "warning"
          }
        ).then(() => {
          this.$message({
            message: "导入数据目录功能预留",
            type: "success"
          });
        });
      } else if (item.value == "2") {
        deriveExecl().then(res => {
            let url = window.URL.createObjectURL(new Blob([res]));
            let link = document.createElement("a");
            link.style.display = "none";
            link.href = url;
            link.setAttribute("download", "数据目录导出_" + Date.now() +".xlsx");
            document.body.appendChild(link);
            link.click();
            this.$message({
              message: "导出的文件目录已经开始下载",
              type: "success"
            });
        });
      }
      this.doingValue = null;
    },
    // 切换目录编辑和目录数据配置
    Tab(val) {
      this.tab = val;
    },
    submitForm1(formName) {
      var _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          updateCateLog(_this.formData1).then(res => {
            if (res.status == 200) {
              this.$message({
                message: "数据目录已更新成功",
                type: "success"
              });
              // 添加成功后刷新列表
              _this.getData();
            } else {
              this.$message({
                message: res.message,
                type: "error"
              });
            }
          });
        }
      });
    },
    submitForm2(formName) {
      // 先获取被选中的目标
      var checkArr = this.$refs.trees.getCheckedNodes();
      console.log(checkArr);

      // 拼接公共参数
      var obj = {
        catelogId:this.formData2.id,
        dbId:this.formData2.select.id,
        dbName: this.formData2.select.db_name,
        dbNameNickname:this.formData2.select.db_name_nickname,
        schemaName:'',
        schemaNameNickname:''
      };

      var arrs = [];
      checkArr.forEach((item,index) => {
        var tmp = JSON.stringify(obj);
        tmp = JSON.parse(tmp);

        tmp.metaExtTable = item.metaExtTable;
        tmp.metaTable = item.metaTable;
        tmp.tabId = item.id;
        tmp.tabName = item.label;
        tmp.tabNameNickname = item.nickname
        arrs.push(tmp);
      });

      console.log(arrs);

      this.$refs[formName].validate(valid => {
        if (valid) {
          insertTableInfo(arrs).then(res =>{
            if(res.status == 200){
              this.$message({
                message: "保存成功!",
                type: "success"
              });
            }
          });
        } else {
          this.$message({
            message: "校验不通过，无法提交",
            type: "error"
          });
        }
      });
    },
    resetForm1(formName) {
      this.$refs[formName].resetFields();
    },
    resetForm2(formName) {
      // console.log(this.formData2);
      this.$refs[formName].resetFields();
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    isUp(node) {
      return node.node.previousSibling && node.data.catalogue == "catalogue";
    },
    isDown(node) {
      return node.node.nextSibling && node.data.catalogue == "catalogue";
    },
    isAdd(node) {
      return node.data.catalogue == "catalogue";
    },
    up(node) {
      var prev = node.node.previousSibling.data;
      var current = node.data;
      prev.orderNum = prev.order;
      current.orderNum = node.data.order;
      var arr = [prev, current];

      moveCateLog(arr).then(res => {
        console.log(res);
        if (res.status == 200) {
          this.$message({
            message: "目录上移成功",
            type: "success"
          });
          this.getData();
        }
      });
    },
    down(node) {
      var next = node.node.nextSibling.data;
      var current = node.data;
      next.orderNum = next.order;
      current.orderNum = node.data.order;
      var arr = [next, current];
      // console.log(arr);
      moveCateLog(arr).then(res => {
        if (res.status == 200) {
          this.$message({
            message: "目录下移成功",
            type: "success"
          });
          this.getData();
        }
      });
    },
    del(node) {
      this.$confirm("删除后数据将移动到回收站, 是否继续删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        deleteCateLog(node.data.id).then(res => {
          if (res.status == 200) {
            this.$message({
              message: "删除目录成功",
              type: "success"
            });
            this.getData();
          }
        });
      });
    },
    add(node) {
      var insertObj = {
        catalogue: "catalogue",
        isCreat: true,
        children: [],
        code: "",
        id: "",
        name: "自定义数据目录",
        label: "自定义数据目录",
        order: 0,
        orderNum: 0,
        parentId: node.data.id
      };

      this.$refs.tree.append(insertObj, node.data);
      this.$refs.tree.setCurrentNode(insertObj);
      this.formData1 = insertObj;
      insertCateLog(this.formData1).then(res => {
        if (res.status == 200) {
          this.$message({
            message: "添加子数据目录成功",
            type: "success"
          });
        }
      });
    },
    // tree 列表项被点击
    listClick(data) {
      console.log(data);
      var _this = this;

      _this.formData2.id = data.id;
      if (data.catalogue == "catalogue") {
        getCateLogByid(data.id).then(res => {
          _this.formData1 = res.data[0];
        });
      }

      if(_this.formData2.select){
        _this.getTree2();
      }
    },
    handleCheckAllChange(val) {
      console.log(val);
      this.$refs.trees.setCheckedNodes(val ? this.cities : []);
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      console.log(value);
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    }
  }
};
</script>

<style lang="scss">
#data-dir-maintain {
  box-sizing: border-box;
  display: flow-root;
  width: 100%;
  height: 100%;

  .data-dir-left {
    box-sizing: border-box;
    float: left;
    width: 4.5rem;
    height: 100%;
    position: relative;
    background: #031945;

    .data-dir-leftTitle {
      padding: 0.08rem 0.2rem;
      margin: 0;
      font-size: 0.14rem;
      color: #0a9fd4;
      background-color: #042767;
    }

    .data-dir-leftBottom {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      display: flow-root;

      .data-dir-leftselect {
        float: left;
        width: 20%;
        box-sizing: border-box;
        // padding-left: 20px;
      }
      .data-dir-rightcontent {
        float: right;
        font-size: 0.14rem;
        line-height: 40px;
        box-sizing: border-box;
      }
    }
  }

  .data-dir-right {
    box-sizing: border-box;
    float: right;
    padding: 0 0.3rem;
    width: calc(100% - 4.76rem);
    height: 100%;
    background: url("../../../assets/DataManagement/right-bj.png") no-repeat;
    background-size: 100% 100%;

    .data-dir-rightForm {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      overflow-y: auto;

      .data-tab {
        padding: 0.3rem 0 0;

        .tab-checkbox-box {
          padding: 0.1rem 0.2rem;
          border: 1px solid #032b68;
          border-radius: 4px;
          background-color: #031a46;
        }
      }

      .data-dir-rightTab {
        display: block;
        text-align: center;
        padding: 0.05rem 0;

        span {
          display: inline-block;
          font-weight: bold;
          font-size: 0.16rem;
          cursor: pointer;
          color: #066c98;
        }

        .data-dir-tabline {
          width: 0.02rem;
          height: 0.15rem;
          background: #0648ab;
          margin: 0 0.16rem;
        }
      }
    }

    .el-form-item__label {
      color: #0a9fd4;
      font-size: 0.14rem;
    }

    .el-checkbox__label {
      color: #0a9fd4;
      font-size: 0.14rem;
    }

    .el-checkbox__inner {
      border: 1px solid #032b68;
      background-color: transparent;
    }

    .el-checkbox__inner::after {
      border-color: #0ee5ff;
    }

    .el-checkbox__input.is-indeterminate .el-checkbox__inner::before {
      background-color: #0ee5ff;
    }

    .textarea {
      textarea {
        border: 1px solid #032b68;
        border-radius: 4px;
        font-size: 0.14rem;
        color: #fff;
        background-color: #031a46;

        &:hover {
          border-color: #c0c4cc;
        }
      }

      ::-webkit-input-placeholder {
        color: #02507d;
      }
      :-moz-placeholder {
        color: #02507d;
      }
      ::-moz-placeholder {
        color: #02507d;
      }
      :-ms-input-placeholder {
        color: #02507d;
      }
    }
  }

  // 本页面所有select的颜色
  .el-select {
    display: block;

    .el-input__prefix,
    .el-input__suffix {
      top: auto;
      height: auto;
    }

    input {
      border: 1px solid #032b68;
      border-radius: 4px;
      font-size: 0.14rem;
      color: #fff;
      background-color: #031a46;
    }

    .el-icon-arrow-up {
      color: rgb(14, 229, 255);
    }
  }

  .data-dir-tree {
    width: 100%;
    height: calc(100% - 85px);
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
        background: url("../../../assets/DataManagement/tree-hover.png")
          no-repeat;
        background-size: 100% 26px;

        .el-btn {
          display: inline;
        }
      }

      .is-current {
        background: url("../../../assets/DataManagement/tree-hover.png")
          no-repeat;
        background-size: 100% 26px;
      }
    }

    .custom-tree-node {
      display: flex;
      justify-content: space-between;
      width: 100%;
      overflow: hidden;

      span {
        vertical-align: baseline;
      }

      .data-node-label {
        flex-grow: 1;
        flex-shrink: 2;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .data-node-icon {
        vertical-align: middle;
        font-size: 0;
        padding: 10px 10px;
        background: url("../../../assets/DataManagement/yuan.png") no-repeat
          center;
      }

      .el-btn {
        display: none;
        flex-shrink: 0;

        span {
          padding-left: 0.05rem;
          font-size: 0.14rem;
        }

        .btn-del {
          color: #f95462;
        }
        .btn-edit {
          color: #f95462;
        }

        .btn-add {
          color: #f95462;
        }
      }
    }
    .el-tree-node__expand-icon {
      color: #0ECCFF; 
    }
  }
}

.el-btn-quxiao {
  padding: 0.08rem 0.4rem;
  outline: none;
  border-radius: 4px;
  border: 1px solid #f23030;
  color: #f23030;
  background-color: transparent;

  &:hover {
    background-color: #f23030;
    color: #fff;
  }
}

.el-btn-queding {
  padding: 0.08rem 0.4rem;
  outline: none;
  border-radius: 4px;
  border: 1px solid #0fd0ff;
  color: #0fd0ff;
  background-color: transparent;

  &:hover {
    background-color: #0fd0ff;
    color: #fff;
  }
}

.data-form-btn {
  text-align: right;
}

.data-tab-formitem {
  display: inline-block;
  width: 48%;
}

.input {
  input {
    border: 1px solid #032b68;
    border-radius: 4px;
    font-size: 0.14rem;
    color: #fff;
    background-color: #031a46;
  }
}

div[role="treeitem"]:focus > .el-tree-node__content {
  background-color: transparent !important;
}

// 全局下拉框列表项的父级
// .el-scrollbar__wrap {
//   margin: 0 !important;
//   overflow-y: auto !important;
// }
</style>
