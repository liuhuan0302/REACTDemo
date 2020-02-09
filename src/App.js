import React, { Component } from "react";
import {  Route, Redirect ,Switch} from "react-router-dom";
import {adminRoutes} from "./routes";
import Frame from "./components/Frame"
class App extends Component {
  render() {
    return (
      // 如果把路由包裹在组件中,会把当前的路由传递该组件中
      //让路由在组件内渲染,可以在组件内通过this.props.children渲染该组件
      <Frame>
        <Switch>
          { 
              adminRoutes.map(route=>{
                  return <Route key={route.pathname} path={route.pathname} render={(routeProps)=><route.component {...routeProps}/>} />
                })
            }
        </Switch>
      </Frame>
    )
  }
}

export default App;
