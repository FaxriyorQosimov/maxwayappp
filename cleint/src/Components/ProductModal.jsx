import React, { useEffect, useState } from 'react'
import {IoMdClose} from 'react-icons/io'
import {connect}  from 'react-redux'
import Button from './Button'
import {changeProductModalVizible} from '../Redusers/ReduserFoods.jsx';
import {collection, onSnapshot} from 'firebase/firestore';
import {db} from '../Firebase/config.jsx'
import {onClickIncreaseProductModal, onClickDecreaseProductModal, handleOrder} from '../Pages/HomePage/Logics.jsx'

function ProductModal({productModalVizible, changeProductModalVizible}) {
    const [comboNumm, setComboNumm] = useState('');
    const [productItem, setProductItem] = useState('')
    const [orderOrJoin, setOrderOrJoin] = useState(false);
    const [changeFoods, setChangeFoods] = useState('')
    const [dItem, setDItem] = useState('')
    useEffect(()=>{
        const load = () => {
            onSnapshot(collection(db, 'foodValue'), (snapshot) => 
                setComboNumm(snapshot.docs.map((doc) => ({...doc.data(), defaultId: doc.id})))
            )
            onSnapshot(collection(db, 'clickCard'), (snapshot) => 
                setProductItem(snapshot.docs.map((doc) => ({...doc.data() })))
            )
            onSnapshot(collection(db, 'changeFoods'), (snapshot) => 
            setChangeFoods(snapshot.docs.map((doc) => ({...doc.data() })))
            )

        }
        load()
    },[])
    const onClickModalClose = () => {
        changeProductModalVizible(true)
    }

    useEffect(()=>{
        const defaultItem = (comboNumm && productItem) && comboNumm.filter(item=> item.defaultId === productItem[0].defaultId)
        setDItem(defaultItem)
    },[])
    

    return (
        <div style={{width: '100%', position: 'relative',  background: 'red', zIndex: '100'}}>
        <div className={` ${productModalVizible ? 'product_modal' : 'product_modal_active'}`} >
            <div className="opacity"></div>
            <div className="product_modal_card" style={{display: `${productModalVizible ? 'none' : "block"}`}}>
            <span onClick={()=> onClickModalClose()}><IoMdClose /></span>
            {
                productItem.length !== 0 && 
                <div className="product_modal_card_inner">
                    <div className="product_modal_card_inner_img">
                        <img src={productItem[0].img} alt=""/>
                        <div>
                            <h1>{productItem[0].title}</h1>
                            <p>{productItem[0].body}</p>
                        </div>
                    </div>
                    <div className="product_modal_card_inner_connect">
                        <div className="items">
                            <h1>{productItem[0].title}</h1>
                            <p>{productItem[0].body}</p>
                        </div>
                        <div className="product_modal_card_inner_connect_btn d_flex_between">
                            <div>
                                <div onClick={()=>onClickDecreaseProductModal(dItem[0], productItem[0], orderOrJoin, setOrderOrJoin)}>
                                    <Button fWeight="500" fSize="26px"  borderRadius="4px" paddingStyle="13px 18px" titleName='-' bgColor="rgba(81,38,125,.08)" textColor="#51267d" />
                                </div>
                                <span className="d_flex_justify_center">{dItem.length !== 0 && dItem[0].num }</span>
                                <div onClick={()=>onClickIncreaseProductModal(dItem[0], productItem[0], orderOrJoin)}>
                                    <Button fWeight="500" fSize="26px" borderRadius="4px" paddingStyle="13px 17px" titleName='+' bgColor="rgba(81,38,125,.08)" textColor="#51267d" />
                                </div>
                            </div>
                            <div>
                                <div 
                                className="order_btn"
                                style={{ marginRight: 0, display:dItem.length !== 0 && dItem[0].orderVizible ? 'block' : 'none'}} 
                                onClick={()=> handleOrder(dItem[0], productItem[0])}>
                                    <Button 
                                        display="d_flex_between" 
                                        paddingStyle="12px 20px" 
                                        titleName="В корзину" 
                                        titleName1={!productItem[0].ceil1 ? productItem[0].ceil : productItem[0].ceil1}  
                                        bgColor="#51267D" 
                                        textColor="#fff"/>
                                </div>

                                <div 
                                className="order_btn"
                                style={{ marginRight: 0, display: dItem.length !== 0 && dItem[0].orderVizible ? 'none' : 'block'}} 
                               >
                                    <Button 
                                        display="d_flex_between" 
                                        paddingStyle="12px 20px" 
                                        titleName="Добавлено" 
                                        titleName1={productItem[0].ceil1} 
                                        bgColor="rgba(81,38,125,.08)" 
                                        textColor="#51267d"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            </div>
        </div>
    </div>
    )
}

const a = (state) => {
  return {
    productModalVizible: state.food.productModalVizible,
  }
}

export default connect(a,{changeProductModalVizible})(ProductModal)
