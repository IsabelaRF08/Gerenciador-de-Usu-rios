document.querySelector('#cadastrar').addEventListener('click', async function(event){
    event.preventDefault(); // Impede o envio do formulário
    const msgError = document.querySelector('#msgErro');
    const email = document.querySelector('#email').value;
    const usuario = document.querySelector('#usuario').value;
            
    {
        msgError.textContent = ""
        const email = document.querySelector('#email').value;
        const usuario = document.querySelector('#usuario').value;

        const res = await fetch('http://localhost:3000/cadastro/novo',{
            method: "POST",
            headers: {
                "Content-Type": "application/json" // Adiciona o cabeçalho correto
            },
            body: JSON.stringify({
                email: email,
                usuario: usuario
            })
        });
       console.log('to aqui');
        if(res.status == 200){
            alert('Cadastrado com sucesso')
            
        }
        else if(res.status == 500){
            alert('Ops...houve um erro ao cadastrar')
        }
    
        else  if(res.status == 409){
            alert('Email ja cadastrado')
        }
    }
});