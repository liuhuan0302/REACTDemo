import React,{Component} from "react";
import axios from "axios";
class Setting extends Component{
    render(){
        return(
            <div>Setting</div>
        )
    }
    componentDidMount(){
        axios.get("/api/auto").then(res=>{
            console.log(res)
        })
    }
}
export default Setting;