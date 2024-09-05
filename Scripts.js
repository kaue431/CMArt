document.addEventListener('DOMContentLoaded', () => {
    const galeria = document.getElementById('galeria');
    // Função de exemplo para carregar desenhos (será aprimorada depois)
    const carregarDesenhos = () => {
        let desenhos = [
            { autor: 'Aluno 1', url: 'desenho1.png' },
            { autor: 'Aluno 2', url: 'desenho2.png' }
        ];
        desenhos.forEach(desenho => {
            const div = document.createElement('div');
            div.className = 'desenho';
            div.innerHTML = `<img src="${desenho.url}" alt="Desenho de ${desenho.autor}"><p>${desenho.autor}</p>`;
            galeria.appendChild(div);
        });
    };
    carregarDesenhos();
});
