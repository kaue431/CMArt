// Lista de desenhos com URLs e autores
const desenhos = [
    {
        autor: "Maria Silva",
        url: "https://firebasestorage.googleapis.com/v0/b/cmart-81f45.appspot.com/o/Desenhos%2Fdesenho1.png?alt=media&token=exampleToken1"
    },
    {
        autor: "João Souza",
        url: "https://firebasestorage.googleapis.com/v0/b/cmart-81f45.appspot.com/o/Desenhos%2Fdesenho2.png?alt=media&token=exampleToken2"
    },
    {
        autor: "Ana Santos",
        url: "https://firebasestorage.googleapis.com/v0/b/cmart-81f45.appspot.com/o/Desenhos%2Fdesenho3.png?alt=media&token=exampleToken3"
    }
];

// Exibir os desenhos na galeria
const galeria = document.getElementById('galeria');
galeria.innerHTML = ''; // Limpa o conteúdo antes de adicionar os desenhos

desenhos.forEach((desenho) => {
    galeria.innerHTML += `
        <div class="desenho">
            <img src="${desenho.url}" alt="Desenho de ${desenho.autor}">
            <p>Autor: ${desenho.autor}</p>
        </div>
    `;
});
