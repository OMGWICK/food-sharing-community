/*
 * @Author: Spring Breeze
 * @Date: 2021-03-01 18:43:48
 * @FilePath: \food-sharing-community\src\utils\jsToken.js
 * @LastEditTime: 2021-03-03 20:49:33
 */
import Cookies from 'js-cookie';

const TokenKey = 'gourmet_share_token';

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}
