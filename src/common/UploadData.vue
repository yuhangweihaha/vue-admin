<template>
  <div class="opp">
    <el-dialog title="" :visible.sync="dialogVisible" :before-close="handleClose"
               :modal-append-to-body="false">
      <div>
        <el-steps :space="200" :active="act" align-center>
          <el-step title="导入数据"></el-step>
          <el-step title="数据预览"></el-step>
          <el-step title="选择坐标"></el-step>
          <el-step title="数据入库"></el-step>
        </el-steps>
      </div>
      <!--选择文件页面-->
      <div class="yiti" v-if="one">
        <div style="width: 70%;text-align: center;margin: 10% auto; font-size: 16px;position: relative">
          <span>数据类型：</span>
          <el-radio-group v-model="radio2" @change="radioChange">
            <el-radio :label="3">Excel</el-radio>
            <el-radio :label="6">CSV</el-radio>
            <el-radio :label="9">Shp</el-radio>
          </el-radio-group>
          <!--浏览按钮-->

          <!--我是shp-->
          <el-upload v-if="uplodaFileFlag" :limit="uploadLimit" class="upload-demo"
                     action="/api/fileupload/file/uploadFileForGeo/SpatialFiles" accept=".zip"
                     :on-success="handleSuccess"
                     :on-remove="handleremobe"
                     :on-error="handleError" :before-upload="handleChange" :file-list="fileList3" ref="upload">
            <el-button size="small" slot="trigger" type="primary" v-if="par">浏览Shp</el-button>
            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
          <!--我是Excel-->
          <el-upload v-if="Excel" :limit="uploadLimit" class="upload-demo"
                     action="/api/fileupload/file/uploadFileForGeo/excel" accept=".xlsx, .xls"
                     :on-success="handleSuccess"
                     :on-remove="handleremobe"
                     :on-error="handleError" :before-upload="onChange" :file-list="fileList3" ref="upload">
            <el-button size="small" slot="trigger" type="primary" v-if="par">浏览Excel</el-button>
          </el-upload>
          <!--我是csv-->
          <el-upload v-if="csving" :limit="uploadLimit" class="upload-demo"
                     action="/api/fileupload/file/uploadFileForGeo/csv" accept=".csv"
                     :on-success="handleSuccess"
                     :on-remove="handleremobe"
                     :on-error="handleError" :before-upload="Change" :file-list="fileList3" ref="upload">
            <el-button size="small" slot="trigger" type="primary" v-if="par">浏览CSV</el-button>
          </el-upload>
        </div>
        <div style="width: 42%;text-align: center;font-size: 15px;position: absolute;left: 30%;bottom: 26%;">
          支出xlsx | xls | csv , 包含表示地理位置的两列 , 如X | Y , 城市名 | 地址 , 支持GeoJSON以及压缩为Zip的Shape数据,需UTF-8编码
        </div>
        <div style="position: absolute;right: 20px;bottom:10px;">
        <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialog()">取消</el-button>
        <el-button type="primary" @click="save()">下一步</el-button>
        </span>
        </div>
      </div>
      <!--预览页面-->
      <div class="yiti yitwo" v-if="two">
        <el-table :data="tableData.data" border fit highlight-current-row height="87%" margin-top="15px">
          <el-table-column :label="init" align="center" width="160px" height="30px" font-size="12px"
                           v-for="init in tableData.fields">
            <template slot-scope="scope">
              <span>{{scope.row[init]}}</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="yitwo-footer">
          <div class="yiti-inp">
            <span>出现乱码请修改编码</span>
            <el-select v-model="value">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="yiti-inps" v-if="yitis">
            <span>请选择</span>
            <span>经度：</span>
            <el-select v-model="value2">
              <el-option
                v-for="item in fields"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
            <span>纬度：</span>
            <el-select v-model="value3">
              <el-option
                v-for="item in fields"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </div>
          <div class="yiti-inps" v-else></div>
          <div class="yiti-class">
                  <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="medium" @click="Reupload()">重新上传</el-button>
        <el-button type="primary" size="medium" @click="nscoordinates()">下一步</el-button>
        </span>
          </div>
          <!--    &lt;!&ndash;utf-8&ndash;&gt;
              <div>

              </div>
              &lt;!&ndash;经纬度&ndash;&gt;
              <div  v-show="yitis">

              </div>
              操作按钮
              <div style="position: absolute;right: 20px;bottom:10px;">

              </div>-->
        </div>
      </div>
      <!--选择坐标页面-->
      <div class="yiti yitwo" v-if="three">
        <div class="yitititle" style="width: 570px;margin: 9% auto;">
          数据将统一转换为GCJ02坐标系，一遍与互联网地图正确叠加，请选择数据的原始坐标系
        </div>
        <div class="yiticheck" style="width: 400px;margin: 0% auto;">
          <el-radio-group v-model="radio6">
            <el-radio :label="6">CGCS2000坐标系</el-radio>
            <el-radio :label="9">WGS84坐标系</el-radio>
          </el-radio-group>
        </div>
        <div class="yitishuoming" style="width: 530px;margin: 10% auto;">
          <ul>
            <li style="list-style: none;font-size: 16px;font-weight: 700">坐标系说明：</li>
            <li>GCJ02坐标系：俗称火星坐标系，高德、腾讯、谷歌等互联网地图均采用该坐标系</li>
            <li>CGCS2000坐标系：2000国家大地坐标，国家测绘成果均采用该坐标系</li>
            <li>WGS84坐标系：GPS设备采集的数据，谷歌地球均采用该坐标</li>
          </ul>
          <div style="position: absolute;right: 20px;bottom:10px;">
        <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="up()">重新上传</el-button>
        <el-button type="primary" @click="upload()">下一步</el-button>
        </span>
          </div>
        </div>
      </div>
      <div class="yiti yitwo" v-if="foll">
        <div style="margin: 10% auto;font-size: 18px;width: 130px;height: 30px;" v-if="chucuo">{{shangchuan}}</div>
        <div v-show="sss"  style="width: 270px;margin: 19% auto;font-size: 27px;height: 30px;font-family: STHupo;color: #c44b32;"
             v-else>{{chucuos}}
        </div>
        <el-progress v-if="jindu" :text-inside="true" :stroke-width="28" :percentage="times"
                     status="exception"></el-progress>
        <div style="position: absolute;left: 10px;bottom: -14px" v-if="wk">关闭不影响进度</div>
        <div style="position: absolute;right: 20px;bottom:10px;">
        <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="close()">关闭</el-button>
        <el-button type="primary" v-if="onups" @click="ups()">重新上传</el-button>
        </span>
        </div>
      </div>
      <!--   <div class="yiti"></div>
      <div class="yiti"></div>
      <div class="yiti"></div>-->

    </el-dialog>
  </div>
