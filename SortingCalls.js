// Esse arquivo contem as chamadas das funcoes de sorting e o tratamento necessario para elas funcionarem

//essas funcoes tem a simples razao de chamar o algoritimo desejado quando um botao é clicado, alem disso
//elas garantem que só sera executado um algoritimo por vez.
function isBubble() {
  if (sorting == false && sorted == false) {
    sorted = false;
    sorting = true;
    bubbleSort(arr);
  }
}

function isQuick() {
  if (sorting == false && sorted == false) {
    sorted = false;
    sorting = true;
    quickSort(arr, 0, arr.length - 1);
  }
}

function isShell() {
  if (sorting == false && sorted == false) {
    sorted = false;
    sorting = true;
    shellSort(arr);
  }
}

function isSelection() {
  if (sorting == false && sorted == false) {
    sorted = false;
    sorting = true;
    selectionSort(arr);
  }
}

function isHeap() {
  if (sorting == false && sorted == false) {
    sorted = false;
    sorting = true;
    heapSort(arr);
  }
}
