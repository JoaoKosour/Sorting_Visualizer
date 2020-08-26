// Este arquivo possui a inicializaçao dos vetores e o desenho do canvas e da janela

let arr = []; //vetor de numeros que sera usado para representar as barras
let states = []; //vetor de estados, é usado para definir a cor que sera mostrada
let sortedarr = []; //vetor igual a "arr", usado para comparar se o sorting esta correto

let sorting = false; //sorting é true enquanto um algoritimo esta rodando para previnir que outros executem
let sorted = false; //sorted é true quando o algoritimo termina, usado para dar a cor roxa no final

function setup() {
  const canvasContainer = document.getElementById("canvas-container"); //pega o elemento canvas no HTML
  let canvas = createCanvas(windowWidth, canvasContainer.offsetHeight); //desenha um canvas usando a lib p5
  canvas.parent("canvas-container"); //define o canvas como o canvas em html
  canvas.style("display", "block"); // nao deixa barras de rolagem nos cantos da pagina

  arr = new Array(75); //inicia o vetor, se essa funcao nao for chamada sempre sera undefined
  states = new Array(75);
  shuffleArray(); //chama uma funca que inicia os vetores da forma propria, arr, sortedarr e states
}

function draw() {
  // essa funcao faz um loop desenhando no canvas o que foi pedido, novamente da lib p5
  background(64, 64, 64); //cor cinza escuro do bg
  noStroke(); // faz os retangulos que representam os numeros nao terem borda

  for (let i = 0; i < arr.length; i++) {
    //desenha o array enquando faz sort
    fill("#79bbff"); //cor azul das barras
    if (states[i] == 1) {
      // se entrou nesse if quer dizer que a barra deve ser pintada de vermelho
      fill(150, 50, 80);
    }
    rect(i * 17 + windowWidth / 7, 0, 14, arr[i] * 2); // desenha a barra propriamente
  }
  if (sorted == true && Equal(arr, sortedarr)) {
    //entra nesse if se acabou de fazer o sort
    fill(172, 138, 207); // a cor é mudada para violeta
    for (
      let i = 0;
      i < arr.length;
      i++ // esse for desenha as barras.
    )
      rect(i * 17 + windowWidth / 7, 0, 14, arr[i] * 2);
  }
}
