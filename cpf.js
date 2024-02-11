function consultarCPF(cpf) {
    // Verifica se o CPF foi fornecido
    if (!cpf) {
        return "CPF não fornecido.";
    }

    // Realiza a consulta ao serviço de verificação de CPF
    var apiUrl = 'https://api.legitimuz.com/external/kyc/cpf-history?cpf=' + cpf + '&token=176512e3-43e6-479a-8dd8-fd58fa8acb8d';
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.dados) {
                // Formata os dados da consulta
                var resultado = "RESULTADO DA CONSULTA\n\n";
                resultado += "CPF: " + data.dados.cpf + "\n";
                resultado += "Nome Completo: " + data.dados.nome + "\n";
                resultado += "Nome da Mãe: " + data.dados.nome_mae + "\n";
                resultado += "Gênero: " + data.dados.genero + "\n";
                resultado += "Nascimento: " + data.dados.data_nascimento + "\n";
                resultado += "Idade: " + data.dados.idade + "\n";
                resultado += "Signo: " + data.dados.signo + "\n";
                resultado += "Nacionalidade: " + data.dados.nacionalidade + "\n";
                resultado += "Situação: " + data.dados.outros_campos.situacao + "\n";
                resultado += "Origem: " + data.dados.outros_campos.origem + "\n";
                resultado += "Estado: " + data.dados.outros_campos.uf_cpf + "\n";
                resultado += "Nome Exclusivo: " + data.dados.outros_campos.exclusive_name + "\n";
                resultado += "Horário: " + new Date().toLocaleString() + "\n";

                // Exibe o resultado na página
                document.getElementById("resultado").innerText = resultado;

                // Lista os arquivos .txt e baixa o próximo numerado
                listarArquivosTxt();
            } else {
                document.getElementById("resultado").innerText = "CPF não encontrado na base de dados.";
            }
        })
        .catch(error => {
            document.getElementById("resultado").innerText = "Erro ao consultar o CPF: " + error;
        });
}

function listarArquivosTxt() {
    var listaTxt = [];
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "pasta/dos/arquivos/", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var files = xhr.responseText.split("\n");
            for (var i = 0; i < files.length; i++) {
                if (files[i].endsWith(".txt")) {
                    listaTxt.push(files[i]);
                }
            }
            console.log(listaTxt);
            baixarArquivo(listaTxt.length + 1); // Incrementa o número de downloads
        }
    };
    xhr.send();
}

function baixarArquivo(numero) {
    // Simula o download do arquivo
    var link = document.createElement('a');
    link.setAttribute('download', numero + '.txt');
    link.setAttribute('href', 'pasta/dos/arquivos/' + numero + '.txt');
    link.click();
}

