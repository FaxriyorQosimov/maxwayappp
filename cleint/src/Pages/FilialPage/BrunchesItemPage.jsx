import React,{useState, useEffect} from 'react';
import Maps from './Maps.jsx'
import {MdLocationOn, MdAccessTime, MdLocalPhone, MdNavigation} from 'react-icons/md';
import '../../styles/brunchesPage.css'
function BrunchesItemPage() {
    const [brunchItem, setBrunchItem] = useState('');

    useEffect(()=>{
        const load = async () => {
            let brunchString = await localStorage.getItem('brunchItem')
            let brunchArray = await JSON.parse(brunchString);
            setBrunchItem(brunchArray)
        }
        load()
    },[]);

    return (
        <div  className="brunch_item">
            {
                brunchItem && <div className="container">
                <div className="brunch_item_wrapper">
                    <div className="brunch_item_card d_flex_between">
                        <div className="brunch_item_card_left_content">
                            <h1>{brunchItem.brunchName}</h1>
                            <div className="d_flex">
                                <MdLocationOn style={{marginRight: '16px'}} />
                                <h3>{brunchItem.brunchLocation}</h3>
                            </div>
                            <div className="d_flex">
                                <MdAccessTime style={{marginRight: '16px'}} />  
                                <h3>Часы работы: 08:00-03:00</h3>
                            </div>
                            <div className="d_flex">
                                <MdLocalPhone style={{marginRight: '16px'}} />
                                <h3>Номер телефона: +998 97 166 99 96</h3>
                            </div>
                            <div className="d_flex">
                                <MdNavigation style={{marginRight: '16px'}} />
                                <h3>Ориентир: Ориентир: {brunchItem.brunchName}</h3>
                            </div>
                            <div className="brunch_item_card_left_content_img">
                                <img src="../../../Images/max-way-brunch-item.png" alt=""/>
                            </div>
                        </div>
                        <div className="brunch_item_card_right_content">
                            <Maps brunchItem={brunchItem} style={{width: '100%'}} />
                        </div>
                    </div>
                </div>
            </div>
            }
            
        </div>
    )
}

export default BrunchesItemPage
