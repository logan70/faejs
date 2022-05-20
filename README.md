# faejs

一个使用各种装饰器即可轻松编写Node接口的库（开发中）。

## 原理简介

### 初始化流程

核心库faejs-core负责应用创建、路由执行等核心功能，具备框架无关的特性。

BaseDriver定义了一个抽象类及需要实现的接口，对应框架的支持就是对BaseDriver的实现

应用的真实运行依赖外部传入已实现的具体Driver

![初始化流程](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ba57467994d34e9fbc0c695e3052d0bf~tplv-k3u1fbpfcp-watermark.image?)


### 请求处理流程

对应框架收到请求后调用faejs-core初始化注册路由时传入的处理函数

通过装饰器支持各种预置及自定义的参数类型，并统一解析

通过Around的排列（类似Koa-compose），实现AOP，支持对参数和返回的拦截处理

定义统一格式的执行结果，方便定义各类常用返回类型（JSON、JSONP、下载、模板渲染等）

交由外部Driver实现响应的处理及返回，保持框架无关特性

![请求处理流程](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/38efea8f9369470eafd8b0f639d7c228~tplv-k3u1fbpfcp-watermark.image?)
