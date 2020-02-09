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


