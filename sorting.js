// Este arquivo possui somente os algoritimos de sorting


//todas os algoritimos foram implementados na forma padrao com algumas poucas mudanças para deixa-los assincronos
//isso foi feito pois só podemos visualizar de forma generica se os algoritimos de sort e de swap forem assincronos


// sorting é uma variavel global que é true enquanto o algoritimo esta rodando, isso garante que nao possamos chamar
// mais de um algoritimo de sort por vez, ou a funcao shuffle no meio da execucao, isso precisou ser feito pois
// como as funcoes sao assincronas, os algoritimos rodando ao mesmo tempo alterariam a representacao de forma indesejada
// o vetor final nao seria mostrado de forma ordenada

// sorted é uma variavel que fica true quando o algoritimo acabou de ordenar o array, ele é majoritariamente usada
// para saber quando mudar a cor do vetor no final, essa variavel poderia ser removida pois checamos quando o arr
// utilizado é igual a sua versao ja ordenada pela funcao sort do javascript ( comparamos arr com sortedarr )
// porem a variavel foi mantida pois garante uma flexibilidade ao código me permitindo testar quando o algoritimo
// ja terminou porem nao é igual ao vetor sorted, o que me diz que a logica esta errada, ele foi fundamental para
// debugar o código, e nao foi removida caso haja a necessidade de implementar e debugar mais algoritimos no futuro

async function bubbleSort(arr) {
	for (let i = 0; i < arr.length; i++) {
		for (let j = 0; j < arr.length - i; j++) {
			if (arr[j] >= arr[j + 1]) { // se entrar nesse if, pares adjascente onde o da esquerda é maior sao trocados
				states[j] = 1;
				await swap(arr, j, j + 1); // swap assincrono, ele é usado aqui para poder demonstrar em tempo real o sort
				states[j + 1] = 0;
			}
			states[j] = 0;
		}
	}
	sorting = false; // acabou de fazer o sort
	sorted = true; // array esta ordenado
	return arr;
}



//quick sort com o pivo na posicao inicial do vetor
async function quickSort(arr, start, end) {
	if (start >= end) {
		sorting = false;
		sorted = true;
		return;
	}
	let index = await partition(arr, start, end); // divide o array

	await Promise.all([ // chama as 2 funcoes assincronas ao mesmo tempo para dar o efeito recursivo
		quickSort(arr, start, index - 1),
		quickSort(arr, index + 1, end)
	]);
}

// essa funcao didive o array na posicao do pivot
async function partition(arr, start, end) {
	let pivotIndex = start; // define onde o pivo sera colocado
	let pivotValue = arr[end]; // define o valor do pivo

	for (let i = start; i < end; i++) states[i] = 0; // reseta os states, isso é usado para resetar as cores

	for (let i = start; i < end; i++) // nesse loop os valores menores do que o pivot passam para a esquerda do pivo
		if (arr[i] < pivotValue) {
			await swap(arr, i, pivotIndex);
			states[pivotIndex] = 1;
			pivotIndex++; // incrementa a posicao do pivo se um elemento foi colocado, isso garante que ele fique
			// a esquerda do pivo, o que é importante para a logica, visto que o vetor sera ordenado de forma
			// decrescente
			states[pivotIndex] = 0;
		}
	// ao fim o pivo é colocado no lugar certo, elementos menores que ele estao a esquerda e maiores a direita
	await swap(arr, pivotIndex, end);
	for (let i = start; i < end; i++) states[i] = 0; // reseta os states, isso é usado para resetar as cores
	return pivotIndex;
}



// esse é um shell sort padrao porem usa os numeros de ciura 
//(Ciura, Marcin (2001). "Best Increments for the Average Case of Shellsort")
async function shellSort(arr) {
	let gaps = [701, 301, 132, 57, 23, 10, 4, 1];
	for (let gap of gaps) // percorre os pulos, sempre importante o ultimo ser 1 para garantir que esta ordenado
		for (let j = gap; j < arr.length; j++)
			for (let k = j - gap; k >= 0; k = k - gap) {
				if (arr[k + gap] >= arr[k]) break;
				else {
					states[k] = 1;
					await swap(arr, k, k + gap);
					states[k + gap] = 0;
				}
				states[k] = 0;
			}
	sorting = false;
	sorted = true;
	return arr;
}



// como as outras funcoes fazem muitas chamadas assincronas para podermos visualizar os algoritimos em tempo real
// o selection sort tende a ficar muito mais rapido que eles, por isso as funcoes sleep foram colocadas nele
async function selectionSort(arr) {
	for (let i = 0; i < arr.length; i++) { // aqui o i demarca até onde o vetor ja esta ordenado
		await sleep(65);
		let min = i;
		for (let j = i + 1; j < arr.length; j++) { // j percorre o vetor inteiro achando qual o menor valor
			if (arr[min] > arr[j]) { // acha o menor valor
				states[j] = 1;
				min = j;
			}
		}

		if (min !== i) { //troca o menor valor com a posicao correta que foi definida anteriormente por i
			states[i] = 1;
			await swap(arr, i, min);
			states[min] = 0;
		}
		states[i] = 0;
		await sleep(65);
	}
	sorting = false;
	sorted = true;
	return arr;
}



// em uma heap normalmente os elementos sao colocados da esquerda para a direita, elementos a esquerda tendem a 
// ter posicoes impares e elementos a direita posicoes pares, em uma max heap o maior elemento fica no topo
async function heapfy(arr, i) {
	var left = 2 * i + 1; // pula de impar, ou seja elementos a esquerda, de acordo com uma estrutura de heap
	var right = 2 * i + 2; // pula de par, ou seja elementos a direita, de acordo com uma estrutura de heap
	var max = i;

	if (left < array_length && arr[left] > arr[max]) max = left;

	if (right < array_length && arr[right] > arr[max]) max = right;

	if (max != i) {
		states[i] = 1; // aqui states é usado para visualizar como esta criando a heap
		await swap(arr, i, max);
		states[max] = 0;
		await heapfy(arr, max);
	}
	states[i] = 0;
}
// o heap sort faz uma max heap e manda o primeiro elemento para o fim do vetor entao decrementa a posicao "fim"
async function heapSort(arr) { // aqui a funcao floor é usada a fim de que nao tenhamos floats ao dividir por 2
	array_length = arr.length; // define onde é o fim do vetor para inserir o numero apos fazer a max heap
	// array_length é definido como uma variavel global para tambem poder ser usado na funcao que transforma o vetor
	//em uma heap, porem nao existe problema de compatibilidade mesmo rodando o codigo multiplas vezes
	// essa variavel só é usada nesta funcao e é recalculada a cada chamada do heap sort.
	for (var i = Math.floor(arr.length / 2); i >= 0; i -= 1)
		await heapfy(arr, i);

	for (i = arr.length - 1; i > 0; i--) {
		await swap(arr, 0, i); // essa funcao troca o primeiro elemento do vetor com a posicao final que decresce
		array_length--;
		await heapfy(arr, 0); // chama uma funcao que faz o vetor virar uma heap
	}
	sorting = false;
	sorted = true;
}