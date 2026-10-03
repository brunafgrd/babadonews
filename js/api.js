/* =================================
   INTEGRAÇÃO COM A API
================================= */

/* O nginx do container do frontend repassa /api para o backend */

const API_URL = "/api";



/* =================================
   CHAMADAS À API
================================= */

async function buscarNoticias() {

    const resposta = await fetch(API_URL + "/noticias");

    if (!resposta.ok) {
        throw new Error("Erro " + resposta.status + " ao buscar as notícias.");
    }

    return resposta.json();

}


async function buscarNoticiaPorId(id) {

    const resposta = await fetch(
        API_URL + "/noticias/" + encodeURIComponent(id)
    );

    if (!resposta.ok) {
        throw new Error("Erro " + resposta.status + " ao buscar a notícia.");
    }

    /* O backend responde com corpo vazio quando o id não existe */

    const texto = await resposta.text();

    if (texto.trim() === "") {
        return null;
    }

    return JSON.parse(texto);

}



/* =================================
   FUNÇÕES AUXILIARES
================================= */

function linkDaNoticia(noticia) {

    return "noticia.html?id=" + encodeURIComponent(noticia.id);

}


/* Compara categorias sem diferenciar acentos e maiúsculas */

function normalizarCategoria(categoria) {

    return String(categoria || "")
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .trim()
        .toUpperCase();

}


function maisRecentes(noticias) {

    return noticias.slice().sort(function(a, b) {
        return b.id - a.id;
    });

}


function criarElemento(tag, classe, texto) {

    const elemento = document.createElement(tag);

    if (classe) {
        elemento.className = classe;
    }

    if (texto) {
        elemento.textContent = texto;
    }

    return elemento;

}


function criarImagem(noticia, classe) {

    const imagem = criarElemento("img", classe);

    imagem.src = noticia.imagem;

    imagem.alt = noticia.titulo;

    return imagem;

}



/* =================================
   CARTÕES
================================= */

function criarCartaoLateral(noticia) {

    const cartao = criarElemento("article", "cartao-noticia");

    const texto = criarElemento("div", "texto-cartao");

    const link = criarElemento("a", "link-materia");

    link.href = linkDaNoticia(noticia);

    link.appendChild(criarElemento("h3", "", noticia.titulo));

    texto.appendChild(
        criarElemento("span", "categoria-noticia", noticia.categoria)
    );

    texto.appendChild(link);

    cartao.appendChild(criarImagem(noticia));

    cartao.appendChild(texto);

    return cartao;

}


function criarMateria(noticia, principal) {

    const materia = criarElemento(
        "article",
        principal ? "materia-principal" : "materia-secundaria"
    );

    const conteudo = criarElemento("div", "conteudo-materia");

    const titulo = criarElemento("h3");

    const link = criarElemento("a", "", noticia.titulo);

    link.href = linkDaNoticia(noticia);

    titulo.appendChild(link);

    conteudo.appendChild(
        criarElemento("span", "categoria-noticia", noticia.categoria)
    );

    conteudo.appendChild(titulo);

    if (principal) {
        conteudo.appendChild(criarElemento("p", "", noticia.conteudo));
    }

    materia.appendChild(criarImagem(noticia));

    materia.appendChild(conteudo);

    return materia;

}


function criarCardTecnologia(noticia) {

    const card = criarElemento("a", "card-tecnologia");

    const conteudo = criarElemento("div", "conteudo-card-tecnologia");

    card.href = linkDaNoticia(noticia);

    conteudo.appendChild(
        criarElemento("span", "categoria-tecnologia", noticia.categoria)
    );

    conteudo.appendChild(criarElemento("h3", "", noticia.titulo));

    conteudo.appendChild(criarElemento("p", "", noticia.conteudo));

    card.appendChild(criarImagem(noticia, "imagem-tecnologia"));

    card.appendChild(conteudo);

    return card;

}



/* =================================
   PÁGINA INICIAL
================================= */

/* Uma notícia por categoria, começando pelas mais recentes.
   Se sobrar espaço, completa com as demais notícias. */

function escolherDestaques(noticias, quantidade) {

    const categorias = [];

    const destaques = noticias.filter(function(noticia) {

        const categoria = normalizarCategoria(noticia.categoria);

        if (categorias.includes(categoria)) {
            return false;
        }

        categorias.push(categoria);

        return true;

    });

    noticias.forEach(function(noticia) {

        if (!destaques.includes(noticia)) {
            destaques.push(noticia);
        }

    });

    return destaques.slice(0, quantidade);

}


