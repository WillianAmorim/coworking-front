"use client"

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save, User } from "lucide-react";
// import { useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation";

const EmployeeForm = () => {
    // const navigate = useNavigate();
    // const { toast } = useToast();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        // Dados pessoais
        nome: "",
        email: "",
        senha: "",
        rg: "",
        orgaoExpedidor: "",
        estadoCivil: "",
        profissao: "",
        dataNascimento: "",

        // Dados profissionais
        cargo: "",
        salario: "",
        departamento: "",
        dataAdmissao: "",
        tipoContrato: "",
        cargaHoraria: "",
        matriculaInterna: "",

        // Endereço
        cep: "",
        estado: "",
        cidade: "",
        logradouro: "",
        numero: "",
        bairro: "",
        complemento: "",

        // Contato
        celular1: "",
        celular2: "",
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Simular chamada da API
            await new Promise(resolve => setTimeout(resolve, 1000));

            // toast({
            //     title: "Funcionário cadastrado!",
            //     description: "O funcionário foi cadastrado com sucesso.",
            // });

            // navigate("/usuarios");
        } catch (error) {
            // toast({
            //     title: "Erro ao cadastrar",
            //     description: "Ocorreu um erro ao cadastrar o funcionário.",
            //     variant: "destructive",
            // });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center space-x-4">
                <Button
                    variant="outline"
                    onClick={() => router.back()}
                    className="flex items-center space-x-2"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Voltar</span>
                </Button>
                <div>
                    <h1 className="text-3xl font-bold">Cadastro de Funcionário</h1>
                    <p className="text-muted-foreground">
                        Preencha os dados do novo funcionário
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <User className="w-5 h-5" />
                            <span>Dados Pessoais</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="nome">Nome Completo *</Label>
                            <Input
                                id="nome"
                                value={formData.nome}
                                onChange={(e) => handleInputChange("nome", e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email *</Label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleInputChange("email", e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="senha">Senha *</Label>
                            <Input
                                id="senha"
                                type="password"
                                value={formData.senha}
                                onChange={(e) => handleInputChange("senha", e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="rg">RG *</Label>
                            <Input
                                id="rg"
                                value={formData.rg}
                                onChange={(e) => handleInputChange("rg", e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="orgaoExpedidor">Órgão Expedidor *</Label>
                            <Input
                                id="orgaoExpedidor"
                                value={formData.orgaoExpedidor}
                                onChange={(e) => handleInputChange("orgaoExpedidor", e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="estadoCivil">Estado Civil</Label>
                            <Select value={formData.estadoCivil} onValueChange={(value) => handleInputChange("estadoCivil", value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="solteiro">Solteiro(a)</SelectItem>
                                    <SelectItem value="casado">Casado(a)</SelectItem>
                                    <SelectItem value="divorciado">Divorciado(a)</SelectItem>
                                    <SelectItem value="viuvo">Viúvo(a)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="profissao">Profissão</Label>
                            <Input
                                id="profissao"
                                value={formData.profissao}
                                onChange={(e) => handleInputChange("profissao", e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="dataNascimento">Data de Nascimento</Label>
                            <Input
                                id="dataNascimento"
                                type="date"
                                value={formData.dataNascimento}
                                onChange={(e) => handleInputChange("dataNascimento", e.target.value)}
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Dados Profissionais</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="cargo">Cargo *</Label>
                            <Input
                                id="cargo"
                                value={formData.cargo}
                                onChange={(e) => handleInputChange("cargo", e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="salario">Salário</Label>
                            <Input
                                id="salario"
                                type="number"
                                step="0.01"
                                value={formData.salario}
                                onChange={(e) => handleInputChange("salario", e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="departamento">Departamento</Label>
                            <Input
                                id="departamento"
                                value={formData.departamento}
                                onChange={(e) => handleInputChange("departamento", e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="dataAdmissao">Data de Admissão</Label>
                            <Input
                                id="dataAdmissao"
                                type="date"
                                value={formData.dataAdmissao}
                                onChange={(e) => handleInputChange("dataAdmissao", e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="tipoContrato">Tipo de Contrato</Label>
                            <Select value={formData.tipoContrato} onValueChange={(value) => handleInputChange("tipoContrato", value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="clt">CLT</SelectItem>
                                    <SelectItem value="pj">PJ</SelectItem>
                                    <SelectItem value="estagio">Estágio</SelectItem>
                                    <SelectItem value="terceirizado">Terceirizado</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="cargaHoraria">Carga Horária</Label>
                            <Input
                                id="cargaHoraria"
                                value={formData.cargaHoraria}
                                onChange={(e) => handleInputChange("cargaHoraria", e.target.value)}
                                placeholder="Ex: 40h/semana"
                            />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="matriculaInterna">Matrícula Interna</Label>
                            <Input
                                id="matriculaInterna"
                                value={formData.matriculaInterna}
                                onChange={(e) => handleInputChange("matriculaInterna", e.target.value)}
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Endereço</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="cep">CEP</Label>
                            <Input
                                id="cep"
                                value={formData.cep}
                                onChange={(e) => handleInputChange("cep", e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="estado">Estado</Label>
                            <Input
                                id="estado"
                                value={formData.estado}
                                onChange={(e) => handleInputChange("estado", e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="cidade">Cidade</Label>
                            <Input
                                id="cidade"
                                value={formData.cidade}
                                onChange={(e) => handleInputChange("cidade", e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="logradouro">Logradouro</Label>
                            <Input
                                id="logradouro"
                                value={formData.logradouro}
                                onChange={(e) => handleInputChange("logradouro", e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="numero">Número</Label>
                            <Input
                                id="numero"
                                value={formData.numero}
                                onChange={(e) => handleInputChange("numero", e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="bairro">Bairro</Label>
                            <Input
                                id="bairro"
                                value={formData.bairro}
                                onChange={(e) => handleInputChange("bairro", e.target.value)}
                            />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="complemento">Complemento</Label>
                            <Input
                                id="complemento"
                                value={formData.complemento}
                                onChange={(e) => handleInputChange("complemento", e.target.value)}
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Contato</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="celular1">Celular Principal *</Label>
                            <Input
                                id="celular1"
                                value={formData.celular1}
                                onChange={(e) => handleInputChange("celular1", e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="celular2">Celular Secundário</Label>
                            <Input
                                id="celular2"
                                value={formData.celular2}
                                onChange={(e) => handleInputChange("celular2", e.target.value)}
                            />
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end space-x-4">
                    <Button
                        type="button"
                        variant="outline"
                        // onClick={() => navigate("/usuarios")}
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="bg-primary hover:bg-primary-hover"
                    >
                        {isLoading ? (
                            "Salvando..."
                        ) : (
                            <>
                                <Save className="w-4 h-4 mr-2" />
                                Salvar Funcionário
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default EmployeeForm;