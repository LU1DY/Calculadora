const clear = document.querySelector(".clear");
const valueText = document.querySelector(".value");
const equal = document.querySelector(".equal");
const operations = document.querySelectorAll(".op");
const numbers = document.querySelectorAll(".num");
const percent = document.querySelector(".percent");
const resultBhaskara = document.getElementById("resultBhaskara");
const raiz = document.querySelector(".raiz");
const del = document.querySelector(".del");
const cleanBhaskara = document.getElementById("cleanBhaskara");
const deltaResult = document.getElementById("delta");
const x1Result = document.getElementById("x1");
const x2Result = document.getElementById("x2");
const potencial = document.querySelector(".potenciacao");
const pi = document.querySelector(".pi");
const fatorial = document.querySelector(".fatorial");
const parenteseDir = document.querySelector(".parenteseDir");
const parenteseEsq = document.querySelector(".parenteseEsq");
const point = document.querySelector(".point");
const sum = document.querySelector(".sum");
const sub = document.querySelector(".sub");

// PORCENTAGEM
percent.addEventListener("click", () => {
  const lastChar = valueText.value.charAt(valueText.value.length - 1);
  const lastFiveChar = valueText.value.slice(-5);
  const lastTwoChar = valueText.value.slice(-2);
  if (valueText.value === "") {
    return;
  } else {
    if (!isNaN(lastChar)) {
      valueText.value += "/100*";
    } else if (lastFiveChar === "/100*") {
      valueText.value = valueText.value.slice(0, -5) + "/100*";
    } else if (isNaN(lastChar) && valueText.value.length === 1) {
      return;
    } else if (
      lastTwoChar === "**" ||
      lastTwoChar === "*(" ||
      lastTwoChar === ")*"
    ) {
      valueText.value = valueText.value.slice(0, -2) + "/100*";
    } else {
      valueText.value = valueText.value.slice(0, -1) + "/100*";
    }
  }
});
// BHASKARA
function bhaskara() {
  const a = parseInt(document.getElementById("a").value);
  const b = parseInt(document.getElementById("b").value);
  const c = parseInt(document.getElementById("c").value);
  if (isNaN(a) || isNaN(b) || isNaN(c)) {
    return (deltaResult.textContent = "Adicione apenas números");
  }

  let delta = b ** 2 - 4 * a * c;

  deltaResult.innerText = `Δ: ${delta}`;

  if (delta > 0) {
    let x1 = (-b + Math.sqrt(delta)) / (2 * a);
    let x2 = (-b - Math.sqrt(delta)) / (2 * a);
    x1Result.innerText = `X1: ${x1}`;
    x2Result.innerText = `X2: ${x2}`;
  } else if (delta === 0) {
    let x = -b / (2 * a);
    x1Result.innerText = `X1: ${x}`;
    x2Result.innerText = `X2: ${x}`;
  } else {
    x1Result.innerText = "X1: Não há raízes reais";
    x2Result.innerText = "X2: Não há raízes reais";
  }
}
cleanBhaskara.addEventListener("click", () => {
  const a = document.getElementById("a");
  const b = document.getElementById("b");
  const c = document.getElementById("c");
  a.value = "";
  b.value = "";
  c.value = "";
  x1Result.textContent = "";
  x2Result.textContent = "";
  deltaResult.textContent = "";
});
resultBhaskara.addEventListener("click", bhaskara);

