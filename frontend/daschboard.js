document.addEventListener("DOMContentLoaded", () => {

    // =====================================================
    // ELEMENTOS
    // =====================================================

    const navItems = document.querySelectorAll(".nav-item");
    const cards = document.querySelectorAll(".summary-card, .side-card");
    const medicationRows = document.querySelectorAll(".medication-row");
    const notification = document.querySelector(".notification");
    const quickHelp = document.querySelector(".quick-help");
    const emergency = document.querySelector(".emergency");
    const settings = document.querySelector(".settings");

    // =====================================================
    // EFEITO DE CLIQUE NAS CARDS
    // =====================================================

    cards.forEach((card) => {

        card.addEventListener("click", (event) => {

            // Não seleciona a card quando clicar em um link
            if (event.target.closest("a")) {
                return;
            }

            // Remove seleção das outras cards
            cards.forEach((item) => {
                item.classList.remove("selected");
            });

            // Adiciona borda na card clicada
            card.classList.add("selected");

        });

    });


    // =====================================================
    // NAVEGAÇÃO LATERAL
    // =====================================================

    navItems.forEach((item) => {

        item.addEventListener("click", (event) => {

            event.preventDefault();

            // Remove ativo de todos
            navItems.forEach((nav) => {
                nav.classList.remove("active");
            });

            // Ativa o selecionado
            item.classList.add("active");

            // Efeito visual
            item.classList.add("clicked");

            setTimeout(() => {
                item.classList.remove("clicked");
            }, 250);

        });

    });


    // =====================================================
    // LINHAS DE MEDICAMENTOS
    // =====================================================

    medicationRows.forEach((row) => {

        row.addEventListener("click", (event) => {

            if (event.target.closest("a")) {
                return;
            }

            medicationRows.forEach((item) => {
                item.classList.remove("selected");
            });

            row.classList.add("selected");

        });

    });


    // =====================================================
    // DISPENSAR AGORA
    // =====================================================

    const dispenseButton = document.querySelector(
        ".pending-row .med-status a"
    );

    if (dispenseButton) {

        dispenseButton.addEventListener("click", (event) => {

            event.preventDefault();

            const row = dispenseButton.closest(".medication-row");
            const status = row.querySelector(".status");
            const info = row.querySelector(".med-status small");

            status.textContent = "✓  Dispensado";
            status.classList.remove("pending-status");
            status.classList.add("taken-status");

            info.textContent = "✓ Medicamento dispensado agora";

            row.classList.remove("pending-row");
            row.classList.add("taken-row");

            dispenseButton.style.display = "none";

            mostrarMensagem(
                "Medicamento dispensado",
                "A Metformina foi liberada pelo dispensador."
            );

        });

    }


    // =====================================================
    // MARCAR COMO TOMADO
    // =====================================================

    const takeButton = document.querySelector(".take-button");

    if (takeButton) {

        takeButton.addEventListener("click", (event) => {

            event.preventDefault();
            event.stopPropagation();

            const card = takeButton.closest(".summary-card");

            const badge = card.querySelector(".badge");
            const title = card.querySelector(".card-top strong");

            badge.textContent = "✓ Tomado";
            badge.classList.remove("pending");
            badge.classList.add("normal");

            title.textContent = "✓ MEDICAMENTO TOMADO";

            takeButton.innerHTML = "✓ Medicamento tomado";

            takeButton.classList.add("completed");

            mostrarMensagem(
                "Dose registrada",
                "A Metformina foi marcada como tomada."
            );

        });

    }


    // =====================================================
    // TESTAR VIBRAÇÃO DA PULSEIRA
    // =====================================================

    const testButton = document.querySelector(".test-button");

    if (testButton) {

        testButton.addEventListener("click", (event) => {

            event.preventDefault();

            testButton.classList.add("testing");

            const textoOriginal = testButton.innerHTML;

            testButton.innerHTML = "⌁ &nbsp; Testando vibração...";

            mostrarMensagem(
                "Teste iniciado",
                "A pulseira está vibrando para teste."
            );

            setTimeout(() => {

                testButton.classList.remove("testing");

                testButton.innerHTML = "✓ &nbsp; Vibração funcionando";

            }, 1800);

            setTimeout(() => {

                testButton.innerHTML = textoOriginal;

            }, 3500);

        });

    }


    // =====================================================
    // AJUDA RÁPIDA
    // =====================================================

    if (quickHelp) {

        quickHelp.addEventListener("click", (event) => {

            event.preventDefault();

            mostrarMensagem(
                "Ajuda rápida",
                "Confira a agenda, os medicamentos e o status do dispensador."
            );

        });

    }


    // =====================================================
    // NOTIFICAÇÕES
    // =====================================================

    if (notification) {

        notification.addEventListener("click", (event) => {

            event.preventDefault();

            notification.classList.add("notification-open");

            mostrarMensagem(
                "Notificações",
                "Você não possui novas notificações."
            );

            setTimeout(() => {
                notification.classList.remove("notification-open");
            }, 500);

        });

    }


    // =====================================================
    // EMERGÊNCIA
    // =====================================================

    if (emergency) {

        emergency.addEventListener("click", (event) => {

            event.preventDefault();

            const confirmar = confirm(
                "Deseja realmente acionar o modo de emergência?"
            );

            if (confirmar) {

                mostrarMensagem(
                    "Emergência acionada",
                    "O sistema registrou o acionamento de emergência."
                );

            }

        });

    }


    // =====================================================
    // CONFIGURAÇÕES
    // =====================================================

    if (settings) {

        settings.addEventListener("click", (event) => {

            event.preventDefault();

            mostrarMensagem(
                "Configurações",
                "Área de configurações do sistema."
            );

        });

    }


    // =====================================================
    // MENSAGEM FLUTUANTE
    // =====================================================

    function mostrarMensagem(titulo, texto) {

        const antiga = document.querySelector(".dashboard-toast");

        if (antiga) {
            antiga.remove();
        }

        const toast = document.createElement("div");

        toast.className = "dashboard-toast";

        toast.innerHTML = `
            <div class="toast-icon">✓</div>

            <div class="toast-content">
                <strong>${titulo}</strong>
                <span>${texto}</span>
            </div>

            <button class="toast-close">×</button>
        `;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add("show");
        }, 10);

        const close = toast.querySelector(".toast-close");

        close.addEventListener("click", () => {

            toast.classList.remove("show");

            setTimeout(() => {
                toast.remove();
            }, 300);

        });

        setTimeout(() => {

            if (document.body.contains(toast)) {

                toast.classList.remove("show");

                setTimeout(() => {
                    toast.remove();
                }, 300);

            }

        }, 4000);

    }


    // =====================================================
    // HOVER / CLIQUE GERAL
    // =====================================================

    document.querySelectorAll("a").forEach((link) => {

        link.addEventListener("mousedown", () => {
            link.classList.add("pressing");
        });

        link.addEventListener("mouseup", () => {
            link.classList.remove("pressing");
        });

        link.addEventListener("mouseleave", () => {
            link.classList.remove("pressing");
        });

    });


    // =====================================================
    // EFEITO DE ENTRADA
    // =====================================================

    document.body.classList.add("dashboard-loaded");

});