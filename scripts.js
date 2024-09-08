const desenhos = [
    { autor: "JK", caminho: "desenhos/Satoru.png" },
    { autor: "Kaue", caminho: "desenhos/Anya.jpg" },
    { autor: "Juliano", caminho: "desenhos/Yuji.jpg" }
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
