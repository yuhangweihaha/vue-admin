import request from '@/utils/request'



export function loginByUsername(username, password) {
  const data = {
    username,
    password,
    grant_type: 'password'
  }
  return request({
    //url:'/api/auth/oauth/token',
    url:'/lgn/api/ssocenter/login',
    // url: '/api/ssoclient/login/admin',
    method: 'post',
    data,
    transformRequest: [function(data) {
      // Do whatever you want to transform the data
      let ret = ''
      for (const it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }

      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
export function loginByUser(username, password) {
  const data = {
    username,
    password,
    grant_type: 'password'
  }
  return request({
    url: '/api/ssoclient/login/portal',
    method: 'post',
    data,
    transformRequest: [function(data) {
      // Do whatever you want to transform the data
      let ret = ''
      for (const it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      console.log(ret,)
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
export function logout(token) {
  return request({
    url: '/lgn/api/ssocenter/logout/user',
    method: 'delete',
    params: {
      accessToken: token
    }
  })
}
/*export function logout(token) {
  return request({
    url: '/api/ssoclient/logout/point',
    method: 'delete',
    params: {
      accessToken: token
    }
  })
}*/
