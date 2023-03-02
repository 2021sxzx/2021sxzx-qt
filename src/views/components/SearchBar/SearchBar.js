import React, {useState} from 'react'
import style from './SearchBar.module.scss'
import {Link, useHistory} from 'react-router-dom'
import {message} from 'antd'
import Images from '../../../assets/Images'
import {useEffect} from 'react'
import {getInfo} from '../../../api/loginApi'
import {LoginButton} from "./LoginButton";

export default function SearchBar(props) {
    const history = useHistory()
    const [searchWord, setSearchWord] = useState('')

    const [userName, setUserName] = useState('')

    console.log('当前 userName 是', userName)
    // 如果检测到页面是从“往返缓存”中读取的，刷新页面
    useEffect(()=>{
        // 用户导航到网页时
        console.log('添加 pageshow 监听')
        document.addEventListener('pageshow',reloadPage)
        return ()=>{
            console.log('移除 pageshow 监听')
            document.removeEventListener('pageshow',reloadPage)
        }
    })

    /**
     * 如果在 cookie 发生变化并找到了 tyrz_identifier 字段，
     * 就根据这个字段使用 getInfo 接口向后端请求获取用户信息
     */
    useEffect(() => {
        const result = document.cookie.match(
            "(^|[^;]+)\\s*" + "tyrz_identifier" + "\\s*=\\s*([^;]+)"
        )
        if (result) {
            // console.log("开始定时器")
            // // setTimeout(()=>{
            // //     getUserInfo()
            // //     console.log("定时器结束")
            // // },1000)
            console.log('getUserInfo')
            getUserInfo()
        }
    })


    function getUserInfo() {
        getInfo()
            .then((res) => {
                if (res.data.code === 0) {
                    console.log('成功获取用户信息，userName 是', res.data.name)
                    setUserName(res.data.name)
                } else {
                    message.warn("登录过期，请重新登录")
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    function reloadPage(e) {
        if (e.persisted) {
            // 如果检测到页面是从“往返缓存”中读取的，刷新页面
            window.location.reload();
        }
    }

    const handleChangeWord = (e) => {
        setSearchWord(e.target.value)
    }

    const handleClickSearchBtn = () => {
        getSearchInfo()
    }

    const handleEnterSearch = (e) => {
        if (e.key === 'Enter') {
            handleClickSearchBtn();
        }
    }

    const getSearchInfo = () => {
        if (history.location.pathname !== '/searchPage') {
            if (searchWord) {
                history.push({
                    pathname: '/searchPage',
                    state: {inputValue: searchWord}
                })
            } else {
                history.push({
                    pathname: '/searchPage',
                    state: {inputValue: ''},
                })
            }
        } else {
            // 如果在搜索页面，调用搜索的函数
            if (props.searchInSearchPage) {
                props.searchInSearchPage(searchWord)
            }
        }
    }


    return (
        <div className={style.container}>
            <Link to="/home">
                <img
                    src={Images.common.icLogo}
                    className={style.logo}
                    alt={'广州人社LOGO'}
                />
            </Link>
            <Link to="/home" id="homepage">
                <div className={style.homepage}>首页</div>
            </Link>

            <a
                target="_blank"
                rel="noreferrer"
                href="https://www.gdzwfw.gov.cn/?isLogin=false"
                id="provService"
            >
                <div className={style.provService}>省政务服务</div>
            </a>

            <div className={style.searchBox}>
                <input
                    type='text'
                    maxLength='32'
                    placeholder='事项查询'
                    className={style.searchInput}
                    onChange={(e) => handleChangeWord(e)}
                    onKeyDown={(e) => handleEnterSearch(e)}
                />
                <img
                    src={Images.common.icSearch}
                    className={style.searchBtn}
                    onClick={handleClickSearchBtn}
                    alt={'搜索'}
                />
            </div>

            <LoginButton userName={userName}/>
        </div>
    )
}
