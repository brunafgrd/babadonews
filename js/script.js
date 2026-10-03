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

        dataAtual.textContent = "Brasil, " + dataFormatada;

    }

}

atualizarData();

setInterval(atualizarData, 60000);



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

        mensagemInscricao.textContent =
            "Inscrição realizada com sucesso! Obrigado por acompanhar o Babado News.";

        mensagemInscricao.style.color = "#16a34a";

        formularioInscricao.reset();

    });

}



/* =================================
   CARROSSEL DE NOTÍCIAS
================================= */

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


if (
    imagemDestaque &&
    etiquetaNoticia &&
    tituloDestaque &&
    textoDestaque &&
    botaoMateria &&
    indicadores.length > 0
) {


    /* =================================
       NOTÍCIAS DO CARROSSEL
    ================================= */

    let noticias = [

        {
            categoria: "ENTRETENIMENTO",

            imagem: "img/anitta.jpg",

            titulo:
                "Anitta agita ensaio no Rio e anuncia novidades para 2027",

            texto:
                "Anitta agita ensaio no Rio e anuncia novidades para 2027.",

            link:
                "entretenimento.html"
        },


        {
            categoria: "ESPORTES",

            imagem: "img/tecnico.png",

            titulo:
                "Confira os convocados para amistoso da seleção brasileira.",

            texto:
                "Confira as novidades e os convocados para o próximo amistoso da seleção brasileira.",

            link:
                "esportes.html"
        },


        {
            categoria: "TECNOLOGIA",

            imagem: "img/ai.jpg",

            titulo:
                "Tecnologia e inovação ganham destaque em 2026",

            texto:
                "Tecnologia e inovação ganham cada vez mais espaço e transformam o cotidiano.",

            link:
                "tecnologia.html"
        },


        {
            categoria: "CULTURA",

            imagem: "img/party.jpg",

            titulo:
                "Cultura e entretenimento movimentam o fim de semana",

            texto:
                "Confira os principais acontecimentos de cultura e entretenimento.",

            link:
                "lifestyle.html"
        }

    ];


    let noticiaAtual = 0;



    /* =================================
       MOSTRAR NOTÍCIA
    ================================= */

    function mostrarNoticia(indice) {

        const noticia = noticias[indice];

        if (!noticia) {
            return;
        }


        imagemDestaque.src =
            noticia.imagem;

        imagemDestaque.alt =
            noticia.titulo;


        etiquetaNoticia.textContent =
            noticia.categoria;


        tituloDestaque.textContent =
            noticia.titulo;


        textoDestaque.textContent =
            noticia.texto;


        botaoMateria.href =
            noticia.link;


        indicadores.forEach(function(indicador, index) {

            indicador.classList.toggle(
                "selecionado",
                index === indice
            );

        });

    }



    /* =================================
       CLIQUE NOS INDICADORES
    ================================= */

    indicadores.forEach(function(indicador, index) {

        indicador.style.cursor = "pointer";

        indicador.addEventListener("click", function() {

            noticiaAtual = index;

            mostrarNoticia(noticiaAtual);

        });

    });



    /* =================================
       INICIAR CARROSSEL
    ================================= */

    mostrarNoticia(noticiaAtual);



    /* =================================
       NOTÍCIAS VINDAS DA API
    ================================= */

    /* Chamada pelo js/api.js quando a API responde.
       As notícias acima continuam valendo se ela estiver fora do ar. */

    window.atualizarCarrossel = function(novasNoticias) {

        if (!Array.isArray(novasNoticias) || novasNoticias.length === 0) {
            return;
        }

        noticias = novasNoticias.slice(0, indicadores.length);

        noticiaAtual = 0;

        mostrarNoticia(noticiaAtual);

    };



    /* =================================
       TROCA AUTOMÁTICA
    ================================= */

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


        /* LIMPAR MENSAGENS */

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


        /* VALIDAÇÃO DO NOME */

        if (campoNome.value.trim().length < 3) {

            document.querySelector("#erro-nome").textContent =
                "Digite um nome válido.";

            campoNome.classList.add("campo-invalido");

            formularioValido = false;

        }


        /* VALIDAÇÃO DO E-MAIL */

        const padraoEmail =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!padraoEmail.test(campoEmail.value.trim())) {

            document.querySelector("#erro-email").textContent =
                "Digite um e-mail válido.";

            campoEmail.classList.add("campo-invalido");

            formularioValido = false;

        }


        /* VALIDAÇÃO DO ASSUNTO */

        if (campoAssunto.value === "") {

            document.querySelector("#erro-assunto").textContent =
                "Selecione um assunto.";

            campoAssunto.classList.add("campo-invalido");

            formularioValido = false;

        }


        /* VALIDAÇÃO DA MENSAGEM */

        if (campoMensagem.value.trim().length < 10) {

            document.querySelector("#erro-mensagem").textContent =
                "A mensagem deve ter pelo menos 10 caracteres.";

            campoMensagem.classList.add("campo-invalido");

            formularioValido = false;

        }


        /* VALIDAÇÃO DO CHECKBOX */

        if (!campoAceite.checked) {

            document.querySelector("#erro-aceite").textContent =
                "Confirme que as informações estão corretas.";

            formularioValido = false;

        }


        /* RESULTADO */

        if (!formularioValido) {

            mensagemRetorno.textContent =
                "Verifique os campos destacados e tente novamente.";

            mensagemRetorno.classList.add("erro");

            return;

        }


        /* SUCESSO */

        mensagemRetorno.textContent =
            "Mensagem validada com sucesso! " +
            "Esta é uma demonstração acadêmica e " +
            "o envio real ainda não está conectado a um servidor.";

        mensagemRetorno.classList.add("sucesso");


        formularioContato.reset();

    });

}