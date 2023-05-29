import "./MovieCart.css"
import { memo } from "react";
import { Fragment } from "react";

function MovieCart(movie) {
    const APIgetImg = `https://image.tmdb.org/t/p/w300${movie.imageId}` ;
    return <Fragment> 
    <span id={movie.id} className="MovieCartcard">
        <img src={APIgetImg} className="MovieCartimg"/>
        <h3 className="MovieCartname">{movie.name}</h3>
    </span>
    </Fragment>
}

export default memo(MovieCart) ;