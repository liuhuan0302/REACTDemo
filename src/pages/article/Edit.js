import React, { Component } from "react";
import {
    Card,
    Form,
    Icon,
    Input,
    Button,
    Checkbox,
    DatePicker 
} from 'antd';
class ArticleEdit extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, fieldsValue) => {
          if (err) {
            return;
          }
          console.log(fieldsValue)
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <>
                <Card title="文章下载" bordered={false} style={{ width: "100%" }} />
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item label="title" labelCol={{span:4}} wrapperCol={{span:10}}>
                        {/* 校验的方法 */}
                        {getFieldDecorator('title', {
                            rules: [
                                {
                                    whitespace:true,
                                    min: 5,
                                    message: 'title最小长度5',
                                },
                                {
                                    max: 15,
                                    message: 'title最大长度15',
                                },
                                {
                                    required: true,
                                    message: '标题必须写!',
                                },
                            ],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="author" labelCol={{span:4}} wrapperCol={{span:10}}>
                        {/* 校验的方法 */}
                        {getFieldDecorator('author', {
                            rules: [
                                {
                                    whitespace:true,
                                    required: true,
                                    message: '作者必须有!',
                                },
                            ],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="createAt" labelCol={{span:4}} wrapperCol={{span:10}}>
                        {/* 校验的方法 */}
                        {getFieldDecorator('createAt', {
                            rules: [
                                {
                                    required: true,
                                    message: '时间必须有!',
                                },
                            ],
                        })(<DatePicker />)}
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            xs: { span: 24, offset: 0 },
                            sm: { span: 16, offset: 8 },
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            提交修改
                        </Button>
                    </Form.Item>

                </Form>
            </>
        )
    }
}

//Form.create 是高阶组件
export default Form.create()(ArticleEdit);