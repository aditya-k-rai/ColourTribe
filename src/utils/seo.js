/**
 * SEO Utility — Colour Tribe
 * Manages dynamic <title>, <meta description> and JSON-LD structured data
 * for every page to target Google Search + AI Answer Engines (AEO).
 */

export const SITE_NAME = 'Colour Tribe';
export const SITE_URL = 'https://www.colourtribe.co.in';
export const SITE_PHONE = '+91 97173 55779';
export const SITE_EMAIL = 'adorabletradingk08@gmail.com';
export const SITE_ADDRESS = 'KH 58, Tigri Gol Chakkar, Greater Noida, Uttar Pradesh, India';

/**
 * Sets document title + meta description dynamically.
 */
export function setPageMeta({ title, description }) {
  document.title = title;

  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.name = 'description';
    document.head.appendChild(metaDesc);
  }
  metaDesc.content = description;

  // Open Graph
  setMeta('og:title', title);
  setMeta('og:description', description);
  setMeta('og:site_name', SITE_NAME);
  setMeta('og:type', 'website');

  // Twitter
  setMeta('twitter:card', 'summary_large_image');
  setMeta('twitter:title', title);
  setMeta('twitter:description', description);
}

function setMeta(property, content) {
  let el = document.querySelector(`meta[property="${property}"]`) ||
           document.querySelector(`meta[name="${property}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(property.startsWith('og:') || property.startsWith('twitter:') ? 'property' : 'name', property);
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

/* ─── Pre-built Schemas ───────────────────────────────────────── */

export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.jpeg`,
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
    'https://www.colourtribe.co.in',
  ],
};

export const LOCAL_BUSINESS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ClothingStore',
  name: SITE_NAME,
  image: `${SITE_URL}/logo.jpeg`,
  '@id': SITE_URL,
  url: SITE_URL,
  telephone: SITE_PHONE,
  priceRange: '₹₹',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'KH 58, Tigri Gol Chakkar',
    addressLocality: 'Greater Noida',
    addressRegion: 'Uttar Pradesh',
    postalCode: '201306',
    addressCountry: 'IN',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
    opens: '09:00',
    closes: '19:00',
  },
  description:
    'Colour Tribe is a B2B manufacturer of professional uniforms – hospitality, chef, corporate, housekeeping & more. Factory-direct pricing, pan-India delivery, custom logo embroidery.',
};

export function buildProductSchema(product, category) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    sku: product.sku,
    description: `${product.name} – professional uniform by Colour Tribe. Category: ${category?.name || ''}. Available in all sizes XS-3XL with custom embroidery.`,
    brand: {
      '@type': 'Brand',
      name: SITE_NAME,
    },
    offers: {
      '@type': 'Offer',
      url: `${SITE_URL}/product/${product.sku}`,
      priceCurrency: 'INR',
      price: product.basePrice,
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
