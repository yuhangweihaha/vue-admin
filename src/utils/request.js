import axios from 'axios'
import {
  Message,
  MessageBox,
  Notification
} from 'element-ui'
import store from '@/store'
import {
  getToken
} from '@/utils/auth'

// create an axios instance
const service = axios.create({
  //baseURL: process.env.BASE_API, // api的base_url-接口
  //baseURl:window.location.orgin,
  // baseURL:"http://172.30.17.202:8787",

  timeout: 30000000 // request timeout
})

// request拦截器
service.interceptors.request.use(config => {
  // Do something before request is sent
  if (store.getters.token) {
    config.headers.Authorization = getToken(); // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行编辑
  } else {
    // config.headers.Authorization = 'Basic dnVlOnZ1ZQ=='; // 增加客户端认证 202服务器
    //  config.headers.Authorization = 'Basic c2t5em9uZ2hlc2h1anVndWFubGk6MTIzNDU2'; //209服务
     config.headers.Authorization = 'Basic d3VsaWFud2FuZ2ppZXJ1OjEyMzQ1Ng==';

  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
     * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
     * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
     */
    const res = response.data
    // if (response.status === 401 || res.status === 40101) {
    //   MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
    //     confirmButtonText: '重新登录',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     store.dispatch('LogOut').then(() => {
    //       location.reload() // 为了重新实例化vue-router对象 避免bug
    //     })
    //   })
    //   return Promise.reject('error')
    // }
    // if (res.status === 30101) {
    //   Message({
    //     message: res.message,
    //     type: 'error',
    //     duration: 5 * 1000
    //   })
    //   return Promise.reject('error')
    // }
    // if (res.status === 40301) {
    //   Message({
    //     message: '当前用户无相关操作权限！',
    //     type: 'error',
    //     duration: 5 * 1000
    //   })
    //   return Promise.reject('error')
    // }
    if (response.status !== 200) {
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject('error');
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    const response = error.response
    if (response === undefined) {
      Message({
        message: '服务请求超时！',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error)
    }
    if (response.status === 400) {
      Message({
        message: '账户或密码错误！',
        type: 'warning'
      })
      return Promise.reject('error')
    }
    const info = response.data
    if (response.status === 401 && info.status === 40101) {
      MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('LogOut').then(() => {
          this.$router.push({
            path: '/login'
          })
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      })
    }
    if (response.status === 401 && info.status === 40001) {
      Notification.warning({
        title: '禁止',
        message: info.message,
        type: 'error',
        duration: 2 * 1000
      })
      return Promise.reject('error')
    }
    if (response.status === 403) {
      Notification.warning({
        title: '禁止',
        message: info.message,
        type: 'error',
        duration: 2 * 1000
      })
      return Promise.reject('error')
    }
    if (info.status === 30101) {
      Notification.warning({
        title: '失败',
        message: info.message,
        type: 'error',
        duration: 2 * 1000
      })
      return Promise.reject('error')
    }
    if (response.status === 504) {
      Message({
        message: '后端服务异常，请联系管理员！',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error)
    }
    Message({
      message: info.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
