/*
PSICO MAPPER
Lapidar PsicoEstudo

Responsável por:

– detectar protagonistas prováveis
– detectar antagonistas prováveis
– detectar forças simbólicas
– detectar clima dominante
– gerar mapa narrativo preliminar
*/


const PsicoMapper = {

executar(texto){

if(!texto || texto.trim() === ""){
return null
}

return {
protagonistas:this.detectarProtagonistas(texto),
antagonistas:this.detectarAntagonistas(texto),
forcasSimbolicas:this.detectarForcasSimbolicas(texto),
climaDominante:this.detectarClimaDominante(texto),
eixoNarrativo:this.detectarEixoNarrativo(texto),
observacaoMapa:this.gerarObservacaoMapa(texto)
}

},



detectarProtagonistas(texto){

let nomes = this.extrairNomesProvaveis(texto)

if(nomes.length === 0){

if(/\beu\b/i.test(texto)){
return ["Narrador em primeira pessoa"]
}

return ["Protagonista não identificado com clareza"]
}

return nomes.slice(0, 2)

},



detectarAntagonistas(texto){

let antagonismos = []

if(/inimigo|adversário|rival|opressor|tirano|caçador|acusador|ameaça/i.test(texto)){
antagonismos.push("Antagonista direto ou nomeado")
}

if(/medo|culpa|trauma|solidão|luto|desespero|angústia/i.test(texto)){
antagonismos.push("Antagonista interno/psicológico")
}

if(/tempestade|guerra|cidade|sistema|abismo|fome|seca|noite/i.test(texto)){
antagonismos.push("Antagonista ambiental/simbólico")
}

if(antagonismos.length === 0){
antagonismos.push("Antagonismo não marcado com clareza")
}

return antagonismos

},



detectarForcasSimbolicas(texto){

let forcas = []

if(/tempo|destino|eternidade|retorno|memória/i.test(texto)){
forcas.push("Tempo / Destino")
}

if(/culpa|redenção|pecado|queda|salvação/i.test(texto)){
forcas.push("Culpa / Redenção")
}

if(/sombra|abismo|escuridão|noite|vazio/i.test(texto)){
forcas.push("Sombra / Vazio")
}

if(/amor|saudade|espera|ausência|reencontro/i.test(texto)){
forcas.push("Amor / Ausência")
}

if(/guerra|choque|ruptura|resistência|luta/i.test(texto)){
forcas.push("Conflito / Resistência")
}

if(forcas.length === 0){
forcas.push("Força simbólica dominante não detectada")
}

return forcas

},



detectarClimaDominante(texto){

if(/medo|ameaça|sangue|grito|fuga|perigo|sombras/i.test(texto)){
return "clima de tensão"
}

if(/saudade|silêncio|espera|chuva|lembrança|memória/i.test(texto)){
return "clima melancólico"
}

if(/esperança|retorno|luz|manhã|recomeço|descoberta/i.test(texto)){
return "clima de superação"
}

if(/choque|rompimento|queda|trauma|desespero/i.test(texto)){
return "clima de ruptura"
}

return "clima estável ou indefinido"

},



detectarEixoNarrativo(texto){

if(/contra|enfrentou|lutou|resistiu|fugiu|escapou/i.test(texto)){
return "eixo de confronto"
}

if(/buscou|procurou|esperou|voltou|descobriu/i.test(texto)){
return "eixo de busca"
}

if(/pensou|duvidou|questionou|lembrava|sentiu/i.test(texto)){
return "eixo introspectivo"
}

return "eixo narrativo não definido"

},



gerarObservacaoMapa(texto){

const protagonistas = this.detectarProtagonistas(texto)
const antagonistas = this.detectarAntagonistas(texto)
const forcas = this.detectarForcasSimbolicas(texto)
const clima = this.detectarClimaDominante(texto)
const eixo = this.detectarEixoNarrativo(texto)

let linhas = []

linhas.push("Protagonismo provável: " + protagonistas.join(", "))
linhas.push("Antagonismo provável: " + antagonistas.join(", "))
linhas.push("Forças simbólicas: " + forcas.join(", "))
linhas.push("Clima dominante: " + clima)
linhas.push("Eixo narrativo: " + eixo)

return linhas.join(" ")

},



extrairNomesProvaveis(texto){

const palavras = texto.match(/\b[A-ZÁÉÍÓÚÂÊÔÃÕÀ][a-záéíóúâêôãõàç]+\b/g) || []

const ignorar = [
"Capítulo","Prólogo","Epílogo","Parte","Livro","História",
"Ele","Ela","Eles","Elas","Eu","Nós","Deus"
]

const contagem = {}

for(const palavra of palavras){

if(ignorar.includes(palavra)){
continue
}

if(!contagem[palavra]){
contagem[palavra] = 0
}

contagem[palavra]++
}

return Object.entries(contagem)
.sort((a,b) => b[1] - a[1])
.map(item => item[0])
.slice(0, 5)

}

}


console.log("PSICO MAPPER ATIVO")
