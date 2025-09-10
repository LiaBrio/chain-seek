"use client";

import { useLanguage } from '@/hooks/useLanguage';
import { SimpleFooter } from '@/components/SimpleFooter';
import { Sidebar } from '@/components/Sidebar';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Breadcrumb } from '@/components/Breadcrumb';
import { useDataList } from '@/hooks/useDataList';
import { useState } from 'react';

export default function FriendsPage() {
  const { language, changeLanguage, t, isClient } = useLanguage();
  const { data, loading } = useDataList();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (loading || !isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
      <div className="flex flex-1">
        <Sidebar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={data?.categories || []}
          totalWebsites={data?.total || 0}
          favoritesCount={0}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          t={t}
        />
        <div className="flex-1 lg:ml-56 flex flex-col">
          <div className="flex-1 p-4 lg:p-6">
            {/* 面包屑导航 */}
            <Breadcrumb 
              items={[
                { label: t('friendLinks.title') }
              ]}
              t={t}
            />

            {/* 页面头部 */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {t('friendLinks.title')}
                </h1>
                <p className="text-gray-600">
                  {t('friendLinks.subtitle')}
                </p>
              </div>
              <LanguageSwitcher
                currentLanguage={language}
                onLanguageChange={changeLanguage}
                availableLanguages={['en', 'zh', 'ja', 'ko', 'es', 'fr', 'de', 'ru']}
              />
            </div>

            {/* 友链内容 - 使用简化的footer */}
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">友情链接</h2>
              <p className="text-gray-600 mb-8">友链已移至页面底部，请查看下方footer区域</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer with Friend Links */}
      <SimpleFooter t={t} />
    </div>
  );
}
