import request from '@/utils/request'
export function getData(page,pageSize) {
    return request({
        // url:'http://172.30.61.3:8086/recoverTab/getRecoverTab?page=1&pageSize=10',
      url: '/api/recoverTab/getRecoverTab?page='+page+'&pageSize='+pageSize,
      method: 'get'
    })
  }

export function searchData(page,pageSize,term) {
    return request({
        // url:'http://172.30.61.3:8086/recoverTab/getRecoverTab?page=1&pageSize=10',
      url: '/api/recoverTab/getRecoverTab?page='+page+'&pageSize='+pageSize+'&term='+term,
      method: 'get'
    })
  }
export function deleteData(ids) {
    return request({

      url: '/api/recoverTab/deleteBatch?ids='+ids,
      method: 'delete',
      params:{}
    })
  }

export function returnData(data) {
    return request({

      url: '/api/recoverTab/restoreBatchs',
      method: 'post',
      data:data
    })
  }
