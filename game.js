celulas = [0, 1, 2,
           3, 4, 5,
           6, 7, 8];


function renderTabuleiro(){
     let html = "<table>";

     let count = 1;

     for(let linhas = 0; linhas < 3; linhas++){
          html += "<tr>";
          for(let colunas = 0; colunas < 3; colunas++){
               html += "<td>" + "<button id=\"" + count + "\" onClick=\"clicaButton(this.id)\" type=\"button\" name=\"button\"></button>" + "</td>";

               count++;
          }
          html += "</tr>";
     }

     html += "</table>";


     document.getElementById("gamewindow").innerHTML = html;
}

function clicaButton(id){

     if(vence(celulas, "X") == false && vence(celulas, "O") == false){
          document.getElementById(id).innerHTML = "O";
          document.getElementById(id).style.backgroundColor = "lightgreen";
          celulas[id - 1] = "O";

          if(vence(celulas, "O") == true){
               console.log("humano venceu");
               document.getElementById("winText").innerHTML = "Humano venceu!";
          } else {
               IAJoga();
          }
     }
}

function IAJoga(){
     var melhorJogada = minimax(celulas, "X");
     document.getElementById(melhorJogada.index + 1).innerHTML = "X";
     document.getElementById(melhorJogada.index + 1).style.backgroundColor = "lightcoral";
     celulas[melhorJogada.index] = "X";

     if(vence(celulas, "X") == true){
          console.log("computador venceu");
          document.getElementById("winText").innerHTML = "Computador venceu!";
     }
}

function celulasVazias(tabuleiro){
     return  tabuleiro.filter(s => s != "O" && s != "X");
}

function minimax(novoTabuleiro, jogador){


    // armazena em um array as celulas vazias
    var possiveisJogadas = celulasVazias(novoTabuleiro);

    // verifica se tem um estado terminal em que o COMPUTADOR ganha, perde ou empata e retorna uma pontuacao
    if (vence(novoTabuleiro, "O")){
        return {pontuacao:-10};
    }
    else if (vence(novoTabuleiro, "X")){
        return {pontuacao:10};
    }
    else if (possiveisJogadas.length === 0){
        return {pontuacao:0};
    }

    // array que vai guardar todas as jogadas e suas pontuacoes
    var jogadas = [];

    // loop que vai colocar todas as possiveis jogadas no array
    for (var i = 0; i < possiveisJogadas.length; i++){

        // vai criar um objeto para cada um e armazenar o index da celula de cada jogada
        var jogada = {};
        jogada.index = novoTabuleiro[possiveisJogadas[i]];

        // faz uma jogada numa celula vazia
        novoTabuleiro[possiveisJogadas[i]] = jogador;

        // armazena a pontuacao retornada do estado terminal daquela jogada
        if (jogador == "X"){
            var result = minimax(novoTabuleiro, "O");
            jogada.pontuacao = result.pontuacao;
        }
        else{
            var result = minimax(novoTabuleiro, "X");
            jogada.pontuacao = result.pontuacao;
        }

        // desfaz a jogada
        novoTabuleiro[possiveisJogadas[i]] = jogada.index;

        // coloca a jogada no array de jogadas
        jogadas.push(jogada);
    }

    // se for a vez do COMPUTADOR o loop resultara na jogada com a melhor pontuacao
    var melhorJogada;
    if(jogador === "X"){
    var melhorPontuacao = -10000;
        for(var i = 0; i < jogadas.length; i++){
            if(jogadas[i].pontuacao > melhorPontuacao){
                melhorPontuacao = jogadas[i].pontuacao;
                melhorJogada = i;
            }
        }
    }else{

        // se for a vez do HUMANO o loop resultara na jogada com a pior pontuacao
        var melhorPontuacao = 10000;
        for(var i = 0; i < jogadas.length; i++){
            if(jogadas[i].pontuacao < melhorPontuacao){
                melhorPontuacao = jogadas[i].pontuacao;
                melhorJogada = i;
            }
        }
    }

    // retorna a jogada com a maior pontuacao
    return jogadas[melhorJogada];

}

function vence(novoTabuleiro, jogador){

    // checa vitoria de "X" ou "O"
    if(
           // checando horizontal
           novoTabuleiro[0] == jogador && novoTabuleiro[1] == jogador && novoTabuleiro[2] == jogador ||
           novoTabuleiro[3] == jogador && novoTabuleiro[4] == jogador && novoTabuleiro[5] == jogador ||
           novoTabuleiro[6] == jogador && novoTabuleiro[7] == jogador && novoTabuleiro[8] == jogador ||

           // checando vertical
           novoTabuleiro[0] == jogador && novoTabuleiro[3] == jogador && novoTabuleiro[6] == jogador ||
           novoTabuleiro[1] == jogador && novoTabuleiro[4] == jogador && novoTabuleiro[7] == jogador ||
           novoTabuleiro[2] == jogador && novoTabuleiro[5] == jogador && novoTabuleiro[8] == jogador ||

           // checando diagonal
           novoTabuleiro[0] == jogador && novoTabuleiro[4] == jogador && novoTabuleiro[8] == jogador ||
           novoTabuleiro[2] == jogador && novoTabuleiro[4] == jogador && novoTabuleiro[6] == jogador){

           //textoVencedor =  jogador + " venceu!";
           return true;

   }
        return false;

}

function resetTabuleiro() {
    celulas = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    document.getElementById("winText").innerHTML = "";
    renderTabuleiro();
}

renderTabuleiro();
