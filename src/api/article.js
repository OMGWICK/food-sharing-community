import request from '@/utils/request'

export function addArticle(data) {
    return request({
      url: '/user/addArticle',
      method: 'post',
      data
    });
  }

export function imgUpload(data) {
    return request({
      url: '/img/upload',
      method: 'post',
      data
    });
  }

export function articleLists(params) {
    return request({
      url: '/user/articleLists',
      method: 'get',
      params
    });
  }