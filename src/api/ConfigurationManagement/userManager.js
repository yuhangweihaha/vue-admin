import request from '@/utils/request'

export function getData(id) {
    return request({
        url:'/api/admin/user/getUserById/'+id,

      method: 'get'
    })
  }