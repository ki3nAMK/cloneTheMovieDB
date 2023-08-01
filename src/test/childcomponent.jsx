import { Fragment, memo } from "react";

function ChildComponent(props) {
    console.log("child component render !") ;
    return <Fragment>
        <h1>hello</h1>
    </Fragment>
}

export default memo(ChildComponent)