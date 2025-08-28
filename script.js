// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling and Active Navigation
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Typing Animation
class TypingAnimation {
    constructor(element, texts, typeSpeed = 100, backSpeed = 50, startDelay = 500, backDelay = 1500) {
        this.element = element;
        this.texts = texts;
        this.typeSpeed = typeSpeed;
        this.backSpeed = backSpeed;
        this.startDelay = startDelay;
        this.backDelay = backDelay;
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        
        setTimeout(() => this.type(), this.startDelay);
    }
    
    type() {
        const currentText = this.texts[this.textIndex];
        
        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.charIndex + 1);
            this.charIndex++;
        }
        
        let typeSpeedCurrent = this.typeSpeed;
        
        if (this.isDeleting) {
            typeSpeedCurrent = this.backSpeed;
        }
        
        if (!this.isDeleting && this.charIndex === currentText.length) {
            typeSpeedCurrent = this.backDelay;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.textIndex = (this.textIndex + 1) % this.texts.length;
            typeSpeedCurrent = this.typeSpeed;
        }
        
        setTimeout(() => this.type(), typeSpeedCurrent);
    }
}

// Initialize typing animation
const typingElement = document.querySelector('.typing-text');
if (typingElement) {
    const texts = [
        'Yazılım Geliştirici',
        'Full-Stack Developer',
        'Problem Çözücü',
        'Teknoloji Tutkunu'
    ];
    new TypingAnimation(typingElement, texts);
}

// Counter Animation
class CounterAnimation {
    constructor(element, target, duration = 2000) {
        this.element = element;
        this.target = parseInt(target);
        this.duration = duration;
        this.startValue = 0;
        this.increment = this.target / (duration / 16);
        this.hasAnimated = false;
        
        this.observeElement();
    }
    
    observeElement() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.hasAnimated) {
                    this.animate();
                    this.hasAnimated = true;
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(this.element);
    }
    
    animate() {
        const startTime = performance.now();
        
        const updateCounter = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / this.duration, 1);
            
            const currentValue = Math.floor(this.target * this.easeOutQuart(progress));
            this.element.textContent = currentValue;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                this.element.textContent = this.target;
            }
        };
        
        requestAnimationFrame(updateCounter);
    }
    
    easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4);
    }
}

// Initialize counters
document.addEventListener('DOMContentLoaded', () => {
    const counterElements = document.querySelectorAll('.stat-number');
    counterElements.forEach(element => {
        const target = element.getAttribute('data-target');
        new CounterAnimation(element, target);
    });
});

// Skills Bar Animation
class SkillsAnimation {
    constructor() {
        this.skillBars = document.querySelectorAll('.skill-progress');
        this.hasAnimated = false;
        this.observeSkills();
    }
    
    observeSkills() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.hasAnimated) {
                    this.animateSkills();
                    this.hasAnimated = true;
                }
            });
        }, { threshold: 0.3 });
        
        const skillsSection = document.querySelector('.skills');
        if (skillsSection) {
            observer.observe(skillsSection);
        }
    }
    
    animateSkills() {
        this.skillBars.forEach((bar, index) => {
            setTimeout(() => {
                const progress = bar.getAttribute('data-progress');
                bar.style.width = `${progress}%`;
            }, index * 200);
        });
    }
}

// Initialize skills animation
new SkillsAnimation();

// Parallax Effect for Shapes
class ParallaxShapes {
    constructor() {
        this.shapes = document.querySelectorAll('.shape');
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            this.shapes.forEach((shape, index) => {
                const speed = (index + 1) * 0.1;
                shape.style.transform = `translateY(${rate * speed}px) rotate(${scrolled * speed}deg)`;
            });
        });
    }
}

// Initialize parallax
new ParallaxShapes();

