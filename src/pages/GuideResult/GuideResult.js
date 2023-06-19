import React, {useState} from 'react'
import Comment from './components/Comment/Comment.js'
import style from './GuideResult.module.scss'
import Guide from './components/Guide/Guide.js'

import Orientation from './components/Orientation/Orientation.js'

export default function CommentPage() {
    const [guideData, setGuideData] = useState()

    return (
        <div className={style.container}>
            
            <Orientation setGuide={setGuideData}/>
            <Guide/>
            <Comment guideData={guideData}/>
            
        </div>
    )
}
