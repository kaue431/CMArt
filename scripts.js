const firebaseConfig = {
    apiKey: "AIzaSyD4WbpkQEijKKKXV_C1e8uu8588Obw1CCM",
    authDomain: "cmart-81f45.firebaseapp.com",
    databaseURL: "https://cmart-81f45-default-rtdb.firebaseio.com",
    projectId: "cmart-81f45",
    storageBucket: "cmart-81f45.appspot.com",
    messagingSenderId: "216861470054",
    appId: "1:216861470054:web:5c81e8ee801be541d56ca7"
};

// Inicialize o Firebase
firebase.initializeApp(firebaseConfig);

// Referência ao Realtime Database
const database = firebase.database();
const desenhosRef = database.ref("Desenhos");

// Buscar e exibir os desenhos
desenhosRef.on("value", (snapshot) => {
    const desenhos = snapshot.val();
    const galeria = document.getElementById('galeria');
    galeria.innerHTML = ''; // Limpa o conteúdo antes de adicionar os desenhos

    if (desenhos) {
        for (let key in desenhos) {
            const desenho = desenhos[key];
            galeria.innerHTML += `
                <div class="desenho">
                    <img src="${desenho.url}" alt="Desenho de ${desenho.autor}">
                    <p>Autor: ${desenho.autor}</p>
                </div>
            `;
        }
    } else {
        galeria.innerHTML = '<p>Nenhum desenho encontrado.</p>';
    }
});
