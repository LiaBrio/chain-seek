// 多语言支持配置
export type Language = 'en' | 'zh' | 'ja' | 'ko' | 'es' | 'fr' | 'de' | 'ru';

export interface Translations {
  // 通用
  common: {
    all: string;
    search: string;
    loading: string;
    visit: string;
    favorite: string;
    favorites: string;
    results: string;
    total: string;
    settings: string;
    home: string;
  };
  
  // 导航和菜单
  navigation: {
    home: string;
    categories: string;
    tools: string;
    stats: string;
    browse: string;
  };
  
  // 区块链浏览器
  explorer: {
    title: string;
    subtitle: string;
    placeholder: string;
    quickSearchLabel: string;
    searchButton: string;
    quickSearch: {
      latestBlock: string;
      gasPrice: string;
      networkStatus: string;
      tokenList: string;
    };
  };
  
  // 分类
  categories: {
    all: string;
    marketData: string;
    centralizedExchange: string;
    decentralizedExchange: string;
    wallet: string;
    defi: string;
    nft: string;
    tools: string;
    learning: string;
    news: string;
    airdrop: string;
    other: string;
  };
  
  // 页脚
  footer: {
    title: string;
    subtitle: string;
  };

  // 友链
  friendLinks: {
    title: string;
    subtitle: string;
    count: string;
    all: string;
    reciprocal: string;
    added: string;
    showMore: string;
    showLess: string;
    applyTitle: string;
    applyDescription: string;
    applyButton: string;
  };
  
  // 区块链名称
  blockchains: {
    ethereum: string;
    bitcoin: string;
    bsc: string;
    polygon: string;
    solana: string;
    avalanche: string;
    arbitrum: string;
    optimism: string;
    base: string;
    fantom: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    common: {
      all: "All",
      search: "Search",
      loading: "Loading...",
      visit: "Visit",
      favorite: "Favorite",
      favorites: "Favorites",
      results: "results",
      total: "Total",
      settings: "Settings",
      home: "Home"
    },
    navigation: {
      home: "Home",
      categories: "Categories",
      tools: "Tools",
      stats: "Stats",
      browse: "Browse"
    },
    explorer: {
      title: "Blockchain Explorer",
      subtitle: "Search Tool",
      placeholder: "Search for addresses, transaction hashes, or block numbers on",
      quickSearchLabel: "Quick Search:",
      searchButton: "Search",
      quickSearch: {
        latestBlock: "Latest Block",
        gasPrice: "Gas Price",
        networkStatus: "Network Status",
        tokenList: "Token List"
      }
    },
    categories: {
      all: "All Tools",
      marketData: "Market Data",
      centralizedExchange: "Centralized Exchange",
      decentralizedExchange: "Decentralized Exchange",
      wallet: "Wallet",
      defi: "DeFi",
      nft: "NFT",
      tools: "Tools",
      learning: "Learning",
      news: "News",
      airdrop: "Airdrop",
      other: "Other"
    },
    footer: {
      title: "Chain Seek - Professional Blockchain Tool Navigation",
      subtitle: "Discover, Explore, Use the Best Web3 Tools"
    },

    friendLinks: {
      title: "Friend Links",
      subtitle: "Building partnerships with quality blockchain projects",
      count: "links",
      all: "All",
      reciprocal: "Reciprocal",
      added: "Added",
      showMore: "Show More",
      showLess: "Show Less",
      applyTitle: "Apply for Link Exchange",
      applyDescription: "If you have a quality blockchain project, welcome to establish a partnership with us",
      applyButton: "Apply Now"
    },
    blockchains: {
      ethereum: "Ethereum",
      bitcoin: "Bitcoin",
      bsc: "BSC",
      polygon: "Polygon",
      solana: "Solana",
      avalanche: "Avalanche",
      arbitrum: "Arbitrum",
      optimism: "Optimism",
      base: "Base",
      fantom: "Fantom"
    }
  },
  
