import { useState, useEffect } from 'react';

export interface DataListItem {
  id: string;
  name: string;
  url: string;
  description?: string;
  category: string;
  tags?: string[];
  icon?: string;
}

export interface DataListResponse {
  data: DataListItem[];
  total: number;
  categories: string[];
}

export function useDataList() {
  const [data, setData] = useState<DataListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/data');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json() as DataListResponse;
        setData(result);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}
