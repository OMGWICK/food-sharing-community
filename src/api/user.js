/*
 * @Author: Spring Breeze
 * @Date: 2021-03-01 18:43:48
 * @FilePath: \food-sharing-community\src\api\user.js
 * @LastEditTime: 2021-03-02 14:46:05
 */
import request from '@/utils/request';

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data,
  });
}

export function register(data) {
  return request({
    url: '/register',
    method: 'post',
    data,
  });
}

export function userInfo(params) {
  return request({
    url: '/user/info',
    method: 'get',
    params,
  });
}

export function postUserinfo(data) {
  return request({
    url: '/user/info',
    method: 'post',
    data,
  });
}