  zh: {
    common: {
      all: "全部",
      search: "搜索",
      loading: "加载中...",
      visit: "访问",
      favorite: "收藏",
      favorites: "我的收藏",
      results: "个结果",
      total: "共",
      settings: "设置",
      home: "首页"
    },
    navigation: {
      home: "首页",
      categories: "分类",
      tools: "工具",
      stats: "统计",
      browse: "浏览"
    },
    explorer: {
      title: "区块链浏览器",
      subtitle: "搜索工具",
      placeholder: "在上搜索地址、交易哈希或区块号...",
      quickSearchLabel: "快速搜索:",
      searchButton: "搜索",
      quickSearch: {
        latestBlock: "最新区块",
        gasPrice: "Gas价格",
        networkStatus: "网络状态",
        tokenList: "代币列表"
      }
    },
    categories: {
      all: "所有工具",
      marketData: "行情数据",
      centralizedExchange: "中心化交易所",
      decentralizedExchange: "去中心化交易所",
      wallet: "钱包",
      defi: "DeFi",
      nft: "NFT",
      tools: "工具",
      learning: "学习",
      news: "新闻",
      airdrop: "空投",
      other: "其他"
    },
    footer: {
      title: "Chain Seek - 专业的区块链工具导航",
      subtitle: "发现、探索、使用最好的 Web3 工具"
    },

    friendLinks: {
      title: "友情链接",
      subtitle: "与优质区块链项目建立合作关系",
      count: "个",
      all: "全部",
      reciprocal: "互链",
      added: "添加时间",
      showMore: "显示更多",
      showLess: "收起",
      applyTitle: "申请友链",
      applyDescription: "如果您有优质的区块链项目，欢迎与我们建立友链合作",
      applyButton: "立即申请"
    },
    blockchains: {
      ethereum: "以太坊",
      bitcoin: "比特币",
      bsc: "BSC",
      polygon: "Polygon",
      solana: "Solana",
      avalanche: "雪崩",
      arbitrum: "Arbitrum",
      optimism: "Optimism",
      base: "Base",
      fantom: "Fantom"
    }
  },
  
  ja: {
    common: {
      all: "すべて",
      search: "検索",
      loading: "読み込み中...",
      visit: "訪問",
      favorite: "お気に入り",
      favorites: "お気に入り",
      results: "件の結果",
      total: "合計",
      settings: "設定",
      home: "ホーム"
    },
    navigation: {
      home: "ホーム",
      categories: "カテゴリ",
      tools: "ツール",
      stats: "統計",
      browse: "閲覧"
    },
    explorer: {
      title: "ブロックチェーンエクスプローラー",
      subtitle: "検索ツール",
      placeholder: "でアドレス、トランザクションハッシュ、ブロック番号を検索...",
      quickSearchLabel: "クイック検索:",
      searchButton: "検索",
      quickSearch: {
        latestBlock: "最新ブロック",
        gasPrice: "Gas価格",
        networkStatus: "ネットワーク状態",
        tokenList: "トークンリスト"
      }
    },
    categories: {
      all: "すべてのツール",
      marketData: "マーケットデータ",
      centralizedExchange: "中央集権取引所",
      decentralizedExchange: "分散取引所",
      wallet: "ウォレット",
      defi: "DeFi",
      nft: "NFT",
      tools: "ツール",
      learning: "学習",
      news: "ニュース",
      airdrop: "エアドロップ",
      other: "その他"
    },
    footer: {
      title: "Chain Seek - プロフェッショナルブロックチェーンツールナビゲーション",
      subtitle: "最高のWeb3ツールを発見、探索、使用"
    },

    friendLinks: {
      title: "フレンドリンク",
      subtitle: "質の高いブロックチェーンプロジェクトとのパートナーシップ構築",
      count: "件",
      all: "すべて",
      reciprocal: "相互リンク",
      added: "追加日",
      showMore: "もっと見る",
      showLess: "折りたたむ",
      applyTitle: "リンク交換申請",
      applyDescription: "質の高いブロックチェーンプロジェクトをお持ちの場合は、ぜひパートナーシップを築きましょう",
      applyButton: "今すぐ申請"
    },
    blockchains: {
      ethereum: "イーサリアム",
      bitcoin: "ビットコイン",
      bsc: "BSC",
      polygon: "Polygon",
      solana: "Solana",
      avalanche: "アバランチ",
      arbitrum: "Arbitrum",
      optimism: "Optimism",
      base: "Base",
      fantom: "Fantom"
    }
  },
  
