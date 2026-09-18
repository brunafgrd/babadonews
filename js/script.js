
// =================================
// BUSCA DE NOTÍCIAS
// =================================


// Seleciona os elementos do formulário

const formularioBusca = document.getElementById("formularioBusca");

const campoPesquisa = document.getElementById("campoPesquisa");


// Função responsável pela busca

function realizarBusca(evento) {

    evento.preventDefault();


    const termoPesquisa = campoPesquisa.value.trim();


    if (termoPesquisa === "") {

        alert("Digite uma notícia para pesquisar.");

        return;

    }


    alert("Você pesquisou por: " + termoPesquisa);

}


// Evento de envio

formularioBusca.addEventListener("submit", realizarBusca);

// Formulario de contato 

