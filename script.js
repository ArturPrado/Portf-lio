// ========== CONFIGURAÇÃO INICIAL ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Portfólio Artur Prado iniciado...');
    
    // Inicializar funcionalidades
    initLoadingScreen();
    initNavigation();
    initThemeToggle();
    initTypedText();
    initCounters();
    initFormValidation();
    initFAQ();
    initTabs();
    initAnimations();
    initScrollAnimations();
    initActiveNav();
    
    // Inicializar após um breve delay
    setTimeout(() => {
        if (document.querySelector('.particles')) {
            initParticles();
        }
        if (window.innerWidth > 768) {
            initCursor();
        }
        loadGitHubRepos();
    }, 500);
});

// ========== FUNÇÕES PRINCIPAIS ==========

// 1. Loading Screen
function initLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    if (!loadingScreen) return;
    
    // Simular carregamento de 1.5 segundos
    setTimeout(() => {
        loadingScreen.classList.add('loaded');
        
        // Remover do DOM após animação
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1500);
}

// 2. Particles.js
function initParticles() {
    if (typeof particlesJS === 'undefined') {
        console.warn('Particles.js não carregado');
        return;
    }
    
    try {
        particlesJS('particles-js', {
            particles: {
                number: { 
                    value: 60, 
                    density: { 
                        enable: true, 
                        value_area: 800 
                    } 
                },
                color: { 
                    value: "#3b82f6" 
                },
                shape: { 
                    type: "circle" 
                },
                opacity: { 
                    value: 0.3, 
                    random: true 
                },
                size: { 
                    value: 2, 
                    random: true 
                },
                line_linked: {
                    enable: true,
                    distance: 120,
                    color: "#3b82f6",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1.5,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out"
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { 
                        enable: true, 
                        mode: "grab" 
                    },
                    onclick: { 
                        enable: true, 
                        mode: "push" 
                    }
                }
            },
            retina_detect: true
        });
    } catch (error) {
        console.error('Erro ao inicializar particles:', error);
    }
}

// 3. Navegação Mobile
function initNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!menuToggle || !navMenu) return;
    
    menuToggle.addEventListener('click', () => {
        const isActive = navMenu.classList.contains('active');
        
        // Alternar menu
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
        
        // Prevenir scroll quando menu está aberto
        if (!isActive) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Fechar menu ao clicar em link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Fechar menu ao clicar fora
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Fechar menu ao pressionar ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// 4. Cursor Personalizado (apenas desktop)
function initCursor() {
    if (window.innerWidth <= 768) return;
    
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (!cursor || !cursorFollower) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Atualizar cursor principal imediatamente
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });
    
    // Animação suave do cursor follower
    function animate() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Interações
    const interactiveElements = document.querySelectorAll('a, button, .btn-primary, .btn-secondary, .project-link, .nav-link');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.borderColor = '#60a5fa';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.8)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.borderColor = '#3b82f6';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
}

// 5. Toggle de Tema
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    // Verificar tema salvo no localStorage
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Aplicar tema salvo ou preferência do sistema
    if (savedTheme === 'light' || (!savedTheme && !prefersDark)) {
        document.body.classList.add('light-theme');
        updateThemeIcon('light');
    }
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        
        const theme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
        localStorage.setItem('theme', theme);
        updateThemeIcon(theme);
    });
    
    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.className = theme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
}

// 6. Texto Digitado
function initTypedText() {
    const typedTextSpan = document.querySelector('.typed-text');
    if (!typedTextSpan) return;
    
    const textArray = ["Frontend", "UI/UX", "Responsivo", "Criativo", "Moderno"];
    let textArrayIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentText = textArray[textArrayIndex];
        
        if (!isDeleting) {
            // Digitando
            typedTextSpan.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
            
            if (charIndex === currentText.length) {
                isDeleting = true;
                typingSpeed = 1500; // Pausa no final
            }
        } else {
            // Apagando
            typedTextSpan.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
            
            if (charIndex === 0) {
                isDeleting = false;
                textArrayIndex++;
                if (textArrayIndex >= textArray.length) textArrayIndex = 0;
                typingSpeed = 500; // Pausa entre palavras
            }
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Iniciar após 1 segundo
    setTimeout(type, 1000);
}

// 7. Contadores Animados
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    if (counters.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000; // 2 segundos
                const increment = target / (duration / 16); // 60fps
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, { 
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// 8. Formulário de Contato
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.submit-btn');
        const loading = submitBtn.querySelector('.btn-loading');
        const successMsg = document.getElementById('formSuccess');
        
        // Validação
        const name = contactForm.querySelector('#name').value.trim();
        const email = contactForm.querySelector('#email').value.trim();
        const subject = contactForm.querySelector('#subject').value;
        const message = contactForm.querySelector('#message').value.trim();
        
        // Validação simples
        if (!name || !email || !subject || !message) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }
        
        if (!isValidEmail(email)) {
            alert('Por favor, insira um email válido.');
            return;
        }
        
        // Mostrar loading
        submitBtn.disabled = true;
        loading.style.display = 'inline-block';
        
        // Simular envio (substitua por AJAX real)
        setTimeout(() => {
            // Aqui você implementaria o envio real
            // Exemplo com Fetch API:
            /*
            const formData = new FormData(contactForm);
            
            fetch('/api/contact', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                // Sucesso
                submitBtn.disabled = false;
                loading.style.display = 'none';
                successMsg.classList.add('show');
                contactForm.reset();
                
                setTimeout(() => {
                    successMsg.classList.remove('show');
                }, 5000);
            })
            .catch(error => {
                // Erro
                submitBtn.disabled = false;
                loading.style.display = 'none';
                alert('Erro ao enviar mensagem. Tente novamente.');
            });
            */
            
            // Simulação de sucesso
            submitBtn.disabled = false;
            loading.style.display = 'none';
            successMsg.classList.add('show');
            contactForm.reset();
            
            // Esconder mensagem após 5 segundos
            setTimeout(() => {
                successMsg.classList.remove('show');
            }, 5000);
            
        }, 1500);
    });
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
}

