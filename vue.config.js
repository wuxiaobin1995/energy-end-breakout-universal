/*
 * @Author      : Mr.bin
 * @Date        : 2021-09-08 10:43:09
 * @LastEditTime: 2022-03-09 10:19:19
 * @Description : vue.config.js
 */
module.exports = {
  pluginOptions: {
    electronBuilder: {
      /* 开启node集成 */
      nodeIntegration: true,
      /* 加载编译原生模块 */
      externals: ['serialport', 'ffi-napi'],
      /* 打包配置 */
      builderOptions: {
        appId: 'com.energy-end-breakout-universal', // 必须要设置，是一个程序的唯一标识符，还与后面的程序自动更新有关
        productName: '速度与功率反馈系统-蓝牙版', // 安装包名
        copyright: 'wxb Copyright © 2020', // 版权信息
        asarUnpack: ['dll/*.dll'], // 单独把dll文件抽离出来，放到resources/app.asar.unpacked文件夹中
        /* window相关配置 */
        win: {
          // requestedExecutionLevel: 'requireAdministrator', // 获取管理员权限
          icon: './public/logo.ico', // 软件图标，当前图标在public目录下，必须是≥256*256的ico格式，保证图标存在
          target: [
            {
              target: 'nsis', // 利用nsis制作安装程序
              arch: [
                // 这个意思是打出来32 bit、64 bit的包
                'x64' // 64位
                // 'ia32' // 32位
              ]
            }
          ]
        },
        nsis: {
          oneClick: false, // 是否一键安装
          allowElevation: true, // 允许请求提升。如果为false，则用户必须使用提升的权限重新启动安装程序
          allowToChangeInstallationDirectory: true, // 允许修改安装目录
          installerIcon: './public/logo.ico', // 安装图标
          uninstallerIcon: './public/delete.ico', // 卸载图标
          installerHeaderIcon: './public/logo.ico', // 安装时头部图标
          createDesktopShortcut: true, // 创建桌面图标
          createStartMenuShortcut: true, // 创建开始菜单图标
          shortcutName: '速度与功率反馈系统-蓝牙版' // 图标名称
        }
      }
    }
  }
}
