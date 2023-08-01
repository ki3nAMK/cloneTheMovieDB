import { Fragment, memo, useEffect, useRef } from "react";
import "./Profile.css" ;
import { BellOutlined , MailOutlined , UserOutlined , InfoCircleOutlined , HeartOutlined
, BookOutlined , SettingOutlined , DingtalkOutlined , LogoutOutlined , NotificationOutlined } from "@ant-design/icons" ;
import { Outlet, useNavigate } from "react-router-dom";
import { Avatar } from "antd";
import CountNotify from "./countNotify";

function Profile() {
    const user = "kien" ;
    const getContent = useRef(null) ; 
    const changeRouter = useNavigate() ;
    const ArrContent = [{
        title: "Your Infomation" ,
        icon : <InfoCircleOutlined /> ,
    },{
        title: "My List" ,
        icon : <HeartOutlined /> ,
        onClickFunction : () => {
            localStorage.setItem("reverseList : ",JSON.stringify([])) ;
            changeRouter("/profile/mylist") ;
        } ,
    },{
        title: "Mail" ,
        icon : <BookOutlined />
    },{
        title: "Setting" ,
        icon : <SettingOutlined />
    },{
        title: "Notifycation" ,
        icon : <NotificationOutlined />
    },{
        title: "Log out" ,
        icon : <LogoutOutlined />
    }]
    const handleAllFunction = () => {
        return ArrContent.map( (item,pos) => {
            return <div className="ProfileButtonFunction" key={pos} onClick={item.onClickFunction   }>
                <span className="ProfileNavBarHeaderSpan">{item.icon}</span>
                <p className="ProfileNavBarHeaderP">{item.title}</p>
            </div>
        })
    }
    return <Fragment>
        <div className="ProfileWrapperHeader">
            <div className="ProfileNavbar">
                <div className="ProfileNavBarHeader">
                    <p onClick={ (e) => changeRouter('/netflixAlike')}>The MovieDB</p>
                    <div>
                        <span ref={getContent}>
                            <span><BellOutlined /></span>
                            <span className="ProfileCount"><CountNotify/></span>
                        </span>
                        <span ref={getContent}>
                            <span><MailOutlined/></span>
                            <span className="ProfileCount"><CountNotify/></span>
                        </span>
                    </div>
                </div>
                <div className="ProfileUser">
                    <span><Avatar size={64} icon={<UserOutlined />} /></span>
                    <h3>Hello, {user}</h3>
                    <h6>123nguyenbahoangkien123@gmail.com</h6>
                </div>
                { handleAllFunction() }
            </div>
            <div className="ProfileContent">
                <div className="ProfileContentOverview">
                    <p>OVERVIEW</p>
                    <h3>below you can find all summary of all your actions</h3>
                    <div className="crossLine"></div>
                </div>
                <Outlet />
            </div>
        </div>
    </Fragment>
}

export default memo(Profile) ;  