
/* =================================
   DATA DO SITE
================================= */

const dataAtual = document.getElementById("data-atual");

function atualizarData() {

    if (dataAtual) {

        const agora = new Date();

        const dataFormatada = agora.toLocaleDateString("pt-BR", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });

        dataAtual.textContent = "Rio de Janeiro, " + dataFormatada;

    }

}

// Mostra a data assim que a página é carregada
atualizarData();

// Atualiza a data automaticamente a cada minuto
setInterval(atualizarData, 60000);


/* =================================
   BUSCA DE NOTÍCIAS
================================= */

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
if (formularioBusca) {

    formularioBusca.addEventListener("submit", realizarBusca);

}


/* =================================
   FORMULÁRIO DE INSCRIÇÃO
================================= */

const formularioInscricao =
    document.getElementById("formulario-inscricao");

const mensagemInscricao =
    document.getElementById("mensagem-inscricao");

if (formularioInscricao) {

    formularioInscricao.addEventListener("submit", function(event) {

        event.preventDefault();

        const campoEmail =
            document.getElementById("email-inscricao");

        const email = campoEmail.value.trim();

        if (email === "") {

            mensagemInscricao.textContent =
                "Digite seu e-mail.";

            mensagemInscricao.style.color = "#dc2626";

            return;

        }

        const padraoEmail =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!padraoEmail.test(email)) {

            mensagemInscricao.textContent =
                "Digite um e-mail válido.";

            mensagemInscricao.style.color = "#dc2626";

            return;

        }

        mensagemInscricao.textContent =
            "Inscrição realizada com sucesso! Obrigado por acompanhar o Babado News.";

        mensagemInscricao.style.color = "#16a34a";

        formularioInscricao.reset();

    });

}


/* =================================
   CARROSSEL DE NOTÍCIAS
================================= */

// Seleciona os elementos do destaque
const imagemDestaque =
    document.querySelector(".imagem-destaque");

const etiquetaNoticia =
    document.querySelector(".etiqueta-noticia");

const tituloDestaque =
    document.querySelector(".conteudo-destaque h1");

const textoDestaque =
    document.querySelector(".conteudo-destaque p");

const botaoMateria =
    document.querySelector(".botao-materia");

const indicadores =
    document.querySelectorAll(".indicadores-destaque span");


// Verifica se o carrossel existe na página
if (
    imagemDestaque &&
    etiquetaNoticia &&
    tituloDestaque &&
    textoDestaque &&
    botaoMateria &&
    indicadores.length > 0
) {

    // Notícias do carrossel
    const noticias = [

        {
            categoria: "ENTRETENIMENTO",

            imagem: "img/anitta.jpg",

            titulo:
                "Anitta agita ensaio no Rio e anuncia novidades para 2027",

            texto:
                "Cantora levou o público ao delírio e confirmou novidades especiais para o próximo ano.",

            link: "entretenimento.html"
        },

        {
            categoria: "ESPORTES",

            imagem: "img/tecnico.png",

            titulo:
                "Confira os convocados para amistoso da seleção brasileira.",

            texto:
                "Novos jogadores com oportunidade de observação.",

            link: "esportes.html"
        },

        {
            categoria: "TECNOLOGIA",

            imagem: "img/ai.jpg",

            titulo:
                "Tecnologia e inovação ganham destaque em 2026",

            texto:
                "Descubra as novidades tecnológicas que estão transformando o nosso dia a dia.",

            link: "tecnologia.html"
        },

        {
            categoria: "CULTURA",

            imagem: "img/party.jpg",

            titulo:
                "Cultura e entretenimento movimentam o fim de semana",

            texto:
                "Eventos, música e novidades culturais para você acompanhar nessa semana.",

            link: "lifestyle.html"
        }

    ];


    // Controla a notícia atual
    let noticiaAtual = 0;


    // Função para mostrar uma notícia
    function mostrarNoticia(indice) {

        const noticia = noticias[indice];

        imagemDestaque.src = noticia.imagem;

        imagemDestaque.alt = noticia.titulo;

        etiquetaNoticia.textContent =
            noticia.categoria;

        tituloDestaque.textContent =
            noticia.titulo;

        textoDestaque.textContent =
            noticia.texto;

        botaoMateria.href =
            noticia.link;


        // Atualiza os pontinhos
        indicadores.forEach(function(indicador, index) {

            indicador.classList.toggle(
                "selecionado",
                index === indice
            );

        });

    }


    // Permite clicar nos pontinhos
    indicadores.forEach(function(indicador, index) {

        indicador.style.cursor = "pointer";

        indicador.addEventListener("click", function() {

            noticiaAtual = index;

            mostrarNoticia(noticiaAtual);

        });

    });


    // Passa automaticamente para a próxima notícia
    setInterval(function() {

        noticiaAtual++;

        if (noticiaAtual >= noticias.length) {

            noticiaAtual = 0;

        }

        mostrarNoticia(noticiaAtual);

    }, 6000);

}


