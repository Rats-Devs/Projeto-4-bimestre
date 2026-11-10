//Página de login
const form = document.getElementById("formCadastro");
const erro = document.getElementById("erro");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const senha = document.getElementById("senha").value;
    const confirmar = document.getElementById("confirmarSenha").value;

    if (senha !== confirmar) {
        erro.textContent = "As senhas não coincidem!";
        return;
    }

    erro.textContent = "Cadastro realizado com sucesso!";
});