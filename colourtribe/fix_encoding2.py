import os

# ============================================================
# Comprehensive Mojibake fix for Colour Tribe project
# These files contain UTF-8 bytes that were double-encoded 
# (read as Latin-1, then re-encoded as UTF-8)
# ============================================================

# Each tuple: (bad_byte_sequence, replacement_bytes)
replacements = [
    # --- Symbols ---
    # ✦ (U+2726 four-teardrop asterisk) -> &#10022;
    (bytes.fromhex('c3a2c593c2a6'), b'&#10022;'),
    # ✔ (U+2714 heavy check mark) -> &#10004;
    (bytes.fromhex('c3a2c593e2809c'), b'&#10004;'),
    # ✨ (U+2728 sparkles) -> &#10024;
    (bytes.fromhex('c3a2c593c2a8'), b'&#10024;'),
    # → (U+2192 right arrow) -> &#8594;
    (bytes.fromhex('c3a2e280a0e28099'), b'&#8594;'),
    # — (U+2014 em dash) variant 1 -> &#8212;
    (bytes.fromhex('c3a2e282ace2809d'), b'&#8212;'),
    # — (U+2014 em dash) variant 2 (â€") -> &#8212;
    (bytes.fromhex('c3a2e282ace2809c'), b'&#8212;'),
    # – (U+2013 en dash) -> &#8211;
    (bytes.fromhex('c3a2e282ace2809d'), b'&#8211;'),
    # ₹ (U+20B9 Indian Rupee) -> &#8377;
    (bytes.fromhex('c3a2e2809ac2b9'), b'&#8377;'),
    # • (U+2022 bullet) -> &#8226;
    (bytes.fromhex('c3a2e282acc2a2'), b'&bull;'),
    # … (U+2026 ellipsis) - the triple dots
    (bytes.fromhex('c383c2a2c3a2e282acc2a0c3a2e282ace284a2'), b'&hellip;'),

    # --- Emojis (double-encoded multi-byte) ---
    # 📋 (U+1F4CB clipboard) -> &#128203;
    (bytes.fromhex('c3b0c5b8e2809cc29d'), b'&#128203;'),
    # 👔 (U+1F454 necktie) -> &#128084;
    (bytes.fromhex('c3b0c5b8e28098e2809d'), b'&#128084;'),
    # 🧵 (U+1F9F5 thread/spool) -> &#129525;
    (bytes.fromhex('c3b0c5b8c2a7c2b5'), b'&#129525;'),
    # 🪡 (U+1FAA1 sewing needle) -> &#129697;
    (bytes.fromhex('c3b0c5b8c2aac2a1'), b'&#129697;'),
    # 🔊 (U+1F50A loud speaker) -> &#128266;
    (bytes.fromhex('c3b0c5b8c5a1c5a1'), b'&#128266;'),
    # 🌱 (U+1F331 seedling) -> &#127793;
    (bytes.fromhex('c3b0c5b8e2809cc2b1'), b'&#127793;'),
    # 🏨 (U+1F3E8 hotel) -> &#127976;
    (bytes.fromhex('c3b0c5b8c28fc2ad'), b'&#127981;'),
    # 🧺 (some emoji related to cleaning/laundry)
    (bytes.fromhex('c3b0c5b8e2809dc28d'), b'&#129338;'),
    # 🤍 or similar white heart emoji 
    (bytes.fromhex('c3b0c5b8e2809cc2a6'), b'&#129293;'),
    # ❤️ or 🛡️ shield
    (bytes.fromhex('c3b0c5b8e280a1c2ae'), b'&#128737;'),
    # 🔳 or similar
    (bytes.fromhex('c3b0c5b8e280a1c2b3'), b'&#127987;'),
    # ✡️ or star
    (bytes.fromhex('c3a2c5a1c2a1'), b'&#10033;'),
    # 🎽 (U+1F3BD running shirt) 
    (bytes.fromhex('c3b0c5b8e28098e2809d'), b'&#128085;'),
]

base = r'c:\Users\Mighty\Downloads\Colour Tribe Business\colourtribe\src'
dirty_files = [
    r'components\homepage\CategoriesShowcase.jsx',
    r'components\homepage\HowItWorks.jsx',
    r'components\homepage\LeadModal.jsx',
    r'components\layout\Footer.jsx',
    r'pages\AboutPage.jsx',
    r'pages\CataloguePage.jsx',
    r'pages\ProductPage.jsx',
    r'pages\admin\Dashboard.jsx',
    r'pages\admin\ProductsManager.jsx',
    r'pages\admin\QuotesManager.jsx',
]

for rel in dirty_files:
    filepath = os.path.join(base, rel)
    if not os.path.exists(filepath):
        print(f'SKIP: {rel}')
        continue
    with open(filepath, 'rb') as f:
        content = f.read()
    original = content
    for bad, good in replacements:
        content = content.replace(bad, good)
    if content != original:
        with open(filepath, 'wb') as f:
            f.write(content)
        # Count remaining non-ASCII
        remaining = len([b for b in content if b > 127])
        print(f'FIXED: {rel} ({remaining} non-ASCII remaining)')
    else:
        remaining = len([b for b in content if b > 127])
        print(f'  ok : {rel} ({remaining} non-ASCII)')

print('\nDone.')
