document.querySelector('#juego').onclick= comenzarJuego;
let cantidadIntentos=0;
let cantidadIntentosFallidos=0;
let cont=0;
let listaClick=[];
let par=0;
const lista=generarOrden();
const $reloj=document.querySelector('#reloj');
let cronometro;
const $intentos=document.querySelector('#intentos');
const $intentosErroneos=document.querySelector('#intentos-erroneos');

function comenzarJuego(){
    correrTiempo();
    habilitarInput();
    ocultarboton();
    mostrarCartas();
}

function correrTiempo(){
    let segundos=0;
    let minutos=0;
    let horas=0;
    cronometro=setInterval(function(){
    segundos++;
    if (segundos===60){
        segundos=0;
        minutos++;
    }
    if (minutos===60){
        minutos=0;
        horas++;
    }
    $reloj.innerHTML= horas + ':' + minutos + ':' + segundos;
    },1000);
};

function detenerse(){
    clearInterval(cronometro);
};

function habilitarInput(){
    document.querySelectorAll('.img-thumbnail').forEach(function($figura){
        $figura.onclick=mostrarCarta;
    });
};

function ocultarboton(){
    document.querySelector('#boton').className="visually-hidden";
}

function mostrarCartas(){
    document.querySelector('#cartas').className="container-sm";
}

function generarOrden(){
    const orden=[];
    for (let i=0; i<16; i++){
        orden.push(Math.ceil(Math.random()*16));
           while ((orden[i]===orden[i-1]) || (orden[i]===orden[i-2]) || (orden[i]===orden[i-3]) || (orden[i]=== orden[i-4])|| (orden[i]=== orden[i-5]) || (orden[i]=== orden[i-6]) || (orden[i]===orden[i-7]) || (orden[i]===orden[i-8]) || (orden[i]===orden[i-9]) || (orden[i]===orden[i-10]) || (orden[i]===orden[i-11]) || (orden[i]===orden[i-12]) || (orden[i]===orden[i-13]) || (orden[i]===orden[i-14]) || (orden[i]===orden[i-15]) || (orden[i]===orden[i-16])){ 
                orden[i]=(Math.ceil(Math.random()*16));
            }
    }
return orden;
}


function mostrarCarta(e){
    cont++;
    let $elemento=e.target;
    let value=$elemento.id;
    let v=lista[value];
    $elemento.setAttribute('src',`./img/gato${v}.jpg`);
    listaClick.push(v);
    if (cont===2){
        chequearJugada(listaClick);
        cantidadIntentos++;
        $intentos.textContent= cantidadIntentos;
        cont=0;
        listaClick=[];
    }
    setTimeout(function(){
        ganaJuego(par);
    },1000);
};

function chequearJugada(list){
        if (list[1] === (list[0]-8)){
            setTimeout(function(){
                borrarCartas(list);
            },500);
            par++;
        }
        if (list[1] === (list[0]+8)){
            setTimeout(function(){
                borrarCartas(list);
            },500);
            par++;
        }
        else {
            setTimeout(function(){
                ocultarCartas(list);
            },500);
            cantidadIntentosFallidos++;
            $intentosErroneos.textContent= cantidadIntentosFallidos;
        }
}

function ocultarCartas(list){
    for (let i=0; i<2; i++){
        let id=lista.indexOf(list[i]);
        let $elemento=document.getElementById(`${id}`);
        $elemento.setAttribute('src','./img/gato.jpg');
    };
};

function borrarCartas(list){
    for (let i=0; i<2; i++){
        let id=lista.indexOf(list[i]);
        let $elemento=document.getElementById(`${id}`);
        $elemento.className='visually-hidden';
    };
};

function ganaJuego(par){
    if (par===8){
        const $cartel=document.querySelector('#cartel');
        $cartel.className='';
        detenerse();
    }
};

