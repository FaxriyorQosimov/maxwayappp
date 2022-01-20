import React, { useState, useEffect } from 'react'
import AboutPage from './Pages/AboutUsPage/AboutPage'
import BrunchesPage from './Pages/FilialPage/BrunchesPage'
import Footer from './Pages/HomePage/Footer'
import HomePageBody from './Pages/HomePage/HomePageBody'
import Navbar from './Pages/HomePage/Navbar';
import { Route, Routes} from 'react-router-dom'
import Contact from './Pages/ContactPage/Contact'
import BrunchesItemPage from './Pages/FilialPage/BrunchesItemPage'
import ProductModal from './Components/ProductModal'
import Checkout from './Pages/MyOrder/Checkout'
import MyOrders from './Pages/MyOrder/MyOrders'
import MyProfile from './Pages/AboutMe/MyProfile'
import MyAdress from './Pages/AboutMe/MyAdress'
import MyOrderItem from './Pages/MyOrder/MyOrderItem'
import NotFound from './Pages/_404NotFound'
import SimpleBackdrop from './Components/Spinner'
import {collection, onSnapshot} from 'firebase/firestore';
import {db} from './Firebase/config.jsx'
// import SwipeableTemporaryDrawer from './Components/SwipeableDrawer'

import './styles/assemblyPage.css'
import LinearDeterminate from './Components/LinearDeterminant'
function AssemblyPage({productModalVizible}) {
    const [opena, setOpen] = useState(false);
    const [authed, setAuthed] = useState(false);
    const [comboNumm, setComboNumm] = useState('');
    useEffect(()=>{
        const load = async () => {
            onSnapshot(collection(db, 'foodValue'), (snapshot) => 
                setComboNumm(snapshot.docs.map((doc) => ({...doc.data(), defaultId: doc.id})))
            )
        }
        load()
    },[])
    console.log(comboNumm);
    return (
        <>
            { 
            <div >
                <ProductModal />
                <Navbar opena={opena} authed={authed} setOpen={setOpen} setAuthed={setAuthed} />
                <div className="bg_secondary" style={{zIndex: '10'}}>
                    <Routes>
                        <Route exact path="/" element={<HomePageBody opena={opena} authed={authed} setOpen={setOpen} setAuthed={setAuthed} />} />
                        <Route path="/brunches" element={<BrunchesPage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/brunches/:brunchName" element={<BrunchesItemPage />} />
                        <Route path="/myOrders" element={<MyOrders />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/my-profile" element={<MyProfile />} />
                        <Route path="/my-address" element={<MyAdress />} />
                        <Route path="/my-order-item" element={<MyOrderItem/>}/>
                        <Route path="*" element={<NotFound/>}/>
                    </Routes>
                </div>
                <Footer />
            </div> 
            }
        
        </>
    )
}

export default (AssemblyPage)
