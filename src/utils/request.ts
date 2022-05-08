import axios from 'axios'
import { getToken } from './token'
import Swal from 'sweetalert'
const request = axios.create({
  baseURL: 'http://localhost:3001',
})
request.interceptors.request.use((config: any) => {
  const token = getToken()
  // console.log(token)
  if (token) {
    config.headers.Authorization = token
  }
  // console.log(config)
  return config
})
request.interceptors.response.use(
  (config) => {
    return config
  },
  (err) => {
    Swal({
      title: '出现错误',
      text: err.response.data.message,
      icon: 'error',
    })
  }
)
export default request
