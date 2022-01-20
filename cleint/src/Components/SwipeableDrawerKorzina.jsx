import React,{useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import {FaShoppingCart} from 'react-icons/fa';
import {GrClose} from 'react-icons/gr';
import {MdDelete} from 'react-icons/md'
import {handleDeleteFood, onClickIncreasePopUpCart, onClickDecreasePopUpCart} from '../Pages/HomePage/Logics.jsx'
import {collection, onSnapshot} from 'firebase/firestore';
import {db} from '../Firebase/config.jsx'
import Button from '../Components/Button.jsx'
import {useNavigate} from 'react-router-dom'


export default function SwipeableDrawerKorzina({productItem, opena, authed, setOpena, setAuthed}) {
const navigate = useNavigate()
  const zakazat = () =>{
    authed ? navigate('/checkout') : setOpena(true)
  }


  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const [comboNumm, setComboNumm] = useState('');
  const [generalPrice, setGeneralPrice] = useState('')

  useEffect(()=>{
    const load = async () =>{
      onSnapshot(collection(db, "foodValue"), snapshot => 
          setComboNumm(snapshot.docs.map((doc) => ({...doc.data(), defaultId: doc.id})))
      )
  
      onSnapshot(collection(db, "generalPrice"), snapshot => 
          setGeneralPrice(snapshot.docs.map((doc) => ({...doc.data(), defaultId: doc.id})))
      )
    }
    load()
},[])

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 300 }}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >

      <Divider />
      <List>
          {['All mail'].map((text, index) => 
            <ListItem key={text}  >
                <div className="d_flex_between popUp_swipe_able_cart" >
                    <h1 className="popUp_swipe_able_cart_title">Корзина</h1>
                    <div onClick={toggleDrawer(anchor, false)}>
                    <GrClose />
                    </div>
                </div>
            </ListItem>
          )}
      </List>
      <List>
        {['All mail'].map((text, index) => (
            <ListItem key={text}>
                <div className="popUp_swipe_able">
                    <div className={`popUp_swipe_able_inner ${productItem.length === 0 && 'active_popUp_swipe_able_inner'}`}>
                        <div className="popUp_swipe_able_inner_box">
                            {
                                productItem.length === 0 ? <div>
                                    <img src="https://maxway.uz/images/Icons/empty_cart.png" alt=""/>
                                </div>  : productItem.map(item => 
                                    
                                    <div key={item.id} className="popUp_swipe_able_inner_box_item d_flex_between">
                                        <div className="popUp_swipe_able_inner_box_item_img">
                                            <img src={item.img} alt=""/>
                                        </div>
                                        <div className="popUp_swipe_able_inner_box_item_content">
                                            <div className="popUp_swipe_able_inner_box_item_content_top d_flex_between">
                                                <h4 style={{width: '170px'}}>{item.title}</h4>
                                                <div style={{width: '20px'}} onClick={()=>handleDeleteFood(comboNumm[item.id - 1], item)}><MdDelete className="delete_icon" /></div>
                                            </div>
                                            <div className="popUp_swipe_able_inner_box_item_content_bottom d_flex_between">
                                                <div className="popUp_swipe_able_inner_box_item_content_bottom_btn d_flex_between">
                                                    <div style={{width: '70px'}} onClick={()=>onClickDecreasePopUpCart(comboNumm[item.id - 1],item)}>
                                                        <Button borderRadius="4px" paddingStyle="5px 5px" titleName='-' bgColor="rgba(81,38,125,.08)" textColor="#51267d" />
                                                    </div>
                                                    <span className="d_flex_justify_center ">{item.count === 0 ? (item)=> handleDeleteFood(item) : item.count}</span>
                                                    <div style={{width: '70px'}} onClick={()=>onClickIncreasePopUpCart(comboNumm[item.id - 1], item)}>
                                                        <Button borderRadius="4px" paddingStyle="5px 5px" titleName='+' bgColor="rgba(81,38,125,.08)" textColor="#51267d" />
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
                            <div className="d_flex_justify_center popUp_swipe_able_footer" style={{width: '100%'}}>
                                <div className="zakazat_bt popUp_swipe_able_footer_btn" onClick={()=>zakazat()}>
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
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
      <div>
      {['right'].map((anchor) => (
          <React.Fragment key={anchor}>
          <div className="swipe_able_icon" onClick={toggleDrawer(anchor, true)}>{<FaShoppingCart size="23px" color="#fff" />}
            <span>{productItem.length}</span>
          </div>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
            elevation={16}
            transitionDuration={{enter: 1000, exit: 1000}}
            >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}

