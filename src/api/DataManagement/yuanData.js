import request from '@/utils/request'

export function getData(id) {
    return request({
        // url:'http://172.30.61.3:8086/recoverTab/getRecoverTab?page=1&pageSize=10',
      url: '/api/metaInfo/getMetaInfo?tabId=11',
      method: 'get'
    })
  }
  export function putData(data) {
    return request({
        // url:'http://172.30.61.3:8086/recoverTab/getRecoverTab?page=1&pageSize=10',
      url: '/api/metaInfo/updateMetaInfor',
      method: 'put',
      data:data
    })
  }
