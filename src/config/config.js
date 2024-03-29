console.log("NODE_ENV: ", process.env.NODE_ENV, "\n");
console.log("REACT_APP_ENV: ", process.env.REACT_APP_ENV, "\n");

// ip 地址
const localIP = "localhost", // 本地 ip
    // aliyunIP = "localhost",
    // zwyIP = "localhost";
    aliyunIP = "8.134.73.52", // 阿里云 ip
    zwyIP = "10.196.133.5"; // 政务云 ip

// 公众认证域名
const tyrzDomain = 'tyrz.gd.gov.cn',
    tyrzDomain_test = 'tyrztest.gd.gov.cn';
    

// 通信协议和各个端口
const protocol = "http://",
    https_protocol = "https://",
    searchPort = "5000",
    serverPort = "5001";

let searchApiURL, // setupProxy.js，只在 NODE_ENV === 'development' 中被调用。
    apiURL, // setupProxy.js，只在 NODE_ENV === 'development' 中被调用。
    httpBaseURL,
    httpSearchBaseURL,
    imgURL,
    tyrzURL,
    tyrzLoginRedirectURL,
    tyrzLogoutRedirectURL;

// const imgURL = "imgs/";

// 使用 start,test,production,build 命令时，会进入不同的 NODE_ENV。根据 NODE_ENV 初始化 URL 的 ip
switch (process.env.NODE_ENV) {
    case "development": // start 命令
        // 0. 初始化常量 URL
        httpBaseURL = "/api/";
        httpSearchBaseURL = "/searchApi/";

        // 1. 初始化 URL 的协议
        searchApiURL = protocol;
        apiURL = protocol;
        tyrzURL = https_protocol;
        tyrzLoginRedirectURL = https_protocol;
        tyrzLogoutRedirectURL = https_protocol;

        // 2. 根据 REACT_APP_ENV 设置 URL 中的 ip
        tyrzURL += tyrzDomain_test;
        tyrzLoginRedirectURL += '8.134.49.87';
        tyrzLogoutRedirectURL += '8.134.49.87';
        switch (process.env.REACT_APP_ENV) {
            case "local":
                searchApiURL += aliyunIP;
                apiURL += localIP;
                break;
            case "development":
                searchApiURL += aliyunIP;
                apiURL += aliyunIP;
                break;
            case "production":
                searchApiURL += zwyIP;
                apiURL += zwyIP;
                break;
            default:
                throw new Error(
                    `请正确设置 REACT_APP_ENV，目前未配置 test 环境。当前的 REACT_APP_ENV = ${process.env.REACT_APP_ENV}, NODE_ENV = ${process.env.NODE_ENV}`
                );
        }

        // 3. 添加端口和路径
        searchApiURL += `:${searchPort}/`;
        apiURL += `:${serverPort}/`;
        imgURL = apiURL + "imgs/";
        tyrzLoginRedirectURL += '/sxzx-qt/#/login';
        tyrzLogoutRedirectURL += '/sxzx-qt/#/logout';

        break;

    case "production": // production 和 build 命令
        // 1. 初始化 URL 的协议
        httpBaseURL = protocol;
        httpSearchBaseURL = protocol;
        tyrzURL = https_protocol;
        tyrzLoginRedirectURL = https_protocol;
        tyrzLogoutRedirectURL = https_protocol;

        switch (process.env.REACT_APP_ENV) {
            case "development":
                // httpBaseURL += aliyunIP;
                // httpSearchBaseURL += aliyunIP;
                tyrzURL += tyrzDomain_test;
                tyrzLoginRedirectURL += '8.134.49.87';
                tyrzLogoutRedirectURL += '8.134.49.87';
                httpBaseURL += localIP;
                httpSearchBaseURL += localIP;
                break;
            case "production":
                // httpBaseURL += zwyIP;
                // httpSearchBaseURL += zwyIP;
                tyrzURL += tyrzDomain;
                tyrzLoginRedirectURL += 'znzx.rsj.gz.gov.cn';
                tyrzLogoutRedirectURL += 'znzx.rsj.gz.gov.cn';
                httpBaseURL += localIP;
                httpSearchBaseURL += localIP;
                break;
            default:
                throw new Error(
                    `请正确设置 REACT_APP_ENV，目前未配置 test 环境。当前的 REACT_APP_ENV = ${process.env.REACT_APP_ENV}, NODE_ENV = ${process.env.NODE_ENV}`
                );
        }

        imgURL = "/imgs/";
        httpBaseURL += "/api/";
        httpSearchBaseURL += "/searchApi/";
        tyrzLoginRedirectURL += '/sxzx-qt/#/login';
        tyrzLogoutRedirectURL += '/sxzx-qt/#/logout';

        break;

    default:
        throw new Error(
            `请正确设置 NODE_ENV，目前未配置 test 环境。当前的 REACT_APP_ENV = ${process.env.REACT_APP_ENV}, NODE_ENV = ${process.env.NODE_ENV}`
        );
}


module.exports = {
    searchApiURL,
    apiURL,
    httpBaseURL,
    httpSearchBaseURL,
    imgURL,
    tyrzURL,
    tyrzLoginRedirectURL,
    tyrzLogoutRedirectURL,
};
