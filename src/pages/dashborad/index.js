import React,{Component} from "react";
import {Redirect} from "react-router-dom"
import {connect} from "react-redux"
import  echarts from "echarts"
import axios from "axios";
class DashBorad extends Component {
    render(){
        console.log(this.props.login.authToke)
        return(
            //判断如果登录了,则直接跳到仪表盘页,没有登录,则跳到登录页面
            this.props.login.authToke ? 
            // ref={(div)=>this.div=div} 给div标签绑定一个div属性
            <div style={{height:400,width:800}} ref={(div)=>this.div=div}>
                {/* echarts 使用第一步,准备一个外部容器 */}

            </div> : <Redirect to="/login"/>
        )
    }
    
    userEcharts=()=>{
        //获取外层的div节点
        console.log(this.div)
      
        //初始化echarts
        const myChart = echarts.init(this.div)
        myChart.showLoading();
        axios.post("http://rap2api.taobao.org/app/mock/238550/api/amount").then(res=>{
            console.log(res.data.data)
            const list = res.data.data;
            myChart.hideLoading();
        // app.title = '坐标轴刻度与标签对齐';

        const  option = {
                color: ['#3398DB'],
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        data : list.map(item=>item.month + "月份"),
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        name:'直接访问',
                        type:'bar',
                        barWidth: '60%',
                        data:list.map(item=>item.amount)
                    }
                ]
            };
    
    
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option); 
        }).catch(_=>{
            myChart.hideLoading();
        })
        
    }
    componentDidMount(){
        this.userEcharts();
    }
}
const mapStateToProps = (state)=>{
    return {
        login:state.login
    }
}
export default connect(mapStateToProps)(DashBorad);