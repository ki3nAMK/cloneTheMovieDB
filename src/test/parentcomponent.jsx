import { Fragment, memo, useEffect, useRef, useState } from "react";
import Childcomponent from "./childcomponent";  
  
function ParentComponent() {  
    const [x,setX] = useState(0) ;  
    const [time,setTime] = useState(0) ;  
    const TimeSetting = useRef(null) ;  
    const [name,setName] = useState(null) ;
    const [value,setValue] = useState(null) ;
    const [product,setProduct] = useState([]) ;
    var element = 1 ;  
    const HandleButton = () => {  
        setX( prev => {  
            element++ ;  
            console.log(">>>",element) ;  
            return ++prev ;  
        })  
    }  
    useEffect( () => {   
        TimeSetting.current = setInterval( () => {   
            setTime( prev => prev + 1 ) ;   
        },1000)  
    },[])   
    const handleAddPrice = () => {
        setProduct([...product,{
            name:name,
            price:parseInt(value),
        }])
    }
    const total = product.reduce( (result,element) => {
        return result+element.price
    },0)
    console.log("parent component render !") ;
    return <Fragment>
        <button onClick={HandleButton}>X++</button>
        <h1 style={{padding:"20px"}}>{x}</h1>
        <Childcomponent name={element}></Childcomponent><hr style={{padding:"20px"}}></hr>
        <input value={name} placeholder="Enter name....." style={{padding:"20px"}} onChange={e => setName(e.target.value)}/>
        <input value={value} placeholder="Enter value....." style={{padding:"20px"}} onChange={e => setValue(e.target.value)}/>
        <h1>Total Price : {total}</h1> 
        <button style={{padding:"20px"}} onClick={handleAddPrice}>Add</button> 
        <ul>
            {product.map((element,pos) => {
                return <li>{element.name} - {element.price}</li>
            })}
        </ul>
    </Fragment>
}

export default memo(ParentComponent) ; 