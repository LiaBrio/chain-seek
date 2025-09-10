# R2 存储桶设置指南

## 概述
这个项目已经配置为从 Cloudflare R2 存储桶中获取数据。存储桶名称为 crypto-nav，绑定名称为 DATA_LIST。

## 设置步骤

### 1. 创建 R2 存储桶
wrangler r2 bucket create crypto-nav

### 2. 上传数据文件
wrangler r2 object put crypto-nav/data_list.json --file=data_list.json

### 3. 验证上传
wrangler r2 object list crypto-nav

### 4. 部署到 Cloudflare Workers
npm run deploy

## 开发环境
在开发环境中，应用会使用模拟数据，所以你可以直接运行：
npm run dev
访问 http://localhost:3000 查看效果。

## 生产环境
在生产环境中，应用会从 R2 存储桶获取真实数据。
