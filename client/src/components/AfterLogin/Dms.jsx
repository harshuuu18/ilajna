import React, { useEffect, useState } from 'react'

function Dms() {
    const [data, setData] = useState([])

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

    return (
        <article>
            {
                data.map(item=>{
                    return(
                        <h1>
                            {item._id}
                        </h1>
                    )
                })
            }
        </article>
    )
}

export default Dms
