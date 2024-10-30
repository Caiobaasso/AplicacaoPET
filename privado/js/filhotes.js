document.addEventListener("DOMContentLoaded", () => {
    const formFilhote = document.getElementById('formFilhote');
    const enderecoAPI = 'http://localhost:4000/filhotes';
    let motivoAcao = "CADASTRAR"; 

    carregarFilhotes();

    formFilhote.onsubmit = async (evento) => {
        evento.preventDefault(); // Evita o recarregamento da página
        
        const objetoFilhote = {
            Id: document.getElementById('id').value,
            Especie: document.getElementById('especie').value,
            Raca: document.getElementById('raca').value
        };

        try {
            let metodo = 'POST';
            let url = enderecoAPI;

            if (motivoAcao === 'EDITAR') {
                metodo = 'PUT';
                url = `${enderecoAPI}/${objetoFilhote.Id}`;
            } else if (motivoAcao === 'EXCLUIR') {
                metodo = 'DELETE';
                url = `${enderecoAPI}/${objetoFilhote.Id}`;
            }

            const resposta = await fetch(url, {
                method: metodo,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(objetoFilhote)
            });

            const respostaAPI = await resposta.json();
            exibirMensagem(respostaAPI.mensagem, respostaAPI.status ? 'green' : 'red');

            carregarFilhotes();
            formFilhote.reset();
            motivoAcao = "CADASTRAR"; 
        } catch (erro) {
            exibirMensagem(`Erro: ${erro.message}`, 'red');
        }
    };

    function gravarFilhote() {
        const objetoFilhote = {
            Especie: document.getElementById('especie').value,
            Raca: document.getElementById('raca').value
        };
    
        fetch(enderecoAPI, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(objetoFilhote)
        }).then((resposta) => resposta.json())
        .then((respostaAPI) => {
            exibirMensagem(respostaAPI.mensagem, respostaAPI.status ? 'green' : 'red');
            carregarFilhotes();
        }).catch((erro) => {
            exibirMensagem(`Erro ao cadastrar filhote: ${erro.message}`, 'red');
        });
    }

    async function carregarFilhotes() {
        try {
            const resposta = await fetch(enderecoAPI, { method: 'GET' });
            const listaFilhotes = await resposta.json();
            exibirTabelaFilhotes(listaFilhotes);
        } catch (erro) {
            exibirMensagem(`Erro ao buscar filhotes: ${erro.message}`, 'red');
        }
    }

    function exibirTabelaFilhotes(listaFilhotes) {
        const containerTabela = document.getElementById('containerTabela');
        containerTabela.innerHTML = ''; // Limpa a tabela

        if (listaFilhotes.length > 0) {
            listaFilhotes.forEach(filhote => {
                const linha = document.createElement('tr');
                linha.innerHTML = `
                    <td>${filhote.Id}</td>
                    <td>${filhote.Especie}</td>
                    <td>${filhote.Raca}</td>
                    <td>
                        <button onclick="selecionarFilhote('${filhote.Id}', '${filhote.Especie}', '${filhote.Raca}', 'EDITAR')">Alterar</button>
                        <button onclick="selecionarFilhote('${filhote.Id}', '${filhote.Especie}', '${filhote.Raca}', 'EXCLUIR')">Excluir</button>
                    </td>
                `;
                containerTabela.appendChild(linha);
            });
        } else {
            exibirMensagem('Nenhum filhote encontrado.', 'orange');
        }
    }

    window.selecionarFilhote = (Id, Especie, Raca, motivo) => {
        document.getElementById('id').value = Id;
        document.getElementById('especie').value = Especie;
        document.getElementById('raca').value = Raca;
        motivoAcao = motivo; 

        const botaoSubmit = formFilhote.querySelector('button[type="submit"]');
        botaoSubmit.innerText = motivo === 'EDITAR' ? 'Editar Filhote' : 'Excluir Filhote';
    };

    function exibirMensagem(mensagem, cor = 'black') {
        const divMensagem = document.getElementById('mensagem');
        divMensagem.innerHTML = `<p style="color: ${cor};">${mensagem}</p>`;
        setTimeout(() => {
            divMensagem.innerHTML = "";
        }, 5000);
    }
});