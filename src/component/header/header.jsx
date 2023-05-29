import { Menu,Row,Col,Avatar,Drawer } from "antd";
import { UserOutlined,MenuOutlined } from "@ant-design/icons" ;
import "./header.css";
import { useState , Fragment, memo } from "react";
import { Outlet } from "react-router-dom";
import movieDbRemovebgPreview from "../movieDbRemovebgPreview.png"

function Header() {
    const [openMenu,setOpenMenu] = useState(false) ;
    return <Fragment> 
    <div className="HeaderWrapper">
        <span className="HeaderMenuIcon">
            <MenuOutlined onClick={ () => setOpenMenu(true) } />
            <span>|||<span className="Headericon"><Avatar size={40} icon={<UserOutlined />} />|||</span></span>
        </span>
        <Drawer 
            width={250} 
            placement="left" 
            open={openMenu} 
            onClose={ () => setOpenMenu(false)} 
            bodyStyle={{backgroundColor:"Black"}} 
            closable={false}
        ><AppMenu FD="column" menu={false}></AppMenu></Drawer>
        <span className="HeaderMenu"><AppMenu FD="row" mg="Headermg" menu={true} funcOpenMenu={setOpenMenu}/></span>
    </div>
    <Outlet></Outlet>
    </Fragment>
}
function AppMenu(props) {
    let text = props.FD , checkMargin = props.mg , openMenu = props.funcOpenMenu ;
    return <Fragment>
          <li className="Headernav-bar" style={{flexDirection:text}}>
            <span><img src={ movieDbRemovebgPreview } style={{width:"100px",height:"auto"}}/></span>
            <span className="Headernav-bar" style={{flexDirection:text}}>
                <ul className={checkMargin+" AppMenuitem AppMenufs25px"} >Home</ul>
                <ul className={checkMargin+" AppMenuitem AppMenufs25px"} >About Us</ul>
                <ul className={checkMargin+" AppMenuitem AppMenufs25px"} >Contact Us</ul>
            </span>
            <span>|||<span className="Headericon"><Avatar size={40} icon={<UserOutlined />} />|||</span></span>
          </li>
    </Fragment>
}

export default memo(Header) ; 