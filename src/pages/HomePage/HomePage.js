import React from 'react'
import MainContent from './components/Maincontent/MainContent.js'

import style from './HomePage.module.scss'

export default function Home() {
    return (
        <div className={style.container}>
            <MainContent/>
        </div>
    )
}
