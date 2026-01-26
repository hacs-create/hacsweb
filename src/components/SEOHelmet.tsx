import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOHelmetProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  googleSiteVerification?: string;
}

export function SEOHelmet({
  title = '合同会社HACS - モバイル通信のプロフェッショナル',
  description = '合同会社HACSは愛知県小牧市に拠点を置く、モバイル通信を専門とする企業です。最先端の通信技術とソリューションを提供しています。',
  keywords = 'HACS, モバイル通信, 通信事業, 愛知県, 小牧市, 通信技術, ネットワークソリューション',
  ogImage = 'https://h-a-c.com/og-image.jpg',
  googleSiteVerification,
}: SEOHelmetProps) {
  const location = useLocation();
  
  useEffect(() => {
    // ページタイトルの設定
    document.title = title;
    
    // メタタグの設定
    const setMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };
    
    // 基本メタタグ
    setMetaTag('description', description);
    setMetaTag('keywords', keywords);
    setMetaTag('author', '合同会社HACS');
    setMetaTag('viewport', 'width=device-width, initial-scale=1.0');
    setMetaTag('robots', 'index, follow');
    
    // OGPタグ
    setMetaTag('og:title', title, true);
    setMetaTag('og:description', description, true);
    setMetaTag('og:type', 'website', true);
    setMetaTag('og:url', `https://h-a-c.com${location.pathname}`, true);
    setMetaTag('og:image', ogImage, true);
    setMetaTag('og:site_name', '合同会社HACS', true);
    setMetaTag('og:locale', 'ja_JP', true);
    
    // Twitter Card
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', title);
    setMetaTag('twitter:description', description);
    setMetaTag('twitter:image', ogImage);
    
    // Google Site Verification（常に追加 - h-a-c-s.com用）
    const verificationContent = googleSiteVerification || 'fMMN8eyrhrgdPheVaSNDxHu4KScbm-5JVe5icnJPVVk';
    setMetaTag('google-site-verification', verificationContent);
    console.log('✅ Google Search Console verification meta tag added:', verificationContent);
    
    // 構造化データ（JSON-LD）
    let jsonLdScript = document.querySelector('script[type="application/ld+json"]');
    if (!jsonLdScript) {
      jsonLdScript = document.createElement('script');
      jsonLdScript.setAttribute('type', 'application/ld+json');
      document.head.appendChild(jsonLdScript);
    }
    
  // MEO対策: LocalBusinessスキーマの詳細化
    const localBusinessData = {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService', // より専門性を強調
      name: '合同会社HACS',
      url: 'https://h-a-c-s.com',
      logo: 'https://h-a-c-s.com/logo.png',
      image: ogImage,
      description: description,
      telephone: '+81-00-0000-0000', // 必要に応じて実番号に修正
      email: 'info@h-a-c-s.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '下小針天神2丁目2 ESPRESSO小牧2C',
        addressLocality: '小牧市',
        addressRegion: '愛知県',
        postalCode: '485-0036',
        addressCountry: 'JP',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 35.2914,
        longitude: 136.9122,
      },
      areaServed: [
        { '@type': 'City', name: '小牧市' },
        { '@type': 'City', name: '名古屋市' },
        { '@type': 'City', name: '春日井市' },
        { '@type': 'AdministrativeArea', name: '愛知県' },
        { '@type': 'AdministrativeArea', name: '東海地方' }
      ],
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday'
        ],
        opens: '10:00',
        closes: '19:00'
      },
      sameAs: [
        'https://www.instagram.com/hacsbiz.jp/',
      ],
      priceRange: '要見積もり'
    };

    // LLMO対策: FAQPageスキーマ（AIが学習しやすいQ&A形式）
    const faqData = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [{
        '@type': 'Question',
        name: '主な事業内容は何ですか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'モバイル通信設備の設計・施工・保守、法人向けネットワークインフラの構築、IoTソリューションの導入支援、セキュリティ対策など、通信技術に関わる幅広いサービスを提供しています。'
        }
      }, {
        '@type': 'Question',
        name: '対応可能なエリアはどこですか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '愛知県小牧市を拠点に、名古屋市、春日井市、一宮市など愛知県全域および東海エリアを中心に対応しております。詳細はお問い合わせください。'
        }
      }, {
        '@type': 'Question',
        name: 'MAXHUBなどの機器導入も可能ですか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'はい、可能です。MAXHUBをはじめとする最新の会議システムや通信機器の選定から導入、設置設定までワンストップでサポートいたします。'
        }
      }]
    };
    
    // 複数の構造化データを配列として結合
    const structuredData = [localBusinessData, faqData];
    
    jsonLdScript.textContent = JSON.stringify(structuredData);
    
    
  }, [title, description, keywords, ogImage, googleSiteVerification, location]);
  
  return null;
}

// ページごとのSEO設定
export const pageSEO = {
  home: {
    title: '合同会社HACS - モバイル通信のプロフェッショナル',
    description: '合同会社HACSは愛知県小牧市に拠点を置く、モバイル通信を専門とする企業です。最先端の通信技術とソリューションを提供しています。',
    keywords: 'HACS, モバイル通信, 通信事業, 愛知県, 小牧市',
  },
  about: {
    title: '私たちについて - 合同会社HACS',
    description: '合同会社HACSの企業理念、ビジョン、会社概要をご紹介します。2023年11月14日設立、愛知県小牧市に拠点を置くモバイル通信のプロフェッショナル企業です。',
    keywords: 'HACS, 会社概要, 企業理念, ビジョン, 小牧市',
  },
  services: {
    title: 'サービス - 合同会社HACS',
    description: 'モバイル通信、ネットワークインフラ、IoTソリューション、セキュリティ対策など、HACSが提供する幅広いサービスをご紹介します。',
    keywords: 'モバイル通信, ネットワークインフラ, IoT, セキュリティ, 通信サービス',
  },
  recruit: {
    title: '採用情報 - 合同会社HACS',
    description: '合同会社HACSの採用情報。一緒に未来の通信を創る仲間を募集しています。充実した福利厚生と成長できる環境をご用意しています。',
    keywords: '採用, 求人, リクルート, 通信業界, キャリア',
  },
  member: {
    title: 'メンバー紹介 - 合同会社HACS',
    description: '合同会社HACSのチームメンバーをご紹介します。経験豊富なプロフェッショナルが集まり、最高のサービスを提供します。',
    keywords: 'メンバー, チーム, スタッフ, プロフェッショナル',
  },
  contact: {
    title: 'お問い合わせ - 合同会社HACS',
    description: '合同会社HACSへのお問い合わせはこちらから。サービスに関するご質問、ご相談など、お気軽にご連絡ください。',
    keywords: 'お問い合わせ, 連絡先, コンタクト, 相談',
  },
};
