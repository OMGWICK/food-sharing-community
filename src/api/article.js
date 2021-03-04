/*
 * @Author: Spring Breeze
 * @Date: 2021-03-01 18:43:48
 * @FilePath: \food-sharing-community\src\api\article.js
 * @LastEditTime: 2021-03-04 21:11:02
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

//获取精选
export function goodArticleList(params) {
  return request({
    url: '/good/articleList',
    method: 'get',
    params,
  });
}

//获取详情
export function detailArticleList(params) {
  return request({
    url: '/detail/articleList',
    method: 'get',
    params,
  });
}

//收藏文章
export function postCollection(data) {
  return request({
    url: '/postCollection',
    method: 'post',
    data,
  });
}
//取消收藏
export function deleteCollection(data) {
  return request({
    url: '/deleteCollection',
    method: 'delete',
    data,
  });
}
//获取收藏状态
export function statusCollection(data) {
  return request({
    url: '/status/collection',
    method: 'post',
    data,
  });
}
//获取收藏文章
export function getCollection(params) {
  return request({
    url: '/getCollection',
    method: 'get',
    params,
  });
}

export function oldLists(params) {
  return request({
    url: '/oldLists',
    method: 'get',
    params,
  });
}
