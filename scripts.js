let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function showSlide(index) {
    const carrossel = document.getElementById('carrossel');
    carrossel.style.transform = `translateX(-${index * 25}%)`;
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    showSlide(currentIndex);
}

setInterval(nextSlide, 3000); // Muda o slide a cada 3 segundos

// Inicializa o carrossel na posição correta
showSlide(currentIndex);
