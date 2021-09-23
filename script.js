//controle de interface 
let seuVotoPara = document.querySelector('.d-1-1 span');

let cargo = document.querySelector('.d-1-2 span');

let descricao = document.querySelector('.d-1-4');

let aviso = document.querySelector('.d-2');

let lateral = document.querySelector('.d-1-right');

let numeros = document.querySelector('.d-1-3');


let etapaAtual = 0;
let numeroAtual ='';
let votoBranco = false;
let votos = [];


function comecarEtapa () {
    let etapa = etapas[etapaAtual];
    
    let numeroHtml = '';
    numeroAtual = '';
    votoBranco = false;

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
            if (candidato.fotos[i].small){
            fotosHtml += `<div class="d-1-image small"><img src="/urna/img/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`;
            } else {
                fotosHtml += `<div class="d-1-image"><img src="/urna/img/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`;
            }
        }

        lateral.innerHTML = fotosHtml;
    } else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso--nulo pisca">VOTO NULO</div>'

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
        votoBranco = true;
        numeroAtual = ''
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        descricao.innerHTML = '<div class="aviso--branco pisca">VOTO EM BRANCO</div>'
        lateral.innerHTML = '';
}

function corrige() {
   comecarEtapa(); 
}

function confirma() {
    let etapa = etapas[etapaAtual];
    let votoConfirmado = false;

    if(votoBranco === true) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto:'Branco'
        })
    } else if(numeroAtual.length === etapa.numero) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numeroAtual
        })
    }

    if (votoConfirmado) {
        etapaAtual++;
        if (etapas[etapaAtual] !== undefined) {
            comecarEtapa();
        } else {
            document.querySelector('.tela').innerHTML = '<div class="aviso--grande pisca">FIM</div>'
            console.log(votos);
        }
    }
}



comecarEtapa();