const desenhos = [
    { autor: "Maria Silva", caminho: "desenhos/desenho1.png" },
    { autor: "João Souza", caminho: "desenhos/desenho2.png" },
    { autor: "Ana Santos", caminho: "desenhos/desenho3.png" },
    { autor: "Pedro Oliveira", caminho: "desenhos/desenho4.png" },
    { autor: "Carla Dias", caminho: "desenhos/desenho5.png" }
];

const carrossel = document.getElementById('carrossel');
let currentIndex = 0;

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
    carrossel.style.transform = `translateX(-${currentIndex * width}px)`;

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

setInterval(nextSlide, 3000); // Troca de desenho a cada 3 segundos

window.onload = updateCarrossel;
window.onresize = updateCarrossel;
