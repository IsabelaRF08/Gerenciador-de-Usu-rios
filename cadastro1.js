document.querySelector('#cadastrar').addEventListener('click', async function(event) {
    event.preventDefault(); // Impede o envio do formulário

    const msgError = document.querySelector('#msgErro');
    const email = document.querySelector('#email').value.trim();
    const usuario = document.querySelector('#usuario').value.trim();

    msgError.textContent = ""; // Limpa mensagens anteriores

    if (!email || !usuario) {
        msgError.textContent = "Preencha todos os campos!";
        return;
    }

    try {
        const res = await fetch('http://localhost:3000/cadastro/novo', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, usuario })
        });

        if (res.ok) {
            alert('Cadastrado com sucesso');
        } else if (res.status === 409) {
            msgError.textContent = 'Email já cadastrado';
        } else if (res.status === 500) {
            msgError.textContent = 'Ops... houve um erro ao cadastrar';
        } else {
            msgError.textContent = 'Erro desconhecido';
        }
    } catch (error) {
        console.error("Erro ao cadastrar:", error);
        msgError.textContent = "Erro de conexão com o servidor.";
    }
});
