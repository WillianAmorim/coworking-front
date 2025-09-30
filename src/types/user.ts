
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

interface Contacts {
  celular1?: string,
  celular2?: string
}

interface Client {
  clienteEstrangeiro: boolean,
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
  dataAdminissao: string,
  departamento: string,
  matriculaInterna: string,
  salario: number,
  tipoContrato: string
}


export interface Users {
  id: number;
  nome: string;
  email: string;
  senha: string;
  role: UserRole | string;
  rg: string;
  orgaoExpedidor: string;
  estadoCivil: EstadoCivil | string;
  profissao: string;
  dataNascimento: string;
  criadoEm: string;
  atualizadoEm: string;

  contacts: Contacts[]
  client: Client
  employee: Employee

  cargo?: string;
  departamento?: string;
  plano?: string;
  tipoPessoa?: string;
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

