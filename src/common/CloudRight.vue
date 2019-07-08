<template>
  <div class="CloudRight-bottom" v-if="CloudRight">
    <!--添加表情模块-->
    <el-button type="warning" icon="el-icon-star-off" circle v-if="butcircle" @click="exp = !exp"></el-button>
    <el-collapse-transition>
      <div class="Expression" v-show="exp">
        <el-scrollbar style="height: 100%">
          <div class="Expression-div" v-for=" init in getMy">
            <p v-for="datas in init.iconType">{{datas}}</p>
            <ul>
              <el-scrollbar style="height: 100%">
                <!--点击li列表-->
                <li v-for="dat in init.resultList"><img :src="initImg(dat.iconPosition)" alt=""></li>
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

    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <el-tab-pane label="人口数据" name="first">
        <!--<div style="height:500px;margin-bottom: 20px">-->
        <el-scrollbar style="height: 100%;" class="leftscro">
          <el-radio-group v-model="radio2">
            <div v-for="init in Demographics">
              <el-radio :label=init.code @click="changeIndex" ref="index0" @change="onchanges(init.name, init.code)">
                {{init.name}}
              </el-radio>
            </div>
          </el-radio-group>
        </el-scrollbar>
        <!--</div>-->
      </el-tab-pane>
      <el-tab-pane label="GDP专题" name="second">
        <el-scrollbar style="height: 100%;" class="leftscro">
          <el-radio-group v-model="radio3">
            <div v-for="init in Demographics">
              <el-radio :label=init.code @click="changeIndex" ref="index0" @change="onchanges(init.name, init.code)">
                {{init.name}}
              </el-radio>
            </div>
          </el-radio-group>
        </el-scrollbar>
      </el-tab-pane>
      <el-tab-pane label="就业工资专题" name="third">
        <el-scrollbar style="height: 100%;" class="leftscro">
          <el-radio-group v-model="radio4">
            <div v-for="init in Demographics">
              <el-radio :label=init.code @change="onchanges(init.name, init.code)">{{init.name}}</el-radio>
            </div>
          </el-radio-group>
        </el-scrollbar>
      </el-tab-pane>
      <el-tab-pane label="交通问题" name="fourth">
        <el-scrollbar style="height: 100%;" class="leftscro">
          <el-radio-group v-model="radio5">
            <div v-for="init in Demographics" v-if="Demographics != 0">
              <el-radio :label=init.code @change="onchanges(init.name, init.code)">{{init.name}}</el-radio>
            </div>
            <div v-if="" class="hun">暂无数据,敬请期待</div>
          </el-radio-group>
        </el-scrollbar>
      </el-tab-pane>
      <el-tab-pane label="环保问题" name="fifth">
        <el-scrollbar style="height: 100%;" class="leftscro">
          <el-radio-group v-model="radio6">
            <div v-for="init in Demographics" v-if="Demographics != 0">
              <el-radio :label=init.code @change="onchanges(init.name, init.code)">{{init.name}}</el-radio>
            </div>
            <div v-if="" class="hun">暂无数据,敬请期待</div>
          </el-radio-group>
        </el-scrollbar>
      </el-tab-pane>
      <el-tab-pane label="天气问题" name="sixth">
        <el-scrollbar style="height: 100%;" class="leftscro">
          <el-radio-group v-model="radio7">
            <div v-for="init in Demographics" v-if="Demographics != 0">
              <el-radio :label=init.code @change="onchanges(init.name, init.code)">{{init.name}}</el-radio>
            </div>
            <div v-if="" class="hun">暂无数据,敬请期待</div>
          </el-radio-group>
        </el-scrollbar>
      </el-tab-pane>
      <el-tab-pane label="管线资源" name="eighth ">
        <el-scrollbar style="height: 100%;" class="leftscro">
          <el-radio-group v-model="radio8">
            <div v-for="init in Demographics" v-if="Demographics != 0">
              <el-radio :label=init.code @change="onchanges(init.name, init.code)">{{init.name}}</el-radio>
            </div>
            <div v-if="" class="hun">暂无数据,敬请期待</div>
          </el-radio-group>
        </el-scrollbar>
      </el-tab-pane>
      <el-tab-pane label="全部资源" name="all">
        <!--<div style="height:500px;margin-bottom: 20px">-->
        <el-scrollbar style="height: 100%;" class="leftscro">
          <el-radio-group v-model="radio9">
            <div v-for="init in Demograp">
              <el-radio :label=init.code @change="onchanges(init.name, init.code)">{{init.name}}</el-radio>
            </div>
          </el-radio-group>
        </el-scrollbar>
        <!--</div>-->
      </el-tab-pane>
    </el-tabs>
    <!--色带-->
    <div class="bottom-bottom" v-if="bbottom">
      <div class=" popover top" v-if="popos" style="display: block;left: 10px;top: -280px;}">
        <div class="arrow"></div>
        <div class="popover-title"><span @click="popotitle"><img :src="dele" alt=""></span></div>
        <div class="popover-content">
          <ul class="colorlist scroll-y">
            <el-scrollbar style="height: 100%">
              <!--点击li列表-->
              <li v-for="(init, index) in datacolor" :class="ict === index ? 'accolorlist' : ''"
                  @click="clickcolor(init, index)">
                <div v-for="opt in init" :style=" 'background:' + (opt)"></div>
              </li>
            </el-scrollbar>
          </ul>
        </div>
      </div>
      <div class="thematic-tree-select">已选中</div>
      <div class="thematic-tree-layers scroll-y" style="max-height: 227px;">
        <div class="thematic-layer">
          <div class="thematic-bar" @click="thematic">
            <div class="pull-left">
              <div class="bar-select checked"><img :src="bkong" alt=""></div>
              <label :title="zongren">{{zongren}}</label>
            </div>
            <div class="color-select pull-left">
              <!--点击色带-->
              <div class="colorpicker" @click.stop="colorpickers" :style=" 'background:' + (colorfor)">
              </div>
            </div>
            <div class="buttons pull-right" title="删除" @click.stop @click="mydelete">
              <img :src="deletes" alt="">
            </div>
            <div class="shape-select pull-right"></div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  import {authCode, dataList, getMyIcons, baocuns, dataListAll} from "@/api/map";
  import {auth} from "@/api/map";

  export default {
    props: ['Callname', 'Callid'],
    name: "CloudRight",
    data() {
      return {
        initImg: (url) => {
          if (url) {
            return url.replace('172.30.17.178:8888', '');
          }
          return '';
        },
        activeName2: "first",
        bbottom: false,
        getMy: [],  //图标
        zongren: '',
        them: true,  //色带开关
        popos: false,
        colorfor: '#4eb3d3',
        ict: 6,
        uploadbut: false,  //表情确定取消
        exp: false,
        colorp: true,
        colorshow: '',
        // kong:require('@/icon/map/kong.png'),
        bkong: require('@/icon/map/bkong.png'),
        deletes: require('@/icon/map/deletes.png'),
        dele: require('@/icon/map/dele.png'),
        onchange: '',
        butcircle: false,
        radio2: "",
        radio3: "",
        radio4: "",
        radio5: "",
        radio6: "",
        radio7: "",
        radio8: "",
        radio9: "",
        color1: "#616DA0",
        color2: "#9EA929",
        CloudRight: true,
        Demographic: [],
        Demographics: [],
        Demograp: [],
        userid: 9,
        noc: true,
        dialogImageUrl: '',    //图标上传
        dialogVisible: false,  //图标上传
        datacolor: [
          [
            'rgb(242, 240, 247)',
            'rgb(218, 218, 235);',
            'rgb(188, 189, 220);',
            'rgb(158, 154, 200);',
            'rgb(128, 125, 186);',
            'rgb(106, 81, 163);',
            'rgb(74, 20, 134);',
          ],
          [
            ' rgb(254, 229, 217);',
            ' rgb(252, 187, 161);',
            ' rgb(252, 146, 114);',
            ' rgb(251, 106, 74);',
            ' rgb(239, 59, 44);',
            ' rgb(203, 24, 29);',
            ' rgb(153, 0, 13);',
          ],
          [
            ' rgb(255, 255, 178);',
            ' rgb(254, 217, 118);',
            'rgb(254, 178, 76);',
            'rgb(253, 141, 60);',
            'rgb(252, 78, 42);',
            'rgb(227, 26, 28);',
            ' rgb(177, 0, 38);',
          ],
          [
            'rgb(254, 235, 226);',
            'rgb(252, 197, 192);',
            'rgb(250, 159, 181);',
            ' rgb(247, 104, 161);',
            ' rgb(221, 52, 151);',
            ' rgb(174, 1, 126);',
            ' rgb(122, 1, 119);',
          ],
          [
            'rgb(255, 255, 212);',
            ' rgb(254, 227, 145);',
            ' rgb(254, 196, 79);',
            ' rgb(254, 153, 41);',
            ' rgb(236, 112, 20);',
            'rgb(204, 76, 2);',
            'rgb(140, 45, 4);',
          ],
          [
            'rgb(237, 248, 233);',
            'rgb(199, 233, 192);',
            'rgb(161, 217, 155);',
            'rgb(116, 196, 118);',
            'rgb(65, 171, 93);',
            'rgb(35, 139, 69);',
            'rgb(0, 90, 50);',
          ],
          [
            'rgb(255, 255, 204);',
            ' rgb(199, 233, 180);',
            ' rgb(127, 205, 187);',
            ' rgb(65, 182, 196);',
            ' rgb(29, 145, 192);',
            '  rgb(34, 94, 168);',
            ' rgb(12, 44, 132);',
          ],
          [
            'rgb(240, 249, 232);',
            ' rgb(204, 235, 197);',
            ' rgb(168, 221, 181);',
            ' rgb(123, 204, 196);',
            ' rgb(78, 179, 211);',
            'rgb(43, 140, 190);',
            'rgb(8, 88, 158);',
          ],
          [
            'rgb(237, 248, 251);',
            'rgb(191, 211, 230);',
            'rgb(158, 188, 218);',
            'rgb(140, 150, 198);',
            'rgb(140, 107, 177);',
            'rgb(136, 65, 157);',
            ' rgb(110, 1, 107);',
          ],
          [
            'rgb(247, 247, 247);',
            ' rgb(217, 217, 217);',
            ' rgb(189, 189, 189);',
            ' rgb(150, 150, 150);',
            ' rgb(115, 115, 115);',
            'rgb(82, 82, 82);',
            'rgb(37, 37, 37);',
          ],
          [
            'rgb(254, 237, 222);',
            'rgb(253, 208, 162);',
            ' rgb(253, 174, 107);',
            ' rgb(253, 141, 60);',
            ' rgb(241, 105, 19);',
            ' rgb(217, 72, 1);',
            ' rgb(140, 45, 4);',
          ],
          [
            'rgb(254, 240, 217);',
            'rgb(253, 212, 158);',
            ' rgb(253, 187, 132);',
            'rgb(252, 141, 89);',
            'rgb(239, 101, 72);',
            ' rgb(215, 48, 31);',
            'rgb(153, 0, 0);',
          ],
          [
            'rgb(237, 248, 251);',
            '  rgb(204, 236, 230);',
            ' rgb(153, 216, 201);',
            ' rgb(102, 194, 164);',
            ' rgb(65, 174, 118);',
            ' rgb(35, 139, 69);',
            ' rgb(0, 88, 36);',
          ],
          [
            'rgb(241, 238, 246);',
            ' rgb(208, 209, 230);',
            'rgb(166, 189, 219);',
            ' rgb(116, 169, 207);',
            'rgb(54, 144, 192);',
            ' rgb(5, 112, 176);',
            'rgb(3, 78, 123);',
          ],
          [
            'rgb(241, 238, 246);',
            'rgb(212, 185, 218);',
            'rgb(201, 148, 199);',
            'rgb(223, 101, 176);',
            'rgb(231, 41, 138);',
            'rgb(206, 18, 86);',
            ' rgb(145, 0, 63);',
          ],
          [
            'rgb(239, 243, 255);',
            'rgb(198, 219, 239);',
            'rgb(158, 202, 225);',
            'rgb(107, 174, 214);',
            'rgb(66, 146, 198);',
            'rgb(33, 113, 181);',
            'rgb(8, 69, 148);',
          ],
          [
            'rgb(246, 239, 247);',
            ' rgb(208, 209, 230);',
            'rgb(166, 189, 219);',
            ' rgb(103, 169, 207);',
            ' rgb(54, 144, 192);',
            'rgb(2, 129, 138);',
            'rgb(1, 100, 80);',
          ],
          [
            'rgb(255, 255, 204);',
            ' rgb(217, 240, 163);',
            '  rgb(173, 221, 142);',
            '  rgb(120, 198, 121);',
            '  rgb(65, 171, 93);',
            '  rgb(35, 132, 67);',
            ' rgb(0, 90, 50);',
          ]
        ],
        fileId: '',    //保存时传的id
        fileUrl: '',    //保存时传的路径
      };
    },
    methods: {
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
      Saveexpression() {
        let data = {
          "fileId": this.fileId,
          "fileUrl": this.fileUrl,
        };
        baocuns(data).then(res => {
          if (res.status === 200 || res.status === '200') {
            this.uploadbut = false;
            this.$refs.uploads.clearFiles();
            this.getMyIcons();
            // 接口刷新
            this.$message({
              message: '上传成功',
              type: 'success'
            });
          } else {
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
      closebaocun() {
        this.fileId = '',
          this.fileUrl = '',
          this.uploadbut = false;
        this.$refs.uploads.clearFiles();
      },
      onchanges(data, datas) {

        window.indexdecription = data;
        this.zongren = data;
        this.butcircle = false;
        if (data == '') {
          this.guanbi();
        } else {
          this.kaiqi(datas);
        }
      },
      // 点击色带
      thematic() {
        if (this.them) {
          this.bkong = require('@/icon/map/kong.png');
          this.them = false;
          this.$emit("open", this.them);
        } else {
          this.bkong = require('@/icon/map/bkong.png');
          this.them = true;
          this.$emit("open", this.them);
        }
      },
      // 点击出现色带
      colorpickers() {
        if (this.colorp) {
          this.popos = true;
          this.colorp = false;
        } else {
          this.popos = false;
          this.colorp = true;
        }
      },
      // 点击颜色
      clickcolor(init, data) {
        let arr = init[1];
        let brr = init[6];
        let crr = init[4];
        this.rgb(arr, brr, crr);
        this.ict = data;
      },
      rgb(arr, brr, crr) {
        var rgb = arr.split(',');
        var r = parseInt(rgb[0].split('(')[1]);
        var g = parseInt(rgb[1]);
        var b = parseInt(rgb[2].split(')')[0]);
        var hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        var cbv = brr.split(',');
        var n = parseInt(cbv[0].split('(')[1]);
        var p = parseInt(cbv[1]);
        var i = parseInt(cbv[2].split(')')[0]);
        var hie = "#" + ((1 << 24) + (n << 16) + (p << 8) + i).toString(16).slice(1);
        var cbb = crr.split(',');
        var j = parseInt(cbb[0].split('(')[1]);
        var r = parseInt(cbb[1]);
        var u = parseInt(cbb[2].split(')')[0]);
        var ha = "#" + ((1 << 24) + (j << 16) + (r << 8) + u).toString(16).slice(1);
        this.color1 = hex;
        this.color2 = hie;
        this.popos = false;
        this.colorp = true;
        if (this.them) {
          this.colorfor = ha;
          this.$emit("changeColors", [this.color1, this.color2]);
        } else {
          this.$message({
            message: '打开图层来改变颜色',
            type: 'warning'
          });
        }

      },
      // 点击关闭色带
      popotitle() {
        this.popos = false;
      },
      // 点击删除
      mydelete() {
        this.close();
      },
      // tab切换
      handleClick(tab, event) {
        console.log(tab);
        this.close();
        let yuu = tab.index;
        if (yuu == 0) {
          this.userid = 9; // 人口
          this.Apisss();
        } else if (yuu == 1) {
          this.userid = 8; // gdp
          this.Apisss();
        } else if (yuu == 2) {
          this.userid = 10; // 就业
          this.Apisss();
        } else if (yuu == 3) {
          this.userid = 20; // 交通
          this.Apisss();
        } else if (yuu == 4) {
          this.userid = 21; // 环保
          this.Apisss();
        } else if (yuu == 5) {
          this.userid = 22; // 天气
          this.Apisss();
        } else if (yuu == 6) {
          this.userid = 7; // 管线
          this.Apisss();
        } else if (yuu == 7) {
          this.userid = 0; // 全部
          this.dataList();
        }
      },
      close() {
        this.guanbi();
        this.radio2 = "";
        this.radio3 = "";
        this.radio4 = "";
        this.radio5 = "";
        this.radio6 = "";
        this.radio7 = "";
        this.radio8 = "";
        this.radio9 = "";
      },
      // 列表接口
      /*  Apis() {

          authCode(this.userid).then(res => {
            if (res.status === 200 || res.status === '200') {
              console.log(res.data, 'sdh');
              this.Demographic = res.data[0].children;
              console.log(this.Demographic,'this.Demographic')
            }
          });

        },*/
      // 开放数据接口
      Apisss() {
        dataList(this.userid).then(res => {
          if (res.status === 200 || res.status === "200") {
            console.log(res, "Demographics3-19");
            if (res.data.rows.length == 0) {
              this.Demographics = 0
            } else {
              this.Demographics = res.data.rows;
            }

            console.log(res.data.rows.length, "this.Demographics时代大厦");
          }
        });
      },
      dataList(){
        dataListAll().then(res => {
          if (res.status === 200 || res.status === "200") {
            console.log(res, "Demos343423");
            this.Demograp = res.data;
          }
        })
      },
      getMyIcons() {
        getMyIcons().then(res => {
          this.getMy = res.data;
          console.log(res.data, '我是图标')
        })
      },
      //指标点击
      changeIndex() {
        window.index = index0;
        console.info(index0);
        this.$emit("laoyutou", this.$refs.index0, this.$refs.index0);
      },
      // 点击更换颜色
      /* bottomColor() {
         console.info("发送的参数");
         console.info(this.color1);
         console.info(this.color2);
         this.$emit("changeColors", [this.color1, this.color2]);
         // this.opendata();
       },*/
      //test
      test() {
        this.$emit("test");
      },
      auto() {
        switch (this.$route.params.wa) {
          case '9':
            this.activeName2 = 'first';
            // this.radio2 = this.radio2.code;
            console.log(this.radio2.code, 'radio2radio2radio2')
            this.radio2 = this.$route.params.id;
            break;
          case '8':
            this.activeName2 = 'second';
            // this.radio3 = this.radio3.code;
            this.radio3 = this.$route.params.id;
            break;
          case '10':
            this.activeName2 = 'third';
            // this.radio4 = this.radio4.code;
            this.radio4 = this.$route.params.id;
            break;
          case '20':
            this.activeName2 = 'fourth';
            // this.radio5 = this.radio5.code;
            this.radio5 = this.$route.params.id;
            break;
          case '21':
            this.activeName2 = 'fifth';
            // this.radio6 = this.radio6.code;
            this.radio6 = this.$route.params.id;
            break;
          case '22':
            this.activeName2 = 'sixth';
            // this.radio7 = this.radio7.code;
            this.radio7 = this.$route.params.id;
            break;
          case '7':
            this.activeName2 = 'eighth';
            // this.radio8 = this.radio8.code;
            this.radio8 = this.$route.params.id;
            break;
          case '0':
            this.activeName2 = 'all';
            // this.radio9 = this.radio9.code;
            this.radio9 = this.$route.params.id;
            break;
        }
      },
      kaiqi(data) {
        this.$emit("opendatas", data);
        this.bbottom = true;
        this.$emit("isi", '2016年');
        console.log(data,'201111999年')
      },
      guanbi() {
        this.bbottom = false;
        this.$emit("opendatas", '');
        this.$emit("isi", '');
      },
    },
    mounted() {
      this.test();
      this.getMyIcons();
      console.log(this.$route.params.name, 'this.$route.params.namethis.$route.params.name');
      // this.Apisss(); // 开放数据接口
      if (this.$route.params.wa) {
        this.radio3 = this.$route.params.name;
        this.userid = this.$route.params.wa; // 交通
        this.zongren = this.$route.params.name;
        console.log(this.$route.params.name,this.$route.params.id,'shsdfgch');
        this.Apisss();
        this.auto();
        this.kaiqi(this.$route.params.id);
        window.indexdecription = this.$route.params.name;
      } else {
        this.Apisss();
      }
    },
    /*beforeUpdate(){
      if(this.Callid){
        this.userid = 22;
        this.Apisss();
      }
      console.log(this.Callid,'this.Callidthis.Callidthis.Callid')
    },*/

  /*  watch: {
      radio2: function (data) {
        console.log(data,'我是data');
        this.butcircle = false;
        if (data == '') {
          this.guanbi();
        } else {
          this.kaiqi(data);
        }

      },
      radio3: function (data) {
        this.butcircle = false;

        if (data == '') {
          this.guanbi();
        } else {
          this.kaiqi(data);
        }

      },
      radio4: function (data) {
        this.butcircle = false;

        if (data == '') {
          this.guanbi();
        } else {
          this.kaiqi(data);
        }

      },
      radio5: function (data) {
        this.butcircle = false;

        if (data == '') {
          this.guanbi();
        } else {
          this.kaiqi(data);
        }

      },
      radio6: function (data) {
        this.butcircle = false;

        if (data == '') {
          this.guanbi();
        } else {
          this.kaiqi(data);
        }

      },
      radio7: function (data) {
        this.butcircle = false;

        if (data == '') {
          this.guanbi();
        } else {
          this.kaiqi(data);
        }

      },
      radio8: function (data) {
        this.butcircle = false;

        if (data == '') {
          this.guanbi();
        } else {
          this.kaiqi(data);
        }

      },
      radio9: function (data) {
        console.log(data, 'smjdfkasjnfnasdjbnfadb')
        if (data == '') {
          this.guanbi();
        } else {
          this.kaiqi(data);
          if (data === 'INDI_GDP') {
            this.butcircle = true;
          } else {
            this.butcircle = false;
          }
        }

      },
      /!*   Callname:function (data) {
           if(data){
             this.bbottom = true;
            /!* this.radio2 = "SPE_AVE";
             this.zongren = '人口出生率千分比'*!/
           }
         }*!/
    }*/
  };
</script>

<style scoped lang="less">
  .hun {
    color: #8a8a8a;
    width: 250px;
    height: 40px;
    font-size: 15px;
    text-indent: 96px;
    line-height: 100px;
  }
</style>
<style lang="less">
  .CloudRight-bottom .el-tabs__item {
    padding: 0px 10.5px !important;
    font-size: 13px !important;
  }

  .CloudRight-bottom .el-radio:last-child {
    margin-right: 0;
    width: 100%;
    height: 35px;
    text-indent: 1rem;
    /* font-size: 12px; */
    line-height: 35px;
  }

  .CloudRight-bottom .el-tabs--top > .el-tabs__content {
    height: calc(80% - 56px) !important;
  }

  .CloudRight-bottom {
    width: 100%;
    height: calc(100% - 160px);
    position: relative;
    margin-top: 15px;
    z-index: 100;
    .el-tabs--top {
      height: 100%;
      .el-tabs__content {
        height: calc(80% - 56px) !important;
        .el-tab-pane {
          height: 100%;
        }
      }
    }
    .bottom-bottom {
      width: 100%;
      height: 12%;
      position: absolute;
      bottom: 13px;
      .bottom-tops {
        width: 100%;
        height: 30%;
        font-size: 16px;
        text-indent: 10%;
        line-height: 50px;
        color: #fff;
      }
      .bottom-bottoms {
        width: 80%;
        height: 70%;
        margin: 4% auto;
        display: flex;
        position: relative;
        .bottom-content {
          width: 50px;
          font-size: 40px;
          color: #fff;
          text-align: center;
          line-height: 70px;
          height: 90px;
        }
      }
    }
    /*.... 独立的......*/
    .popover {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1010;
      display: none;
      width: 230px;
      height: 305px;
      padding: 1px;
      text-align: left;
      background-color: #fff;
      background-clip: padding-box;
      border: 1px solid #ccc;
      border-radius: 6px;
      -webkit-box-shadow: 0 5px 10px rgba(0, 0, 0, .2);
      box-shadow: 0 5px 10px rgba(0, 0, 0, .2);
      white-space: normal;
      .arrow {
        left: 40%;
        margin-left: -11px;
        border-bottom-width: 0;
        bottom: -24px;
        position: absolute;
        width: 0px;
        height: 0;
        border-width: 12px;
        border-style: solid;
        border-color: #fff transparent transparent transparent;
      }
      .popover-title {
        margin: 0;
        padding: 16px 14px;
        font-size: 14px;
        font-weight: 400;
        line-height: 18px;
        border-bottom: 1px solid #ebebeb;
        border-radius: 5px 5px 0 0;
        background: #e4e4e4;
        span {
          display: inline-block;
          width: 20px;
          height: 20px;
          float: right;
          margin: -9px 0px;
          cursor: pointer;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .popover-content {
        padding: 9px 8px;
        .colorlist {
          height: 255px;
          li {
            list-style-type: none;
            width: 92%;
            height: 30px;
            margin: 3px;
            background: #0086b3;
            cursor: pointer;
            border: 1px solid #fff;
            div {
              float: left;
              width: 28px;
              height: 30px;
            }
          }
        }
        .colorlist li:hover {
          border: 1px solid #0086b3;
        }
        .accolorlist {
          border: 1px solid #0086b3 !important;
        }
      }
    }
    .scroll-y {
      overflow-x: hidden;
      overflow-y: auto;
    }
    /*................*/
    .thematic-tree-select {
      height: 20px;
      padding: 5px 5px 5px 10px;
      background-color: #397ea8;
      text-align: left;
      line-height: 22px;
      color: #fff;
      margin-left: 0px;
      font-size: 14px;
      margin-right: -12px;
      opacity: 0.6;
    }
    //321色带
    .scroll-y {
      overflow-x: hidden;
      overflow-y: auto;
    }
    .thematic-layer {
      position: relative;
      margin: 3% auto;
      width: 97%;
    }
    .thematic-bar {
      height: 20px;
      margin: 5px;
      cursor: pointer;
      padding: 5px;
      background-color: #e4e4e4;
      border: 1px solid #e2e2e2;
      font-size: 15px;
      line-height: 20px;
      .bar-select {
        float: left;
        width: 18px;
        height: 18px;
        margin-left: 3px;
        margin-right: 6px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      label {
        font-weight: 400;
        display: inline-block;
        margin-bottom: 5px;
      }
    }
    .colorpicker {
      width: 18px;
      height: 18px;
      margin-left: 7px;
      border: 1px solid #ddd;
      border-radius: 4px;
      cursor: pointer;
      position: relative;

    }
    .colorpicker:hover {
      box-shadow: #08589e 0px 0px 10px !important;
    }
    .buttons {
      width: 18px;
      margin-top: 2px;
      height: 18px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .pull-left {
      float: left !important;
    }
    .pull-right {
      float: right !important
    }
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
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .upload {
      p {
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

  .amap-logo,
  .amap-copyright {
    display: none !important;
  }

  .el-input__prefix {
    color: #409eff;
  }

  .CloudRight-bottom .v-modal {
    display: none;
  }

  .CloudRight-top-Second .el-row {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    text-align: center;
    padding-top: 5%;
  }

  .el-tabs--card > .el-tabs__header {
    border-bottom: 1px solid #707070;
  }

  .el-tabs--card > .el-tabs__header .el-tabs__item {
    border-bottom: 1px solid transparent;
    border-left: 1px solid #707070 !important;
    border-right: 1px solid #707070 !important;
    color: #8a8a8a;
  }

  .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
    border-bottom-color: #404040;
  }

  .el-tabs__item.is-active {
    color: #fff !important;
  }

  .el-tabs--card > .el-tabs__header .el-tabs__nav {
    border-top: 1px solid #707070;
    border-left: 1px solid #707070;
    border-right: 1px solid #707070;
  }

  .el-radio {
    color: #8a8a8a;
  }

  .el-radio__input.is-checked + .el-radio__label {
    color: #fff;
  }

  .el-radio__inner {
    color: #9eff3a;
  }

  .el-radio__input.is-checked .el-radio__inner {
    border-color: #fff;
    background: #fff;
  }

  .el-radio__inner {
  }

  .el-radio__inner::after {
    background-color: #707070;
  }

  .bottom-bottoms .el-button--primary.is-plain {
    position: absolute;
    top: 8% !important;
    left: 100% !important;
    color: #000;
    margin-left: 20px;
  }

  .CloudRight-bottom .el-button.is-circle {
    border-radius: 50%;
    padding: 12px;
    // position: absolute;
    top: -60px;
    left: 7%;
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

  .upload .el-upload-list--picture-card .el-upload-list__item {
    width: 80px;
    height: 80px;
  }

  .upload .el-upload-list--picture-card .el-upload-list__item {
    margin-left: 10px;
    margin-top: 10px;
  }

  .upload-but .el-button--primary {
    border-radius: 4px 4px 4px 4px;
  }

  .upload-but .el-button--mini, .el-button--mini.is-round {
    padding: 7px 10px;
  }

  .upload-but .el-button + .el-button {
    margin-left: 5px;
  }
</style>
