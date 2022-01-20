import React from 'react'
import '../styles/button.css'

function Button({titleName,fSize, width, display, fWeight, borderRadius, titleName1, paddingStyle, bgColor, textColor}) {
    return (
        <div className="maxway_btn" style={{width: width,fontWeight: fWeight, fontSize: fSize,background: bgColor, color: textColor, padding: paddingStyle, borderRadius: borderRadius}}>
            <div className={display}>
                <div className="d_flex_justify_center">{titleName}</div>
                <div className="d_flex_justify_center">{titleName1}</div>
            </div>
        </div>
    )
}

export default Button
