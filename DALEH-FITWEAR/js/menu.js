/* =========================================================
   DALEH FITWEAR
   MENU MOBILE
========================================================= */


/* =========================================================
   FUNÇÃO - FECHAR MENU
========================================================= */

function fecharMenuMobile() {

    const mainNav =
        document.getElementById(
            "main-nav"
        );

    const menuButton =
        document.getElementById(
            "menu-toggle"
        );


    if (!mainNav || !menuButton) {
        return;
    }


    /* FECHAR MENU */

    mainNav.classList.remove(
        "active"
    );


    /* ACESSIBILIDADE */

    menuButton.setAttribute(
        "aria-expanded",
        "false"
    );


    /* ÍCONE */

    const icon =
        menuButton.querySelector(
            "i"
        );


    if (icon) {

        icon.classList.remove(
            "fa-xmark"
        );

        icon.classList.add(
            "fa-bars"
        );

    }

}


/* =========================================================
   CLIQUES
========================================================= */

document.addEventListener(

    "click",

    function (event) {


        /* =================================================
           BOTÃO DO MENU
        ================================================= */

        const menuButton =
            event.target.closest(
                "#menu-toggle"
            );


        if (menuButton) {

            const mainNav =
                document.getElementById(
                    "main-nav"
                );


            if (!mainNav) {
                return;
            }


            /* ABRIR / FECHAR */

            mainNav.classList.toggle(
                "active"
            );


            const menuAberto =
                mainNav.classList.contains(
                    "active"
                );


            /* ACESSIBILIDADE */

            menuButton.setAttribute(
                "aria-expanded",
                String(menuAberto)
            );


            /* TROCAR ÍCONE */

            const icon =
                menuButton.querySelector(
                    "i"
                );


            if (icon) {

                if (menuAberto) {

                    icon.classList.remove(
                        "fa-bars"
                    );

                    icon.classList.add(
                        "fa-xmark"
                    );

                } else {

                    icon.classList.remove(
                        "fa-xmark"
                    );

                    icon.classList.add(
                        "fa-bars"
                    );

                }

            }


            return;

        }


        /* =================================================
           LINK DO MENU
        ================================================= */

        const navLink =
            event.target.closest(
                "#main-nav a"
            );


        if (navLink) {

            fecharMenuMobile();

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

            fecharMenuMobile();

        }

    }

);