import './Search.scss'
import React, {useEffect, useRef, useState, useCallback} from "react";
import style from "./SearchPage.module.scss";
import SearchItem from "./components/SearchItem";
import HotList from "./components/HotList";
import {Input, Radio, AutoComplete, Button, message, Pagination, Modal} from 'antd';

import {GetHotList, GetSearchRes, GetSearchWord} from "@/api/searchApi";
import {useLocation} from "react-router-dom";

// const { Option } = Select;
// const sortOptions = [
//     {label: '智能排序', value: 'score'},
//     {label: '时间降序', value: 'ascendingTime'},
//     {label: '时间升序', value: 'descendingTime'},
//
// ];

const contentOptions = [
    {label: '标题或正文', value: 'all'},
    {label: '标题', value: 'title'},
    {label: '正文', value: 'content'},
];
const timeOptions = [
    {label: '全部时间', value: 'all'},
    {label: '一天以内', value: 'day'},
    {label: '一周以内', value: 'week'},
    {label: '一月以内', value: 'month'},
    {label: '一年以内', value: 'year'},
];


// const washSearchData = (dataList) => {
//     dataList.map((item) => {
//         // item.title=item.title.substr(0,item.title.length-5)
//         let materialTxt = ''
//         item.material.map((text) => {
//             materialTxt += text
//         })
//         item.material = materialTxt
//     })
//     return dataList
// }

