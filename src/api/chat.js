/*
 * @Author: Spring Breeze
 * @Date: 2021-03-05 17:17:45
 * @FilePath: \food-sharing-community\src\api\chat.js
 * @LastEditTime: 2021-03-05 17:43:40
 */
import request from '@/utils/request';

export function chatData(params) {
  return request({
    url: '/chat/data',
    method: 'get',
    params,
  });
}

export function chatSend(data) {
  return request({
    url: '/chat/send',
    method: 'post',
    data,
  });
}
