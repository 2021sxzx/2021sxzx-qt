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
    const crHint2 ='粤公网安备44010402001594号 粤ICP备11001610号-1 网站标识码：4401000059';
    const crHint = '主办单位：广州市人力资源和社会保障局';

    let webDistinct ='4401000059';
    let YGWAB = '44010402001594';
    let YICPB = '11001610号-1';
    let YGWABweb = "http://www.beian.gov.cn/portal/registerSystemInfo?recordcode="+YGWAB;

    //参数修改接口
    /*const setwebDistinct = (e) => {

    }*/

    return (
        <div className={style.container}>
            <div className={style.contact}>
                <div className={style.ctContainer}>
                <div className={style.webInfo}>
                    <p>网站信息</p>
                    <div>
                        <a href='http://rsj.gz.gov.cn/gywz/gywm/content/post_2406743.html' target="_blank">关于我们</a>
                        <a href='http://rsj.gz.gov.cn/gywz/lxfs/content/post_7072540.html' target="_blank">联系方式</a>
                        <a href='http://rsj.gz.gov.cn/gywz/ysaq/content/post_2406744.html' target="_blank">隐私安全</a>
                        <a href='http://rsj.gz.gov.cn/gywz/wzsm/content/post_2406745.html' target="_blank">网站声明</a>
                        <a href='http://rsj.gz.gov.cn/gywz/wzdt/' target="_blank">网站地图</a>
                        <a href='http://rsj.gz.gov.cn/gywz/sybz/' target="_blank">使用帮助</a>
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
                    <div>
                    <a href="https://bszs.conac.cn/sitename?method=show&id=0BE1AC304F8E592CE053012819ACFC38" target="_blank">
                        <img src={Images.common.icDZJG}></img>
                    </a>
                    <a href="https://zfwzgl.www.gov.cn/exposure/jiucuo.html?site_code=4401000059&url=http%3A%2F%2Frsj.gz.gov.cn%2F" target="_blank">
                        <img src={Images.common.icZFWZZC}></img>
                    </a>
                    </div> 
                    <div>{crHint}</div>
                    <div>网站标识码：{webDistinct}</div>
                    <div>
                    <a href={YGWABweb} target="_blank">
                        <img src={Images.common.icYGWA}></img>粤公网安备 {YGWAB}号  
                    </a>
                    &emsp; 
                    <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank"> 
                    粤ICP备 {YICPB}
                    </a> 
                    </div>
                </div>
            </div>
            
            <div className={style.copyright}>
                <div className={style.crContainer}>
                    <img src={Images.common.icZFWZZC}></img>
                    <img src={Images.common.icDZJG}></img>
                    <div className={style.crInfo}>
                        <div>{ crHint }</div>
                        <div>
                            <img src={Images.common.icYGWA}></img>
                            { crHint2 }   
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )}  