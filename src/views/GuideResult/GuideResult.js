import React, {useState} from 'react'
import Comment from './components/Comment/Comment.js'
import style from './GuideResult.module.scss'
import Guide from './components/Guide/Guide.js'
import FooterInfo from '../components/FooterInfo/FooterInfo.js'
import SearchBar from '../components/SearchBar/SearchBar.js'
import Orientation from './components/Orientation/Orientation.js'
import SlideCS from '../components/SlideCS/SlideCS.js'


export default function CommentPage() {
    const [guideData, setGuideData] = useState()
    return (
        <div className={style.container}>
            <SearchBar/>
            <Orientation setGuide={setGuideData}/>
            <Guide/>
            <Comment guideData={guideData}/>
            <FooterInfo/>
            <SlideCS/>
        </div>
    )
}
