import { useLocation } from 'react-router-dom'
import { login } from '@/api/loginApi'
import { useEffect } from 'react'
import { useState } from 'react'
export default function Login() {
    // 获取url中的code参数
    let { search } = useLocation()
    let code = new URLSearchParams(search).get('code')
    
    // 携带code调用后端登录接口
    useEffect(() => {
        login(code)
            .then(() => {
                console.log('login success')
            })
            .catch((err) => {
                console.log(err)
            })
            // 返回上上级界面
            .finally(() => {
                // window.location.replace('https://8.134.49.87/sxzx-qt/#/home')
                
                window.location.replace('https://znzx.rsj.gz.gov.cn/sxzx-qt/#/home')
            })
    }, [code])

    return <>登录中，请稍等...</>
}
