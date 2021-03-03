/*
 * @Author: Spring Breeze
 * @Date: 2021-03-03 16:24:03
 * @FilePath: \food-sharing-community\src\api\comment.js
 * @LastEditTime: 2021-03-03 20:04:08
 */

import request from '@/utils/request';

//获取评论
export function getComment(params) {
  return request({
    url: '/getComment',
    method: 'get',
    params,
  });
}

//增加评论
export function addComment(data) {
  return request({
    url: '/addComment',
    method: 'post',
    data,
  });
}
//删除评论
export function delComment(data) {
  return request({
    url: '/delComment',
    method: 'delete',
    data,
  });
}
