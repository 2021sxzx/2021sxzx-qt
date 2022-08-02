import React, {useState, useEffect} from 'react'
import style from './Orientation.module.scss'
import {useLocation, useHistory} from 'react-router-dom'
import {GetItems, GetRegionPaths, GetRulePaths} from '../../../../api/navigationApi'
import {Spin} from 'antd'

export default function Orientation(props) {
    const hint = '您属于情况：';
    const subStartIndex = '/v1/taskResult/'.length;
    const location = useLocation();
    const history = useHistory();
    const [ruleSelected, setRuleSelected] = useState([]);
    const [regionSelected, setRegionSelected] = useState([]);

    let req;

    /*
        结果页面初始化：
        1. 导航页面进入(有事项列表 -> 直接渲染)
        2. 其他情况(只有task_code -> 获取事项列表)
    */
    useEffect(() => {
        let taskCode = location.pathname.substring(subStartIndex);
        // 获取rule_id和region_id
        req = {
            task_code: [taskCode]
        }
        if (location.state) {
            setRuleSelected(location.state.ruleSelected);
            setRegionSelected(location.state.regionSelected);
            GetItems(req).then(res => {
                props.setGuide(res.data.data[0])
            })

        } else {
            console.log(location.pathname.substring(subStartIndex));
            GetItems(req).then(res => {
                let ruleId = res.data.data[0].rule_id;
                let regionId = res.data.data[0].region_id;
                props.setGuide(res.data.data[0])
                req = {
                    rule_id: [ruleId]
                }
                GetRulePaths(req).then(res => {
                    // 去除第一项“人社局业务”
                    setRuleSelected(res.data.data[ruleId].filter((_, i) => i > 0));
                })

                req = {
                    region_id: [regionId]
                }
                GetRegionPaths(req).then(res => {
                    setRegionSelected(res.data.data[regionId]);
                })
            })
        }
    }, [])

    const handleClickStepRule = (item, index) => {
        history.push({
            pathname: '/navigation',
            state: {
                nav_type: 1,
                ruleSelected: ruleSelected,
                regionSelected: regionSelected,
                clickItem: item,
                clickIndex: index
            }
        })
    }

    const handleClickStepRegion = (item, index) => {
        if (index !== regionSelected.length - 1) {
            history.push({
                pathname: '/navigation',
                state: {
                    nav_type: 2,
                    ruleSelected: ruleSelected,
                    regionSelected: regionSelected,
                    clickItem: item,
                    clickIndex: index
                }
            })
        }
    }

    return (
        <div className={style.container}>
            <div className={style.hint}>{hint}</div>
            {/* 选择步骤条部分 Step */}
            <div className={style.selectedContainer}>
                {
                    ruleSelected && ruleSelected.map((item, index) => {
                        return (
                            <div className={style.selectedBox} key={index}>
                                <div className={style.outer} onClick={handleClickStepRule.bind(this, item, index)}>
                                    <div className={style.desc}>
                                        {item.rule_name}
                                    </div>
                                </div>
                                <div className={style.separator}/>
                            </div>
                        )
                    })
                }
                {
                    regionSelected && regionSelected.map((item, index) => {
                        return (
                            <div className={style.selectedBox}
                                 key={index}>
                                <div className={style.outer} onClick={handleClickStepRegion.bind(this, item, index)}>
                                    <div className={style.desc}>
                                        {item.region_name}
                                    </div>
                                </div>
                                <div className={`${style.separator}  ${index === regionSelected.length - 1 ? style.hidden : null}`}/>
                            </div>
                        )
                    })
                }
            </div>
            {/* 加载中图标提示部分 */}
            {
                <div className={style.loadingBox}>
                    <Spin spinning={regionSelected.length === 0}/>
                </div>
            }
        </div>
    )
}
