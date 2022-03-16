import React, { useState, useEffect } from 'react'
import style from './Orientation.module.scss'
import { useLocation, useHistory } from 'react-router-dom'
import { GetItemByUniId, GetItemRules, GetRegionPath, GetRulePath } from '../../../../api/navigationApi';
// import axios from '../../../../api/http';

export default function Orientation() {
    const hint = '您属于情况：';
    const location = useLocation();
    const history = useHistory();
    const [ruleSelected, setRuleSelected] = useState([]);
    const [regionSelected, setRegionSelected] = useState([]);

    var req;

    /* 结果页面初始化：
        1. 导航页面进入(有数据列表)
        2. 其他情况(只有task_code)
    */
    useEffect(() => {
        if (location.state) {
            setRuleSelected(location.state.ruleSelected);
            setRegionSelected(location.state.regionSelected);
        } else {
            console.log(location.pathname);
            let tmp = location.pathname;
            let ruleId;
            let regionId;
            // 获取rule_id和region_id
            req = {
                task_code: tmp
            }
            GetItemByUniId(req).then(res => {
                req = {
                    item_rule_id: res.data.data[0].item_rule_id
                }
                GetItemRules(req).then(res => {
                    ruleId = res.data.data[0].rule_id;
                    regionId = res.data.data[0].region_id;
                })
            })
            // 获取路径
            req = {
                ruleIds: [ruleId]
            }
            GetRulePath(req).then(res => {
                setRuleSelected(res.data.data[0]);
            })
            req = {
                regionIds: [regionId]
            }
            GetRegionPath(req).then(res => {
                setRegionSelected(res.data.data[0]);
            })
        }
        // eslint-disable-next-line
    }, []) 


    const handleClickStepRule = (item, index) => {
        history.push({
            pathname: '/navigation',
            state: { 
                type: 1, 
                ruleSelected: ruleSelected, 
                regionSelected: regionSelected,
                clickItem: item,
                clickIndex: index
            }
        })
    }

    const handleClickStepRegion = (item, index) => {
        history.push({
            pathname: '/navigation',
            state: { 
                type: 2, 
                ruleSelected: ruleSelected, 
                regionSelected: regionSelected,
                clickItem: item,
                clickIndex: index
            }
        })
    }

    return (
        <div className={style.container}>
            <div className={style.hint}>{ hint }</div>
            <div className={style.selectedContainer}>
                {
                    ruleSelected.map((item, index) => {
                        return (
                            <div className={style.selectedBox} key={index}>
                                <div className={style.outer} onClick={handleClickStepRule.bind(this, item, index)}>
                                    <div className={style.desc}>
                                        { item.rule_name }
                                    </div>
                                </div>
                                <div className={style.separator}></div>
                            </div>
                        )
                    })
                }
                {
                    regionSelected.map((item, index) => {
                        return (
                            <div className={style.selectedBox} 
                                key={index}>
                                <div className={style.outer} onClick={handleClickStepRegion.bind(this, item, index)}>
                                    <div className={style.desc}>
                                        { item.region_name }
                                    </div>
                                </div>
                                <div className={`${style.separator}  ${index === regionSelected.length-1? style.hidden: null}`}></div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )}