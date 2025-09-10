"use client";

import { Globe, ExternalLink } from 'lucide-react';

interface SimpleFooterProps {
  t: (key: string) => string;
}

// 简化的友链数据
const friendLinks = [
  {
    name: 'ChainFind',
    url: 'https://chainfind.net',
    description: '区块链工具导航平台'
  },
  {
    name: 'DeFiLlama',
    url: 'https://defillama.com',
    description: 'DeFi TVL 和分析平台'
  },
  {
    name: 'CoinGecko',
    url: 'https://coingecko.com',
    description: '加密货币市场数据'
  },
  {
    name: 'Etherscan',
    url: 'https://etherscan.io',
    description: '以太坊区块浏览器'
  }
];

export function SimpleFooter({ t }: SimpleFooterProps) {
  return (
    <footer className="bg-white border-t border-gray-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 主要内容 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* 网站信息 */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Globe className="h-4 w-4 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Chain Seek</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              {t('footer.subtitle')}
            </p>
          </div>

          {/* 友链 */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">友情链接</h4>
            <div className="space-y-2">
              {friendLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-sm text-gray-600 hover:text-blue-600 transition-colors group"
                >
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>{link.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* 统计信息 */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">网站统计</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <p>收录网站: 186+</p>
              <p>分类数量: 23+</p>
              <p>支持语言: 8种</p>
            </div>
          </div>
        </div>

        {/* 底部版权信息 */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 mb-2 md:mb-0">
              © 2024 Chain Seek. {t('footer.title')}
            </p>
            <div className="flex space-x-4 text-sm text-gray-500">
              <a href="#" className="hover:text-gray-700 transition-colors">隐私政策</a>
              <a href="#" className="hover:text-gray-700 transition-colors">服务条款</a>
              <a href="#" className="hover:text-gray-700 transition-colors">联系我们</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
