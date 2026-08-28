/* =========================================================
   DALEH FITWEAR
   PRODUTO MODAL
========================================================= */


/* =========================================================
   VARIÁVEIS
========================================================= */

let produtoModalAtual = null;

let quantidadeModal = 1;

let imagemModalAtual = 0;


/* =========================================================
   NOMES DAS CATEGORIAS
========================================================= */

const nomesCategoriasModal = {

    conjuntos: "CONJUNTOS",

    tops: "TOPS",

    calcas: "CALÇAS",

    shorts: "SHORTS",

    macacao: "MACACÃO",

    macaquinho: "MACAQUINHO",

    blusa: "BLUSA",

    casaco: "CASACO",

    bolsas: "BOLSAS",

    meias: "MEIAS"

};


/* =========================================================
   NORMALIZAR TEXTO
========================================================= */

function normalizarTextoModal(valor) {

    return String(valor ?? "")
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(
            /[\u0300-\u036f]/g,
            ""
        );

}


/* =========================================================
   VERIFICAR TAMANHO ÚNICO
========================================================= */

function produtoTemTamanhoUnico(produto) {

    if (
        !produto ||
        !Array.isArray(produto.tamanhos) ||
        produto.tamanhos.length !== 1
    ) {

        return false;

    }


    const tamanho =
        normalizarTextoModal(
            produto.tamanhos[0]
        );


    return tamanho === "unico";

}


/* =========================================================
   ABRIR MODAL
========================================================= */

function abrirProdutoModal(id) {

    const produto =
        produtos.find(

            item =>
                item.id === Number(id)

        );


    if (!produto) {

        console.warn(
            "Produto não encontrado:",
            id
        );

        return;

    }


    produtoModalAtual =
        produto;

    quantidadeModal =
        1;

    imagemModalAtual =
        0;


    const modal =
        document.getElementById(
            "product-modal"
        );


    const overlay =
        document.getElementById(
            "product-modal-overlay"
        );


    if (!modal || !overlay) {

        console.warn(
            "Modal ainda não foi carregado."
        );

        return;

    }


    /* =====================================================
       GALERIA DE IMAGENS
    ===================================================== */

    const imagensProduto =

        Array.isArray(
            produto.imagens
        ) &&

        produto.imagens.length > 0

            ? produto.imagens

            : [produto.imagem];


    const imagemPrincipal =
        document.getElementById(
            "modal-product-image"
        );


    if (imagemPrincipal) {

        imagemPrincipal.src =
            imagensProduto[0] || "";

        imagemPrincipal.alt =
            produto.nome || "";

    }


    /* =====================================================
       FUNDO DESFOCADO
    ===================================================== */

    const fundoImagem =
        document.getElementById(
            "modal-product-image-bg"
        );


    if (fundoImagem) {

        fundoImagem.style.backgroundImage =

            imagensProduto[0]

                ? `url("${imagensProduto[0]}")`

                : "none";

    }


    /* =====================================================
       MINIATURAS
    ===================================================== */

    const thumbnails =
        document.getElementById(
            "modal-product-thumbnails"
        );


    if (thumbnails) {

        thumbnails.innerHTML =

            imagensProduto

                .map(

                    (imagem, index) => {

                        const imagemSegura =
                            escaparHTML(
                                imagem
                            );


                        const nomeSeguro =
                            escaparHTML(
                                produto.nome
                            );


                        return `

                            <button
                                class="product-thumbnail ${index === 0 ? "active" : ""}"
                                type="button"
                                data-image-index="${index}"
                                aria-label="Ver foto ${index + 1} de ${nomeSeguro}"
                            >

                                <img
                                    src="${imagemSegura}"
                                    alt="${nomeSeguro} - foto ${index + 1}"
                                    loading="lazy"
                                >

                            </button>

                        `;

                    }

                )

                .join("");

    }


    /* =====================================================
       CATEGORIA
    ===================================================== */

    const categoria =
        document.getElementById(
            "modal-product-category"
        );


    if (categoria) {

        categoria.textContent =

            nomesCategoriasModal[
                produto.categoria
            ] ||

            String(
                produto.categoria || ""
            ).toUpperCase();

    }


    /* =====================================================
       NOME
    ===================================================== */

    const nome =
        document.getElementById(
            "modal-product-name"
        );


    if (nome) {

        nome.textContent =
            produto.nome;

    }


    /* =====================================================
       PREÇO
    ===================================================== */

    const preco =
        document.getElementById(
            "modal-product-price"
        );


    if (preco) {

        preco.textContent =
            formatarPreco(
                produto.preco
            );

    }


    /* =====================================================
       DESCRIÇÃO
    ===================================================== */

    const descricao =
        document.getElementById(
            "modal-product-description"
        );


    if (descricao) {

        descricao.textContent =

            produto.descricao ||

            "Moda fitness DALEH FITWEAR.";

    }


    /* =====================================================
       ESTOQUE
    ===================================================== */

    const estoque =
        document.getElementById(
            "modal-product-stock"
        );


    if (estoque) {

        const estoqueProduto =
            Number(
                produto.estoque
            );


        estoque.textContent =

            estoqueProduto > 0

                ? `${estoqueProduto} unidades disponíveis`

                : "Produto esgotado";

    }


    /* =====================================================
       QUANTIDADE
    ===================================================== */

    quantidadeModal =
        1;


    atualizarQuantidadeModal();


    /* =====================================================
       TAMANHOS
    ===================================================== */

    configurarTamanhosModal(
        produto
    );


    /* =====================================================
       CORES
    ===================================================== */

    configurarCoresModal(
        produto
    );


    /* =====================================================
       BOTÃO
    ===================================================== */

    configurarBotaoAdicionar(
        produto
    );


    /* =====================================================
       ABRIR MODAL
    ===================================================== */

    modal.classList.add(
        "active"
    );


    overlay.classList.add(
        "active"
    );


    document.body.style.overflow =
        "hidden";

}


