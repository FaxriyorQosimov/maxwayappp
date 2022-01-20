import React,{useState, useEffect} from 'react'
import Button from '../../Components/Button'
import {MdDelete} from 'react-icons/md'
import { connect } from 'react-redux';
import {collection, onSnapshot, doc, setDoc} from 'firebase/firestore';
import {db} from '../../Firebase/config.jsx'
import {handleDeleteFood, onClickIncreasePopUpCart, onClickDecreasePopUpCart} from './Logics.jsx'
import {useNavigate} from 'react-router-dom'


function PopUpCart({setOpena, authed}) {
    const navigate = useNavigate()
    const [productItem, setProductItem] = useState([]);
    const [comboNumm, setComboNumm] = useState('');
    const [generalPrice, setGeneralPrice] = useState('')
    useEffect(()=>{
        const load = async () => {
            onSnapshot(collection(db, 'changeFoods'),  (snapshot) => 
            setProductItem(snapshot.docs.map(  (doc) => ({...doc.data(), defaultId: doc.id}))));
    
            onSnapshot(collection(db, "foodValue"),  snapshot => 
                setComboNumm(snapshot.docs.map(  (doc) => ({...doc.data(), defaultId: doc.id})))
            )
    
            onSnapshot(collection(db, "generalPrice"),  snapshot => 
            setGeneralPrice(snapshot.docs.map(  (doc)  => ({...doc.data(), defaultId: doc.id})))
            )
        }
        load()
    },[])
    // console.log(authed);
    // console.log(setOpena);

    useEffect(()=> {
        let num = 0;
        for(let i = 0; i < productItem.length; i++){
            // console.log(parseInt(productItem[i].ceil));
            num = num + parseInt(productItem[i].ceil.slice(0,6));
            
            const docRef1 = doc(db, 'generalPrice', 'buCDPjFEfaBlbmgVqy4M');
            const payload1 = {...generalPrice[0], generalPrice: num}
            setDoc(docRef1, payload1)
        }

    },[productItem])
    // console.log(authed);
    const zakazat = () =>{
        authed ? navigate('/checkout') : setOpena(true)
    }

    return (
        <div className="popUp_modal_card" style={{zIndex: '1'}}>
        <div className={`popUp_modal_card_inner ${productItem.length === 0 && 'active_popUp_modal_card_inner'}`}>
            <div className="popUp_modal_card_inner_box">

            {
                productItem.length === 0 ? <div>
                    <img src="https://maxway.uz/images/Icons/empty_cart.png" alt=""/>
                </div>  : productItem.map((item, index) => 
                    
                <div key={index} className="popUp_modal_card_inner_box_item d_flex_between">
                    <div className="popUp_modal_card_inner_box_item_img">
                        <img src={item.img} alt=""/>
                    </div>
                    <div className="popUp_modal_card_inner_box_item_content">
                        <div className="popUp_modal_card_inner_box_item_content_top d_flex_between">
                            <h4>{item.title}</h4>
                            <div onClick={()=>handleDeleteFood(comboNumm[item.id - 1], item)}><MdDelete className="delete_icon" /></div>
                        </div>
                        <div className="popUp_modal_card_inner_box_item_content_bottom d_flex_between">
                            <div className="popUp_modal_card_inner_box_item_content_bottom_btn d_flex_between">
                                <div onClick={()=>onClickDecreasePopUpCart(comboNumm[item.id - 1],item)}>
                                    <Button borderRadius="4px" paddingStyle="5px 10px" titleName='-' bgColor="rgba(81,38,125,.08)" textColor="#51267d" />
                                </div>
                                <span className="d_flex_justify_center">{item.count === 0 ? (item)=> handleDeleteFood(item) : item.count}</span>
                                <div onClick={()=>onClickIncreasePopUpCart(comboNumm[item.id - 1], item)}>
                                    <Button borderRadius="4px" paddingStyle="5px 12px" titleName='+' bgColor="rgba(81,38,125,.08)" textColor="#51267d" />
                                </div>
                            </div>
                            <h4>{item.ceil}</h4>
                        </div>
                    </div>
                </div>
                )
            }


            </div>
            {
                productItem.length === 0 ? <h2 style={{textAlign: 'center'}}>В корзине пока пусто</h2> :
                <div className="d_flex_justify_center">
                    <div className="zakazat_bt" onClick={()=>zakazat()}>
                        <Button 
                            width="100%" 
                            display="d_flex_between" 
                            titleName="Заказать" titleName1={`${generalPrice.length !==0 && generalPrice[0].generalPrice} 000 сум`} 
                            bgColor="#51267D" 
                            textColor="#fff"/>
                    </div>
                </div>

            }
        </div>
    </div>
    )
}

// const a = state => {
//     return {
//         foodNumber: state.food.foodNumber,
//         comboNumber: state.food.comboNumber
//     }
// }

export default PopUpCart
