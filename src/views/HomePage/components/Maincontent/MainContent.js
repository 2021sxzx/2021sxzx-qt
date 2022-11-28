import React, {useEffect, useState} from 'react'
import style from './Maincontent.module.scss'
import Images from '../../../../assets/Images'
import {useHistory} from 'react-router-dom'
import {getItemNumber} from "../../../../api/homePageApi";

export default function MainContent() {
    const main = ''
    const [itemNum, setItemNum] = useState('')
    const history = useHistory()
    const [serviceObjectIndex, setServiceObjectIndex] = useState(0)

    useEffect(() => {
        getItemNumber().then(res => {
            setItemNum(res.data.data)
        }).catch(() => {
            setItemNum('')
        })
    }, [])

    const serviceObjectList = [
        {rule_name: '个人业务', obj_type: '[1]'},
        {rule_name: '法人业务', obj_type: '[2,3,4]'},
        {rule_name: '事业单位业务', obj_type: '[5,6,9]'}
    ]
    // const [FirstRuleList, setFirstRuleList] = useState([[]]);
    const FirstRuleList = [
        {
            creator: {
                id: "62386b2b1e90ec7f7e958138",
                name: "全知全能的开发人员",
                department_name: "办公室"
            },
            _id: "625fbf817dcfbf22f1d11ca3",
            create_time: 1650442112897,
            rule_id: "1",
            rule_name: "人事人才",
            parentId: "0",
            children: [
                "2",
                "5",
                "8",
                "25",
                "26",
                "31"
            ],
            rule_path: "人社局业务/人事人才/"
        },
        {
            creator: {
                id: "62386b2b1e90ec7f7e958138",
                name: "全知全能的开发人员",
                department_name: "办公室"
            },
            _id: "625fbf817dcfbf22f1d11cc6",
            create_time: 1650442112897,
            rule_id: "36",
            rule_name: "就业创业",
            parentId: "0",
            children: [
                "37",
                "40",
                "49",
                "50",
                "51",
                "52",
                "53",
                "57",
                "58"
            ],
            rule_path: "人社局业务/就业创业/"
        },
        {
            creator: {
                id: "62386b2b1e90ec7f7e958138",
                name: "全知全能的开发人员",
                department_name: "办公室"
            },
            _id: "625fbf817dcfbf22f1d11ce1",
            create_time: 1650442112897,
            rule_id: "63",
            rule_name: "社会保险",
            parentId: "0",
            children: [
                "64",
                "70",
                "79",
                "82"
            ],
            rule_path: "人社局业务/社会保险/"
        },
        {
            creator: {
                id: "62386b2b1e90ec7f7e958138",
                name: "全知全能的开发人员",
                department_name: "办公室"
            },
            _id: "625fbf817dcfbf22f1d11cf9",
            create_time: 1650442112897,
            rule_id: "87",
            rule_name: "劳动保障",
            parentId: "0",
            children: [
                "88",
                "89",
                "97",
                "98",
                "99",
                "100"
            ],
            rule_path: "人社局业务/劳动保障/"
        }
    ]

    const icLDBZ = Images.home.icLDBZ;
    const icRSRC = Images.home.icRSRC;
    const icSHBX = Images.home.icSHBX;
    const icJYCY = Images.home.icJYCY;
    const bannerPC = 'url(' + Images.home.bannerPC + ')';
    const bannerMB = 'url(' + Images.home.bannerMB + ')';
    const [bgSrc, setBgSrc] = useState(bannerPC);

    let w;
    let picSrc;

    window.onresize = () => {
        w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        if (w > 400 && bgSrc !== bannerPC) {
            setBgSrc(bannerPC);
        }
        if (w <= 400 && bgSrc !== bannerMB) {
            setBgSrc(bannerMB);
        }
    }

    const handleServiceObjClick = (index) => {
        setServiceObjectIndex(index);
    }

    const handleFirstRulelick = (item) => {
        history.push({
            pathname: '/navigation',
            state: {
                ruleSelected: [item],
                nav_type: 0,
                obj_type: serviceObjectList[serviceObjectIndex].obj_type,
            }
        })
    }

    return (
        <div className={style.container}>
            {/* 图片横幅部分 */}
            <div className={style.bannerShow} id='banner'
                 style={{
                     backgroundImage: bgSrc,
                     backgroundRepeat: 'no-repeat',
                     backgroundSize: 'cover',
                     height: '300px'
                 }}>
                <div className={style.slogan1}>{main} 为您解决事项咨询最后一公里问题，</div>
                <div className={style.slogan2}>{main}为您提供事项咨询服务，打造一站式事项咨询平台。</div>
            </div>
            {/* 事项选择部分 */}
            <div className={style.businessShow}>
                {/* 第一级事项渲染 */}
                <div className={style.classify}>
                    {
                        serviceObjectList.map((item, index) => {
                            return (
                                <div className={serviceObjectIndex === index ? style.active : null}
                                     onClick={handleServiceObjClick.bind(this, index)}>
                                    {item.rule_name}
                                </div>
                            )
                        })
                    }
                </div>
                {/* 第二级事项渲染 */}
                <div className={style.specific}>
                    {
                        FirstRuleList && FirstRuleList.map((item) => {
                            switch (item.rule_name) {
                                case '劳动保障':
                                    picSrc = icLDBZ;
                                    break;
                                case '人事人才':
                                    picSrc = icRSRC;
                                    break;
                                case '社会保险':
                                    picSrc = icSHBX;
                                    break;
                                case '就业创业':
                                    picSrc = icJYCY;
                                    break;
                                default:
                                    break;
                            }
                            return (
                                <div className={serviceObjectIndex === 0 && item.rule_name === '劳动保障' ? style.hide : null}
                                     onClick={handleFirstRulelick.bind(this, item)}>
                                    <div className={style.outerBorder}>
                                        <div>
                                            <img src={picSrc} alt={'图片'}/>
                                        </div>
                                    </div>
                                    <p>{item.rule_name}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
