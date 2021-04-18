import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Girl from '../../img/girl.png'
import Boy from '../../img/boy.png'

function UserProfile() {
    const [userProfile,setProfile] = useState('')
    const {userid} = useParams()
    console.log(userid)
    useEffect(()=>{
        fetch(`/dms/${userid}`,{
            headers:{
                "Authorization":"Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
        .then(result =>{
            console.log(result)
            setProfile(result)
        })
    },[])
    console.log(userProfile)

    return (
        <article>
            <div className="user-profile-info">
                <div className="user-profile-info-img">
                <img src={userProfile.user?.gender === "male" ? Boy : Girl} alt=""/>
                </div>
                <div className="user-profile-info-name">
                <h3>{userProfile.user?.name ? userProfile.user?.name : "loading...." }</h3>
                </div>
                <div className="user-profile-info-status">
                    <div className="status-on-off">

                    </div>
                </div>
            </div>

            <div className="chat-screen">
                <br/><br/>
                <div className="msg-sender">
                 <h3>Hellos</h3>   
                </div>
                

                <div className="msg-reci">
                 <h3>Hi</h3>   
                </div>

                
            </div>

            <form id="send-msg" action="">
            <input type="text" className="msg-input" autoFocus placeholder="Enter your msg here!" />
            <input type="submit" value="Send" className="msg-btn" />
            </form>
        </article>
    )
}

export default UserProfile
