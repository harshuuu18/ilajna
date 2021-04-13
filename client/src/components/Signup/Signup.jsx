import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {ToastContainer, Toast, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {AnimatePresence, motion} from 'framer-motion'


function Signup() {
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [gender,setGender] = useState("")
    const history = useHistory()
    
    const PostData = () =>{
        fetch('/signup',{
            method: 'post',
            headers: {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                name,
                email,
                password,
                gender
            })
        })
        .then(res => res.json())
        .then(data => {
            
            console.log(data)
            if(data.error){
                console.log(data.error)
                toast.error(data.error, {
                    position: "top-right",
                    top: '10',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            }else{
                console.log(data);
                toast.success(data)
                history.push('/login')
            }
        })
        .catch(err => console.log(err))
    }

    return (
        <motion.div 
        initial={{opacity: 0, x:'-100%'}}
        animate={{opacity: 1, x:0}}
        exit={{opacity:0, x:'-100%'}}
         >
        <article>
        <ToastContainer />

        <div className="title">
            <h1><a href="index.html">Ilajna</a></h1>
        </div> 

        <div className="signup">
            <input type="text" name="" value={name} onChange={(e)=>setName(e.target.value)} autoFocus className="sign-inp" placeholder="Username"  />
            <br/>
            <input type="text" name="" value={email} onChange={(e)=>setEmail(e.target.value)} className="sign-inp" placeholder="Email"  />
            <br/>
            <input type="text" name="" value={password} onChange={(e)=>setPassword(e.target.value)} className="sign-inp" placeholder="Password"  />
            <br/>

            <div className="gender">
                <input type="radio" name="gender" value="male" onChange={(e)=>setGender(e.target.value)} /><span>Male</span >
                <input type="radio" name="gender" value="female" onChange={(e)=>setGender(e.target.value)} /><span>Female</span >
            </div>
            <br/>

            <div className="notice">
                <p>Already have an Account? <Link to='/login'>Login</Link></p>
            </div>
            <br/>
            <br/>

            <button onClick={()=>PostData()} >Signup</button>

        </div>

        <aside className="harshu">
            <p>@Harshuuu_18</p>
        </aside>

        </article>   
        </ motion.div>
    )
}

export default Signup
