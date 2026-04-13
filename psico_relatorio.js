/*
PSICO RELATÓRIO PROGRESSIVO
Lapidar PsicoEstudo

Responsável por:

– consolidar saída base
– consolidar avaliação interna
– consolidar avaliação global
– consolidar classificação interna 0–100.000
– consolidar classificação pública 0–10
– gerar relatório progressivo institucional
*/


const PsicoRelatorio = {

gerar(){

if(!PsicoCore.memoria.textoBase){
return "Nenhuma obra carregada no PsicoCore."
}

const memoria = PsicoCore.memoria

return {
identificacao:this.gerarIdentificacao(memoria),
saidaBase:this.gerarSaidaBase(memoria),
avaliacaoInterna:this.gerarAvaliacaoInterna(memoria),
avaliacaoGlobal:this.gerarAvaliacaoGlobal(memoria),
classificacaoPublica:this.gerarClassificacaoPublica(memoria),
classificacaoInterna:this.gerarClassificacaoInterna(memoria),
status:"relatorio_progressivo_completo"
}

},



gerarIdentificacao(memoria){

return {
titulo:memoria.titulo || "sem_titulo",
autor:memoria.autor || "sem_autor",
genero:memoria.genero || "nao_identificado"
}

},



gerarSaidaBase(memoria){

if(!memoria.saidaBase){
return "Saída base não disponível."
}

return memoria.saidaBase

},



gerarAvaliacaoInterna(memoria){

if(!memoria.avaliacaoInterna){
return "Avaliação interna não disponível."
}

return {
observacao:memoria.avaliacaoInterna.observacaoInterna,
campoEmocionalDominante:memoria.avaliacaoInterna.campoEmocionalDominante
}

},



gerarAvaliacaoGlobal(memoria){

if(!memoria.avaliacaoGlobal){
return "Avaliação global não disponível."
}

return {
observacao:memoria.avaliacaoGlobal.observacaoGlobal,
potencialExpansao:memoria.avaliacaoGlobal.potencialExpansao
}

},



gerarClassificacaoPublica(memoria){

if(!memoria.classificacaoPreliminar){
return "Classificação pública não disponível."
}

return {
notaHistoria:memoria.classificacaoPreliminar.notaInternaHistoria_10,
notaObra:memoria.classificacaoPreliminar.notaGlobalObra_10
}

},



gerarClassificacaoInterna(memoria){

if(!memoria.classificacaoPreliminar){
return "Classificação interna não disponível."
}

return {
notaHistoria:memoria.classificacaoPreliminar.notaInternaHistoria_100k,
notaObra:memoria.classificacaoPreliminar.notaGlobalObra_100k,
faixaHistoria:memoria.classificacaoPreliminar.faixaInterna,
faixaObra:memoria.classificacaoPreliminar.faixaGlobal
}

},



exportarTextoCompleto(){

const relatorio = this.gerar()

if(typeof relatorio === "string"){
return relatorio
}

let linhas = []

linhas.push("RELATÓRIO PSICOESTRUTURAL — LAPIDAR PSICOESTUDO")
linhas.push("")

linhas.push("Título: " + relatorio.identificacao.titulo)
linhas.push("Autor: " + relatorio.identificacao.autor)
linhas.push("Gênero: " + relatorio.identificacao.genero)

linhas.push("")
linhas.push("SAÍDA BASE:")
linhas.push(relatorio.saidaBase)

linhas.push("")
linhas.push("AVALIAÇÃO INTERNA:")
linhas.push(relatorio.avaliacaoInterna.observacao)
linhas.push("Campo emocional dominante: " +
relatorio.avaliacaoInterna.campoEmocionalDominante)

linhas.push("")
linhas.push("AVALIAÇÃO GLOBAL:")
linhas.push(relatorio.avaliacaoGlobal.observacao)
linhas.push("Potencial de expansão: " +
relatorio.avaliacaoGlobal.potencialExpansao)

linhas.push("")
linhas.push("CLASSIFICAÇÃO PÚBLICA:")
linhas.push("História: " +
relatorio.classificacaoPublica.notaHistoria + " / 10")

linhas.push("Obra: " +
relatorio.classificacaoPublica.notaObra + " / 10")

linhas.push("")
linhas.push("CLASSIFICAÇÃO INTERNA (USO TÉCNICO):")
linhas.push("História: " +
relatorio.classificacaoInterna.notaHistoria)

linhas.push("Obra: " +
relatorio.classificacaoInterna.notaObra)

linhas.push("Faixa história: " +
relatorio.classificacaoInterna.faixaHistoria)

linhas.push("Faixa obra: " +
relatorio.classificacaoInterna.faixaObra)

return linhas.join("\n")

},



status(){

return PsicoCore.obterResumoEstado()

}



}


console.log("PSICO RELATÓRIO ATIVO")
