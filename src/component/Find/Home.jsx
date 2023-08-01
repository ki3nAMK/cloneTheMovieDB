import axios from "axios";
import { useEffect, useRef, useState, Fragment } from "react";
import MovieCart from "./MovieCart";
import "./home.css";
import { Pagination } from "antd";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [data, setData] = useState([]);
  const checkData = useRef({});
  const search = useRef({});
  const changeRouter = useNavigate() ;
  const APItrending =
    "https://api.themoviedb.org/3/trending/movie/week?api_key=8487dd7f765e35a7fcac553fcc1d84db";
  const abortControllerTimeOut = (timeoutMs) => {
    const abortController = new AbortController ;
    setTimeout( () => abortController.abort(), timeoutMs || 0 ) ;
    return abortController.signal ;
  }
  const fetchData = async (searchKey) => {
    let API = searchKey
      ? `https://api.themoviedb.org/3/search/movie?api_key=8487dd7f765e35a7fcac553fcc1d84db&language=en-US&query=${searchKey}&page=1&include_adult=false`
      : APItrending;
    const results = await axios.get(API,{ signal:abortControllerTimeOut(5000) });
    setData( (prev) => {
      checkData.current = prev ;
      return results.data.results ;
    });
  };
  useEffect(() => {
    fetchData();
  }, []);
  const renderMovies = () => {
    if (data === checkData.current) return null;
    return data.map((items) => {
      return (
        <MovieCart
          key={items.id}
          id={items.id}
          name={items.title}
          imageId={items.poster_path}
        />
      );
    });
  };
  const SearchMovies = (event) => {
    event.preventDefault();
    fetchData(search.current);
  };
  return (
    <Fragment>
      <div className="HomeWrapper" >
        <div className="HomeCategory">
          <form onSubmit={SearchMovies}>
            <input
              type="text"
              onChange={(e) => {
                search.current = e.target.value;
              }}
            />
            <button type={"submit"}>Search !</button>
          </form>
        </div>
        <div className="HomeContainer">
            {renderMovies()}  
        </div>
      </div>
    </Fragment>
  );  
}
