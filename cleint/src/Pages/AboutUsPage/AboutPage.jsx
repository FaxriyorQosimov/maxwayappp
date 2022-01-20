import React from 'react'
import '../../styles/aboutPage.css'
import { LazyLoadImage } from 'react-lazy-load-image-component';

function AboutPage() {
    return (
        <div className="about_page">
            <div className="container">
                <div className="about_page_wrapper">
                    <div className="about_page_card">
                        <div className="about_page_card_img">
                            <LazyLoadImage effect="blur" width="100%" height="100%" src="../../../Images/about_img.png" alt=""/>
                        </div>
                        <div className="about_page_card_content">
                            <h2>О компании</h2>
                            <p>Компания была основана в феврале 2005 года в Ташкенте. На сегодняшний момент у компании 11 филиалов в Ташкенте.
                                Меню состоит в основном из клаб сендвичей, хот-догов, бургеров, лавашей и донаров. Наши приоритеты – свежесть и качество ингредиентов, разнообразие начинок, доступные цены и внимание к просьбам гостей.
                                Ежедневно в MaxWay заказывают большое количество самых разных людей. И мы стараемся увеличивать как число посетителей, так и число филиалов. С каждым приготовленным блюдом мы оттачиваем детали фирменных рецептов и ищем идеальный баланс цены и качества, чтобы и дальше оставаться вашим любимым брендом.
                                Если вдруг вы столкнулись с плохим обслуживанием или низким качеством приготовленной еды с нашей стороны, обязательно напишите нам на <a style={{textDecoration: 'none'}} href="https://t.me/maxwaymasterfoodsupport">https://t.me/maxwaymasterfoodsupport.</a> Мы с радостью принимаем как положительные, так и отрицательные отзывы. Жалоба гостя – подарок, благодаря которому нам есть куда расти.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutPage
