import { useEffect, useRef, useState, Fragment } from "react";
import { Carousel } from "antd";
import axios from "axios";
import "./HomeNF.css" ;
import { Button } from "antd" ;
import HomeNFChildTrailer from "./HomeNFChildTrailer";

export default function HomeNF() {
    const [data,setData] = useState([]) ; 
    const getAPIImg = "https://image.tmdb.org/t/p/"
    const getAPILink = "https://api.themoviedb.org/3/trending/movie/week?api_key=8487dd7f765e35a7fcac553fcc1d84db&append_to_response=videos" ; 
    const abortControllerTimeOut = (timeoutMs) => {
        const abortController = new AbortController ;
        setTimeout( () => abortController.abort(), timeoutMs || 0 ) ;
        return abortController.signal ;
    }
    useEffect( () => {
        axios.get(getAPILink,{ signal:abortControllerTimeOut(5000) })
          .then( (res) => setData(res.data.results) )
          .catch( (err) => console.log(err) )
    },[])
    return <Fragment>
        <div className="HomeNFContainer">
            { data.length ? <HomeNFChildTrailer
                LinkAPIImg={getAPIImg}
                title={data[0].title}
                overview={data[0].overview}
                backdropPath={data[0].backdrop_path}
                videosFetchAPI={data[0].videos}
                movieID={data[0].id}
            /> : null }
        </div>
    </Fragment>
}