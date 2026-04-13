/*
PSICO ENGINE
Lapidar PsicoEstudo

Responsável por:

– receber a obra carregada no PsicoCore
– executar a avaliação interna da história
– executar a avaliação global da obra
– executar a classificação preliminar 0–100.000
– gerar a saída base
– montar o relatório progressivo
– coordenar o fluxo oficial do PsicoEstudo
*/


const PsicoEngine = {

executarLeituraBase(){

const texto = PsicoCore.obterTextoBase()

if(!texto || texto.trim() === ""){
return "Nenhum texto disponível para leitura psicoestrutural"
}

let resultado = []

resultado.push(this.gerarSaidaBase(texto))
resultado.push(this.executarAvaliacaoInterna())
resultado.push(this.executarAvaliacaoGlobal())
resultado.push(this.executarClassificacaoPreliminar())
resultado.push(this.gerarRelatorioProgressivo())

return resultado.join("\n")

},



gerarSaidaBase(texto){

let saida = []

if(/\beu\b/i.test(texto)){
saida.push("Narrador com traço de primeira pessoa detectado.")
}else{
saida.push("Narrador externo ou não centrado em primeira pessoa detectado.")
}

if(texto.length < 1200){
saida.push("Estrutura narrativa curta ou concentrada.")
}else if(texto.length < 6000){
saida.push("Estrutura narrativa intermediária detectada.")
}else{
saida.push("Estrutura narrativa extensa detectada.")
}

if(/morte|dor|perda|luto|sangue|medo|solidão|culpa|trauma|angústia/i.test(texto)){
saida.push("Campo emocional denso identificado.")
}else{
saida.push("Campo emocional moderado ou estável identificado.")
}

if(/pr[oó]logo|ep[ií]logo|cap[ií]tulo/i.test(texto)){
saida.push("Estrutura macro formal detectada.")
}else{
saida.push("Estrutura macro formal não explicitamente detectada.")
}

const textoFinal = saida.join(" ")

PsicoCore.registrarSaidaBase(textoFinal)

return "Saída base gerada com sucesso"

},



executarAvaliacaoInterna(){

const texto = PsicoCore.obterTextoBase()

if(!texto || texto.trim() === ""){
return "Não foi possível executar avaliação interna"
}

if(typeof PsicoAvaliacaoInterna === "undefined"){
return "Módulo de avaliação interna não carregado"
}

let dados = PsicoAvaliacaoInterna.executar(texto)

if(!dados){
return "Falha ao gerar avaliação interna"
}

PsicoCore.registrarAvaliacaoInterna(dados)

return "Avaliação interna executada com sucesso"

},



executarAvaliacaoGlobal(){

const texto = PsicoCore.obterTextoBase()

if(!texto || texto.trim() === ""){
return "Não foi possível executar avaliação global"
}

if(typeof PsicoAvaliacaoGlobal === "undefined"){
return "Módulo de avaliação global não carregado"
}

let dados = PsicoAvaliacaoGlobal.executar(texto)

if(!dados){
return "Falha ao gerar avaliação global"
}

PsicoCore.registrarAvaliacaoGlobal(dados)

return "Avaliação global executada com sucesso"

},



executarClassificacaoPreliminar(){

const interna = PsicoCore.memoria.avaliacaoInterna
const global = PsicoCore.memoria.avaliacaoGlobal

if(!interna || !global){
return "Classificação preliminar não pôde ser executada"
}

if(
typeof PsicoAvaliacaoInterna === "undefined" ||
typeof PsicoAvaliacaoGlobal === "undefined"
){
return "Módulos avaliativos não carregados"
}

const pontosInternos = PsicoAvaliacaoInterna.pontuar(interna)
const pontosGlobais = PsicoAvaliacaoGlobal.pontuar(global)

let notaInterna = Math.min(pontosInternos * 4000, 100000)
let notaGlobal = Math.min(pontosGlobais * 4000, 100000)

let classificacao = {
notaInternaHistoria:notaInterna,
notaGlobalObra:notaGlobal,
faixaInterna:this.classificarFaixa100k(notaInterna),
faixaGlobal:this.classificarFaixa100k(notaGlobal),
status:"pontuacao_preliminar"
}

PsicoCore.registrarClassificacaoPreliminar(classificacao)

return "Classificação preliminar 0–100.000 executada com sucesso"

},



gerarRelatorioProgressivo(){

const relatorio = {
titulo:PsicoCore.memoria.titulo || "sem_titulo",
autor:PsicoCore.memoria.autor || "sem_autor",
genero:PsicoCore.memoria.genero || "nao_identificado",
saidaBase:PsicoCore.memoria.saidaBase,
avaliacaoInterna:PsicoCore.memoria.avaliacaoInterna,
avaliacaoGlobal:PsicoCore.memoria.avaliacaoGlobal,
classificacaoPreliminar:PsicoCore.memoria.classificacaoPreliminar,
status:"relatorio_progressivo_pronto"
}

PsicoCore.registrarRelatorioProgressivo(relatorio)

return "Relatório progressivo gerado com sucesso"

},



classificarFaixa100k(nota){

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



status(){

return PsicoCore.obterResumoEstado()

}



}


console.log("PSICO ENGINE ATIVA")
