function renderTabuleiro(){
     let html = "<table>";

     let count = 1;

     for(let linhas = 0; linhas < 3; linhas++){
          html += "<tr>";
          for(let colunas = 0; colunas < 3; colunas++){
               html += "<td>" + count + "</td>";

               count++;
          }
          html += "</tr>";
     }

     html += "</table>";


     document.getElementById("gamewindow").innerHTML = html;
}

renderTabuleiro();
