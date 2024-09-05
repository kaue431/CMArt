document.addEventListener('DOMContentLoaded', () => {
    const galeria = document.getElementById('galeria');
    const uploadForm = document.getElementById('upload-form');
    const autorInput = document.getElementById('autor');
    const fileInput = document.getElementById('file-input');
    const uploadSection = document.getElementById('upload-section');
    const adicionarDesenhoBtn = document.getElementById('adicionar-desenho-btn');
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

                // Adicionar novo desenho ao array de desenhos
                desenhos.push({ autor, url: urlImagem });

                // Criar novo elemento de desenho
                const novoDesenho = document.createElement('div');
                novoDesenho.className = 'desenho';
                novoDesenho.innerHTML = `<img src="${urlImagem}" alt="Desenho de ${autor}"><p>${autor}</p>`;

                // Adicionar o novo desenho à galeria
                galeria.appendChild(novoDesenho);
            };

            // Ler o arquivo de imagem como DataURL para exibição
            reader.readAsDataURL(arquivo);

            // Limpar o formulário após o envio
            uploadForm.reset();

            // Esconder a área de upload novamente após o envio
            uploadSection.classList.add('hidden');
        } else {
            alert('Por favor, preencha seu nome e escolha um arquivo de imagem.');
        }
    };

    // Mostrar ou esconder a seção de upload
    const toggleUploadSection = () => {
        uploadSection.classList.toggle('hidden');
    };

    // Inicializar galeria
    exibirDesenhos();
    setInterval(moverGaleria, 3000); // A cada 3 segundos move para o próximo slide

    // Evento de clique no botão "Adicionar Meu Desenho"
    adicionarDesenhoBtn.addEventListener('click', toggleUploadSection);

    // Evento de submit no formulário de upload
    uploadForm.addEventListener('submit', enviarDesenho);
});