export default function SearchPage() {
    // const [sortValue, setSortValue] = useState('score')
    const [contentValue, setContentValue] = useState('all')
    const [timeValue, setTimeValue] = useState('all')
    const [areaModalVisible, setAreaModalVisible] = useState(false)
    const [areaModalData, setAreaModalData] = useState({area: []})
    const location = useLocation()
    const [searchList, setSearchList] = useState([
        {
            title: "请输入咨询关键词",
            link: "",
            content: "",
            date: "",
            area: "",
        },
    ]);
    const [showSearchList, setShowSearchList] = useState([
        {
            title: "请输入咨询关键词",
            link: "",
            content: "",
            date: "",
            area: [],
        },
    ]);
    const [hotList, setHotList] = useState([])
    const [inputValue, setInputValue] = useState('')
    const [keywordList, setKeywordList] = useState([])

    // 获取热词列表
    useEffect(() => {
        GetHotList().then(res => {
            let tempHotList = []
            res?.data?.data?.forEach(item => {
                tempHotList.push({word: item[1], freq: item[0]})
            })
            setHotList(tempHotList)
        }).catch(error => {
            message.error('获取热词失败，请检查网络')
            console.log(`GetHotList error: ${error}`)
        })
    }, [])

    useDidUpdateEffect(() => {
        handleSearch()
    }, [timeValue, contentValue])

    // const sortOnChange = e => {
    //     console.log('sortValue checked', e.target.value);
    //     setSortValue(e.target.value)
    // };

    // 根据 inputValue 来搜索。
    const handleSearch = useCallback((value = inputValue) => {
        if (!value) {
            message.error('请输入咨询关键词');
            return
        }

        if (typeof value !== 'string') {
            message.error('请输入字符串')
        }

        let data = {
            keyword: value,
            searchMode: "score",
            contentMode: contentValue,
            timeFilter: timeValue
        }

        GetSearchRes(data).then(res => {
            let searchRes = res.data.data
            if(searchRes === null){
                throw new Error('searchList is null')
            }
            setSearchList(searchRes)
            setShowSearchList(searchRes.slice(0, 10))
        }).catch(err => {
            message.error('搜索失败，请稍后重试')
            console.log(`GetSearchRes error: ${err}`)
        })
    },[contentValue, inputValue, timeValue])

    const setInputValueAndSearch = useCallback((value) => {
        setInputValue(value)
        handleSearch(value)
    },[handleSearch])

    // 从其他页面的搜索栏跳转时，获取搜索栏的搜索值
    useEffect(() => {
        if (location.state && location.state.inputValue) {
            setInputValueAndSearch(location.state.inputValue)
        }
    }, [])

    const timeOnChange = e => {
        console.log('timeValue checked', e.target.value);
        setTimeValue(e.target.value)
    };
    const contentOnChange = e => {
        console.log('contentValue checked', e.target.value);
        setContentValue(e.target.value)
    };

    const inputOnChange = e => {
        setInputValue(e);
        getKeywordList(e)
    }
    const getKeywordList = (content) => {  //获取搜索推荐词
        let data = {
            keyword: content,
        }
        GetSearchWord(data).then(res => {
            console.log('GetSearchWord res', res)
            let keywordRes = res.data.data
            let tempKeywordList = []
            if (keywordRes != null && keywordRes.length > 0) {
                keywordRes.forEach(item => {
                    tempKeywordList.push({value: item})
                })
                setKeywordList(tempKeywordList)
            }
        }).catch(err => {
            message.error('搜索失败，请稍后重试')
            console.log(`GetSearchWord error: ${err}`)
        })
    }

    const changePageNumber = (pageNumber) => {
        let show = searchList.slice(10 * (pageNumber - 1), 10 * pageNumber)
        setShowSearchList(show)
    }

    const getAreaData = (data) => {
        setAreaModalData(data)
        setAreaModalVisible(true)
    }
    const handleAreaModalCancel = () => {
        setAreaModalVisible(false)
    }

    const handleClickItem = (item, title) => {
        if (item.children.area.length === 0) {
            if (!title) {
                message.error('空事项指南');
                return
            }
            window.open(item.link, '_self');
        } else {
            setAreaModalData(item.children)
        }

    }

    function useDidUpdateEffect(fn, inputs) {  //初次渲染不执行的useEffect
        const didMountRef = useRef(false);
        useEffect(() => {
            if (didMountRef.current) fn();
            else didMountRef.current = true;
        }, inputs);
    }


    return (
        <>
            <div className={style.container}>
                <div className={style.SearchPageContainer}>
                    <div className={style.content}>
                        <Input.Group compact className='inputGroup'>
                            <span className='inputTitle'>全站搜索:</span>
                            <AutoComplete
                                className='autoComplete'
                                placeholder="请输入搜索关键词"
                                options={keywordList}
                                size="large"
                                onChange={inputOnChange}
                                value={inputValue}
                                onKeyDown={
                                    e => {
                                        if (e.key === 'Enter') {
                                            handleSearch();
                                        }
                                    }
                                }
                            />
                            <Button
                                className='inputButton'
                                size="large"
                                type="primary"
                                onClick={() => {
                                    handleSearch()
                                }}
                            >搜索</Button>
                        </Input.Group>

                        <div className='searchOptionContainer'>
                            {/*<div className='subContainer'>*/}
                            {/*    <Radio.Group*/}
                            {/*        options={sortOptions}*/}
                            {/*        onChange={sortOnChange}*/}
                            {/*        value={sortValue}*/}
                            {/*        optionType="button"*/}
                            {/*        buttonStyle="solid"*/}
                            {/*        className='searchOption'*/}
                            {/*    />*/}
                            {/*</div>*/}

                            <div className='subContainer'>
                                <Radio.Group
                                    options={contentOptions}
                                    onChange={contentOnChange}
                                    value={contentValue}
                                    optionType="button"
                                    buttonStyle="solid"
                                    className='searchOption'
                                />
                            </div>

                            <div className='subContainer'>
                                <Radio.Group
                                    options={timeOptions}
                                    onChange={timeOnChange}
                                    value={timeValue}
                                    optionType="button"
                                    buttonStyle="solid"
                                    className='searchOption'
                                />
                            </div>
                        </div>

                        <div className={style.mainContainer}>
                            <div className={style.searchListContainer}>
                                {
                                    showSearchList.map((item, index) => {
                                        return (
                                            <SearchItem
                                                key = {index}
                                                data={item}
                                                setAreaData={getAreaData}
                                            />
                                        )
                                    })
                                }
                            </div>
                            <div className={style.hotListContainer}>
                                <HotList wordList={hotList} handler={setInputValueAndSearch}/>
                            </div>
                        </div>

                        <div>
                            <Pagination
                                showQuickJumper s
                                howSizeChanger={false}
                                defaultCurrent={1}
                                total={searchList.length}
                                onChange={changePageNumber}
                            />
                        </div>
                    </div>
                </div> 
            </div>

            <Modal
                title="请选择办事情景"
                visible={areaModalVisible}
                okButtonProps={{
                    style: {
                        display: 'none'
                    }
                }}
                onCancel={handleAreaModalCancel}
                cancelText={'取消'}
            >
                {
                    areaModalData.area.map(item => {
                        return (
                            <>
                                <Button onClick={() => {
                                    handleClickItem(item, areaModalData.title)
                                }}>{item.name}</Button>
                            </>
                        )
                    })
                }
            </Modal>
        </>
    )
}
