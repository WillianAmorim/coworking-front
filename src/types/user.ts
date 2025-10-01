
export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  EMPLOYEE = 'EMPLOYEE',
  CLIENT = 'CLIENT'
}


export enum EstadoCivil {
  SOLTEIRO = 'SOLTEIRO',
  CASADO = 'CASADO',
  DIVORCIADO = 'DIVORCIADO',
  VIUVO = 'VIUVO'
}

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

interface User {
  nome: string;
  email: string;
  senha: string;
  role: UserRole | string;
  rg: string;
  orgaoExpedidor: string;
  estadoCivil: EstadoCivil | string;
  profissao: string;
  dataNascimento: string;
  criadoEm?: string;
  atualizadoEm?: string;
  celular1: string,
  celular2?: string,
}


export interface Users {
  user: User;
  client?: Client
  employee?: Employee
  addresses: Addresses
}


export interface CreateUser {
  nome: string;
  email: string;
  senha: string;
  role?: UserRole | string;
  rg: string;
  orgaoExpedidor: string;
  estadoCivil: EstadoCivil | string;
  profissao: string;
  dataNascimento: string;
}

