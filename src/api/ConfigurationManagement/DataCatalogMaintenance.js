import request from '@/utils/request'

// 获取数据目录tree
export function getTree() {
  return request({
    url: '/api/catelog/getTree',
    method: 'get'
  })
}

// 新增数据目录
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
export function deleteCateLog(id) {
  return request({
    url: '/api/catelog/deleteCateLog?id=' + id,
    method: 'delete'
  })
}

// 移动tree node节点s
export function moveCateLog(query) {
  return request({
    url: '/api/catelog/moveCateLog',
    method: 'post',
    data: query
  })
}

// 通过id获取右侧目录数据
export function getCateLogByid(id) {
  return request({
    url: '/api/catelog/getCateLogByid?id=' + id,
    method: 'get'
  })
}

// 获取目录类型
export function getCateLogType() {
  return request({
    url: '/api/catelog/getCateLogType',
    method: 'get'
  })
}


export function selectRecord() {
  return request({
    url: '/api/catelog/selectRecord',
    method: 'get'
  })
}

export function getSchemaAndTab(data) {
  return request({
    url: '/api/catelog/getSchemaAndTab?catelogId=' + data.catelogId + "&dbId=" + data.dbId,
    method: 'get'
  })
}

// 删除所有
export function clearAll() {
  return request({
    url: '/api/catelog/clearAll',
    method: 'delete'
  })
}

// 导出
export function deriveExecl() {
  return request({
    url: '/api/catelog/deriveExecl',
    method: 'get',
    responseType: 'blob'
  })
}

export function insertTableInfo(query) {
  return request({
    url: '/api/catelog/insertTableInfo',
    method: 'post',
    data:query
  })
}

