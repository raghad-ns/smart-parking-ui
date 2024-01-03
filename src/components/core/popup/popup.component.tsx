import React from 'react'
import './popup.scss'

interface IPopupParams {
    children: React.ReactNode
}
/**
 * 
 * @param {children : React.reactNodes} props 
 * @returns 
 */
const PopUp = (props: IPopupParams) => {
    return (
        <div className="popUpWrapper blur">
            <div className='popUp'>
                {props.children}
            </div>
        </div>
    )
}

export default PopUp