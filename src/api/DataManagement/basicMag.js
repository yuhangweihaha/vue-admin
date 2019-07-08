import request from '@/utils/request'

export function getData(id) {
    return request({
        // url:'http://172.30.61.3:8086/recoverTab/getRecoverTab?page=1&pageSize=10',
      url: '/api/dataManagement/getDataManagementById/1',
      method: 'get'
    })
  }
