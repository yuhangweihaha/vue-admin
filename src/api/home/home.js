import request from '@/utils/request'

export function getCountByCateLogId(id) {
  return request({
    url: '/api/index/getCountByCateLogId?cateLogId=' + id,
    method: 'get'
  })
}

export function ioLogTopHundred() {
  return request({
    url: '/api//index/ioLogTopHundred',
    method: 'get'
  })
}
