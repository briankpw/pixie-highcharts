function prefixConversion(value, decimalPoint) {
  return getUnit(value, decimalPoint);
}

function getUnit(number, decimalPoint) {
  let isNegative = false;
  if (number < 0) {
    isNegative = true;
    number = number * -1;
  }
  if (number > 1) {
    return convertPositiveE(number, decimalPoint, isNegative);
  } else {
    return convertNegativeE(number, decimalPoint, isNegative);
  }
}

function convertNegativeE(number, decimalPoint, isNegative) {
  const prefix = ['', 'm', 'µ', 'n', 'p', 'f', 'a', 'z', 'y'];
  let ii = 0;
  const k = decimalPoint === undefined ? 1 : decimalPoint;
  let convertNumber = 0;

  let currentPow = 1;
  let overflow = true;

  for (let i = 0; i <= 8; i++) {
    const numberPow = number * Math.pow(10, currentPow * 3);
    if (numberPow >= 1000) {
      convertNumber = numberPow;
      ii = i;
      overflow = false;
      break;
    }
    currentPow++;
  }

  if (overflow) {
    return convertToExponential(number, k, isNegative);
  } else {
    if (isNegative) {
      return (-convertNumber / 1000).toFixed(k) + prefix[ii];
    } else {
      return (convertNumber / 1000).toFixed(k) + prefix[ii];
    }
  }
}

function convertPositiveE(number, decimalPoint, isNegative) {
  const prefix = ['', 'k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];
  let ii = 0;
  const k = decimalPoint === undefined ? 1 : decimalPoint;
  let convertNumber = 0;

  let currentPow = 1;
  let overflow = true;
  for (let i = 0; i <= 8; i++) {
    const numberPow = number / Math.pow(10, currentPow * 3);
    if (numberPow < 1) {
      convertNumber = numberPow;
      ii = i;
      overflow = false;
      break;
    }
    currentPow++;
  }

  if (overflow) {
    return convertToExponential(number, k, isNegative);
  } else {
    if (isNegative) {
      return (-convertNumber * 1000).toFixed(k) + prefix[ii];
    } else {
      return (convertNumber * 1000).toFixed(k) + prefix[ii];
    }
  }
}

function convertToExponential(number, decimalPoint, isNegative) {
  const convertNumber = number / 1;
  if (convertNumber === 0) {
    return 0;
  } else if (isNegative) {
    return -convertNumber.toExponential(decimalPoint);
  } else {
    return convertNumber.toExponential(decimalPoint);
  }
}

export { prefixConversion };
