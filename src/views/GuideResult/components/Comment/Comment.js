import React,{useState,useEffect,useRef} from 'react'
import { useHistory } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import {Rate,Input,message,Tag} from 'antd'

import style from './Comment.module.scss'
import axios from '../../../../http/http'

const { TextArea } = Input;

const desc = ['非常不满意', '不满意', '基本满意', '满意', '非常满意'];

export default function Comment() {  
  const history = useHistory()
  const dispatch = useDispatch()
  const textArea = useRef()

  const [starValue, setStarValue] = useState(5)
  const [comment, setComment] = useState('')
  const [update, setUpdate] = useState('')
  const [optionList,setOptionList] = useState(['办理条件非常准确','申请流程非常清晰','情形非常合理'])

  useEffect(() => {
    if(starValue===5||starValue===4){
      setOptionList(['办理条件非常准确','申请流程非常清晰','情形非常合理'])
    }
    else if(starValue===3||starValue===2){
      setOptionList(['办理条件基本准确','申请流程基本清晰','情形基本合理'])

    }
    else{
      setOptionList(['办理条件不准确','申请流程不清晰','情形不合理'])
    }
  }, [starValue])

  const handleChange = value =>{
    setStarValue(value)
  }
  const updateComment = (e)=>{
    setComment(e.target.value)
  }
  const commit = ()=>{
      axios.post('/v1/comment',{
        idc:'320425200107050375',
        show_status:0,
        check_status:0,
        content:comment,
        idc_type:'居民身份证',
        score:starValue,
        item_id:'430425200107050375X51564654'
      }).then(res=>{
        message.success('评论提交成功！')
        dispatch({type:'UPDATE'})
      })
      .catch((res)=>{
        console.log(res);
      })
  }

  const fillTest = (e)=>{
    e.preventDefault()
    textArea.current.resizableTextArea.textArea.value += e.target.innerText
  }
  return (
    <div className={style.container}>
      <div className={style.widthController}>
        <div className={style.title}>办事指南评议</div>
        <div className={style.scoreContainer}>
          <div className={style.top}>
            <Rate className={style.rateContainer} onChange={handleChange} value={starValue} tooltips={desc}></Rate>
            {starValue ? <span className={style.antRateText}>{desc[starValue - 1]}</span> : ''}
          </div>
          <div className={style.optionContainer}>
            {
              optionList.map((item)=>{
                return(
                  <Tag onClick={fillTest}><a>{item}</a></Tag>
                )
              })
            }
          </div>
          <TextArea 
            ref={textArea}
            className={style.textArea} 
            rows={6} 
            placeholder="请描述问题或建议，帮助我们做得更好（不少于10个字，不多于200个字）" 
            minLength={10} maxLength={200} showCount
            onChange={updateComment}/>
          <div className={style.tips}>温馨提示：该评议只对办事指南内容是否规范、准确、清晰、合理等方面进行评议。</div>
          <div className={`${style.btn} ${style.commit}`} onClick={commit}>提交</div>
        </div>

      </div>
    </div>
  )
}
