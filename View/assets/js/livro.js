var url = 'http://localhost:3000';

let idLivro = 0;

function cadastrar_livro() {

    if(document.getElementById('book_title').value == null  || document.getElementById('book_title').value == '')
    {
        alert('Não foi possível efetuar o cadastro')
        return
    }
    if(document.getElementById('autor_name').value == null  || document.getElementById('autor_name').value == '')
    {
        alert('Não foi possível efetuar o cadastro')
        return
    }
    
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
                listar_livros()
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

function listar_livro_especifico() {
    
    let titulo = document.getElementById('search').value
    fetch(url + '/livros')
        .then(response => response.json())
        .then((livros) =>
        {
            let listaLivros = document.getElementById('lista-livros');

            let list = '';
    
            livros.forEach((livro, index) =>
            {
                if(livro.Titulo.lenght !=0)
                {
                    if(livro.Titulo == titulo)
                    {
                        list +=
                        `<div class="collection-item grey-text" style="text-align:left;">
                        ${livro.Titulo}
                        <a class="secondary-content modal-trigger" href="#see-forms-book"><i
                         onclick="info_livro(${livro.Id})" class="material-icons">visibility</i></a>
                        </div>`
                        
                    }
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

function listar_livros() {

    fetch(url + '/livros')
        .then(response => response.json())
        .then((livros) => {
            let listaLivros = document.getElementById('lista-livros');

            let list = '';
            livros.forEach((livro, index) => {
                if (livro.Titulo.lenght != 0) {
                    list +=             
                        `<div class="collection-item grey-text" style="text-align:left;">
                        ${livro.Titulo}
                        <a class="secondary-content modal-trigger" href="#see-forms-book"><i
                         onclick="info_livro(${livro.Id})" class="material-icons">visibility</i></a>
                        </div>`
                        
                }
                else {
                    list +=
                        `<div class="collection-item grey-text">
                        Vazia.
                        </div>`
                }
            });
            listaLivros.innerHTML = list;
        });
}
function info_livro(id)
{
   fetch(url + '/livros/' + id)
   .then(response => response.json())
   .then((livros) =>
   {
    document.getElementById('mostrar-titulo').innerHTML = livros.Titulo
    document.getElementById('mostrar-autor').innerHTML = livros.Autor
    document.getElementById('mostrar-lancamento').innerHTML = livros.Lancamento
    document.getElementById('mostrar-quantidade').innerHTML = livros.Estoque;

    idLivro = livros.Id;

   })
    
}

listar_livros();

function pre_atualizacao()
{
    let id = idLivro;
    let titulo = 'Aventuras2: O retorno'
    let autor = 'Rafa'
    let lancamento = '05/11/2022'
    atualizar_livro(id, titulo, autor, lancamento)
}
function atualizar_livro(id, divTitulo, divAutor, divLancamento) {
    
    let body =
    {
        'Titulo': divTitulo,
        'Autor': divAutor,
        'Lancamento': divLancamento
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
        .then((response) => {
            if (response.ok) {
                return response.text()
            }
            else {
                return response.text().then((text) => {
                    throw new Error(text)
                })
            }
        })

        .then((output) => {
            console.log(output)
            alert('Livro atualizado')
        })
        .catch((error) => {
            console.log(error)
            alert('Não foi possível atualizar o livro')
        })
}

function deletar_livro() {

    let id = idLivro
    fetch(url + '/livros/' + id,
        {
            'method': 'DELETE',
            'redirect': 'follow'
        })
        .then((response) => {
            if (response.ok) {
                return response.text()
            }
            else {
                return response.text().then((text) => {
                    throw new Error(text)
                })
            }
        })
        .then((output) => {
            listar_livros()
            console.log(output)
            alert('Livro removido')
        })
        .catch((error) => {
            console.log(error)
            alert('Não foi possível remover o livro')
        })
}
