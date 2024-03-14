//Variables
const card = document.querySelectorAll('.card');
const iniciar = document.querySelector('.start');
const timeGame = document.querySelector('#contador-cronometro');
const estadisticas = document.querySelector('#contador-estadisticas');
const aciertos = document.querySelector('#contador-aciertos');
let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];

//convertir el array en numeros aleatorios
numeros = numeros.sort(() => {
	return Math.random() - 0.5;
});

//Declaración de variables para la funionabilidad de la tarjeta
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let resultado1 = null;
let resultado2 = null;
let movimientos = 0;
let correctas = 0;
let time = 80;
let timeInicial = time;

//events
//para iniciar el documento bloquado
document.addEventListener('DOMContentLoaded', () => {
	iniciarApp();
});

//para iniciar el contador una vez activado el boton jugar
iniciar.addEventListener('click', () => {
	cronometro();
});

//functions
//funcion para destapar la tarjeta
function destapar(id) {
	tarjetasDestapadas++;
	console.log(tarjetasDestapadas);
	if (tarjetasDestapadas == 1) {
		//Mostrar primer número
		tarjeta1 = document.getElementById(id);
		resultado1 = numeros[id];
		tarjeta1.innerHTML = resultado1;

		//disabled primer boton
		tarjeta1.disabled = true;
	} else if (tarjetasDestapadas == 2) {
		//Mostrar segundo numero
		tarjeta2 = document.getElementById(id);
		resultado2 = numeros[id];
		tarjeta2.innerHTML = resultado2;

		//disabled primer boton
		tarjeta2.disabled = true;

		//incrementar movimientos
		movimientos++;
		estadisticas.innerHTML = movimientos;
		if (resultado1 == resultado2) {
			tarjetasDestapadas = 0;

			//aumentar aciertos
			correctas++;
			aciertos.innerHTML = correctas;
			if (correctas == 8) {
				aciertos.innerHTML = `${correctas} 🔥`;
				estadisticas.innerHTML = `${movimientos} 🤟🏼🤯`;
				setTimeout(() => {
					alert(
						`Felicidades Has Ganado!🎊🎉 solo te demoraste ${
							timeInicial - time
						}`
					);
					location.reload();
				}, 500);
			}
		} else {
			//mostrar momentaneamente valores y volver a tapar
			setTimeout(() => {
				tarjeta1.innerHTML = ' ';
				tarjeta2.innerHTML = ' ';
				tarjeta1.disabled = false;
				tarjeta2.disabled = false;
				tarjetasDestapadas = 0;
			}, 800);
		}
	}
}

//iniciar la app bloqueada las tarjetas
function iniciarApp() {
	card.forEach((ini) => {
		ini.disabled = true;
	});
}

//activar la tarjeta una vez activar el boton jugar
function activeCards() {
	card.forEach((ini) => {
		ini.disabled = false;
	});
}

//Hacer el cronometro regresivo de 80s para iniciar el juego
function cronometro() {
	activeCards();
	iniciar.disabled = true;
	iniciar.classList.add('disabled');
	const contador = setInterval(() => {
		time--;
		timeGame.innerHTML = `${time} segundo`;
		if (time == 0) {
			clearInterval(contador);
			alert('Se ha terminado el tiempo!');
			location.reload();
		}
	}, 1000);
}
