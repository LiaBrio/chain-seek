"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Heart, Globe } from 'lucide-react';

interface FriendLink {
  id: string;
  name: string;
  url: string;
  description: string;
  logo?: string;
  category: string;
  isReciprocal: boolean;
  addedDate: string;
}

interface FriendLinksProps {
  t: (key: string) => string;
}

const friendLinks: FriendLink[] = [
  {
    id: '1',
    name: 'CoinGecko',
    url: 'https://www.coingecko.com',
    description: '全球领先的加密货币市场数据平台',
    logo: 'https://www.coingecko.com/favicon.ico',
    category: '行情数据',
    isReciprocal: true,
    addedDate: '2024-01-15'
  },
  {
    id: '2',
    name: 'DeFiPulse',
    url: 'https://defipulse.com',
    description: 'DeFi协议总锁仓量排行榜',
    logo: 'https://defipulse.com/favicon.ico',
    category: 'DeFi',
    isReciprocal: true,
    addedDate: '2024-01-20'
  },
  {
    id: '3',
    name: 'Etherscan',
    url: 'https://etherscan.io',
    description: '以太坊区块链浏览器',
    logo: 'https://etherscan.io/favicon.ico',
    category: '区块浏览器',
    isReciprocal: false,
    addedDate: '2024-02-01'
  },
  {
    id: '4',
    name: 'OpenSea',
    url: 'https://opensea.io',
    description: '全球最大的NFT交易市场',
    logo: 'https://opensea.io/favicon.ico',
    category: 'NFT',
    isReciprocal: true,
    addedDate: '2024-02-10'
  },
  {
    id: '5',
    name: 'Uniswap',
    url: 'https://app.uniswap.org',
    description: '去中心化交易协议',
    logo: 'https://app.uniswap.org/favicon.ico',
    category: 'DeFi',
    isReciprocal: false,
    addedDate: '2024-02-15'
  }
];

const categoryColors: { [key: string]: string } = {
  '行情数据': 'bg-blue-100 text-blue-800',
  'DeFi': 'bg-green-100 text-green-800',
  '区块浏览器': 'bg-purple-100 text-purple-800',
  'NFT': 'bg-pink-100 text-pink-800',
  '其他': 'bg-gray-100 text-gray-800'
};

export function FriendLinks({ t }: FriendLinksProps) {
  const [showAll, setShowAll] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(friendLinks.map(link => link.category)))];
  
  const filteredLinks = friendLinks.filter(link => 
    selectedCategory === 'all' || link.category === selectedCategory
  );

  const displayedLinks = showAll ? filteredLinks : filteredLinks.slice(0, 6);

  return (
    <div className="space-y-6">
      {/* 标题和统计 */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t('friendLinks.title')}
        </h2>
        <p className="text-gray-600 mb-4">
          {t('friendLinks.subtitle')} ({friendLinks.length} {t('friendLinks.count')})
        </p>
      </div>

      {/* 分类筛选 */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map(category => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className="text-xs"
          >
            {category === 'all' ? t('friendLinks.all') : category}
          </Button>
        ))}
      </div>

      {/* 友链网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayedLinks.map(link => (
          <Card key={link.id} className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                  {link.logo ? (
                    <img 
                      src={link.logo} 
                      alt={link.name}
                      className="w-8 h-8 rounded"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                  ) : null}
                  <Globe className={`w-6 h-6 text-gray-400 ${link.logo ? 'hidden' : ''}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                    {link.name}
                  </CardTitle>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge className={`text-xs ${categoryColors[link.category] || 'bg-gray-100 text-gray-800'}`}>
                      {link.category}
                    </Badge>
                    {link.isReciprocal && (
                      <Badge variant="outline" className="text-xs text-green-600 border-green-200">
                        <Heart className="w-3 h-3 mr-1" />
                        {t('friendLinks.reciprocal')}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {link.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  {t('friendLinks.added')}: {link.addedDate}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(link.url, '_blank')}
                  className="text-xs"
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  {t('common.visit')}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 显示更多按钮 */}
      {filteredLinks.length > 6 && (
        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => setShowAll(!showAll)}
            className="px-6"
          >
            {showAll ? t('friendLinks.showLess') : t('friendLinks.showMore')}
          </Button>
        </div>
      )}

      {/* 申请友链 */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {t('friendLinks.applyTitle')}
          </h3>
          <p className="text-gray-600 mb-4">
            {t('friendLinks.applyDescription')}
          </p>
          <Button
            variant="default"
            onClick={() => window.open('mailto:contact@chain-seek.com?subject=友链申请', '_blank')}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          >
            {t('friendLinks.applyButton')}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
