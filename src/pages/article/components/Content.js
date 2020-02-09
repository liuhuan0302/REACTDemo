import React, { Component,Fragment } from "react";
import { List, Avatar,Pagination } from 'antd';
import "../../../assets/css/admin/content.css"
import {getUseList} from "../../admin/store/content.redux"
import {connect} from "react-redux"
const data = [
    {
        title: 'Ant Design Title 1',
    },
    {
        title: 'Ant Design Title 2',
    },
    {
        title: 'Ant Design Title 3',
    },
    {
        title: 'Ant Design Title 4',
    },
];

function itemRender(current, type, originalElement) {
    if (type === 'prev') {
      return <a>上一頁</a>;
    }
    if (type === 'next') {
      return <a>下一頁</a>;
    }
    return originalElement;
  }
class RouterContent extends Component {
    render() {
        return (
            <Fragment>
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                            title={<a href="https://ant.design">{item.title}</a>}
                            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                        />
                    </List.Item>
                )}
            />
            <Pagination total={500} itemRender={itemRender} />
            </Fragment>
        )
    }
    componentDidMount(){
        //請求後端數據
        // this.props.getUseList()
        console.log(this.props)
    }
}

const mapStateToProps = state=>{
    return {
        content:state.contentReducer
    }
}
export default connect(mapStateToProps,{getUseList})(RouterContent);