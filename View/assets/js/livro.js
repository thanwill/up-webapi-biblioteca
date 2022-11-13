var url = 'http://localhost:3000';

function cadastrar_livro() {
    let body =
    {
        'Titulo': document.getElementById('book_title').value,
        'Autor': document.getElementById('autor_name').value,
        'Lancamento': document.getElementById('book-Lancamento').value,
        'Estoque': document.getElementById('test5').value
    };

    fetch(url + '/livros',
        {
            'method': 'POST',
            'redirect': 'follow',
            'headers':
            {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            'body': JSON.stringify(body)
        })

        .then((response) => {
            if (response.ok) {
                return response.text()
            }
            else {
                response.text().then((text) => {
                    throw new Error(text)
                })
            }
        })

        .then((output) => {
            console.log(output);
            alert('Cadastro efetuado')
        })
        .catch((error) => {
            console.log(error)
            alert('Não foi possível efetuar o cadastro')
        })
}

function listar_livros() {
    fetch(url + '/livros')
        .then(response => response.json())
        .then((livros) => {
            let listaLivros = document.getElementById('lista-Livros');

            let list = '';
            livros.forEach((livro, index) => {
                if (livro.Titulo.lenght != 0) {
                    list +=
                        `<div class="collection-item grey-text" style="text-align:left;">
                        ${livro.Titulo}
                        <a class="secondary-content modal-trigger" href="#visualizar-livro"><i
                        class="material-icons">visibility</i></a>
                        </div>`
                }
                else
                {
                    list +=
                        `<div class="collection-item grey-text">
                        Vazia.
                        </div>`
                }
            });
            listaLivros.innerHTML = list;
        })
}

function atualizar_livro(id)
{
    let divTitulo = "Aventuras2: O retorno";
    let divAutor = "Rafa";
    let divLancamento = "05/11/2022";
    let body =
    {
        'Titulo': divTitulo.value,
        'Autor': divAutor.value,
        'Lancamento': divLancamento.value 
    }

    fetch(url + "/livros/" + id,
    {
        'method': 'PUT',
        'redirect': 'follow',
        'headers':
        {
            'content-type': 'application/json',
            'Accept': 'application/json'
        },
        'body': JSON.stringify(body)
    })
    .then((response) =>
    {
        if(response.ok)
        {
            return response.text()
        }
        else
        {
            return response.text().then((text) =>
            {
                throw new Error(text)
            })
        }
    })

    .then((output) =>
    {
        console.log(output)
        alert('Livro atualizado')
    })
    .catch((error) =>
    {
        console.log(error)
        alert('Não foi possível atualizar o livro')
    })
}

function deletar_livro(id)
{
    fetch(url + '/livros/' + id,
    {
        'method': 'DELETE',
        'redirect': 'follow'
    })
    .then((response) =>
    {
        if(response.ok)
        {
            return response.text()
        }
        else
        {
            return response.text().then((text) =>
            {
                throw new Error(text)
            })
        }
    })
    .then((output) =>
    {
        listar_livros()
        console.log(output)
        alert('Livro removido')
    })
    .catch((error) =>
    {
        console.log(error)
        alert('Não foi possível remover o livro')
    })
}
