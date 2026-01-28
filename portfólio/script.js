// Função para buscar repositórios do GitHub
async function carregarRepositorios() {
    try {
        const response = await fetch('https://api.github.com/users/ArturPrado/repos?sort=stars&per_page=6');
        const repos = await response.json();

        if (!Array.isArray(repos)) {
            throw new Error('Erro ao carregar repositórios');
        }

        const container = document.getElementById('repositorios');
        container.innerHTML = ''; // Limpa o loading

        if (repos.length === 0) {
            container.innerHTML = '<div class="loading"><p>Nenhum repositório encontrado.</p></div>';
            return;
        }

        repos.forEach(repo => {
            const html = `
                <div class="projeto-item">
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
        document.getElementById('repositorios').innerHTML = '<div class="loading"><p style="color: #ef4444;">Erro ao carregar repositórios do GitHub</p></div>';
    }
}

// Carrega os repositórios quando a página carrega
document.addEventListener('DOMContentLoaded', carregarRepositorios);
