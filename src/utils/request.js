import axios from 'axios'
import {
  Message
} from 'element-ui'
import store from '@/store'
// import {
//   Encrypt,
//   Decrypt
// } from './aesEncrypt.js'
import { getToken } from '@/utils/jsToken'

// create instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,  //api url
  timeout: 10000 // request timeout
})

axios.defaults.baseURL = ''

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (store.getters.token) {
      config.headers['Authorization'] = 'Bearer ' + getToken()
    }
    console.log(config)
    return config
  },
  error => {
    // do something with request error
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    console.log(response)
    console.log(res)
    return res
  },
  error => {
    console.log('err' + error) // error
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
