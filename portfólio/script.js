// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.stat-card, .skill-card, .contato-item, .badge, .sobre-texto p');

const revealOnScroll = () => {
    revealElements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight - 100) {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
};

// Initialize elements with hidden state
revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
});

// Run on load and scroll
window.addEventListener('load', revealOnScroll);
window.addEventListener('scroll', revealOnScroll);

// Navbar Background on Scroll
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 15, 28, 0.95)';
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 15, 28, 0.8)';
        navbar.style.boxShadow = 'none';
    }
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Create floating particles in hero
const createParticles = () => {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 6 + 2}px;
            height: ${Math.random() * 6 + 2}px;
            background: linear-gradient(135deg, rgba(99, 102, 241, ${Math.random() * 0.5 + 0.2}), rgba(139, 92, 246, ${Math.random() * 0.5 + 0.2}));
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 5}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
            pointer-events: none;
        `;
        hero.appendChild(particle);
    }
};

// Add float animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.3;
        }
        25% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.6;
        }
        50% {
            transform: translateY(-40px) translateX(-10px);
            opacity: 0.4;
        }
        75% {
            transform: translateY(-20px) translateX(5px);
            opacity: 0.5;
        }
    }
`;
document.head.appendChild(style);

// Initialize particles
createParticles();

// Intersection Observer for more precise animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Add visible class styles
const visibleStyle = document.createElement('style');
visibleStyle.textContent = `
    section {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    section.visible {
        opacity: 1;
        transform: translateY(0);
    }
    .hero {
        opacity: 1 !important;
        transform: none !important;
    }
`;
document.head.appendChild(visibleStyle);

// Função para buscar repositórios do GitHub (keeping original functionality)
async function carregarRepositorios() {
    const container = document.getElementById('repositorios');
    if (!container) return;

    try {
        const response = await fetch('https://api.github.com/users/ArturPrado/repos?sort=stars&per_page=6');
        const repos = await response.json();

        if (!Array.isArray(repos)) {
            throw new Error('Erro ao carregar repositórios');
        }

        container.innerHTML = '';

        if (repos.length === 0) {
            container.innerHTML = '<div class="loading"><p>Nenhum repositório encontrado.</p></div>';
            return;
        }

        repos.forEach((repo, index) => {
            const html = `
                <div class="projeto-item" style="animation-delay: ${index * 0.1}s">
                    <h3>
                        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">
                            ${repo.name}
                        </a>
                    </h3>
                    <p>${repo.description || 'Sem descrição'}</p>
                    <div class="tags">
                        ${repo.language ? `<span class="tag">${repo.language}</span>` : ''}
                        <span class="tag">⭐ ${repo.stargazers_count}</span>
                    </div>
                    <small>Atualizado: ${new Date(repo.updated_at).toLocaleDateString('pt-BR')}</small>
                </div>
            `;
            container.innerHTML += html;
        });
    } catch (error) {
        console.error('Erro:', error);
        if (container) {
            container.innerHTML = '<div class="loading"><p style="color: #ef4444;">Erro ao carregar repositórios do GitHub</p></div>';
        }
    }
}

// Carrega os repositórios quando a página carrega
document.addEventListener('DOMContentLoaded', carregarRepositorios);
