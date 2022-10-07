/*
    navigationApi: 导航接口管理
*/
import service from "./http"

export function GetRules(req) {
    return service.request({
        method: "post",
        url: "/v1/getRules",
        data: req
    })
}

export function GetRegions(req) {
    return service.request({
        method: "post",
        url: "/v1/getRegions",
        data: req
    })
}

export function GetItems(req) {
    return service.request({
        method: "post",
        url: "/v1/getItems",
        data: req
    })
}

export function GetRegionPaths(req) {
    return service.request({
        method: "post",
        url: "/v1/getRegionPaths",
        data: req
    })
}

export function GetRulePaths(req) {
    return service.request({
        method: "post",
        url: "/v1/getRulePaths",
        data: req
    })
}

export function GetChildRegionsByRuleAndRegion(req) {
    return service.request({
        method: "post",
        url: "/v1/getChildRegionsByRuleAndRegion",
        data: req
    })
}
