//引入api 中请求数据的方法
import { getUserList} from "../../../api/api"

const GET_USER_LIST = "GET_USER_LIST"

//設置默認數據
const defaultState = {
    listData:[1,2,3]
}

export default (state= defaultState,action)=>{
    //对state进行深拷贝
    const newState = JSON.parse(JSON.stringify(state))
    switch(action.type){
        case GET_USER_LIST:
            //将老值和新值合并action.data 拿到的是一个数组
            console.log(action.data)
            newState.listDate = [...newState.listData,...action.data.userList]
            return newState
        default:
            return state
    }
}

//修改数据的方法
const setListData = (data)=>{
    return{
        type:GET_USER_LIST,
        data
    }
}

//請求數據(reducer 不可以直接操作方法,必須通過一個中間鍵)(异步操作数据)
export  const getUseList = ()=>{
    return (dispatch)=>{
        console.log(getUserList())
        getUserList().then(res=>{
            //对请求返回的数据进行处理
            dispatch(setListData(res.data))
        })
    }
}