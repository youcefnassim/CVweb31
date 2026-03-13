import os
import re

base_dir = r"c:\Users\GAMESCASH-PC\OneDrive\Desktop\RaR\my project\My work\CVweb"
index_path = os.path.join(base_dir, "index.html")

with open(index_path, "r", encoding="utf-8") as f:
    content = f.read()

# Generate new navs
new_nav_links = {
    "Accueil": "index.html",
    "À Propos": "À Propos.html",
    "CV": "CV.html",
    "Services": "Services.html",
    "Portfolio": "Portfolio.html",
    "Offres": "Offres.html",
    "Contact": "Contact.html"
}

def generate_nav(active_name):
    nav_html = '<nav class="navbar">\n'
    for name, link in new_nav_links.items():
        active_str = ' class="active"' if name == active_name else ''
        nav_html += f'            <a href="{link}"{active_str}>{name}</a>\n'
    nav_html += '        </nav>'
    return nav_html

nav_pattern = r'<nav class="navbar">.*?</nav>'

section_bounds = [
    ("Accueil", "<!-- Section Accueil -->", "<!-- Section À Propos -->"),
    ("À Propos", "<!-- Section À Propos -->", "<!-- Section CV -->"),
    ("CV", "<!-- Section CV -->", "<!-- Section Services -->"),
    ("Services", "<!-- Section Services -->", "<!-- Section Portfolio -->"),
    ("Portfolio", "<!-- Section Portfolio -->", "<!-- Section Offres -->"),
    ("Offres", "<!-- Section Offres -->", "<!-- Section Contact -->"),
    ("Contact", "<!-- Section Contact -->", "<!-- Footer -->"),
]

# Pre-compute static parts to improve efficiency and resolve type errors
idx_nav = content.find('<nav class="navbar">')
head_part = content[0 : idx_nav]

nav_match = re.search(nav_pattern, content, re.DOTALL)
nav_end = int(nav_match.end()) if nav_match else 0

idx_sec_acc = content.find('<!-- Section Accueil -->')
after_nav = content[nav_end : idx_sec_acc]

idx_foot = content.find("<!-- Footer -->")
footer_part = content[idx_foot : len(content)]

for name, start_tag, end_tag in section_bounds:
    if name == "Accueil":
        continue
    
    # extract section
    idx_start = content.find(start_tag)
    idx_end = content.find(end_tag)
    sec_content = content[idx_start : idx_end]
    
    file_content = head_part + generate_nav(name) + after_nav + sec_content + "\n    " + footer_part
    
    filepath = os.path.join(base_dir, new_nav_links[name])
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(file_content)

# Modify index.html
idx_prop = content.find("<!-- Section À Propos -->")
home_content = content[idx_sec_acc : idx_prop]

index_new_content = head_part + generate_nav("Accueil") + after_nav + home_content + "\n    " + footer_part

with open(index_path, "w", encoding="utf-8") as f:
    f.write(index_new_content)

print("Split operation completed successfully.")
