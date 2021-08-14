document.querySelector('#juego').onclick= comenzarJuego;
let cantidadIntentos=0;
let cantidadIntentosFallidos=0;
let contadorClicks=0;
let clasesCartas=[];
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

function detenerTiempo(){
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
           while (orden.indexOf(orden[i])!==i){ 
                orden[i]=(Math.ceil(Math.random()*16));
            }
    }
return orden;
}


function mostrarCarta(e){
    contadorClicks++;
    let $elemento=e.target;
    let value=$elemento.id;
    let v=lista[value];
    $elemento.setAttribute('src',`./img/gato${v}.jpg`);
    clasesCartas.push(v);
    if (contadorClicks===2){
        chequearJugada(clasesCartas);
        cantidadIntentos++;
        $intentos.textContent= cantidadIntentos;
        contadorClicks=0;
        clasesCartas=[];
    }
    setTimeout(function(){
        ganaJuego(par);
    },1000);
};

function chequearJugada(clasesCartas){
        if (clasesCartas[1] === (clasesCartas[0]-8)){
            setTimeout(function(){
                borrarCartas(clasesCartas);
            },500);
            par++;
        }
        if (clasesCartas[1] === (clasesCartas[0]+8)){
            setTimeout(function(){
                borrarCartas(clasesCartas);
            },500);
            par++;
        }
        else {
            setTimeout(function(){
                ocultarCartas(clasesCartas);
            },500);
            cantidadIntentosFallidos++;
            $intentosErroneos.textContent= cantidadIntentosFallidos;
        }
}

function ocultarCartas(clasesCartas){
    for (let i=0; i<2; i++){
        let id=lista.indexOf(clasesCartas[i]);
        let $elemento=document.getElementById(`${id}`);
        $elemento.setAttribute('src','./img/gato.jpg');
    };
};

function borrarCartas(clasesCartas){
    for (let i=0; i<2; i++){
        let id=lista.indexOf(clasesCartas[i]);
        let $elemento=document.getElementById(`${id}`);
        $elemento.className='visually-hidden';
    };
};

function ganaJuego(par){
    if (par===8){
        const $cartel=document.querySelector('#cartel');
        $cartel.className='';
        detenerTiempo();
    }
};

