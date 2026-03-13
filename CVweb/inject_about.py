import os

base_dir = r"c:\Users\GAMESCASH-PC\OneDrive\Desktop\RaR\my project\My work\CVweb"
filepath = os.path.join(base_dir, "À Propos.html")

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

marquee_html = """
    <!-- Tech Stack Marquee -->
    <div class="tech-marquee-container">
        <div class="tech-marquee">
            <div class="tech-marquee-content">
                <i class="fab fa-html5"></i> <span>HTML5</span>
                <i class="fab fa-css3-alt"></i> <span>CSS3</span>
                <i class="fab fa-js"></i> <span>JavaScript</span>
                <i class="fab fa-react"></i> <span>React</span>
                <i class="fab fa-vuejs"></i> <span>Vue.js</span>
                <i class="fab fa-node-js"></i> <span>Node.js</span>
                <i class="fab fa-figma"></i> <span>Figma</span>
                <i class="fab fa-git-alt"></i> <span>Git</span>
                <i class="fab fa-github"></i> <span>GitHub</span>
            </div>
            <!-- Duplicate for infinite scroll loop -->
            <div class="tech-marquee-content">
                <i class="fab fa-html5"></i> <span>HTML5</span>
                <i class="fab fa-css3-alt"></i> <span>CSS3</span>
                <i class="fab fa-js"></i> <span>JavaScript</span>
                <i class="fab fa-react"></i> <span>React</span>
                <i class="fab fa-vuejs"></i> <span>Vue.js</span>
                <i class="fab fa-node-js"></i> <span>Node.js</span>
                <i class="fab fa-figma"></i> <span>Figma</span>
                <i class="fab fa-git-alt"></i> <span>Git</span>
                <i class="fab fa-github"></i> <span>GitHub</span>
            </div>
        </div>
    </div>
"""

achievements_html = """
    <!-- Achievements Counter -->
    <div class="achievements-section" id="achievements">
        <div class="achievement-box">
            <i class='bx bx-briefcase'></i>
            <h3 class="counter" data-target="15">0</h3>
            <p data-i18n="achieve_projects">Projets Réalisés</p>
        </div>
        <div class="achievement-box">
            <i class='bx bx-code-alt'></i>
            <h3 class="counter" data-target="12000">0</h3>
            <p data-i18n="achieve_lines">Lignes de Code</p>
        </div>
        <div class="achievement-box">
            <i class='bx bx-time'></i>
            <h3 class="counter" data-target="2">0</h3>
            <p data-i18n="achieve_exp">Ans d'Expérience</p>
        </div>
        <div class="achievement-box">
            <i class='bx bx-coffee'></i>
            <h3 class="counter" data-target="850">0</h3>
            <p data-i18n="achieve_coffee">Tasses de Café</p>
        </div>
    </div>
"""

# Insert before closing section tag or after skills
if '<div class="skills">' in content:
    idx = content.find('<div class="skills">')
    # Insert Marquee before skills
    content = content[:idx] + marquee_html + content[idx:]
    
    # Insert Achievements after skills
    skills_end = content.find('</div>', content.find('</div>', content.find('<div class="skill-items">'))+6)+6
    content = content[:skills_end] + achievements_html + content[skills_end:]

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Injected marquee and achievements into À Propos.html")
