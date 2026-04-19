import os
import glob

html_files = glob.glob('*.html')
for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Header Replace
    header_search = '        <div class="logo">Taxi <span>&amp; Van Transfers</span></div>\n        <a href="index.html" class="logo-link"><img src="images/logo.jpg" alt="Taxi & Van Transfers Logo" class="brand-logo"></a>'
    
    header_replace = '''        <a href="index.html" class="logo">
            <img src="images/logo.jpg" alt="Taxi & Van Transfers Logo" class="brand-logo">
            <div class="logo-text">Taxi <span>&amp; Van Transfers</span></div>
        </a>'''

    # Footer Replace
    footer_search = '                <h3>Taxi <span>&amp; Van Transfers</span></h3>\n                <img src="images/logo.jpg" alt="Taxi & Van Transfers Logo" class="footer-logo">'
    
    footer_replace = '''                <div class="footer-logo-wrapper">
                    <img src="images/logo.jpg" alt="Taxi & Van Transfers Logo" class="footer-logo">
                    <h3 class="footer-logo-text">Taxi <span>&amp; Van Transfers</span></h3>
                </div>'''

    content = content.replace('\r\n', '\n')
    
    content = content.replace(header_search, header_replace)
    content = content.replace(footer_search, footer_replace)

    with open(file, 'w', encoding='utf-8', newline='\r\n') as f:
        f.write(content)
print('Done!')
