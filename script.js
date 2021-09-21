//controle de interface 
let seuVotoPara = document.querySelector('.d-1-1 span');

let cargo = document.querySelector('.d-1-2 span');

let descricao = document.querySelector('.d-1-4');

let aviso = document.querySelector('.d-2');

let lateral = document.querySelector('.d-1-right');

let numeros = document.querySelector('.d-1-3');


let etapaAtual = 0;
let numeroAtual ='';


function comecarEtapa () {
    let etapa = etapas[etapaAtual];
    
    let numeroHtml = '';

    for(let i=0;i<etapa.numero;i++){
        if(i === 0){
            numeroHtml += '<div class="numeros pisca"></div>';
        }else{
            numeroHtml += '<div class="numeros"></div>';
        }
    }


    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}

function atualizarInterface() {
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=> {
        if(item.numero === numeroAtual) {
            return true;
        }else {
            return false;
        }
    })

    if(candidato.length > 0) {
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.name}</br>Partido: ${candidato.partido}`;

        let fotosHtml = '';
        for (let i in candidato.fotos) {
            fotosHtml += `<div class="d-1-image"><img src="/urna/img/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`;
        }

        lateral.innerHTML = fotosHtml;
    }
}


function clicou(n)  {
    let elNumero = document.querySelector('.numeros.pisca');
    if(elNumero !== null){
        elNumero.innerHTML = n;
        numeroAtual = `${numeroAtual}${n}`;

        elNumero.classList.remove('pisca');

        if (elNumero.nextElementSibling !==null){
        elNumero.nextElementSibling.classList.add('pisca');
        }else {
            atualizarInterface();
        }
    };
}

function branco() {
    alert('clicou em branco!');
}

function corrige() {
    alert('clicou em corrige!');  
}

function confirma() {
    alert('clicou em confirma!');
}



comecarEtapa();