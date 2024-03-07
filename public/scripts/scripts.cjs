function calcular(event) {
  event.preventDefault();
  const peso = Number(document.getElementById("peso").value);
  const idade = Number(document.getElementById("idade").value);
  const altura = Number(document.getElementById("altura").value);
  const genero = selecionaGeneroDoUsuario("genero");
  const dados = calcTMB(peso, idade, altura, genero);
  const dadosIMC = calcIMC(peso, altura);

  mostrarResultados(dados, dadosIMC);
}

function mostrarResultados(dados, dadosIMC) {
  document.querySelectorAll(".result-item").forEach((item, index) => {
    item.innerHTML = Math.ceil(dados[0][index]);
  });

  document.querySelectorAll(".result-peso").forEach((item, index) => {
    item.innerHTML = Math.ceil(dados[1][index]);
  });

  document.getElementById("imc").innerHTML = Math.ceil(dadosIMC);
  document.getElementById("imc_classification").innerHTML =
    calcTabelaIMC(dadosIMC);
  document.getElementById("result-data").style.visibility = "visible";
}

function selecionaGeneroDoUsuario(id) {
  const select = document.getElementById(id);
  return select.options[select.selectedIndex].value;
}

/* Function to calculate basal metabolic rate and the level of necessary calories
according to physical activity */
const calcTMB = (weight, age, height, gender) => {
  const unknownGender = gender !== "Masculino" && gender !== "Feminino";
  const invalidProps = weight < 0 || age < 0 || height < 0;

  if (invalidProps || unknownGender) {
    return null;
  }

  const result =
    gender === "Masculino"
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;
  const basal = result;
  const sedentary = 1.2 * result;
  const lightExercise = 1.375 * result;
  const moderate = 1.55 * result;
  const active = 1.725 * result;
  const veryActive = 1.9 * result;
  const gainWeight = result + 450;
  const loseWeight = result - 450;

  const resultData = [
    [basal, sedentary, lightExercise, moderate, active, veryActive],
    [gainWeight, loseWeight],
  ];

  return resultData;
};

const calcIMC = (weight, height) => {
  const isValidWeight = !isNaN(weight) && weight > 0;
  const isValidHeight = !isNaN(height) && height > 0;

  if (!isValidWeight || !isValidHeight) {
    return null;
  }

  const heightInMeters = height / 100;
  const imc = weight / (heightInMeters * heightInMeters);

  return imc.toFixed(2);
};

module.exports = { calcIMC, calcTMB };
