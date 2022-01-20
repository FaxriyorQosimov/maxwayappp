import React, { useEffect, useState } from 'react'
import BasicTabs from './TabPanel'
import Button from '../../Components/Button'
import {useNavigate} from 'react-router-dom'
import {collection, onSnapshot, doc, setDoc} from 'firebase/firestore';
import {db} from '../../Firebase/config.jsx'


import '../../styles/myOrder.css'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { commonData } from '../HomePage/Logics';

function CurrentOrders() {
    const navigate = useNavigate()
     
    const orderBtn = () => {
        navigate('/')
    }
    return (
        <div className="my_order_body">
            <div>
                <LazyLoadImage effect="blur" width="100%" height="80%" src="../../../Images/empty-order.png" alt=""/>
                <p>У вас еще нет заказа. Нажмите кнопку, чтобы оформить заказ</p>
                <div className="my_order_body_btn" onClick={()=> orderBtn()}>
                    <div>
                        <Button titleName={'Оформить заказ'} bgColor="#51267D" textColor="#fff" />
                    </div>
                </div>
            </div>
        </div>
    )
    
}

function PurchaseHistory() {
    const navigate = useNavigate()
    const [commonDat, setCommonDat] = useState('')
    const [generalPric, setGeneralPrice] = useState('')
    console.log(generalPric);
    console.log(commonDat);
    useEffect(() => {
        const load = async () => {
            onSnapshot(collection(db, 'commonData'),  (snapshot) => 
            setCommonDat(snapshot.docs.map(  (doc) => ({...doc.data(), defaultId: doc.id}))));

            onSnapshot(collection(db, "generalPrice"),  snapshot => 
            setGeneralPrice(snapshot.docs.map(  (doc)  => ({...doc.data(), defaultId: doc.id})))
            )
        }
        load()
    },[])
    const arr = [
        {
            data: "2021-12-07 11:58:42",
            status: 'Заказ отменен',
            filial: 'MaxWay Мукумий',
            dostavka: '0 сум',
            all: '121 000 сум'
        },
        {
            data: "2021-12-07 11:58:42",
            status: 'Заказ отменен',
            filial: 'MaxWay Мукумий',
            dostavka: '0 сум',
            all: '121 000 сум'
        }
    ]
    return (
        <div className="PurchaseHistory" onClick={()=>navigate('/my-order-item')}>

                    {
                        commonDat && 
                        <div className="PurchaseHistory_card" >
                            <h1>105234</h1>
                            <hr/>
                            <div className="PurchaseHistory_card_items">
                                <div className="PurchaseHistory_card_item d_flex_between">
                                    <h2>Дата</h2>
                                    <h3>{commonDat[0].date}</h3>
                                </div>
                                <div className="PurchaseHistory_card_item d_flex_between">
                                    <h2>Статус</h2>
                                    <h3>{commonDat[0].paymentType}</h3>
                                </div>
                                <div className="PurchaseHistory_card_item d_flex_between">
                                    <h2><span>Филиал</span></h2>
                                    <h3>{commonDat[0].address}</h3>
                                </div>
                                <div className="PurchaseHistory_card_item d_flex_between">
                                    <h2>Доставка</h2>
                                    <h3>{commonDat[0].shippingMethods === 'Доставка' ? '9 000 sum' : '0 sum'}</h3>
                                </div>
                                <div className="PurchaseHistory_card_item d_flex_between">
                                    <h2>Всего</h2>
                                    <h3>{(commonDat[0].shippingMethods === 'Доставка') ? 
                                    (generalPric && generalPric[0].generalPrice+9+' 000 сум') : 
                                    (generalPric && generalPric[0].generalPrice+' 000 сум')}</h3>
                                </div>
                            </div>
                        </div>
                    }
                    
        </div>
    )
}
    
    function MyOrders() {

        return (
            <div className="my_order_wrapper">
            <div className="container">
                <div className="my_order">
                    <div className="my_order_header">
                        <BasicTabs title1="Текущие заказы" title2="История заказов" tabPanelContent1={CurrentOrders} tabPanelContent2={PurchaseHistory}  />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyOrders
