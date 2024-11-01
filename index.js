
function toggleFrecuencia() {
    const tipoInversion = document.getElementById("tipoInversion").value;
    const frecuenciaGroup = document.getElementById("frecuenciaGroup");
    const resultDiv = document.getElementById("result");
    const tasaInteresLabel = document.getElementById("tasaInteresLabel");

    if (tipoInversion === "unico") {
        frecuenciaGroup.style.display = "none";
        tasaInteresLabel.textContent = "Tasa de interés efectiva (%)";
        resultDiv.innerHTML = "";
    } else {
        frecuenciaGroup.style.display = "block";
        tasaInteresLabel.textContent = "Tasa de interés anual efectiva (%)";
    }
}

function calcularInversion() {
    let tipoInversion = document.getElementById("tipoInversion").value;
    let montoInversion = parseFloat(document.getElementById("montoInversion").value);
    let tasaInteresAnual = parseFloat(document.getElementById("tasaInteresAnual").value) / 100;
    let añosInversion = parseInt(document.getElementById("añosInversion").value);
    let frecuencia = document.getElementById("frecuencia").value;

    if (isNaN(montoInversion) || isNaN(tasaInteresAnual) || isNaN(añosInversion) || montoInversion <= 0 || tasaInteresAnual < 0 || añosInversion <= 0) {
        document.getElementById("result").innerHTML = "Por favor, ingresa valores válidos en todos los campos.";
        return;
    }

    let n;
    let tasaPeriodica;

    if (tipoInversion === "recurrente") {
        switch (frecuencia) {
            case "mensual":
                n = añosInversion * 12;
                tasaPeriodica = Math.pow(1 + tasaInteresAnual, 1 / 12) - 1;
                break;
            case "trimestral":
                n = añosInversion * 4;
                tasaPeriodica = Math.pow(1 + tasaInteresAnual, 1 / 4) - 1;
                break;
            case "semestral":
                n = añosInversion * 2;
                tasaPeriodica = Math.pow(1 + tasaInteresAnual, 1 / 2) - 1;
                break;
            case "anual":
                n = añosInversion;
                tasaPeriodica = tasaInteresAnual;
                break;
        }
        valorFuturo = montoInversion * ((Math.pow(1 + tasaPeriodica, n) - 1) / tasaPeriodica);
    } else if (tipoInversion === "unico") {
        n = añosInversion;
        tasaPeriodica = tasaInteresAnual;
        valorFuturo = montoInversion * Math.pow(1 + tasaPeriodica, n);
    }

    document.getElementById("result").innerHTML = `El monto acumulado al final del periodo es: ${valorFuturo.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}`;
}

toggleFrecuencia();