// 9. FAQ Accordion
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length === 0) return;
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Fechar todos os outros
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Alternar item atual
            if (!isActive) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    });
}

// 10. Tabs de Skills
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    if (tabButtons.length === 0) return;
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            // Remover classe active de todos os botões
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Adicionar ao botão clicado
            button.classList.add('active');
            
            // Esconder todos os panes
            tabPanes.forEach(pane => pane.classList.remove('active'));
            // Mostrar o pane correspondente
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// 11. Animações ao Scroll
function initAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observar elementos
    const elementsToAnimate = document.querySelectorAll(
        '.skill-item, .feature-card, .project-card, .stat, .contact-method'
    );
    
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
}

// 12. Scroll Suave
function initScrollAnimations() {
    // Links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#' || href === '#!') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Atualizar URL
                history.pushState(null, null, href);
            }
        });
    });
}

// 13. Navegação Ativa
function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    if (sections.length === 0 || navLinks.length === 0) return;
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// 14. Carregar Repositórios do GitHub
async function loadGitHubRepos() {
    const container = document.getElementById('repositorios');
    if (!container) return;
    
    try {
        const response = await fetch('https://api.github.com/users/ArturPrado/repos?sort=updated&per_page=6');
        
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }
        
        const repos = await response.json();
        
        if (!Array.isArray(repos) || repos.length === 0) {
            container.innerHTML = `
                <div class="project-card">
                    <div class="project-content">
                        <h3>Sem repositórios públicos</h3>
                        <p>Nenhum repositório público encontrado no GitHub.</p>
                    </div>
                </div>
            `;
            return;
        }
        
        let html = '';
        repos.forEach(repo => {
            const description = repo.description || 'Sem descrição';
            const language = repo.language || 'Outro';
            const updated = new Date(repo.updated_at).toLocaleDateString('pt-BR');
            
            html += `
                <div class="project-card">
                    <div class="project-content">
                        <h3>${repo.name}</h3>
                        <p>${description}</p>
                        <div class="project-tech">
                            <span class="tech-tag">${language}</span>
                            <span class="tech-tag">⭐ ${repo.stargazers_count}</span>
                            <span class="tech-tag">📅 ${updated}</span>
                        </div>
                        <div class="project-links">
                            <a href="${repo.html_url}" target="_blank" class="project-btn">
                                <i class="fab fa-github"></i> Ver no GitHub
                            </a>
                            ${repo.homepage ? `
                            <a href="${repo.homepage}" target="_blank" class="project-btn secondary">
                                <i class="fas fa-external-link-alt"></i> Ver Demo
                            </a>
                            ` : ''}
                        </div>
                    </div>
                </div>
            `;
        });
        
        container.innerHTML = html;
        
    } catch (error) {
        console.error('Erro ao carregar repositórios:', error);
        container.innerHTML = `
            <div class="project-card">
                <div class="project-content">
                    <h3>Erro ao carregar</h3>
                    <p>Não foi possível carregar os repositórios do GitHub. Tente novamente mais tarde.</p>
                    <button onclick="loadGitHubRepos()" class="project-btn">
                        <i class="fas fa-redo"></i> Tentar Novamente
                    </button>
                </div>
            </div>
        `;
    }
}

// 15. Atualizar ano no footer
function updateCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Atualizar ano quando a página carregar
updateCurrentYear();

// ========== EVENT LISTENERS GLOBAIS ==========

// Atualizar cursor quando a janela for redimensionada
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        const cursor = document.querySelector('.cursor');
        const cursorFollower = document.querySelector('.cursor-follower');
        if (cursor && cursorFollower) {
            cursor.style.display = 'none';
            cursorFollower.style.display = 'none';
        }
    }
});

// Adicionar classe ao scroll para navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Prevenir comportamento padrão de formulários
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', e => {
        // Apenas prevenir se não for o formulário de contato
        if (form.id !== 'contactForm') {
            e.preventDefault();
        }
    });
});

// Inicializar quando a página estiver completamente carregada
window.addEventListener('load', () => {
    console.log('✅ Portfólio completamente carregado!');
});