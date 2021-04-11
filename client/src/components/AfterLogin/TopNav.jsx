import React from 'react'
import {Link } from 'react-router-dom'

function TopNav() {
    return (
        <>
        <div className="home-title">
            <div className="title">
                <h1><Link to='/' style={{fontSize:'35px'}}>Ilajna</Link></h1>
                <h1><Link to='/home' style={{fontSize: '25px'}} >Hey! Harsh</Link></h1>
            </div>
        </div>  
        
        </>
    )
}

export default TopNav