</template>

<script>
  import UploadData from "@/common/UploadData";
  import {
    getMyData,
    publishServer,
    previews,
    excelImport,
    userImport,
    getSrs,
    deletepk,
    Dataprer,
    shpIm,
    updateImport
  } from '@/api/madata'
  import {shareLayer} from '@/api/getMyPlan'

  export default {
    data() {
      return {
        form: {
          name: '',
        },
        wk: true,
        dialogsss: false,
        download: false,
        dialogVisible: false,
        uploadLimit: 1,
        radio2: '',
        sss:false,
        chucuo: true,
        chucuos: '上传出现了一些错误!',
        jindu: true,
        par: true,
        showFlag: false,
        fileList3: [],
        fileName: '',
        dataList: [],
        onups: false,
        yitis: true,
        uplodaFileFlag: false,
        Excel: false,
        csving: false,
        fileUrl: '',
        shangchuan: '上传中请稍等...',
        total: null,
        srss: null,
        rows: '',
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 20,
          name: undefined
        },
        titleName: '',
        types: '',
        SpatialFiles: '',
        act: 0,
        one: true,
        two: false,
        three: false,
        foll: false,
        local: '',
        tableData: [],
        radio6: 6,
        radio6_value: '4490',
        options: [{
          value: 'UTF-8',
          label: 'UTF-8'
        }, {
          value: 'GBK',
          label: 'GBK'
        }, {
          value: 'GB2321',
          label: 'GB2321'
        }, {
          value: 'GB18030',
          label: 'GB18030'
        }, {
          value: 'BIG5',
          label: 'BIG5'
        }, {
          value: 'ASCII',
          label: 'ASCII'
        }, {
          value: 'Unicode',
          label: 'Unicode'
        }],
        value: 'UTF-8',
        value3: '',
        value2: '',
        times: 0,
        fields: [],
        pkid: '',
        radio: null,
      };
    },

        methods: {
          table:function(data){
          console.log(data,'是什么鬼');
            this.dialogVisible = data[0];
            this.yitis = data[1];
            this.wk = data[2];
            this.onups = data[3];
            this.chucuo = data[4];
          },
          handleClose(done) {
            this.$confirm('确认关闭？')
              .then(_ => {
                done();
              })
              .catch(_ => {
              });
          },
          dia() {
            this.dialogVisible = true;
            this.yitis = true;
            this.wk = true;
            this.onups = false;
            this.chucuo = true;
          },
          // 上传文件
          handleChange(file) {
            var type = file.name.substring(file.name.lastIndexOf('.') + 1, file.name.length);
            if (type === 'zip') {
              this.fileName = file.name.substring(0, file.name.lastIndexOf('.'));
            } else {
              this.$refs.upload.abort(file);
              this.$notify({
                title: "失败",
                message: "文件必须是zip格式！",
                type: "error",
                duration: 2000
              });
              return false;
            }
          },
          onChange(file) {
            var type = file.name.substring(file.name.lastIndexOf('.') + 1, file.name.length);
            if (type === 'xlsx' || type === 'xls') {
              this.fileName = file.name.substring(0, file.name.lastIndexOf('.'));
            } else {
              this.$refs.upload.abort(file);
              this.$notify({
                title: "失败",
                message: "文件必须是xlsx或者xls格式！",
                type: "error",
                duration: 2000
              });
              return false;
            }
          },
          Change(file) {
            var type = file.name.substring(file.name.lastIndexOf('.') + 1, file.name.length);
            if (type === 'csv') {
              this.fileName = file.name.substring(0, file.name.lastIndexOf('.'));
            } else {
              this.$refs.upload.abort(file);
              this.$notify({
                title: "失败",
                message: "文件必须是CSV格式！",
                type: "error",
                duration: 2000
              });
              return false;
            }
          },
          // 文件上传成功
          handleSuccess(res) {
            this.fileUrl = res.data[0].fullPathUrl;
            this.fileName = res.data[0].fileName;
            this.par = false;
            console.log(this.fileUrl, this.fileName);
            if (this.type == '3') {

            }
          },
          // 取消文件的钩子
          handleremobe(res) {
            this.par = true;
          },
          handleError(res) {
            this.$notify({
              title: "失败",
              message: "上传失败",
              type: "error",
              duration: 2000
            });
          },
          radioChange(val) {
            if (val === 9) {    //Shp
              this.uplodaFileFlag = true;
              this.Excel = false;
              this.csving = false;
              this.SpatialFiles = 'SpatialFiles';
              this.type = '3';
            } else if (val === 6) {  // csv
              this.type = '2';
              this.csving = true;
              this.uplodaFileFlag = false;
              this.Excel = false;
              this.SpatialFiles = 'csv'
            } else if (val === 3) {
              this.type = '1';
              this.Excel = true;
              this.csving = false;
              this.uplodaFileFlag = false;
              this.SpatialFiles = 'excel'
            }   //Excel
          },
          // 第一步取消时间
          dialog() {
            let _this = this;
            setTimeout(function () {
              _this.dialogVisible = false;
            },100);

            this.$refs.upload.clearFiles();
            this.$refs.upload.abort();
            this.par = true;
          },
          close() {
            this.shangchuan = '上传中请稍等...';
            this.times = 0;
            this.act = 0;
            this.dialogVisible = false;
            this.foll = false;
            this.one = true;
          },
          // 点击下一步
          save() {
            if (this.radio2 != '') {
              if (this.type == '3') {
                if(!this.par){
                  this.yitis = false;
                  this.Dataprer();
                }else{
                  this.$notify({
                    title: "失败",
                    message: "请选择文件！",
                    type: "error",
                    duration: 2000
                  });
                }

              } else if (this.type == '1' || this.type == '2') {
                if(!this.par){
                  this.Datapreview();
                  this.yitis = true;
                  this.times = 0;
                  this.value3 = '';
                  this.value2 = '';
                }else{
                  this.$notify({
                    title: "失败",
                    message: "请选择文件！",
                    type: "error",
                    duration: 2000
                  });
                }
              }
            } else {
              this.$notify({
                title: "失败",
                message: "请选择文件！",
                type: "error",
                duration: 2000
              });
            }
          },
          // excel/csv预览
          Datapreview() {
            let _this = this;
            let query = {
              encoding: this.value,
              fileName: this.fileName,
              fileUrl: this.fileUrl,
              dataImportType:this.type
            };
            previews(query).then(res => {
              if (res.status === 200 || res.status === '200') {
                _this.one = false;
                _this.two = true;
                _this.act = 1;
                this.tableData = res.data;
                this.rows = res.data.rows;
                this.fields = res.data.fields;
                this.par = true;
              }else if(res.status === 500 || res.status === '500'){
                _this.$notify({
                  title: "失败",
                  message: res.message,
                  type: "error",
                  duration: 2000
                });
              }else{
                _this.$notify({
                  title: "失败",
                  message: res.message,
                  type: "error",
                  duration: 2000
                });
              }
            }, function (s) {
              console.log(s);
              _this.$notify({
                title: "失败",
                message: '上传失败,请重新上传',
                type: "error",
                duration: 2000
              });
            });
          },
          // shp数据浏览
          Dataprer() {
            let _this = this;
            let query = {
              encoding: this.value,
              fileName: this.fileName,
              fileUrl: this.fileUrl,
            };
            Dataprer(query).then(res => {
              console.log(res.status,'status');
              if (res.status === 200 || res.status === '200') {
                if(res.status === 200 && res.data == null || res.data == undefined){
                  this.$notify({
                    title: "失败",
                    message: "上传失败请重新上传",
                    type: "error",
                    duration: 2000
                  });
                }else {
                  _this.one = false;
                  _this.two = true;
                  _this.act = 1;
                  this.tableData = res.data;
                  this.rows = res.data.rows;
                  this.fields = res.data.fields;
                  this.par = true;
                }

              }else if(res.status === 500 || res.status === '500'){
                _this.$notify({
                  title: "失败",
                  message: res.message + ' 也可能是服务器识别有误您可以过几秒后在点击下一步',
                  type: "error",
                  duration: 4000
                });
              }else{
                _this.$notify({
                  title: "失败",
                  message: res.message,
                  type: "error",
                  duration: 2000
                });
              }
            }, function (s) {
              console.log(s);
              _this.$notify({
                title: "失败",
                message: '上传失败,请重新上传',
                type: "error",
                duration: 2000
              });
            });
          },
          // shp如果为空进入3不为空直接入库
          IsItInStorage() {
            let obj = {
              fileName: this.fileName,
              fileUrl: this.fileUrl,
            };
            getSrs(obj).then(res => {
              let _this = this;
              // 如果shp的值为空
              if (res.data.srs == '' || res.data.srs == undefined) {
                this.three = true;
                this.two = false;
                this.act = 2;
              } else {
                // 不为空直接跳转到入库
                this.two = false;
                this.three = false;
                this.foll = true;
                this.act = 3;
                setTimeout(function () {
                  _this.settime();
                }, 1000);
                this.shpImport();
              }
            })
          },
          //预览 重新上传
          Reupload() {
            this.one = true;
            this.two = false;
            this.act = 0;
            this.par = true;
          },
          // 选择坐标重新上传
          up() {
            this.par = true;
            this.one = true;
            this.three = false;
            this.act = 0;
            this.shangchuan = '上传中请稍等...';
            this.times = 0;
            this.$refs.upload.clearFiles();
          },
          ups() {
            this.one = true;
            this.foll = false;
            this.act = 0;
            this.par = true;
            this.$refs.upload.clearFiles();
          },
          // 预览的下一步
          nscoordinates() {
            // shp需要调接口判断有没有坐标
            if (this.type == '3') {
              this.IsItInStorage();
              this.getMyData();
            } else {
              if (this.value3 === '' || this.value2 === '') {
                this.$message.error('请输入正确的经纬度');
              } else {
                // echers直接进入选择坐标
                this.getMyData();
                this.three = true;
                this.two = false;
                this.act = 2;

              }
            }


          },
          // 选择坐标下一步
          upload() {
            let _this = this;
            this.three = false;
            this.foll = true;
            this.act = 3;
            if (this.type == '3') {
              _this.settime();
              this.shpImport();
            } else {
              /*setTimeout(function () {*/
              _this.settime();
              /*}, 1000);*/
              this.time();//csv ech入库
            }


          },
          // 控制百分比(真)
          settime() {
            let _this = this;
            _this.t2 = setInterval(function () {
              userImport(_this.fileUrl).then(res => {
                if (res.status === 200 || res.status === '200') {
                  _this.soletime = res.process;   //传过来的是字符串  转换为数字
                  _this.times = parseInt(_this.soletime);
                  if (_this.times == '100' || _this.times == 100) {
                    _this.shangchuan = '上传成功';
                    _this.onups = true;
                    window.clearTimeout(_this.t2);
                  }
                }
              });
            }, 2000);
          },
          // 控制百分比(假)
          timeout() {
            // 刷新接口
            let _this = this;
            _this.t1 = setInterval(function () {
              _this.times = parseInt(_this.times);
              _this.times += 1;
              if (_this.times == '100' || _this.times == 100) {
                _this.shangchuan = '上传成功';
                _this.onups = true;
                window.clearTimeout(_this.t1);
                _this.getMyData();
              }
            }, 100)
          },
          // xlsx入库
          time() {
            let _this = this;
            let obj = {
              fileUrl: this.fileUrl,
              fileName: this.fileName,
              longitudeName: this.value3,
              latitudeName: this.value2,
              encoding: this.value,
              srs: this.radio6_value,
              dataImportType: this.type,
            };
            excelImport(obj).then(res => {
              if (res.status === 200 || res.status === '200') {
                _this.getMyData();
                if (_this.times != 100 || _this.times != '100') {
                  window.clearTimeout(this.t2);
                  _this.timeout();
                }
              }else if(res.status === 500 || res.status === '500'){
                this.Uploaderror();
              }else{
                this.Uploaderror();
              }
            }, function (s) {
              this.Uploaderror();
            }).catch(error => {
              this.Uploaderror();
              this.$notify({
                title: "失败",
                message: '检测到服务器连接超时,请重新上传',
                type: "error",
                duration: 2000
              });
            });

          },
          // 传输成功像父元素发送刷新的请求
          getMyData(){
            this.$emit('closeAll', '')
          },
          // 上传出错(报500)
          Uploaderror(){
            let _this = this;
            window.clearTimeout(this.t2);
            _this.chucuo = false;
            _this.sss = true;
            _this.jindu = false;
            _this.onups = true;
            _this.wk = false;
          },
          // shp入库
          shpImport() {
            let _this = this;
            let obj = {
              fileUrl: this.fileUrl,
              fileName: this.fileName,
              encoding: this.value,
              srs: this.radio6_value,
              dataImportType: this.type,
            };
            shpIm(obj).then(res => {
              console.log(res.status);
              if (res.status === 200 || res.status === '200') {

                if (this.times != 100 || this.times != '100') {
                  window.clearTimeout(this.t2);
                  this.timeout();
                }
                window.clearTimeout(this.t2);
                this.getMyData();
              }else if(res.status === 500 || res.status === '500'){
                this.Uploaderror();
              }else{
                this.Uploaderror();
              }
            }, function () {
              this.Uploaderror();
            }).catch(error => {
              this.Uploaderror();
              this.$notify({
                title: "失败",
                message: '检测到服务器连接超时,请重新上传',
                type: "error",
                duration: 2000
              });
            })
          },
        },
        created() {
        },
        mounted() {

        },
    watch: {
      radio6: function (data) {
        if (data == 9) {
          this.radio6_value = '4490';
        } else {
          this.radio6_value = '4326';

        }
        console.log(this.radio6_value, ' this.radio6_value')
      },
      value: function (data) {
        this.value = data;
        if (this.type == '3') {
          // 如果shp
          this.Dataprer();
        } else {
          this.Datapreview();
        }

      },
      radio: function (data) {
        console.log(data, '我是图片格式')
      }
    }
    }

