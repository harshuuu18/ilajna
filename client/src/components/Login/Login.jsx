import { motion } from 'framer-motion'
import React, { useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {UserContext} from '../../App'


function Login() {
    const {state,dispatch} = useContext(UserContext)
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const history = useHistory()
    
    const PostData = () =>{
        fetch('/login',{
            method: 'post',
            headers: {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                email,
                password
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.error){
                console.log(data.error)
            }
            else{
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user})
                history.push('/')
            }
        })
        .catch(err => console.log(err))
    }

    return (
        <motion.div
        initial={{opacity: 0, x:'100%'}}
        animate={{opacity: 1, x:0}}
        exit={{opacity:0, x:'100%'}}
        >
        <article>

        <div className="title">
            <h1><Link to='/'>Ilajna</Link></h1>
        </div> 

        <div className="signup">
            <input type="text" name="" value={email} onChange={(e)=>setEmail(e.target.value)} className="sign-inp" placeholder="Email" id="" />
            <br/>
            <input type="text" name="" value={password} onChange={(e)=>setPassword(e.target.value)} className="sign-inp" placeholder="Password" id="" />
            <br/>
            <div className="forgot">
                <Link to='/'>Forgot Password?</Link>
            </div>
            <br/>

            <div className="notice">
                <p>Don't have an Account? <Link to='/signup'>Signup</Link></p>
            </div>
            <br/>
            <br/>

            <button onClick={()=>PostData()} >Login</button>

        </div>

        <aside className="harshu">
            <p>@Harshuuu_18</p>
        </aside>

        </article>   
        </motion.div>
    )
}

export default Login
