// 多语言数据翻译
export const categoryTranslations = {
  en: {
    'DeFi': 'DeFi',
    'NFT': 'NFT',
    '钱包': 'Wallet',
    '中心化交易所': 'CEX',
    '去中心化交易所': 'DEX',
    '区块浏览器': 'Explorer',
    '行情数据': 'Market Data',
    '工具': 'Tools',
    '学习': 'Learning',
    '新闻': 'News',
    '安全': 'Security',
    '实用工具': 'Utilities'
  },
  zh: {
    'DeFi': 'DeFi',
    'NFT': 'NFT',
    '钱包': '钱包',
    '中心化交易所': '中心化交易所',
    '去中心化交易所': '去中心化交易所',
    '区块浏览器': '区块浏览器',
    '行情数据': '行情数据',
    '工具': '工具',
    '学习': '学习',
    '新闻': '新闻',
    '安全': '安全',
    '实用工具': '实用工具'
  },
  ja: {
    'DeFi': 'DeFi',
    'NFT': 'NFT',
    '钱包': 'ウォレット',
    '中心化交易所': '中央集権取引所',
    '去中心化交易所': '分散型取引所',
    '区块浏览器': 'ブロックエクスプローラー',
    '行情数据': 'マーケットデータ',
    '工具': 'ツール',
    '学习': '学習',
    '新闻': 'ニュース',
    '安全': 'セキュリティ',
    '实用工具': 'ユーティリティ'
  },
  ko: {
    'DeFi': 'DeFi',
    'NFT': 'NFT',
    '钱包': '지갑',
    '中心化交易所': '중앙화 거래소',
    '去中心化交易所': '탈중앙화 거래소',
    '区块浏览器': '블록 탐색기',
    '行情数据': '시장 데이터',
    '工具': '도구',
    '学习': '학습',
    '新闻': '뉴스',
    '安全': '보안',
    '实用工具': '유틸리티'
  },
  es: {
    'DeFi': 'DeFi',
    'NFT': 'NFT',
    '钱包': 'Cartera',
    '中心化交易所': 'Exchange Centralizado',
    '去中心化交易所': 'Exchange Descentralizado',
    '区块浏览器': 'Explorador de Bloques',
    '行情数据': 'Datos de Mercado',
    '工具': 'Herramientas',
    '学习': 'Aprendizaje',
    '新闻': 'Noticias',
    '安全': 'Seguridad',
    '实用工具': 'Utilidades'
  },
  fr: {
    'DeFi': 'DeFi',
    'NFT': 'NFT',
    '钱包': 'Portefeuille',
    '中心化交易所': 'Exchange Centralisé',
    '去中心化交易所': 'Exchange Décentralisé',
    '区块浏览器': 'Explorateur de Blocs',
    '行情数据': 'Données de Marché',
    '工具': 'Outils',
    '学习': 'Apprentissage',
    '新闻': 'Actualités',
    '安全': 'Sécurité',
    '实用工具': 'Utilitaires'
  },
  de: {
    'DeFi': 'DeFi',
    'NFT': 'NFT',
    '钱包': 'Wallet',
    '中心化交易所': 'Zentralisierte Börse',
    '去中心化交易所': 'Dezentrale Börse',
    '区块浏览器': 'Block-Explorer',
    '行情数据': 'Marktdaten',
    '工具': 'Werkzeuge',
    '学习': 'Lernen',
    '新闻': 'Nachrichten',
    '安全': 'Sicherheit',
    '实用工具': 'Dienstprogramme'
  },
  ru: {
    'DeFi': 'DeFi',
    'NFT': 'NFT',
    '钱包': 'Кошелек',
    '中心化交易所': 'Централизованная биржа',
    '去中心化交易所': 'Децентрализованная биржа',
    '区块浏览器': 'Блок-эксплорер',
    '行情数据': 'Рыночные данные',
    '工具': 'Инструменты',
    '学习': 'Обучение',
    '新闻': 'Новости',
    '安全': 'Безопасность',
    '实用工具': 'Утилиты'
  }
};

// 翻译网站数据
export function translateWebsiteData(websites: any[], language: string) {
  const categoryMap = categoryTranslations[language as keyof typeof categoryTranslations] || categoryTranslations.en;
  
  return websites.map(website => ({
    ...website,
    category: categoryMap[website.category as keyof typeof categoryMap] || website.category
  }));
}

// 翻译分类数据
export function translateCategories(categories: any[], language: string) {
  const categoryMap = categoryTranslations[language as keyof typeof categoryTranslations] || categoryTranslations.en;
  
  return categories.map(category => ({
    ...category,
    name: categoryMap[category.name as keyof typeof categoryMap] || category.name
  }));
}
