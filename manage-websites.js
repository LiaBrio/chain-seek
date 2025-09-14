const fs = require('fs');
const path = require('path');

// 读取数据文件
function loadData() {
  const dataPath = path.join(__dirname, 'data_list.json');
  return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
}

// 保存数据文件
function saveData(data) {
  const dataPath = path.join(__dirname, 'data_list.json');
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

// 更新API路由中的内嵌数据
function updateEmbeddedData(data) {
  const embeddedDataCode = `// 内嵌数据，避免文件系统依赖
const EMBEDDED_DATA = ${JSON.stringify(data, null, 2)};`;

  const apiRoutePath = path.join(__dirname, 'src/app/api/data/route.ts');
  let apiRouteContent = fs.readFileSync(apiRoutePath, 'utf8');

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
  } else {
    console.error('❌ 无法找到内嵌数据标记');
  }
}

// 添加新网站
function addWebsite(name, description, url, category, icon, tags = []) {
  const data = loadData();
  const newId = (Math.max(...data.data.map(item => parseInt(item.id))) + 1).toString();
  
  const newWebsite = {
    id: newId,
    name,
    description,
    url,
    category,
    icon,
    tags
  };
  
  data.data.push(newWebsite);
  saveData(data);
  updateEmbeddedData(data);
  
  console.log(`✅ 已添加新网站: ${name}`);
  console.log(`📊 当前共有 ${data.data.length} 个网站`);
}

// 删除网站
function removeWebsite(id) {
  const data = loadData();
  const index = data.data.findIndex(item => item.id === id);
  
  if (index !== -1) {
    const removed = data.data.splice(index, 1)[0];
    saveData(data);
    updateEmbeddedData(data);
    console.log(`✅ 已删除网站: ${removed.name}`);
    console.log(`📊 当前共有 ${data.data.length} 个网站`);
  } else {
    console.log(`❌ 未找到ID为 ${id} 的网站`);
  }
}

// 列出所有网站
function listWebsites() {
  const data = loadData();
  console.log(`\n📊 当前共有 ${data.data.length} 个网站:\n`);
  
  data.data.forEach((website, index) => {
    console.log(`${index + 1}. ${website.name} (ID: ${website.id})`);
    console.log(`   描述: ${website.description}`);
    console.log(`   链接: ${website.url}`);
    console.log(`   分类: ${website.category}`);
    console.log(`   标签: ${website.tags.join(', ')}`);
    console.log('');
  });
}

// 命令行参数处理
const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case 'add':
    if (args.length < 5) {
      console.log('用法: node manage-websites.js add "网站名称" "描述" "URL" "分类" "图标URL" "标签1,标签2"');
    } else {
      const tags = args[5] ? args[5].split(',').map(tag => tag.trim()) : [];
      addWebsite(args[1], args[2], args[3], args[4], args[5] || '', tags);
    }
    break;
    
  case 'remove':
    if (args.length < 2) {
      console.log('用法: node manage-websites.js remove "网站ID"');
    } else {
      removeWebsite(args[1]);
    }
    break;
    
  case 'list':
    listWebsites();
    break;
    
  case 'update':
    const data = loadData();
    updateEmbeddedData(data);
    console.log('✅ 已更新内嵌数据');
    break;
    
  default:
    console.log('用法:');
    console.log('  node manage-websites.js add "网站名称" "描述" "URL" "分类" "图标URL" "标签1,标签2"');
    console.log('  node manage-websites.js remove "网站ID"');
    console.log('  node manage-websites.js list');
    console.log('  node manage-websites.js update');
}
