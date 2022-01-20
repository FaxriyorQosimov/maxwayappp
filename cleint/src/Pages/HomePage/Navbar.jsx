import React,{useState, useEffect} from 'react'
import {BsCart2} from 'react-icons/bs';
import {HiUserCircle} from 'react-icons/hi'
// import {AiOutlineBars} from 'react-icons/ai'
import {Link, useNavigate} from 'react-router-dom'
import Button from '../../Components/Button'
import '../../styles/navbar.css'
import PopUpCart from './PopUpCart';
import {collection, onSnapshot} from 'firebase/firestore';
import {db} from '../../Firebase/config.jsx'
import SwipeableTemporaryDrawer from '../../Components/SwipeableDrawer';
import LoginModal from '../../LoginSettings/LoginModal';
import { Box, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';

const settings = ['Мои данные', 'Мои адреса', 'Выйти'];
const routeNavbar = ['/my-profile', 'my-address', '/']


function Navbar({authed, setAuthed, opena, setOpen}) {

    const navigate = useNavigate()

    const [productItem, setProductItem] = useState([])
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [snackOpen, setSnackOpen] = useState(false)

    useEffect(()=>{
        const load = async () => {
            onSnapshot(collection(db, 'changeFoods'), async (snapshot) => 
            setProductItem(snapshot.docs.map( async (doc) => ({...doc.data(), defaultId: doc.id}))))
        }
        load()
        
    },[])
    
    useEffect(()=>{
        const storageAuth = localStorage.getItem('auth')
        setAuthed(JSON.parse(storageAuth));
    },[snackOpen])

    const onChangeRegisterBtn = () => {
        setOpen(true)
    }
    
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    
    const handleCloseNavMenu = (setting) => {
        setAnchorElNav(null);
        if(setting === 'Выйти'){
            localStorage.removeItem('auth')
            setAuthed(false)
            navigate('/')
        } else if(setting === 'Мои данные') {
            navigate('/my-profile')
        } else {
            navigate('/my-address')
        }
    };
    
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    
    // console.log(authed);
    // console.log(opena);
    return (
        <div className="container">
            <LoginModal open={opena} setOpen={setOpen} setSnackOpen={setSnackOpen} snackOpen={snackOpen} />
            <div className="navbar">
                <div className="navbar_intensive">
                    <div className="navbar_wrapper d_flex_between">
                    <div className="swipeable_drawer">
                        <SwipeableTemporaryDrawer authed={authed} />
                    </div>
                        {/* <div className="navbar_bars">
                            <AiOutlineBars />
                        </div> */}
                        <div className="d_flex_between navbar_wrapper_left" style={{width: authed && '600px'}}>
                            <div className="navbar_logo">
                                <img src="../../../Images/logo.svg" alt=""/>
                            </div>
                            <div className="navbar_nav d_flex_around" style={{width: authed && '450px'}}>
                                <Link style={{textDecoration: 'none'}} to="/"><div className="navbar_nav_item">Главная</div></Link>
                                <Link style={{textDecoration: 'none'}} to="/brunches"><div className="navbar_nav_item">Филиалы</div></Link>
                                <Link style={{textDecoration: 'none'}} to="/about"><div className="navbar_nav_item">О нас</div></Link>
                                <Link style={{textDecoration: 'none'}} to="/contact"><div className="navbar_nav_item">Контакты</div></Link>
                                {
                                    authed ? <Link style={{textDecoration: 'none'}} to="/myOrders"><div className="navbar_nav_item">Мои заказы</div></Link> : null
                                }
                            </div>
                        </div>
                        <div className="navbar_mui_box" >
                            <div className="navbar_korzina_btn color_primary">
                                <div className="d_flex_between">
                                    <div className="navbar_korzina_btn_icon">
                                        <BsCart2 className="navbar_korzina_btn_icon" /> <span className="navbar_korzina_btn_icon_badge">{productItem.length}</span>
                                    </div>
                                    <div className="navbar_korzina_btn_name">Корзина</div>
                                </div>

                                <PopUpCart setOpena={setOpen} authed={authed} />

                            </div>
                            {
                                authed ? 
                                 <div className="circle_user">
                                     {/* {console.log(anchorElUser)} */}
                                    <Box sx={{ flexGrow: 0 }}>
                                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                                <HiUserCircle size="30px" style={{color: '#51267D'}} />
                                            </IconButton>
                                        <Menu
                                            sx={{ mt: '45px' }}
                                            id="menu-appbar"
                                            anchorEl={anchorElUser}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            keepMounted
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            open={Boolean(authed && anchorElUser)}
                                            onClose={handleCloseUserMenu}
                                            >
                                            {settings.map((setting) => (
                                                <MenuItem key={setting} onClick={()=>handleCloseNavMenu(setting)}>
                                                    <Typography textAlign="center" >
                                                        <Link to='/'>
                                                            {setting}
                                                        </Link>
                                                    </Typography>
                                                </MenuItem>
                                            ))}
                                        </Menu>
                                    </Box>
                                </div> :  
                                <div onClick={()=> onChangeRegisterBtn()} className="navbar_register_btn">
                                    <Button titleName={'Войти'} bgColor="#51267D" textColor="#fff" />
                                </div>
                            }
        
                        </div>
                        </div> 

                </div>
            </div>
        </div>
    )
}

export default Navbar
