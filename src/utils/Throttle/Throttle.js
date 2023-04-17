/**
 * 节流函数
 * @param fn 需要节流处理的回调函数
 * @param delay 节流的周期
 * @return {function(*): Promise<unknown>} 返回使用节流处理后的回调函数
 */
export function throttle(fn, delay) {
    let timeout = null

    // 返回使用节流处理后的回调函数
    return async (...callbackArguments) => {
        return new Promise(async (resolve, reject) => {
            // 如果没有定时器，就设置定事情并且调用 fn
            if (timeout === null) {
                try {
                    // 设置定时器，在定时器存在时不会重复调用 fn
                    timeout = setTimeout(() => {
                        // 取消定时器
                        timeout = null
                    }, delay)

                    // 由于有箭头函数来绑定 this，所以可以不用 apply来调用。
                    resolve(fn(...callbackArguments))
                } catch (err) {
                    reject(err)
                }
            } else {
                reject(new Error(throttleCDErrorMessage))
            }
        })
    }
}

export const throttleCDErrorMessage = '该函数在节流状态中，请不要在短时间内重复调用'
