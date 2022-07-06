import React from 'react'
import { Link } from 'react-router-dom'
import style from './FooterInfo.module.scss'
import { Images } from '../../../assets'

export default function FooterInfo() {
    
    /*
    TODO:  修改底部敏感信息
    const mainName = '广州市人社局';
    const appName = '穗好办';
    const ctPhone1 = '020-12345';
    const ctPhone2 = '020-68127853';
    */
    
    const mainName = '';
    const appName = '';
    const ctPhone1 = 'phoneNum-1';
    const ctPhone2 = 'phoneNum-2';
    const crHint1 = '主办单位：广州市人力资源和社会保障局';
    const crHint2 = '粤公网安备44010402001594号 粤ICP备11001610号-1 网站标识码：4401000059';

    return (
        <div className={style.container}>
            <div className={style.contact}>
                <div className={style.ctContainer}>
                <div className={style.webInfo}>
                    <p>网站信息</p>
                    <div>
                        <a href='http://rsj.gz.gov.cn/gywz/gywm/content/post_2406743.html'>关于我们</a>
                        <a href='http://rsj.gz.gov.cn/gywz/lxfs/content/post_7072540.html'>联系方式</a>
                        
                        <a href='http://rsj.gz.gov.cn/gywz/ysaq/content/post_2406744.html'>隐私安全</a>
                        <a href='http://rsj.gz.gov.cn/gywz/wzsm/content/post_2406745.html'>网站声明</a>
                    </div>
                </div>

                <div className={style.relevantCode}>
                    <div className={`${style.dropdownWeb} ${style.dropdown}`}>
                        <div className={style.dropdownDesc}>
                            <img src={Images.common.icQrcode}></img> {mainName}官网
                        </div>
                        <div className={`${style.webContent} ${style.content}`}>
                            <img src={Images.common.qrcodeWeb}></img>
                        </div>
                    </div>
                    <div className={`${style.dropdownWechat} ${style.dropdown}`}>
                        <div className={style.dropdownDesc}>
                            <img src={Images.common.icQrcode}></img> {mainName}微信公众号
                        </div>
                        <div className={`${style.wechatContent} ${style.content}`}>
                            <img src={Images.common.qrcodeWechat}></img>
                        </div>
                    </div>
                    <div className={`${style.dropdownApp} ${style.dropdown}`}>
                        <div className={style.dropdownDesc}>
                            <img src={Images.common.icQrcode}></img> {appName}APP
                        </div>
                        <div className={`${style.appContent} ${style.content}`}>
                            <img src={Images.common.qrcodeApp}></img>
                        </div>
                    </div>
                </div>
                </div>

                <div className={style.crHintContainer}>
                    <div>{crHint1}</div>
                    <br></br>
                    <div><img src={Images.common.icYGWA}></img>粤公网安备 44010402001594号 粤ICP备 11001610号-1 网站标识码：4401000059</div>
                </div>
            </div>
            
            <div className={style.copyright}>
                <div className={style.crContainer}>
                    <img src={Images.common.icZFWZZC}></img>
                    <img src={Images.common.icDZJG}></img>
                    <div className={style.crInfo}>
                        <div>{ crHint1 }</div>
                        <div>
                            <img src={Images.common.icYGWA}></img>
                            { crHint2 }   
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )}  