</script>

<style lang="less" scoped>
  #hang {
    width: 100%;
    height: 100%;
    background: #f4f4f4;
    position: absolute;
    .tabs {
      width: 90%;
      height: 70%;
      margin: 0 auto;
    }
    footer {
      width: 90%;
      height: 10%;
      margin: 0 auto;
      position: relative;
    }
  }

  .mainContainer {
    width: 70%;
    height: 100%;
    margin: 10px auto;
    background: #fff;
    position: relative;
  }

  .importDiv {
    border-bottom: 1px solid #cccccc;
    height: 40px;
    font-size: 16px;
    font-weight: 700;
    line-height: 40px;
  }

  .importDiv1 {
    margin-bottom: 2%;
  }

  header {
    width: 90%;
    height: 10%;
    margin: 0 auto;
    .grid-top {
      width: 261px;
      position: relative;
      height: 30px;
      float: left;
      padding-top: 27px;
      margin-left: 116px;
    }
    .grid-content {
      padding-top: 22px;
      height: 40px;
      float: right;
      margin-left: 30px;
    }
    h1 {
      float: left;
      height: 100%;
      width: 20%;
      line-height: 80px;
      text-align: left;
      font-size: 23px;
    }
  }

  .yiti {
    width: 96.3%;
    height: 80%;
    margin: 1% auto;
    position: absolute;
  }

  /*.yitwo {
    margin-top: 25px;
  }*/

  .yiti-inp {
    /* position: absolute;
     left: 20px;
     bottom: 10px;*/
    flex: 1.2;
  }

  .yiti-inps {
    /* position: absolute;
     left: 348px;
     bottom: 10px;*/
    flex: 2;
  }
  .yiti-class{
    flex: 1;
  }

  .yitwo-footer {
    width: 100%;
    height: auto;
    display: flex;
    position: absolute;
    bottom:0px;
    text-align: center;
  }
