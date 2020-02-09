import React from "react";
import Img from "../../../assets/img/logo.jpg"
import  "../../../assets/css/login/header.css"
export default function Header(){
    return(
        <div className="logo">
            <img src={Img} alt=""className="logo_img"></img>
            <h1>欢迎登陆</h1>
        </div>
    )
}