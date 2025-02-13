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

        const data = await res.json();

        if (res.ok) {
            alert('Cadastrado com sucesso');
        } else {
            msgError.textContent = data.erro || 'Erro desconhecido';
        }
    } catch (error) {
        console.error("Erro ao cadastrar:", error);
        msgError.textContent = "Erro de conexão com o servidor.";
    }
});

