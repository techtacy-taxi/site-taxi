import os
import glob
import re

html_files = glob.glob('*.html')
for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Step 1: Clean up any half-done header logo links if they exist so we can standardize
    content = re.sub(r'<div class="logo">.*?</div>(\s*<a href="index\.html" class="logo-link">.*?</a>)?', 'SPLIT_HERE_HEADER', content, flags=re.DOTALL)
    # The first logo div is usually the header one. Wait, in footer there's no <div class="logo">.
    
    # Step 2: Clean up footer
    # Original footer was: <h3>Taxi <span>&amp; Van Transfers</span></h3>
    # Or maybe it was already half replaced.
    content = re.sub(r'<h3>Taxi <span>&amp; Van Transfers</span></h3>(\s*<img src="images/logo\.jpg".*?>)?', 'SPLIT_HERE_FOOTER', content, flags=re.DOTALL)
    
    # wait, my previous replacement might have put the new <a href="index.html" class="logo">...
    content = re.sub(r'<a href="index\.html" class="logo">\s*<img src="images/logo\.jpg" alt="Taxi &amp; Van Transfers Logo" class="brand-logo">\s*<div class="logo-text">Taxi <span>&amp; Van Transfers</span></div>\s*</a>', 'SPLIT_HERE_HEADER', content, flags=re.DOTALL)
    content = re.sub(r'<div class="footer-logo-wrapper">\s*<img src="images/logo\.jpg" alt="Taxi & Van Transfers Logo" class="footer-logo">\s*<h3 class="footer-logo-text">Taxi <span>&amp; Van Transfers</span></h3>\s*</div>', 'SPLIT_HERE_FOOTER', content, flags=re.DOTALL)

    header_replacement = '''<a href="index.html" class="logo">
            <img src="images/logo.jpg" alt="Taxi & Van Transfers Logo" class="brand-logo">
            <div class="logo-text">Taxi <span>&amp; Van Transfers</span></div>
        </a>'''
        
    footer_replacement = '''<div class="footer-logo-wrapper">
                    <img src="images/logo.jpg" alt="Taxi & Van Transfers Logo" class="footer-logo">
                    <h3 class="footer-logo-text">Taxi <span>&amp; Van Transfers</span></h3>
                </div>'''

    content = content.replace('SPLIT_HERE_HEADER', header_replacement, 1)
    content = content.replace('SPLIT_HERE_FOOTER', footer_replacement, 1)

    with open(file, 'w', encoding='utf-8', newline='\n') as f:
        f.write(content)

print('Done script')
