import React, { useEffect, useState } from 'react'
import Girl from '../img/girl.png'
import {useHistory} from 'react-router-dom'


function CreatePost() {
    const [userImg,setUserImg] = useState(Girl)
    const history = useHistory()
    const [title,setTitle] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState("")
    useEffect(() => {
        if(url){
            fetch("/createpost", {
                method: "post",
                headers: {
                    "Content-Type":"application/json",
                    "Authorization": "Bearer "+localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    title,
                    pic:url
                })
            }).then(res => res.json())
            .then(data => {
                // console.log(data);
                if(data.error){
                console.log(data)                 
            } else  {
                
                console.log(data)
                history.push('/')    
                
            }
        }).catch(err => {
            console.log(err);
        })
        }
        
    },[url])

    // console.log(mypics[0].photo)
    // console.log(mypics)
    
    const PostDetails = () => {
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset", "insta-clone")
        data.append("cloud_name","dwyth5t7n")
        fetch("	https://api.cloudinary.com/v1_1/dwyth5t7n/image/upload", {
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data => {
            setUrl(data.url)
            })
            .catch(err => {
            console.log(err);
            })

        
    }

    return (
        <>
        <article>
          <div className="container">
              <h1 style={{color:'black'}}>Upload Your Pic here..</h1>
            
            <div className="avatar-upload">
                <div className="avatar-edit">
                    <input type='file' id="imageUpload" onChange={(e)=>{
                        setUserImg(URL.createObjectURL(e.target.files[0])) 
                        setImage(e.target.files[0])}
                        } />
                    <label htmlFor="imageUpload"></label>
                </div>
                <div className="avatar-preview">
                    <div id="imagePreview" style={{backgroundImage: `url(${userImg})`}}>
                    </div>
                </div>
            </div>

            <textarea value={title} onChange={(e)=>setTitle(e.target.value)} id="caption-input">
            </textarea>
            <br/>
            <button onClick={()=>PostDetails()}>Upload</button>
            </div>  



        </article>
        </>
    )
}

export default CreatePost
