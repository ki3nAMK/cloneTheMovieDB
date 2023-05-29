import { memo } from "react";

function PosterElement(element) {
    return <>
        <img src={"https://image.tmdb.org/t/p/w300"+element.imageId} alt={element.id} key={element.id}/>
    </>
}

export default memo(PosterElement) ; 