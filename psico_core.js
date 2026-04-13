/*
PSICO CORE
Lapidar PsicoEstudo

Responsável por:

– armazenar a obra em análise
– registrar estado atual do módulo
– guardar avaliação interna da história
– guardar avaliação global da obra
– guardar pontuação preliminar 0–100.000
– manter o relatório progressivo em construção
*/


const PsicoCore = {

estado:{
obraCarregada:false,
avaliacaoInternaExecutada:false,
avaliacaoGlobalExecutada:false,
classificacaoExecutada:false,
relatorioGerado:false
},


memoria:{
titulo:null,
autor:null,
genero:null,
textoBase:null,
saidaBase:null,
avaliacaoInterna:null,
avaliacaoGlobal:null,
classificacaoPreliminar:null,
relatorioProgressivo:null,
status:"nao_iniciado"
},



carregarObra(pacote){

if(!pacote || !pacote.textoBase || pacote.textoBase.trim()===""){
return "Nenhuma obra válida para carregar"
}

this.memoria.titulo = pacote.titulo || "sem_titulo"
this.memoria.autor = pacote.autor || "sem_autor"
this.memoria.genero = pacote.genero || "nao_identificado"
this.memoria.textoBase = pacote.textoBase
this.memoria.status = "obra_carregada"

this.estado.obraCarregada = true

return "Obra carregada no PsicoCore"
},



registrarSaidaBase(texto){

if(!texto || texto.trim()===""){
return "Saída base inválida"
}

this.memoria.saidaBase = texto
this.memoria.status = "saida_base_registrada"

return "Saída base registrada no PsicoCore"
},



registrarAvaliacaoInterna(dados){

if(!dados){
return "Avaliação interna inválida"
}

this.memoria.avaliacaoInterna = dados
this.memoria.status = "avaliacao_interna_registrada"
this.estado.avaliacaoInternaExecutada = true

return "Avaliação interna registrada no PsicoCore"
},



registrarAvaliacaoGlobal(dados){

if(!dados){
return "Avaliação global inválida"
}

this.memoria.avaliacaoGlobal = dados
this.memoria.status = "avaliacao_global_registrada"
this.estado.avaliacaoGlobalExecutada = true

return "Avaliação global registrada no PsicoCore"
},



registrarClassificacaoPreliminar(dados){

if(!dados){
return "Classificação preliminar inválida"
}

this.memoria.classificacaoPreliminar = dados
this.memoria.status = "classificacao_preliminar_registrada"
this.estado.classificacaoExecutada = true

return "Classificação preliminar registrada no PsicoCore"
},



registrarRelatorioProgressivo(relatorio){

if(!relatorio){
return "Relatório progressivo inválido"
}

this.memoria.relatorioProgressivo = relatorio
this.memoria.status = "relatorio_progressivo_gerado"
this.estado.relatorioGerado = true

return "Relatório progressivo registrado no PsicoCore"
},



obterTextoBase(){
return this.memoria.textoBase || ""
},



obterResumoEstado(){
return {
estado:this.estado,
memoria:{
titulo:this.memoria.titulo,
autor:this.memoria.autor,
genero:this.memoria.genero,
status:this.memoria.status,
possuiTextoBase:!!this.memoria.textoBase,
possuiSaidaBase:!!this.memoria.saidaBase,
possuiAvaliacaoInterna:!!this.memoria.avaliacaoInterna,
possuiAvaliacaoGlobal:!!this.memoria.avaliacaoGlobal,
possuiClassificacaoPreliminar:!!this.memoria.classificacaoPreliminar,
possuiRelatorioProgressivo:!!this.memoria.relatorioProgressivo
}
}
},



status(){
return {
estado:this.estado,
memoria:this.memoria
}
},



resetar(){

this.estado = {
obraCarregada:false,
avaliacaoInternaExecutada:false,
avaliacaoGlobalExecutada:false,
classificacaoExecutada:false,
relatorioGerado:false
}

this.memoria = {
titulo:null,
autor:null,
genero:null,
textoBase:null,
saidaBase:null,
avaliacaoInterna:null,
avaliacaoGlobal:null,
classificacaoPreliminar:null,
relatorioProgressivo:null,
status:"nao_iniciado"
}

return "PsicoCore resetado com sucesso"
}

}


console.log("PSICO CORE ATIVO")
