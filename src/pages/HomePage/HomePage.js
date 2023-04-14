import React from 'react'
import SearchBar from '@/components/SearchBar/SearchBar.js'
import MainContent from './components/Maincontent/MainContent.js'
import FooterInfo from '@/components/FooterInfo/FooterInfo.js'
import style from './HomePage.module.scss'

export default function Home() {
    return (
        <div className={style.container}>
            <SearchBar/>
            <MainContent/>
            <FooterInfo/>
        </div>
    )
}
