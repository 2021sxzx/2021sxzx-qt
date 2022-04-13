/* 
    Images.js: 图片资源管理
*/

const imgPath = 'http://8.134.73.52:5001/imgs/';
// const imgPath = 'http://127.0.0.1:5001/imgs/';

export default {
    // 公共组件
    common: {
        icLogo: imgPath + 'ic_logo.png',
        icDelete: imgPath + 'ic_delete.png',
        icSearch: imgPath + 'ic_search.png',
        icPlaceholder: imgPath + 'ic_placeholder.png',
        icQrcode: imgPath + 'ic_qrcode.png',
        icZNKF: imgPath + 'ic_znkf.png',     // 智能客服图标
        icDZJG: imgPath + 'ic_dzjg.png',     // 党政机关图标
        icZFWZZC: imgPath + 'ic_zfwzzc.png',       // 政府网站找错图标
        icYGWA: imgPath + 'ic_ygwa.png',        // 粤公网安图标
        qrcodeApp: imgPath + 'qrcode_app.jpg',       // 穗好办APP二维码
        qrcodeWeb: imgPath + 'qrcode_web.png',       // 人社局官网二维码
        // qrcodeWechat: imgPath + ''     // 人社局微信公众号二维码
       
    },

    // 首页
    home: {         
        icGRYW: imgPath + 'ic_gryw.png',       // 个人业务图标
        icFRYW: imgPath + 'ic_fryw.png',        // 法人业务图标
        icLDBZ: imgPath + 'ic_ldbz.png',     // 劳动保障图标
        icRSRC: imgPath + 'ic_rsrc.png',        // 人事人才图标
        icSHBX: imgPath + 'ic_shbx.png',       // 社会保险图标
        icJYCY: imgPath + 'ic_jycy.png',        // 就业创业图标
        bannerPC: imgPath + 'banner_pc.jpg',
        bannerMB: imgPath + 'banner_mb.png'
    }
}