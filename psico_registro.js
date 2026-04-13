/*
PSICO REGISTRO
Lapidar PsicoEstudo

Responsável por:

– registrar execuções do módulo
– manter trilha de auditoria
– registrar etapas da análise
– registrar geração de classificação preliminar
– preservar histórico sem violar a espinha dorsal
*/


const PsicoRegistro = {

chaveRegistro:"lapidar_psico_registro",


estruturaBase(){
return {
execucoes:[],
ultimaAtualizacao:null
}
},



lerRegistro(){

let bruto = localStorage.getItem(this.chaveRegistro)

if(!bruto){
return this.estruturaBase()
}

try{
return JSON.parse(bruto)
}catch(e){
return this.estruturaBase()
}

},



salvarRegistro(registro){

registro.ultimaAtualizacao = new Date().toISOString()

localStorage.setItem(
this.chaveRegistro,
JSON.stringify(registro)
)

return "Registro do PsicoEstudo atualizado com sucesso"

},



registrarExecucao(etapa, detalhe){

let registro = this.lerRegistro()

registro.execucoes.push({
etapa:etapa || "etapa_nao_informada",
detalhe:detalhe || "sem_detalhe",
tituloObra:
(typeof PsicoCore !== "undefined" && PsicoCore.memoria.titulo)
? PsicoCore.memoria.titulo
: "sem_titulo",
autor:
(typeof PsicoCore !== "undefined" && PsicoCore.memoria.autor)
? PsicoCore.memoria.autor
: "sem_autor",
data:new Date().toISOString()
})

return this.salvarRegistro(registro)

},



registrarCargaObra(){

if(typeof PsicoCore === "undefined"){
return "PsicoCore não disponível"
}

return this.registrarExecucao(
"obra_carregada",
"Obra carregada no PsicoCore"
)

},



registrarAvaliacaoInterna(){

return this.registrarExecucao(
"avaliacao_interna_executada",
"Avaliação interna da história executada"
)

},



registrarAvaliacaoGlobal(){

return this.registrarExecucao(
"avaliacao_global_executada",
"Avaliação global da obra executada"
)

},



registrarClassificacao(){

return this.registrarExecucao(
"classificacao_preliminar_executada",
"Classificação preliminar 0–100.000 gerada e nota pública derivada"
)

},



registrarRelatorio(){

return this.registrarExecucao(
"relatorio_progressivo_gerado",
"Relatório progressivo do PsicoEstudo gerado"
)

},



verHistorico(){

return JSON.stringify(
this.lerRegistro(),
null,
2
)

},



ultimaExecucao(){

let registro = this.lerRegistro()

if(!registro.execucoes || registro.execucoes.length === 0){
return "Nenhuma execução registrada"
}

return registro.execucoes[registro.execucoes.length - 1]

},



limparRegistro(){

localStorage.removeItem(this.chaveRegistro)

return "Registro do PsicoEstudo removido com sucesso"

},



exportarRegistro(){

const conteudo = this.verHistorico()

const blob = new Blob(
[conteudo],
{ type:"application/json" }
)

const url = URL.createObjectURL(blob)
const a = document.createElement("a")
a.href = url
a.download = "psico_registro.json"
a.click()

setTimeout(() => {
URL.revokeObjectURL(url)
}, 1000)

return "Registro do PsicoEstudo exportado com sucesso"

},



status(){

const registro = this.lerRegistro()

return {
quantidadeExecucoes: registro.execucoes ? registro.execucoes.length : 0,
ultimaAtualizacao: registro.ultimaAtualizacao || null
}

}

}


console.log("PSICO REGISTRO ATIVO")
