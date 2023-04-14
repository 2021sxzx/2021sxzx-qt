import { Rate } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import style from './RateReport.module.scss'
import * as echarts from 'echarts'

export default function CommentReport(props) {
	const chartRef = useRef()
	const [chartData, setChartData] = useState({})
	useEffect(() => {
		let data = props.commentInfo
		setChartData(data)
		let option = {
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'none',
				},
				formatter: (params) => {
					return `${params[0].axisValue}<br />
          共计：${params[0].data}<br />
          占比：${
						Math.floor(
							(params[0].data / (params[1].data + params[0].data)) * 100 * 100,
						) / 100
					}%`
				},
			},
			grid: {
				show: false,
				containLabel: true,
				x: 0,
				x2: 15,
				y: 0,
				y2: 0,
			},
			yAxis: {
				axisTick: { show: false },
				axisLine: { show: false },
				type: 'category',
				data: [
					'1星 | 非常不满意  ',
					'2星 | 不满意\u3000\u3000  ',
					'3星 | 基本满意\u3000  ',
					'4星 | 满意\u3000\u3000\u3000  ',
					'5星 | 非常满意\u3000  ',
				],
			},
			xAxis: {
				show: false,
				type: 'value',
				max: data.totalNum,
			},
			series: [
				{
					data: data.scoreInfo,
					stack: 'bar1',
					type: 'bar',
					barMaxWidth: 15,
				},
				{
					data: data.scoreInfoRemain,
					stack: 'bar1',
					type: 'bar',
					itemStyle: {
						color: '#BBD4EF',
					},
				},
			],
		}

		let myChart = echarts.init(chartRef.current)
		console.log(chartRef)
		option && myChart.setOption(option)
	}, [props.commentInfo])

	return (
		<div className={style.container}>
			<div className={style.leftColumns}>
				<div className={style.title}>办事指南评分</div>
				<div className={style.rateContainer}>
					<div className={style.score}>
						{(Math.round(chartData.avgScore * 10) / 10).toString()}
					</div>
					<div className={style.stars}>
						<Rate
							className={style.rate}
							disabled
							value={(
								Math.round(chartData.avgScore * 10) / 10
							).toString()}></Rate>
					</div>
				</div>
			</div>
			<div className={style.rightColumns}>
				<div className={style.title}>{chartData.totalNum}个评论</div>
				<div className={style.statistics} ref={chartRef}></div>
			</div>
		</div>
	)
}
