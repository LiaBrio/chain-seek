"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  Search, 
  Star, 
  ExternalLink, 
  Globe, 
  Code, 
  Palette, 
  Database, 
  Zap,
  ChevronRight,
  Home as HomeIcon,
  TrendingUp,
  Bookmark,
  Settings,
  Loader2,
  Shield,
  Wallet,
  Layers,
  GraduationCap,
  Image as ImageIcon,
  Wrench,
  BarChart3,
  Building2,
  Search as SearchIcon,
  Eye,
  Link,
  Coins,
  Gift,
  Newspaper,
  BookOpen,
  Tool,
  Activity
} from "lucide-react";
import { useDataList, DataListItem } from "@/hooks/useDataList";

// 分类图标映射
const categoryIconMap: { [key: string]: any } = {
  "行情数据": BarChart3,
  "中心化交易所": Building2,
  "去中心化交易所": Coins,
  "数字钱包": Wallet,
  "区块浏览器": Eye,
  "跨链工具": Link,
  "NFT平台": ImageIcon,
  "安全工具": Shield,
  "资产管理": Database,
  "DeFi协议": Layers,
  "空投任务": Gift,
  "资讯媒体": Newspaper,
  "学习资源": BookOpen,
  "实用工具": Wrench,
  "数据分析": Activity,
  "all": HomeIcon,
  "featured": Star
};

// 分类颜色映射
const categoryColorMap: { [key: string]: string } = {
  "行情数据": "text-green-600",
  "中心化交易所": "text-blue-600",
  "去中心化交易所": "text-purple-600",
  "数字钱包": "text-orange-600",
  "区块浏览器": "text-cyan-600",
  "跨链工具": "text-indigo-600",
  "NFT平台": "text-pink-600",
  "安全工具": "text-red-600",
  "资产管理": "text-teal-600",
  "DeFi协议": "text-emerald-600",
  "空投任务": "text-yellow-600",
  "资讯媒体": "text-slate-600",
  "学习资源": "text-violet-600",
  "实用工具": "text-gray-600",
  "数据分析": "text-rose-600",
  "all": "text-blue-600",
  "featured": "text-yellow-600"
};

// 判断是否为图片URL的辅助函数
function isImageUrl(url: string): boolean {
  if (!url) return false;
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.ico'];
  const lowerUrl = url.toLowerCase();
  return imageExtensions.some(ext => lowerUrl.includes(ext)) || 
         lowerUrl.includes('data:image/') ||
         lowerUrl.includes('imagedelivery.net') ||
         lowerUrl.includes('static/picture/');
}

// 网站图标组件
function WebsiteIcon({ icon, name }: { icon?: string; name: string }) {
  if (!icon) {
    return (
      <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center text-2xl">
        🌐
      </div>
    );
  }

  if (isImageUrl(icon)) {
    return (
      <Avatar className="w-12 h-12">
        <AvatarImage 
          src={icon} 
          alt={name}
          className="w-full h-full object-cover"
        />
        <AvatarFallback className="w-12 h-12 text-lg">
          {name.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
    );
  }

  // 如果是emoji或普通文本
  return (
    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center text-2xl">
      {icon}
    </div>
  );
}

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // 使用自定义hook获取R2数据
  const { data: r2Data, loading, error } = useDataList();

  // 处理数据，如果R2数据不可用则使用默认数据
  const websites: DataListItem[] = r2Data?.data || [];
  
  // 动态生成分类列表
  const categories = r2Data?.categories ? 
    [
      { 
        id: "all", 
        name: "全部", 
        icon: HomeIcon, 
        color: "text-blue-600",
        count: websites.length
      },
      { 
        id: "featured", 
        name: "精选", 
        icon: Star, 
        color: "text-yellow-600",
        count: websites.filter(w => w.tags?.includes("featured")).length
      },
      ...r2Data.categories.map((cat: any) => ({
        id: cat.id,
        name: cat.name,
        icon: categoryIconMap[cat.name] || Globe,
        color: categoryColorMap[cat.name] || "text-gray-600",
        count: cat.count
      }))
    ] :
    [
      { 
        id: "all", 
        name: "全部", 
        icon: HomeIcon, 
        color: "text-blue-600",
        count: 0
      }
    ];

  const filteredWebsites = websites.filter(website => {
    const matchesCategory = selectedCategory === "all" || 
      (selectedCategory === "featured" && website.tags?.includes("featured")) ||
      website.category.toLowerCase().replace(/\s+/g, '-') === selectedCategory;
    
    const matchesSearch = searchQuery === "" || 
      website.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      website.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      website.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>加载中...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-destructive mb-2">加载失败</h2>
            <p className="text-muted-foreground">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold">Chain Seek</h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="搜索网站..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              设置
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-muted/30 border-r min-h-screen sticky top-16">
          <div className="p-4">
            <h2 className="font-semibold text-lg mb-4">分类</h2>
            <ScrollArea className="h-[calc(100vh-8rem)]">
              <div className="space-y-1">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors hover:bg-accent ${
                      selectedCategory === category.id 
                        ? "bg-accent text-accent-foreground" 
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <category.icon className={`w-4 h-4 ${category.color}`} />
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs bg-muted px-2 py-1 rounded-full">
                        {category.count}
                      </span>
                      <ChevronRight className="w-3 h-3" />
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">
              {selectedCategory === "all" ? "全部网站" : 
               selectedCategory === "featured" ? "精选网站" :
               categories.find(c => c.id === selectedCategory)?.name || "网站"}
            </h2>
            <p className="text-muted-foreground">
              找到 {filteredWebsites.length} 个网站
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredWebsites.map((website) => (
              <Card key={website.id} className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <WebsiteIcon icon={website.icon} name={website.name} />
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg leading-tight">{website.name}</CardTitle>
                        <Badge variant="secondary" className="mt-1 text-xs">
                          {website.category}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => window.open(website.url, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-sm leading-relaxed mb-3">
                    {website.description}
                  </CardDescription>
                  {website.tags && website.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {website.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredWebsites.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">没有找到网站</h3>
              <p className="text-muted-foreground">
                {searchQuery ? "尝试调整搜索条件" : "该分类下暂无网站"}
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
