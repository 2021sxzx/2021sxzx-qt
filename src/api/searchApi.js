import service from "./http-search";

export function GetSearchRes(data) {
    return service.request({
        method: "get",
        url: "/search",
        params: data, //data:data同名可以直接写 data
    });
}

export function GetSearchWord(data) {
    return service.request({
        method: "get",
        url: "/showSearchWord",
        params: data, //data:data同名可以直接写 data
    });
}

export function GetHotList(data) {
    return service.request({
        method: "get",
        url: "/showHotWord",
        params: data, //data:data同名可以直接写 data
    });
}

export function AddOneClick(data) {
    return service.request({
        method: "get",
        url: "/addOneClick",
        params: data, //data:data同名可以直接写 data
    });
}
