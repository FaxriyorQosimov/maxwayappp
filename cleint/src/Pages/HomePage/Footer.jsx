import React from 'react'
import {RiFacebookLine, RiInstagramLine, RiYoutubeLine} from 'react-icons/ri';
import {Link} from 'react-router-dom'
import '../../styles/footer.css'
function Footer() {
    return (
        <div className="footer">
            <div className="container">
                <div className="footer_content">
                    <div className="footer_content_logo d_flex_justify_center">
                        <img src="../../../Images/logo-footer.svg" alt=""/>
                    </div>
                    <div className="d_flex_justify_center">
                        <div className="navbar_nav footer_navbar_nav d_flex_around">
                            <Link style={{textDecoration: 'none'}} to="/"><div className="navbar_nav_item">Главная</div></Link>
                            <Link style={{textDecoration: 'none'}} to="/brunches"><div className="navbar_nav_item">Филиалы</div></Link>
                            <Link style={{textDecoration: 'none'}} to="/about"><div className="navbar_nav_item">О нас</div></Link>
                            <Link style={{textDecoration: 'none'}} to="/contact"><div className="navbar_nav_item">Контакты</div></Link>
                        </div>
                    </div>
                    <div className="footer_socials d_flex_between">
                        <p>© MaxWay 2005 - 2021 All rights reserved</p>
                        <div className="footer_socials_icons d_flex_between">
                            <div className="footer_socials_icons_card d_flex_justify_center">
                                <a style={{color: '#fff'}} className="d_flex_justify_center" href="https://www.instagram.com/maxwayuz/">
                                    <RiInstagramLine />
                                </a>
                            </div>
                            <div className="footer_socials_icons_card d_flex_justify_center">
                                <a style={{color: '#fff'}} className="d_flex_justify_center" href="https://m.facebook.com/maxway.uzb/?tsid=0.596456838293574&source=result">
                                    <RiFacebookLine />
                                </a>
                            </div>
                            <div className="footer_socials_icons_card d_flex_justify_center">
                                <a style={{color: '#fff'}} className="d_flex_justify_center" href="https://www.youtube.com/channel/UC27YE8OXKOzFnRldRiRB_4Q">
                                    <RiYoutubeLine />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="footer_socials_by_defelopers d_flex_between">
                        <p>Пользовательское соглашение</p>
                        <p>Developed by <a style={{color: 'white'}} href="https://github.com/FaxriyorQosimov1703?tab=repositories">Fakhriyor</a></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
