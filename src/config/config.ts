/**
 * jwt的配置
 */
export const jwtConfig = {
    tokenExpiresTime: 1000 * 60 * 60 * 24 * 7,
    jwtSecret: 'AngelChatinSecret'
}
/**
 * 默认群组的配置
 */
export const defaultGroup = {
    groupName: 'Angel'
}

/**
 * 当前环境的host,静态文件目录
 */
const baseUrl: string = "http://localhost:3000";
export const staticDirname = '/static/';
export const staticDirPath = baseUrl + staticDirname;