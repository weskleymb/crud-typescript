var contatos = [];
var editandoIndice = null;
document.addEventListener('DOMContentLoaded', function () {
    var formulario = document.getElementById('contactForm');
    formulario.onsubmit = handleFormSubmit;
});
function handleFormSubmit(evento) {
    evento.preventDefault();
    var nomeInput = document.getElementById('nameInput');
    var foneInput = document.getElementById('phoneInput');
    var contato = {
        nome: nomeInput.value,
        fone: foneInput.value
    };
    if (editandoIndice !== null) {
        contatos[editandoIndice] = contato;
        editandoIndice = null;
        document.getElementById('formButton').textContent = "Adicionar";
    }
    else {
        contatos.push(contato);
    }
    renderContacts();
    clearForm();
}
function renderContacts() {
    var corpoDaTabela = document.querySelector("#contactsTable tbody");
    corpoDaTabela.innerHTML = '';
    contatos.forEach(function (contato, indice) {
        var linhaDaTabela = corpoDaTabela.insertRow();
        linhaDaTabela.insertCell().textContent = contato.nome;
        linhaDaTabela.insertCell().textContent = contato.fone;
        var botaoEditar = document.createElement('button');
        botaoEditar.textContent = 'Editar';
        botaoEditar.onclick = function () { return setContactToEdit(indice); };
        linhaDaTabela.insertCell().appendChild(botaoEditar);
        var botaoDeletar = document.createElement('button');
        botaoDeletar.textContent = 'Excluir';
        botaoDeletar.onclick = function () { return removeContact(indice); };
        linhaDaTabela.insertCell().appendChild(botaoDeletar);
    });
}
function setContactToEdit(indice) {
    var contato = contatos[indice];
    editandoIndice = indice;
    var inputNome = document.getElementById('nameInput');
    var inputFone = document.getElementById('phoneInput');
    inputNome.value = contato.nome;
    inputFone.value = contato.fone;
    document.getElementById('formButton').textContent = "Salvar";
}
function removeContact(index) {
    contatos.splice(index, 1);
    renderContacts();
}
function clearForm() {
    var nameInput = document.getElementById('nameInput');
    var phoneInput = document.getElementById('phoneInput');
    nameInput.value = '';
    phoneInput.value = '';
}
