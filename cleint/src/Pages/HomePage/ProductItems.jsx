import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Button from '../../Components/Button';
import {changeProductModalVizible, onIncreaseFood, onDecreaseFood} from '../../Redusers/ReduserFoods.jsx'
import {collection, onSnapshot} from 'firebase/firestore';
import {db} from '../../Firebase/config.jsx'
import {onClickCard, onClickvibrat, onClickIncreaseProductItem, onClickDecreaseProductItem} from './Logics.jsx'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import SimpleBackdrop from '../../Components/Spinner';

function ProductItems({foods, setFoodFlyingVizible, onDecreaseFood, onIncreaseFood, productVizible, comboNumber, changeProductModalVizible}) {
    const [comboNumm, setComboNumm] = useState('');
    const [clickCardCeil1, setClickCardCeil1] = useState('')

    useEffect(()=>{
        const load = async () => {
            onSnapshot(collection(db, 'foodValue'), (snapshot) => 
                setComboNumm(snapshot.docs.map((doc) => ({...doc.data(), defaultId: doc.id})))
            )
    
            onSnapshot(collection(db, 'clickCard'), (snapshot) => 
            setClickCardCeil1(snapshot.docs.map((doc) => ({...doc.data(), defaultId: doc.id})))
            )
        }
        load()
    },[])

    return (
        <div>
            {
            foods.length === 0 ? <SimpleBackdrop opena={true} /> : <div className="products_food">
{/* ********************************************** KOMBO FOODS*************************************************** */}
                    <div id="combo" className="products_food_combo products_food_info">
                        <h2>🥪🍟🥤Комбо</h2>
                        <div className="products_food_wrapper" data-text="">
                            {
                               foods[0] === undefined ? 'MALUMOTLAR KELGUNCHA KUTIB TUR, BARAKA TOPGUR' : foods[0].kombo.map((item,index) => 
                                    <div className="products_food_card" key={index} >
                                        <div className="products_food_card_content_top" onClick={()=>onClickCard(item, comboNumm[item.id - 1], clickCardCeil1[0].ceil1, changeProductModalVizible)}>
                                            <div className="products_food_card_img_inner">
                                                <LazyLoadImage 
                                                src={item.img}
                                                effect="blur"
                                                // delayTime="300"
                                                height="100%"
                                                width="100%"
                                                alt=""/>
                                                {/* <div className={`select_food_flying ${foodFlyingVizible && 'select_food_flying_active'}`}>
                                                    <img src={item.img} alt=""/>
                                                </div> */}
                                            </div>
                                            <h4>{item.title}</h4>
                                            <p>{item.body}</p>
                                        </div>
                                        <div className="products_food_card_content">
                                            <div className="products_food_card_content_info">
                                                <h4>{item.ceil}</h4>
                                                {/* {console.log(comboNumm[item.id-1].num)}
                                                {console.log(comboNumm[item.id-1].orderVizible)} */}
                                                <div style={{display: `${((comboNumm.length !== 0 && comboNumm[item.id-1].num <= 0) && comboNumm[item.id-1].orderVizible) ? 'block' : 'none'}`}} 
                                                     className="products_food_card_content_info_btn" 
                                                     onClick={()=>onClickvibrat(item, comboNumm[item.id -1], changeProductModalVizible)}>
                                                    <Button titleName={'Выбрать'} bgColor="rgba(81,38,125,.08)" textColor="#51267d" />
                                                </div>
                                                <div className="products_food_card_content_info_btns d_flex_between" style={{display: `${((comboNumm.length !== 0 && comboNumm[item.id-1].num <= 0) && (comboNumm[item.id-1].orderVizible)) ? 'none' : 'flex'}`}}>
                                                    <div onClick={()=>onClickDecreaseProductItem(comboNumm[item.id - 1], item)}>
                                                        <Button fWeight="500" fSize="26px"  borderRadius="4px" paddingStyle="10px 17px" titleName='-' bgColor="rgba(81,38,125,.08)" textColor="#51267d" />
                                                    </div>
                                                    <span className="d_flex_justify_center">{comboNumm && comboNumm[item.id -1].num}</span>
                                                    <div onClick={()=>onClickIncreaseProductItem(comboNumm[item.id -1], item)}>
                                                        <Button fWeight="500" fSize="26px" borderRadius="4px" paddingStyle="10px 15px" titleName='+' bgColor="rgba(81,38,125,.08)" textColor="#51267d" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
{/* ********************************************** KLAB SENDVICH FOODS*************************************************** */}
                    <div id="clab" className="products_food_combo products_food_info">
                        <h2>🥪 Клаб сэндвич</h2>
                        <div className="products_food_wrapper" data-text="">
                            {
                               foods[0] === undefined ? 'MALUMOTLAR KELGUNCHA KUTIB TUR, BARAKA TOPGUR' : foods[0].klab.map((item,index) => 
                                    <div className="products_food_card" key={index} >
                                        <div className="products_food_card_content_top" onClick={()=>onClickCard(item, comboNumm[item.id+2], clickCardCeil1[0].ceil1, changeProductModalVizible)}>
                                            <div className="products_food_card_img_inner">
                                            <LazyLoadImage 
                                                src={item.img}
                                                effect="blur"
                                                // delayTime="300"
                                                height="100%"
                                                width="100%"
                                                alt=""/>
                                                {/* <div className={`select_food_flying ${foodFlyingVizible && 'select_food_flying_active'}`}>
                                                    <img src={item.img} alt=""/>
                                                </div> */}
                                            </div>
                                            <h4>{item.title}</h4>
                                            <p>{item.body}</p>
                                        </div>
                                        <div className="products_food_card_content">
                                            <div className="products_food_card_content_info">
                                                <h4>{item.ceil}</h4>
                                                <div style={{display: `${(comboNumm.length !== 0 && comboNumm[item.id+2].num <= 0) && comboNumm[item.id+2].orderVizible ? 'block' : 'none'}`}} 
                                                     className="products_food_card_content_info_btn" 
                                                     onClick={()=>onClickvibrat(item, comboNumm[item.id+2], changeProductModalVizible)}>
                                                    <Button titleName={'Выбрать'} bgColor="rgba(81,38,125,.08)" textColor="#51267d" />
                                                </div>
                                                <div className="products_food_card_content_info_btns d_flex_between" style={{display: `${comboNumm.length !== 0 && comboNumm[item.id+2].num <= 0 && comboNumm[item.id+2].orderVizible? 'none' : 'flex'}`}}>
                                                    <div onClick={()=>onClickDecreaseProductItem(comboNumm[item.id+2], item)}>
                                                        <Button fWeight="500" fSize="26px"  borderRadius="4px" paddingStyle="10px 17px" titleName='-' bgColor="rgba(81,38,125,.08)" textColor="#51267d" />
                                                    </div>
                                                    <span className="d_flex_justify_center">{comboNumm && comboNumm[item.id+2].num}</span>
                                                    <div onClick={()=>onClickIncreaseProductItem(comboNumm[item.id+2], item)}>
                                                        <Button fWeight="500" fSize="26px" borderRadius="4px" paddingStyle="10px 15px" titleName='+' bgColor="rgba(81,38,125,.08)" textColor="#51267d" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
{/* ********************************************** LAVASH FOODS*************************************************** */}
                        <div id="lavash" className="products_food_combo products_food_info">
                        <h2>🌯 Лаваш</h2>
                        <div className="products_food_wrapper" data-text="">
                            {
                               foods[0] === undefined ? 'MALUMOTLAR KELGUNCHA KUTIB TUR, BARAKA TOPGUR' : foods[0].lavash.map((item,index) => 
                                    <div className="products_food_card" key={index} >
                                        <div className="products_food_card_content_top" onClick={()=>onClickCard(item, comboNumm[item.id+8], clickCardCeil1[0].ceil1, changeProductModalVizible)}>
                                            <div className="products_food_card_img_inner">
                                            <LazyLoadImage 
                                                src={item.img}
                                                effect="blur"
                                                // delayTime="300"
                                                height="100%"
                                                width="100%"
                                                alt=""/>
                                                {/* <div className={`select_food_flying ${foodFlyingVizible && 'select_food_flying_active'}`}>
                                                    <img src={item.img} alt=""/>
                                                </div> */}
                                            </div>
                                            <h4>{item.title}</h4>
                                            <p>{item.body}</p>
                                        </div>
                                        <div className="products_food_card_content">
                                            <div className="products_food_card_content_info">
                                                <h4>{item.ceil}</h4>
                                                <div style={{display: `${(comboNumm.length !== 0 && comboNumm[item.id+8].num <= 0) && comboNumm[item.id+8].orderVizible ? 'block' : 'none'}`}} 
                                                     className="products_food_card_content_info_btn" 
                                                     onClick={()=>onClickvibrat(item, comboNumm[item.id+8], changeProductModalVizible)}>
                                                    <Button width={'100%'} titleName={'Выбрать'} bgColor="rgba(81,38,125,.08)" textColor="#51267d" />
                                                </div>
                                                <div className="products_food_card_content_info_btns d_flex_between" style={{display: `${(comboNumm.length !== 0 && comboNumm[item.id+8].num <= 0) && comboNumm[item.id+8].orderVizible? 'none' : 'flex'}`}}>
                                                    <div onClick={()=>onClickDecreaseProductItem(comboNumm[item.id+8], item)}>
                                                        <Button fWeight="500" fSize="26px"  borderRadius="4px" paddingStyle="10px 17px" titleName='-' bgColor="rgba(81,38,125,.08)" textColor="#51267d" />
                                                    </div>
                                                    <span className="d_flex_justify_center">{comboNumm && comboNumm[item.id+8].num}</span>
                                                    <div onClick={()=>onClickIncreaseProductItem(comboNumm[item.id+8], item)}>
                                                        <Button fWeight="500" fSize="26px" borderRadius="4px" paddingStyle="10px 15px" titleName='+' bgColor="rgba(81,38,125,.08)" textColor="#51267d" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
{/* ********************************************** SHAURMA FOODS*************************************************** */}
                        <div id="shaurma" className="products_food_combo products_food_info">
                        <h2>🥙 Шаурма</h2>
                        <div className="products_food_wrapper" data-text="">
                            {
                               foods[0] === undefined ? 'MALUMOTLAR KELGUNCHA KUTIB TUR, BARAKA TOPGUR' : foods[0].shaurma.map((item,index) => 
                                    <div className="products_food_card" key={index} >
                                        <div className="products_food_card_content_top" onClick={()=>onClickCard(item, comboNumm[item.id+16], clickCardCeil1[0].ceil1, changeProductModalVizible)}>
                                            <div className="products_food_card_img_inner">
                                            <LazyLoadImage 
                                                src={item.img}
                                                effect="blur"
                                                // delayTime="300"
                                                height="100%"
                                                width="100%"
                                                alt=""/>
                                                {/* <div className={`select_food_flying ${foodFlyingVizible && 'select_food_flying_active'}`}>
                                                    <img src={item.img} alt=""/>
                                                </div> */}
                                            </div>
                                            <h4>{item.title}</h4>
                                            <p>{item.body}</p>
                                        </div>
                                        <div className="products_food_card_content">
                                            <div className="products_food_card_content_info">
                                                <h4>{item.ceil}</h4>
                                                <div style={{display: `${(comboNumm.length !== 0 && comboNumm[item.id+16].num <= 0) && comboNumm[item.id+16].orderVizible ? 'block' : 'none'}`}} 
                                                     className="products_food_card_content_info_btn" 
                                                     onClick={()=>onClickvibrat(item, comboNumm[item.id+16], changeProductModalVizible)}>
                                                    <Button titleName={'Выбрать'} bgColor="rgba(81,38,125,.08)" textColor="#51267d" />
                                                </div>
                                                <div className="products_food_card_content_info_btns d_flex_between" style={{display: `${(comboNumm.length !== 0 && comboNumm[item.id+16].num <= 0) && comboNumm[item.id+16].orderVizible? 'none' : 'flex'}`}}>
                                                    <div onClick={()=>onClickDecreaseProductItem(comboNumm[item.id+16], item)}>
                                                        <Button fWeight="500" fSize="26px"  borderRadius="4px" paddingStyle="10px 17px" titleName='-' bgColor="rgba(81,38,125,.08)" textColor="#51267d" />
                                                    </div>
                                                    <span className="d_flex_justify_center">{comboNumm && comboNumm[item.id+16].num}</span>
                                                    <div onClick={()=>onClickIncreaseProductItem(comboNumm[item.id+16], item)}>
                                                        <Button fWeight="500" fSize="26px" borderRadius="4px" paddingStyle="10px 15px" titleName='+' bgColor="rgba(81,38,125,.08)" textColor="#51267d" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
{/* ********************************************** SHAURMA FOODS*************************************************** */}
                        <div id="donar" className="products_food_combo products_food_info">
                        <h2>🍱 Донар блюдо</h2>
                        <div className="products_food_wrapper" data-text="">
                            {
                               foods[0] === undefined ? 'MALUMOTLAR KELGUNCHA KUTIB TUR, BARAKA TOPGUR' : foods[0].donar.map((item,index) => 
                                    <div className="products_food_card" key={index} >
                                        <div className="products_food_card_content_top" onClick={()=>onClickCard(item, comboNumm[item.id+22], clickCardCeil1[0].ceil1, changeProductModalVizible)}>
                                            <div className="products_food_card_img_inner">
                                            <LazyLoadImage 
                                                src={item.img}
                                                effect="blur"
                                                // delayTime="300"
                                                height="100%"
                                                width="100%"
                                                alt=""/>
                                                {/* <div className={`select_food_flying ${foodFlyingVizible && 'select_food_flying_active'}`}>
                                                    <img src={item.img} alt=""/>
                                                </div> */}
                                            </div>
                                            <h4>{item.title}</h4>
                                            <p>{item.body}</p>
                                        </div>
                                        <div className="products_food_card_content">
                                            <div className="products_food_card_content_info">
                                                <h4>{item.ceil}</h4>
                                                <div style={{display: `${(comboNumm.length !== 0 && comboNumm[item.id+22].num <= 0) && comboNumm[item.id+22].orderVizible ? 'block' : 'none'}`}} 
                                                     className="products_food_card_content_info_btn" 
                                                     onClick={()=>onClickvibrat(item, comboNumm[item.id+22], changeProductModalVizible)}>
                                                    <Button titleName={'Выбрать'} bgColor="rgba(81,38,125,.08)" textColor="#51267d" />
                                                </div>
                                                <div className="products_food_card_content_info_btns d_flex_between" style={{display: `${(comboNumm.length !== 0 && comboNumm[item.id+22].num <= 0) && comboNumm[item.id+22].orderVizible? 'none' : 'flex'}`}}>
                                                    <div onClick={()=>onClickDecreaseProductItem(comboNumm[item.id+22], item)}>
                                                        <Button fWeight="500" fSize="26px"  borderRadius="4px" paddingStyle="10px 17px" titleName='-' bgColor="rgba(81,38,125,.08)" textColor="#51267d" />
                                                    </div>
                                                    <span className="d_flex_justify_center">{comboNumm && comboNumm[item.id+22].num}</span>
                                                    <div onClick={()=>onClickIncreaseProductItem(comboNumm[item.id+22], item)}>
                                                        <Button fWeight="500" fSize="26px" borderRadius="4px" paddingStyle="10px 15px" titleName='+' bgColor="rgba(81,38,125,.08)" textColor="#51267d" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
{/* ********************************************** SHAURMA FOODS*************************************************** */}
                        <div id="xotdog" className="products_food_combo products_food_info">
                        <h2>🌭 Хот-дог</h2>
                        <div className="products_food_wrapper" data-text="">
                            {
                               foods[0] === undefined ? 'MALUMOTLAR KELGUNCHA KUTIB TUR, BARAKA TOPGUR' : foods[0].xotdog.map((item,index) => 
                                    <div className="products_food_card" key={index} >
                                        <div className="products_food_card_content_top" onClick={()=>onClickCard(item, comboNumm[item.id+25], clickCardCeil1[0].ceil1, changeProductModalVizible)}>
                                            <div className="products_food_card_img_inner">
                                            <LazyLoadImage 
                                                src={item.img}
                                                effect="blur"
                                                // delayTime="300"
                                                height="100%"
                                                width="100%"
                                                alt=""/>
                                                {/* <div className={`select_food_flying ${foodFlyingVizible && 'select_food_flying_active'}`}>
                                                    <img src={item.img} alt=""/>
                                                </div> */}
                                            </div>
                                            <h4>{item.title}</h4>
                                            <p>{item.body}</p>
                                        </div>
                                        <div className="products_food_card_content">
                                            <div className="products_food_card_content_info">
                                                <h4>{item.ceil}</h4>
                                                <div style={{display: `${(comboNumm.length !== 0 && comboNumm[item.id+25].num <= 0) && comboNumm[item.id+25].orderVizible ? 'block' : 'none'}`}} 
                                                     className="products_food_card_content_info_btn" 
                                                     onClick={()=>onClickvibrat(item, comboNumm[item.id+25], changeProductModalVizible)}>
                                                    <Button titleName={'Выбрать'} bgColor="rgba(81,38,125,.08)" textColor="#51267d" />
                                                </div>
                                                <div className="products_food_card_content_info_btns d_flex_between" style={{display: `${(comboNumm.length !== 0 && comboNumm[item.id+25].num <= 0) && comboNumm[item.id+25].orderVizible? 'none' : 'flex'}`}}>
                                                    <div onClick={()=>onClickDecreaseProductItem(comboNumm[item.id+25], item)}>
                                                        <Button fWeight="500" fSize="26px"  borderRadius="4px" paddingStyle="10px 17px" titleName='-' bgColor="rgba(81,38,125,.08)" textColor="#51267d" />
                                                    </div>
                                                    <span className="d_flex_justify_center">{comboNumm && comboNumm[item.id+25].num}</span>
                                                    <div onClick={()=>onClickIncreaseProductItem(comboNumm[item.id+25], item)}>
                                                        <Button fWeight="500" fSize="26px" borderRadius="4px" paddingStyle="10px 15px" titleName='+' bgColor="rgba(81,38,125,.08)" textColor="#51267d" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
{/* ********************************************** SHAURMA FOODS*************************************************** */}
                        <div id="xaggi" className="products_food_combo products_food_info">
                        <h2>🌮 Хагги</h2>
                        <div className="products_food_wrapper" data-text="">
                            {
                               foods[0] === undefined ? 'MALUMOTLAR KELGUNCHA KUTIB TUR, BARAKA TOPGUR' : foods[0].xaggi.map((item,index) => 
                                    <div className="products_food_card" key={index} >
                                        <div className="products_food_card_content_top" onClick={()=>onClickCard(item, comboNumm[item.id+27], clickCardCeil1[0].ceil1, changeProductModalVizible)}>
                                            <div className="products_food_card_img_inner">
                                            <LazyLoadImage 
                                                src={item.img}
                                                effect="blur"
                                                // delayTime="300"
                                                height="100%"
                                                width="100%"
                                                alt=""/>
                                                {/* <div className={`select_food_flying ${foodFlyingVizible && 'select_food_flying_active'}`}>
                                                    <img src={item.img} alt=""/>
                                                </div> */}
                                            </div>
                                            <h4>{item.title}</h4>
                                            <p>{item.body}</p>
                                        </div>
                                        <div className="products_food_card_content">
                                            <div className="products_food_card_content_info">
                                                <h4>{item.ceil}</h4>
                                                <div style={{display: `${(comboNumm.length !== 0 && comboNumm[item.id+27].num <= 0) && comboNumm[item.id+27].orderVizible ? 'block' : 'none'}`}} 
                                                     className="products_food_card_content_info_btn" 
                                                     onClick={()=>onClickvibrat(item, comboNumm[item.id+27], changeProductModalVizible)}>
                                                    <Button titleName={'Выбрать'} bgColor="rgba(81,38,125,.08)" textColor="#51267d" />
                                                </div>
                                                <div className="products_food_card_content_info_btns d_flex_between" style={{display: `${(comboNumm.length !== 0 && comboNumm[item.id+27].num <= 0) && comboNumm[item.id+27].orderVizible? 'none' : 'flex'}`}}>
                                                    <div onClick={()=>onClickDecreaseProductItem(comboNumm[item.id+27], item)}>
                                                        <Button fWeight="500" fSize="26px"  borderRadius="4px" paddingStyle="10px 17px" titleName='-' bgColor="rgba(81,38,125,.08)" textColor="#51267d" />
                                                    </div>
                                                    <span className="d_flex_justify_center">{comboNumm && comboNumm[item.id+27].num}</span>
                                                    <div onClick={()=>onClickIncreaseProductItem(comboNumm[item.id+27], item)}>
                                                        <Button fWeight="500" fSize="26px" borderRadius="4px" paddingStyle="10px 15px" titleName='+' bgColor="rgba(81,38,125,.08)" textColor="#51267d" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
{/* ********************************************** SHAURMA FOODS*************************************************** */}
                        <div id="burger" className="products_food_combo products_food_info">
                        <h2>🍔 Бургеры</h2>
                        <div className="products_food_wrapper" data-text="">
                            {
                               foods[0] === undefined ? 'MALUMOTLAR KELGUNCHA KUTIB TUR, BARAKA TOPGUR' : foods[0].burger.map((item,index) => 
                                    <div className="products_food_card" key={index} >
                                        <div className="products_food_card_content_top" onClick={()=>onClickCard(item, comboNumm[item.id+29], clickCardCeil1[0].ceil1, changeProductModalVizible)}>
                                            <div className="products_food_card_img_inner">
                                            <LazyLoadImage 
                                                src={item.img}
                                                effect="blur"
                                                // delayTime="300"
                                                height="100%"
                                                width="100%"
                                                alt=""/>
                                                {/* <div className={`select_food_flying ${foodFlyingVizible && 'select_food_flying_active'}`}>
                                                    <img src={item.img} alt=""/>
                                                </div> */}
                                            </div>
                                            <h4>{item.title}</h4>
                                            <p>{item.body}</p>
                                        </div>
                                        <div className="products_food_card_content">
                                            <div className="products_food_card_content_info">
                                                <h4>{item.ceil}</h4>
                                                <div style={{display: `${(comboNumm.length !== 0 && comboNumm[item.id+29].num <= 0) && comboNumm[item.id+29].orderVizible ? 'block' : 'none'}`}} 
                                                     className="products_food_card_content_info_btn" 
                                                     onClick={()=>onClickvibrat(item, comboNumm[item.id+29], changeProductModalVizible)}>
                                                    <Button titleName={'Выбрать'} bgColor="rgba(81,38,125,.08)" textColor="#51267d" />
                                                </div>
                                                <div className="products_food_card_content_info_btns d_flex_between" style={{display: `${(comboNumm.length !== 0 && comboNumm[item.id+29].num <= 0) && comboNumm[item.id+29].orderVizible? 'none' : 'flex'}`}}>
                                                    <div onClick={()=>onClickDecreaseProductItem(comboNumm[item.id+29], item)}>
                                                        <Button fWeight="500" fSize="26px"  borderRadius="4px" paddingStyle="10px 17px" titleName='-' bgColor="rgba(81,38,125,.08)" textColor="#51267d" />
                                                    </div>
                                                    <span className="d_flex_justify_center">{comboNumm && comboNumm[item.id+29].num}</span>
                                                    <div onClick={()=>onClickIncreaseProductItem(comboNumm[item.id+29], item)}>
                                                        <Button fWeight="500" fSize="26px" borderRadius="4px" paddingStyle="10px 15px" titleName='+' bgColor="rgba(81,38,125,.08)" textColor="#51267d" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
{/* ********************************************** SHAURMA FOODS*************************************************** */}
                        <div id="garnir" className="products_food_combo products_food_info">
                        <h2>Гарниры</h2>
                        <div className="products_food_wrapper" data-text="">
                            {
                               foods[0] === undefined ? 'MALUMOTLAR KELGUNCHA KUTIB TUR, BARAKA TOPGUR' : foods[0].garnir.map((item,index) => 
                                    <div className="products_food_card" key={index} >
                                        <div className="products_food_card_content_top" onClick={()=>onClickCard(item, comboNumm[item.id+32], clickCardCeil1[0].ceil1, changeProductModalVizible)}>
                                            <div className="products_food_card_img_inner">
                                            <LazyLoadImage 
                                                src={item.img}
                                                effect="blur"
                                                // delayTime="300"
                                                height="100%"
                                                width="100%"
                                                alt=""/>
                                                {/* <div className={`select_food_flying ${foodFlyingVizible && 'select_food_flying_active'}`}>
                                                    <img src={item.img} alt=""/>
                                                </div> */}
                                            </div>
                                            <h4>{item.title}</h4>
                                            <p>{item.body}</p>
                                        </div>
                                        <div className="products_food_card_content">
                                            <div className="products_food_card_content_info">
                                                <h4>{item.ceil}</h4>
                                                <div style={{display: `${(comboNumm.length !== 0 && comboNumm[item.id+32].num <= 0) && comboNumm[item.id+32].orderVizible ? 'block' : 'none'}`}} 
                                                     className="products_food_card_content_info_btn" 
                                                     onClick={()=>onClickvibrat(item, comboNumm[item.id+32], changeProductModalVizible)}>
                                                    <Button titleName={'Выбрать'} bgColor="rgba(81,38,125,.08)" textColor="#51267d" />
                                                </div>
                                                <div className="products_food_card_content_info_btns d_flex_between" style={{display: `${(comboNumm.length !== 0 && comboNumm[item.id+32].num <= 0) && comboNumm[item.id+32].orderVizible? 'none' : 'flex'}`}}>
                                                    <div onClick={()=>onClickDecreaseProductItem(comboNumm[item.id+32], item)}>
                                                        <Button fWeight="500" fSize="26px"  borderRadius="4px" paddingStyle="10px 17px" titleName='-' bgColor="rgba(81,38,125,.08)" textColor="#51267d" />
                                                    </div>
                                                    <span className="d_flex_justify_center">{comboNumm && comboNumm[item.id+32].num}</span>
                                                    <div onClick={()=>onClickIncreaseProductItem(comboNumm[item.id+32], item)}>
                                                        <Button fWeight="500" fSize="26px" borderRadius="4px" paddingStyle="10px 15px" titleName='+' bgColor="rgba(81,38,125,.08)" textColor="#51267d" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
{/* ********************************************** SHAURMA FOODS*************************************************** */}
                        <div id="sneki" className="products_food_combo products_food_info">
                        <h2>🍟 Снеки</h2>
                        <div className="products_food_wrapper" data-text="">
                            {
                               foods[0] === undefined ? 'MALUMOTLAR KELGUNCHA KUTIB TUR, BARAKA TOPGUR' : foods[0].sneki.map((item,index) => 
                                    <div className="products_food_card" key={index} >
                                        <div className="products_food_card_content_top" onClick={()=>onClickCard(item, comboNumm[item.id+35], clickCardCeil1[0].ceil1, changeProductModalVizible)}>
                                            <div className="products_food_card_img_inner">
                                            <LazyLoadImage 
                                                src={item.img}
                                                effect="blur"
                                                // delayTime="300"
                                                height="100%"
                                                width="100%"
                                                alt=""/>
                                                {/* <div className={`select_food_flying ${foodFlyingVizible && 'select_food_flying_active'}`}>
                                                    <img src={item.img} alt=""/>
                                                </div> */}
                                            </div>
                                            <h4>{item.title}</h4>
                                            <p>{item.body}</p>
                                        </div>
                                        <div className="products_food_card_content">
                                            <div className="products_food_card_content_info">
                                                <h4>{item.ceil}</h4>
                                                <div style={{display: `${(comboNumm.length !== 0 && comboNumm[item.id+35].num <= 0) && comboNumm[item.id+35].orderVizible ? 'block' : 'none'}`}} 
                                                     className="products_food_card_content_info_btn" 
                                                     onClick={()=>onClickvibrat(item, comboNumm[item.id+35], changeProductModalVizible)}>
                                                    <Button titleName={'Выбрать'} bgColor="rgba(81,38,125,.08)" textColor="#51267d" />
                                                </div>
                                                <div className="products_food_card_content_info_btns d_flex_between" style={{display: `${(comboNumm.length !== 0 && comboNumm[item.id+35].num <= 0) && comboNumm[item.id+35].orderVizible? 'none' : 'flex'}`}}>
                                                    <div onClick={()=>onClickDecreaseProductItem(comboNumm[item.id+35], item)}>
                                                        <Button fWeight="500" fSize="26px"  borderRadius="4px" paddingStyle="10px 17px" titleName='-' bgColor="rgba(81,38,125,.08)" textColor="#51267d" />
                                                    </div>
                                                    <span className="d_flex_justify_center">{comboNumm && comboNumm[item.id+35].num}</span>
                                                    <div onClick={()=>onClickIncreaseProductItem(comboNumm[item.id+35], item)}>
                                                        <Button fWeight="500" fSize="26px" borderRadius="4px" paddingStyle="10px 15px" titleName='+' bgColor="rgba(81,38,125,.08)" textColor="#51267d" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
{/* ********************************************** SHAURMA FOODS*************************************************** */}
                        <div id="napitki" className="products_food_combo products_food_info">
                        <h2>🥤 Напитки</h2>
                        <div className="products_food_wrapper" data-text="">
                            {
                               foods[0] === undefined ? 'MALUMOTLAR KELGUNCHA KUTIB TUR, BARAKA TOPGUR' : foods[0].napitki.map((item,index) => 
                                    <div className="products_food_card" key={index} >
                                        <div className="products_food_card_content_top" onClick={()=>onClickCard(item, comboNumm[item.id+41], clickCardCeil1[0].ceil1, changeProductModalVizible)}>
                                            <div className="products_food_card_img_inner">
                                            <LazyLoadImage 
                                                src={item.img}
                                                effect="blur"
                                                // delayTime="300"
                                                height="100%"
                                                width="100%"
                                                alt=""/>
                                                {/* <div className={`select_food_flying ${foodFlyingVizible && 'select_food_flying_active'}`}>
                                                    <img src={item.img} alt=""/>
                                                </div> */}
                                            </div>
                                            <h4>{item.title}</h4>
                                            <p>{item.body}</p>
                                        </div>
                                        <div className="products_food_card_content">
                                            <div className="products_food_card_content_info">
                                                <h4>{item.ceil}</h4>
                                                <div style={{display: `${(comboNumm.length !== 0 && comboNumm[item.id+41].num <= 0) && comboNumm[item.id+41].orderVizible ? 'block' : 'none'}`}} 
                                                     className="products_food_card_content_info_btn" 
                                                     onClick={()=>onClickvibrat(item, comboNumm[item.id+41], changeProductModalVizible)}>
                                                    <Button titleName={'Выбрать'} bgColor="rgba(81,38,125,.08)" textColor="#51267d" />
                                                </div>
                                                <div className="products_food_card_content_info_btns d_flex_between" style={{display: `${(comboNumm.length !== 0 && comboNumm[item.id+41].num <= 0) && comboNumm[item.id+41].orderVizible? 'none' : 'flex'}`}}>
                                                    <div onClick={()=>onClickDecreaseProductItem(comboNumm[item.id+41], item)}>
                                                        <Button fWeight="500" fSize="26px"  borderRadius="4px" paddingStyle="10px 17px" titleName='-' bgColor="rgba(81,38,125,.08)" textColor="#51267d" />
                                                    </div>
                                                    <span className="d_flex_justify_center">{comboNumm && comboNumm[item.id+41].num}</span>
                                                    <div onClick={()=>onClickIncreaseProductItem(comboNumm[item.id+41], item)}>
                                                        <Button fWeight="500" fSize="26px" borderRadius="4px" paddingStyle="10px 15px" titleName='+' bgColor="rgba(81,38,125,.08)" textColor="#51267d" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
{/* ********************************************** SHAURMA FOODS*************************************************** */}
                        <div id="desert" className="products_food_combo products_food_info">
                        <h2>🍰 Десерты</h2>
                        <div className="products_food_wrapper" data-text="">
                            {
                               foods[0] === undefined ? 'MALUMOTLAR KELGUNCHA KUTIB TUR, BARAKA TOPGUR' : foods[0].desert.map((item,index) => 
                                    <div className="products_food_card" key={index} >
                                        <div className="products_food_card_content_top" onClick={()=>onClickCard(item, comboNumm[item.id+46], clickCardCeil1[0].ceil1, changeProductModalVizible)}>
                                            <div className="products_food_card_img_inner">
                                            <LazyLoadImage 
                                                src={item.img}
                                                effect="blur"
                                                // delayTime="300"
                                                height="100%"
                                                width="100%"
                                                alt=""/>
                                                {/* <div className={`select_food_flying ${foodFlyingVizible && 'select_food_flying_active'}`}>
                                                    <img src={item.img} alt=""/>
                                                </div> */}
                                            </div>
                                            <h4>{item.title}</h4>
                                            <p>{item.body}</p>
                                        </div>
                                        <div className="products_food_card_content">
                                            <div className="products_food_card_content_info">
                                                <h4>{item.ceil}</h4>
                                                <div style={{display: `${(comboNumm.length !== 0 && comboNumm[item.id+46].num <= 0) && comboNumm[item.id+46].orderVizible ? 'block' : 'none'}`}} 
                                                     className="products_food_card_content_info_btn" 
                                                     onClick={()=>onClickvibrat(item, comboNumm[item.id+46], changeProductModalVizible)}>
                                                    <Button titleName={'Выбрать'} bgColor="rgba(81,38,125,.08)" textColor="#51267d" />
                                                </div>
                                                <div className="products_food_card_content_info_btns d_flex_between" style={{display: `${(comboNumm.length !== 0 && comboNumm[item.id+46].num <= 0) && comboNumm[item.id+46].orderVizible? 'none' : 'flex'}`}}>
                                                    <div onClick={()=>onClickDecreaseProductItem(comboNumm[item.id+46], item)}>
                                                        <Button fWeight="500" fSize="26px"  borderRadius="4px" paddingStyle="10px 17px" titleName='-' bgColor="rgba(81,38,125,.08)" textColor="#51267d" />
                                                    </div>
                                                    <span className="d_flex_justify_center">{comboNumm && comboNumm[item.id+46].num}</span>
                                                    <div onClick={()=>onClickIncreaseProductItem(comboNumm[item.id+46], item)}>
                                                        <Button fWeight="500" fSize="26px" borderRadius="4px" paddingStyle="10px 15px" titleName='+' bgColor="rgba(81,38,125,.08)" textColor="#51267d" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
{/* ********************************************** SHAURMA FOODS*************************************************** */}
                        <div id="sous" className="products_food_combo products_food_info">
                        <h2>Соусы</h2>
                        <div className="products_food_wrapper" data-text="">
                            {
                               foods[0] === undefined ? 'MALUMOTLAR KELGUNCHA KUTIB TUR, BARAKA TOPGUR' : foods[0].sous.map((item,index) => 
                                    <div className="products_food_card" key={index} >
                                        <div className="products_food_card_content_top" onClick={()=>onClickCard(item, comboNumm[item.id+49], clickCardCeil1[0].ceil1, changeProductModalVizible)}>
                                            <div className="products_food_card_img_inner">
                                            <LazyLoadImage 
                                                src={item.img}
                                                effect="blur"
                                                // delayTime="300"
                                                height="100%"
                                                width="100%"
                                                alt=""/>
                                                {/* <div className={`select_food_flying ${foodFlyingVizible && 'select_food_flying_active'}`}>
                                                    <img src={item.img} alt=""/>
                                                </div> */}
                                            </div>
                                            <h4>{item.title}</h4>
                                            <p>{item.body}</p>
                                        </div>
                                        <div className="products_food_card_content">
                                            <div className="products_food_card_content_info">
                                                <h4>{item.ceil}</h4>
                                                <div style={{display: `${(comboNumm.length !== 0 && comboNumm[item.id+49].num <= 0) && comboNumm[item.id+49].orderVizible ? 'block' : 'none'}`}} 
                                                     className="products_food_card_content_info_btn" 
                                                     onClick={()=>onClickvibrat(item, comboNumm[item.id+49], changeProductModalVizible)}>
                                                    <Button titleName={'Выбрать'} bgColor="rgba(81,38,125,.08)" textColor="#51267d" />
                                                </div>
                                                <div className="products_food_card_content_info_btns d_flex_between" style={{display: `${(comboNumm.length !== 0 && comboNumm[item.id+49].num <= 0) && comboNumm[item.id+49].orderVizible? 'none' : 'flex'}`}}>
                                                    <div onClick={()=>onClickDecreaseProductItem(comboNumm[item.id+49], item)}>
                                                        <Button fWeight="500" fSize="26px"  borderRadius="4px" paddingStyle="10px 17px" titleName='-' bgColor="rgba(81,38,125,.08)" textColor="#51267d" />
                                                    </div>
                                                    <span className="d_flex_justify_center">{comboNumm && comboNumm[item.id+49].num}</span>
                                                    <div onClick={()=>onClickIncreaseProductItem(comboNumm[item.id+49], item)}>
                                                        <Button fWeight="500" fSize="26px" borderRadius="4px" paddingStyle="10px 15px" titleName='+' bgColor="rgba(81,38,125,.08)" textColor="#51267d" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

const a = (state) => {
    return {
        foods: state.food.foods,
        productVizible: state.food.productModalVizible,
        comboNumber: state.food.comboNumber
    }
}


export default connect(a, {changeProductModalVizible, onDecreaseFood, onIncreaseFood})(ProductItems)
