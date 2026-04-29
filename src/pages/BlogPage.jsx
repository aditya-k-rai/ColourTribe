import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { setPageMeta, setJsonLd, removeJsonLd, buildBlogPostSchema, buildFaqSchema, buildBreadcrumbSchema } from '../utils/seo';

/* ─── Article Data ─────────────────────────────────────────────── */
const ARTICLES = [
  {
    slug: 'how-to-choose-hotel-uniforms',
    title: 'How to Choose the Right Hotel Uniform for Your Staff',
    date: '2026-04-01',
    category: 'Hotel & Hospitality',
    icon: '🏨',
    excerpt: 'A complete guide for hotel procurement managers on selecting the right fabric, style, and supplier for front office, housekeeping, and F&B staff uniforms.',
    keywords: ['hotel uniform', 'hospitality uniform', 'hotel staff uniform India', 'hotel uniform supplier'],
    faqs: [
      { q: 'What fabric is best for hotel front office uniforms?', a: 'Poly-Viscose (65/35 blend) is the gold standard for hotel front desk and management uniforms. It drapes well, resists wrinkles all day, and retains a sharp, professional appearance even after repeated washing.' },
      { q: 'How many uniforms should I order per hotel staff member?', a: 'The industry standard is 2-3 sets per employee. This allows one to be worn, one to be washed, and one as a backup — ensuring your team always presents immaculately.' },
      { q: 'Can I get my hotel logo embroidered on the uniforms?', a: 'Yes. Colour Tribe provides custom logo embroidery on all uniform orders. Simply share your logo file and our embroidery team handles the rest. This adds approximately 2 days to production time.' },
    ],
    content: `
      <h2>Why Hotel Uniform Selection Matters</h2>
      <p>Your hotel staff uniform is a visual representation of your brand. From the moment a guest walks through the door, what your team wears communicates your hotel's values: luxury, professionalism, and attention to detail.</p>
      
      <h2>Step 1: Choose the Right Fabric for Each Department</h2>
      <p>Different departments have vastly different physical demands. Here's a quick breakdown:</p>
      <ul>
        <li><strong>Front Office & Reception:</strong> Poly-Viscose (65/35 blend) — sharp drape, wrinkle resistant, professional sheen.</li>
        <li><strong>Housekeeping & Room Service:</strong> Terry Cotton (PC blend) — durable, stretchy, easy to wash and maintain.</li>
        <li><strong>Kitchen & Culinary Staff:</strong> 100% Cotton — breathable, heat-resistant, essential for chef safety.</li>
        <li><strong>F&B Service / Banquet:</strong> Poly-Viscose or spun polyester — stain-resistant and fast-drying.</li>
      </ul>

      <h2>Step 2: Consider Function and Movement</h2>
      <p>Housekeeping staff bend, carry, and move all day. Their uniforms need stretch panels and reinforced seams. Front desk staff stand for hours — their trousers need to hold their crease. Always test a sample before placing a bulk order.</p>

      <h2>Step 3: Brand Consistency Through Color</h2>
      <p>Choose colors that reflect your brand palette. If your hotel uses navy and gold, your uniforms should too. Colour Tribe can color-match to any Pantone code and provides custom embroidery on all orders.</p>

      <h2>Step 4: Minimum Order & Pricing</h2>
      <p>Colour Tribe's minimum order quantity is just 10 pieces per design — perfect for smaller boutique hotels. Bulk pricing discounts kick in at 50+ and 100+ pieces. All orders include pan-India delivery.</p>

      <h2>Conclusion</h2>
      <p>Choosing the right hotel uniform is an investment in your brand and your team's comfort. Get it right and your staff will look and feel their best — every single shift. <a href="/contact">Contact Colour Tribe</a> to request a free sample before committing to a full order.</p>
    `,
  },
  {
    slug: 'polyviscose-benefits-workwear',
    title: 'Why Poly-Viscose is the Best Fabric for Professional Workwear in India',
    date: '2026-04-08',
    category: 'Fabric Guide',
    icon: '🧵',
    excerpt: 'Discover why Poly-Viscose is the #1 choice for corporate uniforms, hotel workwear, and professional dress in India\'s climate.',
    keywords: ['polyviscose fabric', 'best fabric for uniform', 'poly viscose workwear', 'uniform material India'],
    faqs: [
      { q: 'What is Poly-Viscose fabric?', a: 'Poly-Viscose (PV) is a blend of polyester and viscose (rayon). The most common ratio is 65% polyester to 35% viscose. It combines the durability and wrinkle-resistance of polyester with the softness, breathability, and drape of viscose.' },
      { q: 'Is Poly-Viscose comfortable in hot Indian summers?', a: 'Yes. The viscose component makes Poly-Viscose significantly more breathable than 100% polyester. While not as breathable as pure cotton, it manages moisture better in air-conditioned environments like hotel lobbies and corporate offices.' },
      { q: 'How long do Poly-Viscose uniforms last?', a: 'With proper care, Poly-Viscose uniforms maintain their shape, color, and crease for 2-3 years of daily professional use — significantly longer than pure cotton which tends to shrink and fade faster.' },
    ],
    content: `
      <h2>The Science Behind Poly-Viscose</h2>
      <p>Poly-Viscose (PV) is a textile blend engineered specifically for professional environments. By combining polyester's strength with viscose's natural breathability, fabric technologists created a material that outperforms both individual fibers for most workwear applications.</p>

      <h2>Key Benefits for Indian Businesses</h2>
      <ul>
        <li><strong>Wrinkle Resistance:</strong> Poly-Viscose resists creasing, meaning your team looks sharp from morning briefing to evening service — no mid-day ironing required.</li>
        <li><strong>Color Retention:</strong> The polyester component locks in dye, keeping colors vibrant even after 100+ wash cycles.</li>
        <li><strong>Shape Memory:</strong> Trousers hold their crease. Jackets maintain their silhouette. Critical for front-of-house hotel and corporate roles.</li>
        <li><strong>Easy Care:</strong> Machine washable, quick-drying, and requires minimal ironing — reducing laundry costs for large operations.</li>
        <li><strong>Cost-Effective:</strong> Significantly cheaper than pure wool while delivering a similar professional appearance.</li>
      </ul>

      <h2>When to Choose Cotton Instead</h2>
      <p>Poly-Viscose is not ideal for every application. Kitchen and culinary staff should wear 100% cotton for its superior breathability and heat resistance. Healthcare scrubs may also benefit from cotton's natural anti-bacterial properties.</p>

      <h2>Colour Tribe's Poly-Viscose Range</h2>
      <p>All of Colour Tribe's formal suits, hotel uniforms, and corporate workwear use a premium 65/35 Poly-Viscose blend sourced from certified Indian textile mills. View our <a href="/products/men-formal-suit">Corporate Suit collection</a> or <a href="/products/front-office">Front Office uniform range</a>.</p>
    `,
  },
  {
    slug: 'chef-uniform-guide',
    title: 'The Complete Chef Uniform Guide for Restaurants and Hotels',
    date: '2026-04-15',
    category: 'Chef & Kitchen',
    icon: '👨‍🍳',
    excerpt: 'Everything you need to know about chef coats, kitchen trousers, aprons, and head gear for professional kitchen teams.',
    keywords: ['chef uniform', 'chef coat India', 'kitchen uniform', 'restaurant uniform', 'chef wear supplier'],
    faqs: [
      { q: 'What should a complete chef uniform set include?', a: 'A complete chef uniform set includes: a double-breasted chef coat, kitchen trousers (houndstooth or solid), a chef cap or toque, a neckerchief, and a full or half apron. Safety-toe kitchen shoes are recommended separately.' },
      { q: 'Why is white the traditional color for chef coats?', a: 'White is traditional for chef coats because it shows stains quickly, encouraging cleanliness — and can be bleached to maintain hygiene standards. However, many modern restaurants use black or colored chef coats for a more contemporary aesthetic.' },
      { q: 'What is the minimum order for chef uniforms at Colour Tribe?', a: 'The minimum order is 10 pieces. We supply to restaurants, hotel chains, culinary academies, and catering companies across India with factory-direct pricing and pan-India delivery.' },
    ],
    content: `
      <h2>Why Chef Uniforms Matter Beyond Appearance</h2>
      <p>Chef uniforms serve three critical functions: professional presentation, food safety, and personal protection. A proper chef coat provides a barrier against hot liquids, open flames, and cross-contamination. Never treat kitchen uniforms as an afterthought.</p>

      <h2>The Executive Chef Coat</h2>
      <p>The traditional double-breasted white chef coat is the universal symbol of culinary expertise. Key features to look for:</p>
      <ul>
        <li><strong>Material:</strong> 100% cotton or poly-cotton (Terry Cotton) blend. Cotton is essential for breathability in hot kitchen environments.</li>
        <li><strong>Double-breasted front:</strong> Allows the coat to be flipped inside-out to hide stains during service.</li>
        <li><strong>Knotted cloth buttons:</strong> Plastic buttons can melt or splinter — knotted cotton buttons are safer and traditional.</li>
        <li><strong>Long sleeves:</strong> Protect forearms from burns, splatters, and UV if working near open fire.</li>
      </ul>

      <h2>Kitchen Trousers</h2>
      <p>Chef trousers must balance comfort, safety, and style. The classic houndstooth pattern cleverly hides grease stains. Modern operations often use solid black or navy for a cleaner, contemporary look. All Colour Tribe chef trousers feature an elastic waistband with drawstring for all-day comfort.</p>

      <h2>Aprons: Full vs Half</h2>
      <p>Full aprons provide maximum coverage and are ideal for prep chefs and butchers. Half/waist aprons are preferred by waitstaff and baristas who need quick movement and style. Denim aprons have become the mark of artisan and craft kitchen operations.</p>

      <h2>Custom Branding</h2>
      <p>Colour Tribe provides custom embroidery on all chef uniforms. Add your restaurant or hotel logo, a chef's name, or a rank title. This elevates presentation and reduces uniform theft. <a href="/products/chef-uniform">Explore our Executive Chef collection</a>.</p>
    `,
  },
  {
    slug: 'corporate-uniform-policy',
    title: 'How to Create a Corporate Uniform Policy for Your Business',
    date: '2026-04-22',
    category: 'Corporate',
    icon: '💼',
    excerpt: 'A step-by-step guide for HR teams to implement a corporate uniform policy that boosts brand identity, team morale, and professional standards.',
    keywords: ['corporate uniform policy', 'company uniform India', 'corporate workwear', 'HR uniform guidelines'],
    faqs: [
      { q: 'Are corporate uniforms mandatory in India?', a: 'Corporate uniforms are not legally mandatory in India, but they are increasingly adopted across hospitality, aviation, healthcare, banking, and retail sectors. Many companies mandate uniforms as part of their employment contract and code of conduct.' },
      { q: 'Does providing uniforms have tax benefits in India?', a: 'Yes. Under Indian tax law, uniform allowance provided by employers to employees is eligible for tax exemption up to a reasonable amount (as determined by the Income Tax Department) when uniforms are provided in-kind as part of employment. Consult your CA for specific guidance.' },
      { q: 'How often should corporate uniforms be replaced?', a: 'Industry best practice is to replace corporate uniforms every 12-18 months for daily-wear roles. High-wear positions (kitchen, housekeeping) may require 6-monthly replacement. Budget 2-3 sets per employee to extend individual uniform lifespan.' },
    ],
    content: `
      <h2>Why Corporate Uniforms Make Business Sense</h2>
      <p>A corporate uniform policy is more than a dress code — it's a brand investment. When your team wears consistent, well-designed uniforms, you communicate professionalism, build brand recognition, and create psychological cohesion within your workforce.</p>

      <h2>Step 1: Define Your Uniform Needs</h2>
      <p>Map every role in your organization and categorize uniform requirements:</p>
      <ul>
        <li><strong>Customer-facing roles:</strong> Highest appearance priority. Formal attire, brand colors, embroidered logo.</li>
        <li><strong>Back-office roles:</strong> Smart casual options, polo shirts with logo.</li>
        <li><strong>Operational/field roles:</strong> Functional workwear with safety compliance.</li>
        <li><strong>Management:</strong> Premium fabric, tailored fit, distinguishing design elements.</li>
      </ul>

      <h2>Step 2: Choose Brand-Aligned Colors and Styles</h2>
      <p>Your uniform colors should reflect your brand palette. Colour Tribe can Pantone color-match to your existing brand guidelines and produce consistent results across all departments and orders.</p>

      <h2>Step 3: Set Care and Maintenance Standards</h2>
      <p>A uniform policy must include care instructions. Specify washing guidelines, ironing requirements, and conditions that warrant replacement. This protects your brand standards on the floor every day.</p>

      <h2>Step 4: Procurement and Budgeting</h2>
      <p>Budget for 2-3 sets per employee. Partner with a B2B manufacturer like Colour Tribe for factory-direct pricing — eliminating the retailer markup that adds 30-50% to off-the-shelf uniform costs. Our minimum order is 10 pieces with pan-India delivery.</p>
    `,
  },
  {
    slug: 'housekeeping-uniform-india',
    title: 'Best Housekeeping Uniforms for Hotels and Resorts in India',
    date: '2026-04-29',
    category: 'Housekeeping',
    icon: '🛏️',
    excerpt: 'A buyer\'s guide for hotel housekeeping uniforms — fabric selection, design considerations, and bulk procurement tips for Indian hotels.',
    keywords: ['housekeeping uniform', 'hotel housekeeping uniform India', 'room service uniform', 'utility staff uniform'],
    faqs: [
      { q: 'What fabric is best for hotel housekeeping uniforms?', a: 'Terry Cotton (Poly-Cotton or PC blend) is widely considered the best fabric for housekeeping uniforms in India. It is durable, stretchy, easy to wash at high temperatures, and quick-drying — all essential for staff who work through demanding physical shifts.' },
      { q: 'What color works best for housekeeping uniforms?', a: 'Traditionally, housekeeping uniforms in India use mid-tones like burgundy, teal, navy, or grey — colors that balance professionalism with the practical need to conceal daily soiling. Avoid pure white which shows stains instantly and requires heavy bleaching.' },
      { q: 'Does Colour Tribe supply housekeeping aprons and accessories?', a: 'Yes. In addition to full housekeeping uniforms, Colour Tribe supplies matching full aprons, service aprons, and head gear (bandanas, caps) to complete the professional look for your housekeeping team.' },
    ],
    content: `
      <h2>The Unique Demands of Housekeeping Uniforms</h2>
      <p>Housekeeping staff have among the most physically demanding roles in any hotel. They bend, stretch, carry, and move continuously for 8-10 hour shifts. Their uniforms must keep up — combining durability, comfort, and professional appearance.</p>

      <h2>Fabric Selection for Housekeeping</h2>
      <p>Terry Cotton (PC blend) is the industry standard for housekeeping uniforms in India for several key reasons:</p>
      <ul>
        <li><strong>Durability:</strong> Polyester adds tensile strength, meaning seams and fabric resist tearing under heavy movement.</li>
        <li><strong>Stretch and Comfort:</strong> Cotton provides natural stretch, allowing staff to move freely during physically demanding tasks.</li>
        <li><strong>Wash Fastness:</strong> PC blends maintain color and shape through commercial laundry washing at high temperatures — critical for hygiene standards.</li>
        <li><strong>Quick Dry:</strong> Dries faster than 100% cotton, reducing laundry turnaround time for large hotel operations.</li>
      </ul>

      <h2>Design Considerations</h2>
      <p>Housekeeping uniform design should prioritize:</p>
      <ul>
        <li><strong>Pockets:</strong> Large, accessible pockets for room keys, notepads, and small tools.</li>
        <li><strong>Stretch panels:</strong> Particularly in the back and underarm area for unrestricted movement.</li>
        <li><strong>Durable stitching:</strong> Double or triple stitched seams that withstand repeated washing and physical strain.</li>
        <li><strong>Logo embroidery:</strong> Hotel branding on the left chest maintains professional standards even in back-of-house operations.</li>
      </ul>

      <h2>Explore Our Housekeeping Range</h2>
      <p>Colour Tribe's <a href="/products/housekeeping">housekeeping uniform collection</a> is purpose-built for Indian hotel operations, with factory-direct pricing and a minimum order of just 10 pieces. Bulk pricing available at 50+ and 100+ pieces. Pan-India delivery included.</p>
    `,
  },
];

