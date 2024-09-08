const desenhos = [
    { autor: "JK", caminho: "desenhos/Satoru.png" },
    { autor: "Kaue", caminho: "desenhos/Anya.jpg" },
    { autor: "Juliano", caminho: "desenhos/Yuji.jpg" }
];

const carrossel = document.getElementById('carrossel');
let currentIndex = Math.floor(desenhos.length / 2); // Começa com o foco no meio

// Exibir os desenhos no carrossel
desenhos.forEach((desenho) => {
    const div = document.createElement('div');
    div.classList.add('desenho');
    div.innerHTML = `
        <img src="${desenho.caminho}" alt="Desenho de ${desenho.autor}">
        <p>Autor: ${desenho.autor}</p>
    `;
    carrossel.appendChild(div);
});

function updateCarrossel() {
    const width = document.querySelector('.desenho').offsetWidth;
    const halfWidth = (carrossel.offsetWidth - width) / 2; // Centraliza o carrossel
    carrossel.style.transform = `translateX(${halfWidth - currentIndex * width}px)`;

    const allDesenhos = document.querySelectorAll('.desenho');
    allDesenhos.forEach((desenho, index) => {
        desenho.classList.remove('focus');
        if (index === currentIndex) {
            desenho.classList.add('focus');
        }
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % desenhos.length;
    updateCarrossel();
}

function loopSlides() {
    setTimeout(() => {
        nextSlide();
        loopSlides();
    }, 3000); // Intervalo de 3 segundos para cada slide
}

loopSlides(); // Inicia o loop contínuo
window.onload = updateCarrossel;
window.onresize = updateCarrossel;
