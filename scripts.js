// Importar funções necessárias do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-storage.js";
import { getDatabase, ref as dbRef, set, onValue } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

// Configurações do Firebase
const firebaseConfig = {
    apiKey: "SUA_API_KEY", // Substitua pela sua API key
    authDomain: "SEU_DOMINIO.firebaseapp.com", // Substitua pelo seu domínio
    projectId: "SEU_PROJETO_ID", // Substitua pelo ID do seu projeto
    storageBucket: "SEU_BUCKET.appspot.com", // Substitua pelo seu bucket
    messagingSenderId: "SEU_SENDER_ID", // Substitua pelo seu sender ID
    appId: "SEU_APP_ID" // Substitua pelo seu app ID
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const database = getDatabase(app);

document.addEventListener('DOMContentLoaded', () => {
    const galeria = document.getElementById('galeria');
    const uploadForm = document.getElementById('upload-form');
    const autorInput = document.getElementById('autor');
    const fileInput = document.getElementById('file-input');
    const uploadSection = document.getElementById('upload-section');
    const adicionarDesenhoBtn = document.getElementById('adicionar-desenho-btn');
    let currentIndex = 0;

    // Função para carregar desenhos do Firebase
    const carregarDesenhos = () => {
        const desenhosRef = dbRef(database, 'desenhos/');
        onValue(desenhosRef, (snapshot) => {
            galeria.innerHTML = ''; // Limpa a galeria antes de adicionar novos desenhos
            snapshot.forEach(childSnapshot => {
                const { autor, url } = childSnapshot.val();
                const div = document.createElement('div');
                div.className = 'desenho';
                div.innerHTML = `<img src="${url}" alt="Desenho de ${autor}"><p>${autor}</p>`;
                galeria.appendChild(div);
            });
        });
    };

    // Função para mover a galeria automaticamente
    const moverGaleria = () => {
        const totalDesenhos = galeria.children.length;
        if (totalDesenhos > 0) {
            currentIndex = (currentIndex + 1) % totalDesenhos;
            const offset = -currentIndex * 100; // Move 100% para o próximo slide
            galeria.style.transform = `translateX(${offset}%)`;
        }
    };

    // Enviar desenho
    const enviarDesenho = (evento) => {
        evento.preventDefault();

        const autor = autorInput.value;
        const arquivo = fileInput.files[0];

        if (autor && arquivo) {
            const storageRef = ref(storage, `desenhos/${arquivo.name}`);
            uploadBytes(storageRef, arquivo).then(() => {
                return getDownloadURL(storageRef);
            }).then((urlImagem) => {
                // Adicionar novo desenho ao Firebase
                const desenhosRef = dbRef(database, 'desenhos/' + arquivo.name);
                set(desenhosRef, {
                    autor,
                    url: urlImagem
                });

                // Limpar o formulário após o envio
                uploadForm.reset();
                uploadSection.classList.add('hidden');
            }).catch(error => {
                console.error('Erro ao enviar o desenho:', error);
                alert('Erro ao enviar o desenho. Tente novamente.');
            });
        } else {
            alert('Por favor, preencha seu nome e escolha um arquivo de imagem.');
        }
    };

    // Mostrar ou esconder a seção de upload
    const toggleUploadSection = () => {
        uploadSection.classList.toggle('hidden');
    };

    // Inicializar galeria e carregar desenhos do Firebase
    carregarDesenhos();
    setInterval(moverGaleria, 3000); // A cada 3 segundos move para o próximo slide

    // Evento de clique no botão "Adicionar Meu Desenho"
    adicionarDesenhoBtn.addEventListener('click', toggleUploadSection);

    // Evento de submit no formulário de upload
    uploadForm.addEventListener('submit', enviarDesenho);
});
