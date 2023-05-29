import { Fragment, useEffect, useRef, useState } from "react";
import movieDbRemovebgPreview from "../movieDbRemovebgPreview.png" ;
import backGroundImage from "./backGroundImage.jpg" ;
import "./login.css" ;
import { Button , Checkbox } from "antd";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const [isInputShowing1,setIsInputShowing1] = useState(false) ;
    const [isInputShowing2,setIsInputShowing2] = useState(false) ;
    const HoverDataInput1 = useRef(null) ;
    const HoverDataInput2 = useRef(null) ;
    const outerSpace = useRef(null) ;
    const userAccount = useRef(null) ;
    const userPassword = useRef(null) ;
    let changeRouter = useNavigate() ;
    const showInput = (type,refContent) => {
        return <Fragment>
            <input type={`${type}`} className="LoginInput" required ref={refContent}></input>
        </Fragment>
    }
    localStorage.setItem("user :","nguyenbahoangkien") ; localStorage.setItem("password :","Kien123...") ;
    useEffect( () => {
        const HoverEffect = HoverDataInput1.current ;
        HoverEffect.addEventListener("click", (e) => {
            setIsInputShowing1(true) ;
        }) ;
        HoverDataInput2.current.addEventListener("click",(e) => {
            setIsInputShowing2(true) ;
        })
        outerSpace.current.addEventListener("click",(e) => {
            setIsInputShowing1(false) ;
            setIsInputShowing2(false) ;
        })
    },[])
    const styleLoginLabel = {
        transform:"translateY(-10px)" ,
        fontSize: "14px" ,
    }
    const handleSubmit = () => {
        if(userAccount.current===null&&userPassword.current===null) {
            alert("Please enter the email and password for logging in") ; return ; 
        } else {
            let checkPoint = 0 ; 
            checkPoint += localStorage.getItem("user :")===userAccount.current.value ? 1 : 0 ;   
            checkPoint += localStorage.getItem("password :")===userPassword.current.value ? 1 : 0 ;
            if(checkPoint==2) {
                localStorage.setItem("checked :",true) ;
                changeRouter("/netflixAlike") ;
            } else  alert("Wrong email or password") ;
        }
    }
    return <Fragment>
        <div className="LoginWrapper" style={{backGroundImage:`url(${backGroundImage})`}}>
            <div className="LoginCoverImage">
            <div className="LoginClickRemove"  ref={outerSpace}></div>
            <div className="LoginImageIcon">
                <img src={movieDbRemovebgPreview} alt="" className="LoginIcon"/>
            </div>
            <div className="loginBox">
                <div className="loginBoxInside">
                    <div className="LoginHeader"><p>Login Here</p></div>
                    <div className="LoginLabel" ref={HoverDataInput1}>
                        <p style={ isInputShowing1 ? styleLoginLabel : {fontSize:"16px"} }>Email or Phone number</p>
                        <div className="LoginInputWrapper">{ isInputShowing1 && showInput("text",userAccount) }</div>
                    </div>
                    <div className="LoginLabel" ref={HoverDataInput2}>
                        <p style={ isInputShowing2 ? styleLoginLabel : {fontSize:"16px"} }>Password</p>
                        <div className="LoginInputWrapper">{ isInputShowing2 && showInput("password",userPassword) }</div>
                    </div>
                    <div className="ButtonSubmit" >
                        <Button type="primary" danger ghost style={{width:"100%",height:"50px"}} onClick={handleSubmit}>
                            <p className="LoginButtonSubmit">Log In Now</p></Button>
                    </div>
                    <div className="LoginCheckOut">
                        <div className="LoginCheckbox">
                            <Checkbox ><p className="LoginCheckboxContent">Remember me</p></Checkbox>
                        </div>
                        <div className="LoginLink"><p>Need Some Help ?</p></div>
                    </div>
                    <div className="LoginLastContent">
                        <span>New to TheMovieDB ? </span>
                        <span><a href="">Register now</a></span>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </Fragment>
}