import { Fragment, memo } from "react";
import "./Loader.css" ;

function Loader () {
    return <div className="wrapperLoader">
        <div class="lds-facebook"><div></div><div></div><div></div></div>
    </div>
}

export default memo(Loader) ;