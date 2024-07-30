var tablero = document.getElementById('tablero');
var cartasOriginales = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,16,17]; // Números del 1 al 15
var cartas = [];
var parejas = 10; // Solo 10 pares
var primerCarta = null;
var segundaCarta = null;
var intentos = 0;

function crearTablero() {
  tablero.innerHTML = "";
  var numerosSeleccionados = seleccionarNumerosAleatorios(cartasOriginales, parejas);
  cartas = numerosSeleccionados.concat(numerosSeleccionados); // Duplicar los números para formar pares
  cartas = cartas.sort(function() {
    return Math.random() - 0.5;
  });

  cartas.forEach(function(val) {
    var div = document.createElement('div');
    var imagenFondo = document.createElement('img');
    imagenFondo.src = "img-pop/reverso.jpg";
    imagenFondo.className = "tarjeta-fondo";
    div.appendChild(imagenFondo);
    div.className = "tarjetas";
    div.setAttribute('data-id', val);
    tablero.appendChild(div);

    div.addEventListener('click', function(event) {
      var tarjetaClickeada = event.currentTarget;
      var imagenTarjeta = tarjetaClickeada.querySelector('.tarjeta-fondo');
      if (!tarjetaClickeada.classList.contains('abrir') && primerCarta === null) {
        tarjetaClickeada.classList.add('abrir');
        imagenTarjeta.src = "img-pop/" + ("img" + (val)) + ".jpg";
        primerCarta = tarjetaClickeada;
      } else if (!tarjetaClickeada.classList.contains('abrir') && segundaCarta === null) {
        tarjetaClickeada.classList.add('abrir');
        imagenTarjeta.src = "img-pop/" + ("img" + (val)) + ".jpg";
        segundaCarta = tarjetaClickeada;
        desactivarClics();
        verificarPareja();
      }
    });
  });
}

function desactivarClics() {
  var tarjetas = document.querySelectorAll('.tarjetas');
  tarjetas.forEach(function(tarjeta) {
    tarjeta.style.pointerEvents = 'none';
  });
}

function activarClics() {
  var tarjetas = document.querySelectorAll('.tarjetas');
  tarjetas.forEach(function(tarjeta) {
    tarjeta.style.pointerEvents = 'auto';
  });
}

function seleccionarNumerosAleatorios(array, cantidad) {
  var numerosAleatorios = [];
  while (numerosAleatorios.length < cantidad) {
    var numero = array[Math.floor(Math.random() * array.length)];
    if (!numerosAleatorios.includes(numero)) {
      numerosAleatorios.push(numero);
    }
  }
  return numerosAleatorios;
}

function verificarPareja() {
  var idPrimeraCarta = parseInt(primerCarta.getAttribute('data-id'));
  var idSegundaCarta = parseInt(segundaCarta.getAttribute('data-id'));
  if (idPrimeraCarta === idSegundaCarta) {
    parejas--;
    if (parejas === 0) {
      Swal.fire({
        title: "¡Bien hecho!",
        text: "Has ganado el memorama!",
        icon: "success",
        confirmButtonText: "Aceptar",
      }).then((result) => {
        if (result.isConfirmed) {
          activarClics();
        }
      });
    } else {
      activarClics();
    }
    primerCarta = null;
    segundaCarta = null;
  } else {
    setTimeout(function() {
      if (primerCarta !== null && segundaCarta !== null) {
        primerCarta.classList.remove('abrir');
        segundaCarta.classList.remove('abrir');
        var imagenPrimeraCarta = primerCarta.querySelector('.tarjeta-fondo');
        var imagenSegundaCarta = segundaCarta.querySelector('.tarjeta-fondo');
        if (imagenPrimeraCarta !== null && imagenSegundaCarta !== null) {
          imagenPrimeraCarta.src = "img-pop/reverso.jpg";
          imagenSegundaCarta.src = "img-pop/reverso.jpg";
        }
      }
      primerCarta = null;
      segundaCarta = null;
      intentos++;
      actualizarIntentos();
      activarClics();
    }, 800);
  }
}

function actualizarIntentos() {
  var intentosElement = document.getElementById('intentos');
  intentosElement.textContent = "Intentos: " + intentos;
}

crearTablero();

var botonReiniciar = document.getElementById('boton-reiniciar');
botonReiniciar.addEventListener('click', function() {
  intentos = 0;
  actualizarIntentos();
  parejas = 10; // Restaurar el número de parejas
  primerCarta = null;
  segundaCarta = null;
  crearTablero();
});