/* =========================================================
   CONFIGURAR TAMANHOS
========================================================= */

function configurarTamanhosModal(produto) {

    const tamanhosContainer =
        document.getElementById(
            "modal-product-sizes"
        );


    if (!tamanhosContainer) {
        return;
    }


    /*
       No seu HTML, o container fica dentro de:

       <div class="product-modal-option">

       Então conseguimos esconder TAMANHO + BOTÕES
       de uma vez.
    */

    const grupoTamanho =
        tamanhosContainer.closest(
            ".product-modal-option"
        );


    const tamanhos =

        Array.isArray(
            produto.tamanhos
        )

            ? produto.tamanhos

            : [];


    /* =====================================================
       TAMANHO ÚNICO
    ===================================================== */

    if (
        produtoTemTamanhoUnico(
            produto
        )
    ) {

        tamanhosContainer.innerHTML =
            "";


        if (grupoTamanho) {

            grupoTamanho.style.display =
                "none";

        }


        return;

    }


    /* =====================================================
       PRODUTO COM TAMANHOS
    ===================================================== */

    if (grupoTamanho) {

        grupoTamanho.style.display =
            "";

    }


    tamanhosContainer.innerHTML =

        tamanhos

            .map(

                tamanho => {

                    const tamanhoSeguro =
                        escaparHTML(
                            tamanho
                        );


                    return `

                        <button
                            class="modal-size"
                            type="button"
                            data-size="${tamanhoSeguro}"
                        >

                            ${tamanhoSeguro}

                        </button>

                    `;

                }

            )

            .join("");

}


/* =========================================================
   CONFIGURAR CORES
========================================================= */

function configurarCoresModal(produto) {

    const coresContainer =
        document.getElementById(
            "modal-product-colors"
        );


    if (!coresContainer) {
        return;
    }


    const cores =

        Array.isArray(
            produto.cores
        )

            ? produto.cores

            : [];


    coresContainer.innerHTML =

        cores

            .map(

                cor => {

                    const corSegura =
                        escaparHTML(
                            cor
                        );


                    return `

                        <button
                            class="modal-color"
                            type="button"
                            data-color="${corSegura}"
                        >

                            ${corSegura}

                        </button>

                    `;

                }

            )

            .join("");

}


/* =========================================================
   CONFIGURAR BOTÃO
========================================================= */

