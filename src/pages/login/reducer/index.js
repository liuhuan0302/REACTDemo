import {getUserLogin} from "../../../api/api"
const SET_USER_INFO = "SET_USER_INFO"

//获取后端返回的数据(获取的是字符串,转成对象)
const userInfo = JSON.parse(localStorage.getItem("userInfo"))
console.log(userInfo)

//设置默认的数据
const defaultState = {
    avater: userInfo&&userInfo.avater || "",
    nickname:userInfo&&userInfo.nickname || "",
    uid: userInfo&&userInfo.uid || "",
    authToke: userInfo&&userInfo.authToke ||"",
    userState:userInfo&&userInfo.useState || 0 
}

export default (state = defaultState,action)=>{
    switch (action.type) {
        case SET_USER_INFO:
            return action.data
        default:
            return state
    }

}

//修改数据
const setUserInfo = (data)=>({
    type:SET_USER_INFO,
    data//后端返回的数据
})

export const getUserInfo = (userInfo)=>{
    return (dispatch)=>{
        //调用后端的api,请求登录接口
        getUserLogin(userInfo).then(res=>{
            //当数数据调取成功之后,要对数据进行修改;并将从后端返回的数据传到setUserInfo
            dispatch(setUserInfo(res.data))
            //当数据据获取成功之后,进行本地缓存(避免刷新页面删除除数据)
            if(userInfo.remember){
                console.log(111)
                //如果登录时,用户选择了记住密码,则进行永久存储
                localStorage.setItem("userInfo",JSON.stringify(res.data))
            }else{
                sessionStorage.setItem("userInfo",JSON.stringify(res.data))
            }
        })
        
    }
}