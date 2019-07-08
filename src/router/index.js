import Vue from 'vue'
import Router from 'vue-router'
import {
  getToken
} from '@/utils/auth' // getToken from cookie
const _import = require('./_import_' + process.env.NODE_ENV)
Vue.use(Router)
const appRouter = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: _import('login/login'),
  },
  {
    path: '/entrypage/home',
    redirect: _import('home/home'),
  },
  {
    path: '/entrypage',
    name: '/entrypage',
    component: _import('entrypage/entrypage'),
    children: [
      // 首页
      {
        path: '/home',
        name: 'home',
        component: _import('home/home'),
      },
      // 数据入库
          {
            path: '/DataInput',
            name: 'DataInput',
            component: _import('DataInput/DataInput'),
            children: [
              // 数据集目录
              {
                path: '/DataSetCatalogue',
                name: 'DataSetCatalogue',
                component: _import('DataInput/components/DataSetCatalogue'),
              },
              // 入库任务列表
              {
                path: '/InputTaskList',
                name: 'InputTaskList',
                component: _import('DataInput/components/InputTaskList'),
              },
              // 入库任务
              {
                path: '/WarehousingMission',
                name: 'WarehousingMission',
                component: _import('DataInput/components/WarehousingMission'),
              },
            ]
          },
      // 配置管理
      {
        path: '/ConfigurationManagement',
        name: 'ConfigurationManagement',
        component: _import('ConfigurationManagement/ConfigurationManagement'),
        children: [
          // 数据目录维护
          {
            path: '/DataCatalogMaintenance',
            name: 'DataCatalogMaintenance',
            component: _import('ConfigurationManagement/components/DataCatalogMaintenance'),
          },
          // 数据元管理
          {
            path: '/DataSourceManagemen',
            name: 'DataSourceManagemen',
            component: _import('ConfigurationManagement/components/DataSourceManagemen'),
          },
          // 元数据编码维护
          {
            path: '/MetadataCoding',
            name: 'MetadataCoding',
            component: _import('ConfigurationManagement/components/MetadataCoding'),
          },
          // 历史数据版本维护
          {
            path: '/HistoricalDataMaintenance',
            name: 'HistoricalDataMaintenance',
            component: _import('ConfigurationManagement/components/HistoricalDataMaintenance'),
          },
          // 历史数据版本更新
          {
            path: '/HistoricalDataUpdate',
            name: 'HistoricalDataUpdate',
            component: _import('ConfigurationManagement/components/HistoricalDataUpdate'),
          },
        ]
      },
      // 数据管理 DataRecyclingBin
      {
        path: '/DataManagement',
        name: 'DataManagement',
        component: _import('DataManagement/DataManagement'),
      },
      {
        path: '/DataManageMsg',
        name: 'DataManageMsg',
        component: _import('DataManagement/components/DataManageMsg'),
      },
      // 数据回收站
      {
        path: '/DataRecyclingBin',
        name: 'DataRecyclingBin',
        component: _import('DataRecyclingBin/DataRecyclingBin'),
      },
      // 设置
      {
        path: '/SetUp',
        name: 'SetUp',
        component: _import('SetUp/SetUp'),
        children: [
          // 系统配置
          {
            path: '/SystemConfiguration',
            name: 'SystemConfiguration',
            component: _import('SetUp/components/SystemConfiguration'),
          },
          // 数据操作日志
          {
            path: '/DataOperationLog',
            name: 'DataOperationLog',
            component: _import('SetUp/components/DataOperationLog'),
          },
          // 用户登录日志mapLog
          {
            path: '/UserLoginLog',
            name: 'UserLoginLog',
            component: _import('SetUp/components/UserLoginLog'),
          },
          // 用户登录日志
          {
            path: '/mapLog',
            name: 'mapLog',
            component: _import('SetUp/components/mapLog'),
          },
          {
            path: '/UserManager',
            name: 'UserManager',
            component: _import('SetUp/components/UserManager'),
          },
        ]
      },
        ],
  },
];
/* {
   path: '/entrypage',
   name: 'entrypage',
   component: _import('entrypage/entrypage'),
 },*/
const router = new Router({
  // mode: 'history',
  base: '/client/',
  redirect: {
    name: 'entrypage'
  },
  routes: appRouter
})

router.beforeEach(function (to, from, next) { // 路由拦截
  // debugger;
  const nextRoute = [
    'home',
    'DataInput',
    'DataSetCatalogue',
    'InputTaskList',
    'WarehousingMission',
    'ConfigurationManagement',
    'DataCatalogMaintenance',
    'DataSourceManagemen',
    'MetadataCoding',
    'HistoricalDataMaintenance',
    'HistoricalDataUpdate',
    'DataManagement',
    'DataRecyclingBin',
    'SystemConfiguration',
    'DataOperationLog',
    'UserLoginLog'
    ]; // 在跳转前需要登录的页面的路由

  if (nextRoute.indexOf(to.name) >= 0) {
    if (getToken() == undefined || getToken() == null || getToken() == '') { //未登录
      router.push({
        path: '/login'
      })
    } else {
      next();
    }
    return
  }
  if (to.name === 'login') {
    if (getToken()) {
      //console.log('已登录');
      router.push({ path: '/home' });
    }
  }
  next();
});
export default router
