import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { translateWebsiteData } from '@/lib/dataTranslations';

// 从本地文件读取数据
function getLocalData() {
  try {
    const filePath = path.join(process.cwd(), 'data_list.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error reading local data file:', error);
    return null;
  }
}

// 处理数据，添加分类统计
function processData(rawData: Record<string, unknown>, language: string = 'en') {
  if (!rawData || !rawData.data) {
    return rawData;
  }

  const websites = rawData.data as Array<Record<string, unknown>>;
  
  // 翻译网站数据
  const translatedWebsites = translateWebsiteData(websites, language);
  
  // 统计每个分类的数量
  const categoryCounts: { [key: string]: number } = {};
  translatedWebsites.forEach((website: Record<string, unknown>) => {
    const category = (website.category as string) || '未分类';
    categoryCounts[category] = (categoryCounts[category] || 0) + 1;
  });

  // 创建分类列表
  const categories = Object.entries(categoryCounts).map(([name, count]) => ({
    id: name.toLowerCase().replace(/\s+/g, '-'),
    name,
    count
  }));

  return {
    ...rawData,
    data: translatedWebsites,
    categories,
    categoryCounts
  };
}

export async function GET(request: Request) {
  try {
    // 从查询参数获取语言
    const { searchParams } = new URL(request.url);
    const language = searchParams.get('lang') || 'en';
    
    let rawData = null;

    // 在开发环境中使用本地数据文件
    if (process.env.NODE_ENV === 'development') {
      rawData = getLocalData();
    }

    // 如果本地数据不可用，尝试从R2获取数据
    if (!rawData) {
      const env = process.env as unknown as CloudflareEnv;
      
      if (!env.DATA_LIST) {
        // 如果R2未配置，尝试使用本地数据
        rawData = getLocalData();
      } else {
        // 从R2存储桶获取data_list.json文件
        const object = await env.DATA_LIST.get('data_list.json');
        
        if (!object) {
          // 如果R2中没有文件，尝试使用本地数据
          rawData = getLocalData();
        } else {
          // 解析JSON数据
          rawData = await object.json();
        }
      }
    }

    if (!rawData) {
      return NextResponse.json(
        { error: 'No data available from any source' },
        { status: 500 }
      );
    }

    // 处理数据，添加分类信息和多语言支持
    const processedData = processData(rawData, language);
    
    return NextResponse.json(processedData);
  } catch (error) {
    console.error('Error fetching data:', error);
    // 如果所有方法都失败，尝试使用本地数据
    const localData = getLocalData();
    if (localData) {
      const { searchParams } = new URL(request.url);
      const language = searchParams.get('lang') || 'en';
      const processedData = processData(localData, language);
      return NextResponse.json(processedData);
    }
    return NextResponse.json(
      { error: 'Failed to fetch data from all sources' },
      { status: 500 }
    );
  }
}
