/*
PSICO CLASSIFICADOR 0–100.000
Lapidar PsicoEstudo

Responsável por:

– converter avaliação interna em nota preliminar
– converter avaliação global em nota preliminar
– classificar faixas de maturidade
– devolver bloco classificatório independente
*/


const PsicoClassificador100K = {

executar(avaliacaoInterna, avaliacaoGlobal){

if(!avaliacaoInterna || !avaliacaoGlobal){
return null
}

if(
typeof PsicoAvaliacaoInterna === "undefined" ||
typeof PsicoAvaliacaoGlobal === "undefined"
){
return null
}

const pontosInternos = PsicoAvaliacaoInterna.pontuar(avaliacaoInterna)
const pontosGlobais = PsicoAvaliacaoGlobal.pontuar(avaliacaoGlobal)

const notaInterna = Math.min(pontosInternos * 4000, 100000)
const notaGlobal = Math.min(pontosGlobais * 4000, 100000)

return {
notaInternaHistoria: notaInterna,
notaGlobalObra: notaGlobal,
faixaInterna: this.classificarFaixa100k(notaInterna),
faixaGlobal: this.classificarFaixa100k(notaGlobal),
leituraInterna: this.gerarLeituraFaixa(notaInterna),
leituraGlobal: this.gerarLeituraFaixa(notaGlobal),
status: "pontuacao_preliminar"
}

},



classificarFaixa100k(nota){

if(typeof nota !== "number"){
return "faixa_indefinida"
}

if(nota >= 90000){
return "obra_estruturante"
}

if(nota >= 70000){
return "obra_relevante"
}

if(nota >= 40000){
return "obra_solida"
}

return "obra_em_formacao"

},



gerarLeituraFaixa(nota){

if(typeof nota !== "number"){
return "Pontuação inválida."
}

if(nota >= 90000){
return "Faixa de alta estruturação literária e grande potência simbólica."
}

if(nota >= 70000){
return "Faixa de obra relevante, madura e com forte consistência narrativa."
}

if(nota >= 40000){
return "Faixa de obra sólida, com base estrutural perceptível e potencial de crescimento."
}

return "Faixa de obra em formação, ainda em processo de consolidação narrativa."

},



resumir(classificacao){

if(!classificacao){
return "Nenhuma classificação disponível"
}

let linhas = []

linhas.push("Pontuação interna da história: " + classificacao.notaInternaHistoria)
linhas.push("Faixa interna: " + classificacao.faixaInterna)
linhas.push(classificacao.leituraInterna)
linhas.push("")
linhas.push("Pontuação global da obra: " + classificacao.notaGlobalObra)
linhas.push("Faixa global: " + classificacao.faixaGlobal)
linhas.push(classificacao.leituraGlobal)

return linhas.join("\n")

}

}


console.log("PSICO CLASSIFICADOR 0–100.000 ATIVO")
