"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Edit, Mail, Phone, User, Calendar, MapPin, Briefcase } from "lucide-react";
import { useRouter } from "next/navigation";

// Mock data - em produção viria de uma API
const mockUser = {
    id: 1,
    nome: "Ana Silva",
    email: "ana.silva@coworkspace.com",
    role: "funcionario",
    rg: "12.345.678-9",
    orgaoExpedidor: "SSP/SP",
    estadoCivil: "Solteira",
    profissao: "Administradora",
    dataNascimento: "1985-03-15",
    celular1: "(11) 99999-9999",
    celular2: "(11) 88888-8888",
    cargo: "Gerente",
    salario: 8500.00,
    departamento: "Administração",
    dataAdmissao: "2020-01-15",
    tipoContrato: "CLT",
    cargaHoraria: "40h/semana",
    matriculaInterna: "EMP001",
    endereco: {
        cep: "01234-567",
        estado: "SP",
        cidade: "São Paulo",
        logradouro: "Rua das Flores",
        numero: "123",
        bairro: "Centro",
        complemento: "Apto 45"
    }
};

// interface UserPageProps {
//     params: { userId: string };
// }

const UserDetails = () => {
    const router = useRouter();

    // const { userId } = params;

    const getRoleBadge = (role: string) => {
        return role === "funcionario" ? (
            <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                Funcionário
            </Badge>
        ) : (
            <Badge variant="default" className="bg-primary text-primary-foreground">
                Cliente
            </Badge>
        );
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button
                    variant="outline"
                    size="sm"
                onClick={() => router.back()}
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Voltar
                </Button>
                <div className="flex-1">
                    <h1 className="text-3xl font-bold">Detalhes do Usuário</h1>
                    <p className="text-muted-foreground">
                        Informações completas do usuário
                    </p>
                </div>
                <Button
                    // onClick={() => navigate(`/usuario/${id}/editar`)}
                    className="bg-primary hover:bg-primary-hover"
                >
                    <Edit className="w-4 h-4 mr-2" />
                    Editar
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Informações Básicas */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                                    <User className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <CardTitle className="text-2xl">{mockUser.nome}</CardTitle>
                                    <div className="flex items-center gap-2 mt-1">
                                        {getRoleBadge(mockUser.role)}
                                    </div>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                                        <User className="w-4 h-4" />
                                        Dados Pessoais
                                    </h3>
                                    <div className="space-y-2 text-sm">
                                        <div><strong>RG:</strong> {mockUser.rg}</div>
                                        <div><strong>Órgão Expedidor:</strong> {mockUser.orgaoExpedidor}</div>
                                        <div><strong>Estado Civil:</strong> {mockUser.estadoCivil}</div>
                                        <div><strong>Profissão:</strong> {mockUser.profissao}</div>
                                        <div><strong>Data de Nascimento:</strong> {new Date(mockUser.dataNascimento).toLocaleDateString()}</div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                                        <Phone className="w-4 h-4" />
                                        Contato
                                    </h3>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex items-center gap-2">
                                            <Mail className="w-3 h-3" />
                                            {mockUser.email}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Phone className="w-3 h-3" />
                                            {mockUser.celular1}
                                        </div>
                                        {mockUser.celular2 && (
                                            <div className="flex items-center gap-2">
                                                <Phone className="w-3 h-3" />
                                                {mockUser.celular2}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {mockUser.role === "funcionario" && (
                                <div>
                                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                                        <Briefcase className="w-4 h-4" />
                                        Informações Profissionais
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                        <div><strong>Cargo:</strong> {mockUser.cargo}</div>
                                        <div><strong>Departamento:</strong> {mockUser.departamento}</div>
                                        <div><strong>Salário:</strong> R$ {mockUser.salario.toLocaleString()}</div>
                                        <div><strong>Data de Admissão:</strong> {new Date(mockUser.dataAdmissao).toLocaleDateString()}</div>
                                        <div><strong>Tipo de Contrato:</strong> {mockUser.tipoContrato}</div>
                                        <div><strong>Carga Horária:</strong> {mockUser.cargaHoraria}</div>
                                        <div><strong>Matrícula:</strong> {mockUser.matriculaInterna}</div>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar com informações adicionais */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                Endereço
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                            <div><strong>CEP:</strong> {mockUser.endereco.cep}</div>
                            <div><strong>Logradouro:</strong> {mockUser.endereco.logradouro}, {mockUser.endereco.numero}</div>
                            <div><strong>Bairro:</strong> {mockUser.endereco.bairro}</div>
                            <div><strong>Cidade:</strong> {mockUser.endereco.cidade} - {mockUser.endereco.estado}</div>
                            {mockUser.endereco.complemento && (
                                <div><strong>Complemento:</strong> {mockUser.endereco.complemento}</div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                Informações do Sistema
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                            <div><strong>ID:</strong> #{mockUser.id}</div>
                            <div><strong>Criado em:</strong> 15/01/2020</div>
                            <div><strong>Atualizado em:</strong> 20/12/2024</div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;