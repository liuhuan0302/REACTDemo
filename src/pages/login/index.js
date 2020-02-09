import React ,{Component} from "react";
import LoginHeader from "./components/Header.js"
import LoginFooter from "./components/Footer.js"
import LoginContent from "./components/Content.js"
//引入antd插件
import { Layout } from 'antd';
const { Header, Footer, Content } = Layout;

class Login extends Component{
    render(){
        return(
            <div>
                <Layout>
                    <Header style={{height:"auto",background:"#fff"}}>
                        <LoginHeader/>
                    </Header>
                    <Content style={{background:"#e93854 url(https://goss.veer.com/creative/vcg/veer/800water/veer-303934034.jpg) no-repeat",backgroundSize:"100%",padding:"20px 50px 40px"}}>
                        <LoginContent/>
                    </Content>
                    <Footer style={{background:"#fff"}}>
                        <LoginFooter/>
                    </Footer>

                </Layout>
            </div>
        )
    }
}

export default Login;