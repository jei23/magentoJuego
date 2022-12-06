// inicializacion de variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResulatdo = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let Temporizador = false;
let timerInicial = 45;
let time = 45;
let tiempoRegresivo = null;

//audio
let winAudio = new Audio('./sounds/sound.wav');
let loseAudio = new Audio('./sounds/sound.1');
let clickAudio = new Audio('./sounds/sound.2');
let rightAudio = new Audio('./sounds/sound.3');
let wrongAudio = new Audio('./sounds/sound.4');


//Apuntando a elemento HTML
let mostrarMovimientos = document.getElementById('movimientos');
let mostrarAcietos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('t-restante')

// generacion de numeros aleatorios
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros = numeros.sort(()=>{return Math.random()-0.5});
console.log(numeros);

//funciones
function contarTiempo(){
  tiempoRegresivo = setInterval(()=>{
    time--;
    mostrarTiempo.innerHTML = `tiempo ${time}seg restantes`;
    if (time == 0){
      clearInterval(tiempoRegresivo);
      bloquearTarjetas();
      loseAudio.play();
    }
  },1000)
} 

//funcion bloqueo de tarjetas
function bloquearTarjetas(){
  for (let i = 0; i<=15; i++){
   let tarjetaBloqueada = document.getElementById(i);
   tarjetaBloqueada.innerHTML = `<img src="./imgs/${numeros[i]}.png" alt="">` ;
   tarjetaBloqueada.disabled = true; 
   
  } 
}


//funcion principal
function destapar(id){

  if (Temporizador == false) {
     contarTiempo();
     Temporizador = true;
  }

  tarjetasDestapadas++;
  console.log(tarjetasDestapadas);
 

  if (tarjetasDestapadas == 1){
  //mostrar primer numero
   tarjeta1 = document.getElementById(id);
   primerResulatdo = numeros[id]
   tarjeta1.innerHTML = `<img src="./imgs/${primerResulatdo}.png" alt="">`;
   clickAudio.play();
  //Desabilitar primer boton
  tarjeta1.disabled = true;
  }else if (tarjetasDestapadas ==2){
    //mostra segundo resultado
    tarjeta2 = document.getElementById(id);
    segundoResultado = numeros[id]
    tarjeta2.innerHTML = `<img src="./imgs/${segundoResultado}.png" alt="">`;

    //Desabilitar segundo boton
    tarjeta2.disabled = true;

    //incrementar movimientos
    movimientos++;
    mostrarMovimientos.innerHTML = `movimiento: ${movimientos}`;

    if (primerResulatdo == segundoResultado) {
      // encender contador tarjetas destapadas
      tarjetasDestapadas = 0;
      aciertos++; 
      mostrarAcietos.innerHTML = `Aciertos: ${aciertos}`;
      rightAudio.play();

      if (aciertos == 8){
        winAudio.play();
        clearInterval(tiempoRegresivo);
        mostrarAcietos.innerHTML = `Aciertos: ${aciertos} DE 8 has completado la ronda`;
        mostrarTiempo.innerHTML = `Genial has terminado la partida en ${timerInicial - time} segundos `
        mostrarMovimientos.innerHTML = `movimiento: ${movimientos}`;
      }

    }else{
      wrongAudio.play();
      setTimeout(()=>{
        tarjeta1.innerHTML = ' ';
        tarjeta2.innerHTML = ' ';
        tarjeta1.disabled = false;
        tarjeta2.disabled = false;
        tarjetasDestapadas = 0;
      },900);
    }
  }
}     