</style>
<style lang="less">
  .opp .el-button--text {
    color: #f56c6c
  }

   .opp .el-input .el-input--prefix .el-input--suffix {
    width: 220px !important;
  }

   .opp .grid-top .el-input__icon {
    line-height: 30px;
    cursor: pointer;
  }
   .opp .grid-top .el-input__inner{
    line-height: 30px;
  }
   .opp .grid-content .el-button {
    padding: 7px 10px !important;
    font-size: 13px !important;
    margin-top: 5px;
  }

   .opp .el-button--primary:focus, .el-button--primary:hover {
    color: #f56c6c;
    background: #fef0f0;
    border-color: #fbc4c4;
  }

   .opp .el-button--primary {
    color: #f56c6c;
    background: #fef0f0;
    border-color: #fbc4c4;
  }

   .opp .el-radio__input.is-checked + .el-radio__label {
    color: #f56c6c;
    font-size: 17px;

  }

   .opp .el-radio__label {

    font-size: 17px;
  }

   .opp .el-radio__input.is-checked .el-radio__inner {
    border-color: #f56c6c;
    background: #f56c6c;
  }

   .opp .el-dialog {
    margin: 8% auto !important;
    width: 60% !important;
    height: 70% !important;
    position: relative;
  }

   .opp .el-dialog__header {
    padding: 0px 20px 0px;
  }

   .opp .el-step__title.is-process {
    color: #f56c6c;
  }

   .opp .el-step__head.is-process {
    color: #f56c6c;
    border-color: #f56c6c;
  }

   .opp .el-step__head.is-finish {
    color: #fbc4c4;
    border-color: #fbc4c4;
  }

   .opp .el-step__title.is-finish {
    color: #fbc4c4;
  }

   .opp .el-step__line {
    background: #fee9e7;
  }

   .opp .el-upload {
    position: absolute;
    right: 10%;
    top: -1px;
  }

   .opp .el-upload-list {
    width: 40%;
    margin: 10% auto;
  }

   .opp .yiti-inp .el-select {
    width: 110px;
    margin-left: 7px;
  }

   .opp .yiti-inps .el-select {
    width: 120px;
    margin-left: 7px;
  }

   .opp .el-progress {
    margin: 0% auto;
    width: 70%;
  }

   .opp .yiti .el-table td, .el-table th {
    padding: 7px 0;
  }

   .opp .el-progress-bar__inner {
    transition: transform .55s ease;
  }

   .opp .zs .el-input__inner {
    width: 90%;
  }

   .opp .grid-top .el-input__inner {
    height: 30px;
  }

   .opp .grid-top .el-button--mini, .el-button--mini.is-round {
    padding: 8px 12px;
    position: absolute;
    right: 0;
  }

  /*  .v-modal {
     display: block;
   }*/
   .opp .tabs .el-button--mini, .el-button--mini.is-round {
    padding: 6px 10px;
  }

   .opp .el-steps--horizontal {
    display: flex;
  }

   .opp .el-step.is-horizontal {
    flex: 1;
  }

   .opp .el-radio-group {
    margin-left: 10px;
    margin-bottom: 2px;
  }

   .opp .upload-demo .el-button--small, .el-button--small.is-round {
    padding: 5px 8px;
  }
   .opp .el-table__body, .el-table__footer, .el-table__header {
    table-layout: auto!important;
    border-collapse: separate;
  }
   .opp .v-modal{
    display: block;
  }
  .opp .el-radio{
    margin-left: 30px;
  }
</style>
