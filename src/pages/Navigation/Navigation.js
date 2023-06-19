import React from 'react'

import Orientation from './components/Orientation/Orientation.js'
import style from './Navigation.module.scss'

export default function Navigation() {
    return (
        <div className={style.container}>
            
            <Orientation/>
            
        </div>
    )
}