  ko: {
    common: {
      all: "전체",
      search: "검색",
      loading: "로딩 중...",
      visit: "방문",
      favorite: "즐겨찾기",
      favorites: "즐겨찾기",
      results: "개 결과",
      total: "총",
      settings: "설정",
      home: "홈"
    },
    navigation: {
      home: "홈",
      categories: "카테고리",
      tools: "도구",
      stats: "통계",
      browse: "둘러보기"
    },
    explorer: {
      title: "블록체인 탐색기",
      subtitle: "검색 도구",
      placeholder: "에서 주소, 트랜잭션 해시 또는 블록 번호 검색...",
      quickSearchLabel: "빠른 검색:",
      searchButton: "검색",
      quickSearch: {
        latestBlock: "최신 블록",
        gasPrice: "가스 가격",
        networkStatus: "네트워크 상태",
        tokenList: "토큰 목록"
      }
    },
    categories: {
      all: "모든 도구",
      marketData: "시장 데이터",
      centralizedExchange: "중앙화 거래소",
      decentralizedExchange: "탈중앙화 거래소",
      wallet: "지갑",
      defi: "DeFi",
      nft: "NFT",
      tools: "도구",
      learning: "학습",
      news: "뉴스",
      airdrop: "에어드랍",
      other: "기타"
    },
    footer: {
      title: "Chain Seek - 전문 블록체인 도구 네비게이션",
      subtitle: "최고의 Web3 도구를 발견, 탐색, 사용"
    },

    friendLinks: {
      title: "친구 링크",
      subtitle: "고품질 블록체인 프로젝트와의 파트너십 구축",
      count: "개",
      all: "전체",
      reciprocal: "상호 링크",
      added: "추가일",
      showMore: "더 보기",
      showLess: "접기",
      applyTitle: "링크 교환 신청",
      applyDescription: "고품질 블록체인 프로젝트가 있으시면 파트너십을 맺어보세요",
      applyButton: "지금 신청"
    },
    blockchains: {
      ethereum: "이더리움",
      bitcoin: "비트코인",
      bsc: "BSC",
      polygon: "Polygon",
      solana: "Solana",
      avalanche: "아발란체",
      arbitrum: "Arbitrum",
      optimism: "Optimism",
      base: "Base",
      fantom: "Fantom"
    }
  },
  
  es: {
    common: {
      all: "Todos",
      search: "Buscar",
      loading: "Cargando...",
      visit: "Visitar",
      favorite: "Favorito",
      favorites: "Favoritos",
      results: "resultados",
      total: "Total",
      settings: "Configuración",
      home: "Inicio"
    },
    navigation: {
      home: "Inicio",
      categories: "Categorías",
      tools: "Herramientas",
      stats: "Estadísticas",
      browse: "Explorar"
    },
    explorer: {
      title: "Explorador de Blockchain",
      subtitle: "Herramienta de Búsqueda",
      placeholder: "Buscar direcciones, hashes de transacción o números de bloque en",
      quickSearchLabel: "Búsqueda Rápida:",
      searchButton: "Buscar",
      quickSearch: {
        latestBlock: "Último Bloque",
        gasPrice: "Precio del Gas",
        networkStatus: "Estado de la Red",
        tokenList: "Lista de Tokens"
      }
    },
    categories: {
      all: "Todas las Herramientas",
      marketData: "Datos de Mercado",
      centralizedExchange: "Exchange Centralizado",
      decentralizedExchange: "Exchange Descentralizado",
      wallet: "Cartera",
      defi: "DeFi",
      nft: "NFT",
      tools: "Herramientas",
      learning: "Aprendizaje",
      news: "Noticias",
      airdrop: "Airdrop",
      other: "Otros"
    },
    footer: {
      title: "Chain Seek - Navegación Profesional de Herramientas Blockchain",
      subtitle: "Descubre, Explora, Usa las Mejores Herramientas Web3"
    },

    friendLinks: {
      title: "Enlaces Amigos",
      subtitle: "Construyendo asociaciones con proyectos blockchain de calidad",
      count: "enlaces",
      all: "Todos",
      reciprocal: "Recíproco",
      added: "Agregado",
      showMore: "Mostrar Más",
      showLess: "Mostrar Menos",
      applyTitle: "Solicitar Intercambio de Enlaces",
      applyDescription: "Si tienes un proyecto blockchain de calidad, bienvenido a establecer una asociación con nosotros",
      applyButton: "Solicitar Ahora"
    },
    blockchains: {
      ethereum: "Ethereum",
      bitcoin: "Bitcoin",
      bsc: "BSC",
      polygon: "Polygon",
      solana: "Solana",
      avalanche: "Avalanche",
      arbitrum: "Arbitrum",
      optimism: "Optimism",
      base: "Base",
      fantom: "Fantom"
    }
  },
  
