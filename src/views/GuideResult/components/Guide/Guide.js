import './button.scss'
import style from './Guide.module.scss'
import React, {useEffect, useRef, useState} from 'react'
import {useLocation} from 'react-router-dom'
import {Divider, message} from 'antd'
import {GetItemGuide} from '../../../../api/guideApi'
import {useReactToPrint} from "react-to-print"
import LobbyWindows from "./LobbyWindows";
import Material from "./Material"

function Guide(props) {
    const {pathname} = useLocation()
    const [data, setData] = useState({})

    useEffect(() => {
        GetItemGuide({"task_code": pathname.slice(15)}).then(res => {
            setData(res.data.data);
        }).catch(() => {
            message.error('获取事项指南失败，请稍后尝试')
        })
    }, [pathname])

    const toDetail = () => {
        const index = pathname.search("taskResult")
        const number = pathname.slice(index + 11)
        const destination = "https://www.gdzwfw.gov.cn/portal/v2/guide/" + number
        window.open(destination)
    }

    const dealItem = () => {
        window.open(data.wsyy.slice(2))
    }

    return (
        <div className={style.container}>
            <div className={style.title}>{data.task_name}</div>
            <div className={style.GB_name}>国家标准名: {data.task_name}</div>
            <div className={style.buttonBox}>
                <div className={style.button} onClick={dealItem}>事项办理</div>
                <div className={style.button} onClick={toDetail}>详细指南</div>
                <div className={style.button} onClick={props.handlePrint}>打印咨询结果</div>
            </div>
            <Divider className={style.divider}/>
            <div className={style.subtitle}>申请材料</div>
            <Material submit_documents={data.submit_documents}/>
            <div className={style.subtitle}>办理地点</div>
            <LobbyWindows lobbyList={data.windows}/>
            <div className={style.subtitle}>网上办理流程</div>
            <div className={style.wsbllc}>{data.wsbllc ? data.wsbllc : "无"}</div>
            <div className={style.subtitle}>线下办理流程</div>
            <div className={style.ckbllc}>{data.ckbllc ? data.ckbllc : "无"}</div>
        </div>
    );
}

/**
 * 使用 react-to-print 库的 useReactToPrint 接口来封装要打印的内容和处理打印功能的函数
 */
export default React.forwardRef(() => {
    // 引用要打印的组件
    let componentRef = useRef(null)

    // 触发打印功能的函数
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })

    // 打印页面的默认边距
    let marginTop = '40px', marginRight = '40px', marginBottom = "40px", marginLeft = '40px'
    const getPageMargins = () => {
        return `@page { margin: ${marginTop} ${marginRight} ${marginBottom} ${marginLeft} !important; }`;
    }

    return (
        // 引用要打印的组件
        <div ref={componentRef} style={{
            width:'100%',
            height:'100%',
        }}>
            {/*插入打印的页边距样式*/}
            <style>{getPageMargins()}</style>
            <Guide handlePrint={handlePrint}/>
        </div>
    )
})
