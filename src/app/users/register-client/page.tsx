"use client"

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
// import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save, User, Building } from "lucide-react";
// import { useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation";
import userService from "@/services/userService";

const ClientForm = () => {
    // const navigate = useNavigate();
    // const { toast } = useToast();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const initialFormData = {
        // Dados pessoais
        nome: "",
        email: "",
        senha: "",
        rg: "",
        orgaoExpedidor: "",
        estadoCivil: "",
        profissao: "",
        dataNascimento: "",

        // Dados do cliente
        plano: "",
        clienteEstrangeiro: false,
        meioFaturamentoPadrao: "",
        parceiroOrigemId: "",
        tipoPessoa: "",
        documento: "",
        razaoSocial: "",
        nomeFantasia: "",
        pronuncia: "",
        inscricaoMunicipal: "",
        inscricaoEstadual: "",
        ramoAtividade: "",
        dataFundacao: "",
        logoUrl: "",

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
    };

    const [formData, setFormData] = useState(initialFormData);


    const handleInputChange = (field: string, value: string | boolean) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const payload = {
                ...formData,
                dataNascimento: new Date(formData.dataNascimento),
                // salario: parseFloat(formData.salario),
                // dataAdmissao: new Date(formData.dataAdmissao)
            };
            await userService.addUserClient(payload)
            setFormData(initialFormData);

            // toast({
            //     title: "Cliente cadastrado!",
            //     description: "O cliente foi cadastrado com sucesso.",
            // });

            // navigate("/usuarios");
        } catch (error) {
            // toast({
            //     title: "Erro ao cadastrar",
            //     description: "Ocorreu um erro ao cadastrar o cliente.",
            //     variant: "destructive",
            // });
        } finally {
            setIsLoading(false);
        }
    };

    const isPJ = formData.tipoPessoa === "PJ";

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
                    <h1 className="text-3xl font-bold">Cadastro de Cliente</h1>
                    <p className="text-muted-foreground">
                        Preencha os dados do novo cliente
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
                                    <SelectItem value="SOLTEIRO">Solteiro(a)</SelectItem>
                                    <SelectItem value="CASADO">Casado(a)</SelectItem>
                                    <SelectItem value="DIVORCIADO">Divorciado(a)</SelectItem>
                                    <SelectItem value="VIUVO">Viúvo(a)</SelectItem>
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
                        <CardTitle>Dados do Cliente</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="plano">Plano *</Label>
                            <Select value={formData.plano} onValueChange={(value) => handleInputChange("plano", value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione o plano" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Mensal">Mensal</SelectItem>
                                    <SelectItem value="Diário">Diário</SelectItem>
                                    <SelectItem value="Flex">Flex</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="tipoPessoa">Tipo de Pessoa *</Label>
                            <Select value={formData.tipoPessoa} onValueChange={(value) => handleInputChange("tipoPessoa", value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="PF">Pessoa Física</SelectItem>
                                    <SelectItem value="PJ">Pessoa Jurídica</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="documento">{isPJ ? "CNPJ" : "CPF"}</Label>
                            <Input
                                id="documento"
                                value={formData.documento}
                                onChange={(e) => handleInputChange("documento", e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="meioFaturamentoPadrao">Meio de Faturamento</Label>
                            <Select value={formData.meioFaturamentoPadrao} onValueChange={(value) => handleInputChange("meioFaturamentoPadrao", value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Boleto">Boleto</SelectItem>
                                    <SelectItem value="PIX">PIX</SelectItem>
                                    <SelectItem value="Cartão">Cartão de Crédito</SelectItem>
                                    <SelectItem value="Dinheiro">Dinheiro</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {isPJ && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <Building className="w-5 h-5" />
                                <span>Dados da Empresa</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="razaoSocial">Razão Social</Label>
                                <Input
                                    id="razaoSocial"
                                    value={formData.razaoSocial}
                                    onChange={(e) => handleInputChange("razaoSocial", e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="nomeFantasia">Nome Fantasia</Label>
                                <Input
                                    id="nomeFantasia"
                                    value={formData.nomeFantasia}
                                    onChange={(e) => handleInputChange("nomeFantasia", e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="inscricaoMunicipal">Inscrição Municipal</Label>
                                <Input
                                    id="inscricaoMunicipal"
                                    value={formData.inscricaoMunicipal}
                                    onChange={(e) => handleInputChange("inscricaoMunicipal", e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="inscricaoEstadual">Inscrição Estadual</Label>
                                <Input
                                    id="inscricaoEstadual"
                                    value={formData.inscricaoEstadual}
                                    onChange={(e) => handleInputChange("inscricaoEstadual", e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="ramoAtividade">Ramo de Atividade</Label>
                                <Input
                                    id="ramoAtividade"
                                    value={formData.ramoAtividade}
                                    onChange={(e) => handleInputChange("ramoAtividade", e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="dataFundacao">Data de Fundação</Label>
                                <Input
                                    id="dataFundacao"
                                    type="date"
                                    value={formData.dataFundacao}
                                    onChange={(e) => handleInputChange("dataFundacao", e.target.value)}
                                />
                            </div>
                        </CardContent>
                    </Card>
                )}

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
                                Salvar Cliente
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default ClientForm;