import React, {useState} from 'react'
import style from './SearchBar.module.scss'
import {Link, useHistory} from 'react-router-dom'
import {message} from 'antd'
import {Images} from '../../../assets'
// import {GetImages} from '../../../api/imageApi'

export default function SearchBar() {
    const history = useHistory();
    const [searchWord, setSearchWord] = useState('');

    const handleChangeWord = (e) => {
        setSearchWord(e.target.value);
    }

    const handleClickSearchBtn = () => {
        getSearchInfo();
    }

    const handleEnterSearch = (e) => {
        if (e.keyCode === 13) {
            getSearchInfo();
        }
    }

    const getSearchInfo = () => {
        if (searchWord) {
            history.push({
                pathname: '/searchPage',
                state: {inputValue: searchWord}
            })
        } else {
            message.error('请输入咨询关键词');
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

            <a target='_blank' rel='noreferrer'
               href='https://www.gdzwfw.gov.cn/?isLogin=false'>
                <div className={style.provService}>省政务服务</div>
            </a>

            <div className={style.searchBox}>
                <input
                    type='text'
                    maxLength='32'
                    placeholder='事项咨询'
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
