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

if(/morte|dor|perda|luto|sangue|medo|solidão|culpa/i.test(texto)){
saida.push("Campo emocional denso identificado.")
}else{
saida.push("Campo emocional moderado ou estável identificado.")
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

let dados = {
coerenciaEmocional:this.avaliarCoerenciaEmocional(texto),
tensaoDramatica:this.avaliarTensaoDramatica(texto),
ritmoPsicologico:this.avaliarRitmoPsicologico(texto),
forcaConflito:this.avaliarForcaConflito(texto),
estabilidadeNarrador:this.avaliarNarrador(texto)
}

PsicoCore.registrarAvaliacaoInterna(dados)

return "Avaliação interna executada com sucesso"
},



executarAvaliacaoGlobal(){

const texto = PsicoCore.obterTextoBase()

if(!texto || texto.trim() === ""){
return "Não foi possível executar avaliação global"
}

let dados = {
maturidadeLiteraria:this.avaliarMaturidadeLiteraria(texto),
identidadeAutoral:this.avaliarIdentidadeAutoral(texto),
estruturaMacro:this.avaliarEstruturaMacro(texto),
potencialEditorial:this.avaliarPotencialEditorial(texto),
densidadeSimbolica:this.avaliarDensidadeSimbolica(texto)
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

const pontosInternos =
this.pontuarFaixa(interna.coerenciaEmocional) +
this.pontuarFaixa(interna.tensaoDramatica) +
this.pontuarFaixa(interna.ritmoPsicologico) +
this.pontuarFaixa(interna.forcaConflito) +
this.pontuarFaixa(interna.estabilidadeNarrador)

const pontosGlobais =
this.pontuarFaixa(global.maturidadeLiteraria) +
this.pontuarFaixa(global.identidadeAutoral) +
this.pontuarFaixa(global.estruturaMacro) +
this.pontuarFaixa(global.potencialEditorial) +
this.pontuarFaixa(global.densidadeSimbolica)

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



avaliarCoerenciaEmocional(texto){

if(/medo|culpa|dor|luto|solidão|trauma/i.test(texto)){
return "alta"
}

if(/saudade|dúvida|espera|conflito/i.test(texto)){
return "media"
}

return "baixa"
},



avaliarTensaoDramatica(texto){

if(/morte|arma|queda|fuga|ameaça|grito|sangue/i.test(texto)){
return "alta"
}

if(/pressão|disputa|segredo|suspeita/i.test(texto)){
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

if(/contra|enfrentou|lutou|resistiu|rompeu|escapou/i.test(texto)){
return "alta"
}

if(/duvidou|hesitou|pensou|questionou/i.test(texto)){
return "media"
}

return "baixa"
},



avaliarNarrador(texto){

if(/\beu\b/i.test(texto)){
return "alta"
}

if(/\bele\b|\bela\b/i.test(texto)){
return "media"
}

return "baixa"
},



avaliarMaturidadeLiteraria(texto){

if(texto.length > 8000){
return "alta"
}

if(texto.length > 2500){
return "media"
}

return "baixa"
},



avaliarIdentidadeAutoral(texto){

if(/metáfora|símbolo|alma|tempo|sombra|destino/i.test(texto)){
return "alta"
}

if(/lembrança|memória|caminho|queda|retorno/i.test(texto)){
return "media"
}

return "baixa"
},



avaliarEstruturaMacro(texto){

if(/pr[oó]logo|ep[ií]logo|cap[ií]tulo/i.test(texto)){
return "alta"
}

if(texto.length > 3000){
return "media"
}

return "baixa"
},



avaliarPotencialEditorial(texto){

if(texto.length > 5000 && /cap[ií]tulo/i.test(texto)){
return "alta"
}

if(texto.length > 1800){
return "media"
}

return "baixa"
},



avaliarDensidadeSimbolica(texto){

if(/alma|abismo|tempo|sombra|céu|inferno|redenção|culpa|destino/i.test(texto)){
return "alta"
}

if(/memória|medo|silêncio|vazio|espera/i.test(texto)){
return "media"
}

return "baixa"
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
},



classificarFaixa100k(nota){

if(nota >= 90000){
return "obra
