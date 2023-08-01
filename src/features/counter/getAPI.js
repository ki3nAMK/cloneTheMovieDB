import { ConsoleSqlOutlined } from '@ant-design/icons' ;  
import { createSlice } from '@reduxjs/toolkit' ;  
  
export const GetAPI = createSlice({  
    name: "api" ,  
    initialState: {  
        favouriteFilm : localStorage.getItem('myList :') ?     
            JSON.parse(localStorage.getItem("myList :")) : [] ,  
        uploadImage : '' ,  
        listOfNotification : localStorage.getItem('listNotify : ') ?   
            JSON.parse(localStorage.getItem('listNotify : ')) : [] ,  
        reverseMyList : localStorage.getItem('reverseList : ') ?  
            JSON.parse(localStorage.getItem('reverseList : ')) : [] ,   
    },   
    reducers: {    
        addIntoMyList : (state,action) => {   
            const pushElementWhenstateContentExisted = () => {      
                let checkArr = JSON.parse(JSON.stringify(state.favouriteFilm)) ;  
                let isInside = false ;  
                checkArr.forEach( (element) => {  
                    if(JSON.stringify(element) === JSON.stringify(action.payload)) { isInside = true } ;   
                })  
                let ans = !isInside ? state.favouriteFilm.push(action.payload) : null ;   
            }   
            state.favouriteFilm.length === 0    
                ? state.favouriteFilm.push(action.payload)  
                : pushElementWhenstateContentExisted()  
            localStorage.setItem("myList :",JSON.stringify(state.favouriteFilm)) ;  
        } ,  
        removeFromMyList : (state,action) => { 
            let positionItemRemoved = null ; 
            state.favouriteFilm.forEach( (item,pos) => { 
                if(item.movieName === action.payload) positionItemRemoved=pos ; 
            }) ; 
            let newItem = JSON.stringify(state.favouriteFilm[positionItemRemoved]) ; 
            newItem = !JSON.stringify(state.reverseMyList).includes(newItem) ? 
            state.reverseMyList.push(state.favouriteFilm[positionItemRemoved]) : null ; 
            state.favouriteFilm.splice(positionItemRemoved,1) ; 
            localStorage.setItem("myList :",JSON.stringify(state.favouriteFilm)) ; 
            localStorage.setItem('reverseList : ',JSON.stringify(state.reverseMyList)) ; 
        } ,  
        addImageProfile : (state,action) => { 
            state.uploadImage = action.payload ;  
            localStorage.setItem("myImage",state.uploadImage) ; 
        } , 
        addToListNotifycation : (state,action) => {
            const pushNotification = (content) => {
                let checkArr = JSON.parse(JSON.stringify(state.listOfNotification)) ;
                let contentFounded = checkArr.indexOf(content) ;
                contentFounded = !contentFounded ? state.listOfNotification.push(action.payload) : null ; 
            }
            state.listOfNotification.length === 0 
                ? state.listOfNotification.push(action.payload) 
                : pushNotification(action.payload) 
            localStorage.setItem('listNotify : ',JSON.stringify(state.listOfNotification)) ;
        } ,
        removeFromListNotification : (state,action) => {
            const getArrPos = state.listOfNotification.indexOf(action.payload) ;
            let ans = getArrPos ? state.listOfNotification.splice(getArrPos,1) : null ; 
            localStorage.setItem(JSON.stringify(state.listOfNotification)) ;
        } ,
        reverseDataForMyList : (state) => {
            console.log(JSON.parse(localStorage.getItem('reverseList : '))) ;
            if(JSON.parse(localStorage.getItem('reverseList : ')).length===0) return ; 
            state.reverseMyList = JSON.parse(localStorage.getItem('reverseList : ')) ; 
            state.favouriteFilm.push(state.reverseMyList[0]) ;
            let [data,...restData] = state.reverseMyList ; 
            state.reverseMyList = restData ; 
            localStorage.setItem('reverseList : ',JSON.stringify(state.reverseMyList)) ;
            localStorage.setItem("myList :",JSON.stringify(state.favouriteFilm)) ;
        } , 
        sortByNameMyList : (state) => {
            state.favouriteFilm.sort( (item1,item2) => {
                let name1 = item1.movieName , name2 = item2.movieName ;
                if( name1 < name2 ) return -1 ; 
                if( name2 < name1 ) return 1 ;
                return 0 ; 
            })
            localStorage.setItem("myList :",JSON.stringify(state.favouriteFilm)) ;
        } ,
        deleteAllDataMyList : (state) => {
            if( state.favouriteFilm.length===0 ) return ; 
            let arrDataReveredString = state.reverseMyList.length===0
                ? JSON.stringify(state.favouriteFilm) 
                : JSON.stringify([...state.reverseMyList,...state.favouriteFilm]) ;
            localStorage.setItem("reverseList : ",arrDataReveredString) ;
            localStorage.setItem("myList :",JSON.stringify([])) ;          
            state.favouriteFilm = [] ; 
        }
    }
})

export const { addIntoMyList , removeFromMyList , addImageProfile , addToListNotifycation 
, removeFromListNotification , reverseDataForMyList , sortByNameMyList , deleteAllDataMyList } = GetAPI.actions ;
export default GetAPI.reducer