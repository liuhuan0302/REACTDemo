import React, { Component } from "react";
import {withRouter} from "react-router-dom";
import {adminRoutes} from "../../routes"
import "../../assets/css/admin/admin.css";
import Logo from "../../assets/img/logo.jpg"
// import RouterContent from "./components/Content"
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;


//筛选出isNav 为出的数组
const menus = adminRoutes.filter(item=>item.isNav === true);
class Admin extends Component {
    //点击跳转到相对应的路由
    //通过箭头函数,改变this指向
    handleClick = (e)=>{
        //通过事件对象实现跳转
        this.props.history.push(`${e.key}`)
        //console.log(this.props)
        // console.log(this.props.history.push(this.props.location.pathname))
    }
    render() {
        return (
            <Layout>
                <Header className="header">
                    <img src={Logo} className="admin-logo"></img>
                    <div className="admin-title">
                        <h1 className="h1">h5-1920後台管理系統</h1>
                        <p>歡迎大家前來學習交流</p>
                    </div>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        style={{ lineHeight: '64px' }}
                    >
                    </Menu>
                </Header>
                <Layout>
                    <Sider width={200} style={{ background: '#fff' }}>
                        <Menu
                            mode="inline"
                            // 通过this.props.location.pathname 找到对应组件的路径,渲染相应的组件
                            //`${}`  解析相对应的变量 
                            defaultSelectedKeys={[`${this.props.location.pathname}`]}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%', borderRight: 0 }}
                        >

                            {
                                menus.map(item=>{
                                    console.log(item.pathname)
                                return  <Menu.Item onClick={this.handleClick} key={item.pathname}><Icon type={item.icon} />{item.title}</Menu.Item>
                                })
                            }
                         
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Content
                            style={{
                                background: '#fff',
                                padding: 24,
                                marginTop: 24,
                                minHeight:"auto",
                            }}
                        >
                            {/* <RouterContent /> */}
                            {/* 解析子路由 */}
                            {this.props.children}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}

export default withRouter(Admin);