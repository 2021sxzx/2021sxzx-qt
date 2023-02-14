import { useLocation } from 'react-router-dom'
import { login } from '../../api/loginApi'
import { useEffect } from 'react'
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
                window.history.go(-4)
            })
    }, [code])

    return <>登录中，请稍等...</>
}
