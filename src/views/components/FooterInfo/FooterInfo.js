import React from 'react'
import style from './FooterInfo.module.scss'
import Images from '../../../assets/Images'
import {useEffect} from 'react';
import {GetFooterData} from '../../../api/footerApi'
import {useState} from 'react';

export default function FooterInfo() {
    /*
    TODO:  修改底部敏感信息
    const mainName = '广州市人社局';
    const appName = '穗好办';
    const ctPhone1 = '020-12345';
    const ctPhone2 = '020-68127853';
    */

    const [footerData, setFooterData] = useState({})

    //参数修改接口
    /*const setwebDistinct = (e) => {
    }*/

    //启动时获取数据
    useEffect(() => {
        GetFooterData().then(
            (response) => {
                setFooterData(response.data.data)
            }
        ).catch(error => console.log(error))
    }, [])

    return (
        <div className={style.container}>
            <div className={style.contact}>
                <div className={style.ctContainer}>
                    {/*网站信息*/}
                    <div className={style.webInfo}>
                        <p className={style.webTitle}>网站信息</p>
                        <div className={style.webHyperBox}>
                            <a className={style.webHyperLinker} href={footerData.url_about_us} target="_blank">关于我们</a>
                            <a className={style.webHyperLinker} href={footerData.url_contact_detail}
                               target="_blank">联系方式</a>
                            <a className={style.webHyperLinker} href={footerData.url_privacy_security}
                               target="_blank">隐私安全</a>
                            <a className={style.webHyperLinker} href={footerData.url_website_statement}
                               target="_blank">网站声明</a>
                            <a className={style.webHyperLinker} href={footerData.url_website_map}
                               target="_blank">网站地图</a>
                            <a className={style.webHyperLinker} href={footerData.url_help} target="_blank">使用帮助</a>
                        </div>
                    </div>
                    {/*二维码*/}
                    <div className={style.relevantCode}>
                        <div className={`${style.dropdownWeb} ${style.dropdown}`}>
                            <div className={style.dropdownDesc}>
                                <img className={style.dropdownIcon} src={Images.common.icQrcode}
                                     alt={'广州人社图标'} loading="lazy"/>
                                广州人社官网
                            </div>
                            <div className={`${style.webContent} ${style.content}`}>
                                <img className={style.QRCode} src={Images.common.qrcodeWeb}
                                     alt={'广州人社官网二维码'} loading="lazy"/>
                            </div>
                        </div>
                        <div className={`${style.dropdownWechat} ${style.dropdown}`}>
                            <div className={style.dropdownDesc}>
                                <img className={style.dropdownIcon} src={Images.common.icQrcode}
                                     alt={'广州人社微信公众号图标'} loading="lazy"/>
                                广州人社微信公众号
                            </div>
                            <div className={`${style.wechatContent} ${style.content}`}>
                                <img className={style.QRCode} src={Images.common.qrcodeWechat}
                                     alt={'广州人社微信公众号二维码'} loading="lazy"/>
                            </div>
                        </div>
                        <div className={`${style.dropdownApp} ${style.dropdown}`}>
                            <div className={style.dropdownDesc}>
                                <img className={style.dropdownIcon} src={Images.common.icQrcode}
                                     alt={'穗好办APP图标'} loading="lazy"/>
                                穗好办APP
                            </div>
                            <div className={`${style.appContent} ${style.content}`}>
                                <img className={style.QRCode} src={Images.common.qrcodeApp}
                                     alt={'穗好办APP二维码'} loading="lazy"/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={style.crHintContainer}>
                    <div>
                        <a href="https://bszs.conac.cn/sitename?method=show&id=0BE1AC304F8E592CE053012819ACFC38"
                           target="_blank">
                            <img src={Images.common.icDZJG} alt={'广州市人力资源和社会保障局'}/>
                        </a>
                        <a href="https://zfwzgl.www.gov.cn/exposure/jiucuo.html?site_code=4401000059&url=http%3A%2F%2Frsj.gz.gov.cn%2F"
                           target="_blank">
                            <img src={Images.common.icZFWZZC} alt={'我要找错'}/>
                        </a>
                    </div>
                    <div>版权所有：{footerData.copyright}</div>
                    <div>网站标识码：{footerData.siteCode}</div>
                    <div>
                        <a href={footerData.url_icp_record} target="_blank">
                            <img src={Images.common.icYGWA} alt={'粤公网安备图标'}/>
                            {footerData.network_record_number}
                        </a>
                        &emsp;
                        <a href={footerData.url_network_record} target="_blank">
                            {footerData.ICP_record_number}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
