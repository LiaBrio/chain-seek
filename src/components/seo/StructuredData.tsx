import Script from 'next/script';

interface StructuredDataProps {
  type: 'website' | 'organization' | 'breadcrumb' | 'itemList';
  data: Record<string, unknown>;
}

export function StructuredData({ type, data }: StructuredDataProps) {
  const getStructuredData = () => {
    switch (type) {
      case 'website':
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Chain Seek",
          "description": "专业的区块链工具导航网站，提供Web3工具集合",
          "url": "https://chainseek.top",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://chainseek.top?search={search_term_string}",
            "query-input": "required name=search_term_string"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Chain Seek",
            "url": "https://chainseek.top"
          }
        };
      
      case 'organization':
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Chain Seek",
          "description": "专业的区块链工具导航网站",
          "url": "https://chainseek.top",
          "logo": "https://chainseek.top/logo.png",
          "sameAs": [
            "https://x.com/chainseek",
            "https://github.com/chainseek"
          ]
        };
      
      case 'breadcrumb':
        return {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": (data.items as Array<{ name: string; url: string }>).map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.url
          }))
        };
      
      case 'itemList':
        return {
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": data.name as string,
          "description": data.description as string,
          "numberOfItems": (data.items as unknown[]).length,
          "itemListElement": (data.items as Array<{ name: string; description: string; url: string }>).map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "description": item.description,
            "url": item.url
          }))
        };
      
      default:
        return {};
    }
  };

  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getStructuredData())
      }}
    />
  );
}
