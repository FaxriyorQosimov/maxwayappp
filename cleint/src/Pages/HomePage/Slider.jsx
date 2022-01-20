import React, { Component } from "react";
import Slider from "react-slick";
import '../../styles/slider.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", marginRight: '7%', marginTop: '10px' }}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", marginLeft: "7%", zIndex: '100', display:'flex', justifyContent: 'end'}}
        onClick={onClick}
      />
    );
  }

export default class Slider1 extends Component {
    constructor(props) {
        super(props);
        this.play = this.play.bind(this);
        this.pause = this.pause.bind(this);
      }
      play() {
        this.slider.slickPlay();
      }
      pause() {
        this.slider.slickPause();
      }
    render() {
    const settings = {
      autoplaySpeed: 3000,
      dots: true,
      infinite: true,
      arrows: true,
      adaptiveHeight: true,
    //   lazyLoad: true,
      autoplay: true,
      speed: 2000,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      appendDots: dots => (
        <div
          style={{
            borderRadius: "10px",
            padding: "10px",
            marginBottom: "30px"
          }}
        >
          <ul style={{ margin: "0px 10px" }}> {dots} </ul>
        </div>
      ),
      customPaging: i => (
        <div
          style={{
            width: "80%",
            height: '5px',
            borderRadius: '6px',
            marginTop: '20px'
          }}
        >
        </div>
      )
    };
    return (
      <div>
        <div className="slider">
             <div className="slider_wrapper">
                <Slider ref={slider => (this.slider = slider)} {...settings}>
                     <div><LazyLoadImage height="100%" width="100%" effect="blur" src="../../../Images/home_slider_1.jfif" alt=""/></div>
                     <div><LazyLoadImage height="100%" width="100%" effect="blur" src="../../../Images/home_slider_2.jfif" alt=""/></div>
                     <div><LazyLoadImage height="100%" width="100%" effect="blur" src="../../../Images/home_slider_3.jfif" alt=""/></div>
                     <div><LazyLoadImage height="100%" width="100%" effect="blur" src="../../../Images/home_slider_4.jfif" alt=""/></div>
                </Slider>
             </div>
         </div>
      </div>
    );
  }
}
