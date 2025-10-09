"use client"

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save, User, Building, Check, X } from "lucide-react";
import { useRouter } from "next/navigation";
import userService from "@/services/userService";
import { Users } from "@/types/user";
import { toast } from "sonner";

const Page = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const initialFormData = {
        // Dados pessoais
        nome: "",
        email: "",
        senha: "",
        rg: "",
        role: "CLIENTE",
        orgaoExpedidor: "",
        estadoCivil: "",
        profissao: "",
        dataNascimento: "",
        celular1: "",
        celular2: "",

        // Dados profissionais
        client: {
            plano: "",
            dataFundacao: "",
            documento: "",
            inscricaoEstadual: "",
            inscricaoMunicipal: "",
            meioFaturamentoPadrao: "",
            nomeFantasia: "",
            parceiroOrigemId: "",
            pronuncia: "",
            ramoAtividade: "",
            razaoSocial: "",
            tipoPessoa: "",
        },

        addresses: {
            cep: "",
            estado: "",
            cidade: "",
            logradouro: "",
            numero: "",
            bairro: "",
            complemento: "",

        }

    };

    const [formData, setFormData] = useState(initialFormData);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const payload = {
                ...formData,
                dataNascimento: new Date(formData.dataNascimento),
            };
            await userService.addUserClient(payload)
            toast.custom((t) => (
                <div className="bg-white text-black p-4 rounded shadow-md flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>Cliente cadastrado com sucesso!</span>
                </div>
            ))
            setFormData(initialFormData);
        } catch (error) {
            toast.custom((t) => (
                <div className="bg-white text-black p-4 rounded shadow-md flex items-center gap-2">
                    <X className="w-5 h-5 text-red-500" />
                    <span>Erro ao cadastrar cliente</span>
                </div>
            ))
        } finally {
            setIsLoading(false);
        }
    };

    const isPJ = formData.client.tipoPessoa === "PJ";

    return (
        <div className="space-y-6">
            <div className="flex items-center space-x-4">
                <Button
                    variant="outline"
                    onClick={() => router.back()}
                    className="flex items-center space-x-2"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Voltarrrrrrrrrrrrrrrrrrr</span>
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
                            <Label htmlFor="email">Email *</Label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        email: e.target.value
                                    })
                                }
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="senha">Senha *</Label>
                            <Input
                                id="senha"
                                type="password"
                                value={formData.senha}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        senha: e.target.value
                                    })
                                }
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="rg">RG *</Label>
                            <Input
                                id="rg"
                                value={formData.rg}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        rg: e.target.value
                                    })
                                }
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="orgaoExpedidor">Órgão Expedidor *</Label>
                            <Input
                                id="orgaoExpedidor"
                                value={formData.orgaoExpedidor}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        orgaoExpedidor: e.target.value
                                    })
                                }
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="estadoCivil">Estado Civil</Label>
                            <Select value={formData.estadoCivil}
                                onValueChange={(value) =>
                                    setFormData({
                                        ...formData,
                                        estadoCivil: value
                                    })
                                }
                            >
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
                                // onChange={(e) => handleInputChangeUser("profissao", e.target.value)}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        profissao: e.target.value
                                    })
                                }

                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="dataNascimento">Data de Nascimento</Label>
                            <Input
                                id="dataNascimento"
                                type="date"
                                value={formData.dataNascimento}
                                // onChange={(e) => handleInputChangeUser("dataNascimento", e.target.value)}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        dataNascimento: e.target.value
                                    })
                                }
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
                            <Select value={formData.client.plano}
                                // onValueChange={(value) => handleInputChangeClient("plano", value)}
                                onValueChange={(value) =>
                                    setFormData({
                                        ...formData,
                                        client: { ...formData.client, plano: value }
                                    })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione o plano" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="MENSAL">Mensal</SelectItem>
                                    <SelectItem value="SEMANAL">Semanal</SelectItem>
                                    <SelectItem value="DIARIO">Diário</SelectItem>
                                    <SelectItem value="FLEX">Flex</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        {/* <div className="space-y-2">
                            <Label htmlFor="razaoSocial">Razao Social *</Label>
                            <Input
                                id="razaoSocial"
                                value={formData.client.razaoSocial}
                                // onChange={(e) => handleInputChangeClient("razaoSocial", e.target.value)}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        client: { ...formData.client, razaoSocial: e.target.value }
                                    })
                                }
                                required
                            />
                        </div> */}
                        <div className="space-y-2">
                            <Label htmlFor="tipoPessoa">Tipo de Pessoa *</Label>
                            <Select value={formData.client.tipoPessoa}
                                // onValueChange={(value) => handleInputChangeClient("tipoPessoa", value)}
                                onValueChange={(value) =>
                                    setFormData({
                                        ...formData,
                                        client: { ...formData.client, tipoPessoa: value }
                                    })
                                }
                            >
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
                                value={formData.client.documento}
                                // onChange={(e) => handleInputChangeClient("documento", e.target.value)}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        client: { ...formData.client, documento: e.target.value }
                                    })
                                }
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="meioFaturamentoPadrao">Meio de Faturamento</Label>
                            <Select
                                value={formData.client.meioFaturamentoPadrao}
                                // onValueChange={(value) => handleInputChangeClient("meioFaturamentoPadrao", value)}
                                onValueChange={(value) =>
                                    setFormData({
                                        ...formData,
                                        client: { ...formData.client, meioFaturamentoPadrao: value }
                                    })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="BOLETO">Boleto</SelectItem>
                                    <SelectItem value="PIX">PIX</SelectItem>
                                    <SelectItem value="CARTAO">Cartão de Crédito</SelectItem>
                                    <SelectItem value="DINHEIRO">Dinheiro</SelectItem>
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
                                    value={formData.client.razaoSocial}
                                    // onChange={(e) => handleInputChange("razaoSocial", e.target.value)}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            client: { ...formData.client, razaoSocial: e.target.value }
                                        })
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="nomeFantasia">Nome Fantasia</Label>
                                <Input
                                    id="nomeFantasia"
                                    value={formData.client.nomeFantasia}
                                    // onChange={(e) => handleInputChange("nomeFantasia", e.target.value)}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            client: { ...formData.client, nomeFantasia: e.target.value }
                                        })
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="inscricaoMunicipal">Inscrição Municipal</Label>
                                <Input
                                    id="inscricaoMunicipal"
                                    value={formData.client.inscricaoMunicipal}
                                    // onChange={(e) => handleInputChange("inscricaoMunicipal", e.target.value)}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            client: { ...formData.client, inscricaoMunicipal: e.target.value }
                                        })
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="inscricaoEstadual">Inscrição Estadual</Label>
                                <Input
                                    id="inscricaoEstadual"
                                    value={formData.client.inscricaoEstadual}
                                    // onChange={(e) => handleInputChange("inscricaoEstadual", e.target.value)}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            client: { ...formData.client, inscricaoEstadual: e.target.value }
                                        })
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="ramoAtividade">Ramo de Atividade</Label>
                                <Input
                                    id="ramoAtividade"
                                    value={formData.client.ramoAtividade}
                                    // onChange={(e) => handleInputChange("ramoAtividade", e.target.value)}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            client: { ...formData.client, ramoAtividade: e.target.value }
                                        })
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="dataFundacao">Data de Fundação</Label>
                                <Input
                                    id="dataFundacao"
                                    type="date"
                                    value={formData.client.dataFundacao}
                                    // onChange={(e) => handleInputChange("dataFundacao", e.target.value)}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            client: { ...formData.client, dataFundacao: e.target.value }
                                        })
                                    }
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
                                value={formData.addresses.cep}
                                // onChange={(e) => handleInputChange("cep", e.target.value)}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        addresses: { ...formData.addresses, cep: e.target.value }
                                    })
                                }
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="estado">Estado</Label>
                            <Input
                                id="estado"
                                value={formData.addresses.estado}
                                // onChange={(e) => handleInputChange("estado", e.target.value)}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        addresses: { ...formData.addresses, estado: e.target.value }
                                    })
                                }
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="cidade">Cidade</Label>
                            <Input
                                id="cidade"
                                value={formData.addresses.cidade}
                                // onChange={(e) => handleInputChange("cidade", e.target.value)}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        addresses: { ...formData.addresses, cidade: e.target.value }
                                    })
                                }
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="logradouro">Logradouro</Label>
                            <Input
                                id="logradouro"
                                value={formData.addresses.logradouro}
                                // onChange={(e) => handleInputChange("logradouro", e.target.value)}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        addresses: { ...formData.addresses, logradouro: e.target.value }
                                    })
                                }
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="numero">Número</Label>
                            <Input
                                id="numero"
                                value={formData.addresses.numero}
                                // onChange={(e) => handleInputChange("numero", e.target.value)}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        addresses: { ...formData.addresses, numero: e.target.value }
                                    })
                                }
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="bairro">Bairro</Label>
                            <Input
                                id="bairro"
                                value={formData.addresses.bairro}
                                // onChange={(e) => handleInputChange("bairro", e.target.value)}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        addresses: { ...formData.addresses, bairro: e.target.value }
                                    })
                                }
                            />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="complemento">Complemento</Label>
                            <Input
                                id="complemento"
                                value={formData.addresses.complemento}
                                // onChange={(e) => handleInputChange("complemento", e.target.value)}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        addresses: { ...formData.addresses, complemento: e.target.value }
                                    })
                                }
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
                                // onChange={(e) => handleInputChange("celular1", e.target.value)}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        celular1: e.target.value
                                    })
                                }
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="celular2">Celular Secundário</Label>
                            <Input
                                id="celular2"
                                value={formData.celular2}
                                // onChange={(e) => handleInputChange("celular2", e.target.value)}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        celular2: e.target.value
                                    })
                                }
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

export default Page;