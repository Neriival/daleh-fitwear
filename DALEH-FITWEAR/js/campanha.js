/* =========================================================
   DALEH FITWEAR
   CAMPANHAS
========================================================= */


/* =========================================================
   CONFIGURAÇÃO

   É PRINCIPALMENTE AQUI QUE VOCÊ VAI MEXER.
========================================================= */

const configuracaoCampanhas = {

    ativa: true,

    trocaAutomatica: true,

    intervalo:
        5000,


    campanhas: [

        {
            imagem:
                "imagens/campanhas/promocao-daleh.png",

            link:
                "#produtos",

            alt:
                "Promoção especial DALEH FITWEAR"
        },

        /*
        {
            imagem:
                "imagens/campanhas/promocao-02.png",

            link:
                "#produtos",

            alt:
                "Novidades DALEH FITWEAR"
        },


        {
            imagem:
                "imagens/campanhas/promocao-03.png",

            link:
                "#produtos",

            alt:
                "Coleção especial DALEH FITWEAR"
        }
        */
    ]

};


/* =========================================================
   VARIÁVEIS
========================================================= */

let campanhaAtualIndex =
    0;


let intervaloCampanha =
    null;


/* =========================================================
   PEGAR CAMPANHAS VÁLIDAS
========================================================= */

function obterCampanhasValidas() {

    if (
        !Array.isArray(
            configuracaoCampanhas.campanhas
        )
    ) {

        return [];

    }


    return configuracaoCampanhas.campanhas.filter(

        campanha =>
            campanha &&
            campanha.imagem

    );

}


/* =========================================================
   MOSTRAR CAMPANHA
========================================================= */

function mostrarCampanha(index) {

    const campanhas =
        obterCampanhasValidas();


    if (!campanhas.length) {

        return;

    }


    if (index < 0) {

        index =
            campanhas.length - 1;

    }


    if (
        index >= campanhas.length
    ) {

        index =
            0;

    }


    campanhaAtualIndex =
        index;


    const campanha =
        campanhas[
            campanhaAtualIndex
        ];


    const imagem =
        document.getElementById(
            "campaign-image"
        );


    const link =
        document.getElementById(
            "campaign-link"
        );


    if (imagem) {

        imagem.style.opacity =
            "0";


        setTimeout(

            () => {

                imagem.src =
                    campanha.imagem;


                imagem.alt =
                    campanha.alt ||
                    "Campanha DALEH FITWEAR";


                imagem.style.opacity =
                    "1";

            },

            120

        );

    }


    if (link) {

        link.href =
            campanha.link ||
            "#produtos";

    }


    atualizarBolinhas();

}


/* =========================================================
   CRIAR BOLINHAS
========================================================= */

function criarBolinhas() {

    const container =
        document.getElementById(
            "campaign-dots"
        );


    if (!container) {

        return;

    }


    const campanhas =
        obterCampanhasValidas();


    container.innerHTML =
        "";


    campanhas.forEach(

        (_, index) => {

            const botao =
                document.createElement(
                    "button"
                );


            botao.type =
                "button";


            botao.className =
                "campaign-dot";


            botao.setAttribute(
                "aria-label",
                `Ver campanha ${index + 1}`
            );


            botao.addEventListener(

                "click",

                function () {

                    mostrarCampanha(
                        index
                    );


                    reiniciarTrocaAutomatica();

                }

            );


            container.appendChild(
                botao
            );

        }

    );


    atualizarBolinhas();

}


/* =========================================================
   ATUALIZAR BOLINHAS
========================================================= */

function atualizarBolinhas() {

    document

        .querySelectorAll(
            ".campaign-dot"
        )

        .forEach(

            (dot, index) => {

                dot.classList.toggle(

                    "active",

                    index ===
                    campanhaAtualIndex

                );

            }

        );

}


/* =========================================================
   PRÓXIMA
========================================================= */

function proximaCampanha() {

    mostrarCampanha(
        campanhaAtualIndex + 1
    );

}


/* =========================================================
   ANTERIOR
========================================================= */

function campanhaAnterior() {

    mostrarCampanha(
        campanhaAtualIndex - 1
    );

}


/* =========================================================
   TROCA AUTOMÁTICA
========================================================= */

function iniciarTrocaAutomatica() {

    const campanhas =
        obterCampanhasValidas();


    if (
        !configuracaoCampanhas
            .trocaAutomatica ||

        campanhas.length <= 1

    ) {

        return;

    }


    pararTrocaAutomatica();


    intervaloCampanha =
        setInterval(

            proximaCampanha,

            Number(
                configuracaoCampanhas
                    .intervalo
            ) || 5000

        );

}


/* =========================================================
   PARAR TROCA
========================================================= */

function pararTrocaAutomatica() {

    if (
        intervaloCampanha
    ) {

        clearInterval(
            intervaloCampanha
        );


        intervaloCampanha =
            null;

    }

}


/* =========================================================
   REINICIAR TROCA
========================================================= */

function reiniciarTrocaAutomatica() {

    pararTrocaAutomatica();

    iniciarTrocaAutomatica();

}


/* =========================================================
   CONFIGURAR SETAS
========================================================= */

function configurarSetasCampanha() {

    const anterior =
        document.getElementById(
            "campaign-prev"
        );


    const proximo =
        document.getElementById(
            "campaign-next"
        );


    const campanhas =
        obterCampanhasValidas();


    if (
        campanhas.length <= 1
    ) {

        if (anterior) {

            anterior.style.display =
                "none";

        }


        if (proximo) {

            proximo.style.display =
                "none";

        }


        return;

    }


    if (anterior) {

        anterior.style.display =
            "";


        anterior.addEventListener(

            "click",

            function () {

                campanhaAnterior();

                reiniciarTrocaAutomatica();

            }

        );

    }


    if (proximo) {

        proximo.style.display =
            "";


        proximo.addEventListener(

            "click",

            function () {

                proximaCampanha();

                reiniciarTrocaAutomatica();

            }

        );

    }

}


/* =========================================================
   INICIAR
========================================================= */

function iniciarCampanhas() {

    const secao =
        document.getElementById(
            "campaign-section"
        );


    const imagem =
        document.getElementById(
            "campaign-image"
        );


    if (
        !secao ||
        !imagem
    ) {

        return false;

    }


    const campanhas =
        obterCampanhasValidas();


    /* =====================================================
       DESATIVADO
    ===================================================== */

    if (
        !configuracaoCampanhas.ativa ||
        campanhas.length === 0
    ) {

        secao.style.display =
            "none";


        return true;

    }


    secao.style.display =
        "";


    mostrarCampanha(
        0
    );


    criarBolinhas();


    configurarSetasCampanha();


    iniciarTrocaAutomatica();


    return true;

}


/* =========================================================
   ESPERAR COMPONENTE SER CARREGADO
========================================================= */

document.addEventListener(

    "DOMContentLoaded",

    function () {

        if (
            iniciarCampanhas()
        ) {

            return;

        }


        const observador =
            new MutationObserver(

                () => {

                    if (
                        iniciarCampanhas()
                    ) {

                        observador.disconnect();

                    }

                }

            );


        observador.observe(

            document.body,

            {
                childList: true,
                subtree: true
            }

        );

    }

);