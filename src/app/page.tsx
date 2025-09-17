"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  Star, 
  ExternalLink, 
  Globe, 
  Loader2,
  Search
} from "lucide-react";
import { useDataList, DataListItem } from "@/hooks/useDataList";
import { Sidebar } from "@/components/Sidebar";
import { categoryIconMap, categoryColorMap } from "@/lib/icons";
import { useLanguage } from "@/hooks/useLanguage";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { SimpleFooter } from "@/components/SimpleFooter";

interface WebsiteCardProps {
  website: DataListItem;
  onToggleFavorite: (id: string) => void;
  favorites: Set<string>;
  t: (key: string) => string;
}

function WebsiteCard({ website, onToggleFavorite, favorites, t }: WebsiteCardProps) {
  const isFavorite = favorites.has(website.id);
  const IconComponent = categoryIconMap[website.category] || Globe;
  const colorClass = categoryColorMap[website.category] || "bg-slate-100 text-slate-800";

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1 h-full flex flex-col">
      <CardHeader className="pb-3 flex-shrink-0">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <Avatar className="h-10 w-10 flex-shrink-0">
              <AvatarImage src={website.icon} alt={website.name} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                {website.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                {website.name}
              </CardTitle>
              <CardDescription className="text-sm text-gray-600 mt-1 line-clamp-3">
                {website.description}
              </CardDescription>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleFavorite(website.id)}
            className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-2"
          >
            <Star className={`h-4 w-4 ${isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0 mt-auto">
        <div className="flex items-center justify-between">
          <Badge className={`${colorClass} text-xs font-medium flex-shrink-0`}>
            <IconComponent className="h-3 w-3 mr-1" />
            {website.category}
          </Badge>
          <div className="flex items-center space-x-2 flex-shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(website.url, '_blank')}
              className="text-xs"
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              {t('common.visit')}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Home() {
  const { language, changeLanguage, t, availableLanguages, isClient } = useLanguage();
  const { data, loading, error } = useDataList(language);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("__ALL__");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  
  // 区块链浏览器搜索相关状态
  const [selectedBlockchain, setSelectedBlockchain] = useState("ethereum");
  const [searchQuery, setSearchQuery] = useState("");

  // 区块链名称映射
  const getBlockchainName = (chain: string) => {
    return t(`blockchains.${chain}`) || chain;
  };

  // 快速搜索选项
  const quickSearchOptions = [
    { label: t('explorer.quickSearch.latestBlock'), value: "latest" },
    { label: t('explorer.quickSearch.gasPrice'), value: "gas" },
    { label: t('explorer.quickSearch.networkStatus'), value: "status" },
    { label: t('explorer.quickSearch.tokenList'), value: "tokens" }
  ];

  // 处理搜索
  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    const explorerUrls: { [key: string]: string } = {
      ethereum: "https://etherscan.io",
      bitcoin: "https://blockstream.info",
      bsc: "https://bscscan.com",
      polygon: "https://polygonscan.com",
      solana: "https://solscan.io",
      avalanche: "https://snowtrace.io",
      arbitrum: "https://arbiscan.io",
      optimism: "https://optimistic.etherscan.io",
      base: "https://basescan.org",
      fantom: "https://ftmscan.com"
    };
    
    const baseUrl = explorerUrls[selectedBlockchain];
    if (baseUrl) {
      window.open(`${baseUrl}/search?q=${encodeURIComponent(searchQuery)}`, '_blank');
    }
  };

  const handleToggleFavorite = (id: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const filteredWebsites = data?.data?.filter((website: DataListItem) => {
    const matchesSearch = website.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (website.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "__ALL__" || website.category === selectedCategory;
    const matchesFavorites = !showFavoritesOnly || favorites.has(website.id);
    return matchesSearch && matchesCategory && matchesFavorites;
  }) || [];

  const categories = data?.categories || [];

  if (loading || !isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600" />
          <p className="mt-2 text-gray-600">{isClient ? t('common.loading') : 'Loading...'}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">加载失败</h1>
          <p className="text-gray-600 mb-4">无法加载数据，请稍后重试</p>
          <Button onClick={() => window.location.reload()}>
            重新加载
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
          favoritesCount={favorites.size}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          t={t}
        />

        {/* Main Content */}
        <div className="flex-1 md:ml-56 flex flex-col">
          <div className="flex-1 p-4 lg:p-6">
          {/* Language Switcher */}
          <div className="flex justify-end mb-4">
            <LanguageSwitcher
              currentLanguage={language}
              onLanguageChange={(lang) => {
                changeLanguage(lang);
                setSelectedCategory("__ALL__");
              }}
              availableLanguages={availableLanguages}
            />
          </div>

          {/* Blockchain Explorer Search */}
                  <div className="mb-8">
                    <div className="max-w-4xl mx-auto">
                      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
                        {t('explorer.title')}
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          {t('explorer.subtitle')}
                        </span>
                      </h1>
              
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* 区块链选择下拉框 */}
                  <div className="flex-shrink-0">
                    <select 
                      className="h-12 px-4 pr-8 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none cursor-pointer min-w-[140px]"
                      value={selectedBlockchain}
                      onChange={(e) => setSelectedBlockchain(e.target.value)}
                    >
                      <option value="ethereum">Ethereum</option>
                      <option value="bitcoin">Bitcoin</option>
                      <option value="bsc">BSC</option>
                      <option value="polygon">Polygon</option>
                      <option value="solana">Solana</option>
                      <option value="avalanche">Avalanche</option>
                      <option value="arbitrum">Arbitrum</option>
                      <option value="optimism">Optimism</option>
                      <option value="base">Base</option>
                      <option value="fantom">Fantom</option>
                    </select>
                  </div>
                  
                  {/* 搜索输入框 */}
                  <div className="flex-1 relative">
                            <input
                              type="text"
                              placeholder={`${t('explorer.placeholder')} ${getBlockchainName(selectedBlockchain)}`}
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="w-full h-12 pl-4 pr-12 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                            />
                    <button
                      onClick={handleSearch}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center justify-center transition-colors"
                    >
                      <Search className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                        {/* 快速搜索选项 */}
                        <div className="mt-4 flex flex-wrap gap-2">
                          <span className="text-sm text-gray-500">{t('explorer.quickSearchLabel')}</span>
                  {quickSearchOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setSearchQuery(option.value)}
                      className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              {showFavoritesOnly ? t('common.favorites') : (selectedCategory === "__ALL__" ? t('categories.all') : selectedCategory)}
            </h2>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                {t('common.total')} {filteredWebsites.length} {t('common.results')}
              </div>
              <Button
                variant={showFavoritesOnly ? "default" : "outline"}
                size="sm"
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                className="flex items-center space-x-2"
              >
                <Star className={`h-4 w-4 ${showFavoritesOnly ? 'fill-current' : ''}`} />
                <span>{t('common.favorite')} ({favorites.size})</span>
              </Button>
            </div>
          </div>

          {/* Results */}
          {filteredWebsites.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">未找到相关工具</h3>
                <p className="text-gray-600 mb-4">尝试调整搜索条件或浏览其他分类</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("全部");
                  }}
                >
                  重置筛选
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
              {filteredWebsites.map((website: DataListItem) => (
                <WebsiteCard
                  key={website.id}
                  website={website}
                  onToggleFavorite={handleToggleFavorite}
                  favorites={favorites}
                  t={t}
                />
              ))}
            </div>
          )}

          </div>
        </div>
      </div>

      {/* Footer with Friend Links */}
      <div className="md:ml-56">
        <SimpleFooter t={t} />
      </div>
    </div>
  );
}

