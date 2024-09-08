// Lista de desenhos com URLs e autores
const desenhos = [
    {
        autor: "JK",
        url: "https://firebasestorage.googleapis.com/v0/b/cmart-81f45.appspot.com/o/Desenhos%2FScreenshot_2024-08-23-10-58-38-577_com.android.chrome.png?alt=media&token=a5dfae1a-e50d-4621-b5ef-dc329046f94b"
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
