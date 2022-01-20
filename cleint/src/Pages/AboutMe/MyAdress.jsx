import React from 'react'
import {BsPlusCircle} from 'react-icons/bs'
import {AiOutlineClose} from 'react-icons/ai'
import '../../styles/aboutMe.css'

function MyAdress() {
    return (
        <div className="my_address">
            <div className="container">
                <div className="my_address_card">
                    <div className="my_address_card_header">
                        <div className="d_flex">
                            <BsPlusCircle />&nbsp;&nbsp;
                            <h4>Добавить адрес</h4>
                        </div>
                    </div>
                    <div className="my_address_card_body">
                        <div className="my_address_card_body_card">
                            <div className="my_address_card_body_card_header d_flex_between">
                                <h1>uzbekiston</h1>
                                <div>
                                    <AiOutlineClose />
                                </div>
                            </div>
                                <hr/>
                            <div className="my_address_card_body_card_body">
                                <p>Узбекистан, Ташкент, улица Боситхон,</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyAdress
