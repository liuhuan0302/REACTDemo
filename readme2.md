echarts的使用:
    + 安装:npm install echarts --save
    + 引入: import  echarts from "echarts"
    + 使用步骤:
        1.在绘图前我们需要为 ECharts 准备一个具备高宽的 DOM 容器。
             // ref={(div)=>this.div=div} 给div标签绑定一个div属性
            <div style={{height:600}} ref={(div)=>this.div=div}>
                {/* echarts 使用第一步,准备一个外部容器 */}

            </div> : <Redirect to="/login"/>
        2.然后就可以通过 echarts.init 方法初始化一个 echarts 实例并通过 setOption 方法生成一个简单的柱状图，下面是完整代码
            userEcharts=()=>{
                //获取外层的div节点
                console.log(this.div)
                //初始化echarts
                const myecharts = echarts.init(this.div) 
            }
        3.配置ecahrt的配置项
            userEcharts=()=>{
            //获取外层的div节点
            console.log(this.div)
            //初始化echarts
            const myChart = echarts.init(this.div)
            var option = {
                title: {
                    text: 'ECharts 入门示例'
                },
                tooltip: {},
                legend: {
                    data:['销量']
                },
                xAxis: {
                    data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option); 
        }
    


#### webpack 配置反向代理
    + 展开package.json 中的eject
         npm install react-script eject
    +
#### webpack 配置反向代理
    + 在src 路径下建一个setupProxy.js文件夹
    + 安装 http-proxy-middleware 中间件
        用于把请求代理转发到其他服务器的中间件。
        http-proxy-middleware用于后台将请求转发给其它服务器。

        例如：我们当前主机A为http://localhost:3000/，现在浏览器发送一个请求，请求接口/api，这个请求的数据在另外一台服务器B上（http://10.119.168.87:4000），这时，就可通过在A主机设置代理，直接将请求发送给B主机。
    + 安装: $ npm install --save-dev http-proxy-middleware


#### 使用@代替../../
    + 在config中paths.js文件中配置
          proxySetup: resolveApp('src/setupProxy.js'),
          appComponent:resolveApp('src/'),//当前的src路径
    + webpack.config.js在该文件中配置alias中添加
         '@':paths.appComponent
    + 可以在文件中用@代替src路径
        import {getUserList,deleteArticle} from "@/api/api"
