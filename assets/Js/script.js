const buscarDados = async () => {
    try{
        const response = await fetch('https://liturgia.up.railway.app/v2/');

        if (!response.ok){
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        const data = await response.json();

        showData({
            titulo: data.leituras.evangelho[0].titulo,
            referencia: data.leituras.evangelho[0].referencia,
            evangelho: data.leituras.evangelho[0].texto,
        })
        console.log(data);

    }catch(erro){
        console.error('Ops! Algo deu errado: ', erro);
    }
}

function showData(data){
    document.getElementById('titulo').innerHTML = `${data.titulo}`;
    document.getElementById('referencia').innerHTML = `${data.referencia}`;
    document.getElementById('text_content').innerHTML = `${data.evangelho}`;
}