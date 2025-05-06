// Array para armazenar os alunos
const alunos = [];

// Elementos do DOM
const listaAlunos = document.getElementById('listaAlunos');
const jsonAlunos = document.getElementById('jsonAlunos');
const btnVisualizarLista = document.getElementById('btnVisualizarLista');
const btnVisualizarJSON = document.getElementById('btnVisualizarJSON');
const btnExportarJSON = document.getElementById('btnExportarJSON');

// Função para criar um objeto Aluno
function criarAluno(nome, idade, curso) {
    return {
        nome: nome,
        idade: idade,
        curso: curso,
        dataCadastro: new Date().toISOString()
    };
}

// Função para adicionar aluno ao array e atualizar a lista
function adicionarAluno(event) {
    event.preventDefault();
    
    // Obter valores do formulário
    const nome = document.getElementById('nome').value;
    const idade = parseInt(document.getElementById('idade').value);
    const curso = document.getElementById('curso').value;
    
    // Criar objeto aluno
    const novoAluno = criarAluno(nome, idade, curso);
    
    // Adicionar ao array
    alunos.push(novoAluno);
    
    // Atualizar a exibição
    if (!jsonAlunos.classList.contains('hidden')) {
        atualizarJSONAlunos();
    } else {
        atualizarListaAlunos();
    }
    
    // Limpar o formulário
    document.getElementById('formAluno').reset();
}

// Função para atualizar a lista de alunos no HTML
function atualizarListaAlunos() {
    // Verificar se há alunos cadastrados
    if (alunos.length === 0) {
        listaAlunos.innerHTML = '<p>Nenhum aluno cadastrado ainda.</p>';
        return;
    }
    
    // Criar HTML para cada aluno
    let html = '';
    alunos.forEach(aluno => {
        html += `
            <div class="aluno-card">
                <p><strong>Nome:</strong> ${aluno.nome}</p>
                <p><strong>Idade:</strong> ${aluno.idade}</p>
                <p><strong>Curso:</strong> ${aluno.curso}</p>
                <p><strong>Data de Cadastro:</strong> ${new Date(aluno.dataCadastro).toLocaleString()}</p>
            </div>
        `;
    });
    
    // Inserir no DOM
    listaAlunos.innerHTML = html;
}

// Função para atualizar a visualização JSON
function atualizarJSONAlunos() {
    jsonAlunos.textContent = JSON.stringify(alunos, null, 2);
}

// Função para exportar JSON
function exportarJSON() {
    const dataStr = JSON.stringify(alunos, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `alunos_${new Date().toISOString().slice(0, 10)}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}

// Event Listeners
document.getElementById('formAluno').addEventListener('submit', adicionarAluno);
btnVisualizarLista.addEventListener('click', () => {
    listaAlunos.classList.remove('hidden');
    jsonAlunos.classList.add('hidden');
    atualizarListaAlunos();
});
btnVisualizarJSON.addEventListener('click', () => {
    listaAlunos.classList.add('hidden');
    jsonAlunos.classList.remove('hidden');
    atualizarJSONAlunos();
});
btnExportarJSON.addEventListener('click', exportarJSON);

// Inicializar a lista
atualizarListaAlunos();
jsonAlunos.classList.add('hidden');