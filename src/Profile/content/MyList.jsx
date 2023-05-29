import { Fragment, memo, useEffect, useState } from "react";
import { Space, Table, Tag , Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import "./MyList.css" ;
import { StarOutlined , AreaChartOutlined , CloseOutlined , DeleteOutlined , 
 RedoOutlined , FunnelPlotOutlined } from "@ant-design/icons";
import { removeFromMyList , reverseDataForMyList , 
  sortByNameMyList , deleteAllDataMyList } from "../../features/counter/getAPI" ;
import DemoDualAxes from "./DualLine" ;
import DemoPie from "./Pie" ;
import DemoBar from "./Rose" ;
import axios from "axios";
import loader from "../../component/Home/loader";
const { Column, ColumnGroup } = Table; 

function MyList() {
    const [genres,setGenres] = useState([]) ;
    const respond = JSON.parse(localStorage.getItem("myList :")) ;
    let response = useSelector( state => state.api.favouriteFilm ) ;
    const dispatch = useDispatch() ;
    const [loading,setIsLoading] = useState(false) ;
    const removeData = (content) => dispatch(removeFromMyList(content)) ;
    const redoData = () => dispatch(reverseDataForMyList()) ;
    const sortDataMylist = () => dispatch(sortByNameMyList()) ; 
    const deleteAllData = () => dispatch(deleteAllDataMyList()) ;
    const sortData = () => {
        let dataSortedGenres = [] ;
        if(genres.length===0) return ;
        for( let element of genres ) {
            dataSortedGenres = [element.name.length,...dataSortedGenres] ;
        } ; dataSortedGenres.sort( (item1,item2) => {
            if(item1>item2) return 1 ; 
            if(item1<item2) return -1 ; 
            return 0 ;
        }) ; let newData = dataSortedGenres.filter( (element,pos) => {
            if( pos === dataSortedGenres.indexOf(element)) return element ; 
        }) ; let updatedData = newData.map( element => {
            return {number:element,color:`rgb(${255-element*20},${200-element*15},${element*15})`} ;
        }) ; 
        return updatedData ;    
    } 
    useEffect( () => {
        const getData = async () => {
            const response = await axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=8487dd7f765e35a7fcac553fcc1d84db&language=en-US') ;
            setGenres(response.data.genres) ;
        } ; getData() ; setIsLoading(false) ;   
    },[])
    const logOutTask = (id) => {
        setIsLoading(true) ;
        let data = `` , newArr = sortData() ;
        for( let element of genres ) { if( element.id === id ) { data = element.name }} 
        const elementColor = newArr.find( (element) => {
            if(element.number===data.length) return element.number ; })
        return <Tag key={id.toString()+"genres"} className="font-check cursor-pointer" color={elementColor.color}>{data}</Tag>
    }
    return (
    <Fragment>
        <div className="mylistCharts">
            <div className="mylistChart mylistTable"><DemoDualAxes></DemoDualAxes></div>  
            <div className="mylistChart mylistTable"><DemoPie></DemoPie></div>
            <div className="mylistChart mylistTable"><DemoBar></DemoBar></div>
        </div>
        <div className="TableWrapper">
      <Table dataSource={response} pagination={{position:["bottomRight"],size:'small',pageSize:2}} className='mylistTable w-80'>
        <Column title={"Film title"} dataIndex={`movieName`} key={`movieName`} className="mylistHeader font-check" width={200}></Column>
        <Column title={"Rate"} dataIndex={`movieRate`} key={`movieRate`} width={100} render={(tags) => (
            <div key={tags.length.toString()}>
                { tags.map((tag,pos) => ( <Tag color={pos===0 ? "blue" : "red" } key={pos===0 ? "a" : "b"} className="font-check cursor-pointer">
                    { pos===0 ? "Vote average : "+tag.voteAverage+" " : "Vote count : "+tag.voteCount+" " }
                    { pos===0 ? <StarOutlined /> : <AreaChartOutlined /> }
                </Tag>))}
            </div>
        )}></Column>
        <Column title={"Image"} dataIndex={`movieImage`} key={`movieImage`} className="font-check" render={ (image) => {
            return <img src={`https://image.tmdb.org/t/p/w200/${image}`} alt="" key={`image-${image}`} className="MylistImage"/>
        }}></Column>
        <Column title={"Popularity"} dataIndex={`moviePopularity`} key={`moviePopularity`} className="font-check"></Column>
        <Column title={"Genres"} dataIndex={`movieGenre`} key={`genresUpdated`}  width={200} className="font-check" render={ (tags) => {
            return <div key={tags.length.toString()+"genresUpdated"}>
                { loading ? <loader /> : null }
                { tags.map( (tag,pos) => ( <span key={pos.toString()+"genresUpdated"}>
                    { genres.length!==0 ? logOutTask(tag) : null }
                </span>))}
            </div>
        }}></Column>
        <Column title={`Adult`} dataIndex={`movieIsAdult`} key={`movieIsAdult`} width={100} className="font-check fs-20"></Column>
        <Column title={`Language`} dataIndex={`movieLanguage`} key={`movieLanguage`} width={100} className="font-check fs-20"></Column>
        <Column title={"Release Date"} dataIndex={`movieRelease`} key={`movieRelease`} className="font-check"></Column>
        <Column title={`Action`} key={`action`} className="font-check" render={(_,record) => {
            return <Space size={`middle`}>
                <Button onClick={ (e) => {
                    e.preventDefault() ; 
                    removeData(record.movieName) ;
                }} className="mylistButton"><DeleteOutlined /></Button>
            </Space>
        }}></Column>
      </Table>
      <div className="mylistTable h-auto mylistOtherFunc">
        <h2 className="font-check">Other function</h2> 
        <Button ghost type="primary" className="mylistButton" onClick={ (e) => {
            e.preventDefault() ; redoData() ;
        }}>Reverse Data <RedoOutlined /></Button>
        <Button ghost type="primary" className="mylistButton" onClick={ (e) => {
            e.preventDefault() ; sortDataMylist() ;
        }}>Sort Data <FunnelPlotOutlined /></Button>
        <Button ghost type="primary" className="mylistButton" onClick={ (e) => {
            e.preventDefault() ; deleteAllData() ;
        }}>Delete All <DeleteOutlined /></Button>
      </div>
      </div>
    </Fragment>
  );
}

export default memo(MyList);