// FUNÇÕES BÁSICAS DA CALCULADORA (LIMPAR INPUT, DELETAR ÚLTIMO CARACTER  E IGUAL)
clear.addEventListener("click", () => {
  valueText.value = "";
});
del.addEventListener("click", () => {
  if (valueText.value !== "") {
    valueText.value = valueText.value.slice(0, -1);
  }
});
equal.addEventListener("click", () => {
  const value = valueText.value;
  const lastChar = value.charAt(value.length - 1);

  if (/[+\-/*]$/.test(lastChar) || value.endsWith("/100*")) {
    error();
    return;
  }
  if (value === "") {
    return;
  }
  try {
    valueText.value = evaluateExpression(value);
  } catch (e) {
    error();
  }
});
function evaluateExpression(expression) {
  return new Function("return " + expression)();
}

// SOMAR
function somar() {
  const lastChar = valueText.value.charAt(valueText.value.length - 1);
  const lastTwoChar = valueText.value.slice(-2);
  const lastFiveChar = valueText.value.slice(-5);
  if (lastChar === "+") {
    return;
  } else if (lastFiveChar === "/100*") {
    valueText.value = valueText.value.slice(0, -5) + "+";
  } else if (lastChar === "(" || lastTwoChar === "(-") {
    valueText.value = valueText.value.slice(0, -2) + "(+";
  } else if (valueText.value === "") {
    valueText.value += "+(";
  } else if (isNaN(lastTwoChar[0]) && isNaN(lastTwoChar[1])) {
    valueText.value = valueText.value.slice(0, -2) + "+";
  } else if (lastChar === "-" || isNaN(lastChar)) {
    valueText.value = valueText.value.slice(0, -1) + "+";
  } else {
    valueText.value += sum.textContent;
  }
}
sum.addEventListener("click", somar);
// SUBTRAIR
function subtrair() {
  const lastChar = valueText.value.charAt(valueText.value.length - 1);
  const lastTwoChar = valueText.value.slice(-2);
  const lastFiveChar = valueText.value.slice(-5);
  if (lastChar === "-") {
    return;
  } else if (lastFiveChar === "/100*") {
    valueText.value = valueText.value.slice(0, -5) + "-";
  } else if (lastChar === "(" || lastTwoChar === "(+") {
    valueText.value = valueText.value.slice(0, -2) + "(-";
  } else if (valueText.value === "") {
    valueText.value += "-(";
  } else if (isNaN(lastTwoChar[0]) && isNaN(lastTwoChar[1])) {
    valueText.value = valueText.value.slice(0, -2) + "-";
  } else if (lastChar === "+" || isNaN(lastChar)) {
    valueText.value = valueText.value.slice(0, -1) + "-";
  } else {
    valueText.value += sub.textContent;
  }
}
sub.addEventListener("click", subtrair);

// ADICIONAR NÚMEROS
function adicionarNumero() {
  valueText.value += this.textContent;
}
numbers.forEach((number) => {
  number.addEventListener("click", adicionarNumero);
});
// ADICIONAR O PONTO (.)
point.addEventListener("click", () => {
  const lastChar = valueText.value.charAt(valueText.value.length - 1);
  const lastTwoChar = valueText.value.slice(-2);
  if (valueText.value === "") {
    return;
  }
  if (lastChar === "." || isNaN(lastChar)) {
    return;
  }
  if (lastTwoChar === ")*") {
    return;
  }
  let lastNumber = valueText.value.split(/[\s+\-*/]+/).pop();
  if (lastNumber.includes(".")) {
    return;
  }
  valueText.value += point.textContent;
});

// ADICIONAR OPERAÇÕES SIMPLES
function adicionarOperacao() {
  const lastChar = valueText.value.charAt(valueText.value.length - 1);
  const lastFiveChar = valueText.value.slice(-5);
  const lastTwoChar = valueText.value.slice(-2);
  if (valueText.value === "") {
    return;
  } else {
    if (!isNaN(lastChar)) {
      valueText.value += this.textContent;
    } else if (isNaN(lastChar) && valueText.value.length === 1) {
      return;
    } else if (lastFiveChar === "/100*") {
      valueText.value = valueText.value.slice(0, -5) + this.textContent;
    } else if (lastTwoChar === ")*") {
      valueText.value = valueText.value.slice(0, -2) + ")" + this.textContent;
    } else if (isNaN(lastTwoChar[0]) && isNaN(lastChar)) {
      valueText.value = valueText.value.slice(0, -2) + this.textContent;
    } else {
      valueText.value = valueText.value.slice(0, -1) + this.textContent;
    }
  }
}
operations.forEach((operation) => {
  operation.addEventListener("click", adicionarOperacao);
});

// EXIBIÇÃO DE ERRO
function error() {
  const container = document.getElementById("container");
  container.style.borderTop = "1px solid rgb(255 0 0 / 20%)";
  container.style.borderLeft = "1px solid rgb(255 0 0 / 25%)";
  container.style.boxShadow = "5px 5px 30px rgb(255 0 0 / 69%)";
  valueText.value = "Formato inválido";
  setTimeout(() => {
    container.style.borderTop = "";
    container.style.borderLeft = "";
    container.style.boxShadow = "";
    valueText.value = "";
  }, 2000);
}

