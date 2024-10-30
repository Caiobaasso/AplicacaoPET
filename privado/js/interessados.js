const enderecoAPI = 'http://localhost:4000/filhotes';

function carregarFilhote(){
    console.log('Tentando carregar filhote...');

    fetch(enderecoAPI).then((resposta)=>{ // Substitua pela URL da sua API
    return resposta.json();
    }).then((filhotes) => {

        const selectFilhotes = document.getElementById('filhote');
        selectFilhotes.innerHTML = '';
        const optionDefault = document.createElement('option');
        optionDefault.value = '';
        optionDefault.text = 'Selecione um filhote';
        selectFilhotes.appendChild(optionDefault);
        
        for (let i=0; i<filhotes.length; i++) {
        const option = document.createElement('option');
        option.value = filhotes[i].Especie;
        option.text = filhotes[i].Especie;
        selectFilhotes.appendChild(option);
        };
    }).catch((erro) => {
    console.error('Erro:', erro.message);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    carregarFilhote();
});