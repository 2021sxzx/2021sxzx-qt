import React, { useState } from 'react'
import style from './SearchBar.module.scss'
import { Link, useHistory } from 'react-router-dom'
import { DownOutlined } from '@ant-design/icons'
import { message, Dropdown, Menu, Space, Button } from 'antd'
import Images from '../../../assets/Images'
import { useEffect } from 'react'
import { getInfo, logout } from '../../../api/loginApi'

export default function SearchBar() {
    const history = useHistory()
    const [searchWord, setSearchWord] = useState('')

    const [userName, setUserName] = useState('lmw')

    // 获取登录状态
    useEffect(() => {
        // 匹配cookie
        let result = document.cookie.match(
            '(^|[^;]+)\\s*' + 'tyrz_identifier' + '\\s*=\\s*([^;]+)'
        )
        if (result) {
            getInfo()
                .then((res) => {
                    let result = res.data.data
                    if (result.code === 0) {
                        setUserName(result.name)
                    } else {
                        message.warn('登录过期，请重新登录')
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }, [])

    const handleChangeWord = (e) => {
        setSearchWord(e.target.value)
    }

    const handleClickSearchBtn = () => {
        getSearchInfo()
    }

    const handleEnterSearch = (e) => {
        if (e.keyCode === 13) {
            getSearchInfo()
        }
    }

    const getSearchInfo = () => {
        if (searchWord) {
            history.push({
                pathname: '/searchPage',
                state: { inputValue: searchWord },
            })
        } else {
            message.error('请输入咨询关键词')
        }
    }

    const menu = (
        <Menu>
            <Menu.Item>
                <a href="http://tyrztest.gd.gov.cn/pscp/sso/static/manage/info">
                    账号管理
                </a>
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
                        window.location.href="http://tyrztest.gd.gov.cn/_tif_sso_logout_/?redirect_uri=http%3A%2F%2F8.134.49.87%2Fsxzx-qt%2F%23%2Fhome0"
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
                    href="http://tyrztest.gd.gov.cn/pscp/sso/connect/page/oauth2/authorize/?client_id=gzznzxpt&service=initService&scope=all&redirect_uri=http%3A%2F%2F8.134.49.87%2Fsxzx-qt%2F%23%2Flogin&response_type=code"
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
            <Link to="/home" id='homepage'>
                <div className={style.homepage}>首页</div>
            </Link>

            <a
                target="_blank"
                rel="noreferrer"
                href="https://www.gdzwfw.gov.cn/?isLogin=false"
                id = 'provService'
            >
                <div className={style.provService}>省政务服务</div>
            </a>

            <div className={style.searchBox}>
                <input
                    type="text"
                    maxLength="32"
                    placeholder="事项咨询"
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
