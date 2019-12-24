import request from '@/utils/request'
import Qs from 'qs'

// request.get('/login').then(res => {
//     console.log(res)
// })

// request({
//     method: 'get',
//     url: '/login'
// }).then(res => {
//     console.log(res)
// })

export default {
    check(obj) {
        const req = request({
            method: 'post',
            url: '/login',
            data: Qs.stringify(obj)
        })
        return req
    },
    login() {
        const req = request({
            method: 'get',
            url: '/login'
        })
        return req
    }
}