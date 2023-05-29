import axios from "axios";
import "./Poster.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState, useSyncExternalStore } from "react";
import PosterElement from "./PosterElement";
import { Button } from "antd";

export default function Poster() {
  const [data, getData] = useState([]);
  const arrAddPoster = [1, 2, 3, 4, 5] ;
  const changeRouter = useNavigate()  ;
  console.log(data) ;
  const APIbrowser =
    "https://api.themoviedb.org/3/trending/movie/week?api_key=8487dd7f765e35a7fcac553fcc1d84db";
  useEffect(() => {
    axios
      .get(APIbrowser)
      .then((res) => getData(res.data.results))
      .catch((err) => console.log(err)) ;
  }, []) ;
  const handleNavigate = () => {
    const checkedValue = localStorage.getItem("checked :");
    const path = checkedValue ? "/netflixAlike" : "/login";
    changeRouter(path);
  };
  return (
    <>
      <div className="PosterWrapper">
        {arrAddPoster.map((item) => (
          <div
            className={"Postercolumn " + `Posteritem${item}` + " Posteritem"}
            key={item}
          >
            {data.map((itemData) => (
              <PosterElement
                imageId={itemData.poster_path}
                key={itemData.id}
                id={itemData.id}
              />
            ))}
          </div>
        ))}
        <div className="Postertitle Posterflex">
          <div className="PostertitleInside Posterflex">
            <h1 className="PostertitleH1 Postertext">
              The global entertainment movie channel , where you can watch all
              your favorite and popular movies . More than that, you can find
              Unlimited TV shows, movies and more
            </h1>
            <h2 className="Postertext">See everywhere. Cancel at any time.</h2>
            <h3 className="Postertext">
              you ready ? click the button below for starting your journey
            </h3>
            <Button type="primary" ghost="true" size="large"
            onClick={handleNavigate}
            > ENTER YOUR JOURNEY</Button>
          </div>
        </div>
      </div>
    </>
  );
}
