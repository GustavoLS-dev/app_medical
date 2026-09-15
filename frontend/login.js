// =========================
// ANIMAÇÃO DOS ELEMENTOS
// =========================

const elementos = document.querySelectorAll(
    ".form-group, .remember, .create-button, .divider, .login-button"
);

elementos.forEach((elemento, index) => {

    elemento.style.setProperty(
        "--delay",
        `${index * 80}ms`
    );

    elemento.classList.add("animate-item");

});


// =========================
// MOSTRAR / ESCONDER SENHA
// =========================

const botoesOlho = document.querySelectorAll(".eye");

botoesOlho.forEach((botao) => {

    botao.addEventListener("click", () => {

        const wrapper = botao.closest(".input-wrapper");

        if (!wrapper) {
            return;
        }

        const input = wrapper.querySelector("input");

        if (!input) {
            return;
        }


        if (input.type === "password") {

            // Mostra a senha
            input.type = "text";

            botao.textContent = "◉";

            botao.setAttribute(
                "aria-label",
                "Esconder senha"
            );

        } else {

            // Esconde a senha
            input.type = "password";

            botao.textContent = "◉";

            botao.setAttribute(
                "aria-label",
                "Mostrar senha"
            );

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

        const wrapper = input.closest(".input-wrapper");

        if (wrapper) {
            wrapper.classList.add("input-focus");
        }

    });


    input.addEventListener("blur", () => {

        const wrapper = input.closest(".input-wrapper");

        if (wrapper) {
            wrapper.classList.remove("input-focus");
        }

    });

});


// =========================
// BOTÃO ENTRAR
// =========================

const botaoLogin = document.querySelector(".create-button");

if (botaoLogin) {

    botaoLogin.addEventListener("click", () => {

        botaoLogin.classList.remove("button-click");

        // Reinicia a animação
        void botaoLogin.offsetWidth;

        botaoLogin.classList.add("button-click");

    });

}


// =========================
// FORMULÁRIO DE LOGIN
// =========================

const formulario = document.querySelector("#login-form");

if (formulario && botaoLogin) {

    formulario.addEventListener("submit", (event) => {

        event.preventDefault();


        // Pega os valores
        const email = document.querySelector("#email");
        const senha = document.querySelector("#senha");


        // Verifica se os campos existem
        if (!email || !senha) {
            return;
        }


        // Verifica os campos
        if (
            email.value.trim() === "" ||
            senha.value.trim() === ""
        ) {

            formulario.reportValidity();

            return;

        }


        // Remove estado anterior
        botaoLogin.classList.remove("success");

        void botaoLogin.offsetWidth;


        // Adiciona estado de sucesso
        botaoLogin.classList.add("success");

        botaoLogin.textContent = "✓ Login realizado!";


        // Simulação de login
        setTimeout(() => {

            botaoLogin.textContent = "Entrar";

            botaoLogin.classList.remove("success");

        }, 2500);

    });

}


// =========================
// ESQUECI MINHA SENHA
// =========================

const esqueciSenha = document.querySelector(".forgot-password");

if (esqueciSenha) {

    esqueciSenha.addEventListener("click", (event) => {

        event.preventDefault();

        alert(
            "A recuperação de senha será disponibilizada em breve."
        );

    });

}


// =========================
// BOTÃO CRIAR CONTA
// =========================

const botaoCriarConta = document.querySelector(
    "#register-button"
);

if (botaoCriarConta) {

    botaoCriarConta.addEventListener("click", () => {

        // Por enquanto, apenas demonstração
        alert(
            "A página de criação de conta será aberta aqui."
        );

    });

}