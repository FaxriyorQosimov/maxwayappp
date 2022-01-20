import React,{useEffect, useState} from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';
import Button from '../../Components/Button.jsx';
import BasicTabs from './TabPanel.jsx';
import FormattedInputs from './TelInput.jsx'
import {collection, onSnapshot, doc, setDoc} from 'firebase/firestore';
import {db} from '../../Firebase/config.jsx'
import {useNavigate} from 'react-router-dom'
import TimePicker from 'react-time-picker';
import { commonData } from '../HomePage/Logics.jsx';
import Maps from './Maps.jsx';


import '../../styles/checkout.css';




function Checkout() {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState(0);
    const [activeCard, setActiveCard] = useState(2);
    const [changeFoods, setChangeFoods] = useState([]);
    const [generalPrice, setGeneralPrice] = useState('');
    const [saveUser, setSaveUser] = useState('')
    const [value, onChange] = useState('10:00');
    const [street, setStreet] = useState('улица Буюк Ипак Йули, 4')
    const [adressOption, setAdressOption] = useState([
        {id: 1, address: 'Юнусабад Универсам', street: 'махалля Акбаробод'},
        {id: 2, address: 'MaxWay Ройсон', street: 'улица Заркайнар, 4'},
        {id: 3, address: 'MaxWay Некст', street: 'улица Бабура, 6'},
        {id: 4, address: 'MaxWay Мукумий', street: '1-й квартал, 1'},
        {id: 5, address: 'Master Food Ганга', street: 'Master Food'},
        {id: 6, address: 'Master Food Гостиница Россия ', street: 'улица Шота Руставели, 9А'},
        {id: 7, address: 'MAX WAY Сайрам', street: 'Сайрам'},
        {id: 8, address: 'MAX WAY Максим Горький', street: 'улица Буюк Ипак Йули, 4'},
        {id: 9, address: 'Masterfood Сергели', street: 'массив Сергели-VIIIА, 11'},
        {id: 10, address: 'MAX WAY Юнусабад Фонтан', street: '3-й квартал, 21'},
        {id: 11, address: 'MAX WAY Минор', street: 'MaxWay'},
        {id: 12, address: 'Юнусабад Универсам', street: 'махалля Акбаробод'},
        {id: 13, address: 'Юнусабад Универсам', street: 'махалля Акбаробод'},
    ])

    const [commonDat, setCommonDat] = useState({
        name: 'add',
        paymentType: 'Payme',
        shippingMethods: 'net',
        date: '',
        Price: null,
        address: ''
    })
    // console.log(commonDat);
    console.log(changeFoods);
    useEffect(() => {
        const load = async () => {
            onSnapshot(collection(db, 'changeFoods'),  (snapshot) => 
            setChangeFoods(snapshot.docs.map(  (doc) => ({...doc.data(), defaultId: doc.id}))));

            onSnapshot(collection(db, "generalPrice"),  snapshot => 
            setGeneralPrice(snapshot.docs.map(  (doc)  => ({...doc.data(), defaultId: doc.id})))
            )

            onSnapshot(collection(db, "saveThings"),  snapshot => 
            setSaveUser(snapshot.docs.map(  (doc)  => ({...doc.data(), defaultId: doc.id})))
            )
    
        }
        load()
    },[])

    const handlePaymentType = (id) => {
        if(id === 0) {
            setActiveTab(0)
            setCommonDat({...commonDat, shippingMethods: 'Доставка'})
        }
        if(id === 1) {
            setActiveTab(1)
            setCommonDat({...commonDat, shippingMethods: 'Самовывоз'})
        }
        if(id === 2) {
            setActiveCard(2)
            setCommonDat({...commonDat, paymentType: 'Наличные'})
        }
        if(id === 3) {
            setActiveCard(3)
            setCommonDat({...commonDat, paymentType: 'Click'})
        }
        if(id === 4) {
            setActiveCard(4)
            setCommonDat({...commonDat, paymentType: 'Payme'})
        }
    }

    function noDostavka() {
        return (
            <div> </div>
        )
    }

    function dostavka(){
        // const [value, onChange] = useState('10:00');
        
        return (
            <div>
                <TimePicker
                    onChange={onChange}
                    value={value}
                />
            </div>
        )
    }
    console.log(generalPrice && generalPrice[0].generalPrice);

    useEffect(()=>{
        const date = new Date();
        const newDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
        setCommonDat({...commonDat, date: newDate, Price: generalPrice && generalPrice[0].generalPrice})
    },[])

    const confirmOrderHandle = () => {
        navigate('/myOrders')
        commonData({...commonDat, address: street})
    }
    
    const onHandleSelect = (e) => {
        e.preventDefault()
        setStreet(e.target.value)
    }
    return (
        <div className="checkout">
            <div className="container">
                <div className="checkout_wrapper">
                    <div className="checkout_left_card">
                        <h4 className="left_card_title">Оформление заказа</h4>
                        <div className="checkout_left_card_inner">
                            <p>Имя</p>
                            <input className="input_style" value={saveUser.length !== 0 && saveUser[0].name} type="text"/>
                            <p>Телефон номер</p>
                            <div className="input_style" >
                                <FormattedInputs />
                            </div>
                            <p>Тип оплаты</p>
                            <div className="payment_type">
                                <div className={`payment_type_item input_style ${activeCard === 2 ? 'active_card': ''}`} onClick={()=> handlePaymentType(2)}>
                                    <img src="https://maxway.uz/images/Icons/Payment/cash.png" alt=""/>
                                    <p>Наличные</p>
                                </div>
                                <div className={`payment_type_item input_style ${activeCard === 3 ? 'active_card': ''}`} onClick={()=> handlePaymentType(3)}>
                                    <img src="https://maxway.uz/images/Icons/Payment/click.png" alt=""/>
                                    <p>Click</p>
                                </div>
                                <div className={`payment_type_item input_style ${activeCard === 4 ? 'active_card': ''}`} onClick={()=> handlePaymentType(4)}>
                                    <img src="https://maxway.uz/images/Icons/Payment/payme.png" alt=""/>
                                    <p>Payme</p>
                                </div>
                            </div>
                            <p>Метод доставки</p>
                            <div className="payment_type">
                                <div className={`payment_type_item ${activeTab === 0 ? 'active_card' : ''}`} onClick={()=>handlePaymentType(0)}>
                                    <img src="https://maxway.uz/images/Icons/Delivery/delivery.svg" alt=""/>
                                    <p>Доставка</p>
                                </div>
                                <div className={`payment_type_item ${activeTab === 1 ? 'active_card' : ''}`} onClick={()=>handlePaymentType(1)}>
                                    <img src="https://maxway.uz/images/Icons/Delivery/box.svg" alt=""/>
                                    <p>Самовывоз</p>
                                </div>
                
                            </div>
                            
                            
                            <div style={{display: activeTab === 0 ? 'block' : 'none'}}>
                                <p>Время доставки</p>
                                <BasicTabs title1="Срочная доставка" title2="Доставка по расписанию" tabPanelContent1={noDostavka} tabPanelContent2={()=>dostavka()} />
                                <div className="speed_payment">
                                    <label htmlFor="1">Хотели бы что бы вам позвонил курьер?</label>
                                    <div className="speed_payment_radio_btn d_flex">
                                    <FormControl component="fieldset">
                                    <RadioGroup
                                        aria-label="gender"
                                        defaultValue="female"
                                        name="radio-buttons-group"
                                        color="secondary"
                                    >
                                        <div>
                                            <FormControlLabel  value="female" control={<Radio color="secondary" />} label="Да" />
                                            <FormControlLabel value="male" control={<Radio color="secondary" />} label="Нет" />
                                        </div>
                                    </RadioGroup>
                                    </FormControl>
                                    </div>

                                    <div className="speed_payment_adress d_flex_between">
                                        <div className="your_adress">
                                            <p>Адрес</p>
                                            <input className="input_style" type="text"/>
                                        </div>
                                        <div className="my_adress">
                                            <p>Мои адреса</p>
                                            <select className="input_style" name="" id="">
                                                <option value="">net</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="speed_payment_adress d_flex_between">
                                        <div className="my_kv">
                                            <p>Квартира</p>
                                            <input min='1' placeholder="0" className="input_style" type="number"/>
                                        </div>
                                        <div className="my_podezd">
                                            <p>Подезд</p>
                                            <input min='1' placeholder="0" className="input_style" type="number"/>
                                        </div>
                                        <div className="my_etaj">
                                            <p>Этаж</p>
                                            <input min='1' placeholder="0" className="input_style" type="number"/>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div style={{display: activeTab === 1 ? 'block' : 'none', marginTop: '20px'}}>
                                <p>Ближайший филиал</p>
                                <div className="nearest_adress">
                                    <div className="nearest_adress_top d_flex_between">
                                        <p>Ближайший филиал</p>
                                        <div>
                                            <select className="input_style" name="" id="" onChange={onHandleSelect}>
                                                {
                                                    adressOption.map(address => 
                                                        
                                                        <option key={address.id} className="input_style" value={address.street}>{address.address}</option>
                                                        
                                                        )
                                                }

                                            </select>
                                        </div>
                                    </div>
                                    <div className="nearest_adress_medium d_flex_between">
                                        <p>Адрес</p>
                                        <p>{street}</p>
                                    </div>
                                    <div className="nearest_address_bottom d_flex_between">
                                        <p>Телефон :</p>
                                        <p>+998 71 200 54 00</p>
                                    </div>
                                </div>
                            </div>
                                
                                {/* <div className="map">
                                    <Maps />
                                </div>
                                 */}
                                
                                <p>Комментария</p>
                                <textarea placeholder="Комментария" className="input_style" type="textarea"/>

                            
                            <div className="confirm_btn" onClick={() => confirmOrderHandle()}>
                                <Button display="d_flex_justify_center" paddingStyle="14px 30px" titleName={' Подтвердить заказ'} bgColor="#51267D" textColor="#fff" />
                            </div>
                        </div>
                    </div>
                    <div className="checkout_right_card" style={{height: `${changeFoods.length * 40 + 230}px`}}>
                        <div className="checkout_right_card_top">
                            <h4>Ваш заказ</h4>
                        </div>
                        <div className="checkout_right_card_medium">
                                {
                                    changeFoods.length !== 0 && changeFoods.map(food => 
                                        
                                            <div className="checkout_right_card_medium_top d_flex_between">
                                                <div className="checkout_right_card_medium_top_left d_flex_between">
                                                    <h6>{food.count} x &nbsp;</h6>
                                                    
                                                    <h6>{food.title}</h6>
                                                </div>
                                                <div className="checkout_right_card_medium_top_right">
                                                    <h4>{food.ceil}</h4>
                                                </div>
                                            </div>
                                        
                                        )
                                }
                            <div className="checkout_right_card_medium_bottom d_flex_between" style={{display: activeTab == 0 ? 'flex' : 'none'}}>
                                <h4>Доставка</h4>
                                <h4>9 000 сум</h4>
                            </div>
                        </div>
                        <div className="checkout_right_card_bottom d_flex_between">
                            <h2>Всего</h2>
                            <h2>{`${generalPrice.length !==0 && (!activeTab ? generalPrice[0].generalPrice+9 : generalPrice[0].generalPrice)} 000 сум`}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout
