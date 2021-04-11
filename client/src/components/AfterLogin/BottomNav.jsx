import React from 'react'
import Msg2 from '../img/msg2.png'
import Home from '../img/home.png'
import Girl from '../img/girl.png'
import { Link } from 'react-router-dom'

function BottomNav() {
    return (
        <>
        <nav>
            <img src={Msg2} alt="" />
            <img src={Home} alt="" />
            <Link to='/createpost'><img src={Girl} alt="" /></Link>
        </nav>   
        </>
    )
}

export default BottomNav
