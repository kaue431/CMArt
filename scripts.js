// scripts.js

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyD4WbpkQEijKKKXV_C1e8uu8588Obw1CCM",
    authDomain: "cmart-81f45.firebaseapp.com",
    projectId: "cmart-81f45",
    storageBucket: "cmart-81f45.appspot.com",
    messagingSenderId: "216861470054",
    appId: "1:216861470054:web:5c81e8ee801be541d56ca7",
    databaseURL: "https://cmart-81f45-default-rtdb.firebaseio.com"
};

// Inicializando Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const storage = firebase.storage();

// Referências dos elementos da página
const modal = document.getElementById("uploadModal");
const closeModal = document.getElementById("closeModal");
const adicionarDesenhoBtn = document.getElementById("adicionarDesenhoBtn");
const uploadBtn = document.getElementById("uploadBtn");

// Mostrar modal ao clicar no botão "Adicionar meu desenho"
adicionarDesenhoBtn.addEventListener('click', function() {
    modal.style.display = "block";
});

// Fechar modal ao clicar no X
closeModal.addEventListener('click', function() {
    modal.style.display = "none";
});

// Fechar modal ao clicar fora da área de conteúdo
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

// Fazer upload do desenho para o Firebase Storage
uploadBtn.addEventListener('click', function() {
    const file = document.getElementById('uploadFile').files[0];
    const autor = document.getElementById('nomeAutor').value;

    if (file && autor) {
        const storageRef = storage.ref('desenhos/' + file.name);
        storageRef.put(file).then(snapshot => {
            snapshot.ref.getDownloadURL().then(url => {
                const desenhoRef = database.ref('desenhos').push();
                desenhoRef.set({
                    autor: autor,
                    url: url
                }).then(() => {
                    alert('Desenho enviado com sucesso!');
                    carregarDesenhos(); // Atualiza a galeria
                    modal.style.display = "none"; // Fecha o modal após sucesso
                }).catch(error => {
                    console.error('Erro ao salvar no banco de dados:', error);
                });
            }).catch(error => {
                console.error('Erro ao obter URL:', error);
            });
        }).catch(error => {
            console.error('Erro ao fazer upload:', error);
        });
    } else {
        alert('Por favor, selecione um arquivo e insira seu nome.');
    }
});

// Carregar desenhos da galeria do Firebase
function carregarDesenhos() {
    const galeria = document.getElementById('galeria');
    galeria.innerHTML = ''; // Limpa a galeria

    const desenhosRef = database.ref('desenhos');
    desenhosRef.once('value', snapshot => {
        snapshot.forEach(childSnapshot => {
            const data = childSnapshot.val();
            const item = document.createElement('div');
            item.classList.add('galeria-item');
            item.innerHTML = `
                <img src="${data.url}" alt="Desenho de ${data.autor}">
                <p>${data.autor}</p>
            `;
            galeria.appendChild(item);
        });
    });
}

// Função para iniciar o carrossel
let currentIndex = 0;
function mostrarProximoDesenho() {
    const items = document.querySelectorAll('.galeria-item');
    if (items.length > 0) {
        items.forEach((item, index) => {
            item.style.transform = `translateX(${(index - currentIndex) * 100}%)`;
            item.style.opacity = index === currentIndex ? '1' : '0.5'; // Destaque para o item central
        });
        currentIndex = (currentIndex + 1) % items.length;
    }
}

setInterval(mostrarProximoDesenho, 3000); // Troca a cada 3 segundos

// Carregar desenhos ao abrir a página
window.onload = carregarDesenhos;