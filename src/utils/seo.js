/**
 * SEO Utility — Colour Tribe
 * Manages dynamic <title>, <meta description>, canonical, og:url and
 * JSON-LD structured data for every page to target Google Search + AI Answer Engines (AEO).
 */

export const SITE_NAME = 'Colour Tribe';
export const SITE_URL = 'https://www.colourtribe.co.in';
export const SITE_PHONE = '+91 97173 55779';
export const SITE_EMAIL = 'adorabletradingk08@gmail.com';
export const SITE_ADDRESS = 'KH 58, Tigri Gol Chakkar, Greater Noida, Uttar Pradesh, India';
// No spaces in logo URL — critical for schema validation
export const SITE_LOGO = `${SITE_URL}/logo.jpeg`;

/**
 * Sets document title + meta description + canonical + og:url dynamically.
 * @param {{ title: string, description: string, canonicalPath?: string }} opts
 */
export function setPageMeta({ title, description, canonicalPath }) {
  document.title = title;

  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.name = 'description';
    document.head.appendChild(metaDesc);
  }
  metaDesc.content = description;

  // Canonical
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  // Always set canonical — use provided path or current window location
  const canonicalUrl = canonicalPath
    ? `${SITE_URL}${canonicalPath}`
    : `${SITE_URL}${window.location.pathname}`;
  link.href = canonicalUrl;

  // Open Graph
  setMeta('og:title', title, 'property');
  setMeta('og:description', description, 'property');
  setMeta('og:site_name', SITE_NAME, 'property');
  setMeta('og:type', 'website', 'property');
  setMeta('og:url', canonicalUrl, 'property');

  // Twitter
  setMeta('twitter:card', 'summary_large_image', 'name');
  setMeta('twitter:title', title, 'name');
  setMeta('twitter:description', description, 'name');
}

function setMeta(key, content, attr = 'name') {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

/**
 * Injects / updates a JSON-LD <script> tag in <head>.
 */
export function setJsonLd(id, schema) {
  let script = document.getElementById(id);
  if (!script) {
    script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(schema, null, 2);
}

/**
 * Removes a JSON-LD script by id (call on unmount / page change).
 */
export function removeJsonLd(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

/* ─── Static Schemas (injected on all pages via index.html) ─── */

export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: SITE_LOGO,
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: SITE_PHONE,
    contactType: 'customer service',
    areaServed: 'IN',
    availableLanguage: ['English', 'Hindi'],
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'KH 58, Tigri Gol Chakkar',
    addressLocality: 'Greater Noida',
    addressRegion: 'Uttar Pradesh',
    postalCode: '201306',
    addressCountry: 'IN',
  },
  sameAs: [
    'https://www.instagram.com/colourtribe.in/',
    'https://www.linkedin.com/company/colour-tribe/',
    'https://www.facebook.com/colourtribe.in/',
  ],
};

export const LOCAL_BUSINESS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ClothingStore',
  name: SITE_NAME,
  image: SITE_LOGO,
  '@id': SITE_URL,
  url: SITE_URL,
  telephone: SITE_PHONE,
  email: SITE_EMAIL,
  priceRange: '₹₹',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'KH 58, Tigri Gol Chakkar',
    addressLocality: 'Greater Noida',
    addressRegion: 'Uttar Pradesh',
    postalCode: '201306',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 28.4744,
    longitude: 77.5040,
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
    opens: '09:00',
    closes: '19:00',
  },
  areaServed: [
    { '@type': 'City', name: 'Delhi', addressCountry: 'IN' },
    { '@type': 'City', name: 'Noida', addressCountry: 'IN' },
    { '@type': 'City', name: 'Greater Noida', addressCountry: 'IN' },
    { '@type': 'City', name: 'Gurgaon', addressCountry: 'IN' },
    { '@type': 'Country', name: 'India' },
  ],
  sameAs: [
    'https://www.instagram.com/colourtribe.in/',
    'https://www.linkedin.com/company/colour-tribe/',
    'https://www.facebook.com/colourtribe.in/',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '127',
    bestRating: '5',
    worstRating: '1',
  },
  description:
    'Colour Tribe is a B2B manufacturer of professional uniforms – hospitality, chef, corporate, housekeeping & more. Factory-direct pricing, pan-India delivery, custom logo embroidery. Minimum 10 pieces.',
};

/* ─── Dynamic Schema Builders ─────────────────────────────────── */

export function buildProductSchema(product, category) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    sku: product.sku,
    description: `${product.name} – professional uniform by Colour Tribe. Category: ${category?.name || ''}. Available in all sizes XS-3XL with custom embroidery.`,
    image: SITE_LOGO,
    brand: {
      '@type': 'Brand',
      name: SITE_NAME,
    },
    offers: {
      '@type': 'Offer',
      url: `${SITE_URL}/product/${product.sku}`,
      priceCurrency: 'INR',
      price: product.basePrice || 500,
      availability: 'https://schema.org/InStock',
      seller: { '@type': 'Organization', name: SITE_NAME },
    },
  };
}

export function buildFaqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

export function buildBreadcrumbSchema(crumbs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.path}`,
    })),
  };
}

/**
 * Article schema — for blog posts and content pages like fabric-guide.
 */
export function buildArticleSchema({ title, description, path = '/fabric-guide', datePublished = '2026-04-01' }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: SITE_LOGO,
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: { '@type': 'ImageObject', url: SITE_LOGO },
    },
    datePublished,
    dateModified: new Date().toISOString().split('T')[0],
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}${path}` },
  };
}

/**
 * LocalBusiness schema customized per city — for city landing pages.
 */
export function buildCityLocalBusinessSchema(city) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ClothingStore',
    name: `${SITE_NAME} — Uniform Supplier in ${city}`,
    url: SITE_URL,
    telephone: SITE_PHONE,
    image: SITE_LOGO,
    description: `Colour Tribe supplies premium B2B uniforms to businesses in ${city}. Chef uniforms, hotel wear, corporate suits, housekeeping uniforms — factory-direct with pan-India delivery.`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'KH 58, Tigri Gol Chakkar',
      addressLocality: 'Greater Noida',
      addressRegion: 'Uttar Pradesh',
      postalCode: '201306',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 28.4744,
      longitude: 77.5040,
    },
    areaServed: {
      '@type': 'City',
      name: city,
      addressCountry: 'IN',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '127',
    },
  };
}

/**
 * Blog post schema builder.
 */
export function buildBlogPostSchema({ title, description, slug, datePublished, keywords = [] }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    keywords: keywords.join(', '),
    image: SITE_LOGO,
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: { '@type': 'ImageObject', url: SITE_LOGO },
    },
    datePublished,
    dateModified: new Date().toISOString().split('T')[0],
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/blog/${slug}` },
  };
}
