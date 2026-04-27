import os

# Map of Mojibake byte sequences -> replacement string
# The files appear to have been double-encoded: UTF-8 bytes read as Latin-1 then saved as UTF-8
replacements = [
    # âœ¦ (✦ Four Teardrop-Spoked Asterisk U+2726) -> HTML entity &#10022;
    (b'\xc3\xa2\xc5\x93\xc2\xa6', b'&#10022;'),
    # âœ" (✔ Heavy Check Mark U+2714) -> &#10004;
    (b'\xc3\xa2\xc5\x93\xe2\x80\x9c', b'&#10004;'),
    # âœ¨ (✨ Sparkles U+2728) -> &#10024;
    (b'\xc3\xa2\xc5\x93\xc2\xa8', b'&#10024;'),
    # ðŸ" (📋 Clipboard U+1F4CB) -> &#128203;
    (b'\xc3\xb0\xc5\xb8\xe2\x80\x9c\xc2\x9d', b'&#128203;'),
    # ðŸ§µ (🧵 Thread U+1F9F5) -> &#129525;
    (b'\xc3\xb0\xc5\xb8\xc2\xa7\xc2\xb5', b'&#129525;'),
    # ðŸ'" (👔 Necktie U+1F454) -> &#128084;
    (b'\xc3\xb0\xc5\xb8\xe2\x80\x98\xe2\x80\x9d', b'&#128084;'),
    # ðŸª¡ (🪡 Sewing Needle U+1FAA1) -> &#129697;
    (b'\xc3\xb0\xc5\xb8\xc2\xaa\xc2\xa1', b'&#129697;'),
    # â†' (→ Right Arrow U+2192) -> &rarr;  NOTE: using decimal form to avoid & issues
    (b'\xc3\xa2\xe2\x80\xa0\xe2\x80\x99', b'&#8594;'),
    # â€" (– En Dash U+2013)
    (b'\xc3\xa2\xe2\x82\xac\xe2\x80\x9d', b'&#8211;'),
    # XSâ€"3XL (en dash between sizes)
    (b'XS\xc3\xa2\xe2\x82\xac\xe2\x80\x9d3XL', b'XS&#8211;3XL'),
]

base = r'c:\Users\Mighty\Downloads\Colour Tribe Business\colourtribe\src'

files_to_fix = [
    r'components\quote\QuoteDrawer.jsx',
    r'components\homepage\FeaturedProducts.jsx',
    r'components\homepage\WhyChooseUs.jsx',
    r'components\homepage\HeroSection.jsx',
    r'components\homepage\HowItWorks.jsx',
    r'components\homepage\CTABand.jsx',
    r'components\homepage\Testimonials.jsx',
    r'components\homepage\StatsBar.jsx',
    r'components\homepage\CategoriesShowcase.jsx',
    r'components\layout\Footer.jsx',
    r'pages\QuotePage.jsx',
    r'pages\CataloguePage.jsx',
    r'pages\HomePage.jsx',
]

for rel in files_to_fix:
    filepath = os.path.join(base, rel)
    if not os.path.exists(filepath):
        print(f'SKIP (not found): {rel}')
        continue
    with open(filepath, 'rb') as f:
        content = f.read()
    original = content
    for bad, good in replacements:
        content = content.replace(bad, good)
    if content != original:
        with open(filepath, 'wb') as f:
            f.write(content)
        print(f'FIXED: {rel}')
    else:
        print(f'  ok : {rel}')

print('Done.')
