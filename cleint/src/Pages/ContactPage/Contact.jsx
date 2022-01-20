import React from 'react'
import '../../styles/contact.css'
function Contact() {
    return (
        <div className="contact">
            <div className="container">
                <div className="contact_wrapper">
                    <div className="contact_card">
                        <h2>Контакты</h2>
                        <div className="contact_card_title d_flex_between">
                            <h3>Единный call-центр</h3>
                            <h3><a href="tel:+998 97 166 99 96">+998 97 166 99 96</a></h3>
                        </div>
                        <div className="contact_card_line"></div>
                        <p>Вы можете написать нам <a href="https://t.me/@faxriyor_00">@faxriyor_00</a> также вы можете звонить по номеру +998971669996.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact
