import React, { useEffect, useState } from 'react'
import style from './SearchBar.module.scss'
import { Link, useHistory } from 'react-router-dom'
import { message } from 'antd'
import { Images } from '../../../assets'
import { GetImages } from '../../../api/imageApi'

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
                state: { inputValue: searchWord }
            })
        } else {
            message.error('请输入咨询关键词');
        }
    }

    const loadImg = async (imgName) => {
        let req = {
            name: imgName
        }
        await GetImages(req).then(res => {
            var buf = new Buffer(res.data);
            console.log(buf);
            var b = new Blob([buf.buffer], {type: 'image/png'});
            console.log(b);
            var reader = new FileReader();
            
            reader.onload = () => {
                console.log('onload: ', reader);
                // createImg(reader.result);
            }
            reader.readAsDataURL(b);
        })
    }

    const createImg = (url) => {
        var img = document.createElement('img');
        img.src = url;
        document.body.appendChild(img);
    }

    useEffect(() => {
        // loadImg('ic_logo.png');
        // console.log('1111');
        // console.log(localStorage['ic_logo.png']);
        // createImg(localStorage['ic_logo.png']);
    }, [])

    return (
        <div className={style.outerShadow}>     
            <div className={style.container}>
                <Link to='/home'>
                    <img src={Images.common.icLogo} className={style.logo}></img>
                </Link>
                <Link to='/home'>
                    <div className={style.homepage}>首页</div>
                </Link>
                <div className={style.dropdown}>
                    <div className={style.consultMenu}>事项咨询</div>
                    <div className={style.menu}>
                        <p>个人业务</p>
                        <p>法人业务</p>
                        <p>事业单位业务</p>
                    </div>
                </div>
                <a target='_blank' rel='noreferrer'  
                    href='https://www.gdzwfw.gov.cn/?isLogin=false'>
                    <div className={style.provService}>省政务服务</div>
                </a> 
                <div className={style.searchBox}>
                    <input 
                        type='text'
                        maxLength='15' 
                        placeholder='事项咨询' 
                        className={style.searchInput} 
                        onChange={e => handleChangeWord(e)}
                        onKeyDown={e => handleEnterSearch(e)}/>
                    <img 
                        src={Images.common.icSearch} 
                        className={style.searchBtn}
                        onClick={handleClickSearchBtn}/>
                </div>
            </div>
        </div>
    )}  