import { Fragment, memo, useEffect, useRef, useState } from "react" ;
import "./HomeNFbodyContent.css" ;
import axios from "axios" ;
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { StarOutlined } from "@ant-design/icons" ;
import { Button } from "antd";
import { addIntoMyList } from "../../features/counter/getAPI";
import { useSelector , useDispatch } from "react-redux";
import Skeleton , { SkeletonTheme } from 'react-loading-skeleton';
import React from "react" ;
import Loader from "./loader";
const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 6
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 7  
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4
    },
    smallTablet: {
        breakpoint: { max: 898, min: 640 } ,
        items: 3
    },
    extraSmallTablet: {
        breakpoint: { max: 640, min: 464 } ,
        items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
};
function HomeNFbodyContent(item) {
    const APIkey = `8487dd7f765e35a7fcac553fcc1d84db` ; 
    const [data,setData] = useState([]) ;
    const refImageContainer = useRef(null) ;
    const listItemsRef = useRef([]); listItemsRef.current = [] ;
    const res = useSelector( (state) => state.api.favouriteFilm) ;
    const [isLoading,SetIsLoading] = useState(false) ;
    const dispatch = useDispatch()
    useEffect( () => {
        const getAPI = async () => {
            const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${APIkey}&with_genres=${item.Id}`) ;
            setData(response.data.results) ;
        } ; SetIsLoading(true) ; getAPI() ;  SetIsLoading(false) ;
    },[])
    const addEventListenerToRef = () => {
        listItemsRef.current.forEach( (element,pos) => {
            element.addEventListener("mouseover", (e) => {
                let target = element.querySelector(".HomeNFbodyContentImageDetail") ;
                target.classList.remove("translateY300px") ;
            })
            element.addEventListener("mouseout", (e) => {
                let target = element.querySelector(".HomeNFbodyContentImageDetail") ;
                target.classList.add("translateY300px") ;
            })
        })
    }
    const addToRef = (el) => {
        if(el && !listItemsRef.current.includes(el)) listItemsRef.current.push(el) ;
        if( listItemsRef.current.length === data.length ) addEventListenerToRef() ;
    } 
    function ExportDataImage() {
        return data.map( (film,pos)  => {
            let imgAPI = film.poster_path ;
            return <div key={pos} className="HomeNFbodyContentImage" ref={addToRef}>
                <img src={`https://image.tmdb.org/t/p/w200/${imgAPI}`} alt=""/>
                <div className="HomeNFbodyContentImageDetail translateY300px">
                    <div className="HomeNFbodyContentImageDetailText">{film.original_title}</div> 
                    <span>With vote average : {film.vote_average} <StarOutlined /></span>   
                    <div className="HomeNFbodyContentImageButtonWrapper">
                        <Button ghost type="primary"><p className="HomeNFbodyContentImageButton">Watch Movie</p></Button>
                    <Button ghost type="primary" onClick={ (e) => {
                        dispatch(addIntoMyList({
                            movieID:film.id ,
                            movieName:film.original_title ,
                            movieGenre:film.genre_ids ,
                            movieRate:[{voteAverage:film.vote_average},{voteCount:film.vote_count}] ,
                            movieImage:film.poster_path ,
                            moviePopularity:film.popularity ,
                            movieRelease:film.release_date ,
                            movieLanguage:film.original_language ,
                            movieIsAdult:film.adult.toString() ,
                        })) 
                    }}><p className="HomeNFbodyContentImageButton">Add to MyList</p></Button></div>
                </div>
            </div>
        })
    }   
    return <Fragment>
        { isLoading && <Loader />}
        <SkeletonTheme baseColor="#202020" highlightColor="#444"> 
        <div className="HomeNFbodyContentWrapperFilm" key={item.Id}>
            <div className="HomeNFBodyContentTitle">{item.nameGenre+" Film" || <Skeleton/>}</div> 
        </div> 
        <Carousel responsive={responsive} containerClass="hello" ref={refImageContainer} >  
            { data ? ExportDataImage() : null }
        </Carousel>   
        </SkeletonTheme>
    </Fragment>
}

export default memo(HomeNFbodyContent) ; 