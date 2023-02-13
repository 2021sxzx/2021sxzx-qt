import service from './http'

export function login(code) {
    return service.request({
        method: 'get',
        url: `v1/login-by-code`,
        params: {
            code,
        },
    })
}

export function getInfo() {
    return service.request({
        method: 'get',
        url: 'v1/get-info',
    })
}

export function logout() {
    return service.request({
        method: 'get',
        url: 'v1/logout-tyrz',
    })
}
