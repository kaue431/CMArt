let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function showSlide(index) {
    const carrossel = document.getElementById('carrossel');
    // Corrigido: agora, ele faz o ciclo correto de slides
    carrossel.style.transform = `translateX(-${index * 100}%)`;
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    showSlide(currentIndex);
}

// Muda o slide a cada 3 segundos
setInterval(nextSlide, 3000);

// Inicia com o slide correto
showSlide(currentIndex);
