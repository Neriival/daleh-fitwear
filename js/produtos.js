/* =========================================================
   DALEH FITWEAR
   PRODUTOS
========================================================= */


/* =========================================================
   LISTA DE PRODUTOS
========================================================= */

const produtos = [

    /* =====================================================
       CONJUNTOS
    ===================================================== */

    {
        id: 1,
        nome: "Conjunto Essential",
        categoria: "conjuntos",
        preco: 149.90,

        imagem:
            "imagens/produto/conjunto-essential.jpg",

        imagens: [
            "imagens/produto/conjunto-essential.jpg",
            "imagens/produto/conjunto-branco.jpg",
            "imagens/produto/conjunto-preto.jpg"
        ],

        descricao:
            "Conjunto fitness desenvolvido para oferecer conforto, sustentação e liberdade de movimento durante seus treinos.",

        tamanhos: ["P", "M", "G"],
        cores: ["Rosa", "Preto"],
        estoque: 8,
        destaque: "NOVO"
    },


    {
        id: 2,
        nome: "Conjunto Premium",
        categoria: "conjuntos",
        preco: 169.90,

        imagem:
            "imagens/produto/conjunto-essential.jpg",

        imagens: [
            "imagens/produto/conjunto-essential.jpg",
            "imagens/produto/conjunto-branco.jpg",
            "imagens/produto/conjunto-preto.jpg"
        ],    

        descricao:
            "Conjunto premium com tecido confortável, ajuste elegante e excelente sustentação para seus treinos.",

        tamanhos: ["P", "M", "G", "GG"],
        cores: ["Rosa", "Preto"],
        estoque: 6,
        destaque: "DESTAQUE"
    },


    /* =====================================================
       TOPS
    ===================================================== */

    {
        id: 3,
        nome: "Top Power",
        categoria: "tops",
        preco: 79.90,

        imagem:
            "imagens/produtos/top-power.jpg",

        descricao:
            "Top fitness com ótima sustentação, conforto e liberdade para acompanhar seus treinos.",

        tamanhos: ["P", "M", "G"],
        cores: ["Rosa", "Preto", "Branco"],
        estoque: 12,
        destaque: ""
    },


    {
        id: 4,
        nome: "Top Energy",
        categoria: "tops",
        preco: 84.90,

        imagem:
            "imagens/produtos/top-energy.jpg",

        descricao:
            "Top fitness moderno, confortável e versátil para treinos, caminhadas e atividades esportivas.",

        tamanhos: ["P", "M", "G"],
        cores: ["Rosa", "Preto"],
        estoque: 9,
        destaque: ""
    },


    /* =====================================================
       CALÇAS
       Substitui a antiga categoria Leggings
    ===================================================== */

    {
        id: 5,
        nome: "Calça Performance",
        categoria: "calcas",
        preco: 119.90,

        imagem:
            "imagens/produtos/calca-performance.jpg",

        descricao:
            "Calça fitness confortável e flexível, desenvolvida para acompanhar seus treinos e sua rotina.",

        tamanhos: ["P", "M", "G", "GG"],
        cores: ["Rosa", "Preto"],
        estoque: 10,
        destaque: "MAIS VENDIDO"
    },


    /* =====================================================
       SHORTS
    ===================================================== */

    {
        id: 6,
        nome: "Short Move",
        categoria: "shorts",
        preco: 69.90,

        imagem:
            "imagens/produtos/short-move.jpg",

        descricao:
            "Short fitness leve e confortável, ideal para treinos intensos e atividades do dia a dia.",

        tamanhos: ["P", "M", "G"],
        cores: ["Rosa", "Preto"],
        estoque: 15,
        destaque: ""
    },


    {
        id: 7,
        nome: "Short Comfort",
        categoria: "shorts",
        preco: 74.90,

        imagem:
            "imagens/produtos/short-comfort.jpg",

        descricao:
            "Short fitness confortável e versátil, desenvolvido para proporcionar mobilidade e segurança durante o treino.",

        tamanhos: ["P", "M", "G"],
        cores: ["Rosa", "Preto"],
        estoque: 13,
        destaque: ""
    },


    /* =====================================================
       MACACÃO
    ===================================================== */

    {
        id: 8,
        nome: "Macacão Elegance",
        categoria: "macacao",
        preco: 189.90,

        imagem:
            "imagens/produtos/macacao-elegance.jpg",

        descricao:
            "Macacão fitness moderno com ajuste confortável ao corpo, ideal para unir estilo e performance.",

        tamanhos: ["P", "M", "G"],
        cores: ["Preto", "Rosa"],
        estoque: 8,
        destaque: "NOVO"
    },


    /* =====================================================
       MACAQUINHO
    ===================================================== */

    {
        id: 9,
        nome: "Macaquinho Fit Move",
        categoria: "macaquinho",
        preco: 139.90,

        imagem:
            "imagens/produtos/macaquinho-fit-move.jpg",

        descricao:
            "Macaquinho fitness confortável e versátil para treinos e produções esportivas.",

        tamanhos: ["P", "M", "G"],
        cores: ["Preto", "Rosa"],
        estoque: 7,
        destaque: "NOVO"
    },


    /* =====================================================
       BLUSA
    ===================================================== */

    {
        id: 10,
        nome: "Blusa Active",
        categoria: "blusa",
        preco: 89.90,

        imagem:
            "imagens/produtos/blusa-active.jpg",

        descricao:
            "Blusa leve e confortável para completar seu look fitness dentro e fora da academia.",

        tamanhos: ["P", "M", "G", "GG"],
        cores: ["Branco", "Preto", "Rosa"],
        estoque: 12,
        destaque: ""
    },


    /* =====================================================
       CASACO
    ===================================================== */

    {
        id: 11,
        nome: "Casaco Urban Fit",
        categoria: "casaco",
        preco: 179.90,

        imagem:
            "imagens/produtos/casaco-urban-fit.jpg",

        descricao:
            "Casaco confortável e moderno para acompanhar seus looks fitness nos dias mais frios.",

        tamanhos: ["P", "M", "G", "GG"],
        cores: ["Preto", "Rosa"],
        estoque: 6,
        destaque: "DESTAQUE"
    },


    /* =====================================================
       BOLSAS
    ===================================================== */

    {
        id: 12,
        nome: "Bolsa Sport DALEH",
        categoria: "bolsas",
        preco: 119.90,

        imagem:
            "imagens/produtos/bolsa-sport-daleh.jpg",

        descricao:
            "Bolsa esportiva prática e espaçosa para acompanhar sua rotina, academia e viagens.",

        tamanhos: ["Único"],
        cores: ["Preto", "Rosa"],
        estoque: 10,
        destaque: ""
    },


    /* =====================================================
       MEIAS
    ===================================================== */

    {
        id: 13,
        nome: "Meia Performance",
        categoria: "meias",
        preco: 29.90,

        imagem:
            "imagens/produtos/meia-performance.jpg",

        descricao:
            "Meia esportiva confortável para completar seu look e acompanhar seus treinos.",

        tamanhos: ["Único"],
        cores: ["Branco", "Preto"],
        estoque: 20,
        destaque: ""
    }

];


