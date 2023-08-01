import { Fragment, memo, useDebugValue, useEffect, useState } from "react";
import React, { Suspense } from 'react';    
import "./HomeNF.css" ;
import { Button, Dropdown, Drawer, Space } from "antd" ;
import movieDbRemovebgPreview from "../movieDbRemovebgPreview.png" ;
import "./HomeNFChildTrailer.css"
import { SearchOutlined, BellOutlined ,UserOutlined ,DownOutlined, MenuOutlined ,PlayCircleOutlined, InfoCircleOutlined ,CloseOutlined
, SettingOutlined , LogoutOutlined } from "@ant-design/icons" ;
import TenRemovebgPreview from "./TenRemovebgPreview.png"
import YouTube from "react-youtube" 
import axios from "axios";
import Loader from "./loader";
import { useNavigate } from "react-router-dom";
const HomeNFbodyContent = React.lazy(() => import("./HomeNFbodyContent"));

function HomeNFChildTrailer(movie) {
    const APIkey = "8487dd7f765e35a7fcac553fcc1d84db" ;
    const [data,setData] = useState([]) ;
    const [openMenu,setOpenMenu] = useState(false) ; 
    const [playTrailer,setPlaytrailer] = useState(false) ; 
    const [listGenre,setListGenre] = useState([]) ;
    const [listGenreAllowed,setListGenreAllowed] = useState(3) ; 
    const [isLoading,setisLoading] = useState(false) ;
    const changeRouter = useNavigate() ; 
    const abortControllerTimeOut = (timeoutMs) => {
        const abortController = new AbortController ;
        setTimeout( () => abortController.abort(), timeoutMs || 0 ) ;
        return abortController.signal ;
    }
    useEffect( () => {
        axios.get(`https://api.themoviedb.org/3/movie/${movie.movieID}?api_key=8487dd7f765e35a7fcac553fcc1d84db&append_to_response=videos`
        ,{ signal:abortControllerTimeOut(5000) })
          .then( (res) => setData(res.data) )
          .catch( (err) => console.log(err) )
    },[])
    useEffect( () => {
        const fetchAPI = async () => {
            const response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${APIkey}&language=en-US`
            ,{ signal:abortControllerTimeOut(5000) }) 
            setListGenre(response.data.genres) ;
            setisLoading(false) ; 
        };
        fetchAPI() ; 
    },[listGenreAllowed])   
    const handleScroll = () => {
        let documentHeight = document.documentElement.scrollHeight ;
        let documentSCTop = document.documentElement.scrollTop ;
        let windowInnerHeight = window.innerHeight ; 
        if(documentSCTop+windowInnerHeight+1>=documentHeight) {
            setListGenreAllowed( prevGenreAllowed => prevGenreAllowed+3 )  ;
            setisLoading(true) ;
        }
    }
    useEffect( () => {
       window.addEventListener("scroll",handleScroll) ;  
       return () => window.removeEventListener("scroll",handleScroll) ;
    },[])
    const handleMenuClick = (event) => {
        if(event.key==="3") {
            localStorage.removeItem("checked :") ;
            changeRouter("/") ;
        }
        if(event.key==="1") {
            changeRouter("/profile") ;
        }
    }
    const items = [{
          label: 'Profile',
          key: '1',
          icon: <UserOutlined />,
        },{
          label: 'Setting and Private',
          key: '2',
          icon: <SettingOutlined />,
        },{
          label: 'Log out',
          key: '3',
          icon: <LogoutOutlined />
    }];
    const menuProps = {
        items,
        onClick: handleMenuClick,
    };
    function getTrailer() {
        const videos = data.videos.results.find( (elem) => elem.name===`Official Trailer` )
        return <div className="HomeNFChildTrailerYoutubeTrailer" key={"YoutubeVideo"}>
            <YouTube 
              videoId={videos.key}  
              containerClassName={"HomeNFChildTrailerYoutube"} 
              opts={{
                width:"100%" ,
                height:"650px" ,
                playerVars: {
                    autoplay : 1 ,
                    controls : 0 , 
                    modestbranding : 1 ,
                    rel: 0 ,
                }
              }}
            ></YouTube>
        </div>  
    }
    function closeTrailer() {
        return <Fragment>
            <Button className="HomeNFChildClose"
            onClick={ (e) => setPlaytrailer(false) }> Close <CloseOutlined /></Button>
        </Fragment>
    }   
    const linkToMylist = (e) => changeRouter(`/profile/mylist`) ;
    function getGenresForReview() {
        return listGenre.map( (item,pos) => {
            if(pos>=listGenreAllowed) return ; 
            return <Fragment key={pos}>
                <Suspense fallback={<div className={"dasdad"}>Loanding....</div>}>
                    <div key={pos}><HomeNFbodyContent
                        Id={item.id} 
                        nameGenre={item.name} 
                    /></div>
                </Suspense>
            </Fragment>
        })
    }
    return <Fragment>
        <div className="HomeNFPlayTrailer" style={{backgroundImage:`url(${movie.LinkAPIImg}\original${movie.backdropPath})`}}>
        { playTrailer ? closeTrailer() : null }
            { data.videos && playTrailer ? getTrailer() : null }
           <Drawer
                width={150} 
                placement="right" 
                open={openMenu} 
                onClose={ () => setOpenMenu(false)} 
                bodyStyle={{backgroundColor:"Black"}} 
                closable={false}
            ><div className="HomeNFChildTrailerWrapperDrawer HomeNFChildTrailerWhiteFocus">
                    <span className="HomeNFChildTrailerli HomeNFChildTrailercursor HomeNFChildTrailerDrawer">Home</span>
                    <span className="HomeNFChildTrailerli HomeNFChildTrailercursor HomeNFChildTrailerDrawer">TV Shows</span>
                    <span className="HomeNFChildTrailerli HomeNFChildTrailercursor HomeNFChildTrailerDrawer">Movies</span>
                    <span className="HomeNFChildTrailerli HomeNFChildTrailercursor HomeNFChildTrailerDrawer ">New & Popular</span>
                    <span className="HomeNFChildTrailerli HomeNFChildTrailercursor HomeNFChildTrailerDrawer"
                        onClick={ (e) => { linkToMylist() } }>My list</span>
                    <span className="HomeNFChildTrailerli HomeNFChildTrailercursor HomeNFChildTrailerDrawer">Browse by Language</span>
                    <span className="HomeNFChildTrailerli HomeNFChildTrailercursor HomeNFChildTrailerDrawer"><SearchOutlined /></span>
                    <span className="HomeNFChildTrailerli HomeNFChildTrailercursor HomeNFChildTrailerDrawer">Kids</span>
                    <span className="HomeNFChildTrailerli HomeNFChildTrailercursor HomeNFChildTrailerDrawer"><BellOutlined /></span>
                    <span className="HomeNFChildTrailerli HomeNFChildTrailercursor HomeNFChildTrailerDrawer"><UserOutlined /></span>
                    <span className="HomeNFChildTrailerli HomeNFChildTrailercursor HomeNFChildTrailerDrawer">
                        <Dropdown menu={menuProps}><DownOutlined /></Dropdown>    
                    </span>
            </div></Drawer>
            <div className="HomeNFChildTrailernavBar HomeNFChildTrailercenter">
                <div className="HomeNFChildTrailericon HomeNFChildTrailercenter HomeNFChildTrailerside">
                    <img src={ movieDbRemovebgPreview } alt="" style={{width:"70px",height:"auto"}}/>
                    <ul className="HomeNFChildTrailerul HomeNFChildTrailercenter ">
                        <li className="HomeNFChildTrailerli HomeNFChildTrailerWhite HomeNFChildTrailercursor">Home</li>
                        <li className="HomeNFChildTrailerli HomeNFChildTrailerWhite HomeNFChildTrailercursor">TV Shows</li>
                        <li className="HomeNFChildTrailerli HomeNFChildTrailerWhite HomeNFChildTrailercursor">Movies</li>
                        <li className="HomeNFChildTrailerli HomeNFChildTrailerWhite HomeNFChildTrailercursor">New & Popular</li>
                        <li className="HomeNFChildTrailerli HomeNFChildTrailerWhite HomeNFChildTrailercursor" 
                            onClick={ (e) => { linkToMylist() } }>My list</li>
                        <li className="HomeNFChildTrailerli HomeNFChildTrailerWhite HomeNFChildTrailercursor">Browse by Language</li>
                    </ul></div>
                <div className="HomeNFChildTraileruser HomeNFChildTrailercenter HomeNFChildTrailerside HomeNFChildTrailerWhiteFocus">
                    <span className="HomeNFChildTrailerHiddenIcon HomeNFChildTrailerli HomeNFChildTrailercursor"><MenuOutlined
                        onClick={ (e) => setOpenMenu(true)} 
                    /></span>
                    <span className="HomeNFChildTrailerspan HomeNFChildTrailerli HomeNFChildTrailercursor" onClick={ (e) => {
                        e.preventDefault()
                        changeRouter('/find')
                    } 
                    }><SearchOutlined /></span>
                    <span className="HomeNFChildTrailerspan HomeNFChildTrailerli HomeNFChildTrailercursor">Kids</span>
                    <span className="HomeNFChildTrailerspan HomeNFChildTrailerli HomeNFChildTrailercursor"><BellOutlined /></span>
                    <span className="HomeNFChildTrailerspan HomeNFChildTrailerli HomeNFChildTrailercursor"><UserOutlined /></span>
                    <span className="HomeNFChildTrailerspan HomeNFChildTrailerDownOut HomeNFChildTrailercursor">
                        <Dropdown menu={menuProps}><DownOutlined /></Dropdown>    
                    </span>
                </div>
            </div>
            <div className="HomeNFChildTrailerDetail HomeNFChildTrailercursor HomeNFChildTrailerWhiteFocus">
                <div className="header"><h1>{movie.title}</h1></div>
                <div className="advertise">
                    <span className="icon"><img src={ TenRemovebgPreview } style={{width:"30px",heigh:"30px"}} alt="" /></span>
                    <span className="content">#1 in TV Shows Today</span>
                </div>
                <div className="detail"><p>{movie.overview}</p></div>
                <Space direction="horizontal" size={30} >
                    <Button ghost onClick={(e) => setPlaytrailer(true)}><PlayCircleOutlined /> Play Trailer</Button>
                    <Button ghost><InfoCircleOutlined /> More details</Button>
                </Space>
            </div>
        </div>
        <div className="HomeNFChildreview">
            { listGenre ? getGenresForReview() : null }
            { isLoading && <Loader /> } 
        </div>
    </Fragment>
}

export default memo(HomeNFChildTrailer) ;