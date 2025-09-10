const fs = require('fs');

// R2存储桶中的原始数据格式
const r2Data = [
  {
    "title": "精选网站",
    "list": [
      { "text": "CoinMarketCap", "href": "https://coinmarketcap.com", "img": "https://bidaka.com/static/picture/CoinMarketCap.svg", "des": "全球币种市值与排名" },
      { "text": "波场链浏览器", "href": "https://tronscan.org", "img": "https://bidaka.com/static/picture/tron.svg", "des": "波场链区块浏览器" },
      { "text": "Coinbase", "href": "https://www.coinbase.com", "img": "https://bidaka.com/static/picture/Coinbase.svg", "des": "美国上市加密平台" },
      { "text": "MetaMask", "href": "https://metamask.io", "img": "https://bidaka.com/static/picture/metamask.svg", "des": "最流行的以太坊钱包插件，支持EVM链，中文名：小狐狸" },
      { "text": "Trust Wallet", "href": "https://trustwallet.com", "img": "https://bidaka.com/static/picture/Trust.svg", "des": "币安官方钱包，移动端友好" },
      { "text": "Rabby Wallet", "href": "https://rabby.io", "img": "https://bidaka.com/static/picture/Rabby.svg", "des": "支持多链自动切换的钱包，适合高级用户" },
      { "text": "Ledger", "href": "https://www.ledger.com", "img": "https://bidaka.com/static/picture/ledger.svg", "des": "硬件钱包行业领导者，资产安全首选" },
      { "text": "Revoke.cash", "href": "https://revoke.cash", "img": "https://bidaka.com/static/picture/Revoke.svg", "des": "授权风险检测与清除工具" },
      { "text": "CoinGecko", "href": "https://www.coingecko.com", "img": "https://bidaka.com/static/picture/CoinGecko.svg", "des": "币种行情、排名、DeFi数据" },
      { "text": "TradingView", "href": "https://www.tradingview.com", "img": "https://bidaka.com/static/picture/tradingview.svg", "des": "专业图表分析工具" },
      { "text": "Dexscreener", "href": "https://dexscreener.com", "img": "https://bidaka.com/static/picture/Dexscreener.svg", "des": "去中心化交易所行情分析工具" },
      { "text": "DeFiLlama", "href": "https://defillama.com", "img": "https://bidaka.com/static/picture/DeFiLlama.svg", "des": "DeFi协议TVL数据与L2排行" },
      { "text": "以太坊区块链浏览器", "href": "https://etherscan.io", "img": "https://bidaka.com/static/picture/etherscan.svg", "des": "以太坊区块链浏览器" },
      { "text": "BscScan", "href": "https://bscscan.com", "img": "https://bidaka.com/static/picture/bscscan.svg", "des": "BNB链区块浏览器" },
      { "text": "Arbiscan", "href": "https://arbiscan.io", "img": "https://bidaka.com/static/picture/Arbiscan.svg", "des": "Arbitrum区块链浏览器" },
      { "text": "Binance", "href": "https://www.binance.com", "img": "https://bidaka.com/static/picture/Binance.svg", "des": "全球最大加密交易所" },
      { "text": "OKX", "href": "https://www.okx.com", "img": "https://bidaka.com/static/picture/okx.svg", "des": "热门交易所，支持Web3钱包与链上活动" },
      { "text": "Bybit", "href": "https://www.bybit.com", "img": "https://bidaka.com/static/picture/bybit.svg", "des": "强大的合约交易平台，支持现货" },
      { "text": "Bitget", "href": "https://www.bitget.com", "img": "https://bidaka.com/static/picture/bitget.svg", "des": "社交交易与跟单领先平台" },
      { "text": "ZkSync浏览器", "href": "https://explorer.zksync.io", "img": "https://bidaka.com/static/picture/ZkSync.svg", "des": "ZkSync官方区块浏览器" },
      { "text": "Layer3", "href": "https://layer3.xyz", "img": "https://bidaka.com/static/picture/Layer3.svg", "des": "Web3任务与空投平台，做任务领空投" },
      { "text": "Galxe", "href": "https://galxe.com", "img": "https://bidaka.com/static/picture/galxe.svg", "des": "Web3身份系统与任务活动平台" },
      { "text": "Zapper", "href": "https://zapper.fi", "img": "https://bidaka.com/static/picture/zapper.svg", "des": "多链钱包资产统一查看" },
      { "text": "Debank", "href": "https://debank.com", "img": "https://bidaka.com/static/picture/debank.svg", "des": "钱包管理与DeFi资产监控工具" },
      { "text": "Uniswap", "href": "https://app.uniswap.org", "img": "https://bidaka.com/static/picture/uniswap.svg", "des": "主流DEX去中心化交易所" },
      { "text": "Curve", "href": "https://curve.fi", "img": "https://bidaka.com/static/picture/curve.svg", "des": "稳定币兑换利率最优平台" },
      { "text": "CoinDesk", "href": "https://www.coindesk.com", "img": "https://bidaka.com/static/picture/coindesk.svg", "des": "全球最大加密新闻平台之一" },
      { "text": "金色财经", "href": "https://www.jinse.cn", "img": "https://bidaka.com/static/picture/jinse.svg", "des": "中文区块链快讯与行情平台" },
      { "text": "Binance学院", "href": "https://academy.binance.com/zh-CN", "img": "https://bidaka.com/static/picture/Binance.svg", "des": "币安官方学院，提供专业区块链知识" },
      { "text": "比特币减半", "href": "https://www.btbjb.com/", "img": "https://bidaka.com/static/picture/Bitcoin.svg", "des": "比特币减半" },
      { "text": "CryptoZombies", "href": "https://cryptozombies.io", "img": "https://bidaka.com/static/picture/CryptoZombies.svg", "des": "通过游戏学习Solidity编程" }
    ]
  },
  {
    "title": "跨链工具",
    "list": [
      { "text": "Hop", "href": "https://app.hop.exchange/", "img": "https://chainfind.net/storage/upload/20240617/666f2d586768e.jpg", "des": "跨链流动性应用工具" },
      { "text": "Across", "href": "https://app.across.to/bridge", "img": "https://chainfind.net/storage/upload/20240617/666f2ef3ad03e.jpg", "des": "一款新颖的跨链流动性工具" },
      { "text": "Multichain", "href": "https://app.multichain.org/", "img": "https://chainfind.net/storage/upload/20250220/67b608bcbad58.jpg", "des": "跨链路由协议" }
    ]
  },
  {
    "title": "教育学习",
    "list": [
      { "text": "《区块链之新》", "href": "https://www.bilibili.com/bangumi/play/ss28925?spm_id_from=333.337.0.0", "img": "https://chainfind.net/storage/upload/20240616/666e0abe02e83.jpg", "des": "世界首部关注区块链技术的系列纪录片" },
      { "text": "《区块链技术与应用》", "href": "https://www.bilibili.com/video/BV1Vt411X7JF/?spm_id_from=333.337.search-card.all.click&vd_source=c22f0a0228e3bb790582bb58b421c4fc", "img": "https://chainfind.net/storage/upload/20240616/666e0abe02e83.jpg", "des": "北京大学肖臻老师讲授区块链技术与应用" },
      { "text": "OpenBuild", "href": "https://openbuild.xyz/", "img": "https://chainfind.net/storage/upload/20250220/67b6ef8d54729.png", "des": "Web3开发学习平台" }
    ]
  },
  {
    "title": "NFT平台",
    "list": [
      { "text": "OpenSea", "href": "https://opensea.io/", "img": "https://chainfind.net/storage/upload/20240615/666caf30934a0.png", "des": "全球最大的NFT交易平台" },
      { "text": "Rarible", "href": "https://rarible.com/", "img": "https://chainfind.net/storage/upload/20240615/666cb032be0d4.png", "des": "NFT多链聚合交易平台" },
      { "text": "Element", "href": "https://element.market/", "img": "https://chainfind.net/storage/upload/20240615/666cb15d98db9.jpg", "des": "多链聚合的NFT 市场" },
      { "text": "BLUR", "href": "https://blur.io/", "img": "https://chainfind.net/storage/upload/20240615/666cb23ae86b9.jpg", "des": "基于以太坊的NFT 交易平台" }
    ]
  },
  {
    "title": "数字钱包",
    "list": [
      { "text": "MetaMask", "href": "https://metamask.io/", "img": "https://chainfind.net/storage/upload/20240611/66684e58f2a65.jpg", "des": "热门的加密货币钱包" },
      { "text": "TokenPocket", "href": "https://www.tokenpocket.pro/", "img": "https://chainfind.net/storage/upload/20240611/66684f20243d0.png", "des": "主流的去中心化多链钱包" },
      { "text": "Trust Wallet", "href": "https://trustwallet.com/", "img": "https://chainfind.net/storage/upload/20240611/66684fb626fc1.png", "des": "主流的去中心化多链钱包" },
      { "text": "imToken", "href": "https://token.im/", "img": "https://chainfind.net/storage/upload/20240615/666cb34a653d9.jpg", "des": "流行的去中心化多链钱包" }
    ]
  },
  {
    "title": "安全检测",
    "list": [
      { "text": "蜜罐检测器", "href": "https://honeypot.is/", "img": "https://chainfind.net/storage/upload/20240617/666f30d02d628.png", "des": "高准确度的蜜罐检测工具" },
      { "text": "Token Sniffer", "href": "https://tokensniffer.com/", "img": "https://chainfind.net/storage/upload/20240617/666f32a6bd195.png", "des": "智能合约诈骗扫描器" }
    ]
  },
  {
    "title": "必备工具",
    "list": [
      { "text": "Binance币安交易所", "href": "https://www.marketwebb.net/zh-CN/join?ref=124122629", "img": "https://chainfind.net/storage/upload/20240611/666737e5bac88.png", "des": "全球最大加密货币交易所（手续费减免20%）" },
      { "text": "MetaMask", "href": "https://metamask.io/", "img": "https://chainfind.net/storage/upload/20240611/66684e58f2a65.jpg", "des": "热门的加密货币钱包" },
      { "text": "x", "href": "https://x.com/", "img": "https://chainfind.net/storage/upload/20240611/66686af447955.png", "des": "加密市场主流社交媒体平台" },
      { "text": "Telegram", "href": "https://t.me/+K1X5iP2TRcI4Y2E1", "img": "https://chainfind.net/storage/upload/20240611/66686c4760f84.jpg", "des": "加密市场常用社交软件" },
      { "text": "Discord", "href": "https://discord.com/", "img": "https://chainfind.net/storage/upload/20240611/66686c92ba304.png", "des": "加密市场主流社群频道软件" }
    ]
  }
];