// Tech Items Hover Effect
document.querySelectorAll('.tech-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        const techName = this.getAttribute('data-tech');
        
        // Create tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'tech-tooltip';
        tooltip.textContent = techName;
        tooltip.style.cssText = `
            position: absolute;
            top: -40px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.8);
            color: var(--neon-cyan);
            padding: 8px 12px;
            border-radius: 5px;
            font-size: 12px;
            white-space: nowrap;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
            border: 1px solid var(--neon-cyan);
        `;
        
        this.appendChild(tooltip);
        
        // Show tooltip
        setTimeout(() => {
            tooltip.style.opacity = '1';
        }, 100);
    });
    
    item.addEventListener('mouseleave', function() {
        const tooltip = this.querySelector('.tech-tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    });
});

// EmailJS Initialization
document.addEventListener('DOMContentLoaded', function() {
    // EmailJS'yi güvenli şekilde başlat (V3/V4 uyumlu)
    try {
        if (window.emailjs && typeof window.emailjs.init === 'function') {
            // EmailJS public key (User ID) - .env önerilir, burada istemci tarafı
            window.emailjs.init({ publicKey: 'z88oXsV5lFvMgZeus' });
            console.log('EmailJS başlatıldı');
        } else {
            console.error('EmailJS kütüphanesi yüklenemedi');
        }
    } catch (err) {
        console.error('EmailJS init hatası:', err);
    }

    // Form Submission - EmailJS Integration
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.textContent = 'Gönderiliyor...';
            submitBtn.disabled = true;
            
            // Form verilerini al
            const formData = new FormData(this);
            const name = formData.get('from_name');
            const email = formData.get('from_email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            const messageBody = `${message}\n\n—\nGönderen e-posta: <${email || '—'}>`;
            
            // EmailJS parameters
            const templateParams = {
                from_name: name,
                from_email: email,
                reply_to: email,
                subject: subject,
                message: messageBody,
                to_name: "Aysel SÜNDÜK",
                sent_at: new Date().toLocaleString('tr-TR'),
                // EmailJS şablonundaki alan adlarıyla birebir uyum
                name: name,
                email: email,
                title: subject,
                time: new Date().toLocaleString('tr-TR')
            };
            
            console.log("Email gönderiliyor:", templateParams);
            
            // Send email using EmailJS
            if (window.emailjs && typeof window.emailjs.send === 'function') {
                window.emailjs.send('service_zf45tgb', 'template_0afk4qd', templateParams)
                    .then(function(response) {
                        console.log('SUCCESS!', response.status, response.text);
                        
                        // Show success message
                        showSuccessMessage(name);
                        
                        // Reset form
                        contactForm.reset();
                        
                        // Restore button
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    }, function(error) {
                        console.log('FAILED...', error);
                        
                        // Show error message
                        showErrorMessage();
                        
                        // Restore button
                        submitBtn.textContent = 'Tekrar Dene';
                        submitBtn.disabled = false;
                        
                        // Reset button after 3 seconds
                        setTimeout(() => {
                            submitBtn.textContent = originalText;
                        }, 3000);
                    });
            } else {
                console.error("EmailJS kütüphanesi yüklenemedi");
                showErrorMessage();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
});

// CV'yi PDF olarak oluştur ve indir
// PDF ŞABLONU DOLDURMA: Verilen PDF dosyasını mevcut bilgilerle doldur ve indir
document.addEventListener('DOMContentLoaded', function() {
    const cvAnchor = document.getElementById('download-cv');
    if (!cvAnchor) return;
    cvAnchor.addEventListener('click', async function(e) {
        e.preventDefault();
        // Resmi A4 PDF: dinamik profesyonel şablon
        const data = collectCvData();
        try {
            const html = buildProfessionalCvHtml(data);
            const container = document.createElement('div');
            container.innerHTML = html;
            const node = container.firstElementChild || container;
            const opt = {
                margin:       [15, 15, 15, 15],
                filename:     'Aysel_Sunduk_CV.pdf',
                image:        { type: 'jpeg', quality: 0.98 },
                html2canvas:  { scale: 2, useCORS: true, backgroundColor: '#ffffff' },
                jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };
            await html2pdf().set(opt).from(node).save();
        } catch (err) {
            console.error('Profesyonel CV PDF hatası:', err);
            showPdfErrorMessage();
        }
    });
});

function collectCvData() {
    const get = (sel) => {
        const el = document.querySelector(sel);
        return el ? el.textContent.trim() : '';
    };
    const getHref = (sel) => {
        const el = document.querySelector(sel);
        return el ? (el.getAttribute('href') || el.textContent.trim()) : '';
    };
    const name = get('.title-name');
    let role = get('.typing-text') || 'Yazılım Geliştirici';
    if (/^Problem\s*Ç/i.test(role)) role = 'Problem Çözücü';
    const email = (getHref('.contact-item a[href^="mailto:"]') || '').replace('mailto:','');
    const phone = (getHref('.contact-item a[href^="tel:"]') || '').replace('tel:','');
    const location = get('.contact-item:nth-child(3) .contact-details span');
    const linkedin = getHref('a[href*="linkedin.com"]');
    const github = getHref('a[href*="github.com"]');
    const medium = getHref('a[href*="medium.com"]');
    const summary = Array.from(document.querySelectorAll('#about .about-text p')).map(p => p.textContent.trim()).join(' ');

    const exps = Array.from(document.querySelectorAll('#experience .experience-item')).map(i => {
        const c = i.querySelector('h3')?.textContent.trim() || '';
        const p = i.querySelector('.exp-position')?.textContent.trim() || '';
        const d = i.querySelector('.exp-date')?.textContent.trim() || '';
        const desc = i.querySelector('.exp-description')?.textContent.trim() || '';
        return `• ${c}${p ? ' — ' + p : ''}${d ? ' (' + d + ')' : ''}${desc ? ': ' + desc : ''}`;
    });
    const experienceText = exps.join('\n');

    const projectsText = Array.from(document.querySelectorAll('#projects .project-card .project-content h3'))
        .map(h => '• ' + h.textContent.trim()).join('\n');

    const skillsText = Array.from(document.querySelectorAll('#skills .skill-category')).map(cat => {
        const title = cat.querySelector('h3')?.textContent.trim() || '';
        const items = Array.from(cat.querySelectorAll('.skill-item .skill-name')).map(s => s.textContent.trim()).join(', ');
        return `${title}: ${items}`;
    }).join('\n');

    const uni = document.querySelector('#education .education-item h4')?.textContent.trim() || '';
    const uniInfo = document.querySelector('#education .education-item p')?.textContent.trim() || '';
    const uniYear = document.querySelector('#education .education-item .edu-year')?.textContent.trim() || '';
    const educationText = [uni, uniInfo, uniYear].filter(Boolean).join(' — ');

    return { name, role, email, phone, location, linkedin, github, medium, summary, experienceText, projectsText, skillsText, educationText };
}

function safeSetText(form, fieldNames, value) {
    if (!value) return;
    for (const key of fieldNames) {
        try {
            const f = form.getTextField(key);
            if (f) { f.setText(value); }
        } catch (_) { /* alan yok */ }
    }
}

function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}

// Basit metin sarma
function drawWrappedText(page, text, x, startY, maxWidth, fontSize, font, color) {
    const words = text.split(/\s+/);
    const lineHeight = fontSize + 4;
    let line = '';
    let y = startY;
    for (let i = 0; i < words.length; i++) {
        const test = line ? line + ' ' + words[i] : words[i];
        const w = font.widthOfTextAtSize(test, fontSize);
        if (w > maxWidth && line) {
            page.drawText(line, { x, y, size: fontSize, font, color });
            y -= lineHeight;
            line = words[i];
        } else {
            line = test;
        }
    }
    if (line) {
        page.drawText(line, { x, y, size: fontSize, font, color });
        y -= lineHeight;
    }
    return y;
}

// CV indirme için özel hata bildirimi
function showPdfErrorMessage() {
    const existingMessage = document.querySelector('.message-popup');
    if (existingMessage) existingMessage.remove();
    const errorMessage = document.createElement('div');
    errorMessage.className = 'message-popup';
    errorMessage.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(255, 0, 110, 0.2);
        border: 2px solid var(--neon-magenta);
        color: var(--text-primary);
        padding: 30px;
        border-radius: 15px;
        text-align: center;
        z-index: 10000;
        backdrop-filter: blur(15px);
        box-shadow: 0 0 30px rgba(255, 0, 110, 0.5);
        animation: fadeIn 0.5s ease forwards;
    `;
    errorMessage.innerHTML = `
        <h3 style="color: var(--neon-magenta); margin-bottom: 15px;">CV indirilemedi</h3>
        <p>CV oluşturulurken bir sorun oluştu. Lütfen tekrar deneyin.</p>
        <button onclick="this.parentElement.remove()" style="
            margin-top: 20px;
            padding: 10px 20px;
            background: var(--neon-magenta);
            color: var(--bg-primary);
            border: none;
            border-radius: 25px;
            cursor: pointer;
            font-weight: 600;
        ">Tamam</button>
    `;
    document.body.appendChild(errorMessage);
    setTimeout(() => {
        if (errorMessage.parentElement) errorMessage.remove();
    }, 5000);
}

// Beyaz zeminli profesyonel A4 CV HTML’i oluştur
function buildProfessionalCvHtml(data) {
    // Basit iki sütunlu resmi şablon
    const safe = (v) => (v || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    const fmtPhone = (v) => {
        const digits = (v||'').replace(/\D/g,'');
        if (digits.length === 11 && digits.startsWith('0')) {
            return `${digits.slice(0,1)}${digits.slice(1,4)} ${digits.slice(4,7)} ${digits.slice(7,9)} ${digits.slice(9,11)}`.replace(/^0/,'0');
        }
        return v;
    };
    const cleanUrl = (u) => (u||'').replace(/^https?:\/\//,'').replace(/\/$/,'');
    const truncate = (t, n) => {
        const s = (t||'').trim();
        if (s.length <= n) return s;
        return s.slice(0, Math.max(0, n - 1)).trim() + '…';
    };
    const sections = (title, body) => body ? `
      <section class="sec"><h3>${title}</h3><div>${body}</div></section>` : '';

    // Deneyimi en fazla 2 madde ve kısa satırlar
    const expItems = (data.experienceText || '')
        .split('\n').map(li => li.replace(/^•\s*/,'').trim()).filter(Boolean).slice(0,2)
        .map(li => truncate(li, 120));
    const expHtml = expItems.length ? `<ul>${expItems.map(li => `<li>${safe(li)}</li>`).join('')}</ul>` : '';
    // Projeleri tek satıra sıkıştır, en fazla 6 madde, kısa isimler
    const projItems = (data.projectsText || '').split('\n').map(li => li.replace(/^•\s*/,'').trim()).filter(Boolean).slice(0,4).map(p => truncate(p, 40));
    const projHtml = projItems.length ? `<div class="oneline">${projItems.map(safe).join(' • ')}</div>` : '';
    // Yetenekleri en fazla 3 satır
    const skillsLines = (data.skillsText || '').split('\n').slice(0,3).map(line => truncate(line, 80));
    const skillsHtml = skillsLines.length ? `<ul>${skillsLines.map(li => `<li>${safe(li)}</li>`).join('')}</ul>` : '';

    return `
<div id="cv-pro" style="width:794px; background:#fff; color:#111; font-family: Arial, 'Segoe UI', sans-serif;">
  <style>
    #cv-pro{padding:18px 16px;}
    #cv-pro .header{display:flex; align-items:flex-start; justify-content:space-between; border-bottom:1.5px solid #0a84ff; padding-bottom:6px; margin-bottom:8px}
    #cv-pro .name{font-size:20px; font-weight:800; color:#0a0a0a}
    #cv-pro .role{font-size:11px; color:#333; margin-top:2px}
    #cv-pro .contact{font-size:10px; color:#444; margin-top:4px}
    #cv-pro .grid{display:grid; grid-template-columns:1.12fr .88fr; grid-gap:8px}
    #cv-pro h3{font-size:11.5px; color:#0a84ff; margin:4px 0 3px}
    #cv-pro .sec div{font-size:10px; color:#222; line-height:1.38}
    #cv-pro ul{margin:0; padding-left:12px}
    #cv-pro li{margin:0}
    #cv-pro .oneline{font-size:10px}
    #cv-pro .badge{width:38px; height:38px; border-radius:50%; background:#0a84ff; color:#fff; display:flex; align-items:center; justify-content:center; font-weight:800}
    #cv-pro, #cv-pro *{page-break-inside:avoid}
  </style>
  <div class="header">
    <div>
      <div class="name">${safe(data.name)}</div>
      <div class="role">${safe(data.role)}</div>
      <div class="contact">${[safe(data.email), safe(fmtPhone(data.phone)), safe(data.location)].filter(Boolean).join(' • ')}</div>
      <div class="contact">${[cleanUrl(data.linkedin), cleanUrl(data.github), cleanUrl(data.medium)].filter(Boolean).map(safe).join(' • ')}</div>
    </div>
    <div class="badge">${safe((data.name||'AS').split(' ').map(w=>w[0]).join('').slice(0,2))}</div>
  </div>
  <div class="grid">
    <div>
      ${sections('Özet', safe(truncate(data.summary, 420)))}
      ${sections('Deneyim', expHtml)}
      ${sections('Projeler', projHtml)}
    </div>
    <div>
      ${sections('Yetenekler', skillsHtml)}
      ${sections('Eğitim', safe(data.educationText))}
    </div>
  </div>
</div>`;
}

// Sayfadaki GERÇEK verilerden CV HTML'i üret
function buildCvHtmlFromPage() {
    const pickText = (selector) => {
        const el = document.querySelector(selector);
        return el ? el.textContent.trim() : '';
    };
    const pickLink = (selector) => {
        const el = document.querySelector(selector);
        return el ? (el.getAttribute('href') || el.textContent.trim()) : '';
    };
    const name = pickText('.title-name') || 'İsim';
    const role = pickText('.typing-text') || 'Yazılım Geliştirici';
    const email = pickLink('.contact-item a[href^="mailto:"]') || '';
    const phone = pickLink('.contact-item a[href^="tel:"]') || '';
    const location = pickText('.contact-item:nth-child(3) .contact-details span') || '';
    const linkedin = pickLink('a[href*="linkedin.com"]') || '';
    const github = pickLink('a[href*="github.com"]') || '';

    // Özet: Hakkımda bölümündeki paragrafları birleştir
    const aboutParas = Array.from(document.querySelectorAll('#about .about-text p')).map(p => p.textContent.trim());
    const summary = aboutParas.join(' ');

    // Deneyim: başlık, pozisyon, tarih ve açıklama
    const experiences = Array.from(document.querySelectorAll('#experience .experience-item')).map(item => {
        const company = pickText('h3')
            || (item.querySelector('h3') ? item.querySelector('h3').textContent.trim() : '');
        const position = item.querySelector('.exp-position') ? item.querySelector('.exp-position').textContent.trim() : '';
        const date = item.querySelector('.exp-date') ? item.querySelector('.exp-date').textContent.trim() : '';
        const desc = item.querySelector('.exp-description') ? item.querySelector('.exp-description').textContent.trim() : '';
        return { company, position, date, desc };
    }).slice(0, 3);

    // Projeler: başlıklar
    const projects = Array.from(document.querySelectorAll('#projects .project-card .project-content h3'))
        .map(h => h.textContent.trim()).slice(0, 6);

    // Yetenekler: kategori başlıkları ve altındaki skill adları
    const skillCategories = Array.from(document.querySelectorAll('#skills .skill-category')).map(cat => {
        const title = cat.querySelector('h3') ? cat.querySelector('h3').textContent.trim() : '';
        const items = Array.from(cat.querySelectorAll('.skill-item .skill-name')).map(s => s.textContent.trim());
        return { title, items };
    });

    // Eğitim
    const uni = pickText('#education .education-item h4');
    const uniInfo = pickText('#education .education-item p');
    const uniYear = pickText('#education .education-item .edu-year');

    // ŞABLON
    return `
<div style="padding: 24px; font-family: 'Exo 2', Arial, sans-serif; color: #d6ffff; background: #0a0a0a; width: 794px;">
  <div style="border: 2px solid #00f5ff; border-radius: 14px; padding: 18px;">
    <div style="display:flex; align-items:center; gap:14px;">
      <div style="width:60px; height:60px; border:2px solid #00f5ff; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:900; color:#00f5ff;">${(name || 'AS').split(' ').map(w => w[0]).join('').slice(0,2)}</div>
      <div>
        <div style="font-size:20px; font-weight:800; color:#00f5ff;">${name}</div>
        <div style="font-size:12px; color:#9be7ff;">${role}</div>
        <div style="font-size:11px; color:#9be7ff; margin-top:4px;">${email.replace('mailto:','')} ${phone ? '• ' + phone.replace('tel:','') : ''} ${location ? '• ' + location : ''}</div>
        <div style="font-size:11px; color:#9be7ff;">${linkedin ? linkedin : ''} ${github ? '• ' + github : ''}</div>
      </div>
    </div>
    <hr style="border-color:#00f5ff33; margin: 10px 0;">
    <div style="display:grid; grid-template-columns: 1.1fr .9fr; gap:14px;">
      <div>
        ${summary ? `<div style=\"font-weight:700; color:#ffde59; margin:6px 0;\">Özet</div><div style=\"font-size:12px; line-height:1.5;\">${summary}</div>` : ''}
        ${experiences.length ? `<div style=\"font-weight:700; color:#ffde59; margin:10px 0 6px;\">Deneyim</div>` : ''}
        ${experiences.map(e => `
          <div style=\"font-size:12px; margin-bottom:8px;\">
            <div style=\"font-weight:700; color:#00f5ff;\">${e.company || ''}</div>
            <div style=\"font-size:11px; color:#9be7ff;\">${e.position || ''}${e.date ? ' • ' + e.date : ''}</div>
            <div>${e.desc || ''}</div>
          </div>`).join('')}
        ${projects.length ? `<div style=\"font-weight:700; color:#ffde59; margin:10px 0 6px;\">Projeler</div>
          <ul style=\"padding-left:16px; margin:0; font-size:12px;\">${projects.map(p => `<li>${p}</li>`).join('')}</ul>` : ''}
      </div>
      <div>
        ${skillCategories.length ? `<div style=\"font-weight:700; color:#ffde59; margin:6px 0;\">Yetenekler</div>` : ''}
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:6px; font-size:12px;">
          ${skillCategories.map(sc => `
            <div>
              <div style=\"color:#00f5ff; font-weight:700;\">${sc.title}</div>
              <div>${sc.items.join(', ')}</div>
            </div>`).join('')}
        </div>
        ${(uni || uniInfo || uniYear) ? `<div style=\"font-weight:700; color:#ffde59; margin:10px 0 6px;\">Eğitim</div>
          <div style=\"font-size:12px;\">${uni || ''}${uniInfo ? ' — ' + uniInfo : ''}<div style=\"color:#9be7ff; font-size:11px;\">${uniYear || ''}</div></div>` : ''}
      </div>
    </div>
  </div>
</div>`;
}

// Success message function
function showSuccessMessage(name) {
    const existingMessage = document.querySelector('.message-popup');
    if (existingMessage) existingMessage.remove();
    
    const successMessage = document.createElement('div');
    successMessage.className = 'message-popup';
    successMessage.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 245, 255, 0.2);
        border: 2px solid var(--neon-cyan);
        color: var(--text-primary);
        padding: 30px;
        border-radius: 15px;
        text-align: center;
        z-index: 10000;
        backdrop-filter: blur(15px);
        box-shadow: 0 0 30px rgba(0, 245, 255, 0.5);
        animation: fadeIn 0.5s ease forwards;
    `;
    
    successMessage.innerHTML = `
        <h3 style="color: var(--neon-cyan); margin-bottom: 15px;">Mesaj Gönderildi!</h3>
        <p>Merhaba ${name},</p>
        <p>Mesajınız başarıyla alındı. En kısa sürede size dönüş yapacağım.</p>
        <button onclick="this.parentElement.remove()" style="
            margin-top: 20px;
            padding: 10px 20px;
            background: var(--neon-cyan);
            color: var(--bg-primary);
            border: none;
            border-radius: 25px;
            cursor: pointer;
            font-weight: 600;
        ">Tamam</button>
    `;
    
    document.body.appendChild(successMessage);
    
    setTimeout(() => {
        if (successMessage.parentElement) {
            successMessage.remove();
        }
    }, 5000);
}

// Error message function
function showErrorMessage() {
    const existingMessage = document.querySelector('.message-popup');
    if (existingMessage) existingMessage.remove();
    
    const errorMessage = document.createElement('div');
    errorMessage.className = 'message-popup';
    errorMessage.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(255, 0, 110, 0.2);
        border: 2px solid var(--neon-magenta);
        color: var(--text-primary);
        padding: 30px;
        border-radius: 15px;
        text-align: center;
        z-index: 10000;
        backdrop-filter: blur(15px);
        box-shadow: 0 0 30px rgba(255, 0, 110, 0.5);
        animation: fadeIn 0.5s ease forwards;
    `;
    
    errorMessage.innerHTML = `
        <h3 style="color: var(--neon-magenta); margin-bottom: 15px;">Hata!</h3>
        <p>Mesajınız gönderilirken bir hata oluştu.</p>
        <p>Lütfen daha sonra tekrar deneyin veya doğrudan sundukaysel@gmail.com adresine e-posta gönderin.</p>
        <button onclick="this.parentElement.remove()" style="
            margin-top: 20px;
            padding: 10px 20px;
            background: var(--neon-magenta);
            color: var(--bg-primary);
            border: none;
            border-radius: 25px;
            cursor: pointer;
            font-weight: 600;
        ">Tamam</button>
    `;
    
    document.body.appendChild(errorMessage);
    
    setTimeout(() => {
        if (errorMessage.parentElement) {
            errorMessage.remove();
        }
    }, 5000);
}

// Smooth reveal animations on scroll
class RevealAnimation {
    constructor() {
        this.elements = document.querySelectorAll('.glass-card, .project-card, .skill-category');
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        this.elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(50px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    }
}

// Initialize reveal animations
new RevealAnimation();

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.9)';
    }
});

// Add glitch effect to title on hover
const heroTitle = document.querySelector('.title-name');
if (heroTitle) {
    heroTitle.addEventListener('mouseenter', function() {
        this.style.animation = 'glitch 0.3s ease-in-out';
    });
    
    heroTitle.addEventListener('animationend', function() {
        this.style.animation = '';
    });
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes glitch {
        0% { transform: translateX(0); }
        20% { transform: translateX(-2px); }
        40% { transform: translateX(2px); }
        60% { transform: translateX(-1px); }
        80% { transform: translateX(1px); }
        100% { transform: translateX(0); }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translate(-50%, -60%); }
        to { opacity: 1; transform: translate(-50%, -50%); }
    }
    
    .message-popup {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10000;
        animation: fadeIn 0.5s ease forwards;
    }
`;
document.head.appendChild(style);

// Prevent form resubmission on page refresh
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// Add loading state for better UX
document.addEventListener('DOMContentLoaded', function() {
    // Add loading class to body
    document.body.classList.add('loading');
    
    // Remove loading class when everything is loaded
    window.addEventListener('load', function() {
        document.body.classList.remove('loading');
    });
});

// Add some console art for fun
console.log(`
%cAysel SÜNDÜK Portfolio 🚀
%cYazılım Geliştirici | Full-Stack Developer
%chttps://github.com/aysel-sunduk
`, 
'color: #00f5ff; font-size: 18px; font-weight: bold;',
'color: #ff006e; font-size: 14px;',
'color: #ffde59; font-size: 12px;'
);