/*
 * @Author: Spring Breeze
 * @Date: 2021-03-01 18:43:48
 * @FilePath: \food-sharing-community\src\store\modules\user.js
 * @LastEditTime: 2021-03-03 20:58:18
 */
import { login, register } from '@/api/user';
import { getToken, setToken, removeToken } from '@/utils/jsToken';
import { Message } from 'element-ui';

const state = () => {
  return {
    loginDialog: true,
    token: getToken(),
  };
};

const mutations = {
  changeLoginDialog(state) {
    state.loginDialog = !state.loginDialog;
  },
  SET_TOKEN(state, setToken) {
    state.token = setToken;
  },
};

const actions = {
  login({ commit }, loginFrom) {
    return new Promise((resolve, reject) => {
      login(loginFrom)
        .then((res) => {
          const code = res.code;
          if (code == '200') {
            commit('SET_TOKEN', res.token);
            setToken(res.token);
            Message.success({
              message: '登陆成功',
              offset: 80,
            });
          } else {
            Message.error(res.msg);
          }
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  register({ commit }, registerFrom) {
    return new Promise((resolve, reject) => {
      register(registerFrom)
        .then((res) => {
          const code = res.code;
          if (code == '200') {
            commit('SET_TOKEN', res.token);
            setToken(res.token);

            Message.success({
              message: '注册成功',
              offset: 80,
            });
          } else {
            Message.error(res.msg);
          }
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  logout({ commit, state }) {
    commit('SET_TOKEN', '');
    removeToken();
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
