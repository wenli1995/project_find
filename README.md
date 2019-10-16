一、项目名称：失物招领（英文：find）
二、项目技术栈：
1、前端：Vue,框架Vant
  "dependencies": {
    "axios": "^0.19.0",
    "vant": "^2.2.6",
    "vue": "^2.5.2",
    "vue-router": "^3.0.1",
    "vuex": "^3.1.1"
  },
2、后端：NodeJS,框架Express
  "dependencies": {
    "cookie-parser": "~1.4.4",
    "debug": "~2.6.9",
    "express": "~4.16.1",
    "http-errors": "~1.6.3",
    "jade": "~1.11.0",
    "mongoose": "^5.7.4",
    "morgan": "~1.9.1"
  }
3、数据库MongoDB,框架Mongoose
三、使用说明
1、数据库：
地址：mongodb://localhost:27017/db_find
操作说明：参看"project_find/数据库.txt"文件说明
2、后端：
打开cmd 命令行工具，进入vue_find_server文件夹
输入命令：cnpm install    //安装所有依赖包
输入命令：node bin/www    //后台运行
3、前端：
打开cmd 命令行工具，进入vue_find文件夹
输入命令：cnpm install    //安装所有依赖包
输入命令：npm run dev     
浏览器访问：http://localhost:8080，切换成手机模式

三、功能介绍：
1、登录和注册功能。未登录用户访问处注册页面外的其他页面会被拦截。
2、主页：显示拾到者发布的失物招领信息。每条记录包括失物图片，失物名称，捡到地点，捡到时间，失物标签等信息。另外有“查看详情”按钮和“我是失主”按钮，点击“查看详情”可以查看失物详细信息，点击“我是失主”，则该失物招领公告找到失主，状态变成无效，不再在列表中显示。
3、发布：新增失物招领信息。输入失物名称，拾取地点，拾取时间，联系方式，关键特征，详细描述，并上传失物图片，点击发布即发布成功，发布成功后在主页显示。每发布一条失物找信息，用户积分增加10，可以在“我的”页面查看到。
4、汇总：显示登录用户拾取的物品列表和丢失的物品列表。
5、我的：显示登录用户详细信息，用户信息修改和退出登录功能。

四、产品演示：project_find/find.mp4文件

