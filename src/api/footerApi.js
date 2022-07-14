import service from "./http"

export function GetFooterData(req) {
    return service.request({
        method: "get",
        url: "/v1/core-settings",
        data: req
    })
}