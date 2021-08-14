let cantidadCartas=8;
let orden=[];
for (let i=0; i<cantidadCartas; i++){
    orden.push(Math.ceil(Math.random()*cantidadCartas));
    while (orden.indexOf(orden[i])!==i){
        orden[i]=Math.ceil(Math.random()*cantidadCartas);
    }
} ;
console.log(orden);
