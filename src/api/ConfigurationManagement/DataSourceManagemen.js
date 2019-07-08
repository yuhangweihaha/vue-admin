import request from '@/utils/request'

// 获取数据目录tree
export function pageList(data) {
  return request({
    url: '/api/database/pageList?limit='+ data.limit + '&page=' + data.page,
    method: 'get'
  })
}
//  根据数据源编号删除数据源
export function deletes(query){
  return request({
    url:'api/database/delete',
    method:'put',
    data: query
  })
}
// 数据源连接测试
export function MainButing(query) {
  return request({
    url: '/api/database/connectTest',
    method: 'post',
    data: query
  })
}
// 注册数据源
export function registerss(query) {
  return request({
    url: '/api/database/add',
    method: 'post',
    data: query
  })
}
//  修改数据源
export function updates(query){
  return request({
    url:'api/database/update',
    method:'put',
    data: query
  })
}
// 根据数据源名称查询数据源数量 判断是否存在
export function checkName(data) {
  return request({
    url: '/api/database/checkName/' + data,
    method: 'get'
  })
}
/*// 新增数据目录
export function insertCateLog(query) {
  return request({
    url: '/api/catelog/insertCateLog',
    method: 'post',
    data: query
  })
}

// 更新数据目录
export function updateCateLog(query) {
  return request({
    url: '/api/catelog/updateCateLog',
    method: 'put',
    data: query
  })
}

// 删除数据目录
export function deleteCateLog(query) {
  return request({
    url: '/api/catelog/deleteCateLog',
    method: 'post',
    data: query
  })
}*/
