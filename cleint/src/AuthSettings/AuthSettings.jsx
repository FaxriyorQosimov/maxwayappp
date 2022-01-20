import React from 'react'
import { useRoutes } from './Routes'

function AuthSettings() {
    const routess = useRoutes(false)
    return (
        <div>
            {routess}
        </div>
    )
}

export default AuthSettings
