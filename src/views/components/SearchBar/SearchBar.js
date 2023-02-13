import React, { useState } from 'react'
import style from './SearchBar.module.scss'
import { Link, useHistory } from 'react-router-dom'
import { DownOutlined } from '@ant-design/icons'
import { message, Dropdown, Menu, Space, Button } from 'antd'
import Images from '../../../assets/Images'
import { useEffect } from 'react'
import { getInfo, logout } from '../../../api/loginApi'
import { tyrzURL, tyrzLoginRedirectURL, tyrzLogoutRedirectURL } from '../../../config/config'

export default function SearchBar(props) {
    const history = useHistory()
    const [searchWord, setSearchWord] = useState('')

    const [userName, setUserName] = useState('')

    // 获取登录状态
    useEffect(() => {
        // 匹配cookie
        let result = document.cookie.match(
            '(^|[^;]+)\\s*' + 'tyrz_identifier' + '\\s*=\\s*([^;]+)'
        )
        if (result) {
            getInfo()
                .then((res) => {
                    if (res.data.code === 0) {
                        setUserName(res.data.name)
                    } else {
                        message.warn('登录过期，请重新登录')
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    })

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

    const menu = (
        <Menu>
            <Menu.Item>
                <a href={`${tyrzURL}/pscp/sso/static/manage/info`}>账号管理</a>
            </Menu.Item>
            <Menu.Item>
                <div
                    onClick={() => {
                        // 访问后端接口登出
                        logout()
                            .then(() => {
                                message.success('登出成功')
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                        // 调用统一身份认证平台接口登出
                        window.location.href = `${tyrzURL}/_tif_sso_logout_/?redirect_uri=${encodeURIComponent(tyrzLogoutRedirectURL)}`
                    }}
                >
                    退出登录
                </div>
            </Menu.Item>
        </Menu>
    )
    const LoginButton = () => (
        <div className={style.loginButton}>
            {userName === '' ? (
                <Button
                    type="link"
                    href={`${tyrzURL}/pscp/sso/connect/page/oauth2/authorize/?client_id=gzznzxpt&service=initService&scope=all&redirect_uri=${encodeURIComponent(tyrzLoginRedirectURL)}&response_type=code`}
                >
                    登录
                </Button>
            ) : (
                <Dropdown overlay={menu} trigger={['click']}>
                    <a onClick={(e) => e.preventDefault()}>
                        <Space>
                            {userName}
                            <DownOutlined />
                        </Space>
                    </a>
                </Dropdown>
            )}
        </div>
    )

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

            <LoginButton />
        </div>
    )
}
