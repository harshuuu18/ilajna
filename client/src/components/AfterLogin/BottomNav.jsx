import React, { useContext } from 'react'
import Msg2 from '../img/msg2.png'
import Home from '../img/home.png'
import Girl from '../img/girl.png'
import Boy from '../img/boy.png'
import { Link } from 'react-router-dom'
import {UserContext} from '../../App'

function BottomNav() {
    const {state,dispatch} = useContext(UserContext)
    return (
        <>
        <nav>
            <Link><img src={Msg2} alt="" /></Link>
            <Link to='/'><img src={Home} alt="" /></Link>
            <Link to='/createpost'><img src={state?.gender === "male" ? Boy : Girl} alt="" /></Link>
        </nav>   
        </>
    )
}

export default BottomNav
