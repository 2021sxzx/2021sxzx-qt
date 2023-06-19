import React, { Suspense, lazy } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'

// 懒加载和代码分割
const SearchBar = lazy(() => {
    return import('@/components/SearchBar/SearchBar.js')
})
const FooterInfo = lazy(() => {
    return import('@/components/FooterInfo/FooterInfo.js')
})
const Login = lazy(() => {
    return import('@/pages/LoginPage/Login.js')
})

const GuideResult = lazy(() => {
    return import('@/pages/GuideResult/GuideResult')
})

const SearchPage = lazy(() => {
    return import('@/pages/SearchPage/SearchPage.js')
})

const Home = lazy(() => {
    return import('@/pages/HomePage/HomePage.js')
})

const Navigation = lazy(() => {
    return import('@/pages/Navigation/Navigation.js')
})

export default function IndexRouter() {
    return (
        <HashRouter>
            <Suspense fallback={<div>正在加载中，请稍后...</div>}>
                <SearchBar/>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/v1/taskResult" component={GuideResult} />
                    <Route path="/searchPage" component={SearchPage} />
                    <Route path="/home" component={Home} />
                    <Route path="/navigation" component={Navigation} />
                    <Route
                        path="/logout"
                        component={() => {
                            window.history.back(-1)
                        }}
                    />
                    <Route path='/' component={Home}/>
                </Switch>
                <FooterInfo/>
            </Suspense>
        </HashRouter>
    )
}
