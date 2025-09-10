# Cloudflare Workers 部署说明

## 问题解决

### 原始问题
在Cloudflare Workers环境中无法加载数据，原因是：
1. Cloudflare Workers不支持Node.js的`fs`模块
2. 无法直接读取本地文件系统
3. 需要将数据内嵌到代码中

### 解决方案
1. **内嵌数据**: 将`data_list.json`的数据直接嵌入到API路由代码中
2. **移除文件系统依赖**: 删除`fs`和`path`模块的使用
3. **简化API逻辑**: 直接使用内嵌数据，确保在Workers环境中正常工作

## 部署步骤

### 1. 安装Wrangler CLI
```bash
npm install -g wrangler
```

### 2. 登录Cloudflare
```bash
wrangler login
```

### 3. 配置项目
编辑`wrangler.toml`文件，设置正确的域名和配置。

### 4. 部署到Cloudflare Workers
```bash
# 部署到生产环境
wrangler deploy

# 或者部署到预览环境
wrangler deploy --env staging
```

## 验证部署

### 测试API端点
```bash
# 测试中文数据
curl "https://your-domain.com/api/data?lang=zh"

# 测试英文数据
curl "https://your-domain.com/api/data?lang=en"
```

### 预期响应
API应该返回包含以下字段的JSON响应：
- `data`: 网站数据数组
- `categories`: 分类列表
- `categoryCounts`: 分类统计
- `total`: 总网站数量

## 注意事项

1. **数据更新**: 如果需要更新数据，需要重新运行`node generate-embedded-data.js`并重新部署
2. **文件大小**: 内嵌数据会增加bundle大小，但确保在Workers环境中正常工作
3. **性能**: 内嵌数据提供最快的访问速度，无需外部API调用

## 故障排除

### 常见问题
1. **数据不加载**: 检查API路由是否正确部署
2. **CORS错误**: 确保Cloudflare Workers正确配置CORS
3. **构建失败**: 检查TypeScript类型错误

### 调试命令
```bash
# 查看部署日志
wrangler tail

# 本地测试
wrangler dev
```
