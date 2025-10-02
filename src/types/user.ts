interface Client {
  dataFundacao: string,
  documento: string,
  inscricaoEstadual: string
  inscricaoMunicipal: string
  logoUrl: string,
  meioFaturamentoPadrao: string,
  nomeFantasia: string,
  parceiroOrigemId: string,
  plano: string,
  pronuncia: string,
  ramoAtividade: string,
  razaoSocial: string,
  tipoPessoa: string
}

interface Employee {
  cargaHoraria: string,
  cargo: string,
  dataAdmissao: string,
  departamento: string,
  matriculaInterna: string,
  salario: string,
  tipoContrato: string
}

interface Addresses {
  cep: string,
  estado: string,
  cidade: string,
  logradouro: string,
  numero: string,
  bairro: string,
  complemento: string
}

// interface User {
  
// }


export interface Users {
  id?: string;
  nome: string;
  email: string;
  senha: string;
  role: string;
  rg: string;
  orgaoExpedidor: string;
  estadoCivil: string;
  profissao: string;
  dataNascimento: string;
  criadoEm?: string;
  atualizadoEm?: string;
  celular1: string,
  celular2?: string,

  client?: Client
  employee?: Employee
  addresses: Addresses
}



