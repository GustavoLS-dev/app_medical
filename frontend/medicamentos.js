document.addEventListener("DOMContentLoaded", () => {

    // =========================================================
    // ELEMENTOS PRINCIPAIS
    // =========================================================

    const grid = document.querySelector(".medications-grid");

    const abrirAdicionarMed =
        document.getElementById("abrirAdicionarMed");

    const modal =
        document.getElementById("adicionarMedModal");

    const fecharAdicionarMed =
        document.getElementById("fecharAdicionarMed");

    const cancelarAdicionarMed =
        document.getElementById("cancelarAdicionarMed");

    const salvarMedicamento =
        document.getElementById("salvarMedicamento");

    const form =
        document.getElementById("formAdicionarMedicamento");


    // =========================================================
    // EFEITO NOS LINKS
    // =========================================================

    function adicionarEfeitoLinks() {

        const links = document.querySelectorAll("a");

        links.forEach((link) => {

            link.addEventListener("click", () => {

                link.classList.add("clicked");

                setTimeout(() => {

                    link.classList.remove("clicked");

                }, 350);

            });

        });

    }

    adicionarEfeitoLinks();


    // =========================================================
    // BOTÕES DE EXCLUIR
    // =========================================================

    function configurarExclusao() {

        const deleteButtons =
            document.querySelectorAll(".delete-button");

        deleteButtons.forEach((button) => {

            button.addEventListener("click", (event) => {

                const confirmar = confirm(
                    "Deseja realmente excluir este medicamento?"
                );

                if (!confirmar) {

                    event.preventDefault();

                }

            });

        });

    }

    configurarExclusao();


    // =========================================================
    // ANIMAÇÃO DOS CARDS
    // =========================================================

    const cards =
        document.querySelectorAll(".medication-card");

    cards.forEach((card, index) => {

        card.style.opacity = "0";

        card.style.transform =
            "translateY(12px)";

        setTimeout(() => {

            card.style.transition =
                "opacity 0.4s ease, transform 0.4s ease";

            card.style.opacity = "1";

            card.style.transform =
                "translateY(0)";

        }, 100 + (index * 100));

    });


    // =========================================================
    // ANIMAÇÃO DO CABEÇALHO
    // =========================================================

    const pageHeader =
        document.querySelector(".page-header");

    if (pageHeader) {

        pageHeader.style.opacity = "0";

        pageHeader.style.transform =
            "translateY(-8px)";

        setTimeout(() => {

            pageHeader.style.transition =
                "opacity 0.4s ease, transform 0.4s ease";

            pageHeader.style.opacity = "1";

            pageHeader.style.transform =
                "translateY(0)";

        }, 50);

    }


    // =========================================================
    // ABRIR POPUP
    // =========================================================

    if (abrirAdicionarMed && modal) {

        abrirAdicionarMed.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                modal.classList.add("active");

                document.body.style.overflow = "hidden";

                setTimeout(() => {

                    const nomeInput =
                        document.getElementById(
                            "nomeMedicamento"
                        );

                    if (nomeInput) {

                        nomeInput.focus();

                    }

                }, 200);

            }
        );

    }


    // =========================================================
    // FECHAR POPUP
    // =========================================================

    function fecharModal(event) {

        if (event) {

            event.preventDefault();

        }

        if (!modal) {

            return;

        }

        modal.classList.remove("active");

        document.body.style.overflow = "";

    }


    if (fecharAdicionarMed) {

        fecharAdicionarMed.addEventListener(
            "click",
            fecharModal
        );

    }


    if (cancelarAdicionarMed) {

        cancelarAdicionarMed.addEventListener(
            "click",
            fecharModal
        );

    }


    // =========================================================
    // FECHAR CLICANDO FORA
    // =========================================================

    if (modal) {

        modal.addEventListener(
            "click",
            (event) => {

                if (event.target === modal) {

                    fecharModal();

                }

            }
        );

    }


    // =========================================================
    // FECHAR COM ESC
    // =========================================================

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                modal &&
                modal.classList.contains("active")
            ) {

                fecharModal();

            }

        }
    );


    // =========================================================
    // SELECIONAR TIPO DE MEDICAMENTO
    // =========================================================

    const opcoesTipo =
        document.querySelectorAll(
            ".presentation-option"
        );


    opcoesTipo.forEach((opcao) => {

        opcao.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                opcoesTipo.forEach((item) => {

                    item.classList.remove(
                        "selected"
                    );

                });

                opcao.classList.add(
                    "selected"
                );

            }
        );

    });


    // =========================================================
    // FORMATAR HORÁRIO
    // =========================================================

    function formatarHorario(horario) {

        if (!horario) {

            return "--:--";

        }

        return horario;

    }


    // =========================================================
    // CRIAR CARD
    // =========================================================

    function criarCard(medicamento) {

        const card =
            document.createElement("article");

        card.className =
            "medication-card";

        card.innerHTML = `

            <div class="card-content">

                <div class="medication-header">

                    <div>

                        <span class="medication-type">
                            ${medicamento.tipo}
                        </span>

                        <h2>
                            ${medicamento.nome}
                        </h2>

                        <span class="dosage">
                            ${medicamento.dosagem}
                        </span>

                    </div>

                    <span class="status active">
                        ● Ativo
                    </span>

                </div>


                <div class="medication-information">

                    <div class="information-item">

                        <span class="information-label">
                            Frequência
                        </span>

                        <strong>
                            ${medicamento.frequencia}
                        </strong>

                        <span class="schedule">
                            ◷ ${formatarHorario(
                                medicamento.horario
                            )}
                        </span>

                    </div>


                    <div class="information-item">

                        <span class="information-label">
                            Quantidade no dispenser
                        </span>

                        <strong>
                            ${medicamento.estoque}
                            doses disponíveis
                        </strong>

                        <span class="stock good">
                            ▣ Estoque ideal
                        </span>

                    </div>

                </div>

            </div>


            <div class="card-footer">

                <span>
                    Dispensador Slot #04
                </span>

                <div class="card-actions">

                    <a
                        href="#"
                        class="secondary-button edit-button"
                    >
                        ✎ Editar
                    </a>

                    <a
                        href="#"
                        class="delete-button"
                    >
                        ▪ Excluir
                    </a>

                </div>

            </div>

        `;

        return card;

    }


    // =========================================================
    // CARREGAR MEDICAMENTOS SALVOS
    // =========================================================

    function carregarMedicamentos() {

        if (!grid) {

            return;

        }

        const medicamentos =
            JSON.parse(
                localStorage.getItem("medicamentos")
            ) || [];


        medicamentos.forEach((medicamento) => {

            const card =
                criarCard(medicamento);

            grid.appendChild(card);

        });

    }

    carregarMedicamentos();


    // =========================================================
    // SALVAR MEDICAMENTO
    // =========================================================

    if (salvarMedicamento) {

        salvarMedicamento.addEventListener(
            "click",
            (event) => {

                event.preventDefault();


                // ---------------------------------------------
                // PEGAR VALORES
                // ---------------------------------------------

                const nomeInput =
                    document.getElementById(
                        "nomeMedicamento"
                    );

                const dosagemInput =
                    document.getElementById(
                        "dosagemMedicamento"
                    );

                const horarioInput =
                    document.getElementById(
                        "horarioMedicamento"
                    );

                const frequenciaInput =
                    document.getElementById(
                        "frequenciaMedicamento"
                    );

                const estoqueInput =
                    document.getElementById(
                        "estoqueMedicamento"
                    );


                const nome =
                    nomeInput.value.trim();

                const dosagem =
                    dosagemInput.value.trim();

                const horario =
                    horarioInput.value;

                const frequencia =
                    frequenciaInput.value;

                const estoque =
                    estoqueInput.value;


                // ---------------------------------------------
                // TIPO
                // ---------------------------------------------

                const tipoSelecionado =
                    document.querySelector(
                        ".presentation-option.selected"
                    );


                const tipo =
                    tipoSelecionado
                        ? tipoSelecionado.dataset.tipo
                        : "";


                // ---------------------------------------------
                // VALIDAÇÕES
                // ---------------------------------------------

                if (!nome) {

                    alert(
                        "Digite o nome do medicamento."
                    );

                    nomeInput.focus();

                    return;

                }


                if (!dosagem) {

                    alert(
                        "Digite a dosagem do medicamento."
                    );

                    dosagemInput.focus();

                    return;

                }


                if (!tipo) {

                    alert(
                        "Selecione o tipo de medicamento."
                    );

                    return;

                }


                if (!frequencia) {

                    alert(
                        "Selecione a frequência do medicamento."
                    );

                    frequenciaInput.focus();

                    return;

                }


                if (!horario) {

                    alert(
                        "Informe o horário do medicamento."
                    );

                    horarioInput.focus();

                    return;

                }


                if (
                    !estoque ||
                    Number(estoque) <= 0
                ) {

                    alert(
                        "Informe uma quantidade válida para o estoque."
                    );

                    estoqueInput.focus();

                    return;

                }


                // ---------------------------------------------
                // CRIAR OBJETO
                // ---------------------------------------------

                const medicamento = {

                    id: Date.now(),

                    nome: nome,

                    dosagem: dosagem,

                    tipo: tipo,

                    horario: horario,

                    frequencia: frequencia,

                    estoque: Number(estoque)

                };


                // ---------------------------------------------
                // PEGAR EXISTENTES
                // ---------------------------------------------

                const medicamentos =
                    JSON.parse(
                        localStorage.getItem(
                            "medicamentos"
                        )
                    ) || [];


                // ---------------------------------------------
                // ADICIONAR
                // ---------------------------------------------

                medicamentos.push(
                    medicamento
                );


                // ---------------------------------------------
                // SALVAR
                // ---------------------------------------------

                localStorage.setItem(
                    "medicamentos",
                    JSON.stringify(
                        medicamentos
                    )
                );


                // ---------------------------------------------
                // ADICIONAR CARD NA TELA
                // ---------------------------------------------

                if (grid) {

                    const card =
                        criarCard(medicamento);

                    grid.appendChild(card);

                    card.style.opacity = "0";

                    card.style.transform =
                        "translateY(20px)";

                    setTimeout(() => {

                        card.style.transition =
                            "opacity 0.4s ease, transform 0.4s ease";

                        card.style.opacity = "1";

                        card.style.transform =
                            "translateY(0)";

                    }, 50);

                }


                // ---------------------------------------------
                // FECHAR POPUP
                // ---------------------------------------------

                fecharModal();


                // ---------------------------------------------
                // LIMPAR FORMULÁRIO
                // ---------------------------------------------

                form.reset();


                opcoesTipo.forEach((item) => {

                    item.classList.remove(
                        "selected"
                    );

                });


                // ---------------------------------------------
                // MENSAGEM
                // ---------------------------------------------

                alert(
                    `${nome} foi cadastrado com sucesso!`
                );

            }
        );

    }


    // =========================================================
    // IMPEDIR SUBMIT NORMAL DO FORMULÁRIO
    // =========================================================

    if (form) {

        form.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();

                if (salvarMedicamento) {

                    salvarMedicamento.click();

                }

            }
        );

    }

});