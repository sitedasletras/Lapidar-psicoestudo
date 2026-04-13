/*
PSICO AVALIAÇÃO GLOBAL
Lapidar PsicoEstudo

Responsável por:

– avaliar maturidade literária
– avaliar identidade autoral
– avaliar estrutura macro
– avaliar potencial editorial
– avaliar densidade simbólica global
– devolver bloco global da obra
*/


const PsicoAvaliacaoGlobal = {

executar(texto){

if(!texto || texto.trim() === ""){
return null
}

return {
maturidadeLiteraria:this.avaliarMaturidadeLiteraria(texto),
identidadeAutoral:this.avaliarIdentidadeAutoral(texto),
estruturaMacro:this.avaliarEstruturaMacro(texto),
potencialEditorial:this.avaliarPotencialEditorial(texto),
densidadeSimbolica:this.avaliarDensidadeSimbolica(texto),
potencialExpansao:this.avaliarPotencialExpansao(texto),
observacaoGlobal:this.gerarObservacaoGlobal(texto)
}

},



avaliarMaturidadeLiteraria(texto){

const tamanho = texto.length

if(tamanho > 12000){
return "alta"
}

if(tamanho > 4000){
return "media"
}

return "baixa"

},



avaliarIdentidadeAutoral(texto){

if(/alma|tempo|sombra|destino|abismo|redenção|memória|silêncio|queda/i.test(texto)){
return "alta"
}

if(/lembrança|medo|retorno|espera|ausência|vazio/i.test(texto)){
return "media"
}

return "baixa"

},



avaliarEstruturaMacro(texto){

if(/pr[oó]logo|ep[ií]logo|cap[ií]tulo|parte\s+[ivxlcdm]+|livro\s+[ivxlcdm]+/i.test(texto)){
return "alta"
}

if(texto.length > 3500){
return "media"
}

return "baixa"

},



avaliarPotencialEditorial(texto){

if(
texto.length > 7000 &&
/cap[ií]tulo|pr[oó]logo|ep[ií]logo/i.test(texto)
){
return "alta"
}

if(texto.length > 2500){
return "media"
}

return "baixa"

},



avaliarDensidadeSimbolica(texto){

if(/céu|inferno|tempo|sombra|alma|culpa|destino|redenção|abismo|silêncio/i.test(texto)){
return "alta"
}

if(/memória|espera|queda|medo|vazio|retorno/i.test(texto)){
return "media"
}

return "baixa"

},



avaliarPotencialExpansao(texto){

if(/continua|retorno|legado|origem|segredo|passado|herança|profecia/i.test(texto)){
return "alta"
}

if(/história|futuro|antes|depois|caminho|consequência/i.test(texto)){
return "media"
}

return "baixa"

},



gerarObservacaoGlobal(texto){

let observacoes = []

const maturidade = this.avaliarMaturidadeLiteraria(texto)
const identidade = this.avaliarIdentidadeAutoral(texto)
const estrutura = this.avaliarEstruturaMacro(texto)
const editorial = this.avaliarPotencialEditorial(texto)
const simbolica = this.avaliarDensidadeSimbolica(texto)
const expansao = this.avaliarPotencialExpansao(texto)

if(maturidade === "alta"){
observacoes.push("A obra apresenta maturidade literária elevada.")
}else if(maturidade === "media"){
observacoes.push("A obra apresenta maturidade literária intermediária.")
}else{
observacoes.push("A obra ainda se encontra em fase inicial de maturação literária.")
}

if(identidade === "alta"){
observacoes.push("A identidade autoral se mostra fortemente reconhecível.")
}else if(identidade === "media"){
observacoes.push("A identidade autoral já aparece, mas ainda pode consolidar-se.")
}else{
observacoes.push("A identidade autoral ainda se mostra discreta.")
}

if(estrutura === "alta"){
observacoes.push("A estrutura macro da obra está bem demarcada.")
}else if(estrutura === "media"){
observacoes.push("A obra apresenta estrutura macro perceptível, ainda em consolidação.")
}else{
observacoes.push("A estrutura macro da obra ainda é simples ou pouco marcada.")
}

if(editorial === "alta"){
observacoes.push("Há forte potencial editorial para circulação e posicionamento.")
}else if(editorial === "media"){
observacoes.push("Há potencial editorial moderado.")
}else{
observacoes.push("O potencial editorial ainda depende de maior consolidação.")
}

if(simbolica === "alta"){
observacoes.push("A densidade simbólica global é elevada.")
}else if(simbolica === "media"){
observacoes.push("A densidade simbólica global é moderada.")
}else{
observacoes.push("A densidade simbólica global ainda é baixa.")
}

if(expansao === "alta"){
observacoes.push("A obra sugere forte potencial de expansão de universo.")
}else if(expansao === "media"){
observacoes.push("A obra apresenta potencial moderado de expansão.")
}else{
observacoes.push("O potencial de expansão narrativa ainda é reduzido.")
}

return observacoes.join(" ")

},



pontuar(dados){

if(!dados){
return 0
}

return (
this.pontuarFaixa(dados.maturidadeLiteraria) +
this.pontuarFaixa(dados.identidadeAutoral) +
this.pontuarFaixa(dados.estruturaMacro) +
this.pontuarFaixa(dados.potencialEditorial) +
this.pontuarFaixa(dados.densidadeSimbolica) +
this.pontuarFaixa(dados.potencialExpansao)
)

},



pontuarFaixa(valor){

switch(valor){
case "alta":
return 5
case "media":
return 3
default:
return 1
}

}

}


console.log("PSICO AVALIAÇÃO GLOBAL ATIVA")
