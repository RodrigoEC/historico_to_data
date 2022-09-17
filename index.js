const fs = require("fs");
const pdf = require("pdf-parse");

let dataBuffer = fs.readFileSync(
  "/home/eloy/Downloads/historico_118210111_103405821.pdf"
);
let text;

pdf(dataBuffer).then(function (data) {
  text = data.text;
  formatedText = text.replace(/(\r\n|\n|\r)/gm, "|");

  let regex =
    /\|([0-9]{7})(?:.*?)(\|?.*?\|?)(Obrigatória|Optativa|Extracurricular)(\d)(\d{2})((?:\d{1,2},\d|-))(Dispensa|Aprovado|Reprovado|Trancado)(\d{4}\.\d)/gim;
  let result = formatedText.matchAll(regex);

  for (const match of result) {
    console.log(match[1], "-", match[2].split(" |")[0], "-", match[8]);
    console.log("Créditos:", match[4]);
    console.log("Média:", match[6]);
    console.log("Situação:", match[7]);
    console.log("---------------------");
  }
});
