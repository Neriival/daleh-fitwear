/* =========================================================
   DALEH FITWEAR
   CARREGAMENTO DOS COMPONENTES
========================================================= */


document.addEventListener(

    "DOMContentLoaded",

    async function () {


        /* =================================================
           COMPONENTES DO SITE
        ================================================= */

        const componentes = {

            header:
                "sections/header.html",

            hero:
                "sections/hero.html",

            campanha:
                "sections/campanha.html",

            categorias:
                "sections/categorias.html",

            produtos:
                "sections/produtos.html",

            sobre:
                "sections/sobre.html",

            instagram:
                "sections/instagram.html",

            contato:
                "sections/contato.html",

            "produto-modal":
                "sections/produto-modal.html",

            carrinho:
                "sections/carrinho.html",

            footer:
                "sections/footer.html"

        };


        /* =================================================
           CARREGAR COMPONENTES
        ================================================= */

        for (
            const [id, arquivo]
            of Object.entries(componentes)
        ) {

            const elemento =
                document.getElementById(id);


            /* ELEMENTO NÃO EXISTE */

            if (!elemento) {

                console.warn(
                    `Elemento #${id} não encontrado.`
                );

                continue;

            }


            try {

                const resposta =
                    await fetch(
                        arquivo
                    );


                /* ARQUIVO NÃO ENCONTRADO */

                if (!resposta.ok) {

                    throw new Error(

                        `Erro ${resposta.status}: não foi possível carregar ${arquivo}`

                    );

                }


                const html =
                    await resposta.text();


                /*
                   Estes arquivos HTML pertencem ao
                   próprio projeto DALEH FITWEAR.

                   Por isso usamos innerHTML para
                   montar os componentes.
                */

                elemento.innerHTML =
                    html;


            } catch (erro) {

                console.error(

                    `Erro ao carregar o componente "${id}":`,

                    erro

                );


                /* MENSAGEM VISÍVEL APENAS SE DER ERRO */

                elemento.innerHTML = `

                    <div
                        style="
                            padding: 20px;
                            text-align: center;
                            color: #b94f70;
                        "
                    >

                        Não foi possível carregar esta seção.

                    </div>

                `;

            }

        }

    }

);