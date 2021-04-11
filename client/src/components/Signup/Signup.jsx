import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

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
            history.push('/login')
        })
        .catch(err => console.log(err))
    }

    return (
        <>
        <article>

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
        </>
    )
}

export default Signup
