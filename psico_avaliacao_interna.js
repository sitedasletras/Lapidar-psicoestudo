/*
PSICO AVALIAÇÃO INTERNA
Lapidar PsicoEstudo

Responsável por:

– avaliar coerência emocional
– avaliar tensão dramática
– avaliar ritmo psicológico
– avaliar força do conflito
– avaliar estabilidade do narrador
– devolver bloco interno da história
*/


const PsicoAvaliacaoInterna = {

executar(texto){

if(!texto || texto.trim() === ""){
return null
}

return {
coerenciaEmocional:this.avaliarCoerenciaEmocional(texto),
tensaoDramatica:this.avaliarTensaoDramatica(texto),
ritmoPsicologico:this.avaliarRitmoPsicologico(texto),
forcaConflito:this.avaliarForcaConflito(texto),
estabilidadeNarrador:this.avaliarNarrador(texto),
campoEmocionalDominante:this.detectarCampoEmocionalDominante(texto),
observacaoInterna:this.gerarObservacaoInterna(texto)
}

},



avaliarCoerenciaEmocional(texto){

if(/medo|culpa|dor|luto|solidão|trauma|desespero|angústia/i.test(texto)){
return "alta"
}

if(/saudade|dúvida|espera|conflito|incerteza|pressão/i.test(texto)){
return "media"
}

return "baixa"

},



avaliarTensaoDramatica(texto){

if(/morte|arma|queda|fuga|ameaça|grito|sangue|perigo|ruptura/i.test(texto)){
return "alta"
}

if(/pressão|disputa|segredo|suspeita|risco|choque/i.test(texto)){
return "media"
}

return "baixa"

},



avaliarRitmoPsicologico(texto){

const frases = texto.split(/[.!?]/).filter(Boolean)

if(frases.length === 0){
return "baixa"
}

let soma = 0

for(const frase of frases){
soma += frase.trim().length
}

const media = soma / frases.length

if(media > 140){
return "alta"
}

if(media > 70){
return "media"
}

return "baixa"

},



avaliarForcaConflito(texto){

if(/contra|enfrentou|lutou|resistiu|rompeu|escapou|perdeu|caiu/i.test(texto)){
return "alta"
}

if(/duvidou|hesitou|pensou|questionou|considerou|temeu/i.test(texto)){
return