// CALCULAR RAIZ QUADRADA
raiz.addEventListener("click", () => {
  let raizQuadrada = valueText.value;
  const regex = /[/*+-]/;
  if (regex.test(raizQuadrada)) {
    error();
    return;
  }
  raizQuadrada = parseFloat(raizQuadrada);
  if (isNaN(raizQuadrada)) {
    return;
  }
  if (raizQuadrada < 0) {
    error();
    return;
  } else {
    valueText.value = `${Math.sqrt(raizQuadrada).toFixed(1)}`;
  }
});

// CALCULAR POTENCIAÇÃO
potencial.addEventListener("click", () => {
  const lastChar = valueText.value.charAt(valueText.value.length - 1);
  const lastFiveChar = valueText.value.slice(-5);
  const lastTwoChar = valueText.value.slice(-2);
  if (valueText.value === "") {
    return;
  } else {
    if (!isNaN(lastChar)) {
      valueText.value += "**";
    } else if (lastFiveChar === "/100*") {
      valueText.value = valueText.value.slice(0, -5) + "**";
    } else if (isNaN(lastChar) && valueText.value.length === 1) {
      return;
    } else if (lastTwoChar === "**") {
      valueText.value = valueText.value.slice(0, -2) + "**";
    } else {
      valueText.value = valueText.value.slice(0, -1) + "**";
    }
  }
});

// ADICIONAR NÚMERO PI
pi.addEventListener("click", () => {
  const lastChar = valueText.value.charAt(valueText.value.length - 1);
  if (valueText.value === "") {
    valueText.value += 3.14;
  } else if (lastChar === "*") {
    valueText.value = valueText.value.slice(0, -1) + "*3.14";
  } else if (isNaN(lastChar)) {
    valueText.value = valueText.value.slice(0, -1) + lastChar + "3.14";
  } else {
    valueText.value += "* 3.14";
  }
});

// CALCULAR FATORAÇÃO
fatorial.addEventListener("click", () => {
  let n = parseInt(valueText.value, 10);
  function calcularFatorial(num) {
    if (num === 0 || num === 1) {
      return (valueText.value = 1);
    } else {
      let result = num * calcularFatorial(num - 1);
      return (valueText.value = result);
    }
  }
  if (!isNaN(n) && n >= 0) {
    let resultado = calcularFatorial(n);
    valueText.value = resultado;
  } else {
    return;
  }
});

// ADICIONAR PARENTESES A ESQUERDA (ABRIR)
parenteseEsq.addEventListener("click", () => {
  const lastChar = valueText.value.charAt(valueText.value.length - 1);
  const lastFiveChars = valueText.value.slice(-5);
  const lastTwoChars = valueText.value.slice(-2);
  if (valueText.value === "") {
    valueText.value += parenteseEsq.textContent;
    return;
  }
  if (lastFiveChars === "/100*") {
    valueText.value = valueText.value.slice(0, -5) + "*(";
  } else if (lastChar === ".") {
    valueText.value = valueText.value.slice(0, -1) + "*(";
  } else if (isNaN(lastChar)) {
    valueText.value = valueText.value.slice(0, -1) + lastChar + "(";
  } else if (isNaN(lastTwoChars[0]) && isNaN(lastTwoChars[1])) {
    valueText.value = valueText.value.slice(0, -2) + "*(";
  } else if (lastChar === "(") {
    return;
  } else {
    valueText.value += "*(";
  }
});

// ADICIONAR PARENTESES A DIREITA (FECHAR)
parenteseDir.addEventListener("click", () => {
  const lastChar = valueText.value.charAt(valueText.value.length - 1);
  const lastFiveChars = valueText.value.slice(-5);
  const lastTwoChars = valueText.value.slice(-2);
  if (valueText.value === "" || valueText.value.length === 1) {
    return;
  }
  if (lastFiveChars === "/100*") {
    valueText.value = valueText.value.slice(0, -5) + ")*";
  } else if (isNaN(lastTwoChars[0]) && isNaN(lastTwoChars[1])) {
    valueText.value = valueText.value.slice(0, -2) + ")*";
  } else if (isNaN(lastChar)) {
    valueText.value = valueText.value.slice(0, -1) + ")*";
  } else {
    valueText.value += ")*";
  }
});
