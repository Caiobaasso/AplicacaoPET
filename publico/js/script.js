// Função para obter parâmetros da URL
function getQueryParams() {
    const parametros = new URLSearchParams(window.location.search);
    return parametros;
}

// Verifica se o parâmetro "erro" está na URL
const parametros = getQueryParams();
if (parametros.get('erro') === '1') {
    // Exibe a mensagem de erro se o parâmetro "erro" for igual a 1
    document.getElementById('mensagemErro').style.display = 'block';
}

// Função para alternar a visibilidade da senha
const togglePassword = document.querySelector('.toggle-password');
const passwordInput = document.querySelector('#senha');

if (togglePassword) {
    togglePassword.addEventListener('click', function () {
        // Alterna entre o tipo de input "password" e "text"
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);

        // Alterna o ícone entre "fa-eye" e "fa-eye-slash"
        this.classList.toggle('fa-eye-slash');
    });
}