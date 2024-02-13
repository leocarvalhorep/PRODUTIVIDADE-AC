let producoes = [];

// Verifica se existem dados armazenados no Local Storage e os carrega, se houver
if (localStorage.getItem('producoes')) {
  producoes = JSON.parse(localStorage.getItem('producoes'));
  atualizarTotal();
}

function calcularProdutividade() {
  const duration = parseFloat(document.getElementById('duration').value);
  const value = parseFloat(document.getElementById('value').value);
  const produtividade = duration * value;
  document.getElementById('produtividade').textContent = produtividade.toFixed(2);
}

function armazenarProducao() {
  const name = document.getElementById('name').value;
  const code = document.getElementById('code').value;
  const duration = parseFloat(document.getElementById('duration').value);
  const value = parseFloat(document.getElementById('value').value);
  const produtividade = duration * value;
  const data = new Date().toLocaleDateString();
  const producao = { name, code, duration, value, produtividade, data };
  producoes.push(producao);
  console.log('Produção armazenada:', producao);

    // Atualiza o Local Storage com as produções atualizadas
    localStorage.setItem('producoes', JSON.stringify(producoes));
    atualizarTotal();
  
}

function baixarJSON() {
    // Calcula o total de produtividade do mês
    const totalProdutividade = producoes.reduce((acc, producao) => acc + producao.produtividade, 0);
  
    // Cria um objeto que inclui tanto as produções quanto o total de produtividade
    const dadosParaSalvar = {
      producoes: producoes,
      totalProdutividadeDoMes: totalProdutividade
    };
  
    const jsonDados = JSON.stringify(dadosParaSalvar, null, 2); // O argumento `null, 2` é usado para formatar o JSON de forma mais legível
    const blob = new Blob([jsonDados], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'producoes_com_total.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

function calcularTotal() {
  const total = producoes.reduce((acc, prod) => acc + prod.produtividade, 0);
  document.getElementById('total').textContent = total.toFixed(2);
}


function atualizarTotal() {
    const total = producoes.reduce((acc, producao) => acc + producao.produtividade, 0);
    document.getElementById('total').textContent = total.toFixed(2);
  }

  function limparProducoes() {
    // Exibe uma caixa de diálogo de confirmação
    const confirmacao = confirm("Você tem certeza que deseja limpar a lista para iniciar o próximo mês?");
    
    // Se o usuário confirmar, limpa a lista de produções e os inputs
    if (confirmacao) {
      // Limpa o Local Storage
      localStorage.removeItem('producoes');
      
      // Limpa a lista de produções
      producoes = [];
      
      // Limpa os inputs
      limparInputs();
      
      // Atualiza o total
      atualizarTotal();
    }
  }

  function exibirProducoes() {
    const producoesList = document.getElementById('producoesList');
    producoesList.innerHTML = ''; // Limpa a lista antes de exibir os itens
    
    producoes.forEach((producao, index) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${producao.name}</td>
        <td>${producao.code}</td>
        <td>${producao.duration}</td>
        <td>${producao.value}</td>
        <td>${producao.produtividade.toFixed(2)}</td>
        <td>${producao.data}</td>
        <td>
          <button onclick="editarProducao(${index})">Editar</button>
          <button onclick="excluirProducao(${index})">Excluir</button>
        </td>
      `;
      producoesList.appendChild(tr);
    });
  }
  
  function editarProducao(index) {
    const producao = producoes[index];
    // Aqui você pode implementar a lógica para editar os dados da produção
    // Por exemplo, preencher os inputs com os valores da produção selecionada
  }
  
  function excluirProducao(index) {
    const confirmacao = confirm("Você tem certeza que deseja excluir esta produção?");
    if (confirmacao) {
      producoes.splice(index, 1);
      localStorage.setItem('producoes', JSON.stringify(producoes));
      exibirProducoes(); // Atualiza a tabela após excluir a produção
      atualizarTotal();
    }
  }
  
  function limparInputs() {
    document.getElementById('name').value = '';
    document.getElementById('code').value = '';
    document.getElementById('duration').value = '';
    document.getElementById('value').value = '';
    document.getElementById('produtividade').textContent = '0.00';
  }
  