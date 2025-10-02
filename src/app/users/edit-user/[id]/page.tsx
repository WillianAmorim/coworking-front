"use client"

import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Briefcase, Building2, Save, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { use } from "react";
import userService from "@/services/userService";
import { Users } from "@/types/user";
// import { useToast } from "@/hooks/use-toast";

interface ParamsType {
    id: number;
}

const UserEdit = ({ params }: { params: Promise<ParamsType> }) => {
    const router = useRouter();
    const { id } = use(params);

    const [user, setUser] = useState<Users>()

    const [formData, setFormData] = useState({
            nome: user?.nome,
            email: user?.email,
            role: user?.role,
            rg: user?.rg,
            orgaoExpedidor: user?.orgaoExpedidor,
            estadoCivil: user?.estadoCivil,
            profissao: user?.profissao,
            dataNascimento: user?.dataNascimento,
            celular1: user?.celular1,
            celular2: user?.celular2,

        employee: {
            cargo: user?.employee?.cargo,
            salario: user?.employee?.salario,
            departamento: user?.employee?.departamento,
            dataAdmissao: user?.employee?.dataAdmissao,
            tipoContrato: user?.employee?.tipoContrato,
            cargaHoraria: user?.employee?.cargaHoraria,
            matriculaInterna: user?.employee?.matriculaInterna,
        },

        client: {
            plano: user?.client?.plano,
            dataFundacao: user?.client?.dataFundacao,
            documento: user?.client?.documento,
            inscricaoEstadual: user?.client?.inscricaoEstadual,
            inscricaoMunicipal: user?.client?.inscricaoMunicipal,
            meioFaturamentoPadrao: user?.client?.meioFaturamentoPadrao,
            nomeFantasia: user?.client?.nomeFantasia,
            parceiroOrigemId: user?.client?.parceiroOrigemId,
            pronuncia: user?.client?.pronuncia,
            ramoAtividade: user?.client?.ramoAtividade,
            razaoSocial: user?.client?.razaoSocial,
            tipoPessoa: user?.client?.tipoPessoa,
        },

        addresses: {
            cep: user?.addresses?.cep,
            estado: user?.addresses?.estado,
            cidade: user?.addresses?.cidade,
            logradouro: user?.addresses?.logradouro,
            numero: user?.addresses?.numero,
            bairro: user?.addresses?.bairro,
            complemento: user?.addresses?.complemento
        }
    });


    const getUserById = async () => {
        const response = await userService.getUserById(Number(id))
        console.log(response)
        setUser(response)
    }

    useEffect(() => {
        getUserById()
    }, [id]);

    useEffect(() => {
        if (user) {
            setFormData({
                    nome: user.nome || "",
                    email: user.email || "",
                    role: user.role || "",
                    rg: user.rg || "",
                    orgaoExpedidor: user.orgaoExpedidor || "",
                    estadoCivil: user.estadoCivil || "",
                    profissao: user.profissao || "",
                    dataNascimento: user.dataNascimento || "",
                    celular1: user?.celular1 || "",
                    celular2: user?.celular2 || "",

                employee: {
                    cargo: user.employee?.cargo || "",
                    salario: user.employee?.salario?.toString() || "",
                    departamento: user.employee?.departamento || "",
                    dataAdmissao: user.employee?.dataAdmissao || "",
                    tipoContrato: user.employee?.tipoContrato || "",
                    cargaHoraria: user.employee?.cargaHoraria || "",
                    matriculaInterna: user.employee?.matriculaInterna || "",
                },

                client: {
                    plano: user?.client?.plano || "",
                    dataFundacao: user?.client?.dataFundacao || "",
                    documento: user?.client?.documento || "",
                    inscricaoEstadual: user?.client?.inscricaoEstadual || "",
                    inscricaoMunicipal: user?.client?.inscricaoMunicipal || "",
                    meioFaturamentoPadrao: user?.client?.meioFaturamentoPadrao || "",
                    nomeFantasia: user?.client?.nomeFantasia || "",
                    parceiroOrigemId: user?.client?.parceiroOrigemId || "",
                    pronuncia: user?.client?.pronuncia || "",
                    ramoAtividade: user?.client?.ramoAtividade || "",
                    razaoSocial: user?.client?.razaoSocial || "",
                    tipoPessoa: user?.client?.tipoPessoa || "",
                },

                addresses: {
                    cep: user.addresses?.cep || "",
                    estado: user.addresses?.estado || "",
                    cidade: user.addresses?.cidade || "",
                    logradouro: user.addresses?.logradouro || "",
                    numero: user.addresses?.numero || "",
                    bairro: user.addresses?.bairro || "",
                    complemento: user.addresses?.complemento || "",
                }
            });
        }
    }, [user]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { client, employee, addresses, ...rest } = formData

            let payload: any = { ...rest, addresses }

            if (user?.role === 'CLIENTE') {
                payload.client = client
            }

            if (user?.role === 'FUNCIONARIO') {
                payload.employee = employee
            }

            await userService.updateUser(id, payload)

            // toast de sucesso
            // toast({
            //     title: "Usuário atualizado!",
            //     description: "As informações foram salvas com sucesso.",
            // });

            // navegar para detalhes do usuário
            // navigate(`/usuario/${id}`);
        } catch (error: any) {
            console.error("Erro ao atualizar:", error);

            // toast({
            //     title: "Erro",
            //     description: "Não foi possível atualizar o usuário.",
            //     variant: "destructive",
            // });
        }
    };

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

            <form onSubmit={handleSubmit} className="space-y-6">
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
                                    // onChange={(e) => handleChange("nome", e.target.value)}
                                    onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        nome: e.target.value
                                    })
                                }
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
                                        <SelectItem value="SOLTEIRO">Solteiro(a)</SelectItem>
                                        <SelectItem value="CASADO">Casado(a)</SelectItem>
                                        <SelectItem value="DIVORCIADO">Divorciado(a)</SelectItem>
                                        <SelectItem value="VIUVO">Viúvo(a)</SelectItem>
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
                                    value={formData.dataNascimento ? new Date(formData.dataNascimento).toISOString().split("T")[0] : ""}
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
                {formData.role === "FUNCIONARIO" && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Briefcase className="w-5 h-5" />
                                Informações Profissionais
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="cargo">Cargo*</Label>
                                    <Input
                                        id="cargo"
                                        value={formData.employee.cargo}
                                        onChange={(e) => handleChange("cargo", e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="departamento">Departamento*</Label>
                                    <Input
                                        id="departamento"
                                        value={formData.employee.departamento}
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
                                        value={formData.employee.salario}
                                        onChange={(e) => handleChange("salario", e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="dataAdmissao">Data de Admissão*</Label>
                                    <Input
                                        id="dataAdmissao"
                                        type="date"
                                        value={formData.employee.dataAdmissao}
                                        onChange={(e) => handleChange("dataAdmissao", e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="tipoContrato">Tipo de Contrato*</Label>
                                    <Select value={formData.employee.tipoContrato} onValueChange={(value) => handleChange("tipoContrato", value)}>
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
                                        value={formData.employee.cargaHoraria}
                                        onChange={(e) => handleChange("cargaHoraria", e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="matriculaInterna">Matrícula Interna*</Label>
                                    <Input
                                        id="matriculaInterna"
                                        value={formData.employee.matriculaInterna}
                                        onChange={(e) => handleChange("matriculaInterna", e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Informações de Cliente - apenas para clientes */}
                {formData.role === "CLIENTE" && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Building2 className="w-5 h-5" />
                                Informações de Cliente
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="plano">Plano*</Label>
                                    <Select value={formData.client.plano} onValueChange={(value) => handleChange("plano", value)}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Mensal">Mensal</SelectItem>
                                            <SelectItem value="Diário">Diário</SelectItem>
                                            <SelectItem value="Flex">Flex</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="tipoPessoa">Tipo de Pessoa*</Label>
                                    <Select value={formData.client.tipoPessoa} onValueChange={(value) => handleChange("tipoPessoa", value)}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="PF">Física</SelectItem>
                                            <SelectItem value="PJ">Jurídica</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="documento">CPF/CNPJ*</Label>
                                    <Input
                                        id="documento"
                                        value={formData.client.documento}
                                        onChange={(e) => handleChange("documento", e.target.value)}
                                        required
                                    />
                                </div>

                                {/* <div className="space-y-2">
                                    <Label htmlFor="clienteEstrangeiro">Cliente Estrangeiro*</Label>
                                    <Select value={formData.clienteEstrangeiro} onValueChange={(value) => handleChange("clienteEstrangeiro", value)}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="false">Não</SelectItem>
                                            <SelectItem value="true">Sim</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div> */}

                                <div className="space-y-2">
                                    <Label htmlFor="meioFaturamentoPadrao">Meio de Faturamento*</Label>
                                    <Select value={formData.client.meioFaturamentoPadrao} onValueChange={(value) => handleChange("meioFaturamentoPadrao", value)}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="BOLETO">Boleto</SelectItem>
                                            <SelectItem value="CARTAO">Cartão</SelectItem>
                                            <SelectItem value="TRANSFERENCIA">Transferência</SelectItem>
                                            <SelectItem value="PIX">PIX</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {formData.client.tipoPessoa === "Jurídica" && (
                                    <>
                                        <div className="space-y-2">
                                            <Label htmlFor="razaoSocial">Razão Social*</Label>
                                            <Input
                                                id="razaoSocial"
                                                value={formData.client.razaoSocial}
                                                onChange={(e) => handleChange("razaoSocial", e.target.value)}
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="nomeFantasia">Nome Fantasia</Label>
                                            <Input
                                                id="nomeFantasia"
                                                value={formData.client.nomeFantasia}
                                                onChange={(e) => handleChange("nomeFantasia", e.target.value)}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="inscricaoMunicipal">Inscrição Municipal</Label>
                                            <Input
                                                id="inscricaoMunicipal"
                                                value={formData.client.inscricaoMunicipal}
                                                onChange={(e) => handleChange("inscricaoMunicipal", e.target.value)}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="inscricaoEstadual">Inscrição Estadual</Label>
                                            <Input
                                                id="inscricaoEstadual"
                                                value={formData.client.inscricaoEstadual}
                                                onChange={(e) => handleChange("inscricaoEstadual", e.target.value)}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="ramoAtividade">Ramo de Atividade</Label>
                                            <Input
                                                id="ramoAtividade"
                                                value={formData.client.ramoAtividade}
                                                onChange={(e) => handleChange("ramoAtividade", e.target.value)}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="dataFundacao">Data de Fundação</Label>
                                            <Input
                                                id="dataFundacao"
                                                type="date"
                                                value={formData.client.dataFundacao}
                                                onChange={(e) => handleChange("dataFundacao", e.target.value)}
                                            />
                                        </div>
                                    </>
                                )}

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
                                    value={formData.addresses.cep}
                                    onChange={(e) => handleChange("cep", e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="estado">Estado*</Label>
                                <Input
                                    id="estado"
                                    value={formData.addresses.estado}
                                    onChange={(e) => handleChange("estado", e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="cidade">Cidade*</Label>
                                <Input
                                    id="cidade"
                                    value={formData.addresses.cidade}
                                    onChange={(e) => handleChange("cidade", e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="logradouro">Logradouro*</Label>
                                <Input
                                    id="logradouro"
                                    value={formData.addresses.logradouro}
                                    onChange={(e) => handleChange("logradouro", e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="numero">Número*</Label>
                                <Input
                                    id="numero"
                                    value={formData.addresses.numero}
                                    onChange={(e) => handleChange("numero", e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="bairro">Bairro*</Label>
                                <Input
                                    id="bairro"
                                    value={formData.addresses.bairro}
                                    onChange={(e) => handleChange("bairro", e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="complemento">Complemento</Label>
                                <Input
                                    id="complemento"
                                    value={formData.addresses.complemento}
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