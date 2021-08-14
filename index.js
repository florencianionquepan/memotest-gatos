document.querySelector('#juego').onclick= comenzarJuego;
let cantidadIntentos=0;
let cantidadIntentosFallidos=0;
let contadorClicks=0;
let idCartas=[];
let clasesCartas=[];
let par=0;
const cantidadCartas=8;
const lista=generarOrden(cantidadCartas);
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

function generarOrden(cantidadCartas){
    const orden=[];
    const longitud=cantidadCartas*2
    for (let i=0; i<longitud; i++){
        orden.push(Math.ceil(Math.random()*longitud));
           while (orden.indexOf(orden[i])!==i){ 
                orden[i]=(Math.ceil(Math.random()*longitud));
            }
    }
    for (let i=0; i<longitud;i++){
        if (orden[i]>8){
            orden[i]-=8;
        }
    }
return orden;
}


function mostrarCarta(e){
    contadorClicks++;
    let $elemento=e.target;
    let value=$elemento.id;
    idCartas.push(value);
    let v=lista[value];
    $elemento.setAttribute('src',`./img/gato${v}.jpg`);
    clasesCartas.push(v);
    if (contadorClicks===2){
        chequearJugada(clasesCartas,idCartas);
        cantidadIntentos++;
        $intentos.textContent= cantidadIntentos;
        contadorClicks=0;
        clasesCartas=[];
        idCartas=[];
    }
    setTimeout(function(){
        ganaJuego(par);
    },1000);
};

function chequearJugada(clasesCartas,idCartas){
        if (clasesCartas[1] === clasesCartas[0]){
            setTimeout(function(){
                borrarCartas(idCartas);
            },500);
            par++;
        }else{
            setTimeout(function(){
                ocultarCartas(idCartas);
            },500);
            cantidadIntentosFallidos++;
            $intentosErroneos.textContent= cantidadIntentosFallidos;
        };
}

function ocultarCartas(idCartas){
    idCartas.forEach(function(id){
        let $elemento=document.getElementById(id);
        $elemento.setAttribute('src','./img/gato.jpg');
    })
};

function borrarCartas(idCartas){
    idCartas.forEach(function(id){
        let $elemento=document.getElementById(id);
        $elemento.className='visually-hidden';
    })    
};

function ganaJuego(par){
    if (par===8){
        const $cartel=document.querySelector('#cartel');
        $cartel.className='';
        detenerTiempo();
    }
};

