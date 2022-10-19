import service from "./http"

export function getItemNumber() {
    return service.request({
        method: "get",
        url: "v1/getItemAmount",
    })
}
