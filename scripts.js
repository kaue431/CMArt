document.addEventListener('DOMContentLoaded', () => {
    const galeria = document.getElementById('galeria');
    const uploadForm = document.getElementById('upload-form');
    const autorInput = document.getElementById('autor');
    const fileInput = document.getElementById('file-input');
    let currentIndex = 0;

    const desenhos = [
        { autor: 'Aluno 1', url: 'desenho1.png' },
        { autor: 'Aluno 2', url: 'desenho2.png' },
        { autor: 'Aluno 3', url: 'desenho3.png' }
    ];

    // Função para exibir os desenhos na galeria
    const exibirDesenhos = () => {
        desenhos.forEach(desenho => {
            const div = document.createElement('div');
            div.className = 'desenho';
            div.innerHTML = `<img src="${desenho.url}" alt="Desenho de ${desenho.autor}"><p>${desenho.autor}</p>`;
            galeria.appendChild(div);
        });
    };

    // Função para mover a galeria automaticamente
    const moverGaleria = () => {
        const totalDesenhos = desenhos.length;
        currentIndex = (currentIndex + 1) % totalDesenhos;
        const offset = -currentIndex * 100; // Move 100% para o próximo slide
        galeria.style.transform = `translateX(${offset}%)`;
    };

    // Enviar desenho
    const enviarDesenho = (evento) => {
        evento.preventDefault();

        const autor = autorInput.value;
        const arquivo = fileInput.files[0];

        if (autor && arquivo) {
            const reader = new FileReader();

            reader.onload = function(evento) {
                const urlImagem = evento.target.result;

                // Adicionar novo desenho
                desenhos.push({ autor, url: urlImagem });

                const novoDesenho = document.createElement('div');
                novoDesenho.className = 'desenho';
                novoDesenho.innerHTML = `<img src="${urlImagem}" alt="Desenho de ${autor}"><p>${autor}</p>`;
                galeria.appendChild(novoDesenho);
            };

            reader.readAsDataURL(arquivo);

            // Limpar formulário
            uploadForm.reset();
        } else {
            alert('Por favor, preencha seu nome e escolha um arquivo de imagem.');
        }
    };

    // Inicializar galeria
    exibirDesenhos();
    setInterval(moverGaleria, 3000); // A cada 3 segundos move para o próximo slide

    // Evento de submit no formulário de upload
    uploadForm.addEventListener('submit', enviarDesenho);
});
