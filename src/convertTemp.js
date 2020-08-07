const convertTemp = (() => {
  const kelvinToC = kelvin => (Number(kelvin) - 273.15).toFixed(2);
  const kelvinToF = kelvin => (Number(kelvin) * 1.8 - 459.67).toFixed(2);
  return { kelvinToC, kelvinToF };
}
)();

export default convertTemp;