import axios from "axios";

//1.實例化axios
const service = axios.create({
    baseURL:"http://rap2api.taobao.org/app/mock/238550"
})

//2.請求攔截
service.interceptors.request.use(config=>{
    //通过浅拷贝,携带一个authToken 带到数据库中
    config.headers = Object.assign({},config.headers,{
        authToken:"1234455555"
    })
    return config
})

//3.響應攔截
service.interceptors.response.use(res=>{
    return res.data
})

export default service;