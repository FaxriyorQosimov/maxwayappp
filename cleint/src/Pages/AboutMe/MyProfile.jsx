import axios from 'axios'
import React, { useEffect } from 'react'
import Button from '../../Components/Button'

import '../../styles/aboutMe.css'

function MyProfile() {


    useEffect(()=> {
        const load = async() => {
            axios.get("http://localhost:9002/data")
                .then(res => 
                    {
                        console.log(res);
                    }
                )
        }
        load()
    },[])

    return (
        <div className="my_profile">
            <div className="container">
                <div className="my_profile_card">
                    <h1>Мои данные</h1>
                    <label htmlFor="name">Имя</label>
                    <input type="text" id="name"/>
                    <label htmlFor="email">Электронная почта</label>
                    <input type="email" id="email"/>
                    <div className="my_profile_btn">
                        <Button titleName={'Обновить'} bgColor="#51267D" textColor="#fff" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyProfile
