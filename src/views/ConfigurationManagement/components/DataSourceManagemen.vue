<template>
  <div id="DataSourceManagemen">
    <header>数据源管理</header>
    <div class="DataSourceManagemen-main">
      <el-button type="primary" @click="MainBut"><i class="el-icon--left el-icon-edit-outline"></i>数据源注册</el-button>
      <div id="sources">
        <el-select v-model="sourcesing" @change="visi" ref="cascader" clearable placeholder="数据源排序">
          <el-option
            v-for="item in sour"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="DataSourceManagemen-cont">
      <el-table
        v-loading="loading"
        element-loading-text="加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        highlight-current-row
        :data="datas"
        style="width: 100%;margin-top:12px;"
      >
        <el-table-column align="center" label="名称" prop="titleName">
          <template slot-scope="scope">
            <span
              style="width: 0.5rem;height: 0.5rem;display: inline-block;position: absolute;left: 0.2rem;top:0;text-align: center;line-height: 0.63rem;"><img
              :src="DataSource" alt=""></span>
            <span :title="scope.row.dbNameNickname">{{scope.row.dbNameNickname}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="数据源类型" prop="titleName">
          <template slot-scope="scope">
            <span :title="scope.row.dbType">{{scope.row.dbType}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="注册时间" prop="titleName">
          <template slot-scope="scope">
            <span :title="scope.row.host">{{scope.row.createDate}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="注册用户" prop="titleName">
          <template slot-scope="scope">
            <span :title="scope.row.loginUserId">{{scope.row.createUser}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="工作状态" prop="titleName">
          <template slot-scope="scope">
            <span :title="scope.row.passwd">{{scope.row.status}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="400px">
          <template slot-scope="scope">
            <div style="width: 30%;height: 0.3rem;margin-left: 37%">
              <el-row :gutter="20">
                <el-col :span="8">
                  <div class="imgdiv" title="连接测试" @click="backup(scope.$index, scope.row)"><img :src="backups" alt="">
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="imgdiv" title="编辑与测试" @click="registers(scope.$index, scope.row)"><img :src="register"
                                                                                                     alt=""></div>
                </el-col>
                <el-col :span="8">
                  <div class="imgdiv" title="移入回收站" @click="handleDelete(scope.$index, scope.row)"><img :src="del"
                                                                                                        alt="">
                  </div>
                </el-col>
                <!--<el-col :span="4" style="color:#0A9FD4">|</el-col>-->
                <!--<el-col :span="4">
                  <div class="imgdiv" title="恢复" @click="recoverys(scope.$index, scope.row)"><img :src="recovery"
                                                                                                  alt=""></div>
                </el-col>
                <el-col :span="4">
                  <div class="imgdiv" title="日志" @click="Journals(scope.$index, scope.row)"><img :src="Journal" alt="">
                  </div>
                </el-col>-->
              </el-row>
            </div>
          </template>
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
    <el-dialog
      title="数据源注册"
      :visible.sync="dialog"
      :modal-append-to-body='false'
      width="6rem"

      :before-close="handleClose">
      <div class="dialogMain">
        <el-form :inline="true" size="mini" :model="ruleForm" :rules="rules" ref="ruleForms" label-position='left'
                 label-width="1.3rem"
                 class="demo-ruleForm demo-form-inline">
          <el-col class="line" :span="24">
            <el-form-item label="数据源名称:" prop="Code">
              <el-input class="type" v-model="ruleForm.Code" placeholder="请选择数据源名称"
                        @change="cityChange(ruleForm.Code)"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="24">
            <el-form-item label="设备类型选择:" prop="Equipment">
              <el-select v-model="ruleForm.Equipment" clearable placeholder="请选择设备类型" @change="changeValue">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="24">
            <el-form-item label="储存方式选择:" prop="Storage">
              <!--<el-input class="type" v-model="ruleForm.long"></el-input>-->
              <el-select v-model="ruleForm.Storage" clearable placeholder="请选择储存方式" @change="changeLocationValue">
                <el-option
                  v-for="item in Storages"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!--选择mysql-->
          <span v-if="tomysql">
          <el-col class="line" :span="24">
            <el-form-item label="数据库地址(ip):" prop="DatabaseAddress">
              <el-input class="type" v-model="ruleForm.DatabaseAddress" placeholder="请输入数据库ip"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="24">
            <el-form-item label="端口:" prop="port">
              <el-input class="type" v-model="ruleForm.port" placeholder="请输入端口号"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="24">
            <el-form-item label="初始数据库:" prop="MaintainingDatabase">
              <el-input class="type" v-model="ruleForm.MaintainingDatabase" placeholder="请输入初始数据库"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="24">
            <el-form-item label="登录用户名:" prop="Username">
              <el-input class="type" v-model="ruleForm.Username" placeholder="请输入数据库用户名"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="24">
            <el-form-item label="用户密码:" prop="password">
              <el-input class="type" v-model="ruleForm.password" placeholder="请输入数据库用户名密码"></el-input>
            </el-form-item>
          </el-col>
          </span>
          <!--选择postgresql-->
          <span v-if="topostgresql">
          <el-col class="line" :span="24">
            <el-form-item label="数据库地址(ip):" prop="DatabaseAddress">
              <el-input class="type" v-model="ruleForm.DatabaseAddress" placeholder="请输入数据库ip"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="24">
            <el-form-item label="端口:" prop="port">
              <el-input class="type" v-model="ruleForm.port" placeholder="请输入端口号"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="24">
            <el-form-item label="初始数据库:" prop="MaintainingDatabase">
              <el-input class="type" v-model="ruleForm.MaintainingDatabase" placeholder="请输入初始数据库"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="24">
            <el-form-item label="登录用户名:" prop="Username">
              <el-input class="type" v-model="ruleForm.Username" placeholder="请输入数据库用户名"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="24">
            <el-form-item label="用户密码:" prop="password">
              <el-input class="type" v-model="ruleForm.password" placeholder="请输入数据库用户名密码"></el-input>
            </el-form-item>
          </el-col>
          </span>
          <!--elasticsearch-->
          <span v-if="toelasticsearch">
          <el-col class="line" :span="24">
            <el-form-item label="数据库地址(ip):" prop="DatabaseAddress">
              <el-input class="type" v-model="ruleForm.DatabaseAddress" placeholder="请输入数据库ip"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="24">
            <el-form-item label="端口:" prop="port">
              <el-input class="type" v-model="ruleForm.port" placeholder="请输入端口号"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="24">
            <el-form-item label="前缀:" prop="MaintainingDatabase">
              <el-input class="type" v-model="ruleForm.MaintainingDatabase" placeholder="请选择前缀"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="24">
            <el-form-item label="登录用户名:" prop="Username">
              <el-input class="type" v-model="ruleForm.Username" placeholder="请输入数据库用户名"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="24">
            <el-form-item label="用户密码:" prop="Username">
              <el-input class="type" v-model="ruleForm.password" placeholder="请输入数据库用户名密码"></el-input>
            </el-form-item>
          </el-col>
          </span>
          <!--hbase-->
          <span v-if="tohbase">
          <el-col class="line" :span="24">
            <el-form-item label="zookeeper地址:" prop="zookeeper">
              <el-input class="type" v-model="ruleForm.zookeeper" placeholder="请输入zookeeper地址"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="24">
            <el-form-item label="端口:" prop="port">
              <el-input class="type" v-model="ruleForm.port" placeholder="请输入端口"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="24">
            <el-form-item label="节点Znode:" prop="MaintainingDatabase">
              <el-input class="type" v-model="ruleForm.MaintainingDatabase"
                        placeholder="请输入zookeeper中的节点Znode"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="24">
            <el-form-item label="Principal:" prop="Username">
              <el-input class="type" v-model="ruleForm.Username" placeholder="请输入Principal"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="24">
            <el-form-item label="Keytab file:" prop="Username">
              <el-input class="type" v-model="ruleForm.password" placeholder="请输入Keytab file"></el-input>
            </el-form-item>
          </el-col>
          </span>
          <!--hdfs-->
          <span v-if="tohdfs">
          <el-col class="line" :span="24">
            <el-form-item label="数据库地址(ip):" prop="DatabaseAddress">
              <el-input class="type" v-model="ruleForm.DatabaseAddress" placeholder="请输入数据库ip"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="24">
            <el-form-item label="端口:" prop="port">
              <el-input class="type" v-model="ruleForm.port" placeholder="请输入端口"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="24">
            <el-form-item label="文件路径:" prop="MaintainingDatabase">
              <el-input class="type" v-model="ruleForm.MaintainingDatabase" placeholder="请输入连接文件路径"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="24">
            <el-form-item label="登录用户名:" prop="Username">
              <el-input class="type" v-model="ruleForm.Username" placeholder="请输入数据库用户名"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="24">
            <el-form-item label="用户密码:" prop="password">
              <el-input class="type" v-model="ruleForm.password" placeholder="请输入数据库用户名密码"></el-input>
            </el-form-item>
          </el-col>
          </span>
          <span v-if="topcl">
          <el-col class="line" :span="24">
            <el-form-item label="数据库地址(ip):" prop="DatabaseAddress">
              <el-input class="type" v-model="ruleForm.DatabaseAddress" placeholder="请选择数据库地址(ip)"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="24">
            <el-form-item label="端口:" prop="port">
              <el-input class="type" v-model="ruleForm.port" placeholder="请输入端口号"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="24">
            <el-form-item label="连接数据库名称:" prop="MaintainingDatabase">
              <el-input class="type" v-model="ruleForm.MaintainingDatabase" placeholder="请输入连接数据库名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="24">
            <el-form-item label="登录用户名:"  prop="Username">
              <el-input class="type" v-model="ruleForm.Username" placeholder="请输入数据库用户名"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="24">
            <el-form-item label="用户密码:"  prop="password">
              <el-input class="type" v-model="ruleForm.password" placeholder="请输入数据库用户名密码"></el-input>
            </el-form-item>
          </el-col>
          </span>
          <!--mongodb-->
          <span v-if="tomongodb">
          <el-col class="line" :span="24">
            <el-form-item label="数据库地址(ip):" prop="DatabaseAddress">
              <el-input class="type" v-model="ruleForm.DatabaseAddress" placeholder="请输入数据库ip"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="24">
            <el-form-item label="端口:" prop="port">
              <el-input class="type" v-model="ruleForm.port" placeholder="请输入端口号"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="24">
            <el-form-item label="连接数据库名称:" prop="MaintainingDatabase">
              <el-input class="type" v-model="ruleForm.MaintainingDatabase" placeholder="请输入连接数据库名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="24">
            <el-form-item label="登录用户名:" prop='Username'>
              <el-input class="type" v-model="ruleForm.Username" placeholder="请输入数据库用户名"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="24">
            <el-form-item label="用户密码:"  prop='password'>
              <el-input class="type" v-model="ruleForm.password" placeholder="请输入数据库用户名密码"></el-input>
            </el-form-item>
          </el-col>
          </span>
          <!--fastdfs-->
          <span v-if="tofastdfs">
          <el-col class="line" :span="24">
            <el-form-item label="数据库地址(ip):" prop="DatabaseAddress">
              <el-input class="type" v-model="ruleForm.DatabaseAddress" placeholder="请输入数据库ip"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="24">
            <el-form-item label="端口:" prop="port">
              <el-input class="type" v-model="ruleForm.port" placeholder="请输入端口号"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="24">
            <el-form-item label="组名:" prop="MaintainingDatabase">
              <el-input class="type" v-model="ruleForm.MaintainingDatabase" placeholder="请输入组名"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="24">
            <el-form-item label="登录用户名:" prop='Username'>
              <el-input class="type" v-model="ruleForm.Username" placeholder="请输入数据库用户名"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="24">
            <el-form-item label="用户密码:" prop='password'>
              <el-input class="type" v-model="ruleForm.password" placeholder="请输入数据库用户名密码"></el-input>
            </el-form-item>
          </el-col>
          </span>
          <div style="margin-left: 1.34rem">
            <el-button @click="Connection">连接测试</el-button>
            <span style="margin-left: 0.2rem;color:#066C98;">{{ConnectionStatus}}</span>
          </div>
          <div
            style="line-height: 0.3rem; bottom:0.7rem;left: 1.62rem;position: absolute;width: 3rem;height: 0.3rem;color:#0E6190"
            v-show="tsing">
            <i><img :src="tishi" alt="" style="vertical-align:middle"></i>
            {{tishis}}
          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer" style="margin-top:20px;">
        <el-button @click="close"
                   style="margin-top:20px;background-color: #021132; border:1px solid #F23030;color:#F23030">取 消</el-button>
        <el-button type="primary" @click="dias(ruleForm)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    pageList,
    deletes,
    MainButing,
    registerss,
    updates,
    checkName
  } from '@/api/ConfigurationManagement/DataSourceManagemen';
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
        ConnectionStatus: '',
        loading: false,
        dialog: false,
        tsing: false, // 报错提示
        detection: false, //检测完毕可以确定
        sourcesing: '', //数据源排序
        ishow: '',
        tomysql: true, //选择mysql 也是默认的
        topostgresql: false, // 选择postgresql
        toelasticsearch: false, // 选择elasticsearch
        tohbase: false, // 选择hbase
        tohdfs: false, //选择hdfs
        topcl: false, // 选择pcl
        tomongodb: false,//选择mongodb
        tofastdfs: false,//选择fastdfs
        tishis: '提示:请确保数据库已启动',
        ruleForm: {
          id: '',
          Code: '',   //请选择数据源名称
          MaintainingDatabase: '',  //维护数据库
          Username: '',     //登录用户名
          password: '',    //用户密码
          port: '',    //端口
          DatabaseAddress: '',   //数据库地址
          Equipment: '',   //设备类型
          Storage: '',     //储存方式
        },
        Storageing: '',
        Equipmenting: '',
    // mysql规则
        mysql:{
             Code: [
            {required: true, message: '请输入数据源名称'},
            {validator: rule5}
          ],
           Equipment: [
            {required: true, message: '请输入监测点名称'},
            {validator: rule5}
          ],
          Storage: [
            {required: true, message: '请输入储存方式',},
            {validator: rule5}
          ],
            DatabaseAddress: [
            {required: true, message: '请输入数据库地址',},
            {min: 2, max: 15, message: '长度在 2 到 15 个字符 '},
            {validator: rule3}
          ], //y
          port: [
            {required: true, message: '请输入端口'},
            {validator: rule5}
          ],
          MaintainingDatabase: [
            {required: true, message: '请输入要维护的数据库'},
            {validator: rule5}
          ],
           // 登录用户名
          Username: [
            {required: true, message: '请输入登录用户名'},
            {validator: rule5}
          ],
          // 用户密码
          password: [
            {required: true, message: '请输入登录用户名'},
            {validator: rule5}
          ],
        },
    // postgresql规则  和 mysql规则 一样
        postgresql:{

        },
    // hbase规则
        hbase:{
          Code: [
            {required: true, message: '请输入数据源名称'},
            {validator: rule5}
          ],
           Equipment: [
            {required: true, message: '请输入监测点名称'},
            {validator: rule5}
          ],
          Storage: [
            {required: true, message: '请输入储存方式',},
            {validator: rule5}
          ],
           DatabaseAddress: [
            {required: true, message: '请输入数据库地址',},
            {min: 2, max: 15, message: '长度在 2 到 15 个字符 '},
            {validator: rule3}
          ], //y
           MaintainingDatabase: [
            {required: true, message: '请输入要维护的数据库'},
            {validator: rule5}
          ],
        },
    // elasticsearch
        elasticsearch:{
                 Code: [
            {required: true, message: '请输入数据源名称'},
            {validator: rule5}
          ],
           Equipment: [
            {required: true, message: '请输入监测点名称'},
            {validator: rule5}
          ],
          Storage: [
            {required: true, message: '请输入储存方式',},
            {validator: rule5}
          ],
            DatabaseAddress: [
            {required: true, message: '请输入数据库地址',},
            {min: 2, max: 15, message: '长度在 2 到 15 个字符 '},
            {validator: rule3}
          ], //y
        },
    // hdfs
        hdfs:{

        },
    // pcl
        pcl:{

        },
    // mongodb
        mongodb:{

        },
    // fastdfs
        fastdfs:{

        },

        rules: {
          // 请选择数据源名称
          Code: [
            {required: true, message: '请输入数据源名称'},
            {validator: rule5}
          ],
          // 端口
          port: [
            {required: true, message: '请输入端口'},
            {validator: rule5}
          ],
          //   监测点名称
          Equipment: [
            {required: true, message: '请输入监测点名称'},
            {validator: rule5}
          ],
          // 请输入要维护的数据库
          MaintainingDatabase: [
            {required: true, message: '请输入要维护的数据库'},
            {validator: rule5}
          ],
          // 登录用户名
          Username: [
            {required: true, message: '请输入登录用户名'},
            {validator: rule5}
          ],
          // 用户密码
          password: [
            {required: true, message: '请输入登录用户名'},
            {validator: rule5}
          ],
          //储存方式
          Storage: [
            {required: true, message: '请输入储存方式',},
            {validator: rule5}
          ],
          //数据库地址
          DatabaseAddress: [
            {required: true, message: '请输入数据库地址',},
            {min: 2, max: 15, message: '长度在 2 到 15 个字符 '},
            {validator: rule3}
          ], //y
        },
        shuibeng: require("@/icon/icon/delete.png"),
        leds: require("@/icon/icon/upload.png"),
        shipin: require("@/icon/icon/upload.png"),
        register: require("@/icon/icon/register.png"),
        backups: require("@/icon/icon/backups.png"),
        del: require("@/icon/icon/del.png"),
        recovery: require("@/icon/icon/recovery.png"),
        Journal: require("@/icon/icon/Journal.png"),
        tishi: require("@/icon/icon/提示.png"),
        DataSource: require("@/icon/icon/DataSource.png"),
        options: [
          {
            value: '1',
            label: '关系型数据库'
          },
          {
            value: '3',
            label: '非关系型数据库'
          },
        ],
        sour: [
          {
            value: '1',
            label: ' 按名称排序'
          },
          {
            value: '2',
            label: '按注册时间排序'
          }
        ],
        Storages: [
          {
            value: '1',
            label: 'mysql'
          },
          {
            value: '2',
            label: 'postgresql'
          },
          {
            value: '3',
            label: 'hbase'
          },
          {
            value: '4',
            label: 'elasticsearch'
          },
          {
            value: '5',
            label: 'hdfs'
          },
          {
            value: '6',
            label: 'pcl'
          },
          {
            value: '7',
            label: 'mongodb'
          },
          {
            value: '8',
            label: 'fastdfs'
          },
        ],
        datas: [],
        listQuery: {
          page: 1,
          limit: 10,
        },
        total: null,
        isid: '',
      };

    },

    methods: {
      // 编辑与测试
      registers(index, data) {
        if (this.$refs.ruleForms !== undefined) {
          this.$refs.ruleForms.resetFields();
          this.mystate();
        }
        console.log(data);
        switch (data) {
          case 'postgresql':
            this.topostgresql = true;
            this.tomysql = false;
            this.toelasticsearch = false;
            this.tohbase = false;
            this.tohdfs = false;
            this.topcl = false;
            this.tomongodb = false;
            this.tofastdfs = false;
            break;
          case 'mysql':
            this.topostgresql = false;
            this.tomysql = true;
            this.toelasticsearch = false;
            this.tohbase = false;
            this.tohdfs = false;
            this.topcl = false;
            this.tomongodb = false;
            this.tofastdfs = false;
            break;
          case 'elasticsearch':
            this.topostgresql = false;
            this.tomysql = false;
            this.toelasticsearch = true;
            this.tohbase = false;
            this.tohdfs = false;
            this.topcl = false;
            this.tomongodb = false;
            this.tofastdfs = false;
            break;
          case 'hbase':
            this.tohbase = true;
            this.topostgresql = false;
            this.tomysql = false;
            this.toelasticsearch = false;
            this.tohdfs = false;
            this.topcl = false;
            this.tomongodb = false;
            this.tofastdfs = false;
            break;
          case 'hdfs':
            this.tohbase = false;
            this.topostgresql = false;
            this.tomysql = false;
            this.toelasticsearch = false;
            this.tohdfs = true;
            this.topcl = false;
            this.tomongodb = false;
            this.tofastdfs = false;
            break;
          case 'pcl':
            this.tohbase = false;
            this.topostgresql = false;
            this.tomysql = false;
            this.toelasticsearch = false;
            this.tohdfs = false;
            this.topcl = true;
            this.tomongodb = false;
            this.tofastdfs = false;
            break;
          case 'mongodb':
            this.tohbase = false;
            this.topostgresql = false;
            this.tomysql = false;
            this.toelasticsearch = false;
            this.tohdfs = false;
            this.topcl = false;
            this.tofastdfs = false;
            this.tomongodb = true;
            break;
          case 'fastdfs':
            this.tohbase = false;
            this.topostgresql = false;
            this.tomysql = false;
            this.toelasticsearch = false;
            this.tohdfs = false;
            this.topcl = false;
            this.tomongodb = false;
            this.tofastdfs = true;
            break;
        }
        this.dialog = true;
        this.ishow = '2';
        this.isid = data.id;
        this.ruleForm.Code = data.dbNameNickname;
        this.ruleForm.MaintainingDatabase = data.dbName;
        this.ruleForm.Username = data.user;
        this.ruleForm.password = data.passwd;
        this.ruleForm.port = data.host;
        this.ruleForm.Equipment = data.objectType;
        this.ruleForm.Storage = data.dbType;
        this.ruleForm.DatabaseAddress = data.ip;
        //传值到后台的时候记得加id
        console.log(data, 'laoyu');
      },
      // 连接测试
      backup(index, data) {
        this.isid = data.id;
        this.ruleForm.Code = data.dbNameNickname;
        this.ruleForm.MaintainingDatabase = data.dbName;
        this.ruleForm.Username = data.user;
        this.ruleForm.password = data.passwd;
        this.ruleForm.port = data.host;
        this.ruleForm.Equipment = data.objectType;
        this.ruleForm.Storage = data.dbType;
        this.ruleForm.DatabaseAddress = data.ip;
        let query = {
          dbName: this.ruleForm.MaintainingDatabase,   //数据库模式  维护数据库  postgres
          dbNameNickname: this.ruleForm.Code,  //名称
          dbType: this.Storageing,    //数据源类型  存储方式选择 1
          host: this.ruleForm.port,        //数据库端口 5432
          // id: '',         //数据源编号
          ip: this.ruleForm.DatabaseAddress,         //数据库地址
          loginUserId: localStorage.userId,   //系统登陆用户编号
          objectType: this.Equipmenting,     //设备类型       1
          passwd: this.ruleForm.password,        //数据库登录用户名密码 sde
          user: this.ruleForm.Username        //数据库登录用户名 sde
        };
        MainButing(query).then(res => {
          if (res.status === '200' || res.status === 200) {
            this.$notify({
              message: '测试成功',
              type: 'success'
            });
          } else {
            this.$notify({
              message: res.message,
              type: 'error',
              duration: 3 * 1000
            });
          }
        }).catch(() => {
          this.$notify({
            message: '连接出错',
            type: 'error',
            duration: 3 * 1000
          });
        });
      },
      //恢复
      recoverys(index, data) {
        this.$notify({
          showClose: true,
          message: data.id
        });
      },
      // 删除
      handleDelete(index, data) {
        this.$confirm('是否移入回收站?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.delete(data);
        }).catch(() => {
          this.$notify({
            type: 'info',
            message: '已取消'
          });
        });
      },
      delete(data) {
        console.log(data)
        let query = {
          dbName: data.dbName,   //数据库模式
          dbNameNickname: data.dbNameNickname,   //数据源名称
          dbType: data.dbType,//存储方式
          host: data.host, //数据库端口
          id: data.id, //数据源编号
          ip: data.ip, //数据库地址
          loginUserId: localStorage.userId,//系统登陆用户编号
          loginUserName: localStorage.userName, //系统登陆用户名称
          objectType: data.objectType,//设备类型
          passwd: data.passwd,//数据库登录用户名密码
          user: data.user, //数据库登录用户名

        };
        deletes(query).then(res => {
          if (res.status === '200' || res.status === 200) {
            this.$notify({
              type: 'success',
              message: '成功移入回收站'
            });
            this.pageList();
          } else {
            this.$notify({
              message: res.message
            });
          }

        })
      },
      // 日志
      Journals(index, data) {
        this.$notify({
          showClose: true,
          message: data.id
        });
      },
      // 数据源注册.......
      MainBut(ruleForms) {

        /*this.topostgresql = false;
        this.tomysql = true;
        this.toelasticsearch = false;
        this.tohbase = false;
        this.tohdfs = false;
        this.topcl = false;
        this.tomongodb = false;
        this.tofastdfs = false;*/
        this.dialog = true;  this.ishow = '1';
        this.mystate();
        this.$refs.ruleForms.resetFields();
       /* if (this.$refs.ruleForms !== undefined) {
          this.$refs.ruleForms.resetFields();
          this.ishow = '1';
          this.mystate();
        }*/

      },
      // 点击取消
      mystate() {
        this.detection = false;  // 退出弹框注册连接测试状态改为false
        this.ConnectionStatus = '';
        this.tsing = false;
        this.topostgresql = false;
        this.tomysql = true;
        this.toelasticsearch = false;
        this.tohbase = false;
        this.tohdfs = false;
        this.topcl = false;
        this.tomongodb = false;
        this.tofastdfs = false;
      },
      close() {
        if (this.ishow === '1') {
          if (this.$refs.ruleForms !== undefined) {
            this.$refs.ruleForms.resetFields();
            this.mystate();
          }
        } else if (this.ishow === '2') {
          this.dialog = false;
          this.detection = false;   //退出弹框修改连接测试状态改为false
        }

      },
      handleClose(done) {
        done();
      },
      //.................
      // 列表接口
      pageList() {
        let data = {
          limit: this.listQuery.limit,
          page: this.listQuery.page
        };
        pageList(data).then(res => {
          console.log(res.data.rows, '11')
          this.datas = res.data.rows;
          this.total = res.data.total;
        })
      },
      // 确定注册
      dias(ruleForms) {
        this.$refs.ruleForms.validate((valid) => {
          if (valid) {
            if (this.ishow === '2') {
              if (this.detection) {
                // this.isid
                let query = {
                  dbName: this.ruleForm.MaintainingDatabase,   //数据库模式  维护数据库  postgres
                  dbNameNickname: this.ruleForm.Code,  //名称
                  dbType: this.Storageing,    //数据源类型  存储方式选择
                  host: this.ruleForm.port,        //数据库端口 5432
                  id: this.isid,         //数据源编号
                  ip: this.ruleForm.DatabaseAddress,         //数据库地址
                  loginUserId: localStorage.userId,   //系统登陆用户编号
                  objectType: this.Equipmenting,     //设备类型
                  passwd: this.ruleForm.password,        //数据库登录用户名密码 sde
                  loginUserName: localStorage.userName,
                  user: this.ruleForm.Username        //数据库登录用户名 sde
                };
                updates(query).then(res => {
                  if (res.status === '200' || res.status === 200) {
                    this.$notify({
                      message: '修改成功',
                      type: 'success'
                    });
                    this.pageList();
                    this.dialog = false;
                  } else {
                    this.$notify({
                      message: res.message,
                      type: 'error',
                      duration: 3 * 1000
                    });
                  }
                })
              } else {
                this.$notify({
                  message: '检测成功方可修改',
                  type: 'error',
                  duration: 3 * 1000
                });
              }

            } else if (this.ishow === '1') {
              if (this.detection) {
                let query = {
                  dbName: this.ruleForm.MaintainingDatabase,   //数据库模式  维护数据库  postgres
                  dbNameNickname: this.ruleForm.Code,  //名称
                  dbType: this.Storageing,    //数据源类型  存储方式选择
                  host: this.ruleForm.port,        //数据库端口 5432
                  // id: '',         //数据源编号
                  ip: this.ruleForm.DatabaseAddress,         //数据库地址
                  loginUserId: localStorage.userId,   //系统登陆用户编号
                  objectType: this.Equipmenting,     //设备类型
                  passwd: this.ruleForm.password,        //数据库登录用户名密码 sde
                  user: this.ruleForm.Username        //数据库登录用户名 sde
                };
                registerss(query).then(res => {
                  if (res.status === '200' || res.status === 200) {
                    this.$notify({
                      message: '注册成功',
                      type: 'success'
                    });
                    this.pageList();
                    this.dialog = false;
                  } else {
                    this.$notify({
                      message: res.message,
                      type: 'error',
                      duration: 3 * 1000
                    });
                  }
                })
              } else {
                this.$notify({
                  message: '检测成功方可注册',
                  type: 'error',
                  duration: 3 * 1000
                });
              }

            }
          } else {
            console.log('error submit!!');
            return false;
          }
        })

      },
      // 存储方式选择
      changeLocationValue(val) {
        let obj = {};
        obj = this.Storages.find((item) => {
          return item.value === val;
        });
        let getName = '';
        getName = obj.label;
        this.Storageing = getName;
        console.log(this.Storageing)
        if (getName === 'mysql') {
          this.topostgresql = false;
          this.tomysql = true;
          this.toelasticsearch = false;
          this.tohbase = false;
          this.tohdfs = false;
          this.topcl = false;
          this.tomongodb = false;
          this.tofastdfs = false;
        } else if (getName === 'postgresql') {
          this.topostgresql = true;
          this.tomysql = false;
          this.toelasticsearch = false;
          this.tohbase = false;
          this.tohdfs = false;
          this.topcl = false;
          this.tomongodb = false;
          this.tofastdfs = false;
        } else if (getName === 'elasticsearch') {
          this.toelasticsearch = true;
          this.topostgresql = false;
          this.tomysql = false;
          this.tohbase = false;
          this.tohdfs = false;
          this.topcl = false;
          this.tomongodb = false;
          this.tofastdfs = false;
        } else if (getName === 'hbase') {
          this.toelasticsearch = false;
          this.tohbase = true;
          this.topostgresql = false;
          this.tomysql = false;
          this.tohdfs = false;
          this.topcl = false;
          this.tomongodb = false;
          this.tofastdfs = false;
        } else if (getName === 'hdfs') {
          this.tohdfs = true;
          this.toelasticsearch = false;
          this.tohbase = false;
          this.topostgresql = false;
          this.tomysql = false;
          this.topcl = false;
          this.tomongodb = false;
          this.tofastdfs = false;
        }
        else if (getName === 'pcl') {
          this.tohdfs = false;
          this.topcl = true;
          this.toelasticsearch = false;
          this.tohbase = false;
          this.topostgresql = false;
          this.tomysql = false;
          this.tomongodb = false;
          this.tofastdfs = false;
        } else if (getName === 'mongodb') {
          this.tohdfs = false;
          this.topcl = false;
          this.tomongodb = true;
          this.toelasticsearch = false;
          this.tohbase = false;
          this.topostgresql = false;
          this.tomysql = false;
          this.tofastdfs = false;
        } else if (getName === 'fastdfs') {
          this.tohdfs = false;
          this.topcl = false;
          this.tomongodb = false;
          this.tofastdfs = true;
          this.toelasticsearch = false;
          this.tohbase = false;
          this.topostgresql = false;
          this.tomysql = false;
        }
      },
      // 设备类型
      changeValue(val) {
        let obj = {};
        obj = this.options.find((item) => {
          return item.value === val;
        });
        let getNames = '';
        getNames = obj.label;
        this.Equipmenting = getNames;
        console.log(this.Equipmenting)
      },
      // 连接测试
      Connection(ruleForms) {
        this.$refs.ruleForms.validate((valid) => {
          if (valid) {
            this.ConnectionStatus = '连接中...';
            console.log(this.ruleForm.Storage)
            console.log(this.ruleForm.Equipment)
            let query = {
              dbName: this.ruleForm.MaintainingDatabase,   //数据库模式  维护数据库  postgres
              dbNameNickname: this.ruleForm.Code,  //名称
              dbType: this.Storageing,    //数据源类型  存储方式选择 1
              host: this.ruleForm.port,        //数据库端口 5432
              // id: '',         //数据源编号
              ip: this.ruleForm.DatabaseAddress,         //数据库地址
              loginUserId: localStorage.userId,   //系统登陆用户编号
              objectType: this.Equipmenting,     //设备类型       1
              passwd: this.ruleForm.password,        //数据库登录用户名密码 sde
              user: this.ruleForm.Username        //数据库登录用户名 sde
            };
            MainButing(query).then(res => {
              if (res.status === '200' || res.status === 200) {
                this.ConnectionStatus = '已完成';
                this.detection = true;
                this.tsing = false;
                this.$notify({
                  message: '测试成功',
                  type: 'success'
                });
              } else {
                this.detection = false;
                this.ConnectionStatus = '连接失败';
                this.tsing = true;
                this.$notify({
                  message: res.message,
                  type: 'error',
                  duration: 3 * 1000
                });
              }
            }).catch(() => {
              this.detection = false;
              this.ConnectionStatus = '连接失败';
              this.tsing = true;
              this.$notify({
                message: '连接出错',
                type: 'error',
                duration: 3 * 1000
              });
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        })

      },
      // 分页
      handleSizeChange(val) {
        this.listQuery.limit = val;

        this.pageList();
        // this.getMyData(this.pageNumber, this.pageSize);
      },
      handleCurrentChange(val) {
        this.listQuery.page = val;
        this.pageList();
        // this.getMyData(this.pageNumber, this.pageSize);
      },
      // 数据源查询是否存在
      cityChange(val) {
        console.log(val);
        if (val) {
          checkName(val).then(res => {
            if (res.status === '200' || res.status === 200) {

              if (res.data === '1' || res.data === 1) {
                this.$notify({
                  message: '已经注册,请勿重复注册',
                  type: 'error',
                  duration: 3 * 1000
                });
                this.ruleForm.Code = '';
              } else if (res.data === '0' || res.data === 0) {
                this.$notify({
                  message: '您输入的数据源可以注册',
                  type: 'success',
                  duration: 3 * 1000
                });
              }
            } else {
              this.$notify({
                message: res.message,
                type: 'error',
                duration: 3 * 1000
              });
            }
          })
        }
      },
      visi() {
        console.log(this.$refs['cascader'].currentValue);
        console.log(this.$refs['cascader'].currentLabels);
      },
    },
    created() {
    },
    mounted() {
      this.pageList();
      console.log(localStorage.userId, 'localStorage.userId')
    },
    watch: {
      sourcesing: function (val) {
        console.log(val);
      }
    }
  }

</script>

<style scoped lang="less">
  #DataSourceManagemen {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background: url("../../../icon/icon/backgroung.png");
    background-size: 100% 100%;
    padding: 0.35rem 0.2rem 0.2rem 0.2rem;
    position: relative;
    /*background: red;*/
    header {
      width: 1rem;
      height: 0.34rem;
      line-height: 0.34rem;
      font-size: 0.16rem;
      font-weight: bold;
      color: rgba(6, 108, 152, 1);
      margin: -0.34rem auto;
    }
    .DataSourceManagemen-main {
      width: 100%;
      height: 0.4rem;
      margin-top: 0.5rem;
    }
    .DataSourceManagemen-cont {
      width: 100%;
      height: 0.4rem;
      margin-top: 0.2rem;
    }
    .spanli {
      width: 0.2rem;
      height: 0.2rem;
      img {
        width: 100%;
        height: 100%;
      }
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
  #DataSourceManagemen {
    .el-select .el-tag, .el-table {
      background-color: #021132;
    }
    .el-table__body-wrapper {
      max-height: 5.4rem;
      overflow-y: visible;
      /* overflow-x: visible; */
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
    @media (max-width: 1440px) {
      .el-table__body-wrapper {
        max-height: 5.8rem;
        overflow-y: visible;
        /* overflow-x: visible; */
      }
    }
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
    .current-row {
      td {
        background-color: #194e7a !important;
        color: #ffffff !important;
      }
    }
    .el-button--primary {
      background-color: #021132;
      border: 1px solid #0CA8E3;
      width: 1.2rem;
      height: 0.32rem !important;
      font-size: 0.14rem;
      font-weight: bold;
      text-align: center;
      line-height: 0.32rem;
      padding: 0 !important;
      color: #0A9FD4;
    }
    /*...*/
    .el-row {
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .el-col {
      padding: 0 !important;
      min-height: 0.3rem;
      line-height: 0.3rem;
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
    /*...*/
    /*删除弹出框*/
    .el-message-box__title {
      color: #ffffff !important;
    }
    .el-message-box {
      background-color: #011a47 !important;
      border: 1px solid #0d273d;
    }
    .el-button--primary {
      background-color: #021132;
      border: 1px solid #0CA8E3;
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
    }
  }

  /*弹出框*/
  .el-dialog {
    background: url("../../../icon/icon/dialog.png");
    background-size: 100% 100%;
    color: #fff;
    margin-top: 1.3rem!important;
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
      padding: 0.04rem 2.52rem 0.1rem;
    }
    .el-dialog__body {
      padding: 0.29rem 0.3rem;
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
    .el-form-item.is-required:not(.is-no-asterisk) .el-form-item__label-wrap>.el-form-item__label:before, .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before{
      position: absolute;
      left: 0.22rem;
    }
  }
  @media (max-width: 1920px) {
    .el-dialog{
      margin-top: 1.3rem!important;
    }
  }
  @media (max-width: 1600px) {
    .el-dialog{
      margin-top: 1rem!important;
    }
  }
  .el-popper[x-placement^=bottom] .popper__arrow::after {
    border-bottom-color: #032b68 !important;
  }

  .el-popper[x-placement^=bottom] .popper__arrow {
    border-bottom-color: #032b68 !important;
  }

  /*....*/
  .el-message .el-icon-info {
    font-size: 0.18rem !important;
  }

  //placeholder颜色
  .el-input--suffix .el-input__inner {
    padding-right: 30px;
    color: #fff;
  }

  .el-input__inner::-webkit-input-placeholder { /* WebKit browsers */
    color: #02507d;
  }

  .el-input__inner:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #02507d;
    opacity: 1;
  }

  .el-input__inner::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #02507d;
    opacity: 1;
  }

  .el-input__inner:-ms-input-placeholder { /* Internet Explorer 10+ */
    color: #02507d;
  }

  ::-webkit-input-placeholder { /* WebKit browsers */
    color: #02507d;
  }

  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #02507d;
    opacity: 1;
  }

  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #02507d;
    opacity: 1;
  }

  :-ms-input-placeholder { /* Internet Explorer 10+ */
    color: #02507d;
  }

  #sources {
    width: 2rem;
    height: 100%;
    float: right;
    .el-select > .el-input {
      width: 1.3rem;
    }
    .el-input__inner {
      background-color: #021132;
      border: 1px solid #0CA8E3;
    }
    ::-webkit-input-placeholder { /* WebKit browsers */
      color: #0CA8E3;
    }
    .el-select .el-input .el-select__caret {
      color: #0CA8E3;
    }
    .el-input--suffix .el-input__inner {
      color: #0CA8E3;
    }
    .el-input__inner {
      height: 0.35rem;
    }
    .el-input__icon {
      line-height: .35rem;
      font-size: 0.14rem;
    }
    .el-pagination .btn-next, .el-pagination .btn-prev {
      background: transparent;
      color: #0FD0FF;
    }
  }
</style>