  fr: {
    common: {
      all: "Tous",
      search: "Rechercher",
      loading: "Chargement...",
      visit: "Visiter",
      favorite: "Favori",
      favorites: "Favoris",
      results: "résultats",
      total: "Total",
      settings: "Paramètres",
      home: "Accueil"
    },
    navigation: {
      home: "Accueil",
      categories: "Catégories",
      tools: "Outils",
      stats: "Statistiques",
      browse: "Parcourir"
    },
    explorer: {
      title: "Explorateur Blockchain",
      subtitle: "Outil de Recherche",
      placeholder: "Rechercher des adresses, des hachages de transaction ou des numéros de bloc sur",
      quickSearchLabel: "Recherche Rapide:",
      searchButton: "Rechercher",
      quickSearch: {
        latestBlock: "Dernier Bloc",
        gasPrice: "Prix du Gas",
        networkStatus: "État du Réseau",
        tokenList: "Liste des Tokens"
      }
    },
    categories: {
      all: "Tous les Outils",
      marketData: "Données de Marché",
      centralizedExchange: "Exchange Centralisé",
      decentralizedExchange: "Exchange Décentralisé",
      wallet: "Portefeuille",
      defi: "DeFi",
      nft: "NFT",
      tools: "Outils",
      learning: "Apprentissage",
      news: "Actualités",
      airdrop: "Airdrop",
      other: "Autres"
    },
    footer: {
      title: "Chain Seek - Navigation Professionnelle d'Outils Blockchain",
      subtitle: "Découvrir, Explorer, Utiliser les Meilleurs Outils Web3"
    },

    friendLinks: {
      title: "Liens Amis",
      subtitle: "Construire des partenariats avec des projets blockchain de qualité",
      count: "liens",
      all: "Tous",
      reciprocal: "Réciproque",
      added: "Ajouté",
      showMore: "Afficher Plus",
      showLess: "Afficher Moins",
      applyTitle: "Demander un Échange de Liens",
      applyDescription: "Si vous avez un projet blockchain de qualité, bienvenue pour établir un partenariat avec nous",
      applyButton: "Demander Maintenant"
    },
    blockchains: {
      ethereum: "Ethereum",
      bitcoin: "Bitcoin",
      bsc: "BSC",
      polygon: "Polygon",
      solana: "Solana",
      avalanche: "Avalanche",
      arbitrum: "Arbitrum",
      optimism: "Optimism",
      base: "Base",
      fantom: "Fantom"
    }
  },
  
  de: {
    common: {
      all: "Alle",
      search: "Suchen",
      loading: "Laden...",
      visit: "Besuchen",
      favorite: "Favorit",
      favorites: "Favoriten",
      results: "Ergebnisse",
      total: "Gesamt",
      settings: "Einstellungen",
      home: "Startseite"
    },
    navigation: {
      home: "Startseite",
      categories: "Kategorien",
      tools: "Werkzeuge",
      stats: "Statistiken",
      browse: "Durchsuchen"
    },
    explorer: {
      title: "Blockchain Explorer",
      subtitle: "Suchwerkzeug",
      placeholder: "Suche nach Adressen, Transaktions-Hashes oder Blocknummern auf",
      quickSearchLabel: "Schnellsuche:",
      searchButton: "Suchen",
      quickSearch: {
        latestBlock: "Neuester Block",
        gasPrice: "Gas-Preis",
        networkStatus: "Netzwerk-Status",
        tokenList: "Token-Liste"
      }
    },
    categories: {
      all: "Alle Werkzeuge",
      marketData: "Marktdaten",
      centralizedExchange: "Zentralisierte Börse",
      decentralizedExchange: "Dezentralisierte Börse",
      wallet: "Wallet",
      defi: "DeFi",
      nft: "NFT",
      tools: "Werkzeuge",
      learning: "Lernen",
      news: "Nachrichten",
      airdrop: "Airdrop",
      other: "Andere"
    },
    footer: {
      title: "Chain Seek - Professionelle Blockchain-Tool-Navigation",
      subtitle: "Entdecken, Erkunden, Nutzen Sie die Besten Web3-Tools"
    },

    friendLinks: {
      title: "Freundschaftslinks",
      subtitle: "Partnerschaften mit hochwertigen Blockchain-Projekten aufbauen",
      count: "Links",
      all: "Alle",
      reciprocal: "Gegenseitig",
      added: "Hinzugefügt",
      showMore: "Mehr Anzeigen",
      showLess: "Weniger Anzeigen",
      applyTitle: "Link-Austausch Beantragen",
      applyDescription: "Wenn Sie ein hochwertiges Blockchain-Projekt haben, willkommen, eine Partnerschaft mit uns aufzubauen",
      applyButton: "Jetzt Beantragen"
    },
    blockchains: {
      ethereum: "Ethereum",
      bitcoin: "Bitcoin",
      bsc: "BSC",
      polygon: "Polygon",
      solana: "Solana",
      avalanche: "Avalanche",
      arbitrum: "Arbitrum",
      optimism: "Optimism",
      base: "Base",
      fantom: "Fantom"
    }
  },
  
