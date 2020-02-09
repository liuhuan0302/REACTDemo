import React, { Component } from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux"
import {BrowserRouter as Router, Route , Switch,Redirect} from "react-router-dom"
import store from "./store/store"
import 'antd/dist/antd.css'
import "./assets/css/global.css"
import {mainRoutes} from "./routes/index"
import App from "./App"


ReactDOM.render(
//可以让App组件共享store里面的数据
(<Provider store={store}>
    <Router>
        <Switch>
            <Route path="/admin" render={()=><App />} />
            {
                mainRoutes.map(route=>{
                    console.log(route)
                    return <Route key={route.pathname} path={route.pathname} component={route.component}/>
                })
            }
            <Redirect to="/admin" from="/" exact/>
        </Switch>
    </Router>
</Provider>)
,document.getElementById("root"))
