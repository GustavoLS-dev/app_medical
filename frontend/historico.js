/* =========================================================
   HISTÓRICO
   JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTOS
    ====================================================== */

    const table = document.getElementById("historyTable");

    const rows = table
        ? Array.from(table.querySelectorAll("tr"))
        : [];

    const filterLinks = document.querySelectorAll(".filter-btn");

    const pageLinks = document.querySelectorAll(".page-number");

    const resultStart = document.querySelector(".results strong:nth-of-type(1)");

    const resultEnd = document.querySelector(".results strong:nth-of-type(2)");

    const resultTotal = document.querySelector(".results strong:nth-of-type(3)");

    const streakClose = document.querySelector(".streak-close");


    /* =====================================================
       URL
    ====================================================== */

    const urlParams = new URLSearchParams(window.location.search);

    const currentStatus =
        urlParams.get("status") || "todos";

    const currentPage =
        parseInt(urlParams.get("page") || "1", 10);


    /* =====================================================
       DADOS
    ====================================================== */

    const totalDoses = 50;

    const dosesPerPage = 5;


    /* =====================================================
       FILTRO ATUAL
    ====================================================== */

    function normalizeStatus(status) {

        if (!status) {
            return "todos";
        }

        if (status === "falha") {
            return "esquecido";
        }

        return status;
    }


    const normalizedStatus =
        normalizeStatus(currentStatus);


    /* =====================================================
       ATIVA O FILTRO DA URL
    ====================================================== */

    function updateActiveFilter() {

        filterLinks.forEach(link => {

            const href =
                link.getAttribute("href") || "";

            const linkUrl =
                new URL(href, window.location.href);

            const linkStatus =
                normalizeStatus(
                    linkUrl.searchParams.get("status")
                );

            link.classList.remove("active");

            if (
                linkStatus === normalizedStatus
            ) {
                link.classList.add("active");
            }

        });

    }


    /* =====================================================
       FILTRA AS LINHAS
    ====================================================== */

    function filterTable() {

        let visibleRows = [];

        rows.forEach(row => {

            const rowStatus =
                row.dataset.status;

            if (
                normalizedStatus === "todos" ||
                rowStatus === normalizedStatus
            ) {

                row.style.display = "";

                visibleRows.push(row);

            } else {

                row.style.display = "none";

            }

        });

        return visibleRows;

    }


    /* =====================================================
       PAGINAÇÃO
    ====================================================== */

    function updatePagination() {

        pageLinks.forEach(link => {

            const href =
                link.getAttribute("href") || "";

            const linkUrl =
                new URL(href, window.location.href);

            const linkPage =
                parseInt(
                    linkUrl.searchParams.get("page") || "1",
                    10
                );

            link.classList.remove("active-page");

            if (linkPage === currentPage) {

                link.classList.add("active-page");

            }

        });

    }


    /* =====================================================
       ATUALIZA CONTADOR
    ====================================================== */

    function updateCounter(visibleRows) {

        /*
         * Se nenhum registro for encontrado.
         */

        if (visibleRows.length === 0) {

            if (resultStart) {
                resultStart.textContent = "0";
            }

            if (resultEnd) {
                resultEnd.textContent = "0";
            }

            if (resultTotal) {
                resultTotal.textContent = "0";
            }

            return;
        }


        /*
         * Como essa página possui 5 registros
         * demonstrativos, calculamos o intervalo.
         */

        const start =
            ((currentPage - 1) * dosesPerPage) + 1;

        const end =
            Math.min(
                start + visibleRows.length - 1,
                totalDoses
            );


        if (resultStart) {
            resultStart.textContent = start;
        }


        if (resultEnd) {
            resultEnd.textContent = end;
        }


        if (resultTotal) {
            resultTotal.textContent = totalDoses;
        }

    }


    /* =====================================================
       FECHAR CARD DE SEQUÊNCIA
    ====================================================== */

    if (streakClose) {

        streakClose.addEventListener("click", event => {

            event.preventDefault();

            const streakCard =
                document.querySelector(".streak-card");

            if (streakCard) {

                streakCard.style.display = "none";

            }

        });

    }


    /* =====================================================
       HOVER NOS FILTROS
    ====================================================== */

    filterLinks.forEach(link => {

        link.addEventListener("click", () => {

            /*
             * Não usamos preventDefault().
             *
             * A própria âncora irá navegar para
             * historico.html?status=...
             */

        });

    });


    /* =====================================================
       INICIALIZAÇÃO
    ====================================================== */

    updateActiveFilter();

    const visibleRows =
        filterTable();

    updatePagination();

    updateCounter(visibleRows);

});
