<template>
  <div>
  <div class="modalTable">
    <el-collapse-transition>
      <div class="Expression" v-show="exp">
        <el-scrollbar style="height: 100%">
          <div class="Expression-div" v-for=" init in getMy">
            <p v-for="datas in init.iconType">{{datas}}</p>
            <ul>
              <el-scrollbar style="height: 100%" >
                <!--点击li列表-->
                <li v-for="(dat,index) in init.resultList"><img  @click="clickimg(index,dat.iconPosition)"  :src="initImg(dat.iconPosition)" alt=""></li>
              </el-scrollbar>
            </ul>
          </div>
          <!--上传-->
          <div class="upload">
            <p>上传图标</p>
            <el-upload
              action="/api/fileupload/file/uploadFileForIcon"
              list-type="picture-card"
              accept=".jpg, .png, .gif"
              :on-preview="handlePictureCardPreview"
              :on-success="handleSuccess"
              ref="uploads"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </div>
          <div style="width: 50%;float: right" v-show="uploadbut" class="upload-but">
            <el-button type="warning" plain size="mini" icon="el-icon-delete" @click="closebaocun">取消</el-button>
            <el-button type="primary" plain size="mini" icon="el-icon-share" @click="Saveexpression">保存</el-button>
          </div>

        </el-scrollbar>

      </div>
    </el-collapse-transition>

    <!--操作部分-->
    <div style="width: 100%;height: 293px;;margin-top: 15px;overflow: hidden;position: relative">
      <div style="width: 95%;height:100%;margin-left: 2.5%;border:1px solid #ccc; transform: translateX(0%);transition: transform .35s ease;float: left" ref="modals">
        <!--图片文字区-->
        <div class="modalTable-top">
          <el-scrollbar style="height: 100%;" class="leftscro">
            <div class="modalTable-top-one">
              <div class="modalTable-lis" v-for="init in data" @click="modalLis(init.name)" :class="inits === init.name ? 'active' : ''">
                <div class="img-icon"><img :src="init.img" alt=""></div>
                <div class="img-tip">{{init.name}}</div>
              </div>
            </div>
          </el-scrollbar>
        </div>
        <div class="modalTable-content">
          <span>透明度</span>
          <div class="block">
            <el-slider v-model="transparency" :show-tooltip="false"></el-slider>
          </div>
          <div class="block-cont">{{this.transparency}} %</div>
        </div>
        <div class="modalTable-bottom">
          <span>显示级别</span>
          <div class="block">
            <el-slider v-model="displayLevel" range :show-tooltip="true" :max="18">
            </el-slider>
          </div>
          <div class="block-cont"> 级</div>
        </div>
      </div>
      <div class="caozuo-right" ref="caozuos">
        <p>
          <el-row>
            <el-button type="primary" size="mini" @click="Return">返回</el-button>
          </el-row>
        </p>
        <div style="width: 100%;height: 85%;">
          <el-scrollbar style="height: 100%; color: #FFFFFF;">
            <div v-show="inits === '默认符号'">
              <div v-if="activeType === 'Polyline' || activeType === 'MultiLineString'">
                <div>
                  <span>边框颜色</span>
                  <el-color-picker v-model="borderColor"></el-color-picker>
                </div>
                <div>
                  <span>边框宽度</span>
                  <el-input-number v-model="borderWidth" controls-position="right" :min="1" :max="10" size="mini"></el-input-number>
                </div>


              </div>
              <div v-else-if="activeType === 'Point'">
                <span>符号类型</span>
                <el-radio v-model="iconId" label="1">类型1</el-radio>
                <el-radio v-model="iconId" label="2">类型2</el-radio><br>
                <div>
                  <span>符号颜色</span>
                  <el-color-picker v-model="iconColor"></el-color-picker>
                </div>
                <div>
                  <span>符号大小</span>
                  <el-input-number v-model="iconSize" controls-position="right" :min="6" :max="30" size="mini"></el-input-number>
                </div>
                <div>
                  <span>边框颜色</span>
                  <el-color-picker v-model="borderColor"></el-color-picker>
                </div>
                <div>
                  <span>边框宽度</span>
                  <el-input-number v-model="borderWidth" controls-position="right" :min="1" :max="10" size="mini"></el-input-number>
                </div>

              </div>
              <div v-else-if="activeType === 'MultiPolygon' || activeType === 'Polygon'">
                <span>填充颜色</span>
                <el-color-picker v-model="fillColor"></el-color-picker>
                <span>边框颜色</span>
                <el-color-picker v-model="borderColor"></el-color-picker>
                <br>
                <span>边框宽度</span>
                <el-input-number v-model="borderWidth" controls-position="right" :min="1" :max="10" size="mini"></el-input-number>
              </div>
            </div>
            <div v-show="inits === '等级符号'">
              <div >
                <el-tag   class="leveldataselecttag">字段</el-tag>
                <el-select class="leveldataselect" v-model="leveldataselect" size="mini">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div><div>

              <el-tag   class="levelsteptag">分级</el-tag>
              <el-input-number   class="levelstep" size="mini"  controls-position="right" :min=2 :max=7 v-model=levelstep ></el-input-number>
            </div><div>
              <span>边框颜色</span><el-color-picker v-model=gradeBorderColor></el-color-picker>
              <span>边框宽度</span><el-input-number size="mini"  class="quyunum"  controls-position="right" :max=5 v-model=gradeBorderWidth ></el-input-number>
            </div><div>
              <div class="levelmodalTable-lis" v-model="leveldata" v-for="leveldataone in leveldata" >
                <el-color-picker v-model=leveldataone.color></el-color-picker>
                <el-input-number size="mini"  class="quyunum"  controls-position="right" :max=leveldataone.end v-model=leveldataone.start ></el-input-number> -
                <el-input-number size="mini"  class="quyunum"  controls-position="right" :min=leveldataone.start  v-model=leveldataone.end></el-input-number>
              </div>

            </div>
            </div>
            <div v-show="inits === '类型符号'">
              <div >
                <div class="typeFieldtag">类型</div>
                <el-select class="typeField" v-model="typeField" size="mini">
                  <el-option
                    v-for="item in typeoptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div><div>
              <div class="clear"></div>
              <div class="typesteptag">边框</div>
              <el-color-picker v-model=typeBorderColor></el-color-picker>
              <div class="clear"></div>
            </div><div>
              <div class="typesteptag">大小</div>
              <el-input-number   class="typeBorderWidth" size="mini" controls-position="right" :min=2 :max=7 v-model=typeBorderWidth ></el-input-number>
              <div class="clear"></div>
            </div><div>

            </div><div>
              <div class="typemodalTable-lis" v-model="typeValueSizeColor" v-for="typedataone in typeValueSizeColor" >

                <el-color-picker class="typemodalTable-li1" v-if="!typedataone.url" v-model=typedataone.color></el-color-picker>
                <!-- <span v-if="typedataone.url"> -->
                <div v-if="typedataone.url&&activeType=='Point'" class="typemodalTable-lisimgdiv"> <img    :src=typedataone.url>
                </div>
                <!-- </span> -->
                <div class="typemodalTable-li2" v-if="activeType=='Point'">
                <i class="el-icon-circle-plus"  @click="clickexp(typedataone.name)"></i>
                </div>

                <div  class="typemodalTable-li3">{{typedataone.name}}</div>
                <el-input-number size="mini"   class="typemodalTable-li4"  controls-position="right"  v-model=typedataone.size ></el-input-number>
                <div class="clear"></div>
              </div>

            </div>

            </div>
            <div v-show="inits === '灯光图'">
              <div>符号颜色<el-color-picker v-model="lightSignColor"></el-color-picker>符号大小<el-input-number size="mini"  class="lightSignSize"  controls-position="right"  v-model="lightSignSize" ></el-input-number></div>
              <div>泛光颜色<el-color-picker v-model="lightFloodColor"></el-color-picker>泛光大小<el-input-number size="mini"  class="lightFloodSize"  controls-position="right" v-model="lightFloodSize" ></el-input-number></div>
            </div>
            <div v-show="inits === '聚合图'">
              <div style="display: flex;align-items: center;justify-content: center;margin-top: 10%">
                <span style="margin-right: 5%">条件类型</span>
                <el-select v-model="polymerizQeuery" placeholder="请选择" @change="selectPolymerizCondition">
                  <el-option
                    v-for="item in typeCondition"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
              </div>
              <div style="display: flex;align-items: center;justify-content: center;margin-top: 15%">
                <span style="margin-right: 5%">条件级别</span>
                <el-select v-model="polymerizLevel" placeholder="请选择" @change="selectPolymerizLevel">
                  <el-option
                    v-for="item in levelCondition"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div v-show="inits === '热度图'">
              <div style="display: flex;align-items: center;justify-content: center;margin-top: 10%">
                <span style="margin-right: 5%">条件类型</span>
                <el-select v-model="temperatureQeuery" placeholder="请选择" @change="selectTemperatureCondition">
                  <el-option
                    v-for="item in typeCondition"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
              </div>
              <div style="display: flex;align-items: center;justify-content: center;margin-top: 15%">
                <span style="margin-right: 5%">条件级别</span>
                <el-select v-model="temperatureLevel" placeholder="请选择" @change="selectTemperatureLevel">
                  <el-option
                    v-for="item in levelCondition"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
              </div>
            </div>
          </el-scrollbar>
        </div>
      </div>
    </div>
    <!-- 选择按钮部分 -->
    <div class="Selection-operation">
      <div class="click-button" @click="getDataList">
        <img :src="imgs" alt="">
        <span>添加数据</span>
      </div>
      <draggable ref="draggable" @active="activeFunc" @reOrderLayer="reOrderLayer" @modalLis="modalLis"></draggable>
    </div>

    <!-- 选中数据表格部分 右侧表格部分-->
    <div class="layer-table" v-if="hiddenFlag" style="width: 100%;height:calc(76% - 40px)">
      <div style="width: 100%;height: 100%">
        <el-table ref="layerTable" :data="rightData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelection">
          <el-table-column type="selection" width="30">
          </el-table-column>
          <el-table-column label="类型" prop="layerType" width="50">
          </el-table-column>
          <el-table-column prop="titleName" label="名称" width="60">
          </el-table-column>
          <el-table-column label="操作">
            <!--<template slot-scope="scope">-->
            <!--<div class="control-btn" @click="edit(scope.row.code)">编辑</div>-->
            <!--<div class="control-btn" @click="edit(scope.row.code)">编辑</div>-->
            <!--</template>-->
          </el-table-column>
        </el-table>
      </div>
    </div>

    <!-- 弹出对话框部分 -->
    <el-dialog class="dialog-frame" title="添加数据" :visible.sync="dialogVisibleFlag" id="addData" :modal-append-to-body='false'>
      <div style="background: #cccccc;height: 1px"></div>

      <!-- 上传数据按钮和搜索栏部分 -->
      <div class="dialog-div" style="width:90%;height:60px;display: flex;justify-content: flex-start;align-items: center;text-align: center">
        <el-button @click="dia" type="danger" plain>导入数据</el-button>
        <el-input placeholder="请输入搜索内容" v-model="searchName" clearable style="width: 200px;margin-left:55%"></el-input>
      </div>

      <!-- 数据表格部分 -->
      <div class="table-div" style="width: 90%">
        <el-table height="300px" ref="multipleTable" :data="tableData" style="width: 100%" :border="true" @selection-change="handleSelectionChange">
          <el-table-column type="selection"  width="50">
          </el-table-column>
          <el-table-column prop="layerType" label="数据类型"  width="180" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="titleName" label="名称" width="200" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="updTime" label="上传时间" show-overflow-tooltip>
          </el-table-column>
           <el-table-column prop="dataSourceTypeDes" label="类型" show-overflow-tooltip>
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <!--分页部分-->
        <div class="pagination" style="text-align: center">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                         :current-page.sync="listQuery.page" :page-sizes="[10,20,30,50]" :page-size="listQuery.limit"
                         layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
        </div>
        <el-button style="background: #f94a59;color: white" @click="dialogVisibleFlag = false">取 消</el-button>
        <el-button type="primary" @click="handleClose">确 定</el-button>
      </div>
    </el-dialog>
    <!--<el-dialog title="提示" :visible.sync="saveVisible" width="30%">
      <el-form label-width="100px" class="demo-ruleForm" style="margin-top: 20px;">
        <el-form-item label="方案名称">
          <el-input type="text" v-model="allData.planName" autocomplete="off" style="width: 300px;"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="toSave">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>-->
  </div>
    <div class="gogo">
      <el-dialog
        title="保存"
        :visible.sync="saveVisible"
        width="30%"

        :modal-append-to-body='false'>
        <span >方案名称:</span>
        <el-input class="planInput" v-model="allData.planName"></el-input>

        <span slot="footer" class="dialog-footer">
    <el-button @click="saveVisible = false">取 消</el-button>
    <el-button type="primary" @click="toSave">保 存</el-button>
  </span>
      </el-dialog>
    </div>
    <UploadData ref="load" @closeAll="closeAll"></UploadData>
  </div>