// 转换函数
function convertR2DataToWebFormat(r2Data) {
  const allItems = [];
  const categories = new Set();
  let id = 1;

  r2Data.forEach(categoryGroup => {
    const categoryName = categoryGroup.title;
    categories.add(categoryName);

    categoryGroup.list.forEach(item => {
      // 生成标签数组
      const tags = [];
      if (item.des.includes('热门') || item.des.includes('主流') || item.des.includes('最大')) {
        tags.push('featured');
      }
      if (item.des.includes('钱包')) {
        tags.push('wallet');
      }
      if (item.des.includes('交易')) {
        tags.push('trading');
      }
      if (item.des.includes('DeFi')) {
        tags.push('defi');
      }
      if (item.des.includes('NFT')) {
        tags.push('nft');
      }
      if (item.des.includes('安全')) {
        tags.push('security');
      }
      if (item.des.includes('教育') || item.des.includes('学习')) {
        tags.push('education');
      }
      if (item.des.includes('跨链')) {
        tags.push('cross-chain');
      }

      allItems.push({
        id: id.toString(),
        name: item.text,
        description: item.des,
        url: item.href,
        category: categoryName,
        icon: item.img || '🔗', // 使用图片URL作为图标，如果没有则使用默认图标
        tags: tags.length > 0 ? tags : ['crypto']
      });
      id++;
    });
  });

  return {
    data: allItems,
    total: allItems.length,
    categories: Array.from(categories)
  };
}

// 执行转换
const webFormatData = convertR2DataToWebFormat(r2Data);

// 写入文件
fs.writeFileSync('data_list.json', JSON.stringify(webFormatData, null, 2));

console.log('数据转换完成！');
console.log(`总共转换了 ${webFormatData.total} 个项目`);
console.log(`分类包括: ${webFormatData.categories.join(', ')}`);
