const alunos = [];

const listaAlunos = document.getElementById('listaAlunos');
const jsonAlunos = document.getElementById('jsonAlunos');
const btnVisualizarLista = document.getElementById('btnVisualizarLista');
const btnVisualizarJSON = document.getElementById('btnVisualizarJSON');
const btnExportarJSON = document.getElementById('btnExportarJSON');


function criarAluno(nome, idade, curso) {
    return {
        nome: nome,
        idade: idade,
        curso: curso,
        dataCadastro: new Date().toISOString()
    };
}


function adicionarAluno(event) {
    event.preventDefault();
    
   
    const nome = document.getElementById('nome').value;
    const idade = parseInt(document.getElementById('idade').value);
    const curso = document.getElementById('curso').value;
    
  
    const novoAluno = criarAluno(nome, idade, curso);
    

    alunos.push(novoAluno);
    
    if (!jsonAlunos.classList.contains('hidden')) {
        atualizarJSONAlunos();
    } else {
        atualizarListaAlunos();
    }
    
    document.getElementById('formAluno').reset();
}
function atualizarListaAlunos() {
    // Verificar se há alunos cadastrados
    if (alunos.length === 0) {
        listaAlunos.innerHTML = '<p>Nenhum aluno cadastrado ainda.</p>';
        return;
    }
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
    
    listaAlunos.innerHTML = html;
}

function atualizarJSONAlunos() {
    jsonAlunos.textContent = JSON.stringify(alunos, null, 2);
}

function exportarJSON() {
    const dataStr = JSON.stringify(alunos, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `alunos_${new Date().toISOString().slice(0, 10)}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}

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
atualizarListaAlunos();
jsonAlunos.classList.add('hidden');
