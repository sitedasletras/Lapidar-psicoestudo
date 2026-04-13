/*
PSICO ARCHTYPES
Lapidar PsicoEstudo

Responsável por:

– detectar arquétipos narrativos prováveis
– identificar protagonista, antagonista, guia, sombra e espelho
– registrar forças arquetípicas dominantes
– devolver leitura arquetípica preliminar da obra
*/


const PsicoArchtypes = {

executar(texto){

if(!texto || texto.trim() === ""){
return null
}

return {
protagonista:this.detectarProtagonista(texto),
antagonista:this.detectarAntagonista(texto),
guia:this.detectarGuia(texto),
sombra:this.detectarSombra(texto),
espelho:this.detectarEspelho(texto),
forcaArquetipicaDominante:this.detectarForcaArquetipicaDominante(texto),
observacaoArquetipica:this.gerarObservacaoArquetipica(texto)
}

},



detectarProtagonista(texto){

let nomes = this.extrairNomesProvaveis(texto)

if(nomes.length > 0){
return nomes[0]
}

if(/\beu\b/i.test(texto)){
return "Narrador em primeira pessoa"
}

return "Protagonista não identificado"

},



detectarAntagonista(texto){

if(/inimigo|adversário|rival|tirano|acusador|caçador|ameaça/i.test(texto)){
return "Antagonista direto"
}

if(/medo|culpa|trauma|solidão|angústia|luto/i.test(texto)){
return "Antagonista interno"
}

if(/cidade|guerra|sistema|seca|abismo|tempestade|noite/i.test(texto)){
return "Antagonista ambiental ou simbólico"
}

return "Antagonista não claramente detectado"

},



detectarGuia(texto){

if(/mentor|mestre|padre|professor|ancião|guia|conselheiro|oráculo/i.test(texto)){
return "Figura guia detectada"
}

if(/ensinou|orientou|mostrou|aconselhou|conduziu/i.test(texto)){
return "Presença funcional de guia"
}

return "Guia não detectado com clareza"

},



detectarSombra(texto){

if(/sombra|duplo|abismo|escuridão|monstro|ferida|pecado/i.test(texto)){
return "Sombra ativa"
}

if(/culpa|medo|trauma|desespero|colapso/i.test(texto)){
return "Sombra psicológica"
}

return "Sombra não marcada"

},



detectarEspelho(texto){

if(/como ele|como ela|igual a ele|igual a ela|parecido com|refletia nele|refletia nela/i.test(texto)){
return "Personagem espelho sugerido"
}

if(/o outro|a outra|seu oposto|sua versão/i.test(texto)){
return "Estrutura de espelhamento detectada"
}

return "Espelho narrativo não detectado"

},



detectarForcaArquetipicaDominante(texto){

if(/destino|profecia|retorno|legado|missão/i.test(texto)){
return "Jornada / Destino"
}

if(/queda|redenção|culpa|salvação|pecado/i.test(texto)){
return "Queda / Redenção"
}

if(/amor|ausência|reencontro|espera|saudade/i.test(texto)){
return "Amor / Ausência"
}

if(/luta|resistência|guerra|ruptura|confronto/i.test(texto)){
return "Conflito / Resistência"
}

if(/memória|tempo|silêncio|vazio|sombra/i.test(texto)){
return "Memória / Sombra"
}

return "Força arquetípica dominante não detectada"

},



gerarObservacaoArquetipica(texto){

const protagonista = this.detectarProtagonista(texto)
const antagonista = this.detectarAntagonista(texto)
const guia = this.detectarGuia(texto)
const sombra = this.detectarSombra(texto)
const espelho = this.detectarEspelho(texto)
const forca = this.detectarForcaArquetipicaDominante(texto)

let linhas = []

linhas.push("Protagonista provável: " + protagonista + ".")
linhas.push("Antagonismo dominante: " + antagonista + ".")
linhas.push("Guia narrativo: " + guia + ".")
linhas.push("Sombra: " + sombra + ".")
linhas.push("Espelho narrativo: " + espelho + ".")
linhas.push("Força arquetípica dominante: " + forca + ".")

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


console.log("PSICO ARCHTYPES ATIVO")