/* ─── Blog List Page ───────────────────────────────────────────── */
const BlogListPage = () => {
  useEffect(() => {
    setPageMeta({
      title: 'Uniform Blog & Industry Insights | Colour Tribe',
      description: 'Expert advice on hotel uniforms, chef wear, corporate workwear, and fabric selection for B2B buyers across India. Authoritative guides from Colour Tribe manufacturers.',
      canonicalPath: '/blog',
    });
    setJsonLd('ld-blog-breadcrumb', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.colourtribe.co.in/' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.colourtribe.co.in/blog' },
      ],
    });
    return () => removeJsonLd('ld-blog-breadcrumb');
  }, []);

  return (
    <div className="bg-cream min-h-screen pt-24 pb-20 font-body">
      {/* Header */}
      <div className="bg-navy py-16 mb-12">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-gold uppercase tracking-widest text-xs font-bold mb-4 block">Industry Expertise</span>
            <h1 className="font-display text-4xl md:text-5xl text-white font-bold mb-4">Uniform Insights & Guides</h1>
            <p className="text-white/70 max-w-2xl mx-auto">
              Expert guides on fabric selection, uniform design, and B2B procurement for India's hospitality, corporate, and industrial sectors.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ARTICLES.map((article, i) => (
            <motion.article
              key={article.slug}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden group hover:shadow-xl transition-all duration-300"
            >
              <Link to={`/blog/${article.slug}`} className="block">
                <div className="h-40 bg-navy flex items-center justify-center text-7xl group-hover:scale-110 transition-transform duration-500">
                  {article.icon}
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gold bg-gold/10 px-2 py-1 rounded-full">
                      {article.category}
                    </span>
                    <span className="text-[10px] text-gray-400">{article.date}</span>
                  </div>
                  <h2 className="font-display text-lg font-bold text-navy mb-3 leading-tight group-hover:text-gold transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">{article.excerpt}</p>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <span className="text-xs font-bold text-gold">Read Article →</span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─── Blog Article Page ────────────────────────────────────────── */
const BlogArticlePage = ({ slug }) => {
  const article = ARTICLES.find(a => a.slug === slug);

  useEffect(() => {
    if (!article) return;
    setPageMeta({
      title: `${article.title} | Colour Tribe Blog`,
      description: article.excerpt,
      canonicalPath: `/blog/${article.slug}`,
    });
    setJsonLd('ld-blog-post', buildBlogPostSchema({
      title: article.title,
      description: article.excerpt,
      slug: article.slug,
      datePublished: article.date,
      keywords: article.keywords,
    }));
    setJsonLd('ld-blog-faq', buildFaqSchema(article.faqs));
    setJsonLd('ld-blog-breadcrumb', buildBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Blog', path: '/blog' },
      { name: article.title, path: `/blog/${article.slug}` },
    ]));
    return () => {
      removeJsonLd('ld-blog-post');
      removeJsonLd('ld-blog-faq');
      removeJsonLd('ld-blog-breadcrumb');
    };
  }, [slug]);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 bg-cream text-center">
        <div>
          <h1 className="text-3xl font-display text-navy mb-4">Article Not Found</h1>
          <Link to="/blog" className="text-gold hover:underline">← Back to Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cream min-h-screen pt-24 pb-20 font-body">
      {/* Article Header */}
      <div className="bg-navy py-16 mb-12">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className="text-6xl mb-6">{article.icon}</div>
          <span className="text-gold uppercase tracking-widest text-xs font-bold mb-4 block">{article.category}</span>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-white font-bold mb-4 leading-tight">{article.title}</h1>
          <p className="text-white/70 max-w-2xl mx-auto">{article.excerpt}</p>
          <p className="text-white/40 text-xs mt-4">Published: {article.date} · By Colour Tribe</p>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-4xl">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-navy/50 mb-8 uppercase tracking-wider font-semibold">
              <Link to="/" className="hover:text-navy">Home</Link>
              <span>›</span>
              <Link to="/blog" className="hover:text-navy">Blog</Link>
              <span>›</span>
              <span className="text-navy">{article.category}</span>
            </nav>

            {/* Article Body */}
            <div
              className="prose prose-navy max-w-none
                         [&_h2]:font-display [&_h2]:text-2xl [&_h2]:text-navy [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-4
                         [&_p]:text-gray-700 [&_p]:leading-relaxed [&_p]:mb-4
                         [&_ul]:space-y-2 [&_ul]:my-4 [&_li]:text-gray-700 [&_li]:leading-relaxed
                         [&_strong]:text-navy [&_a]:text-gold [&_a]:underline"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* FAQ Section — AEO Critical */}
            <div className="mt-12 bg-white rounded-2xl border border-gray-100 p-8">
              <h2 className="font-display text-2xl text-navy font-bold mb-6">Common Questions</h2>
              <div className="space-y-4">
                {article.faqs.map(({ q, a }) => (
                  <details key={q} className="border border-gray-100 rounded-xl px-6 py-4 group hover:border-gold transition-colors">
                    <summary className="font-bold text-navy cursor-pointer list-none flex justify-between items-center outline-none">
                      {q}
                      <span className="text-gold text-xl ml-4 shrink-0 group-open:rotate-45 transition-transform duration-300">+</span>
                    </summary>
                    <p className="text-gray-600 mt-3 text-sm leading-relaxed border-t border-gray-100 pt-3">{a}</p>
                  </details>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8 bg-navy rounded-2xl p-8 text-center text-white">
              <h3 className="font-display text-2xl font-bold mb-3">Ready to Order?</h3>
              <p className="text-white/70 mb-6 text-sm">Minimum 10 pieces. Factory-direct pricing. Pan-India delivery.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/products" className="bg-gold text-navy font-bold px-8 py-3 rounded-full hover:bg-white transition-colors">
                  Browse Products
                </Link>
                <Link to="/contact" className="border border-white/30 text-white font-bold px-8 py-3 rounded-full hover:bg-white/10 transition-colors">
                  Contact Us
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
              <h3 className="font-bold text-navy text-sm uppercase tracking-wider mb-4">More Articles</h3>
              <div className="space-y-4">
                {ARTICLES.filter(a => a.slug !== slug).slice(0, 4).map(a => (
                  <Link key={a.slug} to={`/blog/${a.slug}`} className="flex gap-3 group">
                    <span className="text-2xl shrink-0">{a.icon}</span>
                    <div>
                      <p className="text-xs font-bold text-navy group-hover:text-gold transition-colors leading-snug">{a.title}</p>
                      <p className="text-[10px] text-gray-400 mt-1">{a.date}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-gray-100">
                <Link to="/contact" className="w-full block bg-gold text-navy font-bold py-3 rounded-full text-center text-sm hover:bg-gold/90 transition-colors">
                  Get a Quote
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

/* ─── Router Component ─────────────────────────────────────────── */
const BlogPage = () => {
  const { slug } = useParams();
  return slug ? <BlogArticlePage slug={slug} /> : <BlogListPage />;
};

export default BlogPage;
export { ARTICLES };
