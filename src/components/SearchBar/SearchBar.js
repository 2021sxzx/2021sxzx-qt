import React, {useState} from 'react'
import style from './SearchBar.module.scss'
import {Link, useHistory} from 'react-router-dom'
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {message} from 'antd'
import Images from '@/assets/Images'
import {useEffect} from 'react'
import {getInfo} from '@/api/loginApi'
import {LoginButton} from "./LoginButton";
import {tyrzURL} from "@/config/config";


export default function SearchBar() {
    const history = useHistory()
    const [searchWord, setSearchWord] = useState('')

    const [userName, setUserName] = useState('')

    const [modal, contextHolder] = Modal.useModal();
    // 如果检测到页面是从“往返缓存”中读取的，刷新页面
    useEffect(()=>{
        // 用户导航到网页时
        document.addEventListener('pageshow',reloadPage)
        return ()=>{
            document.removeEventListener('pageshow',reloadPage)
        }
    })

    /**
     * 如果在 cookie 发生变化并找到了 tyrz_identifier 字段，
     * 就根据这个字段使用 getInfo 接口向后端请求获取用户信息
     */
    useEffect(() => {
        const result = document.cookie.match(
            // eslint-disable-next-line no-useless-concat
            "(^|[^;]+)\\s*" + "tyrz_identifier" + "\\s*=\\s*([^;]+)"
        )
        if (result) {
            setTimeout(()=>{
                getUserInfo()
            },300)

            // console.log('getUserInfo')
            // getUserInfo()
        }
    })

    const confirm = () => {
        modal.confirm({
          title: '温馨提示',
          icon: <ExclamationCircleOutlined />,
          content: '业务办理要求账号等级达到四级（L2）以上',
          okText: '确认',
          cancelText: '取消',
          onOk() {
            window.location.assign(`${tyrzURL}/pscp/sso/static/manage/realname?key=realname`)
          },
        });
    };

    const allLevel = {
        L0: 0,
        L1: 1,
        L2: 2,
        L3: 3
    }

    function getUserInfo() {
        getInfo()
            .then((res) => {
                if (res.data.code === 0) {
                    setUserName(res.data.name)
                    //TODO 判断用户等级，提醒用户实名验证
                    if(res.data.level){
                        if(allLevel[res.data.level] < allLevel.L2){
                            confirm()
                        }
                    }
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
        // if (history.location.pathname !== '/searchPage') {
            
        // } else {
        //     // 如果在搜索页面，调用搜索的函数
        //     if (props.searchInSearchPage) {
        //         props.searchInSearchPage(searchWord)
        //     }
        // }
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

            {contextHolder}
        </div>
    )
}
