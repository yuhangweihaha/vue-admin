import request from '@/utils/request'
// 操作日志
export function Operational(data) {
  return request({
    url: '/api/log/handleLogPageList?endDate=' + data.endDate + '&limit=' + data.limit + '&page=' + data.page + '&startDate=' + data.startDate + '&userName=' + data.userName,
    method: 'get'
  })
}
// 登录日志
export function LogonLog(data) {
  return request({
    url: '/api/log/ioLogPageList?endDate=' + data.endDate + '&limit=' + data.limit + '&page=' + data.page + '&startDate=' + data.startDate + '&userName=' + data.userName,
    method: 'get'
  })
}
//  删除操作日志
export function deleteHandleLogs(query){
  return request({
    url:'api/log/deleteHandleLog',
    method:'put',
    data: query
  })
}
//  删除登录日志
export function deleteIoLog(query){
  return request({
    url:'api/log/deleteIoLog',
    method:'put',
    data: query
  })
}
// 导出操作日志
export function exportHandleLog(query) {
  return request({
    url: '/api/log/exportHandleLog',
    method: 'post',
    data: query
  })
}

// 系统配置查询
export function select() {
  return request({
    url: '/api/systemconfig/select',
    method: 'get'
  })
}

// 系统配置保存
export function adds(query) {
  return request({
    url: '/api/systemconfig/save',
    method: 'post',
    data: query
  })
}

export function optldm() {//get provincedata
  return request({
    url: '/gsupserver/Map/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Map%3Aprovince&maxFeatures=50&outputFormat=application%2Fjson',
    method: 'get'
  });
}
/*export function optldm() {//get provincedata
  return request({
    url: 'http://172.30.17.154:8080/gsupserver/vector/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=vector%3Akm_rsp&maxFeatures=50&outputFormat=application%2Fjson',
    method: 'get'
  });
}*/
/*export function getDataByname() {
  return request({
    url: '/gsupserver/admin/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=admin:kfc_201965_82&outputFormat=application%2Fjson',
    method: 'get'
  })
}*/
export function getDataByname() {
  return request({
    url: '/gsupserver/Map/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Map%3Acapital&maxFeatures=50&outputFormat=application%2Fjson',
    method: 'get'
  })
}

// 数据内容表头
export function headering() {
  return request({
    url: '/api/dataManagement/getColumnName/1',
    method: 'get'
  })
}

// 数据内容表格
export function tableing(data) {
  return request({
    url: '/api/dataManagement/getDataList?page=' + data.page + '&pageSize=' + data.pageSize + '&connectId=' + data.connectId,
    method: 'get'
  })
}
export function visualization() {
  return request({
    url: '/api/dataManagement/getDataListShow/2',
    method: 'get'
  })
}
export function previews(query) {
  return request({
    url: '/api/tool/userImport/data/preview?encoding=' + 'UTF-8' + '&fileName=' + 'kfc.xls' + '&fileUrl=' + 'group1/M00/00/57/rB4Rsl0SgJmAEJfiAAGMAJaQpCQ805.xls' + '&dataImportType=' + '1',
    method: 'get',
  })
}

// 删除数据
export function delect(query) {
  return request({
    url: '/api/dataManagement/deleteData',
    method: 'post',
    data: query
  })
}
// 获取表列名和主键-跳到添加页面
export function getColumnNameAndPk() {
  return request({
    url: '/api/dataManagement/getColumnNameAndPk/2',
    method: 'get'
  })
}

// 列表添加
export function insertData(query) {
  return request({
    url: '/api/dataManagement/insertData/2',
    method: 'post',
    data: query
  })
}

// 列表修改
export function updateData(query) {
  return request({
    url: '/api/dataManagement/updateData/2',
    method: 'post',
    data: query
  })
}
