function verificarCodigo() {
    const codigoInput = document.getElementById('codigoInput').value;
    verificarYRedirigir(codigoInput);
}

function verificarYRedirigir(codigo) {
    const codigos = {
        'YHFR89': 'Andres Sánchez',
        'SM98Y7': 'Sara Merino'
    };

    const nombreUsuario = codigos[codigo];

    if (nombreUsuario) {
        // Almacenar el nombre de usuario en localStorage
        localStorage.setItem('nombreUsuario', nombreUsuario);
        
        // Redirigir a home.html
        window.location.href = 'home.html';
    } else {
        // Código incorrecto, mostrar un mensaje de error
        M.toast({ html: 'Código incorrecto o no existe' });
    }
}


// script.js de home.html
document.addEventListener('DOMContentLoaded', function () {
    // Obtener el nombre del usuario desde localStorage
    const nombreUsuario = localStorage.getItem('nombreUsuario');

    // Verificar si el elemento existe antes de intentar modificarlo
    const nombreUsuarioElement = document.getElementById('nombreUsuario');
    if (nombreUsuarioElement && nombreUsuario) {
        // Mostrar el nombre del usuario en la página
        nombreUsuarioElement.textContent = `Bienvenido, ${nombreUsuario}!`;
    }
});

document.addEventListener('DOMContentLoaded', function () {
    M.AutoInit();
});


$(document).ready(function () {
    $('.fixed-action-btn').floatingActionButton();
});


// Codigo
// script.js

function generateBarcode() {
    // Obtener el valor del input
    var inputValue = document.getElementById("inputValue").value;

    // Verificar si se ingresó un valor
    if (inputValue) {
        // Generar el código de barras con el valor del input
        JsBarcode("#barcode", inputValue, {
            format: "CODE128",
            displayValue: false,
        });
    } else {
        alert("Por favor, ingrese un valor antes de generar el código de barras.");
    }
}

function downloadBarcode() {
    // Obtener el valor del input
    var inputValue = document.getElementById("inputValue").value;

    // Verificar si se ingresó un valor
    if (inputValue) {
        // Obtener el contenido SVG como cadena
        var svgContent = new XMLSerializer().serializeToString(document.getElementById("barcode"));

        // Crear un enlace temporal para descargar el archivo SVG
        var blob = new Blob([svgContent], { type: "image/svg+xml" });
        var link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "barcode_" + inputValue + ".svg";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        alert("Por favor, genere un código de barras antes de intentar descargarlo.");
    }
}


// geenerar 



function generarCodigo() {
    var opcion = $('input[name="opcion"]:checked').val();

    if (opcion === "manual") {
        // Obtener el valor del input
        var inputValue = document.getElementById("inputValue").value;

        // Verificar si se ingresó un valor
        if (inputValue) {
            // Mostrar el código ingresado
            $('#codigoGenerado').text('Código ingresado: ' + inputValue);
        } else {
            alert("Por favor, ingrese un valor antes de generar el código.");
        }
    } else {
        // Generar automáticamente
        var tipo = $('#tipo').val();
        var color = $('#color').val();
        var talla = $('#talla').val();

        // Generar un número aleatorio no repetido
        var aleatorio = generarAleatorioNoRepetido();

        // Generar el código
        var codigo = tipo + '-' + color + '-' + talla + '-' + aleatorio;

        // Mostrar el código generado
        $('#codigoGenerado').text('Código generado: ' + codigo);

        // Colocar el código en el input
        $('#inputValue').val(codigo);

        // Generar el código de barras
        generateBarcode();
    }
}

function generarAleatorioNoRepetido() {
    // Generar un número aleatorio no repetido entre 100 y 999
    var aleatorio = Math.floor(Math.random() * 900) + 100;
    return aleatorio;
}

// Inicializar los elementos de Materialize
document.addEventListener('DOMContentLoaded', function () {
    M.AutoInit();
});

// Imprimir
function imprimirCodigoBarras() {
    // Seleccionar el elemento <svg> por su ID
    var codigoBarrasSvg = document.getElementById("barcode");

    // Crear una nueva ventana
    var ventanaImpresion = window.open('', '_blank');

    // Agregar el código de barras al contenido de la ventana
    var codigoBarras = codigoBarrasSvg.outerHTML;
    ventanaImpresion.document.write('<html><head><title>Código de Barras</title></head><body>' + codigoBarras + '</body></html>');

    // Imprimir y cerrar la ventana
    ventanaImpresion.print();
}

// Escaner
// When scan is successful function will produce data
function onScanSuccess(barcodeMessage) {
    document.getElementById("result").innerHTML =
        '<span class="result">' + barcodeMessage + "</span>";
}

// When scan is unsuccessful function will produce an error message
function onScanError(errorMessage) {
    // Handle Scan Error
}

// Setting up Barcode Scanner properties
var html5BarcodeScanner = new Html5QrcodeScanner("reader", {
    fps: 10,
    qrbox: { width: 250, height: 125 },
    disableFlip: true,
});

// Initialize the scanner
html5BarcodeScanner.render(onScanSuccess, onScanError);