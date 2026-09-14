import type { Post } from '@/lib/api';

export const BASE_URL = 'https://alnadascientific.com';

/**
 * Strip markdown, HTML, emojis, and contentReference tags from text
 * to produce a clean plain-text description suitable for meta tags.
 */
export function cleanDescription(markdown: string, maxLength = 160): string {
  const cleaned = markdown
    // Remove contentReference tags (from ChatGPT-generated content)
    .replace(/:contentReference\[[^\]]*\]\{[^}]*\}/g, '')
    // Remove HTML tags
    .replace(/<[^>]+>/g, '')
    // Remove markdown headings
    .replace(/^#+\s+/gm, '')
    // Remove markdown links, keep text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Remove markdown formatting characters
    .replace(/[*_~`>]/g, '')
    // Remove emoji characters
    .replace(
      /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{200D}\u{20E3}\u{E0020}-\u{E007F}]/gu,
      ''
    )
    // Remove hash tags
    .replace(/#\w+/g, '')
    // Collapse whitespace
    .replace(/\s+/g, ' ')
    .trim();

  if (cleaned.length <= maxLength) return cleaned;
  // Truncate at last word boundary
  const truncated = cleaned.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  return (lastSpace > 0 ? truncated.substring(0, lastSpace) : truncated) + '...';
}

/**
 * Generate Article JSON-LD structured data for a blog post.
 */
export function generateArticleJsonLd(post: Post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: cleanDescription(post.body),
    image: post.image1Url || undefined,
    datePublished: post.createdAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Organization',
      name: 'Al-Nada Scientific Office',
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Al-Nada Scientific Office',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/img/alnada.webp`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/posts/${post.id}/`,
    },
  };
}

/**
 * Generate BreadcrumbList JSON-LD structured data.
 * @param items Array of { name, url } pairs, in order from root to current page.
 */
export function generateBreadcrumbJsonLd(
  items: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate Organization JSON-LD structured data.
 */
export function generateOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Al-Nada Scientific Office',
    alternateName: 'مكتب الندى العلمي',
    url: BASE_URL,
    logo: `${BASE_URL}/img/alnada.webp`,
    description:
      'Exclusive agent for world-leading manufacturers of environmental, scientific, and industrial instruments in Egypt and the Middle East.',
    foundingDate: '2008',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '67 Mahattet ElKoba',
      addressLocality: 'Cairo',
      addressCountry: 'EG',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+20-100-701-5047',
        contactType: 'sales',
        email: 'sales@alnadascientific.com',
        availableLanguage: ['English', 'Arabic'],
      },
      {
        '@type': 'ContactPoint',
        telephone: '+20-2-24515545',
        contactType: 'customer service',
      },
    ],
    areaServed: ['EG', 'Middle East'],
    knowsAbout: [
      'Environmental Instruments',
      'Scientific Equipment',
      'Laboratory Equipment',
      'Air Quality Monitoring',
      'Gas Detection',
      'Water Quality Analysis',
      'Calibration Services',
      'Flue Gas Analyzers',
      'Weather Stations',
      'Sound Level Meters',
      'Noise Measurement',
      'Environmental Measurements',
    ],
  };
}

/**
 * Generate WebSite JSON-LD structured data (enables Google sitelinks search box).
 */
export function generateWebSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Al-Nada Scientific Office',
    alternateName: 'مكتب الندى العلمي',
    url: BASE_URL,
  };
}
