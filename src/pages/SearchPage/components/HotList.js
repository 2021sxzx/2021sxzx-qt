import style from './Hotlist.module.scss'

export default function HotList(props) {
    return (
        <div className={style.container}>
            <div className={style.title}>
                热门搜索
            </div>

            <div className={style.wordList}>
                {
                    props.wordList.map((item) => {
                        return (
                            <div className={style.wordItem} onClick={() => {
                                props.handler(item.word)
                            }}>
                                {item.word}
                            </div>

                        )
                    })
                }
            </div>
        </div>
    )
}
