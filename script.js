// Selecionando os elementos do DOM
const calendar = document.getElementById('calendar');
const postTitles = document.getElementById('post-titles');
const postsContainer = document.getElementById('posts');

// Função para criar o calendário dinâmico
function createCalendar(year, month) {
    calendar.innerHTML = ''; // Limpar calendário anterior

    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Total de dias no mês
    const firstDay = new Date(year, month, 1).getDay(); // Primeiro dia do mês

    // Preencher os dias em branco antes do primeiro dia do mês
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        calendar.appendChild(emptyCell);
    }

    // Preencher os dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement('div');
        dayCell.textContent = day;

        // Verificar se há postagens para esse dia
        if (getPostsForDate(year, month, day).length > 0) {
            dayCell.classList.add('post-day'); // Destacar dias com postagens
        }

        // Adicionar evento de clique para exibir as postagens do dia
        dayCell.addEventListener('click', () => displayPostsForDate(year, month, day));
        calendar.appendChild(dayCell);
    }
}

// Função para exibir os títulos das postagens de uma data específica
function displayPostsForDate(year, month, day) {
    postTitles.innerHTML = ''; // Limpar títulos anteriores
    const posts = getPostsForDate(year, month, day);

    posts.forEach(post => {
        const li = document.createElement('li');
        li.textContent = post.title;
        li.addEventListener('click', () => displayPostContent(post));
        postTitles.appendChild(li);
    });
}

// Função para exibir o conteúdo de uma postagem no container principal
function displayPostContent(post) {
    postsContainer.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.content}</p>
        <p><strong>Autor:</strong> ${post.author}</p>
    `;
}

// Função para obter as postagens de uma data específica
function getPostsForDate(year, month, day) {
    const dateKey = `${year}-${month + 1}-${day}`;
    const posts = JSON.parse(localStorage.getItem('posts')) || {};
    return posts[dateKey] || [];
}

// Função para adicionar uma nova postagem
function addPost(title, content, author, date) {
    const posts = JSON.parse(localStorage.getItem('posts')) || {};
    const dateKey = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

    if (!posts[dateKey]) {
        posts[dateKey] = [];
    }
    posts[dateKey].push({ title, content, author });

    localStorage.setItem('posts', JSON.stringify(posts));
}

// Inicializar o calendário no mês atual
const today = new Date();
createCalendar(today.getFullYear(), today.getMonth());

// Adicionar a postagem fornecida como exemplo
addPost(
    'Doce Lar',
    `Terra dos nossos demônios  
    Lugar para mascarar nossos desejos  
    Terreno cujo cortejamos o sheol  
    Abismo onde nos suicidamos  
    Refúgio para evadirmos da inexorável realidade  
    Reino onde percebemos que desejamos continuar a viver  
    Local onde somos confortados do nosso hades  
    Casulo onde perdemos nosso ser  
    Um quarto onde podemos nos conectar uns com os outros  
    Recinto onde podemos optar pelo gélido destino da solidão  
    Ou um lar para nos aquecermos na companhia dos outros.`,
    'Carlos Alexandre 2⁰A',
    today
);