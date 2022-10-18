import React from 'react'
import SearchBar from '../components/SearchBar/SearchBar.js'
import Maincontent from './components/Maincontent/Maincontent.js'
import FooterInfo from '../components/FooterInfo/FooterInfo.js'
import style from './HomePage.module.scss'

export default function Home() {
    return (
        <div className={style.container}>
            <SearchBar/>
            <Maincontent/>
            <FooterInfo/>
        </div>
    )
}
