import axios from "axios";
import {Toast} from "vant";
import { getToken } from "./auth";
import store from "../store";

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 10000 // request timeout
})

// 请求拦截
service.interceptors.request.use(
    config => {
        // do something before request is sent

        if (store.getters.token) { //判断是否有cookie，有的话加在请求头中
            // let each request carry token
            // ['X-Token'] is a custom headers key
            // please modify it according to the actual situation
            config.headers['X-Token'] = getToken()
        }
        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// 响应拦截
service.interceptors.response.use(
    response => {
    const res = response.data;
    if (res.code !== 200) {
        Toast({
            message: res.message || "Error"
        });
    } else {
        return res;
    }
},
error => {
    console.log('err' + error) // for debug
    Toast({
        message: "加载失败，请求超时"
    });
    return Promise.reject(error)
  }
)

export default service;
