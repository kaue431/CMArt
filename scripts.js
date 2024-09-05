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
