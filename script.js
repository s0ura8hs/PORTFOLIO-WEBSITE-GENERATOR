// Generate portfolio files and create zip
async function generatePortfolio(data) {
    const zip = new window.JSZip();
    
    // Create HTML file
    const html = generateHTML(data);
    zip.file("index.html", html);
    
    // Create CSS file
    const css = generateCSS(data);
    zip.file("style.css", css);
    
    // Create JS file
    const js = generateJS(data);
    zip.file("script.js", js);
    
    // In a real app, we would save the zip file here
    // For demo purposes, we'll just log the data
    console.log('Portfolio data:', data);
    
    return true;
}

// Generate HTML content
function generateHTML(data) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.fullName} - ${data.role}</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <div class="container">
            <h1>${data.fullName}</h1>
            <h2>${data.role}</h2>
            ${data.tagline ? `<p class="tagline">${data.tagline}</p>` : ''}
        </div>
    </header>
    
    <main>
        <section class="about">
            <div class="container">
                <h2>About Me</h2>
                <div class="about-content">
                    <div class="about-text">
                        <p>${data.aboutMe}</p>
                    </div>
                </div>
            </div>
        </section>
        
        <section class="skills">
            <div class="container">
                <h2>Skills</h2>
                <div class="skills-grid">
                    ${data.skills.map(skill => `
                        <div class="skill">
                            <h3>${skill.name}</h3>
                            <div class="skill-bar">
                                <div class="skill-progress" style="width: ${skill.percentage}%"></div>
                            </div>
                            <span class="skill-percentage">${skill.percentage}%</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>
        
        <section class="education">
            <div class="container">
                <h2>Education</h2>
                <div class="education-list">
                    ${data.education.map(edu => `
                        <div class="education-item">
                            <h3>${edu.degree}</h3>
                            <p>${edu.institution}, ${edu.year}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>
        
        <section class="certificates">
            <div class="container">
                <h2>Certificates</h2>
                <div class="certificates-list">
                    ${data.certificates.map(cert => `
                        <div class="certificate-item">
                            <h3>${cert.name}</h3>
                            <a href="${cert.link}" target="_blank">View Certificate</a>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>
        
        ${data.includePhotography ? `
            <section class="photography">
                <div class="container">
                    <h2>Photography</h2>
                    <div class="photo-gallery">
                        ${data.photography.map(photo => `
                            <div class="photo-item">
                                <img src="${photo.image}" alt="${photo.title}">
                                <h3>${photo.title}</h3>
                                ${photo.description ? `<p>${photo.description}</p>` : ''}
                                ${photo.location ? `<p class="location">Location: ${photo.location}</p>` : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>
        ` : ''}
        
        <section class="contact">
            <div class="container">
                <h2>Contact</h2>
                <div class="contact-info">
                    <p>Email: <a href="mailto:${data.email}">${data.email}</a></p>
                    ${data.github ? `<p>GitHub: <a href="${data.github}" target="_blank">${data.github}</a></p>` : ''}
                    ${data.linkedin ? `<p>LinkedIn: <a href="${data.linkedin}" target="_blank">${data.linkedin}</a></p>` : ''}
                </div>
            </div>
        </section>
    </main>
    
    <footer>
        <div class="container">
            <p>&copy; ${new Date().getFullYear()} ${data.fullName}. All rights reserved.</p>
        </div>
    </footer>
    
    <script src="script.js"></script>
</body>
</html>`;
}

// Generate CSS content
function generateCSS(data) {
    return `/* Generated portfolio styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #f9f9f9;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
}

header {
    background: linear-gradient(135deg, #ffd700 0%, #ff6f00 100%);
    color: white;
    padding: 5rem 0;
    text-align: center;
}

header h1 {
    font-size: 3rem;
    margin-bottom: 0.5rem;
}

header h2 {
    font-size: 1.5rem;
    font-weight: 400;
    margin-bottom: 1rem;
}

.tagline {
    font-size: 1.2rem;
    opacity: 0.9;
}

section {
    padding: 5rem 0;
}

section h2 {
    font-size: 2rem;
    margin-bottom: 2rem;
    text-align: center;
    color: #ff6f00;
}

.about-content {
    display: flex;
    align-items: center;
    gap: 2rem;
}

.about-text {
    flex: 1;
}

.skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
}

.skill {
    background: white;
    padding: 1.5rem;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.skill h3 {
    margin-bottom: 1rem;
    color: #333;
}

.skill-bar {
    height: 10px;
    background: #eee;
    border-radius: 5px;
    overflow: hidden;
    margin-bottom: 0.5rem;
}

.skill-progress {
    height: 100%;
    background: linear-gradient(90deg, #ffd700, #ff6f00);
    border-radius: 5px;
}

.skill-percentage {
    font-weight: bold;
    color: #ff6f00;
}

.education-list,
.certificates-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
}

.education-item,
.certificate-item {
    background: white;
    padding: 1.5rem;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.education-item h3,
.certificate-item h3 {
    margin-bottom: 0.5rem;
    color: #333;
}

.certificate-item a {
    color: #ff6f00;
    text-decoration: none;
}

.certificate-item a:hover {
    text-decoration: underline;
}

.photo-gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
}

.photo-item {
    background: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.photo-item img {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.photo-item h3 {
    padding: 1rem 1rem 0.5rem;
    color: #333;
}

.photo-item p {
    padding: 0 1rem 1rem;
    color: #666;
}

.photo-item .location {
    font-style: italic;
    color: #888;
}

.contact-info {
    background: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    margin: 0 auto;
}

.contact-info p {
    margin-bottom: 1rem;
}

.contact-info a {
    color: #ff6f00;
    text-decoration: none;
}

.contact-info a:hover {
    text-decoration: underline;
}

footer {
    background: #333;
    color: white;
    padding: 2rem 0;
    text-align: center;
}

@media (max-width: 768px) {
    header {
        padding: 3rem 0;
    }
    
    header h1 {
        font-size: 2.5rem;
    }
    
    section {
        padding: 3rem 0;
    }
    
    .about-content {
        flex-direction: column;
    }
    
    .skills-grid,
    .education-list,
    .certificates-list,
    .photo-gallery {
        grid-template-columns: 1fr;
    }
}`;
}

// Generate JS content
function generateJS(data) {
    return `// Generated portfolio script
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Add animation on scroll
    const sections = document.querySelectorAll('section');
    
    function checkScroll() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                section.classList.add('visible');
            }
        });
    }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Check on initial load
});`;
}

document.addEventListener('DOMContentLoaded', function() {
    // Background effects
    initGlitterEffect();
    initCursorTrail();
    
    // Form functionality
    initSkillsSection();
    initEducationSection();
    initCertificatesSection();
    initPhotographyToggle();
    
    // Form submission
    initFormSubmission();
});

// Initialize glitter effect
function initGlitterEffect() {
    const glitterContainer = document.querySelector('.glitter-container');
    
    // Create initial glitter particles
    for (let i = 0; i < 50; i++) {
        createGlitterParticle();
    }
    
    // Add more glitter on mouse move
    document.addEventListener('mousemove', function(e) {
        if (Math.random() > 0.9) {
            const glitter = document.createElement('div');
            glitter.classList.add('glitter');
            glitter.style.left = e.clientX + 'px';
            glitter.style.top = e.clientY + 'px';
            glitterContainer.appendChild(glitter);
            
            // Remove after animation completes
            setTimeout(() => {
                glitter.remove();
            }, 2000);
        }
    });
    
    function createGlitterParticle() {
        const glitter = document.createElement('div');
        glitter.classList.add('glitter');
        glitter.style.left = Math.random() * window.innerWidth + 'px';
        glitter.style.top = Math.random() * window.innerHeight + 'px';
        glitterContainer.appendChild(glitter);
        
        // Remove after animation completes
        setTimeout(() => {
            glitter.remove();
        }, 2000);
    }
}

// Initialize cursor trail effect
function initCursorTrail() {
    const cursorTrail = document.querySelector('.cursor-trail');
    const trailElements = [];
    const maxTrailLength = 10;
    
    for (let i = 0; i < maxTrailLength; i++) {
        const trail = document.createElement('div');
        trail.classList.add('cursor-trail');
        trail.style.opacity = (1 - i / maxTrailLength) * 0.5;
        document.body.appendChild(trail);
        trailElements.push({
            element: trail,
            x: 0,
            y: 0
        });
    }
    
    document.addEventListener('mousemove', function(e) {
        // Update the first trail element position
        trailElements[0].x = e.clientX;
        trailElements[0].y = e.clientY;
        
        // Update trail elements with delay
        for (let i = 0; i < trailElements.length; i++) {
            const trail = trailElements[i];
            trail.element.style.left = trail.x - 10 + 'px';
            trail.element.style.top = trail.y - 10 + 'px';
            trail.element.style.opacity = 0.5 - (i / trailElements.length) * 0.5;
            
            // Propagate position with delay
            if (i < trailElements.length - 1) {
                setTimeout(() => {
                    trailElements[i + 1].x = trail.x;
                    trailElements[i + 1].y = trail.y;
                }, i * 50);
            }
        }
    });
}

// Initialize skills section
function initSkillsSection() {
    const addSkillBtn = document.querySelector('.add-skill-btn');
    const skillsList = document.getElementById('skillsList');
    const skillNameInput = document.querySelector('.skill-name');
    const skillPercentageInput = document.querySelector('.skill-percentage');
    
    addSkillBtn.addEventListener('click', function() {
        const skillName = skillNameInput.value.trim();
        const skillPercentage = skillPercentageInput.value.trim();
        
        if (skillName && skillPercentage) {
            // Create skill item
            const skillItem = document.createElement('div');
            skillItem.classList.add('list-item');
            
            // Create skill content
            const skillContent = document.createElement('div');
            skillContent.classList.add('list-item-content');
            
            // Add skill name and percentage
            skillContent.innerHTML = `
                <strong>${skillName}</strong> - ${skillPercentage}%
                <div class="skill-bar">
                    <div class="skill-progress" style="width: ${skillPercentage}%"></div>
                </div>
            `;
            
            // Create remove button
            const removeBtn = document.createElement('button');
            removeBtn.classList.add('remove-item-btn');
            removeBtn.textContent = 'Remove';
            removeBtn.addEventListener('click', function() {
                skillItem.remove();
            });
            
            // Append elements
            skillItem.appendChild(skillContent);
            skillItem.appendChild(removeBtn);
            skillsList.appendChild(skillItem);
            
            // Clear inputs
            skillNameInput.value = '';
            skillPercentageInput.value = '';
        }
    });
}

// Initialize education section
function initEducationSection() {
    const addEducationBtn = document.querySelector('.add-education-btn');
    const educationList = document.getElementById('educationList');
    const educationDegreeInput = document.querySelector('.education-degree');
    const educationInstitutionInput = document.querySelector('.education-institution');
    const educationYearInput = document.querySelector('.education-year');
    
    addEducationBtn.addEventListener('click', function() {
        const degree = educationDegreeInput.value.trim();
        const institution = educationInstitutionInput.value.trim();
        const year = educationYearInput.value.trim();
        
        if (degree && institution && year) {
            // Create education item
            const educationItem = document.createElement('div');
            educationItem.classList.add('list-item');
            
            // Create education content
            const educationContent = document.createElement('div');
            educationContent.classList.add('list-item-content');
            
            // Add education details
            educationContent.innerHTML = `
                <strong>${degree}</strong> - ${institution}, ${year}
            `;
            
            // Create remove button
            const removeBtn = document.createElement('button');
            removeBtn.classList.add('remove-item-btn');
            removeBtn.textContent = 'Remove';
            removeBtn.addEventListener('click', function() {
                educationItem.remove();
            });
            
            // Append elements
            educationItem.appendChild(educationContent);
            educationItem.appendChild(removeBtn);
            educationList.appendChild(educationItem);
            
            // Clear inputs
            educationDegreeInput.value = '';
            educationInstitutionInput.value = '';
            educationYearInput.value = '';
        }
    });
}

// Initialize certificates section
function initCertificatesSection() {
    const addCertificateBtn = document.querySelector('.add-certificate-btn');
    const certificatesList = document.getElementById('certificatesList');
    const certificateNameInput = document.querySelector('.certificate-name');
    const certificateLinkInput = document.querySelector('.certificate-link');
    
    addCertificateBtn.addEventListener('click', function() {
        const name = certificateNameInput.value.trim();
        const link = certificateLinkInput.value.trim();
        
        if (name && link) {
            // Create certificate item
            const certificateItem = document.createElement('div');
            certificateItem.classList.add('list-item');
            
            // Create certificate content
            const certificateContent = document.createElement('div');
            certificateContent.classList.add('list-item-content');
            
            // Add certificate details
            certificateContent.innerHTML = `
                <strong>${name}</strong> - <a href="${link}" target="_blank">${link}</a>
            `;
            
            // Create remove button
            const removeBtn = document.createElement('button');
            removeBtn.classList.add('remove-item-btn');
            removeBtn.textContent = 'Remove';
            removeBtn.addEventListener('click', function() {
                certificateItem.remove();
            });
            
            // Append elements
            certificateItem.appendChild(certificateContent);
            certificateItem.appendChild(removeBtn);
            certificatesList.appendChild(certificateItem);
            
            // Clear inputs
            certificateNameInput.value = '';
            certificateLinkInput.value = '';
        }
    });
}

// Initialize photography toggle
function initPhotographyToggle() {
    const photographyToggle = document.getElementById('includePhotography');
    const photographyContainer = document.getElementById('photographyContainer');
    
    photographyToggle.addEventListener('change', function() {
        if (this.checked) {
            photographyContainer.style.display = 'block';
        } else {
            photographyContainer.style.display = 'none';
        }
    });
    
    // Initialize photography section
    const addPhotoBtn = document.querySelector('.add-photo-btn');
    const photographyList = document.getElementById('photographyList');
    const photoFileInput = document.querySelector('.photo-file');
    const photoTitleInput = document.querySelector('.photo-title');
    const photoDescriptionInput = document.querySelector('.photo-description');
    const photoLocationInput = document.querySelector('.photo-location');
    
    if (addPhotoBtn) {
        addPhotoBtn.addEventListener('click', function() {
            const title = photoTitleInput.value.trim();
            const description = photoDescriptionInput.value.trim();
            const location = photoLocationInput.value.trim();
            
            if (title && photoFileInput.files.length > 0) {
                // Create photo item
                const photoItem = document.createElement('div');
                photoItem.classList.add('list-item');
                
                // Create photo content
                const photoContent = document.createElement('div');
                photoContent.classList.add('list-item-content');
                
                // Create photo preview
                const photoPreview = document.createElement('img');
                photoPreview.src = URL.createObjectURL(photoFileInput.files[0]);
                photoPreview.style.maxWidth = '100px';
                photoPreview.style.maxHeight = '100px';
                photoPreview.style.marginBottom = '0.5rem';
                
                // Add photo details
                photoContent.appendChild(photoPreview);
                photoContent.innerHTML += `
                    <strong>${title}</strong>
                    ${description ? `<p>${description}</p>` : ''}
                    ${location ? `<p><em>Location: ${location}</em></p>` : ''}
                `;
                
                // Create remove button
                const removeBtn = document.createElement('button');
                removeBtn.classList.add('remove-item-btn');
                removeBtn.textContent = 'Remove';
                removeBtn.addEventListener('click', function() {
                    photoItem.remove();
                });
                
                // Append elements
                photoItem.appendChild(photoContent);
                photoItem.appendChild(removeBtn);
                photographyList.appendChild(photoItem);
                
                // Clear inputs
                photoFileInput.value = '';
                photoTitleInput.value = '';
                photoDescriptionInput.value = '';
                photoLocationInput.value = '';
            }
        });
    }
}

// Initialize form submission
function initFormSubmission() {
    const portfolioForm = document.getElementById('portfolioForm');
    const loadingOverlay = document.getElementById('loadingOverlay');
    
    portfolioForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Show loading overlay
        loadingOverlay.style.display = 'flex';
        
        // Collect form data
        const formData = new FormData(portfolioForm);
        
        // Add skills
        const skills = [];
        document.querySelectorAll('#skillsList .list-item').forEach(item => {
            const content = item.querySelector('.list-item-content').textContent;
            const [name, percentage] = content.split('-').map(s => s.trim());
            skills.push({
                name: name,
                percentage: parseInt(percentage)
            });
        });
        
        // Add education
        const education = [];
        document.querySelectorAll('#educationList .list-item').forEach(item => {
            const content = item.querySelector('.list-item-content').textContent;
            const [degree, rest] = content.split('-').map(s => s.trim());
            const [institution, year] = rest.split(',').map(s => s.trim());
            education.push({
                degree: degree,
                institution: institution,
                year: year
            });
        });
        
        // Add certificates
        const certificates = [];
        document.querySelectorAll('#certificatesList .list-item').forEach(item => {
            const content = item.querySelector('.list-item-content').textContent;
            const [name, link] = content.split('-').map(s => s.trim());
            certificates.push({
                name: name,
                link: link
            });
        });
        
        // Add photography
        const photography = [];
        if (document.getElementById('includePhotography').checked) {
            document.querySelectorAll('#photographyList .list-item').forEach(item => {
                const content = item.querySelector('.list-item-content');
                const title = content.querySelector('strong').textContent;
                const description = content.querySelector('p') ? content.querySelector('p').textContent : '';
                const location = content.querySelector('em') ? content.querySelector('em').textContent.replace('Location: ', '') : '';
                const imgSrc = content.querySelector('img') ? content.querySelector('img').src : '';
                
                photography.push({
                    title: title,
                    description: description,
                    location: location,
                    image: imgSrc
                });
            });
        }
        
        // Collect all portfolio data
        const portfolioData = {
            fullName: formData.get('fullName'),
            role: formData.get('role'),
            tagline: formData.get('tagline'),
            aboutMe: formData.get('aboutMe'),
            email: formData.get('email'),
            github: formData.get('github'),
            linkedin: formData.get('linkedin'),
            skills: skills,
            education: education,
            certificates: certificates,
            includePhotography: document.getElementById('includePhotography').checked,
            photography: photography
        };
        
        // Generate portfolio
        try {
            await generatePortfolio(portfolioData);
            
            // Hide loading overlay after generation (simulated)
            setTimeout(() => {
                loadingOverlay.style.display = 'none';
                alert('Portfolio generated successfully! (This is a demo - in a real app, a download would start)');
            }, 3000);
        } catch (error) {
            console.error('Error generating portfolio:', error);
            loadingOverlay.style.display = 'none';
            alert('Error generating portfolio. Please try again.');
        }
    });
}
