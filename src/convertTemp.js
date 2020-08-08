const convertTemp = (() => {
  const celsiusToF = celsius => (Number(celsius) * 1.8 + 32).toFixed(2);
  return { celsiusToF };
}
)();

export default convertTemp;