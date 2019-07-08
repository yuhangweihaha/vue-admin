import {
  loginByUsername,
  loginByUser,
  logout/*,
  getInfo,
  getMenus*/
} from '@/api/login'
import {
  Message
} from 'element-ui'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    menus: undefined,
    eleemnts: undefined,
    permissionMenus: undefined,
    userId:'',
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    setInfo (state, userId) {
      state.userId = userId
      console.log("store log is:",state.userId);
    },
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_MENUS: (state, menus) => {
      state.menus = menus
    },
    SET_ELEMENTS: (state, elements) => {
      state.elements = elements
    },
    LOGIN_SUCCESS: () => {
      console.log('login success')
    },
    LOGOUT_USER: state => {
      state.user = ''
    },
    SET_PERMISSION_MENUS: (state, permissionMenus) => {
      state.permissionMenus = permissionMenus
    }
  },

  actions: {
    // 用户名登录管理员
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.pwd).then(response => {
          console.log(response.data.userId)
          // this.userId=response.data.userId
          commit('setInfo', response.data.userId)
          const data = response
          if (data.data.access_token === '' || data.data.access_token === undefined) {
            Message({
              message: '账户或密码错误！',
              type: 'warning'
            })
            return Promise.reject('error')
          } else {
            //console.log(response)
            const token = 'Bearer ' + data.data.access_token;
            const userId = data.data.userId

            setToken(token)
            commit('SET_TOKEN', token);
            commit('SET_NAME', data.data.userName)
           
            localStorage.userName = data.data.userName
            localStorage.userId = data.data.userId
            // localStorage.userPassword = userInfo.pwd
            localStorage.token = 'Bearer ' + data.data.access_token
           /* setTimeout(function () {
              setToken(localStorage.token)
            },500)*/
            resolve()
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 用户名登录普通用户
    LoginByUser({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUser(username, userInfo.pwd).then(response => {
          console.log(response)
          const data = response
          if (data.data.access_token === '' || data.data.access_token === undefined) {
            /*  Message({
                message: '账户或密码错误！',
                type: 'warning'
              })*/
            return Promise.reject('error')
          } else {
             console.log(response)
             localStorage.userName=response.data.userName
            const token = 'Bearer ' + data.data.access_token;
            setToken(token)
            commit('SET_TOKEN', token);
            resolve()
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    /*  getInfo() {
          getInfo(typeid).then(response => {
            const data = response
            console.log(data,'zhenburongyi')
          }).catch(error => {
            reject(error)
          })
      },

      // 获取用户信息
      GetInfo({ commit }) {
        return new Promise((resolve, reject) => {
          getInfo().then(response => {
            const data = response
            commit('SET_ROLES', 'admin')
            commit('SET_NAME', data.name)
            commit('SET_AVATAR', 'http://git.oschina.net/uploads/42/547642_geek_qi.png?1499487420')
            commit('SET_INTRODUCTION', data.description)
            const menus = {}
            for (let i = 0; i < data.menus.length; i++) {
              menus[data.menus[i].code] = true
            }
            commit('SET_MENUS', menus)
            const elements = {}
            for (let i = 0; i < data.elements.length; i++) {
              elements[data.elements[i].code] = true
            }
            console.log(elements);
            commit('SET_ELEMENTS', elements)
            resolve(response)
          }).catch(error => {
            reject(error)
          })
          getMenus().then(response => {
            commit('SET_PERMISSION_MENUS', response)
          })
        })
      },*/

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        const token = state.token
        commit('SET_TOKEN', '')
        logout(token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          commit('SET_MENUS', undefined)
          commit('SET_ELEMENTS', undefined)
          commit('SET_PERMISSION_MENUS', undefined)
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({
      commit
    }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        commit('SET_MENUS', undefined)
        commit('SET_ELEMENTS', undefined)
        commit('SET_PERMISSION_MENUS', undefined)
        removeToken()
        resolve()
      })
    }
  }
}

export default user
