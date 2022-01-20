import React from 'react'
import {Routes, Route} from 'react-router-dom'
import CreatePage from './CreatePage.jsx'
import LinksPage from './LinksPage.jsx'
import DetailPage from './DetailPage.jsx'
import AuthPage from './AuthPage.jsx'


export const useRoutes = isAuthenticated => {
    if(isAuthenticated) {
        return (
            <Routes>
                <Route path="/links" exact element={<LinksPage />} />
                    
                <Route path="/create" element={<CreatePage />} />
                    
                <Route path="/detail/:id" element={<DetailPage />} />
                    
                <Route path="*"  element={<CreatePage />} />
            </Routes>
        )
    }
    return (
        <Routes>
            <Route path="/" exact element={<AuthPage />} />
            <Route path="*" element={<AuthPage />} />
        </Routes>
    )
}


