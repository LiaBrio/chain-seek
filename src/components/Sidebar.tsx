
"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Search, 
  Globe, 
  Settings,
  Menu,
  X,
  Filter
} from "lucide-react";
import { categoryIconMap } from "@/lib/icons";

interface SidebarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  categories: Array<{ id: string; name: string; count: number }>;
  totalWebsites: number;
  favoritesCount: number;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  t: (key: string) => string;
}


export function Sidebar({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  categories,
  totalWebsites,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  t
}: SidebarProps) {
  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        className="lg:hidden fixed top-4 left-4 z-50"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-56 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col h-full
      `}>
        {/* Header */}
        <div className="p-3 border-b border-gray-200">
          <div className="flex items-center space-x-2 mb-3">
            <div className="h-6 w-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Globe className="h-3 w-3 text-white" />
            </div>
            <h1 className="text-base font-bold text-gray-900">Chain Seek</h1>
          </div>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-3 w-3" />
            <input
              type="text"
              placeholder="搜索工具..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs border border-gray-200 rounded-md focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Stats */}
     

        {/* Categories */}
        <div className="flex-1 p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-gray-900">分类浏览</h2>
            <Filter className="h-4 w-4 text-gray-400" />
          </div>
          <ScrollArea className="h-full">
            <div className="space-y-2">
              <Button
                variant={selectedCategory === "全部" ? "default" : "ghost"}
                onClick={() => setSelectedCategory("全部")}
                className="w-full justify-start h-10 text-sm px-4 rounded-lg font-medium transition-all duration-200 hover:bg-gray-50"
              >
                <Globe className="h-4 w-4 mr-3" />
                全部工具
                <Badge variant="secondary" className="ml-auto text-xs px-2 py-1 rounded-full">
                  {totalWebsites}
                </Badge>
              </Button>
              
              {categories.map((category) => {
                const IconComponent = categoryIconMap[category.name] || Globe;
                const isSelected = selectedCategory === category.name;
                return (
                  <Button
                    key={category.id}
                    variant={isSelected ? "default" : "ghost"}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`w-full justify-start h-10 text-sm px-4 rounded-lg font-medium transition-all duration-200 ${
                      isSelected 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md' 
                        : 'hover:bg-gray-50 hover:shadow-sm'
                    }`}
                  >
                    <IconComponent className={`h-4 w-4 mr-3 ${isSelected ? 'text-white' : 'text-gray-600'}`} />
                    {category.name}
                    <Badge 
                      variant={isSelected ? "secondary" : "outline"} 
                      className={`ml-auto text-xs px-2 py-1 rounded-full ${
                        isSelected ? 'bg-white/20 text-white border-white/30' : ''
                      }`}
                    >
                      {category.count}
                    </Badge>
                  </Button>
                );
              })}
            </div>
          </ScrollArea>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <Button variant="outline" size="sm" className="w-full h-10 text-sm rounded-lg font-medium hover:bg-gray-50">
            <Settings className="h-4 w-4 mr-2" />
            {t('common.settings')}
          </Button>
        </div>
      </div>
    </>
  );
}
