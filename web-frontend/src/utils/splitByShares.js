const distributeByShares = function (precision, numerator, shares) {
  const arr = [];
  let i = 0;
  let numOfShares = shares.reduce((a, b) => a + b);
  while (i < shares.length) {
    if (shares[i] === 0) {
      arr.push(0);
      i++;
    } else {
      const shareVal = numerator / numOfShares;
      let amount =
        Math.round(shareVal * shares[i] * Math.pow(10, precision)) /
        Math.pow(10, precision);
      arr.push(amount);
      numerator -= amount;
      numOfShares -= shares[i];
      i++;
    }
  }
  return arr;
};

export default distributeByShares;
