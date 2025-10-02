"use client"

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Edit, Mail, Phone, User, Calendar, MapPin, Briefcase } from "lucide-react";
import { useRouter } from "next/navigation";
import userService from "@/services/userService";
import { use } from "react";

interface ParamsType {
    id: number;
}

const UserDetails = ({ params }: { params: Promise<ParamsType> }) => {
    const router = useRouter();

    const [user, setUser] = useState<any>('')

    const { id } = use(params);

    useEffect(() => {
        if (!id) return

        const getUserById = async () => {
            const resultUser = await userService.getUserById(Number(id))
            console.log(resultUser, "resultUser")
            setUser(resultUser)
        }

        getUserById()
    }, [id])


    const getRoleBadge = (role: string) => {
        return role === "FUNCIONARIO" ? (
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
                    onClick={() => router.push(`/users/edit-user/${id}`)}
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
                                    <CardTitle className="text-2xl">{user.nome}</CardTitle>
                                    <div className="flex items-center gap-2 mt-1">
                                        {getRoleBadge(user.role)}
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
                                        <div><strong>RG:</strong> {user.rg}</div>
                                        <div><strong>Órgão Expedidor:</strong> {user.orgaoExpedidor}</div>
                                        <div><strong>Estado Civil:</strong> {user.estadoCivil}</div>
                                        <div><strong>Profissão:</strong> {user.profissao}</div>
                                        <div><strong>Data de Nascimento:</strong> {new Date(user.dataNascimento).toLocaleDateString()}</div>
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
                                            {user.email}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Phone className="w-3 h-3" />
                                            {user?.celular1 ?? 'Sem informação'}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Phone className="w-3 h-3" />
                                            {user?.celular2 ?? 'Sem informação'}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {user.role === "FUNCIONARIO" && (
                                <div>
                                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                                        <Briefcase className="w-4 h-4" />
                                        Informações Profissionais
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                        <div><strong>Cargo:</strong> {user.employee?.cargo}</div>
                                        <div><strong>Departamento:</strong> {user.employee?.departamento}</div>
                                        <div><strong>Salário:</strong> R$ {user.salario.toLocaleString()}</div>
                                        <div><strong>Data de Admissão:</strong> {new Date(user.employee?.dataAdmissao).toLocaleDateString()}</div>
                                        <div><strong>Tipo de Contrato:</strong> {user.employee?.tipoContrato}</div>
                                        <div><strong>Carga Horária:</strong> {user.employee?.cargaHoraria}</div>
                                        <div><strong>Matrícula:</strong> {user.employee?.matriculaInterna}</div>
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
                            <div><strong>CEP:</strong> {user.addresses?.cep}</div>
                            <div><strong>Logradouro:</strong> {user.addresses?.logradouro}, {user.addresses?.numero}</div>
                            <div><strong>Bairro:</strong> {user.addresses?.bairro}</div>
                            <div><strong>Cidade:</strong> {user.addresses?.cidade} - {user.addresses?.estado}</div>
                            {user.addresses?.complemento && (
                                <div><strong>Complemento:</strong> {user.addresses?.complemento}</div>
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
                            <div><strong>ID:</strong> #{user.id}</div>
                            <div><strong>Criado em:</strong>{user.criadoEm}</div>
                            <div><strong>Atualizado em:</strong>{user.atualizadoEm}</div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;