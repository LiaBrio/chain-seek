const fs = require('fs');

// 读取数据
const data = JSON.parse(fs.readFileSync('data_list.json', 'utf8'));

// 定义重新分类规则
const reclassifications = {
  // 社交媒体和社区
  'x': '社交媒体',
  'Telegram': '社交媒体', 
  'Discord': '社交媒体',
  
  // 游戏和娱乐
  'Satoshi\'s Place': '游戏娱乐',
  'Bitcoin Hat Club': '游戏娱乐',
  'Bitcoin Flip': '游戏娱乐',
  
  // 税务和合规
  'CryptoTaxCalculator': '税务合规',
  
  // 恢复服务
  'Bitcoin Recovery Co': '恢复服务',
  
  // 浏览器扩展
  'MetaSuites': '浏览器扩展',
  
  // 地址搜索
  'Bitcoin Who\'s Who': '地址搜索',
  
  // 倒计时工具
  '比特币减半': '倒计时工具',
  
  // 保持实用工具分类的网站
  'Chainlist': '实用工具',
  'GEMIT': '实用工具',
  'Blocknative': '实用工具',
  'MEV-Explore': '实用工具',
  'CryptoFees': '实用工具',
  'Chain Broker': '实用工具',
  'Token Unlocks': '实用工具',
  'CoinMarketCal': '实用工具',
  'ROOTDATA': '实用工具',
  'ViaWallet': '实用工具',
  'CoinParticle': '实用工具',
  'DappReview': '实用工具',
  'BitInfoCharts': '实用工具',
  'TokenInsight': '实用工具',
  'Team Finance': '实用工具',
  'APY.vision': '实用工具',
  'Rated.network': '实用工具',
  'CompaniesMarketCap': '实用工具',
  '链研社': '实用工具',
  'Look Into Bitcoin': '实用工具',
  'APE Staking APYs': '实用工具',
  '哔哔News数据图表': '实用工具',
  'Coindix': '实用工具',
  'DiTing.io': '实用工具',
  'Mest': '实用工具',
  'Footrace': '实用工具',
  'Xypher.io': '实用工具',
  'Revert.finance': '实用工具',
  'Datemish': '实用工具',
  'WhaleStats': '实用工具',
  'BSC Project': '实用工具',
  'Solana Project': '实用工具',
  'Heimdall': '实用工具',
  '恐惧贪婪指数': '实用工具',
  'StakingRewards': '实用工具',
  'HyblockCapital': '实用工具',
  'Bubble Maps': '实用工具',
  '比特币彩虹图': '实用工具',
  'Daylight': '实用工具',
  'Rare.id': '实用工具',
  'ExchangeWar': '实用工具',
  'Vestlab': '实用工具',
  'CryptoMiso': '实用工具',
  'DefiEye.io': '实用工具',
  'Vfat.tools': '实用工具',
  'ChainBeat': '实用工具',
  'Gas费计算器': '实用工具',
  'CypherHunter': '实用工具'
};

// 应用重新分类
let reclassifiedCount = 0;
data.data.forEach(website => {
  if (reclassifications[website.name]) {
    const oldCategory = website.category;
    website.category = reclassifications[website.name];
    if (oldCategory !== website.category) {
      console.log(`重新分类: ${website.name} (${oldCategory} -> ${website.category})`);
      reclassifiedCount++;
    }
  }
});

// 保存更新后的数据
fs.writeFileSync('data_list.json', JSON.stringify(data, null, 2));

console.log(`\n成功重新分类 ${reclassifiedCount} 个网站`);

// 统计新的分类
const categoryStats = {};
data.data.forEach(website => {
  categoryStats[website.category] = (categoryStats[website.category] || 0) + 1;
});

console.log('\n更新后的分类统计:');
Object.entries(categoryStats)
  .sort(([,a], [,b]) => b - a)
  .forEach(([category, count]) => {
    console.log(`${category}: ${count}个网站`);
  });
