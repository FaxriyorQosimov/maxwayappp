import React, { Component, useState } from "react";
import Slider from "react-slick";
// import {gsap } from 'gsap';
// import {ScrollTrigger} from 'gsap/ScrollTrigger';
// import {preventOverlaps} from 'gsap/preventOverlaps'
import '../../styles/products.css'
import '../../styles/foodSlider.css'

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={"prev"}
      style={{ ...style}}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={'next'}
      style={{ display: 'flex'}}
      onClick={onClick}
    />
  );
}


export default function FoodSlider() {
  
    var settings = {
      // className: "center",
      // centerMode: true,
      centerPadding: "60px",
      speed: 500,
      dots: false,
      infinite: false,
      slidesToShow: (window.innerWidth > 299 && window.innerWidth < 568 ) ? 1.8 : (window.innerWidth > 566 && window.innerWidth < 900 ) ? 3.7 : 5,
      slidesToScroll: 1,
      // arrows: (window.innerWidth > 299 && window.innerWidth < 568 ) ? false : true
      nextArrow: <SamplePrevArrow />,
      prevArrow: <SampleNextArrow />
    };
    const [item, setItem] = useState([
      {id: 1,color: '#000', bg: '#fff',  foodName: 'combo',food: '🥪🍟🥤Комбо'},
      {id: 2,color: '#000', bg: '#fff',  foodName: 'clab',food: '🥪 Клаб сэндвич'},
      {id: 3,color: '#000', bg: '#fff',  foodName: 'lavash',food: '🌯 Лаваш'},
      {id: 4,color: '#000', bg: '#fff',  foodName: 'shaurma',food: '🥙 Шаурма'},
      {id: 5,color: '#000', bg: '#fff',  foodName: 'donar',food: '🍱 Донар блюдо'},
      {id: 6,color: '#000', bg: '#fff',  foodName: 'xotdog',food: '🌭 Хот-дог'},
      {id: 7,color: '#000', bg: '#fff',  foodName: 'xaggi',food: '🌮 Хагги'},
      {id: 8,color: '#000', bg: '#fff',  foodName: 'burger',food: '🍔 Бургеры'},
      {id: 9,color: '#000', bg: '#fff',  foodName: 'garnir',food: 'Гарниры'},
      {id: 10,color: '#000', bg: '#fff', foodName: 'sneki', food: '🍟 Снеки'},
      {id: 11,color: '#000', bg: '#fff', foodName: 'napitki', food: '🥤 Напитки'},
      {id: 12,color: '#000', bg: '#fff', foodName: 'desert', food: '🍰 Десерты'},
      {id: 13,color: '#000', bg: '#fff', foodName: 'sous', food: 'Соусы'},
    ])

    const navli = document.querySelectorAll('.swiper_slide_item_inner')
    const sections = document.querySelectorAll('.products_food_info')

    if(sections.length !== 0){
      window.addEventListener("scroll", () => {
        let current = '';
        sections.forEach(section => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;
          if(window.pageYOffset > (sectionTop +700 - sectionHeight / 3)) {
            current = section.getAttribute('id')
          }
        })
  
  
        navli.forEach(li=>{
          li.classList.remove("active");
          if(li.classList.contains(current)){
            li.classList.add('active')
          }
        })
      })
    }

    return (
      <div >
        <Slider {...settings}>
        {
          item.map((p, index)=> 
          <div
          key={p.id} 
          className="swiper_slide_item" >
              <a href={`#${p.foodName}`} className={`${p.foodName} swiper_slide_item_inner `} 
              >{p.food}</a></div>
              )
            }
        </Slider>
      </div>
    );
}