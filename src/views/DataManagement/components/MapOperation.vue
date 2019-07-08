<template>
  <div id="MapOperation">

    <header>
      <el-row :gutter="20">
        <el-col :span="10" :offset="0">
          <div class="laoyutou">
            <el-row :gutter="10">
              <el-col :span="2">
                <div class="grid-content act" @click="Returning">
                  <span><img :src="Return" alt=""></span>
                </div>
              </el-col>
              <el-col :span="11">
                <div class="grid-content">
                  <el-select v-model="omging" placeholder="选择查看方式">
                    <el-option
                      v-for="item in omgs"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </el-col>
              <el-col :span="11">
                <div class="grid-content ">
                  <el-select v-model="values" clearable placeholder="数据查看版本选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="2" :offset="12">
          <div class="laoyutous" style="text-align: center;line-height: 0.4rem;cursor: pointer" @click="increases"><img
            :src="increase"
            alt=""></div>
          <div class="laoyutous" style="text-align: center;line-height: 0.4rem;cursor: pointer"><img :src="dowonLoad"
                                                                                                     alt=""></div>
        </el-col>
      </el-row>
    </header>
    <div v-show="maping" id="CloudChart">
      <div class="CloudChart-switch">
        <el-switch
          v-model="switchs"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
      </div>
    </div>
    <div v-show="chart" id="main">
      <main>
        <!--<el-table :data="tableData.data" style="width: 100%;margin-top:12px;">
          <el-table-column :label="init" align="center" width="160px" height="30px" font-size="12px"
                           v-for="init in tableData.fields">
            <template slot-scope="scope">
              <span>{{scope.row[init]}}</span>
            </template>
          </el-table-column>
        </el-table>-->

        <el-table
          v-loading="loading"
          element-loading-text="加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          :data="tableData.data" style="width: 100%;margin-top:12px;min-width:100%;" :height="tableDataheight">
          <el-table-column :label="init" align="center" width="160px" height="30px" font-size="12px"
                           v-for="(init,index) in tableData.fields" :key="index">
            <template slot-scope="scope">
              <span :title="scope.row[init]" style="overflow: hidden">{{scope.row[init]}}</span>
            </template>
          </el-table-column>
          <el-table-column label="数据操作" align="center" fixed="right" width="205px">
            <template slot-scope="scope">
              <div style="width: 58%;height: 0.3rem;margin-left: 42%">
                <el-row :gutter="10">
                  <el-col :span="8">
                    <div class="imgdiv" style="margin-right: 0.1rem" title="编辑与测试"
                         @click="registers(scope.$index, scope.row)"><img :src="register"
                                                                          alt=""></div>
                  </el-col>
                  <el-col :span="8">
                    <div class="imgdiv" title="移入回收站"
                         @click="handleDelete(scope.$index, scope.row)"><img :src="del" alt="">
                    </div>
                  </el-col>
                </el-row>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <!-- <el-table
           v-loading="loading"
           element-loading-text="加载中"
           element-loading-spinner="el-icon-loading"
           element-loading-background="rgba(0, 0, 0, 0.8)"
           highlight-current-row
           :data="tableData1"
           style="width: 100%;margin-top:12px;"
         >
           <el-table-column align="center" label="数据源类型">
             <template slot-scope="scope">
               <span :title="scope.row.dbType">{{scope.row.name}}</span>
             </template>
           </el-table-column>
           <el-table-column align="center" label="注册时间">
             <template slot-scope="scope">
               <span :title="scope.row.host">{{scope.row.name}}</span>
             </template>
           </el-table-column>
           <el-table-column align="center" label="注册用户">
             <template slot-scope="scope">
               <span :title="scope.row.loginUserId">{{scope.row.address}}</span>
             </template>
           </el-table-column>
           <el-table-column align="center" :label="haha">
             <template slot-scope="scope">
               <span :title="scope.row.passwd">{{scope.row.name}}</span>
             </template>
           </el-table-column>
           <el-table-column label="数据操作" align="center" width="400px" fixed="right">
             <template slot-scope="scope">
               <div style="width: 20%;height: 0.3rem;margin-left: 42%">
                 <el-row :gutter="20">
                   <el-col :span="9">
                     <div class="imgdiv" title="编辑与测试" @click="registers(scope.$index, scope.row)"><img :src="register"
                                                                                                        alt=""></div>
                   </el-col>
                   <el-col :span="9">
                     <div class="imgdiv" title="移入回收站" @click="handleDelete(scope.$index, scope.row)"><img :src="del"
                                                                                                           alt="">
                     </div>
                   </el-col>
                 </el-row>
               </div>
             </template>
           </el-table-column>
         </el-table>-->
        <!--<el-table
          :data="tableDatas"
          style="width: 100%"
          max-height="250">
          <el-table-column
            fixed
            prop="date"
            label="日期"
            width="150">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="120">
          </el-table-column>
          <el-table-column
            prop="province"
            label="省份"
            width="120">
          </el-table-column>
          <el-table-column
            prop="city"
            label="市区"
            width="120">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址"
            width="300">
          </el-table-column>
          <el-table-column
            prop="zip"
            label="邮编"
            width="120">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="120">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteRow(scope.$index, tableData)"
                type="text"
                size="small">
                移除
              </el-button>
            </template>
          </el-table-column>
        </el-table>-->
        <div id="paginations">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            background
            :current-page.sync="listQuery.page"
            :page-sizes="[10,20,30,50]"
            :page-size="listQuery.pageSize"
            :total="total"
            layout="total, sizes, prev, pager, next, jumper"
            style="margin-top:0px;"
          ></el-pagination>
        </div>
      </main>
    </div>
    <el-dialog
      :title="omldgg"
      :visible.sync="dialog"
      :modal-append-to-body='false'
      width="6rem"
      :before-close="handleClose">
      <!--<div class="dialogMain">-->
      <div class="loding" v-if="lodings">
        <div id="loading-center-absolute">
          <div class="object" id="object_one"></div>
          <div class="object" id="object_two"></div>
          <div class="object" id="object_three"></div>
          <div class="object" id="object_four"></div>
        </div>
      </div>
      <div style="height: 400px;">
        <el-scrollbar style="height: 100%; width: 101%;">
          <el-form :inline="true" size="mini" label-position='left'
                   label-width="1.3rem"
                   class="demo-ruleForm demo-form-inline">
            <el-col class="line" :span="24">
              <el-form-item v-show="index == pk ? false : true " :label="index + ':' " prop="Code" v-for="(init,index) in inps" :key="index">
                <el-input  class="type" v-model="inps[index]" :placeholder=" '请添加' + index "
                          @change="getObj(inps)"></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </el-scrollbar>
      </div>
      <!--</div>-->

      <span slot="footer" class="dialog-footer" style="margin-top:20px;">
        <el-button @click="close"
                   style="margin-top:20px;background-color: #021132; border:1px solid #F23030;color:#F23030">取 消</el-button>
        <el-button type="primary" @click="dias()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {mapState, mapMutations, mapActions} from 'vuex'
  import {
    optldm,
    getDataByname,
    tableing,
    previews,
    visualization,
    delect,
    getColumnNameAndPk,
    insertData,
    updateData
  } from '@/api/ConfigurationManagement/UserLoginLog';
  import 'leaflet';
  import 'leaflet/dist/leaflet.css';
  import {
    Gaode,
    normalm3,
    baseLayers
  } from "@/assets/leaflet.ChineseTmsProviders.js";

  export default {
    data() {
      return {
        dataId: '',
        omldgg:'数据源注册',
        active:true,
        tableDataheight: '5.5rem',
        switchs: false,
        chart: false,
        maping: true,
        omging: '',
        pk: null,
        loading: true,
        lodings:true,
        dialog: false,
        inps: [],
        skd: [],
        // loadingss:false,
        haha: '工作状态',
        dowonLoad: require("@/icon/icon/dowonLoad.png"),
        increase: require("@/icon/icon/increase.png"),
        Return: require("@/icon/icon/Return.png"),
        register: require("@/icon/icon/register.png"),
        backups: require("@/icon/icon/backups.png"),
        del: require("@/icon/icon/del.png"),
        omgs: [{
          value: '选项1',
          label: '列表'
        },
          {
            value: '选项2',
            label: '可视化'
          }
        ],
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        tableDatas: [{
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-08',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-06',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-07',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }],
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
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        values: '',
        listQuery: {
          page: 1,
          pageSize: 10,
        },
        ruleForm: {
          omg: '',
          oks: ''
        },
        total: null,
        maps: null,
        auto: null,
        laoyutou: null,
        autos: '3.9',
        tableData: [],
        normalm: {
          one: '',
          two: '',
          three: '',
          four: ''
        }
      };

    },

    methods: {
      ...mapActions(['getInfo']),
      omg() {
        let that = this;
        var normalm1 = L.tileLayer.chinaProvider("Geoq.Normal.Map", {
          maxZoom: 18,
          minZoom: 2
        });
        var normalm2 = L.tileLayer.chinaProvider("Geoq.Normal.Color", {
          maxZoom: 18,
          minZoom: 2
        });
        this.normalm.one = L.tileLayer.chinaProvider("Geoq.Normal.PurplishBlue", {
          maxZoom: 18,
          minZoom: 2
        });
        var normalm4 = L.tileLayer.chinaProvider("Geoq.Normal.Gray", {
          maxZoom: 18,
          minZoom: 2
        });
        var normalm5 = L.tileLayer.chinaProvider("Geoq.Normal.Warm", {
          maxZoom: 18,
          minZoom: 2
        });
        var normalm6 = L.tileLayer.chinaProvider("Geoq.Normal.Cold", {
          maxZoom: 18,
          minZoom: 2
        });
        /**
         * 天地图内容
         */
        var normalm = L.tileLayer.chinaProvider("TianDiTu.Normal.Map", {
            maxZoom: 18,
            minZoom: 2
          }),
          normala = L.tileLayer.chinaProvider("TianDiTu.Normal.Annotion", {
            maxZoom: 18,
            minZoom: 2
          }),
          imgm = L.tileLayer.chinaProvider("TianDiTu.Satellite.Map", {
            maxZoom: 18,
            minZoom: 2
          }),
          imga = L.tileLayer.chinaProvider("TianDiTu.Satellite.Annotion", {
            maxZoom: 18,
            minZoom: 2
          });

        var normal = L.layerGroup([normalm, normala]),
          image = L.layerGroup([imgm, imga]);
        /**
         * 谷歌
         */
        var normalMap = L.tileLayer.chinaProvider("Google.Normal.Map", {
            maxZoom: 18,
            minZoom: 2
          }),
          satelliteMap = L.tileLayer.chinaProvider("Google.Satellite.Map", {
            maxZoom: 18,
            minZoom: 2
          });
        /**
         * 高德地图
         */
        this.normalm.two = L.tileLayer.chinaProvider("GaoDe.Normal.Map", {
          maxZoom: 18,
          minZoom: 2
        });
        var Gaodimgem = L.tileLayer.chinaProvider("GaoDe.Satellite.Map", {
          maxZoom: 18,
          minZoom: 2
        });
        var Gaodimga = L.tileLayer.chinaProvider("GaoDe.Satellite.Annotion", {
          maxZoom: 18,
          minZoom: 2
        });
        var Gaodimage = L.layerGroup([Gaodimgem, Gaodimga]);
        var baseLayers = {
          智图地图: normalm1,
          // 智图多彩: normalm2,
          智图午夜蓝: this.normalm.one,
          智图灰色: normalm4,
          智图暖色: normalm5,
          // 智图冷色: normalm6,
          // 天地图: normal,
          // 天地图影像: image,
          谷歌地图: normalMap,
          谷歌影像: satelliteMap,
          高德影像: Gaodimage,
          高德地图: this.normalm.two
        };
        this.laoyutou = this.normalm.two;
        var overlayLayers = {};
      },
      map() {
        /*getMyIcons().then(res=>{
          console.info(res);
        })*/
        this.maps = L.map("CloudChart", {
          // renderer: L.canvas(),
          center: [29.59, 105.29],
          zoom: this.autos,
          layers: this.laoyutou,
          // maxZoom: 15,
          // minZoom:1,
          // maxBounds:[[84.95930495623836,1028.3203125000002],[-67.06743335108298,605.0390625000001]],
          zoomControl: false
        });
        // L.circle([38.59, 102.29], {radius: 200, color: "red"}).addTo(window.map);
        getDataByname().then(data => {
          console.log(data.features, '握手数据2');
          L.geoJson(data.features, {
            pointToLayer: function (geoJsonPoint, latlng) {
              return L.circleMarker(latlng, {
                color: "blue",
                fillColor: "blue",
                fillOpacity: 1,
                // opacity: data.data.transparency / 100,
                weight: 1,
                // weight:(Math.random()*5+2)*10,
                radius: 5
              });
            }

          }).addTo(this.maps).bindPopup(gpolygonpopup);

          /* var popup = L.popup();

          function onMapClick(e) {
            popup
              .setLatLng(e.latlng)
              .setContent("选择坐标为 " + e.latlng.toString())
              .openOn(window.map);
          }

          window.map.on('click', onMapClick);*/
        });
        visualization().then(data => {
          console.log(data.features, '握手数据3');
          function gpolygonpopup(geoJsonPoint){
            let pouphtml = "";
            if (geoJsonPoint.feature.properties) {
              let listr = "";
              for (let geoone in geoJsonPoint.feature.properties) {
                listr += "<li>" + geoone + ": " + geoJsonPoint.feature.properties[geoone] + "</li>";
              }
              pouphtml = '<div class="visualpopup"><ul class="nav nav-tabs"><li class="popupattrs active" data-toggle="tooltip"><a href="#popupattrs" data-toggle="tab">基本信息</a></li></ul><div class="tab-content"><!--属性区--><div class="tab-pane popupattrs active" id="popupattrs"><div dojoattachpoint="attrsArea" class="attrs-area"><ul>' + listr + '</ul></div></div></ul></div></div>';
            }
            return pouphtml
          };
          let get = L.geoJson(data.features, {
            pointToLayer: function (geoJsonPoint, latlng) {
              return L.circleMarker(latlng, {
                color: "red",
                fillColor: "red",
                fillOpacity: 1,
                // opacity: data.data.transparency / 100,
                weight: 1,
                // weight:(Math.random()*5+2)*10,
                radius: 5
              });
            }

          }).addTo(this.maps).bindPopup(gpolygonpopup);
          this.maps.fitBounds(get.getBounds());
          /* var popup = L.popup();

          function onMapClick(e) {
            popup
              .setLatLng(e.latlng)
              .setContent("选择坐标为 " + e.latlng.toString())
              .openOn(window.map);
          }

          window.map.on('click', onMapClick);*/
        });
        /*var marker = L.marker([38.59, 105.29]).addTo(window.map);
        var circle = L.circle([40.59, 108.29], {
          color: 'yellow',
          fillColor: '#64ff2b',
          fillOpacity: 5,
          radius: 500
        }).addTo(window.map);*/
        /*optldm().then(data =>{
          console.log(data,'握手数据2');
          let pouphtml='<div class="visualpopup">你好我是刘德华</div>';
          L.geoJson(data.features, {
            pointToLayer: function(geoJsonPoint, latlng) {
              return L.circleMarker(latlng, {
                color:"yellow",
                fillColor: "yellow",
                fillOpacity:1,
                // opacity: data.data.transparency / 100,
                weight: 1,
                // weight:(Math.random()*5+2)*10,
                radius:5
              })
            }
          }).addTo(window.map);
        })*/
        /*     L.control.zoom({
          zoomInTitle:"放大",
          zoomOutTitle:"缩小"
        }).addTo(window.map);
        L.control.layers(baseLayers, overlayLayers).addTo(window.map);*/

      },
      // 点击弹框
  /*    gpolygonpopup(geoJsonPoint){
    let pouphtml="";
    if(geoJsonPoint.feature.properties){
      let listr="";
      for(let geoone in geoJsonPoint.feature.properties){
        listr+="<li>"+geoone+": "+geoJsonPoint.feature.properties[geoone]+"</li>";
      }
      pouphtml='<div class="visualpopup"><ul class="nav nav-tabs"><li class="popupattrs active" data-toggle="tooltip"><a href="#popupattrs" data-toggle="tab">基本信息</a></li></ul><div class="tab-content"><!--属性区--><div class="tab-pane popupattrs active" id="popupattrs"><div dojoattachpoint="attrsArea" class="attrs-area"><ul>'+listr+'</ul></div></div></ul></div></div>';
    }
    return pouphtml
  },*/
      CircleDrawing() {
        // 画圆
        let map = this.maps;
        var r = 0
        var i = null
        var tempCircle = new L.circle();
        if (this.switchs) {
          map.dragging.disable(); //将mousemove事件移动地图禁用
          map.on('mousedown', onmouseDown);
          map.on('mouseup', onmouseUp);
          map.on('mousemove', onMove);
        }
        if (!this.switchs) {
          map.detachEvent('mousedown', onmouseDown);
          map.detachEvent('mouseup', onmouseUp);
          map.detachEvent('mousemove', onMove);
        }

        function onmouseDown(e) {
          i = e.latlng
          //确定圆心
        }

        function onMove(e) {
          // console.log(e,'nomove')
          if (i) {
            r = L.latLng(e.latlng).distanceTo(i)
            tempCircle.setLatLng(i);
            tempCircle.setRadius(r);
            tempCircle.setStyle({
              // color: '#ff0000',
              color: '#ff0000',
              fillColor: '#8d97ff',
              fillOpacity: 0.5
            });
            map.addLayer(tempCircle)
          }
        }

        function onmouseUp(e) {
          console.log(e)
          r = L.latLng(e.latlng).distanceTo(i); //计算半径
          if (this.auto) {
            this.auto.remove();
          }

          this.auto = L.circle(i, {
            radius: r,
            color: '#ff0000',
            fillColor: '#8d97ff',
            fillOpacity: 0.5
          }).addTo(map);
          console.log('圆心坐标为：' + i + ';半径为：' + r);
          i = null;
          r = 0;
          // map.dragging.enable();
        }
      },

      Returning() {
        this.$router.push({
          path: '/DataManagement'
        })
      },
      registers(index, data) {
        this.omldgg = '数据源编辑';
        this.dialog = true;
        this.inps = data;
        this.lodings = false;
      /*  let ddd = data.shift();
        console.log(ddd, 'nihao');*/
       /* this.$notify({
          title: '成功',
          message: data.name,
          type: 'success'
        });*/
      },
      handleDelete(index, data) {
        var keyMap = ['oks']
        /*var objs= Object.keys(data)[0].reduce((newData, key) => {
          let newKey = keyMap[key] || key
          newData[newKey] = data[key]
          return newData
        }, {})*/
        /* console.log(data[Object.keys(data)[0]],'hadjbadb');
           console.log(objs,'objs')
         // data.opt = '';
         console.log(data.oks);

         console.log(data.oks,'index');
         console.log(data.oks,'index');*/
        /* console.log(data.adaid,'this.pk');
         console.log(this.pk,'pkpkpk');*/
        // console.log(data.adaid);
        /*if(this.pk === data[i]){
            let datas = data[i];
            this.dataId = data[i].this.pk;
          }*/
        let query = {
          connectId: '2',
          dataId: data[Object.keys(data)[0]]
        };
        delect(query).then(res => {
          if (res.status === 200 || res.status === '200') {
            this.$notify({
              title: '成功',
              message: data.name,
              type: 'success'
            });
            this.table();
          }
        });
        console.log(data, 'nihao2');

      },
      handleSizeChange(val) {
        this.listQuery.pageSize = val;
        this.table();
      },
      handleCurrentChange(val) {
        this.listQuery.page = val;
        this.table();
      },
      table() {
        let data = {
          pageSize: this.listQuery.pageSize,
          page: this.listQuery.page,
          connectId: '2'
        };
        tableing(data).then(res => {
          console.log(res.data.count, 'lkasmmlk');
          if (res.status === 200 || res.status === '200') {
            this.loading = false;
            this.tableData = res.data;
            this.total = res.data.count;
            console.log(res.data, 'pk');
            this.pk = res.data.pk;
           console.log(this.pk,'sadnmsaikd');
          }

        })

      },
      // 打开弹出框
      increases() {
        this.dialog = true;
        this.omldgg = '数据源注册';
        getColumnNameAndPk().then(res => {
          console.log(res, 'getColumnNameAndPk');
          // this.inps = Object.keys(res.data);
          if(res.status === '200' || res.status === 200){
            this.lodings = false;
            this.inps = res.data;
            console.log(Object.keys(res.data), 'das');
          }
        })
      },
      getObj(val) {
        console.log(val);
        this.skd = val;
      },
      // 弹出框确定
      dias() {
        if(this.omldgg === '数据源注册'){
          let query = this.skd;
          insertData(query).then(res => {
            if (res.status === 200 || res.status === '200') {
              this.$message({
                message: '添加成功',
                type: 'success',
                duration: 3 * 1000
              });
              this.dialog = false;
              this.table();
            }
          })
        }else if(this.omldgg === '数据源编辑'){
          let query = this.skd;
          updateData(query).then(res =>{
            if(res.status === 200 || res.status === '200'){
              this.$message({
                message: '修改成功成功',
                type: 'success',
                duration: 3 * 1000
              });
              this.dialog = false;
              this.table();
            }
          })
        }

      },
      // 弹出框取消
      close() {
        this.dialog = false;
      },
      handleClose(done) {
        this.lodings = true;
        done();
      },
    },
    created() {
      this.table();
      this.omg();
    },
    mounted() {
      this.map();
      // this.headers();
      // this.CircleDrawing();
    },
    watch: {
      imgname: function (val) {
        alert(val);
      },
      omging: function (val) {
        if (val === '选项2') {
          this.chart = false;
          this.maping = true;
        } else {
          this.chart = true;
          this.maping = false;
        }
      },
      switchs: function (val) {

        this.CircleDrawing();
        console.log(val);
        /* if (val) {
           this.CircleDrawing();
         } else if(!val) {
          return
         }*/
      }
    },
    computed: {
      imgname: {
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
  #MapOperation {
    width: 100%;
    height: 100%;
    margin-top: 0.3rem;
    overflow-y:hidden;
    header {
      width: 100%;
      height: 0.4rem;
      .laoyutou {
        min-height: 0.4rem;
        .grid-content {
          border-radius: 4px;
          min-height: 0.4rem;
          span {
            width: 0.3rem;
            height: 0.3rem;
            display: inline-block;
            /* margin-left: 0.1rem;
             margin-top: 0.05rem;*/
            margin: 0.05rem auto;
            img {
              width: 100%;
              height: 100%;
            }

          }
          .el-select {
            width: 2.8rem !important;
          }

        }
        .act {
          cursor: pointer;
        }

      }
      .laoyutous {
        width: 0.2rem;
        height: 0.2rem;
        float: left;
        cursor: pointer;
        margin-right: 0.1rem;
        img {
          width: 100%;
          height: 100%;
        }
      }

    }
    #main {
      width: 100%;
      height: calc(100% - 0.4rem);
      main {
        width: 100%;
        height: 100%
      }
      .imgdiv {
        width: 0.3rem;
        height: 0.3rem;
        line-height: 0.3rem;
        cursor: pointer;
        img {
          margin-top: 0.06rem;
        }
      }
    }
    #CloudChart {
      height: calc(100% - 0.45rem);
      width: 100%;
      position: relative;
      .CloudChart-switch {
        width: 1rem;
        height: 0.3rem;
        position: absolute;
        right: 0.3rem;
        top: 0.3rem;
        z-index: 9999;
      }
    }
    .leaflet-container {
      background: #001331;
    }
  }

  #paginations {
    width: 97.6%;
    height: 0.55rem;
    position: absolute;
    bottom: 0.1rem;
    margin-right: 1rem;
  }

  #omg {
    width: 2rem;
    height: 0.55rem;
    /*background-color: cyan;*/
    position: absolute;
    left: 0.4rem;
    bottom: 0.05rem;
    .el-input--suffix .el-input__inner {
      height: 0.35rem !important;
    }
  }
