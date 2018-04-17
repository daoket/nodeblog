<h1 align="center">nodeblog</h1>

### 简介
* 使用node+express+mongo实现的个人博客系统，项目使用express处理http请求和路由管理，使用mongo作为数据库，swig作为模板引擎，body-parser处理post数据，使用cookies记录用户登录状态，项目中涉及了创建一个前端博客+后台管理系统的大部分知识。
### 实现的主要功能
1. 登录注册页面
2. 首页分类
3. 首页文章的分页和文章页面的评论
4. 后台管理系统中分类的展示，编辑，添加和删除
5. 后台管理系统中文章的展示，编辑，添加和删除
6. 其他

### 未实现的功能
* 界面美化
* 细节打磨

## 安装步骤

``` bash
# 下载或克隆下来，然后安装依赖
npm install

# 启动mongoDB数据库（启动教程这里不做说明）
mongod --dbpath=(你的路径)\nodeblog\db

# 启动项目
node app
```

# 项目截图


### 博客首页
<center>
<img src="https://daoket.github.io/static/home.png"/>
<center/>

### 博客管理后台
<center>
<img src="https://daoket.github.io/static/admin.png"/>
<center/>

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2017-present, daoket
