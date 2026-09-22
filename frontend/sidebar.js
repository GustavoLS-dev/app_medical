/* =========================================
   CONFIGURAÇÃO DAS PÁGINAS
========================================= */

const MEDTECH_PAGES = {
    dashboard: "dashboard.html",
    medicamentos: "medicamentos.html",
    horarios: "horarios.html",
    estoque: "estoque.html",
    historico: "historico.html",
    dispensador: "dispensador.html"
};


/* =========================================
   CRIA A SIDEBAR
========================================= */

function createMedTechSidebar() {

    const sidebar = document.createElement("aside");

    sidebar.className = "medtech-sidebar";


    sidebar.innerHTML = `

        <div class="medtech-brand">

            <div class="medtech-brand-icon">
                +
            </div>

            <div class="medtech-brand-text">

                <div class="medtech-brand-name">
                    MedTech
                </div>

                <div class="medtech-brand-subtitle">
                    Seu tratamento, no horário certo.
                </div>

            </div>

        </div>


        <nav class="medtech-menu">

            <div
                class="medtech-selection"
                id="medtech-selection"
            ></div>


            <a
                class="medtech-menu-item"
                data-page="dashboard"
                href="${MEDTECH_PAGES.dashboard}"
            >
                <span class="medtech-menu-icon">▦</span>
                <span>Dashboard</span>
            </a>


            <a
                class="medtech-menu-item"
                data-page="medicamentos"
                href="${MEDTECH_PAGES.medicamentos}"
            >
                <span class="medtech-menu-icon">▣</span>
                <span>Medicamentos</span>
            </a>


            <a
                class="medtech-menu-item"
                data-page="horarios"
                href="${MEDTECH_PAGES.horarios}"
            >
                <span class="medtech-menu-icon">◷</span>
                <span>Horários</span>
            </a>


            <a
                class="medtech-menu-item"
                data-page="estoque"
                href="${MEDTECH_PAGES.estoque}"
            >
                <span class="medtech-menu-icon">▤</span>
                <span>Estoque</span>
            </a>


            <a
                class="medtech-menu-item"
                data-page="historico"
                href="${MEDTECH_PAGES.historico}"
            >
                <span class="medtech-menu-icon">↩</span>
                <span>Histórico</span>
            </a>


            <a
                class="medtech-menu-item"
                data-page="dispensador"
                href="${MEDTECH_PAGES.dispensador}"
            >
                <span class="medtech-menu-icon">♟</span>
                <span>Dispensador</span>
            </a>

        </nav>


        <div class="medtech-user">

            <div class="medtech-user-name">

                <span class="medtech-status"></span>

                João Silva (Paciente)

            </div>


            <div class="medtech-connection">
                Dispensador Conectado
            </div>

        </div>
    `;


    document.body.prepend(sidebar);
}


/* =========================================
   DESCOBRIR PÁGINA ATUAL
========================================= */

function getCurrentPage() {

    const file =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    for (const [page, filename] of Object.entries(MEDTECH_PAGES)) {

        if (file === filename.toLowerCase()) {
            return page;
        }

    }


    return "dashboard";
}


/* =========================================
   MOVER SELEÇÃO
========================================= */

function moveMedTechSelection(item) {

    const selection =
        document.getElementById(
            "medtech-selection"
        );


    if (!selection || !item) {
        return;
    }


    selection.style.transform =
        `translateY(${item.offsetTop}px)`;
}


/* =========================================
   CONFIGURAR MENU
========================================= */

function setupMedTechMenu() {

    const currentPage =
        getCurrentPage();


    const items =
        document.querySelectorAll(
            ".medtech-menu-item"
        );


    let activeItem = null;


    items.forEach(item => {

        const page =
            item.dataset.page;


        /*
         * Identifica a página atual.
         */

        if (page === currentPage) {

            item.classList.add("active");

            activeItem = item;

        }


        /*
         * Clique.
         *
         * O link continua sendo um link normal.
         * Portanto funciona mesmo se o JS falhar.
         */

        item.addEventListener(
            "click",
            function() {

                items.forEach(
                    otherItem => {

                        otherItem.classList.remove(
                            "active"
                        );

                    }
                );


                this.classList.add("active");

            }
        );

    });


    /*
     * Posiciona a seleção azul
     * depois que a sidebar foi criada.
     */

    requestAnimationFrame(() => {

        if (activeItem) {

            moveMedTechSelection(
                activeItem
            );

        }

    });


    /*
     * Recalcula se a janela mudar.
     */

    window.addEventListener(
        "resize",
        () => {

            const active =
                document.querySelector(
                    ".medtech-menu-item.active"
                );


            if (active) {

                moveMedTechSelection(
                    active
                );

            }

        }
    );
}


/* =========================================
   INICIAR
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        createMedTechSidebar();

        setupMedTechMenu();

    }
);
