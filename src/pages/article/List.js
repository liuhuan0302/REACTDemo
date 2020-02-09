import React, { Component } from "react";
import { Card ,Button,Table, Divider, Modal, Tag,ConfigProvider,Typography,message } from 'antd';
import XLSX from "xlsx";
import zhCN from 'antd/es/locale/zh_CN';
import moment from "moment"
import {getUserList,deleteArticle} from "@/api/api"


const { Text } = Typography;  
  
class ArticleList extends Component {
    state = {
      data:[],
      loading:true,
      columns : [
        {
          title: 'id',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: '标题',
          dataIndex: 'title',
          key: 'title',
        },
        {
          title: '作者',
          dataIndex: 'author',
          key: 'author',
        },
        {
          title: '阅读数',
          key: 'amount',
          dataIndex: 'amount',
          render: (text) => (
            <span>
             <Tag color={text>= 200 ? "green" : "red"}>
              {text}
              </Tag>
            </span>
          ), 
        },
        {
          title: '创建时间',
          dataIndex: 'createAt',
          key: 'createAt',
        },
        {
          title: '操作',
          key: 'action',
          render: (text, record,index) => (
            <span>
              <Button.Group>
                <Button type="primary" onClick={this.jumpEdit.bind(this,record.id)}>编辑</Button>
                <Button type="danger" onClick={this.handleClick.bind(this,record,index)}>删除</Button>
              </Button.Group>
            </span>
          ),
        },
      ]
    }
    //请求列表数据
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
    //点击删除
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
    //请求列表数据
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
    //跳转的编辑页
    jumpEdit = (id)=>{
      this.props.history.push(`/admin/articleEdit/${id}`)
      console.log(this.props)
    }
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
    //渲染页面
    render() {
        return (
            <div>
                <Card bordered={false} title="文章列表" extra={<Button onClick={this.downLoadExcal}>下载excal</Button>} style={{ width: "100%" }}>
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
    //接收后端返回的数据
    componentDidMount(){
      this.getListRequest();
    }
}

export default ArticleList;