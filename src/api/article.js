/*
 * @Author: Spring Breeze
 * @Date: 2021-03-01 18:43:48
 * @FilePath: \food-sharing-community\src\api\article.js
 * @LastEditTime: 2021-03-02 19:22:02
 */
import request from '@/utils/request';

export function addArticle(data) {
  return request({
    url: '/user/addArticle',
    method: 'post',
    data,
  });
}

export function imgUpload(data) {
  return request({
    url: '/img/upload',
    method: 'post',
    data,
  });
}

export function articleLists(params) {
  return request({
    url: '/user/articleLists',
    method: 'get',
    params,
  });
}

//头像
export function userUrl(data) {
  return request({
    url: '/userurl',
    method: 'post',
    data,
  });
}

//获取文章列表

export function mineArticleLists(params) {
  return request({
    url: '/mine/articleLists',
    method: 'get',
    params,
  });
}
