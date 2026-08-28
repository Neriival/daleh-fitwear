/* =========================================================
   DALEH FITWEAR
   CARRINHO
========================================================= */


/* =========================================================
   CARRINHO SALVO
========================================================= */

let carrinho =
    JSON.parse(
        localStorage.getItem("dalehCarrinho")
    ) || [];


/* =========================================================
   SALVAR CARRINHO
========================================================= */

function salvarCarrinho() {

    localStorage.setItem(
        "dalehCarrinho",
        JSON.stringify(carrinho)
    );

}


/* =========================================================
   FORMATAR PREÇO
========================================================= */

function precoBR(valor) {

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

    return String(valor ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


/* =========================================================
   VERIFICAR TAMANHO ÚNICO
========================================================= */

function tamanhoEhUnico(tamanho) {

    const tamanhoNormalizado =
        String(tamanho ?? "")
            .trim()
            .toLowerCase()
            .normalize("NFD")
            .replace(
                /[\u0300-\u036f]/g,
                ""
            );

    return tamanhoNormalizado === "unico";

}


/* =========================================================
   ABRIR CARRINHO
========================================================= */

function abrirCarrinho() {

    const sidebar =
        document.getElementById("cart-sidebar");

    const overlay =
        document.getElementById("cart-overlay");


    if (!sidebar || !overlay) {
        return;
    }


    sidebar.classList.add("active");

    overlay.classList.add("active");

    document.body.style.overflow =
        "hidden";

}


/* =========================================================
   FECHAR CARRINHO
========================================================= */

function fecharCarrinho() {

    const sidebar =
        document.getElementById("cart-sidebar");

    const overlay =
        document.getElementById("cart-overlay");


    if (!sidebar || !overlay) {
        return;
    }


    sidebar.classList.remove("active");

    overlay.classList.remove("active");

    document.body.style.overflow =
        "";

}


/* =========================================================
   ADICIONAR PRODUTO
========================================================= */

function adicionarAoCarrinho(
    produto,
    tamanho,
    cor
) {

    if (!produto) {
        return;
    }


    const existente =
        carrinho.find(

            item =>

                item.id === produto.id &&

                item.tamanho === tamanho &&

                item.cor === cor

        );


    if (existente) {

        existente.quantidade++;

    } else {

        carrinho.push({

            id: produto.id,

            nome: produto.nome,

            preco: Number(produto.preco),

            imagem: produto.imagem,

            tamanho: tamanho,

            cor: cor,

            quantidade: 1

        });

    }


    salvarCarrinho();

    atualizarCarrinho();

    abrirCarrinho();

}


/* =========================================================
   RENDERIZAR CARRINHO
========================================================= */

function atualizarCarrinho() {

    const container =
        document.getElementById("cart-items");

    const vazio =
        document.getElementById("cart-empty");

    const footer =
        document.getElementById("cart-footer");


    if (!container || !vazio || !footer) {
        return;
    }


    /* =====================================================
       CARRINHO VAZIO
    ===================================================== */

    if (carrinho.length === 0) {

        container.innerHTML = "";

        container.style.display =
            "none";

        vazio.classList.add(
            "active"
        );

        footer.style.display =
            "none";


        atualizarContador();

        return;

    }


    /* =====================================================
       CARRINHO COM PRODUTOS
    ===================================================== */

    container.style.display =
        "block";

    vazio.classList.remove(
        "active"
    );

    footer.style.display =
        "block";


    container.innerHTML = carrinho

        .map(

            (item, index) => {

                const subtotal =
                    Number(item.preco) *
                    Number(item.quantidade);


                const nomeSeguro =
                    escaparHTML(item.nome);

                const imagemSegura =
                    escaparHTML(item.imagem);

                const corSegura =
                    escaparHTML(item.cor);

                const tamanhoSeguro =
                    escaparHTML(item.tamanho);


                /* =========================================
                   OPÇÕES VISÍVEIS DO PRODUTO
                ========================================= */

                let opcoesProduto =
                    `Cor: ${corSegura}`;


                /*
                   Se NÃO for tamanho único,
                   mostramos o tamanho normalmente.
                */

                if (
                    !tamanhoEhUnico(
                        item.tamanho
                    )
                ) {

                    opcoesProduto +=
                        ` &nbsp;|&nbsp; Tamanho: ${tamanhoSeguro}`;

                }


                return `

                    <article class="cart-item">

                        <div class="cart-item-image">

                            <img
                                src="${imagemSegura}"
                                alt="${nomeSeguro}"
                            >

                        </div>


                        <div class="cart-item-content">

                            <h3 class="cart-item-name">

                                ${nomeSeguro}

                            </h3>


                            <div class="cart-item-options">

                                ${opcoesProduto}

                            </div>


                            <span class="cart-item-price">

                                ${precoBR(subtotal)}

                            </span>


                            <div class="cart-quantity">

                                <button
                                    type="button"
                                    data-action="minus"
                                    data-index="${index}"
                                    aria-label="Diminuir quantidade"
                                >
                                    −
                                </button>


                                <span>

                                    ${Number(item.quantidade)}

                                </span>


                                <button
                                    type="button"
                                    data-action="plus"
                                    data-index="${index}"
                                    aria-label="Aumentar quantidade"
                                >
                                    +
                                </button>

                            </div>


                            <button
                                class="cart-remove"
                                type="button"
                                data-action="remove"
                                data-index="${index}"
                                aria-label="Remover produto"
                            >

                                <i class="fa-solid fa-trash"></i>

                            </button>

                        </div>

                    </article>

                `;

            }

        )

        .join("");


    calcularTotal();

    atualizarContador();

}


/* =========================================================
   TOTAL
========================================================= */

function calcularTotal() {

    const total =
        carrinho.reduce(

            (soma, item) =>

                soma +

                Number(item.preco) *
                Number(item.quantidade),

            0

        );


    const subtotalElement =
        document.getElementById(
            "cart-subtotal"
        );

    const totalElement =
        document.getElementById(
            "cart-total"
        );


    if (subtotalElement) {

        subtotalElement.textContent =
            precoBR(total);

    }


    if (totalElement) {

        totalElement.textContent =
            precoBR(total);

    }

}


/* =========================================================
   CONTADOR DO HEADER
========================================================= */

function atualizarContador() {

    const contador =
        document.querySelector(
            ".cart-count"
        );


    if (!contador) {
        return;
    }


    const quantidade =
        carrinho.reduce(

            (total, item) =>

                total +
                Number(item.quantidade),

            0

        );


    contador.textContent =
        quantidade;

}


/* =========================================================
   CLIQUES GERAIS
========================================================= */

document.addEventListener(

    "click",

    function (event) {


        /* =================================================
           BOTÃO DO HEADER
        ================================================= */

        const botaoHeader =
            event.target.closest(
                ".cart-button"
            );


        if (botaoHeader) {

            atualizarCarrinho();

            abrirCarrinho();

            return;

        }


        /* =================================================
           ADICIONAR PRODUTO DIRETAMENTE PELO CARD
        ================================================= */

        const botaoAdicionar =
            event.target.closest(
                ".product-button"
            );


        if (botaoAdicionar) {

            const card =
                botaoAdicionar.closest(
                    ".product-card"
                );


            if (!card) {
                return;
            }


            const id =
                Number(
                    botaoAdicionar.dataset.product
                );


            const produto =
                produtos.find(
                    item => item.id === id
                );


            if (!produto) {
                return;
            }


            const tamanhoSelecionado =
                card.querySelector(
                    ".product-size.selected"
                );


            const corSelecionada =
                card.querySelector(
                    ".product-color.selected"
                );


            /* =============================================
               VERIFICAR TAMANHO ÚNICO
            ============================================= */

            const tamanhosProduto =
                Array.isArray(produto.tamanhos)
                    ? produto.tamanhos
                    : [];


            const produtoTamanhoUnico =

                tamanhosProduto.length === 1 &&

                tamanhoEhUnico(
                    tamanhosProduto[0]
                );


            let tamanhoFinal;


            if (produtoTamanhoUnico) {

                tamanhoFinal =
                    "Único";

            } else {

                if (!tamanhoSelecionado) {

                    alert(
                        "Escolha um tamanho antes de adicionar ao carrinho."
                    );

                    return;

                }


                tamanhoFinal =
                    tamanhoSelecionado.dataset.size;

            }


            if (!corSelecionada) {

                alert(
                    "Escolha uma cor antes de adicionar ao carrinho."
                );

                return;

            }


            adicionarAoCarrinho(

                produto,

                tamanhoFinal,

                corSelecionada.dataset.color

            );


            return;

        }


        /* =================================================
           FECHAR CARRINHO
        ================================================= */

        if (
            event.target.closest(
                "#cart-close"
            ) ||

            event.target.closest(
                "#cart-overlay"
            )
        ) {

            fecharCarrinho();

            return;

        }


        /* =================================================
           CONTINUAR COMPRANDO
        ================================================= */

        if (
            event.target.closest(
                "#cart-continue"
            )
        ) {

            fecharCarrinho();


            document

                .getElementById(
                    "produtos"
                )

                ?.scrollIntoView({

                    behavior:
                        "smooth"

                });


            return;

        }


        /* =================================================
           QUANTIDADE / REMOVER
        ================================================= */

        const controle =
            event.target.closest(
                "[data-action]"
            );


        if (controle) {

            const index =
                Number(
                    controle.dataset.index
                );


            const action =
                controle.dataset.action;


            if (
                !Number.isInteger(index) ||
                !carrinho[index]
            ) {

                return;

            }


            /* =============================================
               AUMENTAR
            ============================================= */

            if (action === "plus") {

                carrinho[index].quantidade =
                    Number(
                        carrinho[index].quantidade
                    ) + 1;

            }


            /* =============================================
               DIMINUIR
            ============================================= */

            if (action === "minus") {

                carrinho[index].quantidade =
                    Number(
                        carrinho[index].quantidade
                    ) - 1;


                if (
                    carrinho[index].quantidade <= 0
                ) {

                    carrinho.splice(
                        index,
                        1
                    );

                }

            }


            /* =============================================
               REMOVER
            ============================================= */

            if (action === "remove") {

                carrinho.splice(
                    index,
                    1
                );

            }


            salvarCarrinho();

            atualizarCarrinho();

            return;

        }

    }

);


/* =========================================================
   WHATSAPP
========================================================= */

document.addEventListener(

    "click",

    function (event) {


        if (
            !event.target.closest(
                "#checkout-whatsapp"
            )
        ) {

            return;

        }


        if (carrinho.length === 0) {

            alert(
                "Seu carrinho está vazio."
            );

            return;

        }


        finalizarWhatsApp();

    }

);


/* =========================================================
   FINALIZAR PELO WHATSAPP
========================================================= */

function finalizarWhatsApp() {

    /*
       NÚMERO DA LOJA

       Formato:
       55 + DDD + número
    */

    const telefone =
        "5513991258303";


    let mensagem =
        "Olá! Gostaria de fazer um pedido na DALEH FITWEAR.\n\n";


    carrinho.forEach(

        (item, index) => {


            const subtotal =
                Number(item.preco) *
                Number(item.quantidade);


            /* =============================================
               PRODUTO
            ============================================= */

            mensagem +=
                `*${index + 1}. ${item.nome}*\n`;


            /* =============================================
               COR
            ============================================= */

            mensagem +=
                `Cor: ${item.cor}\n`;


            /* =============================================
               TAMANHO

               Só aparece se NÃO for tamanho único.
            ============================================= */

            if (
                !tamanhoEhUnico(
                    item.tamanho
                )
            ) {

                mensagem +=
                    `Tamanho: ${item.tamanho}\n`;

            }


            /* =============================================
               QUANTIDADE
            ============================================= */

            mensagem +=
                `Quantidade: ${item.quantidade}\n`;


            /* =============================================
               VALOR
            ============================================= */

            mensagem +=
                `Valor: ${precoBR(subtotal)}\n\n`;

        }

    );


    /* =====================================================
       TOTAL
    ===================================================== */

    const total =
        carrinho.reduce(

            (soma, item) =>

                soma +

                Number(item.preco) *
                Number(item.quantidade),

            0

        );


    mensagem +=
        `*TOTAL: ${precoBR(total)}*\n\n`;


    mensagem +=
        "Gostaria de informações sobre pagamento e entrega.";


    /* =====================================================
       CODIFICAR MENSAGEM
    ===================================================== */

    const mensagemCodificada =
        encodeURIComponent(
            mensagem
        );


    /* =====================================================
       LINK WHATSAPP
    ===================================================== */

    const url =
        `https://wa.me/${telefone}?text=${mensagemCodificada}`;


    window.open(
        url,
        "_blank",
        "noopener,noreferrer"
    );

}


/* =========================================================
   CARREGAR DADOS SALVOS
========================================================= */

window.addEventListener(

    "load",

    function () {

        setTimeout(

            () => {

                atualizarCarrinho();

                atualizarContador();

            },

            500

        );

    }

);