  ru: {
    common: {
      all: "Все",
      search: "Поиск",
      loading: "Загрузка...",
      visit: "Посетить",
      favorite: "Избранное",
      favorites: "Избранное",
      results: "результатов",
      total: "Всего",
      settings: "Настройки",
      home: "Главная"
    },
    navigation: {
      home: "Главная",
      categories: "Категории",
      tools: "Инструменты",
      stats: "Статистика",
      browse: "Обзор"
    },
    explorer: {
      title: "Блокчейн Эксплорер",
      subtitle: "Инструмент Поиска",
      placeholder: "Поиск адресов, хешей транзакций или номеров блоков на",
      quickSearchLabel: "Быстрый поиск:",
      searchButton: "Поиск",
      quickSearch: {
        latestBlock: "Последний Блок",
        gasPrice: "Цена Газа",
        networkStatus: "Статус Сети",
        tokenList: "Список Токенов"
      }
    },
    categories: {
      all: "Все Инструменты",
      marketData: "Рыночные Данные",
      centralizedExchange: "Централизованная Биржа",
      decentralizedExchange: "Децентрализованная Биржа",
      wallet: "Кошелек",
      defi: "DeFi",
      nft: "NFT",
      tools: "Инструменты",
      learning: "Обучение",
      news: "Новости",
      airdrop: "Аирдроп",
      other: "Другое"
    },
    footer: {
      title: "Chain Seek - Профессиональная Навигация по Блокчейн Инструментам",
      subtitle: "Открывайте, Исследуйте, Используйте Лучшие Web3 Инструменты"
    },

    friendLinks: {
      title: "Дружественные Ссылки",
      subtitle: "Строим партнерства с качественными блокчейн-проектами",
      count: "ссылок",
      all: "Все",
      reciprocal: "Взаимные",
      added: "Добавлено",
      showMore: "Показать Больше",
      showLess: "Показать Меньше",
      applyTitle: "Подать Заявку на Обмен Ссылками",
      applyDescription: "Если у вас есть качественный блокчейн-проект, добро пожаловать к установлению партнерства с нами",
      applyButton: "Подать Заявку Сейчас"
    },
    blockchains: {
      ethereum: "Ethereum",
      bitcoin: "Bitcoin",
      bsc: "BSC",
      polygon: "Polygon",
      solana: "Solana",
      avalanche: "Avalanche",
      arbitrum: "Arbitrum",
      optimism: "Optimism",
      base: "Base",
      fantom: "Fantom"
    }
  }
};

// 根据浏览器语言检测用户语言
export function detectUserLanguage(): Language {
  // 服务器端始终返回英语，避免hydration错误
  if (typeof window === 'undefined') return 'en';
  
  try {
    const browserLang = navigator.language.toLowerCase();
    
    // 语言映射
    const langMap: Record<string, Language> = {
      'zh': 'zh',
      'zh-cn': 'zh',
      'zh-tw': 'zh',
      'ja': 'ja',
      'ko': 'ko',
      'es': 'es',
      'fr': 'fr',
      'de': 'de',
      'ru': 'ru',
      'en': 'en'
    };
    
    // 检查完整语言代码
    if (langMap[browserLang]) {
      return langMap[browserLang];
    }
    
    // 检查语言前缀
    const langPrefix = browserLang.split('-')[0];
    if (langMap[langPrefix]) {
      return langMap[langPrefix];
    }
  } catch (error) {
    console.warn('Failed to detect browser language:', error);
  }
  
  // 默认返回英语
  return 'en';
}

// 获取翻译文本
export function getTranslation(lang: Language, key: string): string {
  const keys = key.split('.');
  let value: unknown = translations[lang];
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = (value as Record<string, unknown>)[k];
    } else {
      return key;
    }
  }
  
  return typeof value === 'string' ? value : key;
}
