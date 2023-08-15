interface Contato {
    nome: string;
    fone: string;
}

let contatos: Contato[] = [];
let editandoIndice: number | null = null;

document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('contactForm') as HTMLFormElement;
    formulario.onsubmit = handleFormSubmit;
});

function handleFormSubmit(evento: Event): void {
    evento.preventDefault();

    const nomeInput = document.getElementById('nameInput') as HTMLInputElement;
    const foneInput = document.getElementById('phoneInput') as HTMLInputElement;

    const contato: Contato = {
        nome: nomeInput.value,
        fone: foneInput.value
    };

    if (editandoIndice !== null) {
        contatos[editandoIndice] = contato;
        editandoIndice = null;
        (document.getElementById('formButton') as HTMLButtonElement).textContent = "Adicionar";
    } else {
        contatos.push(contato);
    }

    renderContacts();
    clearForm();
}

function renderContacts(): void {
    const corpoDaTabela = document.querySelector("#contactsTable tbody") as HTMLTableElement;
    corpoDaTabela.innerHTML = '';

    contatos.forEach((contato, indice) => {
        const linhaDaTabela = corpoDaTabela.insertRow();

        linhaDaTabela.insertCell().textContent = contato.nome;
        linhaDaTabela.insertCell().textContent = contato.fone;

        const botaoEditar = document.createElement('button');
        botaoEditar.textContent = 'Editar';
        botaoEditar.onclick = () => setContactToEdit(indice);
        linhaDaTabela.insertCell().appendChild(botaoEditar);

        const botaoDeletar = document.createElement('button');
        botaoDeletar.textContent = 'Excluir';
        botaoDeletar.onclick = () => removeContact(indice);
        linhaDaTabela.insertCell().appendChild(botaoDeletar);
    });
}

function setContactToEdit(indice: number): void {
    const contato = contatos[indice];
    editandoIndice = indice;

    const inputNome = document.getElementById('nameInput') as HTMLInputElement;
    const inputFone = document.getElementById('phoneInput') as HTMLInputElement;

    inputNome.value = contato.nome;
    inputFone.value = contato.fone;

    (document.getElementById('formButton') as HTMLButtonElement).textContent = "Salvar";
}

function removeContact(index: number): void {
    contatos.splice(index, 1);
    renderContacts();
}

function clearForm(): void {
    const nameInput = document.getElementById('nameInput') as HTMLInputElement;
    const phoneInput = document.getElementById('phoneInput') as HTMLInputElement;

    nameInput.value = '';
    phoneInput.value = '';
}
