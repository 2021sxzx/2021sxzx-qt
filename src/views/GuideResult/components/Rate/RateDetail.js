import React, { useEffect, useState } from 'react'
import style from './RateDetail.module.scss'
import { Comment, Tooltip, Rate } from 'antd'
import moment from 'moment'
import axios from '@/api/http'

// 这个组件是评价页面下方的评价评价列表
export default function CommentDetail(props) {
	// 这里存放所有评论
	let [allComment, setAllComment] = useState([])
	// 对评论进行筛选
	let [renderedComments, setRenderedComment] = useState([])
	// 选择了哪些评论，0代表全部，1代表非常满意，对应score为5。以此类推
	let [chosenRadio, setChosenRadio] = useState(0)

	useEffect(() => {
		async function getAllComment() {
			let {
				data: { data: allComment },
			} = await axios.get('/v1/allcomment')
			console.log(allComment)
			setAllComment(allComment)
		}
		getAllComment()
	}, [])

	useEffect(() => {
		if (chosenRadio === 0) {
			setRenderedComment(allComment)
		} else {
			setRenderedComment(
				allComment.filter((item) => {
					return parseInt(item.score) + chosenRadio === 6
				}),
			)
		}
	}, [chosenRadio, allComment])

	const radiosNames = [
		'全部',
		'非常满意',
		'满意',
		'基本满意',
		'不满意',
		'非常不满意',
	]
	const changeChosen = function (index) {
		setChosenRadio(index)
	}

	function renderComments(items) {
		return items.map((item) => {
			return (
				<Comment
					key={item._id}
					author={<div>Han Solo</div>}
					content={
						<div>
							<Rate className={style.rate} disabled value={item.score}></Rate>
							<p>{item.content}</p>
						</div>
					}
					datetime={
						<Tooltip
							title={moment(parseInt(item.create_time)).format(
								'YYYY-MM-DD HH:mm:ss',
							)}>
							<span>{moment(parseInt(item.create_time)).fromNow()}</span>
						</Tooltip>
					}
				/>
			)
		})
	}

	return (
		<div className={style.container}>
			<div className={style.title}>评价列表</div>
			<div className={style.radioWrapper}>
				{radiosNames.map((item, index) => {
					if (index === 0) {
						return (
							<div
								key={index}
								className={`${style.radioItem} ${
									chosenRadio === index ? style.radioItemChosen : ''
								}`}
								onClick={changeChosen.bind(null, index)}>
								{item}
								{props.commentInfo.totalNum}
							</div>
						)
					} else {
						return (
							<div
								key={index}
								className={`${style.radioItem} ${
									chosenRadio === index ? style.radioItemChosen : ''
								}`}
								onClick={changeChosen.bind(null, index)}>
								{item}(
								{props.commentInfo.scoreInfo
									? props.commentInfo.scoreInfo[5 - index]
									: ''}
								)
							</div>
						)
					}
				})}
			</div>
			<div>{renderComments(renderedComments)}</div>
		</div>
	)
}
