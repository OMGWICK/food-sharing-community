import {
    login,
    register
} from '@/api/user'
import {
    getToken,
    setToken,
    removeToken
} from '@/utils/jsToken'
import {
    Message
} from 'element-ui'


const state = () => {
    return {
        loginDialog: true,
        token: getToken()
    }
}

const mutations = {
    changeLoginDialog(state) {
        state.loginDialog = !state.loginDialog
    },
    SET_TOKEN(state, setToken) {
        state.token = setToken
    }
}

const actions = {
    login({
        commit
    }, loginFrom) {
        return new Promise((resolve, reject) => {
            login(loginFrom).then(res => {
                const code = res.code
                if (code == '200') {
                    commit('SET_TOKEN', res.token)
                    setToken(res.token)
                    Message.success('登陆成功');
                } else {
                    Message.error(res.msg)
                }
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    },
    register({
        commit
    }, registerFrom) {
        return new Promise((resolve, reject) => {
            register(registerFrom).then(res => {
                const code = res.code
                if (code == '200') {
                    commit('SET_TOKEN', res.token)
                    setToken(res.token)
                    Message.success('注册成功');
                } else {
                    Message.error(res.msg)
                }
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}