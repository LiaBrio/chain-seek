import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

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
function processData(rawData: any) {
  if (!rawData || !rawData.data) {
    return rawData;
  }

  const websites = rawData.data;
  
  // 统计每个分类的数量
  const categoryCounts: { [key: string]: number } = {};
  websites.forEach((website: any) => {
    const category = website.category || '未分类';
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
    categories,
    categoryCounts
  };
}

export async function GET() {
  try {
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

    // 处理数据，添加分类信息
    const processedData = processData(rawData);
    
    return NextResponse.json(processedData);
  } catch (error) {
    console.error('Error fetching data:', error);
    // 如果所有方法都失败，尝试使用本地数据
    const localData = getLocalData();
    if (localData) {
      const processedData = processData(localData);
      return NextResponse.json(processedData);
    }
    return NextResponse.json(
      { error: 'Failed to fetch data from all sources' },
      { status: 500 }
    );
  }
}
