import { Fragment, memo } from "react";
import { addIntoMyList , removeFromMyList , addImageProfile } from "../../features/counter/getAPI";
import { useSelector , useDispatch } from "react-redux";
import React from "react";
import { Button , Space } from "antd" ;

function Test() {
    const res = useSelector( (state) => state.api.favouriteFilm) ;
    const dispatch = useDispatch()
    return <Fragment>
        <h1>Respond :</h1>  
        <Space>
            <Button type="primary" ghost onClick={ (e) => {
                dispatch(addIntoMyList("abcxyz")) 
                console.log(res)
            }}>Add into my list</Button>
            <Button type="primary" ghost onClick={ (e) => {
                dispatch(removeFromMyList("abcxyz")) ;
                console.log(res) ;
            }} >remove from my list</Button>
        </Space>
        { res.map( (item,pos) => {
            return <div key={pos}>
                <h3>item {pos} : {item}</h3>
            </div>
        })}
    </Fragment>
}

export default memo(Test) ;