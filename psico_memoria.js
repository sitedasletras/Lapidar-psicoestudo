/*
PSICO MEMÓRIA
Lapidar PsicoEstudo

Responsável por:

– salvar estado atual do módulo
– guardar última obra analisada
– preservar avaliações executadas
– manter classificação preliminar
– restaurar continuidade interna da ferramenta
*/


const PsicoMemoria = {

chaveMemoria:"lapidar_psico_memoria",


estruturaBase(){
return {
titulo:null,
autor:null,
genero:null,
textoBase:null,
saidaBase:null,
avaliacaoInterna:null,
avaliacaoGlobal:null,
classificacaoPreliminar:null,
relatorioProgressivo:null,
status:"nao_iniciado",
ultimaAtualizacao:null
}
},



lerMemoria(){

let bruto = localStorage.getItem(this.chaveMemoria)

if(!bruto){
return this.estruturaBase()
}

try{
return JSON.parse(bruto)
}catch(e){
return this.estruturaBase()
}

},



salvarMemoria(){

if(typeof PsicoCore === "undefined"){
return "PsicoCore não disponível"
}

let memoria = {
titulo:PsicoCore.memoria.titulo,
autor:PsicoCore.memoria.autor,
genero:PsicoCore.memoria.genero,
textoBase:PsicoCore.memoria.textoBase,
saidaBase:PsicoCore.memoria.saidaBase,
avaliacaoInterna:PsicoCore.memoria.avaliacaoInterna,
avaliacaoGlobal:PsicoCore.memoria.avaliacaoGlobal,
classificacaoPreliminar:PsicoCore.memoria.classificacaoPreliminar,
relatorioProgressivo:PsicoCore.memoria.relatorioProgressivo,
status:PsicoCore.memoria.status,
ultimaAtualizacao:new Date().toISOString()
}

localStorage.setItem(
this.chaveMemoria,
JSON.stringify(memoria)
)

return "Memória do PsicoEstudo salva com sucesso"

},



carregarMemoria(){

if(typeof PsicoCore === "undefined"){
return "PsicoCore não disponível"
}

let memoria = this.lerMemoria()

PsicoCore.memoria.titulo = memoria.titulo
PsicoCore.memoria.autor = memoria.autor
PsicoCore.memoria.genero = memoria.genero
PsicoCore.memoria.textoBase = memoria.textoBase
PsicoCore.memoria.saidaBase = memoria.saidaBase
PsicoCore.memoria.avaliacaoInterna = memoria.avaliacaoInterna
PsicoCore.memoria.avaliacaoGlobal = memoria.avaliacaoGlobal
PsicoCore.memoria.classificacaoPreliminar = memoria.classificacaoPreliminar
PsicoCore.memoria.relatorioProgressivo = memoria.relatorioProgressivo
PsicoCore.memoria.status = memoria.status || "memoria_carregada"

PsicoCore.estado.obraCarregada = !!memoria.textoBase
PsicoCore.estado.avaliacaoInternaExecutada = !!memoria.avaliacaoInterna
PsicoCore.estado.avaliacaoGlobalExecutada = !!memoria.avaliacaoGlobal
PsicoCore.estado.classificacaoExecutada = !!memoria.classificacaoPreliminar
PsicoCore.estado.relatorioGerado = !!memoria.relatorioProgressivo

return "Memória do PsicoEstudo carregada com sucesso"

},



verMemoria(){

return JSON.stringify(
this.lerMemoria(),
null,
2
)

},



limparMemoria(){

localStorage.removeItem(this.chaveMemoria)

return "Memória do PsicoEstudo removida com sucesso"

},



status(){

const memoria = this.lerMemoria()

return {
possuiTitulo:!!memoria.titulo,
possuiAutor:!!memoria.autor,
possuiGenero:!!memoria.genero,
possuiTextoBase:!!memoria.textoBase,
possuiSaidaBase:!!memoria.saidaBase,
possuiAvaliacaoInterna:!!memoria.avaliacaoInterna,
possuiAvaliacaoGlobal:!!memoria.avaliacaoGlobal,
possuiClassificacaoPreliminar:!!memoria.classificacaoPreliminar,
possuiRelatorioProgressivo:!!memoria.relatorioProgressivo,
ultimaAtualizacao:memoria.ultimaAtualizacao || null
}

}

}


console.log("PSICO MEMÓRIA ATIVA")
