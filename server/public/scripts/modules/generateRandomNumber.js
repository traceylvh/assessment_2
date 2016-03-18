function randomNumber(min, max){
  return Math.floor(Math.random() * (1 + max - min) + min); }


var generateNumber = randomNumber(1, 100);


module.exports = generateNumber;
