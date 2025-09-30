"use client"

import { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save, User } from "lucide-react";
import { useRouter } from "next/navigation";
// import { useToast } from "@/hooks/use-toast";

const UserEdit = () => {
    const router = useRouter();
    //   const { id } = useParams();
    //   const navigate = useNavigate();
    //   const { toast } = useToast();

    // Mock data - em produção viria de uma API
    const [formData, setFormData] = useState({
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
        salario: "8500",
        departamento: "Administração",
        dataAdmissao: "2020-01-15",
        tipoContrato: "CLT",
        cargaHoraria: "40h/semana",
        matriculaInterna: "EMP001",
        cep: "01234-567",
        estado: "SP",
        cidade: "São Paulo",
        logradouro: "Rua das Flores",
        numero: "123",
        bairro: "Centro",
        complemento: "Apto 45"
    });

    //   const handleSubmit = (e: React.FormEvent) => {
    //     e.preventDefault();
    //     // Aqui faria a chamada da API para atualizar o usuário
    //     toast({
    //       title: "Usuário atualizado!",
    //       description: "As informações foram salvas com sucesso.",
    //     });
    //     navigate(`/usuario/${id}`);
    //   };

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
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
                    <h1 className="text-3xl font-bold">Editar Usuário</h1>
                    <p className="text-muted-foreground">
                        Altere as informações do usuário
                    </p>
                </div>
            </div>

            <form
                // onSubmit={handleSubmit}
                className="space-y-6"
            >
                {/* Dados Pessoais */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User className="w-5 h-5" />
                            Dados Pessoais
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="nome">Nome Completo*</Label>
                                <Input
                                    id="nome"
                                    value={formData.nome}
                                    onChange={(e) => handleChange("nome", e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email*</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleChange("email", e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="rg">RG*</Label>
                                <Input
                                    id="rg"
                                    value={formData.rg}
                                    onChange={(e) => handleChange("rg", e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="orgaoExpedidor">Órgão Expedidor*</Label>
                                <Input
                                    id="orgaoExpedidor"
                                    value={formData.orgaoExpedidor}
                                    onChange={(e) => handleChange("orgaoExpedidor", e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="estadoCivil">Estado Civil*</Label>
                                <Select value={formData.estadoCivil} onValueChange={(value) => handleChange("estadoCivil", value)}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Solteiro(a)">Solteiro(a)</SelectItem>
                                        <SelectItem value="Casado(a)">Casado(a)</SelectItem>
                                        <SelectItem value="Divorciado(a)">Divorciado(a)</SelectItem>
                                        <SelectItem value="Viúvo(a)">Viúvo(a)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="profissao">Profissão*</Label>
                                <Input
                                    id="profissao"
                                    value={formData.profissao}
                                    onChange={(e) => handleChange("profissao", e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="dataNascimento">Data de Nascimento*</Label>
                                <Input
                                    id="dataNascimento"
                                    type="date"
                                    value={formData.dataNascimento}
                                    onChange={(e) => handleChange("dataNascimento", e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="celular1">Celular Principal*</Label>
                                <Input
                                    id="celular1"
                                    value={formData.celular1}
                                    onChange={(e) => handleChange("celular1", e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="celular2">Celular Secundário</Label>
                                <Input
                                    id="celular2"
                                    value={formData.celular2}
                                    onChange={(e) => handleChange("celular2", e.target.value)}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Informações Profissionais - apenas para funcionários */}
                {formData.role === "funcionario" && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Informações Profissionais</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="cargo">Cargo*</Label>
                                    <Input
                                        id="cargo"
                                        value={formData.cargo}
                                        onChange={(e) => handleChange("cargo", e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="departamento">Departamento*</Label>
                                    <Input
                                        id="departamento"
                                        value={formData.departamento}
                                        onChange={(e) => handleChange("departamento", e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="salario">Salário*</Label>
                                    <Input
                                        id="salario"
                                        type="number"
                                        step="0.01"
                                        value={formData.salario}
                                        onChange={(e) => handleChange("salario", e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="dataAdmissao">Data de Admissão*</Label>
                                    <Input
                                        id="dataAdmissao"
                                        type="date"
                                        value={formData.dataAdmissao}
                                        onChange={(e) => handleChange("dataAdmissao", e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="tipoContrato">Tipo de Contrato*</Label>
                                    <Select value={formData.tipoContrato} onValueChange={(value) => handleChange("tipoContrato", value)}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="CLT">CLT</SelectItem>
                                            <SelectItem value="PJ">PJ</SelectItem>
                                            <SelectItem value="Estágio">Estágio</SelectItem>
                                            <SelectItem value="Terceirizado">Terceirizado</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="cargaHoraria">Carga Horária*</Label>
                                    <Input
                                        id="cargaHoraria"
                                        value={formData.cargaHoraria}
                                        onChange={(e) => handleChange("cargaHoraria", e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="matriculaInterna">Matrícula Interna*</Label>
                                    <Input
                                        id="matriculaInterna"
                                        value={formData.matriculaInterna}
                                        onChange={(e) => handleChange("matriculaInterna", e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Endereço */}
                <Card>
                    <CardHeader>
                        <CardTitle>Endereço</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="cep">CEP*</Label>
                                <Input
                                    id="cep"
                                    value={formData.cep}
                                    onChange={(e) => handleChange("cep", e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="estado">Estado*</Label>
                                <Input
                                    id="estado"
                                    value={formData.estado}
                                    onChange={(e) => handleChange("estado", e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="cidade">Cidade*</Label>
                                <Input
                                    id="cidade"
                                    value={formData.cidade}
                                    onChange={(e) => handleChange("cidade", e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="logradouro">Logradouro*</Label>
                                <Input
                                    id="logradouro"
                                    value={formData.logradouro}
                                    onChange={(e) => handleChange("logradouro", e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="numero">Número*</Label>
                                <Input
                                    id="numero"
                                    value={formData.numero}
                                    onChange={(e) => handleChange("numero", e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="bairro">Bairro*</Label>
                                <Input
                                    id="bairro"
                                    value={formData.bairro}
                                    onChange={(e) => handleChange("bairro", e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="complemento">Complemento</Label>
                                <Input
                                    id="complemento"
                                    value={formData.complemento}
                                    onChange={(e) => handleChange("complemento", e.target.value)}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end gap-4">
                    <Button
                        type="button"
                        variant="outline"
                        // onClick={() => navigate(`/usuario/${id}`)}
                    >
                        Cancelar
                    </Button>
                    <Button type="submit" className="bg-primary hover:bg-primary-hover">
                        <Save className="w-4 h-4 mr-2" />
                        Salvar Alterações
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default UserEdit;