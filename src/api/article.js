import request from '@/utils/request'

export function addArticle(data) {
    return request({
      url: '/user/addArticle',
      method: 'post',
      data
    });
  }