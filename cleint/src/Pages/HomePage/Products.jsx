import React, { useState, useEffect } from 'react'
import Button from '../../Components/Button';
import {BsCart2} from 'react-icons/bs';
import '../../styles/products.css';
import {db} from '../../Firebase/config.jsx';
import {collection, getDocs, onSnapshot, doc, addDoc, setDoc} from 'firebase/firestore'
import {connect} from 'react-redux'
import {getFood} from '../../Redusers/ReduserFoods.jsx'
import FoodSlider from './FoodSlider';
import PopUpCart from './PopUpCart';
import ProductItems from './ProductItems';
import {gsap } from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import SwipeableDrawerKorzina from '../../Components/SwipeableDrawerKorzina';
// import {func1} from '../../Redusers/ReduserFoods.jsx'
function Products({getFood, foods, opena, authed, setOpen, setAuthed}) {

                                                                                // **********      STATE       ***************//
                                                                                // **********                  ***************//

    const [users, setUsers] = useState([]);
    const [foodFlyingVizible, setFoodFlyingVizible] = useState(false)

                                                                        // **********   GET FOODS ARRAY IN FIREBASE   ***************//
                                                                        // **********                                 ***************//
    const usersCollection = collection(db, 'maxwayFoods');
    useEffect(()=>{
        const getFoods = async () =>{
            const data = await getDocs(usersCollection)
            setUsers(data.docs.map((doc) => ({...doc.data()})))
        }
        getFoods();
    },[])

    useEffect(() => {
        getFood(users)  
    },[users])

                                                                        // **********   ONCLICK ONCLICKVIBRAT BUTTON   ***************//
                                                                        // **********                                  ***************//


    window.addEventListener("scroll", ()=>{
        if(window.scrollY > 683) {
            setProductSliderVizible(true)
        }else {
            setProductSliderVizible(false)
        }
    })


    const [productSliderVizible, setProductSliderVizible] = useState(false)

    const [productItem, setProductItem] = useState([])

    useEffect(()=>{
        const load = async () => {
            onSnapshot(collection(db, 'changeFoods'), (snapshot) => 
            setProductItem(snapshot.docs.map((doc) => ({...doc.data(), defaultId: doc.id}))))
        }
        load()
    },[])
    return (
        <div style={{position: 'relative'}}>
            <div className="swipe_able_korzina">
                <SwipeableDrawerKorzina 
                    productItem={productItem} opena={opena} authed={authed} setOpena={setOpen} setAuthed={setAuthed}
                />
            </div>
            <div className={`${productSliderVizible ? 'stiky_slider_foods_active' : 'stiky_slider_foods'}`}>
                <div className="container">
                    <div className={`stiky_slider_foods_wrapper ${productSliderVizible ? 'stiky_slider_foods_wrapper_active' : ''}`} >
                        <div className="products_category_slider">
                            <FoodSlider />
                        </div>
                        <div className="navbar_mui_box d_flex_between">
                            <div className="navbar_korzina_btn d_flex_between color_primary">
                                <div className="d_flex_between">
                                    <div className="navbar_korzina_btn_icon">
                                        <BsCart2 className="navbar_korzina_btn_icon" /> <span className="navbar_korzina_btn_icon_badge">{productItem.length}</span>
                                    </div>
                                    <div className="navbar_korzina_btn_name">Корзина</div>
                                </div>

                                <PopUpCart />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <div style={{width: '100%', height: '100%'}}>
            <div className="container">
                <div className="products">
                    <div className="products_wrapper">
                        <div className="products_category">
                            <h1>Категории</h1>
                            <div className="products_category_slider">
                                <FoodSlider />
                            </div>
                        </div>
                        <ProductItems setFoodFlyingVizible={setFoodFlyingVizible} />
                    </div>
                </div>
            </div>

        </div>
        </div>

    )
}

// const a = (state) => {
//     return {
//         foods: state.food.foods
//     }
// }

export default connect(null,{getFood})(Products)

