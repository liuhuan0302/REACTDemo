import React, { Component } from "react";
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import "../../../assets/css/login/content.css"
import {getUserInfo} from "../reducer"
import { Form, Icon, Input, Button, Checkbox } from 'antd';

class LoginConent extends Component {
    handleSubmit = e => {

        /*
         *data:{
             avater:"用户头像"
             nickname:"用户昵称"
             uid:"用户唯一的id"(可以跨平台)
             uuid:"用户id"(有时效性,每30分钟过期)
             authTake:"aaaadadwewe"自动生成(可以用来判断用户的合法性)
             userState:"用户身份" vip svip(通过字符串判断是什么样的用户)
         } 
         * 
         * */ 
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
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="content">
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Username"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(<Checkbox>Remember me</Checkbox>)}
                        <a className="login-form-forgot" href="">
                           忘记密码
                    </a>
                        <Button type="primary" block htmlType="submit" className="login-form-button">
                           登录
                    </Button>
                        Or <a href="">立即注册</a>
                    </Form.Item>
                </Form>
            </div>
        )
    }
    
}

const LoginConents = Form.create({ name: 'normal_login' })(LoginConent);

const mapStateToProps = (state)=>{
    return {
        login:state.login
    }
} 
export default connect(mapStateToProps,{getUserInfo})(withRouter(LoginConents));