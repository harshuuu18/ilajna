import React,{useState,useContext,useEffect} from 'react'
import Post from '../img/post.jpg'
import Liked from '../img/liked.png'
import Like from '../img/like.png'
import Msg2 from '../img/msg2.png'
import {UserContext} from '../../App'

function AllPost() {

    const [data, setData] = useState([])
    const {state, dispatch} = useContext(UserContext)
    useEffect( async () => {
        await fetch('/allpost', {
            headers: {
                "Content-Type":"application/json",
               "Authorization":"Bearer "+ localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
            .then(result => {
                const post = result.posts
                
           setData(post)
           console.log(post)
       })
    },[])


    const likePost = (id) => {
        fetch('/like', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
            .then(result => {
            const newData = data.map(item => {
                    if (item._id == result._id) {
                     return result
                    } else {
                        return item
                 }
                })
                setData(newData)
            }).catch(err => {
            console.log(err)
            })
        
    }

    const unlikePost = (id) => {
        fetch('/unlike', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
            .then(result => {
                const newData = data.map(item => {
                    if (item._id == result._id) {
                     return result
                    } else {
                        return item
                 }
                })
                setData(newData)
        }).catch(err => {
            console.log(err)
        })
    }
    console.log(state?.gender)
    return (
        <>
        {data.map(item=>{
            
            return(
                
                
            
         <div className="post" key={item._id}>
            <div className="user-info">
                <h2>{item.postedBy?.name}</h2>
                <h4>{item.likes.length}</h4>
            </div>

            <img src={item.photo} className="user-pic" alt="" />
            <br/>
            <div className="user-bio">
                <div className="user-bio1">
                    <p>{item.title} </p>
                </div>
                
                <div className="user-bio2">
                    <div className="action">
                        {item.likes.includes(state._id)
                        ?
                        <img src={Liked} alt="" onClick={()=>unlikePost(item._id)} />
                        :
                        <img src={Like} alt="" onClick={()=>likePost(item._id)} />

                        }
                        <img src={Msg2} alt=""  />
                         {/* <img src="liked.png" alt=""> --> */}
                    </div>
                </div>
            </div>
            <br/>

           </div>   
        
            )   
    })
    }
        </>
    )
}

export default AllPost