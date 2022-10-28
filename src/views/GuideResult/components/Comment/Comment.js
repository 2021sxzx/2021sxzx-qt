import React, {useState, useEffect, useCallback} from 'react'
import {useDispatch} from 'react-redux'
import {Rate, Input, message, Tag} from 'antd'
import style from './Comment.module.scss'
import axios from '../../../../api/http'
import {throttle, throttleCDErrorMessage} from "../../../components/Throttle/Throttle";

const {TextArea} = Input

const desc = ['非常不满意', '不满意', '基本满意', '满意', '非常满意']

export default function Comment(props) {
    const dispatch = useDispatch()

    const [starValue, setStarValue] = useState(5)
    const [comment, setComment] = useState('')
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

    /**
     * 使用节流函数处理了实名提交评价请求
     * @param data {{
     *     idc: string,
     *     show_status: number,
     *     check_status: number,
     *     content: string,
     *     score: number,
     *     item_id: string,
     *     idc_type: ('居民身份证'|string),
     * }}
     * @type {(function(): Promise<*>)}
     */
    const commit = useCallback(throttle((data) => {
        if (data.content === '') {
            message.warn('请输入评论内容')
        } else {
            axios
                .post('/v1/comment', data)
                .then(() => {
                    message.success('实名提交评论成功！')
                    dispatch({type: 'UPDATE'})
                    setComment('')
                    setStarValue(5)
                })
                .catch((err) => {
                    message.error('评论提交失败，请稍后重试。' + err.message)
                })
        }
    }, 3000), [])

    /**
     * 使用节流函数处理了匿名提交评价请求
     * @param data {{
     *     show_status: number,
     *     check_status: number,
     *     content: string,
     *     score: number,
     *     item_id: string,
     * }}
     * @type {(function(): Promise<*>)}
     */
    const privateCommit = useCallback(throttle((data) => {
        if (data.content === '') {
            message.warn('请输入评论内容')
        } else {
            axios
                .post('/v1/comment', data)
                .then(() => {
                    message.success('匿名提交评论成功！')
                    dispatch({type: 'UPDATE'})
                    setComment('')
                    setStarValue(5)
                })
                .catch((err) => {
                    message.error('评论提交失败，请稍后重试。' + err.message)
                })
        }
    }, 3000), [])

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
                                    <div className={style.tagTitle}>{item}</div>
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
                        className={`${style.btn} ${style.commit}`}
                        onClick={() => {
                            privateCommit({
                                show_status: 0,
                                check_status: 0,
                                content: comment,
                                score: starValue,
                                item_id: props.guideData._id,
                            })
                                .catch(error => {
                                    if (error.message === throttleCDErrorMessage) { // 因为处于节流冷却状态中而抛出错误
                                        message.warn('请勿频繁提交评价')
                                    } else {
                                        message.error('提交评论失败，请稍后尝试。' + error.message)
                                    }
                                })
                        }}>
                        匿名提交
                    </div>
                    <div
                        className={`${style.btn} ${style.commit}`}
                        onClick={() => {
                            commit({
                                idc: '320425200107050375',
                                show_status: 0,
                                check_status: 0,
                                content: comment,
                                idc_type: '居民身份证',
                                score: starValue,
                                item_id: props.guideData._id,
                            }).catch(error => {
                                if (error.message === throttleCDErrorMessage) { // 因为处于节流冷却状态中而抛出错误
                                    message.warn('请勿频繁提交评价')
                                } else {
                                    message.error('提交评论失败，请稍后尝试。' + error.message)
                                }
                            })
                        }}>
                        实名提交
                    </div>
                </div>
            </div>
        </div>
    )
}
