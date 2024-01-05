function calcTabelaIMC(imc) {
  const validationIMCNormal = imc >= 18.5 && imc <= 24.9
  const validationIMCSobrepeso = imc >= 25 && imc <= 29.9
  const validationIMCObesidade1 = imc > 30 && imc <= 34.9
  const validationIMCObesidade2 = imc > 35 && imc <= 39.9

  return imc < 18.5
    ? 'Maigre'
    : validationIMCNormal
    ? 'Normal'
    : validationIMCSobrepeso
    ? 'Surpoids'
    : validationIMCObesidade1
    ? 'Obèse niveau I'
    : validationIMCObesidade2
    ? 'Obèse niveau II'
    : imc > 40
    ? 'Obèse niveau III'
    : ''
}
