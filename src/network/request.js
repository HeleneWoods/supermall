import axios from 'axios'

export function request(config) {
  const isntance1 = axios.create({
    baseURL: 'http://152.136.185.210:8000/api/n3',
    timeout: 3000
  })

  isntance1.interceptors.request.use(config => {

      return config
    }, err => {})
    // 2.2. 响应拦截
  isntance1.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err);
  })

  return isntance1(config)
}
