const proxy = require("http-proxy-middleware");

//暴露
module.exports = (app)=>{
    //参数1:通过哪个路径进行访问
    app.use("/api",proxy({
        //代理的主机
        target:"http://localhost:8888",
        //重写访问路径
        pathRewrite:{
            "^/api":"/"
        },
        //允许跨域
        changeOrigin:true,
        secure:false,
    }))
}

//注:可以配置多个代理路径 只需写多个app.use 就可以