function preencherCarrossel(noticias) {

    const totalIndicadores =
        document.querySelectorAll(".indicadores-destaque span").length;

    if (typeof window.atualizarCarrossel !== "function") {
        return [];
    }

    const destaques =
        escolherDestaques(noticias, totalIndicadores);

    window.atualizarCarrossel(destaques.map(function(noticia) {

        return {
            categoria: noticia.categoria,
            imagem: noticia.imagem,
            titulo: noticia.titulo,
            texto: noticia.conteudo,
            link: linkDaNoticia(noticia)
        };

    }));

    return destaques;

}


function preencherUltimas(lista, noticias, destaques) {

    const quantidade = Number(lista.dataset.apiUltimas) || 3;

    /* Evita repetir o que já aparece no carrossel */

    let ultimas = noticias.filter(function(noticia) {
        return !destaques.includes(noticia);
    });

    if (ultimas.length === 0) {
        ultimas = noticias;
    }

    Array.from(lista.children).forEach(function(filho) {

        if (!filho.classList.contains("titulo-secao")) {
            filho.remove();
        }

    });

    ultimas.slice(0, quantidade).forEach(function(noticia) {
        lista.appendChild(criarCartaoLateral(noticia));
    });

}



/* =================================
   PÁGINAS DE CATEGORIA
================================= */

function preencherCategoria(grade, noticias) {

    const categoria = normalizarCategoria(grade.dataset.apiCategoria);

    const daCategoria = noticias.filter(function(noticia) {
        return normalizarCategoria(noticia.categoria) === categoria;
    });

    /* Sem notícias na API: mantém o conteúdo fixo da página */

    if (daCategoria.length === 0) {
        return;
    }

    const cartoes = daCategoria.map(function(noticia, indice) {

        if (grade.classList.contains("grade-tecnologia")) {
            return criarCardTecnologia(noticia);
        }

        return criarMateria(noticia, indice === 0);

    });

    grade.replaceChildren(...cartoes);

    /* Seções que só existem para a API começam ocultas */

    const secaoOculta = grade.closest("[hidden]");

    if (secaoOculta) {
        secaoOculta.hidden = false;
    }

}



/* =================================
   CARREGAR LISTAGENS
================================= */

async function carregarListagens() {

    const listaUltimas =
        document.querySelector("[data-api-ultimas]");

    const grades =
        document.querySelectorAll("[data-api-categoria]");

    if (!listaUltimas && grades.length === 0) {
        return;
    }

    let noticias;

    try {

        noticias = maisRecentes(await buscarNoticias());

    } catch (erro) {

        /* API fora do ar: as páginas continuam com o conteúdo fixo */

        console.warn("Não foi possível carregar as notícias da API.", erro);

        return;

    }

    if (noticias.length === 0) {
        return;
    }

    if (listaUltimas) {

        const destaques = preencherCarrossel(noticias);

        preencherUltimas(listaUltimas, noticias, destaques);

    }

    grades.forEach(function(grade) {
        preencherCategoria(grade, noticias);
    });

}

carregarListagens();



/* =================================
   PÁGINA DA NOTÍCIA
================================= */

const paginaNoticia = document.getElementById("noticia-api");


function mostrarAvisoNoticia(titulo, mensagem) {

    document.getElementById("noticia-titulo").textContent = titulo;

    document.getElementById("noticia-conteudo").textContent = mensagem;

}


async function carregarNoticia() {

    const id = new URLSearchParams(window.location.search).get("id");

    if (!id) {

        mostrarAvisoNoticia(
            "Notícia não encontrada",
            "Nenhuma notícia foi informada no endereço."
        );

        return;

    }

    let noticia;

    try {

        noticia = await buscarNoticiaPorId(id);

    } catch (erro) {

        console.warn("Não foi possível carregar a notícia da API.", erro);

        mostrarAvisoNoticia(
            "Não foi possível conectar à API",
            "Tente novamente em alguns instantes."
        );

        return;

    }

    if (!noticia) {

        mostrarAvisoNoticia(
            "Notícia não encontrada",
            "A notícia que você procura não existe ou foi removida."
        );

        return;

    }

    document.title = "Babado News | " + noticia.titulo;

    document.getElementById("noticia-categoria").textContent =
        noticia.categoria;

    document.getElementById("noticia-titulo").textContent =
        noticia.titulo;

    document.getElementById("noticia-conteudo").textContent =
        noticia.conteudo;

    document.getElementById("noticia-imagem").replaceChildren(
        criarImagem(noticia, "imagem-tecno")
    );

}

if (paginaNoticia) {

    carregarNoticia();

}
