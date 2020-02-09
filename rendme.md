### react 项目搭建
    + src
        + assets
            + global.css(全局css)
            + admin
                - Header.css
                - Content.css
                - Footer.css 
            + login
        + index.js(入口文件)(渲染组件)
            + import {Provider} from "react-redux"(绑定react-redux 可以让组件共享store里面的数据)
                <Provider store={store}>
                    <App />
                </Provider>
        + App.js(组件)
        + components
        + pages
            - login
                + components
                    - Header.js
                    - Content.js
                    - Footer.js
                + index.js(login組件)
            - admin 
                + components
                    - Header.js
                    - Content.js(可以接待storel里面的数据)
                        import {getUseList} from "../../admin/store/content.redux"
                        import {connect} from "react-redux"
                        const mapStateToProps = state=>{
                            return {
                                content:state.contentReducer
                            }
                        }
                        export default connect(mapStateToProps,{getUseList})(RouterContent);
                    - Footer.js
                + index.js
                + store
                    + content.redux.js(存储admin组件的数据)
                        //設置默認數據
                        const defaultState = {
                            listData:[]
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
                    + actionCreator.js(存储派发的dispatch)
                        import { getUserList} from "../../../api/api"
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
                    + actionType.js 
                        const GET_USER_LIST = "GET_USER_LIST"
            - NotFound
                + NotFound.js
        + store
            - reducer.js(合并组件的reducer)(combineReducer)
                import {combineReducers} from "redux"
                import contentReducer from "../pages/admin/store/content.redux";//取出contentReducer
                //合併reducers
                const reducers = combineReducers({
                    contentReducer
                })
                export default reducers;
            - store.js(存储数据的仓库)(引入thunk 中间件,操作异步数据)
                import {createStore,applyMiddleware} from "redux";
                import thunk from 'redux-thunk'
                import reducers from "./reducer"
                const store = createStore(reducers,applyMiddleware(thunk));
                export default store; 
        + api(接口文件)
            + aixos(拦截请求 和响应请求)
                import axios from "axios"
                //1.實例化axios
                const service = axios.create({
                    baseURL:"http://rap2api.taobao.org/app/mock/238550"
                })
                //2.請求攔截
                service.interceptors.request.use(config=>{
                    return config
                })
                //3.響應攔截
                service.interceptors.response.use(res=>{
                    return res.data
                })
                export default service;
            + api(请求后端的数据)
                import axios from "./axios";
                //請求後端數據
                export const getUserList = ()=>{
                    return axios.post("/api/userList")
                }
註:
    1.一頁面一各組件
    2.組件板塊劃分詳細
### App.js(组件的管理)
    通过路由来实现页面的跳转


### 默认样式 reast css

### 下载文件
    安装:npm install xlsx -D(可以在react ,vue,node等都可以使用)
    点击:react-sheet
    引入:import XLSX from "xlsx";
    下载excal文件:
        //下载excal 表格
        downLoadExcal = ()=>{
            //循环遍历(this.state.columns 取出表头)
            let titleArray = [],
                excal =[titleArray]
            this.state.columns.map(item=>{
                titleArray.push(item.title)
            })
            this.state.data.map(item=>{
                    excal.push([
                    item.id,
                    item.title,
                    item.author,
                    item.amount,
                    item.createAt,
                ])
        })
            console.log(excal)
            // 下载必须是一个二维数组(表头:["a","b"] 表的内容:[1,2])
            const ws = XLSX.utils.aoa_to_sheet(excal);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
            /* generate XLSX file and send to client */
            XLSX.writeFile(wb, "h5-1920.xlsx")
        }

### 登录流程
    + 后端数据设置
        
         data:{
             avater:"用户头像"
             nickname:"用户昵称"
             uid:"用户唯一的id"(可以跨平台)
             uuid:"用户id"(有时效性,每30分钟过期)
             authTake:"aaaadadwewe"自动生成(可以用来判断用户的合法性)
             userState:"用户身份" vip svip(通过字符串判断是什么样的用户)
         } 

    + 点击按钮登录(点击事件)(点击之后,将用户名传到后端进行校验)(如果后端校验成功则跳转详情页`  面)
        - 获取getUserInfo方法,需要共享renducer
            import {connect} from "react-redux"
            import {getUserInfo} from "../reducer"
         handleSubmit = e => {
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    // console.log(values)
                    //values 是获取获取用户输入的用户名和密码
                    this.props.getUserInfo(values)
                    //当数据据调取成功之后,进行页面的跳转
                    this.props.history.push("/admin/articlelist")
                }
            });
        }
        - 通过history.push() 进行跳转(但必须是路由组件)
            export default connect(mapStateToProps,{getUserInfo})(withRouter(LoginConents));
            import {withRouter} from "react-router-dom"
            this.props.history.push("/admin/articlelist")
    + store.js(通过applyMiddleware 和 thunk插件,绑定异步方法)
        import {createStore,applyMiddleware} from "redux";
        import thunk from 'redux-thunk'
        import reducers from "./reducer"
        const store = createStore(reducers,applyMiddleware(thunk));

        export default store; 
    + reducers(通过combineReducers 对reducer进行合并)
        import {combineReducers} from "redux"
        import contentReducer from "../pages/article/store/content.redux";//取出contentReducer
        import login from "../pages/login/reducer"
        //合併reducers
        const reducers = combineReducers({
            contentReducer,
            login
        })
        export default reducers;
    + login/redcer/index.js
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
    + axios 设置拦截器
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
    + api(请求后端数据)
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
    + 设置本地存储(登录后直接跳转到首页,没有登录跳到登录页)
        import React,{Component} from "react";
        import {Redirect} from "react-router-dom"
        import {connect} from "react-redux"
        class DashBorad extends Component {
            render(){
                console.log(this.props.login.authToke)
                return(
                    //判断如果登录了,则直接跳到仪表盘页,没有登录,则跳到登录页面
                    this.props.login.authToke ? 
                    <div>DashBorad</div> : <Redirect to="/login"/>
                )
            }
        }
        const mapStateToProps = (state)=>{
            return {
                login:state.login
            }
        }
        export default connect(mapStateToProps)(DashBorad);