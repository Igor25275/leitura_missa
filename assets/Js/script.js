// funcao que ira carregar os dados diarios de nossa Api
async function carregarDadosDiarios() {
    // EX: 03/05/2026
    const today = new Date().toLocaleDateString('pt-BR') 

    // data da ultima requisiçao
    const lastDate = localStorage.getItem('ultima_requisicao_data');

    // pegar os dados da api salva
    const savedData = localStorage.getItem('api_data');
    
    // faz a verificaçao Se a data da ultima requisiçao e a data de hoje sao iguais E se tem dados salvos no LocalStorage. Se tiver retorna pra mim em Json com os dados da Api
    if (lastDate === today && savedData){
        console.log('Usando dados do cache de hoje.!');
        return JSON.parse(savedData);
    }

    // Caso nao tenha dados salvo faz a quisiçao da api para pegar os dados 

    try {
        const response = await fetch('https://liturgia.up.railway.app/v2/');
        const data = await response.json();

        // salvar os dados da Api no localStorage
        localStorage.setItem('api_data', JSON.stringify(data));
        // salvar a data de hoje , na ultima requisiçao
        localStorage.setItem('ultima_requisicao_data', today);

        console.log('Requisiçao feita com sucesso.!')
        return data;

    } catch (error) {
        console.error('Erro ao buscar dados', error);
    }

}

// guarda dentro das variaveis os elementos
//variaveis globais
const pTitulo = document.getElementById('tittle');
const pReferencia = document.getElementById('reference');
const pTexto = document.getElementById('text_content');

// funcao do botao da primeira leitura 
function btn_first(dadosPrimeiraLeitura){
    // Faz a verificar se os elementos existem realmente
    // Se existirem ele escreve dentro de cada elemento o dado que queremos 
    if (pTitulo && pReferencia && pTexto){
        pTitulo.innerHTML = dadosPrimeiraLeitura.titulo1;
        pReferencia.innerHTML = `(${dadosPrimeiraLeitura.referencia1})`;
        pTexto.innerHTML = dadosPrimeiraLeitura.texto1;
    }
    
}

// funcao do botao do salmo
function btn_Salmo(dadosSalmo){

    if (pTitulo && pReferencia && pTexto){
        pTitulo.innerHTML = dadosSalmo.titulo1;
        pReferencia.innerHTML = `(${dadosSalmo.referencia1})`;
        pTexto.innerHTML = dadosSalmo.texto1;
    }
}

// funcao da segunda leitura
function btn_second(dadosSegundaLeitura){
    if (pTitulo && pReferencia && pTexto){
        pTitulo.innerHTML = dadosSegundaLeitura.titulo1;
        pReferencia.innerHTML = `(${dadosSegundaLeitura.referencia1})`;
        pTexto.innerHTML = dadosSegundaLeitura.texto1;
    }
}

// funcao do evangelho
function btn_evangelho(dadosEvangelho){
    if (pTitulo && pReferencia && pTexto){
        pTitulo.innerHTML = dadosEvangelho.titulo1;
        pReferencia.innerHTML = `(${dadosEvangelho.referencia1})`;
        pTexto.innerHTML = `${dadosEvangelho.texto1} <br><br> - Palavra da Salvaçao.  <br><br> - Glória a vós, Senhor.`;
    }
}



// funçao que ao carregar a pagina , a funcao carregarDadosDiarios() seja chamada.
window.onload = async () => {
    const data = await carregarDadosDiarios();

    console.log(data);

    // Faz a verificar se existem realmete conteudo dentro de cada dado
    if (data && data.leituras && data.leituras.primeiraLeitura && data.leituras.salmo && data.leituras.evangelho){
        const primeira = data.leituras.primeiraLeitura[0];

        const salmo = data.leituras.salmo[0];

        const evangelho = data.leituras.evangelho[0];

        // coloca da data do dia 
        const hoje = document.getElementById('date');
        hoje.innerHTML = data.data;

        // guarda dentro da variavel o elemento do botao
        const btn1 = document.getElementById('btn_leitura-1');
        const btnSalmo = document.getElementById('btn_salmo');
        const btnEvangelho = document.getElementById('btn_evangelho');

        // pendura a funcao btn_first para ser chamada quando eu clicar no botao
        btn1.onclick = () => {
            // colocar dentro da fucao os dados que realmente queremos
            btn_first({
                titulo1: primeira.titulo,
                referencia1: primeira.referencia,
                texto1: primeira.texto,
            });
        }

        // pendura a funcao btn_Salmo para ser chamada quando clicarmos no botao
        btnSalmo.onclick = () => {
            // colocar dentro da fucao os dados que realmente queremos
            btn_Salmo({
                titulo1: salmo.refrao,
                referencia1: salmo.referencia,
                texto1: salmo.texto,
            })
        }

        // pendura a funcao btnEvangelho para ser chamada quando clicarmos no botao
        btnEvangelho.onclick = () => {
            btn_evangelho({
                titulo1: evangelho.titulo,
                referencia1: evangelho.referencia,
                texto1: evangelho.texto,
            })
        }
        
    }

    //verificacao da segunda leitura , pois pode ter e pode nao ter
    if (data && data.leituras && data.leituras.segundaLeitura && data.leituras.segundaLeitura[0]){

        const segunda = data.leituras.segundaLeitura[0];

        const btn2 = document.getElementById('btn_leitura-2');

        btn2.onclick = () => {
            btn_second({
                titulo1: segunda.titulo,
                referencia1: segunda.referencia,
                texto1: segunda.texto,
            })
        }

        // se caso a verificacao nao encontrar dados cai no else , pois nao tera segunda leitura.
    }else{
        document.getElementById('text_content').innerHTML = 'Nao temos segunda leitura hoje!'
    }

}
