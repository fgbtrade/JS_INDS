function limites(arreglo, valor, l) {
  // Comprueba si el valor está fuera de los límites del arreglo.
  if (valor < Math.min(...arreglo) || valor > Math.max(...arreglo)) {
    return null;
  }

  // Encuentra los índices de los elementos que son mayores o iguales
  // que el valor, y los que son menores.
  let isuperior = arreglo.findIndex(elemento => elemento >= valor);
  let iinferior = (isuperior === -1) ? arreglo.length - 1 : isuperior - 1;

  let limits = [];

  // Recorre l veces para obtener los elementos cercanos.
  for (let x = 0; x < l; x++) {
    const superiorIndex = isuperior + x;
    const inferiorIndex = iinferior - x;

    // Asegura que los índices estén dentro del rango del arreglo.
    if (superiorIndex < arreglo.length) {
      limits.unshift(arreglo[superiorIndex]);
    }
    
    if (inferiorIndex >= 0) {
      limits.push(arreglo[inferiorIndex]);
    }
  }

  return limits;
}
