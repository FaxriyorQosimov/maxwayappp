import React from 'react'
import Products from './Products'
import Slider from './Slider'

function HomePageBody({opena, authed, setOpen, setAuthed}) {
    return (
        <>
            <Slider />
            <Products opena={opena} authed={authed} setOpen={setOpen} setAuthed={setAuthed} />
        </>
    )
}

export default HomePageBody
