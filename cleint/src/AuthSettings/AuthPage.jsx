import React, { useState } from 'react'
import { useHttp } from './hooks/http.hook'

function AuthPage() {
    const {loading, request} = useHttp()
    const [form, setForm] = useState({
        email: '', password: ''
    })

    const changeHandller = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () =>{
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            console.log("data", data);
        } catch (error) {
            
        }
    }
    return (
        <div className="row">
            <input onChange={changeHandller} type="text" placeholder="email"/>
            <input onChange={changeHandller} type="password" name="" id="" placeholder="parol"/>
            <button disabled={loading}>voyti</button>
            <button onClick={registerHandler} disabled={loading}>registratsiya</button>
        </div>
    )
}

export default AuthPage
