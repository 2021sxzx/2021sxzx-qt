import React, {Suspense, lazy} from 'react'
import {HashRouter, Route, Switch} from 'react-router-dom'
// import Login from '../views/LoginPage/Login.js'
// import GuideResult from '../views/GuideResult/GuideResult'
// import SearchPage from '../views/SearchPage/SearchPage.js'
// import Home from '../views/HomePage/HomePage.js'
// import Navigation from '../views/Navigation/Navigation.js'

// 懒加载和代码分割
const Login = lazy(() => {
    return import('../views/LoginPage/Login.js')
})

const GuideResult = lazy(() => {
    return import('../views/GuideResult/GuideResult')
})

const SearchPage = lazy(() => {
    return import('../views/SearchPage/SearchPage.js')
})

const Home = lazy(() => {
    return import('../views/HomePage/HomePage.js')
})

const Navigation = lazy(() => {
    return import('../views/Navigation/Navigation.js')
})

export default function IndexRouter() {
    return (
        <HashRouter>
            <Suspense fallback={<div>正在加载中，请稍后...</div>}>
                <Switch>
                    <Route path='/login' component={Login}/>
                    <Route path='/v1/taskResult' component={GuideResult}/>
                    <Route path='/searchPage' component={SearchPage}/>
                    <Route path='/home0' component={Home}/>
                    <Route path='/navigation' component={Navigation}/>
                    {/*<Route path='/' component={Home}/>*/}
                </Switch>
            </Suspense>
        </HashRouter>

    )
}
