import axios from "./axios";

//請求後端數據
export const getUserList = ()=>{
    return axios.post("/api/articlelist")
}

//删除文章的接口(将需要删除的文章的id 传递到后端)
export const deleteArticle = (id)=>{
    return axios.post("/api/delectArtcile",{
        id,//传入到后端的值
    })
}

//请求登录信息的接口(obj 是登录的用户名和密码)
export const getUserLogin = (obj)=>{
    return axios.post("/api/login",obj)
}