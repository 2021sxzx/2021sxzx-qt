import React, {useEffect, useState} from 'react'
import style from './Orientation.module.scss'
import {Link, useLocation, useHistory} from 'react-router-dom'
import {Spin} from 'antd'
import {GetRules, GetRegions, GetItems, GetChildRegionsByRuleAndRegion} from '../../../../api/navigationApi'


export default function Orientation() {
    const hint = '您需要办理：';
    const location = useLocation();
    const history = useHistory();

    const [isRuleFinish, setIsRuleFinish] = useState(false);
    const [isRegionFinish, setIsRegionFinish] = useState(false);
    const [ruleSelected, setRuleSelected] = useState([]);
    const [regionSelected, setRegionSelected] = useState([]);
    const [optionList, setOptionList] = useState([]);

    let req = {}
    let data = []

    const getRegionInit = () => {
        req = {
            parentId: ['']
        }
        GetRegions(req).then(res => {
            setOptionList(res.data.data);
        })
    }


    const handleClickStepRule = async (mainRule, isReturn, item, index) => {
        setOptionList([]);
        setRegionSelected([]);
        setIsRegionFinish(false);
        // isReturn区分是否回退：处理回退setIsRuleFinish异步
        if (index === mainRule.length - 1 && (isRuleFinish || isReturn)) {
            getRegionInit();
        } else {
            setIsRuleFinish(false);
            req = {
                parentId: [item.rule_id]
            }
            setRuleSelected(mainRule.filter((_, i) => i <= index));
            await GetRules(req).then(res => {
                setOptionList(res.data.data);
            })
        }
    }

    const handleClickStepRegion = async (mainRegion, mainRule, item, index) => {
        setOptionList([])
        setIsRegionFinish(false)

        req = {
            rule_id: [mainRule[mainRule.length - 1].rule_id],
            region_code: [item.region_code],
            service_object: history.location.state.obj_type ? history.location.state.obj_type : null,
        }

        setRegionSelected(mainRegion.filter((_, i) => i <= index));
        await GetChildRegionsByRuleAndRegion(req).then(res => {
            setOptionList(res.data.data)
            console.dir(res.data.data)
        })
    }

    const handleClickOption = (item) => {
        setOptionList([]);
        if (!isRuleFinish) {
            setRuleSelected([...ruleSelected, item]);
            req = {
                parentId: [item.rule_id]
            }
            GetRules(req).then(res => {
                data = res.data.data;
                if (!data[0]) {
                    setIsRuleFinish(true);
                    getRegionInit();
                } else {
                    setOptionList(data);
                }
            })
        } else {
            let len = regionSelected.length;
            if (len > 0 && item.region_code === regionSelected[len - 1].region_code) {
                // 确定选择本级地区事项
                setIsRegionFinish(true)
                handleForTaskCode(item)
            } else {
                setRegionSelected([...regionSelected, item])

                req = {
                    rule_id: [ruleSelected[ruleSelected.length - 1].rule_id],
                    region_code: [item.region_code],
                    service_object: history.location.state.obj_type ? history.location.state.obj_type : null,
                }

                GetChildRegionsByRuleAndRegion(req).then(res => {
                    data = res.data.data;
                    setOptionList(data);
                })
            }
        }
    }

    // 获取task_code并跳转
    const handleForTaskCode = (item) => {
        req = {
            rule_id: [ruleSelected[ruleSelected.length - 1].rule_id],
            region_code: [item.region_code]
        }
        console.log("req: ", req);
        GetItems(req).then(res => {
            console.log("res.data.data: ", res.data.data[0]);
            history.push({
                pathname: "/v1/taskResult/" + res.data.data[0].task_code,
                state: {
                    ruleSelected: ruleSelected,
                    regionSelected: regionSelected
                }
            })
        })
    }


    /*
        导航页面初始化：
        1. 有初始数据 -> 处理渲染
            1.1 首页进入(type=0)
            1.2 结果回退
                1.2.1 事项回退(type=1)
                1.2.2 地区回退(type=2)
        2. 无初始数据(直接打开或者刷新页面) -> 重定向首页
    */
    useEffect(() => {
        if (location.state) {
            let tmpRuleSelected;
            let tmpRegionSelected = [];
            let nav_type = location.state.nav_type;
            if (nav_type === 0) {
                tmpRuleSelected = location.state.ruleSelected;
                setRuleSelected(tmpRuleSelected);
                req = {
                    parentId: [tmpRuleSelected[0].rule_id]
                }
                GetRules(req).then(res => {
                    setOptionList(res.data.data);
                })
            } else {
                tmpRuleSelected = location.state.ruleSelected;
                tmpRegionSelected = location.state.regionSelected;
                let item = location.state.clickItem;
                let index = location.state.clickIndex;
                setIsRuleFinish(true);
                setRuleSelected(tmpRuleSelected);
                setRegionSelected(tmpRegionSelected);
                if (nav_type === 1) {
                    handleClickStepRule(tmpRuleSelected, true, item, index);
                }
                if (nav_type === 2) {
                    handleClickStepRegion(tmpRegionSelected, tmpRuleSelected, item, index);
                }
            }
        } else {
            history.push('/home');
        }
    }, []);

    return (
        <div className={style.container}>
            <div className={style.hint}>{hint}</div>
            {/* 选择步骤条部分 Step */}
            <div className={style.selectedContainer}>
                {
                    ruleSelected && ruleSelected.map((item, index) => {
                        return (
                            <div className={style.selectedBox} key={index}
                                 onClick={handleClickStepRule.bind(this, ruleSelected, false, item, index)}>
                                <div className={style.outer}>
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
                        if (isRuleFinish) {
                            return (
                                <div
                                    className={style.selectedBox}
                                    key={index}
                                    onClick={handleClickStepRegion.bind(this, regionSelected, ruleSelected, item, index)}>
                                    <div className={style.outer}>
                                        <div className={style.desc}>
                                            {item.region_name}
                                        </div>
                                    </div>
                                    <div
                                        className={`${style.separator} ${isRegionFinish
                                        && index === regionSelected.length - 1 ? style.hidden : null}`}/>
                                </div>
                            )
                        }
                        return <></>
                    })
                }
            </div>
            {/* 具体选择部分 Option */}
            <div className={style.optionContainer}>
                {
                    optionList && optionList.map((item) => {
                        if (!isRuleFinish) {
                            return (
                                <div className={style.optionBox}
                                     onClick={handleClickOption.bind(this, item)}>
                                    {item.rule_name}
                                </div>
                            )
                        } else {
                            return (
                                <div className={`${style.optionBox} ${item.haveItem === 0 ? style.disable : null}`}
                                     onClick={handleClickOption.bind(this, item)}>
                                    {item.region_name}
                                </div>
                            )
                        }
                    })
                }
            </div>
            {/* 加载中图标提示部分 */}
            {
                <div className={style.loadingBox}>
                    <Spin spinning={optionList.length === 0}/>
                </div>
            }
            <Link to='/home'>
                <div className={style.homeBtn}>
                    回到首页
                </div>
            </Link>
        </div>
    )
}
