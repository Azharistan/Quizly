import React, {useState} from 'react'

const testlogin = () => {
    
    const [_id, set_id] = useState('');
    const [password, setPassword] = useState('');

    async function LoginUser(event){
        event.preventDefault()

        const response = await fetch('https://quizly-nine.vercel.app/api/login', 
        {method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            _id,
            password
        }),
    })
        const data = await response.json()
        console.log(data)

        if(data.student){
            
            alert('Login Succesful')
        }else{
            alert('please check id or password')
        }
    }

  return (<div>
    <h1>Login</h1>
    <form onSubmit={LoginUser}>
        <input value={_id}
        onChange={(e)=>set_id(e.target.value)}
        type='text'
        placeholder='RegNo.'/>
        <br/>
        <input value={password} 
        onChange={(e)=>setPassword(e.target.value)}
        type='password'
        placeholder='Password'/>
        <br/>
        <input type='submit' value='Login'/>
    </form>
</div>
  )
}

export default testlogin