</template>

<script>
  import draggable from "@/common/draggable.vue";
  import UploadData from "@/common/UploadData";
  import {getLayerData, getMyData, addPlanData, getMyPlan, getMyIcons, checkPlanName} from "@/api/map";
  import {mapGetters} from "vuex";

  export default {
    name: "modalTable",
    data() {
      return {
        /*03-29*/
        initImg: (url) =>{
          if(url){
            return url.replace('172.30.17.178:8888', '');
          }
          return '';
        },
        /*.....*/

        //灯光图
        lightSignColor:"#FFFFFF",
        lightSignSize :1,
        lightFloodColor:"#FFFFFF",
        lightFloodSize:10,
        //灯光图
        //类型图
        typeField:"",
        typeBorderColor:"",
        typeBorderWidth:"",
        typeValueSizeColor:[],
        butcircle: false,
        exp: false,
        getMy: [],  //图标
        uploadbut:false,  //表情确定取消
        fileId: '',    //保存时传的id
        fileUrl: '',    //保存时传的路径
        dialogImageUrl: '',    //图标上传
        dialogVisible: false,  //图标上传
        //类型图
        //等级符号变量
        gradeBorderColor:"red",
        gradeBorderWidth:1,
        leveldata:[{start:1,end:10},{start:1,end:10}],
        options: [
          {
            value: "选项1",
            label: "黄金糕"
          },
          {
            value: "选项5",
            label: "北京烤鸭"
          }
        ],
        typeoptions: [
          {
            value: "选项1",
            label: "黄金糕"
          },
          {
            value: "选项5",
            label: "北京烤鸭"
          }
        ],
        leveldataselect:"",
        levelstep:3,
        //等级符号变量
        listQuery: {
          page: 1,
          limit: 10,
          name: null
        },
        pageNumber: 1,
        pageSize: 10,
        total: null, // 分页总共条数
        activeData: {},
        transparency: 10,
        displayLevel: 1,
        iconId: "1",
        iconColor: "#E1E1E1",
        iconSize: "12",
        borderStyle: "solid",
        borderWidth: "1",
        borderColor: "red",
        fillColor: "#B4B42D",
        activeType: "",
        fitFlag: true,
        imgs: require("@/icon/add-icon.png"),
        dialogVisibleFlag: false,
        searchName: "",
        tableData: [],
        multipleSelection: [],
        allSelectList :{},   // 所有选中数据的数组
        hiddenFlag: false,
        rightData: [],
        opc: "",
        inits: "",
        Choice: require("@/icon/wode/Choice.png"),
        noChoice: require("@/icon/wode/noChoice.png"),
        zhu1: require("@/icon/wode/zhuangtai1.png"),
        zoom: require("@/icon/wode/zoom.png"),
        Write: require("@/icon/wode/Write.png"),
        dele: require("@/icon/wode/yuyuyu.png"),
        data: [
          {
            name: "默认符号",
            img: require("@/icon/wode/dian.png")
          },
          {
            name: "等级符号",
            img: require("@/icon/wode/dengji.png")
          },
          {
            name: "类型符号",
            img: require("@/icon/wode/leixing.png")
          },
          {
            name: "灯光图",
            img: require("@/icon/wode/dengguang.png")
          },
          {
            name: "聚合图",
            img: require("@/icon/wode/juhe.png")
          },
          {
            name: "热度图",
            img: require("@/icon/wode/redu.png")
          },
          {
            name: "图表图",
            img: require("@/icon/wode/tubiao.png")
          }
        ],
        allData: {},
        saveVisible: false,
        layerData: {},
        levelCondition : [
          {
            id:"0",
            name:"sum"
          },
          {
            id:"1",
            name:"max"
          },
          {
            id:"2",
            name:"min"
          }
        ],
        polymerizQeuery : "", // 散点图条件下拉框更新model
        polymerizLevel: "",   // 散点图级别下拉框更新model
        temperatureQeuery:"",  // 热力图条件下拉框更新model
        temperatureLevel:"",  // 热力图级别下拉框更新model
        typeCondition :[], // 热力图，散点图类型筛选条件
      };
    },
    created() {},
    mounted() {

      if (this.planId) {
        console.info("就是这");
        getMyPlan(this.planId).then(res => {
          if (res.status === 200 || res.status === "200") {
            this.allData = res.data;
            for(let i=0;i<this.allData.layerPlanList.length;i++){
              this.allData.layerPlanList[i].pkId=this.allData.layerPlanList[i].pkId?this.allData.layerPlanList[i].pkId:this.allData.layerPlanList[i].layerId;
            }
            this.$refs.draggable.updateData(this.allData.layerPlanList);
          }
        });
      }
      if(this.dataId){
       this.$refs.draggable.updateData([window.showdata]);
      }
      this.getMyIcons();
    },
    components: {
      draggable,
      UploadData
    },
    watch: {
      transparency(value) {
        this.activeData["transparency"] = value;
        this.$refs.draggable.upDateActiveData(this.activeData);
        this.$emit("activeLayer", {
          data: this.activeData,
          type:this.activeData.finallyType,
          layerData: this.layerData
        });
      },
      displayLevel(value) {
        this.activeData["displayLevel"] = value[0]+","+value[1];
        this.$refs.draggable.upDateActiveData(this.activeData);
        this.$emit("activeLayer", {
          data: this.activeData,
          type:this.activeData.finallyType,
          layerData: this.layerData
        });
      },
      iconId(value) {
        if(!window.initMyData){
            return;
          }
        this.activeData["iconId"] = value;
        this.$refs.draggable.upDateActiveData(this.activeData);
        this.$emit("activeLayer", {
          data: this.activeData,
          layerData: this.layerData
        });
      },
      iconColor(value) {
        if(!window.initMyData){
            return;
          }
        this.activeData["iconColor"] = value;
        this.iconColor=value;
        this.$refs.draggable.upDateActiveData(this.activeData);
        this.$emit("activeLayer", {
          data: this.activeData,
          layerData: this.layerData
        });
      },
      iconSize(value) {
        if(!window.initMyData){
            return;
          }
        this.activeData["iconSize"] = value;
        this.$refs.draggable.upDateActiveData(this.activeData);
        this.$emit("activeLayer", {
          data: this.activeData,
          layerData: this.layerData
        });
      },
      borderStyle(value) {
        if(!window.initMyData){
            return;
          }
        this.activeData["borderStyle"] = value;
        this.$refs.draggable.upDateActiveData(this.activeData);
        this.$emit("activeLayer", {
          data: this.activeData,
          layerData: this.layerData
        });
      },
      borderWidth(value) {
        // if(!this.activeData["borderWidth"]){
        //   return
        // }
        if(!window.initMyData){
            return;
          }
        this.activeData["borderWidth"] = value;
        this.$refs.draggable.upDateActiveData(this.activeData);
        this.$emit("activeLayer", {
          data: this.activeData,
          layerData: this.layerData
        });
      },
      borderColor(value) {
        if(!window.initMyData){
            return;
          }
        this.activeData["borderColor"] = value;
        this.borderColor=value;
        this.$refs.draggable.upDateActiveData(this.activeData);
        this.$emit("activeLayer", {
          data: this.activeData,
          layerData: this.layerData
        });
      },
      fillColor(value) {
        if(!window.initMyData){
            return;
          }
        this.activeData["fillColor"] = value;
        this.$refs.draggable.upDateActiveData(this.activeData);
        this.$emit("activeLayer", {
          data: this.activeData,
          layerData: this.layerData
        });
      },
      leveldataselect:{
        handler(newvalue,oldvalue){
          if(!window.initMyData){
            return;
          }
          var _this=this;
          window.leveldataselectfield=this.leveldataselect;
          for(var i=0;i<this.activeData.fileFields.length;i++){

            if(this.activeData.fileFields[i].contentName==this.leveldataselect){
              if(parseInt(this.activeData.fileFields[i].maxValue)>parseInt(this.activeData.fileFields[i].minValue)){
                window.min=parseInt(this.activeData.fileFields[i].minValue) ;
                window.max=parseInt(this.activeData.fileFields[i].maxValue);
              }else{
                window.max=parseInt(this.activeData.fileFields[i].minValue) ;
                window.min=parseInt(this.activeData.fileFields[i].maxValue);
              }

              break;

            }
          }
          this.activeData["gradeField"] = newvalue;
          this.resetLevelData();
        }

      },
      gradeBorderColor:{
        handler(newvalue,oldvalue){
          this.activeData["gradeBorderColor"] = newvalue;
          this.$refs.draggable.upDateActiveData(this.activeData);
          this.$emit("activeLayer", {
            data: this.activeData,
            type:"levelLayer",
            layerData:this.layerData
          });
        }
      },
      gradeBorderWidth:{
        handler(newvalue,oldvalue){
          this.activeData["gradeBorderWidth"] = newvalue;
          this.$refs.draggable.upDateActiveData(this.activeData);
          this.$emit("activeLayer", {
            data: this.activeData,
            type:"levelLayer",
            layerData:this.layerData
          });
        }
      },
      typeField:{
        handler(newvalue,oldvalue){
          if(!window.initMyData){
            return;
          }
          this.activeData["typeField"] = newvalue;
          this.typeField=newvalue;
          this.$refs.draggable.upDateActiveData(this.activeData);

          this.resettypeData();
        },
      },
      typeBorderColor:{
        handler(newvalue,oldvalue){
          if(!window.initMyData){
            return;
          }
          this.activeData["typeBorderColor"] = newvalue;
          this.typeBorderColor=newvalue;
          this.$refs.draggable.upDateActiveData(this.activeData);
          this.$emit("activeLayer", {
            data: this.activeData,
            type:"typeLayer",
            layerData:this.layerData
          });

        },
      },
      typeBorderWidth:{
        handler(newvalue,oldvalue){
          if(!window.initMyData){
            return;
          }
          this.activeData["typeBorderWidth"] = newvalue;
          this.typeBorderWidth=newvalue;
          this.$refs.draggable.upDateActiveData(this.activeData);
          this.$emit("activeLayer", {
            data: this.activeData,
            type:"typeLayer",
            layerData:this.layerData
          });

        },
      },
      typeValueSizeColor:{
        handler(newvalue,oldvalue){
          if(!window.initMyData){
            return;
          }
          this.activeData["typeValueSizeColor"] = JSON.stringify(newvalue);
          this.$refs.draggable.upDateActiveData(this.activeData);
          for(var i=0;i<this.typeValueSizeColor.length;i++){
            window.typelayerDataParam[this.typeValueSizeColor[i].name].color=this.typeValueSizeColor[i].color;
            window.typelayerDataParam[this.typeValueSizeColor[i].name].url=this.typeValueSizeColor[i].url;
            window.typelayerDataParam[this.typeValueSizeColor[i].name].size=this.typeValueSizeColor[i].size;
          }
          this.$emit("activeLayer", {
            data: this.activeData,
            type:"typeLayer",
            layerData:this.layerData
          });
        },
        deep:true
      },
      leveldata:{
        handler(newvalue,oldvalue){
          if(!window.initMyData){
            return;
          }
          console.info(newvalue);
          console.info(oldvalue);
          window.step=this.levelstep;
          window.gradientlevel =new Array();
          //gradeBorderColor
          // var newcolorStr="";
          // var leveldataStr="";
          for(var i=0;i<newvalue.length;i++){
            window.gradientlevel.push(newvalue[i].color);
            //    newcolorStr+=","+newvalue[i].color;
            //    leveldataStr+=","+newvalue[i].start+"-"+newvalue[i].end
          }
          this.activeData["gradeBorderColor"] = this.gradeBorderColor;
          this.activeData["gradeBorderWidth"] = this.gradeBorderWidth;
          this.activeData["gradeRangeName"] = JSON.stringify(newvalue);
          this.activeData["gradeNum"] =this.levelstep;
          //gradeRangeName

          window.leveldata=newvalue;
          // for(var i=0;i<this.activeData.fileFields.length;i++){

          //   if(this.activeData.fileFields[i].contentName==newvalue){
          //     window.min=parseInt(this.activeData.fileFields[i].minValue) ;
          //     window.max=parseInt(this.activeData.fileFields[i].maxValue);
          //     break;

          //   }
          // }
          this.$refs.draggable.upDateActiveData(this.activeData);
          this.$emit("activeLayer", {
            data: this.activeData,
            type:"levelLayer",
            layerData:this.layerData
          });
          window.openlevel=true;
        },
        deep:true

      },
      levelstep:{
        handler(newvalue,oldvalue){
          if(!window.initMyData){
            return;
          }
          window.step=newvalue;
          this.levelstep=newvalue;
          this.activeData.levelstep=newvalue;
          // this.$emit("gradientColor",
          //   "#616DA0",
          //   "#9EA929",
          //   window.step,
          //   2
          // );
          this.activeData["gradeNum"] = newvalue;
          this.resetLevelData();
        }
      },
      lightSignColor:{
        handler(newvalue,oldvalue){
          if(!window.initMyData){
            return;
          }
          this.activeData["lightSignColor"] = newvalue;
          this.$refs.draggable.upDateActiveData(this.activeData);
          this.$emit("activeLayer", {
            data: this.activeData,
            type:"lightLayer",
            layerData:this.layerData
          });
        }
      },
      lightFloodColor:{
        handler(newvalue,oldvalue){
          if(!window.initMyData){
            return;
          }
          this.activeData["lightFloodColor"] = newvalue;
          this.$refs.draggable.upDateActiveData(this.activeData);
          this.$emit("activeLayer", {
            data: this.activeData,
            type:"lightLayer",
            layerData:this.layerData
          });
        }
      },
      lightSignSize:{
        handler(newvalue,oldvalue){
          if(!window.initMyData){
            return;
          }
          this.activeData["lightSignSize"] = newvalue;
          this.$refs.draggable.upDateActiveData(this.activeData);
          this.$emit("activeLayer", {
            data: this.activeData,
            type:"lightLayer",
            layerData:this.layerData
          });
        }
      },
      lightFloodSize:{
        handler(newvalue,oldvalue){
          if(!window.initMyData){
            return;
          }
          this.activeData["lightFloodSize"] = newvalue;
          this.$refs.draggable.upDateActiveData(this.activeData);
          this.$emit("activeLayer", {
            data: this.activeData,
            type:"lightLayer",
            layerData:this.layerData
          });
        }
      },
    },
    methods: {
      // 点击上传数据
      dia() {
        this.$refs.load.table([this.dialogVisible = true, this.yitis = true, this.wk = true, this.onups = false, this.chucuo = true]);
        /*  this.dialogVisible = true;
          this.yitis = true;
          this.wk = true;
          this.onups = false;
          this.chucuo = true;*/
      },
      // 接收子组件的传值
      closeAll() {
        this.getMyDataList(); //刷新数据
      },
      /*03-29*/
      //表情接口
      getMyIcons() {
        getMyIcons().then(res => {
          this.getMy = res.data;
          console.log(res.data, '我是图标')
        })
      },
      /*....*/

      clickimg(index,dat){
        console.info(index);
        console.info(dat);
        for(var i=0;i<this.typeValueSizeColor.length;i++){
          if(this.typeValueSizeColor[i].name==window.curname){
            this.typeValueSizeColor[i].url=this.initImg(dat);
            window.typelayerDataParam[window.curname].url=this.initImg(dat);
            return
          }
        }

      },
      clickexp(name){
        window.curname=name;
        console.info(name);
        this.exp=!this.exp;
      },
      // 图标上传
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      // 上传成功
      handleSuccess(res) {
        this.uploadbut = true;
        this.fileId = res.data[0].fileId;
        this.fileUrl = res.data[0].fileUrl;
      },
      // 保存表情
      Saveexpression(){
        let data = {
          "fileId": this.fileId,
          "fileUrl": this.fileUrl,
        };
        baocuns(data).then(res => {
          if(res.status === 200 || res.status === '200'){
            this.uploadbut = false;
            this.$refs.uploads.clearFiles();
            // 接口刷新
            this.$message({
              message: '上传成功',
              type: 'success'
            });
          }else{
            this.uploadbut = false;
            this.$refs.uploads.clearFiles();
            this.$message({
              message: res.message,
              type: 'error'
            });
          }
        })
      },
      // 取消保存表情
      closebaocun(){
        this.fileId = '',
          this.fileUrl = '',
          this.uploadbut = false;
        this.$refs.uploads.clearFiles();
      },
      selectPolymerizCondition(polymerizCondition) {
        this.activeData["polymerizQeuery"] = polymerizCondition;
        this.$refs.draggable.upDateActiveData(this.activeData);
        this.$emit("activeLayer", {
          data: this.activeData,
          layerData:this.layerData,
          type:this.typeName
        });
      },
      selectPolymerizLevel(polymerizLevel) {
        this.activeData["polymerizLevel"] = polymerizLevel;
        this.$refs.draggable.upDateActiveData(this.activeData);
        this.$emit("activeLayer", {
          data: this.activeData,
          layerData:this.layerData,
          type:this.typeName
        });
      },
      selectTemperatureCondition(temperatureCondition) {
        this.activeData["temperatureQeuery"] = temperatureCondition;
        this.$refs.draggable.upDateActiveData(this.activeData);
        this.$emit("activeLayer", {
          data: this.activeData,
          layerData:this.layerData,
          type:this.typeName
        });
      },
      selectTemperatureLevel(temperatureLevel) {
        this.activeData["temperatureLevel"] = temperatureLevel;
        this.$refs.draggable.upDateActiveData(this.activeData);
        this.$emit("activeLayer", {
          data: this.activeData,
          layerData:this.layerData,
          type:this.typeName
        });
      },
      // 选择数据条数的时候调用
      handleSizeChange(val) {
        this.pageSize = val;
        this.getMyDataList();
      },
      // 点击第几页时调用函数
      handleCurrentChange(val) {
        this.allSelectList['' + this.pageNumber] = this.multipleSelection;
        this.pageNumber = val;
        this.getMyDataList();
      },
      handleClick(tab, event) {},
      save() {
        this.saveVisible = true;
      },
      toSave() {
        if (!this.allData.planName) {
          this.$notify.error({
            title: "错误",
            message: "方案名称不可为空"
          });
          return false;
        }
        this.allData.layerPlanList = this.$refs.draggable.getData();
        for (var i = 0; i < this.allData.layerPlanList.length; i++) {
          this.allData.layerPlanList[0].fileFields = "";
          if(this.allData.layerPlanList[0].finallyType=="levelLayer"){
            this.allData.layerPlanList[0].theme=2;
          }else if(this.allData.layerPlanList[0].finallyType=="typeLayer"){
            this.allData.layerPlanList[0].theme=3;
          }else if(this.allData.layerPlanList[0].finallyType=="lightLayer"){
            this.allData.layerPlanList[0].theme=4;
          }else if(this.allData.layerPlanList[0].finallyType=="polymerizeLayer"){
            this.allData.layerPlanList[0].theme=5;
          }else if(this.allData.layerPlanList[0].finallyType=="temperatureLayer"){
            this.allData.layerPlanList[0].theme=6;
          }else{
            this.allData.layerPlanList[0].theme=1;
          }
        }
        console.log(this.allData, 'this.allDatathis.allData')
        let add = this.allData.planName
        checkPlanName(add).then(res => {
          if (res.repeat) {
            this.open2()
          } else {
            this.auau();
          }
        });

      },
      // 走的保存接口
      auau() {

        addPlanData(this.allData).then(res => {
          this.$message({
            message: '保存成功,请在我的方案中查看!',
            type: 'success'
          });
          this.saveVisible = false;
        });
      },
      // 提示用户重复添加了是否还要添加
      open2() {
        this.$confirm('这个名字已经有了,是否重复添加', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        }).then(() => {
          this.auau();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取保存'
          });
        });
      },
      reOrderLayer(data){
        _this=this;
        for(let i=0;i<data.length;i++){
          getLayerData(
          data[i].layerUrl.split(":8080")[1]
        ).then(layerData => {
          _this.layerData = layerData;
          // this.resettypeData();
          _this.$emit("activeLayer", {
            data: data[i],
            type:data[i].finallyType,
            layerData:layerData
          });

        });
        }
      },
      activeFunc(data) {
        window.initMyData=false;
        this.typeCondition = [];
        this.polymerizQeuery = "";
        this.polymerizLevel = "";
        this.temperatureQeuery = "";
        this.temperatureLevel = "";
        var count = 0;
        var _this=this;
        this.activeData = JSON.parse(JSON.stringify(data));
        if (this.activeData.fileFields) {
          window.ifdatafenji=true;
          if(typeof(this.activeData.fileFields)=="string"){
            this.activeData.fileFields = JSON.parse(this.activeData.fileFields);
          }else{
            console.info("已经是数组了");
          }

          this.activeData.fileFields.forEach((item, i) => {
            if(typeof(item.contentValue)=="string"){
              this.activeData.fileFields[i].contentValue = item.contentValue.split(
                ","
              );
            }

            if(item.isNum === "1") {
              // 如果isNum=1 为数值类型那么就将其加入到热力图和散点图的下拉列表中
              this.typeCondition.push({id:count,name:item.contentName});
              count ++;
            }
          });

          //等级符号
          this.options=new Array();
          this.typeoptions=new Array();

          for(var i=0;i<this.activeData.fileFields.length;i++){

            if(this.activeData.fileFields[i].isNum=="1"){
              this.options.push({
                label:this.activeData.fileFields[i].contentName,
                value:this.activeData.fileFields[i].contentName,
              });

            }else{//类型
              this.typeoptions.push({
                label:this.activeData.fileFields[i].contentName,
                value:this.activeData.fileFields[i].contentName,
              });
            }
          }
          if(this.activeData.gradeField){
            this.leveldataselect=this.activeData.gradeField;
            window.leveldataselectfield=this.leveldataselect;
            window.step=this.activeData.gradeNum;
            this.levelstep=this.activeData.gradeNum;
            this.leveldata=JSON.parse(this.activeData.gradeRangeName);
            this.gradeBorderColor=this.activeData.gradeBorderColor;
            this.gradeBorderWidth=this.activeData.gradeBorderWidth;
            window.leveldata=this.leveldata;
            window.gradientlevel=new Array();
            for(var i=0;i<this.leveldata.length;i++){
              window.gradientlevel.push(this.leveldata[i].color);
            }
            for(var i=0;i<this.activeData.fileFields.length;i++){

              if(this.activeData.fileFields[i].contentName==this.leveldataselect){
                if(parseInt(this.activeData.fileFields[i].maxValue)>parseInt(this.activeData.fileFields[i].minValue)){
                  window.min=parseInt(this.activeData.fileFields[i].minValue) ;
                  window.max=parseInt(this.activeData.fileFields[i].maxValue);
                }else{
                  window.max=parseInt(this.activeData.fileFields[i].minValue) ;
                  window.min=parseInt(this.activeData.fileFields[i].maxValue);
                }

                break;

              }
            }
          }else{
            if(this.options.length>0){
              this.leveldataselect=this.options[0].value;
              this.activeData.gradeField=this.leveldataselect;
              // this.typeField=this.typeoptions[0].value;
              window.leveldataselectfield=this.leveldataselect;
              this.activeData.gradeNum=this.levelstep;
              window.step=this.levelstep;
              this.activeData.gradeBorderColor=this.gradeBorderColor;
              this.activeData.gradeBorderWidth=this.gradeBorderWidth;
              this.$emit("gradientColor",
                "#616DA0",
                "#9EA929",
                window.step,
                2
              );



              // window.openlevel=true;
              for(var i=0;i<this.activeData.fileFields.length;i++){

                if(this.activeData.fileFields[i].contentName==this.leveldataselect){
                  if(parseInt(this.activeData.fileFields[i].maxValue)>parseInt(this.activeData.fileFields[i].minValue)){
                    window.min=parseInt(this.activeData.fileFields[i].minValue) ;
                    window.max=parseInt(this.activeData.fileFields[i].maxValue);
                  }else{
                    window.max=parseInt(this.activeData.fileFields[i].minValue) ;
                    window.min=parseInt(this.activeData.fileFields[i].maxValue);
                  }

                  break;

                }
              }

              this.resetLevelData();
            }

          }
          window.typelayerDataParam={};
          if(this.activeData.typeField){
            this.typeValueSizeColor=JSON.parse(this.activeData.typeValueSizeColor);
            this.typeField=this.activeData.typeField;
            this.typeBorderColor=this.activeData.typeBorderColor;
            this.typeBorderWidth=this.activeData.typeBorderWidth;
            for(var i=0;i<this.typeValueSizeColor.length;i++){
              window.typelayerDataParam[this.typeValueSizeColor[i].name]={
                size:this.typeValueSizeColor[i].size,
                url:this.typeValueSizeColor[i].url,
                color:this.typeValueSizeColor[i].color
              }
            }
          }else{
            this.activeData.typeBorderColor=this.typeBorderColor;
            this.activeData.typeBorderWidth=this.typeBorderWidth;
            if(this.typeoptions.length<=0){
              this.typeField="";
            }else{
              this.typeField=this.typeoptions[0].value;
            }
            this.activeData.typeField=this.typeField;
            for(var i=0;i<this.activeData.fileFields.length;i++){
              if(this.activeData.fileFields[i].contentName==this.typeField){
                //this.activeData.fileFields[i].contentValue的最后是空
                for(var j=0;j<this.activeData.fileFields[i].contentValue.length-1;j++){
                  var color="rgb("+Math.random()*255+",100,100)";
                  this.typeValueSizeColor.push({
                    name:this.activeData.fileFields[i].contentValue[j],
                    size:5,
                    url:"",
                    color:color
                  });
                  window.typelayerDataParam[this.activeData.fileFields[i].contentValue[j]]={
                    size:5,
                    url:"",
                    color:color
                  }

                }
                this.typeValueSizeColor.push({
                  name:"others",
                  size:5,
                  url:"",
                  color:"#03044D"
                });
                window.typelayerDataParam["others"]={
                  size:5,
                  url:"",
                  color:"#03044D"
                }
                this.activeData["typeValueSizeColor"]=JSON.stringify(this.typeValueSizeColor);
                break;
              }

            }
          }
        }else{
          window.ifdatafenji=false;
          console.info("没有分级字段");
        }
        this.displayLevel = this.activeData.displayLevel
          ? this.activeData.displayLevel.split(",")
          : [0,18];
        this.transparency = this.activeData.transparency
          ? Number(this.activeData.transparency)
          : 100;
        this.iconId = this.activeData.iconId ? this.activeData.iconId : "1";
        this.iconColor = this.activeData.iconColor
          ? this.activeData.iconColor
          : "red";
        this.iconSize = this.activeData.iconSize
          ? this.activeData.iconSize
          : "12";
        this.borderStyle = this.activeData.borderStyle
          ? this.activeData.borderStyle
          : "solid";
        this.borderWidth = this.activeData.borderWidth
          ? this.activeData.borderWidth
          : "1";
        this.borderColor = this.activeData.borderColor
          ? this.activeData.borderColor
          : "red";
        this.fillColor = this.activeData.fillColor
          ? this.activeData.fillColor
          : "#B4B42D";
        this.lightSignColor = this.activeData.lightSignColor
          ? this.activeData.lightSignColor
          : "#B4B42D";
        this.lightSignSize = this.activeData.lightSignSize
          ? this.activeData.lightSignSize
          : 4;
        this.lightFloodColor = this.activeData.lightFloodColor
          ? this.activeData.lightFloodColor
          : "#242DD5";
        this.lightFloodSize = this.activeData.lightFloodSize
          ? this.activeData.lightFloodSize
          : 10;

        this.lightFlotypeFieldodSize = this.activeData.typeField
          ? this.activeData.typeField
          : "";
        this.typeBorderColor = this.activeData.typeBorderColor
          ? this.activeData.typeBorderColor
          : "red";
        this.typeBorderWidth = this.activeData.typeBorderWidth
          ? this.activeData.typeBorderWidth
          : 1;
        //  this.lightFloodSize = this.activeData.lightFloodSize
        // ? this.activeData.lightFloodSize
        // : 10;
        if(this.typeCondition.length > 0 ){
          this.polymerizQeuery =  this.activeData.polymerizQeuery
            ? this.activeData.polymerizQeuery
            : this.typeCondition[0].name;
          this.polymerizLevel = this.activeData.polymerizLevel
            ?this.activeData.polymerizLevel
            :this.levelCondition[0].name;
          this.temperatureQeuery = this.activeData.temperatureQeuery
            ? this.activeData.temperatureQeuery
            : this.typeCondition[0].name;
          this.temperatureLevel = this.activeData.temperatureLevel
            ? this.activeData.temperatureLevel
            : this.levelCondition[0].name;
        }else {
          // 热力图和散点图设置为不可点击状态（置灰）
        }

        this.activeData.polymerizQeuery = this.polymerizQeuery;
        this.activeData.polymerizLevel = this.polymerizLevel;
        this.activeData.temperatureQeuery =  this.temperatureQeuery;
        this.activeData.temperatureLevel =  this.temperatureLevel;

        //等级符号
        this.activeData.displayLevel = this.displayLevel;
        this.activeData.transparency = this.transparency;
        this.activeData.iconId = this.iconId;
        this.activeData.iconColor = this.iconColor;
        this.activeData.iconSize = this.iconSize;
        this.activeData.borderStyle = this.borderStyle;
        this.activeData.borderWidth = this.borderWidth;
        this.activeData.borderColor = this.borderColor;
        this.activeData.fillColor = this.fillColor;
        this.activeData.lightSignColor = this.lightSignColor;
        this.activeData.lightSignSize = this.lightSignSize;
        this.activeData.lightFloodColor = this.lightFloodColor;
        this.activeData.lightFloodSize = this.lightFloodSize;

        this.activeData.typeField = this.typeField;
        this.activeData.typeBorderColor = this.typeBorderColor;
        this.activeData.typeBorderWidth = this.typeBorderWidth;


        this.activeType = data.layerType;
        this.layerData = {};

        this.$refs.draggable.upDateActiveData(this.activeData);
        if(!window.deleteInit){
          getLayerData(
          data.layerUrl.split(":8080")[1]
        ).then(layerData => {
          _this.layerData = layerData;
          // this.resettypeData();
          if(_this.activeData.theme==2){
            _this.activeData.finallyType="levelLayer";
          }else if(_this.activeData.theme==3){
            _this.activeData.finallyType="typeLayer";
          }else if(_this.activeData.theme==4){
            _this.activeData.finallyType="lightLayer";
          }else if(_this.activeData.theme==5){
            _this.activeData.finallyType="polymerizeLayer";
          }else if(_this.activeData.theme==6){
            _this.activeData.finallyType="temperatureLayer";
          }else{
            _this.activeData.finallyType="commonLayer";
          }
          _this.$emit("activeLayer", {
            data: _this.activeData,
            type:_this.activeData.finallyType,
            layerData:_this.layerData
          });

        });
        }
      },
      //
      resettypeData(){
        this.typeValueSizeColor=new Array();
        for(var i=0;i<this.activeData.fileFields.length;i++){
          if(this.activeData.fileFields[i].contentName==this.typeField){
            for(var j=0;j<this.activeData.fileFields[i].contentValue.length-1;j++){
              let color="rgb("+Math.random()*255+",100,100)";
              let size=2;
              this.typeValueSizeColor.push({
                name:this.activeData.fileFields[i].contentValue[j],
                size:size,
                url:"",
                color:color
              });
              window.typelayerDataParam[this.activeData.fileFields[i].contentValue[j]]={
                size:size,
                url:"",
                color:color
              }

            }
            this.typeValueSizeColor.push({
              name:"others",
              size:2,
              url:"",
              color:"blue"
            });
            window.typelayerDataParam[this.activeData.fileFields[i].contentValue[j]]={
              size:2,
              url:"",
              color:"blue"
            }
          }}
      },
      //
      //默认分层数据填充ldm
      resetLevelData(){
        // if(this.activeData.gradeRangeName){

        // }else{
        this.$emit("gradientColor",
          "#616DA0",
          "#9EA929",
          window.step,
          2
        );
        this.leveldata=new Array();
        var duan=Math.round((window.max-window.min)/window.step);
        for(var i=0;i<window.step;i++){
          this.leveldata.push({
            start:window.min+duan*i,
            color:window.gradientlevel[i],
            end:window.min+duan*(i+1)
          });
        }
        window.leveldata=this.leveldata;
        this.activeData.gradeRangeName=JSON.stringify(this.leveldata);

        // }

      },
      //方案分层数据填充ldm
      resetLevelDataPlan(){
        this.leveldata=Json.parse(this.activeData.gradeRangeName);
        // var colorA=this.activeData["gradeBorderColor"].split(",");
        // var valueA=this.activeData["gradeRangeName"].split(",");

        // for(var i=0;i<this.activeData["gradeNum"];i++){
        //   this.leveldata.push({
        //     start:valueA[i].split("-")[0],
        //     color:colorA[i],
        //     end:valueA[i].split("-")[1]
        //   });
        // }
      },
      modalLis(data) {

        if(data=="默认符号"){
          this.$refs.draggable.upDateActiveData(this.activeData);
          window.openlevel=false;
          // this.$emit("activeLayer", {
          //   data: this.activeData,
          //   // type:"levelLayer",
          //   layerData:this.layerData
          // });
           this.activeData.finallyType="comoonLayer";
           this.activeData.theme=1;
          window.finallyType="commonLayer";

        }else  if(data=="等级符号"){
          this.$refs.draggable.upDateActiveData(this.activeData);
          if(!window.ifdatafenji){
            console.info("没有分级字段");
            return
          }
          window.openlevel=false;
          // this.$emit("activeLayer", {
          //   data: this.activeData,
          //   type:"levelLayer",
          //   layerData:this.layerData
          // });
          this.activeData.finallyType="levelLayer";
          this.activeData.theme=2;
          window.finallyType="levelLayer";
        }else if(data=="类型符号"){
          this.$refs.draggable.upDateActiveData(this.activeData);
          if(!window.ifdatafenji){
            console.info("没有分级字段");
            return
          }
          // this.$emit("activeLayer", {
          //   data: this.activeData,
          //   type:"typeLayer",
          //   layerData:this.layerData
          // });
          this.activeData.finallyType="typeLayer";
          this.activeData.theme=3;
          window.finallyType="typeLayer";
        }else if(data=="灯光图"){
          this.$refs.draggable.upDateActiveData(this.activeData);
          // this.$emit("activeLayer", {
          //   data: this.activeData,
          //   type:"lightLayer",
          //   layerData:this.layerData
          // });
          this.activeData.finallyType="lightLayer";
          this.activeData.theme=4;
          window.finallyType="lightLayer";
        }else if(data === "聚合图"){
          this.typeName = "polymerizeLayer"
          this.$refs.draggable.upDateActiveData(this.activeData);
          // this.$emit("activeLayer", {
          //   data: this.activeData,
          //   layerData:this.layerData,
          //   type:this.typeName
          //   /* typeCondition : this.polymerizQeuery,
          //    levelCondition : this.polymerizLevel*/
          // });
          this.activeData.theme=5;
          this.activeData.finallyType="polymerizeLayer";
          window.finallyType="polymerizeLayer";
        }else if(data === "热度图"){
          this.typeName = "temperatureLayer";
          this.$refs.draggable.upDateActiveData(this.activeData);
          this.activeData.theme=6;
          this.activeData.finallyType="temperatureLayer";
          window.finallyType="temperatureLayer";
        }else {

        }
        if(!window.deleteInit){
          this.$emit("activeLayer", {
            data: this.activeData,
            layerData:this.layerData,
            type:this.activeData.finallyType
            /* typeCondition : this.temperatureQeuery,
             levelCondition : this.temperatureLevel*/
          });
        }

        this.inits = data;
        this.$refs.modals.style.transform = "translateX(-105%)";
        this.$refs.caozuos.style.transform = "translateX(0%)";
        window.initMyData=true;
      },
      clickMask(data) {
        console.log(data);
        this.opc = data;
      },
      Return() {
        this.$refs.modals.style.transform = "translateX(-0%)";
        this.$refs.caozuos.style.transform = "translateX(105%)";
      },
      formatTooltip(val) {
        return val / 100;
      },
      // 点击确定
      handleClose(done) {
        this.$confirm("确认选择数据信息？")
          .then(() => {
            this.dialogVisibleFlag = false;
            var updateData = [];
            console.log(this.allSelectList);
            console.log(this.multipleSelection);
            // 保存/更新当前页面的勾选信息
            if(JSON.stringify(this.allSelectList) == "{}"){
              if(this.multipleSelection.length > 0) {
                this.allSelectList[this.pageNumber + ''] = this.multipleSelection;
              }
            }else {
              this.allSelectList[this.pageNumber + ''] = this.multipleSelection;
            }
            // 循环所有选中项，根据key循环对应array添加到右侧展示数据中
            if(JSON.stringify(this.allSelectList) != "{}"){
              for(let key in this.allSelectList){
                if(this.allSelectList[key].length > 0){
                  for(var i=0;i < this.allSelectList[key].length;i++){
                    updateData.push(this.allSelectList[key][i]);
                  }
                }
              }
            }
            console.log(this.allSelectList);
            console.log(updateData);
            // 将选中数据更新到右侧列表
            this.$refs.draggable.updateData(updateData);

          })
          .catch(_ => {});
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleSelection() {},
      // 获取数据列表
      getDataList() {
        this.dialogVisibleFlag = true;
        this.getMyDataList();
      },
      getMyDataList() {
        // 进入页面后先获取隐藏table表格数据列表信息，进行分页显示数据
        getMyData(this.pageNumber, this.pageSize).then(res => {
          if (res.status === 200 || res.status === "200") {
            if (res.data.rows.length > 0) {
              this.total = res.data.total;
              this.tableData = res.data.rows;
              let _this = this;
              if(this.allSelectList.hasOwnProperty((this.pageNumber + ''))) {
                _this.$nextTick(() => {
                  // 因为返回的数据有数据差异vue自带bug
                  // 所以，循环tableData数据，匹配当前页面是否有选中的对象，如果有特换当前选中数据
                  var tempArrs = _this.allSelectList[_this.pageNumber];
                  var sameArrs = [];
                  for(var i = 0; i < _this.tableData.length; i++){
                    for(var j = 0; j < tempArrs.length; j++){
                      if(_this.tableData[i].pkId == tempArrs[j].pkId){
                        sameArrs.push(_this.tableData[i]);
                      }
                    }
                  }
                  _this.allSelectList[_this.pageNumber + ''] = sameArrs;
                  _this.allSelectList[_this.pageNumber + ''].forEach(row => {
                    _this.$refs.multipleTable.toggleRowSelection(row, true);
                  });
                });
              }
              // 将数据列表中的数据进行格式化处理，只取更新时间的年月日信息
              for (var i = 0; i < this.tableData.length; i++) {
                var time = this.tableData[i].updTime;
                this.tableData[i].updTime = time.substring(0, 10);
                if(this.tableData[i].dataSourceType==1){
                  this.tableData[i].dataSourceTypeDes="已申请";
                }else{
                  this.tableData[i].dataSourceTypeDes="本地导入";
                }
              }
            } else {
              this.tableData = [];
            }
          }
        });

      }
    },
    computed: {
      ...mapGetters(["planId","dataId"])
    }
  };
