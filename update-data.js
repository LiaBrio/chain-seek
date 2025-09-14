const fs = require('fs');
const path = require('path');

// 读取现有的data_list.json文件
const dataPath = path.join(__dirname, 'data_list.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// 生成内嵌数据代码
const embeddedDataCode = `// 内嵌数据，避免文件系统依赖
const EMBEDDED_DATA = ${JSON.stringify(data, null, 2)};`;

// 读取当前的API路由文件
const apiRoutePath = path.join(__dirname, 'src/app/api/data/route.ts');
let apiRouteContent = fs.readFileSync(apiRoutePath, 'utf8');

// 替换内嵌数据部分
const startMarker = '// 内嵌数据，避免文件系统依赖';
const endMarker = '};';

const startIndex = apiRouteContent.indexOf(startMarker);
const endIndex = apiRouteContent.indexOf(endMarker, startIndex) + endMarker.length;

if (startIndex !== -1 && endIndex !== -1) {
  const newContent = apiRouteContent.substring(0, startIndex) + 
                    embeddedDataCode + 
                    apiRouteContent.substring(endIndex);
  
  fs.writeFileSync(apiRoutePath, newContent);
  console.log('✅ 内嵌数据已更新到API路由文件');
  console.log(`📊 当前共有 ${data.data.length} 个网站`);
} else {
  console.error('❌ 无法找到内嵌数据标记');
}