function configurarBotaoAdicionar(produto) {

    const botaoAdicionar =
        document.getElementById(
            "modal-add-cart"
        );


    if (!botaoAdicionar) {
        return;
    }


    const esgotado =
        Number(
            produto.estoque
        ) <= 0;


    botaoAdicionar.disabled =
        esgotado;


    if (esgotado) {

        botaoAdicionar.innerHTML =
            "PRODUTO ESGOTADO";

        return;

    }


    botaoAdicionar.innerHTML = `

        <i class="fa-solid fa-bag-shopping"></i>

        ADICIONAR AO CARRINHO

    `;

}


/* =========================================================
   OBTER TAMANHO PARA O CARRINHO
========================================================= */

function obterTamanhoModal() {

    if (!produtoModalAtual) {

        return null;

    }


    /* =====================================================
       TAMANHO ÚNICO
    ===================================================== */

    if (
        produtoTemTamanhoUnico(
            produtoModalAtual
        )
    ) {

        return "Único";

    }


    /* =====================================================
       TAMANHOS NORMAIS
    ===================================================== */

    const selecionado =
        document.querySelector(
            ".modal-size.selected"
        );


    if (!selecionado) {

        return null;

    }


    return selecionado.dataset.size;

}


/* =========================================================
   TROCAR IMAGEM
========================================================= */

function trocarImagemModal(index) {

    if (!produtoModalAtual) {
        return;
    }


    const imagens =

        Array.isArray(
            produtoModalAtual.imagens
        ) &&

        produtoModalAtual.imagens.length > 0

            ? produtoModalAtual.imagens

            : [
                produtoModalAtual.imagem
            ];


    if (!imagens.length) {
        return;
    }


    /* VOLTA PARA ÚLTIMA */

    if (index < 0) {

        index =
            imagens.length - 1;

    }


    /* VOLTA PARA PRIMEIRA */

    if (
        index >= imagens.length
    ) {

        index =
            0;

    }


    imagemModalAtual =
        index;


    /* FOTO PRINCIPAL */

    const imagemPrincipal =
        document.getElementById(
            "modal-product-image"
        );


    if (imagemPrincipal) {

        imagemPrincipal.src =
            imagens[index];


        imagemPrincipal.alt =

            `${produtoModalAtual.nome} - foto ${index + 1}`;

    }


    /* FUNDO */

    const fundoImagem =
        document.getElementById(
            "modal-product-image-bg"
        );


    if (fundoImagem) {

        fundoImagem.style.backgroundImage =
            `url("${imagens[index]}")`;

    }


    /* MINIATURAS */

    document

        .querySelectorAll(
            ".product-thumbnail"
        )

        .forEach(

            (thumbnail, i) => {

                thumbnail.classList.toggle(

                    "active",

                    i === index

                );

            }

        );

}


/* =========================================================
   FECHAR MODAL
========================================================= */

function fecharProdutoModal() {

    const modal =
        document.getElementById(
            "product-modal"
        );


    const overlay =
        document.getElementById(
            "product-modal-overlay"
        );


    if (modal) {

        modal.classList.remove(
            "active"
        );

    }


    if (overlay) {

        overlay.classList.remove(
            "active"
        );

    }


    document.body.style.overflow =
        "";


    produtoModalAtual =
        null;


    quantidadeModal =
        1;


    imagemModalAtual =
        0;

}


/* =========================================================
   ATUALIZAR QUANTIDADE
========================================================= */

function atualizarQuantidadeModal() {

    const quantidade =
        document.getElementById(
            "modal-quantity"
        );


    if (!quantidade) {
        return;
    }


    quantidade.textContent =
        quantidadeModal;

}


/* =========================================================
   CLIQUES
========================================================= */

