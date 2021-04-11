import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Bg1 from '../img/bg1.png'
import Bg from '../img/bg.png'

function Home() {

    const [bgImg,setBgImg] = useState()
    useEffect(()=>{
        setInterval(() => {
            setBgImg(Bg1)
        }, 5000);
        clearInterval()
        setInterval(() => {
            setBgImg(Bg)
          }, 10000);
          clearInterval()
    },[])

    

    return (
        <>
        <article>

            <div className="title">
            <h1> <Link to='/'>Harsh</Link> </h1>
            </div>  

            <div className="bg">
            <img src={bgImg} alt="" id="bg-img" />
            </div>

            <div className="welcome">
                <h1 id="welcomeText"></h1>
            </div>

            <div className="log-sign-btn">
            <Link to='/login'><button  className="log-btn-1">Login</button></Link>
            <Link to='/signup'><button  className="sign-btn-2">Signup</button></Link>
            </div>

            <aside className="harshu">
            <p>@Harshuuu_18</p>
            </aside>
        </article>   
        </>
    )
}

export default Home
