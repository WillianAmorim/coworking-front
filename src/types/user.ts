
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


export interface Users{
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

  celular1?: string;          
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