document.addEventListener(

    "click",

    function (event) {


        /* =================================================
           ABRIR PRODUTO
        ================================================= */

        const abrirProduto =
            event.target.closest(
                ".product-open"
            );


        if (abrirProduto) {

            const id =
                Number(
                    abrirProduto.dataset.product
                );


            if (
                !Number.isInteger(id)
            ) {

                return;

            }


            abrirProdutoModal(
                id
            );


            return;

        }


        /* =================================================
           FECHAR
        ================================================= */

        if (

            event.target.closest(
                "#product-modal-close"
            ) ||

            event.target.closest(
                "#product-modal-overlay"
            )

        ) {

            fecharProdutoModal();

            return;

        }


        /* =================================================
           MINIATURA
        ================================================= */

        const thumbnail =
            event.target.closest(
                ".product-thumbnail"
            );


        if (thumbnail) {

            const index =
                Number(
                    thumbnail.dataset.imageIndex
                );


            if (
                Number.isInteger(index)
            ) {

                trocarImagemModal(
                    index
                );

            }


            return;

        }


        /* =================================================
           FOTO ANTERIOR
        ================================================= */

        if (

            event.target.closest(
                "#gallery-prev"
            )

        ) {

            trocarImagemModal(
                imagemModalAtual - 1
            );


            return;

        }


        /* =================================================
           PRÓXIMA FOTO
        ================================================= */

        if (

            event.target.closest(
                "#gallery-next"
            )

        ) {

            trocarImagemModal(
                imagemModalAtual + 1
            );


            return;

        }


        /* =================================================
           TAMANHO
        ================================================= */

        const tamanho =
            event.target.closest(
                ".modal-size"
            );


        if (tamanho) {

            document

                .querySelectorAll(
                    ".modal-size"
                )

                .forEach(

                    item =>

                        item.classList.remove(
                            "selected"
                        )

                );


            tamanho.classList.add(
                "selected"
            );


            return;

        }


        /* =================================================
           COR
        ================================================= */

        const cor =
            event.target.closest(
                ".modal-color"
            );


        if (cor) {

            document

                .querySelectorAll(
                    ".modal-color"
                )

                .forEach(

                    item =>

                        item.classList.remove(
                            "selected"
                        )

                );


            cor.classList.add(
                "selected"
            );


            return;

        }


        /* =================================================
           DIMINUIR QUANTIDADE
        ================================================= */

        if (

            event.target.closest(
                "#modal-quantity-minus"
            )

        ) {

            if (
                quantidadeModal > 1
            ) {

                quantidadeModal--;

            }


            atualizarQuantidadeModal();


            return;

        }


        /* =================================================
           AUMENTAR QUANTIDADE
        ================================================= */

        if (

            event.target.closest(
                "#modal-quantity-plus"
            )

        ) {

            if (

                produtoModalAtual &&

                quantidadeModal <
                Number(
                    produtoModalAtual.estoque
                )

            ) {

                quantidadeModal++;

            }


            atualizarQuantidadeModal();


            return;

        }


        /* =================================================
           ADICIONAR AO CARRINHO
        ================================================= */

        if (

            event.target.closest(
                "#modal-add-cart"
            )

        ) {

            if (!produtoModalAtual) {

                return;

            }


            /* ESTOQUE */

            if (

                Number(
                    produtoModalAtual.estoque
                ) <= 0

            ) {

                alert(
                    "Este produto está esgotado."
                );


                return;

            }


            /* =================================================
               TAMANHO
            ================================================= */

            const tamanhoFinal =
                obterTamanhoModal();


            if (!tamanhoFinal) {

                alert(
                    "Escolha um tamanho."
                );


                return;

            }


            /* =================================================
               COR
            ================================================= */

            const corSelecionada =
                document.querySelector(
                    ".modal-color.selected"
                );


            if (!corSelecionada) {

                alert(
                    "Escolha uma cor."
                );


                return;

            }


            /* =================================================
               ADICIONAR A QUANTIDADE ESCOLHIDA
            ================================================= */

            for (
                let i = 0;
                i < quantidadeModal;
                i++
            ) {

                adicionarAoCarrinho(

                    produtoModalAtual,

                    tamanhoFinal,

                    corSelecionada.dataset.color

                );

            }


            fecharProdutoModal();


            return;

        }

    }

);


/* =========================================================
   TECLA ESC
========================================================= */

document.addEventListener(

    "keydown",

    function (event) {

        if (
            event.key === "Escape"
        ) {

            fecharProdutoModal();

        }

    }

);