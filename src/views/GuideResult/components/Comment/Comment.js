import React, {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {Rate, Input, message, Tag} from 'antd'

import style from './Comment.module.scss'
import axios from '../../../../api/http'

const {TextArea} = Input

const desc = ['非常不满意', '不满意', '基本满意', '满意', '非常满意']

export default function Comment(props) {
    const dispatch = useDispatch()

    const [starValue, setStarValue] = useState(5)
    const [comment, setComment] = useState('')
    const [commentBtnDisabled, setCommentBtnDisabled] = useState(false)
    const [optionList, setOptionList] = useState([
        '办理条件非常准确',
        '申请流程非常清晰',
        '情形非常合理',
    ])

    useEffect(() => {
        if (starValue === 5 || starValue === 4) {
            setOptionList(['办理条件非常准确', '申请流程非常清晰', '情形非常合理'])
        } else if (starValue === 3 || starValue === 2) {
            setOptionList(['办理条件基本准确', '申请流程基本清晰', '情形基本合理'])
        } else {
            setOptionList(['办理条件不准确', '申请流程不清晰', '情形不合理'])
        }
    }, [starValue])

    const handleChange = (value) => {
        setStarValue(value)
    }
    const updateComment = (e) => {
        setComment(e.target.value)
    }
    const commit = () => {
        setCommentBtnDisabled(true)
        axios
            .post('/v1/comment', {
                idc: '320425200107050375',
                show_status: 0,
                check_status: 0,
                content: comment,
                idc_type: '居民身份证',
                score: starValue,
                item_id: props.guideData._id,
            })
            .then(() => {
                message.success('实名提交评论成功！')
                dispatch({type: 'UPDATE'})
                setComment('')
                setStarValue(5)
            })
            .catch((res) => {
                console.log(res)
            })
    }
    const privateCommit = () => {
        setCommentBtnDisabled(true)
        axios
            .post('/v1/comment', {
                show_status: 0,
                check_status: 0,
                content: comment,
                score: starValue,
                item_id: props.guideData._id,
            })
            .then(() => {
                message.success('匿名提交评论成功！')
                dispatch({type: 'UPDATE'})
                setComment('')
                setStarValue(5)
            })
            .catch((res) => {
                console.log(res)
            })
    }
    const fillTest = (e) => {
        e.preventDefault()
        setComment(comment + e.target.innerText)
    }
    return (
        <div className={style.container}>
            <div className={style.widthController}>
                <div className={style.title}>办事指南评议</div>
                <div className={style.scoreContainer}>
                    <div className={style.top}>
                        <Rate
                            className={style.rateContainer}
                            onChange={handleChange}
                            value={starValue}
                            tooltips={desc}/>
                        {/* antRateText 是选择星星后显示对应的文字 */}
                        {starValue ? (
                            <span className={style.antRateText}>{desc[starValue - 1]}</span>
                        ) : (
                            ''
                        )}
                    </div>
                    <div className={style.optionContainer}>
                        {optionList.map((item) => {
                            return (
                                <Tag onClick={fillTest} key={item}>
                                    <a>{item}</a>
                                </Tag>
                            )
                        })}
                    </div>
                    <TextArea
                        value={comment}
                        className={style.textArea}
                        rows={5}
                        placeholder='请输入其它想说的评价……'
                        minLength={10}
                        maxLength={200}
                        onChange={updateComment}
                    />
                    {/* <div className={style.tips}>温馨提示：该评议只对办事指南内容是否规范、准确、清晰、合理等方面进行评议。</div> */}

                    <div
                        className={commentBtnDisabled ? `${style.btn} ${style.commit}  ${style.disabled}` : `${style.btn} ${style.commit}`}
                        onClick={privateCommit}>
                        匿名提交
                    </div>
                    <div
                        className={commentBtnDisabled ? `${style.btn} ${style.commit}  ${style.disabled}` : `${style.btn} ${style.commit}`}
                        onClick={commit}>
                        实名提交
                    </div>
                </div>
            </div>
        </div>
    )
}
