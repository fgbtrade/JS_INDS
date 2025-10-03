function smaExtrema(data, lookback, extremaSensitivity) {
  // Asegurarse de que los datos de entrada sean un array
  if (!Array.isArray(data)) {
    throw new Error("El argumento 'data' debe ser un array de objetos.");
  }
  
  // Agregar nuevas propiedades a cada objeto en el array para almacenar los resultados
  const processedData = data.map(item => ({
    ...item,
    sma_up: null,
    sma_down: null,
    max: null,
    min: null,
    op: null
  }));

  // Calcular las medias móviles (SMA)
  for (let i = extremaSensitivity - 1; i < processedData.length; i++) {
    const highSlice = processedData.slice(i - extremaSensitivity + 1, i + 1).map(item => item.High);
    const lowSlice = processedData.slice(i - extremaSensitivity + 1, i + 1).map(item => item.Low);
    
    const sumHigh = highSlice.reduce((sum, val) => sum + val, 0);
    const sumLow = lowSlice.reduce((sum, val) => sum + val, 0);
    
    processedData[i].sma_up = sumHigh / extremaSensitivity;
    processedData[i].sma_down = sumLow / extremaSensitivity;
  }

  // Buscar extremos locales y marcar puntos de compra/venta
  for (let i = extremaSensitivity; i < processedData.length - 1; i++) {
    const smaUp = processedData[i].sma_up;
    const smaUpPrev = processedData[i - 1].sma_up;
    const smaUpNext = processedData[i + 1].sma_up;
    
    const smaDown = processedData[i].sma_down;
    const smaDownPrev = processedData[i - 1].sma_down;
    const smaDownNext = processedData[i + 1].sma_down;
    
    // Extremo de alza (Punto de venta)
    if (smaUpPrev <= smaUp && smaUp >= smaUpNext) {
      let largest = processedData[i].High;
      let when = i;
      
      for (let j = i - extremaSensitivity; j < i; j++) {
        if (largest <= processedData[j].High) {
          when = j;
          largest = processedData[j].High;
        }
      }
      processedData[when].max = largest;
      processedData[processedData.length - 1].op = "Sell";
    }

    // Extremo de baja (Punto de compra)
    if (smaDownPrev >= smaDown && smaDown <= smaDownNext) {
      let lowest = processedData[i].Low;
      let when = i;
      
      for (let j = i - extremaSensitivity; j < i; j++) {
        if (lowest >= processedData[j].Low) {
          when = j;
          lowest = processedData[j].Low;
        }
      }
      processedData[when].min = lowest;
      processedData[processedData.length - 1].op = "Buy";
    }
  }

  return processedData;
}
