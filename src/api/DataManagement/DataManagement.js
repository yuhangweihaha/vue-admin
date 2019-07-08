import request from '@/utils/request'

// 获取 getDataManagement
export function getDataManagement(query) {
  return request({
    url: '/api/dataManagement/getDataManagement?endTime=' + query.endTime +'&page=' + query.page + "&pageSize=" + query.pageSize + "&startTime=" + query.startTime + "&term=" + query.term + "&tabIds=" + query.tabIds,
    method: 'get'
  })
}

// 更新单个对象
export function updateDataManagement(query) {
  return request({
    url: '/api/dataManagement/updateDataManagement',
    method: 'put',
    data: query
  })
}

// 删除单个对象
export function deletes(query) {
  return request({
    url: '/api/dataManagement/delete',
    method: 'put',
    data: query
  })
}

// 导出数据
export function exportData(query) {
  return request({
    url: '/api/dataManagement/exportData',
    method: 'post',
    data: query
  })
}

// 通过id查看单个

