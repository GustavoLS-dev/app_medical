document.addEventListener("DOMContentLoaded", () => {

    /* =========================================================
       ELEMENTOS
    ========================================================== */

    const addHorario =
        document.querySelector("#addHorario");

    const testAlarm =
        document.querySelector("#testAlarm");

    const totalHorarios =
        document.querySelector("#totalHorarios");

    const totalConcluidos =
        document.querySelector("#totalConcluidos");

    const totalPendentes =
        document.querySelector("#totalPendentes");

    const totalProgramados =
        document.querySelector("#totalProgramados");



    /* =========================================================
       CRIAR POPUP
    ========================================================== */

    function criarModal(conteudo) {

        const overlay =
            document.createElement("div");

        overlay.className =
            "modal-overlay";

        overlay.innerHTML =
            conteudo;

        document.body.appendChild(overlay);


        requestAnimationFrame(() => {

            overlay.classList.add("active");

        });


        return overlay;
    }



    /* =========================================================
       FECHAR POPUP
    ========================================================== */

    function fecharModal(modal) {

        if (!modal) {
            return;
        }


        modal.classList.remove("active");


        setTimeout(() => {

            modal.remove();

        }, 250);
    }



    /* =========================================================
       REGISTRAR MEDICAMENTO COMO TOMADO
    ========================================================== */

    function registrarTomado(button) {

        const timelineItem =
            button.closest(".timeline-item");


        if (!timelineItem) {
            return;
        }


        const marker =
            timelineItem.querySelector(
                ".timeline-marker"
            );


        const timeBox =
            timelineItem.querySelector(
                ".time-box"
            );


        const status =
            timelineItem.querySelector(
                ".status"
            );


        const medicineCard =
            timelineItem.querySelector(
                ".timeline-card"
            );


        /* ---------------------------------------------
           ALTERA O ESTADO
        --------------------------------------------- */

        timelineItem.classList.remove(
            "pending",
            "scheduled"
        );

        timelineItem.classList.add(
            "completed"
        );


        /* ---------------------------------------------
           MARCADOR
        --------------------------------------------- */

        if (marker) {

            marker.textContent =
                "✓";
        }


        /* ---------------------------------------------
           HORÁRIO
        --------------------------------------------- */

        if (timeBox) {

            timeBox.classList.remove(
                "current"
            );
        }


        /* ---------------------------------------------
           STATUS
        --------------------------------------------- */

        if (status) {

            status.textContent =
                "✓ Tomado";

            status.classList.remove(
                "pending-status",
                "scheduled-status"
            );

            status.classList.add(
                "taken"
            );
        }


        /* ---------------------------------------------
           REMOVE O BOTÃO
        --------------------------------------------- */

        button.remove();


        /* ---------------------------------------------
           ATUALIZA RESUMO
        --------------------------------------------- */

        atualizarResumo();


        /* ---------------------------------------------
           ANIMAÇÃO
        --------------------------------------------- */

        if (medicineCard) {

            medicineCard.style.transform =
                "scale(1.025)";

            medicineCard.style.boxShadow =
                "0 10px 25px rgba(28, 49, 81, 0.16)";


            setTimeout(() => {

                medicineCard.style.transform =
                    "";

                medicineCard.style.boxShadow =
                    "";

            }, 500);
        }
    }



    /* =========================================================
       REGISTRAR TODOS OS BOTÕES
    ========================================================== */

    function ativarBotoesTomado() {

        document
            .querySelectorAll(".take-button")
            .forEach((button) => {

                button.addEventListener(
                    "click",
                    (event) => {

                        event.preventDefault();

                        registrarTomado(
                            button
                        );
                    }
                );

            });
    }



    /* =========================================================
       EDITAR HORÁRIO
    ========================================================== */

    function editarHorario(button) {

        const timelineItem =
            button.closest(
                ".timeline-item"
            );


        if (!timelineItem) {
            return;
        }


        const timeBox =
            timelineItem.querySelector(
                ".time-box"
            );


        const timeStrong =
            timeBox.querySelector(
                "strong"
            );


        const medicamento =
            timelineItem.querySelector(
                ".medicine-title h3"
            );


        if (!timeStrong) {
            return;
        }


        const horarioAtual =
            timeStrong.textContent.trim();


        const nomeMedicamento =
            medicamento
                ? medicamento.textContent
                    .trim()
                    .replace(/\s+/g, " ")
                : "medicamento";



        /* ---------------------------------------------
           CRIA POPUP
        --------------------------------------------- */

        const modal =
            criarModal(`

                <div class="modal">

                    <div class="modal-header">

                        <h3>
                            Editar horário
                        </h3>

                        <button
                            type="button"
                            class="modal-close"
                        >
                            ×
                        </button>

                    </div>


                    <div class="modal-content">

                        <p>
                            Altere o horário de
                            <strong>
                                ${nomeMedicamento}
                            </strong>.
                        </p>


                        <label class="modal-label">
                            Novo horário
                        </label>


                        <input
                            type="time"
                            class="modal-input"
                            value="${horarioAtual}"
                        >

                    </div>


                    <div class="modal-actions">

                        <button
                            type="button"
                            class="modal-button cancel"
                        >
                            Cancelar
                        </button>


                        <button
                            type="button"
                            class="modal-button save"
                        >
                            Salvar alteração
                        </button>

                    </div>

                </div>

            `);



        const input =
            modal.querySelector(
                ".modal-input"
            );



        /* ---------------------------------------------
           FECHAR
        --------------------------------------------- */

        modal
            .querySelector(".modal-close")
            .addEventListener(
                "click",
                () => {

                    fecharModal(
                        modal
                    );

                }
            );


        modal
            .querySelector(".cancel")
            .addEventListener(
                "click",
                () => {

                    fecharModal(
                        modal
                    );

                }
            );



        /* ---------------------------------------------
           SALVAR
        --------------------------------------------- */

        modal
            .querySelector(".save")
            .addEventListener(
                "click",
                () => {

                    const novoHorario =
                        input.value;


                    if (!novoHorario) {

                        input.focus();

                        return;
                    }


                    /* Atualiza o horário */

                    timeStrong.textContent =
                        novoHorario;


                    /* Mantém negrito */

                    timeStrong.style.fontWeight =
                        "800";


                    /* Fecha popup */

                    fecharModal(
                        modal
                    );


                    /* Reorganiza os cards */

                    ordenarTimeline();


                    /* Animação */

                    const card =
                        timelineItem.querySelector(
                            ".timeline-card"
                        );


                    if (card) {

                        card.style.transform =
                            "scale(1.025)";


                        setTimeout(() => {

                            card.style.transform =
                                "";

                        }, 400);
                    }

                }
            );



        /* ---------------------------------------------
           CLICAR FORA
        --------------------------------------------- */

        modal.addEventListener(
            "click",
            (event) => {

                if (
                    event.target === modal
                ) {

                    fecharModal(
                        modal
                    );
                }
            }
        );
    }



    /* =========================================================
       ATIVAR EDITAR
    ========================================================== */

    function ativarBotoesEditar() {

        document
            .querySelectorAll(".edit")
            .forEach((button) => {

                button.addEventListener(
                    "click",
                    (event) => {

                        event.preventDefault();

                        editarHorario(
                            button
                        );
                    }
                );

            });
    }



    /* =========================================================
       EXCLUIR HORÁRIO
    ========================================================== */

    function confirmarExclusao(button) {

        const timelineItem =
            button.closest(
                ".timeline-item"
            );


        if (!timelineItem) {
            return;
        }


        const medicamento =
            timelineItem.querySelector(
                ".medicine-title h3"
            );


        const horario =
            timelineItem.querySelector(
                ".time-box strong"
            );


        const nome =
            medicamento
                ? medicamento.textContent
                    .trim()
                    .replace(/\s+/g, " ")
                : "este medicamento";


        const hora =
            horario
                ? horario.textContent.trim()
                : "";



        /* ---------------------------------------------
           POPUP
        --------------------------------------------- */

        const modal =
            criarModal(`

                <div class="modal">

                    <div class="delete-modal-icon">
                        🗑
                    </div>


                    <div
                        class="delete-modal-content"
                    >

                        <h3>
                            Excluir horário?
                        </h3>


                        <p>
                            Deseja realmente excluir
                            <strong>
                                ${nome}
                            </strong>
                            do horário
                            <strong>
                                ${hora}
                            </strong>?
                            <br><br>
                            Essa ação não poderá
                            ser desfeita.
                        </p>

                    </div>


                    <div class="modal-actions">

                        <button
                            type="button"
                            class="modal-button cancel"
                        >
                            Cancelar
                        </button>


                        <button
                            type="button"
                            class="modal-button confirm-delete"
                        >
                            Sim, excluir
                        </button>

                    </div>

                </div>

            `);



        /* ---------------------------------------------
           CANCELAR
        --------------------------------------------- */

        modal
            .querySelector(".cancel")
            .addEventListener(
                "click",
                () => {

                    fecharModal(
                        modal
                    );

                }
            );



        /* ---------------------------------------------
           CONFIRMAR
        --------------------------------------------- */

        modal
            .querySelector(".confirm-delete")
            .addEventListener(
                "click",
                () => {

                    timelineItem.style.transition =
                        "0.3s ease";


                    timelineItem.style.opacity =
                        "0";


                    timelineItem.style.transform =
                        "translateX(30px)";


                    setTimeout(() => {

                        timelineItem.remove();


                        fecharModal(
                            modal
                        );


                        atualizarResumo();

                    }, 300);

                }
            );



        /* ---------------------------------------------
           CLICAR FORA
        --------------------------------------------- */

        modal.addEventListener(
            "click",
            (event) => {

                if (
                    event.target === modal
                ) {

                    fecharModal(
                        modal
                    );
                }
            }
        );
    }



    /* =========================================================
       ATIVAR EXCLUIR
    ========================================================== */

    function ativarBotoesExcluir() {

        document
            .querySelectorAll(".delete")
            .forEach((button) => {

                button.addEventListener(
                    "click",
                    (event) => {

                        event.preventDefault();

                        confirmarExclusao(
                            button
                        );
                    }
                );

            });
    }



    /* =========================================================
       ORDENAR TIMELINE
    ========================================================== */

    function ordenarTimeline() {

        const timeline =
            document.querySelector(
                ".timeline"
            );


        if (!timeline) {
            return;
        }


        const items =
            Array.from(
                timeline.querySelectorAll(
                    ".timeline-item"
                )
            );


        items.sort((a, b) => {

            const horaA =
                a.querySelector(
                    ".time-box strong"
                )?.textContent
                .trim() || "00:00";


            const horaB =
                b.querySelector(
                    ".time-box strong"
                )?.textContent
                .trim() || "00:00";


            return horaA.localeCompare(
                horaB
            );

        });


        items.forEach((item) => {

            timeline.appendChild(
                item
            );

        });
    }



    /* =========================================================
       ATUALIZAR RESUMO
    ========================================================== */

    function atualizarResumo() {

        const horarios =
            document.querySelectorAll(
                ".timeline-item"
            );


        const concluidos =
            document.querySelectorAll(
                ".timeline-item.completed"
            );


        const pendentes =
            document.querySelectorAll(
                ".timeline-item.pending"
            );


        const programados =
            document.querySelectorAll(
                ".timeline-item.scheduled"
            );


        if (totalHorarios) {

            totalHorarios.textContent =
                horarios.length;
        }


        if (totalConcluidos) {

            totalConcluidos.textContent =
                concluidos.length;
        }


        if (totalPendentes) {

            totalPendentes.textContent =
                pendentes.length;
        }


        if (totalProgramados) {

            totalProgramados.textContent =
                programados.length;
        }
    }



    /* =========================================================
       ADICIONAR HORÁRIO
    ========================================================== */

    if (addHorario) {

        addHorario.addEventListener(
            "click",
            (event) => {

                event.preventDefault();


                const modal =
                    criarModal(`

                        <div class="modal">

                            <div class="modal-header">

                                <h3>
                                    Adicionar horário
                                </h3>

                                <button
                                    type="button"
                                    class="modal-close"
                                >
                                    ×
                                </button>

                            </div>


                            <div class="modal-content">

                                <p>
                                    Selecione o horário
                                    desejado para o
                                    medicamento.
                                </p>


                                <label
                                    class="modal-label"
                                >
                                    Horário
                                </label>


                                <input
                                    type="time"
                                    class="modal-input"
                                    value="08:00"
                                >

                            </div>


                            <div class="modal-actions">

                                <button
                                    type="button"
                                    class="modal-button cancel"
                                >
                                    Cancelar
                                </button>


                                <button
                                    type="button"
                                    class="modal-button save"
                                >
                                    Salvar
                                </button>

                            </div>

                        </div>

                    `);


                modal
                    .querySelector(
                        ".modal-close"
                    )
                    .addEventListener(
                        "click",
                        () => {

                            fecharModal(
                                modal
                            );

                        }
                    );


                modal
                    .querySelector(
                        ".cancel"
                    )
                    .addEventListener(
                        "click",
                        () => {

                            fecharModal(
                                modal
                            );

                        }
                    );


                modal.addEventListener(
                    "click",
                    (event) => {

                        if (
                            event.target === modal
                        ) {

                            fecharModal(
                                modal
                            );

                        }
                    }
                );
            }
        );
    }



    /* =========================================================
       TESTAR ALARME
    ========================================================== */

    if (testAlarm) {

        testAlarm.addEventListener(
            "click",
            (event) => {

                event.preventDefault();


                const modal =
                    criarModal(`

                        <div class="modal">

                            <div class="modal-header">

                                <h3>
                                    Teste do alarme
                                </h3>

                                <button
                                    type="button"
                                    class="modal-close"
                                >
                                    ×
                                </button>

                            </div>


                            <div class="modal-content">

                                <p>
                                    🔊 O teste do
                                    alarme foi
                                    realizado
                                    com sucesso.
                                </p>

                            </div>


                            <div class="modal-actions">

                                <button
                                    type="button"
                                    class="modal-button save"
                                >
                                    Entendi
                                </button>

                            </div>

                        </div>

                    `);


                modal
                    .querySelector(
                        ".modal-close"
                    )
                    .addEventListener(
                        "click",
                        () => {

                            fecharModal(
                                modal
                            );

                        }
                    );


                modal
                    .querySelector(
                        ".save"
                    )
                    .addEventListener(
                        "click",
                        () => {

                            fecharModal(
                                modal
                            );

                        }
                    );
            }
        );
    }



    /* =========================================================
       INICIALIZAÇÃO
    ========================================================== */

    ativarBotoesTomado();

    ativarBotoesEditar();

    ativarBotoesExcluir();

    atualizarResumo();

});