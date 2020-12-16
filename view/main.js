const msg = document.querySelector("#mensagem");
const xhr = new XMLHttpRequest();
const tableVeiculos = document.querySelector("#veiculos");
const urlVeiculos = "http://localhost/estacionamento/src/controll/routes/route.veiculos.php?id=0";

function carregaVeiculos() {
    /*alert("SEJA BEM VINDO");*/
    fetch(urlVeiculos)
        .then(function (resp) {
            //Obtem a resposta da URL no formato JSON
            if (!resp.ok)
                throw new Error("Erro ao executar requisição: " + resp.status);
            return resp.json();
        })
        .then(function (data) {
            //Se obteve a resposta explora os dados recebidos
            data.forEach((val) => {
                let row = document.createElement("tr");
                row.innerHTML = `<tr><td>${val.id}</td>`;
                row.innerHTML += `<td>${val.tipo}</td>`;
                row.innerHTML += `<td>${val.placa}</td>`;
                row.innerHTML += `<td>${val.entrada}</td>`;
                row.innerHTML += `<td>${val.saida}</td>`;
                row.innerHTML += `<td>${val.valor}</td>`;
                row.innerHTML += `<td>${val.data_veiculos}</td>`;
                row.innerHTML += `<td>${val.valortotal}</td>`;
                row.innerHTML += `<td style="padding:3px"><button onclick='editVeiculos(this)'> Edit </button> <button onclick='delVeiculos(this)'>Del</button></td></tr>`;
                tableVeiculos.appendChild(row);
            });
        }) //Se obteve erro no processo exibe no console do navegador
        .catch(function (error) {
            console.error(error.message);
        });
}


/*-------------------------------CRIAR VEICULOS--------------------------------------*/
function criaVeiculos() {

  /*  alert("Entrou no método!!!");*/

    let url = "http://localhost/estacionamento/src/controll/routes/route.veiculos.php";
    let tipo = document.querySelector("#tipo");
    let placa = document.querySelector("#placa");
    let entrada = document.querySelector("#entrada");
    let saida = document.querySelector("#saida");
    let valor = document.querySelector("#valor");
    let data_veiculos = document.querySelector("#data_veiculos");
    if (tipo.value != "" && placa.value != "" && entrada.value != "" && saida.value != "" && valor.value != "" && data_veiculos.value != "") {
        let dados = new FormData();
        dados.append("tipo", tipo.value);
        dados.append("placa", placa.value);
        dados.append("entrada", entrada.value);
        dados.append("saida", saida.value);
        dados.append("valor", valor.value);
        dados.append("data_veiculos", data_veiculos.value);
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                let resp = JSON.parse(this.responseText);
                if (resp.hasOwnProperty("erro")) {
                    msg.innerHTML = resp.erro;
                } else {
                    msg.innerHTML = "Veículo Registrado com sucesso.";
                }
                setTimeout(() => { window.location.reload(); }, 3000);
            }
        });
        xhr.open("POST", url);
        xhr.send(dados);
    } else {
        msg.innerHTML = "Favor preencher todos os campos.";
        setTimeout(() => { msg.innerHTML = ""; }, 3000);
    }
}


/*----------------------------EDITAR VEÍCULOS---------------------------------------*/
function editVeiculos(p) {
    p.parentNode.parentNode.cells[1].setAttribute("contentEditable", "true");
    p.parentNode.parentNode.cells[2].setAttribute("contentEditable", "true");
    p.parentNode.parentNode.cells[3].setAttribute("contentEditable", "true");
    p.parentNode.parentNode.cells[4].setAttribute("contentEditable", "true");
    p.parentNode.parentNode.cells[5].setAttribute("contentEditable", "true");
    p.parentNode.parentNode.cells[6].setAttribute("contentEditable", "true");
    p.parentNode.parentNode.cells[7].innerHTML = "<button onclick='putVeiculos(this)'>Enviar</button>";
}

function putVeiculos(p) {
    let url = "http://localhost/estacionamento/src/controll/routes/route.veiculos.php";
    let id = p.parentNode.parentNode.cells[0].innerHTML;
    let tipo = p.parentNode.parentNode.cells[1].innerHTML;
    let placa = p.parentNode.parentNode.cells[2].innerHTML;
    let entrada = p.parentNode.parentNode.cells[3].innerHTML;
    let saida = p.parentNode.parentNode.cells[4].innerHTML;
    let valor = p.parentNode.parentNode.cells[5].innerHTML;
    let data_veiculos = p.parentNode.parentNode.cells[6].innerHTML;

    let dados = "id=" + id;
    dados += "&tipo=" + tipo;
    dados += "&placa=" + placa;
    dados += "&entrada=" + entrada;
    dados += "&saida=" + saida;
    dados += "&valor=" + valor;
    dados += "&data_veiculos=" + data_veiculos;
    if (window.confirm("Confirma Alteração dos dados?")) {
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                let resp = JSON.parse(this.responseText);
                if (resp.hasOwnProperty("erro")) {
                    msg.innerHTML = resp.erro;
                } else {
                    msg.innerHTML = "Veículo alterado com sucesso.";
                }
                setTimeout(() => { window.location.reload(); }, 3000);
            }
        });
        xhr.open("PUT", url);
        xhr.send(dados);
    }
}

function delVeiculos(p) {
    let url = "http://localhost/estacionamento/src/controll/routes/route.veiculos.php";
    let id = p.parentNode.parentNode.cells[0].innerText;
    let dados = "id=" + id;
    if (window.confirm("Confirma Exclusão do id " + id + "?")) {
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                let resp = JSON.parse(this.responseText);
                if (resp.hasOwnProperty("erro")) {
                    msg.innerHTML = resp.erro;
                } else {
                    msg.innerHTML = "Veículo excluído com sucesso.";
                }
                setTimeout(() => { window.location.reload(); }, 3000);
            }
        });
        xhr.open("DELETE", url);
        xhr.send(dados);
    }
}