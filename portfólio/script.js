// Configuração inicial
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas as funcionalidades
    initLoadingScreen();
    initParticles();
    initNavigation();
    initCursor();
    initThemeToggle();
    initTypedText();
    initCounters();
    initFormValidation();
    initFAQ();
    initAnimations();
    initScrollAnimations();
});

// Loading Screen
function initLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    
    // Simular carregamento
    setTimeout(() => {
        loadingScreen.classList.add('loaded');
        
        // Remover do DOM após animação
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1500);
}

// Particles Background
function initParticles() {
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
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
                    value: 0.5,
                    random: true
                },
                size: {
                    value: 3,
                    random: true
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#3b82f6",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false
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
            }
        });
    }
}

// Navegação Mobile
function initNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            
            // Animar hamburguer
            const spans = menuToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // Fechar menu ao clicar em link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
    
    // Ativar link ativo baseado na scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}` || 
                link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
}

// Cursor Personalizado
function initCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (cursor && cursorFollower) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            setTimeout(() => {
                cursorFollower.style.left = e.clientX + 'px';
                cursorFollower.style.top = e.clientY + 'px';
            }, 100);
        });
        
        // Interações
        const interactiveElements = document.querySelectorAll('a, button, .btn-primary, .btn-secondary, .nav-link, .project-card');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursor.style.borderColor = '#3b82f6';
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorFollower.style.background = 'rgba(59, 130, 246, 0.1)';
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.borderColor = '#3b82f6';
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorFollower.style.background = 'rgba(37, 99, 235, 0.1)';
            });
        });
    }
}

// Toggle de Tema
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Verificar tema salvo
    const currentTheme = localStorage.getItem('theme') || 
                        (prefersDarkScheme.matches ? 'dark' : 'light');
    
    if (currentTheme === 'light') {
        document.body.classList.add('light-theme');
        updateThemeIcon('light');
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            
            const theme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
            localStorage.setItem('theme', theme);
            updateThemeIcon(theme);
        });
    }
    
    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.className = theme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
}

// Texto Digitado
function initTypedText() {
    const typedTextSpan = document.querySelector('.typed-text');
    if (!typedTextSpan) return;
    
    const textArray = ["Frontend", "UI/UX", "Responsivo", "Criativo"];
    const typingDelay = 200;
    const erasingDelay = 100;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;
    
    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            setTimeout(erase, newTextDelay);
        }
    }
    
    function erase() {
        if (charIndex > 0) {
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
        }
    }
    
    setTimeout(type, newTextDelay + 250);
}

// Contadores Animados
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-count');
                const count = +counter.innerText;
                
                const increment = target / speed;
                
                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(() => updateCounter(counter, target, increment), 1);
                } else {
                    counter.innerText = target;
                }
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
    
    function updateCounter(counter, target, increment) {
        const count = +counter.innerText;
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => updateCounter(counter, target, increment), 1);
        } else {
            counter.innerText = target;
        }
    }
}

// Validação de Formulário
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Mostrar loading
        const submitBtn = contactForm.querySelector('.submit-btn');
        const loading = submitBtn.querySelector('.btn-loading');
        submitBtn.disabled = true;
        loading.style.display = 'inline-block';
        
        // Simular envio
        setTimeout(() => {
            // Esconder loading
            submitBtn.disabled = false;
            loading.style.display = 'none';
            
            // Mostrar sucesso
            const successMsg = document.getElementById('formSuccess');
            successMsg.style.display = 'block';
            
            // Resetar formulário
            contactForm.reset();
            
            // Esconder mensagem após 5 segundos
            setTimeout(() => {
                successMsg.style.display = 'none';
            }, 5000);
        }, 2000);
    });
}

// FAQ Accordion
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Fechar outros itens
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Alternar item atual
            item.classList.toggle('active');
        });
    });
}

// Animações
function initAnimations() {
    // Animar elementos ao scroll
    const animateElements = document.querySelectorAll('.skill-item, .feature-card, .project-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
}

// Animações de Scroll Suave
function initScrollAnimations() {
    // Links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Carregar Repositórios do GitHub
async function loadGitHubRepos() {
    try {
        const response = await fetch('https://api.github.com/users/ArturPrado/repos?sort=updated&per_page=6');
        const repos = await response.json();
        
        const container = document.getElementById('repositorios');
        if (!container) return;
        
        if (repos.length === 0) {
            container.innerHTML = '<p class="text-center">Nenhum repositório encontrado.</p>';
            return;
        }
        
        container.innerHTML = repos.map(repo => `
            <div class="project-card">
                <div class="project-content">
                    <h3>${repo.name}</h3>
                    <p>${repo.description || 'Sem descrição'}</p>
                    <div class="project-tech">
                        ${repo.language ? `<span>${repo.language}</span>` : ''}
                        <span>⭐ ${repo.stargazers_count}</span>
                    </div>
                    <a href="${repo.html_url}" target="_blank" class="btn-secondary">
                        Ver no GitHub
                    </a>
                </div>
            </div>
        `).join('');
        
    } catch (error) {
        console.error('Erro ao carregar repositórios:', error);
        document.getElementById('repositorios').innerHTML = 
            '<p class="text-center">Erro ao carregar repositórios.</p>';
    }
}

// Carregar repositórios se estiver na página certa
if (document.getElementById('repositorios')) {
    loadGitHubRepos();
}

// Adicionar classe ao scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Prevenir formulários de recarregar página
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', e => e.preventDefault());
});