</script>

<style lang="less" scoped>
  .modalTable {
    width: 100%;
    height: 100%;
    .Selection-operation {
      width: 95%;
      margin-left: 2.5%;
      margin-top: 10px;
      border: 1px solid #ccc;
      .click-button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 40px;
        cursor: pointer;
        img {
          width: 20px !important;
          height: 20px !important;
        }
        span {
          font-size: 15px;
          margin-left: 12px;
          font-weight: bold;
          color: white;
        }
      }
    }
    .modalTable-top {
      width: 100%;
      height: 70%;
      border-bottom: 1px solid #ccc;
      .modalTable-top-one {
        width: 90%;
        margin-left: 5%;
        .modalTable-lis {
          width: 82px;
          margin: 5px;
          float: left;
          cursor: pointer;
          .img-icon {
            height: 60px;
            background-repeat: no-repeat;
            background-color: #eee;
            border: 1px solid #e2e2e2;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .img-tip {
            font-size: 12px;
            padding-top: 6px;
            height: 28px;
            color: #fff;
            background-color: #aaa;
            text-align: center;
          }
        }
        .modalTable-lis:hover .img-tip {
          background-color: #397ea8;
        }
        .modalTable-lis.active .img-tip {
          background-color: #397ea8;
        }
        .modalTable-lis:hover .img-icon {
          border-color: #397ea8;
        }
        .modalTable-lis.active .img-icon {
          border-color: #397ea8;
        }
      }
    }
    .modalTable-content {
      width: 100%;
      height: 15%;
      border-bottom: 1px solid #ccc;
      span {
        width: 20%;
        height: 100%;
        display: inline-block;
        line-height: 43px;
        font-size: 13px;
        color: #fff;
        margin-left: 20px;
        float: left;
      }
      .block {
        float: left;
        width: 45%;
        margin-left: 5%;
      }
    }
    .modalTable-bottom {
      width: 100%;
      height: 15%;
      span {
        width: 20%;
        height: 100%;
        display: inline-block;
        line-height: 43px;
        font-size: 13px;
        color: #fff;
        margin-left: 20px;
        float: left;
      }
      .block {
        float: left;
        width: 45%;
        margin-left: 5%;
      }
    }
    .caozuo-right {
      width: 95%;
      margin-left: 2.5%;
      border: 1px solid #ccc;
      height: 90%;
      transform: translateX(105%);
      transition: transform 0.35s ease;
      position: absolute;
      p {
        width: 100%;
        height: 15%;
      }
      .caozuo-right-bottom {
        width: 85%;
        margin-left: 5%;
        height: 100%;
      }
    }
  }

  .block-cont {
    width: 20%;
    height: 100%;
    float: left;
    color: #fff;
    font-size: 15px;
    text-align: center;
    line-height: 37px;
    text-indent: 13px;
  }
