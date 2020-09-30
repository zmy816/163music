import Cookie from "js-cookie";
const TOKEN_STR = "163token";
// 设置token
export function setToken(token){
    return Cookie.set(TOKEN_STR, token);
}
// 获取token
export function getToken(){
    return Cookie.get(TOKEN_STR);
}
// 移除token
export function removeToken(){
    return Cookie.remove(TOKEN_STR);
}