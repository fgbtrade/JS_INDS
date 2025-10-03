/**
 * Calcula la suma de los divisores propios (aliquot sum) de un número.
 * Los divisores propios son todos los divisores, excluyendo el número mismo.
 * * @param {number} n El número a evaluar.
 * @returns {number} La suma de los divisores propios.
 */
function sumProperDivisors(n) {
    if (n <= 1) {
        return 0; // 1 y 0 no tienen divisores propios relevantes para este cálculo.
    }

    let sum = 1; // 1 siempre es un divisor propio.
    
    // Solo necesitamos verificar hasta la raíz cuadrada de n.
    // Los divisores vienen en pares (i y n/i).
    const limit = Math.sqrt(n); 

    for (let i = 2; i <= limit; i++) {
        if (n % i === 0) {
            sum += i; // Agrega el divisor i
            
            const otherDivisor = n / i;
            
            // Agrega el divisor par (n/i), siempre y cuando no sea el mismo número.
            // Esto solo ocurre si n es un cuadrado perfecto (i * i = n).
            if (otherDivisor !== i) {
                sum += otherDivisor;
            }
        }
    }
    return sum;
}

// -------------------------------------------------------------

/**
 * Verifica si un número es abundante.
 * Un número es abundante si la suma de sus divisores propios es mayor que el número.
 * * @param {number} n El número a verificar.
 * @returns {boolean} true si es abundante, false en caso contrario.
 */
function isAbundant(n) {
    return sumProperDivisors(n) > n;
}

// -------------------------------------------------------------

/**
 * Encuentra todos los números abundantes en un rango [start, end].
 * * @param {number} start El inicio del rango (incluido).
 * @param {number} end El fin del rango (incluido).
 * @returns {number[]} Un array con todos los números abundantes en el rango.
 */
function findAbundantNumbers(start, end) {
    // Aseguramos que el rango sea válido y empezamos desde el primer número abundante conocido, 12,
    // o el inicio del rango si es mayor.
    const actualStart = Math.max(12, start); 
    const abundantNumbers = [];

    for (let n = actualStart; n <= end; n++) {
        if (isAbundant(n)) {
            abundantNumbers.push(n);
        }
    }

    return abundantNumbers;
}
