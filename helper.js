// Este arquivo possui as funcoes utilitarias, randomiza um array, sleep, swap, resize, equal ( compara 2 vetores )


//essa funcao reseta o array principal colocando numeros aleatorios nele, copia os numeros do array para sortedarr
//para verificarmos se apos o sort ficaram iguais e reseta o vetor de states que é usado para colorir a
//representaçao do algoritimo utilizado, essa funcao é chamada quando o botao shuffle é pressionado ou quando
//o programa inicia
function shuffleArray() {
	if (sorting == false) {
		sorted = false;
		for (let i = 0; i < arr.length; i++) {
			arr[i] = Math.floor(random(0, 400) * random(0.1, 0.9) + 15); // essa formula foi usada pois
			// usando somente Math.random nao conseguiamos numeros tao randomicos, a funcao random é da lib p5
			states[i] = 0; // reseta os estados, isso garante que inicialmente todas as barras sejam azuis
			sortedarr[i] = arr[i];
		}
		sortedarr.sort((a, b) => a - b); // ordena o vetor com a funcao sort do proprio javascript, passando os paramentos
	}
}


//essa funcao pausa temporariamente por um tempo definido como parametro as funcoes asincronas
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}


//essa funcao faz um swap asincrono para podermos visualizar as trocas, a funcao sleep determina a velocidade
async function swap(arr, a, b) {
	await sleep(10);
	let aux = arr[a];
	arr[a] = arr[b];
	arr[b] = aux;
}


//essa funcao ajuda a checagem se o algoritimo terminou, retorna true se 2 vetores sao iguais.
function Equal(arr1, sortedarr) {
	for (let i = arr1.length; i--; ) if (arr1[i] !== sortedarr[i]) return false;
	return true;
}


//sempre que a janela muda de tamanho, isso muda tambem, canvasContainer.offsetHeight
//é usado para manter as bordas em proporçao ao meio ja que estamos usando p5 para desenhar o canvas
function windowResized() {
	const canvasContainer = document.getElementById("canvas-container");
	resizeCanvas(windowWidth, canvasContainer.offsetHeight);
}
