import React, {useState} from 'react'
import style from './SearchBar.module.scss'
import {Link, useHistory} from 'react-router-dom'
import Images from '../../../assets/Images'

export default function SearchBar(props) {
    const history = useHistory();
    const [searchWord, setSearchWord] = useState('');

    const handleChangeWord = (e) => {
        setSearchWord(e.target.value);
    }

    const handleClickSearchBtn = () => {
        getSearchInfo();
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
            <Link to='/home'>
                <img src={Images.common.icLogo} className={style.logo} alt={'广州人社LOGO'}/>
            </Link>
            <Link to='/home'>
                <div className={style.homepage}>首页</div>
            </Link>

            <a
                target='_blank'
                rel='noreferrer'
                href='https://www.gdzwfw.gov.cn/?isLogin=false'
            >
                <div className={style.provService}>省政务服务</div>
            </a>

            <div className={style.searchBox}>
                <input
                    type='text'
                    maxLength='32'
                    placeholder='事项查询'
                    className={style.searchInput}
                    onChange={e => handleChangeWord(e)}
                    onKeyDown={e => handleEnterSearch(e)}/>
                <img
                    src={Images.common.icSearch}
                    className={style.searchBtn}
                    onClick={handleClickSearchBtn}
                    alt={"搜索"}/>
            </div>
        </div>

    )
}