</style>
<style lang="less">
  #MapOperation {
    header {
      .el-input__inner {
        background-color: #031A46 !important;
        border: 1px solid #032B68 !important;
      }
      .el-input--suffix .el-input__inner {
        color: #114273 !important;
      }
      .el-select .el-input .el-select__caret {
        color: #114273 !important;
      }
    }
    .el-table__body-wrapper tbody {
      color: #fff;
      //background:rgba(19,40,69,1);
      cursor: pointer;
    }
    .is-scrolling-middle {
      /*height: 4.16rem !important;*/
    }
    .el-table__body-wrapper {
      max-height: 5.5rem !important;
      /*max-height: 478px!important;*/
      /*overflow-y: visible;*/
    }
    .el-table__fixed-right {
      max-height: 5.3rem !important;
      /*height: 478px!important;*/
    }
    .el-table .cell {
      word-break: keep-all !important;
      width: 160px !important;
    }
    .el-table__body tr.hover-row > td {
      background-color: #194E7A !important;
    }
    .el-table__fixed-right::before, .el-table__fixed::before {
      background: none !important;
    }
    .el-table__fixed-right-patch {
      background: none !important;
    }
    .el-table--border th, .el-table__fixed-right-patch {
      border-bottom: none !important;
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
    .el-table, .el-table__expanded-cell {
      background-color: #021132 !important;
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
    .el-table th, .el-table tr {
      background-color: #031A46;
    }
    .el-table td, .el-table th.is-leaf {
      border: none;
    }
    .el-table--enable-row-hover .el-table__body tr:hover > td {
      background: #194E7A;
    }
    .el-table__body-wrapper tbody {
      color: #0A9FD4 !important;
    }
    .el-table thead {
      color: #0A9FD4 !important;
    }
    .el-table__empty-block {
      background: #02153D;
    }
    .el-table__body, .el-table__footer, .el-table__header {
      table-layout: auto !important;
    }
    .current-row {
      td {
        background-color: #194e7a !important;
        color: #ffffff !important;
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

      .el-pagination.is-background .el-pager li:not(.disabled).active {
        background-color: #0984B8;
        color: #FFF;
      }
      .el-pagination button, .el-pagination span:not([class*=suffix]) {
        line-height: 21px;
      }
      .el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li {
        height: 0.28rem !important;
      }
    }
    #omg {
      .el-input--suffix .el-input__inner {
        height: 0.35rem !important;
        background-color: #032058;
        border: 1px solid #032B68;
        color: #02507d;
      }
      .el-select .el-input .el-select__caret {
        color: #02507d;
      }
      .el-input__icon {
        line-height: 0.35rem;
      }
    }
    .dialogMain {
      width: 100%;
      height: 4rem;
      /*overflow: hidden;*/
    }
    /*弹出框*/
    .el-dialog {
      background: url("../../../icon/icon/bac.png");
      background-size: 100% 100%;
      color: #fff;
      max-height: 6rem !important;
      /*margin-top: 1.3rem!important;*/
      /*...*/
      /* position: absolute;
       top: 50%;
       left: 50%;
       margin: 0 !important;
       transform: translate(-50%, -50%);
       max-height: calc(100% - 30px);
       max-width: calc(100% - 30px);
       display: flex;
       flex-direction: column;
       !*box-shadow: 0px 0px 14px 1px rgba(17, 88, 146, 1) inset;*!
       border-radius: 15px;
       width: 44.6%;
       overflow: hidden;
       font-size: 16px;*/
      /*...*/
      .el-form-item__label {
        color: #0A9FD4;
        font-size: 0.14rem;
        text-indent: 0.05rem;
      }
      .el-dialog__title {
        font-size: 0.16rem;
        color: #0FD0FF;
      }
      .el-dialog__header {
        /*padding: 0.04rem 2.52rem 0.1rem;*/
        padding: 0 !important;
        margin: 0 auto;
        width: 3.96rem;
        height: 0.4rem;
        background: url("../../../icon/icon/标题框.png");
        background-size: 100% 100%;
        text-align: center;
        line-height: 0.35rem;
      }
      .el-dialog__body {
        padding-left: 0.3rem;
        padding-right: 0.3rem;
        padding-top: 0.25rem;
        padding-bottom: 0;
      }
      .el-form-item--mini .el-form-item__content, .el-form-item--mini .el-form-item__label {
        width: 4rem;
      }
      .el-input--mini {
        height: 0.36rem;
        width: 4rem;
      }
      .el-input__inner {
        background-color: #031A46;
        border: 1px solid #032B68;
        height: 0.36rem !important;
        color: #fff;
      }
      .el-form--inline .el-form-item {
        margin-left: 0.04rem;
        margin-right: 0 !important;
        width: 100% !important;
      }
      .el-button {
        background-color: #031A46;
        border: 1px solid #032B68;
        color: #0A9FD4;
        width: 1.1rem;
        height: 0.33rem;
        line-height: 0;
        font-size: 0.14rem;
        margin-left: 0 !important;
        margin-right: 0.1rem;
      }
      .el-button--primary {
        width: 1.1rem !important;
        height: 0.32rem !important;
        border: 1px solid #0FD0FF !important;
      }
      .el-form-item.is-success .el-input__inner, .el-form-item.is-success .el-input__inner:focus, .el-form-item.is-success .el-textarea__inner, .el-form-item.is-success .el-textarea__inner:focus {
        border-color: #032b68;
      }
      .el-form-item.is-required:not(.is-no-asterisk) .el-form-item__label-wrap > .el-form-item__label:before, .el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label:before {
        position: absolute;
        left: 0.22rem;
      }
      .el-scrollbar__wrap {
        overflow-x: hidden;
      }
      .el-scrollbar__thumb {
        display: none !important;
      }
    }
    .leaflet-bottom {
      display: none !important;
    }

  }

</style>
<style>
 /* #loading{
    background-color: #e74c3c;
    height: 100%;
    width: 100%;
    position: fixed;
    z-index: 1;
    margin-top: 0px;
    top: 0px;
  }
  #loading-center{
    width: 100%;
    height: 100%;
    position: relative;
  }*/
 .loding{
   width: 95%;margin-left: 2.5%; height: 400px;background-color: rgba(0, 0, 0, 0.8);position: absolute;top:65px;left: 0;z-index: 1000;
 }
  #loading-center-absolute {
    position: absolute;
    left: 50%;
    top: 50%;
    height: 100px;
    width: 100px;
    margin-top: -50px;
    margin-left: -50px;

  }
  .object{
    width: 20px;
    height: 20px;
    background-color: #0fd0ff;
    margin-right: 50px;
    float: left;
    margin-bottom: 50px;

  }
  .object:nth-child(2n+0) {
    margin-right: 0px;

  }


  #object_one {
    -webkit-animation: object_one 2s infinite;
    animation: object_one 2s infinite;
  }
  #object_two {
    -webkit-animation: object_two 2s infinite;
    animation: object_two 2s infinite;
  }
  #object_three {
    -webkit-animation: object_three 2s infinite;
    animation: object_three 2s infinite;
  }
  #object_four {
    -webkit-animation: object_four 2s infinite;
    animation: object_four 2s infinite;
  }



  @-webkit-keyframes object_one {
    25% { -webkit-transform: translate(75px,0) rotate(-90deg) scale(0.5); }
    50% { -webkit-transform: translate(75px,75px) rotate(-180deg); }
    75% { -webkit-transform:  translate(0,75px) rotate(-270deg) scale(0.5); }
    100% { -webkit-transform: rotate(-360deg); }
  }

  @keyframes object_one {
    25% {
      transform: translate(75px,0) rotate(-90deg) scale(0.5);
      -webkit-transform: translate(75px,0) rotate(-90deg) scale(0.5);
    }
    50% {
      transform: translate(75px,75px) rotate(-180deg);
      -webkit-transform: translate(75px,75px) rotate(-180deg);
    }
    75% {
      transform: translate(0,75px) rotate(-270deg) scale(0.5);
      -webkit-transform: translate(0,75px) rotate(-270deg) scale(0.5);
    }
    100% {
      transform: rotate(-360deg);
      -webkit-transform: rotate(-360deg);
    }
  }


  @-webkit-keyframes object_two {
    25% { -webkit-transform: translate(0,75px) rotate(-90deg) scale(0.5); }
    50% { -webkit-transform: translate(-75px,75px) rotate(-180deg); }
    75% { -webkit-transform:  translate(-75px,0) rotate(-270deg) scale(0.5); }
    100% { -webkit-transform: rotate(-360deg); }
  }

  @keyframes object_two {
    25% {
      transform: translate(0,75px) rotate(-90deg) scale(0.5);
      -webkit-transform: translate(0,75px) rotate(-90deg) scale(0.5);
    }
    50% {
      transform: translate(-75px,75px) rotate(-180deg);
      -webkit-transform: translate(-75px,75px) rotate(-180deg);
    }
    75% {
      transform: translate(-75px,0) rotate(-270deg) scale(0.5);
      -webkit-transform: translate(-75px,0) rotate(-270deg) scale(0.5);
    }
    100% {
      transform: rotate(-360deg);
      -webkit-transform: rotate(-360deg);
    }
  }

  @-webkit-keyframes object_three {
    25% { -webkit-transform: translate(0,-75px)  rotate(-90deg) scale(0.5); }
    50% { -webkit-transform: translate(75px,-75px) rotate(-180deg); }
    75% { -webkit-transform:  translate(75px,0) rotate(-270deg) scale(0.5); }
    100% { -webkit-transform: rotate(-360deg); }
  }

  @keyframes object_three {
    25% {
      transform: translate(0,-75px)  rotate(-90deg) scale(0.5);
      -webkit-transform: translate(0,-75px)  rotate(-90deg) scale(0.5);
    }
    50% {
      transform: translate(75px,-75px) rotate(-180deg);
      -webkit-transform: translate(75px,-75px) rotate(-180deg);
    }
    75% {
      transform:  translate(75px,0) rotate(-270deg) scale(0.5);
      -webkit-transform: translate(75px,0) rotate(-270deg) scale(0.5);
    }
    100% {
      transform: rotate(-360deg);
      -webkit-transform: rotate(-360deg);
    }
  }


  @-webkit-keyframes object_four {
    25% { -webkit-transform: translate(-75px,0)  rotate(-90deg) scale(0.5); }
    50% { -webkit-transform: translate(-75px,-75px) rotate(-180deg); }
    75% { -webkit-transform:  translate(0,-75px) rotate(-270deg) scale(0.5); }
    100% { -webkit-transform: rotate(-360deg); }
  }

  @keyframes object_four {
    25% {
      transform: translate(-75px,0)  rotate(-90deg) scale(0.5);
      -webkit-transform: translate(-75px,0)  rotate(-90deg) scale(0.5);
    }
    50% {
      transform: translate(-75px,-75px) rotate(-180deg);
      -webkit-transform: translate(-75px,-75px) rotate(-180deg);
    }
    75% {
      transform: translate(0,-75px) rotate(-270deg) scale(0.5);
      -webkit-transform: translate(0,-75px) rotate(-270deg) scale(0.5);
    }
    100% {
      transform: rotate(-360deg);
      -webkit-transform: rotate(-360deg);
    }
  }
 .visualpopup .nav-tabs {
   border-bottom: #c2c2c2 1px solid;
   padding-left: 10px;
   height: 31px;
 }

 .visualpopup {
   margin-bottom: 13px;
   margin-top: -3px;
   margin-left: -19px;
   margin-right: -19px;
   min-width: 250px;
   max-width: 400px;
 li {
   list-style-type: none;
 }
 }

 .visualpopup .nav-tabs li.active {
   line-height: 30px;
   height: 30px;
   text-decoration: none;
   border-top: #c2c2c2 1px solid;
   border-left: #c2c2c2 1px solid;
   border-right: #c2c2c2 1px solid;
   border-bottom: #fff 1px solid;
 }

 .visualpopup .nav-tabs li {
   border: none;
   border-bottom: #c2c2c2 1px solid;
   height: 30px;
   width: 70px;
   text-align: center;
   border-top-left-radius: 4px;
   border-top-right-radius: 4px;
 }

 .nav-tabs>li {
   float: left;
   margin-bottom: -1px;
 }

 .nav>li {
   position: relative;
   display: block;
 }

 .visualpopup .tab-content {
   padding-left: 10px;
 }

 .tab-content>.active {
   display: block;
 }

 .visualpopup .attrs-area {
   max-height: 235px;
   overflow-x: hidden;
   overflow-y: auto;
 }

 .simplepopup .attrs-area li,
 .visualpopup .attrs-area li {
   padding: 5px 0;
   color: #898989;
   list-style: none;
 }

 .visualpopup .nav-tabs li a {
   text-decoration: none;
   border: none;
   color: #555;
   font-size: 12px;
   font-weight: 700;
 }
</style>