/* =================================
   VALIDAÇÃO DO FORMULÁRIO DE CONTATO
================================= */

const formularioContato =
    document.querySelector("#formulario-contato");

if (formularioContato) {

    const campoNome =
        document.querySelector("#nome-contato");

    const campoEmail =
        document.querySelector("#email-contato");

    const campoAssunto =
        document.querySelector("#assunto-contato");

    const campoMensagem =
        document.querySelector("#campo-mensagem-contato");

    const campoAceite =
        document.querySelector("#aceite-contato");

    const mensagemRetorno =
        document.querySelector("#mensagem-contato");


    formularioContato.addEventListener("submit", function(evento) {

        evento.preventDefault();


        // LIMPAR MENSAGENS ANTERIORES

        document.querySelector("#erro-nome").textContent = "";

        document.querySelector("#erro-email").textContent = "";

        document.querySelector("#erro-assunto").textContent = "";

        document.querySelector("#erro-mensagem").textContent = "";

        document.querySelector("#erro-aceite").textContent = "";


        mensagemRetorno.textContent = "";

        mensagemRetorno.className =
            "mensagem-formulario";


        campoNome.classList.remove("campo-invalido");

        campoEmail.classList.remove("campo-invalido");

        campoAssunto.classList.remove("campo-invalido");

        campoMensagem.classList.remove("campo-invalido");


        let formularioValido = true;


        // VALIDAÇÃO DO NOME

        if (campoNome.value.trim().length < 3) {

            document.querySelector("#erro-nome").textContent =
                "Digite um nome válido.";

            campoNome.classList.add("campo-invalido");

            formularioValido = false;

        }


        // VALIDAÇÃO DO E-MAIL

        const padraoEmail =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!padraoEmail.test(campoEmail.value.trim())) {

            document.querySelector("#erro-email").textContent =
                "Digite um e-mail válido.";

            campoEmail.classList.add("campo-invalido");

            formularioValido = false;

        }


        // VALIDAÇÃO DO ASSUNTO

        if (campoAssunto.value === "") {

            document.querySelector("#erro-assunto").textContent =
                "Selecione um assunto.";

            campoAssunto.classList.add("campo-invalido");

            formularioValido = false;

        }


        // VALIDAÇÃO DA MENSAGEM

        if (campoMensagem.value.trim().length < 10) {

            document.querySelector("#erro-mensagem").textContent =
                "A mensagem deve ter pelo menos 10 caracteres.";

            campoMensagem.classList.add("campo-invalido");

            formularioValido = false;

        }


        // VALIDAÇÃO DO CHECKBOX

        if (!campoAceite.checked) {

            document.querySelector("#erro-aceite").textContent =
                "Confirme que as informações estão corretas.";

            formularioValido = false;

        }


        // VERIFICAR RESULTADO

        if (!formularioValido) {

            mensagemRetorno.textContent =
                "Verifique os campos destacados e tente novamente.";

            mensagemRetorno.classList.add("erro");

            return;

        }


        // SIMULAÇÃO DE ENVIO
        // Nesta versão, não existe conexão com um servidor.

        mensagemRetorno.textContent =
            "Mensagem validada com sucesso! " +
            "Esta é uma demonstração acadêmica e " +
            "o envio real ainda não está conectado a um servidor.";

        mensagemRetorno.classList.add("sucesso");


        // LIMPAR O FORMULÁRIO

        formularioContato.reset();

    });

}