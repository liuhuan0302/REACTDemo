### 项目搭建
    + src
        + api
            - api.js(统一管理api接口)
            - axios.js(设置请求拦截器 和 响应拦截器)
        + assets
            + css
            + img
        + components
             + Frame
                - index.js(admin 页面)
        + pages
            +  article
                + components
                + store 
                    - content.redux.js
                - Edit.js(文章的修改)
                - List.js(文章的列表)
                - index.js(首页的入口文章)(通过路由控制这个页面)

            + dashborad(仪表盘)
                - index.js
            + login
                - components
                - index.js
            + NotFound
                - notFound.js(404页面)
            + setting
                - index.js
            - index.js(页面暴露统一路径)(路由懒加载)
        + routes
            - index.js(路由表)
        + store
            - store.js
            - reducer.js 
        - App.js
        - index.js

#### react项目搭建步骤
    + 规划项目结构(采用什么框架,有多少页面,有多少功能)
    + 静态页面搭建
    + 路由表的配置(统一管理路由)
        + 统一暴露组件(page/index.js)(可以做懒加载)(在page里面做)
        + 路由表的制作(route/index)(路由统一管理)(一级路由 二级路由)
    + index.js(入口文件)
       (可以在这里面只做渲染)
    + App.js(总揽页面有多少一级路由)
        循环一级路由
    + index.js(首页)
        循环二级路由(首页的路由)
    + axios(统一管理前后端交互的接口和axios请求)
    + 页面中主要功能的实现(路由的切换(跳转),前后端数据交互,数据渲染,参数的传递)
        

        

#### 将时间戳转成时间(moment类库)
    + 安装: npm install moment --save
    + moment(111111111111).format("YYYY-MM-DD HH:mm:ss")


#### 统一管理暴露组件
    + 管理组件(pages/index.js)
        import ArticleList from "./article/List"
        import ArticleEdit from "./article/Edit";
        import DashBorad from "./dashborad";
        import Login from "./login";
        import Setting from "./setting";
        import NotFound from "./NotFound/notFound";

        export {
            ArticleList,
            ArticleEdit,
            DashBorad,
            Login,
            Setting,
            NotFound
        }
    + 制作路由表(routes/index.js)
        import {
            ArticleList,
            ArticleEdit,
            DashBorad,
            Login,
            Setting,
            NotFound
        } from "../pages"

        //一级路由
        export const mainRoutes = [{
            pathname:"/login",
            component:Login
        },{
            pathname:"/404",
            component:NotFound
        }]

        //二级路由
        export const adminRoutes = [{
            pathname:"/admin/articlelist",
            component: ArticleList,
            title:"文章列表",
            isNav:true,//判断是否左侧导航
            icon:"menu-fold"
        },{
            pathname:"/admin/articleEdit/:id",//id是为动态更改文章
            component:ArticleEdit,
            isNav:"false"
        
        },{
            pathname:"/admin/dashborad",
            component:DashBorad,
            title:"仪表盘",
            isNav:true,
            icon:"dashboard"
        },{
            pathname:"/admin/setting",
            component:Setting,
            title:"设置",
            isNav:true,
            icon:"setting"
        }]

#### 一级路由渲染(index.js)
    import React, { Component } from "react";
    import ReactDOM from "react-dom";
    import {Provider} from "react-redux"
    import {BrowserRouter as Router, Route , Switch,Redirect} from "react-router-dom"
    import store from "./store/store"
    import 'antd/dist/antd.css'
    import "./assets/css/global.css"
    import {mainRoutes} from "./routes/index"
    import App from "./App"


    ReactDOM.render(
    //可以让App组件共享store里面的数据
    (<Provider store={store}>
        <Router>
            <Switch>
                <Route path="/admin" render={()=><App />} />
                {
                    mainRoutes.map(route=>{
                        console.log(route)
                        return <Route key={route.pathname} path={route.pathname} component={route.component}/>
                    })
                }
                <Redirect to="/admin" from="/" exact/>
            </Switch>
        </Router>
    </Provider>)
    ,document.getElementById("root"))

#### 二级路由渲染(首页渲染)
    import React, { Component } from "react";
    import {  Route, Redirect ,Switch} from "react-router-dom";
    import {adminRoutes} from "./routes";
    import Frame from "./components/Frame"
    class App extends Component {
    render() {
        return (
        // 如果把路由包裹在组件中,会把当前的路由传递该组件中
        //让路由在组件内渲染,可以在组件内通过this.props.children渲染该组件
        <Frame>
            <Switch>
            { 
                adminRoutes.map(route=>{
                    return <Route key={route.pathname} path={route.pathname} render={(routeProps) =><route.component {...routeProps}/>} />
                    })
                }
            </Switch>
        </Frame>
        )
    }
    }

    export default App;

#### api(统一管理接口)
    + axios(设置请求拦截和响应拦截,对数据进行处理)
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

    + api
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

#### 首页的功能版块
     + 请求列表数据
        deleteList(id,index){
            //当点击删除时,会调用后端的接口(会返回后端响应的信息,同时也会传入要删除文章的id)
            deleteArticle(id).then(res=>{
                //当删除提醒出现之前,要想重新调用数据库里面的数据
            //  this.getListRequest("delete",res.data.message)
            this.state.data.splice(index,1)
            this.setState({
                data : this.state.data
            })
            })
        }
    + 点击删除
        handleClick=(record,index)=>{
            console.log(record)
            Modal.confirm({
                title:"当前删除不可逆,是否确认要进行删除?",
                content:<Text>当前删除的文章是:<span style={{color:"red"}}>{record.title}</span></Text>,
                cancelText:"点错了,不想删除",
                okText:"确认删除",
                okType:"danger",
                onOk:()=>{
                //调用删除文章的接口(删除文章)
                    this.deleteList(record.id,index)
                }
            })
        }
    + 请求列表数据
        getListRequest = (type,msg)=>{
        //数据库返回的数据
            getUserList().then(res=>{
                res.data.list.map(item=>{
                item.createAt = moment(item.createAt).format("YYYY-MM-DD HH:mm:ss") 
                return item
                })
                this.setState({
                data:[...res.data.list]
                },_=>{
                this.setState({
                    loading:false
                })
                //当删除完数据之后,需要重新调用数据(调用完数据,在弹出文章删除成功)
                type === "delete"&&message.success(msg)
                })
            });
        }
    + 跳转的编辑页
        jumpEdit = (id)=>{
            this.props.history.push(`/admin/articleEdit/${id}`)
            console.log(this.props)
        }
    + 渲染页面
        render() {
            return (
                <div>
                    <Card bordered={false} title="文章列表" extra={<Button>下载excal</Button>} style={{ width: "100%" }}>
                    <ConfigProvider locale={zhCN}>
                    <Table 
                    // record 是请求的数据
                        rowKey={(record)=>record.id} 
                        columns={this.state.columns} 
                        dataSource={this.state.data} 
                        loading={this.state.loading}
                    />
                    </ConfigProvider>
                    </Card>
                </div>
            )
        }
    + 接收后端返回的数据
        componentDidMount(){
            this.getListRequest();
        }



