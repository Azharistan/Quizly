import React, { useEffect, useState } from 'react'
import {QRCodeSVG} from 'qrcode.react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const QRPage = () => {

    const {id} = useParams();
    const [loading, setloading] = useState(false)
    const [link, setLink] = useState('');
    console.log(id)
    useEffect(()=>{
        axios.get(`http://localhost:5000/quizes/attempt/${id}`)
        .then((response)=>{
            console.log(response)
            setloading(true)
            if(response.statusText === 'Already Attempting')
                alert("It seems you have already attempted this quiz before.")
            else if(response.statusText === 'token expired')
                alert("Sorry the time to attempt this quiz is over.")
            else if( response.statusText==='OK'){
                setLink(`http://localhost:5173/attempt/${id}`)
                console.log("link")
                setloading(false)
            }
        }
        )
    },[])
  return (
    <div>
    {
        loading? null:
     (  
        <div>
            <QRCodeSVG height={'100%'} value={link}/>
            <p>Or Click on the following link : <a href={link}>Link</a></p>
        </div> 
    )
    }
        
    </div>
  )
}

export default QRPage
