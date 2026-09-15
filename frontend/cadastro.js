// =========================
// PACIENTE / CUIDADOR
// =========================

const opcoesUsuario = document.querySelectorAll(".user-option");

opcoesUsuario.forEach((opcao) => {

    opcao.addEventListener("click", () => {

        // Remove a seleção de todas as opções
        opcoesUsuario.forEach((item) => {

            item.classList.remove("selected");

            const icone = item.querySelector(".radio-icon");

            if (icone) {
                icone.textContent = "○";
            }

        });


        // Seleciona a opção clicada
        opcao.classList.add("selected");

        const radio = opcao.querySelector("input");

        if (radio) {
            radio.checked = true;
        }


        // Muda o círculo
        const icone = opcao.querySelector(".radio-icon");

        if (icone) {
            icone.textContent = "●";
        }


        // Animação do clique
        opcao.classList.remove("clicked");

        void opcao.offsetWidth;

        opcao.classList.add("clicked");

        setTimeout(() => {
            opcao.classList.remove("clicked");
        }, 250);

    });

});


// =========================
// ANIMAÇÃO DOS ELEMENTOS
// =========================

const elementos = document.querySelectorAll(
    ".user-type, .form-group, .terms, .create-button, .divider, .login-button, .help-box"
);


elementos.forEach((elemento, index) => {

    elemento.style.setProperty(
        "--delay",
        `${index * 70}ms`
    );

    elemento.classList.add("animate-item");

});


// =========================
// MOSTRAR / ESCONDER SENHA
// =========================

const botoesOlho = document.querySelectorAll(".eye");


botoesOlho.forEach((botao) => {

    botao.addEventListener("click", () => {

        const input = botao
            .closest(".input-wrapper")
            .querySelector("input");


        if (input.type === "password") {

            input.type = "text";

            botao.textContent = "◉";

        } else {

            input.type = "password";

            botao.textContent = "◉";

        }

    });

});


// =========================
// ANIMAÇÃO DOS INPUTS
// =========================

const inputs = document.querySelectorAll(
    ".input-wrapper input"
);


inputs.forEach((input) => {

    input.addEventListener("focus", () => {

        input
            .closest(".input-wrapper")
            .classList.add("input-focus");

    });


    input.addEventListener("blur", () => {

        input
            .closest(".input-wrapper")
            .classList.remove("input-focus");

    });

});


// =========================
// BOTÃO CRIAR CONTA
// =========================

const botaoCriar = document.querySelector(".create-button");


botaoCriar.addEventListener("click", () => {

    botaoCriar.classList.remove("button-click");

    // Reinicia a animação
    void botaoCriar.offsetWidth;

    botaoCriar.classList.add("button-click");

});


// =========================
// FORMULÁRIO
// =========================

const formulario = document.querySelector("form");


formulario.addEventListener("submit", (event) => {

    event.preventDefault();


    botaoCriar.classList.remove("success");

    void botaoCriar.offsetWidth;

    botaoCriar.classList.add("success");


    botaoCriar.textContent = "✓ Conta criada!";

});
