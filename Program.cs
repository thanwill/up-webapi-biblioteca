//criar projeto:
//	dotnet new webabi -minimal -o NomeDoProjeto
//entrar na pasta:
//	cd NomeDoProjeto
//adicionar entity framework no console:
//	dotnet add package Microsoft.EntityFrameworkCore.InMemory --version 6.0
//	dotnet add package Microsoft.EntityFrameworkCore.Sqlite --version 6.0
//	dotnet add package Microsoft.EntityFrameworkCore.Design --version 6.0
//incluir namespace do entity framework:
//	using Microsoft.EntityFrameworkCore;
//antes de rodar o dotnet run pela primeira vez, rodar os seguintes comandos para iniciar a base de dados:
//	dotnet ef migrations add InitialCreate
//	dotnet ef database update

using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Biblioteca;

class Program
{
    static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        
        var connectionString = builder.Configuration.GetConnectionString("Livros") ?? "Data Source=Livros.db";
        builder.Services.AddSqlite<BibliotecaContext>(connectionString);
        var app = builder.Build();

        //listar todos os usuarios
        app.MapGet("/livros", (BibliotecaContext baselivro) => {
            return baselivro.Livros.ToList();
        });
        var lista = (BibliotecaContext baselivro, Livro livro) =>
        {
            baselivro.Livros.Add(livro);
            baselivro.SaveChanges();
            return "Usuário adicionado!";
        };

        //cadastrar usuario
        app.MapPost("/cadastrar",  );

        app.Run();
    }
}