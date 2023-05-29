import { Fragment, memo } from "react";
import { useSelector } from "react-redux";
import "./countNotify.css" ;

function CountNotify() {
    const toStringRes = (alt) => {
       return "0"+alt.length ; 
    } 
    let res = useSelector( state => state.api.listOfNotification ) ;
    let ans = res.length<=9 ? toStringRes(res) : res.length ;
    return <Fragment>
        <span className="CountNotify">{ans}</span>
    </Fragment>
}

export default memo(CountNotify)