</style>
<style lang="less">
  .modalTable .el-dialog__body {
    padding-top: 0;
    padding-left: 0;
    padding-right: 0;

    .dialog-div {
      margin-left: 5%;
    }
    .table-div {
      margin-left: 5%;
    }
  }

  .modalTable .element .el-dialog__header {
    padding-top: 10px;
  }

  .modalTable .element .el-dialog__headerbtn {
    visibility: hidden;
  }

  .modalTable .element .el-dialog__header {
    background: #54b9bd;
  }

  .modalTable .el-dialog__title {
    font-size: 17px;
    font-weight: bold;
    color: white;
  }

  #addData .cell {
    text-align: center;
  }

  #CloudRight thead .has-gutter {
    background: #303030 !important;
  }

  .control-btn {
    width: 16px;
    height: 19px;
    border: 1px dashed #969896;
  }

  .caozuo-right .el-button--mini {
    margin: 5px;
    padding: 3px 13px;
  }

  .el-dialog__body {
    text-align:center;
    padding-bottom: 0px;
    .planInput{
      width: 60%;
    }
  }

  .el-dialog__footer {
    text-align:center;
    width: 90%;
    margin-left: 5%;
    padding-top: 20px;
    padding-left: 0px;
    padding-right: 0px;
  }

  .pagination {
    display: flex;
  }

  .modalTable .el-pagination {
    width: 100%;
    text-align: left;
  }

  .div-button {
    width: 25%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .el-pager li {
    min-width: 25px;
  }
  .leveldataselect{
    width:50%;
  }
  .leveldataselecttag{
    width:20%;
  }
  .quyunum {
    width: 37%;
  }
  .levelstep{
    width:50%
  }
  .levelsteptag{
    width:20%
  }
  /*图标管理*/
  .Expression {
    font-family: "Helvetica Neue";
    padding: 7px 0 7px 0;
    width: 300px;
    height: 600px;
    background: #fff;
    position: absolute;
    transform: translateX(-100%);
    transition: transform 0.35s ease;
    z-index: 1;
    .Expression-div {
      padding: 9px 8px;
      p {
        width: 100%;
        height: 30px;
        font-size: 15px;
        line-height: 30px;
        background: #3c657e;
        color: #fff;
        text-indent: 5px;
        opacity: 0.5;
      }
      ul {
        height: 210px;
        width: 95%;
        li {
          list-style-type: none;
          cursor: pointer;
          width: 28px;
          height: 30px;
          margin-left: 10px;
          float: left;
          margin-top: 10px;
          img{
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .upload{
      p{
        width: 95%;
        height: 30px;
        line-height: 30px;
        background: #3c657e;
        color: #fff;
        margin: 0 auto;
        font-size: 15px;
        text-indent: 5px;
        opacity: 0.5;
      }
    }
  }
  .Expression-div .el-scrollbar__bar.is-vertical > div {
    display: none;
  }
  .upload .el-upload--picture-card {
    background-color: #fbfdff;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 80px;
    height: 80px;
    line-height: 80px;
    vertical-align: top;
    margin-left: 10px;
    margin-top: 10px;
  }
  .upload .el-upload-list--picture-card .el-upload-list__item{
    width: 80px;
    height: 80px;
  }
  .upload .el-upload-list--picture-card .el-upload-list__item{
    margin-left: 10px;
    margin-top: 10px;
  }
  .upload-but .el-button--primary{
    border-radius: 4px 4px 4px 4px;
  }
  .upload-but .el-button--mini, .el-button--mini.is-round{
    padding: 7px 10px;
  }
  .upload-but .el-button+.el-button{
    margin-left: 5px;
  }
  .typemodalTable-lisimgdiv img{
    width:26px;
    height: 26px;
  }
  .typeFieldtag{
    display:inline-block;
    width: 48%;
    line-height:40px;
    float: left;
    text-align: center;
    font-size: 14px;
    color: white;

  }
  .typeField{
    width:48%;
    text-align:center;
  }
  .typesteptag{
    display:inline-block;
    width: 48%;
    float: left;
    line-height:40px;
    text-align: center;
    font-size: 14px;
    color: white;

  }
  .clear{
    clear: both;
  }
  .typeBorderWidth{
    width:48%;
  }
  .typemodalTable-lisimgdiv{
    left: 10%;
    float: left;
    position: relative;
  }
  .typemodalTable-li1{
    position: relative;
    left:10%;
    float: left;
  }
  .typemodalTable-li2{

    width:8%;
    float: left;
    margin-left:12%
  }
  .typemodalTable-li3{
    width:20%;
    left: 20%;
    float: left;
    position: relative;
  }
  .typemodalTable-li4{
    width:25%;
    float: left;
    left: 20%;
    position: relative;
  }
  .gogo .el-input__inner {
    width: 100%;

  }

  .v-modal {
    display: block;
  }
  .el-color-picker__trigger{
    width:26px;
    height:26px;
  }
</style>