/* =========================================================
   FORMATAR PREÇO
========================================================= */

function formatarPreco(valor) {

    return Number(valor).toLocaleString(

        "pt-BR",

        {
            style: "currency",
            currency: "BRL"
        }

    );

}


/* =========================================================
   SEGURANÇA - ESCAPAR HTML
========================================================= */

function escaparHTML(valor) {

    return String(valor)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


/* =========================================================
   CRIAR CARD DO PRODUTO
========================================================= */

function criarProduto(produto) {

    if (!produto) {
        return "";
    }


    const idSeguro =
        Number(produto.id);


    const nomeSeguro =
        escaparHTML(
            produto.nome
        );


    const categoriaSegura =
        escaparHTML(
            produto.categoria
        );


    const imagemSegura =
        escaparHTML(
            produto.imagem
        );


    const destaqueSeguro =
        produto.destaque

            ? escaparHTML(
                produto.destaque
            )

            : "";


    const badge =
        destaqueSeguro

            ? `
                <span class="product-badge">

                    ${destaqueSeguro}

                </span>
            `

            : "";


    return `

        <article
            class="product-card"
            data-product-id="${idSeguro}"
            data-category="${categoriaSegura}"
        >


            <!-- =========================================
                 IMAGEM
            ========================================== -->

            <div
                class="product-image product-open"
                data-product="${idSeguro}"
            >

                ${badge}


                <button
                    class="product-favorite"
                    type="button"
                    aria-label="Favoritar ${nomeSeguro}"
                >

                    <i class="fa-regular fa-heart"></i>

                </button>


                <img
                    src="${imagemSegura}"
                    alt="${nomeSeguro}"
                    loading="lazy"
                >

            </div>


            <!-- =========================================
                 INFORMAÇÕES
            ========================================== -->

            <div class="product-info">

                <span class="product-category">

                    ${categoriaSegura}

                </span>


                <h3
                    class="product-name product-open"
                    data-product="${idSeguro}"
                >

                    ${nomeSeguro}

                </h3>


                <div class="product-price">

                    ${formatarPreco(
                        produto.preco
                    )}

                </div>


                <button
                    class="product-view product-open"
                    type="button"
                    data-product="${idSeguro}"
                    aria-label="Ver detalhes de ${nomeSeguro}"
                >

                    VER PRODUTO

                    <i class="fa-solid fa-arrow-right"></i>

                </button>

            </div>

        </article>

    `;

}


/* =========================================================
   MOSTRAR PRODUTOS
========================================================= */

function mostrarProdutos(
    lista = produtos
) {

    const grid =
        document.getElementById(
            "products-grid"
        );


    if (!grid) {
        return;
    }


    if (!Array.isArray(lista)) {

        grid.innerHTML = "";

        return;

    }


    grid.innerHTML =
        lista

            .map(
                criarProduto
            )

            .join("");

}


/* =========================================================
   FILTROS
========================================================= */

document.addEventListener(

    "click",

    function (event) {


        const filtro =
            event.target.closest(
                ".product-filter"
            );


        if (!filtro) {
            return;
        }


        document

            .querySelectorAll(
                ".product-filter"
            )

            .forEach(

                botao =>

                    botao.classList.remove(
                        "active"
                    )

            );


        filtro.classList.add(
            "active"
        );


        const categoria =
            filtro.dataset.filter;


        if (!categoria) {
            return;
        }


        if (categoria === "todos") {

            mostrarProdutos(
                produtos
            );

            return;

        }


        const produtosFiltrados =
            produtos.filter(

                produto =>
                    produto.categoria === categoria

            );


        mostrarProdutos(
            produtosFiltrados
        );

    }

);


/* =========================================================
   SELECIONAR TAMANHO
========================================================= */

document.addEventListener(

    "click",

    function (event) {


        const tamanho =
            event.target.closest(
                ".product-size"
            );


        if (!tamanho) {
            return;
        }


        const card =
            tamanho.closest(
                ".product-card"
            );


        if (!card) {
            return;
        }


        card

            .querySelectorAll(
                ".product-size"
            )

            .forEach(

                botao =>

                    botao.classList.remove(
                        "selected"
                    )

            );


        tamanho.classList.add(
            "selected"
        );

    }

);


/* =========================================================
   SELECIONAR COR
========================================================= */

document.addEventListener(

    "click",

    function (event) {


        const cor =
            event.target.closest(
                ".product-color"
            );


        if (!cor) {
            return;
        }


        const card =
            cor.closest(
                ".product-card"
            );


        if (!card) {
            return;
        }


        card

            .querySelectorAll(
                ".product-color"
            )

            .forEach(

                botao =>

                    botao.classList.remove(
                        "selected"
                    )

            );


        cor.classList.add(
            "selected"
        );

    }

);


/* =========================================================
   FAVORITOS
========================================================= */

document.addEventListener(

    "click",

    function (event) {


        const favorito =
            event.target.closest(
                ".product-favorite"
            );


        if (!favorito) {
            return;
        }


        /*
           Evita que clicar no coração
           também abra o modal.
        */

        event.stopPropagation();


        favorito.classList.toggle(
            "active"
        );


        const icon =
            favorito.querySelector(
                "i"
            );


        if (!icon) {
            return;
        }


        if (
            favorito.classList.contains(
                "active"
            )
        ) {

            icon.classList.remove(
                "fa-regular"
            );

            icon.classList.add(
                "fa-solid"
            );

        } else {

            icon.classList.remove(
                "fa-solid"
            );

            icon.classList.add(
                "fa-regular"
            );

        }

    }

);


/* =========================================================
   CARREGAR PRODUTOS
========================================================= */

const observarProdutos =
    new MutationObserver(

        () => {

            const grid =
                document.getElementById(
                    "products-grid"
                );


            if (grid) {

                mostrarProdutos();

                observarProdutos.disconnect();

            }

        }

    );


observarProdutos.observe(

    document.body,

    {
        childList: true,
        subtree: true
    }

);