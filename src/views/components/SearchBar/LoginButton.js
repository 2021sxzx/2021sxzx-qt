import {Button, Dropdown, Menu, message, Space} from "antd";
import {DownOutlined} from "@ant-design/icons";
import React from "react";
import {tyrzLoginRedirectURL, tyrzLogoutRedirectURL, tyrzURL} from "@/config/config";
import {logout} from "@/api/loginApi";

/**
 * 登录管理菜单
 * @type {JSX.Element}
 */
const UserMenu = (
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


const handleLogin = () => {
    // let curHref = window.location.href
    window.location.replace(`${tyrzURL}/pscp/sso/connect/page/oauth2/authorize/?client_id=tyrz_gzznzxpt&service=initService&scope=all&redirect_uri=${(encodeURIComponent(tyrzLoginRedirectURL))}&response_type=code`)
}

export const LoginButton = (props) => {
    if (props.userName === '') {
        return (
            <div>
                <Button
                    type="link"
                    // href={`${tyrzURL}/pscp/sso/connect/page/oauth2/authorize/?client_id=gzznzxpt&service=initService&scope=all&redirect_uri=${encodeURIComponent(tyrzLoginRedirectURL)}&response_type=code`}
                    onClick={handleLogin}
                >
                    登录
                </Button>
            </div>
        )
    } else {
        return (
            <div>
                <Dropdown overlay={UserMenu} trigger={['click']}>
                    <a onClick={(e) => e.preventDefault()}>
                        <Space>
                            {props.userName}
                            <DownOutlined/>
                        </Space>
                    </a>
                </Dropdown>
            </div>
        )
    }
}
